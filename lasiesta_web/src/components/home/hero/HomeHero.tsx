"use client";
import BackgroundImage from "@/components/layout/backgroundImage";
import CarouselComponent from "@/components/layout/carousel";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function HomeHero() {
  return (
    <>
      <BackgroundImage
        src="/image/organic3.jpg"
        alt="Textura de fundo do ateliê"
        opacity={12}
      />

      {/* Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#c8a98d]/30 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-[#b08968]/20 blur-3xl rounded-full" />

      <CarouselComponent />

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-10 items-center">
          <HeroContent />

          <HeroImage />
        </div>

        {/* Fade inferior */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#efe4d8]" />
      </section>
    </>
  );
}
