"use client";
import BackgroundImage from "@/components/layout/backgroundImage";
import NotFoundCard from "@/components/ui/notFoundCard";
import BrownButton from "@/components/ui/brownButtom";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LoaderComp from "@/components/ui/loaderComp";

import { getProductBySlug, Product } from "../../../../services/products.service";

import { useParams } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProductBySlug(slug);
        console.log("data", data)
        setProduct(data);
        setSelectedImage(data.mainImageUrl || null);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) load();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header bgColor="bg-[#a35c42c7]" />
        <div className="min-h-[500px] flex items-center justify-center">
          <LoaderComp text="Carregando produto..." />
        </div>
        <Footer />
      </>
    );
  }

  if (!product || !product.isActive) {
    return (
      <>
        <Header bgColor="bg-[#a35c42c7]" />
        <div className="min-h-[500px] flex items-center justify-center bg-[#e2b19f8e]">
          <NotFoundCard
            message="Produto não encontrado."
            hasButton
            buttonText="Voltar"
            buttonSrc="/products"
          />
        </div>
        <Footer />
      </>
    );
  }

  const images = [
    product.mainImageUrl,
    ...(product.secondaryImages ?? []),
  ].filter(Boolean) as string[];

  return (
    <>
      <Header bgColor="bg-[#a35c42c7]" />

      <main className="px-6 md:px-12 flex flex-col items-center bg-marrom-claro relative min-h-screen">
        {/* VOLTAR */}
        <Link
          href="/products"
          className="bg-white/40 hover:bg-white/50 px-2 w-fit rounded-b-lg flex pb-1 items-center gap-1 self-start pt-3 cursor-pointer z-10"
        >
          <ArrowBigLeft size={18} />
          <p className="text-sm font-semibold">Produtos</p>
        </Link>

        <BackgroundImage
          src="/image/organic2.jpg"
          alt="Textura de fundo do ateliê"
          opacity={10}
        />

        {/* CARD */}
        <div className="w-[90%] bg-[#def3de60] shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row md:gap-10 p-4 z-10 my-5">
          {/* GALERIA */}
          <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1 relative">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover aspect-square rounded-xl shadow-md"
                />
              )}
            </div>

            <div className="flex md:flex-col w-full md:w-fit p-2 overflow-x-auto gap-3 justify-center mt-4 md:mt-0">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`rounded-xl overflow-hidden transition-all min-w-[90px] min-h-[90px] ${
                    selectedImage === img
                      ? "ring-2 ring-[#a35c42] ring-offset-2"
                      : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Imagem ${index + 1}`}
                    width={90}
                    height={90}
                    className="object-cover w-[90px] h-[90px]"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="w-full flex flex-col justify-between py-4 text-gray-800">
            <div>
              <h1 className="text-xl lg:text-3xl font-bold mb-2 text-marrom-avermelhado">
                {product.name}
              </h1>

              <div className="flex gap-2 text-xs mb-4">
                {product.category && (
                  <span className="bg-marrom-avermelhado px-2 py-1 rounded-md text-white">
                    {product.category.name}
                  </span>
                )}
                {product.material && (
                  <span className="bg-verde-escuro px-2 py-1 rounded-md text-white">
                    {product.material}
                  </span>
                )}
              </div>

              <div
                className="prose prose-sm max-w-none text-gray-800"
                dangerouslySetInnerHTML={{
                  __html: product.longDescription || "",
                }}
              />
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <p className="text-3xl font-semibold text-marrom-avermelhado">
                {product.isSale && product.salePrice
                  ? formatBRL(product.salePrice)
                  : formatBRL(product.price)}
              </p>

              <BrownButton
                text="Quero comprar!"
                onClick={() => {
                  window.open(
                    `https://wa.me/5516991401921?text=Olá!%20Tenho%20interesse%20no%20${encodeURIComponent(
                      product.name
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
