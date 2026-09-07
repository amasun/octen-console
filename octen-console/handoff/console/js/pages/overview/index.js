// Overview page behavior.
// Was an inline <script> inside the template — innerHTML-injected <script>
// never executes, so this must live in a real script file + pageInit.
(function () {
  function setupMcpsTabs() {
    const tabs = document.querySelectorAll('.mcps-tab');
    const panels = document.querySelectorAll('.mcps-panel');
    if (!tabs.length) return;

    tabs.forEach(t => t.addEventListener('click', () => {
      const key = t.dataset.mcpsTab;
      tabs.forEach(x => {
        const active = x.dataset.mcpsTab === key;
        x.style.color = active ? '#039855' : '';
        x.style.borderColor = active ? '#039855' : '';
        x.classList.toggle('text-[#737373]', !active);
        x.classList.toggle('border-transparent', !active);
      });
      panels.forEach(p => p.classList.toggle('hidden', p.dataset.mcpsPanel !== key));
    }));
  }

  window.mcpsSetClient = function (v) {
    const cmds = {
      'claude-code': 'claude mcp add --scope user octen -- npx -y octen-mcp',
      'claude-desktop': 'npx -y octen-mcp',
      'cursor': 'npx -y octen-mcp',
      'vscode': 'npx -y octen-mcp'
    };
    const el = document.getElementById('mcps-cmd-mcp');
    if (el && cmds[v]) el.textContent = cmds[v];
  };

  window.updateOverviewUser = function() {
    const title = document.getElementById('ov-welcome-title');
    if (!title) return;
    title.textContent = 'Welcome, Jane Niu';
  };

  window.pageInit = window.pageInit || {};
  window.pageInit['overview'] = function() {
    setupMcpsTabs();
    window.updateOverviewUser();
  };
})();
