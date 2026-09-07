// Console core state & behaviors (extracted from the prototype's main script).
// Defines the global demo state (workspace, role, payment, billing) and all
// onclick-referenced globals used by sidebar/modals/page templates.
// NOTE: functions here are intentionally top-level (global) — inline onclick
// handlers in templates resolve them on window at call time.


const PRIMARY = 'var(--color-accent)';
let wsMode = 'org'; // 'personal' | 'org'
let role = 'owner';  // 'owner' | 'manager' | 'member'
let hasPayment = true; // false = No card, true = Active (Demo default: Active)
let billingMode = 'prepaid'; // 'prepaid' | 'postpaid'
let postpaidStatus = 'normal'; // normal | warn80 | warn90 | overdue | suspended
let currentPage = 'overview';
let delKeyId = null, editKeyId = null;

// ── Overview: API Key data per context ──────────────────────
const PERSONAL_KEYS = [
  {id:'key_latest',label:'Search-Prod-Key (latest)',value:'sk_live_1234567890abcdefghijklmnopqrstuvwxyz'},
  {id:'key_2',label:'Search-Dev-Key',value:'sk_live_abcdef1234567890mnopqrstuvwxyz'},
];
const ORG_KEYS = [
  {id:'key_org_default',label:'Default (shared)',value:'octen-org-abcdef1234567890ghijklmnopqrstuv'},
];
let ovKeyVisible = false;

function maskOvKey(v) { return v.slice(0,10)+'••••••••••'+v.slice(-4); }

function updateOvKeyWidget() {
  const el = document.getElementById('ov-key-val');
  if (!el) return; // widget only exists on the overview page (SPA)
  const keys = (wsMode==='personal') ? PERSONAL_KEYS : ORG_KEYS;
  const k = keys[0];
  ovKeyVisible = false;
  el.textContent = maskOvKey(k.value);
}

function toggleOvKeyVis() {
  const keys = (wsMode==='personal') ? PERSONAL_KEYS : ORG_KEYS;
  const k = keys[0];
  ovKeyVisible = !ovKeyVisible;
  document.getElementById('ov-key-val').textContent = ovKeyVisible ? k.value : maskOvKey(k.value);
}

function toggleOrgNameEdit(editing) {
  document.getElementById('org-name-display').classList.toggle('hidden', editing);
  document.getElementById('org-name-edit').classList.toggle('hidden', !editing);
  if (editing) document.getElementById('org-name-input').focus();
}
function saveOrgName() {
  const val = document.getElementById('org-name-input').value.trim();
  if (!val) { toast('Name cannot be empty', true); return; }
  document.querySelector('#org-name-display span').textContent = val;
  toggleOrgNameEdit(false);
  toast('Organization name saved');
}
const copySvg = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
const checkSvgCopy = '<svg class="w-3.5 h-3.5" style="color:#039855" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
function showCopyCheck(btn) {
  const icon = btn.querySelector('svg');
  const label = btn.querySelector('span');
  const origIcon = icon ? icon.outerHTML : '';
  const origLabel = label ? label.textContent : '';
  if (icon) icon.outerHTML = checkSvgCopy;
  if (label) { label.textContent = 'Copied!'; label.style.color = '#039855'; }
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    const newIcon = btn.querySelector('svg');
    if (newIcon) newIcon.outerHTML = origIcon;
    if (label) { label.textContent = origLabel; label.style.color = ''; }
    btn.style.pointerEvents = '';
  }, 1500);
}
function copyCodeBlock(btn) {
  const container = btn.closest('.relative, div');
  const code = container.querySelector('pre code, pre');
  if (code) { navigator.clipboard.writeText(code.textContent); }
  showCopyCheck(btn);
}
function copyOvKey() {
  const keys = (wsMode==='personal') ? PERSONAL_KEYS : ORG_KEYS;
  try { navigator.clipboard.writeText(keys[0].value); } catch(e){}
  const btn = document.querySelector('[onclick="copyOvKey()"]');
  if (btn) showCopyCheck(btn);
}

function renderPaymentBanner() {
  const el = document.getElementById('ov-payment-banner');
  if (!el) return;

  // Active: no banner at all
  if (hasPayment) { el.innerHTML = ''; return; }

  const isOrg = wsMode!=='personal';
  const canAddCredits = role==='owner'; // Only Owner can add credits

  if (isOrg && !canAddCredits) {
    // Manager/Member in org: passive info, no CTA
    el.innerHTML = `<div class="mb-6 rounded-xl px-5 py-4 flex items-center gap-3 border" style="background:#0398550F;border-color:#03985530">
      <svg class="w-5 h-5 shrink-0" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4m0-4h.01"/></svg>
      <p class="text-sm text-[#0a0a0a] flex-1">API keys are inactive. Please contact an owner to add credits.</p>
    </div>`;
  } else if (isOrg) {
    el.innerHTML = `<div class="mb-6 rounded-xl px-5 py-4 flex items-center gap-3 border" style="background:#0398550F;border-color:#03985530">
      <svg class="w-5 h-5 shrink-0" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
      <p class="text-sm text-[#0a0a0a] flex-1">Add credits to activate your organization's API keys.</p>
      <a href="#" onclick="go('billing');return false" class="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90" style="background:#039855">Add credits <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>
    </div>`;
  } else {
    el.innerHTML = `<div class="mb-6 rounded-xl px-5 py-4 flex items-center gap-3 border" style="background:#0398550F;border-color:#03985530">
      <svg class="w-5 h-5 shrink-0" style="color:#039855" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
      <p class="text-sm text-[#0a0a0a] flex-1">Add a payment method and get <span class="font-semibold" style="color:#039855">$5 free credits</span> to start building.</p>
      <a href="#" onclick="go('billing');return false" class="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90" style="background:#039855">Add payment method <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a>
    </div>`;
  }
}

// Welcome modal (no payment → prompt to add)
let welcomeShown = false;
function showWelcomeModal() {
  // Welcome modal is only for personal accounts (promotes $5 credit).
  // Organization mode has no such offer, so suppress.
  if (welcomeShown || hasPayment || wsMode !== 'personal') return;
  welcomeShown = true;
  openModal('m-welcome');
}

let apiKeys = [
  {id:'1',name:'default',val:'sk_live_acme_default_000000000',owner:null,ownerName:'',created:'2026-01-03',qps:0},
  {id:'2',name:'Search Prod Key',val:'sk_live_1234567890abcdef3f8a',owner:'jane',ownerName:'Jane Niu',created:'2026-01-03',qps:50},
  {id:'3',name:'Search Dev Key',val:'sk_live_1234567890abcdefxyz9',owner:'alex',ownerName:'Alex Johnson',created:'2026-01-15',qps:20},
  {id:'4',name:"Sarah's Key",val:'sk_live_1234567890abcdefsara',owner:'sarah',ownerName:'Sarah Chen',created:'2026-02-02',qps:0},
  {id:'5',name:'CI/CD Pipeline',val:'sk_live_1234567890abcdefcicd',owner:null,ownerName:'',created:'2026-02-10',qps:30},
];

// ── Navigation ─────────────────────────────────────────────────
// Page-change hook — called by the SPA router (app.js go()) after each render.
// Replaces the prototype's original go(); app.js owns routing now.
function consolePageChanged(page) {
  currentPage = page;
  if (page === 'api-keys') renderApiKeys();
  applyRole();
}

// ── Workspace switcher ─────────────────────────────────────────
function toggleWsDrop() {
  const d = document.getElementById('ws-drop');
  const c = document.getElementById('ws-chevron');
  const open = d.classList.toggle('hidden');
  c.style.transform = open ? '' : 'rotate(180deg)';
}
document.addEventListener('click', e => {
  const wrap = document.getElementById('ws-wrap');
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById('ws-drop').classList.add('hidden');
    document.getElementById('ws-chevron').style.transform = '';
  }
});
function switchWs(m) {
  wsMode = m;
  document.getElementById('ws-drop').classList.add('hidden');
  document.getElementById('ws-chevron').style.transform = '';
  const settings = document.getElementById('mgmt-settings');
  // update checks
  ['chk-personal','chk-org','chk-org2'].forEach(id => document.getElementById(id).classList.add('hidden'));
  if (m==='personal') {
    document.getElementById('ws-name').textContent = 'Personal';
    if (settings) settings.style.display = 'none';
    document.getElementById('chk-personal').classList.remove('hidden');
  } else if (m==='org') {
    document.getElementById('ws-name').textContent = 'Acme Inc';
    if (settings) settings.style.display = '';
    document.getElementById('chk-org').classList.remove('hidden');
  } else if (m==='org2') {
    document.getElementById('ws-name').textContent = 'Tech Corp';
    if (settings) settings.style.display = '';
    document.getElementById('chk-org2').classList.remove('hidden');
  }
  go('overview');
}

// ── Payment toggle ───────────────────────────────────────────────
// ── Billing mode (prepaid / postpaid) ──────────────────────────
function setBillingMode(mode) {
  billingMode = mode;
  ['prepaid','postpaid'].forEach(x => {
    const b = document.getElementById('bm-'+x);
    if (!b) return;
    if (x===mode) { b.style.cssText='background:#0398551a;color:#039855;border-color:rgba(3,152,85,.3)'; }
    else { b.style.cssText=''; b.className='flex-1 text-xs py-1 rounded border border-[#e7e7e7] text-[#737373]'; }
  });
  const wrap = document.getElementById('bm-status-wrap');
  if (wrap) wrap.classList.toggle('hidden', mode!=='postpaid');
  applyRole();
}

function setPostpaidStatus(s) {
  postpaidStatus = s;
  applyPostpaid();
}

// Demo data per postpaid status.
//   used   = current-cycle unbilled spend (this month, not yet invoiced)
//   unpaid = balance owed on the most recent issued monthly invoice (INV-2026-05); 0 = fully paid
const LIMIT = 5000;
const POSTPAID_SCENARIOS = {
  firstMonth:{used:0,       unpaid:0,       balance:0,      hasOverdue:false, suspended:false, firstMonth:true, chip:'Invoiced billing · active'},
  normal:    {used:1903.10, unpaid:1820.40, balance:125.50, hasOverdue:false, suspended:false, chip:'Invoiced billing · active'},
  warn80:    {used:2100.00, unpaid:2200.00, balance:0,      hasOverdue:false, suspended:false, chip:'Invoiced billing · active'},
  warn90:    {used:2300.00, unpaid:2300.00, balance:0,      hasOverdue:false, suspended:false, chip:'Invoiced billing · active'},
  overdue:   {used:1500.00, unpaid:2300.00, balance:0,      hasOverdue:true,  suspended:false, chip:'Invoiced billing · active'},
  suspended: {used:2700.00, unpaid:2300.00, balance:0,      hasOverdue:true,  suspended:true,  chip:'Suspended · unpaid invoice'},
};

function fmt(n){ return '$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}); }

function applyPostpaid() {
  const isPost = billingMode==='postpaid';
  const sc = POSTPAID_SCENARIOS[postpaidStatus] || POSTPAID_SCENARIOS.normal;
  const owed = sc.used + sc.unpaid;
  // Usable headroom = credit limit + prepaid balance (balance offsets the invoice at month-end)
  const avail = LIMIT + sc.balance;
  const pct = Math.min(100, Math.round(owed / avail * 100));

  // ── hero variants ──
  const heroPre = document.getElementById('billing-hero-prepaid');
  const heroPost = document.getElementById('billing-hero-postpaid');
  if (heroPre) heroPre.classList.toggle('hidden', isPost);
  if (heroPost) heroPost.classList.toggle('hidden', !isPost);

  // ── elements toggled only by mode ──
  [['billing-settlement-bar'],['billing-spend-note'],['billing-payment-note'],['billing-invoices-postpaid']].forEach(([id])=>{
    const el = document.getElementById(id); if (el) el.classList.toggle('hidden', !isPost);
  });
  // Auto recharge card: hidden in postpaid (prepaid visibility left to applyRole's owner check)
  const autoRech = document.getElementById('billing-auto-recharge');
  if (autoRech && isPost) autoRech.style.display = 'none';
  const invPre = document.getElementById('billing-invoices-prepaid');
  if (invPre) invPre.classList.toggle('hidden', isPost);
  document.querySelectorAll('.bp-settle-label, .bp-balance-offset').forEach(el=>{
    el.classList.toggle('hidden', !isPost);
  });
  // Spend card title
  const spendTitle = document.getElementById('billing-spend-title');
  if (spendTitle) spendTitle.textContent = isPost ? 'Current cycle usage' : 'Spend this month';

  if (!isPost) { renderPostpaidBanner(false); return; }

  // ── hero: amount owed = unpaid invoice + current-cycle unbilled usage ──
  const set = (id,v)=>{ const e=document.getElementById(id); if(e) e.textContent=v; };
  const overdue = sc.suspended || sc.hasOverdue;
  const hasUnpaid = sc.unpaid>0;
  set('bp-owed', fmt(owed));
  set('bp-limit', fmt(avail));
  let barLbl = pct+'% used · '+fmt(Math.max(0, avail-owed))+' available';
  if (sc.balance>0) barLbl += ' · '+fmt(LIMIT)+' limit + '+fmt(sc.balance)+' balance';
  set('bp-bar-label', barLbl);
  set('bp-cycle-amt', fmt(sc.used));

  // progress bar color
  const bar = document.getElementById('bp-bar');
  if (bar) {
    bar.style.width = pct+'%';
    bar.style.background = pct>=100 ? '#dc2626' : pct>=80 ? '#f59e0b' : '#22c55e';
  }
  // status chip
  const chip = document.getElementById('bp-status-chip');
  if (chip) {
    chip.textContent = sc.chip;
    if (sc.suspended) chip.className='inline-flex items-center rounded-full bg-red-500/20 border border-red-300/40 px-3 py-1 text-xs text-red-100';
    else chip.className='inline-flex items-center rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs text-green-50';
  }

  // Breakdown — unpaid invoice row (the only payable part). Hidden when nothing is owed on issued invoices.
  const unpaidRow = document.getElementById('bp-unpaid-row');
  if (unpaidRow) unpaidRow.classList.toggle('hidden', !hasUnpaid);
  set('bp-unpaid-amt', fmt(sc.unpaid));
  const unpaidSub = document.getElementById('bp-unpaid-sub');
  if (unpaidSub) unpaidSub.innerHTML = overdue
    ? 'INV-2026-05 · <span style="color:#fca5a5">overdue since Jun 1</span>'
    : 'INV-2026-05 · due Jul 1';

  // First-month / fresh: no unpaid invoice and no current-cycle usage yet → show empty state
  const noCharges = !hasUnpaid && sc.used<=0;
  const cycleRow = document.getElementById('bp-cycle-row');
  if (cycleRow) cycleRow.classList.toggle('hidden', sc.used<=0);
  const bdEmpty = document.getElementById('bp-breakdown-empty');
  if (bdEmpty) bdEmpty.classList.toggle('hidden', !noCharges);

  // Prepaid balance (right column; distinct from credit limit, reduces next invoice)
  set('bp-balance-amt', fmt(sc.balance));
  const balNote = document.getElementById('bp-balance-note');
  if (balNote) balNote.textContent = sc.balance>0
    ? 'Auto-applied to your next invoice (Jul 1)'
    : 'Add credits to offset future invoices';
  // settlement bar estimate — balance is applied at invoicing, so est due = current usage − balance
  const sbText = document.getElementById('bp-settlement-text');
  if (sbText) {
    const estDue = Math.max(0, sc.used - sc.balance);
    const balPart = sc.balance>0
      ? ' (usage '+fmt(sc.used)+' − balance '+fmt(sc.balance)+')'
      : '';
    sbText.innerHTML = 'Next invoice: <span class="font-medium text-[#0a0a0a]">Jul 1, 2026</span> · est. due <span class="font-medium text-[#0a0a0a]">'+fmt(estDue)+'</span>'+balPart+' · NET 30';
  }

  renderPostpaidBanner(true, sc, owed, pct);
  renderPostpaidInvoices(sc);
}

function renderPostpaidBanner(isPost, sc, owed, pct) {
  const banner = document.getElementById('billing-postpaid-banner');
  if (!banner) return;
  const txt = document.getElementById('bpb-text');
  const act = document.getElementById('bpb-action');
  const icon = document.getElementById('bpb-icon');
  let show=false, color='', textColor='', msg='', showAct=false;
  if (isPost) {
    if (sc.suspended) {
      show=true; showAct=true;
      color='border-red-200 bg-red-50'; textColor='text-red-700';
      msg='<strong>Service suspended</strong> due to an overdue invoice. Pay now to restore access automatically.';
    } else if (sc.hasOverdue) {
      show=true; showAct=true;
      color='border-red-200 bg-red-50'; textColor='text-red-700';
      msg='Invoice <strong>INV-2026-05</strong> is overdue. Pay now to avoid service interruption.';
    } else if (pct>=90) {
      show=true;
      color='border-red-200 bg-red-50'; textColor='text-red-700';
      msg="You've used <strong>"+pct+"%</strong> of your "+fmt(LIMIT)+" credit limit this cycle. Service will be suspended at 100%.";
    } else if (pct>=80) {
      show=true;
      color='border-orange-200 bg-orange-50'; textColor='text-orange-700';
      msg="You've used <strong>"+pct+"%</strong> of your "+fmt(LIMIT)+" credit limit this cycle.";
    }
  }
  banner.classList.toggle('hidden', !show);
  if (!show) return;
  banner.className = 'mb-6 px-4 py-3.5 rounded-xl flex items-start gap-3 border '+color;
  if (txt){ txt.className='flex-1 text-sm '+textColor; txt.innerHTML=msg; }
  if (icon) icon.className='w-5 h-5 shrink-0 mt-0.5 '+textColor;
  if (act) act.classList.toggle('hidden', !showAct);
}

function invoiceStatusBadge(st) {
  const map={OPEN:['bg-blue-50','text-blue-700','border-blue-200'],PAID:['bg-[#f5f5f5]','text-[#737373]','border-[#e7e7e7]'],OVERDUE:['bg-red-50','text-red-700','border-red-200'],VOID:['bg-[#f5f5f5]','text-[#a3a3a3]','border-[#e7e7e7]']};
  const c=map[st]||map.PAID;
  return '<span class="px-3 py-1 rounded-full text-xs '+c[0]+' '+c[1]+' border '+c[2]+'">'+st+'</span>';
}
const INV_DOWNLOAD = '<button onclick="toast(\'Invoice downloaded\')" class="inline-flex items-center gap-2 hover:opacity-80" style="color:#039855"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download</button>';
const INV_PAYNOW = '<button onclick="openModal(\'m-recharge\')" class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium text-white hover:opacity-90" style="background:#039855">Pay now</button>';

function typeTag(kind) {
  return kind==='invoice'
    ? '<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-[#f5f5f5] text-[#737373] border border-[#e7e7e7]">Invoice</span>'
    : '<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200">Receipt</span>';
}

// All billing records keyed by document number — shared by the list and the detail modal.
let bpRecords = {};
const INV_VIEW = (n)=>'<button onclick="event.stopPropagation();openInvoiceDetail(\''+n+'\')" class="inline-flex items-center gap-2 hover:opacity-80" style="color:#039855">View <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></button>';

function renderPostpaidInvoices(sc) {
  const overdue = sc.suspended || sc.hasOverdue;
  // Most recent issued invoice — amount due = usage − prepaid balance applied at invoicing (per updated rule)
  const latest = {
    kind:'invoice', n:'INV-2026-05', date:'2026-06-01', period:'2026-05-01 ~ 2026-05-31',
    due: overdue ? '2026-06-01' : '2026-07-01',
    amt: sc.unpaid, status: overdue ? 'OVERDUE' : 'OPEN',
    balApplied: sc.balance>0 ? sc.balance : 0,
  };

  // Full ledger
  const invoices = [
    latest,
    {kind:'invoice', n:'INV-2026-04', date:'2026-05-01', period:'2026-04-01 ~ 2026-04-30', due:'2026-05-31', amt:1820.40, status:'PAID', paidDate:'2026-05-12'},
    {kind:'invoice', n:'INV-2026-03', date:'2026-04-01', period:'2026-03-01 ~ 2026-03-31', due:'2026-04-30', amt:1710.00, status:'VOID', note:'Voided — reissued as INV-2026-03R'},
    {kind:'invoice', n:'INV-2026-03R', date:'2026-04-01', period:'2026-03-01 ~ 2026-03-31', due:'2026-04-30', amt:1640.10, status:'PAID', paidDate:'2026-04-15'},
    {kind:'invoice', n:'INV-2026-02', date:'2026-03-01', period:'2026-02-01 ~ 2026-02-28', due:'2026-03-30', amt:1402.75, status:'PAID', paidDate:'2026-03-09'},
    {kind:'invoice', n:'INV-2026-01', date:'2026-02-01', period:'2026-01-01 ~ 2026-01-31', due:'2026-03-02', amt:1180.30, status:'PAID', paidDate:'2026-02-20'},
  ];
  const receipts = [
    {kind:'receipt', n:'RCPT-2026-0412', date:'2026-04-12', amt:500.00,  method:'Visa ···· 4242'},
    {kind:'receipt', n:'RCPT-2026-0228', date:'2026-02-28', amt:300.00,  method:'Visa ···· 4242'},
    {kind:'receipt', n:'RCPT-2026-0105', date:'2026-01-05', amt:1000.00, method:'Wire transfer'},
  ];

  // First month on invoiced billing: no issued invoices or receipts yet
  if (sc.firstMonth) { invoices.length = 0; receipts.length = 0; }

  // Index every record so the detail modal can look it up
  bpRecords = {};
  [...invoices, ...receipts].forEach(r => { bpRecords[r.n] = r; });

  // ── Unpaid invoices: open / overdue invoices only (empty state when none) ──
  const oBody = document.getElementById('bp-outstanding-body');
  const summary = document.getElementById('bp-outstanding-summary');
  const emptyEl = document.getElementById('bp-outstanding-empty');
  const tableWrap = document.getElementById('bp-outstanding-table-wrap');
  const hasOutstanding = sc.unpaid>0;
  if (emptyEl) emptyEl.classList.toggle('hidden', hasOutstanding);
  if (tableWrap) tableWrap.classList.toggle('hidden', !hasOutstanding);
  // Neutral by default; only an actually overdue invoice tints the card red
  if (tableWrap) tableWrap.className = 'rounded-xl border p-2 ' + (overdue ? 'border-red-200 bg-red-50/40' : 'border-[#e7e7e7] bg-white');
  if (summary) summary.textContent = '';
  if (oBody && hasOutstanding) {
    const dueCls = latest.status==='OVERDUE' ? 'text-red-600 font-medium' : 'text-[#737373]';
    // balance applied at invoicing → show what reduced the amount due
    const balNote = latest.balApplied>0
      ? '<div class="text-xs text-[#737373] mt-0.5">Usage '+fmt(sc.unpaid+latest.balApplied)+' − balance '+fmt(latest.balApplied)+' applied</div>'
      : '';
    const payBtn = '<button onclick="event.stopPropagation();openModal(\'m-recharge\')" class="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium text-white hover:opacity-90" style="background:#039855">Pay now</button>';
    oBody.innerHTML = '<tr onclick="openInvoiceDetail(\''+latest.n+'\')" class="cursor-pointer hover:bg-[#f5f5f5]">'
      +'<td class="py-3 px-4 text-[#0a0a0a] font-medium">'+latest.n+balNote+'</td>'
      +'<td class="py-3 px-4 text-[#737373]">'+latest.period+'</td>'
      +'<td class="py-3 px-4 '+dueCls+'">'+latest.due+'</td>'
      +'<td class="py-3 px-4 text-[#0a0a0a] font-semibold">'+fmt(latest.amt)+'</td>'
      +'<td class="py-3 px-4">'+invoiceStatusBadge(latest.status)+'</td>'
      +'<td class="py-3 px-4 text-right whitespace-nowrap">'+payBtn+' <span class="inline-block w-2"></span>'+INV_VIEW(latest.n)+'</td>'
      +'</tr>';
    if (summary) summary.textContent = '1 invoice · '+fmt(latest.amt)+' due'+(latest.status==='OVERDUE'?' · overdue':'');
  }

  // ── Billing history: everything else (paid/void invoices + receipts), newest first ──
  const hBody = document.getElementById('bp-history-body');
  if (hBody) {
    const history = [...invoices.filter(r=>r.status!=='OPEN'&&r.status!=='OVERDUE'), ...receipts].sort((a,b)=> a.date<b.date?1:a.date>b.date?-1:0);
    const hEmpty = document.getElementById('bp-history-empty');
    if (hEmpty) hEmpty.classList.toggle('hidden', history.length>0);
    hBody.innerHTML = history.map(r=>{
      const isVoid = r.status==='VOID';
      const isReceipt = r.kind==='receipt';
      const dateOrPeriod = isReceipt ? r.date : r.period;
      const docSub = isReceipt ? 'Recharge · '+r.method : (r.note || '');
      const docCell = '<span class="'+(isVoid?'text-[#a3a3a3] line-through':'text-[#0a0a0a] font-medium')+'">'+r.n+'</span>'
        + (docSub ? '<div class="text-xs text-[#a3a3a3] mt-0.5">'+docSub+'</div>' : '');
      const amtCell = isVoid ? '<span class="text-[#a3a3a3] line-through">'+fmt(r.amt)+'</span>'
        : isReceipt ? '<span class="text-[#0a0a0a]">+'+fmt(r.amt)+'</span>'
        : '<span class="text-[#0a0a0a]">'+fmt(r.amt)+'</span>';
      const statusCell = isReceipt ? invoiceStatusBadge('PAID') : invoiceStatusBadge(r.status);
      return '<tr onclick="openInvoiceDetail(\''+r.n+'\')" class="border-b border-[#f5f5f5] cursor-pointer hover:bg-[#f5f5f5]'+(isVoid?' bg-[#f5f5f5]/40':'')+'">'
        +'<td class="py-4 px-4">'+docCell+'</td>'
        +'<td class="py-4 px-4 text-[#737373]">'+dateOrPeriod+'</td>'
        +'<td class="py-4 px-4">'+amtCell+'</td>'
        +'<td class="py-4 px-4">'+statusCell+'</td>'
        +'<td class="py-4 px-4 text-right whitespace-nowrap">'+INV_VIEW(r.n)+'</td>'
        +'</tr>';
    }).join('');
  }
}

// Representative line items so the detail total reconciles to the record amount.
function bpLineItems(r) {
  if (r.kind==='receipt') return [{label:'Prepaid credit top-up', desc:r.method, amt:r.amt}];
  const gross = r.amt + (r.balApplied||0);   // invoice total before balance
  const sub = 200;                            // QPS Scale monthly subscription
  const usage = Math.max(0, gross - sub);
  return [
    {label:'Search',           desc:'API · calls + content tokens', amt:+(usage*0.50).toFixed(2)},
    {label:'Extract',          desc:'API · successful URLs',        amt:+(usage*0.10).toFixed(2)},
    {label:'Embedding',        desc:'API · tokens',                 amt:+(usage*0.08).toFixed(2)},
    {label:'Application',      desc:'Web Chat · Broad · Deep',      amt:+(usage*0.32).toFixed(2)},
    {label:'Plan subscription', desc:'Pro · 100 QPS / month',         amt:sub},
  ];
}

function openInvoiceDetail(n) {
  const r = bpRecords[n];
  if (!r) return;
  const isReceipt = r.kind==='receipt';
  const isVoid = r.status==='VOID';
  const unpaid = r.status==='OPEN' || r.status==='OVERDUE';
  const set = (id,v)=>{ const e=document.getElementById(id); if(e) e.textContent=v; };

  const statusEl = document.getElementById('bpd-status');
  if (statusEl) statusEl.innerHTML = isReceipt ? invoiceStatusBadge('PAID') : invoiceStatusBadge(r.status);
  set('bpd-number', r.n);
  set('bpd-amount', fmt(r.amt));

  let paid = '';
  if (isReceipt) paid = 'Paid on '+r.date;
  else if (r.status==='PAID') paid = 'Paid on '+(r.paidDate||r.date);
  else if (r.status==='OVERDUE') paid = 'Overdue since '+r.due;
  else if (r.status==='OPEN') paid = 'Due '+r.due;
  else if (isVoid) paid = 'Voided' + (r.note?' · '+r.note.replace('Voided — ',''):'');
  const paidEl = document.getElementById('bpd-paidline');
  if (paidEl) { paidEl.textContent = paid; paidEl.className = 'text-sm mb-4 '+(r.status==='OVERDUE'?'text-red-600':'text-[#737373]'); }

  set('bpd-invdate', r.date || '—');
  set('bpd-due', isReceipt ? '—' : (r.due||'—'));
  const billto = document.getElementById('bpd-billto');
  if (billto) billto.innerHTML = 'Acme Inc<br>jane@acmeinc.com';

  const dlInvoice = '<button onclick="toast(\'Invoice PDF downloaded\')" class="px-4 py-2 rounded-lg text-sm font-medium border border-[#dbdbdb] text-[#737373] hover:bg-[#f5f5f5]">Download invoice</button>';
  const dlReceipt = (primary)=>'<button onclick="toast(\'Receipt PDF downloaded\')" class="px-4 py-2 rounded-lg text-sm font-medium '+(primary?'text-white hover:opacity-90':'border border-[#dbdbdb] text-[#737373] hover:bg-[#f5f5f5]')+'" '+(primary?'style="background:#039855"':'')+'>Download receipt</button>';
  const payInvoice = '<button onclick="closeModal(\'m-invoice-detail\');openModal(\'m-recharge\')" class="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90" style="background:#039855">Pay invoice</button>';
  const share = '<button onclick="toast(\'Share link copied\')" class="px-4 py-2 rounded-lg text-sm font-medium border border-[#dbdbdb] text-[#737373] hover:bg-[#f5f5f5]">Share</button>';
  let actions;
  if (isReceipt) actions = dlReceipt(true) + dlInvoice + share;
  else if (unpaid) actions = payInvoice + dlInvoice + share;
  else if (isVoid) actions = dlInvoice;
  else actions = dlReceipt(true) + dlInvoice + share;   // PAID invoice → both docs available
  const actEl = document.getElementById('bpd-actions');
  if (actEl) actEl.innerHTML = actions;

  const lines = bpLineItems(r);
  const linesEl = document.getElementById('bpd-lines');
  if (linesEl) linesEl.innerHTML = lines.map(li=>
    '<tr class="border-b border-[#f5f5f5]">'
    +'<td class="py-3 pr-4"><div class="text-[#0a0a0a]">'+li.label+'</div><div class="text-xs text-[#a3a3a3]">'+li.desc+'</div></td>'
    +'<td class="py-3 pl-4 text-right text-[#0a0a0a] tabular-nums align-top">'+fmt(li.amt)+'</td>'
    +'</tr>'
  ).join('');

  const gross = lines.reduce((s,li)=>s+li.amt,0);
  set('bpd-subtotal', fmt(gross));
  const balRow = document.getElementById('bpd-balrow');
  const bal = r.balApplied||0;
  if (balRow) balRow.classList.toggle('hidden', !(bal>0));
  if (bal>0) set('bpd-bal', '−'+fmt(bal));
  set('bpd-total-label', isReceipt ? 'Total' : 'Total ('+r.period+')');
  set('bpd-total', fmt(r.amt));
  set('bpd-amountdue', unpaid ? fmt(r.amt) : fmt(0));

  openModal('m-invoice-detail');
}

function handlePaymentMethodAction() {
  if (hasPayment) {
    toast('Opening Stripe Customer Portal…');
  } else {
    setPayment(true);
    toast('Payment method added successfully');
  }
}

function setPayment(active) {
  hasPayment = active;
  if (!active) welcomeShown = false; // allow welcome modal to show again
  ['nocard','active'].forEach(x => {
    const b = document.getElementById('rb-'+x);
    if (!b) return;
    const isOn = (x==='nocard' && !active) || (x==='active' && active);
    if (isOn) { b.style.cssText='background:#0398551a;color:#039855;border-color:rgba(3,152,85,.3)'; }
    else { b.style.cssText=''; b.className='flex-1 text-xs py-1 rounded border border-[#e7e7e7] text-[#737373]'; }
  });
  if (currentPage==='api-keys') renderApiKeys();
  applyRole();
}

// ── Role ────────────────────────────────────────────────────────
function setRole(r) {
  role = r;
  ['owner','manager','member'].forEach(x => {
    const b = document.getElementById('rb-'+x);
    if (x===r) { b.style.cssText='background:#0398551a;color:#039855;border-color:rgba(3,152,85,.3)'; }
    else { b.style.cssText=''; b.className='flex-1 text-xs py-1 rounded border border-[#e7e7e7] text-[#737373]'; }
  });
  if (currentPage==='api-keys') renderApiKeys();
  applyRole();
}

function applyRole() {
  const isOwner = role==='owner', isMgr = role==='manager', isMem = role==='member';

  // ov: update key widget + payment banner
  updateOvKeyWidget();
  renderPaymentBanner();
  if (window.updateOverviewUser) window.updateOverviewUser();

  // api keys: member notice, create btn, service keys tab
  const akNotice = document.getElementById('ak-member-notice');
  if (akNotice) akNotice.classList.toggle('hidden', !isMem || wsMode==='personal');
  const btnCreate = document.getElementById('btn-create-key');
  if (btnCreate) btnCreate.style.display = ''; // All roles can create API keys
  const svcTab = document.getElementById('ak-svc-tab');
  const svcVisible = isOwner && wsMode!=='personal';
  if (svcTab) svcTab.style.display = svcVisible ? '' : 'none';
  // If Service Keys tab is hidden but currently active, switch back to API Keys
  if (!svcVisible && akActiveTab === 'svc') {
    const apiTabBtn = document.querySelector('#page-api-keys .tab-btn');
    if (apiTabBtn) switchAkTab('api', apiTabBtn);
  }
  // owner column visibility
  const th = document.getElementById('ak-th-owner');
  if (th) th.style.display = wsMode!=='personal' ? '' : 'none';

  // usage — no org-specific visibility changes needed (API key filter shows owner info)

  // billing
  const canManageBilling = isOwner || wsMode==='personal'; // only Owner (or personal mode) can do billing actions

  // payment warning
  const payWarn = document.getElementById('billing-payment-warning');
  if (payWarn) payWarn.style.display = hasPayment ? 'none' : '';

  // Add credits button — Owner only
  const ownerBtns = document.getElementById('billing-owner-btns');
  if (ownerBtns) ownerBtns.style.display = canManageBilling ? '' : 'none';

  // QPS upgrade — Owner only
  const qpsUpgrade = document.getElementById('billing-qps-upgrade');
  if (qpsUpgrade) qpsUpgrade.style.display = canManageBilling ? '' : 'none';

  // Auto recharge — Owner only
  const autoRecharge = document.getElementById('billing-auto-recharge');
  if (autoRecharge) autoRecharge.style.display = canManageBilling ? '' : 'none';

  // Payment methods — Owner only
  const payMethods = document.getElementById('billing-payment-methods');
  if (payMethods) payMethods.style.display = canManageBilling ? '' : 'none';

  // Payment method button state (Add vs Manage)
  const addPayBtn = document.getElementById('billing-add-payment-btn');
  if (addPayBtn) {
    if (hasPayment) { addPayBtn.textContent = 'Manage'; addPayBtn.classList.remove('text-white'); addPayBtn.style.background = ''; addPayBtn.classList.add('border','border-[#dbdbdb]','text-[#737373]','hover:bg-[#f5f5f5]'); }
    else { addPayBtn.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>Add'; addPayBtn.classList.add('text-white'); addPayBtn.style.background = '#039855'; addPayBtn.classList.remove('border','border-[#dbdbdb]','text-[#737373]','hover:bg-[#f5f5f5]'); }
  }
  const noPayText = document.getElementById('billing-no-payment-text');
  if (noPayText) noPayText.style.display = hasPayment ? 'none' : '';
  const payCards = document.getElementById('billing-payment-cards');
  if (payCards) payCards.classList.toggle('hidden', !hasPayment);

  // Org balance label
  const balLabel = document.getElementById('billing-balance-label');
  if (balLabel) balLabel.textContent = wsMode!=='personal' ? 'Organization balance · ' + (wsMode==='org'?'Acme Inc':'Tech Corp') : 'Current balance';

  // Sole Owner detection (in prototype, Jane is the only Owner in demo data)
  const isSoleOwner = isOwner; // simplified — real app checks owner count

  // members (now inside settings)
  const btnInvite = document.getElementById('btn-invite');
  document.querySelectorAll('.role-picker').forEach(p => {
    p.style.display = '';
    const btn = p.querySelector('.role-picker-btn');
    const isJane = p.id === 'jane-role-picker';
    // Jane's role picker: locked when sole Owner (regardless of viewer role)
    // Other pickers: only Owner can change
    const disabled = isJane ? isSoleOwner : !isOwner;
    if (btn) {
      btn.disabled = disabled;
      btn.style.opacity = disabled ? '0.5' : '';
      btn.style.cursor = disabled ? 'default' : 'pointer';
      btn.style.background = disabled ? '#f8fafc' : '';
      btn.style.borderColor = disabled ? '#e2e8f0' : '';
      const chevron = btn.querySelector('svg');
      if (chevron) chevron.style.opacity = disabled ? '0.3' : '';
      if (disabled) btn.onclick = null;
      else btn.setAttribute('onclick','toggleRolePicker(this)');
    }
  });
  ['rem-alex','rem-sarah','rem-bob'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.visibility = isOwner ? '' : 'hidden';
  });

  // Organization tab — Org Name: Owner can edit, others read-only
  const orgNameEditBtn = document.getElementById('org-name-edit-btn');
  if (orgNameEditBtn) orgNameEditBtn.style.display = isOwner ? '' : 'none';
  // Reset to display mode when switching roles
  const orgNameDisplay = document.getElementById('org-name-display');
  const orgNameEdit = document.getElementById('org-name-edit');
  if (orgNameDisplay) orgNameDisplay.classList.remove('hidden');
  if (orgNameEdit) orgNameEdit.classList.add('hidden');

  // Sole Owner protection: cannot leave
  const leaveBtn = document.getElementById('leave-org-btn');
  const leaveHint = document.getElementById('leave-sole-owner-hint');
  if (leaveBtn) {
    if (isSoleOwner) {
      leaveBtn.disabled = true; leaveBtn.style.opacity = '0.4'; leaveBtn.style.cursor = 'not-allowed';
      leaveBtn.onclick = null;
    } else {
      leaveBtn.disabled = false; leaveBtn.style.opacity = ''; leaveBtn.style.cursor = '';
      leaveBtn.onclick = function(){ openLeave(); };
    }
  }
  if (leaveHint) leaveHint.classList.toggle('hidden', !isSoleOwner);

  // settings nav item only in org mode (Member also keeps access for Organization Tab + Leave)
  const settingsNav = document.getElementById('mgmt-settings');
  if (settingsNav) settingsNav.style.display = wsMode!=='personal' ? '' : 'none';

  // billing nav item: Member in org mode has no access
  const billingNav = document.getElementById('mgmt-billing');
  if (billingNav) billingNav.style.display = (wsMode!=='personal' && isMem) ? 'none' : '';

  // Settings: Member only sees Organization tab (Members tab hidden)
  const stMembersTab = document.getElementById('st-tab-members');
  const stGeneralTab = document.getElementById('st-tab-general');
  const stMembersPane = document.getElementById('st-pane-members');
  const stGeneralPane = document.getElementById('st-pane-general');
  if (stMembersTab) stMembersTab.style.display = isMem ? 'none' : '';
  if (isMem) {
    // Force show Organization pane
    if (stMembersPane) stMembersPane.classList.add('hidden');
    if (stGeneralPane) stGeneralPane.classList.remove('hidden');
    if (stMembersTab) stMembersTab.classList.remove('active');
    if (stGeneralTab) stGeneralTab.classList.add('active');
  }

  // ── Payment-gated UI ────────────────────────────────────────────
  // Helper: in org mode use "Add credits", personal mode keep "Add payment method"
  const ctaLabel = 'Add payment method →';
  // Only Owner can add credits; Manager and Member see passive banner without CTA
  const showCta = !(wsMode !== 'personal' && !isOwner);
  const isNonOwnerOrg = (wsMode !== 'personal' && !isOwner);

  // API Keys: show inactive banner when no payment
  const akNoPay = document.getElementById('ak-nopayment-notice');
  if (akNoPay) {
    akNoPay.style.display = (!hasPayment) ? '' : 'none';
    const akNoPayText = akNoPay.querySelector('p');
    const akNoPayLink = akNoPay.querySelector('a');
    if (akNoPayText) {
      if (wsMode !== 'personal') {
        akNoPayText.textContent = isNonOwnerOrg
          ? 'API keys are inactive. Please contact an owner to add credits.'
          : 'Add credits to activate your API keys.';
      } else {
        akNoPayText.textContent = 'Add a payment method to activate your API keys. Free credits included.';
      }
    }
    if (akNoPayLink) {
      akNoPayLink.textContent = ctaLabel;
      akNoPayLink.style.display = showCta ? '' : 'none';
    }
  }
  // API Keys create button: always usable (keys can be created even without payment, just inactive)
  if (btnCreate) { btnCreate.style.opacity=''; btnCreate.style.pointerEvents=''; }

  // Billing: recharge button state
  const rechBtn = document.querySelector('#m-recharge-trigger');
  // Web Search: run button
  const wsRunBtn = document.getElementById('ws-run-btn');
  if (wsRunBtn) {
    if (hasPayment) {
      wsRunBtn.style.background='#039855'; wsRunBtn.style.cursor='pointer';
      wsRunBtn.onclick = function(){ wsRun(); };
    } else {
      wsRunBtn.style.background='#cbd5e1'; wsRunBtn.style.cursor='not-allowed';
      wsRunBtn.onclick = function(){
        toast(wsMode !== 'personal' ? 'Credits required to run queries' : 'Payment method required to run queries');
      };
    }
  }
  // Web Search: payment notice row
  const wsPayNotice = document.getElementById('ws-pay-notice');
  if (wsPayNotice) {
    wsPayNotice.style.display = hasPayment ? 'none' : '';
    const wsText = wsPayNotice.querySelector('span');
    const wsLink = wsPayNotice.querySelector('a');
    if (wsText) {
      wsText.textContent = isNonOwnerOrg
        ? 'API keys are inactive. Please contact an owner to add a payment method.'
        : 'Add a payment method to unlock the API. Free credits included.';
    }
    if (wsLink) {
      wsLink.textContent = ctaLabel;
      wsLink.style.display = showCta ? '' : 'none';
    }
  }

  // Extract API: payment notice + Run button
  const exPayNotice = document.getElementById('ex-pay-notice');
  if (exPayNotice) {
    exPayNotice.classList.toggle('hidden', hasPayment);
    exPayNotice.classList.toggle('flex', !hasPayment);
    const exText = document.getElementById('ex-pay-notice-text');
    const exLink = document.getElementById('ex-pay-notice-link');
    if (exText) {
      exText.textContent = isNonOwnerOrg
        ? 'API keys are inactive. Please contact an owner to add a payment method.'
        : 'Add a payment method to unlock the API. Free credits included.';
    }
    if (exLink) { exLink.textContent = ctaLabel; exLink.style.display = showCta ? '' : 'none'; }
  }
  exUpdateBtn();

  // Showcase pages (Web Chat / Broad Search): payment notice
  ['web-chat-pay-notice','broad-search-pay-notice'].forEach(id => {
    const n = document.getElementById(id);
    if (!n) return;
    n.style.display = hasPayment ? 'none' : '';
    const txt = n.querySelector('p');
    const link = n.querySelector('a');
    const label = id.includes('web-chat') ? 'Web Chat' : 'Broad Search';
    if (txt) {
      txt.textContent = isNonOwnerOrg
        ? 'API keys are inactive. Please contact an owner to add a payment method.'
        : 'Add a payment method to unlock the API. Free credits included.';
    }
    if (link) {
      link.textContent = ctaLabel;
      link.style.display = showCta ? '' : 'none';
    }
  });

  // Billing: payment warning text
  const billPayWarnEl = document.getElementById('billing-payment-warning');
  if (billPayWarnEl) {
    const txt = billPayWarnEl.querySelector('p');
    const btn = billPayWarnEl.querySelector('button');
    if (txt) {
      if (wsMode !== 'personal') {
        txt.textContent = isNonOwnerOrg ? 'API keys are inactive. Please contact an owner to add credits.' : 'Add credits to activate your API keys.';
      } else {
        txt.textContent = 'A payment method is required to use the API.';
      }
    }
    if (btn) {
      btn.textContent = ctaLabel;
      btn.style.display = showCta ? '' : 'none';
    }
  }

  // Welcome modal: show when no payment on overview page
  if (hasPayment) { welcomeShown = true; }
  else if (currentPage === 'overview' && billingMode!=='postpaid' && !welcomeShown) {
    setTimeout(() => showWelcomeModal(), 300);
  }

  // Invoiced (postpaid) accounts are active without prepaid credits —
  // suppress every "add credits / add payment method to activate" prompt and enable run buttons.
  if (billingMode==='postpaid') {
    welcomeShown = true;
    ['billing-payment-warning','ws-pay-notice','web-chat-pay-notice','broad-search-pay-notice','ak-nopayment-notice','ak-member-notice'].forEach(id=>{
      const el = document.getElementById(id); if (el) el.style.display = 'none';
    });
    const exNotice = document.getElementById('ex-pay-notice');
    if (exNotice) { exNotice.classList.add('hidden'); exNotice.classList.remove('flex'); }
    const ovBanner = document.getElementById('ov-payment-banner');
    if (ovBanner) ovBanner.innerHTML = '';
    const wsRunBtn2 = document.getElementById('ws-run-btn');
    if (wsRunBtn2) { wsRunBtn2.style.background='#039855'; wsRunBtn2.style.cursor='pointer'; wsRunBtn2.onclick = function(){ wsRun(); }; }
    if (typeof exUpdateBtn === 'function') { /* ex run handled by its own state; notice hidden above */ }
  }

  // Postpaid (invoiced) billing overlays
  applyPostpaid();
}

// ── API Keys table ──────────────────────────────────────────────
function maskKey(v) { return v.slice(0,10)+'••••••••••'+v.slice(-4); }

function renderApiKeys() {
  const tbody = document.getElementById('ak-tbody');
  if (!tbody) return;
  const showOwner = wsMode !== 'personal';
  const visible = role==='member'
    ? apiKeys.filter(k => !k.owner || k.owner==='sarah')
    : apiKeys;
  document.getElementById('ak-count').textContent = 'Keys: '+visible.length+' / 100';

  tbody.innerHTML = visible.map(k => {
    const canEdit = role!=='member' || k.owner==='sarah';
    const canQps  = role!=='member';
    const canDel  = role!=='member';
    const ownerCell = showOwner
      ? (k.owner
          ? `<td class="py-3 px-4 text-[#737373]">${k.ownerName}</td>`
          : `<td class="py-3 px-4 text-[#737373] text-xs">Shared</td>`)
      : '';
    return `<tr class="border-b border-[#f5f5f5]">
      <td class="py-3 px-4 text-[#0a0a0a]">${k.name}${k.name==='default'?' <span class="text-xs px-2 py-1 bg-[#f5f5f5] text-[#a3a3a3] rounded">default</span>':''}</td>
      <td class="py-3 px-4 text-[#737373]"><code class="text-xs bg-[#f5f5f5] rounded px-2 py-1">${maskKey(k.val)}</code></td>
      ${ownerCell}
      <td class="py-3 px-4 text-[#737373]">${k.created}</td>
      <td class="py-3 px-4 text-[#737373]">${k.qps>0?k.qps+' QPS':'Unlimited'}</td>
      <td class="py-3 px-4 text-right">
        <div class="inline-flex items-center gap-2">
          ${canEdit?`<button onclick="openEditKey('${k.id}')" class="p-1 hover:bg-[#f5f5f5] rounded" title="Edit"><svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>`:''}
          ${canDel?`<button onclick="openDelKey('${k.id}','${k.name}')" class="p-1 hover:bg-[#f5f5f5] rounded" title="Delete"><svg class="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>`:''}
        </div>
      </td>
    </tr>`;
  }).join('') || `<tr><td colspan="6" class="py-10 text-center text-[#737373] text-sm">No API keys yet.</td></tr>`;

  // create modal: member auto-assigns to self
  const ownerWrap = document.getElementById('ck-owner-wrap');
  if (ownerWrap) {
    if (role==='member') ownerWrap.innerHTML = '<p class="text-xs text-[#a3a3a3]">This key will be assigned to you.</p>';
    else ownerWrap.innerHTML = `<label class="block text-xs text-[#737373] mb-1">Owner</label><select id="ck-owner" class="w-full px-3 py-2 border border-[#dbdbdb] rounded-lg text-sm bg-white focus:outline-none"><option value="" selected>Shared (all members)</option><option value="jane">Jane Niu (you)</option><option value="alex">Alex Johnson</option><option value="sarah">Sarah Chen</option><option value="bob">Bob Smith</option></select><p class="mt-1 text-xs text-[#a3a3a3]">Shared keys are accessible by all org members. Assigning a member enables per-member usage tracking.</p>`;
  }
  // QPS field: Member cannot set QPS
  const qpsWrap = document.getElementById('ck-qps-wrap');
  if (qpsWrap) qpsWrap.style.display = (role === 'member' && wsMode !== 'personal') ? 'none' : '';
}

function openEditKey(id) {
  editKeyId = id;
  const k = apiKeys.find(x=>x.id===id);
  if (!k) return;
  document.getElementById('ek-name').value = k.name;
  document.getElementById('ek-qps').value = k.qps || '';
  // Owner reassignment: only visible for Owner/Manager in org mode
  const ownerWrap = document.getElementById('ek-owner-wrap');
  if (ownerWrap) {
    const canReassign = role!=='member' && wsMode!=='personal';
    ownerWrap.style.display = canReassign ? '' : 'none';
    if (canReassign) {
      const sel = document.getElementById('ek-owner');
      if (sel) sel.value = k.owner || '';
    }
  }
  const qpsWrap = document.getElementById('ek-qps-wrap');
  if (qpsWrap) qpsWrap.style.display = role==='member' ? 'none' : '';
  openModal('m-edit-key');
}
function doSaveEdit() {
  const k = apiKeys.find(x=>x.id===editKeyId); if (!k) return;
  const n = document.getElementById('ek-name').value.trim();
  if (n) k.name = n;
  if (role!=='member') k.qps = parseInt(document.getElementById('ek-qps').value)||0;
  // Save owner reassignment
  if (role!=='member' && wsMode!=='personal') {
    const sel = document.getElementById('ek-owner');
    if (sel) {
      k.owner = sel.value || null;
      k.ownerName = {jane:'Jane Niu',alex:'Alex Johnson',sarah:'Sarah Chen',bob:'Bob Smith'}[sel.value] || '';
    }
  }
  renderApiKeys(); closeModal('m-edit-key'); toast('Saved');
}
function openDelKey(id, name) {
  delKeyId = id;
  document.getElementById('del-key-name').textContent = name;
  openModal('m-del-key');
}
function doDelKey() {
  apiKeys = apiKeys.filter(k=>k.id!==delKeyId);
  renderApiKeys(); closeModal('m-del-key'); toast('Deleted');
}
function doCreateKey() {
  const name = document.getElementById('ck-name').value.trim();
  if (!name) { toast('Please enter a name', true); return; }
  const ownerEl = document.getElementById('ck-owner');
  const owner = ownerEl ? ownerEl.value : 'sarah';
  const ownerName = {jane:'Jane Niu',alex:'Alex Johnson',sarah:'Sarah Chen',bob:'Bob Smith'}[owner]||'';
  const qps = parseInt((document.getElementById('ck-qps')||{}).value)||0;
  apiKeys.unshift({id:String(Date.now()),name,val:'sk_live_new'+Math.random().toString(36).slice(2,12),owner:owner||null,ownerName,created:new Date().toISOString().slice(0,10),qps});
  renderApiKeys(); closeModal('m-create-key'); toast('API key created');
}

// ── Service Keys ────────────────────────────────────────────────
const SVC_KEY_LIMIT = 10;
let svcKeys = [
  {id:'svc1', name:'Management Key', val:'sk_svc_acme_7d2c', created:'2026-01-10'},
];

function renderSvcKeys() {
  const tbody = document.getElementById('svc-tbody');
  if (!tbody) return;
  const count = document.getElementById('svc-count');
  if (count) count.textContent = 'Keys: '+svcKeys.length+' / '+SVC_KEY_LIMIT;

  tbody.innerHTML = svcKeys.map(k => `<tr class="border-b border-[#f5f5f5]">
    <td class="py-3 px-4 text-[#0a0a0a]">${k.name}</td>
    <td class="py-3 px-4 text-[#737373]"><code class="text-xs bg-[#f5f5f5] rounded px-2 py-1">${maskKey(k.val)}</code></td>
    <td class="py-3 px-4 text-[#737373]">${k.created}</td>
    <td class="py-3 px-4 text-right">
      <div class="inline-flex items-center gap-2">
        <button onclick="openEditSvc('${k.id}')" class="p-1 hover:bg-[#f5f5f5] rounded" title="Edit"><svg class="w-4 h-4 text-[#737373]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
        <button onclick="openDelSvc('${k.id}','${k.name}')" class="p-1 hover:bg-[#f5f5f5] rounded" title="Delete"><svg class="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
      </div>
    </td>
  </tr>`).join('') || '<tr><td colspan="4" class="py-10 text-center text-[#737373] text-sm">No service keys yet.</td></tr>';

  // Update create button state in header when on svc tab
  updateCreateBtnState();
}

function updateCreateBtnState() {
  const createBtn = document.getElementById('btn-create-key');
  if (!createBtn) return;
  if (akActiveTab === 'svc' && svcKeys.length >= SVC_KEY_LIMIT) {
    createBtn.style.opacity = '0.4';
    createBtn.style.pointerEvents = 'none';
  } else {
    createBtn.style.opacity = '';
    createBtn.style.pointerEvents = '';
  }
}

let editSvcId = null, delSvcId = null;

function openEditSvc(id) {
  editSvcId = id;
  const k = svcKeys.find(x=>x.id===id);
  if (!k) return;
  document.getElementById('esvc-name').value = k.name;
  openModal('m-edit-svc');
}
function doSaveSvcEdit() {
  const k = svcKeys.find(x=>x.id===editSvcId);
  if (!k) return;
  const n = document.getElementById('esvc-name').value.trim();
  if (!n) { toast('Please enter a name', true); return; }
  k.name = n;
  renderSvcKeys(); closeModal('m-edit-svc'); toast('Service key updated');
}

function openDelSvc(id, name) {
  delSvcId = id;
  document.getElementById('del-svc-name').textContent = name;
  openModal('m-del-svc');
}
function doDelSvc() {
  svcKeys = svcKeys.filter(k=>k.id!==delSvcId);
  renderSvcKeys(); closeModal('m-del-svc'); toast('Service key deleted');
}

function doCreateSvc() {
  if (svcKeys.length >= SVC_KEY_LIMIT) {
    toast('Service key limit reached ('+SVC_KEY_LIMIT+'/'+SVC_KEY_LIMIT+'). Delete unused keys to create new ones.', true);
    return;
  }
  const nameEl = document.querySelector('#m-create-svc input[type="text"]');
  const name = nameEl ? nameEl.value.trim() : '';
  if (!name) { toast('Please enter a name', true); return; }
  svcKeys.push({id:'svc'+Date.now(), name, val:'sk_svc_'+Math.random().toString(36).slice(2,10), created:new Date().toISOString().slice(0,10)});
  if (nameEl) nameEl.value = '';
  renderSvcKeys(); closeModal('m-create-svc'); toast('Service key created');
}

// ── Tab switches ────────────────────────────────────────────────
let akActiveTab = 'api';
function switchAkTab(t, btn) {
  akActiveTab = t;
  document.querySelectorAll('#page-api-keys .tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('ak-pane-api').classList.toggle('hidden', t!=='api');
  document.getElementById('ak-pane-svc').classList.toggle('hidden', t!=='svc');
  // Update header create button
  const createBtn = document.getElementById('btn-create-key');
  const createLabel = document.getElementById('btn-create-key-label');
  if (createBtn && createLabel) {
    if (t==='svc') {
      createLabel.textContent = 'Create Service Key';
      createBtn.onclick = function(){
        if (svcKeys.length >= SVC_KEY_LIMIT) { toast('Service key limit reached ('+SVC_KEY_LIMIT+'/'+SVC_KEY_LIMIT+'). Delete unused keys to create new ones.', true); return; }
        openModal('m-create-svc');
      };
    } else {
      createLabel.textContent = 'Create API key';
      createBtn.onclick = function(){ openModal('m-create-key'); };
    }
  }
  updateCreateBtnState();
  if (t==='svc') renderSvcKeys();
}
function switchStTab(t, btn) {
  document.querySelectorAll('#page-settings .tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  ['members','general','destinations'].forEach(id => {
    const pane = document.getElementById('st-pane-'+id);
    if (pane) pane.classList.toggle('hidden', t!==id);
  });
  if (t==='destinations') renderDestinations();
}

// ── Destinations ────────────────────────────────────────────────
let hasCollectApi = true; // mock org permission
let destinations = [
  { id:'dst_a1b2c3d4', name:'Production logs', bucket:'acme-prod-data', prefix:'octen/runs/', roleArn:'arn:aws:iam::555000111222:role/octen-collect', status:'active' },
  { id:'dst_e5f6g7h8', name:'Staging mirror', bucket:'acme-staging', prefix:'collect/', roleArn:'arn:aws:iam::555000111222:role/octen-staging', status:'pending' }
];
let destWizardStep = 1;
let destEditingId = null;
let destDeletingId = null;

function renderDestinations() {
  const noPerm = document.getElementById('dest-no-perm');
  const active = document.getElementById('dest-active');
  noPerm.classList.toggle('hidden', hasCollectApi);
  active.classList.toggle('hidden', !hasCollectApi);
  if (!hasCollectApi) return;

  const empty = document.getElementById('dest-empty');
  const wrap = document.getElementById('dest-list-wrap');
  empty.classList.toggle('hidden', destinations.length > 0);
  wrap.classList.toggle('hidden', destinations.length === 0);

  const body = document.getElementById('dest-list-body');
  body.innerHTML = destinations.map(d => {
    const statusBadge = ({
      active:   '<span class="px-2 py-1 rounded-full text-xs bg-[#0398551a] text-[#039855] border border-[#03985533]">active</span>',
      pending:  '<span class="px-2 py-1 rounded-full text-xs bg-[#f5f5f5] text-[#737373] border border-[#e7e7e7]">pending</span>',
      error:    '<span class="px-2 py-1 rounded-full text-xs bg-red-50 text-red-600 border border-red-200">error</span>'
    })[d.status];
    return `<tr class="border-b border-[#f5f5f5] last:border-b-0">
      <td class="py-3 px-4 text-[#0a0a0a]">${d.name}</td>
      <td class="py-3 px-4 text-[#737373]">S3</td>
      <td class="py-3 px-4 text-[#737373] font-mono text-xs">${d.bucket}/${d.prefix||''}</td>
      <td class="py-3 px-4"><div class="flex items-center gap-2"><code class="text-xs font-mono text-[#737373]">${d.id}</code><button onclick="navigator.clipboard.writeText('${d.id}');toast('Copied')" class="text-[#a3a3a3] hover:text-[#737373]"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button></div></td>
      <td class="py-3 px-4">${statusBadge}</td>
      <td class="py-3 px-4 text-right">
        <div class="inline-flex items-center gap-0.5">
          <span class="relative group/tip inline-block"><button onclick="testDestinationRow('${d.id}')" class="p-1.5 text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] rounded transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M10 8l5 4-5 4V8z"/></svg></button><span class="dest-tip">Test connection</span></span>
          <span class="relative group/tip inline-block"><button onclick="openEditDestination('${d.id}')" class="p-1.5 text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f5f5f5] rounded transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button><span class="dest-tip">Edit</span></span>
          <span class="relative group/tip inline-block"><button onclick="openDeleteDestination('${d.id}')" class="p-1.5 text-[#a3a3a3] hover:text-red-600 hover:bg-red-50 rounded transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button><span class="dest-tip">Delete</span></span>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function openAddDestination() {
  destEditingId = null;
  document.getElementById('dest-wiz-title').textContent = 'Add destination';
  document.getElementById('dest-name').value = '';
  document.getElementById('dest-bucket').value = '';
  document.getElementById('dest-bucket').disabled = false;
  document.getElementById('dest-prefix').value = '';
  document.getElementById('dest-prefix').disabled = false;
  document.getElementById('dest-bucket-hint').classList.add('hidden');
  document.getElementById('dest-role-arn').value = '';
  destWizardGoTo(1);
  openModal('m-dest-wizard');
}

function openEditDestination(id) {
  const d = destinations.find(x=>x.id===id);
  if (!d) return;
  destEditingId = id;
  document.getElementById('dest-wiz-title').textContent = 'Edit destination';
  document.getElementById('dest-name').value = d.name;
  document.getElementById('dest-bucket').value = d.bucket;
  document.getElementById('dest-bucket').disabled = true;
  document.getElementById('dest-prefix').value = d.prefix || '';
  document.getElementById('dest-prefix').disabled = true;
  document.getElementById('dest-bucket-hint').classList.remove('hidden');
  document.getElementById('dest-role-arn').value = d.roleArn;
  destWizardGoTo(1);
  openModal('m-dest-wizard');
}

function destWizardGoTo(step) {
  destWizardStep = step;
  [1,2,3].forEach(n=>{
    document.getElementById('dest-step-'+n).classList.toggle('hidden', n!==step);
    const s = document.getElementById('dws-'+n);
    const dot = s.querySelector('span:first-child');
    if (n<=step) { s.classList.remove('text-[#a3a3a3]'); s.querySelector('span:last-child').className = 'text-[#0a0a0a] font-medium'; dot.className = 'w-5 h-5 rounded-full bg-[#039855] text-white flex items-center justify-center text-xs font-medium'; }
    else { s.classList.add('text-[#a3a3a3]'); s.querySelector('span:last-child').className = ''; dot.className = 'w-5 h-5 rounded-full bg-[#e5e5e5] text-[#737373] flex items-center justify-center text-xs font-medium'; }
  });
  document.getElementById('dest-back-btn').classList.toggle('hidden', step===1);
  const nextBtn = document.getElementById('dest-next-btn');
  if (step===3) {
    nextBtn.textContent = 'Test connection';
    nextBtn.onclick = runDestinationTest;
  } else {
    nextBtn.textContent = 'Next';
    nextBtn.onclick = destWizardNext;
  }
  // Reset step 3 panes
  if (step===3) {
    document.getElementById('dest-test-pre').classList.remove('hidden');
    document.getElementById('dest-test-running').classList.add('hidden');
    document.getElementById('dest-test-success').classList.add('hidden');
    document.getElementById('dest-test-error').classList.add('hidden');
    const bucket = document.getElementById('dest-bucket').value || 'bucket';
    const prefix = document.getElementById('dest-prefix').value || '';
    document.getElementById('dest-test-path').textContent = `s3://${bucket}/${prefix}.octen-test-${Date.now()}`;
  }
}

function destWizardNext() {
  if (destWizardStep===1) {
    const name = document.getElementById('dest-name').value.trim();
    const bucket = document.getElementById('dest-bucket').value.trim();
    if (!name || !bucket) { toast('Name and Bucket are required', true); return; }
    // Populate Permission policy with actual bucket/prefix
    const prefix = document.getElementById('dest-prefix').value.trim();
    const resource = `arn:aws:s3:::${bucket}/${prefix}*`;
    document.getElementById('dest-perm-json').textContent = `{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:PutObject", "s3:DeleteObject"],
    "Resource": "${resource}"
  }]
}`;
    switchDestPolTab('trust');
    destWizardGoTo(2);
  } else if (destWizardStep===2) {
    const arn = document.getElementById('dest-role-arn').value.trim();
    if (!arn.startsWith('arn:aws:iam::')) { toast('Enter a valid Role ARN', true); return; }
    destWizardGoTo(3);
  }
}
function destWizardBack() { if (destWizardStep>1) destWizardGoTo(destWizardStep-1); }

let currentDestPolTab = 'trust';
function switchDestPolTab(which) {
  currentDestPolTab = which;
  const trustTab = document.getElementById('dest-pol-tab-trust');
  const permTab = document.getElementById('dest-pol-tab-perm');
  const trustPre = document.getElementById('dest-trust-json');
  const permPre = document.getElementById('dest-perm-json');
  const isTrust = which==='trust';
  trustTab.className = `flex-1 px-3 py-2 text-xs font-medium border-b-2 -mb-px ${isTrust?'text-[#0a0a0a] border-[#039855]':'text-[#737373] border-transparent'}`;
  permTab.className = `flex-1 px-3 py-2 text-xs font-medium border-b-2 -mb-px ${!isTrust?'text-[#0a0a0a] border-[#039855]':'text-[#737373] border-transparent'}`;
  trustPre.classList.toggle('hidden', !isTrust);
  permPre.classList.toggle('hidden', isTrust);
}

function runDestinationTest() {
  document.getElementById('dest-test-pre').classList.add('hidden');
  document.getElementById('dest-test-error').classList.add('hidden');
  document.getElementById('dest-test-success').classList.add('hidden');
  const running = document.getElementById('dest-test-running');
  running.classList.remove('hidden');
  // Reset step icons
  const setStep = (n, state) => {
    const el = document.getElementById('dts-'+n);
    if (state==='running') { el.className = 'flex items-center gap-2 text-xs text-[#737373]'; el.querySelector('span').className = 'w-4 h-4 rounded-full border-2 border-[#dbdbdb] border-t-[#039855] animate-spin'; }
    else if (state==='done') { el.className = 'flex items-center gap-2 text-xs text-[#737373]'; el.querySelector('span').outerHTML = '<svg class="w-4 h-4" fill="none" stroke="#039855" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>'; }
    else { el.className = 'flex items-center gap-2 text-xs text-[#a3a3a3]'; el.querySelector('span').className = 'w-4 h-4 rounded-full border border-[#e7e7e7]'; }
  };
  // Simulate sequential steps
  setTimeout(()=>{ setStep(1,'done'); setStep(2,'running'); }, 700);
  setTimeout(()=>{ setStep(2,'done'); setStep(3,'running'); }, 1400);
  setTimeout(()=>{
    setStep(3,'done');
    running.classList.add('hidden');
    // Save destination
    const name = document.getElementById('dest-name').value.trim();
    const bucket = document.getElementById('dest-bucket').value.trim();
    const prefix = document.getElementById('dest-prefix').value.trim();
    const roleArn = document.getElementById('dest-role-arn').value.trim();
    if (destEditingId) {
      const d = destinations.find(x=>x.id===destEditingId);
      Object.assign(d, { name, roleArn, status:'active' });
      document.getElementById('dest-new-id').textContent = d.id;
    } else {
      const newId = 'dst_' + Math.random().toString(36).slice(2,10);
      destinations.push({ id:newId, name, bucket, prefix, roleArn, status:'active' });
      document.getElementById('dest-new-id').textContent = newId;
    }
    document.getElementById('dest-test-success').classList.remove('hidden');
    // Swap Next button → Done
    const btn = document.getElementById('dest-next-btn');
    btn.textContent = 'Done';
    btn.onclick = ()=>{ closeModal('m-dest-wizard'); renderDestinations(); toast(destEditingId?'Destination updated':'Destination added'); };
  }, 2100);
}

function testDestinationRow(id) {
  const d = destinations.find(x=>x.id===id);
  if (!d) return;
  toast('Testing connection…');
  setTimeout(()=>{ d.status='active'; renderDestinations(); toast('Connection verified'); }, 1200);
}

function openDeleteDestination(id) {
  const d = destinations.find(x=>x.id===id);
  if (!d) return;
  destDeletingId = id;
  document.getElementById('dest-del-name').textContent = d.name;
  document.getElementById('dest-del-id').textContent = d.id;
  openModal('m-dest-delete');
}
function confirmDeleteDestination() {
  destinations = destinations.filter(x=>x.id!==destDeletingId);
  destDeletingId = null;
  closeModal('m-dest-delete');
  renderDestinations();
  toast('Destination deleted');
}
function copyDestPolicy(kind) {
  const id = kind==='trust' ? 'dest-trust-json' : 'dest-perm-json';
  navigator.clipboard.writeText(document.getElementById(id).textContent);
  toast('Policy copied');
}

// ── Members ─────────────────────────────────────────────────────
function onRoleChange(sel, name) { toast(name+"'s role updated to "+sel.value); }

/* ── Custom role picker ── */
function toggleRolePicker(btn) {
  // close all other pickers first
  document.querySelectorAll('.role-picker-menu').forEach(m => { if (m !== btn.nextElementSibling) m.classList.add('hidden'); });
  const menu = btn.closest('.role-picker').querySelector('.role-picker-menu');
  menu.classList.toggle('hidden');
}
function selectRole(optBtn, roleName) {
  const picker = optBtn.closest('.role-picker');
  const memberName = picker.dataset.member;
  const prevRole = picker.dataset.current;
  if (roleName === prevRole) { picker.querySelector('.role-picker-menu').classList.add('hidden'); return; }
  // Close menu first
  picker.querySelector('.role-picker-menu').classList.add('hidden');
  // Detect self-demotion (current user changing their own role to a lower role)
  const ROLE_RANK = { Owner: 3, Manager: 2, Member: 1 };
  const isSelf = picker.id === 'jane-role-picker' && role === 'owner'; // In demo Jane is the logged-in user when role==='owner'
  const isDemotion = ROLE_RANK[roleName] < ROLE_RANK[prevRole];
  if (isSelf && isDemotion) {
    // Show confirmation modal
    pendingRoleChange = { picker, roleName, prevRole, memberName };
    document.getElementById('rc-new-role').textContent = roleName;
    document.getElementById('rc-current-role').textContent = prevRole;
    openModal('m-role-confirm');
    return;
  }
  applyRoleChange(picker, roleName, memberName);
}
let pendingRoleChange = null;
function applyRoleChange(picker, roleName, memberName) {
  picker.dataset.current = roleName;
  picker.querySelector('.role-picker-label').textContent = roleName;
  const checkSvg = '<svg class="w-4 h-4" style="color:#039855" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>';
  picker.querySelectorAll('.role-opt').forEach(opt => {
    const label = opt.querySelector('.text-xs');
    const optRole = label.textContent.trim().split(' ')[0];
    const isCurrent = optRole === roleName;
    opt.className = 'role-opt w-full text-left px-3 py-3 rounded-lg ' + (isCurrent ? 'bg-[#f5f5f5]' : 'hover:bg-[#f5f5f5] transition-colors');
    if (isCurrent) { label.innerHTML = optRole + ' ' + checkSvg; label.className = 'text-xs font-medium flex items-center justify-between'; label.style.color = '#039855'; }
    else { label.textContent = optRole; label.className = 'text-xs font-medium text-[#0a0a0a]'; label.style.color = ''; }
  });
  toast(memberName + "'s role updated to " + roleName);
}
function confirmRoleChange() {
  if (!pendingRoleChange) return;
  const { picker, roleName, memberName } = pendingRoleChange;
  applyRoleChange(picker, roleName, memberName);
  closeModal('m-role-confirm');
  pendingRoleChange = null;
}
function cancelRoleChange() {
  pendingRoleChange = null;
  closeModal('m-role-confirm');
}
// Close role picker on outside click
document.addEventListener('mousedown', function(e) {
  if (!e.target.closest('.role-picker')) {
    document.querySelectorAll('.role-picker-menu').forEach(m => m.classList.add('hidden'));
  }
});
let removingMember = null;
// Demo data: assigned keys per member
const MEMBER_KEYS = {
  'Alex Johnson': ['Search-Dev-Key'],
  'Sarah Chen': ['Sarah\'s Key', 'Analytics-Key'],
  'Bob Smith': [] // no assigned keys
};
function openRemove(name, email) {
  removingMember = {name,email};
  document.getElementById('rem-name').textContent = name;
  const name2 = document.getElementById('rem-name-2');
  if (name2) name2.textContent = name;
  const email1 = document.getElementById('rem-email-1');
  if (email1) email1.textContent = email;

  const keys = MEMBER_KEYS[name] || [];
  const hasKeys = keys.length > 0;
  document.getElementById('rem-has-keys').classList.toggle('hidden', !hasKeys);
  document.getElementById('rem-no-keys').classList.toggle('hidden', hasKeys);

  if (hasKeys) {
    document.getElementById('rem-key-count').textContent = keys.length;
    const list = document.getElementById('rem-key-list');
    const visible = keys.slice(0, 5);
    const rest = keys.length - visible.length;
    list.innerHTML = visible.map(k => '<div>• ' + k + '</div>').join('') + (rest > 0 ? '<div class="text-[#737373]">+' + rest + ' more</div>' : '');
    // Populate transfer select — exclude the member being removed
    const sel = document.getElementById('rem-transfer-select');
    if (sel) {
      const all = [
        {id:'jane',name:'Jane Niu',role:'Owner'},
        {id:'alex',name:'Alex Johnson',role:'Manager'},
        {id:'sarah',name:'Sarah Chen',role:'Member'},
        {id:'bob',name:'Bob Smith',role:'Member'}
      ];
      const opts = all.filter(m => m.name !== name)
        .map(m => `<option value="${m.id}">${m.name} · ${m.role}</option>`).join('');
      sel.innerHTML = '<option value="">Select member</option>' + opts;
      sel.value = '';
    }
    // reset radio to default: transfer
    document.querySelector('input[name="rem-action"][value="transfer"]').checked = true;
    toggleRemTransferSelect(true);
  }
  openModal('m-remove');
}
function toggleRemTransferSelect(enabled) {
  const sel = document.getElementById('rem-transfer-select');
  if (sel) sel.disabled = !enabled;
}
function doRemove() {
  const keys = MEMBER_KEYS[removingMember.name] || [];
  if (keys.length === 0) {
    closeModal('m-remove');
    toast(removingMember.name + ' removed');
    return;
  }
  const action = document.querySelector('input[name="rem-action"]:checked').value;
  if (action === 'transfer') {
    const sel = document.getElementById('rem-transfer-select');
    if (!sel.value) { toast('Please select a member to transfer to', true); return; }
    const label = sel.options[sel.selectedIndex].text.split(' · ')[0];
    closeModal('m-remove');
    toast(removingMember.name + ' removed · ' + keys.length + ' keys transferred to ' + label);
  } else if (action === 'delete') {
    closeModal('m-remove');
    toast(removingMember.name + ' removed · ' + keys.length + ' keys deleted');
  } else {
    closeModal('m-remove');
    toast(removingMember.name + ' removed · ' + keys.length + ' keys converted to Shared');
  }
}

// Leave Organization
function openLeave() {
  // In prototype, current user = Jane (Owner) when role is owner;
  // for Member/Manager we also treat current user as having their own assigned keys for demo.
  const currentUserName = (role === 'owner') ? 'Jane Niu' : (role === 'manager' ? 'Alex Johnson' : 'Sarah Chen');
  const keys = MEMBER_KEYS[currentUserName] || (role === 'owner' ? ['Search-Prod-Key'] : []);
  const hasKeys = keys.length > 0;
  document.getElementById('leave-has-keys').classList.toggle('hidden', !hasKeys);
  document.getElementById('leave-no-keys').classList.toggle('hidden', hasKeys);
  if (hasKeys) {
    document.getElementById('leave-key-count').textContent = keys.length;
    const list = document.getElementById('leave-key-list');
    const visible = keys.slice(0, 5);
    const rest = keys.length - visible.length;
    list.innerHTML = visible.map(k => '<div>• ' + k + '</div>').join('') + (rest > 0 ? '<div class="text-[#737373]">+' + rest + ' more</div>' : '');
    const sel = document.getElementById('leave-transfer-select');
    if (sel) sel.value = '';
  }
  openModal('m-leave');
}
function doLeave() {
  const currentUserName = (role === 'owner') ? 'Jane Niu' : (role === 'manager' ? 'Alex Johnson' : 'Sarah Chen');
  const keys = MEMBER_KEYS[currentUserName] || (role === 'owner' ? ['Search-Prod-Key'] : []);
  if (keys.length === 0) {
    closeModal('m-leave');
    toast('You left the organization (prototype)');
    return;
  }
  const sel = document.getElementById('leave-transfer-select');
  if (!sel.value) { toast('Please select an admin to transfer keys to', true); return; }
  const label = sel.options[sel.selectedIndex].text.split(' · ')[0];
  closeModal('m-leave');
  toast('Left organization · ' + keys.length + ' keys transferred to ' + label);
}
// ── Web Flow page ──────────────────────────────────────────────
function wfShowState(state) {
  // state: 'empty' | 'builder' | 'preview'
  document.getElementById('wf-empty-state').classList.toggle('hidden', state === 'builder' || state === 'preview');
  document.getElementById('wf-builder').classList.toggle('hidden', state === 'empty');
  document.getElementById('wf-preview').classList.toggle('hidden', state !== 'preview');
  document.getElementById('wf-title-empty').classList.toggle('hidden', state !== 'empty');
  document.getElementById('wf-title-active').classList.toggle('hidden', state === 'empty');
  document.getElementById('wf-empty-desc').classList.toggle('hidden', state !== 'empty');
}
function wfNewFlow() {
  document.getElementById('wf-flow-name').textContent = 'New Flow';
  document.getElementById('wf-status-badge').textContent = 'Draft';
  document.getElementById('wf-status-badge').className = 'px-2 py-1 rounded-full text-xs font-medium bg-[#e5e5e5] text-[#737373]';
  document.getElementById('wf-mode-badge').textContent = 'One-time';
  document.getElementById('wf-mode-badge').className = 'px-2 py-1 rounded text-xs font-medium bg-[#f5f5f5] text-[#737373]';
  document.getElementById('wf-query').value = '';
  document.getElementById('wf-topic').value = 'general';
  document.getElementById('wf-time').value = 'any';
  document.getElementById('wf-dirty').classList.add('hidden');
  wfShowState('builder');
  wfCloseDrops();
}
function wfLoadExample(name, desc, topic, query, mode) {
  document.getElementById('wf-flow-name').textContent = 'Example: ' + name;
  document.getElementById('wf-status-badge').textContent = 'Draft';
  document.getElementById('wf-status-badge').className = 'px-2 py-1 rounded-full text-xs font-medium bg-[#e5e5e5] text-[#737373]';
  document.getElementById('wf-mode-badge').textContent = mode === 'incremental' ? 'Incremental' : 'One-time';
  document.getElementById('wf-mode-badge').className = mode === 'incremental'
    ? 'px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700'
    : 'px-2 py-1 rounded text-xs font-medium bg-[#f5f5f5] text-[#737373]';
  document.getElementById('wf-query').value = query;
  document.getElementById('wf-topic').value = topic;
  document.getElementById('wf-time').value = mode === 'incremental' ? '180d' : 'any';
  document.querySelector(`input[name="wf-refresh"][value="${mode}"]`).checked = true;
  wfShowState('builder');
  wfCloseDrops();
}
function wfLoadSaved(name, topic, query, mode) {
  document.getElementById('wf-flow-name').textContent = name;
  document.getElementById('wf-status-badge').textContent = 'Saved';
  document.getElementById('wf-status-badge').className = 'px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700';
  document.getElementById('wf-mode-badge').textContent = mode === 'incremental' ? 'Incremental' : 'One-time';
  document.getElementById('wf-mode-badge').className = mode === 'incremental'
    ? 'px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700'
    : 'px-2 py-1 rounded text-xs font-medium bg-[#f5f5f5] text-[#737373]';
  document.getElementById('wf-query').value = query;
  document.getElementById('wf-topic').value = topic;
  document.getElementById('wf-time').value = mode === 'incremental' ? '180d' : 'any';
  document.querySelector(`input[name="wf-refresh"][value="${mode}"]`).checked = true;
  document.getElementById('wf-dirty').classList.add('hidden');
  wfShowState('builder');
  wfCloseDrops();
}
function wfToggleDrop(which) {
  const ex = document.getElementById('wf-examples-drop');
  const sv = document.getElementById('wf-saved-drop');
  if (which === 'examples') { ex.classList.toggle('hidden'); sv.classList.add('hidden'); }
  else { sv.classList.toggle('hidden'); ex.classList.add('hidden'); }
}
function wfCloseDrops() {
  document.getElementById('wf-examples-drop').classList.add('hidden');
  document.getElementById('wf-saved-drop').classList.add('hidden');
}
function wfToggleAdvanced() {
  const adv = document.getElementById('wf-advanced');
  adv.classList.toggle('hidden');
  const chev = document.getElementById('wf-adv-chevron');
  chev.style.transform = adv.classList.contains('hidden') ? '' : 'rotate(180deg)';
}
function wfSetRefresh(mode) {
  document.getElementById('wf-mode-badge').textContent = mode === 'incremental' ? 'Incremental' : 'One-time';
  document.getElementById('wf-mode-badge').className = mode === 'incremental'
    ? 'px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700'
    : 'px-2 py-1 rounded text-xs font-medium bg-[#f5f5f5] text-[#737373]';
  const hint = document.getElementById('wf-time-incremental-hint');
  if (mode === 'incremental') {
    hint.classList.remove('hidden');
    if (document.getElementById('wf-time').value === 'any') {
      document.getElementById('wf-time').value = '180d';
    }
  } else {
    hint.classList.add('hidden');
  }
}
function wfTimeChange() {
  // Just placeholder for any future logic
}
function wfRunPreview() {
  toast('Running preview…');
  setTimeout(() => {
    wfShowState('preview');
    document.getElementById('wf-builder').classList.remove('hidden');
    toast('Preview ready · 2 docs returned');
  }, 800);
}
function wfEditName() {
  const cur = document.getElementById('wf-flow-name').textContent;
  const v = prompt('Rename flow', cur.replace('Example: ', ''));
  if (v && v.trim()) {
    document.getElementById('wf-flow-name').textContent = v.trim();
    document.getElementById('wf-dirty').classList.remove('hidden');
  }
}
function wfSaveFlow() {
  const name = document.getElementById('wf-settings-name').value.trim() || 'Untitled Flow';
  document.getElementById('wf-flow-name').textContent = name;
  document.getElementById('wf-status-badge').textContent = 'Saved';
  document.getElementById('wf-status-badge').className = 'px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700';
  document.getElementById('wf-dirty').classList.add('hidden');
  closeModal('m-wf-settings');
  toast('Flow saved');
}
// Click outside to close dropdowns
document.addEventListener('mousedown', (e) => {
  if (!e.target.closest('#wf-examples-drop') && !e.target.closest('button[onclick*="examples"]')) {
    const ex = document.getElementById('wf-examples-drop');
    if (ex) ex.classList.add('hidden');
  }
  if (!e.target.closest('#wf-saved-drop') && !e.target.closest('button[onclick*="saved"]')) {
    const sv = document.getElementById('wf-saved-drop');
    if (sv) sv.classList.add('hidden');
  }
});

function copyInviteLink(btn) {
  const link = 'https://console.octen.ai/invite/acme-inc?token=abc123xyz';
  navigator.clipboard.writeText(link);
  showCopyCheck(btn);
  toast('Invite link copied · Valid for 7 days');
}
function openCreateOrg() {
  // Close the workspace switcher dropdown first
  const drop = document.getElementById('ws-drop');
  if (drop) drop.classList.add('hidden');
  const input = document.getElementById('co-name');
  if (input) input.value = '';
  openModal('m-create-org');
  setTimeout(() => { if (input) input.focus(); }, 50);
}
function doCreateOrg() {
  const name = document.getElementById('co-name').value.trim();
  if (!name) { toast('Please enter an organization name', true); return; }
  closeModal('m-create-org');
  toast('Organization "' + name + '" created');
}
function openInviteModal() {
  // Reset form
  const emails = document.getElementById('inv-emails');
  if (emails) emails.value = '';
  const roleSel = document.getElementById('inv-role');
  if (roleSel) roleSel.value = 'member';
  // Hide Owner option if current user is not Owner (Manager cannot invite Owner)
  const ownerOpt = document.getElementById('inv-role-owner-opt');
  if (ownerOpt) ownerOpt.style.display = (role === 'owner') ? '' : 'none';
  document.getElementById('inv-owner-warning').classList.add('hidden');
  openModal('m-invite');
}
function onInviteRoleChange() {
  const val = document.getElementById('inv-role').value;
  document.getElementById('inv-owner-warning').classList.toggle('hidden', val !== 'owner');
}
// Mock data for invite categorization
const EXISTING_MEMBER_EMAILS = ['jane@acmeinc.com','alex@acmeinc.com','sarah@acmeinc.com','bob@acmeinc.com'];
const PENDING_INVITE_EMAILS = ['carol@acmeinc.com'];

function categorizeInviteEmails() {
  const raw = (document.getElementById('inv-emails').value || '').trim();
  const emails = raw.split(/[,\s\n]+/).map(e => e.trim().toLowerCase()).filter(e => e && e.includes('@'));
  const seen = new Set();
  const members = [], pending = [], fresh = [];
  emails.forEach(e => {
    if (seen.has(e)) return; seen.add(e);
    if (EXISTING_MEMBER_EMAILS.includes(e)) members.push(e);
    else if (PENDING_INVITE_EMAILS.includes(e)) pending.push(e);
    else fresh.push(e);
  });
  return { members, pending, fresh, total: members.length + pending.length + fresh.length };
}

function updateInviteSummary() {
  const c = categorizeInviteEmails();
  const summary = document.getElementById('inv-summary');
  const text = document.getElementById('inv-summary-text');
  const details = document.getElementById('inv-summary-details');
  const btn = document.getElementById('inv-send-btn');
  const sendCount = c.fresh.length + c.pending.length;

  // Summary visibility: only show when there's a conflict
  if (c.total === 0 || (c.members.length === 0 && c.pending.length === 0)) {
    summary.classList.add('hidden');
  } else {
    summary.classList.remove('hidden');
    const parts = [];
    if (c.members.length) parts.push(`${c.members.length} already a member`);
    if (c.pending.length) parts.push(`${c.pending.length} pending will be re-sent`);
    if (c.fresh.length) parts.push(`${c.fresh.length} new`);
    text.textContent = parts.join(' · ');
    // Build details
    const rows = [];
    c.members.forEach(e => rows.push(`<div>• <span class="text-[#737373]">${e}</span> — already a member (skipped)</div>`));
    c.pending.forEach(e => rows.push(`<div>• <span class="text-[#737373]">${e}</span> — pending (previous link will be invalidated)</div>`));
    c.fresh.forEach(e => rows.push(`<div>• <span class="text-[#737373]">${e}</span> — new</div>`));
    details.innerHTML = rows.join('');
  }

  // Button label & state
  if (c.total === 0) {
    btn.textContent = 'Send invites';
    btn.disabled = false;
  } else if (sendCount === 0) {
    btn.textContent = 'Send invites';
    btn.disabled = true;
  } else if (c.fresh.length === 0 && c.pending.length > 0) {
    btn.textContent = `Re-send ${c.pending.length} ${c.pending.length===1?'invite':'invites'}`;
    btn.disabled = false;
  } else {
    btn.textContent = `Send ${sendCount} ${sendCount===1?'invite':'invites'} →`;
    btn.disabled = false;
  }
}

function toggleInviteDetails() {
  const d = document.getElementById('inv-summary-details');
  const t = document.getElementById('inv-summary-toggle');
  const open = d.classList.toggle('hidden') === false;
  t.textContent = open ? 'details ▴' : 'details ▾';
}

function doInvite() {
  const raw = document.getElementById('inv-emails').value.trim();
  if (!raw) { toast('Please enter at least one email', true); return; }
  const c = categorizeInviteEmails();
  if (c.total === 0) { toast('Please enter valid email addresses', true); return; }
  const sendCount = c.fresh.length + c.pending.length;
  if (sendCount === 0) { toast('All recipients are already members', true); return; }
  const role = document.getElementById('inv-role').value;
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
  closeModal('m-invite');
  // Reset modal state
  document.getElementById('inv-emails').value = '';
  updateInviteSummary();
  // Toast: aggregate result
  const bits = [];
  if (c.fresh.length) bits.push(`${c.fresh.length} sent`);
  if (c.pending.length) bits.push(`${c.pending.length} re-sent`);
  if (c.members.length) bits.push(`${c.members.length} skipped`);
  toast(`${bits.join(' · ')} (as ${roleLabel})`);
}

// ── Billing ──────────────────────────────────────────────────────
function toggleCap(t) { document.getElementById(t+'-cap-row').classList.toggle('hidden'); }

// ── Modals ───────────────────────────────────────────────────────
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-bg').forEach(m => {
  m.addEventListener('click', e => { if (e.target===m) m.classList.remove('open'); });
});

// ── Toast ─────────────────────────────────────────────────────────
function toast(msg, err=false) {
  const el = document.getElementById('toast-el');
  el.textContent = msg;
  el.style.background = err ? '#dc2626' : PRIMARY;
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity='0'; }, 2200);
}

// ── Web Search page ─────────────────────────────────────────────
/* ── Usage page tab switching ── */
let usageActiveTab = 'usage';
function switchUsageTab(tab, btn) {
  usageActiveTab = tab;
  document.querySelectorAll('.usage-tab-btn').forEach(b => { b.style.borderColor = 'transparent'; b.style.color = '#94a3b8'; });
  if (btn) { btn.style.borderColor = '#039855'; btn.style.color = '#039855'; }
  document.getElementById('usage-tab-usage').classList.toggle('hidden', tab !== 'usage');
  document.getElementById('usage-tab-costs').classList.toggle('hidden', tab !== 'costs');
}
// Daily usage chart hover tooltip
(function initDailyChartHover(){
  const dailyData = [
    { date:'Apr 1', broad: 720, search:1400, extract:920,  model:'88k',  embed:'42k', xCenter:110 },
    { date:'Apr 2', broad: 880, search:1650, extract:1100, model:'102k', embed:'58k', xCenter:200 },
    { date:'Apr 3', broad: 620, search:1200, extract:820,  model:'75k',  embed:'36k', xCenter:290 },
    { date:'Apr 4', broad:1010, search:1850, extract:1250, model:'126k', embed:'74k', xCenter:380 },
    { date:'Apr 5', broad:1100, search:2000, extract:1400, model:'142k', embed:'88k', xCenter:470 },
    { date:'Apr 6', broad:1200, search:2150, extract:1580, model:'158k', embed:'104k',xCenter:560 },
    { date:'Apr 7', broad:1140, search:2050, extract:1500, model:'150k', embed:'96k', xCenter:650 },
    { date:'Apr 8', broad:1260, search:2200, extract:1720, model:'170k', embed:'118k',xCenter:740 },
  ];
  const wrap = document.getElementById('daily-chart-wrap');
  if (!wrap) return;
  const zones = wrap.querySelectorAll('#chart-hover-zones rect');
  const tooltip = document.getElementById('chart-tooltip');
  const guide = document.getElementById('chart-guide');
  zones.forEach(z => {
    z.style.cursor = 'crosshair';
    z.addEventListener('mouseenter', e => {
      const i = +z.dataset.day;
      const d = dailyData[i];
      document.getElementById('tt-date').textContent = d.date;
      document.getElementById('tt-broad').textContent = d.broad.toLocaleString();
      document.getElementById('tt-search').textContent = d.search.toLocaleString();
      document.getElementById('tt-extract').textContent = d.extract.toLocaleString();
      document.getElementById('tt-model').textContent = d.model;
      document.getElementById('tt-embed').textContent = d.embed;
      // guide line
      guide.setAttribute('x1', d.xCenter);
      guide.setAttribute('x2', d.xCenter);
      guide.setAttribute('opacity', '1');
      // tooltip position (relative to wrap)
      const rect = wrap.getBoundingClientRect();
      const xRatio = d.xCenter / 800;
      const left = xRatio * rect.width;
      tooltip.style.left = Math.min(rect.width - 180, Math.max(8, left + 12)) + 'px';
      tooltip.style.top = '10px';
      tooltip.style.opacity = '1';
    });
    z.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      guide.setAttribute('opacity', '0');
    });
  });
})();

// Monthly cost chart hover
(function initMonthlyChartHover(){
  // Each row covers all visible product columns. Values default to $0 when not applicable.
  const data = [
    { month:'Aug', total:'$1,303.50', bsearch:'$152.60', search:'$372.40', image:'$24.00', video:'$8.00',  extract:'$8.00',  model:'$66.30',  embed:'$8.40',  vlembed:'$3.25', collect:'$156.00', chat:'$467.50', xCenter:105 },
    { month:'Sep', total:'$1,524.55', bsearch:'$183.80', search:'$435.00', image:'$32.00', video:'$10.00', extract:'$9.80',  model:'$80.20',  embed:'$10.20', vlembed:'$3.90', collect:'$190.00', chat:'$560.45', xCenter:225 },
    { month:'Oct', total:'$1,824.55', bsearch:'$210.60', search:'$499.00', image:'$40.00', video:'$12.00', extract:'$12.00', model:'$95.40',  embed:'$12.00', vlembed:'$4.60', collect:'$230.00', chat:'$655.75', xCenter:345 },
    { month:'Nov', total:'$2,015.10', bsearch:'$241.40', search:'$538.00', image:'$50.00', video:'$16.00', extract:'$15.00', model:'$112.00', embed:'$13.20', vlembed:'$5.25', collect:'$268.00', chat:'$734.35', xCenter:465 },
    { month:'Dec', total:'$2,225.20', bsearch:'$272.00', search:'$578.00', image:'$60.00', video:'$20.00', extract:'$18.30', model:'$128.50', embed:'$14.80', vlembed:'$6.00', collect:'$312.00', chat:'$815.60', xCenter:585 },
  ];
  const wrap = document.getElementById('monthly-chart-wrap');
  if (!wrap) return;
  // Collect conditional: only show in legend + tooltip if any month has consumption
  const hasCollect = data.some(d => d.collect && d.collect !== '$0' && d.collect !== '$0.00');
  const collectLegend = document.getElementById('mo-legend-collect');
  const collectRow = document.getElementById('mo-tt-collect-row');
  if (collectLegend) collectLegend.style.display = hasCollect ? '' : 'none';
  if (collectRow) collectRow.style.display = hasCollect ? '' : 'none';

  const zones = wrap.querySelectorAll('#monthly-chart-zones rect');
  const tt = document.getElementById('monthly-chart-tooltip');
  const guide = document.getElementById('monthly-chart-guide');
  zones.forEach(z => {
    z.style.cursor = 'crosshair';
    z.addEventListener('mouseenter', () => {
      const d = data[+z.dataset.mon];
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v || '$0'; };
      set('mo-tt-month',   d.month);
      set('mo-tt-total',   d.total);
      set('mo-tt-bsearch', d.bsearch);
      set('mo-tt-search',  d.search);
      set('mo-tt-image',   d.image);
      set('mo-tt-video',   d.video);
      set('mo-tt-extract', d.extract);
      set('mo-tt-model',   d.model);
      set('mo-tt-embed',   d.embed);
      set('mo-tt-vlembed', d.vlembed);
      set('mo-tt-collect', d.collect);
      set('mo-tt-chat',    d.chat);
      guide.setAttribute('x1', d.xCenter); guide.setAttribute('x2', d.xCenter);
      guide.setAttribute('opacity', '1');
      const rect = wrap.getBoundingClientRect();
      const left = (d.xCenter / 700) * rect.width;
      tt.style.left = Math.min(rect.width - 220, Math.max(8, left + 12)) + 'px';
      tt.style.top = '10px';
      tt.style.opacity = '1';
    });
    z.addEventListener('mouseleave', () => {
      tt.style.opacity = '0';
      guide.setAttribute('opacity', '0');
    });
  });
})();

function toggleCostMonth(btn) {
  const detail = btn.parentElement.querySelector('.cost-detail');
  const chevron = btn.querySelector('.cost-chevron');
  if (!detail) return;
  const isHidden = detail.classList.contains('hidden');
  detail.classList.toggle('hidden');
  if (chevron) chevron.textContent = isHidden ? '▴' : '▾';
}

function wsTabSwitch(tab) {
  const req = tab === 'request';
  const reqPane = document.getElementById('ws-pane-request');
  const resPane = document.getElementById('ws-pane-response');
  const tReq = document.getElementById('ws-tab-req');
  const tRes = document.getElementById('ws-tab-res');
  if (!reqPane) return;
  
  reqPane.classList.toggle('hidden', !req);
  if(resPane) resPane.classList.toggle('hidden', req);
  
  if(tReq) tReq.className = 'ui-tab ' + (req ? 'active' : 'inactive');
  if(tRes) tRes.className = 'ui-tab ' + (!req ? 'active' : 'inactive');
}
function doSaveSvcEdit() {
  const n = document.getElementById('esvc-name').value.trim();
  if (!n) { toast('Please enter a name', true); return; }
  const td = document.getElementById('svc-key-name');
  if (td) td.textContent = n;
  closeModal('m-edit-svc'); toast('Service key updated');
}

function wsToggleCustomRange() {
  const sel = document.getElementById('ws-date-range');
  const box = document.getElementById('ws-custom-range');
  if (!sel || !box) return;
  if (sel.value === 'custom') box.classList.remove('hidden');
  else box.classList.add('hidden');
}

let wsRespView = 'preview';
let wsResult = null;
const WS_RESULTS = [
  { title:'Example result 1', url:'https://example.com/result-1', time_published:'2025-10-02T08:00:00Z', highlight:'This is a highlighted sentence from the content.', favicon:'https://example.com/favicon.ico' },
  { title:'Example result 2', url:'https://example.com/result-2', time_published:'2025-09-15T08:00:00Z', highlight:'Key information found in this section.', favicon:'https://example.com/favicon.ico' },
  { title:'Example result 3', url:'https://example.com/result-3', time_published:'2024-11-02T08:00:00Z', highlight:'The document discusses important topics related to your query.', favicon:'https://example.com/favicon.ico' },
];
function wsFmtDate(iso){ const d=new Date(iso); return d.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'}); }
function wsRespTab(v){
  wsRespView = v;
  const pv = document.getElementById('ws-resp-preview'), js = document.getElementById('ws-resp-json');
  if (pv) pv.style.cssText = v==='preview' ? 'background:#0398551a;color:#039855;font-weight:500' : 'background:#fff;color:#475569';
  if (js) js.style.cssText = v==='json' ? 'background:#0398551a;color:#039855;font-weight:500' : 'background:#fff;color:#475569';
  const body = document.getElementById('ws-resp-body');
  if (!body || !wsResult) return;
  if (v==='json') {
    body.innerHTML = '<div class="bg-slate-900 rounded-md p-4 overflow-auto max-h-96"><pre class="text-xs text-slate-100 whitespace-pre font-mono">'+JSON.stringify(wsResult,null,2).replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</pre></div>';
  } else {
    body.innerHTML = '<div class="space-y-3 max-h-96 overflow-y-auto">'+wsResult.results.map(r=>`
      <div class="border border-[#e7e7e7] rounded-md p-3 hover:border-[#dbdbdb]">
        <a href="${r.url}" target="_blank" class="hover:underline mb-1 block text-sm font-medium text-[#0a0a0a]">${r.title}</a>
        <a href="${r.url}" target="_blank" class="text-xs text-blue-600 hover:underline mb-2 block">${r.url}</a>
        <div class="mb-2"><p class="text-xs text-[#737373] font-medium mb-1">Highlights</p>
          <div class="pl-3 border-l-2 border-[#dbdbdb]"><p class="text-xs text-[#737373] leading-relaxed">${r.highlight}</p></div>
        </div>
        <div class="text-xs text-[#a3a3a3]">${wsFmtDate(r.time_published)}</div>
      </div>`).join('')+'</div>';
  }
}
function wsRun() {
  if (!hasPayment && billingMode!=='postpaid') { toast('Payment method required to run queries'); return; }
  const q = document.getElementById('ws-query');
  if (!q || !q.value.trim()) { toast('Please enter a query'); return; }
  wsTabSwitch('response');
  const res = document.getElementById('ws-pane-response');
  if (res) res.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-[#a3a3a3]">
    <div class="w-8 h-8 border-4 border-[#e7e7e7] rounded-full mb-3" style="border-top-color:#039855;animation:spin 0.8s linear infinite"></div>
    <p class="text-xs">Searching...</p>
  </div>`;
  setTimeout(() => {
    wsResult = { request_id:'req_'+Math.random().toString(36).slice(2,12), results:WS_RESULTS, meta:{ usage:{ num_search_queries:1 }, latency:101, warning:null } };
    if (res) res.innerHTML = `
      <div class="flex items-center justify-between mb-3">
        <div class="inline-flex rounded-md border border-[#e7e7e7] overflow-hidden text-xs">
          <button id="ws-resp-preview" class="px-3 py-2" style="background:#0398551a;color:#039855;font-weight:500" onclick="wsRespTab('preview')">Preview</button>
          <button id="ws-resp-json" class="px-3 py-2 border-l border-[#e7e7e7] bg-white text-[#737373]" onclick="wsRespTab('json')">JSON</button>
        </div>
        <button onclick="copyCodeBlock(this)" class="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[#e7e7e7] bg-white text-[#737373] hover:bg-[#f5f5f5] text-xs">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg><span>Copy</span>
        </button>
      </div>
      <div class="text-xs text-[#737373] mb-3">Response 101 ms</div>
      <div id="ws-resp-body"></div>`;
    wsRespTab('preview');
  }, 800);
}
function wsClear() {
  const q = document.getElementById('ws-query');
  if (q) q.value = '';
  if (window.wsUpdateBtns) window.wsUpdateBtns();
  if (window.wsRefreshCode) window.wsRefreshCode();
  if (q) q.focus();
}

// ── Extract API ───────────────────────────────────────────────────
let exCurrentLang = 'py';

function exGetUrls() {
  const raw = (document.getElementById('ex-urls')||{}).value||'';
  return raw.split('\n').map(s=>s.trim()).filter(Boolean);
}

function exGetUniqueUrls() {
  const seen = new Set();
  const out = [];
  for (const u of exGetUrls()) {
    if (!seen.has(u)) { seen.add(u); out.push(u); }
  }
  return out;
}

function exUpdateBtn() {
  const all = exGetUrls();
  const unique = exGetUniqueUrls();
  const dupes = all.length - unique.length;
  const btn = document.getElementById('ex-run-btn');
  if (!btn) return;

  const counterEl = document.getElementById('ex-url-counter');
  const tooMany = unique.length > 20;
  if (counterEl) {
    counterEl.className = 'text-xs ' + (tooMany ? 'text-red-500 font-medium' : 'text-[#a3a3a3]');
    let html = `<span id="ex-url-count">${unique.length}</span> / 20 URLs`;
    if (tooMany) {
      html += ' — <span>max 20 exceeded</span>';
    } else if (dupes > 0) {
      html += ` — <span class="text-amber-600">${dupes} duplicate${dupes>1?'s':''} ignored</span>`;
    }
    counterEl.innerHTML = html;
  }

  const active = (hasPayment || billingMode==='postpaid') && unique.length > 0 && !tooMany;
  btn.style.background = active ? '#039855' : '#cbd5e1';
  btn.style.cursor = active ? 'pointer' : 'not-allowed';
  exRefreshCode();
}

function exRefreshCode() {
  const urls = exGetUniqueUrls();
  const fmt = (document.getElementById('ex-format')||{}).value||'markdown';
  const maxAge = (document.getElementById('ex-maxage')||{}).value||'86400';
  const timeout = (document.getElementById('ex-timeout')||{}).value||'30';
  const query = ((document.getElementById('ex-query')||{}).value||'').trim();
  const images = (document.getElementById('ex-images')||{}).checked;
  const videos = (document.getElementById('ex-videos')||{}).checked;
  const audio = (document.getElementById('ex-audio')||{}).checked;
  const favicon = (document.getElementById('ex-favicon')||{}).checked;

  const urlList = urls.length ? urls : ['https://docs.octen.ai/api-reference/search'];
  const urlsPy = urlList.map(u=>`        "${u}",`).join('\n');
  const urlsJs = urlList.map(u=>`    "${u}",`).join('\n');
  const urlsCurl = urlList.map(u=>`        "${u}"`).join(',\n');

  const extraPy = [
    query ? `    query="${query}",` : null,
    images ? `    include_images=True,` : null,
    videos ? `    include_videos=True,` : null,
    audio ? `    include_audio=True,` : null,
    favicon ? `    include_favicon=True,` : null,
  ].filter(Boolean).join('\n');

  const extraJs = [
    query ? `  query: "${query}",` : null,
    images ? `  include_images: true,` : null,
    videos ? `  include_videos: true,` : null,
    audio ? `  include_audio: true,` : null,
    favicon ? `  include_favicon: true,` : null,
  ].filter(Boolean).join('\n');

  const extraCurl = [
    query ? `    "query": "${query}",` : null,
    images ? `    "include_images": true,` : null,
    videos ? `    "include_videos": true,` : null,
    audio ? `    "include_audio": true,` : null,
    favicon ? `    "include_favicon": true,` : null,
  ].filter(Boolean).join('\n');

  const codes = {
    py: `from octen import Octen

client = Octen(api_key="YOUR_API_KEY")

response = client.extract(
    urls=[\n${urlsPy}
    ],
    format="${fmt}",
    max_age_seconds=${maxAge},
    timeout=${timeout},${extraPy ? '\n'+extraPy : ''}
)

for result in response.data.results:
    if result.status == "success":
        print(result.title)
        ${query ? 'for h in result.highlights:\n        print(h)' : 'print(result.content[:500])'}`,

    js: `import Octen from '@octen/sdk';

const client = new Octen({ apiKey: 'YOUR_API_KEY' });

const response = await client.extract({
  urls: [\n${urlsJs}
  ],
  format: '${fmt}',
  maxAgeSeconds: ${maxAge},
  timeout: ${timeout},${extraJs ? '\n'+extraJs : ''}
});

for (const result of response.data.results) {
  if (result.status === 'success') {
    console.log(result.title);
    ${query ? 'result.highlights.forEach(h => console.log(h));' : 'console.log(result.content.slice(0, 500));'}
  }
}`,

    curl: `curl --request POST \\
  --url https://api.octen.ai/extract \\
  --header 'Content-Type: application/json' \\
  --header 'x-api-key: YOUR_API_KEY' \\
  --data '{
    "urls": [\n${urlsCurl}
    ],
    "format": "${fmt}",
    "max_age_seconds": ${maxAge},
    "timeout": ${timeout}${extraCurl ? ',\n'+extraCurl : ''}
  }'`
  };

  const block = document.getElementById('ex-code');
  if (block) {
    if (window.PGS_codeBlock) {
      block.innerHTML = window.PGS_codeBlock(codes[exCurrentLang], window.PGS_hlCode);
    } else {
      block.textContent = codes[exCurrentLang];
    }
  }
}

function exLang(lang) {
  exCurrentLang = lang;
  ['py','js','curl'].forEach(l => {
    const btn = document.getElementById('ex-lang-'+l);
    if (!btn) return;
    const on = l === lang;
    btn.className = 'ex-lang seg-item ' + (on ? 'active' : '');
  });
  exRefreshCode();
}

function exTabSwitch(tab) {
  const req = document.getElementById('ex-pane-request');
  const res = document.getElementById('ex-pane-response');
  const tReq = document.getElementById('ex-tab-req');
  const tRes = document.getElementById('ex-tab-res');
  if (tab === 'request') {
    req.classList.remove('hidden'); res.classList.add('hidden');
    if(tReq) tReq.className = 'ui-tab active';
    if(tRes) tRes.className = 'ui-tab inactive';
  } else {
    req.classList.add('hidden'); res.classList.remove('hidden');
    if(tRes) tRes.className = 'ui-tab active';
    if(tReq) tReq.className = 'ui-tab inactive';
  }
}

function exRun() {
  if (!hasPayment && billingMode!=='postpaid') { toast('Payment method required to run requests'); return; }
  const urls = exGetUniqueUrls();
  if (!urls.length) { toast('Please enter at least one URL'); return; }
  if (urls.length > 20) { toast('Maximum 20 URLs per request'); return; }
  exTabSwitch('response');
  const res = document.getElementById('ex-pane-response');
  const scenario = (document.getElementById('ex-scenario')||{}).value||'normal';

  res.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-[#a3a3a3]">
    <div class="w-8 h-8 border-4 border-[#e7e7e7] rounded-full mb-3" style="border-top-color:#039855;animation:spin 0.8s linear infinite"></div>
    <p class="text-xs">Extracting ${urls.length} URL${urls.length>1?'s':''}…</p>
  </div>`;

  const query = ((document.getElementById('ex-query')||{}).value||'').trim();
  const incImages = (document.getElementById('ex-images')||{}).checked;
  const incVideos = (document.getElementById('ex-videos')||{}).checked;
  const incAudio = (document.getElementById('ex-audio')||{}).checked;
  const incFavicon = (document.getElementById('ex-favicon')||{}).checked;
  const latency = 1640 + Math.round(Math.random()*400);

  setTimeout(() => {
    // ── HTTP-level error scenarios ──
    const httpErrors = {
      rate_limited: { code: 429, msg: 'Too Many Requests: QPS limit exceeded, please retry after 10 seconds' },
      balance:      { code: 403, msg: 'Forbidden: insufficient balance, please add a payment method to continue' },
      unauthorized: { code: 401, msg: 'Unauthorized: invalid or missing API key' },
      too_large:    { code: 413, msg: 'Request Entity Too Large: maximum 20 URLs per request, got 150' },
    };
    if (httpErrors[scenario]) {
      const errJson = { ...httpErrors[scenario], request_id: 'req_'+Math.random().toString(36).substr(2,12) };
      exLastResponse = errJson;
      const isWarning = scenario === 'balance';
      const color = isWarning ? 'amber' : 'red';
      res.innerHTML = `
        <div class="flex items-center justify-between mb-3">
          <div class="inline-flex rounded-md border border-[#e7e7e7] overflow-hidden text-xs">
            <button class="px-3 py-2" style="background:#0398551a;color:#039855;font-weight:500" onclick="exShowPreview(this)">Preview</button>
            <button class="px-3 py-2 border-l border-[#e7e7e7] bg-white text-[#737373]" onclick="exShowJson(this)">JSON</button>
          </div>
          <span class="text-xs text-[#a3a3a3]">${latency} ms</span>
        </div>
        <div id="ex-results-preview" class="flex items-start gap-3 p-4 bg-${color}-50 border border-${color}-200 rounded-lg">
          <svg class="w-5 h-5 text-${color}-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          <div>
            <p class="text-sm font-medium text-${color}-700">${errJson.code} ${({429:'Too Many Requests',403:'Forbidden',401:'Unauthorized',413:'Request Entity Too Large'})[errJson.code]}</p>
            <p class="text-xs text-${color}-600 mt-1">${errJson.msg.split(': ').slice(1).join(': ')}</p>
            ${scenario === 'balance' ? `<a href="#" onclick="go('billing');return false" class="inline-block mt-2 text-xs font-medium hover:underline" style="color:#039855">Add payment method →</a>` : ''}
            <p class="text-xs text-${color}-400 mt-2 font-mono">${errJson.request_id}</p>
          </div>
        </div>`;
      return;
    }

    // ── Per-URL error variants ──
    const urlErrors = [
      { error_code:'EXTRACTION_FAILED', error_message:'Blocked by target site anti-bot protection' },
      { error_code:'EXTRACTION_FAILED', error_message:`Extraction timed out after ${(document.getElementById('ex-timeout')||{}).value||30}s` },
      { error_code:'INVALID_URL',       error_message:'Failed to resolve domain' },
      { error_code:'EXTRACTION_FAILED', error_message:'Target returned HTTP 403' },
      { error_code:'INVALID_URL',       error_message:'Target returned 404 Not Found' },
      { error_code:'EXTRACTION_FAILED', error_message:'Content type not supported: application/pdf' },
    ];

    const mockResults = urls.map((url, i) => {
      const failed = scenario === 'all_failed'
        || (scenario === 'partial' && i === urls.length - 1)
        || (scenario === 'normal' && url.includes('blocked'));
      if (failed) {
        const err = urlErrors[i % urlErrors.length];
        return { url, status:'failed', ...err };
      }
      const titles = [
        'Search API Reference — Octen Docs',
        'Artificial intelligence — Wikipedia',
        'Influenza (Seasonal) — WHO',
        'API Reference — Getting Started',
        'Documentation Overview',
      ];
      const title = titles[i % titles.length];
      const snippets = [
        `# Search API\n\nThe Search API allows you to query Octen's index of web content. Results are ranked by relevance and recency.\n\n## Endpoint\n\n\`POST /search\`\n\n## Parameters\n\n- **query** *(required)* — The search query string\n- **max_results** — Maximum number of results to return (default: 5)\n- **render** — Rendering mode: \`fast\`, \`auto\`, or \`full\``,
        `# Artificial Intelligence\n\nArtificial intelligence (AI) is the intelligence of machines or software, as opposed to the intelligence of humans or animals. It is a field of research in computer science that develops and studies methods and software that enable machines to perceive their environment and use learning and intelligence to take actions that maximize their chances of achieving defined goals.\n\n## History\n\nThe term "artificial intelligence" was coined by John McCarthy in 1956.`,
        `# Influenza (Seasonal)\n\nSeasonal influenza is an acute respiratory illness caused by influenza A or B viruses. It spreads easily between people in coughs and sneezes.\n\n## Key Facts\n\n- Influenza spreads around the world in seasonal epidemics\n- WHO recommends annual vaccination for high-risk groups\n- Antiviral drugs are available for treatment and prevention`,
        `# Getting Started\n\nWelcome to the Octen API documentation. This guide will help you make your first API call.\n\n## Authentication\n\nAll API calls require an API key passed via the \`x-api-key\` header.`,
        `# Overview\n\nThis documentation covers all available endpoints and parameters for the Octen API platform.`,
      ];
      const content = snippets[i % snippets.length];
      const highlightSets = [
        ['The Search API allows you to query Octen\'s index of web content ranked by relevance and recency.', 'Results support highlights extraction — query-relevant snippets are returned per document.'],
        ['AI is the intelligence of machines or software, developed to perceive environments and take actions to maximize defined goals.', 'The term "artificial intelligence" was coined by John McCarthy in 1956 at the Dartmouth Conference.'],
        ['WHO recommends annual vaccination for high-risk groups including the elderly, young children, and immunocompromised individuals.', 'Seasonal influenza vaccination policies vary by region — check your local health authority for current guidelines.'],
        ['All API calls require an API key passed via the x-api-key header for authentication.', 'Rate limits apply per account plan — see the pricing page for your current quota.'],
        ['The Octen API platform provides Search, Extract, and Collect endpoints for comprehensive web data access.'],
      ];
      const highlights = highlightSets[i % highlightSets.length];
      const categoryPairs = [
        { primary: 'Computers, Electronics & Technology', secondary: 'Programming & Developer Software' },
        { primary: 'Reference', secondary: 'Encyclopedia' },
        { primary: 'Health', secondary: 'Public Health' },
        { primary: 'Computers, Electronics & Technology', secondary: 'Search Engines' },
        { primary: 'Business', secondary: null },
      ];
      const pageStructurePairs = [
        { primary: 'Reference', secondary: 'API Documentation' },
        { primary: 'Article', secondary: null },
        { primary: 'Article', secondary: 'News Article' },
        { primary: 'Reference', secondary: 'Documentation' },
        { primary: 'Index Page', secondary: 'Home Page' },
      ];
      return {
        url, status:'success', title,
        category: categoryPairs[i % categoryPairs.length],
        page_structure: pageStructurePairs[i % pageStructurePairs.length],
        content: query ? null : content,
        highlights: query ? highlights : null,
        time_published: '2025-'+(String(Math.floor(Math.random()*12)+1).padStart(2,'0'))+'-15T00:00:00Z',
        time_last_crawled: '2026-05-09T08:30:00Z',
        images: incImages ? [
          'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80',
          'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&q=80',
          'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&q=80',
          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
          'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&q=80',
        ].slice(0, 2 + (i % 3)) : undefined,
        videos: incVideos ? [
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          'https://vimeo.com/76979871',
        ].slice(0, 1 + (i % 2)) : undefined,
        audio: incAudio ? [
          'https://example.com/podcasts/ep-' + (12 + i) + '.mp3',
        ] : undefined,
        favicon: incFavicon ? `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32` : undefined,
      };
    });

    const successCount = mockResults.filter(r=>r.status==='success').length;
    const failedCount = mockResults.length - successCount;

    exLastResponse = {
      code: 0, msg: 'success',
      request_id: 'req_'+Math.random().toString(36).substr(2,12),
      data: { results: mockResults },
      meta: {
        usage: { total_urls: mockResults.length, billed_urls: successCount },
        latency,
        warning: failedCount ? `${failedCount} URL${failedCount>1?'s':''} failed and ${failedCount>1?'were':'was'} not billed` : null
      }
    };

    res.innerHTML = `
      <div class="flex items-center justify-between mb-3 relative">
        <div class="inline-flex rounded-md border border-[#e7e7e7] overflow-hidden text-xs">
          <button class="px-3 py-2" style="background:#0398551a;color:#039855;font-weight:500" onclick="exShowPreview(this)">Preview</button>
          <button class="px-3 py-2 border-l border-[#e7e7e7] bg-white text-[#737373]" onclick="exShowJson(this)">JSON</button>
        </div>
        <div class="flex items-center gap-2">
          <button id="ex-fb-up" onclick="exFeedback('up')" class="ex-fb-btn inline-flex items-center justify-center w-7 h-7 rounded-md border border-[#e7e7e7] bg-white text-[#737373] hover:bg-[#f5f5f5]" title="Helpful">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>
          </button>
          <button id="ex-fb-down" onclick="exFeedback('down')" class="ex-fb-btn inline-flex items-center justify-center w-7 h-7 rounded-md border border-[#e7e7e7] bg-white text-[#737373] hover:bg-[#f5f5f5]" title="Not helpful">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"/></svg>
          </button>
          <button onclick="copyCodeBlock(this)" class="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[#e7e7e7] bg-white text-[#737373] hover:bg-[#f5f5f5] text-xs">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <span>Copy</span>
          </button>
        </div>
        <!-- Feedback popover -->
        <div id="ex-fb-popover" class="hidden absolute right-0 top-9 z-20 w-80 bg-white border border-[#e7e7e7] rounded-lg shadow-lg p-3">
          <div id="ex-fb-chips" class="flex flex-wrap gap-2 mb-2.5"></div>
          <textarea id="ex-fb-text" rows="2" class="w-full px-3 py-2 border border-[#e7e7e7] rounded text-xs outline-none focus:border-[#039855] resize-none" placeholder=""></textarea>
          <div class="flex items-center justify-end mt-2 gap-2">
            <button onclick="exFeedbackClose()" class="px-3 py-1 text-xs text-[#737373] hover:text-[#737373]">Cancel</button>
            <button onclick="exFeedbackSubmit()" class="px-3 py-1 text-xs font-medium text-white rounded" style="background:#039855">Submit</button>
          </div>
        </div>
      </div>
      <!-- Meta bar -->
      <div class="flex items-center gap-3 mb-3 text-xs text-[#737373]">
        <span class="font-medium text-[#737373]">${successCount} extracted</span>
        ${failedCount ? `<span class="text-red-500">${failedCount} failed</span>` : ''}
        <span>·</span>
        <span>${latency} ms</span>
      </div>
      <!-- Results -->
      <div class="space-y-3" id="ex-results-preview">
        ${mockResults.map(r => r.status==='failed' ? `
        <div class="border border-red-100 rounded-md p-3 bg-red-50">
          <div class="flex items-start justify-between gap-2 mb-1">
            <a href="${r.url}" target="_blank" class="text-xs text-[#737373] hover:underline break-all flex-1">${r.url}</a>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-600 shrink-0">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              failed
            </span>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <span class="text-xs font-mono px-2 py-1 rounded bg-red-100 text-red-500">${r.error_code}</span>
            <span class="text-xs text-red-500">${r.error_message}</span>
          </div>
        </div>` : `
        <div class="border border-[#e7e7e7] rounded-md p-3 hover:border-[#dbdbdb] transition-colors">
          <div class="flex items-start justify-between gap-2 mb-2">
            <div class="flex items-start gap-2 min-w-0">
              ${r.favicon ? `<img src="${r.favicon}" class="w-4 h-4 rounded-sm shrink-0 mt-0.5" onerror="this.style.display='none'" title="favicon"/>` : '<div class="w-4 h-4 shrink-0 mt-0.5 rounded-sm bg-[#f5f5f5]"></div>'}
              <div class="min-w-0">
                <p class="text-sm font-medium text-[#0a0a0a] leading-snug">${r.title}</p>
                <a href="${r.url}" target="_blank" class="text-xs text-blue-500 hover:underline break-all">${r.url}</a>
              </div>
            </div>
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700 shrink-0">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              success
            </span>
          </div>
          ${r.highlights ? `
          <div class="mb-2">
            <p class="text-xs text-[#737373] font-medium mb-2">Highlights</p>
            <div class="pl-3 border-l-2 border-[#039855] space-y-2">
              ${r.highlights.map(h=>`<p class="text-xs text-[#737373] leading-relaxed">${h}</p>`).join('')}
            </div>
          </div>` : `
          <div class="mb-2">
            <div class="flex items-center justify-between mb-1">
              <p class="text-xs text-[#737373] font-medium">Content <span class="text-[#a3a3a3] font-normal">(markdown)</span></p>
              <button onclick="exToggleContent(this)" class="inline-flex items-center gap-1 text-xs text-[#a3a3a3] hover:text-[#737373] transition-colors">
                <svg class="w-3 h-3 ex-expand-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/></svg>
                <span class="ex-expand-label">Expand</span>
              </button>
            </div>
            <div class="ex-content-box bg-[#f5f5f5] rounded p-2.5 max-h-80 overflow-y-auto transition-all">
              <pre class="text-xs text-[#737373] whitespace-pre-wrap font-mono leading-relaxed">${r.content.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
            </div>
          </div>`}
          <dl class="mt-2 space-y-1 text-xs">
            ${r.category ? `<div class="flex items-center gap-3"><dt class="text-[#a3a3a3] w-14 shrink-0">Category</dt><dd><span class="inline-flex items-center bg-[#f5f5f5] rounded px-2 py-1 text-[#737373]">${r.category.primary}${r.category.secondary ? `<span class="text-[#a3a3a3] mx-1.5">›</span>${r.category.secondary}` : ''}</span></dd></div>` : ''}
            ${r.page_structure ? `<div class="flex items-center gap-3"><dt class="text-[#a3a3a3] w-14 shrink-0">Page</dt><dd><span class="inline-flex items-center bg-[#f5f5f5] rounded px-2 py-1 text-[#737373]">${r.page_structure.primary}${r.page_structure.secondary ? `<span class="text-[#a3a3a3] mx-1.5">›</span>${r.page_structure.secondary}` : ''}</span></dd></div>` : ''}
            <div class="flex items-center gap-3"><dt class="text-[#a3a3a3] w-14 shrink-0">Published</dt><dd class="text-[#737373]">${r.time_published.slice(0,10)}</dd></div>
          </dl>
          ${r.images && r.images.length ? `
          <div class="mt-2">
            <p class="text-xs text-[#a3a3a3] mb-2">${r.images.length} image${r.images.length>1?'s':''}</p>
            <div class="flex gap-2 flex-wrap">
              ${r.images.slice(0,4).map(img=>`<img src="${img}" class="w-16 h-12 object-cover rounded border border-[#e7e7e7] bg-[#f5f5f5]" onerror="this.style.opacity='0.3'" title="${img}"/>`).join('')}
              ${r.images.length > 4 ? `<div class="w-16 h-12 rounded border border-[#e7e7e7] bg-[#f5f5f5] flex items-center justify-center text-xs text-[#a3a3a3] font-medium">+${r.images.length-4}</div>` : ''}
            </div>
          </div>` : ''}
          ${r.videos && r.videos.length ? `
          <div class="mt-2">
            <p class="text-xs text-[#a3a3a3] mb-2">${r.videos.length} video${r.videos.length>1?'s':''}</p>
            <div class="space-y-0.5">
              ${r.videos.map(v=>`<a href="${v}" target="_blank" class="block text-xs text-blue-500 hover:underline break-all">${v}</a>`).join('')}
            </div>
          </div>` : ''}
          ${r.audio && r.audio.length ? `
          <div class="mt-2">
            <p class="text-xs text-[#a3a3a3] mb-2">${r.audio.length} audio</p>
            <div class="space-y-0.5">
              ${r.audio.map(a=>`<a href="${a}" target="_blank" class="block text-xs text-blue-500 hover:underline break-all">${a}</a>`).join('')}
            </div>
          </div>` : ''}
        </div>`).join('')}
      </div>
      ${failedCount ? `<div class="mt-3 flex items-center gap-2 p-2.5 bg-amber-50 border border-amber-100 rounded-md text-xs text-amber-700">
        <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        ${failedCount} URL${failedCount>1?'s':''} failed and ${failedCount>1?'were':'was'} not billed.
      </div>` : ''}`;
  }, latency + 200);
}

let exLastResponse = null;

function exShowJson(btn) {
  if (!exLastResponse) return;
  // swap tab styles
  const previewBtn = btn.parentElement.querySelector('button:first-child');
  previewBtn.style.cssText = 'color:#475569;background:transparent';
  btn.style.cssText = 'color:#039855;background:#0398551a;font-weight:500';
  const preview = document.getElementById('ex-results-preview');
  const jsonPane = document.getElementById('ex-results-json');
  if (preview) preview.classList.add('hidden');
  if (jsonPane) { jsonPane.classList.remove('hidden'); return; }
  // first time: build json pane
  const pre = document.createElement('pre');
  pre.id = 'ex-results-json';
  pre.className = 'text-xs text-[#737373] bg-[#f5f5f5] rounded-md p-3 overflow-auto max-h-[460px] leading-relaxed whitespace-pre-wrap font-mono';
  pre.textContent = JSON.stringify(exLastResponse, null, 2);
  if (preview) preview.parentElement.appendChild(pre);
}

function exShowPreview(btn) {
  const jsonBtn = btn.parentElement.querySelector('button:last-child');
  jsonBtn.style.cssText = 'color:#475569;background:transparent';
  btn.style.cssText = 'color:#039855;background:#0398551a;font-weight:500';
  const preview = document.getElementById('ex-results-preview');
  const jsonPane = document.getElementById('ex-results-json');
  if (preview) preview.classList.remove('hidden');
  if (jsonPane) jsonPane.classList.add('hidden');
}

function exToggleContent(btn) {
  const box = btn.closest('.mb-2').querySelector('.ex-content-box');
  const label = btn.querySelector('.ex-expand-label');
  const icon = btn.querySelector('.ex-expand-icon');
  const expanded = box.style.maxHeight === 'none';
  if (expanded) {
    box.style.maxHeight = '';
    box.classList.add('max-h-48');
    label.textContent = 'Expand';
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/>';
  } else {
    box.style.maxHeight = 'none';
    box.classList.remove('max-h-48');
    label.textContent = 'Collapse';
    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4m0 5H4m5 0L3 3m12 6h5m-5 0V4m0 5l6-6M9 15v5m0-5H4m5 0l-6 6m12-6h5m-5 0v5m0-5l6 6"/>';
  }
}

function exClear() {
  const u = document.getElementById('ex-urls');
  const q = document.getElementById('ex-query');
  if (u) u.value = '';
  if (q) q.value = '';
  exUpdateBtn();
  exTabSwitch('request');
  const res = document.getElementById('ex-pane-response');
  if (res) res.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-[#a3a3a3]">
    <svg class="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
    <p class="text-xs">Run a request to see results</p>
  </div>`;
}

// ── Extract feedback ───────────────────────────────────────────────
const exFbChips = {
  up:   ['Clean output','Complete content','Relevant results','Fast'],
  down: ['Incomplete content','Parsing errors','Off-topic content','Cluttered output','Slow'],
};
const exFbPlaceholder = {
  up:   '(Optional) Tell us what was helpful',
  down: "(Optional) Tell us why this wasn't helpful",
};
let exFbType = null;
const exFbSelected = new Set();

function exFeedback(type) {
  const pop = document.getElementById('ex-fb-popover');
  if (!pop) return;
  // toggle off if clicking same type
  if (exFbType === type && !pop.classList.contains('hidden')) {
    exFeedbackClose(); return;
  }
  exFbType = type;
  exFbSelected.clear();
  const chipsWrap = document.getElementById('ex-fb-chips');
  chipsWrap.innerHTML = exFbChips[type].map(c =>
    `<button onclick="exFbToggle(this,'${c.replace(/'/g,"\\'")}')" class="ex-fb-chip px-3 py-1 text-xs rounded-full border border-[#e7e7e7] bg-white text-[#737373] hover:border-[#dbdbdb]">${c}</button>`
  ).join('');
  document.getElementById('ex-fb-text').placeholder = exFbPlaceholder[type];
  document.getElementById('ex-fb-text').value = '';
  pop.classList.remove('hidden');
  // visual active state on button
  document.getElementById('ex-fb-up').style.color   = type==='up'   ? '#039855' : '';
  document.getElementById('ex-fb-down').style.color = type==='down' ? '#dc2626' : '';
}
function exFbToggle(btn, label) {
  if (exFbSelected.has(label)) {
    exFbSelected.delete(label);
    btn.style.background=''; btn.style.borderColor=''; btn.style.color='';
  } else {
    exFbSelected.add(label);
    btn.style.background = exFbType==='up' ? '#0398551a' : '#fee2e2';
    btn.style.borderColor = exFbType==='up' ? '#039855' : '#dc2626';
    btn.style.color = exFbType==='up' ? '#039855' : '#dc2626';
  }
}
function exFeedbackClose() {
  const pop = document.getElementById('ex-fb-popover');
  if (pop) pop.classList.add('hidden');
}
function exFeedbackSubmit() {
  toast('Thanks for your feedback');
  exFeedbackClose();
  // keep colored thumbs as "submitted" state
}

// ── Collect API ───────────────────────────────────────────────────
let collectRunId = null;
let collectPollTimer = null;
let collectProgress = 0;

function collectShowState(state) {
  ['idle','loading','preview','running','paused','completed','canceled'].forEach(s => {
    const el = document.getElementById('col-state-'+s);
    if (el) el.classList.toggle('hidden', s !== state);
  });
}

function collectPreview() {
  const q = (document.getElementById('col-query')||{}).value||'';
  if (!q.trim()) { toast('Query is required'); return; }
  document.getElementById('col-loading-msg').textContent = 'Estimating matches...';
  collectShowState('loading');
  setTimeout(() => {
    document.getElementById('col-est-total').textContent = '156,000';
    document.getElementById('col-est-price').textContent = '$78.00';
    document.getElementById('col-est-breakdown').innerHTML = `
      <div class="text-left space-y-0.5 mt-1">
        <div class="flex justify-between gap-3"><span>Text</span><span class="font-medium text-[#737373]">100,000</span></div>
        <div class="flex justify-between gap-3"><span>Image</span><span class="font-medium text-[#737373]">40,000</span></div>
        <div class="flex justify-between gap-3"><span>Video</span><span class="font-medium text-[#737373]">16,000</span></div>
      </div>`;
    const samples = [
      {doc_id:'doc_a1b2c3',type:'image',title:'护肤新手必看！20款平价宝藏好物推荐',snippet:'分享我用了半年的护肤心得，这些产品真的救了我的皮肤...',date:'2024-03-15'},
      {doc_id:'doc_d4e5f6',type:'text',title:'敏感肌亲测！这款面霜真的绝了',snippet:'作为一个敏感肌用户，找到一款不刺激又好用的面霜太难了...',date:'2024-05-20'},
      {doc_id:'doc_g7h8i9',type:'video',title:'跟我学护肤！每天只需5分钟的简单护肤步骤',snippet:'早C晚A护肤法分享，附带产品推荐和使用方法...',date:'2024-08-10'},
      {doc_id:'doc_j1k2l3',type:'text',title:'素颜也好看？日常护肤步骤分享',snippet:'其实护肤并不复杂，掌握这几个步骤就够了...',date:'2024-09-05'},
      {doc_id:'doc_m4n5o6',type:'image',title:'换季护肤要注意！这些坑我帮你踩过了',snippet:'换季的时候皮肤特别敏感，这篇文章告诉你怎么应对...',date:'2024-10-12'},
    ];
    const typeColor = {text:'bg-[#f5f5f5] text-[#737373]',image:'bg-purple-50 text-purple-700',video:'bg-blue-50 text-blue-700'};
    document.getElementById('col-samples').innerHTML = samples.map(s=>`
      <div class="border border-[#f5f5f5] rounded-md p-2.5 hover:bg-[#f5f5f5]">
        <div class="flex items-start gap-2">
          <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium shrink-0 mt-0.5 ${typeColor[s.type]||'bg-[#f5f5f5] text-[#737373]'}">${s.type}</span>
          <div class="min-w-0 flex-1">
            <p class="text-xs font-medium text-[#0a0a0a] truncate">${s.title}</p>
            <p class="text-xs text-[#737373] mt-0.5 line-clamp-1">${s.snippet}</p>
            <div class="flex items-center gap-3 mt-1"><span class="text-xs text-[#a3a3a3]">${s.date}</span><span class="text-xs font-mono text-[#a3a3a3]">${s.doc_id}</span></div>
          </div>
        </div>
      </div>`).join('');
    collectShowState('preview');
  }, 1500);
}

function collectStartRun() {
  collectRunId = 'col_'+Math.random().toString(36).substr(2,8);
  const destSel = document.getElementById('col-dest');
  const destText = destSel ? destSel.options[destSel.selectedIndex].text : '';
  const bucketMatch = destText.match(/s3:\/\/([^)]+)/);
  const path = bucketMatch ? `s3://${bucketMatch[1]}${collectRunId}/` : `s3://acme-prod-data/octen/runs/${collectRunId}/`;
  collectProgress = 0;
  document.getElementById('col-run-id').textContent = collectRunId;
  document.getElementById('col-run-path').textContent = path;
  document.getElementById('col-progress-pct').textContent = '0%';
  document.getElementById('col-progress-bar').style.width = '0%';
  document.getElementById('col-run-written').textContent = '0';
  document.getElementById('col-run-remaining').textContent = '156,000';
  document.getElementById('col-run-price-est').textContent = '$0.00';
  collectShowState('running');
  collectPollTimer = setInterval(collectTick, 600);
}

function collectTick() {
  collectProgress = Math.min(collectProgress + Math.random()*7 + 2, 100);
  const written = Math.round(156000 * collectProgress / 100);
  const remaining = 156000 - written;
  const cost = (written / 1000 * 0.5).toFixed(2);
  document.getElementById('col-progress-pct').textContent = Math.round(collectProgress)+'%';
  document.getElementById('col-progress-bar').style.width = collectProgress+'%';
  document.getElementById('col-run-written').textContent = written.toLocaleString();
  document.getElementById('col-run-remaining').textContent = remaining.toLocaleString();
  document.getElementById('col-run-price-est').textContent = '$'+cost;
  if (collectProgress >= 100) {
    clearInterval(collectPollTimer); collectPollTimer = null;
    setTimeout(collectComplete, 400);
  }
}

function collectComplete() {
  const path = document.getElementById('col-run-path').textContent;
  document.getElementById('col-done-id').textContent = collectRunId;
  document.getElementById('col-done-total').textContent = '156,000';
  document.getElementById('col-done-price').textContent = '$78.00';
  document.getElementById('col-done-breakdown').innerHTML = `
    <div class="text-left space-y-0.5 mt-1">
      <div class="flex justify-between gap-3"><span>Text</span><span class="font-medium text-[#737373]">100,000</span></div>
      <div class="flex justify-between gap-3"><span>Image</span><span class="font-medium text-[#737373]">40,000</span></div>
      <div class="flex justify-between gap-3"><span>Video</span><span class="font-medium text-[#737373]">16,000</span></div>
    </div>`;
  document.getElementById('col-done-path').textContent = path;
  document.getElementById('col-done-manifest').textContent = path+'manifest.json';
  collectShowState('completed');
  toast('Collection completed — data written to S3');
}

function collectCancel() {
  if (collectPollTimer) { clearInterval(collectPollTimer); collectPollTimer = null; }
  const written = Math.round(156000 * collectProgress / 100);
  const price = '$'+(written/1000*0.5).toFixed(2);
  const path = document.getElementById('col-run-path').textContent;
  document.getElementById('col-cancel-id').textContent = collectRunId;
  document.getElementById('col-cancel-written').textContent = written.toLocaleString();
  document.getElementById('col-cancel-price').textContent = price;
  document.getElementById('col-cancel-path').textContent = path;
  collectShowState('canceled');
  toast('Collection canceled');
}

function collectSimulatePause() {
  if (collectPollTimer) { clearInterval(collectPollTimer); collectPollTimer = null; }
  const written = Math.round(156000 * collectProgress / 100);
  const remaining = 156000 - written;
  const expiry = new Date(); expiry.setDate(expiry.getDate()+30);
  document.getElementById('col-paused-id').textContent = collectRunId;
  document.getElementById('col-paused-written').textContent = written.toLocaleString();
  document.getElementById('col-paused-charged').textContent = '$'+(written/1000*0.5).toFixed(2);
  document.getElementById('col-paused-remaining').textContent = '~'+remaining.toLocaleString();
  document.getElementById('col-paused-rem-price').textContent = '~$'+(remaining/1000*0.5).toFixed(2);
  document.getElementById('col-paused-expires').textContent = expiry.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  collectShowState('paused');
}

function collectResume() {
  document.getElementById('col-loading-msg').textContent = 'Resuming collection...';
  collectShowState('loading');
  setTimeout(() => {
    const written = Math.round(156000 * collectProgress / 100);
    const path = `s3://acme-prod-data/octen/runs/${collectRunId}/`;
    document.getElementById('col-run-id').textContent = collectRunId;
    document.getElementById('col-run-path').textContent = path;
    document.getElementById('col-run-written').textContent = written.toLocaleString();
    document.getElementById('col-run-remaining').textContent = (156000-written).toLocaleString();
    document.getElementById('col-run-price-est').textContent = '$'+((156000)/1000*0.5).toFixed(2);
    document.getElementById('col-progress-pct').textContent = Math.round(collectProgress)+'%';
    document.getElementById('col-progress-bar').style.width = collectProgress+'%';
    collectShowState('running');
    collectPollTimer = setInterval(collectTick, 600);
    toast('Collection resumed');
  }, 1000);
}

function collectReset() {
  if (collectPollTimer) { clearInterval(collectPollTimer); collectPollTimer = null; }
  collectRunId = null; collectProgress = 0;
  collectShowState('idle');
}

// ── Init ──────────────────────────────────────────────────────────
// Deferred to DOMContentLoaded: this file loads in <head>, before the DOM.
document.addEventListener('DOMContentLoaded', function () {
  renderApiKeys();
  renderSvcKeys();
  setPayment(true); // Demo: payment defaults to Active
  applyRole();
  // Welcome modal after 1.5s if no payment
  setTimeout(() => showWelcomeModal(), 1500);
});
