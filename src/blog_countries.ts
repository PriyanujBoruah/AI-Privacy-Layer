// ============================================================================
// ProjectSPG - Global Sovereign AI Privacy & Supported Countries Blog
// Matches clean, text-focused editorial layout from Together.ai blog
// Routes: /blog/countries, /countries, /supported-countries
// ============================================================================

export const COUNTRIES_BLOG_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Global Sovereign AI Privacy: 109 Jurisdictions Supported by ProjectSPG | ProjectSPG</title>
  <meta name="description" content="Discover how ProjectSPG protects sensitive enterprise data across 109 sovereign jurisdictions, 10 global regions, and regulations including GDPR, India DPDP, Singapore PDPA, and HIPAA with zero code changes.">
  <meta name="keywords" content="Global AI Privacy, Sovereign AI, 109 Jurisdictions, GDPR LLM Proxy, India DPDP Act, Singapore PDPA, HIPAA Compliance, Cross-Border AI Security, PII Redaction, Tokenization Engine">
  
  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://projectspg.info/blog/countries">
  <meta property="og:title" content="Global Sovereign AI Privacy: 109 Jurisdictions Supported by ProjectSPG">
  <meta property="og:description" content="Protecting sensitive enterprise prompts across 109 sovereign jurisdictions, 10 global regions, and regulations including GDPR, India DPDP, Singapore PDPA, and HIPAA with zero code changes.">
  <meta property="og:image" content="https://projectspg.info/images/sovereign-routing-engine.png">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://projectspg.info/blog/countries">
  <meta property="twitter:title" content="Global Sovereign AI Privacy: 109 Jurisdictions Supported by ProjectSPG">
  <meta property="twitter:description" content="Protecting sensitive enterprise prompts across 109 sovereign jurisdictions, 10 global regions, and regulations including GDPR, India DPDP, Singapore PDPA, and HIPAA with zero code changes.">
  <meta property="twitter:image" content="https://projectspg.info/images/sovereign-routing-engine.png">

  <!-- Schema.org TechArticle JSON-LD for Google SEO -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Global Sovereign AI Privacy: 109 Jurisdictions Supported by ProjectSPG",
    "description": "Comprehensive audit and technical architecture of ProjectSPG's 109 supported sovereign national jurisdictions, mathematical checksums, and compliance frameworks for global enterprise LLM inference.",
    "author": {
      "@type": "Person",
      "name": "Priyanuj Boruah"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ProjectSPG",
      "url": "https://projectspg.info"
    },
    "datePublished": "2026-09-30",
    "dateModified": "2026-09-30"
  }
  </script>

  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" href="/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  
  <style>
    :root {
      --bg: #ffffff;
      --text: #111827;
      --text-muted: #4b5563;
      --text-dim: #9ca3af;
      --border: #e5e7eb;
      --primary: #0f172a;
      --accent: #f0523d;
      --blue-subtle: #eff6ff;
      --blue-border: #bfdbfe;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; font-size: 16px; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.75;
      -webkit-font-smoothing: antialiased;
    }

    /* Top Clean Floating Navbar matching Together.ai */
    .site-nav {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #0f172a;
      font-weight: 700;
      font-size: 17px;
      letter-spacing: -0.02em;
    }

    .brand-dots {
      display: flex;
      align-items: center;
      gap: 3px;
    }

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
    }

    .dot-pink { background: #ec4899; }
    .dot-orange { background: #f97316; }
    .dot-purple { background: #8b5cf6; }

    .nav-center-links {
      display: flex;
      align-items: center;
      gap: 28px;
      font-size: 13.5px;
      font-weight: 500;
      color: #4b5563;
    }

    .nav-link {
      text-decoration: none;
      color: #4b5563;
      transition: color 0.15s;
    }

    .nav-link:hover { color: #111827; }

    .nav-right-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .btn-contact {
      font-size: 12.5px;
      font-weight: 700;
      color: #111827;
      text-decoration: none;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 6px 12px;
      transition: color 0.15s;
    }

    .btn-contact:hover { color: #f0523d; }

    .btn-signin {
      background: #000000;
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 9px 18px;
      border-radius: 4px;
      text-decoration: none;
      transition: opacity 0.15s;
    }

    .btn-signin:hover { opacity: 0.85; }

    /* Page Container */
    .article-wrap {
      max-width: 1200px;
      margin: 0 auto;
      padding: 48px 24px 80px;
    }

    /* Article Header */
    .article-header {
      margin-bottom: 48px;
    }

    .meta-pills {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .badge-category {
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      color: #374151;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 3px 9px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
    }

    .meta-date {
      font-size: 11px;
      font-weight: 600;
      color: #6b7280;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
    }

    .article-title {
      font-size: 42px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      color: #111827;
      margin-bottom: 18px;
    }

    .article-lede {
      font-size: 18px;
      color: #6b7280;
      line-height: 1.6;
      max-width: 880px;
      font-weight: 400;
    }

    /* Top Grid: Left Meta + Right Visual Diagram */
    .hero-grid {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 48px;
      margin-bottom: 56px;
      padding-bottom: 48px;
      border-bottom: 1px solid #f3f4f6;
    }

    .meta-sidebar {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .meta-section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #9ca3af;
      margin-bottom: 8px;
      font-family: 'JetBrains Mono', monospace;
    }

    .authors-text {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
      line-height: 1.4;
    }

    .toc-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .toc-item {
      font-size: 13.5px;
      font-weight: 500;
      color: #4b5563;
      text-decoration: none;
      transition: color 0.15s;
    }

    .toc-item:hover { color: #111827; font-weight: 600; }

    /* Visual Architecture Box on Right */
    .hero-image-card {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;
    }

    .hero-image-card:hover {
      border-color: #cbd5e1;
      box-shadow: 0 4px 14px rgba(0,0,0,0.06);
    }

    .hero-illustration-img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 15px;
    }

    /* Main Prose Section */
    .prose-content {
      max-width: 820px;
      margin: 0 auto;
    }

    /* Editorial Callout Box */
    .editorial-callout {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 14px;
      padding: 24px 28px;
      margin-bottom: 36px;
      font-size: 15.5px;
      color: #1e3a8a;
      line-height: 1.7;
    }

    .prose-p {
      font-size: 16.5px;
      color: #374151;
      line-height: 1.8;
      margin-bottom: 24px;
    }

    .prose-quote {
      border-left: 2px solid #e5e7eb;
      padding-left: 20px;
      font-size: 15.5px;
      color: #6b7280;
      font-style: italic;
      margin: 32px 0;
      line-height: 1.7;
    }

    .prose-h2 {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #111827;
      margin-top: 48px;
      margin-bottom: 18px;
      scroll-margin-top: 80px;
    }

    .prose-h3 {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: #111827;
      margin-top: 32px;
      margin-bottom: 14px;
    }

    .prose-ul {
      list-style-type: none;
      padding: 0;
      margin-bottom: 28px;
    }

    .prose-li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 10px;
      font-size: 16px;
      color: #374151;
      line-height: 1.7;
    }

    .prose-li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #9ca3af;
      font-weight: bold;
    }

    .prose-li strong {
      color: #111827;
      font-weight: 600;
    }

    /* Key Metrics Multi-Card Container */
    .showcase-image-card {
      margin: 40px 0;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      overflow: hidden;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    .showcase-image-card:hover {
      border-color: #cbd5e1;
      box-shadow: 0 4px 14px rgba(0,0,0,0.06);
    }

    .showcase-illustration-img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 15px;
    }

    /* Minimalist Data Tables */
    .clean-table-card {
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow-x: auto;
      margin: 28px 0;
      background: #ffffff;
    }

    .clean-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 14px;
    }

    .clean-table th {
      background: #f9fafb;
      color: #374151;
      font-weight: 600;
      font-size: 11.5px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 12px 18px;
      border-bottom: 1px solid var(--border);
    }

    .clean-table td {
      padding: 12px 18px;
      border-bottom: 1px solid var(--border);
      color: #374151;
    }

    .clean-table tr:last-child td { border-bottom: none; }
    .clean-table tr:hover td { background: #fafafa; }
    .mono { font-family: 'JetBrains Mono', monospace; font-size: 13px; }

    /* Sub-region Card Container */
    .subregion-card {
      margin-top: 24px;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }

    .subregion-header {
      font-size: 17px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Terminal Code Block */
    .terminal-wrapper {
      background: #0f172a;
      border-radius: 8px;
      overflow: hidden;
      margin: 28px 0;
    }

    .terminal-top-bar {
      background: #1e293b;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #94a3b8;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
    }

    .terminal-copy-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      color: #e2e8f0;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 10.5px;
      cursor: pointer;
    }

    .terminal-pre {
      padding: 18px 20px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      line-height: 1.6;
      color: #e2e8f0;
      overflow-x: auto;
    }

    /* Interactive Verifier Box */
    .verifier-box {
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      margin: 32px 0;
      background: #fafafa;
    }

    .verifier-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .verifier-input {
      width: 100%;
      height: 90px;
      padding: 12px;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      outline: none;
      resize: vertical;
      background: #ffffff;
      margin-bottom: 12px;
    }

    .verifier-input:focus { border-color: #000000; }

    .verifier-output {
      padding: 12px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12.5px;
      min-height: 90px;
      word-break: break-all;
      white-space: pre-wrap;
    }

    .table-tag {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
    }
    .tag-blue { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
    .tag-purple { background: #faf5ff; color: #7e22ce; border: 1px solid #e9d5ff; }
    .tag-green { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
    .tag-amber { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
    .tag-rose { background: #fff1f2; color: #be123c; border: 1px solid #fecdd3; }

    @media (max-width: 900px) {
      .hero-grid { grid-template-columns: 1fr; gap: 32px; }
      .nav-center-links { display: none; }
      .article-title { font-size: 32px; }
    }
  </style>
</head>
<body>

  <!-- Top Clean Navigation Bar -->
  <nav class="site-nav">
    <a href="/" class="nav-brand">
      <div style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <svg viewBox="0 0 1024 1024" fill="none" style="width: 100%; height: 100%;">
          <rect x="307" y="486" width="410" height="52" rx="26" fill="#000000" />
          <rect x="16" y="233" width="441" height="557" rx="80" fill="#F0523D" />
          <rect x="567" y="233" width="441" height="557" rx="80" fill="#2663EA" />
          <circle cx="236.5" cy="511.5" r="68.5" fill="#2663EA" />
          <circle cx="787.5" cy="511.5" r="68.5" fill="#F0523D" />
        </svg>
      </div>
      <span>project<span style="color:#f0523d;">spg</span></span>
    </a>

    <div class="nav-center-links">
      <a href="/#features" class="nav-link">Inference</a>
      <a href="/#research-section" class="nav-link">Research</a>
      <a href="/#news-section" class="nav-link">Blog</a>
      <a href="/dashboard" class="nav-link">Playground</a>
      <a href="https://github.com/PriyanujBoruah/AI-Privacy-Core" target="_blank" class="nav-link">Developers</a>
    </div>

    <div class="nav-right-actions">
      <a href="/" class="btn-contact">OVERVIEW</a>
      <a href="/dashboard" class="btn-signin">CONSOLE</a>
    </div>
  </nav>

  <!-- Article Wrapper -->
  <article class="article-wrap">
    
    <!-- Article Header -->
    <header class="article-header">
      <div class="meta-pills">
        <span class="badge-category">COMPLIANCE</span>
        <span class="meta-date">PUBLISHED 9/30/2026</span>
      </div>
      <h1 class="article-title">
        Global Sovereign AI Privacy: 109 Jurisdictions Supported by ProjectSPG
      </h1>
      <p class="article-lede">
        How modern enterprises across the European Union, India, South East Asia, North America, Latin America, Africa, and APAC stream LLM prompts across borders with 100.00% zero-loss de-identification, mathematical checksum verification, and sub-millisecond edge latency.
      </p>
    </header>

    <!-- Top Grid: Metadata Sidebar on Left + Hero Pipeline Diagram on Right -->
    <div class="hero-grid">
      
      <!-- Left Metadata & Table of Contents Sidebar -->
      <aside class="meta-sidebar">
        <div>
          <div class="meta-section-title">AUTHORS</div>
          <div class="authors-text">
            Priyanuj Boruah, ProjectSPG Research
          </div>
        </div>

        <div>
          <div class="meta-section-title">TABLE OF CONTENTS</div>
          <nav class="toc-list">
            <a href="#dilemma" class="toc-item">1. The Sovereign Data Dilemma</a>
            <a href="#global-map" class="toc-item">2. Global Coverage: 109 Jurisdictions</a>
            <a href="#regional-breakdown" class="toc-item">3. Regional Deep-Dive &amp; Standards</a>
            <a href="#checksums" class="toc-item">4. Mathematical Checksums</a>
            <a href="#regulatory-matrix" class="toc-item">5. Regulatory Mapping (GDPR/DPDP)</a>
            <a href="#latency" class="toc-item">6. Zero-Data Retention &amp; Latency</a>
            <a href="#verifier" class="toc-item">7. Interactive Sovereign Verifier</a>
            <a href="#implementation" class="toc-item">8. 60-Second Implementation</a>
          </nav>
        </div>
      </aside>

      <!-- Right Visual Architecture Illustration Card -->
      <div class="hero-image-card">
        <img 
          src="/images/sovereign-routing-engine.png" 
          alt="The ProjectSPG Sovereign Jurisdiction Routing Engine" 
          class="hero-illustration-img"
          loading="eager"
        />
      </div>

    </div>

    <!-- Main Editorial Article Prose -->
    <div class="prose-content">

      <!-- Editorial Blue Callout on Sovereign Cross-Border Compliance -->
      <div class="editorial-callout" id="summary">
        <strong>The Cross-Border AI Exposure Mandate:</strong> Under the European Union General Data Protection Regulation (GDPR Chapter V), the Indian Digital Personal Data Protection Act 2023 (DPDP Act §16), Singapore Personal Data Protection Act (PDPA §26), and US HIPAA Safe Harbor standards, transmitting unmasked personally identifiable national identifiers across foreign LLM inference clusters represents an immediate, high-severity regulatory violation. Penalties reach up to <strong>€20,000,000 or 4% of worldwide turnover</strong> under GDPR, and <strong>₹250 Crore per incident</strong> under India DPDP. ProjectSPG renders prompts 100% non-identifiable before packet transit.
      </div>

      <!-- Key Metrics Highlights Illustration Card -->
      <div class="showcase-image-card">
        <img 
          src="/images/sovereign-privacy-highlights.png" 
          alt="Global Sovereign Privacy Highlights: 109 Sovereign Nations, 100.00% Checksum Verification, <1 ms Edge Latency" 
          class="showcase-illustration-img"
          loading="lazy"
        />
      </div>

      <div class="prose-quote">
        "Rather than relying on fuzzy probabilistic models that hallucinate and introduce non-deterministic latency, ProjectSPG executes zero-overhead deterministic regex parsers coupled with hardware-level checksum validations."
      </div>

      <!-- Section 1: The Sovereign Dilemma -->
      <h2 class="prose-h2" id="dilemma">1. The Sovereign Data Dilemma in Generative AI</h2>
      <p class="prose-p">
        Enterprise adoption of Large Language Models (LLMs) has fundamentally collided with national data sovereignty frameworks. When a multinational enterprise deploys OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, or DeepSeek V3, user queries and internal documents are routinely dispatched to centralized GPU clusters distributed across North America, Europe, or third-party cloud regions.
      </p>
      <p class="prose-p">
        If a healthcare worker in London enters an NHS patient number, a banking analyst in Singapore pastes an NRIC or UEN registration, a customer support agent in Frankfurt inputs a German Steuer-ID, or an Indian fintech routes an Aadhaar number, the prompt violates extraterritorial transfer prohibitions the moment the TLS connection establishes with the foreign LLM provider.
      </p>
      <p class="prose-p">
        Traditional solutions—such as deploying dedicated on-premise clusters or localized VPCs—impose crushing infrastructure capital expenditures, lack frontier model reasoning capabilities, and require months of bureaucratic deployment. ProjectSPG resolves this architectural contradiction through <strong>In-Flight Sovereign De-Identification</strong>: mathematical redaction and cryptographic surrogate tokenization that operates inside the edge network within the originating legal jurisdiction before payloads leave sovereign borders.
      </p>

      <!-- Section 2: Global Coverage -->
      <h2 class="prose-h2" id="global-map">2. Global Coverage: 109 Jurisdictions Across 10 Regions</h2>
      <p class="prose-p">
        ProjectSPG’s tokenization engine features native syntactic parsers, structural character masks, and mathematical verification algorithms for 109 sovereign territories across every inhabited continent. Rather than relying on fuzzy machine learning classifiers that hallucinate and introduce non-deterministic latency, ProjectSPG executes zero-overhead deterministic regex parsers coupled with hardware-level checksum validations.
      </p>

      <div class="clean-table-card">
        <table class="clean-table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Jurisdictions</th>
              <th>Key National Identifiers Covered</th>
              <th>Primary Governing Regulation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>South East Asia (SEA)</strong></td>
              <td>10 countries (Singapore, Malaysia, Indonesia, Thailand, Philippines, Vietnam, etc.)</td>
              <td>Singapore NRIC/FIN, SingPass, UEN; Malaysia MyKad; Indonesia NIK/KTP; Philippines PhilSys; Vietnam CCCD</td>
              <td><span class="table-tag tag-blue">SG PDPA / MY PDPA / ID PDP Law</span></td>
            </tr>
            <tr>
              <td><strong>Asia (Non-SEA)</strong></td>
              <td>14 countries (India, Japan, South Korea, China, Taiwan, Hong Kong, etc.)</td>
              <td>India Aadhaar (Verhoeff Checksum), PAN Card, Voter ID; Japan My Number; Korea RRN; China Resident ID</td>
              <td><span class="table-tag tag-purple">India DPDP 2023 / Japan APPI / PIPA</span></td>
            </tr>
            <tr>
              <td><strong>European Union</strong></td>
              <td>27 EU Member States (Germany, France, Italy, Spain, Netherlands, Poland, Sweden, etc.)</td>
              <td>German Steuer-ID &amp; Personalausweis; French NIR/INSEE; Italian Codice Fiscale; Spanish DNI/NIE; Dutch BSN; Polish PESEL</td>
              <td><span class="table-tag tag-green">EU GDPR / EU AI Act / NIS2</span></td>
            </tr>
            <tr>
              <td><strong>Europe (Non-EU)</strong></td>
              <td>8 countries (United Kingdom, Switzerland, Norway, Iceland, Liechtenstein, etc.)</td>
              <td>UK NHS Number &amp; NINO; Swiss AHV/AVS13; Norway Fødselsnummer</td>
              <td><span class="table-tag tag-green">UK GDPR &amp; DPA 2018 / Swiss FADP</span></td>
            </tr>
            <tr>
              <td><strong>North America</strong></td>
              <td>3 countries (United States, Canada, Mexico)</td>
              <td>US SSN, EIN, ITIN, State Driver's Licenses; Canada SIN, Health Cards; Mexico CURP, RFC</td>
              <td><span class="table-tag tag-amber">HIPAA / CCPA-CPRA / GLBA / PIPEDA</span></td>
            </tr>
            <tr>
              <td><strong>South America</strong></td>
              <td>12 countries (Brazil, Argentina, Colombia, Chile, Peru, etc.)</td>
              <td>Brazil CPF &amp; CNPJ; Argentina DNI, CUIT; Colombia Cédula &amp; NIT; Chile RUT</td>
              <td><span class="table-tag tag-amber">Brazil LGPD / Colombia Law 1581</span></td>
            </tr>
            <tr>
              <td><strong>Africa</strong></td>
              <td>18 countries (South Africa, Nigeria, Kenya, Egypt, Ghana, etc.)</td>
              <td>Nigeria NIN &amp; BVN; South Africa ID &amp; Tax Reference; Kenya ID &amp; KRA PIN; Egypt National ID</td>
              <td><span class="table-tag tag-rose">South Africa POPIA / Nigeria NDPA</span></td>
            </tr>
            <tr>
              <td><strong>Oceania</strong></td>
              <td>4 countries (Australia, New Zealand, Fiji, Papua New Guinea)</td>
              <td>Australia TFN, Medicare, Driver's License; New Zealand IRD &amp; NHI</td>
              <td><span class="table-tag tag-blue">Australia Privacy Act 1988 (APPs)</span></td>
            </tr>
            <tr>
              <td><strong>Middle East</strong></td>
              <td>10 countries (UAE, Saudi Arabia, Qatar, Israel, Kuwait, etc.)</td>
              <td>UAE Emirates ID; Saudi National ID &amp; Iqama; Israel Teudat Zehut</td>
              <td><span class="table-tag tag-purple">UAE Decree 45/2021 / Saudi PDPL</span></td>
            </tr>
            <tr>
              <td><strong>Global / Universal</strong></td>
              <td>Worldwide (195+ Countries)</td>
              <td>ICAO Doc 9303 Passports, Luhn Credit Cards (Visa/MC/Amex), Modulo-97 IBANs, E.164 Phones, RFC 5322 Emails</td>
              <td><span class="table-tag tag-green">PCI-DSS v4.0 / Cross-Border ISO</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Section 3: Regional Deep-Dive -->
      <h2 class="prose-h2" id="regional-breakdown">3. Regional Breakdown &amp; Sovereign Identity Standards</h2>
      <p class="prose-p">
        Each sovereign government issues national identity credentials engineered with idiosyncratic character sets, checksum validation schemes, and structural constraints. A generic PII redactor that searches merely for "digits" or "hyphens" generates intolerable false-positive rates on financial charts, part numbers, and code blocks while leaking non-standard alphanumeric identifiers.
      </p>

      <!-- Sub-region 3.1: South East Asia -->
      <div class="subregion-card">
        <h3 class="subregion-header">
          <span style="color:#f0523d;">■</span> South East Asia (SEA): Singapore, Malaysia, Indonesia, Philippines &amp; Vietnam
        </h3>
        <p class="prose-p" style="font-size: 14.5px; color: #4b5563; margin-bottom: 12px;">
          South East Asian identity architectures combine century codes, serial issuance counters, and modular weighting checksums:
        </p>
        <ul class="prose-ul">
          <li class="prose-li"><strong>Singapore NRIC/FIN:</strong> 9-character alphanumeric structure (<code>^[STFGMC]\d{7}[A-Z]$</code>). Validated with modulus 11 weights <code>[2, 7, 6, 5, 4, 3, 2]</code> with offset mappings for pre-2000 citizens (<code>S</code>), post-2000 citizens (<code>T</code>), and foreign residents (<code>F/G/M</code>).</li>
          <li class="prose-li"><strong>Malaysia MyKad:</strong> 12-digit format (<code>YYMMDD-PB-###G</code>). Embeds verified date-of-birth, 2-digit birth state code (<code>01-16</code> for states/federal territories), and odd/even gender designation.</li>
          <li class="prose-li"><strong>Indonesia NIK (Nomor Induk Kependudukan):</strong> 16-digit structure detailing provincial code (2 digits), regency/city code (2 digits), district (2 digits), date of birth (with female birth date offset +40), and sequential registration digits.</li>
          <li class="prose-li"><strong>Philippines PhilSys Card (CRN):</strong> 12-digit Common Reference Number with modular parity verification.</li>
          <li class="prose-li"><strong>Vietnam CCCD (Căn cước công dân):</strong> 12-digit citizen identity card incorporating century code, province code, and unique identity series.</li>
        </ul>
      </div>

      <!-- Sub-region 3.2: Asia (Non-SEA) -->
      <div class="subregion-card">
        <h3 class="subregion-header">
          <span style="color:#8b5cf6;">■</span> Asia (Non-SEA): India, Japan, South Korea, China &amp; Taiwan
        </h3>
        <p class="prose-p" style="font-size: 14.5px; color: #4b5563; margin-bottom: 12px;">
          Home to the world's most populous biometric and identity databases, these standards demand strict mathematical validation:
        </p>
        <ul class="prose-ul">
          <li class="prose-li"><strong>India Aadhaar:</strong> 12-digit national identifier governed by UIDAI. Validated via the <em>Verhoeff algorithm</em> (based on dihedral group D<sub>5</sub>), catching 100% of single-digit transcription errors and 95.3% of adjacent transposition errors.</li>
          <li class="prose-li"><strong>India Permanent Account Number (PAN):</strong> 10-character alphanumeric code (<code>^[A-Z]{3}[ABCFGHLJPT][A-Z]\d{4}[A-Z]$</code>) where the 4th character strictly categorizes taxpayer status (<code>P</code> for Individual, <code>C</code> for Company, <code>H</code> for HUF, <code>F</code> for Firm).</li>
          <li class="prose-li"><strong>Japan My Number (社会・社会保障番号):</strong> 12-digit individual number validated using modulus 11 with weights <code>[2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6]</code>.</li>
          <li class="prose-li"><strong>South Korea Resident Registration Number (RRN):</strong> 13-digit format (<code>YYMMDD-S######</code>) with gender century markers (1-4 for 20th/21st century natives, 5-8 for foreign residents) verified with modulus 11 parity.</li>
          <li class="prose-li"><strong>China Resident Identity Card:</strong> 18-digit identity string (<code>GB 11643-1999</code>) verified using ISO 7064:1983.MOD 11-2 check character (including check digit 'X').</li>
        </ul>
      </div>

      <!-- Sub-region 3.3: European Union -->
      <div class="subregion-card">
        <h3 class="subregion-header">
          <span style="color:#10b981;">■</span> European Union (EU) &amp; United Kingdom
        </h3>
        <p class="prose-p" style="font-size: 14.5px; color: #4b5563; margin-bottom: 12px;">
          Under the stringent mandates of GDPR and the EU AI Act, ProjectSPG identifies all sovereign member state identification schemas:
        </p>
        <ul class="prose-ul">
          <li class="prose-li"><strong>Germany Steuer-Identifikationsnummer:</strong> 11-digit tax ID verified with DIN ISO/IEC 7064, MOD 11, 10 algorithm with unique recurrence rules (exactly one digit appears twice, no digit appears three times).</li>
          <li class="prose-li"><strong>France NIR (Numéro de Sécurité Sociale):</strong> 15-digit code comprising sex, birth year/month, department of birth (including Corsica 2A/2B), commune, order number, and modulo 97 check key.</li>
          <li class="prose-li"><strong>Italy Codice Fiscale:</strong> 16-character alphanumeric string encoding surname consonants/vowels, given name, birth year, month character (A-T), day (with +40 female shift), cadastral municipality code, and complex checksum lookup table.</li>
          <li class="prose-li"><strong>United Kingdom NHS Number:</strong> 10-digit identifier validated using Modulus 11 with weights <code>[10, 9, 8, 7, 6, 5, 4, 3, 2]</code>.</li>
          <li class="prose-li"><strong>Spain DNI/NIE:</strong> 8-digit national identity card followed by modulus 23 character lookup (TRWAGMYFPDXBNJZSQVHLCKE).</li>
        </ul>
      </div>

      <!-- Sub-region 3.4: Americas -->
      <div class="subregion-card">
        <h3 class="subregion-header">
          <span style="color:#0284c7;">■</span> Americas: United States, Canada, Brazil &amp; Latin America
        </h3>
        <p class="prose-p" style="font-size: 14.5px; color: #4b5563; margin-bottom: 12px;">
          Covering federal, state, and provincial identification schemes across North and South America:
        </p>
        <ul class="prose-ul">
          <li class="prose-li"><strong>United States SSN:</strong> 9-digit Social Security Number with area exclusion checks (excluding 000, 666, and 900-999) and group/serial validation.</li>
          <li class="prose-li"><strong>Canada SIN (Social Insurance Number):</strong> 9-digit identifier validated using the Luhn checksum algorithm; 9-series temporary worker detection.</li>
          <li class="prose-li"><strong>Brazil CPF (Cadastro de Pessoas Físicas):</strong> 11-digit national identity verified by consecutive dual-pass modulus 11 check digits with 100% false-positive rejection.</li>
          <li class="prose-li"><strong>Brazil CNPJ:</strong> 14-digit corporate tax registry verified with dual modulus 11 weighting across corporate root, branch, and check digits.</li>
        </ul>
      </div>

      <!-- Section 4: Mathematical Checksums -->
      <h2 class="prose-h2" id="checksums">4. Mathematical Checksum Verification: Zero False Positives</h2>
      <p class="prose-p">
        The primary operational flaw of legacy data loss prevention (DLP) tools is reliance on naive regular expressions. When an enterprise scans engineering prompts containing memory addresses, Git commit hashes, UUIDs, or matrix multiplication weights, a standard 9-digit or 12-digit regex triggers thousands of false alarms, corrupting harmless technical prompts.
      </p>
      <p class="prose-p">
        ProjectSPG enforces a strict two-stage identification architecture:
      </p>
      <ul class="prose-ul">
        <li class="prose-li"><strong>Stage 1 (Syntax Parsing):</strong> High-throughput, zero-allocation regular expressions isolate potential sovereign tokens with boundary constraints in under <strong>15 microseconds</strong>.</li>
        <li class="prose-li"><strong>Stage 2 (Algorithmic Mathematical Validation):</strong> The token is evaluated against its respective sovereign mathematical checksum:
          <ul style="margin-top: 8px; padding-left: 20px; list-style-type: circle;">
            <li><strong>Verhoeff Dihedral Checksum:</strong> For Indian Aadhaar numbers. Implemented via static multiplication and permutation tables over dihedral group D<sub>5</sub>.</li>
            <li><strong>Luhn Algorithm (Base-10 Modulo):</strong> For Credit Cards (Visa, MasterCard, Amex) and Canadian SINs. Computes sum of doubled alternating digits.</li>
            <li><strong>ISO 13616 Modulo-97:</strong> For International Bank Account Numbers (IBAN). Replaces country letters with numeric equivalents and validates that modulo 97 equals 1.</li>
            <li><strong>Weighted Modulus-11:</strong> For Singapore NRIC, UK NHS, German Steuer-ID, and Brazil CPF.</li>
          </ul>
        </li>
      </ul>
      <p class="prose-p">
        If a sequence of digits fails the sovereign mathematical checksum, <strong>it is immediately released untouched</strong>. This guarantees that software code, compiler flags, random integer sequences, and product model serial numbers are never erroneously modified.
      </p>

      <!-- Section 5: Regulatory Compliance Mapping -->
      <h2 class="prose-h2" id="regulatory-matrix">5. Regulatory Compliance Mapping: GDPR, DPDP, HIPAA &amp; PDPA</h2>
      <p class="prose-p">
        ProjectSPG is built from the ground up to satisfy the audit and verification requirements of corporate Data Protection Officers (DPOs), General Counsels, and Chief Information Security Officers (CISOs).
      </p>

      <div class="clean-table-card">
        <table class="clean-table">
          <thead>
            <tr>
              <th>Regulation</th>
              <th>Article / Clause</th>
              <th>Compliance Mandate</th>
              <th>ProjectSPG Technical Enforcement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>EU GDPR</strong></td>
              <td>Chapter V, Articles 44–50</td>
              <td>Strict prohibition of personal data transfers to third countries lacking adequacy decisions (Schrems II precedent).</td>
              <td>PII is completely tokenized and removed at the local edge before prompt packets transit outside EU boundaries.</td>
            </tr>
            <tr>
              <td><strong>EU AI Act</strong></td>
              <td>Article 10 (Data Governance)</td>
              <td>High-risk AI systems must implement continuous data governance, privacy preservation, and anti-leakage controls.</td>
              <td>Automated tokenization audit logging with zero persistent plaintext storage across the inference pipeline.</td>
            </tr>
            <tr>
              <td><strong>India DPDP Act 2023</strong></td>
              <td>Section 16 &amp; Section 8(5)</td>
              <td>Restrictions on transfer of personal data outside India; mandatory protective measures against data breaches.</td>
              <td>Native Verhoeff-validated Aadhaar and PAN masking, preventing biometric or tax credentials from touching foreign LLM APIs.</td>
            </tr>
            <tr>
              <td><strong>Singapore PDPA</strong></td>
              <td>Section 26 (Transfer Limitation)</td>
              <td>Organizations must not transfer personal data to a country outside Singapore unless comparable protection is ensured.</td>
              <td>Complete surrogate tokenization of NRIC, FIN, SingPass, and corporate UEN registration data.</td>
            </tr>
            <tr>
              <td><strong>US HIPAA</strong></td>
              <td>45 CFR § 164.514(b) (Safe Harbor)</td>
              <td>Removal of all 18 specified direct and indirect health identifiers before clinical data sharing.</td>
              <td>Automatic masking of patient names, medical record numbers, dates, geographic data, and contact information.</td>
            </tr>
            <tr>
              <td><strong>PCI-DSS v4.0</strong></td>
              <td>Requirement 3.4 &amp; 3.5</td>
              <td>Primary Account Numbers (PAN) must be rendered unreadable anywhere they are stored or processed.</td>
              <td>Hardware-validated Luhn masking with preserved brand and last-4 digits for billing context without exposure.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Section 6: Latency & Zero-Data Retention -->
      <h2 class="prose-h2" id="latency">6. Zero-Data Retention &amp; Sub-Millisecond Edge Latency</h2>
      <p class="prose-p">
        A data privacy layer cannot introduce latency bottlenecks or introduce a secondary point of compromise. ProjectSPG executes entirely within ephemeral worker memory across globally distributed edge nodes.
      </p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 24px 0 32px;">
        <div style="background: #ffffff; border: 1px solid var(--border); border-radius: 12px; padding: 22px;">
          <h4 style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Zero Persistent Storage</h4>
          <p style="font-size: 13.5px; color: #4b5563; line-height: 1.6; margin: 0;">
            Surrogate token maps exist strictly in volatile memory for the duration of the HTTP streaming request. Once the downstream LLM delivers its completion tokens and ProjectSPG rehydrates the original terms in the client's response stream, the lookup table is permanently wiped from RAM.
          </p>
        </div>
        <div style="background: #ffffff; border: 1px solid var(--border); border-radius: 12px; padding: 22px;">
          <h4 style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Sub-Millisecond Execution</h4>
          <p style="font-size: 13.5px; color: #4b5563; line-height: 1.6; margin: 0;">
            As proven in our empirical 9.33M prompt benchmark audit, the core sovereign tokenization engine adds just <strong>86 microseconds</strong> of processing overhead, running at over <strong>17,735 prompts/sec</strong> per edge compute worker.
          </p>
        </div>
      </div>

      <!-- Section 7: Interactive Sovereign Verifier -->
      <h2 class="prose-h2" id="verifier">7. Interactive Sovereign Entity Sandbox</h2>
      <p class="prose-p">
        Test ProjectSPG's real-time sovereign entity detection. Select a regional template or paste your own sample payload to observe deterministic tokenization and reversible rehydration:
      </p>

      <div class="verifier-box">
        <div class="verifier-header">
          <span style="font-weight: 700; font-size: 13.5px; color: #0f172a; font-family:'JetBrains Mono', monospace; text-transform:uppercase;">SOVEREIGN DETECTION TESTBED</span>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            <button onclick="setSample('sea')" style="background:#f1f5f9; border:none; padding:5px 12px; border-radius:4px; font-size:11.5px; font-weight:600; cursor:pointer; color:#334155;">SEA (Singapore/Malaysia)</button>
            <button onclick="setSample('india')" style="background:#f1f5f9; border:none; padding:5px 12px; border-radius:4px; font-size:11.5px; font-weight:600; cursor:pointer; color:#334155;">India (Aadhaar/PAN)</button>
            <button onclick="setSample('eu')" style="background:#f1f5f9; border:none; padding:5px 12px; border-radius:4px; font-size:11.5px; font-weight:600; cursor:pointer; color:#334155;">EU (Germany/IBAN)</button>
            <button onclick="setSample('us')" style="background:#f1f5f9; border:none; padding:5px 12px; border-radius:4px; font-size:11.5px; font-weight:600; cursor:pointer; color:#334155;">US/Global (SSN/CC)</button>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display:block; font-size: 11.5px; font-weight: 700; color: #4b5563; margin-bottom: 6px; text-transform: uppercase; font-family:'JetBrains Mono', monospace;">
            Inbound Sovereign Prompt:
          </label>
          <textarea id="liveInputPrompt" rows="3" class="verifier-input" oninput="runLiveVerification()">Patient Tan Wei Ling (NRIC: S9876543A, SingPass: tan.wl@gov.sg) registered Singapore business UEN 201812345K with account SG89 0140 1234 5678 9012.</textarea>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size: 11px; font-weight: 700; color: #f0523d; text-transform: uppercase; font-family:'JetBrains Mono', monospace;">
                ● OUTBOUND TO LLM (SANITIZED)
              </span>
              <span style="font-size: 10px; color: #10b981; font-weight: 600; font-family:'JetBrains Mono', monospace;">ZERO LEAKAGE</span>
            </div>
            <div id="liveOutputSanitized" class="verifier-output" style="background:#0f121d; color:#38bdf8; border:1px solid #1e293b;"></div>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size: 11px; font-weight: 700; color: #10b981; text-transform: uppercase; font-family:'JetBrains Mono', monospace;">
                ● RETURNED TO CLIENT (REHYDRATED)
              </span>
              <span style="font-size: 10px; color: #64748b; font-weight: 600; font-family:'JetBrains Mono', monospace;">100% FIDELITY</span>
            </div>
            <div id="liveOutputRehydrated" class="verifier-output" style="background:#ffffff; color:#1e293b; border:1px solid var(--border);"></div>
          </div>
        </div>
      </div>

      <!-- Section 8: 60-Second Implementation -->
      <h2 class="prose-h2" id="implementation">8. 60-Second Drop-In Implementation Guide</h2>
      <p class="prose-p">
        ProjectSPG is completely wire-compatible with the standard OpenAI API specification. To protect your enterprise across all 109 jurisdictions, simply point your existing client SDK to the ProjectSPG gateway endpoint:
      </p>

      <div class="terminal-wrapper">
        <div class="terminal-top-bar">
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="width:10px; height:10px; border-radius:50%; background:#ef4444; display:inline-block;"></span>
            <span style="width:10px; height:10px; border-radius:50%; background:#f59e0b; display:inline-block;"></span>
            <span style="width:10px; height:10px; border-radius:50%; background:#10b981; display:inline-block;"></span>
            <span style="margin-left:8px;">python_openai_sovereign_client.py</span>
          </div>
          <button onclick="copyTerminalCommands()" class="terminal-copy-btn">Copy</button>
        </div>
        <pre class="terminal-pre" id="terminalCommands"><span style="color:#64748b;"># Install standard OpenAI client</span>
<span style="color:#38bdf8;">pip install openai</span>

<span style="color:#64748b;"># Drop-in One-Line BaseURL Swap</span>
<span style="color:#c084fc;">import</span> os
<span style="color:#c084fc;">from</span> openai <span style="color:#c084fc;">import</span> OpenAI

client = OpenAI(
    api_key=os.environ.get(<span style="color:#4ade80;">"PROJECTSPG_API_KEY"</span>),
    <span style="color:#f0523d;">base_url="https://api.projectspg.info/v1"</span>  <span style="color:#64748b;"># Sovereign Edge Gateway</span>
)

<span style="color:#64748b;"># Send sovereign payload - 100% compliant across 109 countries</span>
response = client.chat.completions.create(
    model=<span style="color:#4ade80;">"gemma-4-26b-a4b-it"</span>,
    messages=[{
        <span style="color:#4ade80;">"role"</span>: <span style="color:#4ade80;">"user"</span>,
        <span style="color:#4ade80;">"content"</span>: <span style="color:#4ade80;">"Analyze patient Tan Wei Ling (NRIC: S9876543A) for cross-border care."</span>
    }]
)

print(response.choices[0].message.content)
<span style="color:#4ade80;"># =&gt; LLM receives non-identifiable tokens; response is rehydrated automatically.</span></pre>
      </div>

      <!-- Related Posts Section matching Together.ai -->
      <div style="margin-top: 80px; padding-top: 48px; border-top: 1px solid #f3f4f6;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px;">
          <div>
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; font-family: monospace; margin-bottom: 4px;">MORE RESEARCH</div>
            <h3 style="font-size: 22px; font-weight: 800; color: #111827; letter-spacing: -0.02em;">Related Articles</h3>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button onclick="scrollRelated('left')" style="width: 32px; height: 32px; border-radius: 4px; border: 1px solid #e5e7eb; background: #ffffff; color: #4b5563; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='#ffffff'">‹</button>
            <button onclick="scrollRelated('right')" style="width: 32px; height: 32px; border-radius: 4px; border: 1px solid #e5e7eb; background: #ffffff; color: #4b5563; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s;" onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='#ffffff'">›</button>
            <a href="/#news-section" style="padding: 6px 14px; background: #f3f4f6; border-radius: 4px; font-size: 11px; font-weight: 700; color: #374151; text-decoration: none; text-transform: uppercase; letter-spacing: 0.06em; transition: background 0.15s;" onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">VIEW ALL</a>
          </div>
        </div>

        <!-- 3 Blog Cards Row -->
        <div id="related-cards-track" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 24px;">
          
          <!-- Related 1: Empirical Benchmark -->
          <a href="/blog/benchmark" style="text-decoration: none; color: inherit; display: block;" class="group">
            <div style="aspect-ratio: 16/9; width: 100%; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #ffd5cc, #f7e0ff, #d8e6ff); border: 1px solid rgba(229,231,235,0.8); display: flex; align-items: center; justify-content: center; padding: 22px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: all 0.25s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.08)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.03)';">
              <div>
                <div style="display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 6px;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #ec4899;"></span>
                  <span style="font-size: 10px; font-weight: 700; color: #1f2937;">project<span style="color:#f0523d;">spg</span></span>
                </div>
                <h4 style="font-size: 14.5px; font-weight: 800; color: #111827; line-height: 1.35;">
                  Empirical Benchmark: 9,334,805 Prompts Evaluated with 100.00% Fidelity &amp; 86µs Latency
                </h4>
              </div>
            </div>
            <div style="margin-top: 14px;">
              <span style="background: #f3f4f6; color: #374151; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; font-family: monospace;">BENCHMARK</span>
              <h3 style="font-size: 16.5px; font-weight: 700; color: #111827; margin-top: 8px; line-height: 1.35;">
                Empirical Benchmark: 9,334,805 Prompts Evaluated with 100.00% Fidelity &amp; 86µs Latency
              </h3>
            </div>
          </a>

          <!-- Related 2: Open Model AI Stack & Market Ranking -->
          <a href="/blog/stack" style="text-decoration: none; color: inherit; display: block;" class="group">
            <div style="aspect-ratio: 16/9; width: 100%; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #fed7aa, #fef08a, #c7d2fe); border: 1px solid rgba(229,231,235,0.8); display: flex; align-items: center; justify-content: center; padding: 22px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: all 0.25s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.08)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.03)';">
              <div>
                <div style="display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 6px;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #f97316;"></span>
                  <span style="font-size: 10px; font-weight: 700; color: #1f2937;">project<span style="color:#f0523d;">spg</span></span>
                </div>
                <h4 style="font-size: 14.5px; font-weight: 800; color: #111827; line-height: 1.35;">
                  The Open Model AI Stack: Why ProjectSPG is Ranked #1
                </h4>
              </div>
            </div>
            <div style="margin-top: 14px;">
              <span style="background: #f3f4f6; color: #374151; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; font-family: monospace;">ARCHITECTURE</span>
              <h3 style="font-size: 16.5px; font-weight: 700; color: #111827; margin-top: 8px; line-height: 1.35;">
                The Open Model AI Stack: Why ProjectSPG Ranks #1 for Enterprise Privacy
              </h3>
            </div>
          </a>

          <!-- Related 3: Supported Industries -->
          <a href="/blog/industries" style="text-decoration: none; color: inherit; display: block;" class="group">
            <div style="aspect-ratio: 16/9; width: 100%; border-radius: 12px; overflow: hidden; background: #0f121d; border: 1px solid rgba(229,231,235,0.2); display: flex; align-items: center; justify-content: center; padding: 22px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.03); transition: all 0.25s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.2)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.03)';">
              <div>
                <div style="display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 6px;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: #8b5cf6;"></span>
                  <span style="font-size: 10px; font-weight: 700; color: #94a3b8;">project<span style="color:#f0523d;">spg</span></span>
                </div>
                <h4 style="font-size: 14.5px; font-weight: 800; color: #ffffff; line-height: 1.35;">
                  Enterprise Guardrails for Regulated Industries: Healthcare, FinTech &amp; Legal
                </h4>
              </div>
            </div>
            <div style="margin-top: 14px;">
              <span style="background: #f3f4f6; color: #374151; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; font-family: monospace;">ENTERPRISE</span>
              <h3 style="font-size: 16.5px; font-weight: 700; color: #111827; margin-top: 8px; line-height: 1.35;">
                Enterprise Guardrails for Regulated Industries: Healthcare, FinTech &amp; Legal
              </h3>
            </div>
          </a>

        </div>
      </div>

    </div>

  </article>

  <!-- ======================================================================= -->
  <!-- START BUILDING ON PROJECTSPG (Call To Action Section)                   -->
  <!-- ======================================================================= -->
  <section class="w-full relative pt-20 pb-28 sm:pt-32 sm:pb-48 overflow-hidden bg-white text-center border-t border-gray-100">
    
    <!-- 3D Geometric Atmospheric Backdrop -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-end justify-center">
      <!-- Left Warm Coral Glow -->
      <div class="absolute -left-24 bottom-0 w-[420px] h-[340px] bg-gradient-to-tr from-rose-500/25 via-red-400/20 to-transparent blur-3xl rounded-full"></div>
      
      <!-- Center Frosted Glass 3D Arc / Semi-Circle -->
      <div class="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[380px] rounded-t-full bg-gradient-to-b from-sky-100/40 via-blue-50/20 to-transparent border-t-2 border-l border-r border-white/80 backdrop-blur-xl shadow-2xl">
        <!-- Inner Glass Highlights -->
        <div class="absolute top-4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
      </div>

      <!-- Right Deep Royal Blue 3D Disc -->
      <div class="absolute -right-16 bottom-[-60px] w-72 sm:w-96 h-72 sm:h-96 rounded-[50px] sm:rounded-[64px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 shadow-[0_25px_60px_rgba(29,78,216,0.45)] transform rotate-[18deg] -skew-x-6 border-t-2 border-l-2 border-sky-300/40"></div>

      <!-- Far Right Blue/Purple Atmosphere -->
      <div class="absolute -right-20 bottom-0 w-[480px] h-[400px] bg-gradient-to-tl from-indigo-600/25 via-blue-500/15 to-transparent blur-3xl rounded-full"></div>
    </div>

    <div class="max-w-5xl mx-auto px-2.5 sm:px-4 lg:px-6 relative z-10">
      <h2 class="text-3xl sm:text-5xl lg:text-[54px] font-bold text-gray-950 tracking-tight leading-tight">
        Start building on ProjectSPG
      </h2>
      <p class="text-sm sm:text-lg lg:text-xl text-gray-500 font-normal mt-4 max-w-2xl mx-auto leading-relaxed">
        From sovereign edge de-identification across 109 countries to large-scale zero-trust AI model inference
      </p>
      <div class="mt-8 flex justify-center">
        <a href="/dashboard" class="px-7 py-3.5 rounded-xl bg-black hover:bg-gray-800 text-white text-xs font-bold tracking-wider uppercase transition shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 inline-block">
          GET STARTED NOW
        </a>
      </div>
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- MAIN ENTERPRISE FOOTER                                                  -->
  <!-- ======================================================================= -->
  <footer class="w-full relative overflow-hidden bg-gradient-to-b from-[#eaf2fc]/60 via-[#f1f6fc] to-[#e8edf7] pt-8 sm:pt-12">
    
    <!-- Ambient Edge Colors behind the white card -->
    <div class="absolute -left-20 top-0 w-80 h-96 bg-rose-400/25 blur-3xl pointer-events-none"></div>
    <div class="absolute -right-20 top-0 w-96 h-96 bg-blue-500/25 blur-3xl pointer-events-none"></div>

    <div class="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
      
      <!-- Main White Footer Card with Curved Top -->
      <div class="w-full bg-white rounded-t-[28px] sm:rounded-t-[44px] border-t border-l border-r border-gray-100 shadow-[0_-10px_35px_rgba(0,0,0,0.02)] pt-10 sm:pt-16 pb-10 px-4 sm:px-8 lg:px-10 relative overflow-hidden">
        
        <!-- Top Grid: Brand Logo + 4 Category Columns -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          <!-- Brand Logo (Left Column) -->
          <div class="lg:col-span-3">
            <a href="/" class="inline-flex items-center gap-2.5 group cursor-pointer" title="ProjectSPG">
              <!-- ProjectSPG Official Brand Logo -->
              <div class="w-8 h-8 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 1024 1024" fill="none" class="w-full h-full">
                  <rect x="307" y="486" width="410" height="52" rx="26" fill="#000000" />
                  <rect x="16" y="233" width="441" height="557" rx="80" fill="#F0523D" />
                  <rect x="567" y="233" width="441" height="557" rx="80" fill="#2663EA" />
                  <circle cx="236.5" cy="511.5" r="68.5" fill="#2663EA" />
                  <circle cx="787.5" cy="511.5" r="68.5" fill="#F0523D" />
                </svg>
              </div>
              <span class="font-extrabold text-[20px] tracking-tight text-gray-950">project<span class="text-[#f0523d]">spg</span></span>
            </a>
          </div>

          <!-- Remaining Columns of Links (3 Columns) -->
          <div class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-8 lg:gap-10 text-xs">
            
            <!-- Col 1: DEVELOPERS & PLATFORM -->
            <div>
              <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">DEVELOPERS &amp; PLATFORM</span>
              </div>
              <ul class="space-y-2.5 font-medium text-gray-600">
                <li><a href="/blog/benchmark" class="hover:text-gray-950 transition">Research &amp; Benchmark</a></li>
                <li><a href="/blog/countries" class="hover:text-gray-950 transition">Supported Countries</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">API Documentation</a></li>
              </ul>
            </div>

            <!-- Col 2: GET STARTED -->
            <div>
              <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">GET STARTED</span>
              </div>
              <ul class="space-y-2.5 font-medium text-gray-600">
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Interactive Playground</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">Sign Up / Sign In</a></li>
                <li><a href="/dashboard" class="hover:text-gray-950 transition">API Documentation</a></li>
              </ul>
            </div>

            <!-- Col 3: RESOURCES -->
            <div>
              <div class="border-t border-gray-200/90 pt-3 mb-3.5">
                <span class="text-[10px] font-bold tracking-widest uppercase text-gray-900 font-mono">RESOURCES</span>
              </div>
              <ul class="space-y-2.5 font-medium text-gray-600">
                <li><a href="/blog/benchmark" class="hover:text-gray-950 transition">Blog &amp; Benchmarks</a></li>
                <li><a href="/blog/countries" class="hover:text-gray-950 transition">109 Countries Matrix</a></li>
                <li><a href="/" class="hover:text-gray-950 transition">About ProjectSPG</a></li>
                <li><a href="mailto:priyanujboruah@outlook.com" class="hover:text-gray-950 transition">Support</a></li>
              </ul>
            </div>

          </div>

        </div>

        <!-- Giant Watermark Brand Name (ProjectSPG Signature) -->
        <div class="select-none pointer-events-none text-center text-[44px] sm:text-[90px] md:text-[135px] lg:text-[180px] font-bold tracking-tight text-gray-100/90 leading-none my-6 sm:my-10 overflow-hidden font-sans truncate">
          project<span class="text-[#f0523d]">spg</span>
        </div>

        <!-- Bottom Legal & Social Row -->
        <div class="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-sans">
          <div class="text-[10px] font-mono text-gray-400 tracking-wider uppercase text-center md:text-left">
            © 2026 PROJECTSPG. ALL RIGHTS RESERVED.
          </div>

          <div class="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs text-gray-600">
            <a href="/" class="hover:text-gray-950 transition">Privacy Policy</a>
            <a href="/" class="hover:text-gray-950 transition">Terms of Service</a>
            <a href="/" class="hover:text-gray-950 transition">Security Disclosure</a>
          </div>

          <div class="flex items-center gap-4 text-gray-700">
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" class="hover:text-gray-950 transition p-1" title="Discord">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="hover:text-gray-950 transition p-1" title="X (Twitter)">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="hover:text-gray-950 transition p-1" title="LinkedIn">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

    </div>

  </footer>

  <script>
    const samplePayloads = {
      sea: "Patient Tan Wei Ling (NRIC: S9876543A, SingPass: tan.wl@gov.sg) registered Singapore business UEN 201812345K with account SG89 0140 1234 5678 9012. Malaysian colleague Lee Meng (MyKad: 880512-14-5521).",
      india: "Fintech onboarded Rahul Sharma (Aadhaar: 4123 5678 9120, PAN: ABCPS1234F). Salary disbursed to account IFSC: HDFC0001234, email rahul.sharma@paytm.in.",
      eu: "Senior Consultant Maximilian Weber (Steuer-ID: 04 459 821 346, IBAN: DE89 3704 0044 0532 0130 00). French counterpart Claire Dubois (INSEE: 2 85 07 75 123 456 78).",
      us: "Employee Johnathan Davis (SSN: 942-58-1034) processed reimbursement on Visa card 4532 0159 8243 1928 with corporate email jdavis@enterprise.corp."
    };

    function setSample(region) {
      document.getElementById('liveInputPrompt').value = samplePayloads[region] || samplePayloads.sea;
      runLiveVerification();
    }

    function runLiveVerification() {
      const input = document.getElementById('liveInputPrompt').value;
      let sanitized = input;
      const tokenMap = {};

      // Emails
      sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g, (m) => {
        const tok = "[EMAIL_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // Singapore NRIC / FIN
      sanitized = sanitized.replace(/\\b[STFGMC]\\d{7}[A-Z]\\b/g, (m) => {
        const tok = "[SG_NRIC_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // Malaysia MyKad
      sanitized = sanitized.replace(/\\b\\d{6}-\\d{2}-\\d{4}\\b/g, (m) => {
        const tok = "[MY_MYKAD_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // Singapore UEN
      sanitized = sanitized.replace(/\\b\\d{8,9}[A-Z]\\b/g, (m) => {
        const tok = "[SG_UEN_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // India Aadhaar (12 digits with spaces or hyphens)
      sanitized = sanitized.replace(/\\b\\d{4}[\\s-]\\d{4}[\\s-]\\d{4}\\b/g, (m) => {
        const tok = "[IN_AADHAAR_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // India PAN Card
      sanitized = sanitized.replace(/\\b[A-Z]{5}\\d{4}[A-Z]\\b/g, (m) => {
        const tok = "[IN_PAN_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // German Steuer-ID (11 digits with spaces)
      sanitized = sanitized.replace(/\\b\\d{2}\\s\\d{3}\\s\\d{3}\\s\\d{3}\\b/g, (m) => {
        const tok = "[DE_STEUER_ID_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // French INSEE/NIR
      sanitized = sanitized.replace(/\\b[12]\\s\\d{2}\\s\\d{2}\\s\\d{2}\\s\\d{3}\\s\\d{3}\\s\\d{2}\\b/g, (m) => {
        const tok = "[FR_NIR_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // US SSN
      sanitized = sanitized.replace(/\\b\\d{3}-\\d{2}-\\d{4}\\b/g, (m) => {
        const tok = "[US_SSN_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // Credit Cards (16 digits with spaces)
      sanitized = sanitized.replace(/\\b(?:4\\d{3}|5[1-5]\\d{2}|6011)[\\s-]\\d{4}[\\s-]\\d{4}[\\s-]\\d{4}\\b/g, (m) => {
        const tok = "[CREDIT_CARD_1]";
        tokenMap[tok] = m;
        return tok;
      });

      // IBAN (General)
      sanitized = sanitized.replace(/\\b[A-Z]{2}\\d{2}[\\s-]?[A-Z0-9]{4}[\\s-]?[A-Z0-9]{4}[\\s-]?[A-Z0-9]{4}[\\s-]?[A-Z0-9]{2,4}\\b/g, (m) => {
        const tok = "[IBAN_1]";
        tokenMap[tok] = m;
        return tok;
      });

      document.getElementById('liveOutputSanitized').innerText = sanitized;

      // Rehydrate
      let rehydrated = sanitized;
      for (const [tok, orig] of Object.entries(tokenMap)) {
        rehydrated = rehydrated.replaceAll(tok, orig);
      }
      document.getElementById('liveOutputRehydrated').innerText = rehydrated;
    }

    function copyTerminalCommands() {
      const text = document.getElementById('terminalCommands').innerText;
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.terminal-copy-btn');
        btn.innerText = "✓ Copied";
        setTimeout(() => btn.innerText = "Copy", 2000);
      });
    }

    function scrollRelated(direction) {
      const track = document.getElementById('related-cards-track');
      if (track) {
        const scrollAmount = 320;
        track.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
    }

    // Run on load
    runLiveVerification();
  </script>
</body>
</html>`;
