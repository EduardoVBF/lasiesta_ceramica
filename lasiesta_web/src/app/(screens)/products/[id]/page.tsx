"use client";
import HeaderWithBanner from "@/components/headerWithBanner";
import BrownButton from "@/components/brownButtom";
import { useParams } from "next/navigation";
import Footer from "@/components/footer";
import React, { useState } from "react";
import Image from "next/image";

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
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(
    product?.image ?? "/image/IMG_0065.JPG"
  );

  if (!product) return <p>Produto não encontrado.</p>;

  const additionalImages = [
    product.image,
    "/image/IMG_0036.JPG",
    "/image/IMG_0070.JPG",
    "/image/IMG_0229.JPG",
    "/image/IMG_0152.JPG",
  ];

  return (
    <>
      <HeaderWithBanner
        src={product.image}
        alt={product.nome}
        title={product.nome}
        description={product.material ?? "Detalhes do produto"}
      />

      <main className="px-6 md:px-12 py-10 flex flex-col items-center bg-marrom-claro">
        <div className="max-w-6xl w-full bg-[#def3de82] shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row md:gap-10 p-4">
          {/* --- Galeria de imagens --- */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
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
              {additionalImages.map((img, index) => (
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
          <div className="flex-1 md:w-1/2 flex flex-col justify-between py-4 text-gray-800">
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
