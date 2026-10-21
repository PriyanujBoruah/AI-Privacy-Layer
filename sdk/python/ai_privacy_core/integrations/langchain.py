"""
LangChain Callback Integration for AI Privacy Core.

Provides PrivacyCallbackHandler for automatic zero-leak prompt tokenization
and response rehydration across LangChain chains, agents, and RAG pipelines.
"""

from typing import List, Dict, Any, Optional, Union
import uuid

from ..client import Client
from ..models import TokenizeResult

try:
    from langchain_core.callbacks.base import BaseCallbackHandler
    from langchain_core.outputs import LLMResult
except ImportError:
    try:
        from langchain.callbacks.base import BaseCallbackHandler
        from langchain.schema import LLMResult
    except ImportError:
        # Fallback dummy class if LangChain is not installed in the environment
        class BaseCallbackHandler:
            """Fallback BaseCallbackHandler when langchain is not installed."""
            pass

        class LLMResult:
            """Fallback LLMResult when langchain is not installed."""
            pass


class PrivacyCallbackHandler(BaseCallbackHandler):
    """
    LangChain Callback Handler that intercepts prompts before LLM execution,
    tokenizes PII/sovereign IDs, and rehydrates model outputs transparently.

    Usage:
        from langchain_openai import ChatOpenAI
        from ai_privacy_core.integrations.langchain import PrivacyCallbackHandler

        privacy_handler = PrivacyCallbackHandler(
            base_url="http://localhost:8787/v1",
            categories=["global", "north_america"],
            encryption_key="customer-kms-secret"
        )

        llm = ChatOpenAI(model="gpt-4o", callbacks=[privacy_handler])
        response = llm.invoke("What is the credit card 4532-0151-1283-0366 balance for John?")
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
    ):
        super().__init__()
        self.client = client or Client(
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

        # Maps run_id (string) to active session_id
        self._run_sessions: Dict[str, str] = {}
        # Stores recent tokenization results for audit inspection
        self.last_tokenize_result: Optional[TokenizeResult] = None

    def on_llm_start(
        self,
        serialized: Dict[str, Any],
        prompts: List[str],
        *,
        run_id: Optional[Union[uuid.UUID, str]] = None,
        **kwargs: Any,
    ) -> None:
        """
        Runs when LLM starts running. Sanitizes prompt strings in-place.
        """
        run_key = str(run_id) if run_id else "default_run"

        for idx, prompt in enumerate(prompts):
            if not isinstance(prompt, str):
                continue

            result = self.client.tokenize(
                text=prompt,
                mode=self.mode,
                categories=self.categories,
                custom_keywords=self.custom_keywords,
                encryption_key=self.encryption_key,
                ttl_seconds=self.ttl_seconds,
            )
            # Replace prompt content in-place with de-identified surrogate tokens
            prompts[idx] = result.sanitized_text
            self._run_sessions[run_key] = result.session_id
            self.last_tokenize_result = result

    def on_chat_model_start(
        self,
        serialized: Dict[str, Any],
        messages: List[List[Any]],
        *,
        run_id: Optional[Union[uuid.UUID, str]] = None,
        **kwargs: Any,
    ) -> None:
        """
        Runs when Chat Model starts running. Sanitizes message contents in-place.
        """
        run_key = str(run_id) if run_id else "default_run"

        for message_list in messages:
            for msg in message_list:
                content = getattr(msg, "content", None)
                if isinstance(content, str):
                    result = self.client.tokenize(
                        text=content,
                        mode=self.mode,
                        categories=self.categories,
                        custom_keywords=self.custom_keywords,
                        encryption_key=self.encryption_key,
                        ttl_seconds=self.ttl_seconds,
                    )
                    msg.content = result.sanitized_text
                    self._run_sessions[run_key] = result.session_id
                    self.last_tokenize_result = result

    def on_llm_end(
        self,
        response: Any,
        *,
        run_id: Optional[Union[uuid.UUID, str]] = None,
        **kwargs: Any,
    ) -> None:
        """
        Runs when LLM ends running. Restores original sensitive values into response text.
        """
        run_key = str(run_id) if run_id else "default_run"
        session_id = self._run_sessions.pop(run_key, None)

        if not session_id:
            return

        # Rehydrate generations
        generations = getattr(response, "generations", [])
        for gen_list in generations:
            for gen in gen_list:
                text = getattr(gen, "text", None)
                if isinstance(text, str):
                    rehydrated = self.client.detokenize(
                        session_id=session_id,
                        tokenized_text=text,
                        encryption_key=self.encryption_key,
                        purge_after_read=self.purge_after_read,
                    )
                    gen.text = rehydrated.rehydrated_text

                # Support chat generation message content if present
                message = getattr(gen, "message", None)
                if message and hasattr(message, "content") and isinstance(message.content, str):
                    rehydrated_msg = self.client.detokenize(
                        session_id=session_id,
                        tokenized_text=message.content,
                        encryption_key=self.encryption_key,
                        purge_after_read=self.purge_after_read,
                    )
                    message.content = rehydrated_msg.rehydrated_text

    def on_llm_error(
        self,
        error: BaseException,
        *,
        run_id: Optional[Union[uuid.UUID, str]] = None,
        **kwargs: Any,
    ) -> None:
        """Clean up active session tracking on failure."""
        run_key = str(run_id) if run_id else "default_run"
        self._run_sessions.pop(run_key, None)
