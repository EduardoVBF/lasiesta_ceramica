"use client";
import FeaturedPlansGridSkeleton from "@/components/skeletons/featuredPlansGridSkeleton";
import { useActivePlans } from "../../../hooks/queries/useActivePlans";
import ExperienceCardWrapper from "./ExperienceCardWrapper";

export default function ExperiencesGrid() {
  const plansQuery = useActivePlans();

  const featuredPlans = (plansQuery.data ?? []).filter(
    (plan) => plan.isFeatured && plan.isActive,
  );

  if (plansQuery.isError) {
    return (
      <p className="text-red-200 text-center">
        Não foi possível carregar os cursos e experiências.
      </p>
    );
  }

  if (plansQuery.isLoading) {
    return <FeaturedPlansGridSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredPlans.map((plan, index) => (
        <ExperienceCardWrapper key={index} plan={plan} index={index} />
      ))}
    </div>
  );
}
