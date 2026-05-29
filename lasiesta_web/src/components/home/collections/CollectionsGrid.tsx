"use client";
import FeaturedCategoriesGridSkeleton from "@/components/skeletons/featuredCategoriesGridSkeleton";
import { useActiveCategories } from "../../../hooks/queries/useActiveCategories";
import CollectionCardWrapper from "./CollectionCardWrapper";
import BrownButton from "@/components/ui/brownButtom";
import Link from "next/link";

export default function CollectionsGrid() {
  const categoriesQuery = useActiveCategories();

  const featuredCategories = (categoriesQuery.data ?? []).filter(
    (cat) => cat.isFeatured && cat.isActive,
  );

  if (categoriesQuery.isError) {
    return (
      <p className="text-red-500 text-center">
        Não foi possível carregar as coleções.
      </p>
    );
  }

  if (categoriesQuery.isLoading) {
    return <FeaturedCategoriesGridSkeleton />;
  }

  const count = featuredCategories.length;

  // Layout especial para 5 categorias
  if (count === 5) {
    return (
      <>
        <div className="space-y-8">
          {/* Primeira linha */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.slice(0, 3).map((cat) => (
              <CollectionCardWrapper cat={cat} key={cat.id} />
            ))}
          </div>

          {/* Segunda linha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-[70%] mx-auto">
            {featuredCategories.slice(3, 5).map((cat) => (
              <CollectionCardWrapper cat={cat} key={cat.id} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <Link href="/produtos">
            <BrownButton text="Ver todos os produtos" maxWidth="max-w-fit" />
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`
          grid
          gap-8

          ${
            count === 1
              ? "grid-cols-1 md:max-w-md mx-auto"
              : count === 2
                ? "grid-cols-1 md:grid-cols-2"
                : count === 4
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }
        `}
      >
        {featuredCategories.map((cat) => (
          <CollectionCardWrapper cat={cat} key={cat.id} />
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <Link href="/produtos">
          <BrownButton text="Ver todos os produtos" maxWidth="max-w-fit" />
        </Link>
      </div>
    </>
  );
}
