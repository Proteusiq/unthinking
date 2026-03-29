/**
 * Theme toggle for standalone pages
 * Cycles: dark -> light -> auto (system)
 * Persists choice to localStorage
 */
(() => {
  const STORAGE_KEY = 'unthinking-theme';
  const THEMES = ['dark', 'light', 'auto'];

  // SVG icons for each theme state
  const ICONS = {
    dark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`,
    light: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>`,
    auto: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a10 10 0 0 0 0 20z" fill="currentColor" opacity="0.3"/>
      <path d="M12 2v20"/>
    </svg>`,
  };

  const TITLES = {
    dark: 'Dark mode (click for light)',
    light: 'Light mode (click for auto)',
    auto: 'Auto mode (click for dark)',
  };

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
    if (btn) {
      btn.innerHTML = ICONS[theme];
      btn.title = TITLES[theme];
      btn.setAttribute('aria-label', TITLES[theme]);
    }
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
        btn.innerHTML = ICONS[theme];
        btn.title = TITLES[theme];
        btn.onclick = cycleTheme;
        btn.setAttribute('aria-label', TITLES[theme]);
        topbar.appendChild(btn);
      }
      updateButton(theme);
    });
  }

  init();
})();
