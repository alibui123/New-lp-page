export function Chapter0() {
  return (
    <section className="chapter" id="ch0">
      <canvas className="droplet-canvas" id="dropCanvas"></canvas>

      <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="cold-open-wrap">
          <span className="chapter-label"></span>
          <h1>
            FINOVA
            <br />
            SOLUTIONS
          </h1>
          <p className="cold-tagline">
            <strong style={{ color: 'var(--water)' }}>AI Dispatch Automation</strong>
            <br />
            for Plumbing Companies
            <br />
            <span style={{ fontSize: '0.9em', opacity: 0.85 }}>Answer every call. Route every emergency. Keep trucks moving.</span>
          </p>
          <a href="#demo" className="hero-wave-cta" aria-label="Take a demo — jump to the voice demo call section">
            <span className="hero-wave-cta__inner">
              <span className="hero-wave-cta__ocean" aria-hidden>
                <span className="hero-wave-cta__band hero-wave-cta__band--deep">
                  <svg className="hero-wave-cta__svg" viewBox="0 0 400 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="finova-hero-hw-deep" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(2,8,20,0.75)" />
                        <stop offset="100%" stopColor="rgba(5,22,42,0.92)" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#finova-hero-hw-deep)"
                      d="M0 38 Q50 24 100 38 T200 38 T300 38 T400 38 L400 72 L0 72 Z"
                    />
                  </svg>
                  <svg className="hero-wave-cta__svg" viewBox="0 0 400 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="url(#finova-hero-hw-deep)"
                      d="M0 38 Q50 24 100 38 T200 38 T300 38 T400 38 L400 72 L0 72 Z"
                    />
                  </svg>
                </span>
                <span className="hero-wave-cta__band hero-wave-cta__band--mid">
                  <svg className="hero-wave-cta__svg" viewBox="0 0 400 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="finova-hero-hw-mid" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(33,210,237,0.6)" />
                        <stop offset="50%" stopColor="rgba(45,212,191,0.55)" />
                        <stop offset="100%" stopColor="rgba(59,130,246,0.5)" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#finova-hero-hw-mid)"
                      d="M0 34 Q50 20 100 34 T200 34 T300 34 T400 34 L400 72 L0 72 Z"
                    />
                  </svg>
                  <svg className="hero-wave-cta__svg" viewBox="0 0 400 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="url(#finova-hero-hw-mid)"
                      d="M0 34 Q50 20 100 34 T200 34 T300 34 T400 34 L400 72 L0 72 Z"
                    />
                  </svg>
                </span>
                <span className="hero-wave-cta__band hero-wave-cta__band--foam">
                  <svg className="hero-wave-cta__svg" viewBox="0 0 400 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="rgba(231,247,255,0.42)"
                      d="M0 28 Q50 16 100 28 T200 28 T300 28 T400 28 L400 56 L0 56 Z"
                    />
                  </svg>
                  <svg className="hero-wave-cta__svg" viewBox="0 0 400 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill="rgba(231,247,255,0.42)"
                      d="M0 28 Q50 16 100 28 T200 28 T300 28 T400 28 L400 56 L0 56 Z"
                    />
                  </svg>
                </span>
              </span>
              <span className="hero-wave-cta__shine" aria-hidden />
              <span className="hero-wave-cta__label">Take a demo</span>
            </span>
          </a>
          <a href="/offer" className="btn-primary hero-offer-cta" aria-label="View our offer and guarantee">
            See Our Guarantee →
          </a>
        </div>
      </div>

      <div className="scroll-hint">
        <span>Scroll to begin</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
