window.pageHtml = window.pageHtml || {};
window.pageHtml["page-overview"] = `<div id="page-overview" class="page active p-4 h-full flex flex-col min-h-0">
<div class="layout-pane max-w-[1440px] w-full mx-auto h-full flex-1 flex flex-col px-6 py-6 md:px-10 md:py-8 overflow-y-auto relative">

  <!-- Header -->
  <div class="mb-6 flex items-center justify-between gap-6">
    <h1 class="text-slate-900 text-2xl font-semibold">Overview</h1>

    <!-- API Key widget -->
    <div class="bg-white border border-slate-200 rounded-xl flex items-stretch shrink-0 overflow-hidden">
      <div class="flex items-center gap-2.5 px-4 py-2.5">
        <svg class="w-3.5 h-3.5 shrink-0" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
        <span class="text-[11px] text-slate-400 font-medium">API Key</span>
        <div id="ov-key-display" class="bg-slate-50 rounded-md px-2.5 py-1 flex items-center gap-1.5 border border-slate-100">
          <code id="ov-key-val" class="text-xs text-slate-700 font-mono whitespace-nowrap">sk_live_1234••••••••••wxyz</code>
          <button id="ov-key-eye" onclick="toggleOvKeyVis()" class="p-0.5 hover:bg-slate-200 rounded text-slate-400 transition-colors">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
          <button onclick="copyOvKey()" class="p-0.5 hover:bg-slate-200 rounded text-slate-400 transition-colors">
            <svg id="ov-copy-icon" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          </button>
        </div>
      </div>
      <div class="w-px bg-slate-100 my-2"></div>
      <a href="#" class="flex items-center gap-1.5 px-4 hover:bg-slate-50 transition-colors group">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <span class="text-[11px] text-slate-400 group-hover:text-slate-600 transition-colors">Operational →</span>
      </a>
    </div>
  </div>

  <!-- Payment Banner (role-aware in org mode) -->
  <div id="ov-payment-banner"></div>

  <!-- API 产品卡片 -->
  <section class="mb-8">
    <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">API</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <!-- Broad Search · Recommended -->
      <a href="#" onclick="go('broad-search');return false" class="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-slate-400 group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8"/></svg><span class="text-slate-900 font-semibold text-base">Broad Search</span></div>
          <svg class="w-5 h-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">Auto-decomposes one query into many parallel subqueries. Ready for production.</p>
        <div class="flex flex-col gap-2.5">
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>&lt;62ms latency · Scales to 1M+ QPS · Broader coverage in a single call.</span>
          </div>
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            <span>Works best for research agents, hard questions, and comprehensive lookup.</span>
          </div>
        </div>
      </a>
      <a href="#" onclick="go('web-search');return false" class="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-slate-400 group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg><span class="text-slate-900 font-semibold text-base">Web Search</span></div>
          <svg class="w-5 h-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">Ranked web results, highlights, and summaries. Ready for generation.</p>
        <div class="flex flex-col gap-2.5">
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>&lt;62ms latency · Scales to 1M+ QPS</span>
          </div>
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            <span>Works best with structured queries generated by LLMs.</span>
          </div>
        </div>
      </a>
      <!-- Image Search -->
      <a href="#" onclick="openRequestAccess('Image Search');return false" class="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-slate-400 group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span class="text-slate-900 font-semibold text-base">Image Search</span><span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium" style="background:#0398551a;color:#039855">Early Access</span></div>
          <svg class="w-5 h-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">Image retrieval across the open web. Ready for design and creative workflows.</p>
        <div class="flex flex-col gap-2.5">
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            <span>Works best for design references, asset lookup, and content creation.</span>
          </div>
        </div>
      </a>
      <!-- Video Search -->
      <a href="#" onclick="openRequestAccess('Video Search');return false" class="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-slate-400 group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg><span class="text-slate-900 font-semibold text-base">Video Search</span><span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium" style="background:#0398551a;color:#039855">Early Access</span></div>
          <svg class="w-5 h-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">Video retrieval across the open web. Ready for media discovery and research.</p>
        <div class="flex flex-col gap-2.5">
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            <span>Works best for video discovery, tutorial lookup, and clip sourcing.</span>
          </div>
        </div>
      </a>
      <a href="#" onclick="go('extract');return false" class="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-slate-400 group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg><span class="text-slate-900 font-semibold text-base">Extract</span></div>
          <svg class="w-5 h-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">Clean markdown, intent-focused highlights, and page classification. Ready for ingestion.</p>
        <div class="flex flex-col gap-2.5">
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>Clean markdown extraction · success-only pricing</span>
          </div>
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            <span>Works best for AI agents, RAG pipelines, and content monitoring.</span>
          </div>
        </div>
      </a>
      <!-- Model -->
      <a href="#" onclick="go('model');return false" class="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-slate-400 group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/></svg><span class="text-slate-900 font-semibold text-base">Model</span></div>
          <svg class="w-5 h-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">One API to call any LLM, with unified billing. Ready for production.</p>
        <div class="flex flex-col gap-2.5">
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>OpenAI-compatible · Switch providers without rewriting code.</span>
          </div>
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            <span>Works best for multi-model apps, fallback chains, and cost routing.</span>
          </div>
        </div>
      </a>
      <a href="https://docs.octen.ai/api-reference/embedding" target="_blank" rel="noreferrer" class="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-slate-400 group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg><span class="text-slate-900 font-semibold text-base">Embedding</span></div>
          <svg class="w-5 h-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">Vector embeddings for retrieval, similarity, and ranking. Ready for production.</p>
        <div class="flex flex-col gap-2.5">
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>#1 on RTEB (0.7953) · Strong multilingual performance.</span>
          </div>
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            <span>Works best for RAG, semantic search, and recommendations.</span>
          </div>
        </div>
      </a>
      <!-- VL Embedding -->
      <a href="https://docs.octen.ai/api-reference/vl-embedding" target="_blank" rel="noreferrer" class="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden" onmouseenter="this.style.borderColor='#039855'" onmouseleave="this.style.borderColor=''">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3"><svg class="w-6 h-6 text-slate-400 group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg><span class="text-slate-900 font-semibold text-base">VL Embedding</span></div>
          <svg class="w-5 h-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#039855]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">Multimodal embeddings for cross-modal retrieval, similarity, and ranking. Ready for production.</p>
        <div class="flex flex-col gap-2.5">
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            <span>#1 on MMEB-V2 (80.09) · Unified vision-language space.</span>
          </div>
          <div class="flex items-start gap-2 text-sm text-slate-600">
            <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            <span>Works best for multimodal RAG, visual document search, and image-text retrieval.</span>
          </div>
        </div>
      </a>
    </div>
  </section>

  <!-- Application -->
  <section class="mb-8">
    <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Application</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Answer (formerly Broad Search Application) -->
      <a href="#" onclick="go('broad-search');return false" class="group bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer">
        <div class="flex-1">
          <div class="flex items-center gap-2.5 mb-2">
            <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style="background:#0398551a;color:#039855"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg></span>
            <p class="text-slate-900 font-semibold">Answer</p>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">Experience conversational search. Get verifiable AI answers grounded in live web sources.</p>
        </div>
        <div class="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
          <span class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855">Try now <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></span>
        </div>
      </a>
      <!-- Deep Research -->
      <a href="#" onclick="go('deep-research');return false" class="group bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer">
        <div class="flex-1">
          <div class="flex items-center gap-2.5 mb-2">
            <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style="background:#0398551a;color:#039855"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18h8M3 22h18M14 22a7 7 0 100-14h-1M9 14h2M9 12a2 2 0 01-2-2V6h6v4a2 2 0 01-2 2zM12 6V3a1 1 0 00-1-1H9a1 1 0 00-1 1v3"/></svg></span>
            <p class="text-slate-900 font-semibold">Deep Research</p>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">Experience Deep Research. Get comprehensive reports distilled from thousands of sources.</p>
        </div>
        <div class="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
          <span class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855">Try now <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></span>
        </div>
      </a>
      <!-- Multimodal Chat -->
      <a href="#" onclick="openRequestAccess('Multimodal Chat');return false" class="group bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer">
        <div class="flex-1">
          <div class="flex items-center gap-2.5 mb-2">
            <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style="background:#0398551a;color:#039855"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg></span>
            <p class="text-slate-900 font-semibold">Multimodal Chat</p>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium" style="background:#0398551a;color:#039855">Early Access</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">Experience multimodal chat. Get answers grounded in text, image, and video sources.</p>
        </div>
        <div class="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
          <span class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855">Try now <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></span>
        </div>
      </a>
      <!-- Grounded Generation -->
      <a href="#" onclick="openRequestAccess('Grounded Generation');return false" class="group bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer">
        <div class="flex-1">
          <div class="flex items-center gap-2.5 mb-2">
            <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style="background:#0398551a;color:#039855"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 15l-5-5L5 21"/></svg></span>
            <p class="text-slate-900 font-semibold">Grounded Generation</p>
            <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium" style="background:#0398551a;color:#039855">Early Access</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">Generate images and videos grounded in web-sourced references.</p>
        </div>
        <div class="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
          <span class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855">Try now <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></span>
        </div>
      </a>
    </div>
  </section>

  <!-- Getting Started -->
  <section>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-400">Getting Started</h2>
      <a href="https://docs.octen.ai/introduction/getting-started/quickstart" target="_blank" rel="noreferrer" class="text-xs font-medium hover:opacity-75 transition-opacity" style="color:#039855">Quickstart guide →</a>
    </div>
    <div class="grid md:grid-cols-3 gap-4">
      <div class="group bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">01</span>
        <div class="flex-1"><p class="text-slate-900 font-semibold mb-2">Get your API key</p><p class="text-xs text-slate-600 leading-relaxed">One API key for all Octen APIs.</p></div>
        <div class="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
          <a href="#" onclick="go('api-keys');return false" class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">Manage API keys <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        </div>
      </div>
      <div class="group bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">02</span>
        <div class="flex-1"><p class="text-slate-900 font-semibold mb-2">Make your first call</p><p class="text-xs text-slate-600 leading-relaxed">Fast, structured responses via API, SDK, or the CLI.</p></div>
        <div class="flex flex-row flex-nowrap items-center gap-4 pt-2 border-t border-slate-100">
          <a href="https://docs.octen.ai/api-reference/search" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit whitespace-nowrap" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">API &amp; SDKs <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
          <a href="https://docs.octen.ai/llm-&-agent-interfaces/integrations/octen-cli" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit whitespace-nowrap" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">CLI <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        </div>
      </div>
      <div class="group bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">03</span>
        <div class="flex-1"><p class="text-slate-900 font-semibold mb-2">Integrate into your app</p><p class="text-xs text-slate-600 leading-relaxed">Use as an LLM tool or skill, or integrate into RAG pipelines.</p></div>
        <div class="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
          <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/connect-llms-to-octen-search" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">Integration guide <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        </div>
      </div>
    </div>

    <!-- Built with MCP & Skills -->
    <div class="mt-4 bg-white border border-slate-200 rounded-xl p-6 grid lg:grid-cols-2 gap-6 hover:shadow-md hover:border-slate-300 transition-all">
      <!-- Left: intro -->
      <div class="min-w-0">
        <p class="text-slate-900 font-semibold mb-1.5">Built with MCP &amp; Skills</p>
        <p class="text-xs text-slate-600 leading-relaxed">Connect once, and your agent gets Search, Extract, and every tool we ship next — native to Claude Desktop, Cursor, VS Code, and any MCP client.</p>
      </div>
      <!-- Right: tabs + install + actions -->
      <div class="min-w-0 lg:border-l lg:border-slate-200 lg:pl-6">
        <!-- Tabs -->
        <div class="flex items-center gap-1 mb-3 border-b border-slate-200">
          <button data-mcps-tab="mcp" class="mcps-tab px-3 py-1.5 text-sm font-medium border-b-2 -mb-px transition-colors" style="color:#039855;border-color:#039855">MCP</button>
          <button data-mcps-tab="skills" class="mcps-tab px-3 py-1.5 text-sm font-medium border-b-2 -mb-px transition-colors text-slate-500 border-transparent hover:text-slate-700">Skills</button>
        </div>
        <!-- MCP panel -->
        <div data-mcps-panel="mcp" class="mcps-panel">
          <div class="flex items-center gap-2 flex-wrap">
            <select id="mcps-client" onchange="mcpsSetClient(this.value)" class="shrink-0 bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 cursor-pointer">
              <option value="claude-code">Claude Code</option>
              <option value="claude-desktop">Claude Desktop</option>
              <option value="cursor">Cursor</option>
              <option value="vscode">VS Code</option>
            </select>
            <div class="flex-1 min-w-[200px] flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono text-xs text-slate-800">
              <span id="mcps-cmd-mcp" class="truncate">claude mcp add --scope user octen -- npx -y octen-mcp</span>
              <button onclick="navigator.clipboard.writeText(document.getElementById('mcps-cmd-mcp').textContent)" class="text-slate-400 hover:text-slate-700 shrink-0" title="Copy">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              </button>
            </div>
            <a href="https://github.com/Octen-Team/octen-mcp" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </a>
            <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/octen-mcp-server" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">Docs</a>
          </div>
        </div>
        <!-- Skills panel -->
        <div data-mcps-panel="skills" class="mcps-panel hidden">
          <div class="flex items-center gap-2 flex-wrap">
            <div class="flex-1 min-w-[200px] flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono text-xs text-slate-800">
              <span>git clone https://github.com/Octen-Team/web-search-skills</span>
              <button onclick="navigator.clipboard.writeText('git clone https://github.com/Octen-Team/web-search-skills')" class="text-slate-400 hover:text-slate-700 shrink-0" title="Copy">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              </button>
            </div>
            <a href="https://github.com/Octen-Team" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </a>
            <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/octen-skills" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">Docs</a>
          </div>
        </div>
      </div>
      <script>
        (function(){
          const tabs = document.querySelectorAll('.mcps-tab');
          const panels = document.querySelectorAll('.mcps-panel');
          tabs.forEach(t => t.addEventListener('click', () => {
            const key = t.dataset.mcpsTab;
            tabs.forEach(x => {
              const active = x.dataset.mcpsTab === key;
              x.style.color = active ? '#039855' : '';
              x.style.borderColor = active ? '#039855' : '';
              x.classList.toggle('text-slate-500', !active);
              x.classList.toggle('border-transparent', !active);
            });
            panels.forEach(p => p.classList.toggle('hidden', p.dataset.mcpsPanel !== key));
          }));
        })();
        window.mcpsSetClient = function (v) {
          const cmds = {
            'claude-code': 'claude mcp add --scope user octen -- npx -y octen-mcp',
            'claude-desktop': 'npx -y octen-mcp',
            'cursor': 'npx -y octen-mcp',
            'vscode': 'npx -y octen-mcp'
          };
          const el = document.getElementById('mcps-cmd-mcp');
          if (el && cmds[v]) el.textContent = cmds[v];
        };
      </script>
    </div>
  </section>
</div>

<!-- ──────────────────────────────────────────────────────────
     WEB SEARCH PAGE (existing, no changes — faithful to WebSearchPage.tsx)
────────────────────────────────────────────────────────────── -->
<div id="page-web-search" class="page p-4">
  <div class="grid lg:grid-cols-2 gap-4">
    <!-- Left: Parameters -->
    <div class="space-y-4">
      <div class="bg-white rounded-md border border-slate-200 p-4 space-y-4">
        <!-- Configuration header -->
        <div class="flex items-center justify-between">
          <h2 class="text-slate-800 font-semibold" style="font-size:17px">Configuration</h2>
          <a href="#" onclick="return false" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 text-slate-600 rounded-md text-xs hover:bg-slate-50">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Docs</span>
          </a>
        </div>
        <!-- Query -->
        <section>
          <label class="block text-slate-800 text-sm font-medium mb-2">Query<span class="text-red-500 ml-0.5">*</span></label>
          <div class="flex items-center gap-3 mb-2">
            <div class="relative flex-1">
              <input type="text" id="ws-query" placeholder="Find" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none placeholder:text-slate-400"/>
            </div>
            <button type="button" onclick="wsClear()" class="inline-flex items-center px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 whitespace-nowrap">
              <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M1 4v6h6M23 20v-6h-6"/><path stroke-linecap="round" stroke-linejoin="round" d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
              <span>Clear</span>
            </button>
            <button type="button" onclick="wsRun()" class="inline-flex items-center px-4 py-2 text-white rounded-lg text-sm whitespace-nowrap" style="background:#cbd5e1;cursor:not-allowed" id="ws-run-btn">
              <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Run</span>
            </button>
          </div>
          <!-- Payment method notice -->
          <div id="ws-pay-notice" class="mb-2 flex items-center gap-2 text-sm text-slate-700">
            <svg class="w-4 h-4 shrink-0" style="color:#F97316" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <span>Add a payment method to unlock the API. Free credits included.</span>
            <a href="#" onclick="go('billing');return false" class="font-medium hover:underline" style="color:#039855">Add payment method →</a>
          </div>
        </section>

        <div class="border-t border-slate-100"></div>

        <!-- Basic settings -->
        <section class="space-y-3">
          <h2 class="text-slate-800 text-sm font-medium">Basic settings</h2>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Topic</label>
              <select id="ws-topic" onchange="wsRefreshCode && wsRefreshCode()" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs bg-white outline-none focus:border-[#039855]">
                <option value="general" selected>general</option><option value="news">news</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Max results</label>
              <input type="number" id="ws-max" min="1" max="100" value="5" oninput="wsRefreshCode()" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
        </section>

        <div class="border-t border-slate-100"></div>

        <!-- Filters -->
        <section class="space-y-3">
          <h2 class="text-slate-800 text-sm font-medium">Filters</h2>
          <div class="grid grid-cols-2 gap-3 items-start">
            <div>
              <label class="block text-slate-700 text-xs uppercase tracking-wide mb-1">Time basis</label>
              <div class="inline-flex rounded-full border border-slate-200 text-xs overflow-hidden">
                <button type="button" class="ws-tb px-2.5 py-1 border-r border-slate-200" data-b="auto" onclick="wsBasis('auto')" style="background:#0398551a;color:#039855;font-weight:500">Auto</button>
                <button type="button" class="ws-tb px-2.5 py-1 border-r border-slate-200 bg-white text-slate-600" data-b="published" onclick="wsBasis('published')">Published</button>
                <button type="button" class="ws-tb px-2.5 py-1 bg-white text-slate-600" data-b="crawled" onclick="wsBasis('crawled')">Crawled</button>
              </div>
            </div>
            <div class="relative">
              <label class="block text-slate-700 text-xs uppercase tracking-wide mb-1">Date range</label>
              <button type="button" id="ws-date-btn" onclick="wsDateToggle()" class="w-full flex items-center gap-2 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white outline-none focus:border-[#039855]">
                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path stroke-linecap="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
                <span id="ws-date-label" class="text-slate-400">Custom range</span>
              </button>
              <div id="ws-date-pop" style="display:none;position:absolute;top:calc(100% + 6px);right:0;z-index:60;background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 12px 32px rgba(15,23,42,0.16);padding:14px;gap:12px;width:max-content;max-width:90vw"></div>
              <input type="hidden" id="ws-start"/><input type="hidden" id="ws-end"/>
            </div>
          </div>
          <p class="text-xs text-slate-500">Auto prefers published time and falls back to crawled time. Presets and custom start/end are mutually exclusive.</p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Include domains</label>
              <textarea id="ws-inc" rows="2" placeholder="e.g. octen.ai (one per line)" oninput="wsRefreshCode()" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855] resize-none"></textarea>
            </div>
            <div>
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Exclude domains</label>
              <textarea id="ws-exc" rows="2" placeholder="e.g. octen.ai (one per line)" oninput="wsRefreshCode()" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855] resize-none"></textarea>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Include text</label>
              <input type="text" id="ws-inctext" placeholder="Phrase to include (≤ 5 words)" oninput="wsRefreshCode()" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
            <div>
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Exclude text</label>
              <input type="text" id="ws-exctext" placeholder="Phrase to exclude (≤ 5 words)" oninput="wsRefreshCode()" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
        </section>

        <div class="border-t border-slate-100"></div>

        <!-- Output options -->
        <section class="space-y-4">
          <h2 class="text-slate-800 text-sm font-medium">Output options</h2>

          <!-- Return highlights -->
          <div>
            <div class="flex items-center justify-between gap-3">
              <label class="flex items-center gap-2 text-slate-800 text-xs font-medium cursor-pointer">
                <input type="checkbox" id="ws-hl" checked onchange="wsRefreshCode()" class="w-4 h-4 rounded border-slate-300" style="accent-color:#039855"/>
                <span>Return highlights</span>
              </label>
              <div class="flex items-center gap-2 shrink-0">
                <span class="text-xs text-slate-500">Max tokens</span>
                <input type="number" id="ws-hltok" min="1" value="512" oninput="wsRefreshCode()" class="w-20 px-2 py-1 border border-slate-200 rounded text-xs outline-none focus:border-[#039855] tabular-nums text-right"/>
              </div>
            </div>
            <p class="text-xs text-slate-500 ml-6 mt-1">Extract query-relevant highlights from the content.</p>
          </div>

          <!-- Return full content -->
          <div>
            <div class="flex items-center justify-between gap-3">
              <label class="flex items-center gap-2 text-slate-800 text-xs font-medium cursor-pointer">
                <input type="checkbox" id="ws-fc" onchange="wsRefreshCode()" class="w-4 h-4 rounded border-slate-300" style="accent-color:#039855"/>
                <span>Return full content</span>
              </label>
              <div class="flex items-center gap-2 shrink-0">
                <span class="text-xs text-slate-500">Max tokens</span>
                <input type="number" id="ws-fctok" min="1" value="2048" oninput="wsRefreshCode()" class="w-20 px-2 py-1 border border-slate-200 rounded text-xs outline-none focus:border-[#039855] tabular-nums text-right"/>
              </div>
            </div>
            <p class="text-xs text-slate-500 ml-6 mt-1">Billed via full_content_max_tokens.</p>
          </div>

          <!-- Safe search -->
          <div>
            <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Safesearch</label>
            <select id="ws-safe" onchange="wsRefreshCode()" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs bg-white outline-none focus:border-[#039855]">
              <option value="off">Off</option><option value="moderate">Moderate</option><option value="strict">Strict</option>
            </select>
          </div>
        </section>
      </div>
    </div>

    <!-- Right: Code & Response -->
    <div>
      <div class="bg-white rounded-md border border-slate-200">
        <!-- Tabs -->
        <div class="border-b border-slate-100 flex">
          <button id="ws-tab-req" class="flex-1 px-4 py-2.5 text-xs font-medium" style="color:#039855;background:#0398551a;border-bottom:2px solid #039855" onclick="wsTabSwitch('request')">Request</button>
          <button id="ws-tab-res" class="flex-1 px-4 py-2.5 text-xs font-medium text-slate-600" onclick="wsTabSwitch('response')">Response</button>
        </div>
        <div class="p-4">
          <!-- Request pane -->
          <div id="ws-pane-request">
            <div class="flex items-center justify-between mb-3">
              <div class="inline-flex rounded-md border border-slate-200 overflow-hidden text-xs">
                <button type="button" class="ws-lang px-3 py-1.5" data-l="python" onclick="wsSetLang('python')">Python</button>
                <button type="button" class="ws-lang px-3 py-1.5 border-l border-slate-200" data-l="javascript" onclick="wsSetLang('javascript')">JavaScript</button>
                <button type="button" class="ws-lang px-3 py-1.5 border-l border-slate-200" data-l="curl" onclick="wsSetLang('curl')">cURL</button>
              </div>
              <button type="button" onclick="wsCopyReq()" id="ws-copyreq" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <span>Copy</span>
              </button>
            </div>
            <div id="ws-code" class="rounded-md overflow-hidden" style="max-height:560px"></div>
          </div>
          <!-- Response pane -->
          <div id="ws-pane-response" class="hidden">
            <div class="flex flex-col items-center justify-center py-12 text-slate-400">
              <svg class="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <p class="text-xs">Run a query to see results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ──────────────────────────────────────────────────────────
     BROAD SEARCH (API) PAGE — scaffold
     Layout mirrors Search: left parameters, right request/response.
     API scope: query expansion + parallel search only. No Answer/synthesis.
────────────────────────────────────────────────────────────── -->
<div id="page-broad-search-api" class="page p-4">
  <div class="grid lg:grid-cols-2 gap-4">
    <!-- Left: Parameters -->
    <div class="space-y-4">
      <div class="bg-white rounded-md border border-slate-200 p-4 space-y-4">
        <!-- Configuration header -->
        <div class="flex items-center justify-between">
          <h2 class="text-slate-800 font-semibold" style="font-size:17px">Configuration</h2>
          <a href="#" onclick="return false" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 text-slate-600 rounded-md text-xs hover:bg-slate-50">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Docs</span>
          </a>
        </div>
        <!-- Query -->
        <section>
          <label class="block text-slate-800 text-sm font-medium mb-2">Query<span class="text-red-500 ml-0.5">*</span></label>
          <div id="bsa-query-box" class="border border-slate-200 rounded-lg px-3 pt-2.5 pb-2 transition-colors focus-within:border-[#039855]">
            <textarea id="bsa-query" rows="2" placeholder="" class="w-full border-0 outline-none resize-none text-sm text-slate-800 placeholder:text-slate-400 leading-relaxed bg-transparent"></textarea>
            <div class="flex items-center justify-end gap-2 mt-1">
              <button type="button" onclick="bsaClear()" class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-slate-50 whitespace-nowrap">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M1 4v6h6M23 20v-6h-6"/><path stroke-linecap="round" stroke-linejoin="round" d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
                <span>Clear</span>
              </button>
              <button type="button" onclick="bsaRun()" id="bsa-run-btn" class="inline-flex items-center gap-1.5 px-4 py-1.5 text-white rounded-lg text-xs whitespace-nowrap" style="background:#039855">
                <svg class="w-3.5 h-3.5" fill="#fff" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <span>Run</span>
              </button>
            </div>
          </div>
        </section>

        <div class="border-t border-slate-100"></div>

        <!-- Basic settings (top-level) -->
        <section class="space-y-3">
          <h2 class="text-slate-800 text-sm font-medium">Basic settings</h2>
          <div>
            <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Max queries</label>
            <input type="number" id="bsa-maxq" min="1" max="20" value="5" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855]"/>
            <p class="text-xs text-slate-500 mt-1">Number of sub-queries to expand and run in parallel.</p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Topic</label>
              <select id="bsa-topic" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs bg-white outline-none focus:border-[#039855]">
                <option value="general">general</option><option value="news" selected>news</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Max results</label>
              <input type="number" id="bsa-count" min="1" max="100" value="10" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
        </section>

        <div class="border-t border-slate-100"></div>

        <!-- Filters -->
        <section class="space-y-3">
          <h2 class="text-slate-800 text-sm font-medium">Filters</h2>
          <div class="grid grid-cols-2 gap-3 items-start">
            <div>
              <label class="block text-slate-700 text-xs uppercase tracking-wide mb-1">Time basis</label>
              <div id="bsa-tb-pills" class="inline-flex rounded-full border border-slate-200 text-xs overflow-hidden">
                <button type="button" class="bsa-tb px-2.5 py-1 border-r border-slate-200" data-tb="auto" style="background:#0398551a;color:#039855;font-weight:500">Auto</button>
                <button type="button" class="bsa-tb px-2.5 py-1 border-r border-slate-200 bg-white text-slate-600" data-tb="published">Published</button>
                <button type="button" class="bsa-tb px-2.5 py-1 bg-white text-slate-600" data-tb="crawled">Crawled</button>
              </div>
            </div>
            <div class="relative">
              <label class="block text-slate-700 text-xs uppercase tracking-wide mb-1">Date range</label>
              <button type="button" id="bsa-date-btn" onclick="bsaDateToggle()" class="w-full flex items-center gap-2 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white outline-none focus:border-[#039855]">
                <svg class="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path stroke-linecap="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
                <span id="bsa-date-label" class="text-slate-400">Custom range</span>
              </button>
              <div id="bsa-date-pop" style="display:none;position:absolute;top:calc(100% + 6px);right:0;z-index:60;background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 12px 32px rgba(15,23,42,0.16);padding:14px;gap:12px;width:max-content;max-width:90vw"></div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Domain filters</label>
              <textarea id="bsa-include" rows="3" placeholder="e.g. octen.ai (one per line)" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855] resize-none"></textarea>
            </div>
            <div>
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Exclude domains</label>
              <textarea id="bsa-exclude" rows="3" placeholder="e.g. octen.ai (one per line)" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855] resize-none"></textarea>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Include text</label>
              <input type="text" id="bsa-inctext" placeholder="Phrase to include (≤ 5 words)" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
            <div>
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Exclude text</label>
              <input type="text" id="bsa-exctext" placeholder="Phrase to exclude (≤ 5 words)" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
          <!-- hidden state for custom range start/end (set via calendar) -->
          <input type="hidden" id="bsa-start"/><input type="hidden" id="bsa-end"/>
        </section>

        <div class="border-t border-slate-100"></div>

        <!-- Output options (within search_options) -->
        <section class="space-y-4">
          <h2 class="text-slate-800 text-sm font-medium">Output options</h2>
          <!-- highlight -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <label class="flex items-center gap-2 text-slate-800 text-xs font-medium cursor-pointer">
                <input type="checkbox" id="bsa-hl" checked class="w-4 h-4 rounded border-slate-300" style="accent-color:#039855"/>
                <span>Return highlights</span>
              </label>
              <p class="text-xs text-slate-500 ml-6 mt-1">Extract query-relevant highlights from the content.</p>
            </div>
            <div id="bsa-hl-wrap" class="shrink-0">
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Highlights max tokens</label>
              <input type="number" id="bsa-hl-tokens" min="1" value="256" class="w-28 px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
          <!-- full_content -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <label class="flex items-center gap-2 text-slate-800 text-xs font-medium cursor-pointer">
                <input type="checkbox" id="bsa-fc" class="w-4 h-4 rounded border-slate-300" style="accent-color:#039855"/>
                <span>Return full content</span>
              </label>
              <p class="text-xs text-slate-500 ml-6 mt-1">Billed via full_content_max_tokens.</p>
            </div>
            <div id="bsa-fc-wrap" class="shrink-0 hidden">
              <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Full content max tokens</label>
              <input type="number" id="bsa-fc-tokens" min="1" value="2048" class="w-28 px-2.5 py-1.5 border border-slate-200 rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
          <!-- media toggles -->
          <div class="grid grid-cols-2 gap-2">
            <label class="flex items-center gap-2 text-slate-800 text-xs font-medium cursor-pointer"><input type="checkbox" id="bsa-images" class="w-4 h-4 rounded border-slate-300" style="accent-color:#039855"/><span>Include images</span></label>
            <label class="flex items-center gap-2 text-slate-800 text-xs font-medium cursor-pointer"><input type="checkbox" id="bsa-videos" class="w-4 h-4 rounded border-slate-300" style="accent-color:#039855"/><span>Include videos</span></label>
          </div>
          <!-- safesearch -->
          <div>
            <label class="block text-slate-700 mb-1 text-xs uppercase tracking-wide">Safesearch</label>
            <select id="bsa-safesearch" class="w-full px-2.5 py-1.5 border border-slate-200 rounded-md text-xs bg-white outline-none focus:border-[#039855]">
              <option value="off">off</option><option value="moderate">moderate</option><option value="strict">strict</option>
            </select>
          </div>
        </section>
      </div>
    </div>

    <!-- Right: Code & Response -->
    <div>
      <div class="bg-white rounded-md border border-slate-200">
        <div class="border-b border-slate-100 flex">
          <button id="bsa-tab-req" class="flex-1 px-4 py-2.5 text-xs font-medium" style="color:#039855;background:#0398551a;border-bottom:2px solid #039855" onclick="bsaTab('request')">Request</button>
          <button id="bsa-tab-res" class="flex-1 px-4 py-2.5 text-xs font-medium text-slate-600" onclick="bsaTab('response')">Response</button>
        </div>
        <div class="p-4">
          <!-- Request pane -->
          <div id="bsa-pane-request">
            <div class="flex items-center justify-between mb-3">
              <div class="inline-flex rounded-md border border-slate-200 overflow-hidden text-xs">
                <button type="button" class="bsa-lang px-3 py-1.5" data-l="python" onclick="bsaSetLang('python')">Python</button>
                <button type="button" class="bsa-lang px-3 py-1.5 border-l border-slate-200" data-l="javascript" onclick="bsaSetLang('javascript')">JavaScript</button>
                <button type="button" class="bsa-lang px-3 py-1.5 border-l border-slate-200" data-l="curl" onclick="bsaSetLang('curl')">cURL</button>
              </div>
              <button type="button" onclick="bsaCopyReq()" id="bsa-copyreq" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <span>Copy</span>
              </button>
            </div>
            <div id="bsa-code" class="rounded-md overflow-hidden" style="max-height:560px"></div>
          </div>
          <!-- Response pane -->
          <div id="bsa-pane-response" class="hidden">
            <div class="flex items-center justify-between mb-3">
              <div class="inline-flex rounded-md border border-slate-200 overflow-hidden text-xs">
                <button id="bsa-rt-preview" class="px-3 py-1.5" style="background:#0398551a;color:#039855;font-weight:500" onclick="bsaRtab('preview')">Preview</button>
                <button id="bsa-rt-json" class="px-3 py-1.5 border-l border-slate-200 bg-white text-slate-600" onclick="bsaRtab('json')">JSON</button>
              </div>
              <span id="bsa-meta" class="text-xs text-slate-400"></span>
            </div>
            <div id="bsa-resp-body">
              <div class="flex flex-col items-center justify-center py-12 text-slate-400">
                <svg class="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35"/></svg>
                <p class="text-xs">Run a query to see expanded queries &amp; parallel results</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ──────────────────────────────────────────────────────────
     WEB FLOW PAGE (existing, no changes)
────────────────────────────────────────────────────────────── -->
<div id="page-web-flow" class="page max-w-7xl mx-auto p-4">

  <!-- Header bar -->
  <div class="bg-white border border-slate-200 rounded-lg px-5 py-4 mb-4">
    <div class="flex items-center justify-between gap-4">
      <!-- Left: Title + Status -->
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-3">
          <div id="wf-title-empty" class="">
            <h1 class="text-slate-900 text-lg font-semibold">Web Flow</h1>
          </div>
          <div id="wf-title-active" class="hidden flex items-center gap-2 min-w-0">
            <h1 class="text-slate-900 text-lg font-semibold truncate" id="wf-flow-name">Tech News Monitor</h1>
            <button onclick="wfEditName()" class="p-1 hover:bg-slate-100 rounded">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
            <span id="wf-status-badge" class="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Saved</span>
            <span id="wf-mode-badge" class="px-1.5 py-0.5 rounded text-[11px] font-medium bg-blue-100 text-blue-700">Incremental</span>
            <span id="wf-dirty" class="hidden text-xs text-orange-600 font-medium">· Unsaved changes</span>
          </div>
        </div>
        <p id="wf-empty-desc" class="text-xs text-slate-500 mt-1">Define a repeatable batch delivery rule. Preview a sample first, then save and run via API.</p>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <button onclick="wfNewFlow()" class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 rounded-md text-xs font-medium transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          New Flow
        </button>
        <div class="relative">
          <button onclick="wfToggleDrop('examples')" class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 rounded-md text-xs font-medium transition-colors">
            Examples
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div id="wf-examples-drop" class="hidden absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-md shadow-lg z-20 max-h-96 overflow-y-auto">
            <div class="p-2 space-y-1">
              <button onclick="wfLoadExample('General Web Pretraining', 'Broad web content delivery for LLM pretraining (batch, low QPS).', 'general', '', 'one_time')" class="w-full text-left p-3 hover:bg-slate-50 rounded-md transition-colors">
                <div class="font-medium text-sm text-slate-900">General Web Pretraining</div>
                <div class="text-xs text-slate-500 mt-1">Broad web content delivery for LLM pretraining (batch, low QPS).</div>
              </button>
              <button onclick="wfLoadExample('Finance Filings Monitor', 'Incremental delivery of newly crawled SEC filings.', 'finance', 'SEC filings', 'incremental')" class="w-full text-left p-3 hover:bg-slate-50 rounded-md transition-colors">
                <div class="font-medium text-sm text-slate-900">Finance Filings Monitor</div>
                <div class="text-xs text-slate-500 mt-1">Incremental delivery of newly crawled SEC filings.</div>
              </button>
              <button onclick="wfLoadExample('Medical Research Database', 'Curated medical research for healthcare AI workflows.', 'health', 'clinical guidelines', 'one_time')" class="w-full text-left p-3 hover:bg-slate-50 rounded-md transition-colors">
                <div class="font-medium text-sm text-slate-900">Medical Research Database</div>
                <div class="text-xs text-slate-500 mt-1">Curated medical research for healthcare AI workflows.</div>
              </button>
            </div>
          </div>
        </div>
        <div class="relative">
          <button onclick="wfToggleDrop('saved')" class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 rounded-md text-xs font-medium transition-colors">
            Saved Flows
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div id="wf-saved-drop" class="hidden absolute right-0 top-full mt-2 w-96 bg-white border border-slate-200 rounded-md shadow-lg z-20 max-h-96 overflow-y-auto">
            <div class="p-2 space-y-1">
              <button onclick="wfLoadSaved('Tech News Monitor', 'general', 'AI breakthrough', 'incremental')" class="w-full text-left p-3 hover:bg-slate-50 rounded-md transition-colors">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0 flex-1">
                    <div class="font-medium text-sm text-slate-900 truncate">Tech News Monitor</div>
                    <div class="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Incremental</span>
                      <span>·</span>
                      <span>general</span>
                    </div>
                  </div>
                  <div class="text-xs text-slate-400">2d ago</div>
                </div>
              </button>
              <button onclick="wfLoadSaved('Finance Data Collection', 'finance', '', 'one_time')" class="w-full text-left p-3 hover:bg-slate-50 rounded-md transition-colors">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0 flex-1">
                    <div class="font-medium text-sm text-slate-900 truncate">Finance Data Collection</div>
                    <div class="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">One-time</span>
                      <span>·</span>
                      <span>finance</span>
                    </div>
                  </div>
                  <div class="text-xs text-slate-400">1w ago</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty state -->
  <div id="wf-empty-state" class="bg-white rounded-lg border border-slate-200 p-12 text-center">
    <svg class="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8m-8 6h16"/><circle cx="18" cy="12" r="3"/></svg>
    <p class="text-slate-700 text-sm font-medium mb-1">Get started with Web Flow</p>
    <p class="text-slate-500 text-xs mb-5">Create a new flow, choose an example, or load a saved flow.</p>
    <div class="flex items-center justify-center gap-2">
      <button onclick="wfNewFlow()" class="inline-flex items-center gap-1.5 px-4 py-2 text-white rounded-md text-xs font-medium" style="background:#039855">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
        New Flow
      </button>
    </div>
  </div>

  <!-- Builder -->
  <div id="wf-builder" class="hidden bg-white rounded-lg border border-slate-200 p-5 mb-4">
    <div class="space-y-4">
      <!-- Query -->
      <div>
        <label class="block text-xs font-medium text-slate-700 mb-1.5">Query <span class="text-slate-400 font-normal">(optional)</span></label>
        <input type="text" id="wf-query" placeholder="Optional. Leave empty for filter-only delivery." class="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-[#039855]"/>
        <p class="text-[11px] text-slate-500 mt-1">Flow must have at least one effective constraint: Query, Domains, or Crawled time range.</p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <!-- Topic -->
        <div>
          <label class="block text-xs font-medium text-slate-700 mb-1.5">Topic</label>
          <select id="wf-topic" class="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white focus:outline-none focus:border-[#039855]">
            <option value="general">General</option>
            <option value="finance">Finance</option>
            <option value="health">Health</option>
            <option value="legal">Legal</option>
            <option value="academic">Academic</option>
          </select>
          <p class="text-[11px] text-slate-500 mt-1">Default is General (required).</p>
        </div>

        <!-- Crawled Time Range -->
        <div>
          <label class="block text-xs font-medium text-slate-700 mb-1.5">Crawled Time Range <span class="text-slate-400 font-normal">(optional)</span></label>
          <select id="wf-time" onchange="wfTimeChange()" class="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white focus:outline-none focus:border-[#039855]">
            <option value="any">Any time</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="180d">Last 180 days</option>
            <option value="custom">Custom range</option>
          </select>
          <p id="wf-time-incremental-hint" class="hidden text-[11px] text-amber-700 mt-1">Incremental requires a non-empty time window.</p>
        </div>
      </div>

      <!-- Advanced -->
      <div class="pt-3 border-t border-slate-200">
        <button onclick="wfToggleAdvanced()" class="flex items-center gap-2 text-xs font-semibold text-slate-900 hover:opacity-80 mb-3">
          Advanced Filters
          <svg id="wf-adv-chevron" class="w-3.5 h-3.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div id="wf-advanced" class="hidden grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1.5">Language</label>
            <select class="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white focus:outline-none focus:border-[#039855]">
              <option value="auto">Auto</option>
              <option value="en">English</option>
              <option value="zh">Chinese</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
            <p class="text-[11px] text-slate-500 mt-1">Auto means no language restriction.</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1.5">Safety</label>
            <select class="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white focus:outline-none focus:border-[#039855]">
              <option value="strict">Strict (recommended)</option>
              <option value="off">Off</option>
            </select>
            <p class="text-[11px] text-slate-500 mt-1">Strict filters unsafe content.</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1.5">Run limit <span class="text-slate-400 font-normal">(docs per run)</span></label>
            <input type="number" value="1000" min="1" max="5000" class="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-[#039855]"/>
            <p class="text-[11px] text-slate-500 mt-1">Maps to <code class="bg-slate-100 rounded px-1">run.limit</code>. Recommended 1–5000.</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1.5">Domains</label>
            <div class="flex gap-2">
              <select class="px-2 py-2 border border-slate-200 rounded-md text-sm bg-white focus:outline-none focus:border-[#039855]">
                <option>Include</option>
                <option>Exclude</option>
              </select>
              <input type="text" placeholder="sec.gov, example.com" class="flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-[#039855]"/>
            </div>
            <p class="text-[11px] text-slate-500 mt-1">Domain only (no path/regex). Include max 300, exclude max 150.</p>
          </div>
          <div class="col-span-2">
            <label class="block text-xs font-medium text-slate-700 mb-1.5">Refresh mode</label>
            <div class="flex items-center gap-4">
              <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="wf-refresh" value="one_time" checked onchange="wfSetRefresh('one_time')" style="accent-color:#039855"/>
                One-time
              </label>
              <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="wf-refresh" value="incremental" onchange="wfSetRefresh('incremental')" style="accent-color:#039855"/>
                Incremental
              </label>
              <span class="text-[11px] text-slate-500">Incremental returns only new/updated content since last delivery cursor.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 pt-3 border-t border-slate-200">
        <button onclick="wfRunPreview()" class="inline-flex items-center gap-2 px-4 py-2 text-white rounded-md text-xs font-medium hover:opacity-90" style="background:#039855">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          Preview sample
        </button>
        <button onclick="openModal('m-wf-settings')" class="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-md text-xs font-medium hover:bg-slate-50">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save
        </button>
      </div>
    </div>
  </div>

  <!-- Preview Result -->
  <div id="wf-preview" class="hidden">
    <div class="bg-white rounded-lg border border-slate-200 px-4 py-3 mb-4">
      <div class="flex items-center justify-between text-xs">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <span class="text-slate-500">Preview sample:</span>
            <span class="font-semibold text-slate-900">2 docs</span>
          </div>
          <div class="text-[11px] text-slate-400">ⓘ Preview returns snippet only. Run via API to deliver content & cursor.</div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg border border-slate-200 p-5 space-y-3">
      <div class="border-b border-slate-100 pb-3">
        <a href="#" class="text-sm font-medium text-slate-900 hover:underline">Breakthrough in Neural Network Architecture Announced</a>
        <div class="text-xs text-slate-500 mt-1">example.com · Jan 6, 2026 · article</div>
        <p class="text-xs text-slate-600 mt-1.5">Researchers announced a new neural architecture surpassing previous benchmarks…</p>
      </div>
      <div>
        <a href="#" class="text-sm font-medium text-slate-900 hover:underline">Stock Markets Rally on Positive Economic Data</a>
        <div class="text-xs text-slate-500 mt-1">finance.example.com · Jan 6, 2026 · news</div>
        <p class="text-xs text-slate-600 mt-1.5">Markets gained after encouraging economic indicators…</p>
      </div>
    </div>
  </div>

</div>

<!-- Web Flow Settings dialog -->
<div id="m-wf-settings" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-2xl p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-slate-900 text-base font-semibold">Flow Settings</h2>
      <button onclick="closeModal('m-wf-settings')" class="p-1 rounded hover:bg-slate-100"><svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
    </div>
    <p class="text-xs text-slate-500 mb-5">Saving updates the Flow definition. Future runs will follow the latest saved configuration.</p>

    <div class="space-y-5">
      <div>
        <label class="block text-xs font-medium text-slate-700 mb-1.5">Name</label>
        <input id="wf-settings-name" type="text" value="Tech News Monitor" class="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-[#039855]"/>
      </div>

      <div>
        <label class="block text-xs font-medium text-slate-700 mb-2">Refresh Mode</label>
        <div class="space-y-2">
          <label class="flex items-start gap-3 border border-slate-200 rounded-lg p-3 cursor-pointer hover:border-slate-300 has-[:checked]:border-[#039855] has-[:checked]:bg-[#0398550a]">
            <input type="radio" name="wf-settings-refresh" value="one_time" checked class="mt-0.5" style="accent-color:#039855"/>
            <div>
              <div class="text-sm font-medium text-slate-900">One-time</div>
              <div class="text-xs text-slate-500 mt-0.5">Each run delivers a full batch based on current filters (no cursor state).</div>
            </div>
          </label>
          <label class="flex items-start gap-3 border border-slate-200 rounded-lg p-3 cursor-pointer hover:border-slate-300 has-[:checked]:border-[#039855] has-[:checked]:bg-[#0398550a]">
            <input type="radio" name="wf-settings-refresh" value="incremental" class="mt-0.5" style="accent-color:#039855"/>
            <div>
              <div class="text-sm font-medium text-slate-900">Incremental</div>
              <div class="text-xs text-slate-500 mt-0.5">Returns only newly crawled or updated documents since last delivery cursor. Requires a non-empty crawled time window.</div>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label class="block text-xs font-medium text-slate-700 mb-1.5">Change Summary</label>
        <div class="bg-slate-50 border border-slate-200 rounded-md p-3 text-xs text-slate-700">
          <ul class="space-y-1">
            <li>• Query changed</li>
            <li>• Crawled time range changed</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3 mt-6 pt-5 border-t border-slate-200">
      <button onclick="closeModal('m-wf-settings')" class="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-50">Cancel</button>
      <button onclick="wfSaveFlow()" class="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90" style="background:#039855">Save Flow</button>
    </div>
  </div>
</div>

<!-- ──────────────────────────────────────────────────────────
     WEB CHAT PAGE (existing, no changes)
────────────────────────────────────────────────────────────── -->
<div id="page-web-chat" class="page max-w-7xl mx-auto p-4">
  <div class="mb-6">
    <div class="flex items-center gap-3 mb-2">
      <svg class="w-8 h-8" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
      <h1 class="text-slate-900 text-2xl font-semibold">Web Chat</h1>
    </div>
    <p class="text-slate-600">Interactive chat interface powered by AI search technology.</p>
  </div>
  <!-- Payment notice -->
  <div id="web-chat-pay-notice" class="mb-4 p-4 rounded-xl flex items-start gap-3 border border-orange-200 bg-orange-50">
    <svg class="w-5 h-5 text-orange-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
    <div class="flex-1 min-w-0">
      <p class="text-sm text-slate-900 font-medium mb-1">Payment method required</p>
      <p class="text-sm text-slate-600">Add a payment method in <a href="#" onclick="go('billing');return false" class="underline" style="color:#039855">Billing</a> to use the Web Chat feature.</p>
    </div>
  </div>

  <div class="bg-white rounded-xl border border-slate-200 flex flex-col" style="height:calc(100vh - 20rem)">
    <div class="flex-1 flex items-center justify-center">
      <div class="text-center text-slate-400">
        <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        <p>Start a conversation to see AI-powered search in action</p>
      </div>
    </div>
    <div class="border-t border-slate-200 p-4">
      <div class="flex gap-3">
        <input type="text" placeholder="Ask anything..." class="flex-1 px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#039855]"/>
        <button class="px-4 py-3 rounded-lg text-white text-sm font-medium" style="background:#039855">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- ──────────────────────────────────────────────────────────
     BROAD SEARCH PAGE (existing, no changes)
────────────────────────────────────────────────────────────── -->
<!-- Broad Search — full port of BroadSearchPage.tsx (hero → results, shared SPD drawer) -->
<div id="page-broad-search" class="page" style="padding:0">
  <div id="bs-root" style="margin:-24px;height:100vh;display:flex;flex-direction:column;background:#fbfcfb"></div>
</div>

<!-- ──────────────────────────────────────────────────────────
     API KEYS PAGE
     变更：增加"归属"列；增加 Service Keys tab（Owner 可见）；
           Create 弹窗增加归属人字段；角色控制 actions 和可见性。
────────────────────────────────────────────────────────────── -->
<div id="page-api-keys" class="page max-w-7xl mx-auto p-4">
  <div class="mb-6">
    <h1 class="text-slate-900 text-2xl font-semibold mb-2">API keys</h1>
    <p class="text-slate-600">Create and manage API keys. Keep keys private and rotate them regularly.</p>
  </div>

  <!-- Payment method notice (matches original design) -->
  <div id="ak-nopayment-notice" class="mb-6 px-5 py-4 rounded-xl flex items-center gap-3 border border-slate-200 bg-slate-50">
    <svg class="w-4 h-4 shrink-0 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
    <p class="text-sm text-slate-700 flex-1">Add a payment method to activate your API keys. Free credits included.</p>
    <a href="#" onclick="go('billing');return false" class="shrink-0 text-sm font-medium hover:underline" style="color:#039855">Add payment method →</a>
  </div>


  <!-- Tabs + Create button on same row -->
  <div class="border-b border-slate-200/60 mb-6 flex items-end">
    <button class="tab-btn active" onclick="switchAkTab('api',this)">API Keys</button>
    <button id="ak-svc-tab" class="tab-btn" onclick="switchAkTab('svc',this)">Service Keys</button>
    <div class="flex-1"></div>
    <button id="btn-create-key" onclick="openModal('m-create-key')" class="mb-2 px-4 py-2 text-white rounded-lg text-sm transition-colors inline-flex items-center gap-2 hover:opacity-90 shrink-0" style="background:#039855">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
      <span id="btn-create-key-label">Create API key</span>
    </button>
  </div>

  <!-- API Keys tab -->
  <div id="ak-pane-api">
    <div class="bg-white rounded-lg border border-slate-200 p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-slate-900 text-base font-medium">API keys</h2>
        <div class="text-xs text-slate-500" id="ak-count">Keys: — / 100</div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-4 text-slate-700">Name</th>
              <th class="text-left py-3 px-4 text-slate-700">Key</th>
              <!-- [ORG NEW] 归属列 -->
              <th class="text-left py-3 px-4 text-slate-700" id="ak-th-owner">Owner</th>
              <th class="text-left py-3 px-4 text-slate-700">Created</th>
              <th class="text-left py-3 px-4 text-slate-700">QPS limit</th>
              <th class="text-right py-3 px-4 text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody id="ak-tbody"></tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Service Keys tab -->
  <div id="ak-pane-svc" class="hidden">
    <div class="bg-white rounded-lg border border-slate-200 p-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h2 class="text-slate-900 text-base font-medium mb-1">Service Keys</h2>
          <p class="text-slate-600 text-sm">Used for Organization management API, such as provisioning members and managing keys programmatically. <a href="https://docs.octen.ai/api-reference/service-keys" target="_blank" rel="noreferrer" class="font-medium hover:underline" style="color:#039855">View docs →</a></p>
        </div>
        <div class="text-xs text-slate-500 shrink-0" id="svc-count">Keys: 1 / 10</div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-4 text-slate-700">Name</th>
              <th class="text-left py-3 px-4 text-slate-700">Key</th>
              <th class="text-left py-3 px-4 text-slate-700">Created</th>
              <th class="text-right py-3 px-4 text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody id="svc-tbody">
            <!-- rendered by JS -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- ──────────────────────────────────────────────────────────
     USAGE PAGE
     两个 Tab：Usage（日维度）+ Costs（月维度）
     Org 新增：Member 筛选、Usage by Member 表格
────────────────────────────────────────────────────────────── -->
<div id="page-usage" class="page max-w-7xl mx-auto p-4">
  <div class="mb-6">
    <h1 class="text-slate-900 text-2xl font-semibold mb-1">Usage</h1>
    <p class="text-slate-600 text-sm">Updated daily at 00:00 UTC.</p>
  </div>

  <!-- Usage / Costs tabs + filters -->
  <div class="border-b border-slate-200/60 mb-6 flex items-end justify-between gap-4 flex-wrap">
    <nav class="-mb-px flex">
      <button onclick="switchUsageTab('usage',this)" class="tab-btn usage-tab-btn border-b-2" style="border-color:#039855;color:#039855">Usage</button>
      <button onclick="switchUsageTab('costs',this)" class="tab-btn usage-tab-btn">Costs</button>
    </nav>
    <div class="flex flex-wrap gap-2 items-center pb-2">
      <select class="border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-700 bg-white focus:outline-none focus:border-[#039855]">
        <option>All API keys</option><option>Search-Prod-Key · Jane Niu</option><option>Search-Dev-Key · Alex Johnson</option>
      </select>
      <select id="usage-time-range" class="border border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-700 bg-white focus:outline-none focus:border-[#039855]">
        <option>This month</option><option>Last month</option><option>Last 3 months</option><option>Last 6 months</option><option>This year</option>
      </select>
    </div>
  </div>

  <!-- ═══════ USAGE TAB ═══════ -->
  <div id="usage-tab-usage">

    <!-- ═══ API ═══ -->
    <div class="mb-6">
      <div class="flex items-baseline justify-between mb-1">
        <div>
          <h2 class="text-slate-900 text-base font-medium">API</h2>
        </div>
        <div class="text-right">
          <p class="text-sm text-slate-900 font-semibold tabular-nums">\$104.27</p>
        </div>
      </div>
      <p class="text-xs text-slate-500 mb-3">Direct API calls only.</p>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <!-- Broad Search -->
        <div class="bg-white rounded-lg border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-slate-500 text-xs font-medium">Broad Search</h3>
            <svg class="w-4 h-4" style="color:#a855f7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path stroke-linecap="round" stroke-linejoin="round" d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8"/></svg>
          </div>
          <p class="text-slate-900 text-xl font-semibold">3,000</p>
          <p class="text-xs text-slate-400 mt-0.5">sub-queries · 1.5M full content tokens</p>
        </div>
        <!-- Search -->
        <div class="bg-white rounded-lg border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-slate-500 text-xs font-medium">Web Search</h3>
            <svg class="w-4 h-4" style="color:#039855" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
          </div>
          <p class="text-slate-900 text-xl font-semibold">4,500 calls</p>
          <p class="text-xs text-slate-400 mt-0.5">300k full content tokens</p>
        </div>
        <!-- Image Search -->
        <div class="bg-white rounded-lg border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-slate-500 text-xs font-medium">Image Search</h3>
            <svg class="w-4 h-4" style="color:#d946ef" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
          <p class="text-slate-900 text-xl font-semibold">960 calls</p>
          <p class="text-xs text-slate-400 mt-0.5">5.8k images returned</p>
        </div>
        <!-- Video Search -->
        <div class="bg-white rounded-lg border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-slate-500 text-xs font-medium">Video Search</h3>
            <svg class="w-4 h-4" style="color:#eab308" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
          </div>
          <p class="text-slate-900 text-xl font-semibold">328 calls</p>
          <p class="text-xs text-slate-400 mt-0.5">1.3k videos returned</p>
        </div>
        <!-- Extract -->
        <div class="bg-white rounded-lg border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-slate-500 text-xs font-medium">Extract</h3>
            <svg class="w-4 h-4" style="color:#3b82f6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path stroke-linecap="round" stroke-linejoin="round" d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
          </div>
          <p class="text-slate-900 text-xl font-semibold">4,500</p>
          <p class="text-xs text-slate-400 mt-0.5">URLs extracted</p>
        </div>
        <!-- Model -->
        <div class="bg-white rounded-lg border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-slate-500 text-xs font-medium">Model</h3>
            <svg class="w-4 h-4" style="color:#f43f5e" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/></svg>
          </div>
          <p class="text-slate-900 text-xl font-semibold">1.1M</p>
          <p class="text-xs text-slate-400 mt-0.5">700k in · 400k out · 200k cache read · 60k cache write</p>
        </div>
        <!-- Embedding -->
        <div class="bg-white rounded-lg border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-slate-500 text-xs font-medium">Embedding</h3>
            <svg class="w-4 h-4" style="color:#f59e0b" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
          </div>
          <p class="text-slate-900 text-xl font-semibold">46M</p>
          <p class="text-xs text-slate-400 mt-0.5">tokens</p>
        </div>
        <!-- VL Embedding -->
        <div class="bg-white rounded-lg border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-slate-500 text-xs font-medium">VL Embedding</h3>
            <svg class="w-4 h-4" style="color:#06b6d4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
          <p class="text-slate-900 text-xl font-semibold">2M</p>
          <p class="text-xs text-slate-400 mt-0.5">image · video tokens</p>
        </div>
        <!-- Collect — gated by backend whitelist. Add \`hidden\` class to revert to default unauthorized state. -->
        <div class="bg-white rounded-lg border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-1.5">
              <h3 class="text-slate-500 text-xs font-medium">Collect</h3>
              <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium" style="background:#6366f11a;color:#6366f1">Async</span>
            </div>
            <svg class="w-4 h-4" style="color:#6366f1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-7l-2-2H6a2 2 0 00-2 2z"/></svg>
          </div>
          <p class="text-slate-900 text-xl font-semibold">29k</p>
          <p class="text-xs text-slate-400 mt-0.5">matches · text 19k · image 7k · video 3k</p>
        </div>
      </div>
    </div>

    <!-- Daily usage chart (static placeholder) -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 mb-6">
      <div class="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h2 class="text-slate-900 text-base font-medium">Daily usage</h2>
        <div class="flex items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 flex-wrap">
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded" style="background:#a855f7"></span>Broad Search sub-queries</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded" style="background:#14b8a6"></span>Web Search calls</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded" style="background:#3b82f6"></span>Extract URLs</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full" style="background:#f43f5e"></span>Model tokens (k)</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full" style="background:#f59e0b"></span>Embedding tokens (k)</span>
        </div>
      </div>
      <!-- Interactive SVG chart with hover tooltip -->
      <div class="w-full relative" style="height:280px" id="daily-chart-wrap">
        <svg viewBox="0 0 800 280" class="w-full h-full" preserveAspectRatio="none">
          <!-- Grid lines -->
          <line x1="60" y1="20" x2="60" y2="240" stroke="#e2e8f0" stroke-dasharray="3,3"/>
          <line x1="60" y1="240" x2="780" y2="240" stroke="#e2e8f0"/>
          <line x1="60" y1="180" x2="780" y2="180" stroke="#e2e8f0" stroke-dasharray="3,3"/>
          <line x1="60" y1="120" x2="780" y2="120" stroke="#e2e8f0" stroke-dasharray="3,3"/>
          <line x1="60" y1="60" x2="780" y2="60" stroke="#e2e8f0" stroke-dasharray="3,3"/>
          <!-- Y axis labels -->
          <text x="50" y="244" text-anchor="end" fill="#64748b" font-size="11">0</text>
          <text x="50" y="184" text-anchor="end" fill="#64748b" font-size="11">500</text>
          <text x="50" y="124" text-anchor="end" fill="#64748b" font-size="11">1000</text>
          <text x="50" y="64" text-anchor="end" fill="#64748b" font-size="11">1500</text>
          <text x="50" y="24" text-anchor="end" fill="#64748b" font-size="11">2000</text>
          <!-- Bars (Broad Search sub-queries, purple) -->
          <rect x="78"  y="125" width="14" height="115" rx="2" fill="#a855f7" opacity="0.85"/>
          <rect x="168" y="100" width="14" height="140" rx="2" fill="#a855f7" opacity="0.85"/>
          <rect x="258" y="145" width="14" height="95"  rx="2" fill="#a855f7" opacity="0.85"/>
          <rect x="348" y="80"  width="14" height="160" rx="2" fill="#a855f7" opacity="0.85"/>
          <rect x="438" y="65"  width="14" height="175" rx="2" fill="#a855f7" opacity="0.85"/>
          <rect x="528" y="50"  width="14" height="190" rx="2" fill="#a855f7" opacity="0.85"/>
          <rect x="618" y="60"  width="14" height="180" rx="2" fill="#a855f7" opacity="0.85"/>
          <rect x="708" y="45"  width="14" height="195" rx="2" fill="#a855f7" opacity="0.85"/>
          <!-- Bars (Web Search calls, teal) -->
          <rect x="94"  y="100" width="14" height="140" rx="2" fill="#14b8a6" opacity="0.85"/>
          <rect x="184" y="75"  width="14" height="165" rx="2" fill="#14b8a6" opacity="0.85"/>
          <rect x="274" y="120" width="14" height="120" rx="2" fill="#14b8a6" opacity="0.85"/>
          <rect x="364" y="55"  width="14" height="185" rx="2" fill="#14b8a6" opacity="0.85"/>
          <rect x="454" y="40"  width="14" height="200" rx="2" fill="#14b8a6" opacity="0.85"/>
          <rect x="544" y="25"  width="14" height="215" rx="2" fill="#14b8a6" opacity="0.85"/>
          <rect x="634" y="35"  width="14" height="205" rx="2" fill="#14b8a6" opacity="0.85"/>
          <rect x="724" y="20"  width="14" height="220" rx="2" fill="#14b8a6" opacity="0.85"/>
          <!-- Bars (Extract URLs, blue) -->
          <rect x="110" y="148" width="14" height="92"  rx="2" fill="#3b82f6" opacity="0.75"/>
          <rect x="200" y="130" width="14" height="110" rx="2" fill="#3b82f6" opacity="0.75"/>
          <rect x="290" y="158" width="14" height="82"  rx="2" fill="#3b82f6" opacity="0.75"/>
          <rect x="380" y="115" width="14" height="125" rx="2" fill="#3b82f6" opacity="0.75"/>
          <rect x="470" y="100" width="14" height="140" rx="2" fill="#3b82f6" opacity="0.75"/>
          <rect x="560" y="82"  width="14" height="158" rx="2" fill="#3b82f6" opacity="0.75"/>
          <rect x="650" y="90"  width="14" height="150" rx="2" fill="#3b82f6" opacity="0.75"/>
          <rect x="740" y="68"  width="14" height="172" rx="2" fill="#3b82f6" opacity="0.75"/>
          <!-- Model tokens line (rose) -->
          <polyline points="110,210 200,195 290,205 380,170 470,150 560,130 650,135 740,115" fill="none" stroke="#f43f5e" stroke-width="2.5"/>
          <circle cx="110" cy="210" r="3.5" fill="#f43f5e"/><circle cx="200" cy="195" r="3.5" fill="#f43f5e"/>
          <circle cx="290" cy="205" r="3.5" fill="#f43f5e"/><circle cx="380" cy="170" r="3.5" fill="#f43f5e"/>
          <circle cx="470" cy="150" r="3.5" fill="#f43f5e"/><circle cx="560" cy="130" r="3.5" fill="#f43f5e"/>
          <circle cx="650" cy="135" r="3.5" fill="#f43f5e"/><circle cx="740" cy="115" r="3.5" fill="#f43f5e"/>
          <!-- Embedding tokens line (orange) -->
          <polyline points="110,225 200,215 290,228 380,210 470,200 560,195 650,200 740,188" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
          <circle cx="110" cy="225" r="3" fill="#f59e0b"/><circle cx="200" cy="215" r="3" fill="#f59e0b"/>
          <circle cx="290" cy="228" r="3" fill="#f59e0b"/><circle cx="380" cy="210" r="3" fill="#f59e0b"/>
          <circle cx="470" cy="200" r="3" fill="#f59e0b"/><circle cx="560" cy="195" r="3" fill="#f59e0b"/>
          <circle cx="650" cy="200" r="3" fill="#f59e0b"/><circle cx="740" cy="188" r="3" fill="#f59e0b"/>
          <!-- Hover guideline -->
          <line id="chart-guide" x1="0" y1="20" x2="0" y2="240" stroke="#94a3b8" stroke-dasharray="3,3" stroke-width="1" opacity="0"/>
          <!-- X axis labels -->
          <text x="110" y="260" text-anchor="middle" fill="#64748b" font-size="11">Apr 1</text>
          <text x="200" y="260" text-anchor="middle" fill="#64748b" font-size="11">Apr 2</text>
          <text x="290" y="260" text-anchor="middle" fill="#64748b" font-size="11">Apr 3</text>
          <text x="380" y="260" text-anchor="middle" fill="#64748b" font-size="11">Apr 4</text>
          <text x="470" y="260" text-anchor="middle" fill="#64748b" font-size="11">Apr 5</text>
          <text x="560" y="260" text-anchor="middle" fill="#64748b" font-size="11">Apr 6</text>
          <text x="650" y="260" text-anchor="middle" fill="#64748b" font-size="11">Apr 7</text>
          <text x="740" y="260" text-anchor="middle" fill="#64748b" font-size="11">Apr 8</text>
          <!-- Transparent hover zones (one per day) -->
          <g id="chart-hover-zones">
            <rect x="60"  y="20" width="90" height="220" fill="transparent" data-day="0"/>
            <rect x="150" y="20" width="90" height="220" fill="transparent" data-day="1"/>
            <rect x="240" y="20" width="90" height="220" fill="transparent" data-day="2"/>
            <rect x="330" y="20" width="90" height="220" fill="transparent" data-day="3"/>
            <rect x="420" y="20" width="90" height="220" fill="transparent" data-day="4"/>
            <rect x="510" y="20" width="90" height="220" fill="transparent" data-day="5"/>
            <rect x="600" y="20" width="90" height="220" fill="transparent" data-day="6"/>
            <rect x="690" y="20" width="90" height="220" fill="transparent" data-day="7"/>
          </g>
        </svg>
        <!-- Tooltip -->
        <div id="chart-tooltip" class="absolute pointer-events-none bg-white border border-slate-200 rounded-md shadow-lg px-3 py-2 text-xs opacity-0 transition-opacity" style="z-index:10;min-width:200px">
          <div class="font-medium text-slate-900 mb-1.5" id="tt-date">—</div>
          <div class="space-y-1">
            <div class="flex items-center justify-between gap-3"><span class="flex items-center gap-1.5 text-slate-500"><span class="inline-block w-2 h-2 rounded" style="background:#a855f7"></span>Broad Search</span><span class="font-medium text-slate-900 tabular-nums" id="tt-broad">—</span></div>
            <div class="flex items-center justify-between gap-3"><span class="flex items-center gap-1.5 text-slate-500"><span class="inline-block w-2 h-2 rounded" style="background:#14b8a6"></span>Web Search</span><span class="font-medium text-slate-900 tabular-nums" id="tt-search">—</span></div>
            <div class="flex items-center justify-between gap-3"><span class="flex items-center gap-1.5 text-slate-500"><span class="inline-block w-2 h-2 rounded" style="background:#3b82f6"></span>Extract</span><span class="font-medium text-slate-900 tabular-nums" id="tt-extract">—</span></div>
            <div class="flex items-center justify-between gap-3"><span class="flex items-center gap-1.5 text-slate-500"><span class="inline-block w-2 h-2 rounded-full" style="background:#f43f5e"></span>Model tokens</span><span class="font-medium text-slate-900 tabular-nums" id="tt-model">—</span></div>
            <div class="flex items-center justify-between gap-3"><span class="flex items-center gap-1.5 text-slate-500"><span class="inline-block w-2 h-2 rounded-full" style="background:#f59e0b"></span>Embedding tokens</span><span class="font-medium text-slate-900 tabular-nums" id="tt-embed">—</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Model usage (direct Model API only) -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 mb-6">
      <h2 class="text-slate-900 text-base font-medium mb-4">Model usage</h2>
      <!-- Text Models -->
      <div class="mb-5">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-slate-700 uppercase tracking-wide">Text Models</span>
          <span class="text-xs text-slate-500">1.1M tokens</span>
        </div>
        <div class="space-y-3">
          <div class="space-y-1">
            <div class="flex items-center justify-between text-sm"><span class="text-slate-700 font-mono text-xs">claude-sonnet-4.6</span><span class="text-slate-900 font-medium text-xs">58% · 638k tokens <span class="text-slate-400 font-normal ml-1">410k in · 228k out · 120k cache read · 48k cache write</span></span></div>
            <div class="w-full bg-slate-100 rounded-full h-2"><div class="h-2 rounded-full" style="width:58%;background:#f43f5e"></div></div>
          </div>
          <div class="space-y-1">
            <div class="flex items-center justify-between text-sm"><span class="text-slate-700 font-mono text-xs">gemini-3-flash-preview</span><span class="text-slate-900 font-medium text-xs">27% · 297k tokens <span class="text-slate-400 font-normal ml-1">190k in · 107k out · 55k cache read</span></span></div>
            <div class="w-full bg-slate-100 rounded-full h-2"><div class="h-2 rounded-full" style="width:27%;background:#f43f5e"></div></div>
          </div>
          <div class="space-y-1">
            <div class="flex items-center justify-between text-sm"><span class="text-slate-700 font-mono text-xs">gpt-5.4</span><span class="text-slate-900 font-medium text-xs">15% · 165k tokens <span class="text-slate-400 font-normal ml-1">100k in · 65k out · 30k cache read</span></span></div>
            <div class="w-full bg-slate-100 rounded-full h-2"><div class="h-2 rounded-full" style="width:15%;background:#f43f5e"></div></div>
          </div>
        </div>
      </div>
      <!-- Image Generation Models -->
      <div class="pt-4 border-t border-slate-100">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-slate-700 uppercase tracking-wide">Image Generation Models</span>
          <span class="text-xs text-slate-500">340k tokens</span>
        </div>
        <div class="space-y-3">
          <div class="space-y-1">
            <div class="flex items-center justify-between text-sm"><span class="text-slate-700 font-mono text-xs">openai/gpt-image-1.5</span><span class="text-slate-900 font-medium text-xs">62% · 211k tokens <span class="text-slate-400 font-normal ml-1">28k text · 183k image</span></span></div>
            <div class="w-full bg-slate-100 rounded-full h-2"><div class="h-2 rounded-full" style="width:62%;background:#8b5cf6"></div></div>
          </div>
          <div class="space-y-1">
            <div class="flex items-center justify-between text-sm"><span class="text-slate-700 font-mono text-xs">google/gemini-3-pro-image</span><span class="text-slate-900 font-medium text-xs">38% · 129k tokens <span class="text-slate-400 font-normal ml-1">14k text · 115k image</span></span></div>
            <div class="w-full bg-slate-100 rounded-full h-2"><div class="h-2 rounded-full" style="width:38%;background:#8b5cf6"></div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Embedding usage -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 mb-6">
      <h2 class="text-slate-900 text-base font-medium mb-4">Embedding usage</h2>
      <!-- Text Embeddings -->
      <div class="mb-5">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-slate-700 uppercase tracking-wide">Text Embeddings</span>
          <span class="text-xs text-slate-500">46M tokens</span>
        </div>
        <div class="space-y-3">
          <div class="space-y-1">
            <div class="flex items-center justify-between text-sm"><span class="text-slate-700 font-mono text-xs">embed-v3</span><span class="text-slate-900 font-medium text-xs">74% · 34M tokens</span></div>
            <div class="w-full bg-slate-100 rounded-full h-2"><div class="h-2 rounded-full" style="width:74%;background:#f59e0b"></div></div>
          </div>
          <div class="space-y-1">
            <div class="flex items-center justify-between text-sm"><span class="text-slate-700 font-mono text-xs">embed-v2</span><span class="text-slate-900 font-medium text-xs">26% · 12M tokens</span></div>
            <div class="w-full bg-slate-100 rounded-full h-2"><div class="h-2 rounded-full" style="width:26%;background:#f59e0b"></div></div>
          </div>
        </div>
      </div>
      <!-- Vision-Language Embeddings -->
      <div class="pt-4 border-t border-slate-100">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-slate-700 uppercase tracking-wide">Vision-Language Embeddings</span>
          <span class="text-xs text-slate-500">2M image · video tokens</span>
        </div>
        <div class="space-y-3">
          <div class="space-y-1">
            <div class="flex items-center justify-between text-sm"><span class="text-slate-700 font-mono text-xs">vl-embed-v2</span><span class="text-slate-900 font-medium text-xs">68% · 1.36M tokens</span></div>
            <div class="w-full bg-slate-100 rounded-full h-2"><div class="h-2 rounded-full" style="width:68%;background:#06b6d4"></div></div>
          </div>
          <div class="space-y-1">
            <div class="flex items-center justify-between text-sm"><span class="text-slate-700 font-mono text-xs">vl-embed-v1</span><span class="text-slate-900 font-medium text-xs">32% · 0.64M tokens</span></div>
            <div class="w-full bg-slate-100 rounded-full h-2"><div class="h-2 rounded-full" style="width:32%;background:#06b6d4"></div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ Application ═══ -->
    <div class="mb-8">
      <div class="flex items-baseline justify-between mb-3">
        <div>
          <h2 class="text-slate-900 text-base font-medium">Application</h2>
        </div>
        <div class="text-right">
          <p class="text-sm text-slate-900 font-semibold tabular-nums">483 requests · \$85.20</p>
          <p class="text-xs text-slate-400 mt-0.5">Answer · Deep Research · Multimodal Chat · Grounded Generation</p>
        </div>
      </div>

      <!-- Per-app cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Answer -->
        <div class="bg-white rounded-lg border border-slate-200 p-5 flex flex-col">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style="background:#0398551a">
              <svg class="w-4 h-4" style="color:#039855" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg>
            </div>
            <h3 class="text-slate-900 text-sm font-semibold">Answer</h3>
          </div>
          <div class="flex items-baseline gap-1.5 mb-3">
            <span class="text-slate-900 text-xl font-semibold tabular-nums">180</span>
            <span class="text-xs text-slate-500">requests</span>
          </div>
          <div class="text-xs text-slate-400 mb-2 uppercase tracking-wide">Resources consumed</div>
          <div class="space-y-1.5 text-xs mb-3 flex-1">
            <div class="flex items-center justify-between"><span class="text-slate-600">Web Search calls</span><span class="text-slate-700 tabular-nums">1,800</span></div>
            <div class="flex items-start justify-between"><span class="text-slate-600">Model</span><span class="text-right text-slate-700 tabular-nums">250k tokens<br><span class="text-slate-400 text-[11px]">160k in · 90k out</span></span></div>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-500">Cost</span>
            <span class="text-slate-900 font-semibold tabular-nums">\$7.20</span>
          </div>
        </div>

        <!-- Deep Research — tier-based pricing -->
        <div class="bg-white rounded-lg border border-slate-200 p-5 flex flex-col">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style="background:#8b5cf61a">
              <svg class="w-4 h-4" style="color:#8b5cf6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18h8M3 22h18M14 22a7 7 0 100-14h-1M9 14h2M9 12a2 2 0 01-2-2V6h6v4a2 2 0 01-2 2zM12 6V3a1 1 0 00-1-1H9a1 1 0 00-1 1v3"/></svg>
            </div>
            <h3 class="text-slate-900 text-sm font-semibold">Deep Research</h3>
          </div>
          <div class="flex items-baseline gap-1.5 mb-3">
            <span class="text-slate-900 text-xl font-semibold tabular-nums">11</span>
            <span class="text-xs text-slate-500">runs</span>
          </div>
          <div class="text-xs text-slate-400 mb-2 uppercase tracking-wide">By tier</div>
          <div class="space-y-1.5 text-xs mb-3 flex-1">
            <div class="flex items-center justify-between"><span class="text-slate-600">Lite</span><span class="text-slate-700 tabular-nums">5 runs</span></div>
            <div class="flex items-center justify-between"><span class="text-slate-600">Standard</span><span class="text-slate-700 tabular-nums">4 runs</span></div>
            <div class="flex items-center justify-between"><span class="text-slate-600">Pro</span><span class="text-slate-700 tabular-nums">2 runs</span></div>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-500">Cost</span>
            <span class="text-slate-900 font-semibold tabular-nums">\$10.00</span>
          </div>
        </div>

        <!-- Multimodal Chat -->
        <div class="bg-white rounded-lg border border-slate-200 p-5 flex flex-col">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style="background:#ec48991a">
              <svg class="w-4 h-4" style="color:#ec4899" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            </div>
            <h3 class="text-slate-900 text-sm font-semibold">Multimodal Chat</h3>
          </div>
          <div class="flex items-baseline gap-1.5 mb-3">
            <span class="text-slate-900 text-xl font-semibold tabular-nums">200</span>
            <span class="text-xs text-slate-500">requests</span>
          </div>
          <div class="text-xs text-slate-400 mb-2 uppercase tracking-wide">Resources consumed</div>
          <div class="space-y-1.5 text-xs mb-3 flex-1">
            <div class="flex items-center justify-between"><span class="text-slate-600">Search queries</span><span class="text-slate-700 tabular-nums">4,000</span></div>
            <div class="flex items-start justify-between"><span class="text-slate-600">Model</span><span class="text-right text-slate-700 tabular-nums">3M tokens<br><span class="text-slate-400 text-[11px]">2M prompt · 1M completion</span></span></div>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-500">Cost</span>
            <span class="text-slate-900 font-semibold tabular-nums">\$36.00</span>
          </div>
        </div>

        <!-- Grounded Generation -->
        <div class="bg-white rounded-lg border border-slate-200 p-5 flex flex-col">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style="background:#0398551a">
              <svg class="w-4 h-4" style="color:#039855" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 15l-5-5L5 21"/></svg>
            </div>
            <h3 class="text-slate-900 text-sm font-semibold">Grounded Generation</h3>
          </div>
          <div class="flex items-baseline gap-1.5 mb-3">
            <span class="text-slate-900 text-xl font-semibold tabular-nums">92</span>
            <span class="text-xs text-slate-500">generations</span>
          </div>
          <div class="text-xs text-slate-400 mb-2 uppercase tracking-wide">By modality</div>
          <div class="space-y-1.5 text-xs mb-3 flex-1">
            <div class="flex items-center justify-between"><span class="text-slate-600">Image</span><span class="text-slate-700 tabular-nums">80</span></div>
            <div class="flex items-center justify-between"><span class="text-slate-600">Video</span><span class="text-slate-700 tabular-nums">12</span></div>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-500">Cost</span>
            <span class="text-slate-900 font-semibold tabular-nums">\$32.00</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage alerts -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 mb-12">
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            <h2 class="text-slate-900 text-sm font-medium">Usage alerts</h2>
          </div>
          <p class="text-slate-600 text-sm">Notify when daily requests exceed threshold.</p>
        </div>
        <div class="flex flex-col gap-3 w-full max-w-md">
          <div class="flex gap-3">
            <div class="flex-1">
              <label class="block text-xs text-slate-500 mb-1">Daily requests threshold</label>
              <input type="number" placeholder="e.g. 10,000" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#039855]"/>
            </div>
            <div class="flex-1">
              <label class="block text-xs text-slate-500 mb-1">Alert email</label>
              <input type="email" placeholder="alerts@yourdomain.com" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#039855]"/>
            </div>
          </div>
          <button class="self-end px-4 py-2 text-white rounded-lg text-sm hover:opacity-90" style="background:#039855">Save alert</button>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══════ COSTS TAB ═══════ -->
  <div id="usage-tab-costs" class="hidden">

    <!-- Monthly cost chart (static SVG) -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 mb-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-slate-900 text-base font-medium">Monthly cost trend</h2>
        <div class="flex items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 flex-wrap">
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded" style="background:#14b8a6"></span>Web Search</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded" style="background:#3b82f6"></span>Extract</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded" style="background:#f59e0b"></span>Embedding</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded" style="background:#ec4899"></span>Application</span>
        </div>
      </div>
      <div class="w-full relative" style="height:280px" id="monthly-chart-wrap">
        <svg viewBox="0 0 700 280" class="w-full h-full" preserveAspectRatio="none">
          <line x1="60" y1="240" x2="660" y2="240" stroke="#e2e8f0"/>
          <line x1="60" y1="180" x2="660" y2="180" stroke="#e2e8f0" stroke-dasharray="3,3"/>
          <line x1="60" y1="120" x2="660" y2="120" stroke="#e2e8f0" stroke-dasharray="3,3"/>
          <line x1="60" y1="60" x2="660" y2="60" stroke="#e2e8f0" stroke-dasharray="3,3"/>
          <text x="50" y="244" text-anchor="end" fill="#64748b" font-size="11">\$0</text>
          <text x="50" y="184" text-anchor="end" fill="#64748b" font-size="11">\$500</text>
          <text x="50" y="124" text-anchor="end" fill="#64748b" font-size="11">\$1000</text>
          <text x="50" y="64" text-anchor="end" fill="#64748b" font-size="11">\$1500</text>
          <!-- Aug stacked -->
          <rect x="80" y="132" width="50" height="108" fill="#14b8a6"/>
          <rect x="80" y="123" width="50" height="9" fill="#3b82f6"/>
          <rect x="80" y="101" width="50" height="22" fill="#ec4899"/>
          <rect x="80" y="99" width="50" height="2" rx="2" fill="#f59e0b"/>
          <!-- Sep -->
          <rect x="200" y="114" width="50" height="126" fill="#14b8a6"/>
          <rect x="200" y="103" width="50" height="11" fill="#3b82f6"/>
          <rect x="200" y="77" width="50" height="26" fill="#ec4899"/>
          <rect x="200" y="75" width="50" height="2" rx="2" fill="#f59e0b"/>
          <!-- Oct -->
          <rect x="320" y="96" width="50" height="144" fill="#14b8a6"/>
          <rect x="320" y="83" width="50" height="13" fill="#3b82f6"/>
          <rect x="320" y="49" width="50" height="34" fill="#ec4899"/>
          <rect x="320" y="47" width="50" height="2" rx="2" fill="#f59e0b"/>
          <!-- Nov -->
          <rect x="440" y="84" width="50" height="156" fill="#14b8a6"/>
          <rect x="440" y="70" width="50" height="14" fill="#3b82f6"/>
          <rect x="440" y="29" width="50" height="41" fill="#ec4899"/>
          <rect x="440" y="27" width="50" height="2" rx="2" fill="#f59e0b"/>
          <!-- Dec -->
          <rect x="560" y="72" width="50" height="168" fill="#14b8a6"/>
          <rect x="560" y="57" width="50" height="15" fill="#3b82f6"/>
          <rect x="560" y="8" width="50" height="49" fill="#ec4899"/>
          <rect x="560" y="6" width="50" height="2" rx="2" fill="#f59e0b"/>
          <!-- X labels -->
          <text x="105" y="260" text-anchor="middle" fill="#64748b" font-size="11">Aug</text>
          <text x="225" y="260" text-anchor="middle" fill="#64748b" font-size="11">Sep</text>
          <text x="345" y="260" text-anchor="middle" fill="#64748b" font-size="11">Oct</text>
          <text x="465" y="260" text-anchor="middle" fill="#64748b" font-size="11">Nov</text>
          <text x="585" y="260" text-anchor="middle" fill="#64748b" font-size="11">Dec</text>
          <!-- Hover guide -->
          <line id="monthly-chart-guide" x1="0" y1="20" x2="0" y2="240" stroke="#94a3b8" stroke-dasharray="3,3" stroke-width="1" opacity="0"/>
          <!-- Hover zones -->
          <g id="monthly-chart-zones">
            <rect x="60"  y="20" width="120" height="220" fill="transparent" data-mon="0"/>
            <rect x="180" y="20" width="120" height="220" fill="transparent" data-mon="1"/>
            <rect x="300" y="20" width="120" height="220" fill="transparent" data-mon="2"/>
            <rect x="420" y="20" width="120" height="220" fill="transparent" data-mon="3"/>
            <rect x="540" y="20" width="120" height="220" fill="transparent" data-mon="4"/>
          </g>
        </svg>
        <div id="monthly-chart-tooltip" class="absolute pointer-events-none bg-white border border-slate-200 rounded-md shadow-lg px-3 py-2 text-xs opacity-0 transition-opacity" style="z-index:10;min-width:190px">
          <div class="flex items-center justify-between gap-3 mb-1.5 pb-1.5 border-b border-slate-100">
            <span class="font-medium text-slate-900" id="mo-tt-month">—</span>
            <span class="font-semibold text-slate-900 tabular-nums" id="mo-tt-total">—</span>
          </div>
          <div class="space-y-1">
            <div class="flex items-center justify-between gap-3"><span class="flex items-center gap-1.5 text-slate-500"><span class="inline-block w-2 h-2 rounded" style="background:#14b8a6"></span>Web Search</span><span class="text-slate-900 tabular-nums" id="mo-tt-search">\$0</span></div>
            <div class="flex items-center justify-between gap-3"><span class="flex items-center gap-1.5 text-slate-500"><span class="inline-block w-2 h-2 rounded" style="background:#3b82f6"></span>Extract</span><span class="text-slate-900 tabular-nums" id="mo-tt-extract">\$0</span></div>
            <div class="flex items-center justify-between gap-3"><span class="flex items-center gap-1.5 text-slate-500"><span class="inline-block w-2 h-2 rounded" style="background:#f59e0b"></span>Embedding</span><span class="text-slate-900 tabular-nums" id="mo-tt-embed">\$0</span></div>
            <div class="flex items-center justify-between gap-3"><span class="flex items-center gap-1.5 text-slate-500"><span class="inline-block w-2 h-2 rounded" style="background:#ec4899"></span>Application</span><span class="text-slate-900 tabular-nums" id="mo-tt-chat">\$0</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Monthly breakdown accordion -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 mb-12">
      <h2 class="text-slate-900 mb-4 text-base font-medium">Monthly usage &amp; cost breakdown</h2>
      <div id="costs-accordion">
        <!-- Dec (open by default) -->
        <div class="border-b border-slate-200">
          <button onclick="toggleCostMonth(this)" class="w-full px-4 py-3 bg-white hover:bg-slate-50 flex items-center justify-between">
            <div class="flex items-center gap-3"><span class="text-slate-900 font-medium">Dec</span><span class="text-xs text-slate-500">10 items</span><span class="bp-settle-label hidden inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200">Not invoiced</span></div>
            <div class="flex items-center gap-3"><span class="text-slate-900 font-semibold">\$1,845.00</span><span class="text-slate-400 cost-chevron">▴</span></div>
          </button>
          <div class="cost-detail border-t border-slate-100 bg-white">
            <div class="px-4 py-3">
              <div class="grid grid-cols-12 text-xs text-slate-500 px-2 pb-2 border-b border-slate-200"><div class="col-span-4">Service</div><div class="col-span-5">Usage</div><div class="col-span-3 text-right">Cost</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Broad Search</div><div class="col-span-5 text-slate-600">40k sub-queries · 20M full content tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$100.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Web Search</div><div class="col-span-5 text-slate-600">60k calls · 4M full content tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$124.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Image Search</div><div class="col-span-5 text-slate-600">12k calls · 70k images returned</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$60.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Video Search</div><div class="col-span-5 text-slate-600">4k calls · 15k videos returned</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$20.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Extract</div><div class="col-span-5 text-slate-600">60k URLs</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$60.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Model</div><div class="col-span-5 text-slate-600">15M tokens · 9M in · 6M out</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$210.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Embedding</div><div class="col-span-5 text-slate-600">600M tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$42.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">VL Embedding</div><div class="col-span-5 text-slate-600">26M image · video tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$6.50</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium flex items-center gap-1.5">Collect <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium" style="background:#6366f11a;color:#6366f1">Async</span></div><div class="col-span-5 text-slate-600">380k matches (text 240k · image 95k · video 45k)</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$760.00</div></div>
              <!-- Application row — expandable (last) -->
              <div>
                <button onclick="this.nextElementSibling.classList.toggle('hidden');this.querySelector('.app-chev').textContent=this.nextElementSibling.classList.contains('hidden')?'▾':'▴'" class="grid grid-cols-12 items-center w-full px-2 py-3 text-sm hover:bg-slate-50 text-left">
                  <div class="col-span-4 flex items-center gap-1.5 text-slate-900 font-medium">Application <span class="app-chev text-slate-400 text-xs">▴</span></div>
                  <div class="col-span-5 text-slate-600">4 apps</div>
                  <div class="col-span-3 text-right text-slate-900 font-semibold">\$462.50</div>
                </button>
                <div class="bg-slate-50 border-t border-slate-100">
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#039855"></span>Answer</div><div class="col-span-5 text-slate-500">25k calls · 3.5M tokens</div><div class="col-span-3 text-right text-slate-700 font-medium">\$102.50</div></div>
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#8b5cf6"></span>Deep Research</div><div class="col-span-5 text-slate-500">220 runs (Lite 80 · Standard 100 · Pro 40)</div><div class="col-span-3 text-right text-slate-700 font-medium">\$216.00</div></div>
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#ec4899"></span>Multimodal Chat</div><div class="col-span-5 text-slate-500">16k search queries · 8M prompt · 4M completion</div><div class="col-span-3 text-right text-slate-700 font-medium">\$144.00</div></div><div class="grid grid-cols-12 items-center px-4 py-2 text-xs"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#a16207"></span>Grounded Generation</div><div class="col-span-5 text-slate-500">92 generations (80 image · 12 video)</div><div class="col-span-3 text-right text-slate-700 font-medium">\$32.00</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Nov -->
        <div class="border-b border-slate-200">
          <button onclick="toggleCostMonth(this)" class="w-full px-4 py-3 bg-white hover:bg-slate-50 flex items-center justify-between">
            <div class="flex items-center gap-3"><span class="text-slate-900 font-medium">Nov</span><span class="text-xs text-slate-500">10 items</span><span role="button" tabindex="0" onclick="event.stopPropagation();go('billing')" class="bp-settle-label hidden inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 cursor-pointer">Invoiced · Unpaid →</span></div>
            <div class="flex items-center gap-3"><span class="text-slate-900 font-semibold">\$1,497.10</span><span class="text-slate-400 cost-chevron">▾</span></div>
          </button>
          <div class="cost-detail border-t border-slate-100 bg-white hidden">
            <div class="px-4 py-3">
              <div class="grid grid-cols-12 text-xs text-slate-500 px-2 pb-2 border-b border-slate-200"><div class="col-span-4">Service</div><div class="col-span-5">Usage</div><div class="col-span-3 text-right">Cost</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Broad Search</div><div class="col-span-5 text-slate-600">35k sub-queries · 17M full content tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$87.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Web Search</div><div class="col-span-5 text-slate-600">52k calls · 3.5M full content tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$107.50</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Image Search</div><div class="col-span-5 text-slate-600">10k calls · 58k images returned</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$50.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Video Search</div><div class="col-span-5 text-slate-600">3.2k calls · 12k videos returned</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$16.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Extract</div><div class="col-span-5 text-slate-600">55k URLs</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$55.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Model</div><div class="col-span-5 text-slate-600">13M tokens · 7.8M in · 5.2M out</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$182.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Embedding</div><div class="col-span-5 text-slate-600">530M tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$37.10</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">VL Embedding</div><div class="col-span-5 text-slate-600">22M image · video tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$5.50</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium flex items-center gap-1.5">Collect <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium" style="background:#6366f11a;color:#6366f1">Async</span></div><div class="col-span-5 text-slate-600">320k matches (text 200k · image 80k · video 40k)</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$640.00</div></div>
              <div class="bp-balance-offset hidden grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200 bg-green-50/40"><div class="col-span-4 text-green-700 font-medium">Balance applied at invoicing</div><div class="col-span-5 text-slate-500">Prepaid balance offset on this invoice</div><div class="col-span-3 text-right text-green-700 font-semibold">−\$125.50</div></div>
              <div>
                <button onclick="this.nextElementSibling.classList.toggle('hidden');this.querySelector('.app-chev').textContent=this.nextElementSibling.classList.contains('hidden')?'▾':'▴'" class="grid grid-cols-12 items-center w-full px-2 py-3 text-sm hover:bg-slate-50 text-left">
                  <div class="col-span-4 flex items-center gap-1.5 text-slate-900 font-medium">Application <span class="app-chev text-slate-400 text-xs">▾</span></div>
                  <div class="col-span-5 text-slate-600">4 apps</div>
                  <div class="col-span-3 text-right text-slate-900 font-semibold">\$317.00</div>
                </button>
                <div class="bg-slate-50 border-t border-slate-100 hidden">
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#039855"></span>Answer</div><div class="col-span-5 text-slate-500">22k calls · 3M tokens</div><div class="col-span-3 text-right text-slate-700 font-medium">\$89.00</div></div>
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#8b5cf6"></span>Deep Research</div><div class="col-span-5 text-slate-500">130 runs (Lite 50 · Standard 60 · Pro 20)</div><div class="col-span-3 text-right text-slate-700 font-medium">\$120.00</div></div>
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#ec4899"></span>Multimodal Chat</div><div class="col-span-5 text-slate-500">12k search queries · 3M prompt · 2M completion</div><div class="col-span-3 text-right text-slate-700 font-medium">\$90.00</div></div><div class="grid grid-cols-12 items-center px-4 py-2 text-xs"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#a16207"></span>Grounded Generation</div><div class="col-span-5 text-slate-500">84 generations (72 image · 12 video)</div><div class="col-span-3 text-right text-slate-700 font-medium">\$28.00</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Oct -->
        <div class="border-b border-slate-200">
          <button onclick="toggleCostMonth(this)" class="w-full px-4 py-3 bg-white hover:bg-slate-50 flex items-center justify-between">
            <div class="flex items-center gap-3"><span class="text-slate-900 font-medium">Oct</span><span class="text-xs text-slate-500">10 items</span><span class="bp-settle-label hidden inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-green-50 text-green-700 border border-green-200">Invoiced · Paid</span></div>
            <div class="flex items-center gap-3"><span class="text-slate-900 font-semibold">\$1,314.40</span><span class="text-slate-400 cost-chevron">▾</span></div>
          </button>
          <div class="cost-detail border-t border-slate-100 bg-white hidden">
            <div class="px-4 py-3">
              <div class="grid grid-cols-12 text-xs text-slate-500 px-2 pb-2 border-b border-slate-200"><div class="col-span-4">Service</div><div class="col-span-5">Usage</div><div class="col-span-3 text-right">Cost</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Broad Search</div><div class="col-span-5 text-slate-600">30k sub-queries · 15M full content tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$75.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Web Search</div><div class="col-span-5 text-slate-600">45k calls · 3M full content tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$93.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Image Search</div><div class="col-span-5 text-slate-600">9k calls · 52k images returned</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$45.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Video Search</div><div class="col-span-5 text-slate-600">2.8k calls · 10k videos returned</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$14.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Extract</div><div class="col-span-5 text-slate-600">50k URLs</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$50.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Model</div><div class="col-span-5 text-slate-600">11.5M tokens · 6.9M in · 4.6M out</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$161.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Embedding</div><div class="col-span-5 text-slate-600">470M tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$32.90</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">VL Embedding</div><div class="col-span-5 text-slate-600">20M image · video tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$5.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium flex items-center gap-1.5">Collect <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium" style="background:#6366f11a;color:#6366f1">Async</span></div><div class="col-span-5 text-slate-600">280k matches (text 175k · image 70k · video 35k)</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$560.00</div></div>
              <div>
                <button onclick="this.nextElementSibling.classList.toggle('hidden');this.querySelector('.app-chev').textContent=this.nextElementSibling.classList.contains('hidden')?'▾':'▴'" class="grid grid-cols-12 items-center w-full px-2 py-3 text-sm hover:bg-slate-50 text-left">
                  <div class="col-span-4 flex items-center gap-1.5 text-slate-900 font-medium">Application <span class="app-chev text-slate-400 text-xs">▾</span></div>
                  <div class="col-span-5 text-slate-600">4 apps</div>
                  <div class="col-span-3 text-right text-slate-900 font-semibold">\$278.50</div>
                </button>
                <div class="bg-slate-50 border-t border-slate-100 hidden">
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#039855"></span>Answer</div><div class="col-span-5 text-slate-500">20k calls · 2.7M tokens</div><div class="col-span-3 text-right text-slate-700 font-medium">\$80.50</div></div>
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#8b5cf6"></span>Deep Research</div><div class="col-span-5 text-slate-500">115 runs (Lite 40 · Standard 55 · Pro 18)</div><div class="col-span-3 text-right text-slate-700 font-medium">\$108.00</div></div>
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#ec4899"></span>Multimodal Chat</div><div class="col-span-5 text-slate-500">10k search queries · 5M prompt · 2.5M completion</div><div class="col-span-3 text-right text-slate-700 font-medium">\$90.00</div></div><div class="grid grid-cols-12 items-center px-4 py-2 text-xs"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#a16207"></span>Grounded Generation</div><div class="col-span-5 text-slate-500">78 generations (66 image · 12 video)</div><div class="col-span-3 text-right text-slate-700 font-medium">\$26.00</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Sep -->
        <div class="border-b border-slate-200">
          <button onclick="toggleCostMonth(this)" class="w-full px-4 py-3 bg-white hover:bg-slate-50 flex items-center justify-between">
            <div class="flex items-center gap-3"><span class="text-slate-900 font-medium">Sep</span><span class="text-xs text-slate-500">10 items</span><span class="bp-settle-label hidden inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-green-50 text-green-700 border border-green-200">Invoiced · Paid</span></div>
            <div class="flex items-center gap-3"><span class="text-slate-900 font-semibold">\$1,122.95</span><span class="text-slate-400 cost-chevron">▾</span></div>
          </button>
          <div class="cost-detail border-t border-slate-100 bg-white hidden">
            <div class="px-4 py-3">
              <div class="grid grid-cols-12 text-xs text-slate-500 px-2 pb-2 border-b border-slate-200"><div class="col-span-4">Service</div><div class="col-span-5">Usage</div><div class="col-span-3 text-right">Cost</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Broad Search</div><div class="col-span-5 text-slate-600">26k sub-queries · 13M full content tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$65.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Web Search</div><div class="col-span-5 text-slate-600">38k calls · 2.5M full content tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$78.50</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Image Search</div><div class="col-span-5 text-slate-600">7.5k calls · 44k images returned</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$37.50</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Video Search</div><div class="col-span-5 text-slate-600">2.4k calls · 9k videos returned</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$12.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Extract</div><div class="col-span-5 text-slate-600">42k URLs</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$42.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Model</div><div class="col-span-5 text-slate-600">10M tokens · 6M in · 4M out</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$140.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Embedding</div><div class="col-span-5 text-slate-600">410M tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$28.70</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">VL Embedding</div><div class="col-span-5 text-slate-600">17M image · video tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$4.25</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium flex items-center gap-1.5">Collect <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium" style="background:#6366f11a;color:#6366f1">Async</span></div><div class="col-span-5 text-slate-600">240k matches (text 150k · image 60k · video 30k)</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$480.00</div></div>
              <div>
                <button onclick="this.nextElementSibling.classList.toggle('hidden');this.querySelector('.app-chev').textContent=this.nextElementSibling.classList.contains('hidden')?'▾':'▴'" class="grid grid-cols-12 items-center w-full px-2 py-3 text-sm hover:bg-slate-50 text-left">
                  <div class="col-span-4 flex items-center gap-1.5 text-slate-900 font-medium">Application <span class="app-chev text-slate-400 text-xs">▾</span></div>
                  <div class="col-span-5 text-slate-600">4 apps</div>
                  <div class="col-span-3 text-right text-slate-900 font-semibold">\$235.00</div>
                </button>
                <div class="bg-slate-50 border-t border-slate-100 hidden">
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#039855"></span>Answer</div><div class="col-span-5 text-slate-500">17k calls · 2.3M tokens</div><div class="col-span-3 text-right text-slate-700 font-medium">\$68.50</div></div>
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#8b5cf6"></span>Deep Research</div><div class="col-span-5 text-slate-500">100 runs (Lite 35 · Standard 50 · Pro 15)</div><div class="col-span-3 text-right text-slate-700 font-medium">\$94.50</div></div>
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#ec4899"></span>Multimodal Chat</div><div class="col-span-5 text-slate-500">6k search queries · 1.6M prompt · 1M completion</div><div class="col-span-3 text-right text-slate-700 font-medium">\$48.00</div></div><div class="grid grid-cols-12 items-center px-4 py-2 text-xs"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#a16207"></span>Grounded Generation</div><div class="col-span-5 text-slate-500">66 generations (56 image · 10 video)</div><div class="col-span-3 text-right text-slate-700 font-medium">\$22.00</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Aug -->
        <div>
          <button onclick="toggleCostMonth(this)" class="w-full px-4 py-3 bg-white hover:bg-slate-50 flex items-center justify-between">
            <div class="flex items-center gap-3"><span class="text-slate-900 font-medium">Aug</span><span class="text-xs text-slate-500">10 items</span><span class="bp-settle-label hidden inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-green-50 text-green-700 border border-green-200">Invoiced · Paid</span></div>
            <div class="flex items-center gap-3"><span class="text-slate-900 font-semibold">\$934.70</span><span class="text-slate-400 cost-chevron">▾</span></div>
          </button>
          <div class="cost-detail border-t border-slate-100 bg-white hidden">
            <div class="px-4 py-3">
              <div class="grid grid-cols-12 text-xs text-slate-500 px-2 pb-2 border-b border-slate-200"><div class="col-span-4">Service</div><div class="col-span-5">Usage</div><div class="col-span-3 text-right">Cost</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Broad Search</div><div class="col-span-5 text-slate-600">22k sub-queries · 11M full content tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$55.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Web Search</div><div class="col-span-5 text-slate-600">32k calls · 2M full content tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$66.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Image Search</div><div class="col-span-5 text-slate-600">6.4k calls · 38k images returned</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$32.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Video Search</div><div class="col-span-5 text-slate-600">2k calls · 7.5k videos returned</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$10.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Extract</div><div class="col-span-5 text-slate-600">36k URLs</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$36.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Model</div><div class="col-span-5 text-slate-600">8.5M tokens · 5.1M in · 3.4M out</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$119.00</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">Embedding</div><div class="col-span-5 text-slate-600">360M tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$25.20</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium">VL Embedding</div><div class="col-span-5 text-slate-600">14M image · video tokens</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$3.50</div></div>
              <div class="grid grid-cols-12 items-center px-2 py-3 text-sm border-b border-slate-200"><div class="col-span-4 text-slate-900 font-medium flex items-center gap-1.5">Collect <span class="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium" style="background:#6366f11a;color:#6366f1">Async</span></div><div class="col-span-5 text-slate-600">200k matches (text 125k · image 50k · video 25k)</div><div class="col-span-3 text-right text-slate-900 font-semibold">\$400.00</div></div>
              <div>
                <button onclick="this.nextElementSibling.classList.toggle('hidden');this.querySelector('.app-chev').textContent=this.nextElementSibling.classList.contains('hidden')?'▾':'▴'" class="grid grid-cols-12 items-center w-full px-2 py-3 text-sm hover:bg-slate-50 text-left">
                  <div class="col-span-4 flex items-center gap-1.5 text-slate-900 font-medium">Application <span class="app-chev text-slate-400 text-xs">▾</span></div>
                  <div class="col-span-5 text-slate-600">4 apps</div>
                  <div class="col-span-3 text-right text-slate-900 font-semibold">\$188.00</div>
                </button>
                <div class="bg-slate-50 border-t border-slate-100 hidden">
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#039855"></span>Answer</div><div class="col-span-5 text-slate-500">14k calls · 2M tokens</div><div class="col-span-3 text-right text-slate-700 font-medium">\$58.00</div></div>
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#8b5cf6"></span>Deep Research</div><div class="col-span-5 text-slate-500">85 runs (Lite 30 · Standard 45 · Pro 10)</div><div class="col-span-3 text-right text-slate-700 font-medium">\$76.00</div></div>
                  <div class="grid grid-cols-12 items-center px-4 py-2 text-xs border-b border-slate-100"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#ec4899"></span>Multimodal Chat</div><div class="col-span-5 text-slate-500">4k search queries · 1M prompt · 0.6M completion</div><div class="col-span-3 text-right text-slate-700 font-medium">\$30.00</div></div><div class="grid grid-cols-12 items-center px-4 py-2 text-xs"><div class="col-span-4 text-slate-500 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full" style="background:#a16207"></span>Grounded Generation</div><div class="col-span-5 text-slate-500">54 generations (46 image · 8 video)</div><div class="col-span-3 text-right text-slate-700 font-medium">\$18.00</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ──────────────────────────────────────────────────────────
     BILLING PAGE
     恢复原始 BillingPage.tsx 结构，再叠加 org 管理能力
────────────────────────────────────────────────────────────── -->`;
