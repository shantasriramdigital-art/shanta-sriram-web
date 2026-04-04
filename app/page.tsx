import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/ui/WhatsAppFAB'
import ExitIntentPopup from '@/components/ui/ExitIntentPopup'
import HeroCarousel from '@/components/sections/HeroCarousel'
import SearchBar from '@/components/sections/SearchBar'
import AboutStrip from '@/components/sections/AboutStrip'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import StatsCounter from '@/components/sections/StatsCounter'
import MarketsPreview from '@/components/sections/MarketsPreview'
import EMICalculator from '@/components/sections/EMICalculator'
import TrustStrip from '@/components/sections/TrustStrip'
import InsightsPreview from '@/components/sections/InsightsPreview'
import Testimonials from '@/components/sections/Testimonials'
import ContactStrip from '@/components/sections/ContactStrip'

// Rebuild cache
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroCarousel />
      <SearchBar />
      <AboutStrip />
      <ProjectsGrid />
      <StatsCounter />
      <MarketsPreview />
      <EMICalculator />
      <TrustStrip />
      <InsightsPreview />
      <Testimonials />
      <ContactStrip />
      <Footer />
      <WhatsAppFAB />
      <ExitIntentPopup />
    </main>
  )
}
