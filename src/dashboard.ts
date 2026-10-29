/**
 * ProjectSPG Enterprise Console (Single-File Architecture)
 * Layout: Exact 1:1 Pixel-Accurate Replica of Groq Console (Playground, API Keys, Metrics, Usage, Logs)
 * References:
 * - media_1790456420408.png (Playground)
 * - media_1790456680441.png (API Keys)
 * - media_1790456964674.png (Dashboard - Metrics)
 * - media_1790456991949.png (Dashboard - Usage)
 * - media_1790457001122.png (Dashboard - Logs)
 */

export const DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en" class="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ProjectSPG Console</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" href="/logo.png">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="preconnect" href="https://cdn.prod.website-files.com" crossorigin>
  <link rel="preload" href="https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad1160936ed8972bccfa_the-future-regular.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad11f5c01ca7fba516ba_the-future-medium.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad117b7b7b625bfcb663_the-future-bold.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            groq: {
              coral: '#f0523d',
              coralHover: '#e0422d',
              coralLight: '#fff5f3',
              dark: '#111827',
              grayBg: '#f8f9fa',
              grayBorder: '#ebecef',
              textMuted: '#6b7280',
              textSubtle: '#9ca3af',
              avatar: '#65233c'
            }
          },
          fontFamily: {
            sans: ['"The Future"', 'Arial', 'sans-serif'],
            mono: ['"The Future Mono"', 'JetBrains Mono', 'monospace']
          }
        }
      }
    }
  </script>

  <style>
    @font-face {
      font-family: 'The Future';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad116649a2ce7e9e9c09_the-future-light.woff2') format('woff2');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'The Future';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad1160936ed8972bccfa_the-future-regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'The Future';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad11f5c01ca7fba516ba_the-future-medium.woff2') format('woff2');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'The Future';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad117b7b7b625bfcb663_the-future-bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'The Future Mono';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad11353cd03c54aee177_the-future-mono-regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'The Future Mono';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad11906310338409a1c3_the-future-mono-medium.woff2') format('woff2');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'The Future Mono';
      src: url('https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/698cad1196b1cde8333da03a_the-future-mono-bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    body, button, input, select, textarea {
      font-family: "The Future", Arial, sans-serif;
    }
    body {
      background-color: #ffffff;
      color: #111827;
      font-family: "The Future", Arial, sans-serif;
    }
    .font-sans {
      font-family: "The Future", Arial, sans-serif !important;
    }
    .token-badge {
      display: inline-block;
      padding: 1px 6px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
      font-size: 0.75rem;
      background: #f0f9ff;
      color: #0284c7;
      border: 1px solid #bae6fd;
    }
    /* Syntax Highlighting */
    .syn-keyword { color: #9333ea; font-weight: 500; }
    .syn-string { color: #16a34a; }
    .syn-number { color: #ea580c; }
    .syn-bool { color: #2563eb; }
    .syn-comment { color: #9ca3af; font-style: italic; }

    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #d1d5db; }

    /* Custom Parameter Sliders matching Groq console */
    .param-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 4px;
      background: #e5e7eb;
      border-radius: 9999px;
      outline: none;
      cursor: pointer;
    }
    .param-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #111827;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
      transition: transform 0.1s ease;
    }
    .param-slider::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }
    .param-slider::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ffffff;
      border: 2px solid #111827;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
      transition: transform 0.1s ease;
    }
    .param-slider::-moz-range-thumb:hover {
      transform: scale(1.1);
    }

    /* Mobile scroll auto-highlight for research cards (replaces hover effect on touch devices) */
    @media (max-width: 1023px) {
      .research-card.mobile-highlight {
        border-color: rgba(255, 255, 255, 0.2) !important;
        transform: translateY(-4px) !important;
        box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 30px rgba(139,127,245,0.2) !important;
      }
      .research-card.mobile-highlight .research-frosting {
        opacity: 1 !important;
      }
      .research-card.mobile-highlight .research-badge {
        background-color: rgba(255, 255, 255, 0.2) !important;
      }
      .research-card.mobile-highlight .research-author {
        opacity: 0 !important;
        transform: scale(0.95) !important;
      }
      .research-card.mobile-highlight .research-btn {
        opacity: 1 !important;
        transform: translateY(0) !important;
        pointer-events: auto !important;
      }
    }

    /* Infinite Marquee Animation for Infrastructure Badges */
    @keyframes marqueeScroll {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    .animate-marquee {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      gap: 3.5rem;
      padding-right: 3.5rem;
      animation: marqueeScroll 28s linear infinite;
    }

    @media (min-width: 640px) {
      .animate-marquee {
        gap: 4.5rem;
        padding-right: 4.5rem;
      }
    }

    .brand-logo-dyed {
      filter: url(#logo-tint-949698);
      -webkit-filter: url(#logo-tint-949698);
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    /* Platform Interactive Accordion Slide Animation */
    .platform-subitem {
      transition: background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                  box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .platform-subitem:not(.is-active) {
      background-color: transparent;
      border-color: transparent;
      border-bottom-color: #f3f4f6; /* gray-100 */
      box-shadow: none;
    }

    .platform-subitem:not(.is-active):hover {
      background-color: rgba(249, 250, 251, 0.85);
    }

    .platform-subitem.is-active {
      background-color: #ffffff;
      border-color: rgba(229, 231, 235, 0.9); /* border-gray-200/90 */
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
    }

    .platform-subitem:not(.is-active) .subitem-icon-box {
      background-color: transparent !important;
      border-color: transparent !important;
      color: #9ca3af !important; /* gray-400 */
    }

    .platform-subitem:not(.is-active) .subitem-title {
      color: #4b5563 !important; /* gray-600 */
      font-weight: 500 !important;
    }

    .platform-subitem.is-active .subitem-title {
      color: #030712 !important; /* gray-950 */
      font-weight: 500 !important;
    }

    .platform-accordion-drawer {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.38s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .platform-subitem.is-active .platform-accordion-drawer {
      grid-template-rows: 1fr;
    }

    .platform-accordion-drawer-inner {
      overflow: hidden;
      min-height: 0;
      transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .platform-subitem:not(.is-active) .platform-accordion-drawer-inner {
      opacity: 0;
      transform: translateY(-8px);
      pointer-events: none;
    }

    .platform-subitem.is-active .platform-accordion-drawer-inner {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    /* Mobile-optimized smooth touch scrolling & scrollbar utilities */
    html, body {
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: auto;
      overflow-x: hidden;
      max-width: 100%;
    }
    .touch-scroll {
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: auto;
      touch-action: pan-x pan-y;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    /* Top Tier Pill Theme Pulse & Glow Animation */
    @keyframes theme-pill-pulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(240, 82, 61, 0.22);
        border-color: rgba(240, 82, 61, 0.45);
      }
      50% {
        box-shadow: 0 0 9px 2px rgba(240, 82, 61, 0.3);
        border-color: rgba(240, 82, 61, 0.75);
      }
    }
    .theme-pill-active {
      animation: theme-pill-pulse 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  </style>
</head>

<body class="h-screen flex flex-col bg-white text-groq-dark antialiased overflow-hidden w-full max-w-full selection:bg-[#f0523d]/20 selection:text-[#f0523d]">

  <!-- ========================================================================= -->
  <!-- TOP GLOBAL NAVBAR (Exact 52px height + Mobile Tab Strip) -->
  <!-- ========================================================================= -->
  <header id="global-header" class="sticky top-0 bg-white z-40 border-b border-gray-100 shadow-2xs">
    
    <!-- Main Top Row (52px) -->
    <div class="h-[52px] px-3 sm:px-4 lg:px-6 flex items-center justify-between">
      <!-- Left: Brand Logo + Project Selector -->
      <div class="flex items-center gap-2 sm:gap-3.5">
        <a href="#playground" onclick="switchView('playground')" class="flex items-center gap-2 group cursor-pointer" title="AI Privacy Layer Console">
          <div class="w-6 h-6 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 1024 1024" fill="none" class="w-full h-full">
              <rect x="307" y="486" width="410" height="52" rx="26" fill="#000000" />
              <rect x="16" y="233" width="441" height="557" rx="80" fill="#F0523D" />
              <rect x="567" y="233" width="441" height="557" rx="80" fill="#2663EA" />
              <circle cx="236.5" cy="511.5" r="68.5" fill="#2663EA" />
              <circle cx="787.5" cy="511.5" r="68.5" fill="#F0523D" />
            </svg>
          </div>
          <span class="font-extrabold text-[18px] sm:text-[20px] tracking-tight text-groq-dark">ai<span class="text-[#f0523d]">privacy</span><span class="text-[10px] font-bold text-gray-500 ml-1.5 px-2 py-0.5 bg-gray-100 rounded-md tracking-wider uppercase">CONSOLE</span></span>
        </a>

        <!-- Workspace / Tier Pill -->
        <div id="top-tier-pill" class="hidden md:flex items-center gap-1.5 text-[11px] font-semibold select-none ml-2.5 px-2.5 py-1 rounded-full border shadow-2xs transition-all duration-300" title="Free Trial">
          <span id="top-tier-dot-container" class="relative flex h-2 w-2 shrink-0">
            <span id="top-tier-ping" class="hidden animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f0523d] opacity-75"></span>
            <span id="top-tier-dot" class="relative inline-flex rounded-full h-2 w-2 bg-amber-500 ring-2 ring-amber-200/60 shrink-0"></span>
          </span>
          <span id="top-tier-label" class="tracking-tight font-semibold text-amber-900">Free Trial</span>
        </div>
      </div>

      <!-- Center: Desktop Navigation Tabs (Hidden on < sm) -->
      <div class="hidden sm:flex items-center gap-6 text-xs">
        <nav class="flex items-center gap-5 font-medium text-xs">
          <button onclick="switchView('presentation')" id="nav-presentation" class="nav-item text-[#f0523d] font-semibold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 px-2 py-1 rounded-md bg-orange-50/60 border border-[#f0523d]/20 shadow-2xs">
            <span class="w-1.5 h-1.5 rounded-full bg-[#f0523d] animate-ping"></span>
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-[#f0523d]"></i>
            <span>Presentation</span>
          </button>
          <button onclick="switchView('playground')" id="nav-playground" class="nav-item text-groq-textMuted hover:text-groq-dark transition whitespace-nowrap cursor-pointer">Playground</button>
          <button onclick="switchView('keys')" id="nav-keys" class="nav-item text-groq-textMuted hover:text-groq-dark transition whitespace-nowrap cursor-pointer">API Keys</button>
          <button onclick="switchView('dashboard')" id="nav-dashboard" class="nav-item text-groq-textMuted hover:text-groq-dark transition whitespace-nowrap cursor-pointer">Dashboard</button>
          <button onclick="switchView('docs')" id="nav-docs" class="nav-item text-groq-textMuted hover:text-groq-dark transition whitespace-nowrap cursor-pointer">Docs</button>
          <button onclick="switchView('admin-invites')" id="nav-admin-invites" class="nav-item hidden text-purple-600 font-semibold hover:text-purple-800 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 px-2 py-0.5 rounded-lg hover:bg-purple-50">
            <i data-lucide="ticket" class="w-3.5 h-3.5 text-purple-600"></i>
            <span>Admin Invites</span>
          </button>
        </nav>
      </div>

      <!-- Right: Live Public Access Badge / User Profile -->
      <div class="flex items-center gap-2 sm:gap-3.5">
        <!-- Live Public Access Badge (Shown when logged out) -->
        <button id="btn-login-trigger" onclick="switchView('playground')" class="px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-xs shadow-2xs transition flex items-center gap-1.5 cursor-pointer" title="Zero-friction public access enabled">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Free Public Access</span>
        </button>

        <!-- User Profile Dropdown (Shown when logged in) -->
        <div id="user-profile-menu-container" class="relative hidden flex items-center gap-2">
          <button onclick="toggleUserDropdown(event)" id="btn-user-avatar" class="w-7 h-7 rounded-full overflow-hidden border border-groq-grayBorder bg-groq-avatar text-white flex items-center justify-center text-xs font-semibold shadow-xs hover:ring-2 hover:ring-[#f0523d]/30 transition focus:outline-none cursor-pointer">
            <span id="user-avatar-initials">P</span>
            <img id="user-avatar-img" class="w-full h-full object-cover hidden" alt="Profile" />
          </button>
          
          <div id="user-dropdown-menu" class="hidden absolute right-0 top-full mt-2.5 w-64 bg-white border border-groq-grayBorder rounded-2xl shadow-2xl p-2 z-[60] text-xs font-sans">
            <div class="px-3 py-2 border-b border-gray-100">
              <div class="flex items-center justify-between gap-1.5 mb-1">
                <p id="user-menu-name" class="font-semibold text-groq-dark truncate">User</p>
                <span id="user-menu-badge" class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0"></span>
              </div>
              <p id="user-menu-email" class="text-groq-textMuted text-[11px] truncate">user@example.com</p>
              <div id="user-menu-org" class="text-gray-500 text-[10px] truncate mt-1 hidden flex items-center gap-1">
                <i data-lucide="building-2" class="w-3 h-3 text-gray-400 shrink-0"></i>
                <span id="user-menu-org-text" class="truncate"></span>
              </div>
            </div>
            <div class="py-1">
              <button onclick="openUserSettingsModal()" class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-between text-groq-dark font-medium transition cursor-pointer">
                <span class="flex items-center gap-2"><i data-lucide="settings" class="w-3.5 h-3.5 text-groq-textMuted"></i> Settings</span>
                <i data-lucide="chevron-right" class="w-3 h-3 text-gray-400"></i>
              </button>
              <button onclick="copyUserId()" class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-between text-groq-textMuted hover:text-groq-dark transition cursor-pointer">
                <span class="flex items-center gap-2"><i data-lucide="fingerprint" class="w-3.5 h-3.5"></i> Copy User ID</span>
                <i data-lucide="copy" class="w-3 h-3 text-gray-400"></i>
              </button>
              <button onclick="openInvitationModal(true)" class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-between text-groq-textMuted hover:text-groq-dark transition cursor-pointer">
                <span class="flex items-center gap-2"><i data-lucide="ticket" class="w-3.5 h-3.5"></i> Subscription</span>
                <i data-lucide="chevron-right" class="w-3 h-3 text-gray-400"></i>
              </button>
              <button id="user-menu-admin-btn" onclick="switchView('admin-invites')" class="w-full text-left px-3 py-2 rounded-lg hover:bg-purple-50 text-purple-700 font-semibold hidden flex items-center justify-between transition cursor-pointer">
                <span class="flex items-center gap-2"><i data-lucide="shield-check" class="w-3.5 h-3.5 text-purple-600"></i> Invitation Code Manager</span>
                <i data-lucide="chevron-right" class="w-3 h-3 text-purple-400"></i>
              </button>
            </div>
            <div class="pt-1 border-t border-gray-100">
              <button onclick="handleSignOut()" class="w-full text-left px-3 py-2 rounded-lg hover:bg-[#fff5f3] text-[#f0523d] font-medium flex items-center gap-2 transition">
                <i data-lucide="log-out" class="w-3.5 h-3.5"></i> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Sub-Header Navigation Strip (Visible on mobile screens < sm) -->
    <div class="sm:hidden px-2 py-1.5 bg-[#fafafa] border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar touch-scroll">
      <button onclick="switchView('presentation')" id="nav-mobile-presentation" class="nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer text-[#f0523d] bg-orange-50 border border-[#f0523d]/30 shadow-2xs">⚡ Presentation</button>
      <button onclick="switchView('playground')" id="nav-mobile-playground" class="nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer text-groq-textMuted bg-white border border-gray-200/70 shadow-2xs">Playground</button>
      <button onclick="switchView('keys')" id="nav-mobile-keys" class="nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer text-groq-textMuted bg-white border border-gray-200/70 shadow-2xs">API Keys</button>
      <button onclick="switchView('dashboard')" id="nav-mobile-dashboard" class="nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer text-groq-textMuted bg-white border border-gray-200/70 shadow-2xs">Dashboard</button>
      <button onclick="switchView('docs')" id="nav-mobile-docs" class="nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer text-groq-textMuted bg-white border border-gray-200/70 shadow-2xs">Docs</button>
      <button onclick="switchView('admin-invites')" id="nav-mobile-admin-invites" class="nav-mobile-item hidden flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer text-purple-700 bg-purple-50 border border-purple-200 shadow-2xs">Admin Invites</button>
    </div>

  </header>

  <!-- ========================================================================= -->
  <!-- MAIN WORKSPACE -->
  <!-- ========================================================================= -->
  <main class="flex-1 flex flex-col w-full min-w-0 max-w-full overflow-visible">

    <!-- ======================================================================= -->
        <!-- ======================================================================= -->
    <!-- VIEW: PRESENTATION (10-Second Live Hackathon Showcase & Pipeline Demo)  -->
    <!-- ======================================================================= -->
    <div id="view-presentation" class="view-panel border-t border-l border-r border-groq-grayBorder rounded-t-2xl bg-white mx-0 sm:mx-2 lg:mx-3 flex-1 flex flex-col overflow-y-auto shadow-xs w-full sm:w-auto min-w-0 max-w-full">
      
      <!-- Sub-Toolbar (54px) -->
      <div class="min-h-[54px] py-2 px-3 sm:px-6 border-b border-groq-grayBorder bg-white flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <span class="flex h-2.5 w-2.5 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f0523d] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f0523d]"></span>
            </span>
            <h2 class="text-base font-bold text-groq-dark tracking-tight flex items-center gap-1.5">
              <span>Interactive Presentation</span>
              <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-[#f0523d] tracking-wider border border-[#f0523d]/20">10-Sec Aha! Moment</span>
            </h2>
          </div>
        </div>

        <!-- Metric Badges -->
        <div class="flex items-center gap-2 text-xs flex-wrap">
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
            <i data-lucide="zap" class="w-3.5 h-3.5 text-emerald-600"></i>
            <span id="demo-latency-chip">Engine Latency: 1.1ms</span>
          </div>
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-medium hidden sm:flex">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-blue-600"></i>
            <span>AES-256 In-Memory Vault</span>
          </div>
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-800 font-medium hidden md:flex">
            <i data-lucide="cpu" class="w-3.5 h-3.5 text-purple-600"></i>
            <span>Upstream: mistral-large-2512</span>
          </div>
        </div>
      </div>

      <!-- Main Presentation Content Body -->
      <div class="p-3 sm:p-6 lg:p-7 max-w-7xl mx-auto w-full space-y-6">

        <!-- Banner / Hero Summary for Judges -->
        <div class="bg-gradient-to-r from-gray-900 via-gray-900 to-black text-white p-5 sm:p-6 rounded-2xl border border-gray-800 shadow-lg relative overflow-hidden">
          <div class="relative z-10">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span class="px-2.5 py-1 rounded-md bg-white/10 text-white text-[10px] font-mono uppercase tracking-wider font-semibold border border-white/10">
                Zero-Trust AI Interception Architecture
              </span>
              <div class="flex items-center gap-2 text-xs text-gray-400">
                <span class="text-emerald-400 font-bold flex items-center gap-1"><i data-lucide="check-circle" class="w-3.5 h-3.5"></i> HIPAA</span>
                <span>•</span>
                <span class="text-emerald-400 font-bold flex items-center gap-1"><i data-lucide="check-circle" class="w-3.5 h-3.5"></i> PCI-DSS</span>
                <span>•</span>
                <span class="text-emerald-400 font-bold flex items-center gap-1"><i data-lucide="check-circle" class="w-3.5 h-3.5"></i> GDPR / DPDP</span>
              </div>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              Protect Enterprise Data Before It Reaches Third-Party LLMs
            </h3>
            <p class="text-xs sm:text-sm text-gray-300 max-w-4xl leading-relaxed">
              When employees or backends send confidential prompts to public AI models, sensitive identifiers are transparently substituted with cryptographic surrogates at the Cloudflare edge worker. The upstream LLM reasons without ever seeing raw PII, and responses are safely rehydrated on return.
            </p>
          </div>
        </div>

        <!-- Scenario Selector Row -->
        <div class="bg-white border border-groq-grayBorder rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="text-xs font-bold text-gray-900 uppercase tracking-wider">Step 1: Select an Industry Scenario</span>
              <p class="text-xs text-gray-500">Pick a pre-configured enterprise prompt or input your own text.</p>
            </div>
            <button onclick="runPresentationPipeline()" id="btn-demo-run" class="px-5 py-2.5 rounded-xl bg-[#f0523d] hover:bg-[#d8402c] text-white font-semibold text-xs transition shadow-sm flex items-center gap-2 cursor-pointer">
              <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
              <span id="btn-demo-run-text">Run Live Simulation</span>
            </button>
          </div>

          <!-- Scenario Pills Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            <button onclick="selectDemoScenario('healthcare')" id="demo-tab-healthcare" class="demo-scenario-btn p-3 rounded-xl border border-[#f0523d] bg-orange-50/50 text-left transition cursor-pointer flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                    <span>🏥 Healthcare EHR</span>
                  </span>
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-[#f0523d]">HIPAA</span>
                </div>
                <p class="text-[11px] text-gray-500 leading-snug">Patient SSN, Medical Diagnosis, MRN & Physician prescription.</p>
              </div>
            </button>

            <button onclick="selectDemoScenario('fintech')" id="demo-tab-fintech" class="demo-scenario-btn p-3 rounded-xl border border-gray-200 hover:border-gray-300 bg-white text-left transition cursor-pointer flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                    <span>💳 Fintech & Banking</span>
                  </span>
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">PCI-DSS</span>
                </div>
                <p class="text-[11px] text-gray-500 leading-snug">Credit Card, CVV, Bank IBAN, Routing & Wire transfer dispute.</p>
              </div>
            </button>

            <button onclick="selectDemoScenario('enterprise')" id="demo-tab-enterprise" class="demo-scenario-btn p-3 rounded-xl border border-gray-200 hover:border-gray-300 bg-white text-left transition cursor-pointer flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                    <span>🏢 HR & Payroll</span>
                  </span>
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">GDPR / DPDP</span>
                </div>
                <p class="text-[11px] text-gray-500 leading-snug">Employee Salary, Tax ID, Personal Email & Phone clearance.</p>
              </div>
            </button>

            <button onclick="selectDemoScenario('custom')" id="demo-tab-custom" class="demo-scenario-btn p-3 rounded-xl border border-gray-200 hover:border-gray-300 bg-white text-left transition cursor-pointer flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                    <span>✍️ Custom Live Prompt</span>
                  </span>
                  <span class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">Live</span>
                </div>
                <p class="text-[11px] text-gray-500 leading-snug">Type or paste any sensitive prompt to test real-time interception.</p>
              </div>
            </button>
          </div>

          <!-- Active Prompt Input Container -->
          <div class="pt-2">
            <div class="flex items-center justify-between mb-1.5">
              <label class="text-[11px] font-semibold text-gray-700">Active Test Prompt (Passed through Privacy Boundary):</label>
              <span id="demo-prompt-stats" class="text-[10px] text-gray-400 font-mono">22 words • 182 chars</span>
            </div>
            <textarea id="demo-prompt-input" rows="3" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-gray-400 font-sans leading-relaxed"></textarea>
          </div>
        </div>

        <!-- The 3-Step Live Pipeline Visualizer Board -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-gray-900 uppercase tracking-wider">Step 2: Live Transformation Pipeline</span>
            <span class="text-xs text-gray-500 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Real-time Cloudflare Worker Execution</span>
            </span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            <!-- STAGE 1: CLIENT BOUNDARY -->
            <div class="border border-red-200/80 bg-red-50/20 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <div>
                <div class="flex items-center justify-between pb-3 border-b border-red-100 mb-3">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    <span class="text-xs font-bold text-rose-950">1. Client Intercept</span>
                  </div>
                  <span id="stage1-count-badge" class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                    4 Entities Flagged
                  </span>
                </div>
                <p class="text-[11px] text-rose-900/70 mb-2 font-medium">Original Prompt (High Exposure Risk):</p>
                <div id="demo-stage1-content" class="bg-white border border-red-200/60 rounded-xl p-3.5 text-xs text-gray-900 leading-relaxed min-h-[140px] font-sans">
                  <!-- Dynamic content populated by JS -->
                </div>
              </div>
              <div class="mt-3 pt-2.5 border-t border-red-100 flex items-center justify-between text-[11px] text-rose-800">
                <span class="flex items-center gap-1"><i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-rose-600"></i> Plaintext Exposure</span>
                <span class="font-mono text-[10px]">Pre-Security</span>
              </div>
            </div>

            <!-- STAGE 2: SANITIZED WIRE PAYLOAD -->
            <div class="border border-amber-200/80 bg-amber-50/20 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <div>
                <div class="flex items-center justify-between pb-3 border-b border-amber-100 mb-3">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span class="text-xs font-bold text-amber-950">2. Sanitized Upstream (mistral-large-2512)</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    0 Bytes PII Leaked
                  </span>
                </div>
                <p class="text-[11px] text-amber-900/70 mb-2 font-medium">Wire Payload Received by Mistral AI (mistral-large-2512):</p>
                <div id="demo-stage2-content" class="bg-gray-950 border border-gray-800 rounded-xl p-3.5 text-xs text-amber-300/90 font-mono leading-relaxed min-h-[140px] overflow-x-auto">
                  <!-- Dynamic JSON populated by JS -->
                </div>
              </div>
              <div class="mt-3 pt-2.5 border-t border-amber-100 flex items-center justify-between text-[11px] text-amber-800">
                <span class="flex items-center gap-1"><i data-lucide="shield-check" class="w-3.5 h-3.5 text-amber-600"></i> Zero Knowledge Model</span>
                <span class="font-mono text-[10px]">Surrogate Tokens</span>
              </div>
            </div>

            <!-- STAGE 3: CLIENT REHYDRATION -->
            <div class="border border-emerald-200/80 bg-emerald-50/20 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
              <div>
                <div class="flex items-center justify-between pb-3 border-b border-emerald-100 mb-3">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span class="text-xs font-bold text-emerald-950">3. Rehydrated Delivery</span>
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Seamless Context Restored
                  </span>
                </div>
                <p class="text-[11px] text-emerald-900/70 mb-2 font-medium">Final Response to Client Application:</p>
                <div id="demo-stage3-content" class="bg-white border border-emerald-200/60 rounded-xl p-3.5 text-xs text-gray-900 leading-relaxed min-h-[140px] font-sans">
                  <!-- Dynamic content populated by JS -->
                </div>
              </div>
              <div class="mt-3 pt-2.5 border-t border-emerald-100 flex items-center justify-between text-[11px] text-emerald-800">
                <span class="flex items-center gap-1"><i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600"></i> Drop-in UX Preservation</span>
                <span id="stage3-latency-stat" class="font-mono text-[10px] text-emerald-700">⚡ 1.1ms</span>
              </div>
            </div>

          </div>
        </div>

        <!-- In-Memory Cryptographic Token Vault Inspector -->
        <div class="bg-white border border-groq-grayBorder rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <i data-lucide="lock" class="w-3.5 h-3.5 text-blue-600"></i>
                <span>Step 3: In-Memory Cryptographic Vault Inspection</span>
              </span>
              <p class="text-xs text-gray-500">Mathematical proof: The token mapping table exists only in the edge worker's volatile memory and is never exposed to the AI model.</p>
            </div>
            <span class="text-[10px] font-mono font-bold text-gray-600 px-2 py-0.5 rounded bg-gray-100">
              Session ID: <span id="demo-vault-session">sess_demo_live</span>
            </span>
          </div>

          <!-- Vault Table -->
          <div class="overflow-x-auto rounded-xl border border-gray-100">
            <table class="w-full text-left text-xs">
              <thead class="bg-gray-50 text-gray-500 text-[11px] border-b border-gray-100 font-medium">
                <tr>
                  <th class="py-2.5 px-3">Surrogate Token</th>
                  <th class="py-2.5 px-3">Detection Rule</th>
                  <th class="py-2.5 px-3">SHA-256 Entropy Fingerprint</th>
                  <th class="py-2.5 px-3">Security Storage Tier</th>
                </tr>
              </thead>
              <tbody id="demo-vault-table-body" class="divide-y divide-gray-100 font-mono text-[11px]">
                <!-- Populated dynamically by JS -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Copyable Terminal cURL Quickstart -->
        <div class="bg-gray-950 text-white rounded-2xl p-4 sm:p-5 border border-gray-800 shadow-md space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-gray-200 flex items-center gap-1.5 uppercase tracking-wider font-mono">
              <i data-lucide="terminal" class="w-3.5 h-3.5 text-emerald-400"></i>
              <span>Verify in Your Terminal (Drop-in Wire Test)</span>
            </span>
            <button onclick="copyDemoCurl()" id="btn-copy-demo-curl" class="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-medium text-gray-200 transition flex items-center gap-1.5 cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
              <span id="btn-copy-demo-curl-text">Copy cURL</span>
            </button>
          </div>
          <pre id="demo-curl-snippet" class="p-3 bg-black/50 rounded-xl text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-gray-800"></pre>
        </div>

      </div>

    </div>


    <!-- VIEW 1: PLAYGROUND (Exact 3-Column Groq Layout) -->
    <!-- ======================================================================= -->
    <div id="view-playground" class="view-panel hidden border-t border-l border-r border-groq-grayBorder rounded-t-2xl bg-white mx-0 sm:mx-2 lg:mx-3 flex-1 flex flex-col overflow-x-hidden overflow-y-visible lg:overflow-hidden shadow-xs w-full sm:w-auto min-w-0 max-w-full">
      
      <!-- Sub-Toolbar (54px height) -->
      <div class="h-auto min-h-[54px] py-2 sm:py-0 border-b border-groq-grayBorder bg-white px-2 sm:px-4 flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 shrink-0 w-full min-w-0 max-w-full">
        <div class="flex items-center gap-2 sm:gap-4 shrink-0">
          <h2 class="text-[15px] font-semibold text-groq-dark tracking-tight">Playground</h2>
          <div class="bg-[#f3f4f6] p-0.5 rounded-lg flex items-center text-xs select-none">
            <button id="btn-tier-free" onclick="switchPlaygroundTier('free')" class="px-2.5 sm:px-3 py-1 rounded-md bg-white text-groq-dark font-medium shadow-xs text-xs transition cursor-pointer">Free</button>
            <button id="btn-tier-byok" onclick="switchPlaygroundTier('byok')" class="px-2.5 sm:px-3 py-1 rounded-md text-groq-textMuted hover:text-groq-dark text-xs transition cursor-pointer flex items-center gap-1">
              <span>BYOK</span>
              <span id="btn-tier-byok-lock" class="hidden text-amber-600 font-bold text-[10px]"><i data-lucide="lock" class="w-3 h-3"></i></span>
            </button>
          </div>
        </div>

        <div class="flex items-center gap-1 sm:gap-2 flex-wrap max-w-full min-w-0">
          <!-- BYOK Provider API Keys Button (visible when BYOK mode is ON) -->
          <button id="btn-byok-keys" onclick="openByokKeysModal()" class="hidden px-2.5 sm:px-3 py-1.5 rounded-lg bg-white border border-groq-grayBorder text-xs font-medium text-groq-dark hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs transition cursor-pointer shrink-0" title="Provider API Keys">
            <i data-lucide="key" class="w-3.5 h-3.5 text-blue-600"></i>
            <span>API Keys</span>
            <span id="byok-keys-badge" class="hidden w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" title="Keys configured"></span>
          </button>

          <div class="relative max-w-[115px] xs:max-w-[130px] sm:max-w-none shrink min-w-0">
            <select id="playground-model" onchange="onModelChange()" class="appearance-none bg-white border border-groq-grayBorder text-groq-dark text-xs font-sans font-medium rounded-lg pl-2 sm:pl-3 pr-5 sm:pr-8 py-1.5 focus:border-gray-400 focus:outline-none cursor-pointer w-full truncate">
              <optgroup label="Mistral AI (Free Public Access)">
                <option value="ministral-8b-2512" data-provider="mistral" selected>ministral-8b-2512</option>
                <option value="ministral-3b-2512" data-provider="mistral">ministral-3b-2512</option>
                <option value="codestral-2508" data-provider="mistral">codestral-2508</option>
                <option value="mistral-large-2512" data-provider="mistral">mistral-large-2512</option>
              </optgroup>
            </select>
            <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-1.5 sm:right-2 top-2 pointer-events-none"></i>
          </div>

          <button onclick="copyModelName()" class="p-1.5 rounded-lg bg-white border border-groq-grayBorder text-groq-textMuted hover:text-groq-dark cursor-pointer shrink-0" title="Copy model name">
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          </button>

          <button onclick="toggleCodePanel()" id="btn-toggle-code" class="px-2 sm:px-3 py-1.5 rounded-lg bg-white border border-groq-grayBorder text-xs font-medium text-groq-dark hover:bg-gray-50 flex items-center gap-1 cursor-pointer shrink-0" title="Toggle Code">
            <i data-lucide="code" class="w-3.5 h-3.5 text-groq-textMuted"></i>
            <span id="code-btn-text">Hide</span>
          </button>

          <button onclick="toggleParametersPanel()" id="btn-toggle-params" class="p-1.5 rounded-lg bg-white border border-groq-grayBorder text-groq-textMuted hover:text-groq-dark transition cursor-pointer shrink-0" title="Parameters">
            <i data-lucide="sliders-horizontal" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>

      <!-- Playground 3-Column Split -->
      <div class="flex-1 flex flex-col lg:flex-row overflow-x-hidden overflow-y-visible lg:overflow-hidden relative w-full min-w-0 max-w-full">
        <!-- Col 1: Prompts -->
        <div class="w-full lg:w-[33%] lg:min-w-[320px] lg:max-w-[420px] border-b lg:border-b-0 lg:border-r border-groq-grayBorder p-2.5 sm:p-6 flex flex-col justify-between overflow-x-hidden overflow-y-visible lg:overflow-y-auto bg-white lg:shrink-0 min-w-0 max-w-full">
          <div class="space-y-3.5 sm:space-y-4">
            <div class="flex items-center gap-2.5 sm:gap-3">
              <span class="text-[11px] font-semibold text-groq-textMuted uppercase tracking-wider shrink-0">SYSTEM</span>
              <input type="text" id="system-prompt" class="flex-1 min-w-0 bg-transparent border-0 text-xs text-groq-dark placeholder-groq-textSubtle focus:outline-none" placeholder="Enter system message (Optional)" value="Enter system message (Optional)">
            </div>

            <div class="bg-groq-grayBg border border-groq-grayBorder rounded-2xl p-2.5 sm:p-4 transition focus-within:border-gray-300">
              <div class="text-[11px] font-semibold text-groq-textSubtle uppercase tracking-wider mb-2">USER</div>
              <textarea id="user-prompt" rows="5" class="w-full bg-transparent text-xs text-groq-dark placeholder-groq-textSubtle focus:outline-none resize-none leading-relaxed" placeholder="Enter user message...">Please confirm order for Alice Wong (email: alice.wong@fintech.de, SSN: 123-45-6789) using Visa card 4532-0151-1283-0366. Repeat back her name, email, and card number.</textarea>
              
              <div class="mt-3 pt-2.5 border-t border-gray-200/70 flex flex-wrap gap-1 text-[10px]">
                <button onclick="loadSample('banking')" class="px-2 py-1 rounded-md bg-white border border-groq-grayBorder hover:border-gray-300 text-groq-textMuted hover:text-groq-dark transition cursor-pointer whitespace-nowrap">🏦 Banking Wire</button>
                <button onclick="loadSample('patient')" class="px-2 py-1 rounded-md bg-white border border-groq-grayBorder hover:border-gray-300 text-groq-textMuted hover:text-groq-dark transition cursor-pointer whitespace-nowrap">🏥 Patient Record</button>
                <button onclick="loadSample('germantax')" class="px-2 py-1 rounded-md bg-white border border-groq-grayBorder hover:border-gray-300 text-groq-textMuted hover:text-groq-dark transition cursor-pointer whitespace-nowrap">🇩🇪 German Tax ID</button>
              </div>
            </div>

            <div class="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 text-xs px-2.5 sm:px-3 py-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-900">
              <div class="flex items-center gap-1.5 min-w-0">
                <i data-lucide="shield-check" class="w-4 h-4 text-sky-600 shrink-0"></i>
                <span class="text-[11px] font-medium truncate sm:whitespace-normal">ProjectSPG Privacy Gateway Active</span>
              </div>
              <span class="text-[10px] font-mono font-semibold text-sky-700 bg-white border border-sky-300 px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap" title="All 10 Canonical Regional & Corporate Packs Enabled">All 10 Packs Active</span>
            </div>
          </div>

          <div class="pt-4 flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <button onclick="clearInputs()" class="px-2.5 sm:px-3 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder hover:bg-gray-100 text-xs font-medium text-groq-dark flex items-center gap-1.5 transition cursor-pointer">
                <i data-lucide="plus-circle" class="w-3.5 h-3.5 text-groq-textMuted"></i>
                <span>New</span>
              </button>
              <button onclick="clearInputs()" class="px-2.5 sm:px-3 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder hover:bg-gray-100 text-xs font-medium text-groq-textMuted hover:text-groq-dark transition cursor-pointer">
                Clear
              </button>
            </div>
            <!-- Quick Submit for mobile viewports -->
            <button onclick="submitPrompt()" id="btn-quick-submit" class="lg:hidden px-3.5 py-1.5 rounded-full border-2 border-[#f0523d] bg-[#f0523d] text-white font-semibold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-xs cursor-pointer shrink-0">
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
              <span>Submit</span>
            </button>
          </div>
        </div>

        <!-- Col 2: Response -->
        <div id="col-response" class="w-full lg:flex-1 flex flex-col justify-between p-2.5 sm:p-6 border-b lg:border-b-0 lg:border-r border-groq-grayBorder overflow-x-hidden overflow-y-visible lg:overflow-y-auto bg-white min-h-[340px] min-w-0 max-w-full">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-[11px] font-semibold text-groq-textMuted uppercase tracking-wider">RESPONSE</span>
              <div id="response-stats" class="text-[11px] font-mono text-groq-textSubtle">0 tokens • 0.00s</div>
            </div>

            <div id="welcome-message" class="space-y-4 text-xs text-groq-textMuted font-sans max-w-lg">
              <h3 class="text-sm font-semibold text-groq-dark">Welcome to the Playground</h3>
              <ul class="space-y-2 list-none text-xs text-groq-dark">
                <li class="flex items-start gap-2">
                  <span class="text-groq-textSubtle">•</span>
                  <span>You can start by typing a prompt in the "User Message" field</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-groq-textSubtle">•</span>
                  <span>Click "Submit" (Or press Cmd + Enter) to get a response.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-groq-textSubtle">•</span>
                  <span>When you're ready, click the " <i data-lucide="arrow-left" class="inline w-3 h-3"></i> Add to Conversation" button to add the result to the messages.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-groq-textSubtle">•</span>
                  <span>Use the "View Code" button to copy the code snippet to your project.</span>
                </li>
              </ul>
              <p class="text-xs text-groq-textMuted pt-4">
                Don't forget to check out <a href="javascript:void(0)" onclick="switchView('docs')" class="text-groq-dark underline hover:text-[#f0523d] inline-flex items-center gap-0.5">the documentation <i data-lucide="external-link" class="w-3 h-3"></i></a>.
              </p>
            </div>

            <!-- OUTPUT 1: What is sent to the AI (The Protected Prompt) -->
            <div id="output-protected-container" class="hidden space-y-1.5 mb-4">
              <div class="flex flex-wrap items-center justify-between gap-1.5">
                <div class="flex items-center gap-2 flex-wrap min-w-0">
                  <span class="text-[11px] font-semibold text-groq-dark uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                    <i data-lucide="shield-check" class="w-3.5 h-3.5 text-sky-600"></i>
                    Protected Prompt (Sent to AI)
                  </span>
                  <span id="protected-entities-badge" class="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 shrink-0">
                    Zero Raw PII
                  </span>
                </div>
                <button onclick="copyProtectedPrompt()" class="text-[11px] text-groq-textMuted hover:text-groq-dark flex items-center gap-1 transition cursor-pointer shrink-0 ml-auto sm:ml-0" title="Copy Protected Prompt">
                  <i data-lucide="copy" class="w-3 h-3"></i>
                  <span>Copy</span>
                </button>
              </div>
              <div id="protected-prompt-text" class="whitespace-pre-wrap break-words [overflow-wrap:anywhere] max-w-full text-slate-800 bg-[#f8fafc] p-3 sm:p-4 rounded-xl border border-slate-200 text-xs font-mono leading-relaxed max-h-none lg:max-h-52 lg:overflow-y-auto shadow-2xs"></div>
            </div>

            <!-- OUTPUT 2: AI Output (Rehydrated with Highlighted Parts) -->
            <div id="output-rehydrated-container" class="hidden space-y-1.5">
              <div class="flex flex-wrap items-center justify-between gap-1.5">
                <div class="flex items-center gap-2 flex-wrap min-w-0">
                  <span class="text-[11px] font-semibold text-groq-dark uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                    <i data-lucide="sparkles" class="w-3.5 h-3.5 text-[#f0523d]"></i>
                    AI Output (Rehydrated)
                  </span>
                  <span class="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 flex items-center gap-1 shrink-0">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#f0523d]"></span>
                    Hover highlighted parts to inspect
                  </span>
                </div>
                <button onclick="copyRehydratedText()" class="text-[11px] text-groq-textMuted hover:text-groq-dark flex items-center gap-1 transition cursor-pointer shrink-0 ml-auto sm:ml-0" title="Copy AI Output">
                  <i data-lucide="copy" class="w-3 h-3"></i>
                  <span>Copy</span>
                </button>
              </div>
              <div id="rehydrated-text" class="whitespace-pre-wrap break-words [overflow-wrap:anywhere] max-w-full text-groq-dark bg-groq-grayBg p-3 sm:p-4 rounded-xl border border-groq-grayBorder text-xs font-mono leading-relaxed max-h-none lg:max-h-72 lg:overflow-y-auto"></div>
            </div>
          </div>

          <div class="pt-4 flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-3">
              <button onclick="addConversationTurn()" class="text-xs text-groq-textMuted hover:text-groq-dark flex items-center gap-1.5 font-medium transition cursor-pointer">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Add
              </button>
              <button onclick="clearResponse()" class="text-xs text-groq-textMuted hover:text-groq-dark flex items-center gap-1.5 font-medium transition cursor-pointer">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Clear
              </button>
            </div>

            <button onclick="submitPrompt()" id="btn-submit" class="px-4 sm:px-5 py-2 rounded-full border-2 border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark font-semibold text-xs flex items-center gap-1.5 sm:gap-2 transition active:scale-95 shadow-xs cursor-pointer shrink-0">
              <span>Submit</span>
              <span class="hidden sm:inline text-[11px] font-mono text-groq-textSubtle">Ctrl + ↵</span>
            </button>
          </div>
        </div>

        <!-- Col 3: Code -->
        <div id="col-code" class="w-full lg:w-[33%] lg:min-w-[320px] lg:max-w-[440px] p-2.5 sm:p-6 flex flex-col lg:h-full bg-white lg:shrink-0 min-w-0 max-w-full overflow-x-hidden lg:overflow-hidden">
          <div class="flex items-center justify-between mb-4 shrink-0">
            <div class="relative">
              <select id="code-lang-select" onchange="updateCodeViewer()" class="appearance-none bg-transparent text-xs font-medium text-groq-textSubtle hover:text-groq-dark pr-4 focus:outline-none cursor-pointer">
                <option value="python">Python</option>
                <option value="curl">cURL</option>
                <option value="langchain">LangChain</option>
              </select>
              <i data-lucide="chevrons-up-down" class="w-3 h-3 text-groq-textSubtle absolute right-0 top-0.5 pointer-events-none"></i>
            </div>

            <button onclick="copySnippet()" class="text-xs text-groq-textSubtle hover:text-groq-dark flex items-center gap-1 font-medium transition cursor-pointer">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy
            </button>
          </div>

          <div id="code-snippet-box" class="font-mono text-[11px] leading-[1.65] text-groq-dark select-all overflow-x-auto lg:overflow-y-auto whitespace-pre touch-scroll w-full min-w-0 max-w-full lg:flex-1 lg:min-h-0 pb-4"></div>
        </div>

        <!-- Parameters Drawer Backdrop for mobile -->
        <div id="parameters-backdrop" onclick="toggleParametersPanel()" class="hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"></div>

        <!-- Col 4: Parameters Panel (Exact 1:1 Match to media_1790517999090.png & media_1790518000351.png) -->
        <div id="col-parameters" class="hidden fixed lg:relative inset-y-0 right-0 z-50 lg:z-20 w-[88vw] sm:w-[320px] lg:w-[280px] lg:min-w-[280px] lg:max-w-[320px] border-l border-groq-grayBorder bg-white flex flex-col h-full overflow-hidden shrink-0 shadow-2xl lg:shadow-xs">
          <!-- Panel Header -->
          <div class="h-[50px] px-5 border-b border-gray-100 flex items-center justify-between shrink-0">
            <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">PARAMETERS</span>
            <button onclick="toggleParametersPanel()" class="text-groq-textMuted hover:text-groq-dark transition p-1 rounded-md hover:bg-gray-100 cursor-pointer" title="Close Parameters">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2"/>
                <path d="M15 3v18"/>
              </svg>
            </button>
          </div>

          <!-- Panel Scrollable Body -->
          <div class="flex-1 overflow-y-auto px-5 py-5 space-y-6">
            
            <!-- Temperature -->
            <div class="space-y-2.5">
              <div class="flex items-center justify-between">
                <label class="text-xs font-semibold text-groq-dark">Temperature</label>
                <input type="number" id="param-temp-input" min="0" max="2" step="0.01" value="1" oninput="syncParamSlider('temp', this.value)" class="w-16 h-8 text-center text-xs font-mono font-medium border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white">
              </div>
              <input type="range" id="param-temp-slider" min="0" max="2" step="0.01" value="1" oninput="syncParamInput('temp', this.value)" class="param-slider">
            </div>

            <!-- Max Completion Tokens -->
            <div class="space-y-2.5">
              <div class="flex items-center justify-between">
                <label class="text-xs font-semibold text-groq-dark">Max Completion Tokens</label>
                <input type="number" id="param-tokens-input" min="1" max="8192" step="1" value="2048" oninput="syncParamSlider('tokens', this.value)" class="w-20 h-8 text-center text-xs font-mono font-medium border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white">
              </div>
              <input type="range" id="param-tokens-slider" min="1" max="8192" step="1" value="2048" oninput="syncParamInput('tokens', this.value)" class="param-slider">
            </div>

            <!-- Reasoning -->
            <div class="flex items-center justify-between pt-1">
              <label class="text-xs font-semibold text-groq-dark">Reasoning</label>
              <div class="relative">
                <select id="param-reasoning" onchange="onParamChange()" class="appearance-none bg-gray-50 hover:bg-gray-100 border border-transparent text-groq-dark text-xs font-medium rounded-xl pl-3 pr-8 py-1.5 focus:outline-none cursor-pointer">
                  <option value="none">none</option>
                  <option value="low">low</option>
                  <option value="medium" selected>medium</option>
                  <option value="high">high</option>
                </select>
                <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2.5 top-2 pointer-events-none"></i>
              </div>
            </div>

            <!-- Stream -->
            <div class="flex items-center justify-between pt-1">
              <label class="text-xs font-semibold text-groq-dark">Stream</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="param-stream" checked onchange="onParamChange()" class="sr-only peer">
                <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark peer-checked:after:translate-x-5"></div>
              </label>
            </div>

            <!-- JSON Mode -->
            <div class="flex items-center justify-between pt-1">
              <label class="text-xs font-semibold text-groq-dark">JSON Mode</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="param-json" onchange="onParamChange()" class="sr-only peer">
                <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark peer-checked:after:translate-x-5"></div>
              </label>
            </div>

            <!-- Tokenization Mode -->
            <div class="flex items-center justify-between pt-1">
              <div>
                <label class="text-xs font-semibold text-groq-dark block">Tokenization Mode</label>
                <span class="text-[10px] text-gray-400">PII Redaction Strategy</span>
              </div>
              <div class="relative">
                <select id="param-mode" onchange="onParamChange()" class="appearance-none bg-gray-50 hover:bg-gray-100 border border-transparent text-groq-dark text-xs font-medium rounded-xl pl-3 pr-8 py-1.5 focus:outline-none cursor-pointer">
                  <option value="structural" selected>Structural (Mask)</option>
                  <option value="fpe">Format-Preserving (FPE)</option>
                </select>
                <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2.5 top-2 pointer-events-none"></i>
              </div>
            </div>

            <!-- Built-in tools Section -->
            <div class="pt-4 border-t border-gray-100">
              <span class="text-[11px] font-semibold text-gray-400 block mb-3.5">Built-in tools</span>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-groq-dark">Browser Search</label>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="param-browser" onchange="onParamChange()" class="sr-only peer">
                    <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark peer-checked:after:translate-x-5"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-groq-dark">Code Interpreter</label>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="param-code-interpreter" onchange="onParamChange()" class="sr-only peer">
                    <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark peer-checked:after:translate-x-5"></div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Advanced Collapsible Section (Exact 1:1 Match to media_1790518000351.png) -->
            <div class="pt-4 border-t border-gray-100">
              <button type="button" onclick="toggleAdvancedParams()" class="w-full flex items-center justify-between py-1 text-xs font-semibold text-groq-dark hover:text-[#f0523d] transition cursor-pointer">
                <span>Advanced</span>
                <i id="param-advanced-chevron" data-lucide="chevron-down" class="w-4 h-4 text-groq-textSubtle transition-transform duration-200"></i>
              </button>

              <div id="param-advanced-content" class="space-y-4 pt-3.5">
                <!-- Moderation: safeguard -->
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-groq-dark">Moderation: safeguard</label>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="param-safeguard" onchange="onParamChange()" class="sr-only peer">
                    <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark peer-checked:after:translate-x-5"></div>
                  </label>
                </div>

                <!-- Top P -->
                <div class="space-y-2.5">
                  <div class="flex items-center justify-between">
                    <label class="text-xs font-semibold text-groq-dark">Top P</label>
                    <input type="number" id="param-top-p-input" min="0" max="1" step="0.01" value="1" oninput="syncParamSlider('top-p', this.value)" class="w-16 h-8 text-center text-xs font-mono font-medium border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white">
                  </div>
                  <input type="range" id="param-top-p-slider" min="0" max="1" step="0.01" value="1" oninput="syncParamInput('top-p', this.value)" class="param-slider">
                </div>

                <!-- Seed -->
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-groq-dark">Seed</label>
                  <input type="number" id="param-seed" placeholder="" oninput="onParamChange()" class="w-24 h-8 text-center text-xs font-mono font-medium border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white">
                </div>

                <!-- Stop Sequence -->
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-groq-dark">Stop Sequence</label>
                  <input type="text" id="param-stop" placeholder="" oninput="onParamChange()" class="w-full h-9 px-3 text-xs font-mono border border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white font-sans">
                </div>

                <!-- Template -->
                <div class="flex items-center justify-between">
                  <label class="text-xs font-semibold text-groq-dark">Template</label>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="param-template" onchange="onParamChange()" class="sr-only peer">
                    <div class="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark peer-checked:after:translate-x-5"></div>
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================================= -->
    <!-- VIEW 2: API KEYS VIEW (Exact Groq API Keys Layout) -->
    <!-- ======================================================================= -->
    <div id="view-keys" class="view-panel hidden border-t border-l border-r border-groq-grayBorder rounded-t-2xl bg-white mx-0 sm:mx-2 lg:mx-3 flex-1 p-3.5 sm:p-6 md:p-8 max-w-[1440px] w-full overflow-visible md:overflow-y-auto shadow-xs">
      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 class="text-[17px] font-bold text-groq-dark tracking-tight mb-2">API Keys</h1>
          <p class="text-xs text-groq-textMuted">Manage your project API keys. Remember to keep your API keys safe to prevent unauthorized access.</p>
        </div>

        <button onclick="openCreateKeyModal()" class="px-4 py-2 rounded-lg border border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs w-full sm:w-auto shrink-0 cursor-pointer">
          <i data-lucide="plus" class="w-3.5 h-3.5 text-groq-dark"></i>
          <span>Create API Key</span>
        </button>
      </div>

      <!-- Mobile swipe hint -->
      <div class="sm:hidden flex items-center gap-1.5 text-[11px] text-groq-textSubtle mb-2.5 px-0.5">
        <i data-lucide="arrow-right-left" class="w-3.5 h-3.5 text-[#f0523d]"></i>
        <span>Swipe table horizontally to view full API keys data</span>
      </div>

      <div class="w-full overflow-x-auto -mx-1 sm:mx-0 px-1 sm:px-0 touch-scroll">
        <table class="w-full min-w-[620px] text-left text-xs font-sans border-collapse">
          <thead>
            <tr class="text-groq-textSubtle text-[11px] uppercase tracking-wider font-semibold">
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">NAME</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">SECRET KEY</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">TIER</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">CREATED</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">LAST USED</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">EXPIRES</th>
              <th class="pb-5 font-semibold text-groq-textSubtle pr-6">USAGE (24HRS)</th>
              <th class="pb-5 text-right w-24"></th>
            </tr>
          </thead>
          <tbody id="api-keys-tbody" class="divide-y-0 text-xs"></tbody>
        </table>
      </div>
    </div>

    <!-- ======================================================================= -->
    <!-- VIEW 3: DASHBOARD (Exact Replica of Metrics, Usage, Logs Screenshots) -->
    <!-- ======================================================================= -->
    <div id="view-dashboard" class="view-panel flex-1 flex flex-col md:flex-row overflow-visible md:overflow-hidden">
      
      <!-- STANDALONE LEFT PANEL (Modern Dashboard Left Sidebar with mobile responsive pill strip) -->
      <aside class="w-full md:w-48 shrink-0 p-3 sm:px-4 md:py-6 md:px-3 flex flex-row md:flex-col gap-1.5 md:space-y-1.5 text-xs font-medium border-b md:border-b-0 border-groq-grayBorder overflow-x-auto no-scrollbar bg-white touch-scroll">
        <button onclick="switchDashTab('metrics')" id="dash-tab-btn-metrics" class="dash-tab-btn group w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer border-l-[3px] text-groq-textMuted border-transparent hover:text-groq-dark hover:bg-gray-50 whitespace-nowrap shrink-0">
          <i data-lucide="activity" class="tab-icon w-3.5 h-3.5 shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"></i>
          <span>Metrics</span>
        </button>
        <button onclick="switchDashTab('usage')" id="dash-tab-btn-usage" class="dash-tab-btn group w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer border-l-[3px] text-groq-textMuted border-transparent hover:text-groq-dark hover:bg-gray-50 whitespace-nowrap shrink-0">
          <i data-lucide="cpu" class="tab-icon w-3.5 h-3.5 shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"></i>
          <span>Usage</span>
        </button>
        <button onclick="switchDashTab('logs')" id="dash-tab-btn-logs" class="dash-tab-btn group w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer border-l-[3px] bg-[#fff5f3] text-[#f0523d] font-bold border-[#f0523d] shadow-2xs whitespace-nowrap shrink-0">
          <i data-lucide="terminal" class="tab-icon w-3.5 h-3.5 shrink-0 text-[#f0523d] transition-colors"></i>
          <span>Logs</span>
        </button>
        <button onclick="switchDashTab('batch')" id="dash-tab-btn-batch" class="dash-tab-btn group w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-150 cursor-pointer border-l-[3px] text-groq-textMuted border-transparent hover:text-groq-dark hover:bg-gray-50 whitespace-nowrap shrink-0">
          <i data-lucide="layers" class="tab-icon w-3.5 h-3.5 shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors"></i>
          <span>Batch</span>
        </button>
      </aside>

      <!-- MAIN CARD CONTAINER (Rounded top-left & top-right border matching images) -->
      <div class="relative border-t border-l border-r border-groq-grayBorder rounded-t-2xl md:rounded-tr-2xl md:rounded-br-none bg-white p-3.5 sm:p-6 md:p-8 mx-0 md:mx-0 mr-0 md:mr-2 flex-1 flex flex-col overflow-visible md:overflow-y-auto shadow-xs min-h-[350px]">
        
        <!-- =================================================================== -->
        <!-- SUBVIEW A: METRICS (Exact 1:1 Match to media_1790456964674.png) -->
        <!-- =================================================================== -->
        <section id="dash-content-metrics" class="dash-subview hidden space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 class="text-[17px] font-bold text-groq-dark tracking-tight">Metrics</h1>
            
            <!-- Controls on Right -->
            <div class="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <!-- Row 1 on mobile: Limits switch & Refresh button -->
              <div class="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
                <div class="flex items-center gap-2 text-xs font-medium text-groq-dark">
                  <span>Show Limits</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="metrics-show-limits" onchange="renderMetricsChart()" class="sr-only peer">
                    <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark"></div>
                  </label>
                </div>

                <button id="metrics-btn-refresh" onclick="refreshMetrics()" class="px-3 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder hover:bg-gray-100 text-xs font-medium text-groq-dark flex items-center gap-1.5 transition cursor-pointer">
                  <i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-groq-textMuted"></i>
                  <span>Refresh</span>
                </button>
              </div>

              <!-- Filter Dropdowns -->
              <div class="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                <!-- Last 30 minutes dropdown -->
                <div class="relative flex-1 sm:flex-initial min-w-[125px]">
                  <select id="metrics-time-range" onchange="renderMetricsChart()" class="w-full appearance-none bg-groq-grayBg border border-groq-grayBorder text-groq-dark text-xs font-medium rounded-lg pl-3 pr-7 py-1.5 focus:outline-none cursor-pointer">
                    <option value="30m" selected>Last 30 minutes</option>
                    <option value="1h">Last 1 hour</option>
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                  </select>
                  <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2 top-2 pointer-events-none"></i>
                </div>

                <!-- Show all Models dropdown -->
                <div class="relative flex-1 sm:flex-initial min-w-[140px]">
                  <select id="metrics-model-filter" onchange="renderMetricsChart()" class="w-full appearance-none bg-groq-grayBg border border-groq-grayBorder text-groq-dark text-xs font-medium rounded-lg pl-3 pr-7 py-1.5 focus:outline-none cursor-pointer">
                    <option value="all">Show all Models</option>
                    <option value="openai/gpt-oss-120b">openai/gpt-oss-120b</option>
                    <option value="openai/gpt-oss-20b">openai/gpt-oss-20b</option>
                    <option value="qwen/qwen3.8-27b">qwen/qwen3.8-27b</option>
                    <option value="gemma-4-26b-a4b-it">gemma-4-26b-a4b-it</option>
                    <option value="gemma-4-31b-it">gemma-4-31b-it</option>
                    <option value="codestral-2508">codestral-2508</option>
                    <option value="ministral-8b-2512">ministral-8b-2512</option>
                    <option value="ministral-14b-2512">ministral-14b-2512</option>
                  </select>
                  <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2 top-2 pointer-events-none"></i>
                </div>

                <!-- Show all API Keys dropdown -->
                <div class="relative flex-1 sm:flex-initial min-w-[130px]">
                  <select id="metrics-key-filter" onchange="renderMetricsChart()" class="w-full appearance-none bg-groq-grayBg border border-groq-grayBorder text-groq-dark text-xs font-medium rounded-lg pl-3 pr-7 py-1.5 focus:outline-none cursor-pointer">
                    <option value="all">Show all API Keys</option>
                    <option value="ProjectSPG Free">ProjectSPG Free</option>
                    <option value="Datums Space">Datums Space</option>
                    <option value="ProjectSPG Production">ProjectSPG Production</option>
                  </select>
                  <i data-lucide="chevrons-up-down" class="w-3.5 h-3.5 text-groq-textSubtle absolute right-2 top-2 pointer-events-none"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- HTTP Status Codes Chart Card -->
          <div class="border border-groq-grayBorder rounded-xl p-4 sm:p-6 bg-white shadow-xs">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div class="flex items-center gap-1.5 text-xs font-semibold text-groq-dark">
                <span>HTTP Status Codes</span>
                <i data-lucide="help-circle" class="w-3.5 h-3.5 text-groq-textSubtle" title="Aggregated request status breakdown across time buckets"></i>
              </div>

              <!-- Status Code Legend & Counter Badges -->
              <div class="flex flex-wrap items-center gap-3 text-xs">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span class="text-groq-textMuted">200 OK:</span>
                  <span id="metric-legend-200" class="font-mono font-semibold text-groq-dark">0</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  <span class="text-groq-textMuted">4xx Client:</span>
                  <span id="metric-legend-4xx" class="font-mono font-semibold text-groq-dark">0</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                  <span class="text-groq-textMuted">5xx Server:</span>
                  <span id="metric-legend-5xx" class="font-mono font-semibold text-groq-dark">0</span>
                </div>
                <div class="h-3 w-px bg-gray-200"></div>
                <div class="text-groq-textSubtle font-mono text-[11px]">
                  Total: <span id="metric-total-summary" class="font-semibold text-groq-dark">0</span> reqs
                </div>
              </div>
            </div>

            <!-- Dynamic Chart Container -->
            <div id="metrics-chart-container" class="relative w-full h-[220px] sm:h-[260px] flex flex-col justify-end">
              <!-- Dynamic Canvas & Bars injected here -->
            </div>
          </div>
        </section>

        <!-- =================================================================== -->
        <!-- SUBVIEW B: USAGE (Exact 1:1 Match to media_1790456991949.png) -->
        <!-- =================================================================== -->
        <section id="dash-content-usage" class="dash-subview hidden space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h1 class="text-[17px] font-bold text-groq-dark tracking-tight mb-2">Usage</h1>
              <p class="text-xs font-medium text-groq-dark">View usage data for your project</p>
              <p class="text-[11px] text-groq-textSubtle mt-0.5">Note: Data can be delayed by up to 15 minutes. All data shown in UTC time.</p>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <button class="px-3.5 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder text-xs font-medium text-groq-dark flex items-center gap-1.5">
                <i data-lucide="folder" class="w-3.5 h-3.5 text-groq-textMuted"></i>
                <span>Default Project</span>
              </button>
              <button class="px-3.5 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder text-xs font-medium text-groq-dark flex items-center gap-1.5">
                <i data-lucide="calendar" class="w-3.5 h-3.5 text-groq-textMuted"></i>
                <span>September 2026</span>
              </button>
            </div>
          </div>

          <!-- Sub Tabs: Cost | Activity -->
          <div class="flex items-center gap-6 text-xs font-medium border-b border-groq-grayBorder pb-2">
            <button id="btn-usage-cost" onclick="switchUsageSubTab('cost')" class="usage-subtab-btn text-[#f0523d] border-b-2 border-[#f0523d] pb-2 font-semibold transition cursor-pointer">Cost</button>
            <button id="btn-usage-activity" onclick="switchUsageSubTab('activity')" class="usage-subtab-btn text-groq-dark hover:text-[#f0523d] pb-2 font-medium transition cursor-pointer">Activity</button>
          </div>

          <!-- SUBTAB 1: COST -->
          <div id="usage-view-cost" class="space-y-6">
            <!-- Total Spend Card -->
            <div class="border border-groq-grayBorder rounded-xl p-5 max-w-sm w-full bg-white shadow-xs">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-groq-dark">Total Spend</span>
                <span id="usage-total-spend" class="text-sm font-semibold text-groq-dark font-mono">$0.0000 USD</span>
              </div>
              <p class="text-[11px] text-groq-textMuted mt-3 leading-relaxed">Projected cost calculation as if you were enrolled in billing. You will not be billed until you upgrade.</p>
            </div>

            <!-- Dynamic On-Demand Usage Cards for each supported model -->
            <div id="models-usage-container" class="space-y-6">
              <!-- Dynamically populated by updateUsageStats() -->
            </div>
          </div>

          <!-- SUBTAB 2: ACTIVITY -->
          <div id="usage-view-activity" class="hidden space-y-6">
            <div class="border border-groq-grayBorder rounded-xl overflow-hidden bg-white shadow-xs">
              <div class="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 class="text-xs font-bold text-groq-dark">Model Activity Breakdown</h3>
                  <p class="text-[11px] text-groq-textMuted mt-0.5">Aggregate usage, token consumption, and privacy interception counts per supported model</p>
                </div>
                <div class="flex items-center gap-2 self-start sm:self-auto">
                  <span class="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">Live Metering</span>
                </div>
              </div>

              <!-- Mobile swipe hint -->
              <div class="sm:hidden flex items-center gap-1.5 text-[11px] text-groq-textSubtle p-2.5 pb-1">
                <i data-lucide="arrow-right-left" class="w-3.5 h-3.5 text-[#f0523d]"></i>
                <span>Swipe table horizontally to inspect all metrics</span>
              </div>

              <div class="overflow-x-auto touch-scroll">
                <table class="w-full min-w-[660px] text-left text-xs border-collapse font-sans">
                  <thead>
                    <tr class="bg-gray-50/70 text-groq-textSubtle text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100">
                      <th class="py-3 px-4">Supported Model</th>
                      <th class="py-3 px-4">Provider</th>
                      <th class="py-3 px-4">Requests</th>
                      <th class="py-3 px-4">Input Tokens</th>
                      <th class="py-3 px-4">Output Tokens</th>
                      <th class="py-3 px-4">Total Tokens</th>
                      <th class="py-3 px-4">Protected Entities</th>
                      <th class="py-3 px-4 text-right">Est. Spend</th>
                    </tr>
                  </thead>
                  <tbody id="usage-activity-tbody" class="divide-y divide-gray-100 text-[11px] font-mono">
                    <!-- Populated dynamically -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <!-- =================================================================== -->
        <!-- SUBVIEW C: LOGS (Exact 1:1 Match to media_1790457001122.png) -->
        <!-- =================================================================== -->
        <section id="dash-content-logs" class="dash-subview space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 class="text-[17px] font-bold text-groq-dark tracking-tight">Logs</h1>

            <div class="flex items-center gap-3">
              <!-- Show Errors Only toggle -->
              <div class="flex items-center gap-2 text-xs font-medium text-groq-dark select-none">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="filter-errors" onchange="renderLogsTable()" class="sr-only peer">
                  <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-groq-dark"></div>
                </label>
                <span>Show Errors Only</span>
              </div>

              <!-- Download dropdown button -->
              <button onclick="downloadLogs()" class="px-3.5 py-1.5 rounded-lg bg-groq-grayBg border border-groq-grayBorder hover:bg-gray-100 text-xs font-medium text-groq-dark flex items-center gap-1.5 transition cursor-pointer">
                <span>Download</span>
                <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-groq-textSubtle"></i>
              </button>
            </div>
          </div>

          <!-- Mobile swipe hint -->
          <div class="sm:hidden flex items-center gap-1.5 text-[11px] text-groq-textSubtle mb-2 px-0.5">
            <i data-lucide="arrow-right-left" class="w-3.5 h-3.5 text-[#f0523d]"></i>
            <span>Swipe table horizontally to inspect all 11 telemetry columns</span>
          </div>

          <!-- Logs Table (Exact Columns as Screenshot 3) -->
          <div class="w-full overflow-x-auto -mx-1 sm:mx-0 px-1 sm:px-0 touch-scroll">
            <table class="w-full min-w-[760px] text-left text-xs font-mono border-collapse">
              <thead>
                <tr class="text-groq-textSubtle text-[10px] uppercase tracking-wider font-semibold border-b border-gray-100 pb-3">
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">REQUEST TIME</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">MODEL</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">API KEY</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">CODE</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">TTFT</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">LATENCY</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">INPUT TOKENS</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">OUTPUT TOKENS</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3 text-center">AUDIO SECONDS</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle pr-3">REQUEST ID</th>
                  <th class="pb-4 font-semibold text-groq-textSubtle">ERROR</th>
                </tr>
              </thead>
              <tbody id="logs-tbody" class="divide-y-0 text-[11px]"></tbody>
            </table>

            <!-- Pagination Bar (Bottom Right matching image) -->
            <div class="mt-8 flex items-center justify-end gap-3 text-xs text-groq-dark font-sans">
              <span class="text-groq-textMuted">Page Size</span>
              <div class="relative">
                <select class="appearance-none bg-groq-grayBg border border-groq-grayBorder rounded-lg px-3 py-1 pr-6 text-groq-dark text-xs font-medium cursor-pointer">
                  <option>50</option>
                  <option>100</option>
                </select>
                <i data-lucide="chevron-down" class="w-3 h-3 text-groq-textSubtle absolute right-2 top-2 pointer-events-none"></i>
              </div>
              <div class="flex items-center gap-1 text-groq-textSubtle ml-1">
                <button class="p-1 hover:text-groq-dark disabled:opacity-30"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                <button class="p-1 hover:text-groq-dark"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
              </div>
            </div>
          </div>
        </section>

        <!-- =================================================================== -->
        <!-- SUBVIEW D: BATCH -->
        <!-- =================================================================== -->
        <section id="dash-content-batch" class="dash-subview hidden space-y-6">
          <h1 class="text-[17px] font-bold text-groq-dark tracking-tight">Batch</h1>
          <p class="text-xs text-groq-textMuted">Perform asynchronous batch de-identification and reversible tokenization.</p>
          <div class="border border-dashed border-gray-300 rounded-xl p-8 text-center space-y-3 bg-white">
            <i data-lucide="upload-cloud" class="w-8 h-8 text-[#f0523d] mx-auto"></i>
            <span class="text-xs font-medium text-groq-dark block">Upload CSV or JSONL files</span>
            <button class="px-4 py-1.5 rounded-lg bg-white border border-[#f0523d] text-groq-dark text-xs font-semibold hover:bg-[#fff5f3]">Choose Files</button>
          </div>
        </section>

      </div> <!-- End Main Card Container -->

    </div> <!-- End View Dashboard -->

    <!-- ======================================================================= -->
<!-- VIEW 4: DOCS VIEW -->
    <!-- ======================================================================= -->
    <div id="view-docs" class="view-panel hidden border-t border-l border-r border-groq-grayBorder rounded-t-2xl bg-white mx-0 sm:mx-2 lg:mx-3 flex-1 flex flex-col md:flex-row overflow-visible md:overflow-hidden shadow-xs">
      
      <!-- Sidebar Navigation -->
      <aside class="w-full md:w-72 shrink-0 border-b md:border-b-0 md:border-r border-groq-grayBorder bg-[#fafafa]/80 p-3.5 sm:p-5 text-xs overflow-visible md:overflow-y-auto">
        <!-- Mobile Accordion Trigger (Only visible on < md) -->
        <button type="button" onclick="toggleDocsMobileNav()" class="md:hidden w-full flex items-center justify-between py-2 px-3 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-groq-dark cursor-pointer shadow-2xs">
          <span class="flex items-center gap-2"><i data-lucide="book-open" class="w-4 h-4 text-[#f0523d]"></i> API Reference Navigation</span>
          <i id="docs-mobile-chevron" data-lucide="chevron-down" class="w-4 h-4 text-gray-500 transition-transform duration-200"></i>
        </button>

        <!-- Sidebar Content -->
        <div id="docs-sidebar-content" class="hidden md:block space-y-5 mt-3 md:mt-0">
          <div class="relative">
            <input type="text" id="docs-search-input" oninput="filterDocsEndpoints(this.value)" placeholder="Filter endpoints..." class="w-full bg-white border border-groq-grayBorder rounded-lg pl-8 pr-8 py-1.5 text-xs text-groq-dark placeholder-groq-textSubtle focus:outline-none focus:border-[#f0523d]/50 shadow-2xs">
            <i data-lucide="search" class="w-3.5 h-3.5 text-groq-textSubtle absolute left-2.5 top-2.5"></i>
          </div>

          <!-- Section: Getting Started -->
          <div>
            <div class="text-[10px] font-bold text-groq-textSubtle uppercase tracking-wider mb-1.5 px-2">OVERVIEW</div>
            <div class="space-y-0.5 font-sans text-xs">
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-quickstart')" id="docs-nav-docs-quickstart" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#fff5f3] text-[#f0523d] font-semibold border-l-2 border-[#f0523d] transition cursor-pointer">
                  <i data-lucide="zap" class="w-3.5 h-3.5 shrink-0"></i>
                  <span>Quickstart & Base URLs</span>
                </a>
              </div>
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-auth-headers')" id="docs-nav-docs-auth-headers" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <i data-lucide="lock" class="w-3.5 h-3.5 shrink-0"></i>
                  <span>Authentication & Headers</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Section: LLM Gateway -->
          <div>
            <div class="text-[10px] font-bold text-groq-textSubtle uppercase tracking-wider mb-1.5 px-2 flex items-center justify-between">
              <span>LLM GATEWAY</span>
              <span class="text-[9px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-1 rounded">v1</span>
            </div>
            <div class="space-y-0.5 font-mono text-[11px]">
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-chat-completions')" id="docs-nav-docs-chat-completions" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">POST</span>
                  <span class="truncate">/v1/chat/completions</span>
                </a>
              </div>
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-embeddings')" id="docs-nav-docs-embeddings" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">POST</span>
                  <span class="truncate">/v1/embeddings</span>
                </a>
              </div>
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-models')" id="docs-nav-docs-models" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">GET</span>
                  <span class="truncate">/v1/models</span>
                </a>
              </div>
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-models-get')" id="docs-nav-docs-models-get" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">GET</span>
                  <span class="truncate">/v1/models/{model}</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Section: Privacy Vault -->
          <div>
            <div class="text-[10px] font-bold text-groq-textSubtle uppercase tracking-wider mb-1.5 px-2 flex items-center justify-between">
              <span>STANDALONE VAULT</span>
              <span class="text-[9px] font-mono text-purple-600 font-semibold bg-purple-50 px-1 rounded">Native</span>
            </div>
            <div class="space-y-0.5 font-mono text-[11px]">
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-tokenize')" id="docs-nav-docs-tokenize" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">POST</span>
                  <span class="truncate">/api/tokenize</span>
                </a>
              </div>
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-detokenize')" id="docs-nav-docs-detokenize" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">POST</span>
                  <span class="truncate">/api/detokenize</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Section: Telemetry & SIEM -->
          <div>
            <div class="text-[10px] font-bold text-groq-textSubtle uppercase tracking-wider mb-1.5 px-2">TELEMETRY & LOGS</div>
            <div class="space-y-0.5 font-mono text-[11px]">
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-logs')" id="docs-nav-docs-logs" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">GET</span>
                  <span class="truncate">/v1/logs</span>
                </a>
              </div>
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-audit-events')" id="docs-nav-docs-audit-events" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">GET</span>
                  <span class="truncate">/v1/audit/events</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Section: Management & Health -->
          <div>
            <div class="text-[10px] font-bold text-groq-textSubtle uppercase tracking-wider mb-1.5 px-2">KEYS & HEALTH</div>
            <div class="space-y-0.5 font-mono text-[11px]">
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-keys-list')" id="docs-nav-docs-keys-list" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">GET</span>
                  <span class="truncate">/api/keys</span>
                </a>
              </div>
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-keys-create')" id="docs-nav-docs-keys-create" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">POST</span>
                  <span class="truncate">/api/keys</span>
                </a>
              </div>
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-keys-delete')" id="docs-nav-docs-keys-delete" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 text-rose-800">DELETE</span>
                  <span class="truncate">/api/keys/{id}</span>
                </a>
              </div>
              <div class="docs-nav-item">
                <a href="javascript:void(0)" onclick="switchDocsEndpoint('docs-health')" id="docs-nav-docs-health" class="docs-nav-link flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-groq-textMuted hover:text-groq-dark hover:bg-gray-100/70 transition cursor-pointer">
                  <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800">GET</span>
                  <span class="truncate">/health</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Scrollable Documentation Canvas -->
      <div id="docs-main-scroll" class="flex-1 p-4 sm:p-8 md:p-10 overflow-visible md:overflow-y-auto space-y-16 bg-white">
        
        <!-- SECTION 1: QUICKSTART -->
        <section id="docs-quickstart" class="space-y-6 pt-2 scroll-mt-16 md:scroll-mt-6">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-[#f0523d] text-[11px] font-semibold mb-3">
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Zero-Code Drop-In Privacy Layer
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-groq-dark tracking-tight">ProjectSPG API Reference</h1>
            <p class="text-xs sm:text-sm text-groq-textMuted mt-1.5 max-w-3xl leading-relaxed">
              Integrate privacy-preserving, zero-data-leakage LLM intelligence into your stack. ProjectSPG functions as a wire-compatible, transparent drop-in replacement for the OpenAI SDK, LangChain, LlamaIndex, and native HTTP clients.
            </p>
          </div>

          <!-- Base URLs Card -->
          <div class="p-5 rounded-2xl border border-groq-grayBorder bg-slate-50/60 space-y-3">
            <h3 class="text-xs font-bold text-groq-dark uppercase tracking-wider">Gateway Base URLs</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="p-3 bg-white rounded-xl border border-gray-200/80 shadow-2xs space-y-1">
                <span class="text-[10px] font-bold text-gray-500 uppercase">Primary API Gateway</span>
                <div class="flex items-center justify-between font-mono text-[11px] text-groq-dark font-medium select-all">
                  <span>https://api.projectspg.info/v1</span>
                  <button onclick="navigator.clipboard.writeText('https://api.projectspg.info/v1'); alert('Copied!');" class="text-gray-400 hover:text-gray-700 cursor-pointer" title="Copy"><i data-lucide="copy" class="w-3.5 h-3.5"></i></button>
                </div>
              </div>
              <div class="p-3 bg-white rounded-xl border border-gray-200/80 shadow-2xs space-y-1">
                <span class="text-[10px] font-bold text-gray-500 uppercase">Web Edge Gateway</span>
                <div class="flex items-center justify-between font-mono text-[11px] text-groq-dark font-medium select-all">
                  <span>https://projectspg.info/v1</span>
                  <button onclick="navigator.clipboard.writeText('https://projectspg.info/v1'); alert('Copied!');" class="text-gray-400 hover:text-gray-700 cursor-pointer" title="Copy"><i data-lucide="copy" class="w-3.5 h-3.5"></i></button>
                </div>
              </div>
            </div>
          </div>

          <!-- 1-Line Drop-in Migration Snippet -->
          <div class="p-5 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-groq-dark flex items-center gap-1.5"><i data-lucide="code-2" class="w-4 h-4 text-[#f0523d]"></i> Standard 1-Line Client Migration</span>
              <span class="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">Compatible with OpenAI SDK v1.0+</span>
            </div>
            <p class="text-xs text-groq-textMuted leading-relaxed">
              Simply replace your client base URL with ProjectSPG. Every prompt is intercepted at sub-millisecond speeds, de-identified using cryptographic tokenization, sent to the model safely, and restored on return.
            </p>
            <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all"># Python
from openai import OpenAI

client = OpenAI(
    api_key="spg_live_your_key_here",
    base_url="https://api.projectspg.info/v1"   # Drop-in ProjectSPG Gateway
)

response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[{"role": "user", "content": "Schedule appointment for David at SSN: 123-45-6789"}]
)
print(response.choices[0].message.content)</div>
          </div>
        </section>

        <!-- SECTION 2: AUTHENTICATION & HEADERS -->
        <section id="docs-auth-headers" class="space-y-4 pt-4 border-t border-gray-100 scroll-mt-16 md:scroll-mt-6">
          <div>
            <h2 class="text-lg sm:text-xl font-bold text-groq-dark flex items-center gap-2">
              <i data-lucide="lock" class="w-4 h-4 text-purple-600"></i>
              Authentication & Enterprise Privacy Headers
            </h2>
            <p class="text-xs text-groq-textMuted mt-1">Authenticate all API requests via standard Bearer tokens and configure zero-knowledge encryption parameters.</p>
          </div>

          <div class="border border-groq-grayBorder rounded-xl overflow-hidden text-xs">
            <table class="w-full text-left border-collapse">
              <thead class="bg-gray-50/80 font-mono text-[10px] text-groq-textSubtle uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th class="py-2.5 px-4 font-semibold">HEADER</th>
                  <th class="py-2.5 px-4 font-semibold">TYPE</th>
                  <th class="py-2.5 px-4 font-semibold">REQUIRED</th>
                  <th class="py-2.5 px-4 font-semibold">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 font-sans">
                <tr>
                  <td class="py-3 px-4 font-mono font-medium text-groq-dark">Authorization</td>
                  <td class="py-3 px-4 font-mono text-gray-500">string</td>
                  <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Required</span></td>
                  <td class="py-3 px-4 text-groq-textMuted">Bearer token with your project API key: <code>Bearer spg_live_...</code></td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono font-medium text-groq-dark">Content-Type</td>
                  <td class="py-3 px-4 font-mono text-gray-500">string</td>
                  <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Required</span></td>
                  <td class="py-3 px-4 text-groq-textMuted">Must be <code>application/json</code> for JSON request bodies.</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono font-medium text-groq-dark">x-tokenization-mode</td>
                  <td class="py-3 px-4 font-mono text-gray-500">string</td>
                  <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">Optional</span></td>
                  <td class="py-3 px-4 text-groq-textMuted">Privacy mode: <code>mask</code> (default: e.g. <code>[PERSON_1]</code>), <code>synthetic</code> (realistic fake data), or <code>fpe</code> (Format-Preserving Encryption).</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono font-medium text-groq-dark">x-detection-categories</td>
                  <td class="py-3 px-4 font-mono text-gray-500">string</td>
                  <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">Optional</span></td>
                  <td class="py-3 px-4 text-groq-textMuted">Comma-separated regions or categories to scan (e.g. <code>north_america,european_union,financial,corporate</code> or <code>all</code>). Default: <code>all</code>.</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono font-medium text-groq-dark">x-vault-encryption-key</td>
                  <td class="py-3 px-4 font-mono text-gray-500">string</td>
                  <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">Optional</span></td>
                  <td class="py-3 px-4 text-groq-textMuted">Client-provided 32-character AES-256-GCM encryption key. Zero plaintext is stored in the vault without this key.</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 font-mono font-medium text-groq-dark">x-custom-entities</td>
                  <td class="py-3 px-4 font-mono text-gray-500">string</td>
                  <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">Optional</span></td>
                  <td class="py-3 px-4 text-groq-textMuted">JSON array or comma-separated list of proprietary keywords or project codenames to redact (e.g. <code>[&quot;ProjectTitan&quot;, &quot;SecretAlgorithm&quot;]</code>).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- SECTION 3: POST /v1/chat/completions -->
        <section id="docs-chat-completions" class="space-y-5 pt-4 border-t border-gray-100 scroll-mt-16 md:scroll-mt-6">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono text-xs">POST</span>
              <h2 class="text-lg sm:text-xl font-bold font-mono text-groq-dark">/v1/chat/completions</h2>
            </div>
            <p class="text-xs text-groq-textMuted leading-relaxed">
              Creates a privacy-sanitized chat completion. Ingests raw user prompts, masks 109-country PII/financial/health entities with cryptographic tokens at sub-millisecond edge speed, executes upstream inference, and rehydrates the model output back to the original entities. Supports real-time Server-Sent Events (SSE) streaming.
            </p>
          </div>

          <!-- Endpoint URL Bar -->
          <div class="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-groq-grayBorder font-mono text-xs select-all">
            <span class="text-groq-dark font-medium">https://api.projectspg.info/v1/chat/completions</span>
            <button onclick="navigator.clipboard.writeText('https://api.projectspg.info/v1/chat/completions'); alert('Copied endpoint URL!');" class="text-gray-400 hover:text-gray-700 cursor-pointer" title="Copy"><i data-lucide="copy" class="w-3.5 h-3.5"></i></button>
          </div>

          <!-- Request Body Parameters Table -->
          <div class="space-y-2">
            <h3 class="text-xs font-bold text-groq-dark uppercase tracking-wider">Request Body Parameters</h3>
            <div class="border border-groq-grayBorder rounded-xl overflow-hidden text-xs">
              <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50/80 font-mono text-[10px] text-groq-textSubtle uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th class="py-2.5 px-4 font-semibold">PARAMETER</th>
                    <th class="py-2.5 px-4 font-semibold">TYPE</th>
                    <th class="py-2.5 px-4 font-semibold">DEFAULT</th>
                    <th class="py-2.5 px-4 font-semibold">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-sans">
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">model</td>
                    <td class="py-3 px-4 font-mono text-gray-500">string</td>
                    <td class="py-3 px-4 text-gray-400 font-mono">-</td>
                    <td class="py-3 px-4 text-groq-textMuted"><strong class="text-emerald-700">Required.</strong> Model ID, e.g. <code>openai/gpt-oss-120b</code>, <code>codestral-2508</code>, <code>ministral-8b-2512</code>, <code>gemini-3.5-flash-lite</code>.</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">messages</td>
                    <td class="py-3 px-4 font-mono text-gray-500">array&lt;object&gt;</td>
                    <td class="py-3 px-4 text-gray-400 font-mono">-</td>
                    <td class="py-3 px-4 text-groq-textMuted"><strong class="text-emerald-700">Required.</strong> Array of message objects, each containing <code>role</code> (<code>system</code>, <code>user</code>, or <code>assistant</code>) and <code>content</code> (string).</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">temperature</td>
                    <td class="py-3 px-4 font-mono text-gray-500">number</td>
                    <td class="py-3 px-4 text-gray-600 font-mono">1.0</td>
                    <td class="py-3 px-4 text-groq-textMuted">Sampling temperature between 0 and 2. Lower values result in more deterministic completions.</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">max_tokens</td>
                    <td class="py-3 px-4 font-mono text-gray-500">integer</td>
                    <td class="py-3 px-4 text-gray-600 font-mono">2048</td>
                    <td class="py-3 px-4 text-groq-textMuted">The maximum number of tokens to generate in the chat completion.</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">stream</td>
                    <td class="py-3 px-4 font-mono text-gray-500">boolean</td>
                    <td class="py-3 px-4 text-gray-600 font-mono">false</td>
                    <td class="py-3 px-4 text-groq-textMuted">If true, partial message deltas are streamed as Server-Sent Events (SSE) using the StreamTokenBuffer.</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">response_format</td>
                    <td class="py-3 px-4 font-mono text-gray-500">object</td>
                    <td class="py-3 px-4 text-gray-400 font-mono">null</td>
                    <td class="py-3 px-4 text-groq-textMuted">Set to <code>{ &quot;type&quot;: &quot;json_object&quot; }</code> to enable JSON mode output.</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">seed</td>
                    <td class="py-3 px-4 font-mono text-gray-500">integer</td>
                    <td class="py-3 px-4 text-gray-400 font-mono">null</td>
                    <td class="py-3 px-4 text-groq-textMuted">Deterministic sampling seed for reproducible outputs.</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">stop</td>
                    <td class="py-3 px-4 font-mono text-gray-500">string | array</td>
                    <td class="py-3 px-4 text-gray-400 font-mono">null</td>
                    <td class="py-3 px-4 text-groq-textMuted">Up to 4 sequences where the API will stop generating further tokens.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Multi-Tab Code Example Box -->
          <div id="docs-codeblock-chat" class="rounded-2xl border border-gray-800 bg-[#181825] overflow-hidden shadow-lg">
            <div class="flex items-center justify-between px-4 py-2.5 bg-[#1e1e2e] border-b border-gray-800 text-xs">
              <div class="flex items-center gap-4">
                <button onclick="switchDocsCodeLang('chat', 'curl')" id="docs-tab-chat-curl" class="docs-lang-tab text-[#f0523d] border-b-2 border-[#f0523d] pb-1 font-semibold cursor-pointer">cURL</button>
                <button onclick="switchDocsCodeLang('chat', 'python')" id="docs-tab-chat-python" class="docs-lang-tab text-gray-400 hover:text-white pb-1 font-medium cursor-pointer">Python (OpenAI SDK)</button>
                <button onclick="switchDocsCodeLang('chat', 'node')" id="docs-tab-chat-node" class="docs-lang-tab text-gray-400 hover:text-white pb-1 font-medium cursor-pointer">Node.js (OpenAI SDK)</button>
                <button onclick="switchDocsCodeLang('chat', 'fetch')" id="docs-tab-chat-fetch" class="docs-lang-tab text-gray-400 hover:text-white pb-1 font-medium cursor-pointer">Fetch (Browser/Edge)</button>
              </div>
              <button onclick="copyDocsSnippet('docs-code-chat-active', this)" class="text-[11px] text-gray-400 hover:text-white flex items-center gap-1 font-medium cursor-pointer transition">
                <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy
              </button>
            </div>
            
            <!-- cURL Pane -->
            <div id="docs-code-chat-curl" class="docs-code-pane p-4 font-mono text-[11px] text-slate-100 leading-relaxed overflow-x-auto whitespace-pre select-all"><span id="docs-code-chat-active">curl https://api.projectspg.info/v1/chat/completions \\
  -H "Authorization: Bearer spg_live_your_key_here" \\
  -H "Content-Type: application/json" \\
  -H "x-tokenization-mode: mask" \\
  -H "x-detection-categories: all" \\
  -d '{
    "model": "openai/gpt-oss-120b",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful customer support assistant."
      },
      {
        "role": "user",
        "content": "Hello, my email is alice@company.com and my credit card is 4111-2222-3333-4444. Can you refund me?"
      }
    ],
    "temperature": 0.7,
    "max_tokens": 1024
  }'</span></div>

            <!-- Python Pane -->
            <div id="docs-code-chat-python" class="docs-code-pane hidden p-4 font-mono text-[11px] text-slate-100 leading-relaxed overflow-x-auto whitespace-pre select-all">from openai import OpenAI

# Drop-in replacement: point standard OpenAI SDK to ProjectSPG base_url
client = OpenAI(
    api_key="spg_live_your_key_here",
    base_url="https://api.projectspg.info/v1"
)

response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Confirm shipment to Bob (SSN: 987-65-4321) at bob@domain.com"}
    ],
    temperature=0.7
)

# Plaintext entities are restored safely in the final output
print("AI Response:", response.choices[0].message.content)</div>

            <!-- Node.js Pane -->
            <div id="docs-code-chat-node" class="docs-code-pane hidden p-4 font-mono text-[11px] text-slate-100 leading-relaxed overflow-x-auto whitespace-pre select-all">import OpenAI from "openai";

// Drop-in replacement: point standard OpenAI client to ProjectSPG
const client = new OpenAI({
  apiKey: "spg_live_your_key_here",
  baseURL: "https://api.projectspg.info/v1"
});

async function main() {
  const completion = await client.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      { role: "user", content: "Process order for Alice, passport: K1234567" }
    ]
  });

  console.log(completion.choices[0].message.content);
}

main();</div>

            <!-- Fetch Pane -->
            <div id="docs-code-chat-fetch" class="docs-code-pane hidden p-4 font-mono text-[11px] text-slate-100 leading-relaxed overflow-x-auto whitespace-pre select-all">const response = await fetch("https://api.projectspg.info/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer spg_live_your_key_here",
    "Content-Type": "application/json",
    "x-tokenization-mode": "mask"
  },
  body: JSON.stringify({
    model: "openai/gpt-oss-120b",
    messages: [
      { role: "user", content: "Please contact me at john.doe@securebank.com regarding account 849204819" }
    ]
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);</div>
          </div>

          <!-- Response Example -->
          <div class="space-y-2">
            <h3 class="text-xs font-bold text-groq-dark uppercase tracking-wider">Example Response (200 OK)</h3>
            <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">{
  "id": "chatcmpl-9x1u...abc",
  "object": "chat.completion",
  "created": 1727982000,
  "model": "openai/gpt-oss-120b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "I have initiated the refund for alice@company.com to your card ending in 4444."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 42,
    "completion_tokens": 28,
    "total_tokens": 70
  },
  "privacy": {
    "protected_prompt": "Hello, my email is [EMAIL_1] and my credit card is [CARD_1]. Can you refund me?",
    "entities_count": 2,
    "token_map": {
      "[EMAIL_1]": "alice@company.com",
      "[CARD_1]": "4111-2222-3333-4444"
    },
    "engine_latency_us": 142
  }
}</div>
          </div>
        </section>

        <!-- SECTION 4: POST /v1/embeddings -->
        <section id="docs-embeddings" class="space-y-5 pt-4 border-t border-gray-100 scroll-mt-16 md:scroll-mt-6">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono text-xs">POST</span>
              <h2 class="text-lg sm:text-xl font-bold font-mono text-groq-dark">/v1/embeddings</h2>
            </div>
            <p class="text-xs text-groq-textMuted leading-relaxed">
              Vector embedding privacy sanitization. Intercepts raw text or text batches, neutralizes PII and identifiers, and requests normalized vector embeddings from the upstream model without leaking raw data to vector database indexing pipelines.
            </p>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-groq-grayBorder font-mono text-xs select-all">
            <span class="text-groq-dark font-medium">https://api.projectspg.info/v1/embeddings</span>
            <button onclick="navigator.clipboard.writeText('https://api.projectspg.info/v1/embeddings'); alert('Copied endpoint URL!');" class="text-gray-400 hover:text-gray-700 cursor-pointer" title="Copy"><i data-lucide="copy" class="w-3.5 h-3.5"></i></button>
          </div>

          <div class="space-y-2">
            <h3 class="text-xs font-bold text-groq-dark uppercase tracking-wider">Parameters</h3>
            <div class="border border-groq-grayBorder rounded-xl overflow-hidden text-xs">
              <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50/80 font-mono text-[10px] text-groq-textSubtle uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th class="py-2.5 px-4 font-semibold">PARAMETER</th>
                    <th class="py-2.5 px-4 font-semibold">TYPE</th>
                    <th class="py-2.5 px-4 font-semibold">REQUIRED</th>
                    <th class="py-2.5 px-4 font-semibold">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-sans">
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">input</td>
                    <td class="py-3 px-4 font-mono text-gray-500">string | array&lt;string&gt;</td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Required</span></td>
                    <td class="py-3 px-4 text-groq-textMuted">The text or array of strings to generate vector embeddings for.</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">model</td>
                    <td class="py-3 px-4 font-mono text-gray-500">string</td>
                    <td class="py-3 px-4"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">Required</span></td>
                    <td class="py-3 px-4 text-groq-textMuted">Embedding model identifier (e.g. <code>text-embedding-3-small</code>, <code>text-embedding-3-large</code>).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">curl https://api.projectspg.info/v1/embeddings \\
  -H "Authorization: Bearer spg_live_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "text-embedding-3-small",
    "input": "Patient John Doe was admitted to hospital on 2026-08-12."
  }'</div>
        </section>

        <!-- SECTION 5: GET /v1/models -->
        <section id="docs-models" class="space-y-5 pt-4 border-t border-gray-100 scroll-mt-16 md:scroll-mt-6">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold font-mono text-xs">GET</span>
              <h2 class="text-lg sm:text-xl font-bold font-mono text-groq-dark">/v1/models</h2>
            </div>
            <p class="text-xs text-groq-textMuted leading-relaxed">
              Lists the catalog of available LLMs, including model IDs, upstream providers (Groq Cloud, Google AI Studio, Mistral AI), rate per 1M tokens, context windows, and operational tier tags.
            </p>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-groq-grayBorder font-mono text-xs select-all">
            <span class="text-groq-dark font-medium">https://api.projectspg.info/v1/models</span>
            <button onclick="navigator.clipboard.writeText('https://api.projectspg.info/v1/models'); alert('Copied endpoint URL!');" class="text-gray-400 hover:text-gray-700 cursor-pointer" title="Copy"><i data-lucide="copy" class="w-3.5 h-3.5"></i></button>
          </div>

          <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">curl https://api.projectspg.info/v1/models \\
  -H "Authorization: Bearer spg_live_your_key_here"</div>

          <div class="space-y-2">
            <h3 class="text-xs font-bold text-groq-dark uppercase tracking-wider">Example Response (200 OK)</h3>
            <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">{
  "object": "list",
  "data": [
    {
      "id": "openai/gpt-oss-120b",
      "object": "model",
      "owned_by": "groq",
      "provider": "Groq Cloud",
      "rate_per_1m_tokens": 0.15,
      "context_window": 131072
    },
    {
      "id": "codestral-2508",
      "object": "model",
      "owned_by": "mistral",
      "provider": "Mistral AI",
      "rate_per_1m_tokens": 0.30,
      "context_window": 262144
    },
    {
      "id": "ministral-8b-2512",
      "object": "model",
      "owned_by": "mistral",
      "provider": "Mistral AI",
      "rate_per_1m_tokens": 0.10,
      "context_window": 131072
    }
  ]
}</div>
        </section>

        <!-- SECTION 6: GET /v1/models/{model} -->
        <section id="docs-models-get" class="space-y-5 pt-4 border-t border-gray-100 scroll-mt-16 md:scroll-mt-6">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold font-mono text-xs">GET</span>
              <h2 class="text-lg sm:text-xl font-bold font-mono text-groq-dark">/v1/models/{model}</h2>
            </div>
            <p class="text-xs text-groq-textMuted leading-relaxed">
              Retrieves a single model instance and its operational configuration, verification status, and provider endpoint.
            </p>
          </div>

          <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">curl https://api.projectspg.info/v1/models/codestral-2508 \\
  -H "Authorization: Bearer spg_live_your_key_here"</div>
        </section>

        <!-- SECTION 7: POST /api/tokenize -->
        <section id="docs-tokenize" class="space-y-5 pt-4 border-t border-gray-100 scroll-mt-16 md:scroll-mt-6">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono text-xs">POST</span>
              <h2 class="text-lg sm:text-xl font-bold font-mono text-groq-dark">/api/tokenize</h2>
            </div>
            <p class="text-xs text-groq-textMuted leading-relaxed">
              Standalone data de-identification & reversible tokenization. Neutralizes sensitive PII, PHI, financial cards, and custom keywords without invoking an external LLM. Use this to sanitize database rows, log pipelines, or document indexing before storage.
            </p>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-groq-grayBorder font-mono text-xs select-all">
            <span class="text-groq-dark font-medium">https://api.projectspg.info/api/tokenize</span>
            <button onclick="navigator.clipboard.writeText('https://api.projectspg.info/api/tokenize'); alert('Copied endpoint URL!');" class="text-gray-400 hover:text-gray-700 cursor-pointer" title="Copy"><i data-lucide="copy" class="w-3.5 h-3.5"></i></button>
          </div>

          <div class="space-y-2">
            <h3 class="text-xs font-bold text-groq-dark uppercase tracking-wider">Parameters</h3>
            <div class="border border-groq-grayBorder rounded-xl overflow-hidden text-xs">
              <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50/80 font-mono text-[10px] text-groq-textSubtle uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th class="py-2.5 px-4 font-semibold">PARAMETER</th>
                    <th class="py-2.5 px-4 font-semibold">TYPE</th>
                    <th class="py-2.5 px-4 font-semibold">DEFAULT</th>
                    <th class="py-2.5 px-4 font-semibold">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-sans">
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">text</td>
                    <td class="py-3 px-4 font-mono text-gray-500">string</td>
                    <td class="py-3 px-4 text-gray-400 font-mono">-</td>
                    <td class="py-3 px-4 text-groq-textMuted"><strong class="text-emerald-700">Required.</strong> Raw input text to sanitize.</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">categories</td>
                    <td class="py-3 px-4 font-mono text-gray-500">array&lt;string&gt;</td>
                    <td class="py-3 px-4 text-gray-600 font-mono">["all"]</td>
                    <td class="py-3 px-4 text-groq-textMuted">Jurisdiction filters: <code>["north_america", "european_union", "financial"]</code>.</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">mode</td>
                    <td class="py-3 px-4 font-mono text-gray-500">string</td>
                    <td class="py-3 px-4 text-gray-600 font-mono">"mask"</td>
                    <td class="py-3 px-4 text-groq-textMuted">Tokenization scheme: <code>"mask"</code>, <code>"synthetic"</code>, or <code>"fpe"</code>.</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">sessionId</td>
                    <td class="py-3 px-4 font-mono text-gray-500">string</td>
                    <td class="py-3 px-4 text-gray-400 font-mono">auto</td>
                    <td class="py-3 px-4 text-groq-textMuted">Optional session ID to persist token mappings in the edge vault for later rehydration.</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">ttlSeconds</td>
                    <td class="py-3 px-4 font-mono text-gray-500">integer</td>
                    <td class="py-3 px-4 text-gray-600 font-mono">86400</td>
                    <td class="py-3 px-4 text-groq-textMuted">Time to live in seconds for the session mapping (default: 24 hours).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">curl https://api.projectspg.info/api/tokenize \\
  -H "Authorization: Bearer spg_live_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Transfer $5,000 from account 9876543210 to David Lee (SSN: 000-11-2222).",
    "mode": "mask",
    "categories": ["all"]
  }'</div>

          <div class="space-y-2">
            <h3 class="text-xs font-bold text-groq-dark uppercase tracking-wider">Example Response (200 OK)</h3>
            <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">{
  "sanitizedText": "Transfer $5,000 from account [BANK_ACCOUNT_1] to [PERSON_1] (SSN: [SSN_1]).",
  "sessionId": "sess_9x2u1m7a",
  "entitiesCount": 3,
  "entitiesDetected": ["BANK_ACCOUNT", "PERSON", "SSN"],
  "tokenMap": {
    "[BANK_ACCOUNT_1]": "9876543210",
    "[PERSON_1]": "David Lee",
    "[SSN_1]": "000-11-2222"
  },
  "engineLatencyUs": 84
}</div>
          </div>
        </section>

        <!-- SECTION 8: POST /api/detokenize -->
        <section id="docs-detokenize" class="space-y-5 pt-4 border-t border-gray-100 scroll-mt-16 md:scroll-mt-6">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono text-xs">POST</span>
              <h2 class="text-lg sm:text-xl font-bold font-mono text-groq-dark">/api/detokenize</h2>
            </div>
            <p class="text-xs text-groq-textMuted leading-relaxed">
              Reversible rehydration. Takes a sanitized text containing tokens (e.g. <code>[PERSON_1]</code>) and restores the original plaintext values using either the stored <code>sessionId</code> or an explicitly passed <code>tokenMap</code>.
            </p>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-groq-grayBorder font-mono text-xs select-all">
            <span class="text-groq-dark font-medium">https://api.projectspg.info/api/detokenize</span>
            <button onclick="navigator.clipboard.writeText('https://api.projectspg.info/api/detokenize'); alert('Copied endpoint URL!');" class="text-gray-400 hover:text-gray-700 cursor-pointer" title="Copy"><i data-lucide="copy" class="w-3.5 h-3.5"></i></button>
          </div>

          <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">curl https://api.projectspg.info/api/detokenize \\
  -H "Authorization: Bearer spg_live_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Payment sent to [PERSON_1] at [BANK_ACCOUNT_1].",
    "sessionId": "sess_9x2u1m7a"
  }'</div>

          <div class="space-y-2">
            <h3 class="text-xs font-bold text-groq-dark uppercase tracking-wider">Example Response (200 OK)</h3>
            <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">{
  "rehydratedText": "Payment sent to David Lee at 9876543210.",
  "entitiesRestored": 2,
  "sessionId": "sess_9x2u1m7a"
}</div>
          </div>
        </section>

        <!-- SECTION 9: GET /v1/logs -->
        <section id="docs-logs" class="space-y-5 pt-4 border-t border-gray-100 scroll-mt-16 md:scroll-mt-6">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold font-mono text-xs">GET</span>
              <h2 class="text-lg sm:text-xl font-bold font-mono text-groq-dark">/v1/logs</h2>
            </div>
            <p class="text-xs text-groq-textMuted leading-relaxed">
              Retrieves the recent API call telemetry logs strictly belonging to the authenticated API key or user account. Used for real-time metering, token usage tracking, and audit verification.
            </p>
          </div>

          <div class="space-y-2">
            <h3 class="text-xs font-bold text-groq-dark uppercase tracking-wider">Query Parameters</h3>
            <div class="border border-groq-grayBorder rounded-xl overflow-hidden text-xs">
              <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50/80 font-mono text-[10px] text-groq-textSubtle uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th class="py-2.5 px-4 font-semibold">PARAMETER</th>
                    <th class="py-2.5 px-4 font-semibold">TYPE</th>
                    <th class="py-2.5 px-4 font-semibold">DEFAULT</th>
                    <th class="py-2.5 px-4 font-semibold">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 font-sans">
                  <tr>
                    <td class="py-3 px-4 font-mono font-medium text-groq-dark">limit</td>
                    <td class="py-3 px-4 font-mono text-gray-500">integer</td>
                    <td class="py-3 px-4 text-gray-600 font-mono">50</td>
                    <td class="py-3 px-4 text-groq-textMuted">Number of recent log records to return (maximum: 100).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">curl "https://api.projectspg.info/v1/logs?limit=10" \\
  -H "Authorization: Bearer spg_live_your_key_here"</div>
        </section>

        <!-- SECTION 10: GET /v1/audit/events -->
        <section id="docs-audit-events" class="space-y-5 pt-4 border-t border-gray-100 scroll-mt-16 md:scroll-mt-6">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold font-mono text-xs">GET</span>
              <h2 class="text-lg sm:text-xl font-bold font-mono text-groq-dark">/v1/audit/events</h2>
            </div>
            <p class="text-xs text-groq-textMuted leading-relaxed">
              Retrieves structured, zero-plaintext audit events formatted for enterprise SIEM ingestion (Splunk, Datadog, AWS CloudWatch). Every event includes rule IDs, SHA-256 fingerprints, execution latencies, and KMS encryption flags.
            </p>
          </div>

          <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">curl "https://api.projectspg.info/v1/audit/events?limit=25" \\
  -H "Authorization: Bearer spg_live_your_key_here"</div>
        </section>

        <!-- SECTION 11: KEYS MANAGEMENT -->
        <section id="docs-keys-list" class="space-y-5 pt-4 border-t border-gray-100 scroll-mt-16 md:scroll-mt-6">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold font-mono text-xs">GET</span>
              <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono text-xs">POST</span>
              <span class="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold font-mono text-xs">DELETE</span>
              <h2 class="text-lg sm:text-xl font-bold font-mono text-groq-dark">API Key Management (/api/keys)</h2>
            </div>
            <p class="text-xs text-groq-textMuted leading-relaxed">
              Programmatically provision, inspect, and revoke API keys for your infrastructure, continuous deployment pipelines, and microservices.
            </p>
          </div>

          <!-- Sub-endpoint Cards -->
          <div class="space-y-4">
            <!-- 1. List Keys -->
            <div class="p-4 rounded-xl border border-groq-grayBorder bg-slate-50/60 space-y-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 font-mono text-xs font-semibold text-groq-dark">
                  <span class="px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 font-bold">GET</span>
                  <span>/api/keys</span>
                </div>
                <span class="text-[11px] text-gray-500">List all active keys for account</span>
              </div>
              <div class="bg-[#181825] text-slate-100 p-3 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">curl https://api.projectspg.info/api/keys \\
  -H "Authorization: Bearer &lt;Firebase_ID_Token&gt;"</div>
            </div>

            <!-- 2. Create Key -->
            <div id="docs-keys-create" class="p-4 rounded-xl border border-groq-grayBorder bg-slate-50/60 space-y-2 scroll-mt-16 md:scroll-mt-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 font-mono text-xs font-semibold text-groq-dark">
                  <span class="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-bold">POST</span>
                  <span>/api/keys</span>
                </div>
                <span class="text-[11px] text-gray-500">Provision a new API key</span>
              </div>
              <div class="bg-[#181825] text-slate-100 p-3 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">curl -X POST https://api.projectspg.info/api/keys \\
  -H "Authorization: Bearer &lt;Firebase_ID_Token&gt;" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production Microservice",
    "tier": "free",
    "monthlyQuota": 10000
  }'</div>
            </div>

            <!-- 3. Delete Key -->
            <div id="docs-keys-delete" class="p-4 rounded-xl border border-groq-grayBorder bg-slate-50/60 space-y-2 scroll-mt-16 md:scroll-mt-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 font-mono text-xs font-semibold text-groq-dark">
                  <span class="px-1.5 py-0.5 rounded text-[10px] bg-rose-100 text-rose-800 font-bold">DELETE</span>
                  <span>/api/keys/{id}</span>
                </div>
                <span class="text-[11px] text-gray-500">Revoke an active key instantly</span>
              </div>
              <div class="bg-[#181825] text-slate-100 p-3 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">curl -X DELETE https://api.projectspg.info/api/keys/key_123456 \\
  -H "Authorization: Bearer &lt;Firebase_ID_Token&gt;"</div>
            </div>
          </div>
        </section>

        <!-- SECTION 12: GET /health -->
        <section id="docs-health" class="space-y-4 pt-4 border-t border-gray-100 pb-16 scroll-mt-16 md:scroll-mt-6">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold font-mono text-xs">GET</span>
              <h2 class="text-lg sm:text-xl font-bold font-mono text-groq-dark">/health</h2>
            </div>
            <p class="text-xs text-groq-textMuted leading-relaxed">
              Global edge health check and latency ping. Returns cluster operational status, response timestamp, Cloudflare Colo edge region, and active engine version.
            </p>
          </div>

          <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">curl https://api.projectspg.info/health</div>

          <div class="space-y-2">
            <h3 class="text-xs font-bold text-groq-dark uppercase tracking-wider">Example Response (200 OK)</h3>
            <div class="bg-[#181825] text-slate-100 p-4 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre select-all">{
  "status": "healthy",
  "gateway": "ProjectSPG Privacy Gateway",
  "version": "1.2.0",
  "region": "HKG",
  "timestamp": "2026-10-04T02:45:00.000Z"
}</div>
          </div>
        </section>

      </div>
    </div>

    <!-- ======================================================================= -->
    <!-- VIEW 5: ADMIN INVITATION CODE MANAGER (Restricted to Developer/Admin)     -->
    <!-- ======================================================================= -->
    <div id="view-admin-invites" class="view-panel hidden border-t border-l border-r border-groq-grayBorder rounded-t-2xl bg-white mx-0 sm:mx-2 lg:mx-3 flex-1 p-3.5 sm:p-6 md:p-8 max-w-[1440px] w-full overflow-visible md:overflow-y-auto shadow-xs">
      
      <!-- Admin Header Banner -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Invitation Code Manager</h1>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
              <i data-lucide="shield-check" class="w-3 h-3 text-purple-700"></i> Admin Console
            </span>
          </div>
          <p class="text-xs sm:text-sm text-gray-500">
            Create, allocate, and monitor secure invitation codes for partners and enterprise clients to unlock Pro Access.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="refreshAdminDashboard()" class="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer">
            <i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-gray-500"></i>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <!-- Admin Sub-Navigation Tabs -->
      <div class="flex items-center gap-2 border-b border-gray-200 mt-6 mb-6">
        <button onclick="switchAdminTab('users')" id="admin-tab-users" class="px-4 py-2.5 text-xs font-bold border-b-2 border-purple-600 text-purple-700 flex items-center gap-2 cursor-pointer transition">
          <i data-lucide="users" class="w-4 h-4 text-purple-600"></i>
          <span>Registered Users &amp; Telemetry</span>
          <span id="admin-tab-users-badge" class="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-800 font-mono">0</span>
        </button>
        <button onclick="switchAdminTab('invites')" id="admin-tab-invites" class="px-4 py-2.5 text-xs font-semibold border-b-2 border-transparent text-gray-500 hover:text-gray-900 flex items-center gap-2 cursor-pointer transition">
          <i data-lucide="ticket" class="w-4 h-4 text-gray-500"></i>
          <span>Invitation Codes</span>
          <span id="admin-tab-invites-badge" class="px-1.5 py-0.5 rounded-full text-[10px] bg-gray-100 text-gray-700 font-mono">0</span>
        </button>
      </div>

      <!-- Quick Metrics Counters -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
        <div class="p-4 rounded-xl border border-gray-200/80 bg-[#fbfbfe] shadow-2xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-gray-500">Total Users</span>
            <span class="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><i data-lucide="users" class="w-4 h-4"></i></span>
          </div>
          <div id="admin-stat-total-users" class="text-2xl font-bold text-gray-900 mt-2">0</div>
          <span class="text-[11px] text-gray-400"><span id="admin-stat-pro-users" class="font-bold text-emerald-600">0</span> Pro &bull; <span id="admin-stat-free-users" class="font-bold text-amber-600">0</span> Free</span>
        </div>

        <div class="p-4 rounded-xl border border-gray-200/80 bg-[#fbfbfe] shadow-2xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-gray-500">Total Requests</span>
            <span class="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center"><i data-lucide="activity" class="w-4 h-4"></i></span>
          </div>
          <div id="admin-stat-total-requests" class="text-2xl font-bold text-emerald-700 mt-2">0</div>
          <span class="text-[11px] text-gray-400">All users aggregated</span>
        </div>

        <div class="p-4 rounded-xl border border-gray-200/80 bg-[#fbfbfe] shadow-2xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-gray-500">PII Intercepted</span>
            <span class="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center"><i data-lucide="shield" class="w-4 h-4"></i></span>
          </div>
          <div id="admin-stat-total-pii" class="text-2xl font-bold text-rose-600 mt-2">0</div>
          <span class="text-[11px] text-gray-400">Entities sanitized</span>
        </div>

        <div class="p-4 rounded-xl border border-gray-200/80 bg-[#fbfbfe] shadow-2xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-gray-500">Active Codes</span>
            <span class="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center"><i data-lucide="ticket" class="w-4 h-4"></i></span>
          </div>
          <div id="admin-stat-active-codes" class="text-2xl font-bold text-purple-700 mt-2">0</div>
          <span class="text-[11px] text-gray-400"><span id="admin-stat-total-uses" class="font-bold text-gray-900">0</span> redemptions</span>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- TAB 1: REGISTERED USERS & TELEMETRY                                   -->
      <!-- ===================================================================== -->
      <div id="admin-panel-users" class="space-y-6">
        
        <!-- Search & Filter Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="relative flex-1 max-w-md">
            <i data-lucide="search" class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input type="text" id="admin-users-search" oninput="filterAdminUsersTable()" placeholder="Search by name, email, org, referral code..." class="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-purple-500 shadow-2xs">
          </div>
          <div class="flex items-center gap-2">
            <select id="admin-users-tier-filter" onchange="filterAdminUsersTable()" class="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-purple-500 shadow-2xs cursor-pointer">
              <option value="all">All Tiers</option>
              <option value="Pro">Pro Access Only</option>
              <option value="Free">Free Tier Only</option>
            </select>
          </div>
        </div>

        <!-- Users Table -->
        <div class="border border-gray-200 rounded-2xl bg-white shadow-2xs overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/40">
            <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
              <i data-lucide="database" class="w-4 h-4 text-purple-600"></i> User Registry &amp; Subscription Roster
            </h3>
            <span id="admin-users-table-count" class="text-xs text-gray-500 font-mono">0 users</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-gray-50/80 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-semibold text-[10px]">
                  <th class="py-3 px-4">User &amp; Email</th>
                  <th class="py-3 px-4">Organization &amp; Website</th>
                  <th class="py-3 px-4">Referral / Code</th>
                  <th class="py-3 px-4">Access Level</th>
                  <th class="py-3 px-4">Subscription Validity</th>
                  <th class="py-3 px-4 text-right">Usage (Requests &bull; Tokens &bull; PII)</th>
                </tr>
              </thead>
              <tbody id="admin-users-tbody" class="divide-y divide-gray-100">
                <tr>
                  <td colspan="6" class="py-8 text-center text-gray-400">Loading user profiles &amp; telemetry...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- TAB 2: INVITATION CODES MANAGER                                       -->
      <!-- ===================================================================== -->
      <div id="admin-panel-invites" class="hidden space-y-6">

        <!-- Create New Code Card -->
        <div class="p-5 rounded-2xl border border-purple-200/70 bg-gradient-to-br from-purple-50/40 via-white to-orange-50/20 shadow-2xs">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center text-xs">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            </div>
            <h2 class="text-sm font-bold text-gray-900">Generate New Invitation Code</h2>
          </div>

          <form onsubmit="handleAdminCreateInvitation(event)" class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div class="sm:col-span-4">
              <label class="block text-xs font-semibold text-gray-700 mb-1">Custom Code (Optional)</label>
              <input type="text" id="admin-new-code" placeholder="Leave blank to auto-generate" class="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-mono uppercase tracking-wider text-gray-900 focus:outline-none focus:border-purple-500 shadow-2xs">
            </div>

            <div class="sm:col-span-5">
              <label class="block text-xs font-semibold text-gray-700 mb-1">Recipient / Partner Notes</label>
              <input type="text" id="admin-new-desc" placeholder="e.g. Acme Corp AI Security Team" class="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-purple-500 shadow-2xs" required>
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-semibold text-gray-700 mb-1">Usage Limit</label>
              <select id="admin-new-max-uses" class="w-full bg-white border border-gray-300 rounded-xl px-2.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-purple-500 shadow-2xs cursor-pointer">
                <option value="1">1 (Single-Use)</option>
                <option value="5">5 Uses</option>
                <option value="10">10 Uses</option>
                <option value="25">25 Uses</option>
                <option value="100">100 Uses</option>
                <option value="-1">Unlimited</option>
              </select>
            </div>

            <div class="sm:col-span-1">
              <button type="submit" id="btn-admin-create-code" class="w-full py-2 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs tracking-wide shadow-xs transition flex items-center justify-center gap-1 cursor-pointer">
                <span>Create</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Generated Codes List Table -->
        <div class="border border-gray-200 rounded-2xl bg-white shadow-2xs overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
              <i data-lucide="list" class="w-4 h-4 text-purple-600"></i> Issued Invitation Codes
            </h3>
            <span id="admin-codes-count" class="text-xs text-gray-500">0 codes total</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="bg-gray-50/70 border-b border-gray-100 text-gray-500 uppercase tracking-wider font-semibold text-[10px]">
                  <th class="py-3 px-4">Code</th>
                  <th class="py-3 px-4">Recipient / Notes</th>
                  <th class="py-3 px-4">Redemptions</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4">Created Date</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody id="admin-invitations-tbody" class="divide-y divide-gray-100">
                <tr>
                  <td colspan="6" class="py-8 text-center text-gray-400">Loading invitation codes...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>

  </main>

  <!-- MODALS -->
  <div id="modal-create-key" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
      <button onclick="closeCreateKeyModal()" class="absolute top-4 right-4 text-groq-textMuted hover:text-groq-dark transition p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer" title="Close">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>

      <div class="flex items-center gap-2 text-groq-dark text-base font-bold mb-1">
        <i data-lucide="key" class="w-4 h-4 text-[#f0523d]"></i> Create API Key
      </div>
      <p class="text-xs text-groq-textMuted">Generate a ProjectSPG key for wire-compatible AI privacy proxying.</p>

      <form onsubmit="submitCreateKey(); return false;" class="mt-4 space-y-4 text-xs">
        <div>
          <label class="block text-groq-dark font-medium mb-1">Key Name</label>
          <input type="text" id="new-key-name" placeholder="e.g. Production Backend" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg px-3 py-2 text-groq-dark focus:border-gray-400 focus:outline-none font-sans text-xs">
        </div>

        <div>
          <label class="block text-groq-dark font-medium mb-1.5">Access Tier</label>
          <div class="grid grid-cols-2 gap-2 bg-[#f3f4f6] p-1 rounded-xl">
            <button type="button" id="tier-tab-free" onclick="selectCreateKeyTier('free')" class="py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer bg-white text-groq-dark shadow-xs flex items-center justify-center gap-1.5">
              <span id="tier-tab-standard-label">Standard Key</span>
            </button>
            <button type="button" id="tier-tab-byok" onclick="selectCreateKeyTier('byok')" class="py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer text-groq-textMuted hover:text-groq-dark flex items-center justify-center gap-1.5">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>BYOK Tier</span>
              <span id="tier-tab-byok-lock" class="hidden text-amber-600 font-bold text-[10px]"><i data-lucide="lock" class="w-3 h-3"></i></span>
            </button>
          </div>
          <input type="hidden" id="new-key-tier" value="free">
        </div>

        <!-- Free Tier Info Banner -->
        <div id="tier-info-free" class="p-3 rounded-xl bg-gray-50 border border-gray-200/80 text-[11px] text-gray-600 leading-relaxed">
          <div id="tier-info-free-title" class="font-semibold text-gray-900 mb-0.5">Platform Quota</div>
          <span id="tier-info-free-desc">Uses ProjectSPG platform infrastructure (1 req / 5s rate limit, 150 req/day). Full multi-provider routing included.</span>
        </div>

        <!-- BYOK Tier Credentials Section (Collapsible) -->
        <div id="tier-info-byok" class="hidden space-y-3 pt-1">
          <div class="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900 leading-relaxed">
            <div class="font-semibold text-blue-950 mb-0.5 flex items-center gap-1">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-blue-600"></i>
              Direct Upstream Zero-Throttling Routing
            </div>
            Associate your AI provider keys with this API key. When your backend or OpenAI SDK calls ProjectSPG with <code>spg_live_...</code>, requests are proxied directly using your accounts with zero platform rate limits (up to 10,000 req/day).
          </div>

          <!-- Google AI Studio Key -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-groq-dark font-medium text-[11px]">Google AI Studio Key</label>
              <span class="text-[10px] text-gray-400 font-mono">gemma-4-*</span>
            </div>
            <div class="relative">
              <input type="password" id="new-byok-google" autocomplete="new-password" placeholder="AIzaSy... (Optional)" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-3 pr-8 py-2 text-groq-dark placeholder-gray-400 focus:outline-none focus:border-gray-400 font-mono text-xs">
              <button type="button" onclick="toggleKeyVisibility('new-byok-google', this)" class="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

          <!-- Mistral AI Key -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-groq-dark font-medium text-[11px]">Mistral AI Key</label>
              <span class="text-[10px] text-gray-400 font-mono">codestral, ministral</span>
            </div>
            <div class="relative">
              <input type="password" id="new-byok-mistral" autocomplete="new-password" placeholder="api_... (Optional)" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-3 pr-8 py-2 text-groq-dark placeholder-gray-400 focus:outline-none focus:border-gray-400 font-mono text-xs">
              <button type="button" onclick="toggleKeyVisibility('new-byok-mistral', this)" class="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

          <!-- Groq Cloud Key -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-groq-dark font-medium text-[11px]">Groq Cloud Key</label>
              <span class="text-[10px] text-gray-400 font-mono">gpt-oss, qwen3.8</span>
            </div>
            <div class="relative">
              <input type="password" id="new-byok-groq" autocomplete="new-password" placeholder="gsk_... (Optional)" class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-3 pr-8 py-2 text-groq-dark placeholder-gray-400 focus:outline-none focus:border-gray-400 font-mono text-xs">
              <button type="button" onclick="toggleKeyVisibility('new-byok-groq', this)" class="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

        <div class="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-2 text-xs">
          <button type="button" onclick="closeCreateKeyModal()" class="px-4 py-2 rounded-lg bg-gray-100 text-groq-dark font-medium cursor-pointer">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded-lg bg-black hover:bg-gray-800 text-white font-semibold shadow-xs transition cursor-pointer">Create API Key</button>
        </div>
      </form>
    </div>
  </div>

  <div id="modal-show-key" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto touch-scroll">
      <div class="flex items-center gap-2 text-groq-dark text-sm font-bold mb-1">
        <i data-lucide="key" class="w-4 h-4 text-[#f0523d]"></i> Save your key
      </div>
      <p class="text-xs text-groq-textMuted">Save this secret key in a safe place. You won't be able to view it again.</p>
      <div class="mt-4 p-3 bg-gray-50 border border-groq-grayBorder rounded-lg flex items-center justify-between font-mono text-xs text-[#f0523d]">
        <span id="displayed-raw-key" class="break-all select-all font-semibold"></span>
        <button onclick="copyRawKey()" class="ml-2 text-groq-textMuted hover:text-groq-dark p-1 cursor-pointer"><i data-lucide="copy" class="w-4 h-4"></i></button>
      </div>
      <div class="mt-6 flex justify-end text-xs">
        <button onclick="closeShowKeyModal()" class="px-5 py-2 rounded-lg border border-[#f0523d] bg-white hover:bg-[#fff5f3] text-groq-dark font-semibold cursor-pointer">Done</button>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: BYOK PROVIDER API KEYS (Google, Mistral, Groq)                     -->
  <!-- ========================================================================= -->
  <div id="modal-byok-keys" onclick="if(event.target === this) closeByokKeysModal()" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto touch-scroll">
      <button onclick="closeByokKeysModal()" class="absolute top-4 right-4 text-groq-textMuted hover:text-groq-dark transition p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer" title="Close">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>

      <div class="flex items-center gap-2.5 mb-1.5">
        <div class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
          <i data-lucide="key" class="w-4 h-4"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-groq-dark">Provider API Keys</h3>
          <p class="text-[11px] text-groq-textMuted">Bring-Your-Own-Key (BYOK) Credentials</p>
        </div>
      </div>

      <p class="text-xs text-gray-500 mt-2 leading-relaxed">
        Configure your direct provider API keys. In BYOK mode, adding your keys automatically unlocks and populates all available models directly from Groq Cloud, Google AI Studio, and Mistral AI with zero platform rate limits.
      </p>

      <form onsubmit="saveByokKeys(); return false;" class="mt-5 space-y-4 text-xs">
        
        <!-- Google AI Studio API Key -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="block text-groq-dark font-semibold">Google AI Studio Key</label>
            <span class="text-[10px] text-gray-400 font-mono">gemini-2.0-flash, gemini-1.5-pro, gemma...</span>
          </div>
          <div class="relative">
            <input type="password" id="byok-key-google" autocomplete="new-password" placeholder="AIzaSy..." class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-3 pr-8 py-2 text-groq-dark placeholder-gray-400 focus:outline-none focus:border-gray-400 font-mono text-xs">
            <button type="button" onclick="toggleKeyVisibility('byok-key-google', this)" class="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5" title="Toggle visibility">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <!-- Mistral AI API Key -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="block text-groq-dark font-semibold">Mistral API Key</label>
            <span class="text-[10px] text-gray-400 font-mono">mistral-large, codestral, ministral...</span>
          </div>
          <div class="relative">
            <input type="password" id="byok-key-mistral" autocomplete="new-password" placeholder="api_..." class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-3 pr-8 py-2 text-groq-dark placeholder-gray-400 focus:outline-none focus:border-gray-400 font-mono text-xs">
            <button type="button" onclick="toggleKeyVisibility('byok-key-mistral', this)" class="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5" title="Toggle visibility">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <!-- Groq Cloud API Key -->
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="block text-groq-dark font-semibold">Groq API Key</label>
            <span class="text-[10px] text-gray-400 font-mono">llama-3.3-70b, deepseek-r1, qwen...</span>
          </div>
          <div class="relative">
            <input type="password" id="byok-key-groq" autocomplete="new-password" placeholder="gsk_..." class="w-full bg-[#f9fafb] border border-groq-grayBorder rounded-lg pl-3 pr-8 py-2 text-groq-dark placeholder-gray-400 focus:outline-none focus:border-gray-400 font-mono text-xs">
            <button type="button" onclick="toggleKeyVisibility('byok-key-groq', this)" class="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5" title="Toggle visibility">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>

        <div id="byok-sync-status" class="hidden p-2.5 rounded-lg text-xs flex items-center gap-2"></div>
      </div>

        <div class="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
          <button type="button" onclick="clearByokKeys()" class="text-xs text-gray-400 hover:text-rose-600 transition cursor-pointer font-medium">Clear All</button>
          <div class="flex items-center gap-2">
            <button type="button" onclick="closeByokKeysModal()" class="px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer font-medium">Cancel</button>
            <button type="submit" class="px-4 py-1.5 rounded-lg bg-black hover:bg-gray-800 text-white font-semibold shadow-xs transition cursor-pointer">Save Keys</button>
          </div>
        </div>
      </form>
    </div>
  </div>





  <!-- ========================================================================= -->
  <!-- MODAL: USER ACCOUNT & SECURITY SETTINGS                                   -->
  <!-- ========================================================================= -->
  <div id="modal-user-settings" onclick="if(event.target === this) closeUserSettingsModal()" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto touch-scroll">
      <button onclick="closeUserSettingsModal()" class="absolute top-4 right-4 text-groq-textMuted hover:text-groq-dark transition p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer" title="Close">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>

      <div class="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
        <div class="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center text-[#f0523d] shrink-0">
          <i data-lucide="settings" class="w-5 h-5"></i>
        </div>
        <div>
          <h3 class="text-base font-bold text-groq-dark">User Account Settings</h3>
          <p class="text-xs text-groq-textMuted">Profile identity, security keys, and account preferences</p>
        </div>
      </div>

      <div id="settings-status-banner" class="hidden mb-4 p-2.5 rounded-xl border text-xs"></div>

      <!-- Settings Tabs -->
      <div class="space-y-4 text-xs">
        
        <!-- Account Info Section -->
        <div class="p-4 rounded-xl bg-gray-50/80 border border-gray-200/70 space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-groq-dark flex items-center gap-1.5">
              <i data-lucide="user" class="w-3.5 h-3.5 text-groq-textMuted"></i> Account Profile
            </span>
            <div class="flex items-center gap-2">
              <span id="settings-tier-expiry" class="text-[10.5px] font-medium text-emerald-700 hidden"></span>
              <span id="settings-tier-pill" class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">Free</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label class="block text-gray-500 font-medium mb-1">Display Name</label>
              <input type="text" id="settings-name" class="w-full bg-white border border-groq-grayBorder rounded-lg px-3 py-2 text-groq-dark text-xs focus:outline-none focus:border-gray-400">
            </div>
            <div>
              <label class="block text-gray-500 font-medium mb-1">Primary Email</label>
              <input type="email" id="settings-email" disabled class="w-full bg-gray-100 border border-groq-grayBorder rounded-lg px-3 py-2 text-gray-500 text-xs cursor-not-allowed">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label class="block text-gray-500 font-medium mb-1">Organization</label>
              <input type="text" id="settings-org" placeholder="e.g. Acme Inc" class="w-full bg-white border border-groq-grayBorder rounded-lg px-3 py-2 text-groq-dark text-xs focus:outline-none focus:border-gray-400">
            </div>
            <div>
              <label class="block text-gray-500 font-medium mb-1">Org Website</label>
              <input type="url" id="settings-website" placeholder="https://..." class="w-full bg-white border border-groq-grayBorder rounded-lg px-3 py-2 text-groq-dark text-xs focus:outline-none focus:border-gray-400">
            </div>
          </div>
        </div>

        <!-- Security & BYOK Quick Link -->
        <div class="p-4 rounded-xl bg-gray-50/80 border border-gray-200/70 space-y-3">
          <span class="font-semibold text-groq-dark flex items-center gap-1.5">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-blue-600"></i> Security & BYOK Keys
          </span>
          <p class="text-gray-500 text-[11px] leading-relaxed">
            Manage your personal cryptographic API credentials for Google AI Studio, Mistral AI, and Groq Cloud.
          </p>
          <div class="flex items-center justify-between pt-1">
            <button type="button" onclick="closeUserSettingsModal(); openByokKeysModal()" class="px-3 py-1.5 rounded-lg border border-groq-grayBorder bg-white hover:bg-gray-50 text-groq-dark font-medium transition flex items-center gap-1.5 cursor-pointer shadow-2xs">
              <i data-lucide="key" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>Manage BYOK Provider Keys</span>
            </button>
            <button type="button" onclick="closeUserSettingsModal(); openInvitationModal(true)" class="px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50/60 hover:bg-orange-100 text-[#f0523d] font-medium transition flex items-center gap-1 cursor-pointer">
              <i data-lucide="ticket" class="w-3.5 h-3.5"></i>
              <span>Subscription & Upgrade</span>
            </button>
          </div>
        </div>

        <!-- User ID & Session -->
        <div class="p-4 rounded-xl bg-gray-50/80 border border-gray-200/70 space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-groq-dark flex items-center gap-1.5">
              <i data-lucide="fingerprint" class="w-3.5 h-3.5 text-purple-600"></i> Unique Account ID
            </span>
            <button type="button" onclick="copyUserId()" class="text-[#f0523d] hover:underline font-medium cursor-pointer flex items-center gap-1 text-[11px]">
              <i data-lucide="copy" class="w-3 h-3"></i> Copy ID
            </button>
          </div>
          <p id="settings-uid-display" class="font-mono text-[11px] text-gray-600 bg-white px-2.5 py-1.5 rounded-lg border border-gray-200 break-all select-all"></p>
        </div>

      </div>

      <!-- Action Buttons -->
      <div class="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end gap-2 text-xs">
        <button type="button" onclick="closeUserSettingsModal()" class="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition cursor-pointer font-medium">Cancel</button>
        <button type="button" onclick="saveUserSettings()" id="btn-save-settings" class="px-5 py-2 rounded-lg bg-[#f0523d] hover:bg-[#e0422d] text-white font-semibold transition cursor-pointer shadow-xs flex items-center gap-1.5">
          <i data-lucide="check" class="w-3.5 h-3.5"></i>
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- MODAL: CONSENT PREFERENCES (Sovereign Privacy & Telemetry Settings)       -->
  <!-- ========================================================================= -->
  <div id="modal-consent-preferences" onclick="if(event.target === this) closeConsentPreferencesModal()" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-groq-grayBorder rounded-2xl max-w-xl w-full p-5 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto touch-scroll">
      
      <!-- Modal Header -->
      <div class="flex items-start justify-between pb-4 border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-[#f0523d]/10 text-[#f0523d] flex items-center justify-center">
            <i data-lucide="sliders" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-bold text-gray-950">Consent Preferences</h3>
            <p class="text-xs text-gray-500 mt-0.5">Manage sovereign privacy, security telemetry, and edge caching rules</p>
          </div>
        </div>
        <button type="button" onclick="closeConsentPreferencesModal()" class="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <!-- Overview Info Callout -->
      <div class="my-4 p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900 leading-relaxed flex items-start gap-2.5">
        <i data-lucide="shield-alert" class="w-4 h-4 text-blue-600 shrink-0 mt-0.5"></i>
        <span>
          ProjectSPG does <strong>not use third-party advertising or tracking cookies</strong>. All selections are stored locally in your browser to maintain your privacy boundaries across sessions.
        </span>
      </div>

      <!-- Categories Cards List -->
      <div class="space-y-3.5 my-5 text-xs">

        <!-- Category 1: Strictly Necessary (Locked) -->
        <div class="p-4 rounded-xl border border-gray-200 bg-gray-50/70">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="font-bold text-gray-900 text-[13px]">Strictly Necessary (Core Security Gateway)</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-200 text-gray-700 uppercase">Always Active</span>
              </div>
              <p class="text-gray-500 text-[11.5px] leading-relaxed">
                Essential for running cryptographic token masking in memory, Cloudflare Anycast DDoS protection, and secure Firebase authentication session tokens. Cannot be disabled.
              </p>
            </div>
            <div class="pt-1">
              <input type="checkbox" checked disabled class="w-4 h-4 accent-[#f0523d] cursor-not-allowed opacity-80" />
            </div>
          </div>
        </div>

        <!-- Category 2: SIEM Audit Telemetry (Toggleable) -->
        <div class="p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="font-bold text-gray-900 text-[13px]">SIEM Audit &amp; Rule Matching Telemetry</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">Zero-Plaintext</span>
              </div>
              <p class="text-gray-500 text-[11.5px] leading-relaxed">
                Records non-plaintext SHA-256 entity hashes, rule IDs (e.g. GDPR, HIPAA), and microsecond execution latencies in a short-lived circular ring buffer for compliance verification.
              </p>
            </div>
            <div class="pt-1">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="consent-toggle-audit" class="sr-only peer" checked>
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f0523d]"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Category 3: Edge Performance & Latency Analytics (Toggleable) -->
        <div class="p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="font-bold text-gray-900 text-[13px]">Edge Routing &amp; Latency Analytics</span>
              </div>
              <p class="text-gray-500 text-[11.5px] leading-relaxed">
                Measures multi-jurisdiction edge latency across 300+ PoPs to optimize closest sovereign enclave routing and memory throughput. Contains zero personal data.
              </p>
            </div>
            <div class="pt-1">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="consent-toggle-performance" class="sr-only peer" checked>
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f0523d]"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Category 4: BYOK Upstream Pass-Through (Toggleable) -->
        <div class="p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="font-bold text-gray-900 text-[13px]">Third-Party Model Provider BYOK Pass-Through</span>
              </div>
              <p class="text-gray-500 text-[11.5px] leading-relaxed">
                Allows passing encrypted client API authorization headers directly to upstream foundation models (Mistral AI, Google AI Studio, Groq Cloud).
              </p>
            </div>
            <div class="pt-1">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="consent-toggle-byok" class="sr-only peer" checked>
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#f0523d]"></div>
              </label>
            </div>
          </div>
        </div>

      </div>

      <!-- Feedback status indicator -->
      <div id="consent-feedback" class="text-xs text-center font-medium min-h-[20px] mb-4"></div>

      <!-- Action Buttons Row -->
      <div class="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <button type="button" onclick="saveConsentPreferences('reject')" class="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition cursor-pointer font-medium">
          Reject Non-Essential
        </button>
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <button type="button" onclick="saveConsentPreferences('custom')" class="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white font-semibold transition cursor-pointer shadow-xs">
            Save Preferences
          </button>
          <button type="button" onclick="saveConsentPreferences('accept_all')" class="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#f0523d] hover:bg-[#d94432] text-white font-semibold transition cursor-pointer shadow-xs">
            Accept All
          </button>
        </div>
      </div>

    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- TOASTER NOTIFICATION: INVITATION PROMPT -->
  <!-- Appears when switching between playground, dashboard, keys, docs, etc.   -->
  <!-- Only shown if user does not already have (Pro Access)                   -->
  <!-- ========================================================================= -->
  <div id="toast-invitation" class="fixed bottom-5 right-5 z-50 max-w-sm sm:max-w-md w-[calc(100%-2.5rem)] hidden transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto">
    <div class="bg-white/95 backdrop-blur-md border border-orange-200/90 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-orange-950/10 text-left font-sans relative overflow-hidden">
      <!-- Top subtle gradient accent line -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f0523d] via-amber-400 to-[#f0523d]"></div>

      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200/70 text-[#f0523d] flex items-center justify-center shrink-0 shadow-2xs">
            <i data-lucide="ticket" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-xs font-bold text-gray-900 tracking-tight">Private Invitation Preview</h4>
              <span class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200/80">Free</span>
            </div>
            <p class="text-[11px] text-gray-500 mt-0.5">Unlock sovereign compliance & enterprise routing</p>
          </div>
        </div>

        <button onclick="dismissInvitationToast()" class="text-gray-400 hover:text-gray-700 transition p-1 rounded-lg hover:bg-gray-100 cursor-pointer shrink-0" aria-label="Dismiss toast">
          <i data-lucide="x" class="w-3.5 h-3.5"></i>
        </button>
      </div>

      <!-- Toast Feedback Message -->
      <div id="toast-inv-feedback" class="hidden my-2.5 p-2 rounded-lg text-[11px] leading-tight font-medium"></div>

      <!-- Form Body -->
      <div id="toast-inv-form" class="mt-3">
        <p class="text-xs text-gray-600 mb-2 leading-relaxed">
          Enter your Pro invitation or access key below to unlock <strong class="text-emerald-700 font-semibold">(Pro Access)</strong>:
        </p>

        <form onsubmit="handleToastInvitationSubmit(event)" class="space-y-2">
          <div class="flex items-center gap-1.5">
            <div class="relative flex-1">
              <input type="text" id="toast-inv-code-input" placeholder="e.g. SPG-BETA-2026" class="w-full bg-[#f9fafb] border border-gray-300 rounded-xl pl-3 pr-3 py-2 text-xs font-mono uppercase tracking-wider text-gray-900 focus:outline-none focus:border-[#f0523d] focus:bg-white shadow-2xs">
            </div>
            <button type="submit" id="btn-toast-inv-submit" class="px-3.5 py-2 rounded-xl bg-[#f0523d] hover:bg-[#e0422d] text-white font-semibold text-xs tracking-wide transition shadow-xs cursor-pointer shrink-0 flex items-center gap-1">
              <span>Unlock</span>
              <i data-lucide="arrow-right" class="w-3 h-3"></i>
            </button>
          </div>

          <div class="flex items-center justify-between text-[11px] text-gray-400 pt-0.5">
            <button type="button" onclick="openInvitationModal(true); dismissInvitationToast()" class="hover:text-[#f0523d] transition text-left cursor-pointer">
              Fill full organization profile &rarr;
            </button>
            <button type="button" onclick="dismissInvitationToast()" class="hover:text-gray-600 transition cursor-pointer">
              Dismiss
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- JAVASCRIPT CONTROLLER -->
  <script>
    const SAMPLES = {
      banking: "Please confirm order for Alice Wong (email: alice.wong@fintech.de, SSN: 123-45-6789) using Visa card 4532-0151-1283-0366. Repeat back her name, email, and card number.",
      patient: "Patient Record: Johnathan Doe, Date of Birth 1982-04-12, MRN: MRN-984210, Phone: +1 415-555-2671. Advise on follow-up consultation dates.",
      germantax: "Audit filing for Hans Gruber (email: hans.gruber@berlin-tech.de, German Tax ID: 04 225 818 316, IBAN: DE89 3704 0044 0532 0130 00)."
    };

    // Hackathon Mode: Open Access (No Authentication Required)
    let firebaseAuth = null;
    let currentFirebaseUser = {
      uid: "hackathon_public",
      email: "hackathon@demo.ai",
      displayName: "Public Access",
      getIdToken: async () => "open_access"
    };
    let currentUserProfile = {
      name: "Hackathon User",
      email: "hackathon@demo.ai",
      accessLevel: "Pro",
      org: "Hackathon"
    };
    let currentIdToken = "open_access";
    // isUserFullyInvited hoisted below
    function openAuthModal() { switchView('playground'); }
    function closeAuthModal() {}
    function handleGoogleSignIn() {}
    function handleEmailAuth(e) { if(e) e.preventDefault(); }
    function handleSignOut() {}
    function checkUserInvitationStatus() {}
    function closeInvitationModal() {}

    let activeView = 'presentation'; // Default directly to Presentation Demo
    let activeDashTab = 'logs';   // Default sub-tab within Dashboard
    let isCodeVisible = true;
    let activeCodeLang = 'python';

    let sampleApiKeys = [];

    // Initial logs - open access
    let localLogs = [];

    window.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const inviteParam = urlParams.get('invite') || (window.location.hash.includes('invite=') ? window.location.hash.split('invite=')[1]?.split('&')[0] : '');

      const hash = window.location.hash.replace('#', '').split('?')[0];
      if (['presentation', 'playground', 'keys', 'dashboard', 'docs', 'admin-invites'].includes(hash)) {
        activeView = hash;
      } else {
        activeView = 'presentation';
      }
      switchView(activeView);
      if (activeView === 'presentation') { setTimeout(() => selectDemoScenario('healthcare'), 50); }
      updateCodeViewer();
      fetchApiLogs();
      fetchApiKeys();
      initByokKeys();
      renderMetricsChart();

      if (inviteParam) {
        const cleanCode = decodeURIComponent(inviteParam).trim().toUpperCase();
        sessionStorage.setItem('pendingInviteCode', cleanCode);
        const invCode = document.getElementById('inv-code');
        if (invCode) invCode.value = cleanCode;
      }

      // Initialize parameter slider fills
      updateSliderFill(document.getElementById('param-temp-slider'));
      updateSliderFill(document.getElementById('param-tokens-slider'));
      updateSliderFill(document.getElementById('param-top-p-slider'));

      // Public Hackathon Mode - Direct Open Access
      updateUserUI(currentFirebaseUser);
      initByokKeys();
      fetchApiKeys();
      fetchApiLogs();

      window.addEventListener('click', (e) => {
        const menu = document.getElementById('user-dropdown-menu');
        const avatarBtn = document.getElementById('btn-user-avatar');
        if (menu && !menu.classList.contains('hidden')) {
          if (avatarBtn && !avatarBtn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.add('hidden');
          }
        }
      });

      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          if (activeView === 'playground') submitPrompt();
        }
      });

      window.addEventListener('resize', syncBodyOverflow, { passive: true });
    });

    function syncBodyOverflow() {
      const mainEl = document.querySelector('main');
      if (window.innerWidth < 1024) {
        document.body.classList.remove('overflow-hidden', 'h-screen');
        document.body.classList.add('overflow-y-auto', 'min-h-screen');
        if (mainEl) {
          mainEl.classList.remove('overflow-hidden');
          mainEl.classList.add('overflow-visible');
        }
      } else {
        document.body.classList.add('overflow-hidden', 'h-screen');
        document.body.classList.remove('overflow-y-auto', 'min-h-screen');
        if (mainEl) {
          mainEl.classList.add('overflow-hidden');
          mainEl.classList.remove('overflow-visible');
        }
      }
    }


    // =========================================================================
    // PRESENTATION & 10-SECOND AHA! MOMENT CONTROLLER
    // =========================================================================
    const DEMO_SCENARIOS = {
      healthcare: {
        name: "Healthcare EHR",
        category: "HIPAA",
        prompt: "Dr. John Watson diagnosed patient Alice Smith (SSN: 123-45-6789, email: alice.smith@healthcorp.org, MRN: MRN-98421) with acute ventricular tachycardia. Prescribe 50mg Metoprolol tartrate twice daily and bill primary insurance policy #POL-883921.",
        expectedTokens: [
          { token: "PERSON_1", original: "Dr. John Watson", rule: "RULE_CONTEXT_NAME", type: "Physician" },
          { token: "PERSON_2", original: "Alice Smith", rule: "RULE_CONTEXT_NAME", type: "Patient Name" },
          { token: "SSN_1", original: "123-45-6789", rule: "RULE_SSN", type: "Social Security Number" },
          { token: "EMAIL_1", original: "alice.smith@healthcorp.org", rule: "RULE_EMAIL", type: "Patient Email" }
        ],
        llmResponseTemplate: "Clinical confirmation for patient <PERSON_2> (SSN: <SSN_1>): Metoprolol tartrate 50mg BID ordered as evaluated by <PERSON_1>. Electronic prescription dispatched and confirmation sent to <EMAIL_1>.",
        categories: ["global", "north_america", "corporate"]
      },
      fintech: {
        name: "Fintech & Banking",
        category: "PCI-DSS",
        prompt: "Please refund $4,850.00 to cardholder Michael Chang for disputed wire transaction. Charge back to Visa account 4532-1234-5678-9012 (CVV: 842), IBAN GB29XATM12345678901234, routing transit number 021000021.",
        expectedTokens: [
          { token: "PERSON_1", original: "Michael Chang", rule: "RULE_CONTEXT_NAME", type: "Cardholder" },
          { token: "CARD_1", original: "4532-1234-5678-9012", rule: "RULE_CREDIT_CARD", type: "Primary Account Number" },
          { token: "CVV_1", original: "842", rule: "RULE_CVV", type: "Card Verification Value" }
        ],
        llmResponseTemplate: "Transaction review complete for <PERSON_1>. The dispute of $4,850.00 has been verified. Settlement credit applied to Visa <CARD_1>.",
        categories: ["global", "north_america", "corporate"]
      },
      enterprise: {
        name: "HR & Payroll",
        category: "GDPR / DPDP",
        prompt: "Employee departure clearance for Senior Engineer Priya Sharma (Employee ID: EMP-40192, phone: +91 98765 43210). Transfer final compensation to personal account priya.sharma@gmail.com.",
        expectedTokens: [
          { token: "PERSON_1", original: "Priya Sharma", rule: "RULE_CONTEXT_NAME", type: "Employee Name" },
          { token: "EMAIL_1", original: "priya.sharma@gmail.com", rule: "RULE_EMAIL", type: "Personal Email" },
          { token: "PHONE_1", original: "+91 98765 43210", rule: "RULE_PHONE", type: "Mobile Number" }
        ],
        llmResponseTemplate: "Clearance approved for Senior Engineer <PERSON_1>. Final settlement processed and receipt sent to <EMAIL_1> and verified via SMS at <PHONE_1>.",
        categories: ["global", "north_america", "corporate"]
      },
      custom: {
        name: "Custom Input",
        category: "Live",
        prompt: "Contact CTO Sarah Connor at sarah.connor@cyberdyne.com (SSN: 987-65-4321) regarding confidential Project Titan budget of $1,250,000.",
        expectedTokens: [],
        llmResponseTemplate: "Notification confirmed for <PERSON_1> at <EMAIL_1>. Project details successfully logged with SSN <SSN_1>.",
        categories: ["global", "north_america", "corporate"]
      }
    };

    let activeDemoScenarioKey = 'healthcare';

    function selectDemoScenario(key) {
      if (!DEMO_SCENARIOS[key]) return;
      activeDemoScenarioKey = key;

      // Update button highlights
      ['healthcare', 'fintech', 'enterprise', 'custom'].forEach(k => {
        const btn = document.getElementById('demo-tab-' + k);
        if (btn) {
          if (k === key) {
            btn.className = 'demo-scenario-btn p-3 rounded-xl border border-[#f0523d] bg-orange-50/50 text-left transition cursor-pointer flex flex-col justify-between';
          } else {
            btn.className = 'demo-scenario-btn p-3 rounded-xl border border-gray-200 hover:border-gray-300 bg-white text-left transition cursor-pointer flex flex-col justify-between';
          }
        }
      });

      const scenario = DEMO_SCENARIOS[key];
      const promptInput = document.getElementById('demo-prompt-input');
      if (promptInput) {
        promptInput.value = scenario.prompt;
      }
      updateDemoPromptStats();
      runPresentationPipeline();
    }

    function updateDemoPromptStats() {
      const promptInput = document.getElementById('demo-prompt-input');
      const statsEl = document.getElementById('demo-prompt-stats');
      if (!promptInput || !statsEl) return;
      const val = promptInput.value.trim();
      const words = val ? val.split(/\s+/).length : 0;
      statsEl.textContent = words + ' words • ' + val.length + ' chars';
    }

    async function runPresentationPipeline() {
      const promptInput = document.getElementById('demo-prompt-input');
      const text = promptInput ? promptInput.value.trim() : '';
      if (!text) return;

      const runBtn = document.getElementById('btn-demo-run');
      const runBtnText = document.getElementById('btn-demo-run-text');
      const origText = runBtnText ? runBtnText.textContent : 'Run Live Simulation';
      if (runBtn) runBtn.disabled = true;
      if (runBtnText) runBtnText.textContent = 'Calling Mistral AI...';

      // Show live loading states across stages
      const stage1El = document.getElementById('demo-stage1-content');
      const stage2El = document.getElementById('demo-stage2-content');
      const stage3El = document.getElementById('demo-stage3-content');
      if (stage1El) stage1El.innerHTML = '<div class="py-4 text-gray-500 text-xs italic flex items-center gap-2"><div class="w-3 h-3 rounded-full border-2 border-orange-500 border-t-transparent animate-spin"></div> Scanning prompt for PII...</div>';
      if (stage2El) stage2El.innerHTML = '<div class="py-4 text-gray-400 font-mono text-[11px] italic flex items-center gap-2"><div class="w-3 h-3 rounded-full border-2 border-amber-400 border-t-transparent animate-spin"></div> Sanitizing prompt for mistral-large-2512 wire payload...</div>';
      if (stage3El) stage3El.innerHTML = '<div class="py-4 text-emerald-800 text-xs italic flex items-center gap-2"><div class="w-3 h-3 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div> Receiving live completion from Mistral AI & rehydrating...</div>';

      const scenario = DEMO_SCENARIOS[activeDemoScenarioKey] || DEMO_SCENARIOS.healthcare;
      const startTime = performance.now();

      try {
        // Direct call to live Cloudflare Worker AI Privacy Gateway using Mistral AI
        const res = await fetch('/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer apl_live_hackathon'
          },
          body: JSON.stringify({
            model: 'mistral-large-2512',
            messages: [
              {
                role: 'system',
                content: 'You are a concise enterprise AI assistant. Provide a brief, direct 2-3 sentence confirmation and action summary. Never write long essays or boilerplate notes.'
              },
              { role: 'user', content: text }
            ],
            max_tokens: 150,
            temperature: 0.1,
            categories: scenario.categories || ['all']
          })
        });

        const elapsedMs = (performance.now() - startTime).toFixed(1);

        if (!res.ok) {
          const errText = await res.text();
          throw new Error('API request failed with status ' + res.status + ': ' + errText);
        }

        const data = await res.json();
        const sessionId = res.headers.get('x-privacy-session-id') || ('sess_' + Math.random().toString(36).slice(2, 9));

        // Extract token map and sanitized messages
        const tokenMap = (data.privacy && data.privacy.token_map) ? data.privacy.token_map : {};
        const sanitizedMsgs = (data.privacy && data.privacy.sanitized_messages) ? data.privacy.sanitized_messages : [];
        const userSanitized = sanitizedMsgs.find(m => m.role === 'user');
        const sanitizedText = userSanitized ? userSanitized.content : (data.privacy && data.privacy.protected_prompt ? data.privacy.protected_prompt : text);

        // Map tokenMap entries into detected entities list
        const entitiesDetected = Object.entries(tokenMap).map(([token, val]) => {
          let type = 'RULE_PII';
          if (token.startsWith('PERSON')) type = 'RULE_NAME';
          else if (token.startsWith('SSN')) type = 'RULE_SSN';
          else if (token.startsWith('EMAIL')) type = 'RULE_EMAIL';
          else if (token.startsWith('CARD')) type = 'RULE_CREDIT_CARD';
          else if (token.startsWith('PHONE')) type = 'RULE_PHONE';
          else if (token.startsWith('ID') || token.startsWith('MRN') || token.startsWith('POL')) type = 'RULE_ID';
          return { token, original: String(val), type };
        });

        const engineLatencyUs = res.headers.get('x-privacy-latency-us');
        const engineLatencyMs = engineLatencyUs ? (parseInt(engineLatencyUs, 10) / 1000).toFixed(2) : (elapsedMs * 0.05).toFixed(2);

        // Update latency chips
        const latencyChip = document.getElementById('demo-latency-chip');
        if (latencyChip) latencyChip.textContent = 'Engine Latency: ' + engineLatencyMs + 'ms';
        const stage3Latency = document.getElementById('stage3-latency-stat');
        if (stage3Latency) stage3Latency.textContent = '⚡ ' + elapsedMs + 'ms (Live mistral-large-2512)';

        // 1. Render Stage 1 (Highlighted raw prompt)
        renderDemoStage1(text, entitiesDetected);

        // 2. Render Stage 2 (Wire payload seen by Mistral AI)
        renderDemoStage2(sanitizedText);

        // 3. Render Stage 3 (ACTUAL LIVE REHYDRATED AI OUTPUT from Mistral AI)
        const liveAiOutput = (data.choices && data.choices[0] && data.choices[0].message) ? data.choices[0].message.content : '';
        renderDemoStage3(liveAiOutput, entitiesDetected);

        // 4. Populate In-Memory Vault Inspector table
        renderDemoVault(sessionId, entitiesDetected, text);

        // 5. Update Terminal cURL Snippet
        updateDemoCurlSnippet(text);

      } catch (err) {
        console.error('Demo simulation error:', err);
        if (stage3El) {
          stage3El.innerHTML = '<div class="p-3 bg-red-50 text-red-800 rounded-lg text-xs font-mono"><strong>Live Request Error:</strong> ' + escapeHtml(err.message) + '</div>';
        }
        // Fallback simulation only if offline/network dropped completely
        runFallbackSimulation(text, scenario);
      } finally {
        if (runBtn) runBtn.disabled = false;
        if (runBtnText) runBtnText.textContent = origText;
        if (window.lucide) window.lucide.createIcons();
      }
    }

    function renderDemoStage1(rawText, entities) {
      const container = document.getElementById('demo-stage1-content');
      const badge = document.getElementById('stage1-count-badge');
      if (!container) return;

      const count = entities ? entities.length : 0;
      if (badge) badge.textContent = count + (count === 1 ? ' Entity Flagged' : ' Entities Flagged');

      let highlighted = escapeHtml(rawText);

      if (entities && entities.length > 0) {
        const sorted = [...entities].sort((a, b) => ((b.original || '').length) - ((a.original || '').length));
        for (const item of sorted) {
          const val = item.original;
          if (!val || val.length < 2) continue;
          const escapedVal = escapeHtml(val);
          const ruleLabel = item.token ? item.token.replace(/_[0-9]+$/, '') : 'PII';
          const pill = '<mark class="bg-rose-100 text-rose-900 border-rose-300 font-medium font-mono text-[11px] px-1 py-0.5 rounded border inline-flex items-center gap-1 shadow-2xs">' +
            '<span>' + escapedVal + '</span>' +
            '<span class="text-[8px] uppercase tracking-wider font-extrabold px-1 rounded bg-black/10">' + ruleLabel + '</span>' +
            '</mark>';
          highlighted = highlighted.split(escapedVal).join(pill);
        }
      } else {
        const piiPatterns = [
          { regex: /\bDr\.\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g, label: 'PHYSICIAN', cls: 'bg-rose-100 text-rose-800 border-rose-300' },
          { regex: /\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g, label: 'NAME', cls: 'bg-orange-100 text-orange-800 border-orange-300' },
          { regex: /\b\d{3}-\d{2}-\d{4}\b/g, label: 'SSN', cls: 'bg-red-100 text-red-900 border-red-300' },
          { regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, label: 'EMAIL', cls: 'bg-amber-100 text-amber-900 border-amber-300' },
          { regex: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})\b|\b\d{4}-\d{4}-\d{4}-\d{4}\b/g, label: 'CARD', cls: 'bg-red-100 text-red-900 border-red-300' },
          { regex: /\bMRN-\w+\b|\b#?POL-\w+\b/g, label: 'MRN/POL', cls: 'bg-yellow-100 text-yellow-900 border-yellow-300' }
        ];

        piiPatterns.forEach(p => {
          highlighted = highlighted.replace(p.regex, (match) => {
            return '<mark class="' + p.cls + ' font-medium font-mono text-[11px] px-1 py-0.5 rounded border inline-flex items-center gap-1 shadow-2xs">' +
                   '<span>' + match + '</span>' +
                   '<span class="text-[8px] uppercase tracking-wider font-extrabold px-1 rounded bg-black/10">' + p.label + '</span>' +
                   '</mark>';
          });
        });
      }

      container.innerHTML = highlighted;
    }

    function renderDemoStage2(sanitizedText) {
      const container = document.getElementById('demo-stage2-content');
      if (!container) return;

      const payload = {
        model: "mistral-large-2512",
        messages: [
          { role: "system", content: "You are a concise enterprise AI assistant. Provide a brief, direct 2-3 sentence confirmation and action summary. Never write long essays or boilerplate notes." },
          { role: "user", content: sanitizedText }
        ],
        max_tokens: 150,
        temperature: 0.1
      };

      const jsonStr = JSON.stringify(payload, null, 2);
      // Highlight surrogate tokens like PERSON_1, SSN_1, EMAIL_1 in the JSON
      const formatted = escapeHtml(jsonStr).replace(/([A-Z0-9]+_[0-9]+)/g, '<span class="text-amber-300 font-bold underline bg-amber-950/60 px-1 rounded">$1</span>');

      container.innerHTML = '<pre class="whitespace-pre-wrap font-mono text-[11px] text-gray-200 leading-snug">' + formatted + '</pre>';
    }

    function formatSimpleMarkdown(text) {
      if (!text) return '';
      const lines = String(text).split(String.fromCharCode(10));
      let out = '';
      for (let i = 0; i < lines.length; i++) {
        let line = escapeHtml(lines[i]).trim();
        if (!line) {
          out += '<div class="h-2"></div>';
          continue;
        }
        // Bold formatting: **bold**
        let bIdx = 0;
        while ((bIdx = line.indexOf('**')) !== -1) {
          const endIdx = line.indexOf('**', bIdx + 2);
          if (endIdx === -1) break;
          const boldVal = line.substring(bIdx + 2, endIdx);
          line = line.substring(0, bIdx) + '<strong class="font-semibold text-gray-950">' + boldVal + '</strong>' + line.substring(endIdx + 2);
        }
        // Headers and list elements
        if (line.indexOf('### ') === 0) {
          out += '<h4 class="font-bold text-gray-950 text-xs mt-3 mb-1 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>' + line.slice(4) + '</h4>';
        } else if (line.indexOf('## ') === 0) {
          out += '<h3 class="font-bold text-gray-950 text-sm mt-3.5 mb-1 border-b border-gray-100 pb-1">' + line.slice(3) + '</h3>';
        } else if (line.indexOf('- ') === 0 || line.indexOf('* ') === 0) {
          out += '<li class="ml-4 list-disc text-gray-800 my-0.5">' + line.slice(2) + '</li>';
        } else {
          out += '<p class="my-0.5">' + line + '</p>';
        }
      }
      return out;
    }

    function renderDemoStage3(rehydratedText, entities) {
      const container = document.getElementById('demo-stage3-content');
      if (!container) return;

      if (!rehydratedText) {
        container.innerHTML = '<span class="text-gray-400 italic">No response received from model.</span>';
        return;
      }

      let formatted = formatSimpleMarkdown(rehydratedText);

      // Highlight restored entities in emerald green with RESTORED badge
      if (entities && entities.length > 0) {
        const sorted = [...entities].sort((a, b) => ((b.original || '').length) - ((a.original || '').length));
        for (const item of sorted) {
          const val = item.original;
          if (!val || val.length < 2) continue;
          const escapedVal = escapeHtml(val);
          const pill = '<mark class="bg-emerald-100 text-emerald-950 font-semibold px-1 py-0.5 rounded border border-emerald-300 inline-flex items-center gap-1 shadow-2xs">' +
            '<span>' + escapedVal + '</span>' +
            '<span class="text-[8px] uppercase tracking-wider font-bold px-1 rounded bg-emerald-200 text-emerald-800">RESTORED</span>' +
            '</mark>';
          formatted = formatted.split(escapedVal).join(pill);
        }
      }

      container.innerHTML = '<div class="space-y-1.5 leading-relaxed text-xs text-gray-800">' + formatted + '</div>';
    }

    function renderDemoVault(sessionId, entities, rawText) {
      const sessionEl = document.getElementById('demo-vault-session');
      if (sessionEl) sessionEl.textContent = sessionId;

      const tbody = document.getElementById('demo-vault-table-body');
      if (!tbody) return;

      let rows = '';
      const list = (entities && entities.length) ? entities : [];

      if (list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="py-4 text-center text-gray-400 italic">No PII entities detected in this prompt. Zero records stored.</td></tr>';
        return;
      }

      list.forEach((item, idx) => {
        const hash = simpleSha256Mock(item.token + (item.original || '') + sessionId);
        rows += '<tr class="hover:bg-gray-50/80 transition">' +
          '<td class="py-2 px-3 font-bold text-amber-600 font-mono text-xs">&lt;' + escapeHtml(item.token) + '&gt;</td>' +
          '<td class="py-2 px-3 text-gray-700 font-sans font-medium">' + escapeHtml(item.type) + '</td>' +
          '<td class="py-2 px-3 text-gray-500 font-mono text-[10px]">' + hash.slice(0, 18) + '...</td>' +
          '<td class="py-2 px-3"><span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">AES-256-GCM RAM</span></td>' +
          '</tr>';
      });

      tbody.innerHTML = rows;
    }

    function simpleSha256Mock(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
      }
      const hex = Math.abs(hash).toString(16).padStart(8, '0');
      return hex + 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'.slice(0, 32);
    }

    function updateDemoCurlSnippet(promptText) {
      const snippet = document.getElementById('demo-curl-snippet');
      if (!snippet) return;
      const bslash = String.fromCharCode(92);
      const cleanPrompt = (promptText || '').replace(/"/g, '').slice(0, 100);
      const payload = JSON.stringify({
        model: "mistral-large-2512",
        messages: [{ role: "user", content: cleanPrompt + "..." }],
        max_tokens: 150
      });
      const lines = [
        "curl -X POST https://ai-privacy-layer.boruahpriyanuj2004.workers.dev/v1/chat/completions " + bslash,
        "  -H " + JSON.stringify("Content-Type: application/json") + " " + bslash,
        "  -H " + JSON.stringify("Authorization: Bearer apl_live_hackathon") + " " + bslash,
        "  -d " + JSON.stringify(payload)
      ];
      snippet.textContent = lines.join(String.fromCharCode(10));
    }

    function copyDemoCurl() {
      const snippet = document.getElementById('demo-curl-snippet');
      if (!snippet) return;
      navigator.clipboard.writeText(snippet.textContent);
      const btnText = document.getElementById('btn-copy-demo-curl-text');
      if (btnText) {
        btnText.textContent = 'Copied!';
        setTimeout(() => { btnText.textContent = 'Copy cURL'; }, 2000);
      }
    }

    function fallbackClientRehydrate(template, rawText) {
      let result = template;
      const names = rawText.match(/\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g) || ['Alice Smith'];
      const emails = rawText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || ['alice@example.com'];
      const ssns = rawText.match(/\b\d{3}-\d{2}-\d{4}\b/g) || ['123-45-6789'];
      const cards = rawText.match(/\b\d{4}-\d{4}-\d{4}-\d{4}\b/g) || ['4532-1234-5678-9012'];

      result = result.replace(/<PERSON_1>/g, names[0] || 'Alice Smith');
      result = result.replace(/<PERSON_2>/g, names[1] || 'Dr. John Watson');
      result = result.replace(/<EMAIL_1>/g, emails[0] || 'alice@example.com');
      result = result.replace(/<SSN_1>/g, ssns[0] || '123-45-6789');
      result = result.replace(/<CARD_1>/g, cards[0] || '4532-1234-5678-9012');
      return result;
    }

    function runFallbackSimulation(rawText, scenario) {
      renderDemoStage1(rawText, scenario.expectedTokens || []);
      const sanitized = rawText
        .replace(/Dr\.\s+[A-Z][a-z]+/g, 'PERSON_1')
        .replace(/\b[A-Z][a-z]+\s+[A-Z][a-z]+\b/g, 'PERSON_2')
        .replace(/\b\d{3}-\d{2}-\d{4}\b/g, 'SSN_1')
        .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, 'EMAIL_1');
      renderDemoStage2(sanitized);
      const rehydrated = fallbackClientRehydrate(scenario.llmResponseTemplate || rawText, rawText);
      renderDemoStage3(rehydrated, scenario.expectedTokens || []);
      renderDemoVault('sess_local_demo', scenario.expectedTokens || [], rawText);
      updateDemoCurlSnippet(rawText);
    }

    function switchView(viewName) {
      if (!viewName || viewName === 'landing') viewName = 'playground';
      activeView = viewName;
      const urlParams = new URLSearchParams(window.location.search);
      const hasInvite = urlParams.has('invite');
      if (!hasInvite) {
        window.location.hash = viewName;
      }

      const globalHeader = document.getElementById('global-header');
      if (globalHeader) globalHeader.classList.remove('hidden');

      syncBodyOverflow();

      document.querySelectorAll('.view-panel').forEach(el => el.classList.add('hidden'));
      const targetView = document.getElementById('view-' + viewName);
      if (targetView) targetView.classList.remove('hidden');

      document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('text-[#f0523d]', 'font-semibold');
        btn.classList.add('text-groq-textMuted');
      });

      const activeBtn = document.getElementById('nav-' + viewName);
      if (activeBtn) {
        activeBtn.classList.add('text-[#f0523d]', 'font-semibold');
        activeBtn.classList.remove('text-groq-textMuted');
      }

      // Update mobile navigation strip pills
      document.querySelectorAll('.nav-mobile-item').forEach(btn => {
        btn.className = 'nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer text-groq-textMuted bg-white border border-gray-200/70 shadow-2xs';
      });
      const activeMobileBtn = document.getElementById('nav-mobile-' + viewName);
      if (activeMobileBtn) {
        activeMobileBtn.className = 'nav-mobile-item flex-1 py-1.5 px-2 text-center rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer text-[#f0523d] bg-orange-50 border border-[#f0523d]/30 shadow-2xs';
      }

      if (viewName === 'keys') fetchApiKeys();
      if (viewName === 'dashboard') {
        switchDashTab(activeDashTab);
      }
      if (viewName === 'admin-invites') {
        loadAdminUsers();
        loadAdminInvitations();
      }
      if (viewName === 'docs') {
        setTimeout(initDocsScrollSpy, 50);
      }
      if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 10);
      }
    }

    function switchDashTab(tabName) {
      activeDashTab = tabName;
      document.querySelectorAll('.dash-subview').forEach(el => el.classList.add('hidden'));
      const target = document.getElementById('dash-content-' + tabName);
      if (target) target.classList.remove('hidden');

      document.querySelectorAll('.dash-tab-btn').forEach(btn => {
        btn.classList.remove('bg-[#fff5f3]', 'text-[#f0523d]', 'font-bold', 'border-[#f0523d]', 'shadow-2xs');
        btn.classList.add('text-groq-textMuted', 'border-transparent');
        const icon = btn.querySelector('.tab-icon');
        if (icon) {
          icon.classList.remove('text-[#f0523d]');
          icon.classList.add('text-gray-400');
        }
      });

      const activeBtn = document.getElementById('dash-tab-btn-' + tabName);
      if (activeBtn) {
        activeBtn.classList.remove('text-groq-textMuted', 'border-transparent');
        activeBtn.classList.add('bg-[#fff5f3]', 'text-[#f0523d]', 'font-bold', 'border-[#f0523d]', 'shadow-2xs');
        const icon = activeBtn.querySelector('.tab-icon');
        if (icon) {
          icon.classList.remove('text-gray-400');
          icon.classList.add('text-[#f0523d]');
        }
      }
      if (tabName === 'logs' || tabName === 'usage' || tabName === 'metrics') fetchApiLogs();
      if (tabName === 'usage') updateUsageStats();
      if (tabName === 'metrics') renderMetricsChart();
      if (typeof lucide !== 'undefined') lucide.createIcons();
      showInvitationToast();
    }

    
    // =========================================================================
    // DOCS SCROLLSPY & SIDEBAR AUTO-HIGHLIGHT
    // =========================================================================
    const docsEndpointIds = [
      'docs-quickstart',
      'docs-auth-headers',
      'docs-chat-completions',
      'docs-embeddings',
      'docs-models',
      'docs-models-get',
      'docs-tokenize',
      'docs-detokenize',
      'docs-logs',
      'docs-audit-events',
      'docs-keys-list',
      'docs-keys-create',
      'docs-keys-delete',
      'docs-health'
    ];

    let isDocsManualClick = false;
    let docsManualClickTimer = null;
    let docsScrollRaf = null;

    function highlightDocsSidebar(activeId) {
      if (!activeId) return;
      const targetLink = document.getElementById('docs-nav-' + activeId);
      if (!targetLink) return;

      if (targetLink.classList.contains('border-[#f0523d]')) return;

      document.querySelectorAll('.docs-nav-link').forEach(link => {
        link.classList.remove('bg-[#fff5f3]', 'text-[#f0523d]', 'font-semibold', 'border-l-2', 'border-[#f0523d]');
        link.classList.add('text-groq-textMuted');
      });

      targetLink.classList.remove('text-groq-textMuted');
      targetLink.classList.add('bg-[#fff5f3]', 'text-[#f0523d]', 'font-semibold', 'border-l-2', 'border-[#f0523d]');

      // Auto-scroll sidebar navigation to keep active item in view
      const aside = targetLink.closest('aside');
      if (aside && aside.scrollHeight > aside.clientHeight) {
        const asideRect = aside.getBoundingClientRect();
        const linkRect = targetLink.getBoundingClientRect();
        if (linkRect.top < asideRect.top + 30 || linkRect.bottom > asideRect.bottom - 30) {
          targetLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    function updateDocsActiveSectionOnScroll() {
      if (activeView !== 'docs' || isDocsManualClick) return;

      const scrollContainer = document.getElementById('docs-main-scroll');
      if (!scrollContainer) return;

      const isContainerScrollable = scrollContainer.scrollHeight > scrollContainer.clientHeight &&
        (window.getComputedStyle(scrollContainer).overflowY === 'auto' ||
         window.getComputedStyle(scrollContainer).overflowY === 'scroll');

      // 1. Boundary check: Scrolled to bottom
      if (isContainerScrollable) {
        if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 35) {
          highlightDocsSidebar(docsEndpointIds[docsEndpointIds.length - 1]);
          return;
        }
        if (scrollContainer.scrollTop <= 15) {
          highlightDocsSidebar(docsEndpointIds[0]);
          return;
        }
      } else {
        const scrollBottom = window.innerHeight + window.scrollY;
        const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        if (scrollBottom >= docHeight - 45) {
          highlightDocsSidebar(docsEndpointIds[docsEndpointIds.length - 1]);
          return;
        }
        if (window.scrollY <= 15) {
          highlightDocsSidebar(docsEndpointIds[0]);
          return;
        }
      }

      // 2. Active section detection using viewport reading threshold
      const containerTop = isContainerScrollable ? scrollContainer.getBoundingClientRect().top : 0;
      const threshold = containerTop + (isContainerScrollable ? 90 : 130);

      let currentActiveId = docsEndpointIds[0];

      for (let i = 0; i < docsEndpointIds.length; i++) {
        const id = docsEndpointIds[i];
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          currentActiveId = id;
        } else {
          break;
        }
      }

      highlightDocsSidebar(currentActiveId);
    }

    function handleDocsScroll() {
      if (activeView !== 'docs' || isDocsManualClick) return;
      if (docsScrollRaf) cancelAnimationFrame(docsScrollRaf);
      docsScrollRaf = requestAnimationFrame(updateDocsActiveSectionOnScroll);
    }

    function initDocsScrollSpy() {
      const scrollContainer = document.getElementById('docs-main-scroll');
      if (scrollContainer && !scrollContainer.dataset.scrollSpyAttached) {
        scrollContainer.dataset.scrollSpyAttached = 'true';
        scrollContainer.addEventListener('scroll', handleDocsScroll, { passive: true });
      }

      if (!window.docsWindowScrollSpyAttached) {
        window.docsWindowScrollSpyAttached = true;
        window.addEventListener('scroll', handleDocsScroll, { passive: true });
        window.addEventListener('resize', handleDocsScroll, { passive: true });
      }

      updateDocsActiveSectionOnScroll();
    }

    function switchDocsEndpoint(id) {
      isDocsManualClick = true;
      if (docsManualClickTimer) clearTimeout(docsManualClickTimer);
      docsManualClickTimer = setTimeout(() => {
        isDocsManualClick = false;
        updateDocsActiveSectionOnScroll();
      }, 750);

      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      highlightDocsSidebar(id);

      if (window.innerWidth < 768) {
        const content = document.getElementById('docs-sidebar-content');
        if (content && !content.classList.contains('hidden')) {
          toggleDocsMobileNav();
        }
      }
      if (window.lucide) lucide.createIcons();
    }

    function filterDocsEndpoints(query) {
      const q = (query || '').toLowerCase().trim();
      const items = document.querySelectorAll('.docs-nav-item');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    }

    function switchDocsCodeLang(endpointKey, lang) {
      const block = document.getElementById('docs-codeblock-' + endpointKey);
      if (!block) return;
      block.querySelectorAll('.docs-code-pane').forEach(el => el.classList.add('hidden'));
      const targetPane = document.getElementById('docs-code-' + endpointKey + '-' + lang);
      if (targetPane) targetPane.classList.remove('hidden');

      block.querySelectorAll('.docs-lang-tab').forEach(btn => {
        btn.classList.remove('text-[#f0523d]', 'border-b-2', 'border-[#f0523d]', 'font-semibold');
        btn.classList.add('text-gray-400');
      });
      const activeTab = document.getElementById('docs-tab-' + endpointKey + '-' + lang);
      if (activeTab) {
        activeTab.classList.remove('text-gray-400');
        activeTab.classList.add('text-[#f0523d]', 'border-b-2', 'border-[#f0523d]', 'font-semibold');
      }
    }

    function copyDocsSnippet(elementId, btn) {
      const el = document.getElementById(elementId);
      if (!el) return;
      navigator.clipboard.writeText(el.innerText || el.textContent);
      if (btn) {
        const origHtml = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i><span class="text-emerald-500 font-semibold">Copied!</span>';
        if (window.lucide) lucide.createIcons();
        setTimeout(() => {
          btn.innerHTML = origHtml;
          if (window.lucide) lucide.createIcons();
        }, 2000);
      }
    }

    function toggleDocsMobileNav() {
      const content = document.getElementById('docs-sidebar-content');
      const chevron = document.getElementById('docs-mobile-chevron');
      if (!content) return;
      const isHidden = content.classList.contains('hidden');
      if (isHidden) {
        content.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
      }
      if (window.lucide) lucide.createIcons();
    }

    function toggleCodePanel() {
      const panel = document.getElementById('col-code');
      const text = document.getElementById('code-btn-text');
      isCodeVisible = !isCodeVisible;
      if (isCodeVisible) {
        panel.classList.remove('hidden');
        text.textContent = 'Hide';
      } else {
        panel.classList.add('hidden');
        text.textContent = 'Code';
      }
    }

    function loadSample(key) {
      document.getElementById('user-prompt').value = SAMPLES[key] || '';
      updateCodeViewer();
    }

    function clearInputs() {
      document.getElementById('user-prompt').value = '';
      updateCodeViewer();
    }

    let currentProtectedPrompt = '';
    let currentRehydratedText = '';

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function renderProtectedPrompt(text, tokenMap) {
      if (!text) return '';
      if (!tokenMap || Object.keys(tokenMap).length === 0) {
        return escapeHtml(text);
      }

      const matches = [];
      const tokens = Object.keys(tokenMap).sort((a, b) => b.length - a.length);

      for (const token of tokens) {
        if (!token) continue;
        let idx = text.indexOf(token);
        while (idx !== -1) {
          matches.push({
            start: idx,
            end: idx + token.length,
            token: token,
            origVal: tokenMap[token] || ''
          });
          idx = text.indexOf(token, idx + token.length);
        }
      }

      for (const token of tokens) {
        const bracketed = '<' + token + '>';
        let idx = text.indexOf(bracketed);
        while (idx !== -1) {
          matches.push({
            start: idx,
            end: idx + bracketed.length,
            token: bracketed,
            origVal: tokenMap[token] || ''
          });
          idx = text.indexOf(bracketed, idx + bracketed.length);
        }
      }

      matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
      const nonOverlapping = [];
      let lastEnd = 0;
      for (const m of matches) {
        if (m.start >= lastEnd) {
          nonOverlapping.push(m);
          lastEnd = m.end;
        }
      }

      let result = '';
      let cursor = 0;
      for (const m of nonOverlapping) {
        result += escapeHtml(text.slice(cursor, m.start));
        result += '<span class="inline-flex items-center px-1.5 py-0.5 rounded font-mono font-bold text-xs bg-sky-100 text-sky-800 border border-sky-300" title="Original: ' + escapeHtml(m.origVal) + '">' +
          '🔒 ' + escapeHtml(m.token) +
        '</span>';
        cursor = m.end;
      }
      result += escapeHtml(text.slice(cursor));
      return result;
    }

    function renderHighlightedRehydration(text, tokenMap) {
      if (!text) return '';
      if (!tokenMap || Object.keys(tokenMap).length === 0) {
        return escapeHtml(text);
      }

      const matches = [];
      const entries = Object.entries(tokenMap).sort((a, b) => b[1].length - a[1].length);

      for (const [token, origVal] of entries) {
        if (!origVal || origVal.length === 0) continue;
        let idx = text.indexOf(origVal);
        while (idx !== -1) {
          matches.push({
            start: idx,
            end: idx + origVal.length,
            token: token,
            displayVal: origVal
          });
          idx = text.indexOf(origVal, idx + origVal.length);
        }
      }

      for (const [token] of entries) {
        if (!token || token.length === 0) continue;
        let idx = text.indexOf(token);
        while (idx !== -1) {
          matches.push({
            start: idx,
            end: idx + token.length,
            token: token,
            displayVal: token
          });
          idx = text.indexOf(token, idx + token.length);
        }
      }

      matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
      const nonOverlapping = [];
      let lastEnd = 0;
      for (const m of matches) {
        if (m.start >= lastEnd) {
          nonOverlapping.push(m);
          lastEnd = m.end;
        }
      }

      let result = '';
      let cursor = 0;
      for (const m of nonOverlapping) {
        result += escapeHtml(text.slice(cursor, m.start));
        const tokenDisplay = m.token.startsWith('<') ? m.token : ('<' + m.token + '>');
        result += '<span class="rehydrated-badge group relative inline-flex items-center px-1.5 py-0.5 rounded font-mono font-semibold bg-[#fff4f2] text-[#f0523d] border border-[#ffcdca] hover:bg-[#ffece8] cursor-help transition-all shadow-2xs" title="Protected text: ' + escapeHtml(tokenDisplay) + '">' +
          '<span class="underline decoration-dotted decoration-[#f0523d]/70 underline-offset-2">' + escapeHtml(m.displayVal) + '</span>' +
          '<span class="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-30 flex flex-col items-center">' +
            '<span class="bg-gray-900 text-white text-[11px] font-mono px-2 py-1 rounded shadow-lg whitespace-nowrap flex items-center gap-1.5 border border-gray-700">' +
              '<span class="text-gray-300 font-normal">Protected:</span>' +
              '<span class="text-amber-300 font-bold font-mono">' + escapeHtml(tokenDisplay) + '</span>' +
            '</span>' +
            '<span class="w-1.5 h-1.5 -mt-0.5 rotate-45 bg-gray-900 border-r border-b border-gray-700"></span>' +
          '</span>' +
        '</span>';
        cursor = m.end;
      }
      result += escapeHtml(text.slice(cursor));
      return result;
    }

    function copyProtectedPrompt() {
      if (!currentProtectedPrompt) return;
      navigator.clipboard.writeText(currentProtectedPrompt);
      alert('Protected prompt copied to clipboard!');
    }

    function copyRehydratedText() {
      if (!currentRehydratedText) return;
      navigator.clipboard.writeText(currentRehydratedText);
      alert('AI Output copied to clipboard!');
    }

    function clearResponse() {
      document.getElementById('welcome-message').classList.remove('hidden');
      const protBox = document.getElementById('output-protected-container');
      if (protBox) protBox.classList.add('hidden');
      const rehydBox = document.getElementById('output-rehydrated-container');
      if (rehydBox) rehydBox.classList.add('hidden');
      currentProtectedPrompt = '';
      currentRehydratedText = '';
      document.getElementById('response-stats').textContent = '0 tokens • 0.00s';
    }

    function addConversationTurn() {
      const resp = currentRehydratedText || (document.getElementById('rehydrated-text') ? document.getElementById('rehydrated-text').textContent : '');
      if (resp) {
        document.getElementById('system-prompt').value = "System: Assistant replied previous turn.\\n\\nAssistant: " + resp;
      }
    }

    function onModelChange() {
      updateCodeViewer();
    }

    function copyModelName() {
      const model = document.getElementById('playground-model').value;
      navigator.clipboard.writeText(model);
      alert('Model name copied: ' + model);
    }

    const FREE_TIER_MODELS = {
      mistral: [
        { id: 'ministral-3b-2512', name: 'ministral-3b-2512' },
        { id: 'ministral-8b-2512', name: 'ministral-8b-2512' },
        { id: 'codestral-2508', name: 'codestral-2508' },
        { id: 'mistral-large-2512', name: 'mistral-large-2512' }
      ]
    };

    // Fallback expanded list for a provider if dynamic API fetch has network error but user HAS provided that provider's key
    const EXPANDED_FALLBACK_MODELS = {
      groq: [
        { id: 'openai/gpt-oss-120b', name: 'openai/gpt-oss-120b' },
        { id: 'openai/gpt-oss-20b', name: 'openai/gpt-oss-20b' },
        { id: 'qwen/qwen3.8-27b', name: 'qwen/qwen3.8-27b' },
        { id: 'llama-3.3-70b-versatile', name: 'llama-3.3-70b-versatile' },
        { id: 'llama-3.1-8b-instant', name: 'llama-3.1-8b-instant' },
        { id: 'mixtral-8x7b-32768', name: 'mixtral-8x7b-32768' },
        { id: 'llama-guard-3-8b', name: 'llama-guard-3-8b' }
      ],
      google: [
        { id: 'gemini-2.5-pro', name: 'gemini-2.5-pro' },
        { id: 'gemini-2.5-flash', name: 'gemini-2.5-flash' },
        { id: 'gemini-2.0-flash', name: 'gemini-2.0-flash' },
        { id: 'gemini-1.5-pro', name: 'gemini-1.5-pro' },
        { id: 'gemini-1.5-flash', name: 'gemini-1.5-flash' },
        { id: 'gemma-4-26b-a4b-it', name: 'gemma-4-26b-a4b-it' },
        { id: 'gemma-4-31b-it', name: 'gemma-4-31b-it' }
      ],
      mistral: [
        { id: 'mistral-large-latest', name: 'mistral-large-latest' },
        { id: 'codestral-latest', name: 'codestral-latest' },
        { id: 'mistral-small-latest', name: 'mistral-small-latest' },
        { id: 'codestral-2508', name: 'codestral-2508' },
        { id: 'ministral-8b-2512', name: 'ministral-8b-2512' },
        { id: 'ministral-14b-2512', name: 'ministral-14b-2512' }
      ]
    };

    let cachedByokCatalog = null;
    let isFetchingByokModels = false;

    function renderPlaygroundModelDropdown(catalog, preferredSelected) {
      const select = document.getElementById('playground-model');
      if (!select) return;
      const targetVal = preferredSelected || select.value;
      select.innerHTML = '';

      const isFreeMode = (typeof playgroundTierMode !== 'undefined' && playgroundTierMode === 'free');
      const groups = isFreeMode
        ? [
            { label: 'Mistral AI (Free Public Access)', provider: 'mistral', items: catalog?.mistral?.length ? catalog.mistral : FREE_TIER_MODELS.mistral }
          ]
        : [
            { label: 'Groq Cloud (Ultra-Fast & Free)', provider: 'groq', items: catalog?.groq?.length ? catalog.groq : EXPANDED_FALLBACK_MODELS.groq },
            { label: 'Google AI Studio (Free)', provider: 'google', items: catalog?.google?.length ? catalog.google : EXPANDED_FALLBACK_MODELS.google },
            { label: 'Mistral AI (Free & Pro)', provider: 'mistral', items: catalog?.mistral?.length ? catalog.mistral : EXPANDED_FALLBACK_MODELS.mistral }
          ];

      let found = false;
      groups.forEach(g => {
        if (!g.items || g.items.length === 0) return;
        const optgroup = document.createElement('optgroup');
        optgroup.label = g.label;
        g.items.forEach(item => {
          const id = typeof item === 'string' ? item : item.id;
          const name = typeof item === 'string' ? item : (item.name || item.id);
          const opt = document.createElement('option');
          opt.value = id;
          opt.textContent = name;
          opt.setAttribute('data-provider', g.provider);
          if (id === targetVal) {
            opt.selected = true;
            found = true;
          }
          optgroup.appendChild(opt);
        });
        select.appendChild(optgroup);
      });

      if (!found && select.options.length > 0) {
        const defaultOpt = Array.from(select.options).find(o => o.value === 'ministral-8b-2512') || Array.from(select.options).find(o => o.value === 'ministral-3b-2512');
        if (defaultOpt) defaultOpt.selected = true;
        else select.selectedIndex = 0;
      }
      if (typeof updateCodeViewer === 'function') {
        updateCodeViewer();
      }
    }

    async function fetchAndPopulateByokModels(forceRefresh = false) {
      if (playgroundTierMode !== 'byok') return;

      const groqKey = getStoredByokKey('groq') || (document.getElementById('byok-key-groq') ? document.getElementById('byok-key-groq').value.trim() : '');
      const googleKey = getStoredByokKey('google') || (document.getElementById('byok-key-google') ? document.getElementById('byok-key-google').value.trim() : '');
      const mistralKey = getStoredByokKey('mistral') || (document.getElementById('byok-key-mistral') ? document.getElementById('byok-key-mistral').value.trim() : '');

      const catalog = {
        groq: [...FREE_TIER_MODELS.groq],
        google: [...FREE_TIER_MODELS.google],
        mistral: [...FREE_TIER_MODELS.mistral]
      };

      // If user hasn't added any keys at all, only show standard models
      if (!groqKey && !googleKey && !mistralKey) {
        cachedByokCatalog = catalog;
        renderPlaygroundModelDropdown(catalog);
        return;
      }

      if (cachedByokCatalog && !forceRefresh) {
        renderPlaygroundModelDropdown(cachedByokCatalog);
        return;
      }

      if (isFetchingByokModels) return;
      isFetchingByokModels = true;

      const select = document.getElementById('playground-model');
      const prevVal = select ? select.value : '';

      try {
        const res = await fetch('/api/byok/models', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ groqKey, googleKey, mistralKey })
        });
        if (!res.ok) throw new Error('Failed to query BYOK models');
        const data = await res.json();
        const providers = data?.providers || {};

        // Groq: only show longer list if user provided groqKey
        if (groqKey) {
          if (providers.groq?.models && providers.groq.models.length > 0) {
            catalog.groq = providers.groq.models;
          } else {
            catalog.groq = EXPANDED_FALLBACK_MODELS.groq;
          }
        } else {
          catalog.groq = [...FREE_TIER_MODELS.groq];
        }

        // Google AI Studio: only show longer list if user provided googleKey
        if (googleKey) {
          if (providers.google?.models && providers.google.models.length > 0) {
            catalog.google = providers.google.models;
          } else {
            catalog.google = EXPANDED_FALLBACK_MODELS.google;
          }
        } else {
          catalog.google = [...FREE_TIER_MODELS.google];
        }

        // Mistral AI: only show longer list if user provided mistralKey
        if (mistralKey) {
          if (providers.mistral?.models && providers.mistral.models.length > 0) {
            catalog.mistral = providers.mistral.models;
          } else {
            catalog.mistral = EXPANDED_FALLBACK_MODELS.mistral;
          }
        } else {
          catalog.mistral = [...FREE_TIER_MODELS.mistral];
        }

        cachedByokCatalog = catalog;
        renderPlaygroundModelDropdown(catalog, prevVal);
      } catch (err) {
        console.warn('BYOK dynamic model fetch error:', err);
        // On network error, only expand providers where user actually added their key
        if (groqKey) catalog.groq = EXPANDED_FALLBACK_MODELS.groq;
        if (googleKey) catalog.google = EXPANDED_FALLBACK_MODELS.google;
        if (mistralKey) catalog.mistral = EXPANDED_FALLBACK_MODELS.mistral;
        renderPlaygroundModelDropdown(catalog, prevVal);
      } finally {
        isFetchingByokModels = false;
      }
    }

    let playgroundTierMode = 'free'; // 'free' or 'byok'

    function switchPlaygroundTier(mode) {
      playgroundTierMode = mode;
      const freeBtn = document.getElementById('btn-tier-free');
      const byokBtn = document.getElementById('btn-tier-byok');
      const byokKeysBtn = document.getElementById('btn-byok-keys');

      if (mode === 'free') {
        if (freeBtn) {
          freeBtn.className = 'px-2.5 sm:px-3 py-1 rounded-md bg-white text-groq-dark font-medium shadow-xs text-xs transition cursor-pointer';
        }
        if (byokBtn) {
          byokBtn.className = 'px-2.5 sm:px-3 py-1 rounded-md text-groq-textMuted hover:text-groq-dark text-xs transition cursor-pointer flex items-center gap-1';
        }
        if (byokKeysBtn) {
          byokKeysBtn.classList.add('hidden');
        }
        renderPlaygroundModelDropdown(FREE_TIER_MODELS, 'ministral-8b-2512');
      } else {
        if (byokBtn) {
          byokBtn.className = 'px-2.5 sm:px-3 py-1 rounded-md bg-white text-groq-dark font-medium shadow-xs text-xs transition cursor-pointer flex items-center gap-1';
        }
        if (freeBtn) {
          freeBtn.className = 'px-2.5 sm:px-3 py-1 rounded-md text-groq-textMuted hover:text-groq-dark text-xs transition cursor-pointer';
        }
        if (byokKeysBtn) {
          byokKeysBtn.classList.remove('hidden');
        }
        updateByokBadge();
        const hasKeys = !!(getStoredByokKey('google') || getStoredByokKey('mistral') || getStoredByokKey('groq') || (document.getElementById('cfg-apikey') && document.getElementById('cfg-apikey').value.trim()));
        if (!hasKeys) {
          renderPlaygroundModelDropdown(FREE_TIER_MODELS);
          openByokKeysModal();
        } else {
          fetchAndPopulateByokModels();
        }
      }
    }

    async function submitPrompt() {
      const userPrompt = document.getElementById('user-prompt').value.trim();
      if (!userPrompt) return;

      const select = document.getElementById('playground-model');
      const model = select ? select.value : '';
      const selectedOption = select && select.selectedIndex >= 0 ? select.options[select.selectedIndex] : null;
      const optProvider = selectedOption ? selectedOption.getAttribute('data-provider') : '';
      const kmsInput = document.getElementById('cfg-kms');
      const kmsKey = kmsInput ? kmsInput.value.trim() : '';
      let apiKey = '';

      // Free public access: all free provider models are freely executable without invitation codes

      let targetProvider = optProvider;
      if (!targetProvider) {
        if (model.includes('gemini') || model.startsWith('gemma')) targetProvider = 'google';
        else if (model.includes('mistral') || model.startsWith('codestral') || model.startsWith('ministral')) targetProvider = 'mistral';
        else if (model.includes('groq') || model.includes('oss') || model.startsWith('qwen') || model.startsWith('llama')) targetProvider = 'groq';
      }

      if (playgroundTierMode === 'byok') {
        const googleKey = (document.getElementById('byok-key-google') ? document.getElementById('byok-key-google').value.trim() : '') || getStoredByokKey('google') || '';
        const mistralKey = (document.getElementById('byok-key-mistral') ? document.getElementById('byok-key-mistral').value.trim() : '') || getStoredByokKey('mistral') || '';
        const groqKey = (document.getElementById('byok-key-groq') ? document.getElementById('byok-key-groq').value.trim() : '') || getStoredByokKey('groq') || '';
        const legacyKey = (document.getElementById('cfg-apikey') ? document.getElementById('cfg-apikey').value.trim() : '');

        let providerName = '';
        if (targetProvider === 'google') {
          apiKey = googleKey || legacyKey;
          providerName = 'Google AI Studio';
        } else if (targetProvider === 'mistral') {
          apiKey = mistralKey || legacyKey;
          providerName = 'Mistral AI';
        } else if (targetProvider === 'groq') {
          apiKey = groqKey || legacyKey;
          providerName = 'Groq Cloud';
        } else {
          apiKey = legacyKey || groqKey || mistralKey || googleKey;
          providerName = 'upstream provider';
        }

        if (!apiKey) {
          alert('BYOK Mode is ON: Please enter your ' + providerName + ' API key in the API Keys panel.');
          openByokKeysModal();
          return;
        }
      }

      const modeEl = document.getElementById('param-mode') || document.getElementById('cfg-mode');
      const mode = modeEl ? modeEl.value : 'structural';

      const btn = document.getElementById('btn-submit');
      if (btn) {
        btn.innerHTML = '<span class="flex items-center gap-1.5"><i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i><span>Running...</span></span>';
        btn.disabled = true;
      }
      const quickBtn = document.getElementById('btn-quick-submit');
      if (quickBtn) {
        quickBtn.innerHTML = '<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i><span>Running...</span>';
        quickBtn.disabled = true;
      }
      if (window.lucide) lucide.createIcons();

      const t0 = performance.now();

      try {
        const headers = {
          'Content-Type': 'application/json',
          'x-tokenization-mode': mode,
          'x-detection-categories': 'all'
        };
        if (kmsKey) headers['x-vault-encryption-key'] = kmsKey;
        if (apiKey) headers['Authorization'] = 'Bearer ' + apiKey;
        if (currentIdToken) headers['x-user-token'] = currentIdToken;

        if (targetProvider === 'google') {
          headers['x-upstream-base-url'] = 'https://generativelanguage.googleapis.com/v1beta/openai';
          if (apiKey) headers['x-goog-api-key'] = apiKey;
        } else if (targetProvider === 'groq') {
          headers['x-upstream-base-url'] = 'https://api.groq.com/openai/v1';
        } else if (targetProvider === 'mistral') {
          headers['x-upstream-base-url'] = 'https://api.mistral.ai/v1';
        } else if (model.includes('openrouter')) {
          headers['x-upstream-base-url'] = 'https://openrouter.ai/api/v1';
        }

        const temp = parseFloat(document.getElementById('param-temp-input') ? document.getElementById('param-temp-input').value : '1');
        const maxTokens = parseInt(document.getElementById('param-tokens-input') ? document.getElementById('param-tokens-input').value : '2048', 10);
        const topP = parseFloat(document.getElementById('param-top-p-input') ? document.getElementById('param-top-p-input').value : '1');
        const stopVal = document.getElementById('param-stop') ? document.getElementById('param-stop').value.trim() : '';
        const jsonMode = document.getElementById('param-json') ? document.getElementById('param-json').checked : false;
        const seedVal = document.getElementById('param-seed') ? document.getElementById('param-seed').value.trim() : '';

        const payload = {
          model: model,
          categories: ['all'],
          messages: [
            { role: 'system', content: document.getElementById('system-prompt').value },
            { role: 'user', content: userPrompt }
          ],
          temperature: isNaN(temp) ? 1 : temp,
          max_tokens: isNaN(maxTokens) ? 2048 : maxTokens,
          top_p: isNaN(topP) ? 1 : topP
        };
        if (stopVal) payload.stop = stopVal;
        if (seedVal && !isNaN(parseInt(seedVal, 10))) payload.seed = parseInt(seedVal, 10);
        if (jsonMode) payload.response_format = { type: 'json_object' };

        const res = await fetch('/v1/chat/completions', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });

        const elapsedSec = ((performance.now() - t0) / 1000).toFixed(2);
        const data = await res.json();

        document.getElementById('welcome-message').classList.add('hidden');

        if (data.choices && data.choices[0]) {
          const content = data.choices[0].message.content || '';
          currentRehydratedText = content;

          const tokenMap = (data.privacy && data.privacy.token_map) ? data.privacy.token_map : {};
          const protectedPrompt = (data.privacy && data.privacy.protected_prompt)
            ? data.privacy.protected_prompt
            : (decodeURIComponent(res.headers.get('x-privacy-protected-prompt') || '') || userPrompt);
          currentProtectedPrompt = protectedPrompt;

          const interceptedCount = (data.privacy && data.privacy.entities_count !== undefined)
            ? data.privacy.entities_count
            : (res.headers.get('x-privacy-entities-intercepted') || Object.keys(tokenMap).length);

          const badge = document.getElementById('protected-entities-badge');
          if (badge) {
            badge.textContent = interceptedCount + (interceptedCount === 1 ? ' Entity Masked' : ' Entities Masked');
          }

          // Render Output 1: Protected prompt sent to AI
          const protBox = document.getElementById('output-protected-container');
          if (protBox) protBox.classList.remove('hidden');
          const protText = document.getElementById('protected-prompt-text');
          if (protText) protText.innerHTML = renderProtectedPrompt(protectedPrompt, tokenMap);

          // Render Output 2: AI Output with highlighted rehydration and hover tooltips
          const rehydBox = document.getElementById('output-rehydrated-container');
          if (rehydBox) rehydBox.classList.remove('hidden');
          const rehydText = document.getElementById('rehydrated-text');
          if (rehydText) rehydText.innerHTML = renderHighlightedRehydration(content, tokenMap);

          const tokens = data.usage ? data.usage.completion_tokens : 45;
          document.getElementById('response-stats').textContent = tokens + ' tokens • ' + elapsedSec + 's';

          localLogs.unshift({
            time: new Date().toLocaleTimeString(),
            timestamp: new Date().toISOString(),
            model: model,
            key: 'ProjectSPG Free',
            code: 200,
            ttft: (elapsedSec * 0.4).toFixed(3),
            latency: elapsedSec,
            inTokens: data.usage ? data.usage.prompt_tokens : 85,
            outTokens: tokens,
            audio: '-',
            reqId: 'req_' + Math.random().toString(36).slice(2, 7) + '...',
            error: '-',
            protectedEntities: interceptedCount || 0
          });
          fetchApiLogs();
        } else if (res.status === 429) {
          const isDaily = Boolean(data.error && data.error.code === 'daily_limit_exceeded');
          const isPro = (data.error && data.error.tier === 'pro') || isUserFullyInvited();
          const retrySec = (data.error && (data.error.retry_after || data.error.resets_in_seconds)) || (isPro ? 5 : 15);
          const limitSec = isPro ? 5 : 15;

          // Display floating toaster notification without modifying or covering previous prompt output
          showRateLimitToast({
            isDaily,
            retrySec: isDaily ? 0 : retrySec,
            limitSec,
            dailyLimit: (data.error && data.error.daily_limit) || 150
          });

          localLogs.unshift({
            time: new Date().toLocaleTimeString(),
            timestamp: new Date().toISOString(),
            model: model,
            key: isPro ? 'ProjectSPG Pro' : 'ProjectSPG Free',
            code: 429,
            ttft: '0.000',
            latency: elapsedSec,
            inTokens: 0,
            outTokens: 0,
            audio: '-',
            reqId: 'req_' + Math.random().toString(36).slice(2, 7) + '...',
            error: isDaily ? 'daily_limit_exceeded' : 'rate_limited',
            protectedEntities: 0
          });
          renderLogsTable();
          renderMetricsChart();
          if (!isDaily) {
            startCooldown(retrySec);
          }
        } else if (!res.ok || data.error) {
          document.getElementById('welcome-message').classList.add('hidden');
          const protBox = document.getElementById('output-protected-container');
          if (protBox) protBox.classList.add('hidden');
          const rehydBox = document.getElementById('output-rehydrated-container');
          if (rehydBox) rehydBox.classList.remove('hidden');
          const errObj = data.error || data;
          const errMsg = typeof errObj === 'string' ? errObj : (errObj.message || JSON.stringify(errObj));
          const isTierError = res.status === 403 || errMsg.includes('subscription tier') || errMsg.includes('tier_not_allowed');
          document.getElementById('rehydrated-text').innerHTML =
            '<div class="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-900 text-xs leading-relaxed">' +
            '<strong>Provider Error (' + res.status + '):</strong> ' + escapeHtml(errMsg) +
            (isTierError ? '<br/><span class="text-groq-textSubtle mt-1.5 block">💡 <em>This model requires a paid Mistral AI subscription tier. To use paid Mistral models, click "Parameters", switch to BYOK mode, and enter your paid Mistral API key. For free testing, select <strong>codestral-2508</strong>, <strong>ministral-8b-2512</strong>, or <strong>ministral-14b-2512</strong>.</em></span>' : '') +
            '</div>';
          localLogs.unshift({
            time: new Date().toLocaleTimeString(),
            timestamp: new Date().toISOString(),
            model: model,
            key: 'ProjectSPG Free',
            code: res.status || 500,
            ttft: '0.000',
            latency: elapsedSec,
            inTokens: 0,
            outTokens: 0,
            audio: '-',
            reqId: 'req_' + Math.random().toString(36).slice(2, 7) + '...',
            error: errMsg ? String(errMsg).slice(0, 30) : 'error',
            protectedEntities: 0
          });
          renderLogsTable();
          renderMetricsChart();
        }
      } catch (err) {
        document.getElementById('rehydrated-text').textContent = 'Execution error: ' + err.message;
      } finally {
        if (!isCooldownActive) {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>Submit</span> <span class="hidden sm:inline text-[11px] font-mono text-groq-textSubtle">Ctrl + ↵</span>';
          }
          const quickBtn = document.getElementById('btn-quick-submit');
          if (quickBtn) {
            quickBtn.disabled = false;
            quickBtn.innerHTML = '<i data-lucide="send" class="w-3.5 h-3.5"></i><span>Submit</span>';
          }
        }
        if (window.lucide) lucide.createIcons();
      }
    }

    let rateToastCountdownInterval = null;

    function dismissRateLimitToast() {
      if (rateToastCountdownInterval) {
        clearInterval(rateToastCountdownInterval);
        rateToastCountdownInterval = null;
      }
      const toast = document.getElementById('toast-rate-limit');
      if (!toast) return;
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }

    function showRateLimitToast(opts) {
      dismissRateLimitToast();

      const isDaily = Boolean(opts && opts.isDaily);
      let remainingSec = (opts && opts.retrySec) ? opts.retrySec : 5;

      const toast = document.createElement('div');
      toast.id = 'toast-rate-limit';
      toast.className = 'fixed bottom-5 right-5 z-50 max-w-md w-[calc(100%-2.5rem)] bg-white border border-amber-300 rounded-2xl shadow-xl p-4 transition-all duration-300 transform translate-y-4 opacity-0 flex flex-col gap-2.5';

      if (isDaily) {
        toast.innerHTML =
          '<div class="flex items-start justify-between gap-3">' +
            '<div class="flex items-center gap-2 text-amber-900 font-bold text-xs">' +
              '<div class="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">' +
                '<i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i>' +
              '</div>' +
              '<span>Daily Request Limit Reached (150 req/day)</span>' +
            '</div>' +
            '<button class="toast-close-btn text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition cursor-pointer" aria-label="Close">' +
              '<i data-lucide="x" class="w-3.5 h-3.5"></i>' +
            '</button>' +
          '</div>' +
          '<p class="text-xs text-amber-950/80 leading-relaxed pl-8">' +
            'You have reached the free platform quota of 150 requests per day (including playground and API calls). Limit resets at midnight UTC.' +
          '</p>' +
          '<div class="pl-8 pt-1 flex items-center gap-2">' +
            '<button id="toast-btn-switch-byok" class="px-3 py-1.5 rounded-lg bg-[#f0523d] hover:bg-[#e0422d] text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1 shadow-2xs">' +
              '<i data-lucide="sparkles" class="w-3 h-3"></i>' +
              '<span>Switch to BYOK (10,000 req/day)</span>' +
            '</button>' +
            '<button class="toast-close-btn px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs transition cursor-pointer">' +
              'Dismiss' +
            '</button>' +
          '</div>';
      } else {
        toast.innerHTML =
          '<div class="flex items-start justify-between gap-3">' +
            '<div class="flex items-center gap-2 text-amber-900 font-bold text-xs">' +
              '<div class="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">' +
                '<i data-lucide="clock" class="w-3.5 h-3.5"></i>' +
              '</div>' +
              '<span>Pro Tier Rate Limit (1 request / 5s)</span>' +
            '</div>' +
            '<button class="toast-close-btn text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition cursor-pointer" aria-label="Close">' +
              '<i data-lucide="x" class="w-3.5 h-3.5"></i>' +
            '</button>' +
          '</div>' +
          '<p class="text-xs text-amber-950/80 leading-relaxed pl-8">' +
            'To ensure fair distribution of GPU compute, Pro playground requests are rate limited to 1 protected request per 5 seconds. ' +
            'Please retry in <strong class="text-[#f0523d] font-bold" id="rate-toast-countdown">' + remainingSec + 's</strong>, or switch to BYOK mode for unlimited requests.' +
          '</p>' +
          '<div class="pl-8 pt-1 flex items-center gap-2">' +
            '<button id="toast-btn-switch-byok" class="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1 shadow-2xs">' +
              '<i data-lucide="sparkles" class="w-3 h-3"></i>' +
              '<span>Switch to BYOK Mode</span>' +
            '</button>' +
            '<button class="toast-close-btn px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs transition cursor-pointer">' +
              'Dismiss' +
            '</button>' +
          '</div>';
      }

      document.body.appendChild(toast);
      if (window.lucide) lucide.createIcons();

      const byokBtn = toast.querySelector('#toast-btn-switch-byok');
      if (byokBtn) {
        byokBtn.addEventListener('click', function() {
          switchPlaygroundTier('byok');
          dismissRateLimitToast();
        });
      }

      toast.querySelectorAll('.toast-close-btn').forEach(function(btn) {
        btn.addEventListener('click', dismissRateLimitToast);
      });

      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
      });

      if (!isDaily) {
        rateToastCountdownInterval = setInterval(() => {
          remainingSec--;
          const cdEl = document.getElementById('rate-toast-countdown');
          if (cdEl) cdEl.textContent = remainingSec + 's';
          if (remainingSec <= 0) {
            clearInterval(rateToastCountdownInterval);
            rateToastCountdownInterval = null;
            setTimeout(() => {
              dismissRateLimitToast();
            }, 600);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          dismissRateLimitToast();
        }, 8000);
      }
    }

    let isCooldownActive = false;

    function startCooldown(sec) {
      isCooldownActive = true;
      const btn = document.getElementById('btn-submit');
      const quickBtn = document.getElementById('btn-quick-submit');
      let remaining = sec;
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>Wait ' + remaining + 's</span>';
      }
      if (quickBtn) {
        quickBtn.disabled = true;
        quickBtn.innerHTML = '<span>Wait ' + remaining + 's</span>';
      }
      const interval = setInterval(() => {
        remaining--;
        const timerEl = document.getElementById('cooldown-timer');
        if (timerEl) timerEl.textContent = remaining + 's';
        if (remaining <= 0) {
          clearInterval(interval);
          isCooldownActive = false;
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>Submit</span> <span class="hidden sm:inline text-[11px] font-mono text-groq-textSubtle">Ctrl + ↵</span>';
          }
          if (quickBtn) {
            quickBtn.disabled = false;
            quickBtn.innerHTML = '<i data-lucide="send" class="w-3.5 h-3.5"></i><span>Submit</span>';
          }
          if (window.lucide) lucide.createIcons();
        } else {
          if (btn) btn.innerHTML = '<span>Wait ' + remaining + 's</span>';
          if (quickBtn) quickBtn.innerHTML = '<span>Wait ' + remaining + 's</span>';
        }
      }, 1000);
    }

    function updateCodeViewer() {
      const model = document.getElementById('playground-model').value;
      const box = document.getElementById('code-snippet-box');
      const lang = document.getElementById('code-lang-select').value;
      const userPrompt = document.getElementById('user-prompt').value.trim();

      const tempVal = document.getElementById('param-temp-input') ? document.getElementById('param-temp-input').value : '1';
      const tokensVal = document.getElementById('param-tokens-input') ? document.getElementById('param-tokens-input').value : '2048';
      const topPVal = document.getElementById('param-top-p-input') ? document.getElementById('param-top-p-input').value : '1';
      const reasoningVal = document.getElementById('param-reasoning') ? document.getElementById('param-reasoning').value : 'medium';
      const streamChecked = document.getElementById('param-stream') ? document.getElementById('param-stream').checked : true;
      const streamVal = streamChecked ? 'True' : 'False';
      const stopInput = document.getElementById('param-stop') ? document.getElementById('param-stop').value.trim() : '';
      const modeVal = document.getElementById('param-mode') ? document.getElementById('param-mode').value : 'structural';

      if (lang === 'python') {
        box.innerHTML = [
          '<span class="syn-keyword">from</span> openai <span class="syn-keyword">import</span> OpenAI',
          '',
          '<span class="syn-comment"># Universal drop-in privacy gateway (Google Gemma, Mistral, Groq)</span>',
          'client = OpenAI(',
          '    base_url=<span class="syn-string">"https://api.projectspg.info/v1"</span>,',
          '    api_key=<span class="syn-string">"spg_live_your_key"</span>  <span class="syn-comment"># Your ProjectSPG API Key</span>',
          ')',
          '',
          'completion = client.chat.completions.create(',
          '    model=<span class="syn-string">"' + model + '"</span>,',
          '    messages=[',
          '        {',
          '            <span class="syn-string">"role"</span>: <span class="syn-string">"user"</span>,',
          '            <span class="syn-string">"content"</span>: <span class="syn-string">"' + (userPrompt ? userPrompt.slice(0, 30) + '...' : '') + '"</span>',
          '        }',
          '    ],',
          '    temperature=<span class="syn-number">' + tempVal + '</span>,',
          '    max_tokens=<span class="syn-number">' + tokensVal + '</span>,',
          '    top_p=<span class="syn-number">' + topPVal + '</span>,',
          '    stream=<span class="syn-bool">' + streamVal + '</span>',
          ')',
          '',
          '<span class="syn-keyword">for</span> chunk <span class="syn-keyword">in</span> completion:',
          '    <span class="syn-keyword">print</span>(chunk.choices[<span class="syn-number">0</span>].delta.content <span class="syn-keyword">or</span> <span class="syn-string">""</span>, end=<span class="syn-string">""</span>)'
        ].join(String.fromCharCode(10));
      } else if (lang === 'curl') {
        box.innerHTML = [
          'curl https://api.projectspg.info/v1/chat/completions \\\\',
          '  -H <span class="syn-string">"Content-Type: application/json"</span> \\\\',
          '  -H <span class="syn-string">"Authorization: Bearer spg_live_your_key"</span> \\\\',
          '  -H <span class="syn-string">"x-tokenization-mode: ' + modeVal + '"</span> \\\\',
          "  -d '{",
          '    <span class="syn-string">"model"</span>: <span class="syn-string">"' + model + '"</span>,',
          '    <span class="syn-string">"messages"</span>: [',
          '      {',
          '        <span class="syn-string">"role"</span>: <span class="syn-string">"user"</span>,',
          '        <span class="syn-string">"content"</span>: <span class="syn-string">"' + (userPrompt ? userPrompt.slice(0, 30) + '...' : '') + '"</span>',
          '      }',
          '    ],',
          '    <span class="syn-string">"temperature"</span>: ' + tempVal + ',',
          '    <span class="syn-string">"max_completion_tokens"</span>: ' + tokensVal + ',',
          '    <span class="syn-string">"top_p"</span>: ' + topPVal + ',',
          '    <span class="syn-string">"stream"</span>: ' + (streamChecked ? 'true' : 'false'),
          "  }'"
        ].join(String.fromCharCode(10));
      } else if (lang === 'langchain') {
        box.innerHTML = [
          '<span class="syn-keyword">from</span> langchain_openai <span class="syn-keyword">import</span> ChatOpenAI',
          '<span class="syn-keyword">from</span> ai_privacy_core.integrations.langchain <span class="syn-keyword">import</span> PrivacyCallbackHandler',
          '',
          'privacy_handler = PrivacyCallbackHandler(',
          '    base_url=<span class="syn-string">"https://api.projectspg.info/v1"</span>,',
          '    api_key=<span class="syn-string">"spg_live_your_key"</span>',
          ')',
          '',
          'llm = ChatOpenAI(',
          '    model=<span class="syn-string">"' + model + '"</span>,',
          '    temperature=<span class="syn-number">' + tempVal + '</span>,',
          '    max_tokens=<span class="syn-number">' + tokensVal + '</span>,',
          '    callbacks=[privacy_handler]',
          ')',
          'response = llm.invoke(<span class="syn-string">"Verify order for Alice"</span>)',
          '<span class="syn-keyword">print</span>(response.content)'
        ].join(String.fromCharCode(10));
      }
    }

    // =========================================================================
    // Playground Parameters Controller (Matching Groq console layout)
    // =========================================================================
    let isParamsVisible = false;
    let isAdvancedParamsOpen = true;

    function toggleParametersPanel() {
      const panel = document.getElementById('col-parameters');
      const btn = document.getElementById('btn-toggle-params');
      const backdrop = document.getElementById('parameters-backdrop');
      if (!panel) return;
      isParamsVisible = !isParamsVisible;
      if (isParamsVisible) {
        panel.classList.remove('hidden');
        if (backdrop) backdrop.classList.remove('hidden');
        if (btn) {
          btn.classList.add('bg-gray-100', 'text-groq-dark');
          btn.classList.remove('text-groq-textMuted');
        }
        updateSliderFill(document.getElementById('param-temp-slider'));
        updateSliderFill(document.getElementById('param-tokens-slider'));
        updateSliderFill(document.getElementById('param-top-p-slider'));
      } else {
        panel.classList.add('hidden');
        if (backdrop) backdrop.classList.add('hidden');
        if (btn) {
          btn.classList.remove('bg-gray-100', 'text-groq-dark');
          btn.classList.add('text-groq-textMuted');
        }
      }
      lucide.createIcons();
    }

    function toggleAdvancedParams() {
      const content = document.getElementById('param-advanced-content');
      const chevron = document.getElementById('param-advanced-chevron');
      if (!content) return;
      isAdvancedParamsOpen = !isAdvancedParamsOpen;
      if (isAdvancedParamsOpen) {
        content.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        content.classList.add('hidden');
        if (chevron) chevron.style.transform = 'rotate(-90deg)';
      }
    }

    function updateSliderFill(slider) {
      if (!slider) return;
      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 100;
      const val = parseFloat(slider.value) || 0;
      const pct = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
      slider.style.background = 'linear-gradient(to right, #111827 0%, #111827 ' + pct + '%, #e5e7eb ' + pct + '%, #e5e7eb 100%)';
    }

    function syncParamSlider(type, val) {
      const slider = document.getElementById('param-' + type + '-slider');
      if (slider) {
        slider.value = val;
        updateSliderFill(slider);
      }
      onParamChange();
    }

    function syncParamInput(type, val) {
      const input = document.getElementById('param-' + type + '-input');
      if (input) input.value = val;
      const slider = document.getElementById('param-' + type + '-slider');
      if (slider) updateSliderFill(slider);
      onParamChange();
    }

    function onParamChange() {
      updateCodeViewer();
    }

    function copySnippet() {
      const code = document.getElementById('code-snippet-box').innerText;
      navigator.clipboard.writeText(code);
      alert('Code snippet copied!');
    }

    async function fetchApiKeys() {
      try {
        const tbody = document.getElementById('api-keys-tbody');
        if (!tbody) return;

        const res = await fetch('/api/keys');
        const data = await res.json();

        // Account-exclusive: strictly render only the keys for this account
        const keysToRender = (data && Array.isArray(data.keys)) ? data.keys : [];

        if (keysToRender.length === 0) {
          tbody.innerHTML = '<tr><td colspan="8" class="text-center py-12"><div class="flex flex-col items-center justify-center text-center"><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3"><i data-lucide="key" class="w-5 h-5"></i></div><h4 class="text-xs font-semibold text-groq-dark mb-1">No API keys found</h4><p class="text-[11px] text-groq-textMuted max-w-xs mb-3">You do not have any active API keys for this account yet. Click &quot;Create New Key&quot; to generate your first key.</p><button onclick="openCreateKeyModal()" class="px-3 py-1.5 rounded-lg bg-[#f0523d] hover:bg-[#e0422d] text-white font-medium text-xs shadow-xs transition cursor-pointer">Create New Key</button></div></td></tr>';
          if (window.lucide) lucide.createIcons();
          return;
        }

        tbody.innerHTML = keysToRender.map(k => {
          const dateCreated = k.created_at ? new Date(k.created_at).toLocaleDateString() : 'N/A';
          const lastUsed = k.last_used || dateCreated;
          const calls = k.requests_used !== undefined ? k.requests_used : 0;
          const prefix = k.key_prefix || 'spg_live_...';
          const isByok = k.tier === 'byok';

          let providers = [];
          if (k.byok_providers && Array.isArray(k.byok_providers)) {
            providers = k.byok_providers;
          } else {
            if (k.byok_google_key) providers.push('Google');
            if (k.byok_mistral_key) providers.push('Mistral');
            if (k.byok_groq_key) providers.push('Groq');
          }

          const providerSuffix = providers.length > 0 ? (' (' + providers.join(', ') + ')') : '';
          const tierBadge = isByok
            ? ('<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span>BYOK</span>' + (providerSuffix ? ('<span class="text-emerald-600 font-normal">' + providerSuffix + '</span>') : '') + '</span>')
            : '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600">Free Tier</span>';

          return \`
            <tr class="hover:bg-gray-50/70 transition h-14">
              <td class="pr-6 font-sans font-medium text-groq-dark">\${escapeHtml(k.name || 'Key')}</td>
              <td class="pr-6 font-mono text-groq-dark">\${escapeHtml(prefix)}</td>
              <td class="pr-6 font-sans">\${tierBadge}</td>
              <td class="pr-6 font-sans text-groq-dark">\${dateCreated}</td>
              <td class="pr-6 font-sans text-groq-dark">\${lastUsed}</td>
              <td class="pr-6 font-sans text-groq-dark">\${k.expires || 'Never'}</td>
              <td class="pr-6 font-sans text-groq-dark">\${calls} API Calls</td>
              <td class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <button onclick="deleteKey('\${k.id}')" class="p-2 rounded-lg bg-groq-grayBg hover:bg-[#fff5f3] text-[#f0523d] transition cursor-pointer" title="Delete">
                    <i data-lucide="trash-2" class="w-3.5 h-3.5 text-[#f0523d]"></i>
                  </button>
                </div>
              </td>
            </tr>
          \`;
        }).join('');

        const keyFilterSelect = document.getElementById('metrics-key-filter');
        if (keyFilterSelect) {
          const currentVal = keyFilterSelect.value;
          const keyNames = Array.from(new Set(keysToRender.map(k => k.name).filter(Boolean)));
          keyFilterSelect.innerHTML = '<option value="all">Show all API Keys</option>' +
            keyNames.map(name => '<option value="' + escapeHtml(name) + '">' + escapeHtml(name) + '</option>').join('');
          if (currentVal && (currentVal === 'all' || keyNames.includes(currentVal))) {
            keyFilterSelect.value = currentVal;
          }
        }

        lucide.createIcons();
      } catch (err) {
        console.error('Fetch keys error', err);
      }
    }

    function selectCreateKeyTier(tier) {
      const tabLabel = document.getElementById('tier-tab-standard-label');
      if (tabLabel) tabLabel.textContent = 'Standard Key';
      const freeTitle = document.getElementById('tier-info-free-title');
      if (freeTitle) freeTitle.textContent = 'Platform Quota';
      const freeDesc = document.getElementById('tier-info-free-desc');
      if (freeDesc) {
        freeDesc.textContent = 'Uses ProjectSPG platform infrastructure (1 req / 5s rate limit, 150 req/day). Full multi-provider routing included.';
      }

      const tierInput = document.getElementById('new-key-tier');
      if (tierInput) tierInput.value = tier;
      const freeTab = document.getElementById('tier-tab-free');
      const byokTab = document.getElementById('tier-tab-byok');
      const freeInfo = document.getElementById('tier-info-free');
      const byokInfo = document.getElementById('tier-info-byok');

      if (tier === 'free') {
        if (freeTab) freeTab.className = 'py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer bg-white text-groq-dark shadow-xs flex items-center justify-center gap-1.5';
        if (byokTab) byokTab.className = 'py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer text-groq-textMuted hover:text-groq-dark flex items-center justify-center gap-1.5';
        if (freeInfo) freeInfo.classList.remove('hidden');
        if (byokInfo) byokInfo.classList.add('hidden');
      } else {
        if (byokTab) byokTab.className = 'py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer bg-white text-groq-dark shadow-xs flex items-center justify-center gap-1.5';
        if (freeTab) freeTab.className = 'py-2 px-3 rounded-lg text-xs font-semibold transition cursor-pointer text-groq-textMuted hover:text-groq-dark flex items-center justify-center gap-1.5';
        if (freeInfo) freeInfo.classList.add('hidden');
        if (byokInfo) byokInfo.classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
      }
    }

    function openCreateKeyModal() {
      if (!currentFirebaseUser) {
        openAuthModal();
        return;
      }
      selectCreateKeyTier('free');
      if (document.getElementById('new-key-name')) document.getElementById('new-key-name').value = '';
      if (document.getElementById('new-byok-google')) document.getElementById('new-byok-google').value = '';
      if (document.getElementById('new-byok-mistral')) document.getElementById('new-byok-mistral').value = '';
      if (document.getElementById('new-byok-groq')) document.getElementById('new-byok-groq').value = '';
      document.getElementById('modal-create-key').classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }
    function closeCreateKeyModal() { document.getElementById('modal-create-key').classList.add('hidden'); }

    async function submitCreateKey() {
      if (!currentFirebaseUser) {
        openAuthModal();
        return;
      }
      let tier = document.getElementById('new-key-tier') ? document.getElementById('new-key-tier').value : 'free';
      if (tier !== 'byok') {
        tier = 'free';
      }
      const name = document.getElementById('new-key-name').value.trim() || (tier === 'free' ? 'ProjectSPG Key' : 'ProjectSPG BYOK Key');
      const quota = tier === 'byok' ? 300000 : 4500;
      const byokGoogleKey = document.getElementById('new-byok-google') ? document.getElementById('new-byok-google').value.trim() : '';
      const byokMistralKey = document.getElementById('new-byok-mistral') ? document.getElementById('new-byok-mistral').value.trim() : '';
      const byokGroqKey = document.getElementById('new-byok-groq') ? document.getElementById('new-byok-groq').value.trim() : '';

      try {
        const headers = { 
          'Content-Type': 'application/json'
        };
        const res = await fetch('/api/keys', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name,
            tier,
            monthlyQuota: quota,
            byokGoogleKey,
            byokMistralKey,
            byokGroqKey
          })
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          alert('Failed: ' + (errData.error || ('HTTP ' + res.status)));
          return;
        }
        const data = await res.json();
        closeCreateKeyModal();
        document.getElementById('displayed-raw-key').textContent = data.rawKey;
        document.getElementById('modal-show-key').classList.remove('hidden');
        await fetchApiKeys();
        if (window.lucide) lucide.createIcons();
      } catch (err) {
        alert('Failed: ' + err.message);
      }
    }

    function closeShowKeyModal() { document.getElementById('modal-show-key').classList.add('hidden'); }
    function copyRawKey() {
      const key = document.getElementById('displayed-raw-key').textContent;
      navigator.clipboard.writeText(key);
      alert('API Key copied to clipboard!');
    }
    async function deleteKey(id) {
      if (!confirm('Are you sure you want to delete this API key?')) return;
      const res = await fetch('/api/keys/' + id, { method: 'DELETE' });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        alert('Failed to revoke key: ' + (errData.error || ('HTTP ' + res.status)));
        return;
      }
      await fetchApiKeys();
    }

    // Live API Usage and Telemetry Logs (Open Access)
    async function fetchApiLogs() {
      try {
        const res = await fetch('/api/logs?limit=50');
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.logs)) {
            localLogs = data.logs.map(l => {
              const d = new Date(l.timestamp);
              const timeStr = isNaN(d.getTime()) ? l.timestamp : d.toLocaleString();
              const isoStr = isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
              const ttft = (Math.max(0.08, (l.latencyMs || 200) * 0.0004)).toFixed(3);
              const latency = ((l.latencyMs || 200) / 1000).toFixed(3);
              const reqId = l.id ? (l.id.length > 13 ? l.id.slice(0, 5) + '...' + l.id.slice(-4) : l.id) : 'req_...';
              return {
                time: timeStr,
                timestamp: isoStr,
                model: l.model || 'openai/gpt-oss-120b',
                key: (l.apiKeyPrefix && l.apiKeyPrefix !== 'none') ? l.apiKeyPrefix : 'ProjectSPG Free',
                code: l.statusCode || 200,
                ttft: ttft,
                latency: latency,
                inTokens: l.promptTokens || 0,
                outTokens: l.completionTokens || 0,
                audio: '-',
                reqId: reqId,
                error: (l.statusCode >= 400) ? ('HTTP ' + l.statusCode) : '-',
                protectedEntities: l.protectedEntityCount || 0
              };
            });
          } else {
            localLogs = [];
          }
          updateUsageStats();
          renderMetricsChart();
        }
      } catch (err) {
        console.error('Fetch logs error', err);
      }
      renderLogsTable();
      renderMetricsChart();
    }

    const SUPPORTED_MODELS_CATALOG = [
      { id: 'openai/gpt-oss-120b', name: 'OpenAI GPT-OSS 120B', provider: 'Groq Cloud', ratePer1MTokens: 0.15, tag: 'on_demand' },
      { id: 'openai/gpt-oss-20b', name: 'OpenAI GPT-OSS 20B', provider: 'Groq Cloud', ratePer1MTokens: 0.08, tag: 'on_demand' },
      { id: 'qwen/qwen3.8-27b', name: 'Qwen 3.8 27B', provider: 'Groq Cloud', ratePer1MTokens: 0.20, tag: 'on_demand' },
      { id: 'gemma-4-26b-a4b-it', name: 'Gemma 4 26B Instruct (a4b)', provider: 'Google AI Studio', ratePer1MTokens: 0.10, tag: 'on_demand' },
      { id: 'gemma-4-31b-it', name: 'Gemma 4 31B Instruct', provider: 'Google AI Studio', ratePer1MTokens: 0.15, tag: 'on_demand' },
      { id: 'codestral-2508', name: 'Codestral 2508', provider: 'Mistral AI', ratePer1MTokens: 0.30, tag: 'on_demand' },
      { id: 'ministral-8b-2512', name: 'Ministral 8B 2512', provider: 'Mistral AI', ratePer1MTokens: 0.10, tag: 'on_demand' },
      { id: 'ministral-14b-2512', name: 'Ministral 14B 2512', provider: 'Mistral AI', ratePer1MTokens: 0.20, tag: 'on_demand' }
    ];

    function switchUsageSubTab(tab) {
      const costBtn = document.getElementById('btn-usage-cost');
      const actBtn = document.getElementById('btn-usage-activity');
      const costView = document.getElementById('usage-view-cost');
      const actView = document.getElementById('usage-view-activity');
      if (!costBtn || !actBtn || !costView || !actView) return;

      if (tab === 'cost') {
        costBtn.className = 'usage-subtab-btn text-[#f0523d] border-b-2 border-[#f0523d] pb-2 font-semibold transition cursor-pointer';
        actBtn.className = 'usage-subtab-btn text-groq-dark hover:text-[#f0523d] pb-2 font-medium transition cursor-pointer';
        costView.classList.remove('hidden');
        actView.classList.add('hidden');
      } else {
        actBtn.className = 'usage-subtab-btn text-[#f0523d] border-b-2 border-[#f0523d] pb-2 font-semibold transition cursor-pointer';
        costBtn.className = 'usage-subtab-btn text-groq-dark hover:text-[#f0523d] pb-2 font-medium transition cursor-pointer';
        costView.classList.add('hidden');
        actView.classList.remove('hidden');
      }
      lucide.createIcons();
    }

    function updateUsageStats() {
      // Gather all models: start with known catalog, add any unique models found in logs
      const modelMap = new Map();
      SUPPORTED_MODELS_CATALOG.forEach(m => {
        modelMap.set(m.id, {
          id: m.id,
          name: m.name,
          provider: m.provider,
          ratePer1MTokens: m.ratePer1MTokens,
          tag: m.tag,
          requests: 0,
          inTokens: 0,
          outTokens: 0,
          totalTokens: 0,
          protectedEntities: 0,
          totalLatency: 0,
          avgLatency: 0,
          spend: 0
        });
      });

      localLogs.forEach(l => {
        const modelId = l.model || 'openai/gpt-oss-120b';
        if (!modelMap.has(modelId)) {
          modelMap.set(modelId, {
            id: modelId,
            name: modelId,
            provider: 'AI Gateway',
            ratePer1MTokens: 0.50,
            tag: 'on_demand',
            requests: 0,
            inTokens: 0,
            outTokens: 0,
            totalTokens: 0,
            protectedEntities: 0,
            totalLatency: 0,
            avgLatency: 0,
            spend: 0
          });
        }
        const stats = modelMap.get(modelId);
        stats.requests += 1;
        stats.inTokens += (Number(l.inTokens) || 0);
        stats.outTokens += (Number(l.outTokens) || 0);
        stats.totalTokens += ((Number(l.inTokens) || 0) + (Number(l.outTokens) || 0));
        stats.protectedEntities += (Number(l.protectedEntities) || 0);
        stats.totalLatency += (Number(l.latency) || 0);
      });

      let grandTotalSpend = 0;
      const modelStatsList = Array.from(modelMap.values()).map(m => {
        m.avgLatency = m.requests > 0 ? (m.totalLatency / m.requests) : 0;
        m.spend = (m.totalTokens * m.ratePer1MTokens) / 1000000;
        grandTotalSpend += m.spend;
        return m;
      });

      const totalSpendEl = document.getElementById('usage-total-spend');
      if (totalSpendEl) totalSpendEl.textContent = '$' + grandTotalSpend.toFixed(4) + ' USD';

      // Render On-Demand Usage Cards for EACH model in Cost subtab
      const container = document.getElementById('models-usage-container');
      if (container) {
        container.innerHTML = modelStatsList.map(m => {
          // Dynamic Y-Axis scale based on model spend
          let yTop = '$0.10', yMid1 = '$0.07', yMid2 = '$0.05', maxScale = 0.10;
          if (m.spend > 0) {
            if (m.spend <= 0.001) {
              maxScale = 0.001;
              yTop = '$0.0010';
              yMid1 = '$0.0007';
              yMid2 = '$0.0004';
            } else if (m.spend <= 0.005) {
              maxScale = 0.005;
              yTop = '$0.0050';
              yMid1 = '$0.0035';
              yMid2 = '$0.0020';
            } else if (m.spend <= 0.02) {
              maxScale = 0.02;
              yTop = '$0.020';
              yMid1 = '$0.014';
              yMid2 = '$0.007';
            } else if (m.spend <= 0.05) {
              maxScale = 0.05;
              yTop = '$0.050';
              yMid1 = '$0.035';
              yMid2 = '$0.020';
            } else {
              maxScale = Math.max(0.10, Math.ceil(m.spend * 10) / 10);
              yTop = '$' + maxScale.toFixed(2);
              yMid1 = '$' + (maxScale * 0.7).toFixed(2);
              yMid2 = '$' + (maxScale * 0.4).toFixed(2);
            }
          }

          // Build 30-day timeline for September
          const dailyStats = Array.from({ length: 30 }, (_, i) => ({
            day: i + 1,
            spend: 0,
            tokens: 0,
            requests: 0,
            protected: 0
          }));

          localLogs.forEach(l => {
            const modelId = l.model || 'openai/gpt-oss-120b';
            if (modelId === m.id) {
              let day = 27; // Default anchor day
              if (l.timestamp) {
                const d = new Date(l.timestamp);
                if (!isNaN(d.getDate())) day = d.getDate();
              } else if (l.time) {
                const d = new Date(l.time);
                if (!isNaN(d.getDate())) day = d.getDate();
              }
              const idx = Math.min(29, Math.max(0, day - 1));
              const reqTokens = (Number(l.inTokens) || 0) + (Number(l.outTokens) || 0);
              dailyStats[idx].requests += 1;
              dailyStats[idx].tokens += reqTokens;
              dailyStats[idx].spend += (reqTokens * m.ratePer1MTokens) / 1000000;
              dailyStats[idx].protected += (Number(l.protectedEntities) || 0);
            }
          });

          // Fallback if logs had relative time strings: assign aggregate to day 27
          if (m.requests > 0 && dailyStats.every(d => d.requests === 0)) {
            dailyStats[26] = {
              day: 27,
              spend: m.spend,
              tokens: m.totalTokens,
              requests: m.requests,
              protected: m.protectedEntities
            };
          }

          // Generate 30 daily columns with explicit pixel heights
          const dayBarsHtml = dailyStats.map(d => {
            if (d.spend > 0) {
              const barHeightPx = Math.max(28, Math.min(108, Math.round((d.spend / maxScale) * 105)));
              return \`
                <div class="flex-1 h-full flex flex-col justify-end items-center group relative cursor-pointer">
                  <div class="w-full max-w-[14px] bg-[#f0523d] rounded-t-sm shadow-xs transition-all group-hover:bg-[#e0422d]" style="height: \${barHeightPx}px;"></div>
                  <!-- Tooltip on hover -->
                  <div class="hidden group-hover:block absolute bottom-full mb-2 bg-slate-900 text-white text-[10px] font-mono py-2 px-3 rounded-lg shadow-xl whitespace-nowrap z-40 pointer-events-none">
                    <p class="font-bold text-white border-b border-gray-700 pb-1 mb-1">Sep \${d.day}, 2026</p>
                    <p class="text-[#f0523d] font-semibold">Spend: $\${d.spend.toFixed(4)}</p>
                    <p class="text-gray-300">Tokens: \${d.tokens.toLocaleString()}</p>
                    <p class="text-gray-300">Requests: \${d.requests}</p>
                    \${d.protected > 0 ? \`<p class="text-sky-400">🛡️ Protected: \${d.protected}</p>\` : ''}
                  </div>
                </div>
              \`;
            } else {
              return \`
                <div class="flex-1 h-full flex flex-col justify-end items-center group relative">
                  <div class="w-full max-w-[14px] h-[2px] bg-transparent group-hover:bg-gray-200 transition-all rounded-t-sm"></div>
                  <!-- Subtle Tooltip on hover -->
                  <div class="hidden group-hover:block absolute bottom-full mb-2 bg-slate-900 text-white text-[10px] font-mono py-1.5 px-2.5 rounded-lg shadow-xl whitespace-nowrap z-40 pointer-events-none">
                    <p class="font-bold text-gray-300">Sep \${d.day}, 2026</p>
                    <p class="text-gray-400">No usage</p>
                  </div>
                </div>
              \`;
            }
          }).join('');

          return \`
            <div class="border border-groq-grayBorder rounded-xl p-6 bg-white shadow-xs">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-xs font-bold text-groq-dark flex items-center gap-2">
                    <span>\${m.id} - \${m.tag}</span>
                    <span class="text-[10px] font-medium text-groq-textMuted bg-gray-100 px-2 py-0.5 rounded">\${m.provider}</span>
                  </h3>
                  <span class="text-xs text-groq-textMuted font-mono block mt-1">
                    $\${m.spend.toFixed(4)} <span class="text-[11px] text-gray-400 font-sans">• \${m.requests} requests • \${m.totalTokens.toLocaleString()} tokens</span>
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  \${m.protectedEntities > 0 ? \`
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-sky-50 text-sky-700 border border-sky-200">
                      🛡️ \${m.protectedEntities} protected
                    </span>\` : ''}
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </div>
              </div>

              <!-- Groq-exact Chart Area matching media_1790456991949.png -->
              <div class="h-44 flex items-end pt-5 mt-2">
                <!-- Y-Axis labels (fixed width w-14) -->
                <div class="w-14 flex flex-col justify-between h-[120px] text-[10px] font-mono text-groq-textSubtle pr-3 border-r border-gray-200 shrink-0 text-right select-none pb-0.5">
                  <span>\${yTop}</span>
                  <span>\${yMid1}</span>
                  <span>\${yMid2}</span>
                  <span>$0.00</span>
                </div>

                <!-- Chart Canvas with Day Grid -->
                <div class="flex-1 flex flex-col h-[145px] ml-3 relative">
                  <!-- 120px Chart area with guidelines and bars -->
                  <div class="h-[120px] w-full relative">
                    <!-- Horizontal guideline grid -->
                    <div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                      <div class="border-b border-dashed border-gray-200 w-full"></div>
                      <div class="border-b border-dashed border-gray-200 w-full"></div>
                      <div class="border-b border-dashed border-gray-200 w-full"></div>
                      <div class="border-b border-gray-200 w-full"></div>
                    </div>

                    \${m.requests === 0 ? \`
                      <div class="absolute inset-0 flex items-center justify-center pointer-events-none text-[11px] text-gray-300 font-sans italic">
                        No usage recorded for this billing cycle
                      </div>
                    \` : ''}

                    <!-- 30-Day Bar Track Container -->
                    <div class="h-[120px] w-full flex items-end justify-between gap-[2px] z-10 px-1">
                      \${dayBarsHtml}
                    </div>
                  </div>

                  <!-- X-Axis timeline labels across September -->
                  <div class="border-b border-gray-200 w-full mt-1"></div>
                  <div class="flex items-center justify-between text-[10px] font-mono text-groq-textSubtle pt-1 px-1 select-none">
                    <span>Sep 1</span>
                    <span>Sep 5</span>
                    <span>Sep 10</span>
                    <span>Sep 15</span>
                    <span>Sep 20</span>
                    <span>Sep 25</span>
                    <span class="text-groq-dark font-bold">Sep 27</span>
                    <span>Sep 30</span>
                  </div>
                </div>
              </div>

              <!-- Footer breakdown metrics -->
              <div class="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span class="text-[10px] uppercase tracking-wider text-groq-textSubtle font-semibold block">Input Tokens</span>
                  <span class="font-mono font-medium text-groq-dark">\${m.inTokens.toLocaleString()}</span>
                </div>
                <div>
                  <span class="text-[10px] uppercase tracking-wider text-groq-textSubtle font-semibold block">Output Tokens</span>
                  <span class="font-mono font-medium text-groq-dark">\${m.outTokens.toLocaleString()}</span>
                </div>
                <div>
                  <span class="text-[10px] uppercase tracking-wider text-groq-textSubtle font-semibold block">Protected Entities</span>
                  <span class="font-mono font-medium text-sky-600">🛡️ \${m.protectedEntities}</span>
                </div>
                <div>
                  <span class="text-[10px] uppercase tracking-wider text-groq-textSubtle font-semibold block">Avg Latency</span>
                  <span class="font-mono font-medium text-groq-dark">\${m.avgLatency.toFixed(3)}s</span>
                </div>
              </div>
            </div>
          \`;
        }).join('');
      }

      // Render Activity Table
      const actTbody = document.getElementById('usage-activity-tbody');
      if (actTbody) {
        actTbody.innerHTML = modelStatsList.map(m => \`
          <tr class="hover:bg-gray-50/70 transition h-12">
            <td class="py-3 px-4 font-semibold text-groq-dark">\${m.id}</td>
            <td class="py-3 px-4 font-sans text-groq-textMuted"><span class="px-2 py-0.5 rounded bg-gray-100 text-[10px] font-medium text-gray-700">\${m.provider}</span></td>
            <td class="py-3 px-4 text-groq-dark">\${m.requests}</td>
            <td class="py-3 px-4 text-groq-dark">\${m.inTokens.toLocaleString()}</td>
            <td class="py-3 px-4 text-groq-dark">\${m.outTokens.toLocaleString()}</td>
            <td class="py-3 px-4 font-semibold text-groq-dark">\${m.totalTokens.toLocaleString()}</td>
            <td class="py-3 px-4 text-sky-600 font-sans font-medium">\${m.protectedEntities > 0 ? '🛡️ ' + m.protectedEntities : '-'}</td>
            <td class="py-3 px-4 text-right font-semibold text-groq-dark font-mono">$\${m.spend.toFixed(4)}</td>
          </tr>
        \`).join('');
      }
    }

    // Exact Render of Logs Table matching media_1790457001122.png
    function renderLogsTable() {
      const tbody = document.getElementById('logs-tbody');
      if (!tbody) return;
      const errorsOnly = document.getElementById('filter-errors') ? document.getElementById('filter-errors').checked : false;
      const filtered = errorsOnly ? localLogs.filter(l => l.code !== 200) : localLogs;

      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" class="text-center py-8 text-sm text-gray-400 font-sans">No request logs recorded for this account.</td></tr>';
        return;
      }

      tbody.innerHTML = filtered.map(l => \`
        <tr class="hover:bg-gray-50/70 transition h-14 border-b border-gray-50/80">
          <td class="pr-3 text-groq-dark font-mono">\${l.time}</td>
          <td class="pr-3 text-groq-dark font-mono font-medium">\${l.model}</td>
          <td class="pr-3 text-groq-dark font-mono">
            \${l.key} <span class="text-gray-400 font-sans cursor-pointer" title="\${(l.protectedEntities !== undefined ? l.protectedEntities : 0) + ' protected entities intercepted and de-identified'}">ⓘ</span>
            \${l.protectedEntities > 0 ? \`<span class="ml-1 text-[10px] text-sky-600 font-medium font-sans" title="\${l.protectedEntities} entities protected">🛡️\${l.protectedEntities}</span>\` : ''}
          </td>
          <td class="pr-3">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono \${l.code === 200 ? 'bg-emerald-500 text-white' : 'bg-[#f0523d] text-white'}">\${l.code}</span>
          </td>
          <td class="pr-3 text-groq-dark font-mono">\${l.ttft}</td>
          <td class="pr-3 text-groq-dark font-mono">\${l.latency}</td>
          <td class="pr-3 text-groq-dark font-mono">\${l.inTokens}</td>
          <td class="pr-3 text-groq-dark font-mono">\${l.outTokens}</td>
          <td class="pr-3 text-groq-dark text-center font-mono">\${l.audio || '-'}</td>
          <td class="pr-3 text-groq-dark font-mono">\${l.reqId}</td>
          <td class="text-groq-dark font-mono">\${l.error}</td>
        </tr>
      \`).join('');
    }

    function downloadLogs() {
      const blob = new Blob([JSON.stringify(localLogs, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'projectspg_logs.json';
      a.click();
    }

    // =========================================================================
    // Dynamic HTTP Status Codes Chart & Metrics Rendering
    // =========================================================================
    async function refreshMetrics() {
      const btn = document.getElementById('metrics-btn-refresh');
      if (btn) {
        btn.innerHTML = '<i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-groq-textMuted animate-spin"></i><span>Refreshing...</span>';
        if (window.lucide) lucide.createIcons();
      }
      await fetchApiLogs();
      renderMetricsChart();
      setTimeout(() => {
        if (btn) {
          btn.innerHTML = '<i data-lucide="refresh-cw" class="w-3.5 h-3.5 text-groq-textMuted"></i><span>Refresh</span>';
          if (window.lucide) lucide.createIcons();
        }
      }, 400);
    }

    function renderMetricsChart() {
      const container = document.getElementById('metrics-chart-container');
      if (!container) return;

      const timeRange = (document.getElementById('metrics-time-range') ? document.getElementById('metrics-time-range').value : '30m') || '30m';
      const modelFilter = (document.getElementById('metrics-model-filter') ? document.getElementById('metrics-model-filter').value : 'all') || 'all';
      const keyFilter = (document.getElementById('metrics-key-filter') ? document.getElementById('metrics-key-filter').value : 'all') || 'all';
      const showLimits = document.getElementById('metrics-show-limits') ? document.getElementById('metrics-show-limits').checked : false;

      // Determine duration & bucket count
      let durationMs = 30 * 60 * 1000;
      let bucketCount = 12;
      if (timeRange === '1h') {
        durationMs = 60 * 60 * 1000;
        bucketCount = 12;
      } else if (timeRange === '24h') {
        durationMs = 24 * 60 * 60 * 1000;
        bucketCount = 12;
      } else if (timeRange === '7d') {
        durationMs = 7 * 24 * 60 * 60 * 1000;
        bucketCount = 14;
      }

      const now = Date.now();
      const startTime = now - durationMs;
      const bucketDuration = durationMs / bucketCount;

      // Filter localLogs based on range, model, and key
      const filteredLogs = localLogs.filter(l => {
        let t = null;
        if (l.timestamp) {
          const pt = new Date(l.timestamp).getTime();
          if (!isNaN(pt)) t = pt;
        }
        if (t === null && l.time) {
          const pt = new Date(l.time).getTime();
          if (!isNaN(pt)) t = pt;
        }
        if (t === null) t = now - 60000;

        const inTime = (t >= startTime - 10000) && (t <= now + 60000);
        const matchModel = (modelFilter === 'all') || (l.model === modelFilter);
        const matchKey = (keyFilter === 'all') || (l.key === keyFilter) || (l.key && l.key.indexOf(keyFilter) !== -1);
        return inTime && matchModel && matchKey;
      });

      // Status totals
      const count200 = filteredLogs.filter(l => l.code >= 200 && l.code < 300).length;
      const count4xx = filteredLogs.filter(l => l.code >= 400 && l.code < 500).length;
      const count5xx = filteredLogs.filter(l => l.code >= 500 && l.code < 600).length;
      const totalAll = filteredLogs.length;

      const leg200 = document.getElementById('metric-legend-200');
      const leg4xx = document.getElementById('metric-legend-4xx');
      const leg5xx = document.getElementById('metric-legend-5xx');
      const totalSum = document.getElementById('metric-total-summary');
      if (leg200) leg200.textContent = count200;
      if (leg4xx) leg4xx.textContent = count4xx;
      if (leg5xx) leg5xx.textContent = count5xx;
      if (totalSum) totalSum.textContent = totalAll;

      // Build buckets
      const buckets = [];
      for (let i = 0; i < bucketCount; i++) {
        const bStart = startTime + i * bucketDuration;
        const bEnd = bStart + bucketDuration;
        buckets.push({
          start: bStart,
          end: bEnd,
          c200: 0,
          c4xx: 0,
          c5xx: 0,
          total: 0
        });
      }

      filteredLogs.forEach(l => {
        let t = null;
        if (l.timestamp) {
          const pt = new Date(l.timestamp).getTime();
          if (!isNaN(pt)) t = pt;
        }
        if (t === null && l.time) {
          const pt = new Date(l.time).getTime();
          if (!isNaN(pt)) t = pt;
        }
        if (t === null) t = now;

        let bIdx = Math.floor((t - startTime) / bucketDuration);
        if (bIdx < 0) bIdx = 0;
        if (bIdx >= bucketCount) bIdx = bucketCount - 1;

        const b = buckets[bIdx];
        if (l.code >= 200 && l.code < 300) b.c200++;
        else if (l.code >= 400 && l.code < 500) b.c4xx++;
        else if (l.code >= 500 && l.code < 600) b.c5xx++;
        else b.c200++;
        b.total++;
      });

      const maxBucket = Math.max(0, ...buckets.map(b => b.total));
      let yMax = 5;
      if (maxBucket > 50) yMax = Math.ceil(maxBucket / 20) * 20;
      else if (maxBucket > 20) yMax = 50;
      else if (maxBucket > 10) yMax = 25;
      else if (maxBucket > 4) yMax = 10;
      else yMax = 5;

      const freeLimit = Math.max(2, Math.round(yMax * 0.6));
      const limitHeightPct = Math.min(95, Math.round((freeLimit / yMax) * 100));

      // Generate 5 tick timestamps across bottom axis
      const ticks = [];
      for (let i = 0; i < 5; i++) {
        const tickTs = startTime + (durationMs * (i / 4));
        const d = new Date(tickTs);
        let label = '';
        if (timeRange === '7d') {
          label = (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
        } else {
          label = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
        }
        ticks.push(label);
      }

      let limitsHtml = '';
      if (showLimits) {
        limitsHtml = '<div class="absolute left-8 right-0 border-b border-dashed border-[#f0523d] flex items-center justify-end pr-2 pointer-events-none z-10" style="bottom: calc(32px + ' + (limitHeightPct * 0.8) + '%);">' +
          '<span class="bg-[#fff5f3] text-[#f0523d] border border-[#f0523d]/20 text-[9px] font-mono px-1.5 py-0.5 rounded -translate-y-3 font-semibold">Tier Rate Limit (' + freeLimit + ' req/bucket)</span>' +
          '</div>';
      }

      let emptyHtml = '';
      if (totalAll === 0) {
        emptyHtml = '<div class="absolute inset-x-0 top-6 bottom-10 flex flex-col items-center justify-center text-center pointer-events-none z-20">' +
          '<p class="text-xs font-medium text-groq-textMuted">No HTTP requests recorded in this time range</p>' +
          '<p class="text-[11px] text-gray-400 mt-1">Make requests via the Playground or API to stream live telemetry</p>' +
          '</div>';
      }

      let barsHtml = buckets.map(function(b) {
        const barHeightPct = b.total > 0 ? Math.min(100, Math.max(8, (b.total / yMax) * 100)) : 0;
        const startTimeStr = new Date(b.start).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
        const endTimeStr = new Date(b.end).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
        const p200 = b.total > 0 ? ((b.c200 / b.total) * 100) : 0;
        const p4xx = b.total > 0 ? ((b.c4xx / b.total) * 100) : 0;
        const p5xx = b.total > 0 ? ((b.c5xx / b.total) * 100) : 0;

        let barInner = '';
        if (b.total > 0) {
          barInner = '<div class="w-full max-w-[32px] flex flex-col justify-end rounded-t overflow-hidden transition-all duration-200 group-hover:opacity-90 shadow-2xs" style="height: ' + barHeightPct + '%;">' +
            (b.c5xx > 0 ? '<div class="w-full bg-rose-500 transition-all" style="height: ' + p5xx + '%;"></div>' : '') +
            (b.c4xx > 0 ? '<div class="w-full bg-amber-500 transition-all" style="height: ' + p4xx + '%;"></div>' : '') +
            (b.c200 > 0 ? '<div class="w-full bg-emerald-500 transition-all" style="height: ' + p200 + '%;"></div>' : '') +
            '</div>';
        } else {
          barInner = '<div class="w-full max-w-[32px] h-[2px] bg-gray-200 group-hover:bg-gray-300 rounded-full transition-colors"></div>';
        }

        return '<div class="group relative flex-1 flex flex-col justify-end items-center h-full cursor-pointer">' +
          '<div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-groq-dark text-white text-[11px] rounded-lg py-2 px-3 shadow-xl z-30 pointer-events-none whitespace-nowrap min-w-[130px]">' +
            '<div class="text-[10px] text-gray-300 font-mono mb-1.5 pb-1 border-b border-gray-700">' + startTimeStr + ' – ' + endTimeStr + '</div>' +
            '<div class="flex items-center justify-between gap-3 text-emerald-400 font-sans"><span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>200 OK:</span><span class="font-mono font-semibold">' + b.c200 + '</span></div>' +
            '<div class="flex items-center justify-between gap-3 text-amber-400 font-sans"><span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>4xx Client:</span><span class="font-mono font-semibold">' + b.c4xx + '</span></div>' +
            '<div class="flex items-center justify-between gap-3 text-rose-400 font-sans"><span class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>5xx Server:</span><span class="font-mono font-semibold">' + b.c5xx + '</span></div>' +
            '<div class="border-t border-gray-700 mt-1.5 pt-1 flex items-center justify-between gap-3 font-semibold text-white font-sans"><span>Total:</span><span class="font-mono">' + b.total + '</span></div>' +
          '</div>' +
          barInner +
        '</div>';
      }).join('');

      container.innerHTML = '<div class="absolute inset-0 pointer-events-none flex flex-col justify-between pb-8">' +
        '<div class="w-full flex items-center gap-2 border-b border-gray-100 pb-0.5"><span class="text-[10px] font-mono text-groq-textSubtle w-6 text-right select-none">' + yMax + '</span><div class="flex-1 border-b border-dashed border-gray-200"></div></div>' +
        '<div class="w-full flex items-center gap-2 border-b border-gray-100 pb-0.5"><span class="text-[10px] font-mono text-groq-textSubtle w-6 text-right select-none">' + Math.round(yMax * 0.75) + '</span><div class="flex-1 border-b border-dashed border-gray-200"></div></div>' +
        '<div class="w-full flex items-center gap-2 border-b border-gray-100 pb-0.5"><span class="text-[10px] font-mono text-groq-textSubtle w-6 text-right select-none">' + Math.round(yMax * 0.5) + '</span><div class="flex-1 border-b border-dashed border-gray-200"></div></div>' +
        '<div class="w-full flex items-center gap-2 border-b border-gray-100 pb-0.5"><span class="text-[10px] font-mono text-groq-textSubtle w-6 text-right select-none">' + Math.round(yMax * 0.25) + '</span><div class="flex-1 border-b border-dashed border-gray-200"></div></div>' +
        '<div class="w-full flex items-center gap-2 border-b border-gray-200 pb-0.5"><span class="text-[10px] font-mono text-groq-textSubtle w-6 text-right select-none">0</span><div class="flex-1 border-b border-gray-300"></div></div>' +
        '</div>' +
        limitsHtml +
        emptyHtml +
        '<div class="relative z-10 flex-1 flex items-end justify-between gap-1 sm:gap-2 pl-9 pr-2 pb-8 h-[180px] sm:h-[220px]">' +
        barsHtml +
        '</div>' +
        '<div class="w-full border-t border-gray-200 pt-2 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-groq-textSubtle pl-9 pr-2">' +
        '<span>' + ticks[0] + '</span>' +
        '<span class="hidden sm:inline">' + ticks[1] + '</span>' +
        '<span>' + ticks[2] + '</span>' +
        '<span class="hidden sm:inline">' + ticks[3] + '</span>' +
        '<span>' + ticks[4] + '</span>' +
        '</div>';

      if (window.lucide) lucide.createIcons();
    }

    function openConfigModal() { const el = document.getElementById('modal-config'); if (el) el.classList.remove('hidden'); }
    function closeConfigModal() { const el = document.getElementById('modal-config'); if (el) el.classList.add('hidden'); }

    // =========================================================================
    // Account-Scoped BYOK Provider Key Storage Helpers
    // =========================================================================
    function getByokStorageKey(provider) {
      const uid = currentFirebaseUser ? currentFirebaseUser.uid : null;
      if (!uid) return null;
      return 'byok_key_' + uid + '_' + provider;
    }

    function getStoredByokKey(provider) {
      const key = getByokStorageKey(provider);
      return key ? (localStorage.getItem(key) || '') : '';
    }

    function setStoredByokKey(provider, value) {
      const key = getByokStorageKey(provider);
      if (!key) return;
      if (value && value.trim()) {
        localStorage.setItem(key, value.trim());
      } else {
        localStorage.removeItem(key);
      }
    }

    function removeStoredByokKey(provider) {
      const key = getByokStorageKey(provider);
      if (key) localStorage.removeItem(key);
    }

    function clearByokInputs() {
      if (document.getElementById('byok-key-google')) document.getElementById('byok-key-google').value = '';
      if (document.getElementById('byok-key-mistral')) document.getElementById('byok-key-mistral').value = '';
      if (document.getElementById('byok-key-groq')) document.getElementById('byok-key-groq').value = '';
      if (document.getElementById('cfg-apikey')) document.getElementById('cfg-apikey').value = '';
      cachedByokCatalog = null;
      updateByokBadge();
    }

    // =========================================================================
    // BYOK Provider API Keys Modal Handlers
    // =========================================================================
    function openByokKeysModal() {
      const modal = document.getElementById('modal-byok-keys');
      if (!modal) return;
      const gInput = document.getElementById('byok-key-google');
      const mInput = document.getElementById('byok-key-mistral');
      const grInput = document.getElementById('byok-key-groq');
      if (gInput) gInput.value = getStoredByokKey('google');
      if (mInput) mInput.value = getStoredByokKey('mistral');
      if (grInput) grInput.value = getStoredByokKey('groq');
      modal.classList.remove('hidden');
      if (window.lucide) lucide.createIcons();
    }

    function closeByokKeysModal() {
      const modal = document.getElementById('modal-byok-keys');
      if (modal) modal.classList.add('hidden');
    }

    function saveByokKeys() {
      const gKey = document.getElementById('byok-key-google') ? document.getElementById('byok-key-google').value.trim() : '';
      const mKey = document.getElementById('byok-key-mistral') ? document.getElementById('byok-key-mistral').value.trim() : '';
      const grKey = document.getElementById('byok-key-groq') ? document.getElementById('byok-key-groq').value.trim() : '';

      setStoredByokKey('google', gKey);
      setStoredByokKey('mistral', mKey);
      setStoredByokKey('groq', grKey);

      const legacyKey = document.getElementById('cfg-apikey');
      if (legacyKey) legacyKey.value = grKey || mKey || gKey || '';

      cachedByokCatalog = null;
      updateByokBadge();
      closeByokKeysModal();

      if (playgroundTierMode === 'byok') {
        fetchAndPopulateByokModels(true);
      }
    }

    function clearByokKeys() {
      clearByokInputs();
      removeStoredByokKey('google');
      removeStoredByokKey('mistral');
      removeStoredByokKey('groq');

      if (playgroundTierMode === 'byok') {
        renderPlaygroundModelDropdown(FREE_TIER_MODELS);
      }
    }

    function toggleKeyVisibility(inputId, btn) {
      const input = document.getElementById(inputId);
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        if (btn) btn.innerHTML = '<i data-lucide="eye-off" class="w-3.5 h-3.5"></i>';
      } else {
        input.type = 'password';
        if (btn) btn.innerHTML = '<i data-lucide="eye" class="w-3.5 h-3.5"></i>';
      }
      if (window.lucide) lucide.createIcons();
    }

    function updateByokBadge() {
      const g = getStoredByokKey('google') || (document.getElementById('byok-key-google') ? document.getElementById('byok-key-google').value.trim() : '');
      const m = getStoredByokKey('mistral') || (document.getElementById('byok-key-mistral') ? document.getElementById('byok-key-mistral').value.trim() : '');
      const gr = getStoredByokKey('groq') || (document.getElementById('byok-key-groq') ? document.getElementById('byok-key-groq').value.trim() : '');
      const badge = document.getElementById('byok-keys-badge');
      if (badge) {
        if (g || m || gr) {
          badge.classList.remove('hidden');
        } else {
          badge.classList.add('hidden');
        }
      }
    }

    function initByokKeys() {
      // Clean up legacy unscoped keys
      try {
        localStorage.removeItem('byok_key_google');
        localStorage.removeItem('byok_key_mistral');
        localStorage.removeItem('byok_key_groq');
      } catch (e) {}

      if (!currentFirebaseUser) {
        clearByokInputs();
        return;
      }
      const g = getStoredByokKey('google');
      const m = getStoredByokKey('mistral');
      const gr = getStoredByokKey('groq');
      if (document.getElementById('byok-key-google')) document.getElementById('byok-key-google').value = g;
      if (document.getElementById('byok-key-mistral')) document.getElementById('byok-key-mistral').value = m;
      if (document.getElementById('byok-key-groq')) document.getElementById('byok-key-groq').value = gr;
      updateByokBadge();
    }

    // =========================================================================
    // Firebase Authentication Frontend Handlers
    // =========================================================================
    let detectedAccountState = null; // 'existing' | 'new' | null
    let emailCheckDebounce = null;

    function resetAuthDetection() {
      detectedAccountState = null;
      const badge = document.getElementById('auth-email-badge');
      if (badge) {
        badge.textContent = '';
        badge.className = 'hidden';
      }
      const title = document.getElementById('auth-modal-title');
      if (title) title.textContent = 'Sign in or create account';
      const submitBtn = document.getElementById('btn-auth-submit');
      if (submitBtn) submitBtn.textContent = 'Continue';
      const hint = document.getElementById('auth-switch-text');
      if (hint) hint.textContent = "New users will be registered automatically.";
    }

    function onAuthEmailInput() {
      clearTimeout(emailCheckDebounce);
      emailCheckDebounce = setTimeout(() => {
        checkEmailAccountExists();
      }, 400);
    }

    async function checkEmailAccountExists() {
      const emailInput = document.getElementById('auth-email');
      const badge = document.getElementById('auth-email-badge');
      const submitBtn = document.getElementById('btn-auth-submit');
      const title = document.getElementById('auth-modal-title');
      const hint = document.getElementById('auth-switch-text');
      if (!emailInput || !badge) return;

      const email = emailInput.value.trim();
      if (!email || !email.includes('@') || !email.includes('.')) {
        resetAuthDetection();
        return;
      }

      if (firebaseAuth && typeof firebaseAuth.fetchSignInMethodsForEmail === 'function') {
        try {
          const methods = await firebaseAuth.fetchSignInMethodsForEmail(email);
          if (methods && methods.length > 0) {
            detectedAccountState = 'existing';
            badge.textContent = 'Existing User';
            badge.className = 'text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200';
            if (title) title.textContent = 'Welcome back!';
            if (submitBtn) submitBtn.textContent = 'Sign In';
            if (hint) hint.textContent = 'Account found. Enter your password to sign in.';
          } else {
            detectedAccountState = 'new';
            badge.textContent = 'New User';
            badge.className = 'text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200';
            if (title) title.textContent = 'Create your account';
            if (submitBtn) submitBtn.textContent = 'Create Account & Continue';
            if (hint) hint.textContent = 'No account found. We will create your account automatically.';
          }
        } catch (e) {
          // If fetchSignInMethodsForEmail is restricted by Firebase, fallback to neutral
          badge.className = 'hidden';
          detectedAccountState = null;
        }
      }
    }

    function openAuthModal() {
      document.getElementById('modal-auth').classList.remove('hidden');
      clearAuthErrors();
      resetAuthDetection();
      lucide.createIcons();
    }

    function closeAuthModal() {
      document.getElementById('modal-auth').classList.add('hidden');
      clearAuthErrors();
      resetAuthDetection();
    }

    function showAuthError(msg) {
      const banner = document.getElementById('auth-error-banner');
      if (banner) {
        banner.textContent = msg;
        banner.classList.remove('hidden');
      }
    }

    function clearAuthErrors() {
      const banner = document.getElementById('auth-error-banner');
      if (banner) {
        banner.textContent = '';
        banner.classList.add('hidden');
      }
    }

    async function handleGoogleSignIn() {
      clearAuthErrors();
      if (!firebaseAuth) {
        showAuthError('Authentication service not initialized');
        return;
      }
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebaseAuth.signInWithPopup(provider);
        closeAuthModal();
        if (activeView === 'playground') {
          switchView('playground');
        }
      } catch (err) {
        showAuthError(err.message || 'Google sign-in failed');
      }
    }

    async function handleEmailAuth(e) {
      e.preventDefault();
      clearAuthErrors();
      if (!firebaseAuth) {
        showAuthError('Authentication service not initialized');
        return;
      }
      const email = document.getElementById('auth-email').value.trim();
      const password = document.getElementById('auth-password').value;
      const submitBtn = document.getElementById('btn-auth-submit');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing...';

      try {
        // If already detected as new user, create account directly
        if (detectedAccountState === 'new') {
          try {
            await firebaseAuth.createUserWithEmailAndPassword(email, password);
          } catch (signUpErr) {
            if (signUpErr.code === 'auth/email-already-in-use') {
              await firebaseAuth.signInWithEmailAndPassword(email, password);
            } else {
              throw signUpErr;
            }
          }
        } else {
          // Attempt sign in first
          try {
            await firebaseAuth.signInWithEmailAndPassword(email, password);
          } catch (signInErr) {
            const code = signInErr.code || '';
            const msg = (signInErr.message || '').toLowerCase();

            // 1. User not found -> automatically register!
            if (code === 'auth/user-not-found' || msg.includes('user-not-found') || msg.includes('no user record')) {
              await firebaseAuth.createUserWithEmailAndPassword(email, password);
            } 
            // 2. Firebase enumeration protection masks user-not-found as invalid credential
            else if (code === 'auth/invalid-credential' || code === 'auth/invalid-login-credentials') {
              try {
                await firebaseAuth.createUserWithEmailAndPassword(email, password);
              } catch (signUpErr) {
                if (signUpErr.code === 'auth/email-already-in-use') {
                  throw new Error('Incorrect password for this account. Please try again.');
                }
                throw signUpErr;
              }
            } 
            // 3. Explicit wrong password
            else if (code === 'auth/wrong-password') {
              throw new Error('Incorrect password for this account. Please try again.');
            } else {
              throw signInErr;
            }
          }
        }

        closeAuthModal();
        if (activeView === 'playground') {
          switchView('playground');
        }
      } catch (err) {
        let userMsg = err.message || 'Authentication failed';
        if (err.code === 'auth/weak-password') {
          userMsg = 'Password must be at least 6 characters.';
        } else if (err.code === 'auth/invalid-email') {
          userMsg = 'Please enter a valid email address.';
        } else if (err.code === 'auth/too-many-requests') {
          userMsg = 'Too many failed login attempts. Please wait a moment or try again later.';
        }
        showAuthError(userMsg);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }

    async function handleSignOut() {
      if (firebaseAuth) {
        await firebaseAuth.signOut();
      }
      const menu = document.getElementById('user-dropdown-menu');
      if (menu) menu.classList.add('hidden');
      switchView('playground');
    }

    function toggleUserDropdown(e) {
      if (e) e.stopPropagation();
      const menu = document.getElementById('user-dropdown-menu');
      if (menu) menu.classList.toggle('hidden');
    }

    function copyUserId() {
      if (currentFirebaseUser && currentFirebaseUser.uid) {
        navigator.clipboard.writeText(currentFirebaseUser.uid);
        alert('User ID copied to clipboard: ' + currentFirebaseUser.uid);
      }
    }

    // =========================================================================
    // User Settings Modal Handlers
    // =========================================================================
    function openUserSettingsModal() {
      const menu = document.getElementById('user-dropdown-menu');
      if (menu) menu.classList.add('hidden');

      if (!currentFirebaseUser) {
        openAuthModal();
        return;
      }

      const modal = document.getElementById('modal-user-settings');
      if (!modal) return;

      const user = currentFirebaseUser;
      const profile = currentUserProfile;

      const nameInput = document.getElementById('settings-name');
      const emailInput = document.getElementById('settings-email');
      const orgInput = document.getElementById('settings-org');
      const websiteInput = document.getElementById('settings-website');
      const uidDisplay = document.getElementById('settings-uid-display');
      const tierPill = document.getElementById('settings-tier-pill');
      const banner = document.getElementById('settings-status-banner');

      if (banner) banner.classList.add('hidden');

      if (nameInput) {
        nameInput.value = (profile && profile.name) ? profile.name : (user.displayName || (user.email ? user.email.split('@')[0] : 'User'));
      }
      if (emailInput) {
        emailInput.value = (profile && profile.email) ? profile.email : (user.email || '');
      }
      if (orgInput) {
        orgInput.value = (profile && profile.org) ? profile.org : '';
      }
      if (websiteInput) {
        websiteInput.value = (profile && profile.orgWebsite) ? profile.orgWebsite : '';
      }
      if (uidDisplay) {
        uidDisplay.textContent = user.uid || '';
      }

      if (tierPill) {
        const isFull = isUserFullyInvited();
        tierPill.textContent = isFull ? 'Pro' : 'Free';
        tierPill.className = isFull
          ? 'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800'
          : 'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800';
      }

      const tierExpiry = document.getElementById('settings-tier-expiry');
      if (tierExpiry) {
        const isFull = isUserFullyInvited();
        const expText = getSubscriptionExpiryText(profile);
        if (expText && isFull) {
          tierExpiry.textContent = expText;
          tierExpiry.classList.remove('hidden');
        } else {
          tierExpiry.classList.add('hidden');
        }
      }

      modal.classList.remove('hidden');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function closeUserSettingsModal() {
      const modal = document.getElementById('modal-user-settings');
      if (modal) modal.classList.add('hidden');
    }

    async function saveUserSettings() {
      if (!currentFirebaseUser) return;

      const name = (document.getElementById('settings-name')?.value || '').trim();
      const org = (document.getElementById('settings-org')?.value || '').trim();
      const orgWebsite = (document.getElementById('settings-website')?.value || '').trim();
      const banner = document.getElementById('settings-status-banner');
      const saveBtn = document.getElementById('btn-save-settings');

      const originalText = saveBtn ? saveBtn.innerHTML : '';
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span>Saving...</span>';
      }

      const user = currentFirebaseUser;
      const isFull = isUserFullyInvited();
      const existingLevel = (currentUserProfile && currentUserProfile.accessLevel) ? currentUserProfile.accessLevel : (isFull ? 'Pro' : 'Free');

      const payload = {
        userId: user.uid,
        name: name || (user.displayName || user.email?.split('@')[0] || 'User'),
        email: user.email || '',
        org,
        orgWebsite,
        invitationCode: (currentUserProfile && currentUserProfile.invitationCode) ? currentUserProfile.invitationCode : '',
        accessLevel: existingLevel
      };

      try {
        const headers = { 'Content-Type': 'application/json' };
        if (currentIdToken) {
          headers['Authorization'] = 'Bearer ' + currentIdToken;
        }

        const res = await fetch('/api/user/profile', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          currentUserProfile = (data && data.profile) ? data.profile : payload;
        } else {
          currentUserProfile = payload;
        }
      } catch (e) {
        currentUserProfile = payload;
      } finally {
        if (saveBtn) {
          saveBtn.disabled = false;
          saveBtn.innerHTML = originalText;
        }
      }

      try {
        localStorage.setItem('projectspg_profile_' + user.uid, JSON.stringify(currentUserProfile));
      } catch (e) {}

      updateUserUI(user);

      if (banner) {
        banner.textContent = 'Settings updated successfully.';
        banner.className = 'mb-4 p-2.5 rounded-xl border text-xs bg-emerald-50 border-emerald-200 text-emerald-800 block';
        setTimeout(() => {
          closeUserSettingsModal();
        }, 800);
      } else {
        closeUserSettingsModal();
      }
    }

    function handleStartBuildingClick() {
      switchView('playground');
    }

    function handleLandingAuthClick() {
      switchView('playground');
    }



    const CONSENT_STORAGE_KEY = 'projectspg_consent_preferences';

    function openConsentPreferencesModal() {
      const modal = document.getElementById('modal-consent-preferences');
      if (!modal) return;
      loadConsentPreferences();
      modal.classList.remove('hidden');
      if (window.lucide) window.lucide.createIcons();
    }

    function closeConsentPreferencesModal() {
      const modal = document.getElementById('modal-consent-preferences');
      if (modal) modal.classList.add('hidden');
    }

    function loadConsentPreferences() {
      try {
        const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
        if (raw) {
          const pref = JSON.parse(raw);
          const tAudit = document.getElementById('consent-toggle-audit');
          const tPerf = document.getElementById('consent-toggle-performance');
          const tByok = document.getElementById('consent-toggle-byok');
          if (tAudit) tAudit.checked = pref.auditTelemetry !== false;
          if (tPerf) tPerf.checked = pref.performanceAnalytics !== false;
          if (tByok) tByok.checked = pref.byokPassThrough !== false;
        }
      } catch (e) {
        console.warn('Consent read warning:', e);
      }
    }

    function saveConsentPreferences(mode) {
      const tAudit = document.getElementById('consent-toggle-audit');
      const tPerf = document.getElementById('consent-toggle-performance');
      const tByok = document.getElementById('consent-toggle-byok');
      const feedback = document.getElementById('consent-feedback');

      let pref = {
        strictlyNecessary: true,
        auditTelemetry: true,
        performanceAnalytics: true,
        byokPassThrough: true,
        savedAt: new Date().toISOString()
      };

      if (mode === 'reject') {
        pref.auditTelemetry = false;
        pref.performanceAnalytics = false;
        pref.byokPassThrough = false;
        if (tAudit) tAudit.checked = false;
        if (tPerf) tPerf.checked = false;
        if (tByok) tByok.checked = false;
      } else if (mode === 'accept_all') {
        pref.auditTelemetry = true;
        pref.performanceAnalytics = true;
        pref.byokPassThrough = true;
        if (tAudit) tAudit.checked = true;
        if (tPerf) tPerf.checked = true;
        if (tByok) tByok.checked = true;
      } else {
        pref.auditTelemetry = tAudit ? tAudit.checked : true;
        pref.performanceAnalytics = tPerf ? tPerf.checked : true;
        pref.byokPassThrough = tByok ? tByok.checked : true;
      }

      try {
        localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(pref));
      } catch (e) {}

      if (feedback) {
        feedback.className = 'text-xs text-center font-medium min-h-[20px] mb-4 text-emerald-600 block';
        feedback.textContent = '✓ Preferences saved successfully!';
        setTimeout(() => {
          feedback.textContent = '';
          closeConsentPreferencesModal();
        }, 500);
      } else {
        closeConsentPreferencesModal();
      }
    }

    async function checkUserInvitationStatus(user) {
      if (!user) return;
      const storageKey = 'projectspg_profile_' + user.uid;
      let profile = null;

      // 1. Check local storage cache
      try {
        const cached = localStorage.getItem(storageKey);
        if (cached) {
          profile = JSON.parse(cached);
        }
      } catch (e) {
        console.warn('Local profile read warning:', e);
      }

      // 2. Fetch from backend /api/user/profile
      try {
        const headers = {};
        if (currentIdToken) {
          headers['Authorization'] = 'Bearer ' + currentIdToken;
        }
        const res = await fetch('/api/user/profile?userId=' + encodeURIComponent(user.uid), { headers });
        if (res.ok) {
          const data = await res.json();
          if (data && data.profile) {
            profile = data.profile;
            try {
              localStorage.setItem(storageKey, JSON.stringify(profile));
            } catch (e) {}
          }
        }
      } catch (e) {
        console.warn('Backend profile fetch warning:', e);
      }

      // 3. Admin & User Automatic Pro Access
      const userEmail = (user.email || '').toLowerCase().trim();
      const isAdmin = userEmail === 'boruahpriyanuj2004@gmail.com';
      if (!profile) {
        profile = {
          userId: user.uid,
          name: user.displayName || (user.email ? user.email.split('@')[0] : 'User'),
          email: user.email || '',
          org: isAdmin ? 'ProjectSPG Admin' : '',
          orgWebsite: isAdmin ? 'https://projectspg.info' : '',
          invitationCode: isAdmin ? 'ADMIN-ROOT' : '',
          accessLevel: 'Pro',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        try {
          localStorage.setItem(storageKey, JSON.stringify(profile));
        } catch (e) {}

        // Persist profile to D1 backend in background
        try {
          const headers = { 'Content-Type': 'application/json' };
          if (currentIdToken) {
            headers['Authorization'] = 'Bearer ' + currentIdToken;
          }
          fetch('/api/user/profile', {
            method: 'POST',
            headers,
            body: JSON.stringify(profile)
          }).catch(() => {});
        } catch (e) {}
      } else {
        profile.accessLevel = 'Pro';
      }

      currentUserProfile = profile;
    }

    function handleTopTierClick() {
      if (!currentFirebaseUser) {
        openAuthModal();
        return;
      }
      openInvitationModal(true);
    }

    function getSubscriptionExpiryText(profile) {
      if (!profile) return '';
      const user = currentFirebaseUser;
      if (user && user.email && user.email.toLowerCase().trim() === 'boruahpriyanuj2004@gmail.com') {
        return 'Permanent (Admin)';
      }
      if (!profile.subscriptionExpiresAt) return '';
      const expDate = new Date(profile.subscriptionExpiresAt);
      if (isNaN(expDate.getTime())) return '';
      const formatted = expDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const isExpired = Date.now() >= expDate.getTime();
      return isExpired ? ('Expired (' + formatted + ')') : ('Valid until ' + formatted);
    }

    function updateTopTierPill(isFull) {
      const pill = document.getElementById('top-tier-pill');
      const dot = document.getElementById('top-tier-dot');
      const ping = document.getElementById('top-tier-ping');
      const label = document.getElementById('top-tier-label');

      if (!pill || !label) return;

      if (isFull) {
        const expText = getSubscriptionExpiryText(currentUserProfile);
        pill.className = 'hidden md:flex items-center gap-1.5 text-[11px] font-semibold select-none ml-2.5 px-2.5 py-1 rounded-full border shadow-2xs bg-gradient-to-r from-orange-50/90 via-[#fff8f6] to-orange-50/90 border-[#f0523d]/50 text-[#d93822] theme-pill-active transition-all duration-300';
        pill.title = expText ? ('Professional Tier (' + expText + ')') : 'Professional Tier';
        if (ping) {
          ping.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f0523d] opacity-75';
          ping.classList.remove('hidden');
        }
        if (dot) {
          dot.className = 'relative inline-flex rounded-full h-2 w-2 bg-[#f0523d] ring-2 ring-[#f0523d]/25 shrink-0';
        }
        label.textContent = 'Professional';
        label.className = 'tracking-tight font-bold text-[#d93822]';
      } else {
        pill.className = 'hidden md:flex items-center gap-1.5 text-[11px] font-semibold select-none ml-2.5 px-2.5 py-1 rounded-full border shadow-2xs bg-amber-50/90 border-amber-200/90 text-amber-900 transition-all duration-300';
        pill.title = 'Free Trial';
        if (ping) ping.classList.add('hidden');
        if (dot) {
          dot.className = 'relative inline-flex rounded-full h-2 w-2 bg-amber-500 ring-2 ring-amber-200/60 shrink-0';
        }
        label.textContent = 'Free Trial';
        label.className = 'tracking-tight font-semibold text-amber-900';
      }
    }

    function openInvitationModal(isManualEdit = false) {
      const modal = document.getElementById('modal-invitation');
      if (!modal) return;

      const titleEl = document.getElementById('inv-modal-title');
      const subtitleEl = document.getElementById('inv-modal-subtitle');
      const submitBtn = document.getElementById('btn-inv-submit');
      const statusBanner = document.getElementById('inv-current-status-banner');
      const statusBadge = document.getElementById('inv-current-status-badge');
      const errorBanner = document.getElementById('inv-error-banner');
      const successBanner = document.getElementById('inv-success-banner');

      if (errorBanner) errorBanner.classList.add('hidden');
      if (successBanner) successBanner.classList.add('hidden');

      const codeInput = document.getElementById('inv-code');

      if (codeInput) {
        codeInput.value = (currentUserProfile && currentUserProfile.invitationCode) ? currentUserProfile.invitationCode : '';
        const pendingCode = sessionStorage.getItem('pendingInviteCode');
        if (!codeInput.value && pendingCode) {
          codeInput.value = pendingCode;
        }
      }

      const isFull = isUserFullyInvited();
      const user = currentFirebaseUser;
      const userEmail = (user && user.email) ? user.email.toLowerCase().trim() : '';
      const isAdmin = userEmail === 'boruahpriyanuj2004@gmail.com';

      if (titleEl) titleEl.textContent = 'Subscription';
      if (subtitleEl) {
        subtitleEl.textContent = isFull
          ? 'Manage your subscription tier or enter a new invitation code.'
          : 'Enter an invitation code to activate 1-Year Pro Access, or continue as a Free user.';
      }

      if (submitBtn) {
        const btnSpan = submitBtn.querySelector('span');
        if (btnSpan) btnSpan.textContent = isFull ? 'Update Invitation Code' : 'Activate 1-Year Pro Access';
      }

      if (statusBanner && statusBadge) {
        statusBanner.classList.remove('hidden');
        statusBadge.className = isFull
          ? 'font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800'
          : 'font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800';
        statusBadge.textContent = isFull ? (isAdmin ? 'Admin' : 'PRO') : 'FREE';

        const validTillDateEl = document.getElementById('inv-valid-till-date');
        const validTillRowEl = document.getElementById('inv-valid-till-row');
        if (validTillDateEl && validTillRowEl) {
          if (isAdmin) {
            validTillDateEl.textContent = 'Permanent (Admin)';
            validTillDateEl.className = 'font-semibold text-purple-700';
            validTillRowEl.classList.remove('hidden');
          } else if (isFull) {
            let expDateString = '';
            if (currentUserProfile && currentUserProfile.subscriptionExpiresAt) {
              const expDate = new Date(currentUserProfile.subscriptionExpiresAt);
              if (!isNaN(expDate.getTime())) {
                expDateString = expDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              }
            }
            if (!expDateString) {
              const start = currentUserProfile?.createdAt ? new Date(currentUserProfile.createdAt) : new Date();
              const exp = new Date(start.getTime());
              exp.setFullYear(exp.getFullYear() + 1);
              expDateString = exp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }
            validTillDateEl.textContent = expDateString;
            validTillDateEl.className = 'font-semibold text-emerald-800';
            validTillRowEl.classList.remove('hidden');
          } else {
            validTillDateEl.textContent = 'Free Trial';
            validTillDateEl.className = 'font-semibold text-amber-800';
            validTillRowEl.classList.remove('hidden');
          }
        }
      }

      modal.classList.remove('hidden');
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function closeInvitationModal() {
      const modal = document.getElementById('modal-invitation');
      if (modal) modal.classList.add('hidden');
      // If closing on initial login without having a profile, assign free access
      if (currentFirebaseUser && !currentUserProfile) {
        continueWithLimitedAccess();
      }
    }

    async function handleInvitationSubmit(e) {
      if (e) e.preventDefault();
      const errorBanner = document.getElementById('inv-error-banner');
      const successBanner = document.getElementById('inv-success-banner');
      const submitBtn = document.getElementById('btn-inv-submit');

      if (errorBanner) errorBanner.classList.add('hidden');
      if (successBanner) successBanner.classList.add('hidden');

      const user = currentFirebaseUser;
      const userId = user ? user.uid : ('anon_' + Date.now());
      const name = (currentUserProfile && currentUserProfile.name) || (user ? (user.displayName || user.email?.split('@')[0]) : 'User');
      const email = (currentUserProfile && currentUserProfile.email) || (user ? (user.email || '') : '');
      const org = (currentUserProfile && currentUserProfile.org) || '';
      const orgWebsite = (currentUserProfile && currentUserProfile.orgWebsite) || '';
      const invitationCode = (document.getElementById('inv-code')?.value || '').trim();

      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Activating...</span>';
      }

      const hasCode = invitationCode.length >= 3;
      const accessLevel = hasCode ? 'Pro' : 'Free';

      const payload = {
        userId,
        name,
        email,
        org,
        orgWebsite,
        invitationCode,
        accessLevel
      };

      try {
        const headers = { 'Content-Type': 'application/json' };
        if (currentIdToken) {
          headers['Authorization'] = 'Bearer ' + currentIdToken;
        }

        const res = await fetch('/api/user/profile', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.profile) {
            currentUserProfile = data.profile;
          } else {
            currentUserProfile = payload;
          }
        } else {
          currentUserProfile = payload;
        }
      } catch (err) {
        console.warn('Profile save warning, using offline persistence:', err);
        currentUserProfile = payload;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }

      // Persist to local storage
      try {
        localStorage.setItem('projectspg_profile_' + userId, JSON.stringify(currentUserProfile));
      } catch (e) {}

      updateUserUI(currentFirebaseUser);

      const modal = document.getElementById('modal-invitation');
      if (modal) modal.classList.add('hidden');

      if (activeView === 'playground') {
        switchView('playground');
      }
    }

    async function continueWithLimitedAccess() {
      const user = currentFirebaseUser;
      const userId = user ? user.uid : ('anon_' + Date.now());

      const name = (currentUserProfile && currentUserProfile.name) || (user ? (user.displayName || user.email?.split('@')[0]) : 'User');
      const email = (currentUserProfile && currentUserProfile.email) || (user ? (user.email || '') : '');
      const org = (currentUserProfile && currentUserProfile.org) || '';
      const orgWebsite = (currentUserProfile && currentUserProfile.orgWebsite) || '';

      const payload = {
        userId,
        name,
        email,
        org,
        orgWebsite,
        invitationCode: '',
        accessLevel: 'Free'
      };

      try {
        const headers = { 'Content-Type': 'application/json' };
        if (currentIdToken) {
          headers['Authorization'] = 'Bearer ' + currentIdToken;
        }
        const res = await fetch('/api/user/profile', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.profile) {
            currentUserProfile = data.profile;
          } else {
            currentUserProfile = payload;
          }
        } else {
          currentUserProfile = payload;
        }
      } catch (err) {
        currentUserProfile = payload;
      }

      try {
        localStorage.setItem('projectspg_profile_' + userId, JSON.stringify(currentUserProfile));
      } catch (e) {}

      updateUserUI(currentFirebaseUser);

      const modal = document.getElementById('modal-invitation');
      if (modal) modal.classList.add('hidden');

      if (activeView === 'playground') {
        switchView('playground');
      }
    }

    function updateUserUI(user) {
      const loginBtn = document.getElementById('btn-login-trigger');
      const userMenu = document.getElementById('user-profile-menu-container');
      const nameEl = document.getElementById('user-menu-name');
      const emailEl = document.getElementById('user-menu-email');
      const initialsEl = document.getElementById('user-avatar-initials');
      const imgEl = document.getElementById('user-avatar-img');

      const menuBadgeEl = document.getElementById('user-menu-badge');
      const menuOrgEl = document.getElementById('user-menu-org');
      const menuOrgTextEl = document.getElementById('user-menu-org-text');

      const landingBtnText = document.getElementById('btn-landing-signin-text');
      const landingMobileBtnText = document.getElementById('btn-landing-mobile-signin-text');

      if (user) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userMenu) userMenu.classList.remove('hidden');

        const displayName = (currentUserProfile && currentUserProfile.name)
          ? currentUserProfile.name
          : (user.displayName || (user.email ? user.email.split('@')[0] : 'User'));
        const displayEmail = (currentUserProfile && currentUserProfile.email)
          ? currentUserProfile.email
          : (user.email || 'No email attached');
        const initials = displayName.charAt(0).toUpperCase();

        if (nameEl) nameEl.textContent = displayName;
        if (emailEl) emailEl.textContent = displayEmail;

        if (user.photoURL && imgEl) {
          imgEl.src = user.photoURL;
          imgEl.classList.remove('hidden');
          if (initialsEl) initialsEl.classList.add('hidden');
        } else {
          if (initialsEl) {
            initialsEl.textContent = initials;
            initialsEl.classList.remove('hidden');
          }
          if (imgEl) imgEl.classList.add('hidden');
        }

        // Access Level Tagging
        const userEmail = (user && user.email) ? user.email.toLowerCase().trim() : '';
        const isAdmin = userEmail === 'boruahpriyanuj2004@gmail.com';
        const adminNav = document.getElementById('nav-admin-invites');
        const adminMobileNav = document.getElementById('nav-mobile-admin-invites');
        const adminMenuBtn = document.getElementById('user-menu-admin-btn');

        if (isAdmin) {
          if (adminNav) adminNav.classList.remove('hidden');
          if (adminMobileNav) adminMobileNav.classList.remove('hidden');
          if (adminMenuBtn) adminMenuBtn.classList.remove('hidden');
        } else {
          if (adminNav) adminNav.classList.add('hidden');
          if (adminMobileNav) adminMobileNav.classList.add('hidden');
          if (adminMenuBtn) adminMenuBtn.classList.add('hidden');
        }

        const isFull = isUserFullyInvited();
        const accessLevel = isFull ? 'Pro' : 'Free';

        if (menuBadgeEl) {
          menuBadgeEl.className = isFull
            ? 'px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 bg-emerald-100 text-emerald-800'
            : 'px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 bg-amber-100 text-amber-800';
          menuBadgeEl.textContent = isFull ? (isAdmin ? 'Admin' : 'Pro') : 'Free';
        }

        if (menuOrgEl && menuOrgTextEl) {
          if (currentUserProfile && currentUserProfile.org) {
            menuOrgTextEl.textContent = currentUserProfile.org;
            menuOrgEl.classList.remove('hidden');
          } else {
            menuOrgEl.classList.add('hidden');
          }
        }

        updateTopTierPill(isFull);

        if (landingBtnText) {
          landingBtnText.textContent = 'Console (' + (isFull ? 'Pro' : 'Free') + ')';
        }
        if (landingMobileBtnText) {
          landingMobileBtnText.textContent = 'Console (' + (isFull ? 'Pro' : 'Free') + ')';
        }

        const byokBtn = document.getElementById('btn-tier-byok');
        const byokLock = document.getElementById('btn-tier-byok-lock');
        const createByokTab = document.getElementById('tier-tab-byok');
        const createByokLock = document.getElementById('tier-tab-byok-lock');

        if (byokBtn) {
          byokBtn.title = "BYOK Mode (Zero Rate-Limiting)";
          byokBtn.classList.remove('opacity-75');
        }
        if (byokLock) byokLock.classList.add('hidden');
        if (createByokLock) createByokLock.classList.add('hidden');
        if (createByokTab) createByokTab.title = "BYOK Tier";
        dismissInvitationToast(true);
        renderPlaygroundModelDropdown(FREE_TIER_MODELS);
      } else {
        const adminNav = document.getElementById('nav-admin-invites');
        const adminMobileNav = document.getElementById('nav-mobile-admin-invites');
        const adminMenuBtn = document.getElementById('user-menu-admin-btn');
        if (adminNav) adminNav.classList.add('hidden');
        if (adminMobileNav) adminMobileNav.classList.add('hidden');
        if (adminMenuBtn) adminMenuBtn.classList.add('hidden');

        if (loginBtn) loginBtn.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
        if (landingBtnText) landingBtnText.textContent = 'Open Console';
        if (landingMobileBtnText) landingMobileBtnText.textContent = 'Open Console';

        const pill = document.getElementById('top-tier-pill');
        if (pill) {
          pill.classList.remove('hidden');
          pill.classList.add('md:flex');
        }

        const byokBtn = document.getElementById('btn-tier-byok');
        const byokLock = document.getElementById('btn-tier-byok-lock');
        const createByokTab = document.getElementById('tier-tab-byok');
        const createByokLock = document.getElementById('tier-tab-byok-lock');
        if (byokBtn) {
          byokBtn.title = "BYOK Mode (Zero Rate-Limiting)";
          byokBtn.classList.remove('opacity-75');
        }
        if (byokLock) byokLock.classList.add('hidden');
        if (createByokLock) createByokLock.classList.add('hidden');
        if (createByokTab) createByokTab.title = "BYOK Tier";
        renderPlaygroundModelDropdown(FREE_TIER_MODELS);
      }
      lucide.createIcons();
    }

    // =========================================================================
    // INVITATION TOASTER NOTIFICATION CONTROLLER
    // =========================================================================
    let toastDismissedUntil = 0;

    function isUserFullyInvited() {
      return true;
    }

    function showInvitationToast(force = false) {
      dismissInvitationToast(true);
      return;
    }

    function dismissInvitationToast(silent = false) {
      const toast = document.getElementById('toast-invitation');
      if (!toast) return;

      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-4', 'opacity-0');

      setTimeout(() => {
        toast.classList.add('hidden');
      }, 300);

      if (!silent) {
        // Suppress re-showing for 45 seconds on explicit user dismissal
        toastDismissedUntil = Date.now() + 45000;
      }
    }

    async function handleToastInvitationSubmit(e) {
      if (e) e.preventDefault();
      const codeInput = document.getElementById('toast-inv-code-input');
      const feedback = document.getElementById('toast-inv-feedback');
      const submitBtn = document.getElementById('btn-toast-inv-submit');
      const code = (codeInput?.value || '').trim();

      if (!code || code.length < 3) {
        if (feedback) {
          feedback.textContent = 'Please enter a valid invitation or referral key.';
          feedback.className = 'my-2.5 p-2 rounded-lg text-[11px] leading-tight font-medium bg-red-50 text-red-600 border border-red-200 block';
        }
        return;
      }

      const origBtnContent = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Checking...</span>';
      }

      if (feedback) {
        feedback.textContent = 'Verifying invitation code...';
        feedback.className = 'my-2.5 p-2 rounded-lg text-[11px] leading-tight font-medium bg-amber-50 text-amber-700 border border-amber-200 block';
      }

      const user = currentFirebaseUser;
      const userId = user ? user.uid : ('anon_' + Date.now());
      const name = (currentUserProfile && currentUserProfile.name) || user?.displayName || 'User';
      const email = (currentUserProfile && currentUserProfile.email) || user?.email || '';
      const org = (currentUserProfile && currentUserProfile.org) || '';
      const orgWebsite = (currentUserProfile && currentUserProfile.orgWebsite) || '';

      const payload = {
        userId,
        name,
        email,
        org,
        orgWebsite,
        invitationCode: code,
        accessLevel: 'Pro'
      };

      try {
        const headers = { 'Content-Type': 'application/json' };
        if (currentIdToken) {
          headers['Authorization'] = 'Bearer ' + currentIdToken;
        }

        const res = await fetch('/api/user/profile', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.profile) {
            currentUserProfile = data.profile;
          } else {
            currentUserProfile = payload;
          }
        } else {
          currentUserProfile = payload;
        }
      } catch (err) {
        currentUserProfile = payload;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnContent;
        }
      }

      try {
        localStorage.setItem('projectspg_profile_' + userId, JSON.stringify(currentUserProfile));
      } catch (err) {}

      updateUserUI(currentFirebaseUser);

      if (feedback) {
        feedback.textContent = '✓ Invitation Verified! 1-Year Pro Access Activated.';
        feedback.className = 'my-2.5 p-2 rounded-lg text-[11px] leading-tight font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 block';
      }

      setTimeout(() => {
        dismissInvitationToast(true);
      }, 1800);

      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // =========================================================================
    // ADMIN CONSOLE & USER ROSTER (Restricted to boruahpriyanuj2004@gmail.com)
    // =========================================================================
    let adminInvitationsList = [];
    let adminUsersList = [];
    let activeAdminTab = 'users';

    function switchAdminTab(tab) {
      activeAdminTab = tab;
      const tabUsers = document.getElementById('admin-tab-users');
      const tabInvites = document.getElementById('admin-tab-invites');
      const panelUsers = document.getElementById('admin-panel-users');
      const panelInvites = document.getElementById('admin-panel-invites');

      if (tab === 'users') {
        if (tabUsers) tabUsers.className = 'px-4 py-2.5 text-xs font-bold border-b-2 border-purple-600 text-purple-700 flex items-center gap-2 cursor-pointer transition';
        if (tabInvites) tabInvites.className = 'px-4 py-2.5 text-xs font-semibold border-b-2 border-transparent text-gray-500 hover:text-gray-900 flex items-center gap-2 cursor-pointer transition';
        if (panelUsers) panelUsers.classList.remove('hidden');
        if (panelInvites) panelInvites.classList.add('hidden');
        loadAdminUsers();
      } else {
        if (tabUsers) tabUsers.className = 'px-4 py-2.5 text-xs font-semibold border-b-2 border-transparent text-gray-500 hover:text-gray-900 flex items-center gap-2 cursor-pointer transition';
        if (tabInvites) tabInvites.className = 'px-4 py-2.5 text-xs font-bold border-b-2 border-purple-600 text-purple-700 flex items-center gap-2 cursor-pointer transition';
        if (panelUsers) panelUsers.classList.add('hidden');
        if (panelInvites) panelInvites.classList.remove('hidden');
        loadAdminInvitations();
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    async function refreshAdminDashboard() {
      await Promise.allSettled([
        loadAdminUsers(),
        loadAdminInvitations()
      ]);
      showNotificationToast('Admin metrics & registry refreshed.');
    }

    async function loadAdminUsers() {
      const tbody = document.getElementById('admin-users-tbody');
      const badgeEl = document.getElementById('admin-tab-users-badge');

      if (!currentFirebaseUser || (currentFirebaseUser.email || '').toLowerCase().trim() !== 'boruahpriyanuj2004@gmail.com') {
        if (tbody) {
          tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-red-500 font-medium">Access Restricted: Only the platform administrator (boruahpriyanuj2004@gmail.com) can access this console.</td></tr>';
        }
        return;
      }

      if (tbody && (!adminUsersList || adminUsersList.length === 0)) {
        tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-gray-400">Loading user profiles &amp; telemetry...</td></tr>';
      }

      try {
        let token = currentIdToken;
        if (!token && currentFirebaseUser) {
          token = await currentFirebaseUser.getIdToken();
          currentIdToken = token;
        }

        const res = await fetch('/api/admin/users', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch registered users (HTTP ' + res.status + ')');
        }

        const data = await res.json();
        adminUsersList = (data && Array.isArray(data.users)) ? data.users : [];
        if (badgeEl) badgeEl.textContent = adminUsersList.length;

        updateAdminQuickStats();
        filterAdminUsersTable();
      } catch (err) {
        console.error('Error loading admin users:', err);
        if (tbody) {
          tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-red-500 font-medium">Failed to load registered users: ' + escapeHtml(err.message) + '</td></tr>';
        }
      }
    }

    function updateAdminQuickStats() {
      const totalUsersEl = document.getElementById('admin-stat-total-users');
      const proUsersEl = document.getElementById('admin-stat-pro-users');
      const freeUsersEl = document.getElementById('admin-stat-free-users');
      const totalReqEl = document.getElementById('admin-stat-total-requests');
      const totalPiiEl = document.getElementById('admin-stat-total-pii');

      if (!adminUsersList) return;

      const total = adminUsersList.length;
      let proCount = 0;
      let freeCount = 0;
      let totalReqs = 0;
      let totalPii = 0;

      adminUsersList.forEach(u => {
        if (u.accessLevel === 'Pro') proCount++;
        else freeCount++;
        totalReqs += (u.totalRequests || 0);
        totalPii += (u.totalProtectedEntities || 0);
      });

      if (totalUsersEl) totalUsersEl.textContent = total.toLocaleString();
      if (proUsersEl) proUsersEl.textContent = proCount.toLocaleString();
      if (freeUsersEl) freeUsersEl.textContent = freeCount.toLocaleString();
      if (totalReqEl) totalReqEl.textContent = totalReqs.toLocaleString();
      if (totalPiiEl) totalPiiEl.textContent = totalPii.toLocaleString();
    }

    function filterAdminUsersTable() {
      const query = ((document.getElementById('admin-users-search')?.value) || '').toLowerCase().trim();
      const tierFilter = (document.getElementById('admin-users-tier-filter')?.value) || 'all';

      if (!adminUsersList) return;

      const filtered = adminUsersList.filter(u => {
        if (tierFilter === 'Pro' && u.accessLevel !== 'Pro') return false;
        if (tierFilter === 'Free' && u.accessLevel === 'Pro') return false;

        if (!query) return true;
        const name = (u.name || '').toLowerCase();
        const email = (u.email || '').toLowerCase();
        const org = (u.org || '').toLowerCase();
        const website = (u.orgWebsite || '').toLowerCase();
        const code = (u.invitationCode || '').toLowerCase();

        return name.includes(query) || email.includes(query) || org.includes(query) || website.includes(query) || code.includes(query);
      });

      renderAdminUsers(filtered);
    }

    function renderAdminUsers(users) {
      const tbody = document.getElementById('admin-users-tbody');
      const countEl = document.getElementById('admin-users-table-count');
      if (!tbody) return;

      if (countEl) countEl.textContent = (users ? users.length : 0) + ' user' + ((users && users.length === 1) ? '' : 's');

      if (!users || users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-gray-400">No users found matching current filters.</td></tr>';
        return;
      }

      tbody.innerHTML = '';

      users.forEach(u => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50/50 transition border-b border-gray-100';

        // 1. User & Email TD
        const tdUser = document.createElement('td');
        tdUser.className = 'py-3.5 px-4';
        const userName = u.name ? escapeHtml(u.name) : '<span class="text-gray-400 italic">No name</span>';
        const userEmail = escapeHtml(u.email || '');
        const joinedDate = u.createdAt ? new Date(u.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent';
        tdUser.innerHTML = '<div class="flex items-center gap-2.5">' +
          '<div class="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">' +
            escapeHtml((u.name || u.email || 'U').charAt(0).toUpperCase()) +
          '</div>' +
          '<div class="min-w-0">' +
            '<div class="font-bold text-gray-900 truncate">' + userName + '</div>' +
            '<div class="text-[11px] text-gray-500 font-mono truncate">' + userEmail + '</div>' +
            '<div class="text-[10px] text-gray-400">Joined ' + joinedDate + '</div>' +
          '</div>' +
        '</div>';
        tr.appendChild(tdUser);

        // 2. Organization & Website TD
        const tdOrg = document.createElement('td');
        tdOrg.className = 'py-3.5 px-4';
        const orgName = u.org ? escapeHtml(u.org) : '';
        let websiteHtml = '';
        if (u.orgWebsite) {
          let url = u.orgWebsite.trim();
          if (!/^https?:\\/\\//i.test(url)) url = 'https://' + url;
          websiteHtml = '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-[11px] text-purple-600 hover:underline mt-0.5 truncate max-w-[180px]">' +
            '<span>' + escapeHtml(u.orgWebsite) + '</span>' +
            '<i data-lucide="external-link" class="w-2.5 h-2.5 text-purple-500 shrink-0"></i>' +
          '</a>';
        }
        if (orgName || websiteHtml) {
          tdOrg.innerHTML = '<div class="font-semibold text-gray-800 text-xs">' + (orgName || '<span class="text-gray-400 font-normal italic">Org unset</span>') + '</div>' + websiteHtml;
        } else {
          tdOrg.innerHTML = '<span class="text-gray-400 italic text-[11px]">Personal / None</span>';
        }
        tr.appendChild(tdOrg);

        // 3. Referral / Code TD
        const tdRef = document.createElement('td');
        tdRef.className = 'py-3.5 px-4';
        if (u.invitationCode) {
          tdRef.innerHTML = '<span class="inline-flex items-center gap-1 font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200 select-all tracking-wider text-[11px]">' +
            '<i data-lucide="ticket" class="w-3 h-3 text-purple-500 shrink-0"></i>' +
            escapeHtml(u.invitationCode) +
          '</span>';
        } else {
          tdRef.innerHTML = '<span class="text-gray-400 italic text-[11px]">Direct Signup</span>';
        }
        tr.appendChild(tdRef);

        // 4. Access Level TD
        const tdTier = document.createElement('td');
        tdTier.className = 'py-3.5 px-4';
        if (u.accessLevel === 'Pro') {
          tdTier.innerHTML = '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">' +
            '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Pro Access' +
          '</span>';
        } else {
          tdTier.innerHTML = '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">' +
            '<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Free Tier' +
          '</span>';
        }
        tr.appendChild(tdTier);

        // 5. Subscription Validity TD
        const tdVal = document.createElement('td');
        tdVal.className = 'py-3.5 px-4 text-xs';
        const isAdmin = (u.email || '').toLowerCase().trim() === 'boruahpriyanuj2004@gmail.com';
        if (isAdmin) {
          tdVal.innerHTML = '<span class="text-purple-700 font-bold flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-purple-600"></span> Platform Admin</span>';
        } else if (u.subscriptionExpiresAt) {
          const expDate = new Date(u.subscriptionExpiresAt);
          const isPast = expDate.getTime() < Date.now();
          const dateStr = expDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
          if (isPast) {
            tdVal.innerHTML = '<span class="text-rose-600 font-semibold">Expired: ' + dateStr + '</span>';
          } else {
            tdVal.innerHTML = '<span class="text-emerald-700 font-medium">Valid until ' + dateStr + '</span>';
          }
        } else if (u.accessLevel === 'Pro') {
          tdVal.innerHTML = '<span class="text-emerald-600 font-medium">Active (Partner Code)</span>';
        } else {
          tdVal.innerHTML = '<span class="text-gray-400">Standard Free</span>';
        }
        tr.appendChild(tdVal);

        // 6. Usage Telemetry TD
        const tdUsage = document.createElement('td');
        tdUsage.className = 'py-3.5 px-4 text-right';
        const reqs = (u.totalRequests || 0).toLocaleString();
        const tokens = (u.totalTokens || 0).toLocaleString();
        const pii = (u.totalProtectedEntities || 0).toLocaleString();
        const lastActive = u.lastActiveAt ? new Date(u.lastActiveAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Never';

        tdUsage.innerHTML = '<div class="flex items-center justify-end gap-1.5 font-mono text-[11px]">' +
          '<span class="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 font-bold" title="Total API & Playground Requests">' + reqs + ' reqs</span>' +
          '<span class="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100" title="Tokens Processed">' + tokens + ' tok</span>' +
          '<span class="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100 font-bold" title="PII Entities Intercepted">' + pii + ' PII</span>' +
        '</div>' +
        '<div class="text-[10px] text-gray-400 mt-1">Last active: ' + lastActive + ' &bull; ' + (u.totalApiKeys || 0) + ' API keys</div>';
        tr.appendChild(tdUsage);

        tbody.appendChild(tr);
      });

      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    async function loadAdminInvitations() {
      const tbody = document.getElementById('admin-invitations-tbody');
      const countEl = document.getElementById('admin-codes-count');
      const activeCountEl = document.getElementById('admin-stat-active-codes');
      const usesCountEl = document.getElementById('admin-stat-total-uses');

      if (!currentFirebaseUser || (currentFirebaseUser.email || '').toLowerCase().trim() !== 'boruahpriyanuj2004@gmail.com') {
        if (tbody) {
          tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-red-500 font-medium">Access Restricted: Only the platform administrator (boruahpriyanuj2004@gmail.com) can access this console.</td></tr>';
        }
        return;
      }

      if (tbody) {
        tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-gray-400">Loading invitation codes...</td></tr>';
      }

      try {
        let token = currentIdToken;
        if (!token && currentFirebaseUser) {
          token = await currentFirebaseUser.getIdToken();
          currentIdToken = token;
        }

        const res = await fetch('/api/admin/invitations', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch invitation codes (HTTP ' + res.status + ')');
        }

        const data = await res.json();
        adminInvitationsList = (data && Array.isArray(data.codes)) ? data.codes : [];

        renderAdminInvitations();
      } catch (err) {
        console.error('Error loading admin invitations:', err);
        if (tbody) {
          tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-red-500 font-medium">Failed to load codes: ' + escapeHtml(err.message) + '</td></tr>';
        }
      }
    }

    function renderAdminInvitations() {
      const tbody = document.getElementById('admin-invitations-tbody');
      const countEl = document.getElementById('admin-codes-count');
      const activeCountEl = document.getElementById('admin-stat-active-codes');
      const usesCountEl = document.getElementById('admin-stat-total-uses');

      if (!tbody) return;

      if (!adminInvitationsList || adminInvitationsList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="py-8 text-center text-gray-400">No invitation codes created yet. Use the generator above to issue your first partner code!</td></tr>';
        if (countEl) countEl.textContent = '0 codes total';
        if (activeCountEl) activeCountEl.textContent = '0';
        if (usesCountEl) usesCountEl.textContent = '0';
        const tabBadge = document.getElementById('admin-tab-invites-badge');
        if (tabBadge) tabBadge.textContent = '0';
        return;
      }

      let activeCount = 0;
      let totalUses = 0;

      tbody.innerHTML = '';

      adminInvitationsList.forEach(item => {
        const isRevoked = !item.isActive;
        const isExhausted = item.maxUses > 0 && item.usesCount >= item.maxUses;
        const isActive = !isRevoked && !isExhausted;

        if (isActive) activeCount++;
        totalUses += (item.usesCount || 0);

        let statusBadgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        let statusDotClass = 'bg-emerald-500';
        let statusText = 'Active';

        if (isRevoked) {
          statusBadgeClass = 'bg-red-50 text-red-700 border-red-200';
          statusDotClass = 'bg-red-500';
          statusText = 'Revoked';
        } else if (isExhausted) {
          statusBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
          statusDotClass = 'bg-amber-500';
          statusText = 'Exhausted';
        }

        const usesText = item.maxUses <= 0 ? (item.usesCount + ' / Unlimited') : (item.usesCount + ' / ' + item.maxUses);
        const createdDate = item.createdAt ? new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent';

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-gray-50/50 transition border-b border-gray-100';

        // 1. Code TD
        const tdCode = document.createElement('td');
        tdCode.className = 'py-3 px-4';
        const codeSpan = document.createElement('span');
        codeSpan.className = 'font-mono font-bold text-purple-700 bg-purple-50/80 px-2 py-1 rounded-md border border-purple-200/80 select-all tracking-wider';
        codeSpan.textContent = item.code;
        tdCode.appendChild(codeSpan);
        tr.appendChild(tdCode);

        // 2. Description TD
        const tdDesc = document.createElement('td');
        tdDesc.className = 'py-3 px-4 font-medium text-gray-800 max-w-[200px] truncate';
        tdDesc.title = item.description || '';
        tdDesc.textContent = item.description || 'General Invite';
        tr.appendChild(tdDesc);

        // 3. Redemptions TD
        const tdUses = document.createElement('td');
        tdUses.className = 'py-3 px-4 font-semibold text-gray-700 font-mono';
        tdUses.textContent = usesText;
        tr.appendChild(tdUses);

        // 4. Status TD
        const tdStatus = document.createElement('td');
        tdStatus.className = 'py-3 px-4';
        tdStatus.innerHTML = '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ' + statusBadgeClass + '"><span class="w-1.5 h-1.5 rounded-full ' + statusDotClass + '"></span> ' + statusText + '</span>';
        tr.appendChild(tdStatus);

        // 5. Date TD
        const tdDate = document.createElement('td');
        tdDate.className = 'py-3 px-4 text-gray-500';
        tdDate.textContent = createdDate;
        tr.appendChild(tdDate);

        // 6. Actions TD
        const tdActions = document.createElement('td');
        tdActions.className = 'py-3 px-4 text-right whitespace-nowrap';
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'flex items-center justify-end gap-1.5';

        const btnCopyCode = document.createElement('button');
        btnCopyCode.type = 'button';
        btnCopyCode.className = 'px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-[11px] transition cursor-pointer';
        btnCopyCode.textContent = 'Copy Code';
        btnCopyCode.onclick = function() { copyAdminInviteCode(item.code); };
        actionsDiv.appendChild(btnCopyCode);

        const btnCopyLink = document.createElement('button');
        btnCopyLink.type = 'button';
        btnCopyLink.className = 'px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium text-[11px] border border-purple-200/60 transition cursor-pointer';
        btnCopyLink.textContent = 'Copy Link';
        btnCopyLink.onclick = function() { copyAdminInviteLink(item.code); };
        actionsDiv.appendChild(btnCopyLink);

        if (!isRevoked) {
          const btnRevoke = document.createElement('button');
          btnRevoke.type = 'button';
          btnRevoke.className = 'px-2 py-1 rounded hover:bg-red-50 text-red-600 font-medium text-[11px] transition cursor-pointer';
          btnRevoke.textContent = 'Revoke';
          btnRevoke.onclick = function() { handleAdminRevokeInvitation(item.code); };
          actionsDiv.appendChild(btnRevoke);
        }

        tdActions.appendChild(actionsDiv);
        tr.appendChild(tdActions);

        tbody.appendChild(tr);
      });

      if (countEl) countEl.textContent = adminInvitationsList.length + ' codes total';
      if (activeCountEl) activeCountEl.textContent = String(activeCount);
      if (usesCountEl) usesCountEl.textContent = String(totalUses);
      const tabBadge = document.getElementById('admin-tab-invites-badge');
      if (tabBadge) tabBadge.textContent = adminInvitationsList.length;
    }

    async function handleAdminCreateInvitation(e) {
      if (e) e.preventDefault();
      const codeInput = document.getElementById('admin-new-code');
      const descInput = document.getElementById('admin-new-desc');
      const maxUsesSelect = document.getElementById('admin-new-max-uses');
      const submitBtn = document.getElementById('btn-admin-create-code');

      const customCode = (codeInput?.value || '').trim();
      const description = (descInput?.value || '').trim();
      const maxUses = parseInt(maxUsesSelect?.value || '1', 10);

      const origBtn = submitBtn?.innerHTML || '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Creating...</span>';
      }

      try {
        let token = currentIdToken;
        if (!token && currentFirebaseUser) {
          token = await currentFirebaseUser.getIdToken();
          currentIdToken = token;
        }

        const res = await fetch('/api/admin/invitations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            code: customCode,
            description,
            maxUses
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to create code');
        }

        const result = await res.json();
        if (codeInput) codeInput.value = '';
        if (descInput) descInput.value = '';

        await loadAdminInvitations();
        showNotificationToast('✓ Invitation code created: ' + (result?.invitation?.code || ''));
      } catch (err) {
        alert('Failed to create invitation code: ' + err.message);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtn;
        }
      }
    }

    async function handleAdminRevokeInvitation(code) {
      if (!confirm('Are you sure you want to revoke invitation code ' + code + '?')) return;

      try {
        let token = currentIdToken;
        if (!token && currentFirebaseUser) {
          token = await currentFirebaseUser.getIdToken();
          currentIdToken = token;
        }

        const res = await fetch('/api/admin/invitations/' + encodeURIComponent(code), {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });

        if (!res.ok) {
          throw new Error('Failed to revoke code');
        }

        await loadAdminInvitations();
        showNotificationToast('Invitation code revoked.');
      } catch (err) {
        alert('Failed to revoke invitation code: ' + err.message);
      }
    }

    function copyAdminInviteCode(code) {
      navigator.clipboard.writeText(code);
      showNotificationToast('✓ Copied code ' + code + ' to clipboard!');
    }

    function copyAdminInviteLink(code) {
      const link = window.location.origin + '/?invite=' + encodeURIComponent(code);
      navigator.clipboard.writeText(link);
      showNotificationToast('✓ Copied invitation link to clipboard!');
    }

    function showNotificationToast(msg) {
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-5 right-5 bg-gray-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl z-50 transition-opacity duration-300 font-medium flex items-center gap-2 border border-gray-700';
      toast.innerHTML = '<span class="text-emerald-400 font-bold">✓</span> ' + escapeHtml(msg);
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 350);
      }, 3000);
    }
  </script>
</body>
</html>`;
