// extract page template — extracted from the prototype page set.
registerPage("page-extract", `
<div id="page-extract" class="page p-4">
  <div class="grid lg:grid-cols-2 gap-4" style="height:calc(100vh - 2rem)">

    <!-- Left: Parameters -->
    <div class="space-y-4 overflow-y-auto">
      <div class="bg-white rounded-md border border-[#e7e7e7] p-4 space-y-4">

        <!-- URLs + Query -->
        <section class="space-y-3">
          <div>
            <label class="block text-[#0a0a0a] text-sm font-medium mb-2">URLs<span class="text-red-500 ml-0.5">*</span></label>
            <textarea id="ex-urls" rows="4" placeholder="https://docs.octen.ai/api-reference/search&#10;https://en.wikipedia.org/wiki/Artificial_intelligence&#10;https://www.who.int/news-room/fact-sheets/detail/influenza" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-lg text-sm focus:outline-none placeholder:text-[#a3a3a3] font-mono resize-none" oninput="exUpdateBtn()"></textarea>
            <div class="flex items-center justify-between mt-1">
              <p class="text-xs" id="ex-url-counter"><span id="ex-url-count">0</span> / 20 URLs</p>
              <p class="text-xs text-[#a3a3a3]">One URL per line</p>
            </div>
          </div>
          <div>
            <label class="block text-[#0a0a0a] text-sm font-medium mb-1">Query <span class="text-[#a3a3a3] text-xs font-normal">(optional)</span></label>
            <input id="ex-query" type="text" placeholder="e.g. rate limits and authentication" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-lg text-sm focus:outline-none placeholder:text-[#a3a3a3]" oninput="exUpdateBtn()"/>
          </div>
        </section>

        <div class="border-t border-[#f5f5f5]"></div>

        <!-- Basic settings -->
        <section class="space-y-3">
          <h2 class="text-[#0a0a0a] text-sm font-medium">Basic settings</h2>
          <div>
            <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Format</label>
            <select id="ex-format" onchange="exRefreshCode()" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs bg-white outline-none focus:border-[#039855]">
              <option value="markdown">markdown</option>
              <option value="text">text</option>
            </select>
          </div>
          <div>
            <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Max age <span class="text-[#a3a3a3] normal-case tracking-normal">(seconds)</span></label>
            <input id="ex-maxage" type="number" value="86400" min="300" onchange="exRefreshCode()" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs outline-none focus:border-[#039855]"/>
            <p class="text-xs text-[#a3a3a3] mt-1">Maximum age of cached content</p>
          </div>
          <div>
            <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Timeout <span class="text-[#a3a3a3] normal-case tracking-normal">(seconds)</span></label>
            <input id="ex-timeout" type="number" value="30" min="1" max="60" onchange="exRefreshCode()" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs outline-none focus:border-[#039855]"/>
            <p class="text-xs text-[#a3a3a3] mt-1">Per-URL extraction timeout</p>
          </div>
        </section>

        <div class="border-t border-[#f5f5f5]"></div>

        <!-- Additional fields -->
        <section class="space-y-3">
          <h2 class="text-[#0a0a0a] text-sm font-medium">Additional fields</h2>
          <div class="grid grid-cols-2 gap-x-5 gap-y-2">
            <label class="flex items-center gap-2 text-[#737373] text-xs cursor-pointer">
              <input type="checkbox" id="ex-images" onchange="exRefreshCode()" class="w-4 h-4 rounded border-[#dbdbdb]" style="accent-color:#039855"/>
              <span>Include images</span>
              <span class="ex-tip relative inline-flex text-[#a3a3a3] cursor-help">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <span class="ex-tip-bubble">Include image URLs from each page.</span>
              </span>
            </label>
            <label class="flex items-center gap-2 text-[#737373] text-xs cursor-pointer">
              <input type="checkbox" id="ex-videos" onchange="exRefreshCode()" class="w-4 h-4 rounded border-[#dbdbdb]" style="accent-color:#039855"/>
              <span>Include videos</span>
              <span class="ex-tip relative inline-flex text-[#a3a3a3] cursor-help">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <span class="ex-tip-bubble">Include video URLs from each page.</span>
              </span>
            </label>
            <label class="flex items-center gap-2 text-[#737373] text-xs cursor-pointer">
              <input type="checkbox" id="ex-audio" onchange="exRefreshCode()" class="w-4 h-4 rounded border-[#dbdbdb]" style="accent-color:#039855"/>
              <span>Include audio</span>
              <span class="ex-tip relative inline-flex text-[#a3a3a3] cursor-help">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <span class="ex-tip-bubble">Include audio URLs from each page.</span>
              </span>
            </label>
            <label class="flex items-center gap-2 text-[#737373] text-xs cursor-pointer">
              <input type="checkbox" id="ex-favicon" onchange="exRefreshCode()" class="w-4 h-4 rounded border-[#dbdbdb]" style="accent-color:#039855"/>
              <span>Include favicon</span>
              <span class="ex-tip relative inline-flex text-[#a3a3a3] cursor-help">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <span class="ex-tip-bubble">Include favicon URL from each page.</span>
              </span>
            </label>
          </div>
        </section>

        <div class="border-t border-[#f5f5f5]"></div>

        <!-- Actions -->
        <div class="space-y-2">
          <!-- Demo scenario selector -->
          <div class="flex items-center gap-2">
            <label class="text-xs text-[#a3a3a3] shrink-0">Demo scenario</label>
            <select id="ex-scenario" class="flex-1 px-2 py-1 border border-[#e7e7e7] rounded text-xs bg-white text-[#737373] outline-none focus:border-[#039855]">
              <option value="normal">Normal (mixed results)</option>
              <option value="all_success">All success</option>
              <option value="all_failed">All failed (mixed errors)</option>
              <option value="partial">Partial failure</option>
              <option value="rate_limited">429 Too Many Requests</option>
              <option value="balance">403 Insufficient balance</option>
              <option value="unauthorized">401 Unauthorized</option>
              <option value="too_large">413 Too many URLs</option>
            </select>
          </div>
          <div id="ex-pay-notice" class="hidden items-center gap-2 text-xs text-[#737373]">
            <svg class="w-3.5 h-3.5 shrink-0" style="color:#F97316" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <span id="ex-pay-notice-text">Add a payment method to unlock the API. Free credits included.</span>
            <a id="ex-pay-notice-link" href="#" onclick="go('billing');return false" class="font-medium hover:underline" style="color:#039855">Add payment method →</a>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" id="ex-run-btn" onclick="exRun()" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium" style="background:#cbd5e1;cursor:not-allowed">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Run
            </button>
            <button type="button" onclick="exClear()" class="inline-flex items-center gap-2 px-4 py-2 border border-[#e7e7e7] text-[#737373] rounded-lg text-sm hover:bg-[#f5f5f5]">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M1 4v6h6M23 20v-6h-6"/><path stroke-linecap="round" stroke-linejoin="round" d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Code & Response -->
    <div class="flex flex-col">
      <div class="bg-white rounded-md border border-[#e7e7e7] flex flex-col h-full">
        <!-- Tabs -->
        <div class="border-b border-[#f5f5f5] flex shrink-0">
          <button id="ex-tab-req" class="flex-1 px-4 py-3 text-xs font-medium" style="color:#039855;background:#0398551a;border-bottom:2px solid #039855" onclick="exTabSwitch('request')">Request</button>
          <button id="ex-tab-res" class="flex-1 px-4 py-3 text-xs font-medium text-[#737373]" onclick="exTabSwitch('response')">Response</button>
        </div>
        <div class="p-4 flex-1 overflow-y-auto">

          <!-- Request pane -->
          <div id="ex-pane-request">
            <div class="flex items-center justify-between mb-3">
              <div class="inline-flex rounded-md border border-[#e7e7e7] overflow-hidden text-xs">
                <button id="ex-lang-py" onclick="exLang('py')" class="px-3 py-2" style="background:#0398551a;color:#039855;font-weight:500">Python</button>
                <button id="ex-lang-js" onclick="exLang('js')" class="px-3 py-2 border-l border-[#e7e7e7] bg-white text-[#737373]">JavaScript</button>
                <button id="ex-lang-curl" onclick="exLang('curl')" class="px-3 py-2 border-l border-[#e7e7e7] bg-white text-[#737373]">cURL</button>
              </div>
              <button onclick="copyCodeBlock(this)" class="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[#e7e7e7] bg-white text-[#737373] hover:bg-[#f5f5f5] text-xs">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <span>Copy</span>
              </button>
            </div>
            <div class="bg-slate-900 rounded-md p-4 overflow-x-auto max-h-[520px] overflow-y-auto">
              <pre id="ex-code-block" class="text-xs text-slate-100 whitespace-pre font-mono"><code>from octen import Octen

client = Octen(api_key="YOUR_API_KEY")

response = client.extract(
    urls=[
        "https://docs.octen.ai/api-reference/search",
        "https://en.wikipedia.org/wiki/Artificial_intelligence",
    ],
    format="markdown",
    render="auto",
    max_age_seconds=86400,
    timeout=30,
)

for result in response.data.results:
    if result.status == "success":
        print(result.title)
        print(result.content[:500])</code></pre>
            </div>
          </div>

          <!-- Response pane -->
          <div id="ex-pane-response" class="hidden">
            <div class="flex flex-col items-center justify-center py-12 text-[#a3a3a3]">
              <svg class="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <p class="text-xs">Run a request to see results</p>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</div>
`);
