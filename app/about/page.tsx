import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFAB from '@/components/ui/WhatsAppFAB';
import SectionLabel from '@/components/ui/SectionLabel';
import { Users, Award, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '8,000+' },
    { icon: Award, label: 'Awards Won', value: '15+' },
    { icon: TrendingUp, label: 'Projects Completed', value: '80+' },
  ];

  const values = [
    {
      title: 'Quality',
      description: 'We never compromise on quality. Every project is built with meticulous attention to detail and the finest materials.',
    },
    {
      title: 'Integrity',
      description: 'Our relationships with customers are built on transparency, honesty, and delivering on our promises.',
    },
    {
      title: 'Innovation',
      description: 'We embrace modern technologies and sustainable practices to create homes of the future.',
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Shanta Sriram</h1>
            <p className="text-lg text-muted-foreground">
              Building dreams, creating legacy. Shanta Sriram Constructions has been a trusted name in real estate for over three decades.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-12 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel label="OUR STORY" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 mt-4">
                Three Decades of Excellence
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 1995, Shanta Sriram Constructions has grown from a small local builder to one of Hyderabad&apos;s most trusted real estate developers. Our commitment to quality, integrity, and innovation has set us apart.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe in creating more than just buildings. We create communities, foster dreams, and build futures for thousands of families.
              </p>
              <Link href="/projects">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Explore Our Projects
                </button>
              </Link>
            </div>

            <div className="h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary/30">30+</div>
                <p className="text-muted-foreground mt-4">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-card border border-border rounded-lg p-8 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <SectionLabel label="OUR VALUES" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card border border-border rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Invest in Your Future?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of satisfied customers who have invested in Shanta Sriram properties.
            </p>
            <Link href="/projects">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                View Our Projects
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </main>
    </>
  );
}
