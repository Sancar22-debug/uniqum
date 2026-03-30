import { Suspense } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/sections/hero-section"
import CommunitySection from "@/components/sections/community-section"
import ProblemsSection from "@/components/sections/problems-section"
import ResultsSection from "@/components/sections/results-section"
import DirectionsSection from "@/components/sections/directions-section"
import HowItWorksSection from "@/components/sections/how-it-works-section"
import TrainersSection from "@/components/sections/trainers-section"
import ReviewsSection from "@/components/sections/reviews-section"
import PricesSection from "@/components/sections/prices-section"
import SafetySection from "@/components/sections/safety-section"
import FAQSection from "@/components/sections/faq-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />
      <HeroSection />
      <CommunitySection />
      <ProblemsSection />
      <ResultsSection />
      <DirectionsSection />
      <HowItWorksSection />
      <TrainersSection />
      <ReviewsSection />
      <PricesSection />
      <SafetySection />
      <FAQSection />
      <Suspense fallback={<div className="min-h-[600px] w-full" />}>
        <ContactSection />
      </Suspense>
      <Footer />
    </main>
  )
}
