"use client";

import NotFoundCard from "@/components/notFoundCard";
import React, { useState, useEffect } from "react";
import BrownButton from "@/components/brownButtom";
import { useParams } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

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
    destaque: true,
  },
];

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id;

  const product = products.find((p) => p.id === Number(id));

  const [selectedImage, setSelectedImage] = useState("/image/IMG_0065.JPG");

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  const additionalImages = [
    product ? product.image : null,
    handleMockImage("pratos"),
    handleMockImage("bowls"),
    handleMockImage("tigelas"),
    handleMockImage("vasos"),
  ];

  if (!product) {
    return (
      <>
        <Header bgColor="bg-[#a35c42]" />
        <div className="min-h-[500px] flex items-center justify-center">
          <NotFoundCard
            message="Produto não encontrado."
            hasButton={true}
            buttonText="Voltar"
            buttonSrc="/products"
          />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* <HeaderWithBanner
        src={product.image}
        alt={product.nome}
        title={product.nome}
        description={product.material ?? "Detalhes do produto"}
      /> */}
      <Header bgColor="bg-[#a35c42]" />
      <main className="px-6 md:px-12 py-5 flex flex-col items-center bg-marrom-claro relative min-h-screen">
        {/* Imagem de fundo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/image/organic2.jpg"
            alt="Textura de fundo do ateliê"
            fill
            className="object-cover opacity-10 mix-blend-overlay"
            priority
          />
        </div>
        <Link
          href="/products"
          className="flex items-center gap-1 w-full my-3 cursor-pointer hover:mr-3 transition z-10"
        >
          <ArrowBigLeft size={22} className="text-marrom-avermelhado" />
          <p>Produtos</p>
        </Link>
        <div className="w-[90%] bg-[#def3de60] shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row md:gap-10 p-4 z-10">
          {/* --- Galeria de imagens --- */}
          <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Imagem principal */}
            <div className="flex-1 relative">
              <Image
                src={selectedImage}
                alt={product.nome}
                className="w-full h-full object-cover aspect-square rounded-xl shadow-md"
                width={500}
                height={500}
              />
            </div>

            {/* Miniaturas */}
            <div className="flex md:flex-col w-full md:w-fit p-2 overflow-x-auto gap-3 justify-center mt-4 md:mt-0">
              {additionalImages.map((img: string | null, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`rounded-xl overflow-hidden transition-all duration-200 min-w-[90px] min-h-[90px] ${
                    selectedImage === img
                      ? "ring-2 ring-[#a35c42] ring-offset-2 ring-offset-[#dad6c2]"
                      : ""
                  }`}
                  style={{ width: 90, height: 90 }}
                >
                  <Image
                    src={img}
                    alt={`Imagem ${index + 1}`}
                    className="object-cover w-[90px] h-[90px]"
                    width={90}
                    height={90}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* --- Detalhes do produto --- */}
          <div className="w-full flex flex-col justify-between py-4 text-gray-800">
            <h1 className="text-3xl font-bold mb-4 text-marrom-avermelhado line-clamp-2 leading-relaxed">
              {product.nome}
            </h1>

            <p className="text-3xl text-marrom-avermelhado font-semibold mb-6">
              R$ {product.preco.toFixed(2)}
            </p>

            <div className="space-y-2 text-base md:text-lg">
              <p>
                <strong>Categoria:</strong> {product.categoria}
              </p>
              <p>
                <strong>Dimensões:</strong> {product.dimensoes}
              </p>
              <p>
                <strong>Material:</strong> {product.material}
              </p>
            </div>

            <div className="mt-6">
              <strong className="block mb-2">Cores disponíveis:</strong>
              <div className="flex items-center gap-2">
                {product.cores.map((cor) => (
                  <div
                    key={cor.hex}
                    className="w-8 h-8 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: cor.hex }}
                    title={cor.name}
                  />
                ))}
              </div>
            </div>

            <BrownButton text="Quero comprar!" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
