import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryGrid } from "@/components/category-grid"
import { AIAssistant } from "@/components/ai-assistant"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <AIAssistant />
    </main>
  )
}
