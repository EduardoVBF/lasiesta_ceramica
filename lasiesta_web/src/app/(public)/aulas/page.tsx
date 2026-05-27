"use client";
import PlansExtendedCardSkeleton from "@/components/skeletons/plansExtendedCardSkeleton";
import { useActivePlans } from "../../../hooks/queries/useActivePlans";
import HeaderWithBanner from "@/components/layout/headerWithBanner";
import BackgroundImage from "@/components/layout/backgroundImage";
import PlansCard from "@/components/cards/plansCard";
import Footer from "@/components/layout/footer";

export default function Classes() {
  const plansQuery = useActivePlans();

  const plans = plansQuery.data ?? [];
  const loading = plansQuery.isLoading;
  const plansError = plansQuery.isError;

  return (
    <main className="flex min-h-screen flex-col items-center bg-bege-claro overflow-x-hidden">
      <HeaderWithBanner textColor="text-white" page="CLASSES" />

      {/* Planos de assinatura */}
      <section className="relative w-full flex flex-col gap-8 pb-20 pt-5">
        <BackgroundImage
          src="/image/organic3.jpg"
          alt="Textura de fundo do ateliê"
          opacity={20}
        />

        {plansError ? (
          <p className="text-red-500 text-center">
            Não foi possível carregar os planos e aulas.
          </p>
        ) : loading ? (
          <PlansExtendedCardSkeleton />
        ) : (
          plans.map((plan, index) => (
            <PlansCard key={plan.id} plan={plan} reverse={index % 2 === 0} />
          ))
        )}
      </section>

      <Footer />
    </main>
  );
}
