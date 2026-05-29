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

  const count = featuredPlans.length;

  if (count === 5) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPlans.slice(0, 3).map((plan, index) => (
            <ExperienceCardWrapper key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-[70%] mx-auto">
          {featuredPlans.slice(3, 5).map((plan, index) => (
            <ExperienceCardWrapper
              key={plan.id}
              plan={plan}
              index={index + 3}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        grid
        gap-8

        ${
          count === 1
            ? "grid-cols-1 md:max-w-lg mx-auto"
            : count === 2
              ? "grid-cols-1 md:grid-cols-2 md:max-w-5xl mx-auto"
              : count === 4
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }
      `}
    >
      {featuredPlans.map((plan, index) => (
        <ExperienceCardWrapper key={plan.id} plan={plan} index={index} />
      ))}
    </div>
  );
}
