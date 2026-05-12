export function Chapter6() {
  return (
    <section className="chapter" id="ch6">
      <div className="cta-rings">
        <div className="cta-ring"></div>
        <div className="cta-ring"></div>
        <div className="cta-ring"></div>
      </div>

      <div className="cta-wrap">
        <p className="cta-kicker fade-up">Ready to stop losing jobs?</p>
        <h2 className="cta-headline fade-up d1">
          <span>Answer</span>
          <span>every</span>
          <span
            style={{
              background: 'linear-gradient(90deg,var(--water),#7cf8ff)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            call.
          </span>
        </h2>
        <p className="cta-sub fade-up d2">
          Free 15-minute consultation. We&apos;ll walk through your current dispatch setup and show you exactly where Finova Solutions fits into your
          operation.
        </p>
        <div className="cta-actions fade-up d3">
          <a className="btn-primary" href="https://calendly.com/mutaal-finovasolutions/new-meeting" target="_blank" rel="noopener noreferrer">
            Book Free Consultation
          </a>
          <a className="btn-ghost" href="#contact">
            Contact the Team
          </a>
        </div>
      </div>
    </section>
  );
}
