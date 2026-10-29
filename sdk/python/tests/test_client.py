import unittest
import asyncio
from unittest.mock import MagicMock, patch
import os
import sys
import httpx

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from ai_privacy_core import (
    Client,
    AsyncClient,
    PrivacySession,
    TokenizeResult,
    RehydrateResult,
    AuditEvent,
    KmsError,
    SessionExpiredError,
    PayloadTooLargeError,
    CategoryLimitExceededError,
)


class TestModels(unittest.TestCase):
    def test_tokenize_result_parsing(self):
        raw = {
            "mode": "structural",
            "sessionId": "sess_123",
            "sanitizedText": "Hello EMAIL_1",
            "entitiesCount": 1,
            "entitiesDetected": [
                {"ruleId": "RULE_EMAIL", "token": "EMAIL_1", "fingerprint": "abc123"}
            ],
            "categoriesApplied": ["global"],
            "expiresAt": "2026-09-26T20:00:00Z",
        }
        res = TokenizeResult.from_dict(raw, kms_status="BYOK-AES-256-GCM")
        self.assertEqual(res.mode, "structural")
        self.assertEqual(res.session_id, "sess_123")
        self.assertEqual(res.sanitized_text, "Hello EMAIL_1")
        self.assertEqual(res.entities_count, 1)
        self.assertEqual(len(res.entities_detected), 1)
        self.assertEqual(res.entities_detected[0].rule_id, "RULE_EMAIL")
        self.assertEqual(res.entities_detected[0].token, "EMAIL_1")
        self.assertEqual(res.entities_detected[0].fingerprint, "abc123")
        self.assertEqual(res.kms_status, "BYOK-AES-256-GCM")

    def test_rehydrate_result_parsing(self):
        raw = {
            "rehydratedText": "Hello alice@corp.com",
            "tokensResolved": 1,
            "sessionStatus": "purged",
        }
        res = RehydrateResult.from_dict(raw)
        self.assertEqual(res.rehydrated_text, "Hello alice@corp.com")
        self.assertEqual(res.tokens_resolved, 1)
        self.assertEqual(res.session_status, "purged")

    def test_audit_event_parsing(self):
        raw = {
            "eventId": "evt_001",
            "timestamp": "2026-09-26T12:00:00Z",
            "eventType": "PROMPT_INTERCEPTED",
            "sessionId": "sess_456",
            "kmsStatus": "BYOK-AES-256-GCM",
            "entitiesCount": 2,
            "entities": [{"ruleId": "RULE_EMAIL", "token": "EMAIL_1"}],
            "model": "gpt-4o",
            "upstreamBaseUrl": "https://api.openai.com/v1",
            "latencyUs": 120,
        }
        event = AuditEvent.from_dict(raw)
        self.assertEqual(event.event_id, "evt_001")
        self.assertEqual(event.event_type, "PROMPT_INTERCEPTED")
        self.assertEqual(event.session_id, "sess_456")
        self.assertEqual(event.kms_status, "BYOK-AES-256-GCM")
        self.assertEqual(event.entities_intercepted, 2)
        self.assertEqual(event.latency_us, 120)


class TestClient(unittest.TestCase):
    def setUp(self):
        self.client = Client(
            base_url="http://mock-gateway/v1",
            encryption_key="test-key",
            default_categories=["global", "north_america"],
        )

    def tearDown(self):
        self.client.close()

    def test_tokenize_success(self):
        mock_resp = httpx.Response(
            status_code=200,
            json={
                "mode": "structural",
                "sessionId": "sess_abc",
                "sanitizedText": "Hello PERSON_1",
                "entitiesCount": 1,
                "entitiesDetected": [{"ruleId": "RULE_CONTEXT_NAME", "token": "PERSON_1"}],
                "categoriesApplied": ["global", "north_america"],
            },
            headers={"X-Kms-Status": "BYOK-AES-256-GCM"},
        )
        with patch.object(self.client._http, "post", return_value=mock_resp) as mock_post:
            res = self.client.tokenize("Hello Alice")
            self.assertEqual(res.sanitized_text, "Hello PERSON_1")
            self.assertEqual(res.session_id, "sess_abc")
            self.assertEqual(res.kms_status, "BYOK-AES-256-GCM")

            # Check that encryption key header was sent
            call_kwargs = mock_post.call_args[1]
            self.assertEqual(call_kwargs["headers"].get("x-vault-encryption-key"), "test-key")

    def test_detokenize_success(self):
        mock_resp = httpx.Response(
            status_code=200,
            json={
                "rehydratedText": "Hello Alice",
                "tokensResolved": 1,
                "sessionStatus": "purged",
            },
        )
        with patch.object(self.client._http, "post", return_value=mock_resp):
            res = self.client.detokenize(
                session_id="sess_abc",
                tokenized_text="Hello PERSON_1",
                purge_after_read=True,
            )
            self.assertEqual(res.rehydrated_text, "Hello Alice")
            self.assertEqual(res.tokens_resolved, 1)

    def test_kms_error_handling(self):
        mock_resp = httpx.Response(
            status_code=401,
            json={
                "error": {
                    "message": "Vault session encrypted with KMS passphrase.",
                    "type": "kms_key_required_error",
                }
            },
        )
        with patch.object(self.client._http, "post", return_value=mock_resp):
            with self.assertRaises(KmsError):
                self.client.detokenize("sess_enc", "Hello PERSON_1")

    def test_session_expired_error(self):
        mock_resp = httpx.Response(
            status_code=404,
            json={
                "error": {
                    "message": "Session expired or already purged.",
                    "type": "session_expired_error",
                }
            },
        )
        with patch.object(self.client._http, "post", return_value=mock_resp):
            with self.assertRaises(SessionExpiredError):
                self.client.detokenize("sess_expired", "Hello PERSON_1")

    def test_privacy_session_context_manager(self):
        tok_resp = httpx.Response(
            status_code=200,
            json={
                "mode": "structural",
                "sessionId": "sess_ctx_1",
                "sanitizedText": "Card CARD_1",
                "entitiesCount": 1,
                "entitiesDetected": [{"ruleId": "RULE_CREDIT_CARD", "token": "CARD_1"}],
                "categoriesApplied": ["global"],
            },
        )
        detok_resp = httpx.Response(
            status_code=200,
            json={
                "rehydratedText": "Card 4532-0151-1283-0366",
                "tokensResolved": 1,
                "sessionStatus": "active",
            },
        )

        with patch.object(self.client._http, "post", side_effect=[tok_resp, detok_resp]):
            with self.client.session() as sess:
                sanitized = sess.tokenize("Card 4532-0151-1283-0366")
                self.assertEqual(sanitized, "Card CARD_1")
                self.assertEqual(sess.session_id, "sess_ctx_1")

                rehydrated = sess.detokenize("Processed Card CARD_1")
                self.assertEqual(rehydrated, "Card 4532-0151-1283-0366")


class TestAsyncClient(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.client = AsyncClient(base_url="http://mock-gateway/v1")

    async def asyncTearDown(self):
        await self.client.close()

    async def test_async_tokenize_and_detokenize(self):
        tok_resp = httpx.Response(
            status_code=200,
            json={
                "mode": "structural",
                "sessionId": "sess_async_1",
                "sanitizedText": "Async EMAIL_1",
                "entitiesCount": 1,
                "entitiesDetected": [{"ruleId": "RULE_EMAIL", "token": "EMAIL_1"}],
                "categoriesApplied": ["global"],
            },
        )
        detok_resp = httpx.Response(
            status_code=200,
            json={
                "rehydratedText": "Async dev@enterprise.io",
                "tokensResolved": 1,
                "sessionStatus": "purged",
            },
        )

        with patch.object(self.client._http, "post", side_effect=[tok_resp, detok_resp]):
            res = await self.client.tokenize("Async dev@enterprise.io")
            self.assertEqual(res.sanitized_text, "Async EMAIL_1")

            detok = await self.client.detokenize(res.session_id, "Async EMAIL_1")
            self.assertEqual(detok.rehydrated_text, "Async dev@enterprise.io")


if __name__ == "__main__":
    unittest.main()
