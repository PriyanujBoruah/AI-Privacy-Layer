// ============================================================================
// ProjectSPG - Sovereign AI Terms of Service
// Routes: /terms, /terms-of-service
// ============================================================================

export const TERMS_OF_SERVICE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Service | ProjectSPG Sovereign AI Privacy Gateway</title>
  <meta name="description" content="Official Terms of Service for ProjectSPG. Understand the acceptable use, API quotas, customer data ownership, BYOK pass-through rights, and SLAs governing ProjectSPG.">
  <meta name="keywords" content="ProjectSPG Terms of Service, AI Privacy Terms, AI Security Layer Agreement, API Terms, BYOK Model Terms">
  
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://projectspg.info/terms">
  <meta property="og:title" content="Terms of Service | ProjectSPG Sovereign AI Privacy Gateway">
  <meta property="og:description" content="Terms governing the use of ProjectSPG AI Security Layer, wire-compatible proxy APIs, and sovereign enclaves.">

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
        <a href="/privacy" class="text-gray-600 hover:text-gray-950 transition">Privacy Policy</a>
      </div>
    </div>
  </header>

  <!-- Main Legal Container -->
  <main class="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 w-full">
    
    <!-- Header Block -->
    <div class="mb-12 border-b border-gray-200/80 pb-8">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0523d]/10 border border-[#f0523d]/30 text-[#f0523d] text-[10.5px] font-bold tracking-widest uppercase mb-4 shadow-2xs">
        <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
        <span>MASTER SERVICE AGREEMENT</span>
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-tight">
        Terms of Service
      </h1>
      <p class="text-sm sm:text-base text-gray-500 mt-3 font-normal">
        Last Updated: October 5, 2026 &bull; Version 1.4 &bull; Global Sovereign Terms
      </p>
    </div>

    <!-- Article Content -->
    <article class="prose prose-gray max-w-none text-sm sm:text-base leading-relaxed space-y-8 text-gray-700">

      <!-- Section 1 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>1. Acceptance of Terms</span>
        </h2>
        <p>
          These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "Customer", or "you") and ProjectSPG ("ProjectSPG", "we", "us", or "our") governing your access to and use of the ProjectSPG website, web console, wire-compatible AI gateway APIs (<code>api.projectspg.info</code>), and open-source SDK components (collectively, the "Service").
        </p>
        <p>
          By creating an account, generating an API key, or sending HTTP requests to our gateway endpoints, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <a href="/privacy" class="text-[#f0523d] hover:underline font-semibold">Privacy Policy</a>. If you are entering into these Terms on behalf of an enterprise or entity, you represent and warrant that you possess the requisite legal authority to bind such entity.
        </p>
      </section>

      <!-- Section 2 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>2. Description of the Service &amp; Zero-Retention Architecture</span>
        </h2>
        <p>
          ProjectSPG provides a zero-code, drop-in AI privacy layer designed to intercept sensitive prompts, replace proprietary/PII entities with format-preserving cryptographic tokens, relay sanitized queries to upstream LLM providers (including Mistral AI, Google Gemini, and Groq Cloud), and rehydrate the model's output in real time.
        </p>
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-200/80 text-xs sm:text-sm text-gray-700 space-y-2">
          <div class="font-bold text-gray-900 flex items-center gap-1.5">
            <i data-lucide="shield" class="w-4 h-4 text-[#f0523d]"></i>
            Guaranteed Customer Data Integrity:
          </div>
          <p>
            You retain <strong>100% exclusive intellectual property ownership</strong> of all prompts, text payloads, proprietary business documents, and AI-generated outputs transmitted through our platform. ProjectSPG acquires no rights, title, or interest in your data.
          </p>
          <p>
            ProjectSPG <strong>never uses, stores, logs, or utilizes customer prompts or model responses</strong> to train, fine-tune, or benchmark public foundation models.
          </p>
        </div>
      </section>

      <!-- Section 3 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>3. Accounts, Access Keys &amp; Invitation Quotas</span>
        </h2>
        <ul class="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-600">
          <li><strong>Account Authenticity:</strong> You agree to provide accurate and verifiable organizational credentials when enrolling through Firebase authentication or submitting private beta access requests.</li>
          <li><strong>API Key Security:</strong> You are solely responsible for maintaining the confidentiality of generated ProjectSPG secret keys (<code>spg_live_...</code>). Any request authenticated with your API key will be deemed authorized by you. You must notify us immediately if you suspect compromised credentials.</li>
          <li><strong>Private Beta &amp; Invitation Access:</strong> During exclusive onboarding phases, access may be restricted to verified invitation codes. Verified Pro invitation passes remain valid for <strong>1 full year (365 days)</strong> from the date of activation unless terminated sooner for terms violations.</li>
        </ul>
      </section>

      <!-- Section 4 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>4. Subscription Tiers &amp; Commercial Billing</span>
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div class="p-3.5 rounded-xl border border-gray-200 bg-white">
            <span class="font-bold text-gray-900 text-sm block">Community (Free)</span>
            <span class="text-gray-500 mt-1 block">Provided at $0 forever. Includes standard Mistral models, basic de-identification, and a shared edge gateway rate limit of 60 requests per minute.</span>
          </div>
          <div class="p-3.5 rounded-xl border border-[#f0523d]/40 bg-[#f0523d]/[0.02]">
            <span class="font-bold text-[#f0523d] text-sm block">Sovereign Pro</span>
            <span class="text-gray-600 mt-1 block">$67/mo (or $49/mo if billed yearly). Unlocks all LLM providers, zero rate-limiting BYOK pass-through, hardware KMS envelopes, and all 10 compliance packs.</span>
          </div>
          <div class="p-3.5 rounded-xl border border-gray-200 bg-white">
            <span class="font-bold text-gray-900 text-sm block">Custom / Enterprise</span>
            <span class="text-gray-500 mt-1 block">Bespoke pricing. Dedicated VPC/on-prem enclaves, custom NER dictionaries, 109-country sovereign routing, and signed BAA/SOC 2 Type II attestations.</span>
          </div>
        </div>
      </section>

      <!-- Section 5 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>5. Bring Your Own Key (BYOK) Pass-Through Policy</span>
        </h2>
        <p>
          ProjectSPG supports unmetered BYOK mode, allowing customers to supply their own credentials for Google Gemini, Mistral AI, and Groq Cloud. When utilizing BYOK:
        </p>
        <ul class="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-600">
          <li>You maintain your own direct contractual relationship and billing agreement with the respective LLM providers.</li>
          <li>ProjectSPG is not liable for third-party upstream API downtime, model deprecations, provider-side outages, or billing incurred on your provider accounts.</li>
          <li>Your BYOK keys are passed encrypted directly to upstream providers and are never retained or logged on ProjectSPG backend databases.</li>
        </ul>
      </section>

      <!-- Section 6 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>6. Acceptable Use Policy (AUP)</span>
        </h2>
        <p>You agree not to use the Service to:</p>
        <ul class="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-gray-600">
          <li>Violate any applicable national, regional, or international laws, including sanctions and export controls.</li>
          <li>Transmit malicious prompt injection payloads designed to compromise upstream model safety alignments.</li>
          <li>Attempt to reverse-engineer, decompile, or reconstruct the underlying hardware KMS envelope encryption tokens or proprietary NER regex engines.</li>
          <li>Execute automated denial-of-service (DDoS) attacks or circumvent rate-limiting guardrails on shared edge tiers.</li>
          <li>Facilitate unauthorized exfiltration of protected corporate or governmental secrets in breach of confidentiality covenants.</li>
        </ul>
      </section>

      <!-- Section 7 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>7. Service Level Agreements &amp; Uptime Disclaimers</span>
        </h2>
        <p>
          Free and community tiers are provided on an "AS IS" and "AS AVAILABLE" basis without uptime warranties. Dedicated Enterprise enclaves operate under explicit Service Level Agreements (SLAs) with a 99.99% edge availability commitment, subject to planned maintenance and upstream cloud network dependencies.
        </p>
      </section>

      <!-- Section 8 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>8. Limitation of Liability &amp; Indemnification</span>
        </h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL PROJECTSPG, ITS DIRECTORS, EMPLOYEES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THE SERVICE.
        </p>
        <p>
          You agree to defend, indemnify, and hold harmless ProjectSPG against any third-party claims, liabilities, damages, and expenses (including reasonable attorneys' fees) arising out of your violation of these Terms or your misuse of third-party API credentials.
        </p>
      </section>

      <!-- Section 9 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>9. Governing Law &amp; Dispute Resolution</span>
        </h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws governing international technology and cloud service contracts, without giving effect to conflict of law principles. Any dispute arising under or in connection with these Terms shall be resolved through confidential, binding arbitration administered under internationally recognized commercial arbitration rules.
        </p>
      </section>

      <!-- Section 10 -->
      <section class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span>10. Contact &amp; Legal Notices</span>
        </h2>
        <p>For inquiries, enterprise MSA negotiations, or legal notices regarding these Terms, contact our legal counsel:</p>
        <div class="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm font-mono space-y-1">
          <div><span class="text-gray-400">Direct &amp; Legal:</span> <a href="mailto:priyanujboruah@outlook.com" class="text-[#f0523d] font-bold hover:underline">priyanujboruah@outlook.com</a></div>
          <div><span class="text-gray-400">Enterprise Enquiries:</span> <a href="mailto:priyanujboruah@outlook.com" class="text-gray-800 hover:underline">priyanujboruah@outlook.com</a></div>
          <div><span class="text-gray-400">Website:</span> <a href="https://projectspg.info" class="text-gray-800 hover:underline">https://projectspg.info</a></div>
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
        <a href="/privacy" class="hover:text-gray-950 transition">Privacy Policy</a>
        <a href="/terms" class="text-gray-950 font-bold transition">Terms of Service</a>
      </div>
    </div>
  </footer>

  <script>
    if (window.lucide) window.lucide.createIcons();
  </script>
</body>
</html>`;
