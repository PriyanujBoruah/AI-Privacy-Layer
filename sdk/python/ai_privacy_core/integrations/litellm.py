"""
LiteLLM Integration Hook for AI Privacy Core.

Provides LiteLLMPrivacyHook compatible with LiteLLM proxy and Python SDK
for automatic pre-call de-identification and post-call rehydration.
"""

from typing import Dict, Any, Optional, List
import copy

from ..client import Client, AsyncClient

try:
    from litellm.integrations.custom_logger import CustomLogger
except ImportError:
    class CustomLogger:
        """Fallback CustomLogger base class when litellm is not installed."""
        pass


class LiteLLMPrivacyHook(CustomLogger):
    """
    LiteLLM custom hook that intercepts requests before dispatching to upstream LLMs
    and rehydrates responses before returning to callers.

    Usage in LiteLLM:
        import litellm
        from ai_privacy_core.integrations.litellm import LiteLLMPrivacyHook

        privacy_hook = LiteLLMPrivacyHook(
            base_url="http://localhost:8787/v1",
            categories=["global", "european_union"],
            encryption_key="kms-secret"
        )

        litellm.callbacks = [privacy_hook]

        # Standard LiteLLM completion
        response = litellm.completion(
            model="gpt-4o",
            messages=[{"role": "user", "content": "My email is john@corp.de"}]
        )
    """

    def __init__(
        self,
        base_url: str = "http://localhost:8787/v1",
        api_key: Optional[str] = None,
        encryption_key: Optional[str] = None,
        categories: Optional[List[str]] = None,
        mode: str = "structural",
        custom_keywords: Optional[List[str]] = None,
        ttl_seconds: int = 300,
        purge_after_read: bool = False,
        client: Optional[Client] = None,
        async_client: Optional[AsyncClient] = None,
    ):
        super().__init__()
        self.client = client or Client(
            base_url=base_url,
            api_key=api_key,
            encryption_key=encryption_key,
            default_categories=categories or ["global"],
            default_mode=mode,
        )
        self.async_client = async_client or AsyncClient(
            base_url=base_url,
            api_key=api_key,
            encryption_key=encryption_key,
            default_categories=categories or ["global"],
            default_mode=mode,
        )
        self.encryption_key = encryption_key
        self.categories = categories
        self.mode = mode
        self.custom_keywords = custom_keywords
        self.ttl_seconds = ttl_seconds
        self.purge_after_read = purge_after_read

    def _sanitize_messages(self, messages: List[Dict[str, Any]], is_async: bool = False) -> Optional[str]:
        """Sanitizes messages array in-place and returns session_id."""
        last_session_id = None
        for msg in messages:
            content = msg.get("content")
            if isinstance(content, str):
                result = self.client.tokenize(
                    text=content,
                    mode=self.mode,
                    categories=self.categories,
                    custom_keywords=self.custom_keywords,
                    encryption_key=self.encryption_key,
                    ttl_seconds=self.ttl_seconds,
                )
                msg["content"] = result.sanitized_text
                last_session_id = result.session_id
        return last_session_id

    async def _asanitize_messages(self, messages: List[Dict[str, Any]]) -> Optional[str]:
        """Asynchronously sanitizes messages array in-place and returns session_id."""
        last_session_id = None
        for msg in messages:
            content = msg.get("content")
            if isinstance(content, str):
                result = await self.async_client.tokenize(
                    text=content,
                    mode=self.mode,
                    categories=self.categories,
                    custom_keywords=self.custom_keywords,
                    encryption_key=self.encryption_key,
                    ttl_seconds=self.ttl_seconds,
                )
                msg["content"] = result.sanitized_text
                last_session_id = result.session_id
        return last_session_id

    # LiteLLM Synchronous Hook Interfaces
    def log_pre_api_call(self, model: str, messages: List[Dict[str, Any]], kwargs: Dict[str, Any]):
        """Synchronous pre-call hook invoked before LiteLLM sends request upstream."""
        session_id = self._sanitize_messages(messages)
        if session_id:
            kwargs.setdefault("metadata", {})["_ai_privacy_session_id"] = session_id

    def log_post_api_call(self, kwargs: Dict[str, Any], response_obj: Any, start_time: Any, end_time: Any):
        """Synchronous post-call hook invoked when LiteLLM receives upstream response."""
        session_id = kwargs.get("metadata", {}).get("_ai_privacy_session_id")
        if not session_id:
            return

        # Handle object or dict response
        if hasattr(response_obj, "choices") and response_obj.choices:
            choice = response_obj.choices[0]
            if hasattr(choice, "message") and hasattr(choice.message, "content"):
                if isinstance(choice.message.content, str):
                    rehydrated = self.client.detokenize(
                        session_id=session_id,
                        tokenized_text=choice.message.content,
                        encryption_key=self.encryption_key,
                        purge_after_read=self.purge_after_read,
                    )
                    choice.message.content = rehydrated.rehydrated_text
        elif isinstance(response_obj, dict) and "choices" in response_obj:
            choices = response_obj["choices"]
            if choices and isinstance(choices[0], dict) and "message" in choices[0]:
                content = choices[0]["message"].get("content")
                if isinstance(content, str):
                    rehydrated = self.client.detokenize(
                        session_id=session_id,
                        tokenized_text=content,
                        encryption_key=self.encryption_key,
                        purge_after_read=self.purge_after_read,
                    )
                    choices[0]["message"]["content"] = rehydrated.rehydrated_text

    # LiteLLM Asynchronous Hook Interfaces
    async def async_pre_call_hook(
        self,
        user_api_key_dict: Dict[str, Any],
        cache: Any,
        data: Dict[str, Any],
        call_type: str,
    ) -> Optional[Dict[str, Any]]:
        """Asynchronous pre-call hook for LiteLLM proxy and async completions."""
        messages = data.get("messages")
        if isinstance(messages, list):
            session_id = await self._asanitize_messages(messages)
            if session_id:
                data.setdefault("metadata", {})["_ai_privacy_session_id"] = session_id

        # Also support embeddings "input" parameter
        embeddings_input = data.get("input")
        if isinstance(embeddings_input, str):
            res = await self.async_client.tokenize(
                text=embeddings_input,
                mode=self.mode,
                categories=self.categories,
                custom_keywords=self.custom_keywords,
                encryption_key=self.encryption_key,
                ttl_seconds=self.ttl_seconds,
            )
            data["input"] = res.sanitized_text
            data.setdefault("metadata", {})["_ai_privacy_session_id"] = res.session_id

        return data

    async def async_post_call_success_hook(
        self,
        data: Dict[str, Any],
        user_api_key_dict: Dict[str, Any],
        response: Any,
    ) -> Any:
        """Asynchronous post-call hook for LiteLLM proxy response rehydration."""
        session_id = data.get("metadata", {}).get("_ai_privacy_session_id")
        if not session_id:
            return response

        if hasattr(response, "choices") and response.choices:
            choice = response.choices[0]
            if hasattr(choice, "message") and hasattr(choice.message, "content"):
                if isinstance(choice.message.content, str):
                    rehydrated = await self.async_client.detokenize(
                        session_id=session_id,
                        tokenized_text=choice.message.content,
                        encryption_key=self.encryption_key,
                        purge_after_read=self.purge_after_read,
                    )
                    choice.message.content = rehydrated.rehydrated_text
        elif isinstance(response, dict) and "choices" in response:
            choices = response["choices"]
            if choices and isinstance(choices[0], dict) and "message" in choices[0]:
                content = choices[0]["message"].get("content")
                if isinstance(content, str):
                    rehydrated = await self.async_client.detokenize(
                        session_id=session_id,
                        tokenized_text=content,
                        encryption_key=self.encryption_key,
                        purge_after_read=self.purge_after_read,
                    )
                    choices[0]["message"]["content"] = rehydrated.rehydrated_text

        return response
