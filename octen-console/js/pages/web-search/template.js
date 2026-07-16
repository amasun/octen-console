// web-search page template — extracted from the prototype page set.
registerPage("page-web-search", `
<div id="page-web-search" class="page p-4">
  <div class="grid lg:grid-cols-2 gap-4">
    <!-- Left: Parameters -->
    <div class="space-y-4">
      <div class="bg-white rounded-md border border-[#e7e7e7] p-4 space-y-4">
        <!-- Configuration header -->
        <div class="flex items-center justify-between">
          <h2 class="text-[#0a0a0a] font-semibold" style="font-size:17px">Configuration</h2>
          <a href="#" onclick="return false" class="inline-flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] text-[#737373] rounded-md text-xs hover:bg-[#f5f5f5]">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Docs</span>
          </a>
        </div>
        <!-- Query -->
        <section>
          <label class="block text-[#0a0a0a] text-sm font-medium mb-2">Query<span class="text-red-500 ml-0.5">*</span></label>
          <div class="flex items-center gap-3 mb-2">
            <div class="relative flex-1">
              <input type="text" id="ws-query" placeholder="Find" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-lg text-sm focus:outline-none placeholder:text-[#a3a3a3]"/>
            </div>
            <button type="button" onclick="wsClear()" class="inline-flex items-center px-4 py-2 border border-[#e7e7e7] text-[#737373] rounded-lg text-sm hover:bg-[#f5f5f5] whitespace-nowrap">
              <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M1 4v6h6M23 20v-6h-6"/><path stroke-linecap="round" stroke-linejoin="round" d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
              <span>Clear</span>
            </button>
            <button type="button" onclick="wsRun()" class="inline-flex items-center px-4 py-2 text-white rounded-lg text-sm whitespace-nowrap" style="background:#cbd5e1;cursor:not-allowed" id="ws-run-btn">
              <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span>Run</span>
            </button>
          </div>
          <!-- Payment method notice -->
          <div id="ws-pay-notice" class="mb-2 flex items-center gap-2 text-sm text-[#737373]">
            <svg class="w-4 h-4 shrink-0" style="color:#F97316" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <span>Add a payment method to unlock the API. Free credits included.</span>
            <a href="#" onclick="go('billing');return false" class="font-medium hover:underline" style="color:#039855">Add payment method →</a>
          </div>
        </section>

        <div class="border-t border-[#f5f5f5]"></div>

        <!-- Basic settings -->
        <section class="space-y-3">
          <h2 class="text-[#0a0a0a] text-sm font-medium">Basic settings</h2>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Topic</label>
              <select id="ws-topic" onchange="wsRefreshCode && wsRefreshCode()" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs bg-white outline-none focus:border-[#039855]">
                <option value="general" selected>general</option><option value="news">news</option>
              </select>
            </div>
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Max results</label>
              <input type="number" id="ws-max" min="1" max="100" value="5" oninput="wsRefreshCode()" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
        </section>

        <div class="border-t border-[#f5f5f5]"></div>

        <!-- Filters -->
        <section class="space-y-3">
          <h2 class="text-[#0a0a0a] text-sm font-medium">Filters</h2>
          <div class="grid grid-cols-2 gap-3 items-start">
            <div>
              <label class="block text-[#737373] text-xs uppercase tracking-wide mb-1">Time basis</label>
              <div class="inline-flex rounded-full border border-[#e7e7e7] text-xs overflow-hidden">
                <button type="button" class="ws-tb px-3 py-1 border-r border-[#e7e7e7]" data-b="auto" onclick="wsBasis('auto')" style="background:#0398551a;color:#039855;font-weight:500">Auto</button>
                <button type="button" class="ws-tb px-3 py-1 border-r border-[#e7e7e7] bg-white text-[#737373]" data-b="published" onclick="wsBasis('published')">Published</button>
                <button type="button" class="ws-tb px-3 py-1 bg-white text-[#737373]" data-b="crawled" onclick="wsBasis('crawled')">Crawled</button>
              </div>
            </div>
            <div class="relative">
              <label class="block text-[#737373] text-xs uppercase tracking-wide mb-1">Date range</label>
              <button type="button" id="ws-date-btn" onclick="wsDateToggle()" class="w-full flex items-center gap-2 px-3 py-2 border border-[#e7e7e7] rounded-lg text-xs bg-white outline-none focus:border-[#039855]">
                <svg class="w-3.5 h-3.5 text-[#a3a3a3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path stroke-linecap="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
                <span id="ws-date-label" class="text-[#a3a3a3]">Custom range</span>
              </button>
              <div id="ws-date-pop" style="display:none;position:absolute;top:calc(100% + 6px);right:0;z-index:60;background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 12px 32px rgba(15,23,42,0.16);padding:14px;gap:12px;width:max-content;max-width:90vw"></div>
              <input type="hidden" id="ws-start"/><input type="hidden" id="ws-end"/>
            </div>
          </div>
          <p class="text-xs text-[#737373]">Auto prefers published time and falls back to crawled time. Presets and custom start/end are mutually exclusive.</p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Include domains</label>
              <textarea id="ws-inc" rows="2" placeholder="e.g. octen.ai (one per line)" oninput="wsRefreshCode()" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs outline-none focus:border-[#039855] resize-none"></textarea>
            </div>
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Exclude domains</label>
              <textarea id="ws-exc" rows="2" placeholder="e.g. octen.ai (one per line)" oninput="wsRefreshCode()" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs outline-none focus:border-[#039855] resize-none"></textarea>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Include text</label>
              <input type="text" id="ws-inctext" placeholder="Phrase to include (≤ 5 words)" oninput="wsRefreshCode()" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Exclude text</label>
              <input type="text" id="ws-exctext" placeholder="Phrase to exclude (≤ 5 words)" oninput="wsRefreshCode()" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
        </section>

        <div class="border-t border-[#f5f5f5]"></div>

        <!-- Output options -->
        <section class="space-y-4">
          <h2 class="text-[#0a0a0a] text-sm font-medium">Output options</h2>

          <!-- Return highlights -->
          <div>
            <div class="flex items-center justify-between gap-3">
              <label class="flex items-center gap-2 text-[#0a0a0a] text-xs font-medium cursor-pointer">
                <input type="checkbox" id="ws-hl" checked onchange="wsRefreshCode()" class="w-4 h-4 rounded border-[#dbdbdb]" style="accent-color:#039855"/>
                <span>Return highlights</span>
              </label>
              <div class="flex items-center gap-2 shrink-0">
                <span class="text-xs text-[#737373]">Max tokens</span>
                <input type="number" id="ws-hltok" min="1" value="512" oninput="wsRefreshCode()" class="w-20 px-2 py-1 border border-[#e7e7e7] rounded text-xs outline-none focus:border-[#039855] tabular-nums text-right"/>
              </div>
            </div>
            <p class="text-xs text-[#737373] ml-6 mt-1">Extract query-relevant highlights from the content.</p>
          </div>

          <!-- Return full content -->
          <div>
            <div class="flex items-center justify-between gap-3">
              <label class="flex items-center gap-2 text-[#0a0a0a] text-xs font-medium cursor-pointer">
                <input type="checkbox" id="ws-fc" onchange="wsRefreshCode()" class="w-4 h-4 rounded border-[#dbdbdb]" style="accent-color:#039855"/>
                <span>Return full content</span>
              </label>
              <div class="flex items-center gap-2 shrink-0">
                <span class="text-xs text-[#737373]">Max tokens</span>
                <input type="number" id="ws-fctok" min="1" value="2048" oninput="wsRefreshCode()" class="w-20 px-2 py-1 border border-[#e7e7e7] rounded text-xs outline-none focus:border-[#039855] tabular-nums text-right"/>
              </div>
            </div>
            <p class="text-xs text-[#737373] ml-6 mt-1">Billed via full_content_max_tokens.</p>
          </div>

          <!-- Safe search -->
          <div>
            <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Safesearch</label>
            <select id="ws-safe" onchange="wsRefreshCode()" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs bg-white outline-none focus:border-[#039855]">
              <option value="off">Off</option><option value="moderate">Moderate</option><option value="strict">Strict</option>
            </select>
          </div>
        </section>
      </div>
    </div>

    <!-- Right: Code & Response -->
    <div>
      <div class="bg-white rounded-md border border-[#e7e7e7]">
        <!-- Tabs -->
        <div class="border-b border-[#f5f5f5] flex">
          <button id="ws-tab-req" class="flex-1 px-4 py-3 text-xs font-medium" style="color:#039855;background:#0398551a;border-bottom:2px solid #039855" onclick="wsTabSwitch('request')">Request</button>
          <button id="ws-tab-res" class="flex-1 px-4 py-3 text-xs font-medium text-[#737373]" onclick="wsTabSwitch('response')">Response</button>
        </div>
        <div class="p-4">
          <!-- Request pane -->
          <div id="ws-pane-request">
            <div class="flex items-center justify-between mb-3">
              <div class="inline-flex rounded-md border border-[#e7e7e7] overflow-hidden text-xs">
                <button type="button" class="ws-lang px-3 py-2" data-l="python" onclick="wsSetLang('python')">Python</button>
                <button type="button" class="ws-lang px-3 py-2 border-l border-[#e7e7e7]" data-l="javascript" onclick="wsSetLang('javascript')">JavaScript</button>
                <button type="button" class="ws-lang px-3 py-2 border-l border-[#e7e7e7]" data-l="curl" onclick="wsSetLang('curl')">cURL</button>
              </div>
              <button type="button" onclick="wsCopyReq()" id="ws-copyreq" class="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[#e7e7e7] bg-white text-[#737373] hover:bg-[#f5f5f5] text-xs">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <span>Copy</span>
              </button>
            </div>
            <div id="ws-code" class="rounded-md overflow-hidden" style="max-height:560px"></div>
          </div>
          <!-- Response pane -->
          <div id="ws-pane-response" class="hidden">
            <div class="flex flex-col items-center justify-center py-12 text-[#a3a3a3]">
              <svg class="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <p class="text-xs">Run a query to see results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

`);
