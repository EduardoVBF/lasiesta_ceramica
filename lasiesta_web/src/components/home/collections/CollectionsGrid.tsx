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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
