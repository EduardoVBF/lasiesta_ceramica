"use client";
import SectionContainer from "../shared/SectionContainer";
import SectionHeader from "../shared/SectionHeader";
import CollectionsGrid from "./CollectionsGrid";
import GlowOrb from "../shared/GlowOrb";

export default function CollectionsSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#efe4d8]">
      <GlowOrb className="top-0 right-0 w-[300px] h-[300px] bg-[#d6c8b9]/30" />

      <SectionContainer>
        <SectionHeader
          eyebrow="Coleções"
          title="Peças feitas para durar."
          description="Objetos que carregam textura, tempo e intenção. Cerâmicas criadas para transformar pequenos momentos cotidianos."
        />

        <CollectionsGrid />
      </SectionContainer>
    </section>
  );
}
