"use client";
import {
  Product,
  getProductById,
} from "../../../../../services/products.service";
import BackgroundImage from "@/components/layout/backgroundImage";
import { useParams, useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/statusBadge";
import BrownButton from "@/components/ui/brownButtom";
import LoaderComp from "@/components/ui/loaderComp";
import { ArrowBigLeft, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function AdminProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setSelectedImage(data.mainImageUrl);
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || "Produto não encontrado");
          router.push("/admin/products");
        } else {
          toast.error("Erro ao carregar produto");
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id, router]);

  if (loading) {
    return <LoaderComp text="Carregando produto..." />;
  }

  if (!product) return null;

  const images = [product.mainImageUrl, ...(product.secondaryImages ?? [])];

  return (
    <main>
      <BackgroundImage
        src="/image/organic2.jpg"
        alt="Textura de fundo"
        opacity={10}
      />

      {/* BACK */}
      <button
        onClick={() => router.push("/admin/products")}
        className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#a35c42] mb-4 z-10 relative cursor-pointer"
      >
        <ArrowBigLeft size={18} />
        Voltar para produtos
      </button>

      {/* CARD */}
      <section className="bg-[#ddd3d0c2] rounded-2xl shadow-lg p-6 z-20 flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#a35c42] mb-2">
              {product.name}
            </h1>
            <p className="text-sm text-gray-600">
              {product.category?.name || "Sem categoria"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge active={product.isActive} />
            {product.isFeatured && (
              <span className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Destaque
              </span>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* IMAGES */}
          <div className="flex flex-col gap-4 w-full lg:w-[420px]">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img as string)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border ${
                    selectedImage === img
                      ? "border-[#a35c42]"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={img || "/image/placeholder.jpg"}
                    alt={`Imagem ${i + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full cursor-pointer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <p className="text-lg font-semibold">
                {product.isSale && product.salePrice ? (
                  <>
                    <span className="line-through text-gray-400 mr-2">
                      R${" "}
                      {Number(formatBRL(product.price))
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                    <span className="text-red-600">
                      R${" "}
                      {Number(formatBRL(product.salePrice))
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                  </>
                ) : (
                  <>
                    R${" "}
                    {Number(formatBRL(product.price))
                      .toFixed(2)
                      .replace(".", ",")}
                  </>
                )}
              </p>
            </div>

            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: product.longDescription || "",
              }}
            />

            <div className="text-sm space-y-1">
              {product.material && (
                <p>
                  <strong>Material:</strong> {product.material}
                </p>
              )}
              {product.dimensions && (
                <p>
                  <strong>Dimensões:</strong> {product.dimensions}
                </p>
              )}
            </div>

            {/* COLORS */}
            {product.colors && product.colors?.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Cores</p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-full bg-gray-200 text-sm"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          {/* EDIT */}
          <button
            // onClick={onEdit}
            title="Editar produto"
            className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-[#a35c42] transition"
          >
            <Pencil size={25} />
          </button>

          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="inline-flex"
          >
            <BrownButton
              text="Ver no site"
              //   icon={<SquareArrowOutUpRight size={16} />}
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
