"use client";
import HeaderWithBanner from "@/components/headerWithBanner";
import mockProducts from "@/app/utils/mockProducts";
import ProductCard from "@/components/productCard";
import Footer from "@/components/footer";
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
      <div className="w-full max-w-[90%] mb-8 overflow-hidden">
        <div className="flex overflow-x-auto justify-start gap-x-1 px-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`pt-4 rounded-b-lg px-6 py-1 text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer hover:bg-gray-500/20 hover:text-marrom-avermelhado/90 focus:outline-none ${
                {
                  active: activeCategory === category.id,
                }["active"]
                  ? "border-b-4 border-[#a35c42] text-marrom-avermelhado bg-white/60"
                  : "text-white bg-[#a35c42]/20"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

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
