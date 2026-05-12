export function Chapter3() {
  return (
    <section className="chapter" id="ch3">
      <div className="ch3-inner">
        <div className="ch3-main">
          <div className="section-head">
            <span className="chapter-label fade-up"></span>
            <h2 className="ch-h2 fade-up d1" style={{ marginTop: '12px' }}>
              Three steps.
              <br />
              <span style={{ color: 'var(--water)' }}>Zero missed jobs.</span>
            </h2>
          </div>

          <div className="steps-track">
            <div className="step-row fade-up">
              <div className="step-content">
                <span className="step-num">01</span>
                <div className="step-title">Customer Calls</div>
                <p className="step-desc">
                  The AI answers instantly — 24 hours a day, 7 days a week, 365 days a year. It listens, identifies the emergency type (burst pipe, clog,
                  heater failure), captures the location and urgency, and logs everything in under 15 seconds.
                </p>
              </div>
              <div className="step-connector"></div>
              <div></div>
            </div>

            <div className="step-row fade-up d1">
              <div></div>
              <div className="step-connector"></div>
              <div className="step-content">
                <span className="step-num">02</span>
                <div className="step-title">Best Plumber Dispatched</div>
                <p className="step-desc">
                  The system matches the job to the ideal technician: right skill set, nearest location, current availability. Dispatch notes are pushed
                  instantly with issue type, customer address, and urgency. No back-and-forth. No phone tag.
                </p>
              </div>
            </div>

            <div className="step-row fade-up d2">
              <div className="step-content">
                <span className="step-num">03</span>
                <div className="step-title">Live Updates All Round</div>
                <p className="step-desc">
                  The customer gets an ETA. The dispatcher sees a live board. The plumber gets a clean job brief before arrival — not a panicked phone call
                  on the road. Everyone stays informed until the wrench is back in the van.
                </p>
              </div>
              <div className="step-connector"></div>
              <div></div>
            </div>
          </div>
        </div>

        <div className="dispatch-mockup fade-left">
          <div className="mockup-head">
            <span className="mockup-kicker">Live Dispatch</span>
            <strong>Incoming call → AI summary → assigned tech</strong>
          </div>

          <div className="mockup-call card-float">
            <span className="call-dot"></span>
            <div>
              <span className="mockup-label">Incoming call</span>
              <strong>Emergency leak at 224 Pine St.</strong>
              <p>Caller reports water under the kitchen cabinet and rising pressure.</p>
            </div>
          </div>

          <div className="mockup-summary card-float" style={{ animationDelay: '.12s' }}>
            <span className="mockup-label">AI summary</span>
            <div className="summary-row">
              <b>Priority</b>
              <span>High</span>
            </div>
            <div className="summary-row">
              <b>Type</b>
              <span>Residential leak</span>
            </div>
            <div className="summary-row">
              <b>ETA</b>
              <span>12 min</span>
            </div>
            <div className="summary-meter">
              <span></span>
            </div>
          </div>

          <div className="mockup-tech card-float" style={{ animationDelay: '.24s' }}>
            <div className="tech-ping"></div>
            <div>
              <span className="mockup-label">Assigned tech</span>
              <strong>Marcus R. · Van 12</strong>
              <p>Closest available plumber with leak repair experience is on route.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
