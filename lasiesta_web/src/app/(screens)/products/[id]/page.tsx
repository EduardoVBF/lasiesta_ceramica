"use client";

import NotFoundCard from "@/components/notFoundCard";
import mockProducts from "@/app/utils/mockProducts";
import React, { useState, useEffect } from "react";
import BrownButton from "@/components/brownButtom";
import { useParams } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id;

  const product = mockProducts().find((p) => p.id === Number(id));

  // Estado da imagem selecionada
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Atualiza imagem principal quando o produto é carregado
  useEffect(() => {
    if (id && product) {
      setSelectedImage(product.image);
    }
  }, [id]);

  // Galeria de imagens adicionais
  const additionalImages = [
    product?.image || "/image/IMG_0036.JPG",
    "/image/IMG_0036.JPG",
    "/image/IMG_0070.JPG",
    "/image/IMG_0229.JPG",
    "/image/IMG_0152.JPG",
  ].filter(Boolean) as string[]; // remove null/undefined

  // Caso produto não exista
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
      <Header bgColor="bg-[#a35c42]" />
      <main className="px-6 md:px-12 flex flex-col items-center bg-marrom-claro relative min-h-screen">
        <Link
          href="/products"
          className="bg-white/40 hover:bg-white/50 px-2 w-fit rounded-b-lg flex pb-1 items-center gap-1 self-start pt-3 cursor-pointer z-10"
        >
          <ArrowBigLeft size={18} className="text-marrom-avermelhado" />
          <p className="text-sm font-semibold">Produtos</p>
        </Link>

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

        {/* Card principal */}
        <div className="w-[90%] bg-[#def3de60] shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row md:gap-10 p-4 z-10 my-5">
          {/* --- Galeria de imagens --- */}
          <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Imagem principal */}
            <div className="flex-1 relative">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt={product.nome}
                  className="w-full h-full object-cover aspect-square rounded-xl shadow-md"
                  width={500}
                  height={500}
                />
              ) : (
                <div className="w-full h-full aspect-square bg-gray-100 rounded-xl animate-pulse" />
              )}
            </div>

            {/* Miniaturas */}
            <div className="flex md:flex-col w-full md:w-fit p-2 overflow-x-auto gap-3 justify-center mt-4 md:mt-0">
              {additionalImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => img && setSelectedImage(img)}
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
            <div>
              <h1 className="text-xl lg:text-3xl font-bold mb-4 text-marrom-avermelhado lg:line-clamp-2 leading-relaxed">
                {product.nome}
              </h1>
              <div className="flex space-x-2 text-sm">
                <p className="text-xs bg-marrom-avermelhado px-2 py-1 rounded-md w-fit text-white">
                  {product.categoria}
                </p>
                <p className="text-xs bg-verde-escuro px-2 py-1 rounded-md w-fit text-white">
                  {product.material}
                </p>
              </div>
            </div>

            <p className="text-xs lg:text-base text-justify mr-2 my-4">
              {product.description}
            </p>

            <div className="flex flex-col gap-2 mb-4">
              <p className="text-sm">
                <strong>Dimensões:</strong> {product.dimensoes}
              </p>
              <div className="">
                <strong className="text-sm block mb-1">
                  Cores disponíveis:
                </strong>
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
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="text-3xl text-marrom-avermelhado font-semibold">
                R$ {product.preco.toFixed(2)}
              </p>
              <BrownButton
                text="Quero comprar!"
                onClick={() => {
                  window.open(
                    `https://wa.me/5516991401921?text=Olá!%20Tenho%20interesse%20no%20${encodeURIComponent(
                      product.nome
                    )}`,
                    "_blank"
                  );
                }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
