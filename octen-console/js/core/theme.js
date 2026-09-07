// Theme Management (Light / Dark / System)
(function() {
  function getEffectiveTheme(mode) {
    if (mode === 'system') {
      return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    return mode;
  }

  function updateSwitcherUI(mode) {
    ['light', 'dark', 'system'].forEach(function(m) {
      var btn = document.getElementById('btn-theme-' + m);
      if (!btn) return;
      var isActive = (m === mode);
      if (isActive) {
        btn.classList.add('bg-white', 'shadow-sm', 'text-[#0a0a0a]');
        btn.classList.remove('text-[#737373]');
      } else {
        btn.classList.remove('bg-white', 'shadow-sm', 'text-[#0a0a0a]');
        btn.classList.add('text-[#737373]');
      }
    });
  }

  window.setThemeMode = function(mode) {
    try {
      localStorage.setItem('octen-theme', mode);
    } catch(e) {}

    var effective = getEffectiveTheme(mode);
    var html = document.documentElement;
    if (effective === 'dark') {
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.setAttribute('data-theme', 'light');
    }
    updateSwitcherUI(mode);
  };

  window.toggleDemoCard = function(e) {
    if (e) e.stopPropagation();
    var card = document.getElementById('demo-card');
    if (card) {
      card.classList.toggle('force-show');
    }
  };

  document.addEventListener('click', function(e) {
    var wrap = document.getElementById('demo-toggle-wrap');
    var card = document.getElementById('demo-card');
    if (card && wrap && !wrap.contains(e.target)) {
      card.classList.remove('force-show');
    }
  });

  // OS theme change listener
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
      var current = 'system';
      try { current = localStorage.getItem('octen-theme') || 'system'; } catch(e) {}
      if (current === 'system') {
        window.setThemeMode('system');
      }
    });
  }

  // Initial apply
  function initTheme() {
    var saved = 'system';
    try { saved = localStorage.getItem('octen-theme') || 'system'; } catch(e) {}
    window.setThemeMode(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Re-sync UI when sidebar renders
  window.addEventListener('load', function() {
    var saved = 'system';
    try { saved = localStorage.getItem('octen-theme') || 'system'; } catch(e) {}
    updateSwitcherUI(saved);
  });
})();
