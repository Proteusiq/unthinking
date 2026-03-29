/**
 * Theme toggle for standalone pages
 * Cycles: dark -> light -> auto (system)
 * Persists choice to localStorage
 */
(() => {
  const STORAGE_KEY = 'unthinking-theme';
  const THEMES = ['dark', 'light', 'auto'];
  const LABELS = { dark: 'Dark', light: 'Light', auto: 'Auto' };

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    const effective = theme === 'auto' ? getSystemTheme() : theme;
    document.documentElement.setAttribute('data-theme', effective);
    document.documentElement.setAttribute('data-theme-setting', theme);
  }

  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'auto';
  }

  function saveTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function cycleTheme() {
    const current = getSavedTheme();
    const idx = THEMES.indexOf(current);
    const next = THEMES[(idx + 1) % THEMES.length];
    saveTheme(next);
    applyTheme(next);
    updateButton(next);
  }

  function updateButton(theme) {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = LABELS[theme];
  }

  function init() {
    const theme = getSavedTheme();
    applyTheme(theme);

    // Listen for system theme changes (for auto mode)
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
      if (getSavedTheme() === 'auto') {
        applyTheme('auto');
      }
    });

    // Create and inject theme toggle button
    document.addEventListener('DOMContentLoaded', () => {
      const topbar = document.querySelector('.topbar');
      if (topbar && !document.getElementById('theme-toggle')) {
        const btn = document.createElement('button');
        btn.id = 'theme-toggle';
        btn.className = 'theme-btn';
        btn.textContent = LABELS[theme];
        btn.onclick = cycleTheme;
        btn.setAttribute('aria-label', 'Toggle theme');
        topbar.appendChild(btn);
      }
      updateButton(theme);
    });
  }

  init();
})();
