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
