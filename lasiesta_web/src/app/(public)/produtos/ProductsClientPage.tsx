"use client";
import { useActiveCategories } from "../../../hooks/queries/useActiveCategories";
import CategoriesNavSkeleton from "@/components/skeletons/categoriesNavSkeleton";
import ProductsCategoriesNav from "@/components/layout/productsCategoriesNav";
import { usePublicProducts } from "../../../hooks/queries/usePublicProducts";
import ProductGridSkeleton from "@/components/skeletons/productGridSkeleton";
import HeaderWithBanner from "@/components/layout/headerWithBanner";
import { Category } from "../../../services/categories.service";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "../../../services/products.service";
import ProductCard from "@/components/cards/productCard";
import Pagination from "@/components/ui/paginationComp";
import SearchInput from "@/components/ui/searchInput";
import Footer from "@/components/layout/footer";
import { useState } from "react";

export default function ProductsClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  //  URL PARAMS INICIAIS
  const initialCategory = searchParams.get("category") ?? "all";
  const initialSearch = searchParams.get("search") ?? "";
  const initialPage = Number(searchParams.get("page") ?? 1);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const limit = 12;

  const categoriesQuery = useActiveCategories();

  const productsQuery = usePublicProducts({
    search,
    page,
    limit,
    activeCategory,
  });

  const categories = categoriesQuery.data ?? [];
  const products = productsQuery.data?.items ?? [];
  const totalPages = productsQuery.data?.totalPages ?? 1;
  const loadingCategories = categoriesQuery.isLoading;
  const loadingProducts = productsQuery.isLoading;

  function updateURL(params: Record<string, string | null>) {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (!value || value === "all") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    router.push(`?${newParams.toString()}`, { scroll: false });
  }

  //  HANDLERS
  function handleCategoryChange(category: string) {
    setActiveCategory(category);
    setSearch("");
    setPage(1);

    updateURL({
      category,
      search: null,
      page: "1",
    });
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);

    updateURL({
      search: value || null,
      page: "1",
    });
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);

    updateURL({
      page: String(newPage),
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-bege-claro overflow-hidden">
      <HeaderWithBanner page="PRODUCTS" textColor="text-white" />
      {loadingCategories ? (
        <CategoriesNavSkeleton />
      ) : (
        <ProductsCategoriesNav
          categories={[
            { id: "all", label: "Todos" },
            { id: "featured", label: "Destaques" },
            { id: "sale", label: "Promoções" },
            ...categories.map((c: Category) => ({
              id: c.slug,
              label: c.name,
            })),
          ]}
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
        />
      )}

      {/* SEARCH */}
      <div className="w-full max-w-[90%] mb-4">
        <SearchInput
          value={search}
          placeholder="Buscar produtos..."
          onChange={handleSearchChange}
          onClear={() => handleSearchChange("")}
        />
      </div>

      {loadingProducts ? (
        <ProductGridSkeleton />
      ) : (
        <>
          <section className="w-full max-w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
            {products.map((product: Product, index: number) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </section>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mb-8"
          />
        </>
      )}

      {!loadingProducts && products.length === 0 && (
        <p className="text-gray-500 mb-20">Nenhum produto encontrado.</p>
      )}

      <Footer />
    </main>
  );
}
