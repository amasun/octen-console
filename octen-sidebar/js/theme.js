/**
 * Octen Theme Manager
 * Lightweight, robust Light / Dark / System mode switcher with localStorage persistence.
 */

(function(window) {
  var STORAGE_KEY = 'octen-theme';

  function getSavedTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY) || 'system';
      if (saved === 'dark-trae' || saved === 'dark-cool' || saved === 'octen') return 'dark';
      return saved;
    } catch (e) {
      return 'system';
    }
  }

  function getEffectiveTheme(mode) {
    if (mode === 'system') {
      return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }
    return mode;
  }

  function applyTheme(mode) {
    var effective = getEffectiveTheme(mode);
    var root = document.documentElement;

    if (effective === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }

    // Update segmented theme controls if present
    document.querySelectorAll('[data-theme-btn]').forEach(function(btn) {
      var btnMode = btn.getAttribute('data-theme-btn');
      if (btnMode === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Notify listeners
    window.dispatchEvent(new CustomEvent('octen-theme-change', {
      detail: { mode: mode, effective: effective }
    }));
  }

  function setTheme(mode) {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {}
    applyTheme(mode);
  }

  function init() {
    var initial = getSavedTheme();
    applyTheme(initial);

    // Watch for OS system preference changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
        if (getSavedTheme() === 'system') {
          applyTheme('system');
        }
      });
    }
  }

  window.OctenTheme = {
    getTheme: getSavedTheme,
    getEffectiveTheme: getEffectiveTheme,
    setTheme: setTheme,
    init: init,
  };

  // Run early init to prevent flashing
  init();
})(window);
