document.addEventListener('DOMContentLoaded', function() {
  var base = window.OCTEN_SIDEBAR_CONFIG;
  var a = new OctenSidebar({
    container: '#sidebar-mount-a',
    config: base,
    activeRoute: 'overview',
    plan: 'a'
  });
  var b = new OctenSidebar({
    container: '#sidebar-mount-b',
    config: base,
    activeRoute: 'overview',
    plan: 'b'
  });
  window.sidebarPlans = { a: a, b: b };
});







