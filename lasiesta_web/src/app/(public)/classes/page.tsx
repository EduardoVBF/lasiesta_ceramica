"use client";
import { getActivePlans, Plan } from "../../../services/plans.service";
import HeaderWithBanner from "@/components/layout/headerWithBanner";
import BackgroundImage from "@/components/layout/backgroundImage";
import PlansCard from "@/components/cards/plansCard";
import React, { useState, useEffect } from "react";
import Footer from "@/components/layout/footer";

export default function Classes() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const data = await getActivePlans();
        setPlans(data as Plan[]);
      } catch (error) {
        console.error("Erro ao buscar planos:", error);
      }
    }

    fetchPlans();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-bege-claro overflow-x-hidden">
      <HeaderWithBanner
        src="/image/aula2pb.jpg"
        alt="Aulas de Cerâmica"
        title="Aulas de Cerâmica"
        description="Nossas aulas de cerâmica são um convite para mergulhar no mundo do barro, explorar a criatividade e encontrar relaxamento na arte manual. Seja para iniciantes ou para quem já tem experiência, cada encontro é um momento único de criação e descoberta."
        textColor="text-white"
      />

      {/* Planos de assinatura */}
      <section className="relative w-full flex flex-col gap-10 pb-20 pt-5">
        <BackgroundImage
          src="/image/organic3.jpg"
          alt="Textura de fundo do ateliê"
          opacity={20}
        />

        {plans.map((plan, index) => (
          <PlansCard key={plan.id} plan={plan} reverse={index % 2 === 0} />
        ))}
      </section>

      <Footer />
    </main>
  );
}
