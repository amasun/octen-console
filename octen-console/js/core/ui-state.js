window.accessState = window.accessState || 'apply'; // 'signed-out' | 'apply' | 'approved'
window.updateGateNotices = function() {
  const hide = window.accessState === 'approved';
  document.querySelectorAll('.ra-gate-notice').forEach(el => {
    el.style.display = hide ? 'none' : '';
  });
};
window.setAccessState = function(state) {
  window.accessState = state;
  ['signed-out','apply','approved'].forEach(s => {
    const btn = document.getElementById('ax-' + s);
    if (!btn) return;
    const active = s === state;
    btn.style.background = active ? '#0398551a' : '';
    btn.style.color = active ? '#039855' : '';
    btn.style.borderColor = active ? 'rgba(3,152,85,.3)' : '';
    btn.classList.toggle('text-[#737373]', !active);
    btn.classList.toggle('border-[#e7e7e7]', !active);
    btn.classList.toggle('font-medium', active);
  });
  window.updateGateNotices();
};
document.addEventListener('DOMContentLoaded', function(){ if (window.updateGateNotices) window.updateGateNotices(); });
const PRODUCT_PAGE = {
  'Image Search': 'image-search',
  'Video Search': 'video-search',
  'Multimodal Chat': 'multimodal-search',
  'Grounded Generation': 'grounded-generation'
};
window.openRequestAccess = function(productName) {
  productName = productName || 'this product';
  // Approved → straight to product page
  if (window.accessState === 'approved') {
    const slug = PRODUCT_PAGE[productName];
    if (slug && typeof go === 'function') go(slug);
    else if (typeof toast === 'function') toast('Opening ' + productName + '…');
    return;
  }
  // Set product name in all .ra-product spans
  document.querySelectorAll('#m-request-access .ra-product').forEach(el => el.textContent = productName);
  // Mailto link
  const body = "Hi Octen team,\n\nI'd like to request access to " + productName + ".\n\n· Name: \n· Work email: \n· Company: \n· Country: \n· Use case: \n· Estimated scale (daily API calls): \n\nThanks!";
  const subject = 'Octen access request — ' + productName;
  const link = document.getElementById('ra-mailto');
  if (link) link.href = 'mailto:support@octen.ai?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  // Show sign-in hint only when signed-out
  const hint = document.getElementById('ra-signin-hint');
  if (hint) hint.classList.toggle('hidden', window.accessState !== 'signed-out');
  if (typeof openModal === 'function') openModal('m-request-access');
};