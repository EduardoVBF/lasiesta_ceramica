"use client";
import HeaderWithBanner from "@/components/headerWithBanner";
import ProductCard from "@/components/productCard";
import Footer from "@/components/footer";
import React, { useState } from "react";

const handleMockImage = (categoria: string) => {
  switch (categoria.toLowerCase()) {
    case "copos":
      return "/image/IMG_0190.JPG";
    case "pratos":
      return "/image/IMG_0036.JPG";
    case "bowls":
      return "/image/IMG_0070.JPG";
    case "tigelas":
      return "/image/IMG_0229.JPG";
    case "vasos":
      return "/image/IMG_0152.JPG";
    case "canecas":
      return "/image/IMG_0094.JPG";
    case "saboneteiras":
      return "/image/IMG_0094.JPG";
    case "manteigueiras":
      return "/image/IMG_0129.JPG";
    case "bandejas":
      return "/image/IMG_0023.JPG";
    default:
      return "/image/IMG_0065.JPG";
  }
};

const products = [
  {
    id: 1,
    nome: "Copo de Cerâmica Rústico",
    preco: 35.0,
    cores: [
      { name: "Bege", hex: "#F5F5DC" },
      { name: "Marrom", hex: "#964B00" },
      { name: "Verde Musgo", hex: "#556B2F" },
    ],
    categoria: "Copos",
    dimensoes: "8x10cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Copos"),
    destaque: true, // Added to match the ProductCard structure
  },
  {
    id: 2,
    nome: "Prato Raso Mediterrâneo",
    preco: 48.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Azul", hex: "#0000FF" },
    ],
    categoria: "Pratos",
    dimensoes: "27cm de diâmetro",
    material: "Cerâmica artesanal",
    image: handleMockImage("Pratos"),
    destaque: false,
  },
  {
    id: 3,
    nome: "Prato Fundo Minimalista",
    preco: 52.0,
    cores: [
      { name: "Cinza", hex: "#808080" },
      { name: "Branco Gelo", hex: "#F8F8FF" },
    ],
    categoria: "Pratos",
    dimensoes: "22cm de diâmetro",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Pratos"),
    destaque: false,
  },
  {
    id: 4,
    nome: "Bowl Orgânico Pequeno",
    preco: 40.0,
    cores: [
      { name: "Terracota", hex: "#E2725B" },
      { name: "Areia", hex: "#F4A460" },
    ],
    categoria: "Bowls",
    dimensoes: "15x7cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Bowls"),
    destaque: false,
  },
  {
    id: 5,
    nome: "Tigela Tradicional Japonesa",
    preco: 60.0,
    cores: [
      { name: "Preto Fosco", hex: "#0A0A0A" },
      { name: "Vermelho", hex: "#FF0000" },
    ],
    categoria: "Tigelas",
    dimensoes: "18x9cm",
    material: "Cerâmica de alta temperatura",
    image: handleMockImage("Tigelas"),
    destaque: false,
  },
  {
    id: 6,
    nome: "Vaso Decorativo Ondas",
    preco: 120.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Azul Turquesa", hex: "#40E0D0" },
    ],
    categoria: "Vasos",
    dimensoes: "25x15cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Vasos"),
    destaque: false,
  },
  {
    id: 7,
    nome: "Caneca com Alça Orgânica",
    preco: 42.0,
    cores: [
      { name: "Bege", hex: "#F5F5DC" },
      { name: "Cinza", hex: "#808080" },
    ],
    categoria: "Canecas",
    dimensoes: "9x12cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Canecas"),
    destaque: false,
  },
  {
    id: 8,
    nome: "Saboneteira Texturizada",
    preco: 28.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Azul Claro", hex: "#ADD8E6" },
    ],
    categoria: "Saboneteiras",
    dimensoes: "12x9cm",
    material: "Cerâmica com relevo",
    image: handleMockImage("Saboneteiras"),
    destaque: false,
  },
  {
    id: 9,
    nome: "Manteigueira Clássica",
    preco: 55.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Amarelo Suave", hex: "#FFFACD" },
    ],
    categoria: "Manteigueiras",
    dimensoes: "16x10cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Manteigueiras"),
    destaque: false,
  },
  {
    id: 10,
    nome: "Bandeja Oval Minimal",
    preco: 75.0,
    cores: [
      { name: "Cinza", hex: "#808080" },
      { name: "Preto", hex: "#000000" },
    ],
    categoria: "Bandejas",
    dimensoes: "30x18cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Bandejas"),
    destaque: false,
  },
  {
    id: 11,
    nome: "Copo Esmaltado Azul",
    preco: 32.0,
    cores: [
      { name: "Azul Claro", hex: "#ADD8E6" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Copos",
    dimensoes: "8x9cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Copos"),
    destaque: false,
  },
  {
    id: 12,
    nome: "Prato Rústico de Pedra",
    preco: 50.0,
    cores: [
      { name: "Cinza", hex: "#808080" },
      { name: "Marrom", hex: "#964B00" },
    ],
    categoria: "Pratos",
    dimensoes: "26cm de diâmetro",
    material: "Cerâmica de alta temperatura",
    image: handleMockImage("Pratos"),
    destaque: false,
  },
  {
    id: 13,
    nome: "Prato de Sobremesa Floral",
    preco: 38.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Verde", hex: "#008000" },
      { name: "Amarelo", hex: "#FFFF00" },
    ],
    categoria: "Pratos",
    dimensoes: "20cm de diâmetro",
    material: "Cerâmica pintada à mão",
    image: handleMockImage("Pratos"),
    destaque: false,
  },
  {
    id: 14,
    nome: "Bowl Minimalista Branco",
    preco: 35.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Cinza", hex: "#808080" },
    ],
    categoria: "Bowls",
    dimensoes: "14x6cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Bowls"),
    destaque: false,
  },
  {
    id: 15,
    nome: "Tigela Grande Oriental",
    preco: 70.0,
    cores: [
      { name: "Preto", hex: "#000000" },
      { name: "Azul", hex: "#0000FF" },
    ],
    categoria: "Tigelas",
    dimensoes: "22x10cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Tigelas"),
    destaque: false,
  },
  {
    id: 16,
    nome: "Vaso Alto Texturizado",
    preco: 150.0,
    cores: [
      { name: "Cinza", hex: "#808080" },
      { name: "Bege", hex: "#F5F5DC" },
    ],
    categoria: "Vasos",
    dimensoes: "40x18cm",
    material: "Cerâmica com relevo",
    image: handleMockImage("Vasos"),
    destaque: false,
  },
  {
    id: 17,
    nome: "Caneca de Chá Minimal",
    preco: 38.0,
    cores: [
      { name: "Verde", hex: "#008000" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Canecas",
    dimensoes: "8x11cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Canecas"),
    destaque: false,
  },
  {
    id: 18,
    nome: "Saboneteira Minimal",
    preco: 26.0,
    cores: [
      { name: "Cinza", hex: "#808080" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Saboneteiras",
    dimensoes: "11x8cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Saboneteiras"),
    destaque: false,
  },
  {
    id: 19,
    nome: "Manteigueira Modernista",
    preco: 60.0,
    cores: [
      { name: "Cinza", hex: "#808080" },
      { name: "Azul", hex: "#0000FF" },
    ],
    categoria: "Manteigueiras",
    dimensoes: "18x11cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Manteigueiras"),
    destaque: false,
  },
  {
    id: 20,
    nome: "Bandeja Retangular",
    preco: 80.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Preto", hex: "#000000" },
    ],
    categoria: "Bandejas",
    dimensoes: "35x20cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Bandejas"),
    destaque: false,
  },
  {
    id: 21,
    nome: "Copo Rústico Terracota",
    preco: 34.0,
    cores: [
      { name: "Terracota", hex: "#E2725B" },
      { name: "Areia", hex: "#F4A460" },
    ],
    categoria: "Copos",
    dimensoes: "7x10cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Copos"),
    destaque: false,
  },
  {
    id: 22,
    nome: "Prato de Jantar Clássico",
    preco: 55.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Dourado", hex: "#FFD700" },
    ],
    categoria: "Pratos",
    dimensoes: "28cm de diâmetro",
    material: "Cerâmica pintada à mão",
    image: handleMockImage("Pratos"),
    destaque: false,
  },
  {
    id: 23,
    nome: "Bowl Colorido Esmaltado",
    preco: 45.0,
    cores: [
      { name: "Vermelho", hex: "#FF0000" },
      { name: "Azul", hex: "#0000FF" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Bowls",
    dimensoes: "16x8cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Bowls"),
    destaque: false,
  },
  {
    id: 24,
    nome: "Tigela Pequena de Chá",
    preco: 35.0,
    cores: [
      { name: "Verde Musgo", hex: "#556B2F" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Tigelas",
    dimensoes: "12x7cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Tigelas"),
    destaque: false,
  },
  {
    id: 25,
    nome: "Vaso Baixo Decorativo",
    preco: 110.0,
    cores: [
      { name: "Azul", hex: "#0000FF" },
      { name: "Cinza", hex: "#808080" },
    ],
    categoria: "Vasos",
    dimensoes: "20x12cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Vasos"),
    destaque: false,
  },
  {
    id: 26,
    nome: "Caneca Esmaltada Colorida",
    preco: 45.0,
    cores: [
      { name: "Amarelo", hex: "#FFFF00" },
      { name: "Azul", hex: "#0000FF" },
      { name: "Branco", hex: "#FFFFFF" },
    ],
    categoria: "Canecas",
    dimensoes: "9x12cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Canecas"),
    destaque: false,
  },
  {
    id: 27,
    nome: "Saboneteira Folhagem",
    preco: 30.0,
    cores: [
      { name: "Verde", hex: "#008000" },
      { name: "Bege", hex: "#F5F5DC" },
    ],
    categoria: "Saboneteiras",
    dimensoes: "13x9cm",
    material: "Cerâmica artesanal",
    image: handleMockImage("Saboneteiras"),
    destaque: false,
  },
  {
    id: 28,
    nome: "Manteigueira Vintage",
    preco: 65.0,
    cores: [
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Verde", hex: "#008000" },
    ],
    categoria: "Manteigueiras",
    dimensoes: "17x10cm",
    material: "Cerâmica pintada à mão",
    image: handleMockImage("Manteigueiras"),
    destaque: false,
  },
  {
    id: 29,
    nome: "Bandeja Redonda Decorativa",
    preco: 95.0,
    cores: [
      { name: "Marrom", hex: "#964B00" },
      { name: "Preto", hex: "#000000" },
    ],
    categoria: "Bandejas",
    dimensoes: "32cm de diâmetro",
    material: "Cerâmica artesanal",
    image: handleMockImage("Bandejas"),
    destaque: false,
  },
  {
    id: 30,
    nome: "Copo Minimalista Preto",
    preco: 36.0,
    cores: [
      { name: "Preto Fosco", hex: "#0A0A0A" },
      { name: "Cinza", hex: "#808080" },
    ],
    categoria: "Copos",
    dimensoes: "8x9cm",
    material: "Cerâmica esmaltada",
    image: handleMockImage("Copos"),
    destaque: false,
  },
];

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
