"""
Client Implementation for AI Privacy Core.
Supports Synchronous (Client) and Asynchronous (AsyncClient) operations.
"""

from typing import List, Dict, Any, Optional, Union
import json
import httpx

from .models import TokenizeResult, RehydrateResult, AuditEvent
from .exceptions import (
    PrivacyError,
    KmsError,
    SessionExpiredError,
    PayloadTooLargeError,
    CategoryLimitExceededError,
    ConnectionError,
)


def _handle_response_error(status_code: int, response_data: Dict[str, Any], default_msg: str):
    error_obj = response_data.get("error", {})
    if isinstance(error_obj, dict):
        message = error_obj.get("message", default_msg)
        error_type = error_obj.get("type", "api_error")
    else:
        message = str(error_obj) or default_msg
        error_type = "api_error"

    if status_code == 401 or "kms_key_required" in error_type or "KMS" in message:
        raise KmsError(message, status_code=status_code, error_type=error_type, details=response_data)
    elif status_code == 403 or "kms_decryption_failed" in error_type:
        raise KmsError(message, status_code=status_code, error_type=error_type, details=response_data)
    elif status_code == 404 or "session_expired" in error_type:
        raise SessionExpiredError(message, status_code=status_code, error_type=error_type, details=response_data)
    elif status_code == 413 or "payload_too_large" in error_type:
        raise PayloadTooLargeError(message, status_code=status_code, error_type=error_type, details=response_data)
    elif status_code == 400 and "category_limit_exceeded" in error_type:
        raise CategoryLimitExceededError(message, status_code=status_code, error_type=error_type, details=response_data)
    else:
        raise PrivacyError(message, status_code=status_code, error_type=error_type, details=response_data)


class PrivacySession:
    """
    Context manager and scoped session helper for a single or multi-turn interaction.
    Automatically keeps track of session_id and manages cryptographic detokenization.
    """

    def __init__(
        self,
        client: Union["Client", "AsyncClient"],
        categories: Optional[List[str]] = None,
        mode: str = "structural",
        custom_keywords: Optional[List[str]] = None,
        encryption_key: Optional[str] = None,
        ttl_seconds: int = 300,
        purge_after_read: bool = False,
    ):
        self.client = client
        self.categories = categories
        self.mode = mode
        self.custom_keywords = custom_keywords
        self.encryption_key = encryption_key
        self.ttl_seconds = ttl_seconds
        self.purge_after_read = purge_after_read
        self.session_id: Optional[str] = None
        self.last_result: Optional[TokenizeResult] = None

    def __enter__(self) -> "PrivacySession":
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass

    async def __aenter__(self) -> "PrivacySession":
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        pass

    def tokenize(self, text: str) -> str:
        """Tokenize text synchronously and store session_id."""
        if isinstance(self.client, AsyncClient):
            raise RuntimeError("Use await session.atokenize() with AsyncClient")

        result = self.client.tokenize(
            text=text,
            mode=self.mode,
            categories=self.categories,
            custom_keywords=self.custom_keywords,
            encryption_key=self.encryption_key,
            ttl_seconds=self.ttl_seconds,
        )
        self.session_id = result.session_id
        self.last_result = result
        return result.sanitized_text

    async def atokenize(self, text: str) -> str:
        """Tokenize text asynchronously and store session_id."""
        if isinstance(self.client, Client):
            raise RuntimeError("Use session.tokenize() with synchronous Client")

        result = await self.client.tokenize(
            text=text,
            mode=self.mode,
            categories=self.categories,
            custom_keywords=self.custom_keywords,
            encryption_key=self.encryption_key,
            ttl_seconds=self.ttl_seconds,
        )
        self.session_id = result.session_id
        self.last_result = result
        return result.sanitized_text

    def detokenize(self, tokenized_text: str) -> str:
        """Detokenize text synchronously using the active session."""
        if not self.session_id:
            return tokenized_text
        if isinstance(self.client, AsyncClient):
            raise RuntimeError("Use await session.adetetokenize() with AsyncClient")

        result = self.client.detokenize(
            session_id=self.session_id,
            tokenized_text=tokenized_text,
            encryption_key=self.encryption_key,
            purge_after_read=self.purge_after_read,
        )
        return result.rehydrated_text

    async def adetokenize(self, tokenized_text: str) -> str:
        """Detokenize text asynchronously using the active session."""
        if not self.session_id:
            return tokenized_text
        if isinstance(self.client, Client):
            raise RuntimeError("Use session.detokenize() with synchronous Client")

        result = await self.client.detokenize(
            session_id=self.session_id,
            tokenized_text=tokenized_text,
            encryption_key=self.encryption_key,
            purge_after_read=self.purge_after_read,
        )
        return result.rehydrated_text


class Client:
    """
    Synchronous Client for AI Privacy Core Gateway.

    Usage:
        client = Client(base_url="http://localhost:8787/v1")
        result = client.tokenize("Contact Alice (alice@fintech.sg)")
        print(result.sanitized_text)
    """

    def __init__(
        self,
        base_url: str = "http://localhost:8787/v1",
        api_key: Optional[str] = None,
        encryption_key: Optional[str] = None,
        default_categories: Optional[List[str]] = None,
        default_mode: str = "structural",
        timeout: float = 30.0,
        headers: Optional[Dict[str, str]] = None,
    ):
        self.base_url = base_url.rstrip("/")
        self.api_key = api_key
        self.encryption_key = encryption_key
        self.default_categories = default_categories or ["global"]
        self.default_mode = default_mode
        self.timeout = timeout

        custom_headers = {
            "Content-Type": "application/json",
            "User-Agent": "AIPrivacyCore-PythonSDK/2.0.0",
        }
        if self.api_key:
            custom_headers["Authorization"] = f"Bearer {self.api_key}"
        if self.encryption_key:
            custom_headers["x-vault-encryption-key"] = self.encryption_key
        if headers:
            custom_headers.update(headers)

        self._http = httpx.Client(
            base_url=self.base_url,
            headers=custom_headers,
            timeout=self.timeout,
        )

    def close(self):
        self._http.close()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()

    def tokenize(
        self,
        text: str,
        mode: Optional[str] = None,
        categories: Optional[List[str]] = None,
        custom_keywords: Optional[List[str]] = None,
        encryption_key: Optional[str] = None,
        ttl_seconds: int = 300,
    ) -> TokenizeResult:
        """
        De-identifies sensitive sovereign IDs, financial data, and PII in input text.
        """
        payload: Dict[str, Any] = {
            "text": text,
            "mode": mode or self.default_mode,
            "categories": categories or self.default_categories,
            "ttlSeconds": ttl_seconds,
        }
        if custom_keywords:
            payload["customKeywords"] = custom_keywords

        enc_key = encryption_key or self.encryption_key
        req_headers = {}
        if enc_key:
            payload["encryptionKey"] = enc_key
            req_headers["x-vault-encryption-key"] = enc_key

        try:
            res = self._http.post("/tokenize", json=payload, headers=req_headers)
        except Exception as e:
            raise ConnectionError(f"Failed to connect to AI Privacy Core gateway at {self.base_url}: {e}")

        try:
            data = res.json()
        except Exception:
            data = {"raw": res.text}

        if not res.is_success:
            _handle_response_error(res.status_code, data, "Tokenization request failed")

        kms_status = res.headers.get("X-Kms-Status")
        return TokenizeResult.from_dict(data, kms_status=kms_status)

    def detokenize(
        self,
        session_id: str,
        tokenized_text: str,
        encryption_key: Optional[str] = None,
        purge_after_read: bool = False,
    ) -> RehydrateResult:
        """
        Rehydrates tokenized text back into original values using the temporary session vault.
        """
        payload: Dict[str, Any] = {
            "sessionId": session_id,
            "tokenizedText": tokenized_text,
            "purgeAfterRead": purge_after_read,
        }
        enc_key = encryption_key or self.encryption_key
        req_headers = {}
        if enc_key:
            payload["encryptionKey"] = enc_key
            req_headers["x-vault-encryption-key"] = enc_key

        try:
            res = self._http.post("/detokenize", json=payload, headers=req_headers)
        except Exception as e:
            raise ConnectionError(f"Failed to connect to AI Privacy Core gateway: {e}")

        try:
            data = res.json()
        except Exception:
            data = {"raw": res.text}

        if not res.is_success:
            _handle_response_error(res.status_code, data, "Detokenization request failed")

        return RehydrateResult.from_dict(data)

    def get_audit_events(
        self,
        limit: int = 50,
        session_id: Optional[str] = None,
        event_type: Optional[str] = None,
    ) -> List[AuditEvent]:
        """
        Retrieves recent compliance audit telemetry events.
        """
        params: Dict[str, Any] = {"limit": limit}
        if session_id:
            params["sessionId"] = session_id
        if event_type:
            params["eventType"] = event_type

        try:
            res = self._http.get("/audit/events", params=params)
        except Exception as e:
            raise ConnectionError(f"Failed to connect to audit events endpoint: {e}")

        try:
            data = res.json()
        except Exception:
            data = {}

        if not res.is_success:
            _handle_response_error(res.status_code, data, "Failed to retrieve audit events")

        events_data = data.get("data", [])
        return [AuditEvent.from_dict(e) for e in events_data]

    def health(self) -> Dict[str, Any]:
        """Checks gateway health status."""
        try:
            res = self._http.get("/health")
            return res.json()
        except Exception as e:
            raise ConnectionError(f"Gateway health check failed: {e}")

    def session(
        self,
        categories: Optional[List[str]] = None,
        mode: Optional[str] = None,
        custom_keywords: Optional[List[str]] = None,
        encryption_key: Optional[str] = None,
        ttl_seconds: int = 300,
        purge_after_read: bool = False,
    ) -> PrivacySession:
        """Creates a scoped PrivacySession context manager."""
        return PrivacySession(
            client=self,
            categories=categories or self.default_categories,
            mode=mode or self.default_mode,
            custom_keywords=custom_keywords,
            encryption_key=encryption_key or self.encryption_key,
            ttl_seconds=ttl_seconds,
            purge_after_read=purge_after_read,
        )

    def configure_openai(
        self,
        openai_client: Any,
        upstream_base_url: Optional[str] = None,
        categories: Optional[List[str]] = None,
        mode: Optional[str] = None,
    ):
        """
        Helper method to point an existing OpenAI SDK client instance to this gateway.

        Example:
            from openai import OpenAI
            client = Client("http://localhost:8787/v1", encryption_key="my-passphrase")
            openai_client = OpenAI(api_key="sk-...")
            client.configure_openai(openai_client)
        """
        openai_client.base_url = httpx.URL(self.base_url + "/")
        if self.encryption_key:
            openai_client.default_headers["x-vault-encryption-key"] = self.encryption_key
        if upstream_base_url:
            openai_client.default_headers["x-upstream-base-url"] = upstream_base_url
        if categories:
            openai_client.default_headers["x-detection-categories"] = ",".join(categories)
        if mode:
            openai_client.default_headers["x-tokenization-mode"] = mode


class AsyncClient:
    """
    Asynchronous Client for AI Privacy Core Gateway (httpx-based).
    """

    def __init__(
        self,
        base_url: str = "http://localhost:8787/v1",
        api_key: Optional[str] = None,
        encryption_key: Optional[str] = None,
        default_categories: Optional[List[str]] = None,
        default_mode: str = "structural",
        timeout: float = 30.0,
        headers: Optional[Dict[str, str]] = None,
    ):
        self.base_url = base_url.rstrip("/")
        self.api_key = api_key
        self.encryption_key = encryption_key
        self.default_categories = default_categories or ["global"]
        self.default_mode = default_mode
        self.timeout = timeout

        custom_headers = {
            "Content-Type": "application/json",
            "User-Agent": "AIPrivacyCore-PythonSDK-Async/2.0.0",
        }
        if self.api_key:
            custom_headers["Authorization"] = f"Bearer {self.api_key}"
        if self.encryption_key:
            custom_headers["x-vault-encryption-key"] = self.encryption_key
        if headers:
            custom_headers.update(headers)

        self._http = httpx.AsyncClient(
            base_url=self.base_url,
            headers=custom_headers,
            timeout=self.timeout,
        )

    async def close(self):
        await self._http.aclose()

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.close()

    async def tokenize(
        self,
        text: str,
        mode: Optional[str] = None,
        categories: Optional[List[str]] = None,
        custom_keywords: Optional[List[str]] = None,
        encryption_key: Optional[str] = None,
        ttl_seconds: int = 300,
    ) -> TokenizeResult:
        payload: Dict[str, Any] = {
            "text": text,
            "mode": mode or self.default_mode,
            "categories": categories or self.default_categories,
            "ttlSeconds": ttl_seconds,
        }
        if custom_keywords:
            payload["customKeywords"] = custom_keywords

        enc_key = encryption_key or self.encryption_key
        req_headers = {}
        if enc_key:
            payload["encryptionKey"] = enc_key
            req_headers["x-vault-encryption-key"] = enc_key

        try:
            res = await self._http.post("/tokenize", json=payload, headers=req_headers)
        except Exception as e:
            raise ConnectionError(f"Failed to connect to gateway at {self.base_url}: {e}")

        try:
            data = res.json()
        except Exception:
            data = {"raw": res.text}

        if not res.is_success:
            _handle_response_error(res.status_code, data, "Tokenization request failed")

        kms_status = res.headers.get("X-Kms-Status")
        return TokenizeResult.from_dict(data, kms_status=kms_status)

    async def detokenize(
        self,
        session_id: str,
        tokenized_text: str,
        encryption_key: Optional[str] = None,
        purge_after_read: bool = False,
    ) -> RehydrateResult:
        payload: Dict[str, Any] = {
            "sessionId": session_id,
            "tokenizedText": tokenized_text,
            "purgeAfterRead": purge_after_read,
        }
        enc_key = encryption_key or self.encryption_key
        req_headers = {}
        if enc_key:
            payload["encryptionKey"] = enc_key
            req_headers["x-vault-encryption-key"] = enc_key

        try:
            res = await self._http.post("/detokenize", json=payload, headers=req_headers)
        except Exception as e:
            raise ConnectionError(f"Failed to connect to gateway: {e}")

        try:
            data = res.json()
        except Exception:
            data = {"raw": res.text}

        if not res.is_success:
            _handle_response_error(res.status_code, data, "Detokenization request failed")

        return RehydrateResult.from_dict(data)

    async def get_audit_events(
        self,
        limit: int = 50,
        session_id: Optional[str] = None,
        event_type: Optional[str] = None,
    ) -> List[AuditEvent]:
        params: Dict[str, Any] = {"limit": limit}
        if session_id:
            params["sessionId"] = session_id
        if event_type:
            params["eventType"] = event_type

        try:
            res = await self._http.get("/audit/events", params=params)
        except Exception as e:
            raise ConnectionError(f"Failed to connect to audit events endpoint: {e}")

        try:
            data = res.json()
        except Exception:
            data = {}

        if not res.is_success:
            _handle_response_error(res.status_code, data, "Failed to retrieve audit events")

        events_data = data.get("data", [])
        return [AuditEvent.from_dict(e) for e in events_data]

    async def health(self) -> Dict[str, Any]:
        try:
            res = await self._http.get("/health")
            return res.json()
        except Exception as e:
            raise ConnectionError(f"Gateway health check failed: {e}")

    def session(
        self,
        categories: Optional[List[str]] = None,
        mode: Optional[str] = None,
        custom_keywords: Optional[List[str]] = None,
        encryption_key: Optional[str] = None,
        ttl_seconds: int = 300,
        purge_after_read: bool = False,
    ) -> PrivacySession:
        return PrivacySession(
            client=self,
            categories=categories or self.default_categories,
            mode=mode or self.default_mode,
            custom_keywords=custom_keywords,
            encryption_key=encryption_key or self.encryption_key,
            ttl_seconds=ttl_seconds,
            purge_after_read=purge_after_read,
        )
