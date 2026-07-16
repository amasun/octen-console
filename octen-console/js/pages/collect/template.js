// collect page template — extracted from the prototype page set.
registerPage("page-collect", `
<div id="page-collect" class="page p-4">
  <div class="grid lg:grid-cols-2 gap-4">

    <!-- Left: Configuration -->
    <div class="space-y-4">
      <div class="bg-white rounded-md border border-[#e7e7e7] p-4 space-y-4">

        <!-- Filter -->
        <section class="space-y-3">
          <h2 class="text-[#0a0a0a] text-sm font-medium">Filter</h2>
          <div>
            <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Query <span class="text-red-500">*</span></label>
            <input id="col-query" type="text" placeholder="e.g. 护肤，美妆教程" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-lg text-sm focus:outline-none placeholder:text-[#a3a3a3]"/>
            <p class="text-xs text-[#a3a3a3] mt-1">Semantic query to filter matches from the dataset</p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Start time</label>
              <input id="col-start" type="datetime-local" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">End time</label>
              <input id="col-end" type="datetime-local" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
          </div>
          <div>
            <label class="block text-[#737373] mb-2 text-xs uppercase tracking-wide">Content types</label>
            <div class="flex gap-5">
              <label class="flex items-center gap-2 text-sm text-[#737373] cursor-pointer"><input type="checkbox" id="col-type-text" checked class="w-4 h-4 rounded" style="accent-color:#039855"/> Text</label>
              <label class="flex items-center gap-2 text-sm text-[#737373] cursor-pointer"><input type="checkbox" id="col-type-image" checked class="w-4 h-4 rounded" style="accent-color:#039855"/> Image</label>
              <label class="flex items-center gap-2 text-sm text-[#737373] cursor-pointer"><input type="checkbox" id="col-type-video" class="w-4 h-4 rounded" style="accent-color:#039855"/> Video</label>
            </div>
          </div>
        </section>

        <div class="border-t border-[#f5f5f5]"></div>

        <!-- Collection settings -->
        <section class="space-y-3">
          <h2 class="text-[#0a0a0a] text-sm font-medium">Collection settings</h2>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Limit</label>
              <input id="col-limit" type="number" value="100000" min="1" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs outline-none focus:border-[#039855]"/>
            </div>
            <div>
              <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Format</label>
              <select id="col-format" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs bg-white outline-none focus:border-[#039855]">
                <option value="ndjson">NDJSON (default)</option>
                <option value="parquet">Parquet</option>
              </select>
            </div>
          </div>
        </section>

        <div class="border-t border-[#f5f5f5]"></div>

        <!-- Destination -->
        <section class="space-y-3">
          <h2 class="text-[#0a0a0a] text-sm font-medium">Destination</h2>
          <div>
            <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">S3 Destination</label>
            <select id="col-dest" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs bg-white outline-none focus:border-[#039855]">
              <option value="dst_a1b2c3d4">Production logs — s3://acme-prod-data/octen/runs/</option>
              <option value="dst_e5f6g7h8">Staging mirror — s3://acme-staging/collect/</option>
            </select>
            <p class="text-xs text-[#a3a3a3] mt-1">Configure in <a href="#" onclick="go('settings');setTimeout(()=>{const b=document.getElementById('st-tab-destinations');if(b)switchStTab('destinations',b)},0);return false" style="color:#039855">Settings → Destinations</a></p>
          </div>
          <div>
            <label class="block text-[#737373] mb-1 text-xs uppercase tracking-wide">Webhook URL <span class="text-[#a3a3a3] normal-case font-normal">(optional)</span></label>
            <input id="col-webhook" type="text" placeholder="https://your-server.com/octen-callback" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-xs outline-none focus:border-[#039855]"/>
          </div>
        </section>

        <div class="border-t border-[#f5f5f5]"></div>

        <!-- Actions -->
        <div class="flex gap-2">
          <button onclick="collectPreview()" id="col-preview-btn" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90" style="background:#039855">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            Preview
          </button>
          <button onclick="collectReset()" class="inline-flex items-center gap-2 px-4 py-2 border border-[#e7e7e7] text-[#737373] rounded-lg text-sm hover:bg-[#f5f5f5]">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M1 4v6h6M23 20v-6h-6"/><path stroke-linecap="round" stroke-linejoin="round" d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Right: Output panel (state machine) -->
    <div class="bg-white rounded-md border border-[#e7e7e7] p-4">

      <!-- idle -->
      <div id="col-state-idle" class="flex flex-col items-center justify-center py-16 text-[#a3a3a3]">
        <svg class="w-10 h-10 mb-3 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V7"/></svg>
        <p class="text-sm font-medium text-[#737373] mb-1">Ready to collect</p>
        <p class="text-xs text-center max-w-xs text-[#a3a3a3]">Enter a query and filters, then click <strong>Preview</strong> to estimate matches and price before starting.</p>
      </div>

      <!-- loading -->
      <div id="col-state-loading" class="hidden flex flex-col items-center justify-center py-12">
        <div class="w-8 h-8 border-4 border-[#e7e7e7] rounded-full mb-3" style="border-top-color:#039855;animation:spin 0.8s linear infinite"></div>
        <p class="text-xs text-[#a3a3a3]" id="col-loading-msg">Estimating matches...</p>
      </div>

      <!-- preview -->
      <div id="col-state-preview" class="hidden space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-medium text-[#0a0a0a]">Preview results</h3>
          <span class="text-xs text-[#a3a3a3]">POST /collect/preview · 3.2s</span>
        </div>
        <div class="bg-[#f5f5f5] rounded-lg p-4">
          <div class="grid grid-cols-3 gap-3 text-center">
            <div>
              <div class="text-xl font-bold text-[#0a0a0a]" id="col-est-total">—</div>
              <div class="text-xs text-[#737373] mt-0.5">Total matches</div>
            </div>
            <div>
              <div class="text-xl font-bold text-[#0a0a0a]" id="col-est-price">—</div>
              <div class="text-xs text-[#737373] mt-0.5">Est. price (USD)</div>
            </div>
            <div class="text-xs text-[#737373]" id="col-est-breakdown"></div>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-xs font-medium text-[#737373] uppercase tracking-wide">Sample matches</h4>
            <span class="text-xs text-[#a3a3a3]">Free preview · 10 records</span>
          </div>
          <div class="space-y-2 max-h-56 overflow-y-auto" id="col-samples"></div>
        </div>
        <div class="border-t border-[#f5f5f5] pt-3 flex gap-2">
          <button onclick="collectStartRun()" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-white rounded-lg text-sm font-medium hover:opacity-90" style="background:#039855">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Start collection
          </button>
          <button onclick="collectPreview()" class="px-4 py-3 border border-[#e7e7e7] text-[#737373] rounded-lg text-sm hover:bg-[#f5f5f5]">Re-preview</button>
        </div>
      </div>

      <!-- running -->
      <div id="col-state-running" class="hidden space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-[#0a0a0a]">Collection in progress</h3>
            <p class="text-xs text-[#a3a3a3] mt-0.5 font-mono" id="col-run-id">col_xxx</p>
          </div>
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500" style="animation:spin 1.2s linear infinite;box-shadow:0 0 0 2px #bfdbfe"></span>
            Processing
          </span>
        </div>
        <div class="bg-[#f5f5f5] rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-[#737373]">Matches written to S3</span>
            <span class="text-xs font-semibold text-[#0a0a0a]" id="col-progress-pct">0%</span>
          </div>
          <div class="w-full h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
            <div id="col-progress-bar" class="h-full rounded-full transition-all duration-500" style="background:#039855;width:0%"></div>
          </div>
          <div class="grid grid-cols-3 gap-2 mt-3 text-center">
            <div>
              <div class="text-sm font-semibold text-[#0a0a0a]" id="col-run-written">0</div>
              <div class="text-xs text-[#a3a3a3]">Written</div>
            </div>
            <div>
              <div class="text-sm font-semibold text-[#0a0a0a]" id="col-run-remaining">—</div>
              <div class="text-xs text-[#a3a3a3]">Remaining</div>
            </div>
            <div>
              <div class="text-sm font-semibold text-[#0a0a0a]" id="col-run-price-est">—</div>
              <div class="text-xs text-[#a3a3a3]">Est. cost</div>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 p-3 bg-[#f5f5f5] rounded-lg text-xs text-[#737373] font-mono">
          <svg class="w-4 h-4 text-[#a3a3a3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
          <span id="col-run-path">s3://acme-prod-data/octen/runs/col_xxx/</span>
        </div>
        <div class="border-t border-[#f5f5f5] pt-3 flex gap-2">
          <button onclick="collectCancel()" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
            Cancel
          </button>
          <button onclick="collectSimulatePause()" class="px-4 py-3 border border-amber-200 text-amber-700 rounded-lg text-sm hover:bg-amber-50">Simulate pause</button>
        </div>
      </div>

      <!-- paused -->
      <div id="col-state-paused" class="hidden space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-[#0a0a0a]">Collection paused</h3>
            <p class="text-xs text-[#a3a3a3] mt-0.5 font-mono" id="col-paused-id">col_xxx</p>
          </div>
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">Paused</span>
        </div>
        <div class="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <svg class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div>
            <p class="text-xs font-medium text-amber-800">Insufficient balance</p>
            <p class="text-xs text-amber-700 mt-0.5">Top up your account to resume. Task context expires <span id="col-paused-expires" class="font-medium">in 30 days</span>.</p>
          </div>
        </div>
        <div class="bg-[#f5f5f5] rounded-lg p-4 grid grid-cols-2 gap-3">
          <div><div class="text-xs text-[#737373] mb-0.5">Written so far</div><div class="text-sm font-semibold text-[#0a0a0a]" id="col-paused-written">—</div></div>
          <div><div class="text-xs text-[#737373] mb-0.5">Charged so far</div><div class="text-sm font-semibold text-[#0a0a0a]" id="col-paused-charged">—</div></div>
          <div><div class="text-xs text-[#737373] mb-0.5">Remaining matches</div><div class="text-sm font-semibold text-[#0a0a0a]" id="col-paused-remaining">—</div></div>
          <div><div class="text-xs text-[#737373] mb-0.5">Remaining cost</div><div class="text-sm font-semibold text-[#0a0a0a]" id="col-paused-rem-price">—</div></div>
        </div>
        <div class="border-t border-[#f5f5f5] pt-3 flex gap-2">
          <button onclick="collectResume()" class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-white rounded-lg text-sm font-medium hover:opacity-90" style="background:#039855">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Resume collection
          </button>
          <button onclick="go('billing')" class="px-4 py-3 border border-[#e7e7e7] text-[#737373] rounded-lg text-sm hover:bg-[#f5f5f5]">Top up →</button>
        </div>
      </div>

      <!-- completed -->
      <div id="col-state-completed" class="hidden space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-[#0a0a0a]">Collection completed</h3>
            <p class="text-xs text-[#a3a3a3] mt-0.5 font-mono" id="col-done-id">col_xxx</p>
          </div>
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            Completed
          </span>
        </div>
        <div class="bg-[#f5f5f5] rounded-lg p-4">
          <div class="grid grid-cols-3 gap-3 text-center">
            <div>
              <div class="text-xl font-bold text-[#0a0a0a]" id="col-done-total">—</div>
              <div class="text-xs text-[#737373] mt-0.5">Matches written</div>
            </div>
            <div>
              <div class="text-xl font-bold text-[#0a0a0a]" id="col-done-price">—</div>
              <div class="text-xs text-[#737373] mt-0.5">Total charged</div>
            </div>
            <div class="text-xs text-[#737373]" id="col-done-breakdown"></div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex items-center justify-between p-3 bg-[#f5f5f5] rounded-lg">
            <div><p class="text-xs text-[#a3a3a3] mb-0.5">Data path</p><p class="text-xs font-mono text-[#737373]" id="col-done-path">—</p></div>
            <button onclick="toast('Path copied')" class="p-1.5 rounded hover:bg-[#f5f5f5]"><svg class="w-3.5 h-3.5 text-[#a3a3a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg></button>
          </div>
          <div class="flex items-center justify-between p-3 bg-[#f5f5f5] rounded-lg">
            <div><p class="text-xs text-[#a3a3a3] mb-0.5">Manifest</p><p class="text-xs font-mono text-[#737373]" id="col-done-manifest">—</p></div>
            <button onclick="toast('Path copied')" class="p-1.5 rounded hover:bg-[#f5f5f5]"><svg class="w-3.5 h-3.5 text-[#a3a3a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg></button>
          </div>
        </div>
        <div class="border-t border-[#f5f5f5] pt-3">
          <button onclick="collectReset()" class="w-full px-4 py-3 border border-[#e7e7e7] text-[#737373] rounded-lg text-sm hover:bg-[#f5f5f5]">New collection</button>
        </div>
      </div>

      <!-- canceled -->
      <div id="col-state-canceled" class="hidden space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-medium text-[#0a0a0a]">Collection canceled</h3>
            <p class="text-xs text-[#a3a3a3] mt-0.5 font-mono" id="col-cancel-id">col_xxx</p>
          </div>
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#f5f5f5] text-[#737373] border border-[#e7e7e7]">Canceled</span>
        </div>
        <div class="bg-[#f5f5f5] rounded-lg p-4 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div><div class="text-xs text-[#737373] mb-0.5">Matches written</div><div class="text-sm font-semibold text-[#0a0a0a]" id="col-cancel-written">—</div></div>
            <div><div class="text-xs text-[#737373] mb-0.5">Charged</div><div class="text-sm font-semibold text-[#0a0a0a]" id="col-cancel-price">—</div></div>
          </div>
          <p class="text-xs text-[#a3a3a3]">Data already written to S3 is preserved. Only successfully written matches are charged.</p>
        </div>
        <div class="flex items-center gap-2 p-3 bg-[#f5f5f5] rounded-lg text-xs text-[#737373] font-mono">
          <svg class="w-4 h-4 text-[#a3a3a3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
          <span id="col-cancel-path">—</span>
        </div>
        <div class="border-t border-[#f5f5f5] pt-3">
          <button onclick="collectReset()" class="w-full px-4 py-3 border border-[#e7e7e7] text-[#737373] rounded-lg text-sm hover:bg-[#f5f5f5]">New collection</button>
        </div>
      </div>

    </div><!-- /right panel -->
  </div>
</div>
`);
