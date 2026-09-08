// Modals HTML — injected at runtime
(function() {
  const container = document.createElement('div');
  container.id = 'modals-container';
  container.innerHTML = `
<!-- ============================================================ MODALS ============================================================ -->

<!-- Create API Key -->
<div id="m-discount" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-lg p-6">
    <div class="flex items-start justify-between mb-1">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Your discounts</h2>
      <button onclick="closeModal('m-discount')" class="p-1 rounded hover:bg-[#f5f5f5]"><svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>
    <p class="text-xs text-[#737373] mb-4">Custom rates for your account, applied automatically to eligible requests and reflected in your Usage costs. APIs not listed are billed at standard rates.</p>
    <div class="rounded-lg border border-[#dbdbdb] overflow-hidden">
      <div class="flex items-center gap-2 px-4 py-3 bg-[#f5f5f5] border-b border-[#f5f5f5]">
        <span class="text-sm font-medium text-[#0a0a0a]">Discounted rates</span>
        <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium" style="background:#039855;color:#fff">ACTIVE</span>
      </div>
      <div class="max-h-80 overflow-y-auto divide-y divide-slate-100">
        <!-- Broad Search -->
        <div class="px-4 py-3 flex items-baseline justify-between gap-3 text-sm">
          <span class="font-medium text-[#0a0a0a]">Broad Search</span>
          <span class="w-64 text-left whitespace-nowrap"><span class="font-semibold tabular-nums" style="color:#039855">\$1.70</span> <span class="text-[#a3a3a3] line-through tabular-nums text-xs">\$2.00</span> <span class="text-xs text-[#a3a3a3]">/ 1k sub-queries ?15% off</span></span>
        </div>
        <!-- Web Search -->
        <div class="px-4 py-3 flex items-baseline justify-between gap-3 text-sm">
          <span class="font-medium text-[#0a0a0a]">Web Search</span>
          <span class="w-64 text-left whitespace-nowrap"><span class="font-semibold tabular-nums" style="color:#039855">\$4.00</span> <span class="text-[#a3a3a3] line-through tabular-nums text-xs">\$5.00</span> <span class="text-xs text-[#a3a3a3]">/ 1k calls ?20% off</span></span>
        </div>
        <!-- Extract -->
        <div class="px-4 py-3 flex items-baseline justify-between gap-3 text-sm">
          <span class="font-medium text-[#0a0a0a]">Extract</span>
          <div class="w-64 text-left whitespace-nowrap">
            <div><span class="font-semibold tabular-nums" style="color:#039855">\$0.85</span> <span class="text-[#a3a3a3] line-through tabular-nums text-xs">\$1.00</span> <span class="text-xs text-[#a3a3a3]">/ 1k URLs ?15% off</span></div>
            <div class="text-xs text-[#a3a3a3] mt-0.5">until Dec 31, 2026</div>
          </div>
        </div>
      </div>
      <div class="px-4 py-2 bg-[#f5f5f5] border-t border-[#f5f5f5] text-xs text-[#737373]">3 APIs discounted</div>
    </div>
    <p class="text-xs text-[#a3a3a3] mt-3">Have questions? <a href="#" class="font-medium hover:underline" style="color:#039855">Contact sales &rarr;</a></p>
    <div class="flex justify-end mt-5">
      <button onclick="closeModal('m-discount')" class="px-4 py-2 text-sm text-white rounded-lg" style="background:#039855">Done</button>
    </div>
  </div>
</div>

<div id="m-create-key" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-md p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Create API key</h2>
      <button onclick="closeModal('m-create-key')" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="closeModal  m create key">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>
    <p class="text-xs text-[#737373] mb-4">You can create up to 100 API keys. Delete unused keys regularly.</p>
    <div class="space-y-4 mb-6">
      <div>
        <label class="block text-xs text-[#737373] mb-1">API key name</label>
        <input type="text" id="ck-name" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none" placeholder="e.g. Search Prod Key"/>
      </div>
      <!-- [ORG] Owner -->
      <div id="ck-owner-wrap">
        <label class="block text-xs text-[#737373] mb-1">Owner</label>
        <select id="ck-owner" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm bg-white focus:outline-none">
          <option value="" selected>Shared (all members)</option>
          <option value="jane">Jane Niu (you)</option>
          <option value="alex">Alex Johnson</option>
          <option value="sarah">Sarah Chen</option>
          <option value="bob">Bob Smith</option>
        </select>
        <p class="mt-1 text-xs text-[#a3a3a3]">Shared keys are accessible by all org members. Assigning a member enables per-member usage tracking.</p>
      </div>
      <div id="ck-qps-wrap">
        <label class="block text-xs text-[#737373] mb-1">Requests QPS limit</label>
        <input type="number" id="ck-qps" min="1" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none" placeholder="e.g. 20"/>
        <p class="mt-1 text-xs text-[#a3a3a3]">Set the max requests per second. Leave empty to use your plan's limit.</p>
      </div>
    </div>
    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-create-key')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="doCreateKey()" class="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90" style="background:#039855">Create key</button>
    </div>
  </div>
</div>

<!-- Request Access modal (generic ?used by Multimodal Chat, Grounded Generation, etc.) -->
<div id="m-request-access" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-lg p-6">
    <div class="flex items-start justify-between mb-3">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Request access</h2>
      <button onclick="closeModal('m-request-access')" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="closeModal  m request access">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>

    <!-- Email apply view (default for both signed-out and signed-in users) -->
    <div id="ra-request-view">
    <p class="text-sm text-[#737373] mb-4">Send your request to <a href="mailto:support@octen.ai" class="font-medium hover:underline" style="color:#039855">support@octen.ai</a> and we'll get back to you.</p>

    <div class="border-t border-[#f5f5f5] pt-4 mb-4">
      <div class="flex items-center justify-between mb-2">
        <p class="text-xs font-medium text-[#737373] uppercase tracking-wide">Email template</p>
        <button id="ra-copy-btn" onclick="raCopyTemplate(this)" class="inline-flex items-center gap-1 text-xs font-medium hover:opacity-80" style="color:#039855" aria-label="ra copy btn">
  <svg class="ra-copy-icon w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          <svg class="ra-check-icon w-3 h-3 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          <span class="ra-copy-label">Copy</span>
        </button>
        
      </div>
      <pre id="ra-template" class="bg-[#f5f5f5] border border-[#dbdbdb] rounded-lg p-3 text-xs text-[#737373] leading-relaxed font-mono whitespace-pre-wrap">Subject: Octen access request ?<span class="ra-product">Multimodal Chat</span>

Hi Octen team,

I'd like to request access to <span class="ra-product">Multimodal Chat</span>.

- Name:
- Work email:
- Company:
- Country:
- Use case:
- Estimated scale (daily API calls):

Thanks!</pre>
    </div>

    <div class="flex gap-2">
      <a id="ra-mailto" href="mailto:support@octen.ai" class="flex-1 px-4 py-3 text-white rounded-lg text-sm font-medium hover:opacity-90 text-center" style="background:#039855">Open in email &rarr;</a>
      <button onclick="closeModal('m-request-access')" class="px-4 py-3 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Close</button>
    </div>
    <p id="ra-signin-hint" class="hidden text-center text-xs text-[#737373] mt-4 pt-3 border-t border-[#f5f5f5]">Already have an account? <a href="#" onclick="closeModal('m-request-access');toast('Redirecting to sign in...');return false" class="font-medium hover:underline" style="color:#039855">Sign in &rarr;</a></p>
    </div><!-- /ra-request-view -->
  </div>
</div>


<!-- Edit API Key -->
<div id="m-edit-key" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-md p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Edit API key</h2>
      <button onclick="closeModal('m-edit-key')" class="p-1 rounded hover:bg-[#f5f5f5]"><svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>
    <div class="space-y-4 mb-6">
      <div>
        <label class="block text-xs text-[#737373] mb-1">API key name</label>
        <input type="text" id="ek-name" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none" placeholder="e.g. Search Prod Key"/>
      </div>
      <!-- [ORG] Owner -->
      <div id="ek-owner-wrap">
        <label class="block text-xs text-[#737373] mb-1">Owner</label>
        <select id="ek-owner" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm bg-white focus:outline-none">
          <option value="">Shared (all members)</option>
          <option value="jane">Jane Niu</option>
          <option value="alex">Alex Johnson</option>
          <option value="sarah">Sarah Chen</option>
          <option value="bob">Bob Smith</option>
        </select>
      </div>
      <div id="ek-qps-wrap">
        <label class="block text-xs text-[#737373] mb-1">Requests QPS limit</label>
        <input type="number" id="ek-qps" min="0" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none" placeholder="e.g. 20"/>
        <p class="mt-1 text-xs text-[#a3a3a3]">Set the max requests per second. Leave empty to use your plan's limit.</p>
      </div>
    </div>
    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-edit-key')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="doSaveEdit()" class="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90" style="background:#039855">Save changes</button>
    </div>
  </div>
</div>

<!-- Delete API Key -->
<div id="m-del-key" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-md p-6">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Delete API key?</h2>
      <button onclick="closeModal('m-del-key')" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="closeModal  m del key">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>
    <p class="text-[#737373] text-sm">This will permanently delete <span id="del-key-name" class="font-medium text-[#0a0a0a]"></span>. This action cannot be undone.</p>
    <div class="mt-5 flex justify-end gap-3">
      <button onclick="closeModal('m-del-key')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="doDelKey()" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">Delete</button>
    </div>
  </div>
</div>

<!-- Invite Member -->
<!-- Create Organization -->
<div id="m-create-org" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-md p-6">
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Create Organization</h2>
      <button onclick="closeModal('m-create-org')" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="closeModal  m create org">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>

    <div class="mb-5">
      <label class="block text-xs text-[#737373] mb-2">Organization name <span class="text-red-500">*</span></label>
      <input type="text" id="co-name" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none focus:border-[#039855]" placeholder="e.g. Acme Inc"/>
    </div>

    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-create-org')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="doCreateOrg()" class="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90" style="background:#039855">Create</button>
    </div>
  </div>
</div>

<!-- 鈿狅笍馃?Invoice / receipt detail (hosted-style: download invoice + receipt from one record) -->
<div id="m-invoice-detail" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-2xl max-h-[88vh] overflow-y-auto relative">
    <button onclick="closeModal('m-invoice-detail')" class="absolute right-4 top-4 p-1 rounded hover:bg-[#f5f5f5] z-10" aria-label="closeModal  m invoice detail">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>

    <!-- Header -->
    <div class="p-6 border-b border-[#dbdbdb]">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div class="min-w-0">
          <div class="flex items-center gap-2 mb-2"><span id="bpd-status"></span><span id="bpd-number" class="text-[#737373] text-sm font-mono"></span></div>
          <div id="bpd-amount" class="text-[#0a0a0a] text-4xl font-semibold mb-1 tabular-nums">\$0.00</div>
          <div id="bpd-paidline" class="text-[#737373] text-sm mb-4"></div>
          <div id="bpd-actions" class="flex flex-wrap gap-2"></div>
        </div>
        <div class="shrink-0 text-sm space-y-3">
          <div class="flex gap-6">
            <div><div class="text-[#a3a3a3] text-xs mb-0.5">Invoice date</div><div id="bpd-invdate" class="text-[#737373]"></div></div>
            <div><div class="text-[#a3a3a3] text-xs mb-0.5">Due date</div><div id="bpd-due" class="text-[#737373]"></div></div>
          </div>
          <div><div class="text-[#a3a3a3] text-xs mb-0.5">From</div><div class="text-[#737373] leading-snug">APITECH AI PTE. LTD.<br>68 Circular Road, Singapore 049422</div></div>
          <div><div class="text-[#a3a3a3] text-xs mb-0.5">Bill to</div><div id="bpd-billto" class="text-[#737373] leading-snug"></div></div>
        </div>
      </div>
    </div>

    <!-- Line items -->
    <div class="p-6">
      <table class="w-full text-sm">
        <tbody id="bpd-lines"></tbody>
      </table>
      <div class="mt-4 pt-4 border-t border-[#dbdbdb] space-y-2">
        <div class="flex items-center justify-between text-sm"><span class="text-[#737373]">Subtotal</span><span id="bpd-subtotal" class="text-[#0a0a0a] tabular-nums"></span></div>
        <div id="bpd-balrow" class="hidden flex items-center justify-between text-sm"><span class="text-green-700">Prepaid balance applied</span><span id="bpd-bal" class="text-green-700 tabular-nums"></span></div>
        <div id="bpd-total-row" class="flex items-center justify-between text-sm"><span id="bpd-total-label" class="text-[#737373]">Total</span><span id="bpd-total" class="text-[#0a0a0a] font-medium tabular-nums"></span></div>
        <div class="flex items-center justify-between text-base pt-2 border-t border-[#dbdbdb]"><span class="text-[#0a0a0a] font-semibold">Amount due</span><span id="bpd-amountdue" class="text-[#0a0a0a] font-semibold tabular-nums"></span></div>
      </div>
      <p class="text-xs text-[#a3a3a3] mt-5 text-center">Powered by Stripe ?<a href="#" class="underline">Terms</a> ?<a href="#" class="underline">Privacy</a></p>
    </div>
  </div>
</div>

<div id="m-invite" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-md p-6">
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Invite members</h2>
      <button onclick="closeModal('m-invite')" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="closeModal  m invite">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>

    <div class="space-y-4 mb-5">
      <div>
        <label class="block text-xs text-[#737373] mb-2">Email addresses <span class="text-red-500">*</span></label>
        <textarea id="inv-emails" rows="3" oninput="updateInviteSummary()" placeholder="alice@company.com, bob@company.com" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none focus:border-[#039855] resize-none"></textarea>
        <div id="inv-summary" class="hidden mt-2 text-xs">
          <div class="flex items-start gap-2 text-[#737373]">
            <svg class="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#a3a3a3]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4m0-4h.01"/></svg>
            <span id="inv-summary-text" class="flex-1"></span>
            <button type="button" id="inv-summary-toggle" onclick="toggleInviteDetails()" class="shrink-0 hover:opacity-80" style="color:#039855">details ?/button>
          </div>
          <div id="inv-summary-details" class="hidden mt-2 pl-5 space-y-1 text-[#737373]"></div>
        </div>
      </div>

      <div>
        <label class="block text-xs text-[#737373] mb-2">Role</label>
        <select id="inv-role" onchange="onInviteRoleChange()" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm bg-white focus:outline-none focus:border-[#039855]">
          <option value="member">Member</option>
          <option value="manager">Manager</option>
          <option value="owner" id="inv-role-owner-opt">Owner</option>
        </select>
        <p id="inv-owner-warning" class="hidden mt-2 flex items-start gap-2 text-xs text-amber-700">
          <svg class="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <span>Owners have full management access, including billing.</span>
        </p>
      </div>
    </div>

    <div class="border-t border-[#f5f5f5] pt-4 mb-4">
      <button onclick="copyInviteLink(this)" class="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style="color:#039855" aria-label="copyInviteLink this">
  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
        <span>Copy invite link</span>
      </button>
    </div>

    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-invite')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button id="inv-send-btn" onclick="doInvite()" class="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed" style="background:#039855">Send invites</button>
    </div>
  </div>
</div>

<!-- Remove Member -->
<div id="m-remove" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-lg p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Remove <span id="rem-name"></span></h2>
      <button onclick="closeModal('m-remove')" class="p-1 rounded hover:bg-[#f5f5f5]"><svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>

    <!-- No-keys state -->
    <div id="rem-no-keys" class="hidden">
      <div class="flex items-start gap-3 px-4 py-3 rounded-lg border border-[#dbdbdb] bg-[#f5f5f5] mb-5">
        <svg class="w-4 h-4 shrink-0 mt-0.5 text-[#a3a3a3]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4m0-4h.01"/></svg>
        <div class="text-sm text-[#737373]">
          <span class="font-medium text-[#0a0a0a]" id="rem-email-1"></span> has no assigned API keys.
        </div>
      </div>
      <p class="text-sm text-[#737373] mb-5">Removing will revoke their access to this organization immediately.</p>
    </div>

    <!-- Has-keys state -->
    <div id="rem-has-keys">
      <p class="text-sm text-[#737373] mb-4"><span id="rem-name-2" class="font-medium text-[#0a0a0a]"></span> has <span id="rem-key-count" class="font-medium text-[#0a0a0a]">0</span> assigned API keys.</p>

      <!-- Affected keys -->
      <div class="mb-4">
        <div class="text-xs text-[#737373] mb-2">Affected keys</div>
        <div id="rem-key-list" class="border border-[#dbdbdb] rounded-lg px-3 py-2 text-xs text-[#737373] bg-[#f5f5f5] space-y-1"></div>
      </div>

      <!-- Option group -->
      <div class="space-y-2 mb-5">
        <label class="flex items-start gap-3 border border-[#dbdbdb] rounded-lg p-3 cursor-pointer hover:border-[#dbdbdb] transition-colors has-[:checked]:border-[#039855] has-[:checked]:bg-[#0398550a]">
          <input type="radio" name="rem-action" value="transfer" checked class="mt-0.5" style="accent-color:#039855" onchange="toggleRemTransferSelect(true)"/>
          <div class="flex-1">
            <div class="text-sm font-medium text-[#0a0a0a]">Transfer to another member (default)</div>
            <div class="text-xs text-[#737373] mt-0.5 mb-2">Keys will be reassigned to the selected member.</div>
            <select id="rem-transfer-select" class="w-full px-2 py-2 text-xs border border-[#dbdbdb] rounded-md bg-white">
              <option value="">Select member</option>
              <option value="jane">Jane Niu ?Owner</option>
              <option value="alex">Alex Johnson ?Manager</option>
              <option value="bob">Bob Smith ?Member</option>
            </select>
          </div>
        </label>

        <label class="flex items-start gap-3 border border-[#dbdbdb] rounded-lg p-3 cursor-pointer hover:border-[#dbdbdb] transition-colors has-[:checked]:border-[#039855] has-[:checked]:bg-[#0398550a]">
          <input type="radio" name="rem-action" value="shared" class="mt-0.5" style="accent-color:#039855" onchange="toggleRemTransferSelect(false)"/>
          <div>
            <div class="text-sm font-medium text-[#0a0a0a]">Convert to Shared</div>
            <div class="text-xs text-[#737373] mt-0.5">Keys remain accessible to all members.</div>
          </div>
        </label>

        <label class="flex items-start gap-3 border border-[#dbdbdb] rounded-lg p-3 cursor-pointer hover:border-[#dbdbdb] transition-colors has-[:checked]:border-[#039855] has-[:checked]:bg-[#0398550a]">
          <input type="radio" name="rem-action" value="delete" class="mt-0.5" style="accent-color:#039855" onchange="toggleRemTransferSelect(false)"/>
          <div>
            <div class="text-sm font-medium text-[#0a0a0a]">Delete all assigned keys</div>
            <div class="text-xs text-[#737373] mt-0.5">Keys will be permanently deleted.</div>
          </div>
        </label>
      </div>
    </div>

    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-remove')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="doRemove()" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">Remove member</button>
    </div>
  </div>
</div>

<!-- Leave Organization (with key handover) -->
<!-- Self-demotion confirmation -->
<div id="m-role-confirm" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-md p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Change your role to <span id="rc-new-role">Manager</span>?</h2>
      <button onclick="cancelRoleChange()" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="cancelRoleChange">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>
    <p class="text-sm text-[#737373] mb-5">
      You will lose your <span id="rc-current-role" class="font-medium text-[#0a0a0a]">Owner</span> privileges. This action cannot be undone by yourself ?another owner will need to restore your role.
    </p>
    <div class="flex justify-end gap-3">
      <button onclick="cancelRoleChange()" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="confirmRoleChange()" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">Change role</button>
    </div>
  </div>
</div>

<div id="m-leave" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-lg p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Leave <span id="leave-org-name">Acme Inc</span></h2>
      <button onclick="closeModal('m-leave')" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="closeModal  m leave">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>

    <!-- No-keys state -->
    <div id="leave-no-keys" class="hidden">
      <p class="text-sm text-[#737373] mb-5">You will lose access to this organization immediately.</p>
    </div>

    <!-- Has-keys state -->
    <div id="leave-has-keys">
      <p class="text-sm text-[#737373] mb-4">You have <span id="leave-key-count" class="font-medium text-[#0a0a0a]">0</span> assigned API keys that must be transferred before you leave:</p>

      <div class="mb-4">
        <div class="text-xs text-[#737373] mb-2">Affected keys</div>
        <div id="leave-key-list" class="border border-[#dbdbdb] rounded-lg px-3 py-2 text-xs text-[#737373] bg-[#f5f5f5] space-y-1"></div>
      </div>

      <div class="mb-5">
        <label class="block text-xs text-[#737373] mb-2">Transfer to an admin <span class="text-red-500">*</span></label>
        <select id="leave-transfer-select" class="w-full px-3 py-2 text-sm border border-[#dbdbdb] rounded-lg bg-white focus:outline-none focus:border-[#039855]">
          <option value="">Select Owner or Manager</option>
          <option value="jane">Jane Niu ?Owner</option>
          <option value="alex">Alex Johnson ?Manager</option>
        </select>
        <p class="text-xs text-[#737373] mt-2">The selected admin will take over your API keys.</p>
      </div>

      <div class="flex items-start gap-2 px-3 py-2 rounded-lg border border-amber-200 bg-amber-50 mb-5">
        <svg class="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        <div class="text-xs text-amber-800">You will lose access to this organization immediately.</div>
      </div>
    </div>

    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-leave')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="doLeave()" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">Leave organization</button>
    </div>
  </div>
</div>

<!-- Create Service Key -->
<div id="m-create-svc" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-md p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Create Service Key</h2>
      <button onclick="closeModal('m-create-svc')" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="closeModal  m create svc">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>
    <div class="mb-5">
      <label class="block text-xs text-[#737373] mb-1">Service Key name</label>
      <input type="text" placeholder="e.g. Prod Management" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none"/>
    </div>
    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-create-svc')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="doCreateSvc()" class="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90" style="background:#039855">Create key</button>
    </div>
  </div>
</div>

<!-- Edit Service Key -->
<div id="m-edit-svc" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-md p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Edit Service Key</h2>
      <button onclick="closeModal('m-edit-svc')" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="closeModal  m edit svc">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>
    <div class="mb-5">
      <label class="block text-xs text-[#737373] mb-1">Service Key name</label>
      <input type="text" id="esvc-name" value="Management Key" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none"/>
    </div>
    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-edit-svc')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="doSaveSvcEdit()" class="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90" style="background:#039855">Save changes</button>
    </div>
  </div>
</div>

<!-- Delete Service Key -->
<div id="m-del-svc" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-md p-6">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Delete Service Key?</h2>
      <button onclick="closeModal('m-del-svc')" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="closeModal  m del svc">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>
    <p class="text-sm text-[#737373] mb-5">This will permanently delete <span id="del-svc-name" class="font-semibold text-[#0a0a0a]">Management Key</span>. Any automation using this key will stop working immediately.</p>
    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-del-svc')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="doDelSvc()" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">Delete</button>
    </div>
  </div>
</div>

<!-- Add Credits -->
<!-- QPS Upgrade modal -->
<div id="m-qps-upgrade" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
    <div class="flex items-start justify-between mb-2">
      <h2 class="text-[#0a0a0a] text-lg font-semibold">Upgrade your plan</h2>
      <button onclick="closeModal('m-qps-upgrade')" class="p-1 rounded hover:bg-[#f5f5f5] shrink-0" aria-label="closeModal  m qps upgrade">
  <svg class="w-5 h-5 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>
    <p class="text-sm text-[#737373] mb-5">You're currently on the <span class="font-medium text-[#0a0a0a]">Free tier (up to 50 QPS)</span>. Subscribe to unlock guaranteed throughput and SLA.</p>

    <!-- Tier: Startup -->
    <label class="block mb-3 cursor-pointer">
      <input type="radio" name="qps-tier" value="startup" class="peer sr-only"/>
      <div class="border border-[#dbdbdb] rounded-xl p-4 transition-all peer-checked:border-[#039855] peer-checked:bg-[#0398550d] hover:border-[#dbdbdb]">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="text-[#0a0a0a] font-semibold">Startup</span>
              <span class="text-[#737373]">?/span>
              <span class="text-[#0a0a0a] font-semibold">50 QPS</span>
            </div>
            <p class="text-xs text-[#737373]">For early-stage teams going to production</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-[#0a0a0a] text-lg font-semibold tabular-nums">\$599 <span class="text-sm font-normal text-[#737373]">/ mo</span></p>
          </div>
        </div>
      </div>
    </label>

    <!-- Tier: Pro -->
    <label class="block mb-3 cursor-pointer">
      <input type="radio" name="qps-tier" value="pro" class="peer sr-only"/>
      <div class="border border-[#dbdbdb] rounded-xl p-4 transition-all peer-checked:border-[#039855] peer-checked:bg-[#0398550d] hover:border-[#dbdbdb]">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="text-[#0a0a0a] font-semibold">Pro</span>
              <span class="text-[#737373]">?/span>
              <span class="text-[#0a0a0a] font-semibold">100 QPS</span>
            </div>
            <p class="text-xs text-[#737373]">For growing production workloads</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-[#0a0a0a] text-lg font-semibold tabular-nums">\$1,199 <span class="text-sm font-normal text-[#737373]">/ mo</span></p>
          </div>
        </div>
      </div>
    </label>

    <!-- Tier: Scale -->
    <label class="block mb-5 cursor-pointer">
      <input type="radio" name="qps-tier" value="scale" class="peer sr-only"/>
      <div class="border border-[#dbdbdb] rounded-xl p-4 transition-all peer-checked:border-[#039855] peer-checked:bg-[#0398550d] hover:border-[#dbdbdb]">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="text-[#0a0a0a] font-semibold">Scale</span>
              <span class="text-[#737373]">?/span>
              <span class="text-[#0a0a0a] font-semibold">500 QPS</span>
            </div>
            <p class="text-xs text-[#737373]">For high-volume production at scale</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-[#0a0a0a] text-lg font-semibold tabular-nums">\$5,999 <span class="text-sm font-normal text-[#737373]">/ mo</span></p>
          </div>
        </div>
      </div>
    </label>

    <div class="border-t border-[#dbdbdb] pt-5 mb-5">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-[#0a0a0a] font-semibold">Enterprise</span>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white" style="background:#8b5cf6">1M+ QPS supported</span>
      </div>
      <p class="text-sm text-[#737373] mb-3">Need higher QPS? Contact us for custom enterprise plans with dedicated support.</p>
      <button class="w-full border border-dashed border-[#dbdbdb] rounded-lg py-3 text-sm font-medium text-[#737373] hover:bg-[#f5f5f5] transition-colors inline-flex items-center justify-center gap-2" aria-label="Action">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        Contact Sales
      </button>
    </div>

    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-qps-upgrade')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="closeModal('m-qps-upgrade');toast('Plan upgraded')" class="px-4 py-2 text-white rounded-lg text-sm font-medium opacity-50 cursor-not-allowed" style="background:#039855">Confirm</button>
    </div>
  </div>
</div>

<div id="m-recharge" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-md p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Add Credits</h2>
      <button onclick="closeModal('m-recharge')" class="p-1 rounded hover:bg-[#f5f5f5]"><svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>
    <div class="mb-5">
      <label class="block text-xs text-[#737373] mb-2">Amount</label>
      <div class="grid grid-cols-4 gap-2 mb-3">
        <button class="py-2 border border-[#dbdbdb] rounded-lg text-sm hover:border-[#039855] transition-colors">\$25</button>
        <button class="py-2 border-2 rounded-lg text-sm font-medium" style="border-color:#039855;color:#039855;background:#0398550d">\$50</button>
        <button class="py-2 border border-[#dbdbdb] rounded-lg text-sm hover:border-[#039855] transition-colors">\$100</button>
        <button class="py-2 border border-[#dbdbdb] rounded-lg text-sm hover:border-[#039855] transition-colors">\$200</button>
      </div>
      <input type="number" value="50" min="1" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none" placeholder="Custom amount"/>
    </div>
    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-recharge')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="closeModal('m-recharge');toast('Credits added')" class="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90" style="background:#039855">Add credits</button>
    </div>
  </div>
</div>

<!-- Delete Org -->
<div id="m-del-org" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-md p-6">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Delete Organization?</h2>
      <button onclick="closeModal('m-del-org')" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="closeModal  m del org">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>
    <p class="text-sm text-[#737373] mb-4">This will permanently delete <span class="font-semibold text-[#0a0a0a]">Acme Inc</span>. All members, keys, and billing history will be deleted.</p>
    <div class="mb-5">
      <label class="block text-xs text-[#737373] mb-1">Type <code class="bg-[#f5f5f5] px-1 rounded">acme-inc</code> to confirm</label>
      <input type="text" placeholder="acme-inc" class="w-full px-3 py-2 border border-red-200 rounded-lg text-sm focus:outline-none"/>
    </div>
    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-del-org')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">Delete organization</button>
    </div>
  </div>
</div>

<!-- Welcome Modal (personal mode only) -->
<div id="m-welcome" class="modal-bg">
  <div class="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-8 relative">
    <button onclick="closeModal('m-welcome')" class="absolute top-4 right-4 p-1 rounded-lg hover:bg-[#f5f5f5] transition-colors text-[#a3a3a3]" aria-label="closeModal  m welcome">
  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    <div class="text-center">
      <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5" style="background:#0398551a">
        <svg class="w-7 h-7" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
      </div>
      <h2 class="text-xl font-semibold text-[#0a0a0a] mb-2">Welcome to Octen!</h2>
      <p class="text-sm text-[#737373] leading-relaxed mb-6">Add a payment method to get <span class="font-semibold" style="color:#039855">\$5 in free credits</span> and start building.</p>
      <div class="flex flex-col gap-3">
        <button onclick="closeModal('m-welcome');go('billing')" class="w-full py-3 px-4 rounded-xl text-white text-sm font-medium transition-opacity hover:opacity-90" style="background:#039855">Add payment method</button>
        <button onclick="closeModal('m-welcome')" class="w-full py-3 px-4 rounded-xl text-sm font-medium text-[#737373] hover:bg-[#f5f5f5] transition-colors">Maybe later</button>
      </div>
    </div>
  </div>
</div>

<!-- 鈹€鈹€鈹€鈹€鈹€ Destination Add / Edit Wizard 鈹€鈹€鈹€鈹€鈹€ -->
<div id="m-dest-wizard" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-xl p-6">
    <div class="flex items-center justify-between mb-5">
      <h2 id="dest-wiz-title" class="text-[#0a0a0a] text-base font-semibold">Add destination</h2>
      <button onclick="closeModal('m-dest-wizard')" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="closeModal  m dest wizard">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>

    <!-- Stepper -->
    <div class="flex items-center mb-6 text-xs">
      <div id="dws-1" class="flex items-center gap-2"><span class="w-5 h-5 rounded-full bg-[#039855] text-white flex items-center justify-center text-xs font-medium">1</span><span class="text-[#0a0a0a] font-medium">Details</span></div>
      <div class="flex-1 h-px bg-[#e5e5e5] mx-3"></div>
      <div id="dws-2" class="flex items-center gap-2 text-[#a3a3a3]"><span class="w-5 h-5 rounded-full bg-[#e5e5e5] text-[#737373] flex items-center justify-center text-xs font-medium">2</span><span>IAM role</span></div>
      <div class="flex-1 h-px bg-[#e5e5e5] mx-3"></div>
      <div id="dws-3" class="flex items-center gap-2 text-[#a3a3a3]"><span class="w-5 h-5 rounded-full bg-[#e5e5e5] text-[#737373] flex items-center justify-center text-xs font-medium">3</span><span>Verify</span></div>
    </div>

    <!-- Step 1 -->
    <div id="dest-step-1">
      <div class="space-y-4 mb-6">
        <div>
          <label class="block text-xs text-[#737373] mb-2">Name <span class="text-red-500">*</span></label>
          <input id="dest-name" type="text" placeholder="e.g. Production logs" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none focus:border-[#039855]"/>
        </div>
        <div>
          <label class="block text-xs text-[#737373] mb-2">S3 Bucket <span class="text-red-500">*</span></label>
          <input id="dest-bucket" type="text" placeholder="acme-collect-data" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none focus:border-[#039855] disabled:bg-[#f5f5f5] disabled:text-[#737373]"/>
          <p id="dest-bucket-hint" class="hidden mt-1 text-xs text-[#a3a3a3]">Bucket cannot be changed after creation.</p>
        </div>
        <div>
          <label class="block text-xs text-[#737373] mb-2">Prefix <span class="text-[#a3a3a3]">(optional)</span></label>
          <input id="dest-prefix" type="text" placeholder="octen/runs/" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm focus:outline-none focus:border-[#039855] disabled:bg-[#f5f5f5] disabled:text-[#737373]"/>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div id="dest-step-2" class="hidden">
      <!-- Policy tabs -->
      <div class="border border-[#dbdbdb] rounded-lg overflow-hidden mb-4">
        <div class="flex border-b border-[#dbdbdb] bg-[#f5f5f5]/60">
          <button id="dest-pol-tab-trust" onclick="switchDestPolTab('trust')" class="flex-1 px-3 py-2 text-xs font-medium text-[#0a0a0a] border-b-2 border-[#039855] -mb-px">Trust policy</button>
          <button id="dest-pol-tab-perm" onclick="switchDestPolTab('perm')" class="flex-1 px-3 py-2 text-xs font-medium text-[#737373] border-b-2 border-transparent -mb-px">Permission policy</button>
          <button onclick="copyDestPolicy(currentDestPolTab)" class="px-3 py-2 text-xs hover:opacity-80 border-l border-[#dbdbdb]" style="color:#039855">Copy</button>
        </div>
        <pre id="dest-trust-json" class="px-3 py-3 text-xs bg-[#f5f5f5] text-[#737373] font-mono overflow-x-auto">{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::123456789012:root" },
    "Action": "sts:AssumeRole",
    "Condition": { "StringEquals": { "sts:ExternalId": "octen-ext-a8f3-49c2-b1e7-8d2f4a6b9c1e" } }
  }]
}</pre>
        <pre id="dest-perm-json" class="hidden px-3 py-3 text-xs bg-[#f5f5f5] text-[#737373] font-mono overflow-x-auto"></pre>
      </div>

      <div>
        <label class="block text-xs text-[#737373] mb-2">Role ARN <span class="text-red-500">*</span></label>
        <input id="dest-role-arn" type="text" placeholder="arn:aws:iam::your-account-id:role/octen-collect" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm font-mono focus:outline-none focus:border-[#039855]"/>
      </div>
    </div>

    <!-- Step 3 -->
    <div id="dest-step-3" class="hidden">
      <div id="dest-test-pre" class="bg-[#f5f5f5] border border-[#dbdbdb] rounded-lg p-4 mb-4 text-xs text-[#737373] space-y-1">
        <div>Test path: <code class="font-mono text-[#0a0a0a]" id="dest-test-path">s3://bucket/prefix/.octen-test-{timestamp}</code></div>
      </div>

      <div id="dest-test-running" class="hidden space-y-2 mb-4">
        <div id="dts-1" class="flex items-center gap-2 text-xs text-[#737373]"><span class="w-4 h-4 rounded-full border-2 border-[#dbdbdb] border-t-[#039855] animate-spin"></span>Assuming IAM Role?/div>
        <div id="dts-2" class="flex items-center gap-2 text-xs text-[#a3a3a3]"><span class="w-4 h-4 rounded-full border border-[#dbdbdb]"></span>Writing test file?/div>
        <div id="dts-3" class="flex items-center gap-2 text-xs text-[#a3a3a3]"><span class="w-4 h-4 rounded-full border border-[#dbdbdb]"></span>Cleaning up?/div>
      </div>

      <div id="dest-test-success" class="hidden bg-[#0398550d] border border-[#03985533] rounded-lg p-4 mb-4">
        <div class="flex items-start gap-2">
          <svg class="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="#039855" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          <div class="flex-1 text-xs">
            <div class="font-medium text-[#0a0a0a] mb-1">Connection verified</div>
            <div class="text-[#737373]">Destination ID: <code class="font-mono text-[#0a0a0a]" id="dest-new-id">dst_abc123xyz</code></div>
          </div>
        </div>
      </div>

      <div id="dest-test-error" class="hidden bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <div class="flex items-start gap-2">
          <svg class="w-4 h-4 mt-0.5 shrink-0 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
          <div class="flex-1 text-xs">
            <div class="font-medium text-red-700 mb-1" id="dest-err-title">AssumeRole failed</div>
            <div class="text-red-600" id="dest-err-msg">Role does not trust the Octen account. Check trust policy and External ID.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex justify-between gap-3 pt-2">
      <button id="dest-back-btn" onclick="destWizardBack()" class="hidden px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Back</button>
      <div class="ml-auto flex gap-3">
        <button onclick="closeModal('m-dest-wizard')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
        <button id="dest-next-btn" onclick="destWizardNext()" class="px-4 py-2 text-white rounded-lg text-sm hover:opacity-90" style="background:#039855">Next</button>
      </div>
    </div>
  </div>
</div>

<!-- 鈹€鈹€鈹€鈹€鈹€ Destination Delete Confirm 鈹€鈹€鈹€鈹€鈹€ -->
<div id="m-dest-delete" class="modal-bg">
  <div class="bg-white rounded-xl w-full max-w-md p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-[#0a0a0a] text-base font-semibold">Delete destination?</h2>
      <button onclick="closeModal('m-dest-delete')" class="p-1 rounded hover:bg-[#f5f5f5]" aria-label="closeModal  m dest delete">
  <svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
    </div>
    <p class="text-sm text-[#737373] mb-2">Delete <span class="font-medium text-[#0a0a0a]" id="dest-del-name"></span>?</p>
    <p class="text-xs text-[#737373] mb-5">API calls referencing <code class="px-1 py-1 bg-[#f5f5f5] rounded text-xs font-mono" id="dest-del-id"></code> will fail with 404 Not Found.</p>
    <div class="flex justify-end gap-3">
      <button onclick="closeModal('m-dest-delete')" class="px-4 py-2 border border-[#dbdbdb] rounded-lg text-sm text-[#737373] hover:bg-[#f5f5f5]">Cancel</button>
      <button onclick="confirmDeleteDestination()" class="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">Delete</button>
    </div>
  </div>
</div>

<div id="spd-overlay" class="hidden" style="position:fixed;inset:0;z-index:60;display:none"></div>

<!-- Toast -->
<div id="toast-el" class="fixed top-6 left-1/2 -translate-x-1/2 text-white text-sm px-5 py-3 rounded-lg shadow-xl z-[100] opacity-0 transition-all duration-300 pointer-events-none font-medium" style="background:#039855"></div>

<!-- ============================================================ JAVASCRIPT ============================================================ -->


<!-- ============================================================ MODEL PAGE SCRIPT ============================================================ -->



<!-- ============================================================ SHARED SEARCH PARAMETER DRAWER ============================================================ -->


<!-- ============================================================ DEEP RESEARCH DATA ============================================================ -->
`;
  document.body.appendChild(container);
})();
