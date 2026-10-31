/**
 * Modern layer for the standalone pages: site nav, scroll reveal, and a still particle ring
 * behind the content. Loaded with `defer`; no dependencies and no idle animation.
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

  // A still dust ring behind the content. The shader does the rotation and depth
  // fade, so the frame is drawn once (and again only on resize) instead of
  // animating: a moving full-screen canvas pins a core even when the JS is cheap.
  function bg() {
    const cv = document.createElement('canvas');
    cv.id = 'fx-bg';
    cv.setAttribute('aria-hidden', 'true');
    document.body.prepend(cv);
    const gl = cv.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'low-power',
    });
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
        `attribute vec3 aPos;attribute float aPhase;
uniform mat3 uRot;uniform vec2 uRes;uniform float uScale;uniform float uDpr;uniform vec3 uTint;
varying vec3 vCol;varying float vA;
void main(){
  vec3 r=uRot*(aPos*(1.0+0.012*sin(aPhase)));
  float persp=3.4/(3.4-r.z);
  vec2 screen=uRes*0.5+vec2(r.x,-r.y)*persp*uScale;
  vec2 c=screen/uRes*2.0-1.0;
  gl_Position=vec4(c.x,-c.y,0.0,1.0);
  float f=clamp((r.z+1.6)/3.2,0.0,1.0);
  vCol=uTint;
  vA=(0.12+0.88*f)*0.9;
  gl_PointSize=(0.8+1.1*f)*persp*uDpr;
}`
      )
    );
    gl.attachShader(
      pr,
      sh(
        gl.FRAGMENT_SHADER,
        'precision mediump float;varying vec3 vCol;varying float vA;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;float a=smoothstep(.5,.1,d)*vA;gl_FragColor=vec4(vCol*a,1.0);}'
      )
    );
    gl.linkProgram(pr);
    gl.useProgram(pr);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    [
      ['aPos', 3, 0],
      ['aPhase', 1, 12],
    ].forEach(([n, c, o]) => {
      const l = gl.getAttribLocation(pr, n);
      gl.enableVertexAttribArray(l);
      gl.vertexAttribPointer(l, c, gl.FLOAT, false, 16, o);
    });
    const uRot = gl.getUniformLocation(pr, 'uRot');
    const uRes = gl.getUniformLocation(pr, 'uRes');
    const uScale = gl.getUniformLocation(pr, 'uScale');
    const uDpr = gl.getUniformLocation(pr, 'uDpr');
    const uTint = gl.getUniformLocation(pr, 'uTint');
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.clearColor(0, 0, 0, 1);

    // tint the dust with the page accent (each page sets --accent)
    const hex = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    let ac = [0.55, 0.56, 1];
    const m = /^#([0-9a-f]{6})$/i.exec(hex);
    if (m) ac = [0, 2, 4].map((i) => parseInt(m[1].substr(i, 2), 16) / 255);
    const tint = ac.map((v) => 0.62 + 0.38 * v);
    gl.uniform3f(uTint, tint[0], tint[1], tint[2]);

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
    const N = innerWidth < 720 ? 3000 : 9000,
      T2 = Math.PI * 2,
      R = Math.random;
    const verts = new Float32Array(N * 4);
    for (let i = 0; i < N; i++) {
      const q = surf(R() * T2, R() * T2, 0.88 + 0.12 * Math.pow(R(), 0.4));
      verts[i * 4] = q[0] + (R() - 0.5) * 0.012;
      verts[i * 4 + 1] = q[1] + (R() - 0.5) * 0.012;
      verts[i * 4 + 2] = q[2] + (R() - 0.5) * 0.012;
      verts[i * 4 + 3] = R() * T2;
    }
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const DPR = Math.min(devicePixelRatio || 1, 1.5);
    const rot = new Float32Array(9);
    const ry = 0.6 + 0.035,
      rx = -0.42,
      cY = Math.cos(ry),
      sY = Math.sin(ry),
      cX = Math.cos(rx),
      sX = Math.sin(rx);
    // column-major rows of "spin around y, then tip around x"
    rot[0] = cY;
    rot[1] = sX * sY;
    rot[2] = -cX * sY;
    rot[3] = 0;
    rot[4] = cX;
    rot[5] = sX;
    rot[6] = sY;
    rot[7] = -sX * cY;
    rot[8] = cX * cY;

    function draw() {
      const W = innerWidth,
        H = innerHeight;
      cv.width = Math.round(W * DPR);
      cv.height = Math.round(H * DPR);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniformMatrix3fv(uRot, false, rot);
      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uScale, Math.min(W, H) * 0.42 * DPR);
      gl.uniform1f(uDpr, DPR);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, N);
    }

    draw();
    addEventListener('resize', draw);
  }

  const init = () => {
    nav();
    bg();
    reveal();
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
