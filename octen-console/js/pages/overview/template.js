// Overview page template.
(function () {
  var IC = {
    web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"/>',
    broad: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 011-1h12a1 1 0 011 1v3M12 12V8"/>',
    news: '<path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2z"/><path d="M7 8h6M7 12h10M7 16h10"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
    video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4V8z"/>',
    model: '<path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4z"/><path d="M18 15l.9 2.3L21 18l-2.1.7L18 21l-.9-2.3L15 18l2.1-.7z"/>',
    embed: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    vl: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/>',
    extract: '<path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1"/><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/>',
    collect: '<path d="M3 8l2-4h14l2 4M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8h6l1 3h4l1-3h6"/>',
    monitor: '<circle cx="12" cy="12" r="2.4"/><path d="M12 3.5v3M12 17.5v3M20.5 12h-3M6.5 12h-3"/>',
    answer: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
    research: '<circle cx="11" cy="11" r="6"/><path d="M21 21l-3.5-3.5"/>',
    chat: '<path d="M21 12a8 8 0 01-11.5 7.2L3 21l1.8-6.5A8 8 0 1121 12z"/>',
    grounded: '<path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z"/><path d="M9 12l2 2 4-4"/>'
  };

  function esc(s) { return String(s).replace(/'/g, "\\'"); }
  function pbBadges(arr) {
    return (arr || []).map(function (b) { return '<span class="pb-badge ' + b[1] + '">' + b[0] + '</span>'; }).join('');
  }
  function pbChips(uses) {
    return '<div class="pb-list"><div class="pb-uk">Best for</div><div class="pb-chips">' +
      (uses || []).map(function (u) { return '<span class="pb-chip">' + u + '</span>'; }).join('') +
      '</div></div>';
  }
  function pbCard(c) {
    var attrs = c.url
      ? (' href="' + c.url + '" target="_blank" rel="noreferrer"')
      : (' href="#" onclick="' + (c.go ? ("go('" + esc(c.go) + "')") : ("openRequestAccess('" + esc(c.req || c.n) + "')")) + ';return false"');
    return '<a' + attrs + ' class="pb-card group">' +
      '<span class="pb-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/></svg></span>' +
      '<div class="pb-cn"><b>' + c.n + '</b>' + pbBadges(c.badges) + '</div>' +
      '<div class="pb-cd">' + c.d + '</div>' +
      (c.uses ? pbChips(c.uses) : '') +
      '</a>';
  }
  function pbIcon(k) {
    var m = {
      search: IC.web,
      models: IC.model,
      tools: IC.extract,
      app: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (m[k] || '') + '</svg>';
  }
  function pbShell(s) {
    var tier = s.tier ? (' <span class="pb-tier ' + s.tier[1] + '">' + s.tier[0] + '</span>') : '';
    return '<div class="pb-shell" style="--g1:' + s.mesh[0] + ';--g2:' + s.mesh[1] + ';--g3:' + s.mesh[2] + ';--acb:' + s.acb + '">' +
      '<div class="pb-glow"></div>' +
      '<div class="pb-shead">' +
        '<div class="l">' + pbIcon(s.icon) + '<span class="t">' + s.title + tier + '</span></div>' +
        '<span class="d">' + s.tag + '</span>' +
      '</div>' +
      '<div class="pb-cards ' + s.cols + '">' + s.cards.map(pbCard).join('') + '</div>' +
    '</div>';
  }

  var SHELLS = [
    {
      icon: 'search', title: 'Search', tier: ['ULTRA FAST', 'ultra'], tag: 'Fastest, lowest-cost retrieval for common lookups.', cols: 'c1', mesh: ['#86EFAC', '#5EEAD4', '#34D399'], acb: 'rgba(31,188,46,.5)', cards: [
        { n: 'Flash Search', badges: [['New', 'new']], d: 'Maps a query straight to the most relevant URLs. Fastest and lowest-cost search.', go: 'flash-search', uses: ['Navigation', 'Official sites', 'Docs lookup', 'Entity lookup'] }
      ]
    },
    {
      icon: 'search', title: 'Search', tier: ['FAST', 'fast'], tag: 'Low-latency retrieval from the live web.', cols: 'c4', mesh: ['#86EFAC', '#5EEAD4', '#34D399'], acb: 'rgba(31,188,46,.5)', cards: [
        { n: 'Web Search', d: 'LLM-native search with ranked results, highlights, and optional full content.', go: 'web-search', uses: ['LLM tool calls', 'RAG', 'Agents', 'Fact-checking'] },
        { n: 'Broad Search', d: 'Auto-decomposes one query into parallel subqueries.', go: 'broad-search-api', uses: ['Research agents', 'Deep questions', 'Comprehensive lookup'] },
        { n: 'Image Search', badges: [['Early Access', 'ea']], d: 'Open-web image retrieval by text or reference image.', req: 'Image Search', uses: ['Design refs', 'Asset lookup', 'Content creation'] },
        { n: 'Video Search', badges: [['Early Access', 'ea']], d: 'Video retrieval across the open web.', req: 'Video Search', uses: ['Media discovery', 'Tutorials', 'Reference footage'] }
      ]
    },
    {
      icon: 'search', title: 'Search', tier: ['Premier', 'premier'], tag: 'Specialized retrieval across verticals.', cols: 'c2', mesh: ['#C4B5FD', '#DDD6FE', '#A78BFA'], acb: 'rgba(167,139,250,.6)', cards: [
        { n: 'News Search', badges: [['New', 'new']], d: 'Real-time news, grouped by subject.', go: 'news-search', uses: ['Monitoring', 'Trend tracking', 'Breaking events'] },
        { n: 'Business Search', badges: [['New', 'new']], d: 'Company and people search, as structured profiles.', req: 'Business Search', uses: ['Company profiles', 'People research', 'Competitive analysis'] }
      ]
    },
    {
      icon: 'tools', title: 'Tools', tag: 'Building blocks for retrieval and data pipelines.', cols: 'c4', mesh: ['#86EFAC', '#5EEAD4', '#34D399'], acb: 'rgba(31,188,46,.5)', cards: [
        { n: 'Embedding', badges: [['Docs', 'docs']], d: 'Text embeddings for retrieval, similarity, and ranking.', url: 'https://docs.octen.ai/api-reference/embedding', uses: ['Semantic search', 'RAG', 'Ranking', 'Recommendations'] },
        { n: 'VL Embedding', badges: [['Docs', 'docs']], d: 'One vector space across text, images, video, and documents.', url: 'https://docs.octen.ai/api-reference/vl-embedding', uses: ['Cross-modal search', 'Image retrieval', 'Multimodal RAG'] },
        { n: 'Extract', d: 'Clean Markdown, highlights, and page classification from any URL.', go: 'extract', uses: ['RAG ingestion', 'Content monitoring', 'Data pipelines', 'Page classification'] },
        { n: 'Monitor', badges: [['New', 'new']], d: 'Turn any search or URL into a continuous, subscribable monitor — notified only on meaningful change.', go: 'monitor', uses: ['Price alerts', 'News tracking', 'Event alerts', 'KB sync'] }
      ]
    },
    {
      icon: 'app', title: 'Application', tag: 'Complete workflows built on the APIs above.', cols: 'c5b', mesh: ['#86EFAC', '#5EEAD4', '#34D399'], acb: 'rgba(31,188,46,.5)', cards: [
        { n: 'Answer', d: 'Grounded answer synthesis with inline citations.', go: 'broad-search', uses: ['Support bots', 'Knowledge Q&A', 'Help center'] },
        { n: 'Auto Research', badges: [['New', 'new']], d: 'Search-grounded models via OpenAI- and Anthropic-compatible APIs.', req: 'Auto Research', uses: ['Drop-in migration', 'Grounded chat', 'Image & video gen'] },
        { n: 'Deep Research', d: 'Source-backed research across thousands of pages.', go: 'deep-research', uses: ['Reports', 'Market analysis', 'Due diligence'] },
        { n: 'Multimodal Chat', badges: [['Early Access', 'ea']], d: 'Analyze, search, and chat across text, images, and video.', req: 'Multimodal Chat', uses: ['Doc chat', 'Video understanding', 'Visual Q&A'] },
        { n: 'Grounded Generation', badges: [['Early Access', 'ea']], d: 'Images and videos grounded in real-world references.', req: 'Grounded Generation', uses: ['Cited images', 'Marketing assets', 'Illustrations'] }
      ]
    }
  ];

  var matrixHtml = '<div class="pb-shells mb-8">' + SHELLS.map(pbShell).join('') + '</div>';

  registerPage("page-overview", `<div id="page-overview" class="page active pl-0 pr-[10px] py-[10px] h-full min-h-0 overflow-hidden">
<div class="layout-pane w-full h-full overflow-y-auto relative min-h-0">
  <div class="max-w-[1400px] w-full mx-auto px-6 py-6 md:px-10 md:py-8">

  <!-- Header -->
  <div class="mb-6 flex items-center justify-between gap-6">
    <h1 id="ov-welcome-title" class="text-[#0a0a0a] text-2xl font-semibold">Welcome, Jane Niu</h1>

    <!-- API Key widget -->
    <div class="bg-white border border-[#e7e7e7] rounded-xl flex items-stretch shrink-0 overflow-hidden shadow-sm">
      <div class="flex items-center gap-3 px-4 py-3">
        <svg class="w-3.5 h-3.5 shrink-0" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
        <span class="text-xs text-[#a3a3a3] font-medium">API Key</span>
        <div id="ov-key-display" class="bg-[#f5f5f5] rounded-md px-3 py-1 flex items-center gap-2 border border-[#f5f5f5]">
          <code id="ov-key-val" class="text-xs text-[#737373] font-mono whitespace-nowrap">sk_live_1234••••••••••wxyz</code>
          <button id="ov-key-eye" onclick="toggleOvKeyVis()" class="p-0.5 hover:bg-[#e5e5e5] rounded text-[#a3a3a3] transition-colors">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
          <button onclick="copyOvKey()" class="p-0.5 hover:bg-[#e5e5e5] rounded text-[#a3a3a3] transition-colors">
            <svg id="ov-copy-icon" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          </button>
        </div>
      </div>
      <div class="w-px bg-[#f5f5f5] my-2"></div>
      <a href="#" class="flex items-center gap-2 px-4 hover:bg-[#f5f5f5] transition-colors group">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <span class="text-xs text-[#a3a3a3] group-hover:text-[#737373] transition-colors">Operational →</span>
      </a>
    </div>
  </div>

  <!-- Payment Banner (role-aware in org mode) -->
  <div id="ov-payment-banner"></div>

  <!-- Product Matrix (from ov-matrix) -->
  ${matrixHtml}

  <!-- Getting Started -->
  <section>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[16px] text-[#000] font-semibold">Getting Started</h2>
      <a href="https://docs.octen.ai/introduction/getting-started/quickstart" target="_blank" rel="noreferrer" class="text-xs font-medium hover:opacity-75 transition-opacity" style="color:#039855">Quickstart guide →</a>
    </div>
    <div class="grid md:grid-cols-3 gap-4">
      <div class="ov-card group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">01</span>
        <div class="flex-1"><p class="text-[#0a0a0a] font-semibold mb-2">Get your API key</p><p class="text-xs text-[#737373] leading-relaxed">One API key for all Octen APIs.</p></div>
        <div class="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
          <a href="#" onclick="go('api-keys');return false" class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">Manage API keys <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        </div>
      </div>
      <div class="ov-card group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">02</span>
        <div class="flex-1"><p class="text-[#0a0a0a] font-semibold mb-2">Make your first call</p><p class="text-xs text-[#737373] leading-relaxed">Fast, structured responses via API, SDK, or the CLI.</p></div>
        <div class="flex flex-row flex-nowrap items-center gap-4 pt-2 border-t border-[#f5f5f5]">
          <a href="https://docs.octen.ai/api-reference/search" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit whitespace-nowrap" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">API &amp; SDKs <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
          <a href="https://docs.octen.ai/llm-&-agent-interfaces/integrations/octen-cli" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit whitespace-nowrap" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">CLI <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        </div>
      </div>
      <div class="ov-card group bg-white border border-[#e7e7e7] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-all">
        <span class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold shrink-0" style="background:#0398551a;color:#039855">03</span>
        <div class="flex-1"><p class="text-[#0a0a0a] font-semibold mb-2">Integrate into your app</p><p class="text-xs text-[#737373] leading-relaxed">Use as an LLM tool or skill, or integrate into RAG pipelines.</p></div>
        <div class="flex flex-col gap-2 pt-2 border-t border-[#f5f5f5]">
          <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/connect-llms-to-octen-search" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium w-fit" style="color:#039855" onmouseenter="this.style.opacity='0.75'" onmouseleave="this.style.opacity='1'">Integration guide <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        </div>
      </div>
    </div>

    <!-- Built with MCP & Skills -->
    <div class="ov-card mt-4 bg-white border border-[#e7e7e7] rounded-xl p-6 grid lg:grid-cols-2 gap-6 hover:shadow-md transition-all">
      <!-- Left: intro -->
      <div class="min-w-0">
        <p class="text-[#0a0a0a] font-semibold mb-2">Built with MCP &amp; Skills</p>
        <p class="text-xs text-[#737373] leading-relaxed">Connect once, and your agent gets Search, Extract, and every tool we ship next — native to Claude Desktop, Cursor, VS Code, and any MCP client.</p>
      </div>
      <!-- Right: tabs + install + actions -->
      <div class="min-w-0 lg:border-l lg:border-[#e7e7e7] lg:pl-6">
        <!-- Tabs -->
        <div class="flex items-center gap-1 mb-3 border-b border-[#e7e7e7]">
          <button data-mcps-tab="mcp" class="mcps-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors" style="color:#039855;border-color:#039855">MCP</button>
          <button data-mcps-tab="skills" class="mcps-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors text-[#737373] border-transparent hover:text-[#737373]">Skills</button>
        </div>
        <!-- MCP panel -->
        <div data-mcps-panel="mcp" class="mcps-panel">
          <div class="flex items-center gap-2 flex-wrap">
            <select id="mcps-client" onchange="mcpsSetClient(this.value)" class="shrink-0 bg-white border border-[#e7e7e7] rounded-lg px-3 py-2 text-xs font-medium text-[#737373] cursor-pointer">
              <option value="claude-code">Claude Code</option>
              <option value="claude-desktop">Claude Desktop</option>
              <option value="cursor">Cursor</option>
              <option value="vscode">VS Code</option>
            </select>
            <div class="flex-1 min-w-[200px] flex items-center justify-between gap-2 bg-[#f5f5f5] border border-[#e7e7e7] rounded-lg px-3 py-2 font-mono text-xs text-[#0a0a0a]">
              <span id="mcps-cmd-mcp" class="truncate">claude mcp add --scope user octen -- npx -y octen-mcp</span>
              <button onclick="navigator.clipboard.writeText(document.getElementById('mcps-cmd-mcp').textContent)" class="text-[#a3a3a3] hover:text-[#737373] shrink-0" title="Copy">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
            </div>
            <a href="https://github.com/Octen-Team/octen-mcp" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5]">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </a>
            <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/octen-mcp-server" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5]">Docs</a>
          </div>
        </div>
        <!-- Skills panel -->
        <div data-mcps-panel="skills" class="mcps-panel hidden">
          <div class="flex items-center gap-2 flex-wrap">
            <div class="flex-1 min-w-[200px] flex items-center justify-between gap-2 bg-[#f5f5f5] border border-[#e7e7e7] rounded-lg px-3 py-2 font-mono text-xs text-[#0a0a0a]">
              <span>git clone https://github.com/Octen-Team/web-search-skills</span>
              <button onclick="navigator.clipboard.writeText('git clone https://github.com/Octen-Team/web-search-skills')" class="text-[#a3a3a3] hover:text-[#737373] shrink-0" title="Copy">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </button>
            </div>
            <a href="https://github.com/Octen-Team" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5]">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </a>
            <a href="https://docs.octen.ai/llm-&-agent-interfaces/llm-tool-use/octen-skills" target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs font-medium text-[#737373] hover:bg-[#f5f5f5]">Docs</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</div>
</div>
`);
})();
