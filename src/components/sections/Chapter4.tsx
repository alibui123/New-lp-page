export function Chapter4() {
  return (
    <section className="chapter" id="ch4">
      <div className="container">
        <div className="metrics-grid">
          <span className="chapter-label fade-up"></span>
          <h2 className="ch-h2 fade-up d1" style={{ marginTop: '12px', maxWidth: '700px' }}>
            Simple flow.
            <br />
            <span style={{ color: 'var(--water)' }}>Measurable results.</span>
          </h2>

          <div className="big-numbers">
            <div className="metric-block fade-up d1">
              <span className="metric-num" data-target="99">
                0
              </span>
              <span className="metric-label">% Calls Answered</span>
            </div>
            <div className="metric-block fade-up d2">
              <span className="metric-num" data-target="15">
                0
              </span>
              <span className="metric-label">Sec to Triage</span>
            </div>
            <div className="metric-block fade-up d3">
              <span className="metric-num" data-target="2500">
                0
              </span>
              <span className="metric-label">Service Calls Handled</span>
            </div>
            <div className="metric-block fade-up d4">
              <span className="metric-num" data-target="2">
                0
              </span>
              <span className="metric-label">Steps to Book a Job</span>
            </div>
          </div>

          <div className="results-strip fade-up d4">
            <div className="result-chip">
              <strong>Fewer callbacks</strong>
              <span>Because every emergency is handled the first time.</span>
            </div>
            <div className="result-chip">
              <strong>Faster booking</strong>
              <span>Clear triage means the next step is obvious.</span>
            </div>
            <div className="result-chip">
              <strong>Cleaner schedules</strong>
              <span>Crews get the right jobs without extra back-and-forth.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
