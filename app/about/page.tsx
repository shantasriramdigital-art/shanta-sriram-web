import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFAB from '@/components/ui/WhatsAppFAB';
import SectionLabel from '@/components/ui/SectionLabel';
import { Users, Award, TrendingUp } from 'lucide-react';

const FOUNDERS = [
  {
    name: 'M. Narsaiah',
    title: 'Chairman and Managing Director',
    photo: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/render/image/sign/Kalpavriksha%20brouchers/Founder%20images/Mr.Narsi.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0ZvdW5kZXIgaW1hZ2VzL01yLk5hcnNpLmpwZWciLCJpYXQiOjE3NzUzMzQwNTcsImV4cCI6ODgxNzUzMzQwNTd9.06ZID2cft8-AL441l6d4M8iJxBW-QUIUlGoADkvUCWo&width=600&quality=80&format=webp',
    bio: 'Chairman and Managing Director of Shanta Sriram Constructions Pvt. Ltd., Mr. Narsaiah founded the company in 1995 with a singular vision: to build homes that stand the test of time. Under his leadership, the company has delivered 8,000+ homes across Hyderabad across 30 years, maintaining a zero-default record on delivery commitments.',
    quote: "We don't build homes; we build wealth platforms. Every brick we lay is a promise of permanence.",
  },
  {
    name: 'M. Lingaiah',
    title: 'Executive Director',
    photo: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/render/image/sign/Kalpavriksha%20brouchers/Founder%20images/Mt.Lingaiah.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0ZvdW5kZXIgaW1hZ2VzL010LkxpbmdhaWFoLmpwZWciLCJpYXQiOjE3NzUzMzQwNzgsImV4cCI6ODY1Nzc1MzM0MDc4fQ.yNS7lMCUWExPrwGy_iRD4XK9NQrhhqn_BRErJ6HIUFs&width=600&quality=80&format=webp',
    bio: "Executive Director of Shanta Sriram Constructions Pvt. Ltd., Mr. Lingaiah has been instrumental in identifying Hyderabad's emerging growth corridors before they became mainstream. His land acquisition philosophy, anchored in infrastructure-led appreciation, has been the cornerstone of the company's sustained success.",
    quote: "Our philosophy is simple: acquire land in tomorrow's growth corridors, develop with uncompromising quality, deliver without compromise.",
  },
];

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '8,000+' },
    { icon: Award, label: 'Awards Won', value: '15+' },
    { icon: TrendingUp, label: 'Projects Completed', value: '80+' },
  ];

  const values = [
    { title: 'Quality', description: 'We never compromise on quality. Every project is built with meticulous attention to detail and the finest materials.' },
    { title: 'Integrity', description: 'Our relationships with customers are built on transparency, honesty, and delivering on our promises.' },
    { title: 'Innovation', description: 'We embrace modern technologies and sustainable practices to create homes of the future.' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F4EF]">
        {/* Hero */}
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
                <SectionLabel>OUR STORY</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 mt-4">Three Decades of Excellence</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Founded in 1995, Shanta Sriram Constructions has grown from a small local builder to one of Hyderabad&apos;s most trusted real estate developers. Our commitment to quality, integrity, and innovation has set us apart.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We believe in creating more than just buildings. We create communities, foster dreams, and build futures for thousands of families.
                </p>
                <Link href="/#projects-grid">
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

        {/* Founders */}
        <section className="py-16 md:py-24 bg-[#F8F4EF]">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <SectionLabel className="mb-4">LEADERSHIP</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A2E] mb-12">The Founders</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {FOUNDERS.map((founder) => (
                <div
                  key={founder.name}
                  className="bg-white overflow-hidden"
                  style={{ borderRadius: '2px', border: '0.5px solid rgba(0,0,0,0.08)' }}
                >
                  {/* Photo with name overlay */}
                  <div className="h-[240px] md:h-[320px] relative overflow-hidden" style={{ backgroundColor: '#0f0f1e' }}>
                    <img
                      src={founder.photo}
                      alt={founder.name}
                      width={600}
                      height={400}
                      loading="lazy"
                      data-logo=""
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center 15%', filter: 'contrast(1.05) brightness(1.02) saturate(1.05)' }}
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 24px 20px', background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>
                      <p style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '22px', fontWeight: 500, color: 'white', margin: 0 }}>{founder.name}</p>
                      <p style={{ fontFamily: 'var(--font-tenor, serif)', fontSize: '10px', color: '#C9A96E', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px' }}>{founder.title}</p>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', backgroundColor: '#CD0E12' }} />
                  </div>

                  {/* Text */}
                  <div className="p-6">
                    <p className="font-sans text-[#444] text-sm leading-[1.7] mb-5">
                      {founder.bio}
                    </p>
                    <div style={{ borderLeft: '3px solid #CD0E12', paddingLeft: '16px' }}>
                      <span className="font-serif text-[#CD0E12] text-2xl leading-none select-none">&ldquo;</span>
                      <p className="font-sans text-[#666] text-sm italic leading-relaxed -mt-2">
                        {founder.quote}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
                  <div key={stat.label} className="bg-card border border-border rounded-lg p-8 text-center">
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
              <SectionLabel>OUR VALUES</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">What We Stand For</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value) => (
                <div key={value.title} className="bg-card border border-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Invest in Your Future?</h2>
            <p className="text-lg text-muted-foreground mb-8">Join thousands of satisfied customers who have invested in Shanta Sriram properties.</p>
            <Link href="/#projects-grid">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                View Our Projects
              </button>
            </Link>
          </div>
        </section>

        <Footer />
        <WhatsAppFAB />
      </main>
    </>
  );
}
