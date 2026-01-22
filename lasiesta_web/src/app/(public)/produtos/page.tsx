"use client";
import HeaderWithBanner from "@/components/layout/headerWithBanner";
import ProductsCategoriesNav from "@/components/layout/productsCategoriesNav";
import Footer from "@/components/layout/footer";
import ProductCard from "@/components/cards/productCard";
import LoaderComp from "@/components/ui/loaderComp";

import { getPublicProducts, Product } from "../../../services/products.service";
import { getActiveCategories, Category } from "../../../services/categories.service";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getPublicProducts({
        categorySlug: activeCategory !== "all" ? activeCategory : undefined,
      }),
      getActiveCategories(),
    ])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.items);
        setCategories(categoriesRes);
      })
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-bege-claro overflow-hidden">
      <HeaderWithBanner page="PRODUCTS" textColor="text-white" />

      <ProductsCategoriesNav
        categories={[
          { id: "all", label: "Todos" },
          ...categories.map((c) => ({
            id: c.slug,
            label: c.name,
          })),
        ]}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {loading ? (
        <div className="py-20">
          <LoaderComp text="Carregando produtos..." />
        </div>
      ) : (
        <section className="w-full max-w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </section>
      )}

      {!loading && products.length === 0 && (
        <p className="text-gray-500 mb-20">Nenhum produto encontrado.</p>
      )}

      <Footer />
    </main>
  );
}
