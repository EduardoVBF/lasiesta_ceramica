"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";

import BackgroundImage from "@/components/layout/backgroundImage";
import LoaderComp from "@/components/ui/loaderComp";
import ImageZoom from "@/components/layout/ImageZoom";

import {
  getProductBySlug,
  Product,
} from "../../../../../services/products.service";

import { FaStar } from "react-icons/fa6";
import { GiPorcelainVase } from "react-icons/gi";
import { FaTruck } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";
import { RxDimensions } from "react-icons/rx";
import Header from "@/components/layout/header";
import BrownButton from "@/components/ui/brownButtom";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function PublicProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
        setSelectedImage(data.mainImageUrl);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || "Produto não encontrado");
        } else {
          toast.error("Erro ao carregar produto");
        }
      } finally {
        setLoading(false);
      }
    }

    if (slug) load();
  }, [slug]);

  if (loading) return <LoaderComp text="Carregando produto..." />;
  if (!product) return null;

  const images = [product.mainImageUrl, ...(product.secondaryImages ?? [])];

  return (
    <main className="relative">
      <Header bgColor="bg-transparent" />
      <Toaster />

      <BackgroundImage
        src="/image/organic2.jpg"
        alt="Textura de fundo"
        opacity={10}
      />

      <section className="max-w-7xl mx-auto p-2 relative z-10">
        {/* VOLTAR */}
        <Link
          href="/produtos"
          className="inline-block mb-4 text-sm text-gray-600 hover:text-[#a35c42]"
        >
          ← Voltar para produtos
        </Link>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* GALERIA */}
          <div className="w-full lg:w-[480px] flex flex-col gap-4 pr-4 border-r-2">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
              {selectedImage && (
                <ImageZoom
                  src={selectedImage}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  zoom
                  fill
                />
              )}

              {product.isFeatured && (
                <FaStar
                  size={32}
                  title="Destaque"
                  className="absolute top-2 left-2 bg-amber-600 text-white p-1 rounded-full shadow"
                />
              )}

              {product.isSale && (
                <RiDiscountPercentFill
                  size={40}
                  title="Promoção"
                  className="absolute top-2 right-2 bg-marrom-avermelhado text-white rounded-full p-1 shadow"
                />
              )}
            </div>

            {/* THUMBS */}
            <div
              className={`flex gap-2 flex-wrap justify-${
                images.length > 4 ? "between" : "start"
              }`}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img as string)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer ${
                    selectedImage === img
                      ? "outline-2 outline-offset-2 outline-[#a35c42]"
                      : ""
                  }`}
                >
                  <Image
                    src={img as string}
                    alt={`Imagem ${i + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex-1 flex flex-col gap-5">
              <div>
                <h1 className="text-3xl font-bold text-[#a35c42]">
                  {product.name}
                </h1>

                {product.category && (
                  <span className="inline-block mt-2 bg-[#a35c42] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.category.name}
                  </span>
                )}
              </div>

              {/* PREÇO */}
              <div className="text-2xl font-bold">
                {product.price === 0 ? (
                  <span className="text-gray-700">Preço sob consulta</span>
                ) : product.isSale && product.salePrice ? (
                  <div className="flex items-center gap-3">
                    <span className="line-through text-gray-400">
                      {formatBRL(Number(product.price))}
                    </span>
                    <span className="text-red-600">
                      {formatBRL(Number(product.salePrice))}
                    </span>
                  </div>
                ) : (
                  <span>{formatBRL(Number(product.price))}</span>
                )}
                <div className="flex items-end gap-2">
                  <FaTruck size={18} />
                  <p className="text-xs text-gray-600 font-light">
                    Frete não incluso, entre em contato para mais informações
                  </p>
                </div>
              </div>

              {/* DESCRIÇÕES */}
              {product.shortDescription && (
                <div
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: product.shortDescription,
                  }}
                />
              )}

              {product.longDescription && (
                <div
                  className="prose max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: product.longDescription,
                  }}
                />
              )}

              {/* DETALHES */}
              <div className="grid grid-cols-1 gap-4 text-sm">
                {product.material && (
                  <div className="flex items-center gap-1">
                    <GiPorcelainVase size={25} />
                    <span className="text-gray-800">{product.material}</span>
                  </div>
                )}

                {product.dimensions && (
                  <div className="flex items-center gap-2">
                    <RxDimensions size={22} />
                    <span className="text-gray-800">{product.dimensions}</span>
                  </div>
                )}
              </div>

              {/* CORES */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <div className="flex flex-col mb-2">
                    <p className="font-semibold">Cores disponíveis:</p>
                    <p className="text-xs text-gray-600">
                      *consulte para mais cores
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((c) => (
                      <span
                        key={c}
                        className="px-3 py-1 rounded-full bg-gray-500 text-sm text-white"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href={`https://wa.me/5516991401921?text=${encodeURIComponent(
                `Olá! Tenho interesse no produto: ${product.name}`
              )}`}
              target="_blank"
              className="self-baseline-last"
            >
              <BrownButton text="Tenho interesse" maxWidth="max-w-fit" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
