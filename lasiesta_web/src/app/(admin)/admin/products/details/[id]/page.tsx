"use client";
import {
  Product,
  ProductFormData,
  createProduct,
  getProductById,
  updateProduct,
  updateProductStatus,
} from "../../../../../../services/products.service";
import BackgroundImage from "@/components/layout/backgroundImage";
import { useParams, useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/statusBadge";
import LoaderComp from "@/components/ui/loaderComp";
import { ArrowBigLeft, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import ProductFormModal from "@/components/admin/productFormModal";
import {
  Category,
  getAdminCategories,
} from "../../../../../../services/categories.service";
import { FaStar } from "react-icons/fa6";
import { LuScreenShare } from "react-icons/lu";
import { BsToggleOn } from "react-icons/bs";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export const dynamic = "force-dynamic";

export default function AdminProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toggleLoading, setToggleLoading] = useState(false);

  console.log("OIIIIIIIIIII");
  async function handleSubmitProduct(data: ProductFormData) {
    try {
      setSaving(true);

      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, data);

        setProduct(updated);

        toast.success("Produto atualizado com sucesso!");
      } else {
        const created = await createProduct(data);

        setProduct(created);

        toast.success("Produto criado com sucesso!");
      }

      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.error ||
            err.response?.data?.message ||
            err.message
        );
      } else {
        toast.error("Erro inesperado ao salvar produto");
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(product: Product) {
    try {
      setToggleLoading(true);
      const updated = await updateProductStatus(product.id, !product.isActive);

      setProduct(updated);

      toast.success(
        `Produto ${updated.isActive ? "ativado" : "desativado"} com sucesso!`
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || err.message);
      } else {
        toast.error("Erro inesperado");
      }
    } finally {
      setToggleLoading(false);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRes = await getAdminCategories();
        setCategories(categoriesRes);
      } catch {
        toast.error("Erro ao carregar categorias");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProductById(id);
        console.log(data);
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
  }, [id, router, isModalOpen, toggleLoading]);

  if (loading) {
    return <LoaderComp text="Carregando produto..." />;
  }

  if (!product) return null;

  const images = [product.mainImageUrl, ...(product.secondaryImages ?? [])];

  return (
    <main>
      <Toaster />
      <BackgroundImage
        src="/image/organic2.jpg"
        alt="Textura de fundo"
        opacity={10}
      />

      <div className="flex items-center justify-between">
        {/* BACK */}
        <button
          onClick={() => router.push("/admin/products")}
          className="flex items-center gap-1 text-sm text-gray-700 hover:text-[#a35c42] mb-4 z-10 cursor-pointer"
        >
          <ArrowBigLeft size={18} />
          Produtos
        </button>
        {/* ACTIONS */}
        <div className="flex items-center justify-end gap-2 pt-4">
          {/* TOGGLE */}
          <button
            onClick={() => handleToggle(product)}
            title={product.isActive ? "Desativar produto" : "Ativar produto"}
            className={`inline-flex items-center gap-2 p-0 rounded-xl text-sm font-medium transition cursor-pointer ${
              product.isActive
                ? "text-green-700 hover:text-red-700"
                : "text-red-700 hover:text-green-700"
            }`}
          >
            <BsToggleOn
              size={30}
              className={`${
                product.isActive
                  ? "hover:rotate-180"
                  : "rotate-180 hover:rotate-0"
              }`}
            />
          </button>
          {/* EDIT */}
          <button
            onClick={() => {
              setEditingProduct(product);
              setIsModalOpen(true);
            }}
            title="Editar produto"
            className="inline-flex cursor-pointer items-center gap-2 p-2 rounded-full text-sm font-medium text-gray-600 hover:text-[#a35c42] transition"
          >
            <Pencil size={25} />
          </button>
          {/* VIEW */}
          <Link
            href={`/produtos/detalhe/${product.slug}`}
            target="_blank"
            className="inline-flex"
          >
            <LuScreenShare
              title="Ver no site"
              size={25}
              className="text-gray-600 hover:text-[#a35c42]"
            />
          </Link>
        </div>
      </div>

      {/* CARD */}
      <section className="rounded-2xl z-20 flex flex-col gap-6">
        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* IMAGES */}
          <div className="flex flex-col gap-4 w-full lg:w-[440px]">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
              {selectedImage && (
                <>
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {selectedImage == product.mainImageUrl && (
                    <span className="absolute top-2 left-2 bg-[#a35c42] text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                      Principal
                    </span>
                  )}
                </>
              )}
            </div>

            <div
              className={`flex gap-2 flex-wrap justify-${
                images.length > 4 ? "between" : "start"
              }`}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img as string)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden  ${
                    selectedImage === img
                      ? "outline-2 outline-[#a35c42] outline-offset-4"
                      : ""
                  }`}
                >
                  <Image
                    src={img || "/image/placeholder.jpg"}
                    alt={`Imagem ${i + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full cursor-pointer"
                  />
                  {img === product.mainImageUrl && (
                    <span className="absolute top-1 left-1 bg-[#a35c42] text-white p-1 rounded-full text-xs font-semibold shadow-md">
                      <FaStar />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="flex-1 flex flex-col gap-2">
            {/* HEADER */}
            <div>
              <h1 className="text-2xl font-bold text-[#a35c42]">
                {product.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.slug}</p>
              <div className="flex items-center gap-2 my-3">
                <span className="bg-[#a35c42] text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                  {product.category?.name || "Sem categoria"}
                </span>
                <StatusBadge active={product.isActive} />
                {product.isFeatured && (
                  <span className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Destaque
                  </span>
                )}
              </div>
              <p className="text-2xl font-semibold">
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

            <div>
              <p className="font-bold">Resumo:</p>
              <div
                className="prose prose-sm max-w-none text-gray-800"
                dangerouslySetInnerHTML={{
                  __html: product.shortDescription || "",
                }}
              />
            </div>

            <div>
              <p className="font-bold">Descrição:</p>
              <div
                className="prose prose-sm max-w-none text-gray-800"
                dangerouslySetInnerHTML={{
                  __html: product.longDescription || "",
                }}
              />
            </div>

            <div>
              <p className="font-bold">Material:</p>
              <p className="text-gray-800">
                {product.material || "Não informado"}
              </p>
            </div>

            <div>
              <p className="font-bold">Dimensões:</p>
              <p className="text-gray-800">
                {product.dimensions || "Não informado"}
              </p>
            </div>

            {/* COLORS */}
            {product.colors && product.colors?.length > 0 && (
              <div>
                <p className="font-bold mb-1">Cores:</p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-full bg-gray-600 text-sm text-gray-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <ProductFormModal
        open={isModalOpen}
        loading={saving}
        categories={categories}
        initialData={editingProduct}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmitProduct}
      />
    </main>
  );
}
