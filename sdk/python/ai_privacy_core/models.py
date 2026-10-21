"""
Data Models for AI Privacy Core SDK.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional


@dataclass
class DetectedEntity:
    rule_id: str
    token: str
    fingerprint: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "DetectedEntity":
        return cls(
            rule_id=data.get("ruleId") or data.get("rule_id") or data.get("type", "UNKNOWN"),
            token=data.get("token", ""),
            fingerprint=data.get("fingerprint"),
        )


@dataclass
class TokenizeResult:
    mode: str
    session_id: str
    sanitized_text: str
    entities_count: int
    entities_detected: List[DetectedEntity] = field(default_factory=list)
    categories_applied: List[str] = field(default_factory=list)
    expires_at: Optional[str] = None
    kms_status: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any], kms_status: Optional[str] = None) -> "TokenizeResult":
        entities = [
            DetectedEntity.from_dict(e)
            for e in data.get("entitiesDetected", [])
        ]
        return cls(
            mode=data.get("mode", "structural"),
            session_id=data.get("sessionId", ""),
            sanitized_text=data.get("sanitizedText", ""),
            entities_count=data.get("entitiesCount", 0),
            entities_detected=entities,
            categories_applied=data.get("categoriesApplied", ["global"]),
            expires_at=data.get("expiresAt"),
            kms_status=kms_status,
        )


@dataclass
class RehydrateResult:
    rehydrated_text: str
    tokens_resolved: int
    session_status: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "RehydrateResult":
        return cls(
            rehydrated_text=data.get("rehydratedText", ""),
            tokens_resolved=data.get("tokensResolved", 0),
            session_status=data.get("sessionStatus", "active"),
        )


@dataclass
class AuditEvent:
    event_id: str
    timestamp: str
    event_type: str
    session_id: Optional[str] = None
    kms_status: Optional[str] = None
    entities_intercepted: int = 0
    entities: List[Dict[str, Any]] = field(default_factory=list)
    model: Optional[str] = None
    upstream_base_url: Optional[str] = None
    latency_us: Optional[int] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "AuditEvent":
        return cls(
            event_id=data.get("eventId", ""),
            timestamp=data.get("timestamp", ""),
            event_type=data.get("eventType", ""),
            session_id=data.get("sessionId"),
            kms_status=data.get("kmsStatus"),
            entities_intercepted=data.get("entitiesIntercepted") or data.get("entitiesCount", 0),
            entities=data.get("entities", []),
            model=data.get("model"),
            upstream_base_url=data.get("upstreamBaseUrl") or data.get("upstreamUrl"),
            latency_us=data.get("latencyUs") or data.get("engineLatencyUs"),
        )
