export function Chapter2() {
  return (
    <section className="chapter" id="ch2">
      <div className="wave-bg">
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#21d2ed" />
              <stop offset="100%" stopColor="#c083fc" />
            </linearGradient>
          </defs>
          <path id="wave1" fill="url(#wg)" opacity=".6" />
          <path id="wave2" fill="url(#wg)" opacity=".3" />
        </svg>
      </div>

      <div className="container">
        <div className="turning-wrap" style={{ margin: '0 auto' }}>
          <div className="vs-text fade-up" style={{ position: 'relative', zIndex: 10 }}>
            AI
          </div>
          <h2 className="big-claim fade-up d1">
            <span className="blur-line">What if every</span>
            <span className="blur-line">plumbing call was</span>
            <span style={{ color: 'var(--water)' }}>handled instantly?</span>
          </h2>
          <p className="claim-sub fade-up d2">
            Finova Solutions built an always-on AI dispatch layer for plumbing companies. It answers every call, understands the emergency, captures the
            details, and routes the right plumber — without a human in the loop overnight.
          </p>

          <div className="solution-points fade-up d3">
            <div className="solution-card">
              <span>Always on</span>
              <p>No missed ring, no voicemail, no waiting for office hours.</p>
            </div>
            <div className="solution-card">
              <span>Smart triage</span>
              <p>Urgency, location, and job type are captured instantly.</p>
            </div>
            <div className="solution-card">
              <span>Crew ready</span>
              <p>Your tech gets clean notes before they ever leave the shop.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
