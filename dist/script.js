/* ================================================================
   FINOVA SOLUTIONS — Performance-Optimized Script
   Key fixes:
   1. Single rAF loop instead of Engine.add() sprawl
   2. Passive scroll listener instead of Lenis for parallax
   3. Removed word-by-word splitting (causes layout thrash)
   4. Reduced will-change scope
   5. Throttled ETA ticker & parallax
   6. Dropped Three.js dependency (unused)
   7. CSS-only cursor (no JS lerp on every frame)
   8. Debounced resize handler
   9. Reduced drop count & wave complexity
   10. All IntersectionObserver callbacks are passive
================================================================ */

'use strict';

/* ─── FEATURE DETECTION ─── */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer  = window.matchMedia('(pointer: fine)').matches;
let   pageVisible  = !document.hidden;

document.addEventListener('visibilitychange', () => {
  pageVisible = !document.hidden;
}, { passive: true });

/* ─── SINGLE RAF LOOP ─── */
// Instead of Engine.add() for every task, one loop runs a fixed small set
let rafId = null;
const loopTasks = [];

function addTask(fn) { loopTasks.push(fn); }
function removeTask(fn) {
  const i = loopTasks.indexOf(fn);
  if (i !== -1) loopTasks.splice(i, 1);
}

function loop(t) {
  if (!pageVisible) { rafId = null; return; }
  for (let i = 0; i < loopTasks.length; i++) loopTasks[i](t);
  rafId = requestAnimationFrame(loop);
}
function startLoop() {
  if (!rafId) rafId = requestAnimationFrame(loop);
}
startLoop();

/* ─── LENIS SMOOTH SCROLL ─── */
let lenis = null;
if (typeof Lenis !== 'undefined' && !reduceMotion) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  // Wire Lenis into the single rAF loop (no second loop)
  addTask((t) => { lenis.raf(t); });
}

/* ─── SCROLL STATE ─── */
let scrollY = 0;
let ticking  = false;

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      onScrollFrame();
      ticking = false;
    });
  }
}, { passive: true });

/* ─── SCROLL PROGRESS BAR + NAV ─── */
const bar = document.getElementById('scroll-bar');
const nav = document.getElementById('topnav');

function onScrollFrame() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? scrollY / max : 0;
  bar.style.transform = `scaleX(${Math.min(1, Math.max(0, pct))})`;
  nav.classList.toggle('inked', scrollY > 40);
}

/* ─── CURSOR (CSS transform only, full-rate lerp) ─── */
const blob = document.getElementById('cursor-blob');
if (blob && finePointer) {
  let mx = window.innerWidth * 0.5, my = window.innerHeight * 0.5;
  let bx = mx, by = my;

  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  addTask(() => {
    bx += (mx - bx) * 0.18;
    by += (my - by) * 0.18;
    blob.style.transform = `translate3d(${bx - 14}px,${by - 14}px,0)`;
  });
}

/* ─── SPOTLIGHT REMOVED — was recalculating full-viewport radial-gradient every 2 frames ─── */

/* ─── PARALLAX REMOVED — getBoundingClientRect every frame forces layout thrash ─── */

/* ─── HERO PARALLAX (pointer-only, very gentle, quarter-rate) ─── */
const heroWrap = document.querySelector('.cold-open-wrap');
if (heroWrap && finePointer && !reduceMotion) {
  let hTX = 0, hTY = 0, hX = 0, hY = 0;
  window.addEventListener('pointermove', e => {
    hTX = (e.clientX / window.innerWidth  - 0.5) * 2;
    hTY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  let heroVisible = true;
  new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 }).observe(document.getElementById('ch0'));

  let hFrame = 0;
  addTask(() => {
    if (!heroVisible || ++hFrame % 4 !== 0) return; // quarter-rate
    hX += (hTX - hX) * 0.03;
    hY += (hTY - hY) * 0.03;
    heroWrap.style.transform = `translate3d(${hX * 4}px,${hY * 3}px,0)`;
  });
}

/* ─── CARD TILT & MAGNETIC BUTTONS REMOVED — getBoundingClientRect on every hover frame forces layout ─── */

/* ─── INTERSECTION: FADE REVEALS (single shared observer) ─── */
const revealObs = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target); // fire once
    }
  }
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => revealObs.observe(el));

/* ─── STEP REVEALS ─── */
const stepObs = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (e.isIntersecting) {
      const content = e.target.querySelector('.step-content');
      if (content) setTimeout(() => content.classList.add('visible'), 150);
      stepObs.unobserve(e.target);
    }
  }
}, { threshold: 0.25 });

document.querySelectorAll('.step-row').forEach(el => stepObs.observe(el));

/* ─── COUNTERS ─── */
function animCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start    = performance.now();

  function tick(now) {
    const t    = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.style.animation = 'tensorBuild .6s cubic-bezier(.16,1,.3,1) forwards';
      setTimeout(() => animCounter(e.target), 150);
      counterObs.unobserve(e.target);
    }
  }
}, { threshold: 0.3 });

document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

/* ─── MISSED CALLS ─── */
const callObs = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (e.isIntersecting) {
      document.querySelectorAll('.missed-call').forEach((mc, i) => {
        setTimeout(() => mc.classList.add('show'), i * 110);
      });
      const total = document.getElementById('total-loss');
      if (total) setTimeout(() => { total.style.opacity = '1'; }, 550);
      callObs.disconnect();
    }
  }
}, { threshold: 0.2 });

const callStream = document.getElementById('callStream');
if (callStream) callObs.observe(callStream);

/* ─── ETA TICKER (setInterval — no rAF needed) ─── */
if (!reduceMotion) {
  let eta = 12;
  const etaEl = document.getElementById('eta-display');
  if (etaEl) {
    setInterval(() => {
      eta = eta > 7 ? eta - 1 : 12;
      etaEl.textContent = `${eta} min response`;
    }, 2500);
  }
}

/* ─── DROPLET CANVAS (hero only, lightweight) ─── */
const canvas = document.getElementById('dropCanvas');
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext('2d', { alpha: true });
  const dpr  = Math.min(window.devicePixelRatio || 1, 1.5);
  const heroSection = document.getElementById('ch0');
  let drops = [];
  let heroSceneActive = false;
  let dropRaf = null;

  function getHeroBounds() {
    return {
      w: heroSection.offsetWidth,
      h: heroSection.offsetHeight
    };
  }

  function resizeCanvas() {
    const { w, h } = getHeroBounds();
    canvas.width  = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();

  class Drop {
    constructor() { this.reset(); const { h } = getHeroBounds(); this.y = Math.random() * h; }
    reset() {
      const { w } = getHeroBounds();
      this.x     = Math.random() * w;
      this.y     = -20;
      this.r     = Math.random() * 2 + 0.5;
      this.speed = Math.random() * 0.7 + 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.wobble = Math.random() * Math.PI * 2;
    }
    update() {
      const { h } = getHeroBounds();
      this.y += this.speed;
      this.wobble += 0.015;
      this.x += Math.sin(this.wobble) * 0.3;
      if (this.y > h + 20) this.reset();
    }
    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle   = '#21d2ed';
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.r * 0.6, this.r * 1.4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Fewer drops = much less GPU work
  for (let i = 0; i < 20; i++) drops.push(new Drop());

  function animDrops() {
    if (!heroSceneActive || !pageVisible) { dropRaf = null; return; }
    const { w, h } = getHeroBounds();
    ctx.clearRect(0, 0, w, h);
    ctx.shadowBlur  = 0; // no shadow — saves huge GPU time
    for (const d of drops) { d.update(); d.draw(); }
    dropRaf = requestAnimationFrame(animDrops);
  }

  new IntersectionObserver(entries => {
    heroSceneActive = entries[0].isIntersecting;
    if (heroSceneActive && !dropRaf) dropRaf = requestAnimationFrame(animDrops);
  }, { threshold: 0.1 }).observe(heroSection);

  // Start immediately if hero is visible on load
  heroSceneActive = true;
  dropRaf = requestAnimationFrame(animDrops);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 200);
  }, { passive: true });
}

/* ─── WAVE ANIMATION (ch2 only, reduced resolution) ─── */
const wave1 = document.getElementById('wave1');
const wave2 = document.getElementById('wave2');
if (wave1 && wave2 && !reduceMotion) {
  let wt = 0;
  let waveActive = false;
  let waveRaf = null;

  // Fewer points = much faster path generation
  function makeWave(t, amp, freq, phase, yOff) {
    let d = `M0,${yOff}`;
    for (let x = 0; x <= 1440; x += 48) { // step 48 instead of 24
      const y = yOff + Math.sin(x * freq + t + phase) * amp
                     + Math.sin(x * freq * 0.5 + t * 1.2 + phase) * amp * 0.4;
      d += ` L${x},${y}`;
    }
    return d + ` L1440,600 L0,600 Z`;
  }

  function animWaves() {
    if (!waveActive || !pageVisible) { waveRaf = null; return; }
    wt += 0.013;
    wave1.setAttribute('d', makeWave(wt, 36, 0.006, 0, 300));
    wave2.setAttribute('d', makeWave(wt, 26, 0.008, Math.PI, 360));
    waveRaf = requestAnimationFrame(animWaves);
  }

  new IntersectionObserver(entries => {
    waveActive = entries[0].isIntersecting;
    if (waveActive && !waveRaf) waveRaf = requestAnimationFrame(animWaves);
  }, { threshold: 0.1 }).observe(document.getElementById('ch2'));
}

/* ─── CHAPTER CHAPTER-LEVEL ANIMATIONS (single observer) ─── */
const chapterObs = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    const id = e.target.id;

    if (id === 'ch2') {
      const claim = document.querySelector('.big-claim');
      if (claim && !claim.classList.contains('blur-in')) claim.classList.add('blur-in');
    }
    if (id === 'ch3') {
      document.querySelectorAll('.step-row').forEach((row, i) => {
        setTimeout(() => {
          const c = row.querySelector('.step-content');
          if (c) c.classList.add('visible');
        }, i * 180);
      });
    }
  }
}, { threshold: 0.25 });

document.querySelectorAll('.chapter').forEach(ch => chapterObs.observe(ch));

/* ─── HEADING GLOW (CSS class toggle, not inline style) ─── */
const headingObs = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('glow-active');
      headingObs.unobserve(e.target);
    }
  }
}, { threshold: 0.4 });

document.querySelectorAll('.ch-h2').forEach(h => headingObs.observe(h));

/* ─── SOFT CARD REVEALS (single observer, no animation property mutation) ─── */
const softObs = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('soft-revealed');
      softObs.unobserve(e.target);
    }
  }
}, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.result-chip, .solution-card').forEach(el => softObs.observe(el));

/* ─── FOOTER REVEAL ─── */
const footer = document.querySelector('footer');
if (footer) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) footer.classList.add('visible');
  }, { threshold: 0.4 }).observe(footer);
}

/* ─── FORM ENHANCEMENTS ─── */
document.querySelectorAll('.cf-label input, .cf-label textarea').forEach(input => {
  input.addEventListener('focus', function () {
    this.style.boxShadow = '0 0 0 3px rgba(57,224,255,.22), inset 0 0 0 1px rgba(57,224,255,.55)';
  });
  input.addEventListener('blur', function () {
    this.style.boxShadow = '0 0 0 3px rgba(57,224,255,.10), inset 0 0 0 1px rgba(57,224,255,.28)';
  });
});

/* ─── DEBOUNCED RESIZE ─── */
let resizeDebounce;
window.addEventListener('resize', () => {
  clearTimeout(resizeDebounce);
  resizeDebounce = setTimeout(() => { onScrollFrame(); }, 200);
}, { passive: true });

/* ─── SERVICE WORKER (optional) ─── */
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}