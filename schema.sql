-- =========================================================================
-- Standalone Data De-identification & Reversible Tokenization Engine Schema
-- Database: Cloudflare D1 (SQLite)
-- =========================================================================

CREATE TABLE IF NOT EXISTS token_sessions (
    session_id TEXT PRIMARY KEY,
    mapping_json TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for sub-millisecond session lookup & TTL expiration queries
CREATE INDEX IF NOT EXISTS idx_token_sessions_expires_at ON token_sessions(expires_at);

-- =========================================================================
-- API Key Authentication, Rate Limiting & Usage Metering Table
-- =========================================================================
CREATE TABLE IF NOT EXISTS api_keys (
    id TEXT PRIMARY KEY,
    key_hash TEXT UNIQUE NOT NULL,
    key_prefix TEXT NOT NULL,
    name TEXT NOT NULL,
    tier TEXT DEFAULT 'free',
    monthly_quota INTEGER DEFAULT 10000,
    requests_used INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT DEFAULT 'anonymous',
    byok_google_key TEXT,
    byok_mistral_key TEXT,
    byok_groq_key TEXT
);

CREATE INDEX IF NOT EXISTS idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);

-- =========================================================================
-- User Profiles & Enterprise Access Level Table
-- =========================================================================
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    org TEXT,
    org_website TEXT,
    invitation_code TEXT,
    access_level TEXT DEFAULT 'Free',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    subscription_started_at DATETIME,
    subscription_expires_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- =========================================================================
-- Admin Invitation Codes Table
-- =========================================================================
CREATE TABLE IF NOT EXISTS invitation_codes (
    code TEXT PRIMARY KEY,
    description TEXT,
    max_uses INTEGER DEFAULT 1,
    uses_count INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_invitation_codes_active ON invitation_codes(is_active);

-- =========================================================================
-- API Request & Usage Logs Table (Account-Exclusive Telemetry)
-- =========================================================================
CREATE TABLE IF NOT EXISTS api_request_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    api_key_id TEXT NOT NULL,
    api_key_prefix TEXT NOT NULL,
    model TEXT NOT NULL,
    prompt_tokens INTEGER DEFAULT 0,
    completion_tokens INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    protected_entity_count INTEGER DEFAULT 0,
    status_code INTEGER DEFAULT 200,
    latency_ms REAL DEFAULT 0,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_logs_api_key_id ON api_request_logs(api_key_id);
CREATE INDEX IF NOT EXISTS idx_logs_user_id ON api_request_logs(user_id);

-- =========================================================================
-- Free Tier Sliding Window Rate Limits
-- =========================================================================
CREATE TABLE IF NOT EXISTS free_tier_rate_limits (
    client_id TEXT PRIMARY KEY,
    last_request_time INTEGER NOT NULL
);

-- =========================================================================
-- Daily Quota Usage Metering Table
-- =========================================================================
CREATE TABLE IF NOT EXISTS daily_usage_limits (
    usage_key TEXT PRIMARY KEY,
    client_id TEXT NOT NULL,
    day_date TEXT NOT NULL,
    request_count INTEGER NOT NULL DEFAULT 0,
    updated_at INTEGER NOT NULL
);

