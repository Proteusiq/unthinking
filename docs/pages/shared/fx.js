/**
 * Modern layer for the standalone pages: injected site nav and scroll reveal.
 * Loaded with `defer`; no dependencies and no idle animation.
 */
(() => {
  const PAGES = [
    ['data', 'Data'],
    ['tokenization', 'Tokenization'],
    ['architecture', 'Architecture'],
    ['training', 'Training'],
    ['implementation', 'Implementation'],
  ];
  const here = location.pathname.split('/').pop().replace('.html', '');
  document.documentElement.classList.add('js');

  // Inside the landing page's overlay the graph is the frame itself: closing the
  // overlay is the only sane way to reach it, never loading it back into the iframe.
  const framed = (() => {
    try {
      return window.parent !== window && typeof window.parent.closeOverlay === 'function';
    } catch {
      return false;
    }
  })();

  const leaveToGraph = (a) => {
    if (!framed) return;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      window.parent.closeOverlay();
    });
  };

  function nav() {
    const h = document.createElement('header');
    h.className = 'site-nav';
    h.innerHTML =
      '<a class="brand" href="../index.html">[ UNTHINKING ]</a><nav aria-label="Pages"></nav><span class="nav-end"></span>';
    const n = h.querySelector('nav');
    leaveToGraph(h.querySelector('.brand'));
    PAGES.forEach(([k, v]) => {
      const a = document.createElement('a');
      a.href = k + '.html';
      a.textContent = v;
      if (k === here) a.setAttribute('aria-current', 'page');
      n.appendChild(a);
    });
    document.body.prepend(h);
    const cur = n.querySelector('[aria-current]');
    if (cur) cur.scrollIntoView({ inline: 'center', block: 'nearest' });
  }

  function reveal() {
    const sel = '.container > *, .page > *, .view > *';
    const els = [...document.querySelectorAll(sel)].filter((e) => !e.matches('script,style'));
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('rv-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 }
    );
    els.forEach((e, i) => {
      e.classList.add('rv');
      e.style.transitionDelay = Math.min(i % 8, 5) * 50 + 'ms';
      io.observe(e);
    });
    setTimeout(() => els.forEach((e) => e.classList.add('rv-in')), 2500); // safety net
  }

  const init = () => {
    nav();
    reveal();
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
