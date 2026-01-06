"use client";
import ProductsCategoriesNav from "@/components/layout/productsCategoriesNav";
import HeaderWithBanner from "@/components/layout/headerWithBanner";
import ProductCard from "@/components/cards/productCard";
import mockProducts from "@/app/utils/mockProducts";
import Footer from "@/components/layout/footer";
import React, { useState } from "react";

const products = mockProducts();

const categories = [
  { id: "all", label: "Todos" },
  { id: "copos", label: "Copos" },
  { id: "pratos", label: "Pratos" },
  { id: "bowls", label: "Bowls" },
  { id: "tigelas", label: "Tigelas" },
  { id: "vasos", label: "Vasos" },
  { id: "canecas", label: "Canecas" },
  { id: "saboneteiras", label: "Saboneteiras" },
  { id: "manteigueiras", label: "Manteigueiras" },
  { id: "bandejas", label: "Bandejas" },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (product) => product.categoria.toLowerCase() === activeCategory
        );

  return (
    <main className="flex min-h-screen flex-col items-center bg-bege-claro overflow-hidden">
      <HeaderWithBanner
        src="/image/IMG_0036.JPG"
        alt="Produtos em Cerâmica"
        title="Produtos Lasiesta"
        description="Descubra nossa coleção única de produtos artesanais, feitos com dedicação e atenção aos detalhes."
        textColor="text-white"
      />

      {/* Tabs Navigation */}
      <ProductsCategoriesNav
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Grid de Produtos */}
      <section className="w-full max-w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
        {filteredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </section>

      <Footer />
    </main>
  );
}
