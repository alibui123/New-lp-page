export function Chapter1() {
  return (
    <section className="chapter" id="ch1">
      <div className="drip-line"></div>

      <div className="container">
        <div className="bento-grid">
          {/* Top Left: Narrative */}
          <div className="bento-box bento-narrative fade-up">
            <div className="red-kicker">
              <span className="red-dot"></span>
            </div>
            <h2 className="ch-h2" style={{ marginTop: '16px' }}>
              <span>Calls come in and </span>
              <span>
                <em>Jobs </em>
              </span>
              <span>get missed.</span>
            </h2>
            <p className="ch-body" style={{ maxWidth: '100%' }}>
              Plumbing teams lose revenue when high-value calls hit voicemail — after hours, on weekends, or while every tech is already on site.
              Every missed ring sends a homeowner or property manager to the next company in the area. Finova fixes the handoff by capturing the job,
              qualifying the urgency, and keeping the crew informed.
            </p>
          </div>

          {/* Top Right: Revenue Loss */}
          <div className="bento-box bento-loss fade-up" style={{ animationDelay: '0.2s' }}>
            <div id="total-loss">
              −$2,020 <span style={{ fontSize: '0.5em' }}>/ WEEK</span>
            </div>
            <div className="loss-note">Missed calls become lost revenue, slower trucks, and more stress for the team.</div>
          </div>

          {/* Bottom: Missed Calls (Horizontal) */}
          <div className="bento-box bento-calls fade-up" style={{ animationDelay: '0.4s' }}>
            <span className="bento-label">Typical Weekend Leakage</span>
            <div className="calls-horizontal">
              <div className="missed-call">
                <span className="mc-icon">🚨</span>
                <div className="mc-info">
                  <strong>Burst pipe — basement flooding</strong>
                  <span>Sat 11:48 PM · Missed after hours</span>
                </div>
                <span className="mc-loss">−$480</span>
              </div>
              <div className="missed-call">
                <span className="mc-icon">🚨</span>
                <div className="mc-info">
                  <strong>Water heater failure</strong>
                  <span>Sun 7:22 AM · Voicemail, no callback</span>
                </div>
                <span className="mc-loss">−$340</span>
              </div>
              <div className="missed-call">
                <span className="mc-icon">🚨</span>
                <div className="mc-info">
                  <strong>Sewer backup — 3 units</strong>
                  <span>Mon 6:15 PM · All techs busy</span>
                </div>
                <span className="mc-loss">−$1,200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
