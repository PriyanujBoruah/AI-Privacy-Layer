// ============================================================================
// ProjectSPG - Sovereign AI Privacy Policy
// Routes: /privacy, /privacy-policy
// ============================================================================

export const PRIVACY_POLICY_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy | ProjectSPG Sovereign AI Privacy Gateway</title>
  <meta name="description" content="Official Privacy Policy for ProjectSPG. Learn how our zero-retention, edge-native privacy architecture protects sensitive prompts and adheres to GDPR, HIPAA, DPDP, and 109 global jurisdictions.">
  <meta name="keywords" content="ProjectSPG Privacy Policy, AI Privacy, Zero Data Retention, GDPR AI Compliance, HIPAA AI Safe Harbor, DPDP Act 2023, Sovereign AI Gateway">
  
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://projectspg.info/privacy">
  <meta property="og:title" content="Privacy Policy | ProjectSPG Sovereign AI Privacy Gateway">
  <meta property="og:description" content="Zero data retention, hardware KMS envelope isolation, and 109-country sovereign privacy compliance.">

  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" href="/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
    code, pre { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-[#fcfdfd] text-gray-900 antialiased min-h-screen flex flex-col justify-between selection:bg-[#f0523d]/20 selection:text-[#f0523d]">

  <!-- Top Floating Header -->
  <header class="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/80 z-50">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2.5">
        <div class="w-7 h-7 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 1024 1024" fill="none" class="w-full h-full">
            <rect x="307" y="486" width="410" height="52" rx="26" fill="#000000" />
            <rect x="16" y="233" width="441" height="557" rx="80" fill="#F0523D" />
            <rect x="567" y="233" width="441" height="557" rx="80" fill="#2663EA" />
            <circle cx="236.5" cy="511.5" r="68.5" fill="#2663EA" />
            <circle cx="787.5" cy="511.5" r="68.5" fill="#F0523D" />
          </svg>
        </div>
        <span class="font-bold text-[17px] tracking-tight text-gray-900">project<span class="text-[#f0523d]">spg</span></span>
      </a>

      <div class="flex items-center gap-4 text-xs font-medium">
        <a href="/" class="text-gray-600 hover:text-gray-950 transition">← Back to Overview</a>
        <a href="/terms" class="text-gray-600 hover:text-gray-950 transition">Terms of Service</a>
      </div>
    </div>
  </header>

  <!-- Main Legal Container -->
  <main class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 w-full">
    
    <!-- Header Block -->
    <div class="mb-12 border-b border-gray-200/80 pb-8">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0523d]/10 border border-[#f0523d]/30 text-[#f0523d] text-[10.5px] font-bold tracking-widest uppercase mb-4 shadow-2xs">
        <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
        <span>LEGAL &amp; COMPLIANCE DISCLOSURE</span>
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-tight">
        Privacy Policy
      </h1>
      <p class="text-sm sm:text-base text-gray-500 mt-3 font-normal">
        Effective Date: October 5, 2026 &bull; Version 1.4 &bull; Global Sovereign Edition
      </p>
    </div>

    <!-- Executive Summary Card -->
    <div class="bg-gradient-to-br from-emerald-50/70 via-white to-sky-50/50 rounded-2xl border border-emerald-200/80 p-6 sm:p-7 mb-10 shadow-xs">
      <div class="flex items-start gap-3.5">
        <div class="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <i data-lucide="lock" class="w-4 h-4"></i>
        </div>
        <div>
          <h2 class="text-base font-bold text-gray-900">Our Core Privacy Commitment: Zero Plaintext Retention</h2>
          <p class="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
            ProjectSPG operates on a mathematically enforced <strong>Zero-Retention Ephemeral Architecture</strong>. When you send prompts or request vector embeddings through our AI Privacy Gateway, your raw text is sanitized in volatile memory (RAM) at the Cloudflare Edge, substituted with cryptographic tokens, proxied to upstream models, and rehydrated back to you. We <strong>never store, log, index, or train on your raw prompts, sensitive data, or model completions</strong>.
          </p>
        </div>
      </div>
    </div>

    <!-- Article Content -->
    <article class="prose prose-gray max-w-none text-sm sm:text-base leading-relaxed space-y-8 text-gray-700">

      <!-- Section 1 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>1. Introduction &amp; Who We Are</span>
        </h2>
        <p>
          ProjectSPG ("we", "us", "our") provides enterprise-grade AI security, data de-identification, and sovereign regulatory proxy services accessible via our dashboard (<a href="https://projectspg.info" class="text-[#f0523d] hover:underline font-medium">projectspg.info</a>), drop-in wire-compatible APIs (<a href="https://api.projectspg.info" class="text-[#f0523d] hover:underline font-medium">api.projectspg.info</a>), and associated SDKs.
        </p>
        <p>
          This Privacy Policy explains how information is processed when you access our platform, use our API keys, and route LLM prompts through our sovereign gateway. For the purposes of the General Data Protection Regulation (GDPR) and international privacy laws, ProjectSPG acts primarily as a <strong>Data Processor</strong> when proxying user prompts, and as an independent <strong>Data Controller</strong> solely for basic account management data.
        </p>
      </section>

      <!-- Section 2 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>2. Data We Process &amp; How It Is Handled</span>
        </h2>
        <div class="space-y-4">
          <div class="p-4 rounded-xl bg-gray-50 border border-gray-200/70">
            <h3 class="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
              <i data-lucide="cpu" class="w-4 h-4 text-[#f0523d]"></i>
              A. Ephemeral Inference Data (Prompts, Completions, Embeddings)
            </h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              When routing traffic through <code>/v1/chat/completions</code> or <code>/v1/embeddings</code>, our engine inspects text for personally identifiable information (PII), protected health information (PHI), payment card data, and regional identifiers across 109 sovereign jurisdictions.
            </p>
            <ul class="list-disc list-inside text-xs text-gray-600 mt-2 space-y-1">
              <li><strong>Volatile Edge RAM Only:</strong> Processing occurs in isolated Cloudflare V8 worker memory.</li>
              <li><strong>Zero Persistent Storage:</strong> Raw prompts and rehydration maps are purged the microsecond the HTTP streaming response terminates.</li>
              <li><strong>No Model Training:</strong> Neither ProjectSPG nor our underlying upstream proxies ever use your prompts to train AI models.</li>
            </ul>
          </div>

          <div class="p-4 rounded-xl bg-gray-50 border border-gray-200/70">
            <h3 class="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
              <i data-lucide="user-check" class="w-4 h-4 text-[#f0523d]"></i>
              B. Account &amp; Authentication Information
            </h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              When registering or logging in via Google Firebase Authentication, we store strictly necessary profile attributes in our Cloudflare D1 database:
            </p>
            <ul class="list-disc list-inside text-xs text-gray-600 mt-2 space-y-1">
              <li>Firebase User ID (UID), Email Address, and Display Name.</li>
              <li>Organization Name and Primary Website (provided during onboarding).</li>
              <li>Account Tier (Free, Pro, Custom) and Subscription Expiration Timestamp.</li>
              <li>API Keys: Stored solely as cryptographic SHA-256 salted hashes. We cannot decrypt or read your secret keys once generated.</li>
            </ul>
          </div>

          <div class="p-4 rounded-xl bg-gray-50 border border-gray-200/70">
            <h3 class="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
              <i data-lucide="key" class="w-4 h-4 text-[#f0523d]"></i>
              C. Bring Your Own Key (BYOK) Credentials
            </h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              When configuring third-party credentials (Google AI Studio, Mistral AI, Groq Cloud) for unmetered BYOK inference, your keys are stored exclusively in your browser's encrypted <code>localStorage</code> or transmitted securely via HTTPS authorization headers. ProjectSPG never stores your provider API keys in persistent backend databases.
            </p>
          </div>

          <div class="p-4 rounded-xl bg-gray-50 border border-gray-200/70">
            <h3 class="font-bold text-gray-900 text-sm mb-1 flex items-center gap-2">
              <i data-lucide="activity" class="w-4 h-4 text-[#f0523d]"></i>
              D. SIEM Audit Logs &amp; Operational Telemetry
            </h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              For security auditing and compliance verification, our gateway records anonymized telemetry in a short-lived circular ring buffer:
            </p>
            <ul class="list-disc list-inside text-xs text-gray-600 mt-2 space-y-1">
              <li>Timestamp, Model Identifier, Token Usage, and Gateway Latency (microseconds).</li>
              <li>Rule IDs triggered (e.g. <code>RULE_EMAIL</code>, <code>RULE_IBAN</code>) and one-way SHA-256 entity hashes for audit verification.</li>
              <li><strong>Zero Plaintext:</strong> Audit logs contain strictly mathematical proofs and never contain plaintext personal data.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Section 3 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>3. Global Sovereign Compliance Matrix</span>
        </h2>
        <p>
          ProjectSPG is engineered to satisfy the strictest international data residency and privacy mandates across 109 nations, including:
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-lg border border-gray-200 bg-white">
            <span class="font-bold text-gray-900 block">EU GDPR &amp; EU AI Act</span>
            <span class="text-gray-500">Regulation (EU) 2016/679 &amp; (EU) 2024/1689. Guarantees zero cross-border transfer of unmasked PII.</span>
          </div>
          <div class="p-3 rounded-lg border border-gray-200 bg-white">
            <span class="font-bold text-gray-900 block">US HIPAA Safe Harbor</span>
            <span class="text-gray-500">45 CFR § 164.514(b)(2). Intercepts and masks all 18 canonical HIPAA Protected Health Information identifiers.</span>
          </div>
          <div class="p-3 rounded-lg border border-gray-200 bg-white">
            <span class="font-bold text-gray-900 block">India DPDP Act 2023</span>
            <span class="text-gray-500">Digital Personal Data Protection Act. Real-time masking of Aadhaar, PAN, and local financial identifiers.</span>
          </div>
          <div class="p-3 rounded-lg border border-gray-200 bg-white">
            <span class="font-bold text-gray-900 block">Singapore PDPA &amp; ASEAN</span>
            <span class="text-gray-500">Personal Data Protection Act 2012 and cross-border regional data governance protocols.</span>
          </div>
        </div>
      </section>

      <!-- Section 4 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>4. Legal Bases for Processing (GDPR Article 6)</span>
        </h2>
        <p>We process data under the following recognized legal grounds:</p>
        <ul class="list-disc list-inside space-y-1.5 text-xs sm:text-sm">
          <li><strong>Performance of a Contract:</strong> Providing edge proxying, de-identification, and authentication services requested by you.</li>
          <li><strong>Legitimate Interests:</strong> Protecting the security, uptime, and cryptographic integrity of our edge infrastructure against malicious injection, brute-force attacks, and abusive usage.</li>
          <li><strong>Compliance with Legal Obligations:</strong> Satisfying mandatory legal and tax accounting requirements for subscription transactions.</li>
          <li><strong>Consent:</strong> Where explicitly provided (e.g., customized telemetry settings via Consent Preferences).</li>
        </ul>
      </section>

      <!-- Section 5 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>5. Third-Party Sub-Processors &amp; Infrastructure</span>
        </h2>
        <p>To deliver zero-latency edge security, we partner with verified, enterprise-tier infrastructure providers bound by strict Data Processing Agreements (DPAs):</p>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border border-gray-200 rounded-lg overflow-hidden">
            <thead class="bg-gray-50 text-gray-700 font-bold">
              <tr>
                <th class="p-3 border-b">Sub-Processor</th>
                <th class="p-3 border-b">Role / Function</th>
                <th class="p-3 border-b">Data Residency / Security</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr>
                <td class="p-3 font-semibold text-gray-900">Cloudflare, Inc.</td>
                <td class="p-3 text-gray-600">Edge Compute (Workers), D1 SQL, and CDN</td>
                <td class="p-3 text-gray-600">ISO 27001, SOC 2 Type II, Global Anycast</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold text-gray-900">Google Cloud / Firebase</td>
                <td class="p-3 text-gray-600">Identity Authentication Service</td>
                <td class="p-3 text-gray-600">OAuth 2.0, FIPS 140-2 Level 3 KMS</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold text-gray-900">Upstream LLMs (Mistral / Google / Groq)</td>
                <td class="p-3 text-gray-600">Inference Providers (Sanitized Prompts Only)</td>
                <td class="p-3 text-gray-600">Receives strictly tokenized/pseudonymized payloads</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 6 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>6. Your Rights &amp; Control (GDPR / CCPA / DPDP)</span>
        </h2>
        <p>Regardless of your geographic location, ProjectSPG affords you full sovereign control over your information:</p>
        <ul class="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-600">
          <li><strong>Right to Know &amp; Access:</strong> You can review your account profile and inspect generated API keys at any time via the dashboard.</li>
          <li><strong>Right to Rectification:</strong> Update organization or contact information instantly through your User Settings modal.</li>
          <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request immediate and complete purging of your account and hashed API keys by emailing <a href="mailto:priyanujboruah@outlook.com" class="text-[#f0523d] hover:underline font-medium">priyanujboruah@outlook.com</a>.</li>
          <li><strong>Right to Restrict or Object:</strong> Configure your telemetry settings at any time via our Consent Preferences panel.</li>
        </ul>
      </section>

      <!-- Section 7 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>7. Data Security Measures</span>
        </h2>
        <p>
          We employ state-of-the-art cryptographic safeguards including TLS 1.3 in transit, AES-256-GCM envelope encryption, automated KMS hardware rotation, strict CORS isolation, zero-knowledge token masking, and continuous SIEM monitoring. Our edge workers maintain no disk persistence, completely eliminating lingering data vectors.
        </p>
      </section>

      <!-- Section 8 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>8. Contact &amp; Data Protection Officer</span>
        </h2>
        <p>
          If you have questions, regulatory audit inquiries, or wish to exercise your data subject rights under GDPR, HIPAA, or DPDP, please reach out to our dedicated privacy security team:
        </p>
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm font-mono space-y-1">
          <div><span class="text-gray-400">Email:</span> <a href="mailto:priyanujboruah@outlook.com" class="text-[#f0523d] font-bold hover:underline">priyanujboruah@outlook.com</a></div>
          <div><span class="text-gray-400">Security Office:</span> <a href="mailto:priyanujboruah@outlook.com" class="text-gray-800 hover:underline">priyanujboruah@outlook.com</a></div>
          <div><span class="text-gray-400">Official URL:</span> <a href="https://projectspg.info" class="text-gray-800 hover:underline">https://projectspg.info</a></div>
        </div>
      </section>

    </article>

  </main>

  <!-- Legal Footer -->
  <footer class="border-t border-gray-200 bg-white py-8">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
      <div>&copy; 2026 ProjectSPG. All Rights Reserved.</div>
      <div class="flex items-center gap-6">
        <a href="/" class="hover:text-gray-950 transition">Home</a>
        <a href="/privacy" class="text-gray-950 font-bold transition">Privacy Policy</a>
        <a href="/terms" class="hover:text-gray-950 transition">Terms of Service</a>
      </div>
    </div>
  </footer>

  <script>
    if (window.lucide) window.lucide.createIcons();
  </script>
</body>
</html>`;
