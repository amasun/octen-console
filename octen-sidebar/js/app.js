/**
 * Octen Sidebar Workbench Application Entry
 * Mounts sidebar, connects test controls, and displays live interactive feedback.
 */

document.addEventListener('DOMContentLoaded', function() {
  var logBox = document.getElementById('workbench-log-box');
  var activeRouteTitle = document.getElementById('active-route-title');
  var activeRouteIdTag = document.getElementById('active-route-id-tag');
  var activeRouteDesc = document.getElementById('active-route-desc');
  var activeRouteIcon = document.getElementById('active-route-icon');
  var currentOrgBadge = document.getElementById('current-org-badge');

  function appendLog(tag, msg) {
    if (!logBox) return;
    var now = new Date();
    var timeStr = [
      now.getHours().toString().padStart(2, '0'),
      now.getMinutes().toString().padStart(2, '0'),
      now.getSeconds().toString().padStart(2, '0')
    ].join(':');

    var line = document.createElement('div');
    line.className = 'log-line';
    line.innerHTML = `
      <span class="log-time">[${timeStr}]</span>
      <span class="log-tag">[${tag}]</span>
      <span class="log-msg">${msg}</span>
    `;
    logBox.appendChild(line);
    logBox.scrollTop = logBox.scrollHeight;
  }

  // Descriptions for each route for realistic studio feedback
  var routeDescriptions = {
    'overview': 'Consolidated overview, key metrics, and quick jump points for search and models.',
    'broad-search-api': 'Interactive multi-source search playground with live request payload generation.',
    'web-search': 'Real-time open-web text retrieval and content extraction endpoints.',
    'image-search': 'Visual search across web indexes by prompt text or reference image.',
    'video-search': 'Video retrieval and temporal segment ranking API.',
    'multimodal-search': 'Unified omni search across multimodal inputs (text, image, video).',
    'extract': 'Clean markdown and structured content extraction from any arbitrary URL.',
    'model': 'AI Model Gateway configuring and routing LLM inference workloads.',
    'broad-search': 'Turnkey Answer generation interface with verified web groundings.',
    'deep-research': 'Multi-step autonomous agentic web research and comprehensive reporting.',
    'api-keys': 'Secret API key creation, permissions scoping, and access logs.',
    'usage': 'Real-time API credit consumption, quota monitoring, and query volume charts.',
    'billing': 'Invoicing, payment method management, and enterprise postpaid terms.',
    'settings': 'Organization settings, member invitations, role management, and service keys.',
    'docs': 'Official Octen AI developer documentation and API reference guides.',
  };

  // 1. Initialize Sidebar Component
  var sidebar = new OctenSidebar({
    container: '#sidebar-mount',
    config: window.OCTEN_SIDEBAR_CONFIG,
    activeRoute: 'overview'
  });

  appendLog('SYSTEM', 'OctenSidebar component mounted successfully.');

  // 2. Listen to Sidebar Events
  sidebar.on('route-select', function(data) {
    var routeId = data.routeId;
    appendLog('NAVIGATE', `Selected route: "${routeId}" (external: ${data.isExternal})`);

    if (activeRouteIdTag) activeRouteIdTag.textContent = routeId;
    if (activeRouteDesc) activeRouteDesc.textContent = routeDescriptions[routeId] || 'Custom custom console page view.';

    // Find route title and icon from config
    var foundItem = null;
    (window.OCTEN_SIDEBAR_CONFIG.navigation || []).forEach(function(g) {
      (g.items || []).forEach(function(item) {
        if (item.id === routeId) foundItem = item;
      });
    });

    if (foundItem) {
      if (activeRouteTitle) activeRouteTitle.textContent = foundItem.title;
      if (activeRouteIcon && foundItem.icon) activeRouteIcon.innerHTML = foundItem.icon;
    }
  });

  sidebar.on('org-change', function(data) {
    appendLog('ORG', `Switched organization to: "${data.organization ? data.organization.name : data.orgId}"`);
    if (currentOrgBadge && data.organization) {
      currentOrgBadge.textContent = data.organization.name;
    }
  });

  sidebar.on('create-org', function() {
    appendLog('MODAL', 'Triggered "Create Organization" action.');
    alert('【Workbench Mock】触发了创建新组织弹窗 (Create Organization Modal)');
  });

  sidebar.on('theme-change', function(data) {
    appendLog('THEME', `Theme mode changed to: "${data.mode}"`);
  });

  sidebar.on('popover-link-click', function(data) {
    appendLog('MENU', `Clicked account popover item: "${data.linkId}"`);
  });

  sidebar.on('logout', function() {
    appendLog('AUTH', 'Triggered Logout action.');
    alert('【Workbench Mock】用户点击了退出登录 (Logout)');
  });

  // 3. Topbar Theme Controls
  document.querySelectorAll('[data-wb-theme]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var mode = btn.getAttribute('data-wb-theme');
      if (window.OctenTheme) {
        window.OctenTheme.setTheme(mode);
      }
    });
  });

  // 4. Sidebar Width Toggle Controls
  document.querySelectorAll('[data-wb-width]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var width = btn.getAttribute('data-wb-width');
      document.documentElement.style.setProperty('--sidebar-width', width);
      appendLog('LAYOUT', `Adjusted sidebar width token to: ${width}`);

      document.querySelectorAll('[data-wb-width]').forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  // Expose global workbench handle
  window.sidebarInstance = sidebar;
});
