export const HOME_HTML = `<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ProjectSPG — The Zero-Trust Privacy Gateway for Enterprise AI</title>
  <meta name="description" content="De-identify PII, health records, financial data, and secrets in sub-20ms before foreign LLM providers see it. Wire-compatible with OpenAI, Mistral, and Google AI.">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f0523d'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&family=Architects+Daughter&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <style>
    body { font-family: 'Inter', sans-serif; }
    .font-sketch { font-family: 'Cabin Sketch', 'Architects Daughter', cursive, sans-serif; }
    pre, code, .font-mono { font-family: 'JetBrains Mono', monospace; }
    .bg-grid {
      background-size: 32px 32px;
      background-image: 
        linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 5px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(148, 163, 184, 0.4);
      border-radius: 9999px;
    }
    /* Markdown Output Styling */
    #demo-rehydrated-output p {
      margin-bottom: 0.5rem;
    }
    #demo-rehydrated-output p:last-child {
      margin-bottom: 0;
    }
    #demo-rehydrated-output strong {
      font-weight: 600;
      color: #0f172a;
    }
    #demo-rehydrated-output ul, #demo-rehydrated-output ol {
      margin-top: 0.35rem;
      margin-bottom: 0.5rem;
      padding-left: 1.25rem;
    }
    #demo-rehydrated-output ul {
      list-style-type: disc;
    }
    #demo-rehydrated-output ol {
      list-style-type: decimal;
    }
    #demo-rehydrated-output li {
      margin-bottom: 0.2rem;
      line-height: 1.5;
    }
    #demo-rehydrated-output h1, #demo-rehydrated-output h2, #demo-rehydrated-output h3, #demo-rehydrated-output h4 {
      font-weight: 700;
      color: #0f172a;
      margin-top: 0.75rem;
      margin-bottom: 0.35rem;
      line-height: 1.3;
    }
    #demo-rehydrated-output h1 { font-size: 1rem; }
    #demo-rehydrated-output h2 { font-size: 0.925rem; }
    #demo-rehydrated-output h3 { font-size: 0.85rem; }
    #demo-rehydrated-output code {
      background-color: #f1f5f9;
      color: #0f172a;
      padding: 0.1rem 0.3rem;
      border-radius: 0.25rem;
      font-size: 0.9em;
      font-family: 'JetBrains Mono', monospace;
    }
    #demo-rehydrated-output hr {
      border: 0;
      border-top: 1px solid #e2e8f0;
      margin: 0.6rem 0;
    }
    /* Keyhole Edge-Hugging Beam Sweep Animation */
    @keyframes keyholeEdgeSweep {
      0% { stroke-dashoffset: 550; }
      100% { stroke-dashoffset: 0; }
    }
    .animate-keyhole-edge-sweep {
      animation: keyholeEdgeSweep 7s linear infinite;
    }
    /* Infinite Rotating Logo Marquee */
    @keyframes logoMarquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-logo-marquee {
      display: flex;
      width: max-content;
      animation: logoMarquee 42s linear infinite;
    }

      /* Critical Leak Warning Heartbeat Pulse & Glow Animation */
    @keyframes criticalLeakPulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 2px 2px 0px 0px rgba(159, 18, 57, 0.6), 0 0 0 0 rgba(225, 29, 72, 0);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 2.5px 2.5px 0px 0px rgba(159, 18, 57, 0.75), 0 0 12px 3px rgba(225, 29, 72, 0.45);
      }
    }
    .animate-critical-leak {
      animation: criticalLeakPulse 1.8s ease-in-out infinite;
    }
    /* Full Interactive Flow Animations */
    @keyframes reversiblePulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 2px 2px 0px 0px rgba(5, 150, 105, 0.6), 0 0 0 0 rgba(16, 185, 129, 0);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 3px 3px 0px 0px rgba(5, 150, 105, 0.8), 0 0 14px 3px rgba(16, 185, 129, 0.5);
      }
    }
    .animate-reversible {
      animation: reversiblePulse 2s ease-in-out infinite;
    }

    @keyframes gatewayGlow {
      0%, 100% {
        border-color: #155e75;
        box-shadow: 4px 4px 0px 0px #0e7490, 0 0 0 0 rgba(6, 182, 212, 0);
      }
      50% {
        border-color: #0891b2;
        box-shadow: 4px 4px 0px 0px #0e7490, 0 0 16px 3px rgba(6, 182, 212, 0.35);
      }
    }
    .animate-gateway-glow {
      animation: gatewayGlow 2.5s ease-in-out infinite;
    }

    @keyframes tokenShimmer {
      0%, 100% {
        transform: translateY(0);
        filter: brightness(1);
      }
      50% {
        transform: translateY(-1.5px);
        filter: brightness(1.2);
        box-shadow: 0 0 10px rgba(6, 182, 212, 0.6);
      }
    }
    .animate-token-1 {
      animation: tokenShimmer 2s ease-in-out infinite;
    }
    .animate-token-2 {
      animation: tokenShimmer 2s ease-in-out infinite 0.6s;
    }

    @keyframes arrowStream {
      0%, 100% {
        transform: translateX(0);
        opacity: 0.75;
      }
      50% {
        transform: translateX(3px);
        opacity: 1;
      }
    }
    .animate-arrow-stream {
      animation: arrowStream 1.2s ease-in-out infinite;
    }

    @keyframes leakFlicker {
      0%, 100% {
        box-shadow: 1.5px 1.5px 0px 0px rgba(159, 18, 57, 0.5);
      }
      50% {
        box-shadow: 1.5px 1.5px 0px 0px rgba(159, 18, 57, 0.7), 0 0 10px 2px rgba(225, 29, 72, 0.45);
      }
    }
    .animate-leak-entity {
      animation: leakFlicker 1.8s ease-in-out infinite;
    }

    @keyframes dashedWireMove {
      to {
        background-position: 20px 0;
      }
    }

    .logo-keyhole {
      fill: #09090b;
      transition: fill 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .group:hover .logo-keyhole,
    .logo-keyhole:hover {
      fill: #f0523d !important;
    }
  </style>
</head>
<body class="min-h-full bg-[#fafafa] text-[#1e1e2e] flex flex-col antialiased">

  <!-- ========================================================================= -->
  <!-- NAVIGATION BAR                                                            -->
  <!-- ========================================================================= -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-900 shadow-[0_2px_0px_0px_rgba(15,23,42,0.06)]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <a href="/home" class="flex items-center gap-2.5 group">
          <svg viewBox="82 47 96 211" class="logo-keyhole h-6 w-auto shrink-0" fill="#09090b">
            <path d="M 103.5 135 A 48 48 0 1 1 156.5 135 L 178 248 Q 178 258 168 258 L 92 258 Q 82 258 82 248 Z" />
          </svg>
          <span class="font-mono font-black text-lg text-slate-950 tracking-tight">projectspg</span>
        </a>

        <nav class="hidden md:flex items-center gap-2 font-mono text-xs font-bold text-slate-800">
          <a href="#security-comparison" class="px-2.5 py-1.5 rounded-lg border border-transparent hover:border-slate-900 hover:bg-slate-100 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] transition-all">Architecture</a>
          <a href="#demo" class="px-2.5 py-1.5 rounded-lg border border-transparent hover:border-slate-900 hover:bg-slate-100 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] transition-all">Live Demo</a>
          <a href="#how-it-works" class="px-2.5 py-1.5 rounded-lg border border-transparent hover:border-slate-900 hover:bg-slate-100 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] transition-all">Data Flow</a>
          <a href="#platform" class="px-2.5 py-1.5 rounded-lg border border-transparent hover:border-slate-900 hover:bg-slate-100 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] transition-all">Platform</a>
          <a href="#blog" class="px-2.5 py-1.5 rounded-lg border border-transparent hover:border-slate-900 hover:bg-slate-100 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] transition-all">Blog</a>
          <a href="/#docs" class="px-2.5 py-1.5 rounded-lg border border-transparent hover:border-slate-900 hover:bg-slate-100 hover:shadow-[1.5px_1.5px_0px_0px_#0f172a] transition-all">API Docs</a>
        </nav>
      </div>

      <div class="flex items-center gap-3">
        <a href="/" class="text-xs font-mono font-bold text-slate-900 hover:text-black px-3.5 py-1.5 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-50 shadow-[2.5px_2.5px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer">
          <i data-lucide="terminal" class="w-3.5 h-3.5 text-slate-700 stroke-[2.5]"></i>
          <span>Playground</span>
        </a>
        <a href="/" class="text-xs font-mono font-bold text-white bg-[#f0523d] hover:bg-[#e0422d] px-4 py-1.5 rounded-xl border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer">
          <span>Open Console</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5 stroke-[2.5]"></i>
        </a>
      </div>
    </div>
  </header>

  <main class="flex-1 bg-grid">

    <!-- ========================================================================= -->
    <!-- HERO SECTION: Agentic Infrastructure (with Grid Background & Glowing Keyhole) -->
    <!-- ========================================================================= -->
    <section id="agentic-hero-section" class="relative overflow-hidden border-b border-gray-200/60 min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col justify-between">
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-between pt-3 sm:pt-4 lg:pt-6 pb-2 sm:pb-3">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
        
        <!-- Left Column: Typography & CTAs -->
        <div class="lg:col-span-5 text-center lg:text-left space-y-6">
          <div class="relative inline-block select-none text-center lg:text-left">
            <!-- Main Sketch Headline Body -->
            <h1 class="relative z-10 font-sketch font-bold text-4xl sm:text-6xl lg:text-[68px] tracking-tight text-slate-900 leading-[1.05]">
              Privacy Layer<br />
              for your <span class="relative inline-block text-slate-900">
                Prompts
                <!-- Hand-drawn sketch pen underline stroke -->
                <svg class="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#f0523d] overflow-visible pointer-events-none" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q25,2 50,7 T100,6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                  <path d="M4,11 Q28,4 52,9 T96,8" fill="none" stroke="#f0523d" stroke-width="1.8" stroke-linecap="round" opacity="0.65" />
                </svg>
              </span>
            </h1>

            <!-- Stepped Architectural Drafting Pen Strokes beneath the heading -->
            <div class="mt-4 flex flex-col items-center lg:items-start space-y-1 opacity-70 select-none">
              <div class="w-44 h-[2px] bg-slate-900 rounded-full"></div>
              <div class="w-32 h-[1.5px] bg-slate-700 rounded-full"></div>
              <div class="w-20 h-[1.2px] bg-slate-500 rounded-full"></div>
              <div class="w-10 h-[1.0px] bg-slate-400 rounded-full"></div>
            </div>
          </div>

          <div class="flex items-center justify-center lg:justify-start gap-3.5 pt-2">
            <a href="#demo" class="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-mono font-bold uppercase tracking-wider border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2 group">
              <span>Deploy now</span>
              <i data-lucide="arrow-down" class="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform stroke-[2.5]"></i>
            </a>
            <a href="/#docs" class="px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 text-xs font-mono font-bold uppercase tracking-wider border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer inline-flex items-center gap-2 group">
              <span>Talk to sales</span>
              <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all stroke-[2.5]"></i>
            </a>
          </div>
        </div>

        <!-- Center Column: Artistic Sketch-Styled Keyhole with Sharp Shadows & Sharp Rotating Line -->
        <div class="lg:col-span-4 flex items-center justify-center py-6 lg:py-0">
          <div id="keyhole-stage" class="relative flex flex-col items-center justify-center select-none">
            
            <svg viewBox="0 0 260 320" class="w-auto h-[38vh] min-h-[270px] max-h-[460px] overflow-visible">
              <defs>
                <!-- Sharp Diagonal Cross-Hatching Pattern for Sketch Shadows (No blur) -->
                <pattern id="sketchHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="square" />
                </pattern>

                <!-- Razor-Sharp Edge Beam Gradient (Vibrant high-contrast laser edge) -->
                <linearGradient id="sharpBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#ffffff" />
                  <stop offset="25%" stop-color="#00d2ff" />
                  <stop offset="65%" stop-color="#a855f7" />
                  <stop offset="100%" stop-color="#ec4899" />
                </linearGradient>

                <!-- Perfectly Circular Top Keyhole Silhouette Path -->
                <path id="keyholeShape"
                  d="M 103.5 135 A 48 48 0 1 1 156.5 135 L 178 248 Q 178 258 168 258 L 92 258 Q 82 258 82 248 Z"
                />
              </defs>

              <!-- ================= SHARP SKETCH CAST SHADOW ================= -->
              <!-- Offset silhouette filled with crisp architectural hatching and sharp pen perimeter -->
              <use href="#keyholeShape" fill="url(#sketchHatch)" stroke="#64748b" stroke-width="1.5" transform="translate(10, 10)" />

              <!-- ================= SHARP SKETCH GROUND LINES ================= -->
              <!-- Architectural drafting ground hatching beneath the base (no blur) -->
              <g class="sketch-ground-lines" opacity="0.75">
                <line x1="68" y1="266" x2="202" y2="266" stroke="#475569" stroke-width="1.6" stroke-linecap="round" />
                <line x1="82" y1="271" x2="188" y2="271" stroke="#64748b" stroke-width="1.2" stroke-linecap="round" />
                <line x1="98" y1="276" x2="172" y2="276" stroke="#94a3b8" stroke-width="1.0" stroke-linecap="round" />
                <line x1="116" y1="280" x2="154" y2="280" stroke="#cbd5e1" stroke-width="0.8" stroke-linecap="round" />
              </g>

              <!-- ================= SOLID OBSIDIAN KEYHOLE BODY ================= -->
              <!-- Crisp ink silhouette that punches out cleanly against the grid background -->
              <use href="#keyholeShape" fill="#09090b" stroke="#09090b" stroke-width="1.5" />

              <!-- Subtle Technical / Architectural Inset Drafting Line -->
              <path
                d="M 114 136 A 44 44 0 1 1 146 136 L 168 246 Q 168 252 160 252 L 100 252 Q 92 252 92 246 Z"
                fill="none"
                stroke="#27272a"
                stroke-width="1"
                stroke-dasharray="5 4"
              />

              <!-- Architectural Drafting Center Crosshair at Circle Center (130, 95) -->
              <g stroke="#3f3f46" stroke-width="1" opacity="0.65">
                <line x1="124" y1="95" x2="136" y2="95" stroke-linecap="round" />
                <line x1="130" y1="89" x2="130" y2="101" stroke-linecap="round" />
                <circle cx="130" cy="95" r="3" fill="none" stroke="#3f3f46" stroke-width="0.8" />
              </g>

              <!-- ================= SHARP ROTATING LINE ================= -->
              <!-- Static subtle guide ink stroke along the rim -->
              <use href="#keyholeShape" fill="none" stroke="#27272a" stroke-width="1.5" opacity="0.5" />

              <!-- Primary sharp rotating beam (Zero blur, crisp 3px stroke tracing perimeter) -->
              <use href="#keyholeShape"
                   fill="none"
                   stroke="url(#sharpBeamGrad)"
                   stroke-width="3"
                   stroke-dasharray="130 420"
                   stroke-linecap="round"
                   class="animate-keyhole-edge-sweep" />

              <!-- Sharp white leading tip (Zero blur, razor-sharp white focal point) -->
              <use href="#keyholeShape"
                   fill="none"
                   stroke="#ffffff"
                   stroke-width="3"
                   stroke-dasharray="24 526"
                   stroke-linecap="round"
                   class="animate-keyhole-edge-sweep" />
            </svg>

          </div>
        </div>

        <!-- Right Column: 3-line bullet copy in architectural sketch style -->
        <div class="lg:col-span-3 text-center lg:text-left">
          <div class="font-sketch font-bold text-base sm:text-lg lg:text-xl text-slate-900 leading-snug space-y-2 select-none">
            <p>For enterprise LLMs</p>
            <p>To secure frontier AI intelligence</p>
            <p>Secured across every pipeline</p>
          </div>
        </div>

      </div>

<!-- AI Model & Gateway Ecosystem Infinite Rotating Marquee Ribbon (Sourced from "Logo Pack for Landing Page") -->
      <div class="pt-3 sm:pt-4 pb-1 sm:pb-2 border-t border-gray-200/60 relative overflow-hidden shrink-0">
        <!-- Edge Gradient Fade Masks for Smooth Continuous Scroll In/Out -->
        <div class="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none"></div>
        <div class="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none"></div>

        <!-- Infinite Rotating Track (Pauses on hover) -->
        <div class="flex animate-logo-marquee select-none items-center py-2">
          <!-- Primary Track Set (8 Pack Logos) -->
          <div class="flex items-center gap-12 sm:gap-16 lg:gap-20 pr-12 sm:pr-16 lg:pr-20 shrink-0">
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="OpenAI">
            <img src="data:image/png;base64,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" alt="OpenAI" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="Anthropic">
            <img src="data:image/png;base64,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" alt="Anthropic" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="Google DeepMind">
            <img src="data:image/png;base64,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" alt="Google DeepMind" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="Google Gemini">
            <img src="data:image/png;base64,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" alt="Google Gemini" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="Mistral AI">
            <img src="data:image/png;base64,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" alt="Mistral AI" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="Groq">
            <img src="data:image/png;base64,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" alt="Groq" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="Cloudflare">
            <img src="data:image/png;base64,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" alt="Cloudflare" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="OpenRouter">
            <img src="data:image/png;base64,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" alt="OpenRouter" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          </div>
          <!-- Duplicated Track Set for Seamless Infinite 360-Loop -->
          <div class="flex items-center gap-12 sm:gap-16 lg:gap-20 pr-12 sm:pr-16 lg:pr-20 shrink-0" aria-hidden="true">
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="OpenAI">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQUAAABICAYAAAD/J+CXAAAUmElEQVR42u1dB5AWRRZ+uwRPQATFBAqYRVBEMSsYMKAYzjLhGVZQS/HMd3pmTz3wRMygmFAMmM+AooiY8FAwohhQMJEUFBNK3uuv/vefv7Pdr7tnev7dxf6qXtXW/jM9Pd3Tr1/uCioPGiraRtEeirZWtKGitRQ1UVStaJ6iLxVNUjRO0TOKZlJERMRyh9UVXaToc0XLmAG40EJFTyvqqagyDmNERP3HnxSdq+g7D0agIzCSlxVtFYc0IqL+YlNFb2RkBklaoOh8VkMiIiLqEfZm+4C0wBez/eAlRU8qGq3oXUU/OzCHh9gOERERkRMqAra1v6IHWHVIAgsaBsRhzARmaK5ZkQpGyEMUHamoheE5zyo6QlF7RWvzdXiPHxVNV/Qx/x0REVGL2E7RL4bdfYKinTzbw0Lvr+jXFKrGUpY8rlDUJTDji4iIcEArRV9oFucSRQMUNcrQNgyMX2ewRSxlCWWfyBwiIsqnftxlsBscl7HtjRU9xgs7q6ESXoyRrHJERETkiB1YIkguwDMytNlS0ZWK5lNYDwZorqL94rRFRMg7fZZ7R7JoXgp4CA5n5uADuBuPUXQZFaIdTYAU8raiVxVN4YWOviBQagNFO7ItoaFw/2mKborTHxERFpvwAivdib9X1CZFWzsrmmjZ5b9VdImitg7ttVN0KTMMk63h+DiFERFhsAIv4gc1i62/Z1vQ8UeQHAKNkOfrFK2Soq+45xaDXWKRot3jdEZEpEdHRTcq+obMQUntHdtqxrv+TyQbB0cp6hRAReptsFEgrmG1OLUREX6AKH4v76ySeD/ewUbRgBfoZ5a2PqBCMFTIZChEW+riHm6vxbEt2kJgsEXQVl8qeG1gk+nOqliD+AlGlPujlH6rUjSICh4BG65S9Hfhd6ROD1TUTbhmHqsgg3kBh8ZxrE6UvjdUi66K3inTmIPRbcnMEYwKxtHGhmvh2UFI+POsrr3I/4tY/oDvAi54k80MG9gJVLC9hTABPGT4bZbpJljuh5BfunMfoa0bLZIGVI9bSfY6hGKCj2ief3+ZGDDqSbziOa6l9B4VQryj9LD8YVuyx+TcHOhZTYRnfGJaxCOEm5YYxH+T//9oy4siMconNbq1ohsUvaDobCrkTPhgfY0agSzMNXKc8NV4p0/LDJKEdPKN4jparjDEYd7hgWtWbqZQIXQOH/R9vKj6aX7fy9CBgYb2wFgOJfdYCSx+1Gj4MdHONNbHfewPwzT9OTGnyYZq8hWFD8SC+/fAuJaWCzThBe8y738pN1PoY9jNkH+wb8kC9mEKVyWuw6K+UFFTD13rIEWfkuypGMu6ugu6adp4NIfJ3kXRDzkwhFK1qyquqXqP3h5z/lw5mUI70tdCwGLcONFoWqbwET/HFVvwILiK3QtZ77KpAkjvTrpWv6CwRVy6kL22ROmuj8I0iBB9ggqenLkejOGAuK7qNZ71YApQ39uXiynco7lgtkF3TcsUXLncGqzGLNRIBLDEv0r2HIfTSV/boYgxmsXVMtAkr8qDa8vgfJolsJUMjAtBYndrxiFJ8zSMO6J+oC3VjAy20YXlYAqbU03vAD7anoZG82IKcM0hL2GOobMHsToB6/uRDrr6ZDKnTd+iuT6U8W6YpV8zmRn42CXet7QJr0ajuMbqHc63SAWmhdsgb6YwVPPjnYIRMA+mgPvf07T7IxsYdV4G7LCXk7nAS1G6eIoKuRqSraOa1ZWs2EmYTNCUlOLfylTwOqRxC0fUTTRklVo3l0j6e0yY6+55MgVc8J1GN5cSj0IyhU1Yj9ZxSTCm1g4vuS4VXH5LLfaGq0tUhGs112wWYKJfEPoACWjDDG2j7x8I7U8jfxdtRO2hmzCXp7GtyPT7XXkxhYbcsaQu/TgVIunyREsWnU4mc13HH3gx2wD35mFUsPaDCW1pUE1Q5wHBPxdTob5jEt9lfKeuJEdsnkKG4BBHwHaA9PJxpI+CXJdVrHs1vzXle032lSn8N1SQ3agQZr41bw5NWBqDuvYW20JgHFsQ6FuoYIbciwoh31DjWrGIjPyYz/m5yIUZ6/hNFNFJmJNbWZ8HEEtyKG9uHdkutITtati1n2QKGWlbZfg/xvUB/h7x/DU118AdjbKF3+exOPtruMXBlnuySAr46PqyXq0r5a5zh55E5lDgJNA+wkFnkd2Km/QAZN1lBwvPe5HCRSLeIjxnrOGe1sI9R/E1ezvYLoqEhXo8ZffY7MZq0RLH507j+XW1n/QT2oL6iZDf83j+bc+eSuE8PS3I7J16zKLmFqlvXurDU1TTCr9mTkwBu9EEzb0o734Zf7iXUM0ApaKOtTu5BzutyuqCa/HX1zNOcqWFEe0bkJFvTOawcTDWtTyZwjFsm3FdmKU0ind1XzTjnTptub0x5BYWLzGF9Szqnmkz+Qdlr/l5rPCMP5dct7kwLy+n7IeVKUxO/HNWyoE2MYVBJLvlYAtYP3EPDHEjNIOB6x+mQhKRK3A4zUiyxzoMzDjJXYS2p3tIOq7i9ovC83p7MoX3KFsQFZLJVvfoPxj2q5Q9eOsjgxroyhQmUfqCwL0zzuFLhrZn0e/PNqngDcsUo9IhD6YwW7Mjl4Mp4Dm7OhhidBWZ5rPa08xjEcE1+aEwGGdnnOSThbbzSM/+m/C8GzyZQgh6wVGkh4r2SsDnTiQ5HqVfTu87h9LHtWxM5tiE6zXXnyj04195MIVk5NyEnJnCbNYJXfVriOV9DDYIHCpztEdb2K0vNYjev7KRKw89vyoHprAtyQlTWZnCV2yfGMUMfIHDPec59PtGsgeePcgfO1TJ26hwwE91yoXRL0dGeG7KubuczO5zXXJgK4NKXbTtNA7NFJJnNnycI1N4NwN3hWHmTTIXeNnRo639DIMMm0fzlP17XhjoPA7IbSHYFWZkYAqjmTk2TEharViXlnI5frLo+TsIOyS8G+eQPiemAVvbTTYbMPQ2GZjCArZv7M7trMOS5RMWtXNSCp0e0tRngvRs2uDuFfqxd2im8LrG6Nc4J6YwOuNCeIrkHIDh5FbYlbi/OiPkgJQ6/mShb3mUfGskLJKFGlHehSn828GbsLlBanPZtccY7oE6uIfDO3cQLPYDUjKF6Sx1maTUy0kOjPM1su4pMJqzhPt6CP14IDRTuFvzol3qAVN4yWAgw052PrllYf7VsNut7dmvBqQ/JatIeZ2WPUVgkC09mcJ/yD39vJtgEZ9usC1sJngaTvN457MEMbqhJ1OAhLCdA/OVDLG+RyLeJ/SljUX1nSow1VahmEKlxoZQISzwIqoNC6OcgKjVlT+ouSX/b87cHarKwZYP/SYW+0vRjD8kX0nBtPCXUn4l1BYK/fHJg1jMhkvXszpeFnYnfNjbaP5/mGEuPiG/MziGs9qUBLJvO6ZYoK85jM1w4Xcfrwuqi5viHJ4zqH1FLCJ9UFpxkR8W6qOq5EWR/BiOtuhKH2gYAyb2CApbbNVlUcBaC7fjkMTig5sTdegeFtShpex1qNa8v8+iqhYWfoMcGWbjFP0x2UOmej57iGFzAHY1iM06DDMschPmsFRmMr76wLUM32sp5kCHQ+n37sZSuIQtD+dvVoeqkEzhA9aHk7rbAZad4uLETtWWOdnLKSYnK/ChwCW4JasVpUAgSC/hXoTPjtWI2j7vsIxtMSa0zOGdwbRWEvrzk0dbY1I8HwvFFBaeVD8RNdjZcO3+bNDzIZONZlPPd3jf8bpZAgN0NTTiumMNv0HSHenQxlTSe5aArdjeEww63fpjB728A+kttIt5B4AoeXVONoVrBUNO8l1OtbTbh7LnrI8V9LQtc2AKK5O5zsJMzfWSTWGflH0weVySsS4bUr4xEkV60NOm4OppaicYB12DmDoJbdzoMeZSzdOrQ9kUiqJLMpIRSSkDLZzwQ5Yo9k1IGw1ZnJnsYJ8IjeoU97ygUaF83YhTLR9EaGwkiK7TPNtKmwj2leH/qyZsLGuWae6bleFbSYsqw1oq5jo0d6QxglTam6WyzOoDsaj5T83viKQ6w8IYivHvXfnabxO72aZU9/G5ZmFs4NnGJOG3HXPo844p+6JDWkOo6eNcIWFbalqmeayrRWYQcXm4oFbA8zPDkT4W7BJgvj1DMQXgDt4xkx0eyKK0zVi2gEV6WIBvpt9SUpMLLa3e04nyK2terdn1fGMLxgu/7UXh3ZK9UvYli16chORxqU7YOKSxD0l1EXuS7G5s5kmVFokkE0ondTHr1uMT4l4lSxEwvCGF2VZnoZjqPJR1nFJLNPL9UaAU0WMXJaQKE+DGuZillsY5Ttx8zW7nA+jRcwzMpB2Pw3OB+grPys6G3xZrmLsNaVPGWwljWSp9mHL+ETzWJeBi/qWOMoWqMj5rL7YfzQzZaF+BC8/nxewjDqLoh66IKRjCqcLia8RGojmGvpgMjXuQv6GRmFmV3vNNirEbSnJp7lDuWil/wGSdlgyNac8SMNVeeDFx3Rpkjghsl/MisdVTcEEWQ+NaJJcLzIPOsvTJydBYii6WxiA1IMLrMHLzv+M8BbijkCzzQ0ICuI4X494lImzxeDX8fzCly9VPg6R4NydFG3cKux7i6kMU6OhMcnGNO1K0uU2KexC0Y6ognXRxg8HONqgtu9HyjcOp/CXyfJIEnXTLtx250TIWU7t6tI9Ek7uoZlIMdNAn+AN5lGqGw0IURQn6CTlJCm2oZtju4ynHb5wwZvDwtM8wP80t8/OlIMVJksLnKYx0Uqr4UZrrHyJzynVFinFAYRiX+I/alBQqhflayhJEFlosrM1t0koKyYubUs0sOHgmpMNhF7GNwMfttD25F9lAkEwxvvypnJjCUZp7Lkm5cHcnuZrQJHIrRqszRj1jGauThPttuQ8+pb3wnUwjc96F7v2OFD7gPTzH4iT67bwLSGe7CEytNpnC1sK3MJSl5SwkqfpDQjGFNpqL7mUj4ziyH355JskFL0oB8eZYQd+azgaaUmNoXkxhlOaeXTJIWyMsY4XUWZ8S3XDrTrS0OcFiiG3tMH8uVXyw+0m1I0YLTG2OIKm0cRyL9lTzdK9i2vtedYwp3CAwwu0oOyAxmU4S+4bMcRteTKGj5qLrSj4G5DbYDmBBQFMvhxdCbv140ufGX0GFGIck8mAKnTTcfBZl83SszqK8raQXIvC6GfQ/MJctmOPb6kwiXsBWnt4ldXoGSzrSR3iHpQ1p7i8kubRaZ8s7bEbmk7cWGWwctcUUmhiYVzUbaMtRxPfwEEyhk4OVvykbG38me0HPTQ12hXs0g7yM7QnrCwMQmimA0T2tuf7KAJO1HateLirSd6xb38djg912puO9S8ktQ861yMoy9pScyNIMpEQUOEEK/NeWe1+12AeakTndu7iwYXPah7+TVXhB7sv/l9TYG+qY+nCo8NxzAhoVtxf69mwIptBWc9FwQYwbQfYDWK6hQtgrPogLSF/xCIU/ezgYnEIzheNJ73ZtH2jCejowzyy0hNzTvPOu0YhxcwlM24HcXHRLmAm4VJj+SFjgtcUURgmMr21AptCAzK7hRaR3+XoxhZV4cpOlziT9ubuDvjub9Ubd//t5iOohmUJ3w4K9JrB7aGeqWRw3BEEK8YkvaG2RNrIypypPN93CQOMAiWqTOuZ9WEfwDDxD4XGO8I7nZ2UKWOTJY8l+NOj3pWjEu66ryLuAbRWuMQgVbPj7KhBT6EE1j8orHke/Sg6Ttg4ztGWBFsJE8j/3UmIKA9iwm6YvCy1eDxP2Y+NmlnH40ME4WhtM4VzhmUfk8H2tLTDZKRoJ3IspkMGQdKBj57CgrhIMY8tYz/HJGoQo/4BmN0vDFMC8zjb0D6LWnpQfYL9AbYe3MzAHeC1OSGkEtZ0QhXF+ybM/+OCyBB/hmY+nkFSwABDY1sLhGeVmCpVkPkpgHuWXHCbVL905K1M4RHPh054dhDj3JNWsz3AAuQeq2Ayagwz36eopnM5W8TeFwTiTyoNKlnqGOngoiucL3MeMOYtHxOXYuAb8kf9XWKhYHG+xdBAqUg/GzNvI7LIsLTuPfBqfQ3qhYn1qINcF2oYXi66NXhoPiel5V+X4XR0gPPdSDVNYaKDJFQYLMT7W0mixpcxtfLPvetBvh7AMJ7eDQSv5wxzAYrcO1TwIT2p+259qRiNCXZHiJy7hgauNLLt12EuDD685vz/sBbPYgDY1UL/AFEw1ABEWe3fif8hX6Er6A2Zn5sgwOzCtyUzwV37e++RfMi4iIK4m/+CYUDvGOIt4PZdFQpPEcaKHGLrA0tbyBBdJISJCFJd0Ynte4g8MJcMEi21RjxxK9nDqwY4MAUk7O/yB5jQyhYjMuMCgT54ZcGeFWHoOmQ/4KD4T9Q9d6hxWkv0o9a/Z2NjkDzafkSlEZAZ08DdI79O+MqMqAaYCw9kUywKGDnkIudch6GxQPaAmwLJ+HKU/Fi4yhYgIKsSSmxIuYKFOc0Yiot5Gkz0wB5KKr/vmdtJ7KVaNUxmZQkQ4dCdzDD+kBlj6EZu+okXqQAbbIySHraK94eR/bFuR2SzQSAht4xRGphDhDpdiohC7EX32sGbHhVi/PxMiH99hlaCYHbYKSxuwB9gCTVA34SyWQNKoOjBCJku7gQl9Gac5IiIfICDpLQofww/fdxWlr3ZcSfraiPBvd4jTFiWFiPCSQhEIpMFZA6i1CA9EVus9RHskH8Fo+X2G/iOm4njNb8it+DBO8f8xn8zJXnGcIjKjPRXy1+dlkBCgbhxJ6Ssco5DJSEPbb1H5i2VGRERQwb2HAh8ogIHYcJ0REf/7QmAOSOTo4mk/wNmXpoIfSFNeL05NRETdABYsDnxBWm9nlihg/ENcwiCSA5RwXsEpVPAilO7yuBdx+CgDfz3J1X++8WQwERERtQioCYg9WEz2cmC/8uL/klUU2z3FNN6OcZgjIuofkGo6g8J5L8BE7qfyHRoTERGRA1qxKpD1OC3kOexHf4wsx4iIPwRQ0aY/Feo3ulYjgisTRV9QxahRHMKIiLCoKzss7A0wTKKQy+bMLFrw/yFNzGabAWoTot7C3Dh1ERH54H/M95mz2N9BwgAAAABJRU5ErkJggg==" alt="OpenAI" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="Anthropic">
            <img src="data:image/png;base64,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" alt="Anthropic" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="Google DeepMind">
            <img src="data:image/png;base64,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" alt="Google DeepMind" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="Google Gemini">
            <img src="data:image/png;base64,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" alt="Google Gemini" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="Mistral AI">
            <img src="data:image/png;base64,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" alt="Mistral AI" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="Groq">
            <img src="data:image/png;base64,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" alt="Groq" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="Cloudflare">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2cAAABICAYAAAByWY0bAAAgAElEQVR42u19CWCcR3X/zHftfUmr+75tS5Yty1d8Jc3RhBASkjQhKQmUUAqUlrMtNEC4aUvLUWho/5wtIVAgJARIgByOY8eOT9mWLcm6b8mSVtr7/I75v7EcSEoOx56VtLvzS8b7abWa/b43b957vzneYLTEcDqdKJlMYowQRhgr8JYZCn0VoUg2WRa3VlQITw8NafCzfr6koCRFTJI6wTohhNZBUAZDURTMoh5N04hhGIjjwiEIAlJkGQNkUCL7rl1r8jTNXYoIcWPDKCACrjMIrhYxykeI2EHn7PBnBPQvTBAOw+8icN0Pf3sGis+SSMy7jh+ffgShIHwuDvVqVD8zsV2obEwmE9J1nYl+qqpKaH9NJ0RRpAUzqovE4/EllTnoC5JBH5eqfUVBIKZYDEnw82yO9X2q21Tk6dbJpQbYGgK+YEm+y2KxMLMP3H8xiSXkD1zXVIkiBSisKEJMjiCrHCTIJiPDn49dio+MGtVGkeoXbcWDRjzlRFLIJshRxQiKNkEVdZQ0zxDq5IwCX2Lfvtm57m49mWUywsv5/dTGg+0lciqFIrqODC7bFY902iaQGZIkCcXAD7+izizVg9ptVossK4W33X57UVdXl00SsE0SxRoDCZvgLurBVxZCyQcddp//E2oc/LQAi+sCd9rjVvSusK744IHi3d3dQYzIdCQaDaiqllG67vF4nA0NDWtZ1DU8PDwwNzc3w13UBQWm2OVwORxOe2VNeUWh2STX6AJ+o2bg62jMcYnVz2JMHoLX5ywW60R3V9fZQDA4FggEMsrJ5eflmTZv3lQzv+DPZ+CSjOPHO44CQVPTdb9WqxVVVVWXORz2agb3i1wu5/STTz45tJROu6CgwFZdXb1+Kb7PbDaTfIfDaNu/n3gRIveCnQUnEAaqEjZhEp4LhpIQ55NstQHbtm2Dx0a14HjlbHquKPjBoaGh7ng8nva2u/766+t9Pl8Rg6rI9PT0IJRZGghxD3Vx2LRp0zU2m/0xuGSh031jI8PvHRsff0bT9axpk40bN20G979sfV6WZfAtLqOyp8d43O83QgjREcAoLclkMgT9NpGJcnW7Pe7GxobmbOxXMzMzU5OTk+Mao1Evk0mRLRZLIXj9woaGRnNxcRHZt3dfXBDRhKalFkKh2Ev6m5Q2ZZQkXJjvdcJT1cCP5VXlpQ0Op2tnX1//FklS3BCTmPTF2TIw0S8EKi99FijFtBBEVtPP+JMi/KsnFcUUWb++bUzC+p7R8Ymj4UhsSkBkwI6j033TkRVP1Jqbm1dLkvwrFnUB+34/vPyQu6hXRnGBR8aiqVaUpFWr6po2GIJxg0FQU5ISMgMJjL6mkBD81/D67lgsHqmrrT2mE/LImZ4zXVjAvcBPpiGgWfHOzjA0L1ETH7NabTcyqC4C5GMDvPrSdb/Vbje+rLr65sF4/LMsgsVwOPx9eP27pSRna9asARuJf7VUTeyPxoxn1rdBF0AEGGFQwGgYdHcwT9SHD58ZOKvqegDoWRBubRbu72wgEIhA8JAVg71AYnZ4PHlfAh/izSYbZ7FYn0mlUnf09/er6f6uSDjyt2Af7mZQVaq2tvbvoc/9CHRM557qYoJjtwiB/wcZxnJ1tZWVGxYWFg4GIFrMFjlZrdYHBEEoWMZbIBAXGGeqqo06KGB7ZyDcnUAYjc3Pz/fPzMyOgb0Nw+fmgBMPzs3NhDJBrs3NLe2yLP0sG/tWTU3tf4VCoX/z+/0Llxiji15vfrnH49lRXFx8LfjabfC2KxyOkLa2Np+soMdjscDT/f3THaFQcPaFAba0kLOqqopyk2zeWl1eflmSoA2gdKvg7QKdLJIxfPHzdfQvzeeLVyPihrLyqiBVchGTDrcQfC6pLBwEgQ6AQFesYSGE0BEcD6PqTNxFvTzyPC6Lx+1eVVlechWWLJeDRdysIaMQpXmVHe14oOtXgrruXLV69aAoCs8lEoknHA7HQSBoUxCMrNxAhJwjq3ZG+imhdM/Op1IIxWImMCoeJk+PkG0ZpC4ytAcX/KAvjF3QgQr6zrwuoLqGRrqEfB6dW/GIRwUB9c/OzvaAznYjJIzLsjg5MDCQsSPq4BjpEnrXUst7CXyKQ9f1pVIeGyP5JUVRMtH15dxbXRwqKirWKoqyiqGdFTVBuKm0vPzXkb6+M0u1VHYpeOxK6fPnjWcxvK6jP+Tl5etQ6CzaPPSEcU0jHTar+QT4NAjWQ0NAlKMrV6yGjLLMlr7IV1ihW13S4L0AqKup2VRaXvq3hAg70bmtL7jTMPQZ+JVIEKlQU/gWSXK/efVq10P+2dnv9g0ODsaTSYMZOXM6nYLXW+gFFn1LSUnRtXBb68DLV4KyiWmWoQv026URvManu99QU+PqikSiB8Lh0M8mJydPRyIRFXHkFCwWm1heXlWX57bcabc7rtIJXk8IcizDrVDDtUrXjXpwoFdVV9d05LndPzYI+V13T08kmUzyxrpUFBYiVF+P0OAgqxpzfQSfkpeSxULWGQbSC7wF815vwQg4lRlRFA5IovSLYCg4PD09zRWYg2OZUFbmlZ1O2zuhX5awrRlvLSkp2Qgx4iCQMx4/pR80RnbSAnFKjSjinTU1tXSrSm8kGj1ZUBB8uKys7NCxY8cSwWCQSyuD0NBQW1VaUv7P0K6rTYr8szmf7+Hp6bOjhBhAxM8Rv2KHzdZUWVF5q0bQ27wFBeaK6sl/2b0nOc2EnJUWFFhqa2ruEMyWO4ENttKQCS3hfrYXLAoUL7xcbrfbN0B5g8Ph3FvTdfqffxmP8ygiR3DHHXdYBvoGbrM5nO8VMFmlk9/vYVxOSNToQrBb6XS5N4iS9La2NvMHDh06NEII32pxKagcHSUbFQUNupkN3vGZ6P8TOJBFe15Ix3x1Xd9ZXFJya15+Xp/H4/nexMTEnlAoxJekcXAsMZzOvFJFMbeDC7EwrloyDONP4fWXUDg5W3pgcn5Lj81m22K32662WW0H2pvrvrTv8MkBVdN50JAhKCgo+kdorNZoOHT/6dHR++Px+Nlo9CUToQs+WaaJ5Y6VlVd8XMfCW7BYfwahU/99SeSswG3D117WsmE0JH9SluXLjHPkiNkenksBnSVZDwStKbxu/a42Xf3awSNH/4erSnajvb29yO8P/sDudLRDIJlHln6A4EIC3RpN0yotFmtj27q2L3Wc6Pg+b7mLx9mSEtyzejVC02dZVZniUn1V0MEO4MOmdQUFhTtcLvdzmqZ+tbOz83gymeQkjYNjiWAY+M8IwavSUTcQvlt2bF7/1af3HTrOJb2sMENbrAlHInWC4ty5YUP7Nw4dPnw/F8vKR2tryxZRlN9Et7XIJtOXRVH8k7UtLR9+ST9DyBcKhX7c39//U0kQ/rO0rKw5EnG+2zCERy6KSCmyLACj97as2/ipyYT1KVGWbzQWR1eFFSYfS8JsXm+2Ob51+eWX/7Rt/doWieav5MgaSKKITIpi3bBhwx1Oh3NvMpm4Bt6mmQZX8j4GkRCyyul2/Qfo5f1r164tF2k+eI7Xz6QUBUWtTLeJcftwYaBnUVSaTKY7bDb77q1btz4ApdysKIqZm9ilt4Mgc7PZzPdu5QiqKysbSktKqK9L134fmyZYPpKtadIzECYD4SaL1faVXbt2fa+lpaUc+rzAxbJyAZ7wHeAjbeFQ6JvPP/98ANqr2GyxbrJbzaV2u8VVIkkui8V6dXFR0b0N9bXbz/T3n5w6O/MUkPGqqy9bV/m6GxdImbCtvb19y+Yt3yRY+BRZXDa20juwgrFwq9vt/e81q1a90eV0OmlqU44Mjw5lGbfU1pZdvvWyf3A6Xd8gCDVmgC6+GFbQy7/yevN+0NhYv4WeV8NbddnBD116faA+xAF6fKfZbOm8evv2u69tbi7jRIGDI01RuklEFpvSBq5uVVo7toCv3LJlSwGX+MqKZQVBfHtBQeH/rlm9epPZZOIxwwpEPnROaJhKRIimhkL7zm9foedrTuQj37vtysLGjw4NtIOT/DZBuIQgYe3igbCkFz4XjSHrta+LnDkcDlNzc/OV2Gz5lkHIn2VaEAFP3u4t8H5lY/uGd3o8Hm50MnpUQsHV1dW1rtLST6qC8CG0uKQ2EyERIvxJUVHJF2tqanaaFMXMW5eTswyFJ0LQ18L5+Z+rqKhYxcWxdEjRw20jES6IHEBBgSu/qrLgcohnKtL5PRAqFpGk+rbqzBrwzAUIEMdvL/B6v9rUUHuZxcwJ2kpDEzqX8tqkG0bseG/vSzaZPdM1p//iN52p+9aucwkYF0FbThqG0XP+1wFqziWBlF0wOXM5nfmNjQ132Ky2r9ENbihDO6xBcK1O8D94vd73t7bWFMoyX02WcWxGknAVoKys/KMYC3eTxUxHGQ68s7Sk9NM1tbVXyLKs8FZetnbgm60vDXbDIHdarbZ/rqioutJstli4SJZAazGmaZu5IHIAqiq3JpPmq1D6t5EIFlm6bXVhIe/DKxA6QVsKCorura6qW6soJt75VxAOQPEjpIFdVkpLS+0vstOu/HzvmyoqKv8qHo/fSxDZlUolvj0/P//c+Y/QfBmyQZDvghrU6XB4Ghvq73I6XJ+GyGUNWnl7y14viosKi95XW1P3oWvWlTi5KmVWELJmzZqCkpLSf4Qf74RizZJHozO724qLSz6xZlXDegi0+GjlBWB6epr09HQzrJFwYnzpMHs8njfV1dV+tbGx/k0Knw1OO+iWVZAzF0SWw2oxm8uKi5rBV1QtCRGU5frU2rV3tra2cn+0AmMGjeArvIXF965ZU1UjyyJvo5UDukhxFuI4c0V5efuL3jcAca/XmxAE8Y3Qj/2JRPy3QM70xvx8XO5wVlP/iUV572uSLJvValu9atWtdofrQ+cNQlYoADyLJxDU323yVN3X0tLCd7BnCNra2mxeb8HXQen/HC0elpxVMRaUrV5v0debmxtKeWu/Nux+Py4YH2dZJc84yAbUT7Tm5Xm/0Nqy5gaBT+ukN0oT8LkVBVwS2QuTyYQ2btxU5/bk/QUN4Jboa92SIN5uURQXb4GVqRaiSG4o8Ba9A4J9KxfHSrLJ5DEaT8iKcmdpaal4nrGF/f6Fp/r7+x6QSOrjhoG8hYUlN27ZsgXLTmeDaLXuwhiFu7u7e1/VYSqKIqxva9tssdk/S+jmtuxbe+zxq8q7XHb7u7gqZQYsFts9hmHcnIXE7PcETSdos8vl5Sn2LwCOujrk3badk7OVi3qH0/ON1tb1m7ko0gdd11EymeRLcrMYGGNRMZkaCcHrljLGTKlqWSgS4XtIVzBBUzXpfa2t69ZzUawcnD7d/StN045JknRjfl7eX57vxedsdCQSIYc7Tj4GBGw/fObtFW7rlY1VxTclENoFBO5/5ufnX3lZIx2F29m+cYMiKQ/BjyUoezeFOmWT+RPr1q69iaczX8GMRRSFtrYNN8iydB8dN8h2PyxJynZ43r+D5+azuq8W+Y+NkV0dHUxlz6XKFvRAVa83/4G3ve1tLtBnLt90RNACX9aY7YCYLE/TjPcQvLTHfdAsyIVFxX9RWVnJ956tXLjtVtvH+VFRKwfxeDyaSMRpsjqSl+/9+JqGGs8qSbu2UBSP0rwCqpbSt7Qdf2+Trv1FIGW8KYDMH8MYPd3Z2flgIpGIvSI527JlS6VhMn0PDEFe1ksR45I8r/e+devWbLLbuYNbiWhoWN3icrk+jRbPMFsK0Kx99EDiOB3ogBI9f60u+qu0wwrP+zftrc3Xemz8rJlXwkBFBd7bxgcMVzo0TasbGxt/YtWqVfVcGmkwVoZ+LmMjR/Zi06ZNbeB6rl6Gr5YFjNrLMd6Qz5thxYJgfM3mjRuv5JJYOejo6OiKRiJ3iQKeUZH8wT5d+klBU9MXtm/b8b4d27Z/4NDJtn/tRvhnGhHuVkyp32la+D5VVYfp374sy3Y6XS5C0MchAm3OERliegp7dVX+uwShZOzo0dEprlYrB3abzWm1KO9Fi8lo0klU6JK2IHzBaDQaHY3F43OLxIwkgI4J8M10nb/TZrMVWSxWGmSWQ7Gk8Z5KKovdb3fjkpNPdIxOcE14GcxBEw0O0XM+WNXIRx7TZGOhkzSbTab3Q/+5D/qXn4uEpXAFxBd+ZC/y8vKg++A/B1+0LHs3CcIN19nsW5wm85HfJhN8FGBlQsSieI/L5XoyGAxm4hJnFS3d4PeFIIku8Wgdmv3j9KlTz65uaHib1WS5y+mwXxZD+AaIGPM1A6egU/vVVKorEAw9U1Q084vx8dmxcPhVApHq6pqbFEW5BS19VkYqjNj5YNeMlm7TK4V5wY9vIKrriNNm/W4oGlN5X18BxMxuFxrr665xu1xXG4tEKC0QMOozCNodj8f6/PPzB+d8vk5/IBB9uc/m5+e7PR7Pzgqvt12ymGtUgt8Eb3vScFuKLy5eETQ8N9rt8/9J1ylzjfg/qKhAaP16IGiDrMJcLYOlkUCL56S8ku0yQaFn4riWwbZTj2tzOF03FhcXHxgcHPxxFmhf9Ly8l/1sPIgB5jRN4/YhS9EIIITcuoy34NpdUHTFmfmFX6OZ6T7eIisSGOL29rrq6rKOkyczcDCXHJ2b8+2hS/pWiDgPJpOJ+KXWEk8mjY7Tp3sqXa5PFhUUVPkRaicE1WKMYkB0xuLR6L6J6Wl/V9dL/+6PyFlRYeE6m81yD1y60/zkdJZiBBN8CGEyQRAJjIyMBDVNpw4POxwOc0lJsQtj4iIGKSUEXwaepwGld+akAALv20VRPHz6TO/xWCzGnd0yA0hZlcvtuR2in5o0fcUClEdMJtOjp06f3hOPxyPz8/Ov2u7w+wCUXyUDgcdlqzmvqrb+AMb4WiB31yH2BNLrdntu8rjd+4CcneIakXYHkbF9XhHIwfHJ6R+Ho7H5VyNnoohdW9ZUmc9GkVkUBQ8hAp0BXgul9jx5SyfKPR7PnW6361ggEMz0IO8I2IFv+/3+5Aq4l9loNMKT2WQv3grFtqyhKiZbvQX5awNBfz8E0LkaG1HiMA7SuEACQSA0IBZ4sZPFmNqa1hiWoAKonk6sfD0DPe/hqanJr4A99WWj4owFgwYUumRx+EI+/xJyVl5QINXW1t0imMwb0GJa7/SoDzBkk2E8mpjzPdc1N0dvNADkLL6wsKAaxuIgJE0b6/PNScAuzYQQFyh3zdo1q3cSUbwZGrENpWf5EU4ZaJvdnXedoij9QM7C3CcsH5xOu1xWXnwVQfjqNOgjWE10ZGRk9JvhcOgJWZZnpqenX9cI+LjPp4PlnQvHEt91Oxx7aqtrTiUJeQf8qoKlTkLZUVxScnUwFOoLhUJJrhkcLwdZIEML83O/mvEtTL/a52jadSEVEUMp+BNBsIA9haABl9bV1a62Wa3Q39B1i++lBYLd7ti5a03N9mPd/QOTgaiRwSIfDQYDj0xMjMe59nGkC2vqqxxmk/IGtMzJisAu5Hvz868CfX8OyNlMjjbHyPj4+JeCweAFHa5J16IiTGQQnuItKHQWFHjLRFFqBmleDjZ2NWK8ggHayOItKmzbvHkzPnz4MJ9cyGC8hOAoNttW2Wy+Tk9TmnK6vlI3yL8dP37sJwIhs3oqFYmkUi+rQMlkEs3NzdElRpHzZfJIR/y4w2F7pGV1040pQ3w/vFeaBoNlIga5q6qq6jfRaPS4qvLVjcsWbMqmIovFuRMuWSelMUBpdo+Ojn5ufHzskKZpF0146EmDcz6f5g8E+vIKfF+trSsbnZ4uuRd+VcfQ4FptNtt2RVEehR+HuGakFVl/HpdhEDQ8vUBnWWihSyHp/q/hWCx6RJGlx265ovXbQ0GZ7vF8I0rPUmJX0uT6K00yn0AoepyrHAfHK8Pi8LwLY7FxBUTaAsLCm2tr6x88ffrUbOoVYrfsBo6Gw+Een2/uyOv9y2AohCHeUDDGdlmWi9rbWm9WdfzX5+NYVhAhZnWHQiEB8WNhsoOcFRYW2iuqqm6E1mxPA+GhJOvUyc6T7wbF7gTluahgOByJRCPR6Jk53/xQWWnZU9XVNZ9BGF+HGM+iEUSa3G7Pm0VR7IN7jXI1WXrY7WZhw4bazcCN72BctS5h8vj0xPgHRkZGRo0XpmovVcE1jRzrCAdOnOx7YG0djroKi76oI1zDri/h69+wtvJ/f3MkMuqLJLjRTSN3ydUHj8ViqRhC0z/6zcEZneBDJUXFN9fX13/RWAweWM5c4yQR2uubVjWHY8dPw/fyETAOjpdBSUmJYrbYriQr51zP4ny3q12R5WNAzhK8hS4clMxCobEvLfN79u4f9Hq9B5qaVv0r/LyBUawg6rrhhLhV4uQss3FulJhmebJarM0CFnYh9svHYiYl9ZNYdP7OeDx+9GKJ2e+JEyFIVbXUyOhox9Dw6DsMXf8hWpxZYyoXQcC3WCwWL1eRZQKRPFrKfi1ie6aZAfpyYGh07CNd/YPDrIjZHwganfE11Fu7e35aHQx+Bd6aZVi9ZZw4/zSBJA9XDo50IpHSDDoo5UgmHnTGIrfouvY7tHisBEvIsmy60+22FGHMT4rg4Pi/UBQF5+fnXysryhq0cmb0sWqQL2zctKmGt9ClgcbC0Wh0TzIW/byMcT9ilKVQFAUH6E4Zl3AWkDOn02muq6/bDJrRxrj+OPjdX1gs45+bme3sBXLGdBp8bGzYNzs1+kGkq99Fi5mz2HEDgta0trZey1VkGaw/KI3L7cojGO1gWy+a0LTI14aGhvrTef//COrzTDD4nxDUfgcxnInBCO/weDxeHsy+CDTvrG+OuU3kQKhrbo784vCRoyMjox/VNfVx9gSNXL9jR2OTTE9R4uDgeAmqKiusxUVFt9NLFp2NoS+ygw/axVvo0hEKhUhwauqXiqE/yCqGhdhVJoTYuXSzgJxBQ3qJYVyG2M5SaMlk4tDExOTXnt0b7hsdTc8DnBkcDY6Ojn0eEeOniO00riBg4W6uIksPURDEpsYGury2kS3h1h8Ihed+uRTPAATQGB8fvx8uDzK7/8WMyhtFUeJncb2ASGTxrDOG6seF+lKMj4+dHh8b+bih6wOs656dNV9mGFjmUubgeCmgv603DGMVYjBghIEHiJgcZBUjQcz4jrLiYitvpUtH98SE0Tc1TduGUfp7okD7OLhkM5ycKYqEm5pKyyDwYz0SMh2JRL7a3993xO/3p3Xj6PDYmG9kdPiLcLmbaTCPUGt7c6mJq8mSA4I1fBtiu5dwdGBg6DunT48v2TlWIyMj04QYX2FJHHTduA40kwezL6CkBKHVa1jWqHGhvowuj010q5r6WbhknZnwzYjtoCAHR8bD5XSaPZ78qwyCWBg3IgjCgMVi+pKASRebO8Rb6mpqruItxQY+n+9ILBab5JLg+D05k0RJ8eYVthGCWK5R1RKJxC/GxsZ+t1QPMjk5PSzL0jfw4rlVrODwFpbfztVkaUEQFgnBa5kquoC/PTk5ObbUz9Lf3/88vDDrB6DfrSg9x0hwcLyWLj8kCuhhxtW21dXVubl0OTj+AJvNVul0uTaixXOxLhWpeCL2s4Gh0QMEob2s7lFF6O28pdjA71/wx+PxEGKy7wyrGOMYl2pmQzIIssYS+E9YVgoB5Cwh5N+DweCSncmkaZredbprb2NT07/Dj/chNsuTcEK33NPY2PhgX1+fwdVlabC9pdlKEClnqI+RWCz2GFqGTHwLCwtzQAx/ZBjkKhakiiwexs2X3qUPXLavAJ/Pp586dfprq9e0XI8xYpWYRvB6C6/o7e39IZcwBwdChS4Tbq/Law0TsoVRlUmIjx5S1YGF8jKtZ3yigu5tuuQDrRVZ2by6qaGlp7f/NG+1S8O2pibR480Xo2zWmKUg/g5mmgwEjNY3NTT8pa7rMYj/BHpAHFk8Fxku4dWA/zA6n4US0/cl+Fenm/HhPwE+dv7z586Wo1f6OX8Of0sMrGN63hzCBq0W0/cJ3Z6H6TV8mtBviEYjkd09fX2DK4KcQTHDHa5jWalu6A90dBxb0vOYaBZH/ex0qAGRvf1Nq+h31/whNn/N0YhX/IwgiiVWq9UJlwFuQpYIDjddZ8/wfCXycHdX1xjVkSU3OIKg2Wy2wXA4QvWHRfZP2+XbWiuf3tvB9ZGivx8hVUOojNnEf4aTs/TqeDgSGQIn9xiYzLuYDZ5gsjpDhS1gjCXo49KLhL+UyU10gx5ax5FV0ARLVUzy0iNkCljUZ2jqb48fPzFMiGaIOPHLykp0uWag2y5VV7EgFFqsjvdCH3jfcvjWbIKf4HVmhMvPEZFLJc0iijtMyJd5ngtvM1ttm9LuxF4ZC5pBzsLryiBnLqvJBJ2rjGHnUi2W5I9VVV1yAc/AQ/w8mdzfmIjfTs6t1SYqvNowRjHqRMGPGRifO7RdoAya0mYIDBLwZ0C+cEwQzmW5ScH7ChQNfmmC9+h0Mz+HZ0kjHv1GVknz6MkLKTX1o5Sq+pfjWWKxGNn/3L6BDW3rH9YM/FcsYtkUsdGltp1cU8ARVVUh28Z2hKbPsqoyldkSSS83AHsYctul3wQi+l0M62zOTDuFLm+oq/1uY10tETCRUroQVETDTccJqf+A5zIBddKhRQSCsSYgItP3CcEaFogJ7EFMxEhBGN43cFQUiA1+b5Bzw760Jc+NGGNDR3F62o1BMD31l9ZjgeuEbDZ/4emnn+7JzcOAs9X3YWw2mysMLGyl0SoLAq/q+mcgHju3aqRvIH/SQN6O8nIfPR/Weanm1+u2tW1trix6/vToDG+9i4MsSxKWhGsgIGVxPIERTWiB2UA8E8/nlc+X5QJd6bdiBmelGy9rruyPEhurCoHsHHa7O4aX64EWFhbUgwcPnoDLE7zbZx5sNhvWCL5aYqaPKBgKhWO6vnznMaqaPh+JJY6ZzRaabILFo23jmrKIuoEBsiOZRJ119ayq5MsaX7U/iZpizRvDkbkgMAIXizoNA7dmoiyARVXS8gdSTFBSf1E8rb8KcT7/ObUHj40AACAASURBVIP84X1Nx6/4eU3/4/e1ePw7hJAerpVZ0regNFrM9trmpmtjGiphVOfJubm5F2UBPAkqEzmAUMUg/Hb9JY7m4BSRWmKi52/M5plPJxIJfujx64RJUcTGupr2oqKi6zWCWOy91WVZDALB5wM2GQ5hMGbehdgNtxJREP7n4YeZZ/TiyBE0NjbKkiQVM6zSNzk5EV2OmdwXEA6HtZGRkVnMaGmsKGLv6tWInw2FFgU6wbZKngnzVRCJRNCTTzwxCaZ+DzvCh3lCEA5OzqBsLygqiWnCXyA2S0cSFpPyZfA9L5lFCQaDz8fjCZqoikVOAIfH42kvKS4p4S34+qDIslxXU72xqKTkY0DMtjOKw5N+v3+Q50jIAnJGCNnOsL6UIEq9iKej5rhISJJdWlx2yszhBRg5oUtFDNhhmImMBGzdVF3AD0sGTEMTd7Gtkju11wDoMZ01Y3bmGSGEDzRw8H6FMR6pq6WD5awGJ4fHp6YPG4bxkhktn8+nxaKRPQwzW6/Oz7fucLlMvB9fIGpqajw1tXW3FZWU/rNm4BsQoxUbtE0VjH/BJZwFsTA4WZabsVMmkzkONoZLluOiIGpJiSbhYTUvBPpNzw6JrIBHow6Syd5FTcdS/2gBkNg5voyktBShlrUIxZlN1vOBpdcOASifMhiaee4wOHIejY2NNmKQjyB2S6sfGRoanAVy9ke/mJiYeMZmd4yYzeYSBv2vwunyXGW3O3cHg3OzvCVfGZWVlYV2m+0thUXFl8OPbRCf1LLk96lUqnN0bKybSzoLyBk4WBvDRDtqZeXxlChqfL0rx8UOFyjn0qKyi/sirEjRJcJAL7ML5eIIJ5Zissz3RgFGAgEiTU6QvLx8VlXyZY0XSNBYJdVSJBFfv6mu8PEjgzyw48hZFOXnbwInsYpJ70RoHIjZ7kQi8bIDk/5AwKeqqR8COaP7zi71LDWRGHI7IXITXPM+/CLYbPbqhoaGD0KcXQDm0m6z2wskSWqAX+Uj9oNShqFrj88uLPAEdlkRChOWgTBKPPxwQE0k+Mogjotk94YhmtkarQLE5iDPSyNUhF16WEHA2G6389kGdC4bJvL7/ZgVOaPZ8rhUXyPww8jAmGjs6sO42G03ccly5DI0Qj6ssPI3iByKRKNDuq6/oj0zYfw4OJHPEAb+Eepoqaqq3hqJRI6GQqEszjlAaoFsfaK2tu6CSKggCF5Fka+ESzNa3EeYtkFVsMujZqv1J7wnZQk5Y+20I5FzAQ4Hx0XBYhGSoEc6Kx2CIJJG7cse+OHF2UAmhMowDC0YDPIljYBbobwFyjfZtZPEpfqaBJYeRSKxmjmjZ4GGEiTCJcuRq9jctuEKk8m8jZHbiyaTyaeBmI292ocOHD06umP79p9LsvIeBt8pm03m2+w2+++AoHW+3FLKLEG+LMtvklfe+goVE3Lf7j17Fnhvyg4IlFAxrM9st9tFvueM42IRCkkq2HVm9B4CSU9RUZFZkpY95mY2aiYISC8rw5ycAehJm4xPjExyqb4mgUUYs5vdTqm68dC+Tj+XLEcuwmO3CIIs3gROj9WRRgfHxsYOBAKB1/QRJl3/EvhIJmc7EkRWt7dvaLBarXyAa2lBBESejMbjT3BRZBE5g47JbMQS6pKbm5vlFRAIc2QoFEWliQZYzr16t269zEbPT1vmR6OdgsmqFYyNlKad4okr0OJhhoxTU/E9ZxcgI+iiNi4GDo5LR3NNRZPTZr2CkX/Qwdf1AEEaupAPJ6enZ0QBHWT0KPZ4NHp3Xl5ePh+gXzpiBuVUYGHhsx3Hjs1zcWQROUOL2eyYAPqjLBFC19bynslxUSgpKVEFQWBJzuxTU+N5qqouW+p5u13BVVVuJ/QPD4v6VBUFn34a8cXDgDKvF7fU1rGsMsWl+pqgS4VZHhzNN7Bz5CwWdPmmFBGqWcRNAkaDiXjkiXg8fkGD7vvHxhJTU5NfgcsEi2fRCLq6vr6mGnN2tiQAIQ/65ma/1NXb26lqGt8vnU3kDDpzDzMKT5CJqKoXLvgZTBwXhf7+ft0w9DMMq5Q1TX8TIcS5XM9kMllMHk9hGfQPB6Mq05kqF0TFLJ28iNI9UFNYiFB9Pcsa+Yzkq3UmWcYlJaXFBkFtDAOMaS5ZjlxESWFBntvp2ACXLHyD5nDYj8bjiacnJiYu1Ngb4xOTdAFCL6NHshKC77kG8b27aSdmGI36fLPfGBwaejyZTMa5RLKMnBnEeJ5hfaIuileA1vClQRwXhTNnzhDRUB9lacMMA93a2tpUsVyDebqOq+Nx8RZWRMUiao+n614NhFXVEMKMqss4OyALiC8NeTUDL4oWr9d7GWK3PwYJmBzjkuXINVS6XLi1supmk9myA7HZj+yfPjuzr7evP/a6HCQi8yZJf5iVvwVydofU3FTGWziNgTtGw4H5uc8NDAw+EI/H+X7dbGxjk8l8mGWFGkFv37hxo4eLluNiYZLRbsZVuiwW1zaE0JLP6JpMJrx69eoiMKZrGVWpXufI25+u+yWE6DohrJJiSDdf3ppWWxAIBPDU1BSz9MQEoRDvga8SeWFsE0W8i+mAAOFnI3HkHojN5tTtjnawOUUs6hNFMqnroYfm51/f+FIsHo+e6u7fA5cjjB7NGXF6ruYtnB61wRidCYX87+g60/ujeCLBiVmWQtq7d19gy5Ytc2jxPCgWyDPJ8hXw+uNlCBwERZbtDLMeEQmTmVhS5ft7lhBP7j08vGPbDj9htEfr/DjEP4GeP3rw4MElXUJlMilms5ke0IlYLaucuvd3T0TS2IeIIOAUo6MM8HTSvhOxWzLzR9B1XUylksyW0GgGCvMe+Iq6gaAPrScEX8OyXrOE92ZqoPSisvRfTvi+00yFQA+rFKVtGkJXIUaDhpqGGxyO4qO7dhWRi+jbdJVDHrPnU8wfB1vx8KFDh3hqdzag+3Kjmpq8H+HYl491nAwQkm2HVpEfgD+/Hx5ruQinDt1yZsWQM0KMFHTNIRAMK3JGc/O/z263/zoSiSxZoEMDh5Li4rJVjau/YmDyZ4yqDTlSUwW/OtDLkwQsIQzD0AkmI9CqLGdd3JIk/Z3Tbv1YKBJbsgQEGza01xMifJAOeDGqslsD+aTxlumeK2br1zEy1qU3QNUdUIpYbW0D4sH7+ivA5bA5QM6fRWxnoONFSvhIhopkMpFInEomU8tyrIWqpuYJP1Q0I5Hndjsa6+q2g7FtYBcD0UFpbKOJBJY9zCbEq6oqPYby27y1L62bC4hMxuLx5w2ifa+j4+QeDZCNDwqmzH/69Okhv9/v482+uGmTZunpgLKF2aiJIG5sXr3m5kNHDv9gyR4E0NLSvDOl6n/GsNpuTsyWZwQDE7wf6Ewby0plSb5r3aqGJ/cdPfnbpXiIwsJCeubfPeCoKljZL7tE9oETTie51MBIMhtUgXvdlF6Djj2GgSoY3i/fWP0yKM53Sq1rW+4GY7iVcQs++7+7T0czVCxPT01NvndsbIzrDMfrgoFwJUTYl6PszWxtURT5eo/L+WN/MMQPmL9I4yhidDoVDX2m90z/7/yhcIKLJHdAR0DjEDweQGxTSEMcLL8LgtPmpXqQ0tLSakPX38k0mBfIL7iKLAtUgskj4LWYzrwShLyabP1UaWnNVqu1IO1OcdWqpm1AdO5hWOXcwszU74hhpJOcpYBQBtnJXGgpLSlJC0FTFAV7vV4gZpjVfj6aZnaMd7+XAmQsNa9uuklDyieZOyCBPIT48QUcOQRZls2FhQV03+amLH5M0WK2bqgoL7+Ct/hFAwsYRSfOzk1yYpaD5EwFTE6On4brfpb1yorSVldX956iosK8dD9EU1WVuaa6+v2acW4kihUmhoaHHuUqsvQwAKOjo4NweZK1vptMZqqXn2xsbNjs8XjEdD1DeXlFI9jWT8AlyxT+z3cOT81oupHOtUw6cJQYq8qA6FkqKirfm44bNZlMjuKiYur8axlxM92bn+jjPfAPyM/PN0N/eZMu2T9lIFzIuPr46OhYj5HeZbocHCsKiqLklZSU3ExNWDY/JzipQrvTdm1xsVvkrX5xUA20Mc9b8A6H3c6zX+YaOdN1Hfl8vrMYk+cZ122FQPgttbV17yksLLSm6wGam5vFipqa92MsvBWxSUf7Qlj5m8npWX7+znIYdULQ3OzsAiZkdxqqN4mi/icej+lTDQ0N2xwOB/PzWCqAjVRVVX1SEMSdLMUiSehZjFFaN1hHo1FjbGyMJgg6y8rGKCbTjpqamg0s71MURSrnUri8CTHaA0XXvB89PhDgPXAReXl59vr6+rstFivdZ7YaMc52Crr8o5mZuX4gZ3zjFEduBFyCgJub60vgcmMOPC6EgLaNDoenLYueia5aoXuipl+lRBG7JEFmp9N1e2Nj01UWi8XEe1DuQFrsQbovPz95wOczU4JjYeV7oRRA7/xgY2NjCEjgd+bn55lOzULgIALx+5iO0N9CYMUyeUS8XJl/VMI6Xyu9TIjF45He/v69DY2N45TvMK7eAvpyldVqq25pafn4iRMnHovH45e8tGoN6Pzq8rIaX3XV57Ao38ywL1F0nznTdzgajaV1eQPdaxwKhToMQ38MyCWTZcJApGrKyys+AaT7r0ZGRphs9oUgx+71Ft4HHpDZ0mlFNH40NRXOeaJgtVrx+vVtpdBef2symagO5CH2x1AkNU1/ehkzc3FwLDkwxord7vmUYSBXLjwuIbi1rKzkhlgscnJyck7Ngmc6Mzg4+JmFhflTr/SBpqamciBUP4TLEhZfSLdjOJzOT7a2tnYeO3bsJPhoPpiVAzjncGdnI9rzz488B5dPpOE7CmRZ/vz6tc0fzsvzFNF9IgwCM6GmpqK4vLz08xBkfxhKEWK4sVYSyA9/d2zsWDSu8uU2ywQ6mp5IJk5hjH6J0pOqWoGyymw2P7Bp06a9l19+eT3oqQ2IxOueSTPJstBaUmK/8brrbvDX1T8ExOx2xsTMUET9V2oyfnopZhnMZuxzOMRRhnKXQK7XVVbWfKayss4rXEI6MQeVtyQpW7ZseStUQ7OBMTvoOqXjPZnfc15/k9FZSNB9ier/EZOpoL1947+CnYZL04fh1940EDOi6/qenp7uE7FYTEMcHDkC8DX5QFiuQNmbCOT/wgoWu0UQLGU0o3YW8M1EMpkcj0ajfa9UTpw4sSeViNNDvVnGj3V2i+UjYKOdvBflBs4FonQZWSqVGNW0+GFJsvwp48CSLhdyaUS8r7V13RaHw/mFPXue6YHvjABeVyRRVFSE47GYE0jexprq2vcZBF+72PkZdj2MfIlUdHdSTfn48MSyEzSfpml7gC/diNjPnp1rbtBNmyCINFPpkR3bt+/2BwKPDAwMduBzhxGf23ulgU4AJcKqiLEuiYQkNZo3AtFMjGYBY+e1GzY0zCH0roOJ5LUIC27WgawkkDPegsFnLbaFIJpLv9zHx2fhmS3TtbW1dFaD1Z5RiyCgu2tqKqCPqfcHg6H+UCikQhu/DtJoFr8hy94nWlpun5LkL7MkZtSRxuPxkQynZZLVYrE5Har91T+HBdB7CfSays9WWVnlLioqXAdtccPfI3yZyGjE91UQGB4aetDn8/VwK8eRK7DZbIIsSe+FvufIsUf/08qK8jeEw6HvBAIBNdsflu6ZD0ejf+e1WDZCW29mRMSxRvAdWzZt2n+0o+P/vd7YmSNDyRnF3Jw/ZbVM/qqmpvZK8N1/gtjvLzDBvzeGQuF1mzZt+p6u6890d3VR5xwMhcNqMpl82b8rKaEbyZxyQjW5brrpxvah/oErNILeapC0BOuqLGmP9PWOPBsKRTNiRNdud5gKCjT7csaEQKASfr+f+Swj1GlMTU092djY9AgEzu9Bi7Nd6YIbgtZb3G7PTRs3bpwCa3qSIDIInSAIpCKZ0iS/VUFxhxlps2FVAWJmExCuIBi1ziG8kxCSrn2VUaJFfvLcs5GnxpZwB6SASb+A0Sj0M5YJfRwgt7+sq62rsVqtDxw/ceI5aNezCwsLr+iwFUnCXpdLArboKS2vaPuBx/MWg5DbGBMzeF50ovPkyalMNuYpA69qaGi4px7hKIQD9Ihi/FLu9nsnbyYEg80geWCXGyGAWGUYxL1Eg/lqIh7fnUjED3H3m/MAhSMml8tllyRpWfwtPcg7FoP/Y+kfi21ubi4UJfmdOdjODkVRNkuiSBOsTeXCA586dSqxbt26z3k8efScNyaDXWCrJSyIH13X2np4/4EDHVlnDDCSwRbYwBasmMyUomGkfIGAqun6kpPhlyzh8geCp73hyK8dTic9ONabpgaogkDgPoyFO9c2tzwFb42dnZ2ZCIUjNFvkdIHZCBgE40CK2A2ES1ta0GqJlJaF47aKvr6BW+AzpWk01T3B0MLPYvHI2UxR6PLysuuhLGMmHxwJBgM/AiI1mpZITlWD0C6/EEVxJxD69Sj9ESRNKlNBzs3UYXqgOqKTO4KgowSED4kI1eHFcQvj9yFv2votnc3pGBwcecznCy5p8BKJhI/FopHDZqu9hTERUoDwvSESjW1tbGx8DIj9qZHh4QmwC70iJlNOBYWhAYgvgWxgBqpsJlNdTUlZVUoUq4H9Xw3ErBalYZmdgMg34DWjk4FoBt4M2rn5Ah/5heB0qTHh8839r29+nmfF5IDYh1xfU1NT/oI5XWoYhhA8ezb6rd5eX9r7PvgvugLElYsNTRDemZef3xQMhc6CTzdy4Zl7e3v3XLZ16/fh2T+KGCWrA3tdCTb+U15v4d0+32woy+jZJrAFH4CLFXNupKzrz+4/cuRZLR5PLis5C4VCxGqzPmy1Wq6IxeLXMw7K/m8AvMrAuInax6Ki4rnCIjTwUnKGgJyh0kQCrwKFzIc4Od3pWMFuhB7p7x/bGw7HM2bKGGRD2+n6ZbyDWXA6dL9iWsjZ2NgYisViz9bX1T1stlhrc8y5+aPRyE98Pt+xpf5i37w/kp8f6iix2mk2xOI0fIUHdPcuUZT0+vqGeWDcvaLwB3LmThCbgYQqIG218T/sKU0XMZ8dnZjsVjVNRRzpRDgSifwc9HkPFwXH+TjgerADb1i2cBAb4xZL4qcozQMzRUUlhTR7NVyac7St60pKSt8wOTl5HMhZTmTEheeMTUxOPlBeVr4BAsprGfkvekzVzvr6+ndhTO6fm5vLpvPPNoEtWFFZTJNYpAfG00z2y0vOKAYGBsaAvX5bUUxUSOmekaHKKpLF4O9cADiXEJalH0kI7zPi8QfD4XAywxQar4DvT+s9QDBnlJWV/dBqs7UbBrnh5fQ2C5FKJOIPAzl9aLluQELkKYie3qGnh5z9PkCj5+HQYhgY/SGfK35h8CHtowuyiH7pm5sdo8eKcKQNBsa4I5VK/lcgGPRxcXCsEB+GCSFp/36vN3+7oiiNiP2sf+Y0MsbXr1+PvnXwIArkgqkFf0IWFhYGG+obvh+Px5sJu33zbrPZdI/H4zkF5OwJbgvSq7XL9c1/ZCimp6fR8ePHn4bI8HuIbbaZlawN0+Fw8Et9w8OD3E+uTPT19Y0mwuEvQFfJiTXrAiJnFFX9l1AoNLtc9zA0OjoSDAUoOczmkc65/sGh34XCEU4Y0ghN1UaPHj3yzv7+/iEuDY5cwtq1RUJZmeM6uCzMcVE02q3NV2IsSrnywMFgUN1/YP9vJqcmaTwdY0hgGgoLCu8pKS6p5j0sO/GynQRYfmKNpv7LEDK90UB4Q5bLIK6mYn9/7MSJA5quG1wlVmgjxePk8PHjHds3bLoHW82/Rlm8PAQsrz+eTN559OTJ4WWVeTJpCKr23wJCd0HHWIeyL/2zQQxjdywW79D5tFn69BmjSCqlvTscDvPBL46cQyJhv0ZVzTsQm4RWBDANocoZlMbNzi90XUkS6TmSRYzqk1Oa7SOiKP6vpumhXGh7em4oELSwy+V8iBBjO8bClYjN7Ck9++T6TS11R0/i1DdGp+eTvKflADmj+M7Ro9Ft7e1/rjicj8OP1Sg7p+Mh5o/9qyzLD3FilhGGzqg+eujZ7vb2e202+33wljvLHpFghM/KeujOvYc7ekAll33v4+FTp+Z3XLblw5LJSjNtZVUKaGCaXSOjI9+dnZ0d5r0rbTL2afHoB44eO/o0lwZHrkGRZVGWlM2EoCpGVc7Mzc18qru757tp77uAK664gu4JfJRV/Ad11Vy5bePa3zxzYH8u6cHY2Phps9n6jdLSUqoH9YjNQKcjrMl/Q2Rrryj6H4d4gQ8wZhFetcMd6ewcCIdD7wQtoqehZ1vDB1xy6sGTJ47/23PPPceJWYbgfwxD6+zs/G4oFPoq/DifTcSM2vBwKPTJvYdPH14JxOwF+EORfWbBeAQusylhRjiRTPwmFo8f5L0qTQMNGA1HI6FPHzlx8lHj9Rxox8GRBTCbzaipsb6+tLiIZlBlcdQKEQXca5bFn5/3F+kuht/vPwPxH8ulyHJEE7/odrtNuaYP8XjsKU1VKdFltbyRNlJFXV3d28tKS2sEQcC81+UIOVNVVe/u6joY8Pu/CK2+FNPoS0bMDEP/YdI/+SliaGGuBpmFZDIZGhsb/ZaiyP+JsuPcFNqv+gOBwL/09Pb8HEhDfCXdXFdXl+afmfoYXNKsnNkQZKsmk3mfruvfn52djfAexV6+UI4FA/77unvO/CCRSEa5SDhyDUBA5NLyyis1gnchNjMlcQju9y0EI0uyB5gQgiD+m1qYn/t/iOHAnChKbY0NDatyTR/Gx8djQ8Mj39A17TjDWFogBL+5sbb+rvLycivvdTlCzs5Zg0Qi0dvf91vf/MLnwb50ZvoDg4UM223ajwOBqa/u7pyaTqp8QDcTQQ8vHhoauj8c8P+bgFEmL0sjGOPjoVDwYwMD/Q9Go9EVmXzjSM/g7OTkxBfhMtNnmggEOP3Dw4P/srCw0Mt7EnMko5HIU0NDgx/p6x/4WSQa5YNfHDkJTdOKksnkFsRoObimqWf7+nq/PzIysmSD5ClVjY1NTD4Ll5MMqzUrJtO7y8rKxFzTiampibF4PEb9KEu7KOoYv6umpmY773U5RM4oYrFYaHBw4BcLC/P3wo8nUIaOngMxO2syyf8+5wv869DQ2HAqlSJcBTITQGLosQ9n+wb6vx8IBD4BbduTgXqpYUSeCwYDH+3v7380Eoms2E3ShmHow8Mj+8bHJ74APx7KWIOH0aikpj7S19e3F/SH93/G3VLAxtdD4dC9Y2Nje0Gf+SZ1jpyE1WwW6ioq1kHUwep8K5qa/dnpmdklz3YKNnNEFsivELvZHhlwjdebvzoXdWNwaOgJomtfZxmvQMOUClj4xJqGBg/vfTlEzhYJWjTR19f7pBoP/bWI0Z4MC4TP7ecJBQP3HTx0+CudnQMjkQgnZtmAcCQa6Dlz5uFgKPoe+DGjkg6A0/tmJBp9b09Pz55wOLzi+5OmqcnR0ZHdkxMTn4Zo4/kMJMOzumH8w/Hu7id5z2ELEZPjqpp627Fjx/95dHT0JJcIR073B0lyONxuOpPBKtMhTdDxzeV4lmAoPD80MrobLieYBWQE5eu6cXUu6obf79dPd3V9C3zoYcZB7lZXfv6HeO/LMXJGkUgk1CMdnYec7rm3CIJ+P3SwTDidnB5+eiiRiLyl89SpHwQCAT9Ny86bPntAj37o7Dy+f2Fh/q0CIl/Gi+dyrdQ21sEzDWGs33XgwIGPnzhxohvuX8sUWQNBSwwNDz01Mz31AZA1JTmpTLABoA7dopi8+9ixI48GIxGe1YqRXAkhI4ZhfObIsY6bjhw58stgKLQAfoLbV46cBhZwKRiZP0eMZs3A1j5+9OjRE8tj8zUjFot3YUQ6GFbr9nrzr6uvrynORf0IRyJTBjE+A5dzDKuVTSbzO9a2rHkjxjw3SE6RM4qUqhqPPHLat3fvgQ+pavJWcM6n4e3ICgyGVYzJSDKZ+IooClcfPHjkoKppfJlNlgJIg97Z2Tl36ODBv3cS40o1ldqDFrM5rpTZHUpiRlKp1H8cP3F81zPP7H0wkUxGVFXNuEBW13Wtu7f3SHR65FZBT/0HZjiiyhhUtgFNSz116lTn255++sATkUgsxXvLJcs0CKVHU9Uvd3d17dq799lPh0KhcdBtjYuHI9chS5K8dVP7dQzT5+tYFP9nOfvX9Nmz/SMjo0/ApZ8Vf4Xwc4PJZLrVZMq5rWcI2lI/duzYAS2V/DrwKHaTHBiXer1FH1mzZk25LMucoWUwLvqkdk3T9I6Ojt/U19d12e32vzSbrW9Gi+c3LPfhwCpo5LSma4d1Lfy1zs4zh6LRBA8acgTRRII8+uyzx/Py8m5urq+/zWyxvEXDwmqyuLxEWoZbomlzB9VU8ngkHP6vsYmJI8FgMCv08VDvSLQybvxDYZ7nlzZX3j+Bk6lGi3JeCWciJjEh3clk8icDQ4Pfm59fmOO949K6FpQZwzCGQ8HAYxAE/Gxubm56zjfHZyE5OF6EskKPVTXw2xhWeVJVteeW+7kETJ4REDluIHwloyrdtTUFzcQIOLt7zoZyTU/oHvPe/v6Hm9c0bwN7ei0jvylArHNZcXHxJxKJxL2Dg4MLvEfmGDmjoMtXTp/uGoVA+IuFhYVP5Xs8tygm82WgHGuXgaTRgJdm7TsSjUZ+PTs7++TZmZl5vsQmN7GwsBAc6+39Xl5Bwa8TknhNYVHh1RhLG9Diger2NH+9gSGQhdch3TD2z8ycfSgUCnVPT09nXUrxsbExfWJiYm9DQ8PtimJ+I9iCG4GkrUPLR4bpzFivpmnPzs/O/Djo9x+dnZvjs2WvHzR1Nh0lnxEEMjo3N9+ZSqUOgVz3g8Of5+Lh4Hh5bN3QvPNs5FwMxAI0fvn24cOHlr3PhSKhkXgidsJktm1FbM5tk6MRaZeA87eazYEnczFWi8fjfcFg8Ptut7sBHr4OsVkGa9Z14xqrxfIclJ/F4nG+YizXyNmLAuE4lGdLCguPNWy3pQAABRxJREFUmizW9WXl5Vcoikw3e7YQgmj2mHTNW9POHAVtHjYM4/HRsdED8PNhUPYZv9/PSVmOYzQYNKCchcsHwpHw45KktJtMytrS0tKthOD18H4hFBsD/aS6RpcmBGhmq9nZuQORSKQT3u4CcnZqfHw8q8kB9D3S29s7YTZbv1dYWLi7oQFttpgLdkSi9p3w60rEKJX0a8g/ItCMnQLeMzw88lQymTgwNTXFz9d6bbmp50v8vA7PSAI6bRIi/V0Dc1OEkHFBQH3T02enEokkX4HAkXXAGDOLFQoKCoSpEPmgIGBWMc/w2bPTJzRNW3YfMje3EM/PD/2suNj6pyC1Fia+A6GmgsKCzTNzM/uAnMVzTfcgTtCGhoeeaKivb7M7nO+Dt5yMqq72er1vB705PTg0dJJnJs9RcvYCpmdnaTC0PxKNHJEk6ddUQfI8npai4uKbgaTRtKl0Nu1Sp27JYp9GEwrWfz0yPvF8KBwbM4jRMbv4/ZkQzELQg7+eDQokYhL2SProSr/PiYkpOvL4hCzLu4G8P4wIrgVFctdXlVdYbfarVYLpSGfJef18YfQKo5eOZJEXFeMcIcCkR5TMux0O2+kDB/bTgYKzgWCwNx6P59z5TolETB0bG+lXVdRvUvxPJhKWVVjARW3NDW0xTbwdPlJ1Xr6XvHyDBlTACZNAhgf9/vlfTZ+dPQbX4/CrnpnZ2RD0sUwJDJHNZvNFIvGvp/+7CMhMD5tFEnWKWmjfqWGqoxpeXHWQAk1PnR9gGJVxYmZ0KpB1SxZB3P3w77fBH13ygIGiSIdNJlPOEVaC0dPgv7Jl4MOvaRKzJXVNTU1YEMT9oF9dLOpzu1OHu7uneiDIXhHBdUnJVIfV4vpmNGprImxmeYgikkERI/n8AFGa+r3wX6CzbgbR2xghZIblvUE8Euzr7/9eY2NTwGZzlCJGSWSgfaLlpfm2mZkpaSGVUtMhV/DBI9kSy74cLJLxHMR4yzIwkvYNg+C87B+yWKriFZXFnUDlITxYBx1xs04wJWulF6RkBKUEjEcMQp6BWz4gScLC7OzMzOT42EgkGp1PqVpGpfR2Op0yGAtXlgQ7hqCnggvhWEYGck67zSxKUokki3lbttS6QyGXVZI0MyGCZBiCBLon0nBEEAjN+pkC/dXhNWG1RqKdnWOxcDjhB2c8DaQvODMzgzj+SD9QntvlNlsddXV1tQWSIDtBhvUIk7Vg1NvBAjW8jupmoboTQB4OaYZ4xuWK+0Sxa+a3v02OAhkOZKZ8MMrPz5dUVXMvQVtAXEFUERNNxkSd8YfVXNNHu91ukiTJBv36kgcIRFFIAKKxWCynRqVdLpcdtMmcJY+jq6oeisXCTPyXx+PB0MfyQL+YxFaKYkSCwWgilVoZ7tXrpQGZ3aFqkolVnRAPqpFYNAL8QU+fzroZreAiGvR3msiL+aCMDZiZJMkmlnVKAkmEItGYmqYYOZti2VeQXywQCsd13VhyG78k2VxorzBkGSdFkXYOatTNhS6XpX31avcCwRCwEYeAsKIa2ELOZaElhiwaMU0XEljUfKtWnZn/+c/D0UDg3KZ0OrqiAwzoIDz65WBGIiwWBeu6IMD172fOXnCyNLBFf8hISgTBMBIJlc7ecOFdAARBoCePgmwxDYoVOm5D7cBtt7U6xsYsHjANdhCmBwiblaDFPMAmUY/qBk5phATeNDHh65mcDD24uPSO2oAUEGYgykkjyhcvcnBwcHBwcGQJ/j/zKNGVRh4emwAAAABJRU5ErkJggg==" alt="Cloudflare" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          <div class="flex items-center justify-center grayscale opacity-60 hover:opacity-80 transition-opacity duration-200 cursor-default select-none shrink-0" title="OpenRouter">
            <img src="data:image/png;base64,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" alt="OpenRouter" class="h-6 sm:h-7 lg:h-8 w-auto max-w-[140px] sm:max-w-[170px] lg:max-w-[200px] object-contain grayscale" />
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>

    <!-- ======================================================================= -->
    <!-- AGENTIC INFRASTRUCTURE COMPARISON SECTION (Dark Showcase)                -->
    <!-- ======================================================================= -->

    

    <section id="security-comparison" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      
      <!-- Outer Dark Sleek Card -->
      <div class="relative rounded-3xl bg-[#09090b] border border-slate-800 shadow-2xl p-8 sm:p-12 lg:p-14 overflow-hidden text-white">
        
        <!-- Subtle Atmospheric Background Glows -->
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-[#f0523d]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- 2-Column Grid: Left (Headline & Features) | Right (End-to-End Rehydration Pipeline) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <!-- Left Column: Impact Statement & Features List (Moved to Headline Position) -->
          <div class="lg:col-span-5 space-y-7 text-left">
            
            <h2 class="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.15]">
              ProjectSPG secures millions of enterprise agent conversations daily.
            </h2>

            <div class="space-y-4 pt-1">
              <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">
                FEATURES
              </div>
              <ul class="space-y-3.5 text-sm sm:text-base font-medium text-slate-300">
                <li class="flex items-center gap-3 text-slate-200">
                  <span class="w-2 h-2 rounded-full bg-[#f0523d] shrink-0"></span>
                  <span>Context-Preserving Masking</span>
                </li>
                <li class="flex items-center gap-3 text-slate-200">
                  <span class="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                  <span>Zero Upstream Retention</span>
                </li>
                <li class="flex items-center gap-3 text-slate-200">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>Sub-20ms Edge Sanitization</span>
                </li>
                <li class="flex items-center gap-3 text-slate-200">
                  <span class="w-2 h-2 rounded-full bg-purple-400 shrink-0"></span>
                  <span>Hardware Envelope Cryptography</span>
                </li>
                <li class="flex items-center gap-3 text-emerald-400 font-semibold">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>100% Reversible Response Rehydration</span>
                </li>
              </ul>
            </div>

            <div class="pt-1">
              <a href="#demo" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-950 text-xs font-mono font-black uppercase tracking-wider border-2 border-slate-900 shadow-[3.5px_3.5px_0px_0px_#f0523d] hover:shadow-[1.5px_1.5px_0px_0px_#f0523d] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer group">
                <span>Test Live Rehydration</span>
                <i data-lucide="arrow-right" class="w-4 h-4 text-slate-900 group-hover:text-[#f0523d] group-hover:translate-x-1 transition-all stroke-[2.5]"></i>
              </a>
            </div>

          </div>

          <!-- Right Column: Interactive Illustration with Full Rehydration Showcase (Architectural Sketch Style) -->
          <div class="lg:col-span-7 relative flex flex-col items-center justify-center py-4 select-none">
            
            <!-- Sketch Shadow Wrapper: Sharp Hatch Shadow Layer behind the main stage -->
            <div class="relative w-full max-w-[510px]">

              <!-- Behind Card: Competitors / Direct API (Sketch Styled with Red Cast Hatching) -->
              <div class="hidden sm:block absolute -left-8 -top-6 w-[280px] rounded-xl bg-[#14080a] border-2 border-rose-900/80 p-4 transform -rotate-2 opacity-85 pointer-events-none z-0"
                   style="box-shadow: 6px 6px 0px 0px rgba(159, 18, 57, 0.45);">
                
                <!-- Cross-hatch sketch texture inside competitor card -->
                <div class="absolute inset-0 rounded-xl overflow-hidden pointer-events-none opacity-15"
                     style="background: repeating-linear-gradient(45deg, #f43f5e, #f43f5e 1.2px, transparent 1.2px, transparent 7px);"></div>

                <div class="relative z-10 flex items-center justify-between pb-2 border-b border-rose-900/60 mb-2">
                  <div class="flex items-center gap-1.5">
                    <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-rose-400"></i>
                    <span class="text-[11px] font-semibold text-rose-300 font-mono">Competitors & Direct API</span>
                  </div>
                  <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    Rehydration Fails
                  </span>
                </div>
                <div class="relative z-10 text-[10px] font-mono text-rose-300/80 space-y-1.5">
                  <p class="text-[9px] text-rose-400 uppercase font-sans font-semibold tracking-wider">Broken Model Output:</p>
                  <div class="p-2 rounded bg-rose-950/60 border border-rose-900/60 text-rose-200 leading-relaxed font-mono">
                    "Approved salary for <span class="bg-rose-900/90 text-white px-1 py-0.5 rounded font-bold border border-rose-500/60">[PERSON_1]</span>..."
                    <span class="text-rose-400 text-[9px] block pt-1 font-sans">❌ Tokens never restored. Application code breaks.</span>
                  </div>
                </div>
              </div>

              <!-- Sharp Sketch Cast Shadow (45-degree diagonal ink hatching offset 10px, 10px with crisp border) -->
              <div class="absolute inset-0 rounded-2xl transform translate-x-2.5 translate-y-2.5 z-0 pointer-events-none border-2 border-slate-600/70"
                   style="background: repeating-linear-gradient(45deg, #475569, #475569 1.3px, transparent 1.3px, transparent 7px);"></div>

              <!-- Foreground Card: ProjectSPG Complete 3-Stage Pipeline (Solid Obsidian Body) -->
              <div class="relative z-10 w-full rounded-2xl bg-[#09090b] border-2 border-slate-600 p-5 sm:p-6 text-left">
                
                <!-- Technical Corner Registration Ticks (+) for architectural drafting look -->
                <div class="absolute top-2 left-2 text-slate-600 font-mono text-[10px] select-none leading-none">+</div>
                <div class="absolute top-2 right-2 text-slate-600 font-mono text-[10px] select-none leading-none">+</div>
                <div class="absolute bottom-2 left-2 text-slate-600 font-mono text-[10px] select-none leading-none">+</div>
                <div class="absolute bottom-2 right-2 text-slate-600 font-mono text-[10px] select-none leading-none">+</div>

                <!-- Inset Dashed Drafting Contour -->
                <div class="absolute inset-1.5 rounded-[12px] border border-dashed border-slate-800/80 pointer-events-none"></div>

                <!-- Front Window Top Bar -->
                <div class="relative z-10 flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div class="flex items-center gap-2">
                    <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-300"></div>
                    <span class="text-xs font-semibold text-slate-100 font-mono tracking-tight">ProjectSPG Reversible Privacy Engine</span>
                  </div>
                  <div class="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/80"
                       style="box-shadow: 2px 2px 0px 0px rgba(16, 185, 129, 0.3);">
                    <i data-lucide="refresh-cw" class="w-3 h-3"></i>
                    <span>Two-Way Transit</span>
                  </div>
                </div>

                <!-- 3-Stage Demonstration -->
                <div class="relative z-10 space-y-3.5">
                  
                  <!-- Stage 1: Unprotected User Prompt -->
                  <div class="rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-1.5"
                       style="box-shadow: 3px 3px 0px 0px rgba(30, 41, 59, 0.8);">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        <span>1. Unprotected User Prompt (Client Input)</span>
                      </div>
                      <span class="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
                        Raw PII
                      </span>
                    </div>
                    <p class="text-[11px] font-mono text-slate-300 leading-relaxed">
                      "Audit compensation for <span class="bg-rose-950 text-rose-200 border border-rose-700 px-1 py-0.5 rounded font-medium">Alice Walker</span> (SSN: <span class="bg-rose-950 text-rose-200 border border-rose-700 px-1 py-0.5 rounded font-medium">82-9102834</span>, <span class="bg-rose-950 text-rose-200 border border-rose-700 px-1 py-0.5 rounded font-medium">alice@megacorp.io</span>), verify salary of <span class="bg-rose-950 text-rose-200 border border-rose-700 px-1 py-0.5 rounded font-medium">$185,000</span>."
                    </p>
                  </div>

                  <!-- Stage 2: What AI Model Receives -->
                  <div class="rounded-xl bg-[#08131e] border border-cyan-800/80 p-3 space-y-1.5"
                       style="box-shadow: 3px 3px 0px 0px rgba(8, 145, 178, 0.3);">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        <span>2. What AI Model Receives (Sanitized Payload)</span>
                      </div>
                      <span class="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
                        Zero Upstream Leak
                      </span>
                    </div>
                    <p class="text-[11px] font-mono text-slate-200 leading-relaxed">
                      "Audit compensation for <span class="bg-cyan-950 text-cyan-300 border border-cyan-700 px-1 py-0.5 rounded font-medium">[PERSON_1]</span> (SSN: <span class="bg-amber-950 text-amber-300 border border-amber-700 px-1 py-0.5 rounded font-medium">[SSN_1]</span>, <span class="bg-purple-950 text-purple-300 border border-purple-700 px-1 py-0.5 rounded font-medium">[EMAIL_1]</span>), verify salary of <span class="bg-emerald-950 text-emerald-300 border border-emerald-700 px-1 py-0.5 rounded font-medium">[COMP_1]</span>."
                    </p>
                    <p class="text-[10px] font-mono text-slate-400">
                      LLM output: "Confirmed: <span class="text-cyan-300 font-semibold">[PERSON_1]</span> compensation of <span class="text-emerald-300 font-semibold">[COMP_1]</span> approved."
                    </p>
                  </div>

                  <!-- Stage 3: Rehydrated Output (Application Receives) - WHERE COMPETITORS FAIL -->
                  <div class="rounded-xl bg-[#061c14] border-2 border-emerald-500 p-3.5 space-y-1.5 relative overflow-hidden"
                       style="box-shadow: 4px 4px 0px 0px rgba(16, 185, 129, 0.5);">
                    
                    <!-- Subtle sketch hatching inside highlight frame -->
                    <div class="absolute -right-4 -bottom-4 w-28 h-28 pointer-events-none opacity-10"
                         style="background: repeating-linear-gradient(45deg, #10b981, #10b981 1.5px, transparent 1.5px, transparent 6px);"></div>

                    <div class="relative z-10 flex items-center justify-between">
                      <div class="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>3. Rehydrated Output (What Your App Receives)</span>
                      </div>
                      <span class="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950 border border-emerald-400">
                        100% Rehydrated
                      </span>
                    </div>
                    <p class="relative z-10 text-[11px] font-mono text-emerald-100 leading-relaxed">
                      "Confirmed: <span class="bg-emerald-900/90 text-emerald-100 border border-emerald-400 px-1.5 py-0.5 rounded font-bold">Alice Walker</span> compensation of <span class="bg-emerald-900/90 text-emerald-100 border border-emerald-400 px-1.5 py-0.5 rounded font-bold">$185,000</span> approved."
                    </p>
                    <div class="relative z-10 flex items-center justify-between pt-1.5 border-t border-emerald-800/80 text-[10px] text-emerald-300 font-mono">
                      <span>✓ Tokens restored into original PII on the fly</span>
                      <span class="text-white font-semibold">Sub-1ms Overhead</span>
                    </div>
                  </div>

                </div>

              </div>

              <!-- Architectural Drafting Ground Lines beneath the Card (stepped horizontal pen strokes) -->
              <div class="mt-4 flex flex-col items-center justify-center space-y-1 opacity-70">
                <div class="w-3/4 h-[1.6px] bg-slate-600 rounded-full"></div>
                <div class="w-3/5 h-[1.2px] bg-slate-700 rounded-full"></div>
                <div class="w-2/5 h-[1.0px] bg-slate-800 rounded-full"></div>
                <div class="w-1/4 h-[0.8px] bg-slate-800/60 rounded-full"></div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  <!-- ========================================================================= -->
  <!-- HERO DEMO SECTION (v0-Style Input Bar in Light Theme)                     -->
  <!-- ========================================================================= -->
  <section class="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-16 text-center">
      
      <!-- Top Announcement Pill (Matching v0 style) -->
      <a href="/#docs" class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 hover:border-gray-300 text-slate-700 text-xs font-medium mb-8 shadow-2xs transition group">
        <span class="w-4 h-4 rounded-full bg-[#f0523d] flex items-center justify-center text-white text-[9px]">⚡</span>
        <span>Drop-in OpenAI wire compatibility</span>
        <span class="text-slate-400 group-hover:translate-x-0.5 transition-transform">›</span>
      </a>

      <!-- Main Headline (Matching v0 style) -->
      <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-8">
        What do you want to protect?
      </h1>

      <!-- ===================================================================== -->
      <!-- v0-STYLE PROMPT CONTAINER CARD                                        -->
      <!-- ===================================================================== -->
      <div id="demo" class="w-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md focus-within:shadow-md focus-within:border-[#f0523d]/50 transition-all p-3 sm:p-4 text-left scroll-mt-24 mb-4">
        
        <!-- Textarea input area -->
        <textarea id="demo-prompt-input" rows="3" placeholder="Enter a prompt with patient data, SSNs, credit cards, or customer PII..." class="w-full text-xs sm:text-sm font-sans p-1 bg-transparent border-0 focus:outline-none text-slate-800 placeholder-slate-400 leading-relaxed resize-none">Patient Eleanor Vance (SSN: 902-48-1229, DOB: 04/18/1972) admitted to St. Jude ICU. Prescribed 50mg Metoprolol. Contact doctor at dr.marcus@hospital.org.</textarea>

        <!-- Bottom action strip inside the prompt container -->
        <div class="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
          
          <!-- Left: Model selector pill & dropdown (v0-style) -->
          <div class="relative" id="model-dropdown-container">
            <!-- Trigger button -->
            <button
              type="button"
              id="model-dropdown-trigger"
              onclick="toggleModelDropdown(event)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-900 text-xs font-mono font-bold transition-all cursor-pointer shadow-[2px_2px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <div class="w-4 h-4 rounded bg-[#f0523d]/10 text-[#f0523d] flex items-center justify-center font-bold text-[10px]">
                <i data-lucide="cpu" class="w-3 h-3 text-[#f0523d]"></i>
              </div>
              <span id="selected-model-name" class="font-semibold text-slate-800">SPG Pro</span>
              <i data-lucide="chevron-down" id="model-dropdown-chevron" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-150"></i>
            </button>

            <!-- Dropdown Menu Floating Card (matching uploaded design) -->
            <div
              id="model-dropdown-menu"
              class="hidden absolute left-0 bottom-full mb-2 w-72 sm:w-80 bg-white rounded-xl border border-gray-200 shadow-xl p-2 z-50 text-left"
            >
              <!-- Search bar inside menu -->
              <div class="relative mb-2">
                <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"></i>
                <input
                  type="text"
                  id="model-search-input"
                  oninput="filterModelDropdown(this.value)"
                  placeholder="Search models..."
                  class="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-gray-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#f0523d] focus:bg-white"
                />
              </div>

              <!-- Model items list -->
              <div id="model-items-list" class="space-y-1 max-h-56 overflow-y-auto">
                
                <!-- SPG Pro (Default) -->
                <div
                  onclick="selectDemoModel('SPG Pro', 'ministral-8b-2512')"
                  data-model-id="ministral-8b-2512"
                  data-model-name="SPG Pro"
                  class="model-option flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition group"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-7 h-7 rounded-lg bg-orange-50 border border-orange-200/60 flex items-center justify-center text-[#f0523d] shrink-0">
                      <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-xs font-semibold text-slate-800 group-hover:text-[#f0523d] transition">SPG Pro</span>
                        <span class="text-[9px] font-medium px-1.5 py-0.2 rounded bg-orange-50 text-[#f0523d] border border-orange-200/80">Default</span>
                      </div>
                      <p class="text-[11px] text-slate-500 truncate">Balanced reasoning • 8B</p>
                    </div>
                  </div>
                  <i data-lucide="check" class="model-check-icon w-4 h-4 text-[#f0523d]"></i>
                </div>

                <!-- SPG Mini -->
                <div
                  onclick="selectDemoModel('SPG Mini', 'ministral-3b-2512')"
                  data-model-id="ministral-3b-2512"
                  data-model-name="SPG Mini"
                  class="model-option flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition group"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 shrink-0">
                      <i data-lucide="zap" class="w-3.5 h-3.5"></i>
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-xs font-semibold text-slate-800 group-hover:text-[#f0523d] transition">SPG Mini</span>
                        <span class="text-[9px] font-medium px-1.5 py-0.2 rounded bg-blue-50 text-blue-600 border border-blue-200/80">Fast</span>
                      </div>
                      <p class="text-[11px] text-slate-500 truncate">Fastest latency • 3B</p>
                    </div>
                  </div>
                  <i data-lucide="check" class="model-check-icon hidden w-4 h-4 text-[#f0523d]"></i>
                </div>

                <!-- SPG Code -->
                <div
                  onclick="selectDemoModel('SPG Code', 'codestral-2508')"
                  data-model-id="codestral-2508"
                  data-model-name="SPG Code"
                  class="model-option flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition group"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200/60 flex items-center justify-center text-purple-600 shrink-0">
                      <i data-lucide="code-2" class="w-3.5 h-3.5"></i>
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-xs font-semibold text-slate-800 group-hover:text-[#f0523d] transition">SPG Code</span>
                      </div>
                      <p class="text-[11px] text-slate-500 truncate">Specialized coding & agentic</p>
                    </div>
                  </div>
                  <i data-lucide="check" class="model-check-icon hidden w-4 h-4 text-[#f0523d]"></i>
                </div>

                <!-- SPG Max -->
                <div
                  onclick="selectDemoModel('SPG Max', 'mistral-large-2512')"
                  data-model-id="mistral-large-2512"
                  data-model-name="SPG Max"
                  class="model-option flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition group"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shrink-0">
                      <i data-lucide="brain-circuit" class="w-3.5 h-3.5"></i>
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-xs font-semibold text-slate-800 group-hover:text-[#f0523d] transition">SPG Max</span>
                        <span class="text-[9px] font-medium px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-600 border border-emerald-200/80">Flagship</span>
                      </div>
                      <p class="text-[11px] text-slate-500 truncate">Deep reasoning • Large</p>
                    </div>
                  </div>
                  <i data-lucide="check" class="model-check-icon hidden w-4 h-4 text-[#f0523d]"></i>
                </div>

              </div>

              <!-- No results state -->
              <div id="model-no-results" class="hidden text-center py-4 text-xs text-slate-400">
                No matching models
              </div>
            </div>

            <!-- Hidden input to store chosen model id -->
            <input type="hidden" id="demo-model-value" value="ministral-8b-2512" />
          </div>

          <!-- Right: Clear + Submit button -->
          <div class="flex items-center gap-2">
            <button onclick="clearDemoPrompt()" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer" title="Clear prompt">
              <i data-lucide="eraser" class="w-4 h-4"></i>
            </button>
            <button onclick="runHeroDemo()" id="btn-run-demo" class="w-9 h-9 rounded-xl bg-[#f0523d] hover:bg-[#e0422d] text-white flex items-center justify-center border-2 border-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50" title="Run Sanitize & Inference">
              <i data-lucide="arrow-up" class="w-4 h-4 stroke-[2.5]"></i>
            </button>
          </div>

        </div>

      </div>

      <!-- ===================================================================== -->
      <!-- PRESET SUGGESTION PILLS (v0-Style Pill Strip)                        -->
      <!-- ===================================================================== -->
      <div class="flex flex-wrap items-center justify-center gap-2.5 mb-10">
        <button onclick="setDemoPreset('healthcare')" class="demo-pill px-3.5 py-1.5 rounded-xl bg-white hover:bg-rose-50/70 border-2 border-slate-900 text-slate-900 text-xs font-mono font-bold shadow-[2.5px_2.5px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 flex items-center gap-2 transition-all cursor-pointer">
          <i data-lucide="heart-pulse" class="w-3.5 h-3.5 text-rose-600 stroke-[2.5]"></i>
          <span>Patient Records (HIPAA)</span>
        </button>

        <button onclick="setDemoPreset('fintech')" class="demo-pill px-3.5 py-1.5 rounded-xl bg-white hover:bg-blue-50/70 border-2 border-slate-900 text-slate-900 text-xs font-mono font-bold shadow-[2.5px_2.5px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 flex items-center gap-2 transition-all cursor-pointer">
          <i data-lucide="credit-card" class="w-3.5 h-3.5 text-blue-600 stroke-[2.5]"></i>
          <span>Credit Cards (PCI)</span>
        </button>

        <button onclick="setDemoPreset('hr')" class="demo-pill px-3.5 py-1.5 rounded-xl bg-white hover:bg-amber-50/70 border-2 border-slate-900 text-slate-900 text-xs font-mono font-bold shadow-[2.5px_2.5px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 flex items-center gap-2 transition-all cursor-pointer">
          <i data-lucide="user-check" class="w-3.5 h-3.5 text-amber-600 stroke-[2.5]"></i>
          <span>Employee HR (PII)</span>
        </button>

        <button onclick="setDemoPreset('devops')" class="demo-pill px-3.5 py-1.5 rounded-xl bg-white hover:bg-purple-50/70 border-2 border-slate-900 text-slate-900 text-xs font-mono font-bold shadow-[2.5px_2.5px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 flex items-center gap-2 transition-all cursor-pointer">
          <i data-lucide="key-round" class="w-3.5 h-3.5 text-purple-600 stroke-[2.5]"></i>
          <span>API Keys & Secrets</span>
        </button>

        <button onclick="cycleDemoPreset()" class="p-2 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-900 text-slate-900 shadow-[2.5px_2.5px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center" title="Shuffle prompt sample">
          <i data-lucide="rotate-cw" class="w-3.5 h-3.5 stroke-[2.5]"></i>
        </button>
      </div>

      <!-- ===================================================================== -->
      <!-- RESULTS DISPLAY CARD (Revealed when user hits submit)                 -->
      <!-- ===================================================================== -->
      <div id="demo-results-container" class="hidden text-left bg-white rounded-2xl border border-gray-200/90 shadow-md p-4 sm:p-6 space-y-4 mb-12">
        
        <!-- Status Bar -->
        <div class="flex flex-wrap items-center justify-between gap-2 p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-900">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span class="font-semibold">De-identification & Inference Succeeded</span>
          </div>
          <div class="flex items-center gap-4 text-[11px] font-mono">
            <div>Protected Entities: <span id="demo-metric-entities" class="font-bold text-emerald-800">4</span></div>
            <div>Latency: <span id="demo-metric-latency" class="font-bold text-emerald-800">14 ms</span></div>
            <div>Model: <span id="demo-metric-model" class="font-bold text-slate-700">ministral-8b-2512</span></div>
          </div>
        </div>

        <!-- Split Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          
          <!-- Left: What Upstream Mistral Received -->
          <div class="p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 space-y-2 flex flex-col">
            <div class="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span class="font-semibold text-amber-400 flex items-center gap-1.5">
                <i data-lucide="eye-off" class="w-3.5 h-3.5"></i>
                What Mistral AI Saw
              </span>
              <span class="text-emerald-400 text-[10px] bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">Zero PII Leaked</span>
            </div>
            <div id="demo-sanitized-output" class="text-[11.5px] leading-relaxed text-slate-300 font-mono whitespace-pre-wrap max-h-72 overflow-y-auto pr-2 custom-scrollbar"></div>
          </div>

          <!-- Right: What You Received (Rehydrated) -->
          <div class="p-4 bg-slate-50 text-slate-900 rounded-xl border border-gray-200 space-y-2 flex flex-col">
            <div class="flex items-center justify-between text-[11px] text-slate-500 border-b border-gray-200 pb-2">
              <span class="font-semibold text-emerald-600 flex items-center gap-1.5">
                <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
                What Your Application Received
              </span>
              <span class="text-slate-500 text-[10px]">100% Rehydrated</span>
            </div>
            <div id="demo-rehydrated-output" class="text-[12px] leading-relaxed text-slate-800 font-sans max-h-72 overflow-y-auto pr-2 custom-scrollbar"></div>
          </div>

        </div>

        <div class="text-center pt-2">
          <button onclick="handleSecondTestTrigger()" class="text-xs font-medium text-[#f0523d] hover:text-[#e0422d] underline cursor-pointer">
            Run another prompt or switch to full developer console →
          </button>
        </div>

      </div>

    </section>

    <!-- ======================================================================= -->
    <!-- HOW IT WORKS: DATA FLOW & INTERCEPTION ARCHITECTURE                     -->
    <!-- Full Live-Animated Architectural Sketch Blueprint                       -->
    <!-- ======================================================================= -->
    <section id="how-it-works" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-22 border-t border-gray-200/80">
      
      <!-- Section Header with Vibrant Technical Sketch Pill -->
      <div class="text-center max-w-2xl mx-auto space-y-2.5 mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-slate-900 text-xs font-mono font-extrabold tracking-wider text-slate-900"
             style="box-shadow: 3px 3px 0px 0px #0f172a;">
          <span class="w-2 h-2 rounded-full bg-[#f0523d] animate-pulse"></span>
          <span>§ 01 // ARCHITECTURAL DATA FLOW</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight">
          Where ProjectSPG Intercepts Your Data Flow
        </h2>
        <p class="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
          Direct AI requests leak customer records and secrets to third-party logs. ProjectSPG intercepts prompts at the edge so LLMs only ever see anonymous tokens.
        </p>
      </div>

      <!-- Main Visual Architecture Blueprint (Fully Animated Live Drafting Canvas) -->
      <div class="relative select-none mb-10">
        
        <!-- Sharp Hatch Shadow Layer (Blueprint Cast Shadow) -->
        <div class="absolute inset-0 rounded-3xl transform translate-x-2.5 translate-y-2.5 z-0 pointer-events-none border-2 border-slate-800"
             style="background: repeating-linear-gradient(45deg, #64748b, #64748b 1.3px, transparent 1.3px, transparent 7px); opacity: 0.35;"></div>

        <!-- Blueprint Drafting Table Canvas Body -->
        <div class="relative z-10 rounded-3xl bg-white border-2 border-slate-900 p-5 sm:p-7 lg:p-8 text-slate-900 overflow-hidden"
             style="box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.08);">
          
          <!-- Technical Corner Drafting Marks (+) -->
          <div class="absolute top-2.5 left-2.5 text-slate-900 font-mono text-sm font-black select-none leading-none">+</div>
          <div class="absolute top-2.5 right-2.5 text-slate-900 font-mono text-sm font-black select-none leading-none">+</div>
          <div class="absolute bottom-2.5 left-2.5 text-slate-900 font-mono text-sm font-black select-none leading-none">+</div>
          <div class="absolute bottom-2.5 right-2.5 text-slate-900 font-mono text-sm font-black select-none leading-none">+</div>

          <!-- Inset Dashed Drafting Contour -->
          <div class="absolute inset-2 sm:inset-2.5 rounded-[20px] border border-dashed border-slate-300 pointer-events-none"></div>

          <!-- Faint Sketch Background Texture -->
          <div class="absolute inset-0 rounded-3xl pointer-events-none opacity-5"
               style="background: repeating-linear-gradient(45deg, #0f172a, #0f172a 1.2px, transparent 1.2px, transparent 8px);"></div>

          <div class="relative z-10 space-y-6">
            
            <!-- Blueprint Header Metadata Strip -->
            <div class="flex items-center justify-between pb-2.5 border-b border-dashed border-slate-300 text-xs font-mono font-bold text-slate-600">
              <div class="flex items-center gap-2">
                <span class="font-black text-slate-900">FIG. 01</span>
                <span>//</span>
                <span>EDGE_INTERCEPTION_MECHANICS</span>
              </div>
              <div class="hidden sm:flex items-center gap-3 text-[10px]">
                <span class="font-extrabold text-slate-800">SCALE: 1:1</span>
                <span>•</span>
                <span class="font-extrabold text-slate-800">LATENCY: &lt;20MS</span>
                <span>•</span>
                <span class="text-emerald-700 font-black flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>ZERO_DATA_LEAKAGE</span>
                </span>
              </div>
            </div>

            <!-- =============================================================== -->
            <!-- FLOW 1: WITHOUT PROJECTSPG (The Hazard / Leaking Route)          -->
            <!-- =============================================================== -->
            <div class="relative rounded-2xl bg-rose-50/80 border-2 border-rose-900 p-4 sm:p-5 overflow-hidden"
                 style="box-shadow: 4px 4px 0px 0px rgba(159, 18, 57, 0.3);">
              
              <!-- Subtle red cross-hatch accent -->
              <div class="absolute inset-0 rounded-2xl pointer-events-none opacity-10"
                   style="background: repeating-linear-gradient(45deg, #f43f5e, #f43f5e 1.2px, transparent 1.2px, transparent 7px);"></div>

              <!-- Flow 1 Top Strip -->
              <div class="relative z-10 flex items-center justify-between pb-2.5 mb-3 border-b-2 border-rose-200">
                <div class="flex items-center gap-2.5">
                  <span class="w-3 h-3 rounded-full bg-rose-600 border border-rose-800 ring-2 ring-rose-300 animate-pulse"></span>
                  <span class="text-xs sm:text-sm font-mono font-black uppercase tracking-wider text-rose-900">
                    § 01 // WITHOUT PROJECTSPG: DIRECT AI TRAFFIC
                  </span>
                </div>
                <!-- Animated Critical Leak Badge -->
                <span class="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-black px-2.5 py-1 rounded-md bg-rose-600 text-white border border-rose-800 tracking-wider shadow-xs animate-critical-leak select-none cursor-default"
                      style="box-shadow: 2px 2px 0px 0px rgba(159, 18, 57, 0.5);">
                  <span class="text-white font-black animate-pulse leading-none text-xs">✕</span>
                  <span>CRITICAL LEAK</span>
                </span>
              </div>

              <!-- 3-Node Horizontal Pipeline in Vibrant Sketch Style -->
              <div class="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center font-mono">
                
                <!-- Client Prompt Box -->
                <div class="md:col-span-4 p-3 rounded-xl bg-white border-2 border-slate-900 text-slate-900"
                     style="box-shadow: 3px 3px 0px 0px #0f172a;">
                  <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-dashed border-slate-300 text-[10px]">
                    <span class="text-slate-700 uppercase font-extrabold tracking-wider">ORIGIN // PROMPT</span>
                    <span class="text-[9px] font-black text-rose-700 bg-rose-100 border border-rose-300 px-1.5 py-0.2 rounded animate-pulse">UNENCRYPTED</span>
                  </div>
                  <div class="text-xs sm:text-[13px] font-bold leading-relaxed text-slate-900">
                    "Pay 
                    <span class="relative inline-block px-1.5 py-0.5 mx-0.5 text-white font-black rounded bg-rose-600 border border-rose-700 shadow-xs animate-leak-entity">John Doe</span>
                    (SSN: 
                    <span class="relative inline-block px-1.5 py-0.5 mx-0.5 text-white font-black rounded bg-rose-600 border border-rose-700 shadow-xs animate-leak-entity">412-88-9012</span>)
                    <span class="relative inline-block px-1.5 py-0.5 mx-0.5 text-white font-black rounded bg-rose-600 border border-rose-700 shadow-xs animate-leak-entity">$14,500</span>"
                  </div>
                </div>
                
                <!-- Red Connecting Wire (Leaking Pipe) with Animated Arrow -->
                <div class="md:col-span-4 flex items-center justify-center gap-1.5 text-rose-700 py-1 select-none">
                  <div class="hidden md:block flex-1 border-t-2 border-dashed border-rose-500"></div>
                  <div class="px-3 py-1.5 rounded-lg bg-white border-2 border-rose-600 text-[10px] sm:text-[11px] font-mono font-black text-rose-800 flex items-center gap-1.5 shrink-0 animate-arrow-stream"
                       style="box-shadow: 2.5px 2.5px 0px 0px rgba(159, 18, 57, 0.35);">
                    <i data-lucide="alert-circle" class="w-3.5 h-3.5 text-rose-600 stroke-[2.5]"></i>
                    <span>Raw PII over Internet</span>
                    <i data-lucide="arrow-right" class="w-4 h-4 text-rose-600 stroke-[2.5]"></i>
                  </div>
                  <div class="hidden md:block flex-1 border-t-2 border-dashed border-rose-500"></div>
                </div>

                <!-- AI Provider Target Box -->
                <div class="md:col-span-4 p-3 rounded-xl bg-white border-2 border-rose-900 text-rose-950"
                     style="box-shadow: 3px 3px 0px 0px rgba(159, 18, 57, 0.45);">
                  <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-dashed border-rose-300 text-[10px]">
                    <span class="text-rose-900 uppercase font-black tracking-wider">CLOUD AI PROVIDER</span>
                    <span class="text-[9px] font-black text-rose-700 bg-rose-100 border border-rose-300 px-1.5 py-0.2 rounded animate-pulse">UNSECURED</span>
                  </div>
                  <div class="text-xs sm:text-[12px] text-slate-900 font-bold space-y-1">
                    <div class="flex items-start gap-1.5">
                      <span class="text-rose-600 font-black text-sm leading-none shrink-0 animate-pulse">✕</span>
                      <span><strong class="text-rose-800 font-extrabold">PII logged</strong> in vendor query databases</span>
                    </div>
                    <div class="flex items-start gap-1.5">
                      <span class="text-rose-600 font-black text-sm leading-none shrink-0 animate-pulse">✕</span>
                      <span><strong class="text-rose-800 font-extrabold">Ingested</strong> into future model training</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <!-- Architectural Divider: Technical Boundary with Datum Line -->
            <div class="relative py-1 flex items-center justify-center select-none">
              <div class="w-full border-t-2 border-dashed border-slate-400"></div>
              <div class="absolute px-4 py-1.5 rounded-full bg-slate-900 border-2 border-cyan-400 text-xs font-mono font-black text-cyan-300 flex items-center gap-2"
                   style="box-shadow: 3px 3px 0px 0px #0f172a;">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <span>§ INTERCEPTION PERIMETER // ZERO-TRUST GATEWAY</span>
              </div>
            </div>

            <!-- =============================================================== -->
            <!-- FLOW 2: WITH PROJECTSPG (The Protected Gateway - FULLY ANIMATED)-->
            <!-- =============================================================== -->
            <div class="relative rounded-2xl bg-emerald-50/80 border-2 border-emerald-900 p-4 sm:p-5 overflow-hidden"
                 style="box-shadow: 4px 4px 0px 0px rgba(5, 150, 105, 0.35);">
              
              <!-- Subtle green cross-hatch accent -->
              <div class="absolute inset-0 rounded-2xl pointer-events-none opacity-10"
                   style="background: repeating-linear-gradient(45deg, #10b981, #10b981 1.2px, transparent 1.2px, transparent 7px);"></div>

              <!-- Flow 2 Top Strip -->
              <div class="relative z-10 flex items-center justify-between pb-2.5 mb-3 border-b-2 border-emerald-200">
                <div class="flex items-center gap-2.5">
                  <span class="relative flex h-3 w-3">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-600 border border-emerald-800"></span>
                  </span>
                  <span class="text-xs sm:text-sm font-mono font-black uppercase tracking-wider text-emerald-950">
                    § 02 // WITH PROJECTSPG: ZERO-TRUST INTERCEPTION
                  </span>
                </div>
                <!-- Animated 100% Reversible Badge -->
                <span class="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-black px-2.5 py-1 rounded-md bg-emerald-600 text-white border border-emerald-800 tracking-wider shadow-xs animate-reversible select-none cursor-default"
                      style="box-shadow: 2px 2px 0px 0px rgba(5, 150, 105, 0.5);">
                  <span class="text-white font-black animate-pulse leading-none text-xs">✓</span>
                  <span>100% REVERSIBLE</span>
                </span>
              </div>

              <!-- 3-Node Horizontal Pipeline with Live In-Flight Connectors -->
              <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center font-mono">
                
                <!-- Node A: Client Prompt Box -->
                <div class="lg:col-span-3 p-3 rounded-xl bg-white border-2 border-slate-900 text-slate-900"
                     style="box-shadow: 3px 3px 0px 0px #0f172a;">
                  <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-dashed border-slate-300 text-[10px]">
                    <span class="text-slate-700 uppercase font-extrabold tracking-wider">ORIGIN // PROMPT</span>
                    <span class="text-[9px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 rounded">PROTECTED</span>
                  </div>
                  <div class="text-xs sm:text-[13px] font-bold leading-relaxed text-slate-900 truncate">
                    "Pay <span class="text-emerald-900 font-black bg-emerald-100 border border-emerald-300 px-1 rounded animate-token-1">John Doe</span>..."
                  </div>
                  <div class="text-[10px] sm:text-[11px] text-emerald-800 font-black mt-2 pt-1.5 border-t border-dashed border-slate-300 flex items-center gap-1.5">
                    <span class="text-emerald-600 font-black animate-pulse">✓</span>
                    <span>Receives real data back</span>
                  </div>
                </div>

                <!-- Transit Connector 1: Prompt ➔ Gateway (Bidirectional Live Wire) -->
                <div class="hidden lg:flex lg:col-span-1 flex-col items-center justify-center gap-1 select-none text-[9px] font-mono font-black py-1">
                  <div class="flex items-center gap-1 text-cyan-800 animate-arrow-stream" title="Prompt sent to gateway">
                    <span class="text-[8px] uppercase tracking-tighter">PROMPT</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5 stroke-[2.5]"></i>
                  </div>
                  <div class="w-full border-t-2 border-dashed border-cyan-400"></div>
                  <div class="flex items-center gap-1 text-emerald-800 animate-arrow-stream" style="animation-direction: reverse;" title="Rehydrated output returned">
                    <i data-lucide="arrow-left" class="w-3.5 h-3.5 stroke-[2.5]"></i>
                    <span class="text-[8px] uppercase tracking-tighter">RESTORE</span>
                  </div>
                </div>

                <!-- Node B: ProjectSPG Gateway Box (THE LIVE ANIMATED ENCLAVE) -->
                <div class="lg:col-span-4 p-3.5 rounded-xl bg-cyan-50 border-2 border-cyan-800 text-slate-900 relative animate-gateway-glow">
                  
                  <!-- Corner ticks (+) on Gateway Node -->
                  <div class="absolute top-1.5 left-1.5 text-cyan-900 font-mono text-[10px] font-black select-none leading-none">+</div>
                  <div class="absolute top-1.5 right-1.5 text-cyan-900 font-mono text-[10px] font-black select-none leading-none">+</div>

                  <div class="flex items-center justify-between pb-1.5 mb-2 border-b-2 border-cyan-200 text-xs">
                    <div class="flex items-center gap-1.5 font-black text-cyan-950">
                      <i data-lucide="shield-check" class="w-4 h-4 text-cyan-600 stroke-[2.5] animate-pulse"></i>
                      <span class="tracking-tight">PROJECTSPG_GATEWAY</span>
                    </div>
                    <!-- Live Edge Ping Badge -->
                    <span class="inline-flex items-center gap-1 text-[10px] font-mono font-black px-2 py-0.5 rounded bg-cyan-600 text-white border border-cyan-800 shadow-xs"
                          style="box-shadow: 1.5px 1.5px 0px 0px #0e7490;">
                      <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      <span>&lt;20ms EDGE</span>
                    </span>
                  </div>

                  <div class="text-[11px] sm:text-xs space-y-1.5 text-slate-900 font-bold">
                    <div class="flex items-start gap-1.5">
                      <span class="text-cyan-700 font-black shrink-0">1.</span>
                      <span>Strips PII ➔ 
                        <code class="text-white font-black bg-cyan-600 border border-cyan-800 px-1.5 py-0.5 rounded text-[11px] shadow-xs inline-block animate-token-1">[PERSON_1]</code>, 
                        <code class="text-white font-black bg-amber-600 border border-amber-800 px-1.5 py-0.5 rounded text-[11px] shadow-xs inline-block animate-token-2">[SSN_1]</code>
                      </span>
                    </div>
                    <div class="flex items-start gap-1.5">
                      <span class="text-emerald-700 font-black shrink-0">2.</span>
                      <span class="text-emerald-950">Hardware AES-256 seal & instant rehydration</span>
                    </div>
                  </div>
                </div>

                <!-- Transit Connector 2: Gateway ➔ Cloud AI (Bidirectional Tokens Wire) -->
                <div class="hidden lg:flex lg:col-span-1 flex-col items-center justify-center gap-1 select-none text-[9px] font-mono font-black py-1">
                  <div class="flex items-center gap-1 text-cyan-800 animate-arrow-stream" title="Only tokens sent to AI">
                    <span class="text-[8px] uppercase tracking-tighter">TOKENS</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5 stroke-[2.5]"></i>
                  </div>
                  <div class="w-full border-t-2 border-dashed border-emerald-400"></div>
                  <div class="flex items-center gap-1 text-emerald-800 animate-arrow-stream" style="animation-direction: reverse;" title="Model response with tokens">
                    <i data-lucide="arrow-left" class="w-3.5 h-3.5 stroke-[2.5]"></i>
                    <span class="text-[8px] uppercase tracking-tighter">ANSWER</span>
                  </div>
                </div>

                <!-- Node C: AI Provider Target Box (Clean Transit) -->
                <div class="lg:col-span-3 p-3 rounded-xl bg-white border-2 border-emerald-900 text-slate-900"
                     style="box-shadow: 3px 3px 0px 0px rgba(5, 150, 105, 0.45);">
                  <div class="flex items-center justify-between pb-1.5 mb-1.5 border-b border-dashed border-slate-300 text-[10px]">
                    <span class="text-emerald-950 uppercase font-black tracking-wider">CLOUD AI (OPENAI / CLAUDE)</span>
                    <span class="text-[9px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 rounded">CLEAN</span>
                  </div>
                  <div class="text-xs sm:text-[13px] font-bold text-slate-900">
                    "Pay <span class="text-cyan-950 font-black bg-cyan-100 border-2 border-cyan-400 px-1.5 py-0.5 rounded shadow-xs inline-block animate-token-1">[PERSON_1]</span>..."
                  </div>
                  <div class="text-[10px] sm:text-[11px] text-emerald-800 font-black mt-2 pt-1.5 border-t border-dashed border-slate-300 flex items-center gap-1.5">
                    <span class="text-emerald-600 font-black animate-pulse">✓</span>
                    <span>Sees & logs anonymous tokens only</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        <!-- Architectural Drafting Stepped Ground Lines Beneath Canvas -->
        <div class="mt-4 flex flex-col items-center justify-center space-y-1 opacity-80 select-none">
          <div class="w-3/4 h-[2px] bg-slate-900 rounded-full"></div>
          <div class="w-3/5 h-[1.5px] bg-slate-700 rounded-full"></div>
          <div class="w-2/5 h-[1.2px] bg-slate-500 rounded-full"></div>
          <div class="w-1/4 h-[1.0px] bg-slate-400 rounded-full"></div>
        </div>

      </div>

      <!-- ===================================================================== -->
      <!-- 3 BENTO CARDS: ARCHITECTURAL SKETCH LIGHT THEME                      -->
      <!-- ===================================================================== -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Card 1: How Data Leaks -->
        <div class="relative group select-none">
          <!-- Sharp Hatch Shadow Layer (Offset 6px, 6px) -->
          <div class="absolute inset-0 rounded-2xl transform translate-x-2 translate-y-2 z-0 pointer-events-none border border-slate-700/60"
               style="background: repeating-linear-gradient(45deg, #f43f5e, #f43f5e 1.3px, transparent 1.3px, transparent 7px); opacity: 0.3;"></div>
          
          <!-- Card Body -->
          <div class="relative z-10 rounded-2xl bg-white border-2 border-slate-900 p-5 sm:p-6 text-slate-900 transition-all duration-200 group-hover:-translate-y-1 overflow-hidden min-h-[260px] flex flex-col justify-between"
               style="box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.05);">
            
            <!-- Technical Corner Registration Ticks (+) -->
            <div class="absolute top-2 left-2 text-slate-400 font-mono text-[10px] select-none leading-none">+</div>
            <div class="absolute top-2 right-2 text-slate-400 font-mono text-[10px] select-none leading-none">+</div>
            <div class="absolute bottom-2 left-2 text-slate-400 font-mono text-[10px] select-none leading-none">+</div>
            <div class="absolute bottom-2 right-2 text-slate-400 font-mono text-[10px] select-none leading-none">+</div>

            <!-- Inset Dashed Drafting Contour -->
            <div class="absolute inset-1.5 rounded-xl border border-dashed border-slate-200 pointer-events-none"></div>

            <div class="relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase tracking-wider text-rose-900 bg-rose-100 px-2.5 py-0.5 rounded border border-rose-600"
                     style="box-shadow: 2px 2px 0px 0px rgba(159, 18, 57, 0.35);">
                  <span>§ 01</span>
                  <span>//</span>
                  <span>EXPOSURE</span>
                </div>
                <div class="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs">
                  <i data-lucide="alert-triangle" class="w-4 h-4 stroke-[2.5] animate-pulse"></i>
                </div>
              </div>

              <h3 class="text-base sm:text-lg font-black text-slate-900 tracking-tight mb-2">
                1. How Data Leaks
              </h3>
              <p class="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                Prompts sent directly to OpenAI, Anthropic, or Google carry customer PII, keys, and financials that get permanently logged and ingested into training sets.
              </p>
            </div>

            <!-- Sketch Snippet Strip -->
            <div class="relative z-10 mt-3 pt-2.5 border-t-2 border-dashed border-slate-200 font-mono text-xs text-slate-600 flex items-center justify-between font-bold">
              <span class="text-rose-700 font-extrabold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                <span>UNENCRYPTED_PROMPT</span>
              </span>
              <span class="text-slate-800">|← LOGGED →|</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Where ProjectSPG Sits -->
        <div class="relative group select-none">
          <!-- Sharp Hatch Shadow Layer (Offset 6px, 6px) -->
          <div class="absolute inset-0 rounded-2xl transform translate-x-2 translate-y-2 z-0 pointer-events-none border border-slate-700/60"
               style="background: repeating-linear-gradient(45deg, #06b6d4, #06b6d4 1.3px, transparent 1.3px, transparent 7px); opacity: 0.3;"></div>
          
          <!-- Card Body -->
          <div class="relative z-10 rounded-2xl bg-white border-2 border-slate-900 p-5 sm:p-6 text-slate-900 transition-all duration-200 group-hover:-translate-y-1 overflow-hidden min-h-[260px] flex flex-col justify-between"
               style="box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.05);">
            
            <!-- Technical Corner Registration Ticks (+) -->
            <div class="absolute top-2 left-2 text-slate-400 font-mono text-[10px] select-none leading-none">+</div>
            <div class="absolute top-2 right-2 text-slate-400 font-mono text-[10px] select-none leading-none">+</div>
            <div class="absolute bottom-2 left-2 text-slate-400 font-mono text-[10px] select-none leading-none">+</div>
            <div class="absolute bottom-2 right-2 text-slate-400 font-mono text-[10px] select-none leading-none">+</div>

            <!-- Inset Dashed Drafting Contour -->
            <div class="absolute inset-1.5 rounded-xl border border-dashed border-slate-200 pointer-events-none"></div>

            <div class="relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase tracking-wider text-cyan-950 bg-cyan-100 px-2.5 py-0.5 rounded border border-cyan-700"
                     style="box-shadow: 2px 2px 0px 0px #0e7490;">
                  <span>§ 02</span>
                  <span>//</span>
                  <span>INTERCEPTION</span>
                </div>
                <div class="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center shadow-xs">
                  <i data-lucide="shield" class="w-4 h-4 stroke-[2.5] animate-pulse"></i>
                </div>
              </div>

              <h3 class="text-base sm:text-lg font-black text-slate-900 tracking-tight mb-2">
                2. Where ProjectSPG Sits
              </h3>
              <p class="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                ProjectSPG sits inline as an ultra-low latency (&lt;20ms) reverse proxy at the edge. Just change your API base URL to <code class="text-cyan-950 bg-cyan-100 border border-cyan-400 px-1.5 py-0.5 rounded font-mono text-xs font-black">api.projectspg.info</code>.
              </p>
            </div>

            <!-- Sketch Snippet Strip -->
            <div class="relative z-10 mt-3 pt-2.5 border-t-2 border-dashed border-slate-200 font-mono text-xs text-slate-600 flex items-center justify-between font-bold">
              <span class="text-cyan-800 font-extrabold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
                <span>IN_LINE_REVERSE_PROXY</span>
              </span>
              <span class="text-slate-800">|← &lt;20ms →|</span>
            </div>
          </div>
        </div>

        <!-- Card 3: How It Stops It -->
        <div class="relative group select-none">
          <!-- Sharp Hatch Shadow Layer (Offset 6px, 6px) -->
          <div class="absolute inset-0 rounded-2xl transform translate-x-2 translate-y-2 z-0 pointer-events-none border border-slate-700/60"
               style="background: repeating-linear-gradient(45deg, #10b981, #10b981 1.3px, transparent 1.3px, transparent 7px); opacity: 0.3;"></div>
          
          <!-- Card Body -->
          <div class="relative z-10 rounded-2xl bg-white border-2 border-slate-900 p-5 sm:p-6 text-slate-900 transition-all duration-200 group-hover:-translate-y-1 overflow-hidden min-h-[260px] flex flex-col justify-between"
               style="box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.05);">
            
            <!-- Technical Corner Registration Ticks (+) -->
            <div class="absolute top-2 left-2 text-slate-400 font-mono text-[10px] select-none leading-none">+</div>
            <div class="absolute top-2 right-2 text-slate-400 font-mono text-[10px] select-none leading-none">+</div>
            <div class="absolute bottom-2 left-2 text-slate-400 font-mono text-[10px] select-none leading-none">+</div>
            <div class="absolute bottom-2 right-2 text-slate-400 font-mono text-[10px] select-none leading-none">+</div>

            <!-- Inset Dashed Drafting Contour -->
            <div class="absolute inset-1.5 rounded-xl border border-dashed border-slate-200 pointer-events-none"></div>

            <div class="relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="inline-flex items-center gap-1.5 text-xs font-mono font-black uppercase tracking-wider text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-700"
                     style="box-shadow: 2px 2px 0px 0px rgba(5, 150, 105, 0.35);">
                  <span>§ 03</span>
                  <span>//</span>
                  <span>DEFENSE</span>
                </div>
                <div class="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <i data-lucide="refresh-cw" class="w-4 h-4 stroke-[2.5] animate-pulse"></i>
                </div>
              </div>

              <h3 class="text-base sm:text-lg font-black text-slate-900 tracking-tight mb-2">
                3. How It Stops It
              </h3>
              <p class="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                We replace private data with mathematical tokens before requests leave your network, then seamlessly rehydrate original values when the LLM replies.
              </p>
            </div>

            <!-- Sketch Snippet Strip -->
            <div class="relative z-10 mt-3 pt-2.5 border-t-2 border-dashed border-slate-200 font-mono text-xs text-slate-600 flex items-center justify-between font-bold">
              <span class="text-emerald-800 font-extrabold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>[TOKEN] ⇄ [PII]</span>
              </span>
              <span class="text-slate-800">100% REVERSIBLE</span>
            </div>
          </div>
        </div>

      </div>

    </section>

    <!-- ======================================================================= -->
    <!-- THE PROJECTSPG PLATFORM SECTION (3x2 Dark Bento Grid on Grid Background)   -->
    <!-- ======================================================================= -->
    <section id="platform" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-gray-200/80">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
          <span class="w-2 h-2 rounded-full bg-[#f0523d]"></span>
          <span>Platform Capabilities</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Enterprise Security in Six Core Layers
        </h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Everything your security, legal, and engineering teams need to deploy LLMs and autonomous agents with complete privacy.
        </p>
      </div>

        <!-- 3x2 Grid (3 Columns, 2 Rows in Architectural Sketch Style) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          <!-- Card 1: Automatic Data Redaction (De-Identify) -->
          <div class="relative group select-none">
            <!-- Sharp Hatch Shadow Layer -->
            <div class="absolute inset-0 rounded-3xl transform translate-x-2 translate-y-2 z-0 pointer-events-none border border-slate-700/60"
                 style="background: repeating-linear-gradient(45deg, #475569, #475569 1.3px, transparent 1.3px, transparent 7px); opacity: 0.35;"></div>
            
            <!-- Card Body -->
            <div class="relative z-10 rounded-3xl bg-[#09090b] border-2 border-slate-700/80 p-6 sm:p-7 flex flex-col justify-between overflow-hidden min-h-[390px] sm:min-h-[420px] text-white transition-all duration-200 group-hover:-translate-y-1">
              <!-- Corner Registration Ticks (+) -->
              <div class="absolute top-2.5 left-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute top-2.5 right-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute bottom-2.5 left-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute bottom-2.5 right-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>

              <!-- Inset Dashed Drafting Contour -->
              <div class="absolute inset-1.5 sm:inset-2 rounded-[20px] border border-dashed border-slate-800/80 pointer-events-none"></div>

              <!-- Faint Sketch Texture -->
              <div class="absolute inset-0 rounded-3xl pointer-events-none opacity-15"
                   style="background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1.2px, transparent 1.2px, transparent 8px);"></div>

              <div class="relative z-10">
                <div class="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-800/60 mb-2.5"
                     style="box-shadow: 2px 2px 0px 0px rgba(244, 63, 94, 0.3);">
                  <span>§ 01</span>
                  <span>//</span>
                  <span>DE-IDENTIFY</span>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight">Automatic Data Redaction</h3>
                <p class="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Instantly strips customer names, passwords, credit cards, and confidential records before prompts leave your network.
                </p>
              </div>
              
              <!-- Inner Sketch Architectural Illustration -->
              <div class="flex-1 flex items-center justify-center pt-6 pb-2 relative z-10">
                <div class="w-full max-w-[310px] relative">
                  <!-- Hatch shadow behind inner snippet -->
                  <div class="absolute inset-0 rounded-xl transform translate-x-1.5 translate-y-1.5 z-0 border border-rose-900/60 pointer-events-none"
                       style="background: repeating-linear-gradient(45deg, #f43f5e, #f43f5e 1.2px, transparent 1.2px, transparent 6px); opacity: 0.25;"></div>
                  
                  <div class="relative z-10 rounded-xl bg-zinc-950 border-2 border-slate-700 p-3.5 space-y-2.5 font-mono text-[11px]">
                    <div class="flex items-center justify-between pb-2 border-b border-dashed border-slate-800 text-[10px]">
                      <div class="flex items-center gap-1.5 text-slate-400">
                        <span class="text-rose-400 font-bold">§</span>
                        <span class="uppercase tracking-wider font-semibold">STREAM_INTERCEPT</span>
                      </div>
                      <span class="text-rose-300 bg-rose-950/90 border border-rose-700/80 px-1.5 py-0.5 rounded text-[9px] font-bold"
                            style="box-shadow: 1.5px 1.5px 0px 0px rgba(244, 63, 94, 0.5);">REDACTED</span>
                    </div>

                    <div class="text-slate-300 text-[11px] leading-relaxed">
                      Bonus to 
                      <span class="relative inline-block px-1 py-0.5 mx-0.5 text-rose-200 border border-rose-600/70 rounded text-[10px] font-bold overflow-hidden"
                            style="background: repeating-linear-gradient(45deg, rgba(244,63,94,0.35), rgba(244,63,94,0.35) 1.5px, #1c0508 1.5px, #1c0508 5px);">
                        Alice Walker
                      </span>
                      (SSN: 
                      <span class="relative inline-block px-1 py-0.5 mx-0.5 text-rose-200 border border-rose-600/70 rounded text-[10px] font-bold overflow-hidden"
                            style="background: repeating-linear-gradient(45deg, rgba(244,63,94,0.35), rgba(244,63,94,0.35) 1.5px, #1c0508 1.5px, #1c0508 5px);">
                        82-9102834
                      </span>)
                    </div>

                    <div class="flex items-center justify-between pt-1.5 border-t border-dashed border-slate-800 text-[9px] text-slate-400">
                      <span class="flex items-center gap-1 text-emerald-400 font-semibold">
                        <span class="font-mono">✓</span> 0 B raw PII leaked
                      </span>
                      <span class="font-mono text-slate-500">|← 18.2ms →|</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 2: Context-Preserving Masking (De-Identify) -->
          <div class="relative group select-none">
            <!-- Sharp Hatch Shadow Layer -->
            <div class="absolute inset-0 rounded-3xl transform translate-x-2 translate-y-2 z-0 pointer-events-none border border-slate-700/60"
                 style="background: repeating-linear-gradient(45deg, #475569, #475569 1.3px, transparent 1.3px, transparent 7px); opacity: 0.35;"></div>
            
            <!-- Card Body -->
            <div class="relative z-10 rounded-3xl bg-[#09090b] border-2 border-slate-700/80 p-6 sm:p-7 flex flex-col justify-between overflow-hidden min-h-[390px] sm:min-h-[420px] text-white transition-all duration-200 group-hover:-translate-y-1">
              <!-- Corner Registration Ticks (+) -->
              <div class="absolute top-2.5 left-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute top-2.5 right-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute bottom-2.5 left-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute bottom-2.5 right-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>

              <!-- Inset Dashed Drafting Contour -->
              <div class="absolute inset-1.5 sm:inset-2 rounded-[20px] border border-dashed border-slate-800/80 pointer-events-none"></div>

              <!-- Faint Sketch Texture -->
              <div class="absolute inset-0 rounded-3xl pointer-events-none opacity-15"
                   style="background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1.2px, transparent 1.2px, transparent 8px);"></div>

              <div class="relative z-10">
                <div class="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/60 mb-2.5"
                     style="box-shadow: 2px 2px 0px 0px rgba(6, 182, 212, 0.3);">
                  <span>§ 02</span>
                  <span>//</span>
                  <span>DE-IDENTIFY</span>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight">Context-Preserving Masking</h3>
                <p class="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Replaces sensitive items with smart placeholders so AI stays accurate, then restores original values on output.
                </p>
              </div>
              
              <!-- Inner Sketch Architectural Illustration -->
              <div class="flex-1 flex items-center justify-center pt-6 pb-2 relative z-10">
                <div class="w-full max-w-[310px] relative space-y-2 font-mono text-[11px]">
                  <!-- Block 1: Masked Token -->
                  <div class="relative">
                    <div class="absolute inset-0 rounded-xl transform translate-x-1 translate-y-1 border border-cyan-800/50 pointer-events-none"
                         style="background: repeating-linear-gradient(45deg, #06b6d4, #06b6d4 1.2px, transparent 1.2px, transparent 6px); opacity: 0.2;"></div>
                    <div class="relative z-10 rounded-xl bg-cyan-950/50 border-2 border-cyan-700/80 p-2.5 flex items-center justify-between text-cyan-200"
                         style="box-shadow: 2px 2px 0px 0px rgba(8, 145, 178, 0.4);">
                      <div class="flex items-center gap-2">
                        <span class="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Masked In:</span>
                        <span class="bg-cyan-900/80 text-cyan-100 px-2 py-0.5 rounded border border-cyan-500 font-bold text-xs">[PERSON_1]</span>
                      </div>
                      <span class="text-[9px] text-cyan-400 font-mono">TYPE: NAME</span>
                    </div>
                  </div>

                  <!-- Technical Schematic Arrow with Crosshairs -->
                  <div class="flex items-center justify-center gap-2 text-slate-400 text-[10px] py-0.5">
                    <div class="w-10 h-px border-t border-dashed border-slate-700"></div>
                    <div class="flex items-center gap-1 text-emerald-400 bg-zinc-950 border border-slate-700 px-2 py-0.5 rounded-full text-[9px] font-bold"
                         style="box-shadow: 2px 2px 0px 0px rgba(16, 185, 129, 0.4);">
                      <span>⇄</span>
                      <span>2-WAY REHYDRATION</span>
                    </div>
                    <div class="w-10 h-px border-t border-dashed border-slate-700"></div>
                  </div>

                  <!-- Block 2: Restored Value -->
                  <div class="relative">
                    <div class="absolute inset-0 rounded-xl transform translate-x-1 translate-y-1 border border-emerald-800/50 pointer-events-none"
                         style="background: repeating-linear-gradient(45deg, #10b981, #10b981 1.2px, transparent 1.2px, transparent 6px); opacity: 0.2;"></div>
                    <div class="relative z-10 rounded-xl bg-emerald-950/50 border-2 border-emerald-600/80 p-2.5 flex items-center justify-between text-emerald-200"
                         style="box-shadow: 2px 2px 0px 0px rgba(16, 185, 129, 0.4);">
                      <div class="flex items-center gap-2">
                        <span class="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Restored Out:</span>
                        <span class="bg-emerald-900/80 text-emerald-100 px-2 py-0.5 rounded border border-emerald-400 font-bold text-xs">Alice Walker</span>
                      </div>
                      <span class="text-[9px] text-emerald-400 font-mono font-bold">✓ 100% MATCH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 3: Zero-Retention Routing (Privacy) -->
          <div class="relative group select-none">
            <!-- Sharp Hatch Shadow Layer -->
            <div class="absolute inset-0 rounded-3xl transform translate-x-2 translate-y-2 z-0 pointer-events-none border border-slate-700/60"
                 style="background: repeating-linear-gradient(45deg, #475569, #475569 1.3px, transparent 1.3px, transparent 7px); opacity: 0.35;"></div>
            
            <!-- Card Body -->
            <div class="relative z-10 rounded-3xl bg-[#09090b] border-2 border-slate-700/80 p-6 sm:p-7 flex flex-col justify-between overflow-hidden min-h-[390px] sm:min-h-[420px] text-white transition-all duration-200 group-hover:-translate-y-1">
              <!-- Corner Registration Ticks (+) -->
              <div class="absolute top-2.5 left-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute top-2.5 right-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute bottom-2.5 left-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute bottom-2.5 right-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>

              <!-- Inset Dashed Drafting Contour -->
              <div class="absolute inset-1.5 sm:inset-2 rounded-[20px] border border-dashed border-slate-800/80 pointer-events-none"></div>

              <!-- Faint Sketch Texture -->
              <div class="absolute inset-0 rounded-3xl pointer-events-none opacity-15"
                   style="background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1.2px, transparent 1.2px, transparent 8px);"></div>

              <div class="relative z-10">
                <div class="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/60 mb-2.5"
                     style="box-shadow: 2px 2px 0px 0px rgba(16, 185, 129, 0.3);">
                  <span>§ 03</span>
                  <span>//</span>
                  <span>PRIVACY</span>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight">Zero-Retention Routing</h3>
                <p class="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Prompts and keys live only in volatile RAM for milliseconds. Never written to disk, stored in databases, or trained on.
                </p>
              </div>
              
              <!-- Inner Sketch Architectural Illustration -->
              <div class="flex-1 flex items-center justify-center pt-6 pb-2 relative z-10">
                <div class="w-full max-w-[310px] relative">
                  <!-- Hatch shadow behind inner snippet -->
                  <div class="absolute inset-0 rounded-xl transform translate-x-1.5 translate-y-1.5 z-0 border border-emerald-900/60 pointer-events-none"
                       style="background: repeating-linear-gradient(45deg, #10b981, #10b981 1.2px, transparent 1.2px, transparent 6px); opacity: 0.25;"></div>

                  <div class="relative z-10 rounded-xl bg-zinc-950 border-2 border-slate-700 p-3 space-y-2.5 font-mono text-[11px]">
                    <!-- Hardware Schematic Block 1: Ephemeral RAM -->
                    <div class="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-700/60 relative overflow-hidden"
                         style="box-shadow: 2px 2px 0px 0px rgba(16, 185, 129, 0.3);">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <span class="text-[9px] font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-700">RAM_VOLATILE</span>
                          <span class="text-xs text-slate-200 font-semibold font-sans">Transient Buffer</span>
                        </div>
                        <span class="text-[9px] font-bold text-emerald-400 bg-emerald-900/80 px-1.5 py-0.5 rounded border border-emerald-600">PURGED ON EOF</span>
                      </div>
                      <div class="mt-1 flex gap-1 text-[8px] text-emerald-500 font-mono opacity-80">
                        <span>[0x7F2A]</span><span>---►</span><span>[CLEARED: 0 B]</span>
                      </div>
                    </div>

                    <!-- Hardware Schematic Block 2: Persistent Storage Blocked -->
                    <div class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700 relative overflow-hidden"
                         style="box-shadow: 2px 2px 0px 0px rgba(51, 65, 85, 0.5);">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <span class="text-[9px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-600">DISK_STORAGE</span>
                          <span class="text-xs text-slate-300 font-semibold font-sans">Hard Disk Write</span>
                        </div>
                        <span class="text-[9px] font-bold text-rose-400 bg-rose-950/80 px-1.5 py-0.5 rounded border border-rose-800">BLOCKED (0 B)</span>
                      </div>
                      <div class="mt-1 flex items-center justify-between text-[8px] text-slate-500 font-mono">
                        <span>NO LOGS • NO DB WRITES</span>
                        <span class="text-rose-400 font-bold">HARDWARE ENFORCED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 4: Bring Your Own Key (Privacy) -->
          <div class="relative group select-none">
            <!-- Sharp Hatch Shadow Layer -->
            <div class="absolute inset-0 rounded-3xl transform translate-x-2 translate-y-2 z-0 pointer-events-none border border-slate-700/60"
                 style="background: repeating-linear-gradient(45deg, #475569, #475569 1.3px, transparent 1.3px, transparent 7px); opacity: 0.35;"></div>
            
            <!-- Card Body -->
            <div class="relative z-10 rounded-3xl bg-[#09090b] border-2 border-slate-700/80 p-6 sm:p-7 flex flex-col justify-between overflow-hidden min-h-[390px] sm:min-h-[420px] text-white transition-all duration-200 group-hover:-translate-y-1">
              <!-- Corner Registration Ticks (+) -->
              <div class="absolute top-2.5 left-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute top-2.5 right-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute bottom-2.5 left-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute bottom-2.5 right-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>

              <!-- Inset Dashed Drafting Contour -->
              <div class="absolute inset-1.5 sm:inset-2 rounded-[20px] border border-dashed border-slate-800/80 pointer-events-none"></div>

              <!-- Faint Sketch Texture -->
              <div class="absolute inset-0 rounded-3xl pointer-events-none opacity-15"
                   style="background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1.2px, transparent 1.2px, transparent 8px);"></div>

              <div class="relative z-10">
                <div class="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/60 mb-2.5"
                     style="box-shadow: 2px 2px 0px 0px rgba(168, 85, 247, 0.3);">
                  <span>§ 04</span>
                  <span>//</span>
                  <span>PRIVACY</span>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight">Drop-in BYOK Proxy</h3>
                <p class="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Connect directly with OpenAI, Anthropic, Gemini, Mistral, and Groq with your accounts and zero token markup.
                </p>
              </div>
              
              <!-- Inner Sketch Architectural Illustration -->
              <div class="flex-1 flex flex-col items-center justify-center pt-6 pb-2 relative z-10 font-mono">
                <!-- Top Node Cluster -->
                <div class="flex items-center gap-2">
                  <div class="px-2.5 py-1 rounded-lg bg-zinc-900 border-2 border-slate-700 text-slate-200 text-[10px] font-bold flex items-center gap-1"
                       style="box-shadow: 2px 2px 0px 0px rgba(51, 65, 85, 0.6);" title="OpenAI">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>OpenAI</span>
                  </div>
                  <div class="px-2.5 py-1 rounded-lg bg-zinc-900 border-2 border-slate-700 text-slate-200 text-[10px] font-bold flex items-center gap-1"
                       style="box-shadow: 2px 2px 0px 0px rgba(51, 65, 85, 0.6);" title="Claude">
                    <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>Claude</span>
                  </div>
                  <div class="px-2.5 py-1 rounded-lg bg-zinc-900 border-2 border-slate-700 text-slate-200 text-[10px] font-bold flex items-center gap-1"
                       style="box-shadow: 2px 2px 0px 0px rgba(51, 65, 85, 0.6);" title="Gemini">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>Gemini</span>
                  </div>
                </div>

                <!-- Blueprint Stepped Connecting Lines -->
                <div class="w-28 h-3 border-b-2 border-x-2 border-dashed border-slate-600 my-0.5"></div>
                <div class="w-px h-1.5 bg-slate-600 mb-0.5"></div>

                <!-- Center Hub: ProjectSPG Gateway -->
                <div class="px-3 py-1 rounded-xl bg-[#0d1824] border-2 border-cyan-400/80 text-cyan-200 text-[11px] font-bold flex items-center gap-2"
                     style="box-shadow: 3px 3px 0px 0px rgba(6, 182, 212, 0.5);">
                  <i data-lucide="shield" class="w-3.5 h-3.5 text-cyan-400"></i>
                  <span>ProjectSPG Gateway (BYOK)</span>
                </div>

                <div class="w-px h-1.5 bg-slate-600 mt-0.5"></div>

                <!-- Bottom: 1-Line SDK Integration -->
                <div class="mt-1 text-[9px] text-slate-400 bg-zinc-950 border border-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1.5"
                     style="box-shadow: 1.5px 1.5px 0px 0px rgba(51, 65, 85, 0.4);">
                  <span class="text-emerald-400 font-bold">baseURL:</span>
                  <span class="text-slate-300">"https://api.projectspg.info/v1"</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 5: Turnkey Regulatory Compliance (Compliance) -->
          <div class="relative group select-none">
            <!-- Sharp Hatch Shadow Layer -->
            <div class="absolute inset-0 rounded-3xl transform translate-x-2 translate-y-2 z-0 pointer-events-none border border-slate-700/60"
                 style="background: repeating-linear-gradient(45deg, #475569, #475569 1.3px, transparent 1.3px, transparent 7px); opacity: 0.35;"></div>
            
            <!-- Card Body -->
            <div class="relative z-10 rounded-3xl bg-[#09090b] border-2 border-slate-700/80 p-6 sm:p-7 flex flex-col justify-between overflow-hidden min-h-[390px] sm:min-h-[420px] text-white transition-all duration-200 group-hover:-translate-y-1">
              <!-- Corner Registration Ticks (+) -->
              <div class="absolute top-2.5 left-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute top-2.5 right-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute bottom-2.5 left-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute bottom-2.5 right-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>

              <!-- Inset Dashed Drafting Contour -->
              <div class="absolute inset-1.5 sm:inset-2 rounded-[20px] border border-dashed border-slate-800/80 pointer-events-none"></div>

              <!-- Faint Sketch Texture -->
              <div class="absolute inset-0 rounded-3xl pointer-events-none opacity-15"
                   style="background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1.2px, transparent 1.2px, transparent 8px);"></div>

              <div class="relative z-10">
                <div class="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-800/60 mb-2.5"
                     style="box-shadow: 2px 2px 0px 0px rgba(59, 130, 246, 0.3);">
                  <span>§ 05</span>
                  <span>//</span>
                  <span>COMPLIANCE</span>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight">Turnkey Compliance</h3>
                <p class="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Automated turnkey guardrails mapping directly to HIPAA Title II, GDPR Art. 9, PCI-DSS v4.0, and CCPA out of the box.
                </p>
              </div>
              
              <!-- Inner Sketch Architectural Illustration (4 Compliance Seals) -->
              <div class="flex-1 flex items-center justify-center pt-6 pb-2 relative z-10 font-mono">
                <div class="w-full max-w-[310px] grid grid-cols-2 gap-2 text-left">
                  <!-- Seal 1: HIPAA -->
                  <div class="p-2 rounded-xl bg-blue-950/30 border-2 border-blue-600/70 relative overflow-hidden"
                       style="box-shadow: 2.5px 2.5px 0px 0px rgba(37, 99, 235, 0.4);">
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[9px] font-bold text-blue-300">HIPAA</span>
                      <span class="text-[8px] text-blue-400 bg-blue-900/60 px-1 rounded border border-blue-700">§164.514</span>
                    </div>
                    <div class="text-[10px] font-semibold text-slate-200 font-sans">Safe Harbor</div>
                    <div class="text-[8px] text-emerald-400 pt-1 font-bold">✓ 18 IDs Masked</div>
                  </div>

                  <!-- Seal 2: GDPR -->
                  <div class="p-2 rounded-xl bg-emerald-950/30 border-2 border-emerald-600/70 relative overflow-hidden"
                       style="box-shadow: 2.5px 2.5px 0px 0px rgba(16, 185, 129, 0.4);">
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[9px] font-bold text-emerald-300">GDPR</span>
                      <span class="text-[8px] text-emerald-400 bg-emerald-900/60 px-1 rounded border border-emerald-700">Art. 9(2)</span>
                    </div>
                    <div class="text-[10px] font-semibold text-slate-200 font-sans">Sovereign Data</div>
                    <div class="text-[8px] text-emerald-400 pt-1 font-bold">✓ Zero Transit</div>
                  </div>

                  <!-- Seal 3: PCI-DSS -->
                  <div class="p-2 rounded-xl bg-purple-950/30 border-2 border-purple-600/70 relative overflow-hidden"
                       style="box-shadow: 2.5px 2.5px 0px 0px rgba(168, 85, 247, 0.4);">
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[9px] font-bold text-purple-300">PCI-DSS</span>
                      <span class="text-[8px] text-purple-400 bg-purple-900/60 px-1 rounded border border-purple-700">v4.0.1</span>
                    </div>
                    <div class="text-[10px] font-semibold text-slate-200 font-sans">PAN Masking</div>
                    <div class="text-[8px] text-emerald-400 pt-1 font-bold">✓ Scope Reduced</div>
                  </div>

                  <!-- Seal 4: SOC 2 -->
                  <div class="p-2 rounded-xl bg-cyan-950/30 border-2 border-cyan-600/70 relative overflow-hidden"
                       style="box-shadow: 2.5px 2.5px 0px 0px rgba(6, 182, 212, 0.4);">
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-[9px] font-bold text-cyan-300">SOC 2</span>
                      <span class="text-[8px] text-cyan-400 bg-cyan-900/60 px-1 rounded border border-cyan-700">Type II</span>
                    </div>
                    <div class="text-[10px] font-semibold text-slate-200 font-sans">Continuous Proof</div>
                    <div class="text-[8px] text-emerald-400 pt-1 font-bold">✓ Attestation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 6: Tamper-Proof Audit Trails (Compliance) -->
          <div class="relative group select-none">
            <!-- Sharp Hatch Shadow Layer -->
            <div class="absolute inset-0 rounded-3xl transform translate-x-2 translate-y-2 z-0 pointer-events-none border border-slate-700/60"
                 style="background: repeating-linear-gradient(45deg, #475569, #475569 1.3px, transparent 1.3px, transparent 7px); opacity: 0.35;"></div>
            
            <!-- Card Body -->
            <div class="relative z-10 rounded-3xl bg-[#09090b] border-2 border-slate-700/80 p-6 sm:p-7 flex flex-col justify-between overflow-hidden min-h-[390px] sm:min-h-[420px] text-white transition-all duration-200 group-hover:-translate-y-1">
              <!-- Corner Registration Ticks (+) -->
              <div class="absolute top-2.5 left-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute top-2.5 right-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute bottom-2.5 left-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>
              <div class="absolute bottom-2.5 right-2.5 text-slate-500 font-mono text-[10px] select-none leading-none opacity-60">+</div>

              <!-- Inset Dashed Drafting Contour -->
              <div class="absolute inset-1.5 sm:inset-2 rounded-[20px] border border-dashed border-slate-800/80 pointer-events-none"></div>

              <!-- Faint Sketch Texture -->
              <div class="absolute inset-0 rounded-3xl pointer-events-none opacity-15"
                   style="background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05) 1.2px, transparent 1.2px, transparent 8px);"></div>

              <div class="relative z-10">
                <div class="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/60 mb-2.5"
                     style="box-shadow: 2px 2px 0px 0px rgba(245, 158, 11, 0.3);">
                  <span>§ 06</span>
                  <span>//</span>
                  <span>COMPLIANCE</span>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight">Tamper-Proof Audit Trails</h3>
                <p class="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Cryptographic SHA-256 event fingerprints and real-time SIEM streaming to Datadog, Splunk, and CloudWatch.
                </p>
              </div>
              
              <!-- Inner Sketch Architectural Illustration -->
              <div class="flex-1 flex flex-col items-center justify-center pt-6 pb-2 relative z-10 font-mono">
                <div class="w-full max-w-[310px] space-y-2">
                  <!-- Hash Proof Block with Hatch Shadow -->
                  <div class="relative">
                    <div class="absolute inset-0 rounded-xl transform translate-x-1 translate-y-1 border border-amber-700/50 pointer-events-none"
                         style="background: repeating-linear-gradient(45deg, #f59e0b, #f59e0b 1.2px, transparent 1.2px, transparent 6px); opacity: 0.2;"></div>
                    <div class="relative z-10 rounded-xl bg-zinc-950 border-2 border-amber-600/70 p-2.5 space-y-1">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-1.5 text-amber-300 font-bold text-[10px]">
                          <i data-lucide="hash" class="w-3 h-3 text-amber-400"></i>
                          <span>SHA-256 PROOF HASH</span>
                        </div>
                        <span class="text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-700 px-1.5 py-0.2 rounded font-bold">VERIFIED</span>
                      </div>
                      <div class="text-[9px] text-slate-400 truncate font-mono">
                        hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4...
                      </div>
                    </div>
                  </div>

                  <!-- Stepped Connector Line -->
                  <div class="flex items-center justify-center gap-1.5 text-[9px] text-slate-500 py-0.5">
                    <div class="w-6 h-px bg-slate-700"></div>
                    <span class="text-slate-400 font-semibold">STREAM TO SECOPS</span>
                    <div class="w-6 h-px bg-slate-700"></div>
                  </div>

                  <!-- SIEM Target Pills with Sharp Shadows -->
                  <div class="flex items-center justify-center gap-2">
                    <span class="px-2 py-0.5 rounded-md bg-zinc-950 border-2 border-slate-700 text-slate-300 text-[9px] font-bold"
                          style="box-shadow: 2px 2px 0px 0px rgba(51, 65, 85, 0.5);">
                      Datadog
                    </span>
                    <span class="px-2 py-0.5 rounded-md bg-zinc-950 border-2 border-slate-700 text-slate-300 text-[9px] font-bold"
                          style="box-shadow: 2px 2px 0px 0px rgba(51, 65, 85, 0.5);">
                      Splunk
                    </span>
                    <span class="px-2 py-0.5 rounded-md bg-zinc-950 border-2 border-slate-700 text-slate-300 text-[9px] font-bold"
                          style="box-shadow: 2px 2px 0px 0px rgba(51, 65, 85, 0.5);">
                      CloudWatch
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Architectural Drafting Ground Lines beneath the Grid -->
        <div class="mt-12 flex flex-col items-center justify-center space-y-1.5 opacity-60">
          <div class="w-1/2 h-[1.6px] bg-slate-400 rounded-full"></div>
          <div class="w-1/3 h-[1.2px] bg-slate-300 rounded-full"></div>
          <div class="w-1/5 h-[1.0px] bg-slate-200 rounded-full"></div>
        </div>

    </section>

    <!-- ======================================================================= -->
    <!-- RATE LIMIT INCREASE & DEVELOPER UPGRADE (100k/mo CAPTURE SECTION)       -->
    <!-- ======================================================================= -->
    <section id="rate-limits" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-gray-200/80">
      
      <div class="relative select-none">
        <!-- Sharp Hatch Shadow Layer -->
        <div class="absolute inset-0 rounded-3xl transform translate-x-3 translate-y-3 z-0 pointer-events-none border-2 border-slate-900"
             style="background: repeating-linear-gradient(45deg, #475569, #475569 1.3px, transparent 1.3px, transparent 7px); opacity: 0.35;"></div>

        <!-- Main Card Body -->
        <div class="relative z-10 rounded-3xl bg-white border-2 border-slate-900 p-8 sm:p-12 lg:p-14 text-center overflow-hidden"
             style="box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.05);">
          
          <!-- Corner Registration Marks (+) -->
          <div class="absolute top-3 left-3 text-slate-500 font-mono text-xs font-black select-none leading-none">+</div>
          <div class="absolute top-3 right-3 text-slate-500 font-mono text-xs font-black select-none leading-none">+</div>
          <div class="absolute bottom-3 left-3 text-slate-500 font-mono text-xs font-black select-none leading-none">+</div>
          <div class="absolute bottom-3 right-3 text-slate-500 font-mono text-xs font-black select-none leading-none">+</div>

          <!-- Inset Dashed Drafting Contour -->
          <div class="absolute inset-2 sm:inset-2.5 rounded-[22px] border border-dashed border-slate-300 pointer-events-none"></div>

          <!-- Top Status Pill -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border-2 border-slate-900 text-xs font-mono font-black text-slate-900 mb-6 shadow-[2px_2px_0px_0px_#0f172a]">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900 animate-pulse"></span>
            <span>§ 07 // DEVELOPER QUOTA UPGRADE</span>
            <span class="text-slate-400">•</span>
            <span class="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">100,000 REQS / MO (100% FREE)</span>
          </div>

          <!-- Main Heading -->
          <h2 class="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight max-w-2xl mx-auto">
            Need Higher Throughput? Unlock 100k Free Requests / Month.
          </h2>

          <!-- Subhead -->
          <p class="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl mx-auto mt-4 mb-8">
            Upgrade your developer key from standard tier to <strong>100,000 free requests/month</strong> at zero cost. No credit card required. Test frontier LLMs with instant de-identification, &lt;20ms edge latency, and full zero-retention routing.
          </p>

          <!-- Interactive Form Container -->
          <div class="max-w-md mx-auto mb-6">
            <form id="bottom-upgrade-form" onsubmit="handleBottomUpgradeSubmit(event)" class="relative flex flex-col sm:flex-row items-stretch gap-2.5">
              <div class="relative flex-1">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i data-lucide="mail" class="w-4 h-4"></i>
                </div>
                <input
                  type="email"
                  id="bottom-upgrade-email"
                  required
                  placeholder="Enter your email"
                  class="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-900 text-slate-900 placeholder-slate-400 text-xs font-mono font-semibold focus:outline-none focus:bg-white focus:border-[#f0523d] shadow-[2px_2px_0px_0px_#0f172a] transition-all"
                />
              </div>
              <button
                type="submit"
                id="btn-bottom-upgrade"
                class="px-6 py-3 rounded-xl bg-[#f0523d] hover:bg-[#e0422d] text-white text-xs font-mono font-black uppercase tracking-wider border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 group"
              >
                <span>Unlock 100k/mo (Free)</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"></i>
              </button>
            </form>

            <p class="text-[11px] font-mono font-semibold text-slate-500 mt-2.5 flex items-center justify-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>100% Free forever • No credit card required • Instant activation</span>
            </p>

            <!-- Success State Message (Initially Hidden) -->
            <div id="bottom-upgrade-success" class="hidden mt-3 p-4 rounded-xl bg-emerald-50 border-2 border-emerald-700 text-emerald-950 font-mono text-xs text-left shadow-[2px_2px_0px_0px_#065f46]">
              <div class="flex items-center gap-2 font-black mb-1 text-emerald-900">
                <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600 stroke-[2.5]"></i>
                <span>✓ 100,000 Free Monthly Quota Unlocked!</span>
              </div>
              <p class="text-[11px] text-emerald-800 font-sans leading-relaxed">
                Your email has been registered for the 100,000 free requests/month developer tier. Your upgraded API key is now active at zero cost.
              </p>
              <div class="mt-2.5 flex items-center gap-3">
                <a href="/" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-[11px] font-bold transition">
                  <span>Open Console</span>
                  <i data-lucide="arrow-right" class="w-3 h-3"></i>
                </a>
                <span class="text-[10px] text-emerald-700 font-sans">No credit card required • 100% Free.</span>
              </div>
            </div>
          </div>

          <!-- Feature Checklist Strip -->
          <div class="pt-6 border-t border-dashed border-slate-200 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono font-bold text-slate-700">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>100,000 Free Requests / Mo</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-cyan-500"></span>
              <span>Sub-20ms PII Strip</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#f0523d]"></span>
              <span>Zero Upstream Retention</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>No Credit Card Required</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Architectural Ground Drafting Lines beneath the card -->
      <div class="mt-14 flex flex-col items-center justify-center space-y-1.5 opacity-60">
        <div class="w-1/2 h-[1.8px] bg-slate-400 rounded-full"></div>
        <div class="w-1/3 h-[1.2px] bg-slate-300 rounded-full"></div>
        <div class="w-1/5 h-[1.0px] bg-slate-200 rounded-full"></div>
      </div>

    </section>
    <!-- ======================================================================= -->
    <!-- BLOG & TECHNICAL RESEARCH SECTION (ARCHITECTURAL SKETCH STYLE)          -->
    <!-- ======================================================================= -->
    <section id="blog" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-gray-200/80">
      
      <!-- Section Header Row in Sketch Style -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 sm:mb-16">
        <div>
          <!-- Blueprint Style Technical Badge -->
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border-2 border-slate-900 text-slate-900 text-xs font-mono font-black uppercase tracking-wider mb-4 shadow-[2px_2px_0px_0px_#0f172a]">
            <span class="w-2.5 h-2.5 rounded-full bg-[#f0523d] border border-slate-900 animate-pulse"></span>
            <span>§ 08 // TECHNICAL BRIEFINGS &amp; RESEARCH</span>
          </div>
          <h2 class="text-3xl sm:text-5xl lg:text-[46px] font-extrabold tracking-tight text-slate-950 leading-tight">
            Learn More About ProjectSPG
          </h2>
          <p class="text-sm sm:text-base text-slate-600 mt-2 max-w-xl leading-relaxed">
            In-depth architecture analysis, empirical latency benchmarks, and sovereign data residency deep-dives.
          </p>
        </div>
        
        <!-- Sketch Button for All Posts -->
        <a href="/blog/benchmark" class="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-900 text-slate-950 font-mono text-xs font-black tracking-wider uppercase transition shadow-[3px_3px_0px_0px_#0f172a] hover:shadow-[1px_1px_0px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 flex items-center gap-2 group">
          <span>ALL BLOG POSTS</span>
          <i data-lucide="arrow-up-right" class="w-4 h-4 text-slate-900 stroke-[2.5] group-hover:text-[#f0523d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"></i>
        </a>
      </div>

      <!-- Two-Column Grid: Large Featured Post on Left, 3 Stacked Posts on Right -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        
        <!-- Left Column: Featured Post (The Open Source AI Stack) in Sketch Card -->
        <a href="/blog/stack" class="block lg:col-span-6 group cursor-pointer text-inherit no-underline">
          <div class="relative h-full rounded-2xl bg-white border-2 border-slate-900 p-5 sm:p-7 shadow-[5px_5px_0px_0px_#0f172a] hover:shadow-[7px_7px_0px_0px_#0f172a] hover:-translate-y-1 transition-all flex flex-col justify-between">
            
            <!-- Corner Registration Ticks (+) -->
            <div class="absolute top-2 left-2 text-slate-500 font-mono text-[10px] select-none leading-none font-black">+</div>
            <div class="absolute top-2 right-2 text-slate-500 font-mono text-[10px] select-none leading-none font-black">+</div>
            <div class="absolute bottom-2 left-2 text-slate-500 font-mono text-[10px] select-none leading-none font-black">+</div>
            <div class="absolute bottom-2 right-2 text-slate-500 font-mono text-[10px] select-none leading-none font-black">+</div>
            
            <!-- Inset Dashed Drafting Contour -->
            <div class="absolute inset-1.5 rounded-[12px] border border-dashed border-slate-300 pointer-events-none"></div>

            <div>
              <!-- Top Strip with Technical Meta -->
              <div class="flex items-center justify-between pb-3 mb-4 border-b-2 border-dashed border-slate-200">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#f0523d] border border-slate-900"></span>
                  <span class="font-mono text-[10px] font-black uppercase tracking-wider text-slate-700">SPEC: OPEN MODEL STACK // ARCH-01</span>
                </div>
                <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-950 border-2 border-slate-900 font-mono text-[9px] font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#0f172a]">
                  INFERENCE &amp; SECURITY
                </span>
              </div>

              <!-- Stack Blueprint Illustration Card (Crisp Drafting Layers) -->
              <div class="relative w-full min-h-[250px] sm:aspect-[16/10] bg-[#09090b] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] overflow-hidden">
                
                <!-- Corner Ticks on dark card -->
                <div class="absolute top-2 left-2 text-slate-600 font-mono text-[9px] select-none leading-none font-black">+</div>
                <div class="absolute top-2 right-2 text-slate-600 font-mono text-[9px] select-none leading-none font-black">+</div>
                <div class="absolute bottom-2 left-2 text-slate-600 font-mono text-[9px] select-none leading-none font-black">+</div>
                <div class="absolute bottom-2 right-2 text-slate-600 font-mono text-[9px] select-none leading-none font-black">+</div>

                <!-- Inset Dashed Border inside Blueprint -->
                <div class="absolute inset-1.5 rounded-[9px] border border-dashed border-slate-800 pointer-events-none"></div>
                
                <!-- Blueprint Ambient Hatch Overlay -->
                <div class="absolute inset-0 pointer-events-none opacity-20"
                     style="background: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08) 1.2px, transparent 1.2px, transparent 7px);"></div>

                <div class="relative z-10 flex flex-col sm:flex-row h-full w-full gap-5 sm:gap-2">
                  <!-- Left Side: Title Typography in font-sketch -->
                  <div class="w-full sm:w-[42%] flex flex-col justify-center pr-0 sm:pr-3">
                    <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                      The<br class="hidden sm:block"><span class="text-slate-100"> Open</span><br class="hidden sm:block"><span class="text-slate-200"> Model</span><br class="hidden sm:block"><span class="text-slate-300"> AI Stack</span>
                    </h3>
                    <p class="text-[10px] font-mono tracking-wider text-slate-400 mt-2 sm:mt-3 uppercase font-bold">
                      the <span class="text-white border-b border-dashed border-white pb-0.5">MIGHT</span> stack
                    </p>
                  </div>

                  <!-- Right Side: Layered Stack Pills -->
                  <div class="w-full sm:w-[58%] flex flex-col justify-center gap-2 text-[10px] font-mono">
                    <!-- Layer 1: models -->
                    <div class="bg-[#121622] border-2 border-slate-700/80 rounded-lg p-2 flex items-center justify-between shadow-[2px_2px_0px_0px_#000]">
                      <span class="text-slate-400 font-mono text-[9px] uppercase font-bold">models</span>
                      <div class="flex items-center gap-1.5">
                        <span class="w-2.5 h-2.5 rounded-full bg-orange-400 border border-slate-900 inline-block"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-blue-400 border border-slate-900 inline-block"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-purple-400 border border-slate-900 inline-block"></span>
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900 inline-block"></span>
                        <span class="text-[10px] font-bold text-white ml-0.5">∞</span>
                      </div>
                    </div>

                    <!-- Layer 2: inference -->
                    <div class="bg-[#121622] border-2 border-slate-700/80 rounded-lg p-2 flex items-center justify-between shadow-[2px_2px_0px_0px_#000]">
                      <span class="text-slate-400 font-mono text-[9px] uppercase font-bold">inference</span>
                      <div class="flex items-center gap-1.5 text-[9px] font-bold text-slate-200 flex-wrap">
                        <span>SGLang</span>
                        <span>vLLM</span>
                        <span>TRT-LLM</span>
                        <span class="text-white font-black bg-[#f0523d] px-1.5 py-0.5 rounded border border-slate-900">♥ ProjectSPG</span>
                      </div>
                    </div>

                    <!-- Layer 3: gateways & routers -->
                    <div class="bg-[#121622] border-2 border-slate-700/80 rounded-lg p-2 flex items-center justify-between shadow-[2px_2px_0px_0px_#000]">
                      <span class="text-slate-400 font-mono text-[9px] uppercase font-bold truncate mr-1">gateways</span>
                      <div class="flex items-center gap-2 text-[9px] font-bold text-slate-300">
                        <span>LiteLLM</span>
                        <span>OpenRouter</span>
                        <span>AI Gateway</span>
                      </div>
                    </div>

                    <!-- Layer 4: harness -->
                    <div class="bg-[#121622] border-2 border-slate-700/80 rounded-lg p-2 flex items-center justify-between shadow-[2px_2px_0px_0px_#000]">
                      <span class="text-slate-400 font-mono text-[9px] uppercase font-bold">harness</span>
                      <div class="flex items-center gap-2 text-[9px] font-bold text-slate-300">
                        <span>opencode</span>
                        <span>pi</span>
                        <span>Cursor</span>
                      </div>
                    </div>

                    <!-- Layer 5: tools -->
                    <div class="bg-[#121622] border-2 border-slate-700/80 rounded-lg p-2 flex items-center justify-between shadow-[2px_2px_0px_0px_#000]">
                      <span class="text-slate-400 font-mono text-[9px] uppercase font-bold">tools</span>
                      <div class="flex items-center gap-2.5 text-[9px] font-bold text-slate-300">
                        <span>MCP</span>
                        <span>Skills</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Post Meta & Details in Sketch Style -->
              <div class="mt-5">
                <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-950 group-hover:text-[#f0523d] transition-colors leading-snug">
                  The Open Source AI Stack: Why ProjectSPG Ranks #1
                </h3>
                <p class="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  A deep dive into the open model AI stack and a ranked comparison of the leading AI security proxies across latency, reversibility, and sovereign compliance.
                </p>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-dashed border-slate-200 flex items-center gap-2 font-mono text-xs font-black text-[#f0523d]">
              <span class="uppercase tracking-wider">READ WHITE PAPER // ARCH-01</span>
              <i data-lucide="arrow-right" class="w-4 h-4 stroke-[2.5] group-hover:translate-x-1.5 transition-transform"></i>
            </div>

          </div>
        </a>

        <!-- Right Column: 3 Horizontal Sketch Cards -->
        <div class="lg:col-span-6 flex flex-col gap-5 sm:gap-6">
          
          <!-- Item 1: Empirical Benchmark & Audit Report -->
          <a href="/blog/benchmark" class="block group cursor-pointer text-inherit no-underline">
            <div class="relative rounded-2xl bg-white border-2 border-slate-900 p-4 sm:p-5 shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row items-start gap-4">
              
              <!-- Corner Registration Ticks (+) -->
              <div class="absolute top-1.5 left-1.5 text-slate-400 font-mono text-[9px] select-none leading-none font-bold">+</div>
              <div class="absolute top-1.5 right-1.5 text-slate-400 font-mono text-[9px] select-none leading-none font-bold">+</div>
              <div class="absolute bottom-1.5 left-1.5 text-slate-400 font-mono text-[9px] select-none leading-none font-bold">+</div>
              <div class="absolute bottom-1.5 right-1.5 text-slate-400 font-mono text-[9px] select-none leading-none font-bold">+</div>
              
              <!-- Inset Dashed Drafting Contour -->
              <div class="absolute inset-1 rounded-[12px] border border-dashed border-slate-200 pointer-events-none"></div>

              <!-- Sketch Pastel Thumbnail -->
              <div class="w-full sm:w-44 md:w-48 aspect-[16/10] shrink-0 rounded-xl overflow-hidden relative border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] bg-gradient-to-br from-[#ffd5cc] via-[#f7e0ff] to-[#d8e6ff] flex items-center justify-center p-3 text-center transition-all">
                <div class="flex flex-col items-center">
                  <div class="flex items-center gap-1 mb-1">
                    <span class="w-2 h-2 rounded-full bg-pink-500 border border-slate-900"></span>
                    <span class="text-[9px] font-mono font-black text-gray-900 lowercase tracking-tight">project<span class="text-[#f0523d]">spg</span></span>
                  </div>
                  <p class="text-[11px] sm:text-[12px] font-bold text-gray-950 leading-tight">
                    Empirical Benchmark: 9.33M Prompts
                  </p>
                </div>
              </div>

              <!-- Text Details -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 border-2 border-slate-900 font-mono text-[9px] font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#0f172a]">
                    BENCHMARK
                  </span>
                  <span class="text-[10px] font-mono font-bold text-slate-500">FIDELITY: 100.00%</span>
                </div>
                <h4 class="text-lg sm:text-xl font-bold text-slate-950 group-hover:text-[#f0523d] transition-colors leading-snug">
                  Empirical Benchmark: 9,334,805 Prompts Evaluated with 100.00% Fidelity &amp; 86µs Latency
                </h4>
                <p class="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  Exhaustive empirical validation across 1.94B tokens proving zero-loss de-identification, 17,735 prompts/sec throughput, and 13.3ms HTTPS latency.
                </p>
              </div>

            </div>
          </a>

          <!-- Item 2: Global Sovereign AI Privacy: 109 Jurisdictions Supported -->
          <a href="/blog/countries" class="block group cursor-pointer text-inherit no-underline">
            <div class="relative rounded-2xl bg-white border-2 border-slate-900 p-4 sm:p-5 shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row items-start gap-4">
              
              <!-- Corner Registration Ticks (+) -->
              <div class="absolute top-1.5 left-1.5 text-slate-400 font-mono text-[9px] select-none leading-none font-bold">+</div>
              <div class="absolute top-1.5 right-1.5 text-slate-400 font-mono text-[9px] select-none leading-none font-bold">+</div>
              <div class="absolute bottom-1.5 left-1.5 text-slate-400 font-mono text-[9px] select-none leading-none font-bold">+</div>
              <div class="absolute bottom-1.5 right-1.5 text-slate-400 font-mono text-[9px] select-none leading-none font-bold">+</div>
              
              <!-- Inset Dashed Drafting Contour -->
              <div class="absolute inset-1 rounded-[12px] border border-dashed border-slate-200 pointer-events-none"></div>

              <!-- Sketch Pastel Thumbnail -->
              <div class="w-full sm:w-44 md:w-48 aspect-[16/10] shrink-0 rounded-xl overflow-hidden relative border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] bg-gradient-to-br from-[#fed7aa] via-[#fde047]/30 to-[#c7d2fe] flex items-center justify-center p-3 text-center transition-all">
                <div class="flex flex-col items-center">
                  <div class="flex items-center gap-1 mb-1">
                    <span class="w-2 h-2 rounded-full bg-orange-500 border border-slate-900"></span>
                    <span class="text-[9px] font-mono font-black text-gray-900 lowercase tracking-tight">project<span class="text-[#f0523d]">spg</span></span>
                  </div>
                  <p class="text-[11px] sm:text-[12px] font-bold text-gray-950 leading-tight">
                    109 Jurisdictions Supported
                  </p>
                </div>
              </div>

              <!-- Text Details -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="px-2 py-0.5 rounded bg-sky-100 text-sky-950 border-2 border-slate-900 font-mono text-[9px] font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#0f172a]">
                    COMPLIANCE
                  </span>
                  <span class="text-[10px] font-mono font-bold text-slate-500">GLOBAL RESIDENCY</span>
                </div>
                <h4 class="text-lg sm:text-xl font-bold text-slate-950 group-hover:text-[#f0523d] transition-colors leading-snug">
                  Global Sovereign AI Privacy: 109 Jurisdictions Supported by ProjectSPG
                </h4>
                <p class="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  Protecting sensitive enterprise data across GDPR, India DPDP, Singapore PDPA, HIPAA, and 109 sovereign national jurisdictions without code changes.
                </p>
              </div>

            </div>
          </a>

          <!-- Item 3: Enterprise Guardrails for Regulated Industries -->
          <a href="/blog/industries" class="block group cursor-pointer text-inherit no-underline">
            <div class="relative rounded-2xl bg-white border-2 border-slate-900 p-4 sm:p-5 shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[6px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row items-start gap-4">
              
              <!-- Corner Registration Ticks (+) -->
              <div class="absolute top-1.5 left-1.5 text-slate-400 font-mono text-[9px] select-none leading-none font-bold">+</div>
              <div class="absolute top-1.5 right-1.5 text-slate-400 font-mono text-[9px] select-none leading-none font-bold">+</div>
              <div class="absolute bottom-1.5 left-1.5 text-slate-400 font-mono text-[9px] select-none leading-none font-bold">+</div>
              <div class="absolute bottom-1.5 right-1.5 text-slate-400 font-mono text-[9px] select-none leading-none font-bold">+</div>
              
              <!-- Inset Dashed Drafting Contour -->
              <div class="absolute inset-1 rounded-[12px] border border-dashed border-slate-200 pointer-events-none"></div>

              <!-- Sketch Pastel Thumbnail -->
              <div class="w-full sm:w-44 md:w-48 aspect-[16/10] shrink-0 rounded-xl overflow-hidden relative border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] bg-gradient-to-br from-[#fecdd3] via-[#e9d5ff] to-[#bfdbfe] flex items-center justify-center p-3 text-center transition-all">
                <div class="flex flex-col items-center">
                  <div class="flex items-center gap-1 mb-1">
                    <span class="w-2 h-2 rounded-full bg-purple-500 border border-slate-900"></span>
                    <span class="text-[9px] font-mono font-black text-gray-900 lowercase tracking-tight">project<span class="text-[#f0523d]">spg</span></span>
                  </div>
                  <p class="text-[11px] sm:text-[12px] font-bold text-gray-950 leading-tight">
                    Enterprise Guardrails &amp; Threat Models
                  </p>
                </div>
              </div>

              <!-- Text Details -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="px-2 py-0.5 rounded bg-purple-100 text-purple-950 border-2 border-slate-900 font-mono text-[9px] font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_0px_#0f172a]">
                    ENTERPRISE
                  </span>
                  <span class="text-[10px] font-mono font-bold text-slate-500">DEFENSE &amp; FINTECH</span>
                </div>
                <h4 class="text-lg sm:text-xl font-bold text-slate-950 group-hover:text-[#f0523d] transition-colors leading-snug">
                  Enterprise Guardrails for Regulated Industries: Healthcare, FinTech &amp; Legal
                </h4>
                <p class="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  Protecting clinical PHI under HIPAA, financial assets under PCI-DSS, attorney-client privilege, and defense telemetry across frontier LLMs with zero code changes.
                </p>
              </div>

            </div>
          </a>

        </div>

      </div>

      <!-- Architectural Ground Drafting Hatch Lines beneath Blog Section -->
      <div class="mt-14 flex flex-col items-center justify-center space-y-1.5 opacity-60">
        <div class="w-1/2 h-[1.8px] bg-slate-400 rounded-full"></div>
        <div class="w-1/3 h-[1.2px] bg-slate-300 rounded-full"></div>
        <div class="w-1/5 h-[1.0px] bg-slate-200 rounded-full"></div>
      </div>

    </section>


  </main>

  <!-- ========================================================================= -->
  <!-- LEAD CAPTURE / EMAIL GATE MODAL (Triggered on 2nd demo run)               -->
  <!-- ========================================================================= -->
  <div id="modal-lead-gate" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-md w-full p-6 text-center space-y-5 relative">
      
      <button onclick="closeLeadModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div class="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-[#f0523d] flex items-center justify-center mx-auto shadow-2xs">
        <i data-lucide="sparkles" class="w-6 h-6"></i>
      </div>

      <div class="space-y-1.5">
        <h3 class="text-lg font-bold text-slate-900 tracking-tight">Unlock 5,000 Free Monthly Requests</h3>
        <p class="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
          Enter your work email to receive your personal API key and continue testing in the web playground.
        </p>
      </div>

      <form id="lead-form" onsubmit="handleLeadSubmit(event)" class="space-y-3">
        <div>
          <input type="email" id="lead-email-input" required placeholder="you@company.com" class="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#f0523d] text-slate-800 placeholder-slate-400">
        </div>
        <button type="submit" id="btn-submit-lead" class="w-full py-2.5 rounded-xl bg-[#f0523d] hover:bg-[#e0422d] text-white text-xs font-semibold shadow-xs transition cursor-pointer">
          Claim My Free API Key →
        </button>
      </form>

      <div class="relative flex items-center justify-center">
        <div class="border-t border-gray-200 w-full"></div>
        <span class="bg-white px-2 text-[11px] text-slate-400 uppercase tracking-wider">or</span>
      </div>

      <div>
        <a href="/" class="w-full py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-slate-800 text-xs font-medium transition flex items-center justify-center gap-2">
          <i data-lucide="log-in" class="w-4 h-4 text-slate-500"></i>
          <span>Continue with Google / Account</span>
        </a>
      </div>

      <p class="text-[10px] text-slate-400">
        No credit card required. Free tier includes 5,000 requests/month on Mistral models.
      </p>

    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- FOOTER                                                                    -->
  <!-- ========================================================================= -->
  <footer class="bg-white border-t border-gray-200 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
      <div class="flex items-center gap-2 group">
        <svg viewBox="82 47 96 211" class="logo-keyhole h-5 w-auto shrink-0 cursor-pointer" fill="#09090b">
          <path d="M 103.5 135 A 48 48 0 1 1 156.5 135 L 178 248 Q 178 258 168 258 L 92 258 Q 82 258 82 248 Z" />
        </svg>
        <span class="font-mono font-bold text-slate-900">projectspg</span>
        <span>• Enterprise AI Privacy Layer</span>
      </div>
      <div class="flex items-center gap-6">
        <a href="/" class="hover:text-slate-800">Playground</a>
        <a href="/#docs" class="hover:text-slate-800">API Documentation</a>
        <a href="/blog/countries" class="hover:text-slate-800">Compliance & Jurisdictions</a>
        <a href="https://github.com/PriyanujBoruah/projectspg" target="_blank" class="hover:text-slate-800">GitHub</a>
      </div>
    </div>
  </footer>

  <!-- ========================================================================= -->
  <!-- CLIENT LOGIC & DEMO RUNNER                                                -->
  <!-- ========================================================================= -->
  <script>
    const DEMO_PRESETS = {
      healthcare: "Patient Eleanor Vance (SSN: 902-48-1229, DOB: 04/18/1972) admitted to St. Jude ICU. Prescribed 50mg Metoprolol. Contact doctor at dr.marcus@hospital.org. Provide a brief care summary.",
      fintech: "Authorize transaction of $4,850.00 for cardholder David Chen (Card: 4532-8901-2345-6789, Exp: 09/28, CVV: 842). Billing zip: 94103. Confirm transaction status and risk rating.",
      hr: "Verify employee record: Alice Walker (Email: alice.walker@megacorp.io, Phone: +1-415-555-0199, Tax ID: 82-9102834). Salary grade: L6 Senior Engineer. Summarize profile and onboarding status.",
      devops: "Deployment script failure: AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY for user admin@production.internal. Provide quick remediation advice."
    };

    const PRESET_KEYS = ['healthcare', 'fintech', 'hr', 'devops'];
    let currentPresetIdx = 0;
    let demoRunCount = 0;

    // --- Markdown Parser Helper ---
    function renderMarkdown(content) {
      if (!content) return '';
      try {
        if (window.marked) {
          if (typeof window.marked.parse === 'function') return window.marked.parse(content);
          if (typeof window.marked === 'function') return window.marked(content);
        }
      } catch (e) {
        console.warn('marked parse error:', e);
      }

      // Safe string-based fallback parser (no template string escape conflicts)
      let escaped = String(content)
        .split('&').join('&amp;')
        .split('<').join('&lt;')
        .split('>').join('&gt;');

      // Handle bold **text**
      let boldParts = escaped.split('**');
      if (boldParts.length > 1) {
        escaped = boldParts.map((part, i) => (i % 2 === 1 ? ('<strong>' + part + '</strong>') : part)).join('');
      }

      let lines = escaped.split(/\\r?\\n/);
      let inList = false;
      let result = [];

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();

        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          if (!inList) {
            result.push('<ul>');
            inList = true;
          }
          result.push('<li>' + trimmed.slice(2) + '</li>');
        } else {
          if (inList) {
            result.push('</ul>');
            inList = false;
          }
          if (trimmed.startsWith('### ')) {
            result.push('<h3>' + trimmed.slice(4) + '</h3>');
          } else if (trimmed.startsWith('## ')) {
            result.push('<h2>' + trimmed.slice(3) + '</h2>');
          } else if (trimmed.startsWith('# ')) {
            result.push('<h1>' + trimmed.slice(2) + '</h1>');
          } else if (trimmed.length > 0) {
            result.push('<p>' + line + '</p>');
          }
        }
      }
      if (inList) result.push('</ul>');
      return result.join('');
    }

    // --- Dropdown Menu Logic (v0-style) ---
    function toggleModelDropdown(event) {
      if (event) event.stopPropagation();
      const menu = document.getElementById('model-dropdown-menu');
      const chevron = document.getElementById('model-dropdown-chevron');
      if (!menu) return;

      const isHidden = menu.classList.contains('hidden');
      if (isHidden) {
        menu.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
        const searchInput = document.getElementById('model-search-input');
        if (searchInput) {
          searchInput.value = '';
          filterModelDropdown('');
          setTimeout(() => searchInput.focus(), 50);
        }
      } else {
        closeModelDropdown();
      }
    }

    function closeModelDropdown() {
      const menu = document.getElementById('model-dropdown-menu');
      const chevron = document.getElementById('model-dropdown-chevron');
      if (menu) menu.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-180');
    }

    function selectDemoModel(modelName, modelId) {
      const nameEl = document.getElementById('selected-model-name');
      const valueEl = document.getElementById('demo-model-value');
      if (nameEl) nameEl.textContent = modelName;
      if (valueEl) valueEl.value = modelId;

      // Update checkmarks
      const options = document.querySelectorAll('.model-option');
      options.forEach(opt => {
        const checkIcon = opt.querySelector('.model-check-icon');
        if (opt.getAttribute('data-model-id') === modelId) {
          if (checkIcon) checkIcon.classList.remove('hidden');
        } else {
          if (checkIcon) checkIcon.classList.add('hidden');
        }
      });

      closeModelDropdown();
    }

    function filterModelDropdown(query) {
      const q = (query || '').toLowerCase().trim();
      const options = document.querySelectorAll('.model-option');
      let visibleCount = 0;

      options.forEach(opt => {
        const text = (opt.textContent || '').toLowerCase();
        if (!q || text.includes(q)) {
          opt.classList.remove('hidden');
          visibleCount++;
        } else {
          opt.classList.add('hidden');
        }
      });

      const noResults = document.getElementById('model-no-results');
      if (noResults) {
        if (visibleCount === 0) noResults.classList.remove('hidden');
        else noResults.classList.add('hidden');
      }
    }

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      const container = document.getElementById('model-dropdown-container');
      if (container && !container.contains(e.target)) {
        closeModelDropdown();
      }
    });

    // --- Preset & Prompt Management ---
    function setDemoPreset(key) {
      currentPresetIdx = Math.max(0, PRESET_KEYS.indexOf(key));
      const promptEl = document.getElementById('demo-prompt-input');
      if (promptEl) {
        promptEl.value = DEMO_PRESETS[key] || DEMO_PRESETS.healthcare;
        promptEl.focus();
      }
    }

    function cycleDemoPreset() {
      currentPresetIdx = (currentPresetIdx + 1) % PRESET_KEYS.length;
      setDemoPreset(PRESET_KEYS[currentPresetIdx]);
    }

    function clearDemoPrompt() {
      const p = document.getElementById('demo-prompt-input');
      if (p) {
        p.value = '';
        p.focus();
      }
    }

    // --- Hero Demo Execution ---
    async function runHeroDemo() {
      demoRunCount++;
      
      // If user has already run the demo once, show the email capture gate!
      if (demoRunCount > 1 && !localStorage.getItem('spg_lead_email')) {
        openLeadModal();
        return;
      }

      const promptInput = document.getElementById('demo-prompt-input');
      const text = promptInput ? promptInput.value.trim() : '';
      if (!text) return;

      const modelValEl = document.getElementById('demo-model-value');
      const modelNameEl = document.getElementById('selected-model-name');
      const selectedModel = modelValEl ? modelValEl.value : 'ministral-8b-2512';
      const selectedModelName = modelNameEl ? modelNameEl.textContent : 'SPG Pro';

      const btn = document.getElementById('btn-run-demo');
      const origBtnHtml = btn ? btn.innerHTML : '';
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin text-white"></i>';
        if (window.lucide) lucide.createIcons();
      }

      const startTime = performance.now();

      try {
        const res = await fetch('/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer spg_free'
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              {
                role: 'system',
                content: 'You are an enterprise AI assistant. Provide a direct, professional, and concise response under 120 words. Avoid excessive boilerplate.'
              },
              {
                role: 'user',
                content: text
              }
            ],
            max_tokens: 250
          })
        });

        const data = await res.json();
        const durationMs = Math.round(performance.now() - startTime);

        // Extract privacy metadata
        const privacy = data.privacy || {};
        const sanitizedPrompt = privacy.protected_prompt || text;
        const entitiesCount = privacy.entities_count !== undefined ? privacy.entities_count : 2;
        const reply = data.choices && data.choices[0] && data.choices[0].message
          ? data.choices[0].message.content
          : (data.error ? ('Error: ' + (data.error.message || JSON.stringify(data.error))) : 'Processing complete.');

        // Update results display
        const resultsEl = document.getElementById('demo-results-container');
        if (resultsEl) resultsEl.classList.remove('hidden');

        const sanitizedEl = document.getElementById('demo-sanitized-output');
        if (sanitizedEl) sanitizedEl.textContent = sanitizedPrompt;

        const rehydratedEl = document.getElementById('demo-rehydrated-output');
        if (rehydratedEl) rehydratedEl.innerHTML = renderMarkdown(reply);

        const latencyEl = document.getElementById('demo-metric-latency');
        if (latencyEl) latencyEl.textContent = durationMs + ' ms';

        const entitiesEl = document.getElementById('demo-metric-entities');
        if (entitiesEl) entitiesEl.textContent = entitiesCount;

        const modelMetricEl = document.getElementById('demo-metric-model');
        if (modelMetricEl) modelMetricEl.textContent = selectedModelName + ' (' + selectedModel + ')';

        if (window.lucide) lucide.createIcons();

      } catch (err) {
        console.error('Hero demo error:', err);
        alert('Demo request encountered an error. Please try again.');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = origBtnHtml;
          if (window.lucide) lucide.createIcons();
        }
      }
    }

    function handleSecondTestTrigger() {
      if (!localStorage.getItem('spg_lead_email')) {
        openLeadModal();
      } else {
        window.location.href = '/';
      }
    }

    function openLeadModal() {
      const modal = document.getElementById('modal-lead-gate');
      if (modal) modal.classList.remove('hidden');
    }

    function closeLeadModal() {
      const modal = document.getElementById('modal-lead-gate');
      if (modal) modal.classList.add('hidden');
    }

    async function handleLeadSubmit(e) {
      e.preventDefault();
      const input = document.getElementById('lead-email-input');
      const email = input ? input.value.trim() : '';
      if (!email) return;

      const submitBtn = document.getElementById('btn-submit-lead');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Unlocking 5,000 Requests...';
      }

      try {
        // Send email to leads tracking endpoint
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'home_hero_demo' })
        });
      } catch (e) {
        // Continue even if offline
      }

      localStorage.setItem('spg_lead_email', email);
      closeLeadModal();

      // Redirect immediately to full playground console
      window.location.href = '/';
    }


    async function handleBottomUpgradeSubmit(e) {
      e.preventDefault();
      const input = document.getElementById('bottom-upgrade-email');
      const email = input ? input.value.trim() : '';
      if (!email) return;

      const submitBtn = document.getElementById('btn-bottom-upgrade');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Activating...</span>';
      }

      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'home_bottom_100k_upgrade' })
        });
      } catch (err) {
        console.warn('Lead submit offline:', err);
      }

      localStorage.setItem('spg_lead_email', email);
      localStorage.setItem('spg_tier', '100k');

      const form = document.getElementById('bottom-upgrade-form');
      const successBox = document.getElementById('bottom-upgrade-success');
      if (form) form.classList.add('hidden');
      if (successBox) {
        successBox.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      if (window.lucide) lucide.createIcons();
    });
  </script>

</body>
</html>
`;
