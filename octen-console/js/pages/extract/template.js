// extract page template — extracted from the prototype page set.
registerPage("page-extract", `
<div id="page-extract" class="page h-full">
  <div class="layout-columns cols-2 h-full min-h-0">
    <!-- Left: Parameters -->
    <div class="layout-pane min-w-[400px] flex flex-col min-h-0">
      <div class="flex items-center justify-between shrink-0 px-4 pt-4 pb-2 border-b border-transparent">
        <h2 class="text-[#0a0a0a] font-semibold text-lg">Extract</h2>
        <a href="#" onclick="return false" class="ui-btn-outline">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          <span>Docs</span>
        </a>
      </div>
      <div class="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        <!-- URLs + Query -->
        <section class="space-y-3">
          <div>
            <label class="ui-label-primary">URLs<span class="text-red-500 ml-0.5">*</span></label>
            <textarea id="ex-urls" rows="4" placeholder="https://docs.octen.ai/api-reference/search&#10;https://en.wikipedia.org/wiki/Artificial_intelligence&#10;https://www.who.int/news-room/fact-sheets/detail/influenza" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none placeholder:text-[#a3a3a3] font-mono resize-none focus-within:border-[#039855]" oninput="exUpdateBtn()"></textarea>
            <div class="flex items-center justify-between mt-1">
              <p class="text-xs text-[#737373]" id="ex-url-counter"><span id="ex-url-count">0</span> / 20 URLs</p>
              <p class="text-xs text-[#a3a3a3]">One URL per line</p>
            </div>
          </div>
          <div>
            <label class="block text-[#0a0a0a] text-sm font-medium mb-1">Query <span class="text-[#a3a3a3] text-xs font-normal">(optional)</span></label>
            <input id="ex-query" type="text" placeholder="e.g. rate limits and authentication" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm outline-none focus:border-[#039855] placeholder:text-[#a3a3a3]" oninput="exUpdateBtn()"/>
          </div>
        </section>

        <div class="border-t border-[#dbdbdb]"></div>

        <!-- Basic settings -->
        <section class="space-y-3">
          <h2 class="text-[#0a0a0a] text-sm font-medium">Basic settings</h2>
          <div>
            <label class="ui-label">Format</label>
            <select id="ex-format" onchange="exRefreshCode()" class="ui-select">
              <option value="markdown">markdown</option>
              <option value="text">text</option>
            </select>
          </div>
          <div>
            <label class="ui-label">Max age <span class="text-[#a3a3a3] normal-case tracking-normal">(seconds)</span></label>
            <input id="ex-maxage" type="number" value="86400" min="300" onchange="exRefreshCode()" class="ui-input"/>
            <p class="text-xs text-[#a3a3a3] mt-1">Maximum age of cached content</p>
          </div>
          <div>
            <label class="ui-label">Timeout <span class="text-[#a3a3a3] normal-case tracking-normal">(seconds)</span></label>
            <input id="ex-timeout" type="number" value="30" min="1" max="60" onchange="exRefreshCode()" class="ui-input"/>
            <p class="text-xs text-[#a3a3a3] mt-1">Per-URL extraction timeout</p>
          </div>
        </section>

        <div class="border-t border-[#dbdbdb]"></div>

        <!-- Additional fields -->
        <section class="space-y-3">
          <h2 class="text-[#0a0a0a] text-sm font-medium">Additional fields</h2>
          <div class="grid grid-cols-2 gap-x-5 gap-y-2">
            <label class="flex items-center gap-2 text-[#737373] text-xs cursor-pointer">
              <input type="checkbox" id="ex-images" onchange="exRefreshCode()" class="ui-checkbox"/>
              <span>Include images</span>
            </label>
            <label class="flex items-center gap-2 text-[#737373] text-xs cursor-pointer">
              <input type="checkbox" id="ex-videos" onchange="exRefreshCode()" class="ui-checkbox"/>
              <span>Include videos</span>
            </label>
            <label class="flex items-center gap-2 text-[#737373] text-xs cursor-pointer">
              <input type="checkbox" id="ex-audio" onchange="exRefreshCode()" class="ui-checkbox"/>
              <span>Include audio</span>
            </label>
            <label class="flex items-center gap-2 text-[#737373] text-xs cursor-pointer">
              <input type="checkbox" id="ex-favicon" onchange="exRefreshCode()" class="ui-checkbox"/>
              <span>Include favicon</span>
            </label>
          </div>
        </section>

        <div class="border-t border-[#dbdbdb]"></div>

        <!-- Actions -->
        <section class="space-y-3">
          <div class="flex items-center gap-2">
            <label class="text-xs text-[#737373] uppercase tracking-wide shrink-0">Demo scenario</label>
            <select id="ex-scenario" class="flex-1 px-3 py-2 border border-[#dbdbdb] rounded-md text-xs bg-white outline-none focus:border-[#039855]">
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
          <div class="flex items-center justify-end gap-2 mt-2">
            <button type="button" id="ex-run-btn" onclick="exRun()" class="ui-btn-primary opacity-50 cursor-not-allowed">
              <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              <span>Run</span>
            </button>
            <button type="button" onclick="exClear()" class="ui-btn-outline">
              <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
              <span>Clear</span>
            </button>
          </div>
        </section>
      </div>
    </div>

    <div class="split-handle"></div>

    <!-- Right: Code & Response -->
    <div class="layout-pane min-w-[400px] flex flex-col bg-white">
      <!-- Tabs -->
      <div class="ui-tab-bar shrink-0 bg-white">
        <button id="ex-tab-req" class="ui-tab active" onclick="exTabSwitch('request')">Request</button>
        <button id="ex-tab-res" class="ui-tab inactive" onclick="exTabSwitch('response')">Response</button>
      </div>
      <div class="flex-1 flex flex-col min-h-0">
        <!-- Request pane -->
        <div id="ex-pane-request" class="flex-1 flex flex-col min-h-0">
          <div id="ex-sub-req" class="pane-sub-header">
            <div class="seg-group">
              <button id="ex-lang-py" onclick="exLang('py')" class="ex-lang seg-item active">Python</button>
              <button id="ex-lang-js" onclick="exLang('js')" class="ex-lang seg-item">JavaScript</button>
              <button id="ex-lang-curl" onclick="exLang('curl')" class="ex-lang seg-item">cURL</button>
            </div>
            <button type="button" onclick="copyCodeBlock(this)" class="ui-btn-outline">
              <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.166 5.9165C15.028 5.9165 15.8546 6.25891 16.4641 6.86841C17.0736 7.4779 17.416 8.30455 17.416 9.1665V14.1665C17.416 15.0285 17.0736 15.8551 16.4641 16.4646C15.8546 17.0741 15.028 17.4165 14.166 17.4165H9.16602C8.30406 17.4165 7.47741 17.0741 6.86792 16.4646C6.25843 15.8551 5.91602 15.0285 5.91602 14.1665V9.1665C5.91602 8.30455 6.25843 7.4779 6.86792 6.86841C7.47741 6.25891 8.30406 5.9165 9.16602 5.9165H14.166ZM9.16602 7.4165C8.70189 7.4165 8.25677 7.60088 7.92858 7.92907C7.60039 8.25726 7.41602 8.70238 7.41602 9.1665V14.1665C7.41602 15.1332 8.19935 15.9165 9.16602 15.9165H14.166C14.6301 15.9165 15.0753 15.7321 15.4035 15.4039C15.7316 15.0758 15.916 14.6306 15.916 14.1665V9.1665C15.916 8.70238 15.7316 8.25726 15.4035 7.92907C15.0753 7.60088 14.6301 7.4165 14.166 7.4165H9.16602Z" fill="currentColor" fill-opacity="0.6"/><path d="M10.834 2.5835C11.4045 2.58342 11.9651 2.73356 12.4592 3.01881C12.9534 3.30406 13.3637 3.71437 13.649 4.2085C13.7484 4.38078 13.7754 4.58551 13.7239 4.77766C13.6724 4.9698 13.5467 5.13362 13.3744 5.23308C13.2021 5.33254 12.9974 5.35948 12.8052 5.30799C12.6131 5.25649 12.4493 5.13078 12.3498 4.9585C12.1963 4.69231 11.9754 4.47127 11.7093 4.31766C11.4432 4.16404 11.1413 4.08328 10.834 4.0835H5.83398C5.60417 4.0835 5.37661 4.12876 5.16429 4.21671C4.95197 4.30465 4.75905 4.43356 4.59655 4.59606C4.43405 4.75856 4.30514 4.95148 4.2172 5.1638C4.12925 5.37612 4.08398 5.60368 4.08398 5.8335V10.8335C4.08398 11.4802 4.43398 12.046 4.95898 12.3502C5.12516 12.4526 5.24486 12.6158 5.29264 12.805C5.34043 12.9943 5.31254 13.1947 5.21489 13.3638C5.11725 13.5328 4.95755 13.6571 4.76972 13.7103C4.58189 13.7634 4.38073 13.7413 4.20898 13.6485C3.71486 13.3632 3.30455 12.9529 3.0193 12.4587C2.73405 11.9646 2.58391 11.4041 2.58398 10.8335V5.8335C2.58398 4.97154 2.92639 4.14489 3.53589 3.5354C4.14538 2.92591 4.97203 2.5835 5.83398 2.5835H10.834Z" fill="currentColor" fill-opacity="0.6"/></svg>
              <span>Copy</span>
            </button>
          </div>
          <div class="relative flex-1 flex flex-col min-h-0 bg-white overflow-hidden px-4 pb-4">
            <div id="ex-code" class="ui-code-container">
            </div>
          </div>
        </div>

        <!-- Response pane -->
        <div id="ex-pane-response" class="hidden flex-1 flex flex-col min-h-0">
          <div class="flex flex-col items-center justify-center py-12 text-[#a3a3a3]">
            <svg class="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <p class="text-xs">Run a request to see results</p>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>
`);
