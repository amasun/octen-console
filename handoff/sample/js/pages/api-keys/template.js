// api-keys page template — extracted from the prototype page set.
registerPage("page-api-keys", `
<div id="page-api-keys" class="page max-w-7xl mx-auto p-4">
  <div class="mb-6">
    <h1 class="text-[#0a0a0a] text-2xl font-semibold mb-2">API keys</h1>
    <p class="text-[#737373]">Create and manage API keys. Keep keys private and rotate them regularly.</p>
  </div>

  <!-- Payment method notice (matches original design) -->
  <div id="ak-nopayment-notice" class="mb-6 px-5 py-4 rounded-xl flex items-center gap-3 border border-[#e7e7e7] bg-[#f5f5f5]">
    <svg class="w-4 h-4 shrink-0 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
    <p class="text-sm text-[#737373] flex-1">Add a payment method to activate your API keys. Free credits included.</p>
    <a href="#" onclick="go('billing');return false" class="shrink-0 text-sm font-medium hover:underline" style="color:#039855">Add payment method →</a>
  </div>


  <!-- Tabs + Create button on same row -->
  <div class="border-b border-[#e7e7e7]/60 mb-6 flex items-end">
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
    <div class="bg-white rounded-lg border border-[#e7e7e7] p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-[#0a0a0a] text-base font-medium">API keys</h2>
        <div class="text-xs text-[#737373]" id="ak-count">Keys: — / 100</div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-[#e7e7e7]">
              <th class="text-left py-3 px-4 text-[#737373]">Name</th>
              <th class="text-left py-3 px-4 text-[#737373]">Key</th>
              <!-- [ORG NEW] 归属列 -->
              <th class="text-left py-3 px-4 text-[#737373]" id="ak-th-owner">Owner</th>
              <th class="text-left py-3 px-4 text-[#737373]">Created</th>
              <th class="text-left py-3 px-4 text-[#737373]">QPS limit</th>
              <th class="text-right py-3 px-4 text-[#737373]">Actions</th>
            </tr>
          </thead>
          <tbody id="ak-tbody"></tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Service Keys tab -->
  <div id="ak-pane-svc" class="hidden">
    <div class="bg-white rounded-lg border border-[#e7e7e7] p-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h2 class="text-[#0a0a0a] text-base font-medium mb-1">Service Keys</h2>
          <p class="text-[#737373] text-sm">Used for Organization management API, such as provisioning members and managing keys programmatically. <a href="https://docs.octen.ai/api-reference/service-keys" target="_blank" rel="noreferrer" class="font-medium hover:underline" style="color:#039855">View docs →</a></p>
        </div>
        <div class="text-xs text-[#737373] shrink-0" id="svc-count">Keys: 1 / 10</div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-[#e7e7e7]">
              <th class="text-left py-3 px-4 text-[#737373]">Name</th>
              <th class="text-left py-3 px-4 text-[#737373]">Key</th>
              <th class="text-left py-3 px-4 text-[#737373]">Created</th>
              <th class="text-right py-3 px-4 text-[#737373]">Actions</th>
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

`);
