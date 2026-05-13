/**
 * FINOVA — Animated Gradient Background
 * WebGL mesh gradient: 6 color orbs drifting on GPU.
 * Drop this canvas behind everything. Zero DOM repaints.
 * Usage: add <canvas id="gradientBg"></canvas> as first child of <body>,
 *        link this file, and it self-initialises.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('gradientBg');
  if (!canvas) return;

  /* ── Styles ── */
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0', left: '0',
    width: '100%', height: '100%',
    zIndex: '0',
    pointerEvents: 'none',
  });

  /* ── WebGL context ── */
  const gl = canvas.getContext('webgl', {
    antialias: false,
    depth: false,
    stencil: false,
    alpha: false,
    preserveDrawingBuffer: false,
  });

  if (!gl) {
    /* Fallback: CSS-only animated gradient */
    document.body.style.background = `
      linear-gradient(180deg,#050816 0%,#0A0F1F 52%,#0D1324 100%)
    `;
    canvas.remove();
    return;
  }

  /* ── Shader source ──
   * 6 gaussian "orbs" in HSL-ish mixing.
   * Each orb drifts on a Lissajous path; no texture lookups.
   */
  const vert = `
    attribute vec2 a_pos;
    void main(){gl_Position=vec4(a_pos,0.,1.);}
  `;

  const frag = `
    precision mediump float;
    uniform vec2  u_res;
    uniform float u_t;

    /* ── palette: 6 colours as RGB ── */
    const vec3 C0 = vec3(0.01,0.03,0.12);   /* near-black navy */
    const vec3 C1 = vec3(0.02,0.07,0.20);   /* deep ocean      */
    const vec3 C2 = vec3(0.03,0.12,0.28);   /* dark royal blue */
    const vec3 C3 = vec3(0.04,0.10,0.24);   /* slate blue      */
    const vec3 C4 = vec3(0.02,0.05,0.16);   /* midnight blue   */
    const vec3 C5 = vec3(0.05,0.15,0.32);   /* steel blue      */

    float orb(vec2 uv, vec2 centre, float radius){
      float d = length(uv - centre);
      return exp(-d*d / (radius*radius));
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / u_res;
      /* flip Y so (0,0)=bottom-left */
      uv.y = 1.0 - uv.y;

      float T = u_t * 0.18;

      /* Lissajous orb positions */
      vec2 p0 = vec2(0.15 + 0.12*sin(T*0.7+0.0),  0.85 + 0.08*cos(T*0.5+1.0));
      vec2 p1 = vec2(0.80 + 0.10*cos(T*0.6+2.0),  0.15 + 0.12*sin(T*0.8+0.5));
      vec2 p2 = vec2(0.50 + 0.20*sin(T*0.5+1.5),  0.50 + 0.18*cos(T*0.4+2.3));
      vec2 p3 = vec2(0.85 + 0.08*cos(T*0.9+3.1),  0.78 + 0.10*sin(T*0.6+1.2));
      vec2 p4 = vec2(0.20 + 0.14*sin(T*0.4+4.0),  0.25 + 0.15*cos(T*0.7+0.8));
      vec2 p5 = vec2(0.65 + 0.15*cos(T*0.55+2.8), 0.60 + 0.12*sin(T*0.65+3.5));

      /* radii vary over time for breathing feel */
      float r0 = 0.38 + 0.08*sin(T*0.4);
      float r1 = 0.32 + 0.07*cos(T*0.5+1.0);
      float r2 = 0.45 + 0.10*sin(T*0.3+2.0);
      float r3 = 0.28 + 0.06*cos(T*0.6+0.5);
      float r4 = 0.35 + 0.08*sin(T*0.45+1.8);
      float r5 = 0.30 + 0.07*cos(T*0.35+3.0);

      float w0 = orb(uv,p0,r0);
      float w1 = orb(uv,p1,r1);
      float w2 = orb(uv,p2,r2);
      float w3 = orb(uv,p3,r3);
      float w4 = orb(uv,p4,r4);
      float w5 = orb(uv,p5,r5);

      float total = w0+w1+w2+w3+w4+w5 + 0.001;

      vec3 col = (C0*w0 + C1*w1 + C2*w2 + C3*w3 + C4*w4 + C5*w5) / total;

      /* Darken top-to-bottom to keep the page text readable */
      float vignette = 1.0 - 0.45*length(uv - vec2(0.5,0.5));
      col *= vignette;

      /* Clamp to keep deep navy as darkest possible floor */
      col = max(col, vec3(0.008, 0.018, 0.045));

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  /* ── Compile shaders ── */
  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('Shader error:', gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  const vs = compile(gl.VERTEX_SHADER, vert);
  const fs = compile(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn('Program link error:', gl.getProgramInfoLog(prog));
    return;
  }
  gl.useProgram(prog);

  /* ── Full-screen quad ── */
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,  1, -1,  -1, 1,
     1, -1,  1,  1,  -1, 1,
  ]), gl.STATIC_DRAW);

  const aPos   = gl.getAttribLocation(prog, 'a_pos');
  const uRes   = gl.getUniformLocation(prog, 'u_res');
  const uTime  = gl.getUniformLocation(prog, 'u_t');

  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  /* ── Resize ── */
  const DPR = Math.min(window.devicePixelRatio || 1, 1.0); // cap at 1× for perf — gradient is subtle
  let W = 0, H = 0;

  function resize() {
    const w = Math.round(window.innerWidth  * DPR);
    const h = Math.round(window.innerHeight * DPR);
    if (w === W && h === H) return;
    W = w; H = h;
    canvas.width  = W;
    canvas.height = H;
    gl.viewport(0, 0, W, H);
  }

  resize();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 250);
  }, { passive: true });

  /* ── Render loop ──
   * Pauses when tab is hidden.
   * Runs at ~15 fps by rendering every 4th frame — the gradient
   * moves so slowly that this is imperceptible, but quarters GPU load.
   */
  let rafId = null;
  let frame = 0;
  let paused = false;

  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (!paused && !rafId) rafId = requestAnimationFrame(render);
  });

  function render(t) {
    if (paused) { rafId = null; return; }

    /* Render every 4th frame — ~15fps is plenty for a slow gradient */
    if (++frame % 4 === 0) {
      gl.uniform2f(uRes, W / DPR, H / DPR);
      gl.uniform1f(uTime, t * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    rafId = requestAnimationFrame(render);
  }

  rafId = requestAnimationFrame(render);

})();
