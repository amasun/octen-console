registerPage("page-billing", `<div id="page-billing" class="page max-w-7xl mx-auto p-4">
  <!-- 🆕 Postpaid page-top banner (80% / overdue / suspended) -->
  <div id="billing-postpaid-banner" class="hidden mb-6 px-4 py-3.5 rounded-xl flex items-start gap-3 border">
    <svg id="bpb-icon" class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <p id="bpb-text" class="flex-1 text-sm"></p>
    <button id="bpb-action" onclick="openModal('m-recharge')" class="hidden shrink-0 px-3.5 py-1.5 rounded-lg text-sm font-medium text-white hover:opacity-90" style="background:#dc2626">Pay now</button>
  </div>

  <div class="mb-8">
    <h1 class="text-slate-900 text-2xl font-semibold">Billing</h1>
  </div>

  <!-- ① Balance hero (full-width) -->
  <div class="mb-6">
  <div class="rounded-xl p-8 text-white relative overflow-hidden" style="background:linear-gradient(180deg,#0c1f1a 0%,#122a22 50%,#0f3d2e 100%)">
    <div class="absolute inset-0 opacity-30"><svg width="100%" height="100%"><defs><pattern id="dots2" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.8" fill="#039855"/></pattern></defs><rect width="100%" height="100%" fill="url(#dots2)"/></svg></div>
    <div class="absolute top-0 right-0 w-96 h-96 opacity-20" style="background:radial-gradient(circle at center,#039855 0%,transparent 60%)"></div>
    <!-- ⚠️ Prepaid hero -->
    <div id="billing-hero-prepaid" class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <p id="billing-balance-label" class="text-green-100 mb-2 text-sm">Current balance</p>
        <h2 class="text-white text-4xl font-semibold mb-4">\$125.50</h2>
        <div class="flex flex-wrap gap-2 text-xs">
          <span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-green-50"><span class="w-1.5 h-1.5 rounded-full bg-green-300"></span>Pay as you go · Active</span>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-green-50"><span class="w-1.5 h-1.5 rounded-full bg-green-300"></span>QPS · Free · up to 50</span>
        </div>
      </div>
      <div id="billing-owner-btns" class="flex flex-col items-start md:items-end gap-2">
        <button onclick="openModal('m-recharge')" class="px-6 py-2.5 bg-white rounded-lg text-sm font-medium transition-colors hover:bg-green-50" style="color:#039855">Add credits</button>
      </div>
    </div>

    <!-- ⚠️🆕 Postpaid hero — credit usage is the primary metric, broken into its two components -->
    <div id="billing-hero-postpaid" class="hidden relative z-10">
      <div class="flex flex-col lg:flex-row lg:items-stretch gap-6">
        <!-- Left: credit usage + breakdown -->
        <div class="min-w-0 flex-1">
          <div class="flex items-baseline justify-between gap-3 mb-2">
            <p class="text-green-100 text-sm">Amount owed</p>
            <span id="bp-status-chip" class="inline-flex items-center rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs text-green-50">Invoiced billing · active</span>
          </div>
          <h2 class="text-white text-4xl font-semibold mb-3"><span id="bp-owed">\$3,723.50</span> <span class="text-green-200/70 text-2xl font-normal">/ <span id="bp-limit">\$5,000.00</span> limit</span></h2>
          <!-- progress bar -->
          <div class="w-full h-2.5 rounded-full overflow-hidden bg-white/15">
            <div id="bp-bar" class="h-full rounded-full transition-all" style="width:74%;background:#22c55e"></div>
          </div>
          <p id="bp-bar-label" class="text-green-100/80 text-xs mt-1.5 mb-4">74% used · \$1,276.50 of \$5,000.00 remaining</p>

          <!-- Breakdown: what makes up the amount owed -->
          <div class="rounded-lg bg-white/5 border border-white/10 divide-y divide-white/10">
            <div id="bp-unpaid-row" class="flex items-center justify-between gap-3 px-3.5 py-3">
              <div class="min-w-0">
                <div class="text-sm text-white font-medium">Unpaid invoice</div>
                <div id="bp-unpaid-sub" class="text-[11px] text-green-100/70 mt-0.5">INV-2026-05 · due Jul 1</div>
              </div>
              <div class="flex items-center gap-3 shrink-0">
                <span id="bp-unpaid-amt" class="text-sm font-semibold text-white tabular-nums">\$1,820.40</span>
                <button id="bp-pay-invoice-btn" onclick="openModal('m-recharge')" class="px-3 py-1.5 bg-white rounded-md text-xs font-medium hover:bg-green-50 transition-colors" style="color:#039855">Pay invoice</button>
              </div>
            </div>
            <div id="bp-cycle-row" class="flex items-center justify-between gap-3 px-3.5 py-3">
              <div class="min-w-0">
                <div class="text-sm text-white font-medium">Current cycle <span class="text-[11px] font-normal text-green-100/60">(not yet invoiced)</span></div>
                <div class="text-[11px] text-green-100/70 mt-0.5">Bills Jul 1 · not payable yet</div>
              </div>
              <span id="bp-cycle-amt" class="text-sm font-semibold text-white/90 tabular-nums shrink-0">\$1,903.10</span>
            </div>
            <!-- First-month / fresh state: no unpaid invoice and no usage yet -->
            <div id="bp-breakdown-empty" class="hidden px-3.5 py-4 text-center text-[13px] text-green-100/70">
              No charges yet. This cycle bills on Jul 1.
            </div>
          </div>
        </div>

        <!-- Right: prepaid balance + account actions -->
        <div id="billing-postpaid-btns" class="shrink-0 w-full lg:w-72 flex flex-col gap-4 lg:border-l lg:border-white/10 lg:pl-6">
          <div>
            <div class="flex items-center gap-1.5 mb-1">
              <svg class="w-4 h-4 text-green-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="13" rx="2"/><path d="M16 12h.01M2 10h20"/></svg>
              <p class="text-green-100 text-sm">Prepaid balance</p>
            </div>
            <div class="text-white text-3xl font-semibold tabular-nums"><span id="bp-balance-amt">\$125.50</span></div>
            <p id="bp-balance-note" class="text-[11px] text-green-100/70 mt-1">Auto-applied to your next invoice (Jul 1)</p>
          </div>
          <div class="mt-auto flex flex-col gap-2">
            <button id="bp-add-credits-btn" onclick="openModal('m-recharge')" class="w-full px-5 py-2 rounded-lg text-sm font-medium bg-white hover:bg-green-50 transition-colors" style="color:#039855">Add credits</button>
            <span class="inline-flex items-center justify-center rounded-lg bg-white/5 border border-white/15 px-3 py-1.5 text-xs text-green-50">QPS Plan · Pro · 100</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>

  <!-- 🆕 Postpaid settlement info bar -->
  <div id="billing-settlement-bar" class="hidden -mt-2 mb-6 px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2 text-sm text-slate-600">
    <svg class="w-4 h-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    <span id="bp-settlement-text">Next invoice: <span class="font-medium text-slate-900">Jul 1, 2026</span> (est. <span class="font-medium text-slate-900">\$1,903.10</span>) · NET 30</span>
  </div>

  <!-- ② Payment method warning (No card state) -->
  <div id="billing-payment-warning" class="mb-8 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg">
    <div class="flex items-start gap-3">
      <svg class="w-5 h-5 shrink-0 mt-0.5 text-orange-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      <p class="flex-1 text-slate-700 text-sm">A payment method is required to use the API.</p>
      <button class="text-sm font-medium shrink-0 hover:underline" style="color:#039855">Add payment method →</button>
    </div>
  </div>

  <!-- ③ Spend + Pay as you go + Plan (3 equal cols) -->
  <div class="grid lg:grid-cols-3 gap-6 mb-6 items-stretch">
    <!-- Spend this month -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 h-full flex flex-col transition-all hover:border-slate-300 hover:shadow-sm">
      <div class="flex items-start justify-between gap-4 mb-4">
        <h2 id="billing-spend-title" class="text-slate-900 text-base font-semibold">Spend this month</h2>
        <div class="text-slate-900 text-lg font-semibold tabular-nums">\$189.47</div>
      </div>
      <!-- Stacked bar — all products visible -->
      <div class="mb-4"><div class="w-full h-2 rounded-md overflow-hidden bg-slate-100 flex">
        <div style="width:4.8%;background:#a855f7" title="Broad Search"></div>
        <div style="width:5.9%;background:#14b8a6" title="Web Search"></div>
        <div style="width:3.0%;background:#d946ef" title="Image Search"></div>
        <div style="width:1.0%;background:#eab308" title="Video Search"></div>
        <div style="width:2.9%;background:#3b82f6" title="Extract"></div>
        <div style="width:9.4%;background:#f43f5e" title="Model"></div>
        <div style="width:2.0%;background:#f59e0b" title="Embedding"></div>
        <div style="width:0.3%;background:#06b6d4" title="VL Embedding"></div>
        <div style="width:36.8%;background:#6366f1" title="Collect"></div>
        <div style="width:4.6%;background:#039855" title="Answer"></div>
        <div style="width:6.4%;background:#8b5cf6" title="Deep Research"></div>
        <div style="width:22.8%;background:#ec4899" title="Multimodal Chat"></div>
      </div></div>

      <!-- Tabs -->
      <div class="flex items-center gap-1 mb-3 border-b border-slate-200 -mx-6 px-6">
        <button data-spend-tab="search" class="spend-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors" style="color:#039855;border-color:#039855">Search <span class="text-xs text-slate-400 ml-0.5 font-normal tabular-nums">\$23.24</span></button>
        <button data-spend-tab="content" class="spend-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors text-slate-500 border-transparent hover:text-slate-700">Content <span class="text-xs text-slate-400 ml-0.5 font-normal tabular-nums">\$62.50</span></button>
        <button data-spend-tab="models" class="spend-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors text-slate-500 border-transparent hover:text-slate-700">Models <span class="text-xs text-slate-400 ml-0.5 font-normal tabular-nums">\$18.53</span></button>
        <button data-spend-tab="apps" class="spend-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors text-slate-500 border-transparent hover:text-slate-700">Apps <span class="text-xs text-slate-400 ml-0.5 font-normal tabular-nums">\$85.20</span></button>
      </div>

      <div class="flex-1">
        <!-- Search panel -->
        <div data-spend-panel="search" class="spend-panel space-y-2">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#a855f7"></span><div class="min-w-0"><span class="text-slate-700 text-sm">Broad Search</span><span class="text-xs text-slate-400 ml-1.5">4.8%</span><p class="text-xs text-slate-400 mt-0.5">3,000 sub-queries · 1.5M full content tokens</p></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$7.50</div>
          </div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#14b8a6"></span><div class="min-w-0"><span class="text-slate-700 text-sm">Web Search</span><span class="text-xs text-slate-400 ml-1.5">5.9%</span><p class="text-xs text-slate-400 mt-0.5">4,500 calls · 300k full content tokens</p></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$9.30</div>
          </div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#d946ef"></span><div class="min-w-0"><span class="text-slate-700 text-sm">Image Search</span><span class="text-xs text-slate-400 ml-1.5">3.0%</span><p class="text-xs text-slate-400 mt-0.5">960 calls · 5.8k images</p></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$4.80</div>
          </div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#eab308"></span><div class="min-w-0"><span class="text-slate-700 text-sm">Video Search</span><span class="text-xs text-slate-400 ml-1.5">1.0%</span><p class="text-xs text-slate-400 mt-0.5">328 calls · 1.3k videos</p></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$1.64</div>
          </div>
        </div>

        <!-- Data panel -->
        <div data-spend-panel="content" class="spend-panel hidden space-y-2">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#3b82f6"></span><div class="min-w-0"><span class="text-slate-700 text-sm">Extract</span><span class="text-xs text-slate-400 ml-1.5">2.9%</span><p class="text-xs text-slate-400 mt-0.5">4,500 URLs</p></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$4.50</div>
          </div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#6366f1"></span><div class="min-w-0"><span class="text-slate-700 text-sm">Collect</span><span class="text-xs text-slate-400 ml-1.5">36.8%</span><p class="text-xs text-slate-400 mt-0.5">29k matches (text 19k · image 7k · video 3k)</p></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$58.00</div>
          </div>
        </div>

        <!-- Models panel -->
        <div data-spend-panel="models" class="spend-panel hidden space-y-2">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#f43f5e"></span><div class="min-w-0"><span class="text-slate-700 text-sm">Model</span><span class="text-xs text-slate-400 ml-1.5">9.4%</span><p class="text-xs text-slate-400 mt-0.5">1.1M tokens · 92 image &amp; video gen</p></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$14.80</div>
          </div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#f59e0b"></span><div class="min-w-0"><span class="text-slate-700 text-sm">Embedding</span><span class="text-xs text-slate-400 ml-1.5">2.0%</span><p class="text-xs text-slate-400 mt-0.5">46M tokens</p></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$3.23</div>
          </div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#06b6d4"></span><div class="min-w-0"><span class="text-slate-700 text-sm">VL Embedding</span><span class="text-xs text-slate-400 ml-1.5">0.3%</span><p class="text-xs text-slate-400 mt-0.5">2M image · video tokens</p></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$0.50</div>
          </div>
        </div>

        <!-- Apps panel -->
        <div data-spend-panel="apps" class="spend-panel hidden space-y-2">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#039855"></span><div class="min-w-0"><span class="text-slate-700 text-sm">Answer</span><span class="text-xs text-slate-400 ml-1.5">4.6%</span></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$7.20</div>
          </div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#8b5cf6"></span><div class="min-w-0"><span class="text-slate-700 text-sm">Deep Research</span><span class="text-xs text-slate-400 ml-1.5">6.3%</span></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$10.00</div>
          </div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#ec4899"></span><div class="min-w-0"><span class="text-slate-700 text-sm">Multimodal Chat</span><span class="text-xs text-slate-400 ml-1.5">22.8%</span></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$36.00</div>
          </div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-2 min-w-0"><span class="mt-1.5 inline-block w-2 h-2 rounded-sm shrink-0" style="background:#a16207"></span><div class="min-w-0"><span class="text-slate-700 text-sm">Grounded Generation</span><span class="text-xs text-slate-400 ml-1.5">20.3%</span></div></div>
            <div class="text-slate-900 text-sm font-medium tabular-nums shrink-0">\$32.00</div>
          </div>
        </div>
      </div>

      <button onclick="go('usage')" class="text-xs text-left mt-4 hover:opacity-80" style="color:#039855">View spend details in Usage →</button>
      <p id="billing-spend-note" class="hidden text-xs text-slate-400 mt-1 pt-2 border-t border-slate-100">Updated daily · final amounts per your monthly invoice.</p>
    </div>

    <!-- Pay as you go -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 h-full flex flex-col relative">
      <span class="absolute right-4 top-4 rounded-full text-xs font-medium px-2 py-0.5" style="background:#0398551a;color:#039855">Active</span>
      <h2 class="text-slate-900 mb-3 text-base font-semibold">Pay as you go</h2>

      <!-- Discount entry (opens modal) -->
      <button type="button" onclick="openModal('m-discount')" class="flex items-center justify-between w-full mb-3 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
        <span class="flex items-center gap-2 text-sm text-slate-700">
          <svg class="w-4 h-4" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 14l6-6M9.5 9.5h.01M14.5 14.5h.01M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z"/></svg>
          Your discounts
          <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium" style="background:#0398551a;color:#039855">3 APIs</span>
        </span>
        <span class="text-xs font-medium" style="color:#039855">View →</span>
      </button>

      <!-- Tabs -->
      <div class="flex items-center gap-1 mb-4 border-b border-slate-200 -mx-6 px-6">
        <button data-payg-tab="search" class="payg-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors" style="color:#039855;border-color:#039855">Search</button>
        <button data-payg-tab="content" class="payg-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors text-slate-500 border-transparent hover:text-slate-700">Content</button>
        <button data-payg-tab="models" class="payg-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors text-slate-500 border-transparent hover:text-slate-700">Models</button>
        <button data-payg-tab="apps" class="payg-tab px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors text-slate-500 border-transparent hover:text-slate-700">Apps</button>
      </div>

      <!-- Search panel -->
      <div data-payg-panel="search" class="payg-panel flex-1">
        <div class="grid gap-y-2 gap-x-6 items-baseline" style="grid-template-columns:auto auto 1fr">
          <span class="text-sm text-slate-600">Broad Search</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums">\$2.00</span>
          <span class="text-xs text-slate-500">/ 1k sub-queries</span>

          <span></span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums">\$0.001</span>
          <span class="text-xs text-slate-500">/ 1k full content tokens</span>

          <span class="text-sm text-slate-600 pt-2 border-t border-slate-100">Web Search</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums pt-2 border-t border-slate-100">\$2.00</span>
          <span class="text-xs text-slate-500 pt-2 border-t border-slate-100">/ 1k calls</span>

          <span></span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums">\$0.001</span>
          <span class="text-xs text-slate-500">/ 1k full content tokens</span>

          <span class="text-sm text-slate-600 pt-2 border-t border-slate-100">Image Search</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums pt-2 border-t border-slate-100">\$5.00</span>
          <span class="text-xs text-slate-500 pt-2 border-t border-slate-100">/ 1k calls</span>

          <span class="text-sm text-slate-600 pt-2 border-t border-slate-100">Video Search</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums pt-2 border-t border-slate-100">\$5.00</span>
          <span class="text-xs text-slate-500 pt-2 border-t border-slate-100">/ 1k calls</span>
        </div>
      </div>

      <!-- Content panel -->
      <div data-payg-panel="content" class="payg-panel hidden flex-1">
        <div class="grid gap-y-2 gap-x-6 items-baseline" style="grid-template-columns:auto auto 1fr">
          <span class="text-sm text-slate-600">Extract</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums">\$1.00</span>
          <span class="text-xs text-slate-500">/ 1k URLs</span>

          <span class="text-sm text-slate-600 pt-2 border-t border-slate-100">Collect</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums pt-2 border-t border-slate-100">Custom</span>
          <span class="text-xs text-slate-500 pt-2 border-t border-slate-100">Contact sales</span>
        </div>
      </div>

      <!-- Models panel -->
      <div data-payg-panel="models" class="payg-panel hidden flex-1">
        <div class="grid gap-y-2 gap-x-6 items-baseline" style="grid-template-columns:auto auto 1fr">
          <span class="text-sm text-slate-600">Model</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums">\$1 ~ \$25</span>
          <span class="text-xs text-slate-500">/ 1M tokens</span>

          <span class="text-sm text-slate-600 pt-2 border-t border-slate-100">Embedding</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums pt-2 border-t border-slate-100">\$0.01 ~ \$0.07</span>
          <span class="text-xs text-slate-500 pt-2 border-t border-slate-100">/ 1M tokens</span>

          <span class="text-sm text-slate-600 pt-2 border-t border-slate-100">VL Embedding</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums pt-2 border-t border-slate-100">\$0.10</span>
          <span class="text-xs text-slate-500 pt-2 border-t border-slate-100">/ 1M text tokens</span>

          <span></span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums">\$0.25</span>
          <span class="text-xs text-slate-500">/ 1M image · video tokens</span>
        </div>
      </div>

      <!-- Apps panel -->
      <div data-payg-panel="apps" class="payg-panel hidden flex-1">
        <div class="grid gap-y-2 gap-x-6 items-baseline" style="grid-template-columns:auto auto 1fr">
          <span class="text-sm text-slate-600">Answer</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums">\$2.00</span>
          <span class="text-xs text-slate-500">/ 1k calls</span>

          <span class="text-sm text-slate-600 pt-2 border-t border-slate-100">Deep Research</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums pt-2 border-t border-slate-100">\$0.20</span>
          <span class="text-xs text-slate-500 pt-2 border-t border-slate-100">Lite</span>

          <span></span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums">\$1.00</span>
          <span class="text-xs text-slate-500">Standard</span>

          <span></span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums">\$2.50</span>
          <span class="text-xs text-slate-500">Pro</span>

          <span class="text-sm text-slate-600 pt-2 border-t border-slate-100">Multimodal Chat</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums pt-2 border-t border-slate-100">\$5.00</span>
          <span class="text-xs text-slate-500 pt-2 border-t border-slate-100">/ 1k queries</span>

          <span></span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums">\$2.00</span>
          <span class="text-xs text-slate-500">/ 1M prompt</span>

          <span></span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums">\$12.00</span>
          <span class="text-xs text-slate-500">/ 1M completion</span>

          <span class="text-sm text-slate-600 pt-2 border-t border-slate-100">Grounded Generation</span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums pt-2 border-t border-slate-100">\$0.25</span>
          <span class="text-xs text-slate-500 pt-2 border-t border-slate-100">/ image</span>

          <span></span>
          <span class="text-sm font-semibold text-slate-900 tabular-nums">\$1.00</span>
          <span class="text-xs text-slate-500">/ video</span>
          <span style="grid-column:1/-1" class="text-xs text-slate-400 pt-3 mt-1 border-t border-slate-100">Answer also bills underlying model tokens at model rates.</span>
        </div>
      </div>

      <!-- Footer: plan type + unified pricing link -->
      <div class="mt-4 pt-3 border-t border-slate-100">
        <button onclick="document.getElementById('billing-chat-pricing').classList.toggle('hidden');document.getElementById('billing-embed-pricing').classList.toggle('hidden')" class="inline-flex items-center gap-1 text-xs font-medium hover:opacity-80" style="color:#039855">View full pricing →</button>
      </div>

    </div>

    <!-- Plan card (3rd col) -->
    <div class="bg-white rounded-lg border border-slate-200 p-6 flex flex-col relative">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h2 class="text-slate-900 text-base font-semibold">QPS Plan</h2>
        </div>
        <span class="rounded-full text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200">Current plan</span>
      </div>
      <div class="flex items-baseline justify-between mb-3">
        <span class="text-slate-900 text-sm font-medium">Free</span>
        <p class="text-slate-900 text-lg font-semibold tabular-nums"><span class="text-sm font-normal text-slate-500">Up to</span> 50 <span class="text-sm font-normal text-slate-500">QPS</span></p>
      </div>
      <p class="text-sm text-slate-600 mb-4">Upgrade to unlock guaranteed throughput and SLA.</p>
      <div class="pt-4 border-t border-slate-200 mt-auto">
        <button onclick="openModal('m-qps-upgrade')" class="w-full px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90" style="background:#039855">Upgrade plan</button>
      </div>
    </div>

  </div>

  <!-- Chat pricing (collapsible) -->
  <div id="billing-chat-pricing" class="hidden bg-white rounded-lg border border-slate-200 p-6 mb-6">
    <div class="flex items-start justify-between gap-4 mb-5">
      <div><h2 class="text-slate-900 font-medium">Model pricing</h2><p class="text-slate-600 text-sm mt-0.5">Used by direct Model API and by Applications (Answer, Deep Research). All prices per 1M tokens. Cache write shows 5-minute / 1-hour tiers (≈1.25× / 2× input).</p></div>
      <button onclick="document.getElementById('billing-chat-pricing').classList.add('hidden')" class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">▴ Hide</button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm" style="min-width:680px"><thead><tr class="border-b border-slate-200">
        <th class="text-left py-2 pr-4 text-slate-500 font-normal text-xs">Model</th>
        <th class="text-right py-2 px-3 text-slate-500 font-normal text-xs">Input</th>
        <th class="text-right py-2 px-3 text-slate-500 font-normal text-xs">Output</th>
        <th class="text-right py-2 px-3 text-slate-500 font-normal text-xs">Cache read</th>
        <th class="text-right py-2 pl-3 text-slate-500 font-normal text-xs">Cache write</th>
      </tr></thead><tbody id="billing-model-rows"></tbody></table>
    </div>
    <p class="text-xs text-slate-400 mt-3">Cache write tiers: Anthropic requires explicit cache writes; Google &amp; OpenAI cache automatically; Qwen supports auto or manual writes; MiniMax has no caching.</p>
    <div class="mt-6">
      <h3 class="text-slate-800 text-sm font-medium mb-1">Image generation models</h3>
      <p class="text-slate-600 text-xs mb-3">All prices per 1M tokens. Image output is the primary cost; text / image input billed separately where supported.</p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" style="min-width:620px"><thead><tr class="border-b border-slate-200">
          <th class="text-left py-2 pr-4 text-slate-500 font-normal text-xs">Model</th>
          <th class="text-right py-2 px-3 text-slate-500 font-normal text-xs">Text in</th>
          <th class="text-right py-2 px-3 text-slate-500 font-normal text-xs">Text out</th>
          <th class="text-right py-2 px-3 text-slate-500 font-normal text-xs">Image in</th>
          <th class="text-right py-2 pl-3 text-slate-500 font-normal text-xs">Image out</th>
        </tr></thead><tbody><tr class="border-b border-slate-50"><td class="py-2.5 pr-4 text-slate-900 font-mono text-xs">openai/gpt-image-2</td><td class="py-2.5 px-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$5.00</td><td class="py-2.5 px-3 text-right text-slate-900 font-medium tabular-nums text-xs">—</td><td class="py-2.5 px-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$8.00</td><td class="py-2.5 pl-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$30.00</td></tr><tr class="border-b border-slate-50"><td class="py-2.5 pr-4 text-slate-900 font-mono text-xs">openai/gpt-image-1-mini</td><td class="py-2.5 px-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$2.00</td><td class="py-2.5 px-3 text-right text-slate-900 font-medium tabular-nums text-xs">—</td><td class="py-2.5 px-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$2.50</td><td class="py-2.5 pl-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$8.00</td></tr><tr class="border-b border-slate-50"><td class="py-2.5 pr-4 text-slate-900 font-mono text-xs">google/gemini-3-pro-image</td><td class="py-2.5 px-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$2.00</td><td class="py-2.5 px-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$12.00</td><td class="py-2.5 px-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$2.00</td><td class="py-2.5 pl-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$120.00</td></tr><tr class=""><td class="py-2.5 pr-4 text-slate-900 font-mono text-xs">google/gemini-3.1-flash-image</td><td class="py-2.5 px-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$0.50</td><td class="py-2.5 px-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$3.00</td><td class="py-2.5 px-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$0.50</td><td class="py-2.5 pl-3 text-right text-slate-900 font-medium tabular-nums text-xs">\$60.00</td></tr></tbody></table>
      </div>
    </div>
  </div>

  <!-- Embedding pricing (collapsible) -->
  <div id="billing-embed-pricing" class="hidden bg-white rounded-lg border border-slate-200 p-6 mb-6">
    <div class="flex items-start justify-between gap-4 mb-5">
      <div><h2 class="text-slate-900 font-medium">Embedding pricing</h2><p class="text-slate-600 text-sm mt-0.5">Billed per 1,000 tokens. Text and Vision-Language embeddings are priced separately.</p></div>
      <button onclick="document.getElementById('billing-embed-pricing').classList.add('hidden')" class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">▴ Hide</button>
    </div>
    <!-- Embedding -->
    <div class="mb-5">
      <div class="mb-2"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" style="background:#f59e0b1a;color:#b45309">Embedding</span></div>
      <table class="w-full text-sm"><thead><tr class="border-b border-slate-100"><th class="text-left py-2 pr-4 text-slate-500 font-normal text-xs">Model</th><th class="text-right py-2 px-4 text-slate-500 font-normal text-xs">Price (USD / 1M tokens)</th><th class="text-right py-2 pl-4 text-slate-500 font-normal text-xs">Best For</th></tr></thead><tbody>
      <tr class="border-b border-slate-50"><td class="py-2.5 pr-4 text-slate-900 font-mono text-xs">octen-embedding-8b</td><td class="py-2.5 px-4 text-right text-slate-900 font-medium tabular-nums text-xs">\$0.07</td><td class="py-2.5 pl-4 text-right text-slate-500 text-xs">Best accuracy</td></tr>
      <tr class="border-b border-slate-50"><td class="py-2.5 pr-4 text-slate-900 font-mono text-xs">octen-embedding-4b</td><td class="py-2.5 px-4 text-right text-slate-900 font-medium tabular-nums text-xs">\$0.04</td><td class="py-2.5 pl-4 text-right text-slate-500 text-xs">Balanced performance and cost</td></tr>
      <tr><td class="py-2.5 pr-4 text-slate-900 font-mono text-xs">octen-embedding-0.6b</td><td class="py-2.5 px-4 text-right text-slate-900 font-medium tabular-nums text-xs">\$0.01</td><td class="py-2.5 pl-4 text-right text-slate-500 text-xs">High-volume and low-cost</td></tr>
      </tbody></table>
    </div>
    <!-- VL Embedding -->
    <div class="mb-5">
      <div class="mb-2"><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" style="background:#06b6d41a;color:#0e7490">VL Embedding</span></div>
      <p class="text-xs text-slate-500 mb-2">Billed by input tokens. Text and multimodal (image / video) inputs are priced differently.</p>
      <table class="w-full text-sm"><thead><tr class="border-b border-slate-100"><th class="text-left py-2 pr-4 text-slate-500 font-normal text-xs">Model</th><th class="text-right py-2 px-4 text-slate-500 font-normal text-xs">Text (USD / 1M)</th><th class="text-right py-2 pl-4 text-slate-500 font-normal text-xs">Image / Video (USD / 1M)</th></tr></thead><tbody>
      <tr class="border-b border-slate-50"><td class="py-2.5 pr-4 text-slate-900 font-mono text-xs">octen-vl-embedding</td><td class="py-2.5 px-4 text-right text-slate-900 font-medium tabular-nums text-xs">\$0.10</td><td class="py-2.5 pl-4 text-right text-slate-900 font-medium tabular-nums text-xs">\$0.25</td></tr>
      <tr><td class="py-2.5 pr-4 text-slate-900 font-mono text-xs">octen-vl-embedding-large</td><td class="py-2.5 px-4 text-right text-slate-900 font-medium tabular-nums text-xs">\$0.10</td><td class="py-2.5 pl-4 text-right text-slate-900 font-medium tabular-nums text-xs">\$0.25</td></tr>
      </tbody></table>
    </div>
  </div>

  <!-- Auto Recharge -->
  <div id="billing-auto-recharge" class="bg-white rounded-lg border border-slate-200 p-6 mb-8">
    <div class="flex items-center justify-between gap-4">
      <div><h2 class="text-slate-900 font-medium mb-1">Auto recharge</h2><p class="text-slate-600 text-sm">Automatically top up your balance when it falls below a threshold.</p></div>
      <div class="flex items-center gap-3">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" id="tog-auto-recharge" class="sr-only peer">
          <div class="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-[#039855] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
        </label>
        <span class="text-xs text-slate-500">Off</span>
      </div>
    </div>
  </div>

  <!-- Payment Methods -->
  <div id="billing-payment-methods" class="bg-white rounded-lg border border-slate-200 p-6 mb-8">
    <div class="flex items-center justify-between">
      <div><h2 class="text-slate-900 font-medium">Payment methods</h2><p id="billing-payment-note" class="hidden text-slate-500 text-sm mt-1">Settlement: monthly invoice · NET 30.</p></div>
      <button id="billing-add-payment-btn" onclick="handlePaymentMethodAction()" class="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm hover:opacity-90" style="background:#039855">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
        Add
      </button>
    </div>

    <!-- Cards list (shown when hasPayment) — read-only display, all management via Stripe -->
    <div id="billing-payment-cards" class="hidden mt-4">
      <div class="rounded-lg border border-slate-200 divide-y divide-slate-100">
        <!-- Card 1 — Visa default -->
        <div class="flex items-center justify-between px-4 py-3">
          <div class="flex items-center gap-3 min-w-0">
            <div class="shrink-0 w-9 h-9 rounded-md flex items-center justify-center" style="background:#1a1f71">
              <span class="text-white text-[10px] font-bold tracking-wider italic">VISA</span>
            </div>
            <div class="min-w-0 flex items-center gap-2 flex-wrap">
              <span class="text-sm font-medium text-slate-900">Visa debit</span>
              <span class="text-sm text-slate-500 tabular-nums">•••• 1876</span>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium" style="background:#f1f5f9;color:#475569">
                <svg class="w-3 h-3" style="color:#039855" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                Default
              </span>
            </div>
          </div>
          <span class="text-xs text-slate-500 shrink-0">Valid until 11/2030</span>
        </div>
        <!-- Card 2 — UnionPay (non-default) -->
        <div class="flex items-center justify-between px-4 py-3">
          <div class="flex items-center gap-3 min-w-0">
            <div class="shrink-0 w-9 h-9 rounded-md flex items-center justify-center" style="background:#0f172b">
              <span class="text-white text-[10px] font-bold tracking-wider">UPI</span>
            </div>
            <div class="min-w-0 flex items-center gap-2 flex-wrap">
              <span class="text-sm font-medium text-slate-900">Unionpay credit</span>
              <span class="text-sm text-slate-500 tabular-nums">•••• 4986</span>
            </div>
          </div>
          <span class="text-xs text-slate-500 shrink-0">Valid until 12/2028</span>
        </div>
      </div>
    </div>

    <div id="billing-no-payment-text" class="mt-4 text-slate-600 text-sm">No payment method added. Add one to start using the API.</div>
  </div>

  <!-- Invoices -->
  <div class="bg-white rounded-lg border border-slate-200 p-6 mb-16">
    <h2 class="text-slate-900 mb-6 font-medium">Invoices</h2>
    <!-- Prepaid invoices (receipts) -->
    <table id="billing-invoices-prepaid" class="w-full text-sm"><thead><tr class="border-b border-slate-200"><th class="text-left py-3 px-4 text-slate-700">Invoice #</th><th class="text-left py-3 px-4 text-slate-700">Period</th><th class="text-left py-3 px-4 text-slate-700">Amount</th><th class="text-left py-3 px-4 text-slate-700">Status</th><th class="text-right py-3 px-4 text-slate-700">Actions</th></tr></thead><tbody>
      <tr class="border-b border-slate-100"><td class="py-4 px-4 text-slate-900">INV-2025-12</td><td class="py-4 px-4 text-slate-600">2025-12-01 ~ 2025-12-31</td><td class="py-4 px-4 text-slate-900">\$89.20</td><td class="py-4 px-4"><span class="px-3 py-1 rounded-full text-xs bg-slate-100 text-slate-600 border border-slate-200">Paid</span></td><td class="py-4 px-4 text-right"><button onclick="toast('Invoice downloaded')" class="inline-flex items-center gap-2 hover:opacity-80" style="color:#039855"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download</button></td></tr>
      <tr><td class="py-4 px-4 text-slate-900">INV-2025-11</td><td class="py-4 px-4 text-slate-600">2025-11-01 ~ 2025-11-30</td><td class="py-4 px-4 text-slate-900">\$42.30</td><td class="py-4 px-4"><span class="px-3 py-1 rounded-full text-xs bg-slate-100 text-slate-600 border border-slate-200">Paid</span></td><td class="py-4 px-4 text-right"><button onclick="toast('Invoice downloaded')" class="inline-flex items-center gap-2 hover:opacity-80" style="color:#039855"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download</button></td></tr>
    </tbody></table>

    <!-- ⚠️🆕 Postpaid — organized by action: Outstanding (needs payment) then unified Billing history -->
    <div id="billing-invoices-postpaid" class="hidden">
      <!-- Unpaid invoices (open / overdue invoices that need payment) -->
      <div id="bp-outstanding-section" class="mb-8">
        <div class="flex items-center gap-2 mb-3">
          <h3 class="text-slate-900 text-sm font-semibold">Unpaid invoices</h3>
          <span id="bp-outstanding-summary" class="text-xs text-slate-500"></span>
        </div>
        <div id="bp-outstanding-empty" class="hidden rounded-xl border border-slate-200 bg-slate-50/60 py-8 text-center text-sm text-slate-400">No unpaid invoices at this time</div>
        <div id="bp-outstanding-table-wrap" class="rounded-xl border border-slate-200 bg-white p-2">
          <table class="w-full text-sm">
            <thead><tr class="border-b border-slate-200 text-slate-600">
              <th class="text-left py-2.5 px-4 font-medium">Invoice #</th>
              <th class="text-left py-2.5 px-4 font-medium">Period</th>
              <th class="text-left py-2.5 px-4 font-medium">Due date</th>
              <th class="text-left py-2.5 px-4 font-medium">Amount</th>
              <th class="text-left py-2.5 px-4 font-medium">Status</th>
              <th class="text-right py-2.5 px-4 font-medium">Actions</th>
            </tr></thead>
            <tbody id="bp-outstanding-body"></tbody>
          </table>
        </div>
      </div>

      <!-- Invoice history (paid / voided invoices + recharge receipts) -->
      <div class="flex items-center gap-2 mb-3">
        <h3 class="text-slate-900 text-sm font-semibold">Invoice history</h3>
        <span class="text-xs text-slate-400">Monthly invoices &amp; recharge receipts</span>
      </div>
      <table class="w-full text-sm">
        <thead><tr class="border-b border-slate-200 text-slate-700">
          <th class="text-left py-3 px-4">Document</th>
          <th class="text-left py-3 px-4">Date / period</th>
          <th class="text-left py-3 px-4">Amount</th>
          <th class="text-left py-3 px-4">Status</th>
          <th class="text-right py-3 px-4">Actions</th>
        </tr></thead>
        <tbody id="bp-history-body"></tbody>
      </table>
      <div id="bp-history-empty" class="hidden py-8 text-center text-sm text-slate-400">No invoices yet. Your first invoice will be issued on Jul 1.</div>
    </div>
  </div>
</div>`);
