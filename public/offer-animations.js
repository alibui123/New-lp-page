/* ================================================================
   OFFER PAGE — Interactive Animations
   All scroll-driven, GPU-safe (transform + opacity only).
   Only runs on /offer — safe to include globally via ExternalScripts.
================================================================ */

'use strict';

(function () {
  /* ── Guard: only run on /offer ── */
  if (!document.querySelector('.offer-page')) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer  = window.matchMedia('(pointer: fine)').matches;

  /* ================================================================
     1. HERO — Animated counter for the $25,000 figure
        Looks for [data-count] attribute set in the DOM or we
        target .op-hero__title-accent directly.
  ================================================================ */
  function animateValue(el, from, to, duration, prefix, suffix) {
    const start = performance.now();
    function tick(now) {
      const p    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4); // easeOutQuart
      const val  = Math.floor(from + (to - from) * ease);
      el.textContent = prefix + val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + to.toLocaleString() + suffix;
    }
    requestAnimationFrame(tick);
  }

  /* Hero counter — fires once on page load after a short delay */
  const heroAccent = document.querySelector('.op-hero__title-accent');
  if (heroAccent && !reduceMotion) {
    heroAccent.textContent = '$0';
    setTimeout(() => animateValue(heroAccent, 0, 25000, 1800, '$', ''), 600);
  }

  /* ================================================================
     2. SHARED INTERSECTION OBSERVER — scroll reveals for offer classes
        (.fade-up already handled by script.js, so we layer on top)
  ================================================================ */

  /* ── Staggered pain list items ── */
  const painItems = document.querySelectorAll('.op-pain-item');
  if (painItems.length) {
    /* Set initial hidden state */
    painItems.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-28px)';
      el.style.transition =
        `opacity 0.6s cubic-bezier(.16,1,.3,1) ${i * 0.08}s,
         transform 0.6s cubic-bezier(.16,1,.3,1) ${i * 0.08}s`;
    });

    const painObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        painItems.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateX(0)';
        });
        painObs.disconnect();
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    if (painItems[0]) painObs.observe(painItems[0].closest('.op-pain-list') || painItems[0]);
  }

  /* ================================================================
     3. TIMELINE — draw the vertical line + stagger each step in
  ================================================================ */
  const timelineItems = document.querySelectorAll('.op-timeline__item');
  if (timelineItems.length && !reduceMotion) {
    timelineItems.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
      el.style.transition = 'opacity 0.65s cubic-bezier(.16,1,.3,1), transform 0.65s cubic-bezier(.16,1,.3,1)';
    });

    let fired = false;
    const tlObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !fired) {
        fired = true;
        timelineItems.forEach((el, i) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';

            /* number glow flash */
            const num = el.querySelector('.op-timeline__num');
            if (num) {
              num.style.transition = 'filter 0.4s ease';
              num.style.filter = 'drop-shadow(0 0 12px rgba(33,210,237,0.6))';
              setTimeout(() => { num.style.filter = 'none'; }, 600);
            }
          }, i * 140);
        });
        tlObs.disconnect();
      }
    }, { threshold: 0.1 });

    const tl = document.querySelector('.op-timeline');
    if (tl) tlObs.observe(tl);
  }

  /* ── Animated SVG line that draws down as page scrolls ── */
  const tlWrapper = document.querySelector('.op-timeline');
  if (tlWrapper && !reduceMotion) {
    /* Inject an SVG progress bar inside the timeline left column */
    const lineBar = document.createElement('div');
    lineBar.className = 'op-tl-progress';
    lineBar.setAttribute('aria-hidden', 'true');
    lineBar.style.cssText = `
      position: absolute;
      left: 39px;
      top: 0;
      width: 2px;
      height: 0%;
      background: linear-gradient(180deg, rgba(33,210,237,0.9), rgba(33,210,237,0.1));
      border-radius: 2px;
      z-index: 2;
      transition: height 0.1s linear;
      pointer-events: none;
    `;
    tlWrapper.style.position = 'relative';
    tlWrapper.appendChild(lineBar);

    let tlActive = false;
    new IntersectionObserver(e => { tlActive = e[0].isIntersecting; }, { threshold: 0 })
      .observe(tlWrapper);

    // Throttle scroll updates with requestAnimationFrame to avoid layout thrashing
    let rafPending = false;
    function updateLineBar() {
      rafPending = false;
      if (!tlActive) return;
      const rect = tlWrapper.getBoundingClientRect();
      const visible = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.3)));
      // use transform-scaleY for smoother GPU-driven update when possible
      lineBar.style.height = (visible * 100) + '%';
    }

    window.addEventListener('scroll', () => {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(updateLineBar);
      }
    }, { passive: true });
  }

  /* ================================================================
     4. PROMISE SECTION — word-by-word shimmer reveal
  ================================================================ */
  const promiseQuote = document.querySelector('.op-promise__quote');
  if (promiseQuote && !reduceMotion) {
    /* Wrap every word in a span */
    function wrapWords(el) {
      /* Only wrap text nodes, leave child elements intact */
      el.childNodes.forEach(node => {
        if (node.nodeType === 3 /* TEXT_NODE */ && node.textContent.trim()) {
          const frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(part => {
            if (/\s+/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else if (part) {
              const sp = document.createElement('span');
              sp.className = 'op-word';
              sp.textContent = part;
              sp.style.cssText = 'display:inline-block;opacity:0;transform:translateY(12px);transition:opacity 0.4s ease,transform 0.4s ease;';
              frag.appendChild(sp);
            }
          });
          node.replaceWith(frag);
        } else if (node.nodeType === 1 && node.tagName !== 'SPAN') {
          /* recurse into non-span elements */
          wrapWords(node);
        }
      });
    }

    /* Only wrap em tags and text, not the quote-marks */
    const quoteClone = promiseQuote;
    const quoteMarks = [...quoteClone.querySelectorAll('.op-promise__quote-mark')];
    quoteMarks.forEach(m => m.setAttribute('data-mark', '1'));
    wrapWords(quoteClone);

    const words = promiseQuote.querySelectorAll('.op-word');

    const promObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        words.forEach((w, i) => {
          setTimeout(() => {
            w.style.opacity = '1';
            w.style.transform = 'translateY(0)';
          }, i * 28);
        });
        promObs.disconnect();
      }
    }, { threshold: 0.2 });

    promObs.observe(promiseQuote);
  }

  /* ================================================================
     5. GUARANTEE CARDS — rise + glow entrance
  ================================================================ */
  const gOptions = document.querySelectorAll('.op-guarantee__option');
  if (gOptions.length && !reduceMotion) {
    gOptions.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px) scale(0.97)';
      el.style.transition = `opacity 0.7s cubic-bezier(.16,1,.3,1) ${i * 0.18}s,
                              transform 0.7s cubic-bezier(.16,1,.3,1) ${i * 0.18}s`;
    });

    const gObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        gOptions.forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
        });
        gObs.disconnect();
      }
    }, { threshold: 0.15 });

    const gWrap = document.querySelector('.op-guarantee__options');
    if (gWrap) gObs.observe(gWrap);
  }

  /* ================================================================
     6. BONUS STRIP — shimmer sweep on scroll-into-view
  ================================================================ */
  const bonusInner = document.querySelector('.op-bonus__inner');
  if (bonusInner && !reduceMotion) {
    bonusInner.style.opacity = '0';
    bonusInner.style.transform = 'translateY(32px)';
    bonusInner.style.transition = 'opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)';

    /* Shimmer pseudo-element via a real element */
    const shimmer = document.createElement('div');
    shimmer.setAttribute('aria-hidden', 'true');
    shimmer.style.cssText = `
      position: absolute; inset: 0; border-radius: inherit;
      background: linear-gradient(105deg, transparent 30%, rgba(33,210,237,0.18) 50%, transparent 70%);
      transform: translateX(-100%);
      pointer-events: none;
      z-index: 5;
    `;
    bonusInner.appendChild(shimmer);

    const bObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        bonusInner.style.opacity = '1';
        bonusInner.style.transform = 'translateY(0)';
        /* shimmer sweep */
        setTimeout(() => {
          shimmer.style.transition = 'transform 0.9s cubic-bezier(.16,1,.3,1)';
          shimmer.style.transform = 'translateX(120%)';
        }, 300);
        bObs.disconnect();
      }
    }, { threshold: 0.3 });

    bObs.observe(bonusInner);
  }

  /* ================================================================
     7. MAGNETIC CTA BUTTON — subtle pull toward cursor
  ================================================================ */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.op-cta .btn-primary, .op-cta .btn-ghost, .op-hero__cta').forEach(btn => {
      let rect, active = false;

      btn.addEventListener('mouseenter', () => {
        rect = btn.getBoundingClientRect();
        active = true;
      });

      btn.addEventListener('mousemove', e => {
        if (!active || !rect) return;
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) * 0.28;
        const dy = (e.clientY - cy) * 0.28;
        btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
      });

      btn.addEventListener('mouseleave', () => {
        active = false;
        btn.style.transition = 'transform 0.5s cubic-bezier(.16,1,.3,1), box-shadow 0.2s';
        btn.style.transform = 'translate(0,0)';
        setTimeout(() => { btn.style.transition = ''; }, 500);
      });
    });
  }

  /* ================================================================
     8. CTA SECTION — cursor-tracking radial glow
  ================================================================ */
  const ctaSection = document.querySelector('.op-cta');
  if (ctaSection && finePointer && !reduceMotion) {
    const glow = document.createElement('div');
    glow.setAttribute('aria-hidden', 'true');
    glow.style.cssText = `
      position: absolute;
      width: 500px; height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(33,210,237,0.07) 0%, transparent 70%);
      pointer-events: none;
      z-index: 1;
      transform: translate(-50%, -50%);
      left: 50%; top: 50%;
      transition: left 0.15s ease, top 0.15s ease;
      will-change: left, top;
    `;
    ctaSection.appendChild(glow);

    let ctaVisible = false;
    new IntersectionObserver(e => { ctaVisible = e[0].isIntersecting; }, { threshold: 0 })
      .observe(ctaSection);

    ctaSection.addEventListener('mousemove', e => {
      if (!ctaVisible) return;
      const r = ctaSection.getBoundingClientRect();
      glow.style.left = (e.clientX - r.left) + 'px';
      glow.style.top  = (e.clientY - r.top)  + 'px';
    }, { passive: true });
  }

  /* ================================================================
     9. PAIN ITEM — left border active on hover (already CSS),
        plus a subtle right-side number counter reveal
        and typewriter on the title on first hover
  ================================================================ */
  painItems.forEach(item => {
    let revealed = false;
    item.addEventListener('mouseenter', () => {
      if (revealed) return;
      revealed = true;
      const num = item.querySelector('.op-pain-item__num');
      if (num) {
        num.style.transition = 'color 0.4s ease, text-shadow 0.4s ease';
        num.style.textShadow = '0 0 20px rgba(33,210,237,0.3)';
      }
    });
  });

  /* ================================================================
    10. SECTION EYEBROWS — slide in from left with a cyan underline
        that draws across as they enter
  ================================================================ */
  const eyebrows = document.querySelectorAll('.op-label, .op-eyebrow');
  if (!reduceMotion) {
    eyebrows.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateX(0)';
        }
      });
    }, { threshold: 0.5 }).observe(document.querySelectorAll('.op-label, .op-eyebrow')[0] || document.body);

    /* Each individually */
    const eyeObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateX(0)';
          eyeObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5, rootMargin: '0px 0px -20px 0px' });
    eyebrows.forEach(el => eyeObs.observe(el));
  }

  /* ================================================================
    11. HERO BG PARALLAX — removed to prevent lag
  ================================================================ */

  /* ================================================================
    12. PROMISE NOTE — left border grows in from top
  ================================================================ */
  const promNote = document.querySelector('.op-promise__note');
  if (promNote && !reduceMotion) {
    promNote.style.borderLeftColor = 'rgba(33,210,237,0)';
    promNote.style.opacity = '0';
    promNote.style.transition = 'opacity 0.6s ease 0.2s, border-left-color 0.8s ease 0.4s';

    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        promNote.style.opacity = '1';
        promNote.style.borderLeftColor = 'rgba(33,210,237,0.25)';
      }
    }, { threshold: 0.5 }).observe(promNote);
  }

  /* ================================================================
    13. GUARANTEE DIVIDER "or" — pulse animation on view
  ================================================================ */
  const divider = document.querySelector('.op-guarantee__divider');
  if (divider && !reduceMotion) {
    divider.style.opacity = '0';
    divider.style.transform = 'scale(0.6)';
    divider.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(.34,1.56,.64,1)';

    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        divider.style.opacity = '1';
        divider.style.transform = 'scale(1)';
      }
    }, { threshold: 0.8 }).observe(divider);
  }

  /* ================================================================
    14. SECTION TITLE — clip-reveal removed to prevent missing text bugs
  ================================================================ */

})();
