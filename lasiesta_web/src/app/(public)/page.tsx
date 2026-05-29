import CollectionsSection from "@/components/home/collections/CollectionsSection";
import ExperiencesSection from "@/components/home/experiences/ExperiencesSection";
import AtelierSection from "@/components/home/atelier/AtelierSection";
import QuoteSection from "@/components/home/quote/QuoteSection";
import HomeHero from "@/components/home/hero/HomeHero";
import Footer from "@/components/layout/footer";

export default function HomePage() {
  return (
    <main>
      <HomeHero />

      <CollectionsSection />

      <ExperiencesSection />

      <AtelierSection />

      <QuoteSection />

      <Footer />
    </main>
  );
}
