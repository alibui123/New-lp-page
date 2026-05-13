export function Chapter5() {
  return (
    <section className="chapter" id="ch5">
      <div className="container">
        <div className="team-wrap">
          <span className="chapter-label fade-up"></span>
          <h2 className="ch-h2 fade-up d1" style={{ marginTop: '12px' }}>
            Built by people who
            <br />
            <span style={{ color: 'var(--water)' }}>know the work.</span>
          </h2>
          <p className="ch-body fade-up d2" style={{ maxWidth: '560px', marginTop: '16px' }}>
            Finova Solutions was built with real dispatch workflows in mind — not theoretical ones. We&apos;ve sat with field crews, dispatchers, and owners
            to understand where the friction lives in the plumbing industry, and we bridge that gap with AI that speaks the language of field ops.
          </p>

          <div className="team-cards">
            <div className="team-card fade-left">
              <img className="team-avatar" src="/assets/1754814017080.jpeg" alt="Astafa Ali" loading="lazy" decoding="async" />
              <div>
                <div className="team-name">Astafa Ali</div>
                <div className="team-role">Founder & CEO, Finova Solutions</div>
                <p className="team-bio">
                  Astafa helps plumbing teams cut response time by fixing the job assignment and route planning gaps that cost revenue every day.
                </p>
              </div>
            </div>

            <div className="team-card fade-right">
              <img className="team-avatar" src="/assets/1777137913545.png" alt="Abdul Mutaal" loading="lazy" decoding="async" />
              <div>
                <div className="team-name">Abdul Mutaal</div>
                <div className="team-role">Automation Specialist</div>
                <p className="team-bio">
                  Abdul maps call handling workflows for service businesses and makes AI triage straightforward for real field operations — no fluff, no
                  bloat.
                </p>
              </div>
            </div>
          </div>

          <div className="team-values fade-up d3">
            <div className="value-card">
              <span>Field-first</span>
              <p>Built around how plumbing teams actually work on a busy day.</p>
            </div>
            <div className="value-card">
              <span>No fluff</span>
              <p>Simple flows that save time instead of creating another tool to manage.</p>
            </div>
            <div className="value-card">
              <span>Revenue focus</span>
              <p>Every feature is aimed at recovering missed jobs and protecting margin.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
