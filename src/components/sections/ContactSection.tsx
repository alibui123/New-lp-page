export function ContactSection() {
  return (
    <section id="contact" className="chapter">
      <div className="container">
        <div className="contact-grid">
          {/* Left Pane: The Pitch */}
          <div className="contact-pitch fade-up">
            <h2 className="ch-h2" style={{ marginTop: '0' }}>
              <span>Stop letting</span>
              <span>
                <em style={{ color: '#ff6b6b', WebkitTextFillColor: '#ff6b6b' }}>Revenue</em>
              </span>
              <span>slip through.</span>
            </h2>
            <p className="ch-body">
              Join the top-tier plumbing teams that are already automating their dispatch, answering every call instantly, and securing every job. We’ll
              map out exactly how Finova can integrate with your current phone system and CRM in less than 15 minutes.
            </p>
            <div className="trust-badges">
              <div className="t-badge">

                <span>Zero Downtime Integration</span>
              </div>
              <div className="t-badge">

                <span>24/7 Setup Support</span>
              </div>
            </div>
          </div>

          {/* Right Pane: Contact Info Card */}
          <div className="contact-info-card fade-left">
            <div className="glass-card">
              <div className="form-header">
                <h3>Contact Us</h3>
                <p>Reach out to our team anytime.</p>
              </div>

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
        </div>

        <footer className="contact-footer">
          <div className="footer-top">
            <div className="footer-brand">
              <img src="/assets/finova-icon.png" alt="Finova Solutions Logo" style={{ height: '40px', marginBottom: '16px' }} />
              <p style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dispatch Automation for Plumbing Teams.</p>
            </div>
            <div className="footer-links">
              <div>
                <strong>Product</strong>
                <a href="#ch1">Problem</a>
                <a href="#ch3">How it Works</a>

                <a href="#ch4">Results</a>
              </div>
              <div>
                <strong>Company</strong>
                <a href="#contact">Contact Us</a>
                <a href="https://finovasolutions.tech/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                <a href="https://finovasolutions.tech/terms-of-service/" target="_blank" rel="noopener noreferrer">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Finova Solutions. All rights reserved.</p>
            <p>Helping plumbing teams answer faster · dispatch smarter</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
