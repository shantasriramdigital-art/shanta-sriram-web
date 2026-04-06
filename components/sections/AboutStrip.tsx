'use client'

const FOUNDERS = [
  {
    name: 'M. Narsaiah',
    title: 'Chairman and Managing Director',
    photo: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Founder%20images/Mr.Narsi.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0ZvdW5kZXIgaW1hZ2VzL01yLk5hcnNpLmpwZWciLCJpYXQiOjE3NzUzMzQwNTcsImV4cCI6ODgxNzUzMzQwNTd9.06ZID2cft8-AL441l6d4M8iJxBW-QUIUlGoADkvUCWo',
    quote: "We don't build homes. We build wealth platforms. Every brick we lay is a promise of permanence.",
    credential: 'Civil Engineer, JNTU Hyderabad',
  },
  {
    name: 'M. Lingaiah',
    title: 'Executive Director',
    photo: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/sign/Kalpavriksha%20brouchers/Founder%20images/Mt.Lingaiah.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYmI2ZGFmMi04OGE0LTRhNjAtYWFmMi04Y2IzZjg5ZGQ4ZmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJLYWxwYXZyaWtzaGEgYnJvdWNoZXJzL0ZvdW5kZXIgaW1hZ2VzL010LkxpbmdhaWFoLmpwZWciLCJpYXQiOjE3NzUzMzQwNzgsImV4cCI6ODY1Nzc1MzM0MDc4fQ.yNS7lMCUWExPrwGy_iRD4XK9NQrhhqn_BRErJ6HIUFs',
    quote: "Our philosophy: acquire land in tomorrow's growth corridors, develop with uncompromising quality, deliver without exception.",
    credential: 'Operations and Compliance',
  },
]

export default function AboutStrip() {
  return (
    <section style={{ backgroundColor: '#1A1A2E', padding: '100px 0', width: '100%' }}>
      <div
        className="founders-grid"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}
      >
        {/* LEFT */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ display: 'block', height: '1px', width: '32px', backgroundColor: '#C9A96E', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-tenor, serif)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E' }}>Our Founders</span>
            <span style={{ display: 'block', height: '1px', width: '32px', backgroundColor: '#C9A96E', flexShrink: 0 }} />
          </div>

          <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 400, color: '#ffffff', lineHeight: 1.15, margin: '0 0 24px 0' }}>
            Three Decades of Trust.<br />Built Person by Person.
          </h2>

          <div style={{ width: '48px', height: '2px', backgroundColor: '#C9A96E', marginBottom: '24px' }} />

          <p style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: '0 0 40px 0' }}>
            Founded in 1995 by M. Narsaiah and M. Lingaiah, Shanta Sriram Constructions has delivered 8,000+ homes across Hyderabad. Our philosophy has never changed: acquire land in tomorrow&apos;s corridors, build with uncompromising quality, deliver on every promise.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '40px' }}>
            {[
              { number: '8,000+', label: 'Homes Delivered' },
              { number: '31', label: 'Years' },
              { number: 'Zero', label: 'Defaults' },
            ].map((stat, i) => (
              <div key={i} style={{ flex: 1, paddingRight: i < 2 ? '24px' : '0', marginRight: i < 2 ? '24px' : '0', borderRight: i < 2 ? '1px solid rgba(201,169,110,0.3)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, color: '#ffffff', lineHeight: 1, marginBottom: '6px' }}>{stat.number}</div>
                <div style={{ fontFamily: 'var(--font-tenor, sans-serif)', fontSize: '10px', color: '#C9A96E', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <a href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '13px', color: '#C9A96E', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', border: '1px solid rgba(201,169,110,0.4)', padding: '12px 24px', transition: 'all 0.2s ease' }}>
            Read Their Story
            <span style={{ fontSize: '16px' }}>&rarr;</span>
          </a>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {FOUNDERS.map((founder, i) => (
            <div key={i} className="founder-card" style={{ display: 'flex', flexDirection: 'row', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: '2px', overflow: 'hidden', minHeight: '200px' }}>
              {/* Photo */}
              <div style={{ width: '160px', flexShrink: 0, position: 'relative', overflow: 'hidden', backgroundColor: '#0f0f1e' }}>
                <img
                  src={founder.photo}
                  alt={founder.name}
                  width={160}
                  height={200}
                  loading="lazy"
                  data-logo=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block', filter: 'contrast(1.05) brightness(1.02) saturate(1.05)' }}
                />
                <div style={{ position: 'absolute', top: 0, right: 0, width: '3px', height: '100%', backgroundColor: '#CD0E12' }} />
              </div>

              {/* Text */}
              <div style={{ flex: 1, padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
                <div style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '20px', fontWeight: 500, color: '#ffffff', lineHeight: 1.2 }}>{founder.name}</div>
                <div style={{ fontFamily: 'var(--font-tenor, serif)', fontSize: '10px', color: '#C9A96E', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{founder.title}</div>
                <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(201,169,110,0.4)' }} />
                <div>
                  <span style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '28px', color: '#CD0E12', lineHeight: 0.5, display: 'block', marginBottom: '8px' }}>&ldquo;</span>
                  <p style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '14px', fontStyle: 'italic', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>{founder.quote}</p>
                </div>
                <div style={{ display: 'inline-block', alignSelf: 'flex-start', background: 'rgba(205,14,18,0.12)', border: '1px solid rgba(205,14,18,0.25)', padding: '3px 12px', borderRadius: '100px', fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: '10px', color: '#CD0E12', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{founder.credential}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .founders-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 480px) {
          .founder-card {
            flex-direction: column !important;
          }
          .founder-card > div:first-child {
            width: 100% !important;
            height: 200px !important;
          }
        }
      `}</style>
    </section>
  )
}
