import type { Metadata } from 'next'
import { Cormorant, Playfair_Display, DM_Sans, Tenor_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const tenorSans = Tenor_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-tenor',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shanta Sriram Constructions | Where Trust Is A Tradition',
  description:
    'Shanta Sriram Constructions Pvt. Ltd. 30 years of building enduring urban wealth across Hyderabad. 8,000+ happy homes, 80+ projects delivered. Explore premium residential and commercial properties.',
  keywords: 'Shanta Sriram, real estate Hyderabad, apartments Hyderabad, villas Hyderabad, TSRERA, property Hyderabad',
  openGraph: {
    title: 'Shanta Sriram Constructions | Where Trust Is A Tradition',
    description: '30 years of building enduring urban wealth across Hyderabad.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable} ${tenorSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-white text-[#4A4A5A]">
        {children}
      </body>
    </html>
  )
}
