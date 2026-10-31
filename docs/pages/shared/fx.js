/**
 * Modern layer for the standalone pages: site nav, scroll reveal, and a slow particle-ring background.
 * Loaded with `defer`; no dependencies. Respects prefers-reduced-motion and pauses when the tab is hidden.
 */
(() => {
  const PAGES = [
    ['findings', 'Findings'],
    ['agent-loop', 'Agent loop'],
    ['data', 'Data'],
    ['tokenization', 'Tokenization'],
    ['architecture', 'Architecture'],
    ['attention', 'Attention'],
    ['training', 'Training'],
    ['implementation', 'Implementation'],
  ];
  const here = location.pathname.split('/').pop().replace('.html', '');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    [['../index', 'Graph'], ...PAGES.map(([k, v]) => [k, v])].forEach(([k, v]) => {
      const a = document.createElement('a');
      a.href = k + '.html';
      a.textContent = v;
      if (k === here) a.setAttribute('aria-current', 'page');
      if (k === '../index') leaveToGraph(a);
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

  function bg() {
    const cv = document.createElement('canvas');
    cv.id = 'fx-bg';
    cv.setAttribute('aria-hidden', 'true');
    document.body.prepend(cv);
    const gl = cv.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) {
      cv.remove();
      return;
    }
    const sh = (t, s) => {
      const o = gl.createShader(t);
      gl.shaderSource(o, s);
      gl.compileShader(o);
      return o;
    };
    const pr = gl.createProgram();
    gl.attachShader(
      pr,
      sh(
        gl.VERTEX_SHADER,
        'attribute vec2 aPos;attribute vec4 aCol;attribute float aSize;uniform vec2 uRes;varying vec4 vCol;void main(){vec2 c=aPos/uRes*2.0-1.0;gl_Position=vec4(c.x,-c.y,0.0,1.0);gl_PointSize=aSize;vCol=aCol;}'
      )
    );
    gl.attachShader(
      pr,
      sh(
        gl.FRAGMENT_SHADER,
        'precision mediump float;varying vec4 vCol;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;float a=smoothstep(.5,.1,d)*vCol.a;gl_FragColor=vec4(vCol.rgb*a,1.0);}'
      )
    );
    gl.linkProgram(pr);
    gl.useProgram(pr);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    [
      ['aPos', 2, 0],
      ['aCol', 4, 8],
      ['aSize', 1, 24],
    ].forEach(([n, c, o]) => {
      const l = gl.getAttribLocation(pr, n);
      gl.enableVertexAttribArray(l);
      gl.vertexAttribPointer(l, c, gl.FLOAT, false, 28, o);
    });
    const uRes = gl.getUniformLocation(pr, 'uRes');
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.clearColor(0, 0, 0, 1);

    // tint the dust with the page accent (each page sets --accent)
    const hex = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    let ac = [0.55, 0.56, 1];
    const m = /^#([0-9a-f]{6})$/i.exec(hex);
    if (m) ac = [0, 2, 4].map((i) => parseInt(m[1].substr(i, 2), 16) / 255);
    const tint = ac.map((v) => 0.62 + 0.38 * v);

    const surf = (u, v, s) => {
      const R = 1 + 0.22 * Math.sin(2 * u + 0.8) + 0.1 * Math.cos(3 * u),
        r = (0.36 + 0.15 * Math.sin(u + 1.2)) * s,
        ph = u * 1.5,
        a = Math.cos(v),
        b = 0.45 * Math.sin(v),
        c = Math.cos(ph),
        d = Math.sin(ph),
        nn = r * (a * c - b * d),
        bb = r * (a * d + b * c);
      return [Math.cos(u) * (R + nn), 0.25 * Math.sin(2 * u) + bb, Math.sin(u) * (R + nn)];
    };
    const N = innerWidth < 720 ? 6000 : 15000,
      T2 = Math.PI * 2,
      R = Math.random;
    const base = new Float32Array(N * 3),
      ph = new Float32Array(N),
      data = new Float32Array(N * 7);
    for (let i = 0; i < N; i++) {
      const q = surf(R() * T2, R() * T2, 0.88 + 0.12 * Math.pow(R(), 0.4));
      base[i * 3] = q[0] + (R() - 0.5) * 0.012;
      base[i * 3 + 1] = q[1] + (R() - 0.5) * 0.012;
      base[i * 3 + 2] = q[2] + (R() - 0.5) * 0.012;
      ph[i] = R() * T2;
    }
    gl.bufferData(gl.ARRAY_BUFFER, data.byteLength, gl.DYNAMIC_DRAW);
    let W,
      H,
      DPR = Math.min(devicePixelRatio || 1, 1.5),
      mx = 0,
      my = 0,
      rotY = 0.6,
      last = performance.now(),
      run = true;
    const size = () => {
      W = innerWidth;
      H = innerHeight;
      cv.width = W * DPR;
      cv.height = H * DPR;
    };
    addEventListener('resize', () => {
      size();
      if (reduce) draw(performance.now());
    });
    size();
    addEventListener(
      'pointermove',
      (e) => {
        mx = e.clientX / W - 0.5;
        my = e.clientY / H - 0.5;
      },
      { passive: true }
    );
    document.addEventListener('visibilitychange', () => {
      run = !document.hidden;
      if (run) {
        last = performance.now();
        requestAnimationFrame(draw);
      }
    });
    const D = 3.4;
    function draw(now) {
      if (!run) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (document.documentElement.getAttribute('data-theme') !== 'light') {
        if (!reduce) rotY += dt * 0.035;
        const sc = Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - H));
        const ry = rotY + mx * 0.35,
          rx = -0.42 + sc * 0.9 + my * 0.2,
          cY = Math.cos(ry),
          sY = Math.sin(ry),
          cX = Math.cos(rx),
          sX = Math.sin(rx);
        const S = Math.min(W, H) * 0.42,
          cx = W * 0.5,
          cy = H * 0.5,
          t = now / 1000;
        let o = 0;
        for (let i = 0; i < N; i++) {
          const w = 1 + 0.012 * Math.sin(t * 0.6 + ph[i]),
            x = base[i * 3] * w,
            y = base[i * 3 + 1] * w,
            z = base[i * 3 + 2] * w;
          const x1 = x * cY + z * sY,
            z1 = -x * sY + z * cY,
            y2 = y * cX - z1 * sX,
            z2 = y * sX + z1 * cX,
            p = D / (D - z2);
          let f = (z2 + 1.6) / 3.2;
          f = f < 0 ? 0 : f > 1 ? 1 : f;
          data[o++] = (cx + x1 * p * S) * DPR;
          data[o++] = (cy - y2 * p * S) * DPR;
          data[o++] = tint[0];
          data[o++] = tint[1];
          data[o++] = tint[2];
          data[o++] = (0.12 + 0.88 * f) * 0.9;
          data[o++] = (0.8 + 1.1 * f) * p * DPR;
        }
        gl.viewport(0, 0, cv.width, cv.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform2f(uRes, cv.width, cv.height);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, data);
        gl.drawArrays(gl.POINTS, 0, N);
      }
      if (!reduce) requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
    if (reduce) addEventListener('scroll', () => requestAnimationFrame(draw), { passive: true });
  }

  const init = () => {
    nav();
    bg();
    reveal();
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
