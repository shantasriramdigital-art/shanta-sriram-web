import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/ui/WhatsAppFAB'
import ExitIntentPopup from '@/components/ui/ExitIntentPopup'
import StickyMobileCTA from '@/components/ui/StickyMobileCTA'
import HeroCarousel from '@/components/sections/HeroCarousel'
import TrustBar from '@/components/sections/TrustBar'
import FeaturedProject from '@/components/sections/FeaturedProject'
import AboutStrip from '@/components/sections/AboutStrip'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import WhyShantaSriram from '@/components/sections/WhyShantaSriram'
import StatsCounter from '@/components/sections/StatsCounter'
import EMICalculator from '@/components/sections/EMICalculator'
import Testimonials from '@/components/sections/Testimonials'
import ContactStrip from '@/components/sections/ContactStrip'
import { PageWrapper } from '@/components/ui/PageWrapper'

export default function HomePage() {
  return (
    <PageWrapper>
      <main className="min-h-screen">
        <Navbar />
        <HeroCarousel />
        <TrustBar />
        <FeaturedProject />
        <AboutStrip />
        <ProjectsGrid />
        <WhyShantaSriram />
        <StatsCounter />
        <EMICalculator />
        <Testimonials />
        <ContactStrip />
        <Footer />
        <WhatsAppFAB />
        <ExitIntentPopup />
        <StickyMobileCTA />
      </main>
    </PageWrapper>
  )
}
