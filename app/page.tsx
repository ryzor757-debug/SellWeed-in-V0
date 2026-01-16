import { GlobalNav } from "@/components/global-nav"
import { HeroSection } from "@/components/hero-section"
import { BentoGrid } from "@/components/bento-grid"
import { NetworkSection } from "@/components/network/network-section"
import { EconomySection } from "@/components/economy/economy-section"
import { ResilienceSection } from "@/components/resilience/resilience-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <GlobalNav />
      <HeroSection />
      <BentoGrid />
      <NetworkSection />
      <EconomySection />
      <ResilienceSection />
      <Footer />
    </main>
  )
}
