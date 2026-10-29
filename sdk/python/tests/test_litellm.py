import unittest
import os
import sys
from unittest.mock import MagicMock, AsyncMock

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from ai_privacy_core.integrations.litellm import LiteLLMPrivacyHook
from ai_privacy_core.models import TokenizeResult, RehydrateResult


class MockLiteLLMChoice:
    def __init__(self, content: str):
        self.message = MagicMock(content=content)


class MockLiteLLMResponse:
    def __init__(self, content: str):
        self.choices = [MockLiteLLMChoice(content)]


class TestLiteLLMIntegration(unittest.TestCase):
    def setUp(self):
        self.mock_client = MagicMock()
        self.mock_async_client = MagicMock()
        self.hook = LiteLLMPrivacyHook(
            base_url="http://mock-gateway/v1",
            client=self.mock_client,
            async_client=self.mock_async_client,
            encryption_key="kms-litellm",
        )

    def test_log_pre_api_call_sanitizes_messages(self):
        self.mock_client.tokenize.return_value = TokenizeResult(
            mode="structural",
            session_id="sess_lite_1",
            sanitized_text="Transfer to CARD_1",
            entities_count=1,
        )

        messages = [{"role": "user", "content": "Transfer to 4532-0151-1283-0366"}]
        kwargs = {}

        self.hook.log_pre_api_call("gpt-4o", messages, kwargs)

        self.assertEqual(messages[0]["content"], "Transfer to CARD_1")
        self.assertEqual(kwargs["metadata"]["_ai_privacy_session_id"], "sess_lite_1")

    def test_log_post_api_call_rehydrates_response(self):
        self.mock_client.detokenize.return_value = RehydrateResult(
            rehydrated_text="Payment processed for 4532-0151-1283-0366",
            tokens_resolved=1,
            session_status="active",
        )

        kwargs = {"metadata": {"_ai_privacy_session_id": "sess_lite_1"}}
        response_obj = MockLiteLLMResponse("Payment processed for CARD_1")

        self.hook.log_post_api_call(kwargs, response_obj, None, None)

        self.assertEqual(
            response_obj.choices[0].message.content,
            "Payment processed for 4532-0151-1283-0366",
        )

    def test_dict_response_rehydration(self):
        self.mock_client.detokenize.return_value = RehydrateResult(
            rehydrated_text="Payment processed for 4532-0151-1283-0366",
            tokens_resolved=1,
            session_status="active",
        )

        kwargs = {"metadata": {"_ai_privacy_session_id": "sess_lite_1"}}
        response_dict = {
            "choices": [{"message": {"content": "Payment processed for CARD_1"}}]
        }

        self.hook.log_post_api_call(kwargs, response_dict, None, None)

        self.assertEqual(
            response_dict["choices"][0]["message"]["content"],
            "Payment processed for 4532-0151-1283-0366",
        )


class TestAsyncLiteLLMIntegration(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.mock_async_client = MagicMock()
        self.mock_async_client.tokenize = AsyncMock()
        self.mock_async_client.detokenize = AsyncMock()

        self.hook = LiteLLMPrivacyHook(
            base_url="http://mock-gateway/v1",
            async_client=self.mock_async_client,
        )

    async def test_async_pre_call_hook(self):
        self.mock_async_client.tokenize.return_value = TokenizeResult(
            mode="structural",
            session_id="sess_async_lite",
            sanitized_text="Async CARD_1",
            entities_count=1,
        )

        data = {"messages": [{"role": "user", "content": "Async 4532-0151-1283-0366"}]}
        result_data = await self.hook.async_pre_call_hook({}, None, data, "completion")

        self.assertEqual(result_data["messages"][0]["content"], "Async CARD_1")
        self.assertEqual(result_data["metadata"]["_ai_privacy_session_id"], "sess_async_lite")

    async def test_async_post_call_success_hook(self):
        self.mock_async_client.detokenize.return_value = RehydrateResult(
            rehydrated_text="Async 4532-0151-1283-0366 confirmed",
            tokens_resolved=1,
            session_status="purged",
        )

        data = {"metadata": {"_ai_privacy_session_id": "sess_async_lite"}}
        response_obj = MockLiteLLMResponse("Async CARD_1 confirmed")

        final_response = await self.hook.async_post_call_success_hook(data, {}, response_obj)
        self.assertEqual(
            final_response.choices[0].message.content,
            "Async 4532-0151-1283-0366 confirmed",
        )


if __name__ == "__main__":
    unittest.main()
