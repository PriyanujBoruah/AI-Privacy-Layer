import unittest
import os
import sys
from unittest.mock import MagicMock

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from ai_privacy_core.integrations.langchain import PrivacyCallbackHandler
from ai_privacy_core.models import TokenizeResult, RehydrateResult


class MockGeneration:
    def __init__(self, text: str):
        self.text = text


class MockLLMResult:
    def __init__(self, generations):
        self.generations = generations


class MockMessage:
    def __init__(self, content: str):
        self.content = content


class TestLangChainIntegration(unittest.TestCase):
    def setUp(self):
        self.mock_client = MagicMock()
        self.handler = PrivacyCallbackHandler(
            base_url="http://mock-gateway/v1",
            client=self.mock_client,
            encryption_key="test-kms",
            categories=["global", "north_america"],
        )

    def test_on_llm_start_sanitizes_prompts_in_place(self):
        self.mock_client.tokenize.return_value = TokenizeResult(
            mode="structural",
            session_id="sess_lc_1",
            sanitized_text="Check balance for SSN_1",
            entities_count=1,
        )

        prompts = ["Check balance for 123-45-6789"]
        self.handler.on_llm_start(
            serialized={},
            prompts=prompts,
            run_id="run_101",
        )

        # Prompt string was replaced in-place
        self.assertEqual(prompts[0], "Check balance for SSN_1")
        self.assertEqual(self.handler._run_sessions.get("run_101"), "sess_lc_1")

    def test_on_llm_end_rehydrates_generations(self):
        # Setup session for run_101
        self.handler._run_sessions["run_101"] = "sess_lc_1"
        self.mock_client.detokenize.return_value = RehydrateResult(
            rehydrated_text="Account for 123-45-6789 is active.",
            tokens_resolved=1,
            session_status="active",
        )

        llm_result = MockLLMResult(
            generations=[[MockGeneration("Account for SSN_1 is active.")]]
        )

        self.handler.on_llm_end(llm_result, run_id="run_101")

        # Response text was rehydrated in-place
        self.assertEqual(
            llm_result.generations[0][0].text,
            "Account for 123-45-6789 is active.",
        )
        # Session was cleaned up from active tracking
        self.assertNotIn("run_101", self.handler._run_sessions)

    def test_on_chat_model_start_sanitizes_message_content(self):
        self.mock_client.tokenize.return_value = TokenizeResult(
            mode="structural",
            session_id="sess_lc_chat",
            sanitized_text="My email is EMAIL_1",
            entities_count=1,
        )

        msg = MockMessage("My email is alice@corp.com")
        messages = [[msg]]

        self.handler.on_chat_model_start(
            serialized={},
            messages=messages,
            run_id="run_chat_1",
        )

        self.assertEqual(msg.content, "My email is EMAIL_1")
        self.assertEqual(self.handler._run_sessions.get("run_chat_1"), "sess_lc_chat")


if __name__ == "__main__":
    unittest.main()
