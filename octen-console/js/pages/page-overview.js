window.pageHtml = window.pageHtml || {};
window.pageHtml["page-overview"] = `<div id="page-overview" class="page active max-w-[1440px] mx-auto p-4">

  <!-- Header -->
  <div class="mb-6 flex items-center justify-between gap-6">
    <h1 class="text-slate-900 text-2xl font-semibold">Overview</h1>

    <!-- API Key widget -->
    <div class="bg-white border border-slate-200 rounded-xl flex items-stretch shrink-0 overflow-hidden">
      <div class="flex items-center gap-2.5 px-4 py-2.5">
        <svg class="w-6 h-6 text-slate-400 group-hover:text-[#039855] transition-colors" fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 8.99991V5.99242C15.7495 5.73073 15.68 5.47379 15.5482 5.24765C15.4166 5.02152 15.2274 4.83419 15 4.70467L9.74997 1.69868C9.52146 1.56846 9.26298 1.5 9 1.5C8.73697 1.5 8.47852 1.56846 8.25 1.69868L3 4.70467C2.53575 4.97092 2.25 5.46217 2.25 5.99317V12.0066C2.25 12.5384 2.53575 13.0289 3 13.2944L8.25 16.3004C8.715 16.5659 9.28503 16.5659 9.74997 16.3004M9 16.4999V8.99991M9 8.99991L15.5475 5.21993M9 8.99991L2.4525 5.21993" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.89 11.2396C15.2515 11.0572 16.503 12.0132 16.6856 13.3747C16.7683 13.9915 16.6168 14.5855 16.3004 15.068L17.114 16.1235C17.3252 16.3973 17.2743 16.7904 17.0006 17.0017C16.7266 17.2127 16.3336 17.162 16.1224 16.8881L15.3694 15.9111C15.1205 16.0407 14.8451 16.1309 14.5507 16.1703C13.1891 16.3525 11.9381 15.3968 11.7557 14.0353C11.5734 12.6739 12.5286 11.4222 13.89 11.2396ZM14.0569 12.4811C13.3811 12.5717 12.906 13.1932 12.9965 13.869C13.087 14.5449 13.7084 15.0192 14.3843 14.9289C15.0603 14.8383 15.5347 14.2169 15.4442 13.5409C15.3535 12.8653 14.7326 12.3908 14.0569 12.4811Z" fill="currentColor"/></svg><span class="text-slate-900 font-semibold text-base">Model Gateway</span></div>
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
          <a href="#" onclick="go('api-keys');return false" class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">Manage API keys <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a>
        </div>
      </div>
      <div class="group bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">02</span>
        <div class="flex-1"><p class="text-slate-900 font-semibold mb-2">Make your first call</p><p class="text-xs text-slate-600 leading-relaxed">Fast, structured responses via API, SDK, or the CLI.</p></div>
        <div class="flex flex-row flex-nowrap items-center gap-4 pt-2 border-t border-slate-100">
          <a href="https://docs.octen.ai/api-reference/search" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit whitespace-nowrap" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">API &amp; SDKs <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a>
          <a href="https://docs.octen.ai/llm-&-agent-interfaces/integrations/octen-cli" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit whitespace-nowrap" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">CLI <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a>
        </div>
      </div>
      <div class="group bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-slate-300 transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">03</span>
        <div class="flex-1"><p class="text-slate-900 font-semibold mb-2">Integrate into your app</p><p class="text-xs text-slate-600 leading-relaxed">Use as an LLM tool or skill, or integrate into RAG pipelines.</p></div>
        <div class="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
          <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/connect-llms-to-octen-search" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">Integration guide <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a>
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
            <select id="mcps-client" onchange="mcpsSetClient(this.value)" class="shrink-0 bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 cursor-pointer" field_signature="2579315290" form_signature="15830614452669181766" alternative_form_signature="5529231169123062896" visibility_annotation="true">
              <option value="claude-code">Claude Code</option>
              <option value="claude-desktop">Claude Desktop</option>
              <option value="cursor">Cursor</option>
              <option value="vscode">VS Code</option>
            </select>
            <div class="flex-1 min-w-[200px] flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono text-xs text-slate-800">
              <span id="mcps-cmd-mcp" class="truncate">claude mcp add --scope user octen -- npx -y octen-mcp</span>
              <button onclick="navigator.clipboard.writeText(document.getElementById('mcps-cmd-mcp').textContent)" class="text-slate-400 hover:text-slate-700 shrink-0" title="Copy">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
              </button>
            </div>
            <a href="https://github.com/Octen-Team/octen-mcp" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
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
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
              </button>
            </div>
            <a href="https://github.com/Octen-Team" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
              GitHub
            </a>
            <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/octen-skills" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50">Docs</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>`;
