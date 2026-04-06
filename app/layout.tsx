import type { Metadata } from 'next'
import { Cormorant, Playfair_Display, DM_Sans, Tenor_Sans } from 'next/font/google'
import './globals.css'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

const cormorant = Cormorant({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-cormorant', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-playfair', display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-dm-sans', display: 'swap' })
const tenorSans = Tenor_Sans({ subsets: ['latin'], weight: ['400'], variable: '--font-tenor', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Shanta Sriram Constructions | Where Trust Is A Tradition', template: '%s | Shanta Sriram Constructions' },
  description: 'Premium residential apartments in Hyderabad. The Bodhivriksha at Appa Junction and The Kalpavriksha at Bahadurpally. 31 years of trust. 8,000+ homes delivered.',
  keywords: ['Shanta Sriram', 'apartments Hyderabad', 'Bodhivriksha', 'Kalpavriksha', 'flats Hyderabad', 'RERA registered', 'Bahadurpally apartments', 'Appa Junction flats'],
  authors: [{ name: 'Shanta Sriram Constructions Pvt. Ltd.' }],
  creator: 'Shanta Sriram Constructions Pvt. Ltd.',
  metadataBase: new URL('https://shanta-sriram-web.vercel.app'),
  openGraph: {
    type: 'website', locale: 'en_IN', url: 'https://shanta-sriram-web.vercel.app', siteName: 'Shanta Sriram Constructions',
    title: 'Shanta Sriram Constructions | Where Trust Is A Tradition',
    description: 'Premium residential apartments in Hyderabad. 31 years of legacy. 8,000+ homes delivered. RERA registered projects.',
    images: [{ url: 'https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/public/Images/bodhivriksha-render.jpg', width: 1200, height: 630, alt: 'Shanta Sriram Constructions' }],
  },
  twitter: { card: 'summary_large_image', title: 'Shanta Sriram Constructions | Where Trust Is A Tradition', description: 'Premium residential apartments in Hyderabad. RERA registered. 31 years legacy.', images: ['https://weargjpimolrgzgmzyyd.supabase.co/storage/v1/object/public/Images/bodhivriksha-render.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable} ${tenorSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-white text-[#4A4A5A]">
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  )
}
