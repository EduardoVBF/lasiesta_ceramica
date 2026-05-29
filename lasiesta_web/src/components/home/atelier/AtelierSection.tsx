"use client";
import BackgroundImage from "@/components/layout/backgroundImage";
import SectionContainer from "../shared/SectionContainer";
import AtelierGallery from "./AtelierGallery";
import AtelierContent from "./AtelierContent";
import GlowOrb from "../shared/GlowOrb";

export default function AtelierSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#f5eee6]">
      <BackgroundImage
        src="/image/organic1.jpg"
        alt="Textura de fundo do ateliê"
        opacity={10}
      />

      <GlowOrb className="top-0 right-0 w-[300px] h-[300px] bg-[#c8a98d]/20" />

      <SectionContainer className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <AtelierGallery />

          <AtelierContent />
        </div>
      </SectionContainer>
    </section>
  );
}
