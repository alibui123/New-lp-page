export function Chapter1() {
  return (
    <section className="chapter" id="ch1">
      <div className="drip-line"></div>

      <div className="ch1-inner">
        <div className="ch1-text">
          <div className="red-kicker fade-up">
            <span className="red-dot"></span>
          </div>
          <h2 className="ch-h2 fade-up d1">
            <span>Calls come in.</span>
            <span>
              <em>Jobs</em>
            </span>
            <span>get missed.</span>
          </h2>
          <p className="ch-body fade-up d2">
            Plumbing teams lose revenue when high-value calls hit voicemail — after hours, on weekends, or while every tech is already on site.
            Every missed ring sends a homeowner or property manager to the next company in the area. Finova fixes the handoff by capturing the job,
            qualifying the urgency, and keeping the crew informed.
          </p>
        </div>

        <div className="call-stream" id="callStream">
          <div className="missed-call" style={{ transitionDelay: '.1s' }}>
            <span className="mc-icon">📵</span>
            <div className="mc-info">
              <strong>Burst pipe — basement flooding</strong>
              <span>Sat 11:48 PM · Missed after hours</span>
            </div>
            <span className="mc-loss">−$480</span>
          </div>
          <div className="missed-call" style={{ transitionDelay: '.35s' }}>
            <span className="mc-icon">📵</span>
            <div className="mc-info">
              <strong>Water heater failure</strong>
              <span>Sun 7:22 AM · Voicemail, no callback</span>
            </div>
            <span className="mc-loss">−$340</span>
          </div>
          <div className="missed-call" style={{ transitionDelay: '.6s' }}>
            <span className="mc-icon">📵</span>
            <div className="mc-info">
              <strong>Sewer backup — 3 units</strong>
              <span>Mon 6:15 PM · All techs busy</span>
            </div>
            <span className="mc-loss">−$1,200</span>
          </div>
          <div className="missed-call" style={{ transitionDelay: '.85s' }}>
            <span className="mc-icon">📵</span>
            <div className="mc-info">
              <strong>Emergency leak — commercial</strong>
              <span>Tue 2:03 AM · After hours</span>
            </div>
            <span className="mc-loss">−$2,100</span>
          </div>
          <div
            id="total-loss"
            style={{
              fontFamily: 'var(--ff-display)',
              fontSize: '3.5rem',
              lineHeight: 1,
              color: 'var(--rust)',
              textAlign: 'right',
              paddingTop: '16px',
              opacity: 0,
              transition: 'opacity .8s ease .9s',
              textShadow: '0 0 30px rgba(255,77,46,.4)',
            }}
          >
            −$4,120 / week
          </div>

          <div className="loss-note fade-up d4">Missed calls become lost revenue, slower trucks, and more stress for the team.</div>
        </div>
      </div>
    </section>
  );
}
