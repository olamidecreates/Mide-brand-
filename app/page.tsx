import { Navbar } from "@/components/sections/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedCollection } from "@/components/sections/featured-collection";
import { BrandStory } from "@/components/sections/brand-story";
import { BestSellers } from "@/components/sections/best-sellers";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";
import { Lookbook } from "@/components/sections/lookbook";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturedCollection />
      <BrandStory />
      <BestSellers />
      <Testimonials />
      <Newsletter />
      <Lookbook />
      <Footer />
    </main>
  );
}
