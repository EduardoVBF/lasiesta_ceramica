"use client";
import {
  getActiveCategories,
  Category,
} from "../../../services/categories.service";
import { getPublicProducts, Product } from "../../../services/products.service";
import ProductsCategoriesNav from "@/components/layout/productsCategoriesNav";
import HeaderWithBanner from "@/components/layout/headerWithBanner";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/cards/productCard";
import Pagination from "@/components/ui/paginationComp";
import SearchInput from "@/components/ui/searchInput";
import { useQuery } from "@tanstack/react-query";
import Footer from "@/components/layout/footer";
import { useState } from "react";

const productKeys = {
  publicList: (params: {
    search?: string;
    page?: number;
    limit?: number;
    activeCategory?: string;
  }) => ["publicProducts", params] as const,
};

const categoryKeys = {
  activeList: ["activeCategories"] as const,
};

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

  const categoriesQuery = useQuery({
    queryKey: categoryKeys.activeList,
    queryFn: getActiveCategories,
  });

  const productsQuery = useQuery({
    queryKey: productKeys.publicList({
      search,
      page,
      limit,
      activeCategory,
    }),
    queryFn: async () => {
      const res = await getPublicProducts({
        search,
        page,
        limit,
        categorySlug:
          activeCategory !== "all" &&
          activeCategory !== "featured" &&
          activeCategory !== "sale"
            ? activeCategory
            : undefined,
      });

      let items = res.items;

      if (activeCategory === "featured") {
        items = items.filter((p: Product) => p.isFeatured);
      }

      if (activeCategory === "sale") {
        items = items.filter((p: Product) => p.isSale);
      }

      return {
        items,
        totalPages: res.meta.totalPages,
      };
    },
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

  function CategoriesNavSkeleton() {
    return (
      <div className="w-full max-w-[90%] mb-4 overflow-hidden">
        <div className="flex overflow-x-auto justify-start gap-x-1 px-1">
          {[...Array(8)].map((_, index) => (
            <button
              key={index}
              className={`pt-4 rounded-b-lg px-6 py-1 text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer hover:bg-gray-500/20 hover:text-marrom-avermelhado/90 focus:outline-none bg-[#a35c42]/20 w-30 h-10`}
            ></button>
          ))}
        </div>
      </div>
    );
  }

  function ProductCardSkeleton() {
    return (
      <section className="w-full max-w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
        {[...Array(8)].map((_, index) => (
          <article
            key={index}
            className="w-full max-w-sm h-[35rem] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#f5fbf3] to-[#efe6da] animate-pulse"
          >
            {/* IMAGE */}
            <div className="relative w-full aspect-square bg-[#e7ddd2]">
              {/* fake badges */}
              <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-[#d1c3b5]" />
              <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-[#d1c3b5]" />

              {/* fake category */}
              <div className="absolute bottom-2 left-2 w-20 h-5 rounded-full bg-[#d1c3b5]" />
            </div>

            {/* CONTENT */}
            <div className="px-3 pt-3 bg-[#bf7a6b8b] flex flex-col justify-between h-[calc(35rem-18.8rem)]">
              <div>
                {/* title */}
                <div className="h-6 w-3/4 rounded bg-[#d6b6ae] mb-3" />

                {/* description */}
                <div className="space-y-2 mb-4">
                  <div className="h-3 w-full rounded bg-[#dcc5bf]" />
                  <div className="h-3 w-5/6 rounded bg-[#dcc5bf]" />
                  <div className="h-3 w-2/3 rounded bg-[#dcc5bf]" />
                </div>
              </div>

              <div className="mb-3">
                {/* price */}
                <div className="h-7 w-32 rounded bg-[#d6b6ae] mb-4" />

                {/* button */}
                <div className="h-12 w-full rounded-xl bg-[#8e947d]" />
              </div>
            </div>
          </article>
        ))}
      </section>
    );
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
        <ProductCardSkeleton />
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
