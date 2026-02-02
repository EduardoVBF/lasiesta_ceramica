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
import LoaderComp from "@/components/ui/loaderComp";
import Footer from "@/components/layout/footer";
import { useEffect, useState } from "react";

export default function ProductsClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  //  URL PARAMS INICIAIS
  const initialCategory = searchParams.get("category") ?? "all";
  const initialSearch = searchParams.get("search") ?? "";
  const initialPage = Number(searchParams.get("page") ?? 1);

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const limit = 12;

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

  //  LOAD CATEGORIES
  useEffect(() => {
    getActiveCategories().then(setCategories);
  }, []);

  //  LOAD PRODUCTS
  useEffect(() => {
    setLoading(true);

    getPublicProducts({
      search,
      page,
      limit,
      categorySlug:
        activeCategory !== "all" &&
        activeCategory !== "featured" &&
        activeCategory !== "sale"
          ? activeCategory
          : undefined,
    })
      .then((res) => {
        let items = res.items;

        if (activeCategory === "featured") {
          items = items.filter((p: Product) => p.isFeatured);
        }

        if (activeCategory === "sale") {
          items = items.filter((p: Product) => p.isSale);
        }

        setProducts(items);
        setTotalPages(res.meta.totalPages);
      })
      .finally(() => setLoading(false));
  }, [search, page, limit, activeCategory]);

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

      <ProductsCategoriesNav
        categories={[
          { id: "all", label: "Todos" },
          { id: "featured", label: "Destaques" },
          { id: "sale", label: "Promoções" },
          ...categories.map((c) => ({
            id: c.slug,
            label: c.name,
          })),
        ]}
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
      />

      {/* SEARCH */}
      <div className="w-full max-w-[90%] mb-4">
        <SearchInput
          value={search}
          placeholder="Buscar produtos..."
          onChange={handleSearchChange}
          onClear={() => handleSearchChange("")}
        />
      </div>

      {loading ? (
        <div className="py-20">
          <LoaderComp text="Carregando produtos..." />
        </div>
      ) : (
        <>
          <section className="w-full max-w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
            {products.map((product, index) => (
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

      {!loading && products.length === 0 && (
        <p className="text-gray-500 mb-20">Nenhum produto encontrado.</p>
      )}

      <Footer />
    </main>
  );
}
