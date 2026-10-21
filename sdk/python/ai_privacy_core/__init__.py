"""
AI Privacy Core — Enterprise Python SDK
Zero-trust de-identification, sovereign ID tokenization, and rehydration gateway.
"""

from .client import Client, AsyncClient, PrivacySession
from .models import TokenizeResult, RehydrateResult, DetectedEntity, AuditEvent
from .exceptions import (
    PrivacyError,
    KmsError,
    SessionExpiredError,
    PayloadTooLargeError,
    CategoryLimitExceededError,
    ConnectionError,
)
from .integrations import PrivacyCallbackHandler, LiteLLMPrivacyHook

__version__ = "2.0.0"

__all__ = [
    "Client",
    "AsyncClient",
    "PrivacySession",
    "TokenizeResult",
    "RehydrateResult",
    "DetectedEntity",
    "AuditEvent",
    "PrivacyError",
    "KmsError",
    "SessionExpiredError",
    "PayloadTooLargeError",
    "CategoryLimitExceededError",
    "ConnectionError",
    "PrivacyCallbackHandler",
    "LiteLLMPrivacyHook",
]
