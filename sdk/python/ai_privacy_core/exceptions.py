"""
Custom Exceptions for AI Privacy Core SDK.
"""

from typing import Optional, Dict, Any


class PrivacyError(Exception):
    """Base exception for all AI Privacy Core SDK errors."""

    def __init__(
        self,
        message: str,
        status_code: Optional[int] = None,
        error_type: Optional[str] = None,
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.error_type = error_type
        self.details = details or {}

    def __repr__(self) -> str:
        return f"{self.__class__.__name__}(message='{self.message}', status_code={self.status_code}, error_type='{self.error_type}')"


class KmsError(PrivacyError):
    """Raised when customer BYOK KMS encryption or decryption fails (e.g. key missing or wrong)."""
    pass


class SessionExpiredError(PrivacyError):
    """Raised when a temporary vault session has expired or was already purged."""
    pass


class PayloadTooLargeError(PrivacyError):
    """Raised when input text exceeds the maximum gateway ceiling (1 MB)."""
    pass


class CategoryLimitExceededError(PrivacyError):
    """Raised when more than the allowed maximum Canonical Regional Packs (2) are specified."""
    pass


class ConnectionError(PrivacyError):
    """Raised when unable to reach the AI Privacy Core gateway endpoint."""
    pass
