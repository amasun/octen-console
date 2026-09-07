// Theme Management (Light / Dark Octen / Dark TraeCode / System)
(function() {
  function getEffectiveTheme(mode) {
    if (mode === 'system') {
      return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    return mode;
  }

  function updateSwitcherUI(mode) {
    var effective = getEffectiveTheme(mode);

    // 1. Update left-bottom popup card buttons
    ['light', 'dark', 'dark-trae', 'system'].forEach(function(m) {
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

    // 2. Update direct sidebar [DEV] Theme buttons
    ['light', 'dark', 'dark-trae'].forEach(function(m) {
      var btn = document.getElementById('dev-theme-btn-' + m);
      if (!btn) return;
      var isActive = (m === mode) || (mode === 'system' && m === effective);
      if (isActive) {
        btn.classList.add('active', 'bg-white', 'shadow-sm', 'text-[#0a0a0a]');
        btn.classList.remove('text-[#737373]');
      } else {
        btn.classList.remove('active', 'bg-white', 'shadow-sm', 'text-[#0a0a0a]');
        btn.classList.add('text-[#737373]');
      }
    });

    // 3. Update sidebar tag indicator
    var tag = document.getElementById('dev-theme-name-tag');
    var dot = document.getElementById('dev-theme-indicator-dot');
    if (tag) {
      if (mode === 'dark-trae') {
        tag.textContent = 'Trae Dark';
      } else if (mode === 'dark') {
        tag.textContent = 'Octen Dark';
      } else if (mode === 'light') {
        tag.textContent = 'Light';
      } else {
        var effLabel = effective === 'dark-trae' ? 'Trae' : (effective === 'dark' ? 'Dark' : 'Light');
        tag.textContent = 'System (' + effLabel + ')';
      }
    }
    if (dot) {
      if (mode === 'light' || (mode === 'system' && effective === 'light')) {
        dot.style.backgroundColor = '#039855';
      } else {
        dot.style.backgroundColor = '#60ff70';
      }
    }
  }

  window.setThemeMode = function(mode) {
    if (mode === 'dark-cool') mode = 'dark';
    try {
      localStorage.setItem('octen-theme', mode);
    } catch(e) {}

    var effective = getEffectiveTheme(mode);
    var html = document.documentElement;

    if (effective === 'dark-trae' || mode === 'dark-trae') {
      html.classList.add('dark', 'theme-trae');
      html.classList.remove('theme-cool');
      html.setAttribute('data-theme', 'dark-trae');
    } else if (effective === 'dark' || mode === 'dark') {
      html.classList.add('dark');
      html.classList.remove('theme-trae', 'theme-cool');
      html.setAttribute('data-theme', 'dark');
    } else {
      html.classList.remove('dark', 'theme-trae', 'theme-cool');
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
