import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shanta Sriram Constructions | Where Trust Is A Tradition',
  description:
    'Shanta Sriram Constructions Pvt. Ltd. — 30 years of building enduring urban wealth across Hyderabad. 8,000+ happy homes, 80+ projects delivered. Explore premium residential and commercial properties.',
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
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
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
