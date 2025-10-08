"use client";
import HeaderWithBanner from "@/components/headerWithBanner";
import Header from "@/components/header";
import Footer from "@/components/footer";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    id: 1,
    nome: "Copo de Cerâmica Rústico",
    preco: 35.0,
    cores: ["Bege", "Marrom", "Verde Musgo"],
    categoria: "Copos",
    dimensoes: "8x10cm",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/copo1.jpg",
  },
  {
    id: 2,
    nome: "Prato Raso Mediterrâneo",
    preco: 48.0,
    cores: ["Branco", "Azul"],
    categoria: "Pratos",
    dimensoes: "27cm de diâmetro",
    material: "Cerâmica artesanal",
    image: "/image/produtos/prato1.jpg",
  },
  {
    id: 3,
    nome: "Prato Fundo Minimalista",
    preco: 52.0,
    cores: ["Cinza", "Branco Gelo"],
    categoria: "Pratos",
    dimensoes: "22cm de diâmetro",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/prato2.jpg",
  },
  {
    id: 4,
    nome: "Bowl Orgânico Pequeno",
    preco: 40.0,
    cores: ["Terracota", "Areia"],
    categoria: "Bowls",
    dimensoes: "15x7cm",
    material: "Cerâmica artesanal",
    image: "/image/produtos/bowl1.jpg",
  },
  {
    id: 5,
    nome: "Tigela Tradicional Japonesa",
    preco: 60.0,
    cores: ["Preto Fosco", "Vermelho"],
    categoria: "Tigelas",
    dimensoes: "18x9cm",
    material: "Cerâmica de alta temperatura",
    image: "/image/produtos/tigela1.jpg",
  },
  {
    id: 6,
    nome: "Vaso Decorativo Ondas",
    preco: 120.0,
    cores: ["Branco", "Azul Turquesa"],
    categoria: "Vasos",
    dimensoes: "25x15cm",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/vaso1.jpg",
  },
  {
    id: 7,
    nome: "Caneca com Alça Orgânica",
    preco: 42.0,
    cores: ["Bege", "Cinza"],
    categoria: "Canecas",
    dimensoes: "9x12cm",
    material: "Cerâmica artesanal",
    image: "/image/produtos/caneca1.jpg",
  },
  {
    id: 8,
    nome: "Saboneteira Texturizada",
    preco: 28.0,
    cores: ["Branco", "Azul Claro"],
    categoria: "Saboneteiras",
    dimensoes: "12x9cm",
    material: "Cerâmica com relevo",
    image: "/image/produtos/saboneteira1.jpg",
  },
  {
    id: 9,
    nome: "Manteigueira Clássica",
    preco: 55.0,
    cores: ["Branco", "Amarelo Suave"],
    categoria: "Manteigueiras",
    dimensoes: "16x10cm",
    material: "Cerâmica artesanal",
    image: "/image/produtos/manteigueira1.jpg",
  },
  {
    id: 10,
    nome: "Bandeja Oval Minimal",
    preco: 75.0,
    cores: ["Cinza", "Preto"],
    categoria: "Bandejas",
    dimensoes: "30x18cm",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/bandeja1.jpg",
  },
  {
    id: 11,
    nome: "Copo Esmaltado Azul",
    preco: 32.0,
    cores: ["Azul Claro", "Branco"],
    categoria: "Copos",
    dimensoes: "8x9cm",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/copo2.jpg",
  },
  {
    id: 12,
    nome: "Prato Rústico de Pedra",
    preco: 50.0,
    cores: ["Cinza", "Marrom"],
    categoria: "Pratos",
    dimensoes: "26cm de diâmetro",
    material: "Cerâmica de alta temperatura",
    image: "/image/produtos/prato3.jpg",
  },
  {
    id: 13,
    nome: "Prato de Sobremesa Floral",
    preco: 38.0,
    cores: ["Branco", "Verde", "Amarelo"],
    categoria: "Pratos",
    dimensoes: "20cm de diâmetro",
    material: "Cerâmica pintada à mão",
    image: "/image/produtos/prato4.jpg",
  },
  {
    id: 14,
    nome: "Bowl Minimalista Branco",
    preco: 35.0,
    cores: ["Branco", "Cinza"],
    categoria: "Bowls",
    dimensoes: "14x6cm",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/bowl2.jpg",
  },
  {
    id: 15,
    nome: "Tigela Grande Oriental",
    preco: 70.0,
    cores: ["Preto", "Azul"],
    categoria: "Tigelas",
    dimensoes: "22x10cm",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/tigela2.jpg",
  },
  {
    id: 16,
    nome: "Vaso Alto Texturizado",
    preco: 150.0,
    cores: ["Cinza", "Bege"],
    categoria: "Vasos",
    dimensoes: "40x18cm",
    material: "Cerâmica com relevo",
    image: "/image/produtos/vaso2.jpg",
  },
  {
    id: 17,
    nome: "Caneca de Chá Minimal",
    preco: 38.0,
    cores: ["Verde", "Branco"],
    categoria: "Canecas",
    dimensoes: "8x11cm",
    material: "Cerâmica artesanal",
    image: "/image/produtos/caneca2.jpg",
  },
  {
    id: 18,
    nome: "Saboneteira Minimal",
    preco: 26.0,
    cores: ["Cinza", "Branco"],
    categoria: "Saboneteiras",
    dimensoes: "11x8cm",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/saboneteira2.jpg",
  },
  {
    id: 19,
    nome: "Manteigueira Modernista",
    preco: 60.0,
    cores: ["Cinza", "Azul"],
    categoria: "Manteigueiras",
    dimensoes: "18x11cm",
    material: "Cerâmica artesanal",
    image: "/image/produtos/manteigueira2.jpg",
  },
  {
    id: 20,
    nome: "Bandeja Retangular",
    preco: 80.0,
    cores: ["Branco", "Preto"],
    categoria: "Bandejas",
    dimensoes: "35x20cm",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/bandeja2.jpg",
  },
  {
    id: 21,
    nome: "Copo Rústico Terracota",
    preco: 34.0,
    cores: ["Terracota", "Areia"],
    categoria: "Copos",
    dimensoes: "7x10cm",
    material: "Cerâmica artesanal",
    image: "/image/produtos/copo3.jpg",
  },
  {
    id: 22,
    nome: "Prato de Jantar Clássico",
    preco: 55.0,
    cores: ["Branco", "Dourado"],
    categoria: "Pratos",
    dimensoes: "28cm de diâmetro",
    material: "Cerâmica pintada à mão",
    image: "/image/produtos/prato5.jpg",
  },
  {
    id: 23,
    nome: "Bowl Colorido Esmaltado",
    preco: 45.0,
    cores: ["Vermelho", "Azul", "Branco"],
    categoria: "Bowls",
    dimensoes: "16x8cm",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/bowl3.jpg",
  },
  {
    id: 24,
    nome: "Tigela Pequena de Chá",
    preco: 35.0,
    cores: ["Verde Musgo", "Branco"],
    categoria: "Tigelas",
    dimensoes: "12x7cm",
    material: "Cerâmica artesanal",
    image: "/image/produtos/tigela3.jpg",
  },
  {
    id: 25,
    nome: "Vaso Baixo Decorativo",
    preco: 110.0,
    cores: ["Azul", "Cinza"],
    categoria: "Vasos",
    dimensoes: "20x12cm",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/vaso3.jpg",
  },
  {
    id: 26,
    nome: "Caneca Esmaltada Colorida",
    preco: 45.0,
    cores: ["Amarelo", "Azul", "Branco"],
    categoria: "Canecas",
    dimensoes: "9x12cm",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/caneca3.jpg",
  },
  {
    id: 27,
    nome: "Saboneteira Folhagem",
    preco: 30.0,
    cores: ["Verde", "Bege"],
    categoria: "Saboneteiras",
    dimensoes: "13x9cm",
    material: "Cerâmica artesanal",
    image: "/image/produtos/saboneteira3.jpg",
  },
  {
    id: 28,
    nome: "Manteigueira Vintage",
    preco: 65.0,
    cores: ["Branco", "Verde"],
    categoria: "Manteigueiras",
    dimensoes: "17x10cm",
    material: "Cerâmica pintada à mão",
    image: "/image/produtos/manteigueira3.jpg",
  },
  {
    id: 29,
    nome: "Bandeja Redonda Decorativa",
    preco: 95.0,
    cores: ["Marrom", "Preto"],
    categoria: "Bandejas",
    dimensoes: "32cm de diâmetro",
    material: "Cerâmica artesanal",
    image: "/image/produtos/bandeja3.jpg",
  },
  {
    id: 30,
    nome: "Copo Minimalista Preto",
    preco: 36.0,
    cores: ["Preto Fosco", "Cinza"],
    categoria: "Copos",
    dimensoes: "8x9cm",
    material: "Cerâmica esmaltada",
    image: "/image/produtos/copo4.jpg",
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
    <main className="flex min-h-screen flex-col items-center bg-bege-claro">
      <HeaderWithBanner
        src="/image/IMG_0036.JPG"
        alt="Produtos em Cerâmica"
        title="Produtos Lasiesta"
        description="Descubra nossa coleção única de produtos artesanais, feitos com dedicação e atenção aos detalhes."
        textColor="text-white"
      />

      {/* Tabs Navigation */}
      <div className="w-[90%] mb-8">
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
      <section className="w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-20 mx-15">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-bege-claro via-bege-escuro to-marrom-avermelhado/10 rounded-2xl shadow-lg overflow-hidden flex flex-col w-80"
          >
            <Image
              src="/image/pexels-2.jpg"
              alt={product.nome}
              width={400}
              height={300}
              className="object-cover h-80 w-80"
            />
            <div className="p-6 flex flex-col justify-between flex-grow bg-verde-escuro">
              <div>
                <h2 className="text-xl font-semibold text-marrom-avermelhado mb-2">
                  {product.nome}
                </h2>
                <p className="text-marrom-avermelhado/80">{product.material}</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-marrom-avermelhado">
                  R${product.preco}
                </span>
                <a
                  href={`https://wa.me/5516991401921?text=Olá!%20Tenho%20interesse%20no%20${encodeURIComponent(
                    product.nome
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-marrom-avermelhado text-white px-4 py-2 rounded-xl hover:bg-marrom-avermelhado/90 transition"
                >
                  Detalhes
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      <Footer />
    </main>
  );
}
