import Script from 'next/script';
import { ExternalScripts } from '@/components/layout/ExternalScripts';
import { NavBar } from '@/components/layout/NavBar';
import { Overlays } from '@/components/layout/Overlays';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

export default function OfferPage() {
  return (
    <>
      <SmoothScroll />
      <Overlays />
      <NavBar currentPage="offer" />

      <main className="offer-page">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="op-hero" id="offer-top">
          <div className="op-hero__bg" aria-hidden />
          <div className="container op-hero__inner">
            <span className="op-eyebrow fade-up">Client Handling Guarantee</span>
            <h1 className="op-hero__title fade-up d1">
              <span className="op-hero__title-line">Add&nbsp;</span>
              <span className="op-hero__title-accent">$25,000</span>
              <span className="op-hero__title-line">&nbsp;to your monthly revenue</span>
              <span className="op-hero__title-sub fade-up d2">
                — or we pay you $3,000 and work free.
                <a className="op-guarantee__tc-link op-hero__tc-inline" href="/terms">
                  T&amp;C APPLIED
                </a>
              </span>
            </h1>
            <p className="op-hero__desc fade-up d3">
              A six-month engagement that installs a predictable, evergreen client-handling
              infrastructure into your plumbing operation. Backed by a legal contract.
            </p>
            <div className="op-hero-badges fade-up d4" aria-label="Offer highlights">
              <span>$25k MRR target</span>
              <span>6-month engagement</span>
              <span>24-hour website bonus</span>
            </div>
            <a
              className="btn-primary op-hero__cta fade-up d5"
              href="https://calendly.com/mutaal-finovasolutions/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
            >
              Claim Your Spot
            </a>
          </div>
          <div className="op-hero__scroll-hint" aria-hidden>
            <span />
            <span />
            <span />
          </div>
        </section>

        {/* ── WHO WE HELP ──────────────────────────────────────── */}
        <section className="op-section" id="offer-who">
          <div className="container">
            <div className="op-label fade-up"></div>
            <h2 className="op-section__title fade-up d1">
              Sound familiar?
            </h2>
            <p className="op-section__lead fade-up d2">
              We work exclusively with small-to-medium plumbing companies who are losing revenue
              to problems they already know about — but haven&apos;t had the time or system to fix.
            </p>

            <ol className="op-pain-list">
              {[
                {
                  n: '01',
                  pain: 'Miss daily calls during office and emergency hours',
                  detail: 'No one to handle clients actively and around the clock — so jobs go to your competitors.',
                },
                {
                  n: '02',
                  pain: 'Expensive, inconsistent answering services',
                  detail: 'Receptionists and call-answering companies are slow, costly, and still human — so opportunities are still missed.',
                },
                {
                  n: '03',
                  pain: 'Weak digital profile, relying on referrals',
                  detail: 'Low review count or bad online reputation means a weak inbound pipeline.',
                },
                {
                  n: '04',
                  pain: 'No follow-up or reminder system',
                  detail: 'No-shows happen. Bad reviews follow. And you&apos;re left chasing clients manually.',
                },
                {
                  n: '05',
                  pain: 'No proper scheduling system',
                  detail: 'Wasted time, missed jobs, and crews showing up to the wrong place.',
                },
                {
                  n: '06',
                  pain: 'Managing appointments through phone calls',
                  detail: 'Basic tools and manual processes that break the moment things get busy.',
                },
              ].map(({ n, pain, detail }) => (
                <li className="op-pain-item fade-up" key={n}>
                  <span className="op-pain-item__num">{n}</span>
                  <div className="op-pain-item__body">
                    <strong className="op-pain-item__title">{pain}</strong>
                    <p className="op-pain-item__detail" dangerouslySetInnerHTML={{ __html: detail }} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── PROMISE ──────────────────────────────────────────── */}
        <section className="op-promise" id="offer-promise">
          <div className="op-promise__glow" aria-hidden />
          <div className="container op-promise__inner">
            <div className="op-label fade-up"></div>
            <blockquote className="op-promise__quote fade-up d1">
              <span className="op-promise__quote-mark" aria-hidden>&ldquo;</span>
              We will sign a legal contract with you, personally vowing to add{' '}
              <em>$25,000 worth of extra monthly recurring revenue</em> by helping you handle
              more clients — or we refund you in full, wire you{' '}
              <em>$3,000 as an apology</em>, and continue working free for 60 days.
              <span className="op-promise__quote-mark op-promise__quote-mark--close" aria-hidden>&rdquo;</span>
            </blockquote>
            <p className="op-promise__note fade-up d2">
              It takes time to build a proper structure and pipeline — but once it&apos;s done, it&apos;s evergreen.
              This is a 6-month engagement, not a get-rich-quick scheme.
            </p>
            <a className="op-guarantee__tc-link fade-up d2" href="/terms">
              T&amp;C APPLIED
            </a>
          </div>
        </section>

        {/* ── STRATEGY ─────────────────────────────────────────── */}
        <section className="op-section" id="offer-strategy">
          <div className="container">
            <div className="op-label fade-up"></div>
            <h2 className="op-section__title fade-up d1">
              How we install it
            </h2>
            <p className="op-section__lead fade-up d2">
              Six precise steps. Fully automated once deployed. No extra tools for your team to manage.
            </p>

            <div className="op-timeline">
              {[
                {
                  n: '01',
                  title: 'AI Receptionist Install',
                  body: 'We install our AI receptionist and CRM into your infrastructure to receive client requests — 24 hours a day, 7 days a week.',
                },
                {
                  n: '02',
                  title: 'Smart Job Assignment',
                  body: 'After a request comes in, the system contacts your plumbers one by one until it finds who can take the job.',
                },
                {
                  n: '03',
                  title: 'Automatic Schedule Update',
                  body: 'The plumber who accepts gets their schedule updated instantly — no manual entry, no back-and-forth.',
                },
                {
                  n: '04',
                  title: 'Plumber Reminders',
                  body: 'Consistent automated reminders go out to your plumber so they arrive on time, every time.',
                },
                {
                  n: '05',
                  title: 'Client Updates & ETA',
                  body: 'The client gets appointment reminders and live ETA updates on their plumber — eliminating no-shows and bad reviews.',
                },
                {
                  n: '06',
                  title: 'Post-Job Review Collection',
                  body: 'After the job, the system automatically calls the client to collect feedback and reviews, building your digital profile.',
                },
              ].map(({ n, title, body }) => (
                <div className="op-timeline__item fade-up" key={n}>
                  <div className="op-timeline__left">
                    <span className="op-timeline__num">{n}</span>
                    <div className="op-timeline__line" aria-hidden />
                  </div>
                  <div className="op-timeline__right">
                    <h3 className="op-timeline__title">{title}</h3>
                    <p className="op-timeline__body">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GUARANTEE ────────────────────────────────────────── */}
        <section className="op-guarantee" id="offer-guarantee">
          <div className="op-guarantee__glow" aria-hidden />
          <div className="container op-guarantee__inner">
            <div>
              <div className="op-label fade-up"></div>
              <h2 className="op-section__title fade-up d1" style={{ maxWidth: '520px' }}>
                Two outcomes.<br />Both work in your favour.
              </h2>
              <p className="op-section__lead fade-up d2" style={{ maxWidth: '460px' }}>
                Follow the steps we provide, work with us genuinely for 180 days, and one of two
                things will happen:
              </p>
            </div>

            <div className="op-guarantee__options fade-up d2">
              <div className="op-guarantee__option op-guarantee__option--win">
                <span className="op-guarantee__option-label">Option A</span>
                <p className="op-guarantee__option-title">You grow.</p>
                <p className="op-guarantee__option-body">
                  Our infrastructure adds $25,000+ to your monthly recurring revenue. You keep
                  everything and the system runs itself.
                </p>
                <ul className="op-guarantee__checks">
                  <li>More calls answered</li>
                  <li>More bookings confirmed</li>
                  <li>More 5-star reviews collected</li>
                </ul>
              </div>

              <div className="op-guarantee__divider" aria-hidden>or</div>

              <div className="op-guarantee__option op-guarantee__option--safe">
                <span className="op-guarantee__option-label">Option B</span>
                <p className="op-guarantee__option-title">We pay you.</p>
                <p className="op-guarantee__option-body">
                  If we fall short — full refund, plus $3,000 wired to your account, plus 60 more
                  days of free service (valued at $3,000).
                </p>
                <ul className="op-guarantee__checks">
                  <li>Full setup fee refunded</li>
                  <li>$3,000 wire transfer to you</li>
                  <li>60 days free continued support</li>
                </ul>
                <a className="op-guarantee__tc-link" href="/terms">
                  T&amp;C APPLIED
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── BONUS ────────────────────────────────────────────── */}
        <section className="op-bonus" id="offer-bonus">
          <div className="container">
            <div className="op-bonus__inner fade-up">
              <div className="op-bonus__badge">Bonus</div>
              <div className="op-bonus__content">
                <h3 className="op-bonus__title">Free website, delivered in 24 hours.</h3>
                <p className="op-bonus__body">
                  Close a deal with us and we design and deliver a fully custom website for your
                  plumbing business within 24 hours — completely free.{' '}
                  <strong>Already have a website? We&apos;ll upgrade it, no charge.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────── */}
        <section className="op-cta" id="offer-cta">
          <div className="op-cta__rings" aria-hidden>
            <div className="op-cta__ring" />
            <div className="op-cta__ring" />
            <div className="op-cta__ring" />
          </div>
          <div className="container op-cta__inner fade-up">
            <span className="op-eyebrow">The window is open</span>
            <h2 className="op-cta__title">
              Ready to lock<br />
              <span className="op-cta__title-accent">this in?</span>
            </h2>
            <p className="op-cta__sub">
              Book a free 15-minute strategy call. We&apos;ll walk through your current dispatch
              setup and show you exactly where Finova Solutions fits.
            </p>
            <div className="op-cta__actions">
              <a
                className="btn-primary"
                href="https://calendly.com/mutaal-finovasolutions/new-meeting"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Free Consultation
              </a>
              <a className="btn-ghost" href="/#contact">
                Contact the Team
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <section id="offer-footer" className="op-footer-shell">
          <div className="container">
            <footer className="contact-footer">
              <div className="footer-top">
                <div className="footer-brand">
                  <img src="/assets/finova-icon.png" alt="Finova Solutions Logo" style={{ height: '40px', marginBottom: '16px' }} />
                  <p style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dispatch Automation for Plumbing Teams.</p>
                </div>
                <div className="footer-links">
                  <div>
                    <strong>Product</strong>
                    <a href="/#ch1">Problem</a>
                    <a href="/#ch3">How it Works</a>
                    <a href="/#ch4">Results</a>
                  </div>
                  <div>
                    <strong>Company</strong>
                    <a href="/#contact">Contact Us</a>
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

      </main>

      <ExternalScripts />
      <Script src="/offer-animations.js" strategy="afterInteractive" />
    </>
  );
}
