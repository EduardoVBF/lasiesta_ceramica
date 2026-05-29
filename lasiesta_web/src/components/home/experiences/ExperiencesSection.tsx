"use client";
import SectionContainer from "../shared/SectionContainer";
import SectionHeader from "../shared/SectionHeader";
import ExperiencesGrid from "./ExperiencesGrid";
import GlowOrb from "../shared/GlowOrb";

export default function ExperiencesSection() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#b08968] text-white">
      <GlowOrb className="top-[-120px] left-[-120px] w-[350px] h-[350px] bg-white/10" />

      <GlowOrb className="bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-white/10" />

      <SectionContainer>
        <SectionHeader
          eyebrow="Experiências"
          title="Cursos e vivências."
          description="Mais do que aprender uma técnica, uma oportunidade de desacelerar, criar com as mãos e viver o processo."
          light
        />

        <ExperiencesGrid />
      </SectionContainer>
    </section>
  );
}
