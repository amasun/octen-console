// Theme Management (Light / Dark / System)
(function() {
  function getEffectiveTheme(mode) {
    if (mode === 'system') {
      return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    if (mode === 'dark-trae' || mode === 'dark-cool' || mode === 'octen') {
      return 'dark';
    }
    return mode;
  }

  function updateSwitcherUI(mode) {
    var effective = getEffectiveTheme(mode);

    // 1. Update left-bottom popup card buttons
    ['light', 'dark', 'system'].forEach(function(m) {
      var btn = document.getElementById('btn-theme-' + m);
      if (!btn) return;
      var isActive = (m === mode) || (mode === 'system' && m === 'system') || (m === 'dark' && (mode === 'dark-trae' || mode === 'dark-cool'));
      if (isActive) {
        btn.classList.add('bg-white', 'shadow-sm', 'text-[#0a0a0a]', 'active');
        btn.classList.remove('text-[#737373]');
      } else {
        btn.classList.remove('bg-white', 'shadow-sm', 'text-[#0a0a0a]', 'active');
        btn.classList.add('text-[#737373]');
      }
    });

    document.querySelectorAll('[data-theme-btn]').forEach(function(btn) {
      var m = btn.getAttribute('data-theme-btn');
      var isActive = (m === mode) || (mode === 'system' && m === 'system') || (m === 'dark' && (mode === 'dark-trae' || mode === 'dark-cool'));
      if (isActive) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 2. Update direct sidebar [DEV] Theme buttons
    ['light', 'dark'].forEach(function(m) {
      var btn = document.getElementById('dev-theme-btn-' + m);
      if (!btn) return;
      var isActive = (m === mode) || (mode === 'system' && m === effective) || (m === 'dark' && (mode === 'dark-trae' || mode === 'dark-cool'));
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
      if (mode === 'dark' || mode === 'dark-trae' || (mode === 'system' && effective === 'dark')) {
        tag.textContent = mode === 'system' ? 'System (Dark)' : 'Dark';
      } else {
        tag.textContent = mode === 'system' ? 'System (Light)' : 'Light';
      }
    }
    if (dot) {
      if (effective === 'light') {
        dot.style.backgroundColor = '#039855';
      } else {
        dot.style.backgroundColor = '#60ff70';
      }
    }
  }

  window.setThemeMode = function(mode) {
    if (mode === 'dark-cool' || mode === 'dark-trae' || mode === 'octen') mode = 'dark';
    try {
      localStorage.setItem('octen-theme', mode);
    } catch(e) {}

    var effective = getEffectiveTheme(mode);
    var html = document.documentElement;

    if (effective === 'dark') {
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
