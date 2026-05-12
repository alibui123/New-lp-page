export function ContactSection() {
  return (
    <section id="contact" className="chapter">
      <div className="contact-inner">
        <div className="contact-info-block fade-left">
          <span className="chapter-label"></span>
          <h2 className="ch-h2" style={{ marginTop: '14px' }}>
            Let&apos;s talk
            <br />
            <span style={{ color: 'var(--water)' }}>dispatch.</span>
          </h2>
          <div className="contact-details">
            <div className="c-row">
              <span>Email</span>
              <strong>support@finovasolutions.com</strong>
            </div>
            <div className="c-row">
              <span>Support Hours</span>
              <strong>24/7 emergency coverage</strong>
            </div>
            <div className="c-row">
              <span>Consultation</span>
              <strong>15 min · Free · No card required</strong>
            </div>
            <div className="c-row">
              <span>Average ETA</span>
              <strong id="eta-display">12 min response</strong>
            </div>
          </div>
        </div>
      </div>

      <footer className="contact-footer">
        <p>© 2026 Finova Solutions</p>
        <p>Helping plumbing teams answer faster · dispatch smarter</p>
      </footer>
    </section>
  );
}
