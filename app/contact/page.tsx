import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFAB from '@/components/ui/WhatsAppFAB';
import SectionLabel from '@/components/ui/SectionLabel';
import LeadForm from '@/components/ui/LeadForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 40 2354 5678',
      href: 'tel:+914023545678',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@shantasriram.com',
      href: 'mailto:info@shantasriram.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'Hyderabad, Telangana',
      href: '#',
    },
  ];

  const faqs = [
    {
      q: 'What is the minimum investment required?',
      a: 'The minimum investment varies by project. Please check individual project details or contact us for specific information.',
    },
    {
      q: 'How long do projects typically take to complete?',
      a: 'Project timelines range from 18 to 36 months depending on the scope and complexity. Refer to individual project pages for specific timelines.',
    },
    {
      q: 'Are there different payment plans available?',
      a: 'Yes, we offer flexible payment plans tailored to investor needs. Contact us to discuss options that work best for you.',
    },
    {
      q: 'What documentation is required for investment?',
      a: 'We require standard KYC documentation and investment agreements. Our team will guide you through the complete process.',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F4EF]">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our projects or services? We&apos;re here to help. Reach out to our team today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.title}>
                  <a href={method.href} className="group cursor-pointer">
                    <div className="bg-card border border-border rounded-lg p-8 text-center h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{method.title}</h3>
                      <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {method.value}
                      </p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-20 bg-muted/30 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="bg-card border border-border rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Send us a Message</h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div>
            <SectionLabel label="SUPPORT" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 mt-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-muted/50 border border-border rounded-lg p-6"
                >
                  <h3 className="text-lg font-bold text-foreground mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </main>
    </>
  );
}
