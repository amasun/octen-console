/**
 * Octen Console — Plan A Sidebar Component Integration
 * Modular, componentized, reactive state & routing.
 */

window.initOctenSidebar = function() {
  var container = document.getElementById('sidebar-container');
  if (!container) return;

  var config = (window.OCTEN_SIDEBAR_CONFIG && typeof window.OCTEN_SIDEBAR_CONFIG.getPlanAConfig === 'function')
    ? window.OCTEN_SIDEBAR_CONFIG.getPlanAConfig()
    : (window.OCTEN_SIDEBAR_CONFIG || {});

  var sidebar = new OctenSidebar({
    container: container,
    config: config,
    activeRoute: 'overview'
  });

  window.octenSidebar = sidebar;

  // Handle route selection
  sidebar.on('route-select', function(data) {
    if (!data.isExternal && data.routeId) {
      if (typeof window.go === 'function') {
        window.go(data.routeId);
      }
    }
  });

  // Handle organization switching
  sidebar.on('org-change', function(data) {
    if (typeof window.switchWs === 'function') {
      window.switchWs(data.orgId);
    }
  });

  // Handle create organization modal
  sidebar.on('create-org', function() {
    if (typeof window.openCreateOrg === 'function') {
      window.openCreateOrg();
    }
  });

  // Handle theme changes
  sidebar.on('theme-change', function(data) {
    if (typeof window.setThemeMode === 'function') {
      window.setThemeMode(data.mode);
    }
  });

  // Handle popover quick links
  sidebar.on('popover-link-click', function(data) {
    if (data.linkId === 'api-keys' && typeof window.go === 'function') {
      window.go('api-keys');
    }
  });

  return sidebar;
};
