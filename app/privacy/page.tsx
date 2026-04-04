import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Privacy Policy | Shanta Sriram Constructions',
  description: 'Privacy Policy of Shanta Sriram Constructions Pvt. Ltd. governing collection, use, and protection of personal data.',
}

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction and Commitment' },
  { id: 'scope', title: '2. Scope' },
  { id: 'data-we-collect', title: '3. Data We Collect' },
  { id: 'purpose', title: '4. Purpose of Data Collection' },
  { id: 'legal-basis', title: '5. Legal Basis for Processing' },
  { id: 'data-sharing', title: '6. Data Sharing' },
  { id: 'data-retention', title: '7. Data Retention' },
  { id: 'your-rights', title: '8. Your Rights' },
  { id: 'cookies', title: '9. Cookies Policy' },
  { id: 'whatsapp', title: '10. WhatsApp and Communication' },
  { id: 'third-party', title: '11. Third-Party Links' },
  { id: 'children', title: '12. Children\'s Privacy' },
  { id: 'security', title: '13. Security' },
  { id: 'grievance', title: '14. Grievance Officer' },
  { id: 'updates', title: '15. Updates to This Policy' },
  { id: 'governing-law', title: '16. Governing Law' },
]

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Navbar />

      {/* Cross-link banner */}
      <div className="bg-[#1A1A2E] py-3">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-center gap-2">
          <span className="font-sans text-sm text-white/60">Also read our</span>
          <Link href="/terms" className="font-sans text-sm font-medium text-[#C9A96E] hover:underline">
            Terms of Use
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#F8F4EF] py-16 md:py-24 border-b border-[#E8ECF0]">
        <div className="max-w-[1200px] mx-auto px-6">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-sans text-xs text-[#6B6B6B]">
              <li><Link href="/" className="hover:text-[#CD0E12]">Home</Link></li>
              <li className="text-[#E8ECF0]">/</li>
              <li className="text-[#4A4A5A]">Privacy Policy</li>
            </ol>
          </nav>
          <h1 className="text-h1 font-serif text-[#1A1A2E] mb-4">Privacy Policy</h1>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed max-w-2xl mb-4">
            Shanta Sriram Constructions Pvt. Ltd. is committed to protecting the privacy and personal data of all individuals who interact with our website, sales teams, and digital platforms.
          </p>
          <p className="font-sans text-sm text-[#6B6B6B]">
            <strong className="text-[#1A1A2E]">Effective Date:</strong> April 2026 &nbsp;|&nbsp;
            <strong className="text-[#1A1A2E]">Last Updated:</strong> April 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16 md:py-24 print:py-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">

            {/* Sidebar navigation */}
            <aside className="hidden lg:block">
              <nav className="sticky top-24">
                <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#6B6B6B] mb-4">On This Page</p>
                <ul className="flex flex-col gap-1">
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block font-sans text-sm text-[#4A4A5A] hover:text-[#CD0E12] py-1.5 border-l-2 border-transparent hover:border-[#CD0E12] pl-3 transition-colors"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Main content */}
            <div className="max-w-none">
              <div className="prose-container flex flex-col gap-16">

                {/* 1. Introduction */}
                <section id="introduction">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">1. Introduction and Commitment</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>
                      Shanta Sriram Constructions Pvt. Ltd. (&quot;Shanta Sriram,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy and personal data of all individuals who interact with our website, sales offices, and digital platforms. This Privacy Policy describes how we collect, use, store, and protect your personal information.
                    </p>
                    <p>
                      This policy is drafted in compliance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023 (DPDP Act).
                    </p>
                    <div className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-5 mt-2">
                      <p className="font-sans text-xs text-[#6B6B6B] mb-1">Registered Office</p>
                      <p className="font-sans text-sm text-[#1A1A2E]">
                        Shanta Sriram Constructions Pvt. Ltd.<br />
                        1802 &amp; 1803, 18th Floor, Tower-1, Shalom Skycity, Gachibowli, Hyderabad &ndash; 500032<br />
                        Email: sales@shantasriram.com &nbsp;|&nbsp; Phone: 040 45656500
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Scope */}
                <section id="scope">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">2. Scope</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>
                      This Privacy Policy applies to all personal data collected through:
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                      <li>The website shantasriram.com and any associated subdomains or microsites</li>
                      <li>WhatsApp communications initiated by users through our WhatsApp Business number</li>
                      <li>Email correspondence with our sales and support teams</li>
                      <li>Third-party platforms where Shanta Sriram operates, including social media pages, advertising platforms, and listing portals</li>
                      <li>Physical interactions at sales offices, site visits, and events where digital data is collected</li>
                    </ul>
                  </div>
                </section>

                {/* 3. Data We Collect */}
                <section id="data-we-collect">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">3. Data We Collect</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-6">
                    <div>
                      <h3 className="font-serif text-[#1A1A2E] text-lg font-medium mb-3">3.1 Personal Data</h3>
                      <ul className="list-disc pl-5 flex flex-col gap-2">
                        <li>Full name</li>
                        <li>Phone number (mobile and landline)</li>
                        <li>Email address</li>
                        <li>Project interest, budget range, and preferred unit type</li>
                        <li>Site visit booking details including preferred date and time</li>
                        <li>Communication records including WhatsApp messages, email correspondence, and phone call logs</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-serif text-[#1A1A2E] text-lg font-medium mb-3">3.2 Technical Data</h3>
                      <ul className="list-disc pl-5 flex flex-col gap-2">
                        <li>IP address</li>
                        <li>Browser type and version</li>
                        <li>Device type and operating system</li>
                        <li>Pages visited, time spent on each page, and navigation patterns</li>
                        <li>Referral source (search engine, social media, direct link)</li>
                        <li>Cookie data and session identifiers</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-serif text-[#1A1A2E] text-lg font-medium mb-3">3.3 Voluntarily Provided Data</h3>
                      <ul className="list-disc pl-5 flex flex-col gap-2">
                        <li>Form submissions through enquiry forms, contact forms, and exit popup forms</li>
                        <li>Document download requests including brochures and floor plans</li>
                        <li>Feedback and survey responses</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 4. Purpose */}
                <section id="purpose">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">4. Purpose of Data Collection</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p className="mb-4">We collect and process your personal data for the following purposes:</p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                      <li>Responding to property enquiries and providing requested information</li>
                      <li>Scheduling site visits and managing follow-up communications</li>
                      <li>Sending project updates, price revisions, new launch announcements, and promotional materials</li>
                      <li>Legal compliance including RERA documentation and statutory reporting</li>
                      <li>Improving website functionality, user experience, and content relevance</li>
                      <li>Internal analytics, sales reporting, and business intelligence</li>
                      <li>Fraud prevention and security monitoring</li>
                    </ul>
                  </div>
                </section>

                {/* 5. Legal Basis */}
                <section id="legal-basis">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">5. Legal Basis for Processing (DPDP Act 2023)</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>We process your personal data under the following legal bases as defined by the Digital Personal Data Protection Act, 2023:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { basis: 'Consent', desc: 'Obtained at the point of form submission. You may withdraw consent at any time by contacting us.' },
                        { basis: 'Legitimate Interest', desc: 'Sales follow-up communications for enquiries you have actively expressed interest in.' },
                        { basis: 'Legal Obligation', desc: 'Compliance with RERA, taxation, and other statutory requirements.' },
                        { basis: 'Contractual Necessity', desc: 'Processing required for registered buyers under the terms of the Agreement for Sale.' },
                      ].map((item) => (
                        <div key={item.basis} className="bg-[#F4F7FC] border border-[#E8ECF0] rounded-md p-4">
                          <p className="font-sans text-sm font-medium text-[#1A1A2E] mb-1">{item.basis}</p>
                          <p className="font-sans text-xs text-[#4A4A5A] leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 6. Data Sharing */}
                <section id="data-sharing">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">6. Data Sharing</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>
                      <strong className="text-[#1A1A2E]">We do not sell your personal data to any third party.</strong> Your data may be shared with the following categories of recipients, solely for the purposes described in this policy:
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                      <li><strong className="text-[#1A1A2E]">Internal sales and CRM teams:</strong> for managing your enquiry and providing relevant property information</li>
                      <li><strong className="text-[#1A1A2E]">Authorised banking and home loan partners</strong> (including HDFC, SBI, and Axis Bank): only with your explicit consent, for the purpose of facilitating home loan processing</li>
                      <li><strong className="text-[#1A1A2E]">Legal and statutory authorities:</strong> as required by law, including RERA, taxation authorities, and law enforcement agencies</li>
                      <li><strong className="text-[#1A1A2E]">Technology service providers</strong> (including Supabase, Vercel, and Resend): under data processing agreements, for hosting, analytics, and communication services</li>
                    </ul>
                  </div>
                </section>

                {/* 7. Data Retention */}
                <section id="data-retention">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">7. Data Retention</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <div className="bg-white border border-[#E8ECF0] rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#E8ECF0] bg-[#F8F4EF]">
                            <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-5 py-3">Data Category</th>
                            <th className="text-left font-sans text-[10px] uppercase tracking-[0.12em] text-[#6B6B6B] px-5 py-3">Retention Period</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { cat: 'Enquiry data', period: '3 years from last interaction' },
                            { cat: 'Registered buyer data', period: '10 years (statutory requirement)' },
                            { cat: 'Marketing communication data', period: 'Until you opt out' },
                            { cat: 'Technical and log data', period: '90 days' },
                          ].map((row, i) => (
                            <tr key={row.cat} className={`border-b border-[#E8ECF0] last:border-0 ${i % 2 === 1 ? 'bg-[#F8F4EF]/40' : ''}`}>
                              <td className="font-sans text-sm text-[#1A1A2E] font-medium px-5 py-3">{row.cat}</td>
                              <td className="font-sans text-sm text-[#4A4A5A] px-5 py-3">{row.period}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* 8. Your Rights */}
                <section id="your-rights">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">8. Your Rights Under the DPDP Act 2023</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>As a data principal under the Digital Personal Data Protection Act, 2023, you have the following rights:</p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                      <li><strong className="text-[#1A1A2E]">Right to Access:</strong> You may request a summary of the personal data we hold about you and how it is being processed.</li>
                      <li><strong className="text-[#1A1A2E]">Right to Correction:</strong> You may request correction of any inaccurate or incomplete personal data.</li>
                      <li><strong className="text-[#1A1A2E]">Right to Erasure:</strong> You may request deletion of your personal data, subject to our legal obligations to retain certain records.</li>
                      <li><strong className="text-[#1A1A2E]">Right to Grievance Redressal:</strong> You may raise a grievance regarding the processing of your data with our Grievance Officer.</li>
                      <li><strong className="text-[#1A1A2E]">Right to Nominate:</strong> You may nominate a representative to exercise your rights on your behalf.</li>
                    </ul>
                    <div className="bg-[#F4F7FC] border border-[#E8ECF0] rounded-md p-5">
                      <p className="font-sans text-sm font-medium text-[#1A1A2E] mb-2">How to Exercise Your Rights</p>
                      <p className="font-sans text-sm text-[#4A4A5A]">
                        Send an email to <strong>sales@shantasriram.com</strong> with the subject line &quot;Data Request.&quot; Include your full name, registered phone number, and the specific right you wish to exercise. We will respond within 30 days of receipt.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 9. Cookies */}
                <section id="cookies">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">9. Cookies Policy</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>Our website uses cookies and similar tracking technologies to improve your browsing experience. The types of cookies we use are:</p>
                    <div className="flex flex-col gap-3">
                      {[
                        { type: 'Essential Cookies', desc: 'Required for session management, security, and basic website functionality. These cannot be disabled.' },
                        { type: 'Analytics Cookies', desc: 'Google Analytics (with IP anonymisation enabled) to understand website traffic patterns, page performance, and user behaviour in aggregate.' },
                        { type: 'Marketing Cookies', desc: 'Meta Pixel for advertisement retargeting on Facebook and Instagram. These cookies track conversions from ad campaigns.' },
                      ].map((cookie) => (
                        <div key={cookie.type} className="flex items-start gap-3 py-3 border-b border-[#E8ECF0] last:border-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] flex-shrink-0 mt-2" />
                          <div>
                            <p className="font-sans text-sm font-medium text-[#1A1A2E]">{cookie.type}</p>
                            <p className="font-sans text-xs text-[#4A4A5A] mt-0.5">{cookie.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p>
                      You can manage cookie preferences through your browser settings. Most browsers allow you to block or delete cookies. Please note that disabling essential cookies may affect website functionality. We do not use cookies to identify individuals without consent.
                    </p>
                  </div>
                </section>

                {/* 10. WhatsApp */}
                <section id="whatsapp">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">10. WhatsApp and Communication Channels</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>
                      Data shared via WhatsApp is subject to WhatsApp&apos;s own privacy policy and terms of service. We use WhatsApp Business solely for responding to enquiries initiated by you.
                    </p>
                    <p>
                      We do not send unsolicited WhatsApp messages. All WhatsApp communications are in response to user-initiated contact through our website, phone, or sales office interactions.
                    </p>
                  </div>
                </section>

                {/* 11. Third-Party Links */}
                <section id="third-party">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">11. Third-Party Links</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      Our website contains links to third-party websites including RERA Telangana (rera.telangana.gov.in), banking partners, and project-related microsites. These links are provided for your convenience. Shanta Sriram Constructions is not responsible for the privacy practices, content, or data handling of any third-party website. We encourage you to review the privacy policies of any third-party site you visit.
                    </p>
                  </div>
                </section>

                {/* 12. Children */}
                <section id="children">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">12. Children&apos;s Privacy</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      Our services are directed at adults and are not intended for persons under the age of 18. We do not knowingly collect personal data from minors. If we become aware that we have inadvertently collected data from a person under 18, we will take immediate steps to delete such data.
                    </p>
                  </div>
                </section>

                {/* 13. Security */}
                <section id="security">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">13. Security</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>We implement appropriate technical and organisational measures to protect your personal data, including:</p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                      <li>SSL/TLS encryption on all data transmission between your browser and our servers</li>
                      <li>Access controls and role-based permissions restricting data access to authorised personnel only</li>
                      <li>Regular security audits and vulnerability assessments</li>
                      <li>Incident response protocol for prompt identification, containment, and notification of data breaches</li>
                    </ul>
                    <p>
                      While we take all reasonable measures to protect your data, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security.
                    </p>
                  </div>
                </section>

                {/* 14. Grievance Officer */}
                <section id="grievance">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">14. Grievance Officer</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p className="mb-4">
                      In accordance with the Information Technology Act, 2000 and the DPDP Act, 2023, the details of our Grievance Officer are as follows:
                    </p>
                    <div className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-5">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <span className="font-sans text-xs text-[#6B6B6B]">Name</span>
                          <span className="font-sans text-sm text-[#1A1A2E] font-medium text-right">[Grievance Officer Name]</span>
                        </div>
                        <div className="flex justify-between items-start border-t border-[#E8ECF0] pt-2">
                          <span className="font-sans text-xs text-[#6B6B6B]">Designation</span>
                          <span className="font-sans text-sm text-[#1A1A2E] text-right">Compliance Officer</span>
                        </div>
                        <div className="flex justify-between items-start border-t border-[#E8ECF0] pt-2">
                          <span className="font-sans text-xs text-[#6B6B6B]">Email</span>
                          <span className="font-sans text-sm text-[#1A1A2E] text-right">sales@shantasriram.com</span>
                        </div>
                        <div className="flex justify-between items-start border-t border-[#E8ECF0] pt-2">
                          <span className="font-sans text-xs text-[#6B6B6B]">Phone</span>
                          <span className="font-sans text-sm text-[#1A1A2E] text-right">040 45656500</span>
                        </div>
                        <div className="flex justify-between items-start border-t border-[#E8ECF0] pt-2">
                          <span className="font-sans text-xs text-[#6B6B6B]">Address</span>
                          <span className="font-sans text-sm text-[#1A1A2E] text-right max-w-[280px]">1802 &amp; 1803, 18th Floor, Tower-1, Shalom Skycity, Gachibowli, Hyderabad &ndash; 500032</span>
                        </div>
                        <div className="flex justify-between items-start border-t border-[#E8ECF0] pt-2">
                          <span className="font-sans text-xs text-[#6B6B6B]">Response Time</span>
                          <span className="font-sans text-sm text-[#1A1A2E] text-right">Within 30 days of receipt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 15. Updates */}
                <section id="updates">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">15. Updates to This Policy</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or business operations. Material changes will be communicated via email to registered users or through a prominent banner on our website. Your continued use of our website and services after any changes constitutes your acceptance of the updated policy.
                    </p>
                  </div>
                </section>

                {/* 16. Governing Law */}
                <section id="governing-law">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">16. Governing Law</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      This Privacy Policy is governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with this policy shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
                    </p>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to top */}
      <div className="bg-[#F8F4EF] py-6 border-t border-[#E8ECF0] print:hidden">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <p className="font-sans text-xs text-[#6B6B6B]">
            Shanta Sriram Constructions Pvt. Ltd. &ndash; Privacy Policy &ndash; April 2026
          </p>
          <a href="#" className="font-sans text-sm font-medium text-[#CD0E12] hover:underline">
            Back to Top
          </a>
        </div>
      </div>

      <Footer />
    </main>
  )
}
