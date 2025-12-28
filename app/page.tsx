import Navbar from "@/components/landing/Navbar"
import HeroSection from "@/components/landing/HeroSection"
import InfoSection from "@/components/landing/InfoSection"
import DownloadSection from "@/components/landing/DownloadSection"
import StatsSection from "@/components/landing/StatsSection"
import HelpdeskSection from "@/components/landing/HelpdeskSection"
import FooterComponent from "@/components/landing/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <InfoSection />
      <DownloadSection />
      <StatsSection />
      <HelpdeskSection />
      <FooterComponent />
    </main>
  )
}
