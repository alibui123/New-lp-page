import type { Metadata } from 'next';
import { MermaidDiagram } from '@/components/layout/MermaidDiagram';
import { NavBar } from '@/components/layout/NavBar';
import { Overlays } from '@/components/layout/Overlays';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { TermsCursor } from '@/components/layout/TermsCursor';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Finova Solutions',
  description: 'Performance Guarantee Terms and Conditions for Plumbing services.',
};

export default function TermsPage() {
  return (
    <>
      <SmoothScroll />
      <TermsCursor />
      <Overlays />
      <NavBar currentPage="terms" />

      <main className="legal-page">
        <section className="legal-hero">
          <div className="container legal-hero__inner">
            <p className="legal-eyebrow"></p>
            <h1>Performance Guarantee Terms & Conditions for Plumbing</h1>
            <p>
              These Terms and Conditions (“Agreement”) govern a conditional performance guarantee offered by Provider
              (the marketing agency) to Client (the plumbing company), based on an initial audit.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <div className="container legal-content">
            <h2>Definitions</h2>
            <ul>
              <li><strong>Client:</strong> The plumbing business engaging the Provider.</li>
              <li><strong>Provider:</strong> The marketing agency or service provider offering the guarantee.</li>
              <li><strong>Audit:</strong> An initial review of the Client’s sales and lead-handling processes to identify Leakage.</li>
              <li><strong>Leakage:</strong> Estimated value of missed or lost potential sales (unattended calls, unconverted leads, no-shows).</li>
              <li><strong>Deliverables:</strong> Services or implementations Provider will perform (automated reception/CRM, ads, follow-up systems).</li>
              <li><strong>Measurement Period:</strong> Defined time frame (e.g., 180 days from campaign launch) used to measure outcomes.</li>
              <li><strong>Guarantee:</strong> Conditional promise that Provider will generate at least $25,000 in new revenue (or agreed metric).</li>
              <li><strong>Remedies:</strong> Actions Provider must take if guarantee conditions are met but the target is not achieved.</li>
              <li><strong>Parties:</strong> Client and Provider (each a “Party,” together the “Parties”).</li>
            </ul>

            <h2>Audit Scope, Methodology, and Metrics</h2>
            <h3>Scope and Data Access</h3>
            <p>
              The Audit will assess Client’s marketing and sales funnels, including phone logs, CRM and booking data,
              website analytics, and advertising accounts. Client shall provide timely access to all relevant systems and data.
            </p>

            <h3>Methodology</h3>
            <p>
              Provider will analyze inbound calls, missed calls, form submissions, conversion rates, average job value,
              no-show rates, and related KPIs. Example: if missed qualified calls are N and average job value is $X, then
              estimated Leakage is approximately N × $X. Provider may also use surveys and industry benchmarks.
            </p>

            <h3>Timeline</h3>
            <p>
              The Audit is typically conducted within 1–2 weeks of contract start and delivered in writing as an Audit Report,
              including findings and calculated Leakage.
            </p>

            <h3>Metrics and Trigger</h3>
            <p>
              Sample metrics include missed calls, conversion lift, incremental bookings, and attributable revenue. If Leakage
              is at least $25,000, the Guarantee is activated. If Leakage is below $25,000, the Guarantee is void.
            </p>

            <h3>Right to Audit</h3>
            <p>
              Client (or an agreed third party) may audit Provider performance records to verify compliance. Scope,
              scheduling, and cost-sharing should be agreed in advance. In disputes, an independent auditor may be jointly
              appointed.
            </p>

            <h2>Conditional Performance Guarantee</h2>
            <h3>Guarantee Trigger (Leakage ≥ $25,000)</h3>
            <p>
              If the Audit concludes missed opportunities valued at $25,000 or more, Provider will perform the Deliverables
              and work to generate at least $25,000 in net new revenue (or equivalent agreed metric) during the Measurement
              Period (e.g., 180 days).
            </p>

            <h3>Payments and Fees</h3>
            <p>
              Client agrees to pay scheduled fees or retainers, subject to Provider delivery. Fees may become refundable
              under Guarantee Remedies.
            </p>

            <h3>Guarantee Remedies (if triggered and target unmet)</h3>
            <ol>
              <li><strong>Refund:</strong> Return all fees paid by Client for guarantee-based services.</li>
              <li><strong>Additional Payment:</strong> Pay Client $3,000 as additional compensation.</li>
              <li><strong>Extended Service:</strong> Continue agreed services for 60 extra days at no charge.</li>
            </ol>
            <p>
              These remedies are the full and exclusive remedy under the Guarantee and do not admit liability.
            </p>

            <h3>No Unsubstantiated Claims</h3>
            <p>
              Guarantee claims are intended to be truthful, specific, and measurable (exactly $25,000 in added revenue),
              avoiding vague or unsupported promises.
            </p>

            <h3>Guarantee Void (Leakage &lt; $25,000)</h3>
            <ul>
              <li>Provider may propose an alternate engagement model (retainer or non-guaranteed performance model).</li>
              <li>No guarantee remedies apply (no refund obligation and no $3,000 payment).</li>
              <li>If no new terms are agreed, either party may terminate under the Termination clause.</li>
            </ul>

            <h2>Measurement, Verification, and Dispute Resolution</h2>
            <h3>Measurement</h3>
            <p>
              Measurement Period begins when services commence. Parties should agree how incremental revenue is
              attributed to Provider efforts.
            </p>

            <h3>Verification</h3>
            <p>
              After period-end, Provider presents proof of results (lead logs, financial reports, account data). Client may
              request independent verification; auditor findings are final and binding.
            </p>

            <h3>Disputes</h3>
            <p>
              Parties first attempt good-faith negotiation or mediation. If unresolved, disputes proceed to binding arbitration
              under AAA Commercial Rules in the agreed city/state and language.
            </p>

            <h2>Liability, Indemnities, Confidentiality, and Data Privacy</h2>
            <h3>Limitation of Liability</h3>
            <p>
              Except for stated Guarantee remedies, neither party is liable for indirect, punitive, incidental, or consequential
              damages, including lost profits, except for willful misconduct or gross negligence. Provider’s direct-damage
              liability cap (outside Guarantee) is fees paid during the Measurement Period.
            </p>

            <h3>Disclaimer of Warranties</h3>
            <p>
              Except as expressly stated, services are provided “as is.” No other outcomes are guaranteed outside defined
              Guarantee terms.
            </p>

            <h3>Indemnification</h3>
            <ul>
              <li>
                <strong>Client Indemnity:</strong> Client indemnifies Provider against third-party claims arising from Client breach,
                client-provided materials, or legal violations.
              </li>
              <li>
                <strong>Provider Indemnity:</strong> Provider indemnifies Client against infringement or similar claims caused by
                Provider negligence or willful misconduct in Deliverables.
              </li>
            </ul>

            <h3>Confidentiality</h3>
            <p>
              Each party protects non-public information (business plans, audit data, customer lists, pricing, technical details)
              and uses it only for this Agreement. Confidentiality survives termination; trade-secret protection survives as long
              as information remains a trade secret.
            </p>

            <h3>Data Privacy and Security</h3>
            <p>
              Each party will comply with applicable data protection laws (e.g., CCPA/GDPR if applicable). Provider uses
              reasonable safeguards for personal data and Client secures necessary sharing consents.
            </p>

            <h2>Client Responsibilities</h2>
            <ul>
              <li>Provide timely access to requested systems (ad accounts, CRM, analytics, telephony, website).</li>
              <li>Schedule kickoff within one week and attend regular check-ins.</li>
              <li>Respond to requests for approvals or information within 48 hours.</li>
              <li>Implement agreed strategic recommendations unless otherwise approved.</li>
              <li>Maintain agreed campaign budget and truthful lead/sales record sharing.</li>
            </ul>
            <p>
              Failure to cooperate may void the Guarantee if performance shortfall is caused by Client non-cooperation.
            </p>

            <h2>Term, Termination, Amendment, and Notices</h2>
            <ul>
              <li><strong>Term:</strong> Effective on service start and runs through Measurement Period plus any remedy extension.</li>
              <li><strong>Termination for Cause:</strong> Material breach not cured within 30 days after notice.</li>
              <li><strong>Termination without Cause:</strong> Either party may terminate on 60 days’ written notice.</li>
              <li><strong>Amendment:</strong> Changes must be in writing and signed by both parties.</li>
              <li><strong>Governing Law:</strong> U.S. law and applicable client-state law unless otherwise agreed.</li>
              <li><strong>Notices:</strong> Written notices by hand, courier, or confirmed email to designated addresses.</li>
            </ul>

            <h2>One-Page Summary (Executive Overview)</h2>
            <ul>
              <li>
                <strong>Audit and Guarantee:</strong> If audit finds at least $25K in missed opportunities, Provider guarantees
                $25K in added revenue in 6 months, or refund + $3K + 60 free days.
              </li>
              <li>
                <strong>Key Conditions:</strong> Guarantee only activates if threshold is met and Client fulfills cooperation and
                implementation obligations.
              </li>
              <li><strong>Measurement:</strong> CRM/ad/call data tracking; independent auditor available if disputed.</li>
              <li><strong>Responsibilities:</strong> Provider executes systems and campaigns; Client provides access and timely approvals.</li>
              <li><strong>Liability:</strong> Limited as defined; no indirect damages beyond stated remedies.</li>
              <li><strong>Term:</strong> Initial ~6 months, with termination rights per written notice terms.</li>
            </ul>

            <h2>Full Legal Terms (Contract Text)</h2>
            <ol className="legal-contract-list">
              <li>
                <strong>Definitions.</strong> Client, Provider, Audit, Leakage, Deliverables, Measurement Period, Guarantee,
                Remedies, and Parties are defined as above.
              </li>
              <li>
                <strong>Audit & Threshold.</strong> Provider conducts due diligence across call logs, CRM, and ads to calculate
                annualized Leakage. If Leakage is at least $25,000, Guarantee activates; if below, Guarantee is void and
                Provider may propose alternatives or terminate.
              </li>
              <li>
                <strong>Services & Deliverables.</strong> Provider implements agreed solutions such as AI receptionist/CRM,
                campaign management, reminder automations, and review generation.
              </li>
              <li>
                <strong>Guarantee and Remedies.</strong> During a 180-day period, Provider guarantees $25,000 in additional net
                revenue, subject to Client performance. If unmet: refund all fees, pay $3,000, and provide 60 free service
                days. Payments due within 30 days of written demand.
              </li>
              <li>
                <strong>Client Cooperation.</strong> Provider obligations depend on Client timely cooperation, recommended
                implementation, required budget allocation, and infrastructure support.
              </li>
              <li>
                <strong>Fees & Payment Terms.</strong> Fees follow order form/schedule. Late amounts may accrue 1.5% monthly
                interest where permitted.
              </li>
              <li>
                <strong>Measurement & Verification.</strong> Provider supplies performance evidence before period-end. Third-party
                audit costs are split unless fault is found, in which case at-fault party pays.
              </li>
              <li>
                <strong>Dispute Resolution.</strong> Good-faith negotiation first; unresolved matters go to confidential AAA
                arbitration in agreed venue.
              </li>
              <li>
                <strong>Limitation of Liability.</strong> Excludes indirect/consequential damages and caps aggregate direct liability as
                defined, except non-excludable obligations (e.g., fraud/willful misconduct where applicable).
              </li>
              <li>
                <strong>Indemnification.</strong> Mutual indemnities for third-party claims consistent with each party’s conduct and
                responsibility.
              </li>
              <li>
                <strong>Confidentiality; Data Privacy.</strong> Non-public data protection obligations, legal-disclosure handling,
                trade-secret survival, privacy-law compliance, and breach notification expectations.
              </li>
              <li>
                <strong>Term and Termination.</strong> Agreement starts on Effective Date and ends per term logic or termination
                rights, with survival of key clauses.
              </li>
              <li>
                <strong>Amendment and Notices.</strong> Written signed amendments only; notices in writing to designated
                addresses/emails.
              </li>
              <li>
                <strong>Miscellaneous.</strong> Independent contractor status, severability, entire agreement, and standard contract
                boilerplate.
              </li>
            </ol>

            <h2>Executive Summary (Plain English)</h2>
            <p>
              We audit your plumbing lead flow first. If we find at least $25,000 in missed opportunity, we commit to adding
              $25,000 in net new revenue in six months using AI reception, ad management, CRM follow-up, reminders, and
              review systems. If we miss the target and you met your obligations, we refund fees, pay an additional $3,000,
              and continue 60 days free.
            </p>
            <p>
              If leakage is below $25,000, the guarantee does not apply. We may still propose an alternative paid growth plan
              without that refund-based guarantee. The structure aligns incentives and keeps outcomes measurable.
            </p>

            <h2>Suggested Email Language</h2>
            <h3>If Guarantee Applies (Leakage ≥ $25K)</h3>
            <p><strong>Subject:</strong> Audit Complete – We Found $[X] in Missed Plumbing Revenue (Guarantee Applies)</p>
            <p>
              Hi [Prospect Name],<br />
              I’ve completed the audit of your plumbing service inquiries and identified roughly $[X] in missed opportunities
              over the last 12 months. Since this exceeds our $25,000 threshold, our guarantee kicks in: we’ll implement our
              full client-handling system and work to generate at least $25,000 in new revenue for you over the next 6
              months.<br />
              As promised, if we don’t hit that mark (and you’ve followed all our guidance), you’ll get your money back plus
              $3,000 and we’ll continue working an extra 60 days at no charge.<br />
              Best, [Your Name]
            </p>

            <h3>If Guarantee Is Voided (Leakage &lt; $25K)</h3>
            <p><strong>Subject:</strong> Audit Results & Proposed Next Steps (No $25K Guarantee)</p>
            <p>
              Hi [Prospect Name],<br />
              Our audit is complete. It shows missed opportunity below $25,000, so the $25K guarantee does not apply.
              We can still help with a measurable growth plan under a different model (flat-fee or performance-based
              without the guarantee).<br />
              Talk soon, [Your Name]
            </p>

            <h2>Scenario Comparison</h2>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Audit Result</th>
                    <th>Guarantee Status</th>
                    <th>Contractual Terms</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Leakage ≥ $25,000</td>
                    <td>Guarantee Applies</td>
                    <td>
                      Provider runs full service with $25K target. If target is not reached despite Client compliance,
                      Provider refunds fees, pays $3,000, and provides 60 days of free extension.
                    </td>
                  </tr>
                  <tr>
                    <td>Leakage &lt; $25,000</td>
                    <td>Guarantee Void</td>
                    <td>
                      No $25K guarantee obligation. Parties may agree alternative engagement terms or terminate.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Audit Decision Flow (Mermaid)</h2>
            <MermaidDiagram
              className="legal-code legal-mermaid"
              chart={`graph LR
A[Start Audit] --> B{Leakage ≥ $25K?}
B -- Yes --> C[Guarantee Applies: Proceed with full contract]
B -- No --> D[Guarantee Void: Discuss alternate plan]
C --> E[Implement marketing system; track results]
D --> F[Offer fixed-fee or performance plan]
E --> G{Achieved $25K?}
G -- Yes --> H[Success: Client keeps new revenue]
G -- No --> I[Provider triggers refund + $3K + 60d service]`}
            />

            <h2>Sources and Basis</h2>
            <p>
              This structure reflects common performance-guarantee practices, audit rights, confidentiality norms,
              arbitration standards, and truthful-advertising principles. Parties should have final language reviewed by
              licensed counsel in their operating jurisdiction before signing.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
