window.pageHtml = window.pageHtml || {};
window.pageHtml["page-broad-search-api"] = `<div id="page-broad-search-api" class="page h-full">
  <div class="layout-columns cols-2 h-full min-h-0">
    <!-- Left: Parameters -->
    <div class="layout-pane min-w-[400px] flex flex-col min-h-0">
      <!-- Configuration header -->
      <div class="flex items-center justify-between shrink-0 px-4 pt-4 pb-2 border-b border-transparent">
        <h2 class="text-[#0a0a0a] font-semibold text-lg">Configuration</h2>
        <a href="#" onclick="return false" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-[#dbdbdb] text-[#737373] rounded-md text-xs hover:bg-slate-50">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          <span>Docs</span>
        </a>
      </div>
      <div class="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        <!-- Query -->
        <section>
          <label class="block text-[#0a0a0a] text-sm font-medium mb-2">Query<span class="text-red-500 ml-0.5">*</span></label>
          <div id="bsa-query-box" class="border border-[#dbdbdb] rounded-lg px-3 pt-2.5 pb-2 transition-colors focus-within:border-[#039855]">
            <textarea id="bsa-query" rows="2" placeholder="" class="w-full border-0 outline-none resize-none text-sm text-[#0a0a0a] placeholder:text-[#a3a3a3] leading-relaxed bg-transparent"></textarea>
            <div class="flex items-center justify-end gap-2 mt-1">
              <button type="button" onclick="bsaClear()" class="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#dbdbdb] text-[#737373] rounded-lg text-xs hover:bg-slate-50 whitespace-nowrap">
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
          <h2 class="text-[#0a0a0a] text-sm font-medium">Basic settings</h2>
          <div>
            <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Max queries</label>
            <input type="number" id="bsa-maxq" min="1" max="20" value="5" class="w-full px-2.5 py-1.5 border border-[#dbdbdb] rounded-md text-xs outline-none focus:border-[#039855]"/>
            <p class="text-xs text-[#737373] mt-1">Number of sub-queries to expand and run in parallel.</p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Topic</label>
              <select id="bsa-topic" class="w-full px-2.5 py-1.5 border border-[#dbdbdb] rounded-md text-xs bg-white outline-none focus:border-[#039855]">
                <option value="general">general</option><option value="news" selected>news</option>
              </select>
            </div>
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Max results</label>
              <input type="number" id="bsa-count" min="1" max="100" value="10" class="w-full px-2.5 py-1.5 border border-[#dbdbdb] rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
        </section>

        <div class="border-t border-slate-100"></div>

        <!-- Filters -->
        <section class="space-y-3">
          <h2 class="text-[#0a0a0a] text-sm font-medium">Filters</h2>
          <div class="grid grid-cols-2 gap-3 items-start">
            <div>
              <label class="block text-[#737373] text-xs uppercase tracking-wide mb-1">Time basis</label>
              <div id="bsa-tb-pills" class="inline-flex items-stretch rounded-[6px] border border-[#dbdbdb] p-px text-xs overflow-hidden">
                <button type="button" class="bsa-tb px-[10px] py-[4px] border-r border-[#dbdbdb]" data-tb="auto" style="background:#0398551a;color:#039855;font-weight:500">Auto</button>
                <button type="button" class="bsa-tb px-[10px] py-[4px] border-r border-[#dbdbdb] bg-white text-[#737373]" data-tb="published">Published</button>
                <button type="button" class="bsa-tb px-[10px] py-[4px] bg-white text-[#737373]" data-tb="crawled">Crawled</button>
              </div>
            </div>
            <div class="relative">
              <label class="block text-[#737373] text-xs uppercase tracking-wide mb-1">Date range</label>
              <button type="button" id="bsa-date-btn" onclick="bsaDateToggle()" class="w-full flex items-center gap-2 px-2.5 py-1.5 border border-[#dbdbdb] rounded-lg text-xs bg-white outline-none focus:border-[#039855]">
                <svg class="w-3.5 h-3.5 text-[#a3a3a3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path stroke-linecap="round" d="M16 2v4M8 2v4M3 10h18"/></svg>
                <span id="bsa-date-label" class="text-[#a3a3a3]">Custom range</span>
              </button>
              <div id="bsa-date-pop" style="display:none;position:absolute;top:calc(100% + 6px);right:0;z-index:60;background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 12px 32px rgba(15,23,42,0.16);padding:14px;gap:12px;width:max-content;max-width:90vw"></div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Domain filters</label>
              <textarea id="bsa-include" rows="3" placeholder="e.g. octen.ai (one per line)" class="w-full px-2.5 py-1.5 border border-[#dbdbdb] rounded-md text-xs outline-none focus:border-[#039855] resize-none"></textarea>
            </div>
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Exclude domains</label>
              <textarea id="bsa-exclude" rows="3" placeholder="e.g. octen.ai (one per line)" class="w-full px-2.5 py-1.5 border border-[#dbdbdb] rounded-md text-xs outline-none focus:border-[#039855] resize-none"></textarea>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Include text</label>
              <input type="text" id="bsa-inctext" placeholder="Phrase to include (&le; 5 words)" class="w-full px-2.5 py-1.5 border border-[#dbdbdb] rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Exclude text</label>
              <input type="text" id="bsa-exctext" placeholder="Phrase to exclude (&le; 5 words)" class="w-full px-2.5 py-1.5 border border-[#dbdbdb] rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
          <!-- hidden state for custom range start/end (set via calendar) -->
          <input type="hidden" id="bsa-start"/><input type="hidden" id="bsa-end"/>
        </section>

        <div class="border-t border-slate-100"></div>

        <!-- Output options (within search_options) -->
        <section class="space-y-4">
          <h2 class="text-[#0a0a0a] text-sm font-medium">Output options</h2>
          <!-- highlight -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <label class="flex items-center gap-2 text-[#0a0a0a] text-xs font-medium cursor-pointer">
                <input type="checkbox" id="bsa-hl" checked class="w-4 h-4 rounded border-slate-300" style="accent-color:#039855"/>
                <span>Return highlights</span>
              </label>
              <p class="text-xs text-[#737373] ml-6 mt-1">Extract query-relevant highlights from the content.</p>
            </div>
            <div id="bsa-hl-wrap" class="shrink-0">
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Highlights max tokens</label>
              <input type="number" id="bsa-hl-tokens" min="1" value="256" class="w-28 px-2.5 py-1.5 border border-[#dbdbdb] rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
          <!-- full_content -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
              <label class="flex items-center gap-2 text-[#0a0a0a] text-xs font-medium cursor-pointer">
                <input type="checkbox" id="bsa-fc" class="w-4 h-4 rounded border-slate-300" style="accent-color:#039855"/>
                <span>Return full content</span>
              </label>
              <p class="text-xs text-[#737373] ml-6 mt-1">Billed via full_content_max_tokens.</p>
            </div>
            <div id="bsa-fc-wrap" class="shrink-0 hidden">
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Full content max tokens</label>
              <input type="number" id="bsa-fc-tokens" min="1" value="2048" class="w-28 px-2.5 py-1.5 border border-[#dbdbdb] rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
          <!-- media toggles -->
          <div class="grid grid-cols-2 gap-2">
            <label class="flex items-center gap-2 text-[#0a0a0a] text-xs font-medium cursor-pointer"><input type="checkbox" id="bsa-images" class="w-4 h-4 rounded border-slate-300" style="accent-color:#039855"/><span>Include images</span></label>
            <label class="flex items-center gap-2 text-[#0a0a0a] text-xs font-medium cursor-pointer"><input type="checkbox" id="bsa-videos" class="w-4 h-4 rounded border-slate-300" style="accent-color:#039855"/><span>Include videos</span></label>
          </div>
          <!-- safesearch -->
          <div>
            <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Safesearch</label>
            <select id="bsa-safesearch" class="w-full px-2.5 py-1.5 border border-[#dbdbdb] rounded-md text-xs bg-white outline-none focus:border-[#039855]">
              <option value="off">off</option><option value="moderate">moderate</option><option value="strict">strict</option>
            </select>
          </div>
        </section>
      </div>
    </div>
  
  <div class="split-handle"></div>

  <!-- Right: Code & Response -->
  <div class="layout-pane min-w-[400px] flex flex-col">
        <div class="border-b border-[#dbdbdb] flex gap-4 items-start shrink-0 px-4 pt-1">
          <button id="bsa-tab-req" class="px-1 py-1.5 text-sm font-medium text-[#0a0a0a] border-b-[1.5px] border-slate-900 transition-colors" onclick="bsaTab('request')">Request</button>
          <button id="bsa-tab-res" class="px-1 py-1.5 text-sm font-medium text-[#737373] border-b-[1.5px] border-transparent hover:text-[#737373] transition-colors" onclick="bsaTab('response')">Response</button>
        </div>
        <div class="p-4 flex-1 flex flex-col min-h-0">
          <!-- Request pane -->
          <!-- Request pane -->
          <div id="bsa-pane-request" class="flex-1 flex flex-col min-h-0">
            <div class="flex items-center justify-between shrink-0">
              <div class="flex p-1 bg-[#f5f5f5] rounded-[10px] text-xs">
                <button type="button" class="bsa-lang px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-white shadow text-[#0a0a0a]" data-l="python" onclick="bsaSetLang('python')">Python</button>
                <button type="button" class="bsa-lang px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-transparent text-[#737373] hover:text-[#0a0a0a] hover:bg-[#e5e5e5]" data-l="javascript" onclick="bsaSetLang('javascript')">JavaScript</button>
                <button type="button" class="bsa-lang px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-transparent text-[#737373] hover:text-[#0a0a0a] hover:bg-[#e5e5e5]" data-l="curl" onclick="bsaSetLang('curl')">cURL</button>
              </div>
              <button type="button" onclick="bsaCopyReq()" id="bsa-copyreq" class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#dbdbdb] bg-white text-[#737373] hover:bg-slate-50 text-xs shadow-sm transition-colors">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                <span>Copy</span>
              </button>
            </div>
            <div class="relative flex-1 flex flex-col min-h-0 bg-white rounded-lg overflow-hidden">
              <div id="bsa-code" class="flex-1 flex flex-col min-h-0"></div>
            </div>
          </div>
          <!-- Response pane -->
          <div id="bsa-pane-response" class="hidden flex-1 flex flex-col min-h-0">
            <div class="flex items-center justify-between shrink-0">
              <div class="flex p-1 bg-[#f5f5f5] rounded-[10px] text-xs">
                <button id="bsa-rt-preview" class="px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-white shadow text-[#0a0a0a]" onclick="bsaRtab('preview')">Preview</button>
                <button id="bsa-rt-json" class="px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer bg-transparent text-[#737373] hover:text-[#0a0a0a] hover:bg-[#e5e5e5]" onclick="bsaRtab('json')">JSON</button>
              </div>
              <span id="bsa-meta" class="text-xs text-[#a3a3a3] px-2"></span>
            </div>
            <div id="bsa-resp-body" class="relative bg-white rounded-lg flex-1 flex flex-col min-h-0 overflow-auto">
              <div class="flex-1 flex flex-col items-center justify-center py-12 text-[#a3a3a3]">
                <svg class="w-[36px] h-[36px] mb-2 shrink-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.2059 21.9674C29.2158 21.9191 29.285 21.9191 29.2949 21.9674C29.8082 24.4792 31.7711 26.4421 34.2829 26.9554C34.3312 26.9653 34.3312 27.0345 34.2829 27.0444C31.7711 27.5577 29.8082 29.5206 29.2949 32.0324C29.285 32.0808 29.2158 32.0808 29.2059 32.0324C28.6926 29.5206 26.7297 27.5577 24.2179 27.0444C24.1695 27.0345 24.1695 26.9653 24.2179 26.9554C26.7297 26.4421 28.6926 24.4792 29.2059 21.9674Z" stroke="#039855" stroke-width="2.25"/>
<path d="M22.0791 15.5641C22.1729 15.1049 22.829 15.1049 22.9228 15.5641C23.1301 16.5783 23.9227 17.3708 24.9368 17.5781C25.396 17.6719 25.396 18.328 24.9368 18.4219C23.9227 18.6291 23.1301 19.4217 22.9228 20.4358C22.829 20.895 22.1729 20.895 22.0791 20.4358C21.8718 19.4217 21.0792 18.6291 20.0651 18.4219C19.6059 18.328 19.6059 17.6719 20.0651 17.5781C21.0792 17.3708 21.8718 16.5783 22.0791 15.5641Z" fill="#039855"/>
<path d="M5.25 13.35H4.125V13.35H5.25ZM10.2789 30.5737L10.6347 31.641L10.6347 31.641L10.2789 30.5737ZM17.3433 31.1764L16.8046 30.1888V30.1888L17.3433 31.1764ZM20.0387 30.9876C20.5842 30.6901 20.7852 30.0067 20.4876 29.4613C20.1901 28.9158 19.5067 28.7148 18.9613 29.0124L19.5 30L20.0387 30.9876ZM29.625 17.25C29.625 17.8713 30.1287 18.375 30.75 18.375C31.3713 18.375 31.875 17.8713 31.875 17.25H30.75H29.625ZM13.5095 31.0063L12.8855 31.9424H12.8855L13.5095 31.0063ZM5.25001 28.0951L4.12501 28.0951L4.12501 28.0978L5.25001 28.0951ZM9.19172 30.9361L9.54486 32.0042L9.54747 32.0034L9.19172 30.9361ZM8.52606 4.40396L8.01532 3.40158L8.52606 4.40396ZM5.90396 7.02606L6.90634 7.5368L6.90634 7.5368L5.90396 7.02606ZM27.4739 4.40396L27.9847 3.40158V3.40158L27.4739 4.40396ZM30.096 7.02606L31.0984 6.51532V6.51532L30.096 7.02606ZM12.75 10.125C12.1287 10.125 11.625 10.6287 11.625 11.25C11.625 11.8713 12.1287 12.375 12.75 12.375V11.25V10.125ZM23.25 12.375C23.8713 12.375 24.375 11.8713 24.375 11.25C24.375 10.6287 23.8713 10.125 23.25 10.125V11.25V12.375ZM12.75 16.875C12.1287 16.875 11.625 17.3787 11.625 18C11.625 18.6213 12.1287 19.125 12.75 19.125V18V16.875ZM15.375 19.125C15.9963 19.125 16.5 18.6213 16.5 18C16.5 17.3787 15.9963 16.875 15.375 16.875V18V19.125ZM21.15 3.75V2.625H14.85V3.75V4.875H21.15V3.75ZM17.3433 31.1764L17.882 32.164L20.0387 30.9876L19.5 30L18.9613 29.0124L16.8046 30.1888L17.3433 31.1764ZM30.75 17.25H31.875V13.35H30.75H29.625V17.25H30.75ZM10.2789 30.5737L10.6347 31.641C11.3913 31.3888 12.2219 31.5 12.8855 31.9424L13.5095 31.0063L14.1335 30.0703C12.8922 29.2427 11.3384 29.0347 9.92316 29.5064L10.2789 30.5737ZM5.25001 28.0951L4.12501 28.0978C4.13188 30.9049 6.87968 32.8854 9.54486 32.0042L9.19172 30.9361L8.83857 29.8679C7.62713 30.2685 6.37813 29.3682 6.37501 28.0923L5.25001 28.0951ZM14.85 3.75V2.625C13.1884 2.625 11.8746 2.62413 10.8176 2.71048C9.74752 2.79791 8.84208 2.98032 8.01532 3.40158L8.52606 4.40396L9.0368 5.40634C9.49351 5.17364 10.0699 5.02907 11.0008 4.95301C11.9449 4.87587 13.1513 4.875 14.85 4.875V3.75ZM5.25 13.35H6.375C6.375 11.6513 6.37587 10.4449 6.45301 9.50082C6.52907 8.56988 6.67364 7.99351 6.90634 7.5368L5.90396 7.02606L4.90158 6.51532C4.48032 7.34208 4.29791 8.24752 4.21048 9.3176C4.12413 10.3746 4.125 11.6884 4.125 13.35H5.25ZM8.52606 4.40396L8.01532 3.40158C6.67466 4.08468 5.58468 5.17466 4.90158 6.51532L5.90396 7.02606L6.90634 7.5368C7.37373 6.61951 8.11951 5.87373 9.0368 5.40634L8.52606 4.40396ZM13.5095 31.0063L12.8855 31.9424C14.3804 32.939 16.3047 33.0244 17.882 32.164L17.3433 31.1764L16.8046 30.1888C15.9614 30.6487 14.9327 30.603 14.1335 30.0703L13.5095 31.0063ZM21.15 3.75V4.875C22.8487 4.875 24.0551 4.87587 24.9992 4.95301C25.9301 5.02907 26.5065 5.17364 26.9632 5.40634L27.4739 4.40396L27.9847 3.40158C27.1579 2.98032 26.2525 2.79791 25.1824 2.71048C24.1254 2.62413 22.8116 2.625 21.15 2.625V3.75ZM30.75 13.35H31.875C31.875 11.6884 31.8759 10.3746 31.7895 9.3176C31.7021 8.24752 31.5197 7.34208 31.0984 6.51532L30.096 7.02606L29.0937 7.5368C29.3264 7.99351 29.4709 8.56988 29.547 9.50082C29.6241 10.4449 29.625 11.6513 29.625 13.35H30.75ZM27.4739 4.40396L26.9632 5.40634C27.8805 5.87373 28.6263 6.61951 29.0937 7.5368L30.096 7.02606L31.0984 6.51532C30.4153 5.17466 29.3253 4.08468 27.9847 3.40158L27.4739 4.40396ZM12.75 11.25V12.375H23.25V11.25V10.125H12.75V11.25ZM12.75 18V19.125H15.375V18V16.875H12.75V18ZM5.25 13.35H4.125L4.12501 28.0951L5.25001 28.0951H6.37501L6.375 13.35L5.25 13.35ZM9.19172 30.9361L9.54747 32.0034L10.6347 31.641L10.2789 30.5737L9.92317 29.5064L8.83597 29.8688L9.19172 30.9361Z" fill="#A3A3A3"/>
</svg>
                <p class="text-sm">Run a query to see expanded queries &amp; parallel results</p>
              </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="page-broad-search" class="page active" style="padding:0">
  <div id="bs-root" style="margin:0;height:100vh;display:flex;flex-direction:column;background:#fbfcfb"></div>
</div></div>`;
