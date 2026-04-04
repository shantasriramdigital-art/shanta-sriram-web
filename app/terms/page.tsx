import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Terms of Use | Shanta Sriram Constructions',
  description: 'Terms of Use governing access and use of shantasriram.com and all associated digital platforms.',
}

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'about', title: '2. About the Company' },
  { id: 'website-use', title: '3. Website Use' },
  { id: 'property-disclaimer', title: '4. Property Information Disclaimer' },
  { id: 'rera', title: '5. RERA Compliance Statement' },
  { id: 'emi-disclaimer', title: '6. EMI Calculator Disclaimer' },
  { id: 'brochure', title: '7. Brochure and Document Downloads' },
  { id: 'ip', title: '8. Intellectual Property' },
  { id: 'third-party', title: '9. Third-Party Content and Links' },
  { id: 'liability', title: '10. Limitation of Liability' },
  { id: 'indemnification', title: '11. Indemnification' },
  { id: 'privacy', title: '12. Privacy' },
  { id: 'amendments', title: '13. Amendments' },
  { id: 'severability', title: '14. Severability' },
  { id: 'entire-agreement', title: '15. Entire Agreement' },
  { id: 'governing-law', title: '16. Governing Law and Jurisdiction' },
  { id: 'contact', title: '17. Contact' },
]

export default function TermsPage() {
  return (
    <main>
      <Navbar />

      {/* Cross-link banner */}
      <div className="bg-[#1A1A2E] py-3">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-center gap-2">
          <span className="font-sans text-sm text-white/60">Also read our</span>
          <Link href="/privacy" className="font-sans text-sm font-medium text-[#C9A96E] hover:underline">
            Privacy Policy
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
              <li className="text-[#4A4A5A]">Terms of Use</li>
            </ol>
          </nav>
          <h1 className="text-h1 font-serif text-[#1A1A2E] mb-4">Terms of Use</h1>
          <p className="font-sans text-[#4A4A5A] text-base leading-relaxed max-w-2xl mb-4">
            These Terms of Use govern your access to and use of shantasriram.com and all associated digital platforms operated by Shanta Sriram Constructions Pvt. Ltd.
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
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">1. Introduction</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>
                      These Terms of Use (&quot;Terms&quot;) govern your access to and use of shantasriram.com and all associated digital platforms, microsites, and online services operated by Shanta Sriram Constructions Pvt. Ltd. (&quot;Shanta Sriram,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
                    </p>
                    <p>
                      By accessing or using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not use this website.
                    </p>
                  </div>
                </section>

                {/* 2. About the Company */}
                <section id="about">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">2. About the Company</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      Shanta Sriram Constructions Pvt. Ltd. was incorporated in 1995 and is registered under the Companies Act. The company is engaged in the development of residential and commercial real estate projects in Hyderabad, Telangana.
                    </p>
                    <div className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-5 mt-4">
                      <p className="font-sans text-xs text-[#6B6B6B] mb-1">Registered Office</p>
                      <p className="font-sans text-sm text-[#1A1A2E]">
                        Shanta Sriram Constructions Pvt. Ltd.<br />
                        1802 &amp; 1803, 18th Floor, Tower-1, Shalom Skycity, Gachibowli, Hyderabad &ndash; 500032
                      </p>
                    </div>
                  </div>
                </section>

                {/* 3. Website Use */}
                <section id="website-use">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">3. Website Use</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>You agree to use this website only for lawful purposes and in accordance with these Terms. Specifically, you agree not to:</p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                      <li>Use the website for any purpose that is unlawful or prohibited by these Terms</li>
                      <li>Engage in scraping, crawling, or any form of automated data extraction from this website</li>
                      <li>Impersonate any person or entity, or misrepresent your affiliation with any person or entity</li>
                      <li>Upload or transmit any malicious code, viruses, or any other harmful technology</li>
                      <li>Attempt to gain unauthorised access to any portion of the website, servers, or databases</li>
                      <li>Interfere with or disrupt the operation of the website or the servers and networks connected to it</li>
                    </ul>
                    <p>
                      Shanta Sriram reserves the right to restrict, suspend, or terminate access to this website at any time and without prior notice, for any reason, including violation of these Terms.
                    </p>
                  </div>
                </section>

                {/* 4. Property Information Disclaimer */}
                <section id="property-disclaimer">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">4. Property Information Disclaimer</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>
                      All property details, specifications, floor plans, amenity lists, renders, images, and brochures displayed on this website are for indicative purposes only. They constitute marketing material and do not constitute a legal offer, commitment, or contractual obligation.
                    </p>
                    <p>Specifically:</p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                      <li>Prices are subject to change without prior notice and may not include applicable taxes, registration charges, or other statutory levies</li>
                      <li>Floor plans are indicative and may vary from actual construction due to structural, engineering, or regulatory requirements</li>
                      <li>Renders and images are artistic representations and may not accurately depict the final product</li>
                      <li>Amenity lists are subject to statutory approvals and may be modified, reduced, or expanded based on regulatory and engineering requirements</li>
                      <li>Possession timelines are subject to RERA registered dates and may be affected by force majeure events</li>
                      <li>Area measurements are approximate and subject to final approval by the relevant municipal or development authority</li>
                    </ul>
                    <div className="bg-[#CD0E12]/5 border border-[#CD0E12]/20 rounded-md p-5">
                      <p className="font-sans text-sm text-[#1A1A2E] font-medium">
                        The definitive terms of any property transaction are governed solely by the registered Agreement for Sale executed between the buyer and Shanta Sriram Constructions Pvt. Ltd.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 5. RERA Compliance */}
                <section id="rera">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">5. RERA Compliance Statement</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>
                      All ongoing projects of Shanta Sriram Constructions Pvt. Ltd. are registered with the Telangana Real Estate Regulatory Authority (TSRERA) under the Real Estate (Regulation and Development) Act, 2016.
                    </p>
                    <p>Buyers are advised to:</p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                      <li>Verify project registration at rera.telangana.gov.in before making any payment</li>
                      <li>Review the RERA-registered project details, specifications, and timelines</li>
                      <li>Understand that only RERA-registered project details are legally binding</li>
                    </ul>
                    <div className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-5">
                      <p className="font-sans text-xs text-[#6B6B6B] mb-3">RERA Registration Numbers</p>
                      <div className="flex flex-col gap-2">
                        {[
                          { name: 'The Bodhivriksha', rera: 'P02400003070' },
                          { name: 'The Kalpavriksha', rera: 'P02200003098' },
                        ].map((p) => (
                          <div key={p.rera} className="flex justify-between items-center py-2 border-b border-[#E8ECF0] last:border-0">
                            <span className="font-sans text-sm text-[#1A1A2E] font-medium">{p.name}</span>
                            <span className="font-mono text-xs text-[#6B6B6B]">{p.rera}</span>
                          </div>
                        ))}
                      </div>
                      <p className="font-sans text-xs text-[#6B6B6B] mt-3">Additional project registration numbers are displayed on individual project pages.</p>
                    </div>
                  </div>
                </section>

                {/* 6. EMI Calculator */}
                <section id="emi-disclaimer">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">6. EMI Calculator Disclaimer</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>
                      The EMI calculator provided on this website is a financial planning tool only. All results are indicative and based on user-entered assumptions. Actual EMI amounts will vary based on:
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                      <li>Lender-specific interest rates, processing fees, and other charges</li>
                      <li>Your individual credit score and eligibility assessment</li>
                      <li>The loan-to-value ratio as determined by the lending institution</li>
                      <li>Changes in RBI monetary policy and repo rate adjustments</li>
                    </ul>
                    <p>
                      This tool does not constitute financial advice. Users are advised to consult a qualified financial advisor and their preferred lending institution before making investment decisions.
                    </p>
                  </div>
                </section>

                {/* 7. Brochure Downloads */}
                <section id="brochure">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">7. Brochure and Document Downloads</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      Brochures, floor plans, specification sheets, and other documents available for download on this website are marketing materials. They are subject to change without notice. The date of the document may not reflect the current project status, pricing, or specifications. Always verify current information with our sales team before making any decision or commitment.
                    </p>
                  </div>
                </section>

                {/* 8. Intellectual Property */}
                <section id="ip">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">8. Intellectual Property</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>
                      All content on this website, including but not limited to text, images, photographs, logos, trademarks, floor plans, renders, videos, design elements, and source code, is the intellectual property of Shanta Sriram Constructions Pvt. Ltd. or is licensed to it by third parties.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#CD0E12]/5 border border-[#CD0E12]/20 rounded-md p-4">
                        <p className="font-sans text-sm font-medium text-[#1A1A2E] mb-2">Prohibited</p>
                        <ul className="list-disc pl-4 flex flex-col gap-1.5 font-sans text-xs text-[#4A4A5A]">
                          <li>Reproducing or distributing any content without written permission</li>
                          <li>Using our brand name, logo, or project names in any commercial context</li>
                          <li>Creating derivative works from our renders or floor plans</li>
                        </ul>
                      </div>
                      <div className="bg-[#2E7D32]/5 border border-[#2E7D32]/20 rounded-md p-4">
                        <p className="font-sans text-sm font-medium text-[#1A1A2E] mb-2">Permitted</p>
                        <ul className="list-disc pl-4 flex flex-col gap-1.5 font-sans text-xs text-[#4A4A5A]">
                          <li>Sharing website links on social media or personal communications</li>
                          <li>Downloading brochures for personal reference and evaluation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 9. Third-Party Content */}
                <section id="third-party">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">9. Third-Party Content and Links</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      This website contains links to third-party websites and services, including RERA Telangana, banking partners, Google Maps, and social media platforms. These links are provided for your convenience and information. Shanta Sriram Constructions does not endorse, control, or take responsibility for the content, privacy practices, availability, or accuracy of any third-party website or service.
                    </p>
                  </div>
                </section>

                {/* 10. Limitation of Liability */}
                <section id="liability">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">10. Limitation of Liability</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed flex flex-col gap-4">
                    <p>To the maximum extent permitted by applicable law:</p>
                    <ul className="list-disc pl-5 flex flex-col gap-2">
                      <li>Shanta Sriram Constructions is not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or reliance on the content of this website</li>
                      <li>We do not guarantee that the website will be available on an uninterrupted or error-free basis</li>
                      <li>We are not liable for technical failures, data loss, or security breaches that are beyond our reasonable control</li>
                      <li>Our total aggregate liability for any claim arising from or related to the use of this website shall not exceed INR 10,000 (Indian Rupees Ten Thousand)</li>
                    </ul>
                  </div>
                </section>

                {/* 11. Indemnification */}
                <section id="indemnification">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">11. Indemnification</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      You agree to indemnify, defend, and hold harmless Shanta Sriram Constructions Pvt. Ltd., its directors, officers, employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or in connection with your violation of these Terms, misuse of the website, or infringement of any third-party rights.
                    </p>
                  </div>
                </section>

                {/* 12. Privacy */}
                <section id="privacy">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">12. Privacy</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      Your use of this website is also governed by our <Link href="/privacy" className="text-[#CD0E12] font-medium hover:underline">Privacy Policy</Link>, which describes how we collect, use, store, and protect your personal data. The Privacy Policy is incorporated into these Terms by reference.
                    </p>
                  </div>
                </section>

                {/* 13. Amendments */}
                <section id="amendments">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">13. Amendments</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      Shanta Sriram Constructions reserves the right to modify, update, or revise these Terms at any time without prior notice. Material changes will be communicated through a prominent notice on this website. Your continued use of the website after any such changes constitutes your acceptance of the revised Terms. We recommend reviewing this page periodically.
                    </p>
                  </div>
                </section>

                {/* 14. Severability */}
                <section id="severability">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">14. Severability</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                    </p>
                  </div>
                </section>

                {/* 15. Entire Agreement */}
                <section id="entire-agreement">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">15. Entire Agreement</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      These Terms of Use, together with the <Link href="/privacy" className="text-[#CD0E12] font-medium hover:underline">Privacy Policy</Link>, constitute the entire agreement between you and Shanta Sriram Constructions Pvt. Ltd. regarding your use of this website. These Terms supersede all prior agreements, understandings, and communications, whether written or oral, relating to the subject matter herein.
                    </p>
                  </div>
                </section>

                {/* 16. Governing Law */}
                <section id="governing-law">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">16. Governing Law and Jurisdiction</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p>
                      These Terms are governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms or your use of this website shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
                    </p>
                  </div>
                </section>

                {/* 17. Contact */}
                <section id="contact">
                  <h2 className="font-serif text-[#1A1A2E] text-2xl font-medium mb-4">17. Contact</h2>
                  <div className="font-sans text-[#4A4A5A] text-sm leading-relaxed">
                    <p className="mb-4">For any questions, concerns, or communications regarding these Terms of Use, please contact us:</p>
                    <div className="bg-[#F8F4EF] border border-[#E8ECF0] rounded-md p-5">
                      <p className="font-sans text-sm text-[#1A1A2E] font-medium mb-3">Shanta Sriram Constructions Pvt. Ltd.</p>
                      <div className="flex flex-col gap-2 font-sans text-sm text-[#4A4A5A]">
                        <p>1802 &amp; 1803, 18th Floor, Tower-1, Shalom Skycity, Gachibowli, Hyderabad &ndash; 500032</p>
                        <p>Email: sales@shantasriram.com</p>
                        <p>Phone: 040 45656500</p>
                        <p className="text-[#6B6B6B] text-xs">Monday to Saturday, 9:00 AM to 6:00 PM</p>
                      </div>
                    </div>
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
            Shanta Sriram Constructions Pvt. Ltd. &ndash; Terms of Use &ndash; April 2026
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
