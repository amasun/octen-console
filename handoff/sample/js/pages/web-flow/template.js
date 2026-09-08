// web-flow page template — extracted from the prototype page set.
registerPage("page-web-flow", `
<div id="page-web-flow" class="page max-w-7xl mx-auto p-4">

  <!-- Header bar -->
  <div class="bg-white border border-[#e7e7e7] rounded-lg px-5 py-4 mb-4">
    <div class="flex items-center justify-between gap-4">
      <!-- Left: Title + Status -->
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-3">
          <div id="wf-title-empty" class="">
            <h1 class="text-[#0a0a0a] text-lg font-semibold">Web Flow</h1>
          </div>
          <div id="wf-title-active" class="hidden flex items-center gap-2 min-w-0">
            <h1 class="text-[#0a0a0a] text-lg font-semibold truncate" id="wf-flow-name">Tech News Monitor</h1>
            <button onclick="wfEditName()" class="p-1 hover:bg-[#f5f5f5] rounded">
              <svg class="w-4 h-4 text-[#a3a3a3]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
            <span id="wf-status-badge" class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Saved</span>
            <span id="wf-mode-badge" class="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">Incremental</span>
            <span id="wf-dirty" class="hidden text-xs text-orange-600 font-medium">· Unsaved changes</span>
          </div>
        </div>
        <p id="wf-empty-desc" class="text-xs text-[#737373] mt-1">Define a repeatable batch delivery rule. Preview a sample first, then save and run via API.</p>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2 flex-shrink-0">
        <button onclick="wfNewFlow()" class="inline-flex items-center gap-2 px-3 py-2 border border-[#dbdbdb] bg-white hover:bg-[#f5f5f5] rounded-md text-xs font-medium transition-colors">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          New Flow
        </button>
        <div class="relative">
          <button onclick="wfToggleDrop('examples')" class="inline-flex items-center gap-2 px-3 py-2 border border-[#dbdbdb] bg-white hover:bg-[#f5f5f5] rounded-md text-xs font-medium transition-colors">
            Examples
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div id="wf-examples-drop" class="hidden absolute right-0 top-full mt-2 w-80 bg-white border border-[#e7e7e7] rounded-md shadow-lg z-20 max-h-96 overflow-y-auto">
            <div class="p-2 space-y-1">
              <button onclick="wfLoadExample('General Web Pretraining', 'Broad web content delivery for LLM pretraining (batch, low QPS).', 'general', '', 'one_time')" class="w-full text-left p-3 hover:bg-[#f5f5f5] rounded-md transition-colors">
                <div class="font-medium text-sm text-[#0a0a0a]">General Web Pretraining</div>
                <div class="text-xs text-[#737373] mt-1">Broad web content delivery for LLM pretraining (batch, low QPS).</div>
              </button>
              <button onclick="wfLoadExample('Finance Filings Monitor', 'Incremental delivery of newly crawled SEC filings.', 'finance', 'SEC filings', 'incremental')" class="w-full text-left p-3 hover:bg-[#f5f5f5] rounded-md transition-colors">
                <div class="font-medium text-sm text-[#0a0a0a]">Finance Filings Monitor</div>
                <div class="text-xs text-[#737373] mt-1">Incremental delivery of newly crawled SEC filings.</div>
              </button>
              <button onclick="wfLoadExample('Medical Research Database', 'Curated medical research for healthcare AI workflows.', 'health', 'clinical guidelines', 'one_time')" class="w-full text-left p-3 hover:bg-[#f5f5f5] rounded-md transition-colors">
                <div class="font-medium text-sm text-[#0a0a0a]">Medical Research Database</div>
                <div class="text-xs text-[#737373] mt-1">Curated medical research for healthcare AI workflows.</div>
              </button>
            </div>
          </div>
        </div>
        <div class="relative">
          <button onclick="wfToggleDrop('saved')" class="inline-flex items-center gap-2 px-3 py-2 border border-[#dbdbdb] bg-white hover:bg-[#f5f5f5] rounded-md text-xs font-medium transition-colors">
            Saved Flows
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div id="wf-saved-drop" class="hidden absolute right-0 top-full mt-2 w-96 bg-white border border-[#e7e7e7] rounded-md shadow-lg z-20 max-h-96 overflow-y-auto">
            <div class="p-2 space-y-1">
              <button onclick="wfLoadSaved('Tech News Monitor', 'general', 'AI breakthrough', 'incremental')" class="w-full text-left p-3 hover:bg-[#f5f5f5] rounded-md transition-colors">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0 flex-1">
                    <div class="font-medium text-sm text-[#0a0a0a] truncate">Tech News Monitor</div>
                    <div class="flex items-center gap-2 text-xs text-[#737373] mt-1">
                      <span class="px-2 py-1 rounded bg-blue-100 text-blue-700">Incremental</span>
                      <span>·</span>
                      <span>general</span>
                    </div>
                  </div>
                  <div class="text-xs text-[#a3a3a3]">2d ago</div>
                </div>
              </button>
              <button onclick="wfLoadSaved('Finance Data Collection', 'finance', '', 'one_time')" class="w-full text-left p-3 hover:bg-[#f5f5f5] rounded-md transition-colors">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0 flex-1">
                    <div class="font-medium text-sm text-[#0a0a0a] truncate">Finance Data Collection</div>
                    <div class="flex items-center gap-2 text-xs text-[#737373] mt-1">
                      <span class="px-2 py-1 rounded bg-[#f5f5f5] text-[#737373]">One-time</span>
                      <span>·</span>
                      <span>finance</span>
                    </div>
                  </div>
                  <div class="text-xs text-[#a3a3a3]">1w ago</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty state -->
  <div id="wf-empty-state" class="bg-white rounded-lg border border-[#e7e7e7] p-12 text-center">
    <svg class="w-12 h-12 text-[#a3a3a3] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8m-8 6h16"/><circle cx="18" cy="12" r="3"/></svg>
    <p class="text-[#737373] text-sm font-medium mb-1">Get started with Web Flow</p>
    <p class="text-[#737373] text-xs mb-5">Create a new flow, choose an example, or load a saved flow.</p>
    <div class="flex items-center justify-center gap-2">
      <button onclick="wfNewFlow()" class="inline-flex items-center gap-2 px-4 py-2 text-white rounded-md text-xs font-medium" style="background:#039855">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
        New Flow
      </button>
    </div>
  </div>

  <!-- Builder -->
  <div id="wf-builder" class="hidden bg-white rounded-lg border border-[#e7e7e7] p-5 mb-4">
    <div class="space-y-4">
      <!-- Query -->
      <div>
        <label class="block text-xs font-medium text-[#737373] mb-2">Query <span class="text-[#a3a3a3] font-normal">(optional)</span></label>
        <input type="text" id="wf-query" placeholder="Optional. Leave empty for filter-only delivery." class="ui-input"/>
        <p class="text-xs text-[#737373] mt-1">Flow must have at least one effective constraint: Query, Domains, or Crawled time range.</p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <!-- Topic -->
        <div>
          <label class="block text-xs font-medium text-[#737373] mb-2">Topic</label>
          <select id="wf-topic" class="ui-select">
            <option value="general">General</option>
            <option value="finance">Finance</option>
            <option value="health">Health</option>
            <option value="legal">Legal</option>
            <option value="academic">Academic</option>
          </select>
          <p class="text-xs text-[#737373] mt-1">Default is General (required).</p>
        </div>

        <!-- Crawled Time Range -->
        <div>
          <label class="block text-xs font-medium text-[#737373] mb-2">Crawled Time Range <span class="text-[#a3a3a3] font-normal">(optional)</span></label>
          <select id="wf-time" onchange="wfTimeChange()" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-sm bg-white focus:outline-none focus:border-[#039855]">
            <option value="any">Any time</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="180d">Last 180 days</option>
            <option value="custom">Custom range</option>
          </select>
          <p id="wf-time-incremental-hint" class="hidden text-xs text-amber-700 mt-1">Incremental requires a non-empty time window.</p>
        </div>
      </div>

      <!-- Advanced -->
      <div class="pt-3 border-t border-[#e7e7e7]">
        <button onclick="wfToggleAdvanced()" class="flex items-center gap-2 text-xs font-semibold text-[#0a0a0a] hover:opacity-80 mb-3">
          Advanced Filters
          <svg id="wf-adv-chevron" class="w-3.5 h-3.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div id="wf-advanced" class="hidden grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-[#737373] mb-2">Language</label>
            <select class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-sm bg-white focus:outline-none focus:border-[#039855]">
              <option value="auto">Auto</option>
              <option value="en">English</option>
              <option value="zh">Chinese</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
            <p class="text-xs text-[#737373] mt-1">Auto means no language restriction.</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-[#737373] mb-2">Safety</label>
            <select class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-sm bg-white focus:outline-none focus:border-[#039855]">
              <option value="strict">Strict (recommended)</option>
              <option value="off">Off</option>
            </select>
            <p class="text-xs text-[#737373] mt-1">Strict filters unsafe content.</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-[#737373] mb-2">Run limit <span class="text-[#a3a3a3] font-normal">(docs per run)</span></label>
            <input type="number" value="1000" min="1" max="5000" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-sm focus:outline-none focus:border-[#039855]"/>
            <p class="text-xs text-[#737373] mt-1">Maps to <code class="bg-[#f5f5f5] rounded px-1">run.limit</code>. Recommended 1–5000.</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-[#737373] mb-2">Domains</label>
            <div class="flex gap-2">
              <select class="px-2 py-2 border border-[#e7e7e7] rounded-md text-sm bg-white focus:outline-none focus:border-[#039855]">
                <option>Include</option>
                <option>Exclude</option>
              </select>
              <input type="text" placeholder="sec.gov, example.com" class="flex-1 px-3 py-2 border border-[#e7e7e7] rounded-md text-sm focus:outline-none focus:border-[#039855]"/>
            </div>
            <p class="text-xs text-[#737373] mt-1">Domain only (no path/regex). Include max 300, exclude max 150.</p>
          </div>
          <div class="col-span-2">
            <label class="block text-xs font-medium text-[#737373] mb-2">Refresh mode</label>
            <div class="flex items-center gap-4">
              <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="wf-refresh" value="one_time" checked onchange="wfSetRefresh('one_time')" style="accent-color:#039855"/>
                One-time
              </label>
              <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="wf-refresh" value="incremental" onchange="wfSetRefresh('incremental')" style="accent-color:#039855"/>
                Incremental
              </label>
              <span class="text-xs text-[#737373]">Incremental returns only new/updated content since last delivery cursor.</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 pt-3 border-t border-[#e7e7e7]">
        <button onclick="wfRunPreview()" class="inline-flex items-center gap-2 px-4 py-2 text-white rounded-md text-xs font-medium hover:opacity-90" style="background:#039855">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          Preview sample
        </button>
        <button onclick="openModal('m-wf-settings')" class="inline-flex items-center gap-2 px-4 py-2 border border-[#dbdbdb] bg-white text-[#737373] rounded-md text-xs font-medium hover:bg-[#f5f5f5]">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save
        </button>
      </div>
    </div>
  </div>

  <!-- Preview Result -->
  <div id="wf-preview" class="hidden">
    <div class="bg-white rounded-lg border border-[#e7e7e7] px-4 py-3 mb-4">
      <div class="flex items-center justify-between text-xs">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <span class="text-[#737373]">Preview sample:</span>
            <span class="font-semibold text-[#0a0a0a]">2 docs</span>
          </div>
          <div class="text-xs text-[#a3a3a3]">ⓘ Preview returns snippet only. Run via API to deliver content & cursor.</div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg border border-[#e7e7e7] p-5 space-y-3">
      <div class="border-b border-[#f5f5f5] pb-3">
        <a href="#" class="text-sm font-medium text-[#0a0a0a] hover:underline">Breakthrough in Neural Network Architecture Announced</a>
        <div class="text-xs text-[#737373] mt-1">example.com · Jan 6, 2026 · article</div>
        <p class="text-xs text-[#737373] mt-2">Researchers announced a new neural architecture surpassing previous benchmarks…</p>
      </div>
      <div>
        <a href="#" class="text-sm font-medium text-[#0a0a0a] hover:underline">Stock Markets Rally on Positive Economic Data</a>
        <div class="text-xs text-[#737373] mt-1">finance.example.com · Jan 6, 2026 · news</div>
        <p class="text-xs text-[#737373] mt-2">Markets gained after encouraging economic indicators…</p>
      </div>
    </div>
  </div>

</div>

<!-- Web Flow Settings dialog -->
<div id="m-wf-settings" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-2xl p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Flow Settings</h2>
      <button onclick="closeModal('m-wf-settings')" class="p-1 rounded hover:bg-[#f5f5f5]"><svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
    </div>
    <p class="text-xs text-[#737373] mb-5">Saving updates the Flow definition. Future runs will follow the latest saved configuration.</p>

    <div class="space-y-5">
      <div>
        <label class="block text-xs font-medium text-[#737373] mb-2">Name</label>
        <input id="wf-settings-name" type="text" value="Tech News Monitor" class="w-full px-3 py-2 border border-[#e7e7e7] rounded-md text-sm focus:outline-none focus:border-[#039855]"/>
      </div>

      <div>
        <label class="block text-xs font-medium text-[#737373] mb-2">Refresh Mode</label>
        <div class="space-y-2">
          <label class="flex items-start gap-3 border border-[#e7e7e7] rounded-lg p-3 cursor-pointer hover:border-[#dbdbdb] has-[:checked]:border-[#039855] has-[:checked]:bg-[#0398550a]">
            <input type="radio" name="wf-settings-refresh" value="one_time" checked class="mt-0.5" style="accent-color:#039855"/>
            <div>
              <div class="text-sm font-medium text-[#0a0a0a]">One-time</div>
              <div class="text-xs text-[#737373] mt-0.5">Each run delivers a full batch based on current filters (no cursor state).</div>
            </div>
          </label>
          <label class="flex items-start gap-3 border border-[#e7e7e7] rounded-lg p-3 cursor-pointer hover:border-[#dbdbdb] has-[:checked]:border-[#039855] has-[:checked]:bg-[#0398550a]">
            <input type="radio" name="wf-settings-refresh" value="incremental" class="mt-0.5" style="accent-color:#039855"/>
            <div>
              <div class="text-sm font-medium text-[#0a0a0a]">Incremental</div>
              <div class="text-xs text-[#737373] mt-0.5">Returns only newly crawled or updated documents since last delivery cursor. Requires a non-empty crawled time window.</div>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label class="block text-xs font-medium text-[#737373] mb-2">Change Summary</label>
        <div class="bg-[#f5f5f5] border border-[#e7e7e7] rounded-md p-3 text-xs text-[#737373]">
          <ul class="space-y-1">
            <li>• Query changed</li>
            <li>• Crawled time range changed</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3 mt-6 pt-5 border-t border-[#e7e7e7]">
      <button onclick="closeModal('m-wf-settings')" class="px-4 py-2 border border-[#e7e7e7] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="wfSaveFlow()" class="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90" style="background:#039855">Save Flow</button>
    </div>
  </div>
</div>

`);
