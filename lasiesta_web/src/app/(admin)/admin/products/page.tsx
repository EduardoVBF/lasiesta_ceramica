"use client";
import {
  getAdminProducts,
  Product,
  updateProductStatus,
  createProduct,
  updateProduct,
  ProductFormData,
} from "../../../../services/products.service";
import {
  Category,
  getAdminCategories,
} from "../../../../services/categories.service";
import ProductFormModal from "@/components/admin/productFormModal";
import AdminProductCard from "@/components/admin/adminProductCard";
import BackgroundImage from "@/components/layout/backgroundImage";
import ColoredTextBox from "@/components/ui/coloredTextBox";
import BrownButton from "@/components/ui/brownButtom";
import LoaderComp from "@/components/ui/loaderComp";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Info } from "lucide-react";
import { AxiosError } from "axios";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toggleLoading, setToggleLoading] = useState(false);

  useEffect(() => {
    if (toggleLoading) return;

    Promise.all([getAdminProducts(), getAdminCategories()])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.items);
        setCategories(categoriesRes);
      })
      .catch((err) => toast.error(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, [isModalOpen, toggleLoading]);

  async function handleToggle(product: Product) {
    try {
      setToggleLoading(true);
      const updated = await updateProductStatus(product.id, !product.isActive);

      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );

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

  async function handleSubmitProduct(data: ProductFormData) {
    try {
      setSaving(true);

      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, data);

        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );

        toast.success("Produto atualizado com sucesso!");
      } else {
        const created = await createProduct(data);

        setProducts((prev) => [created, ...prev]);

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

  async function handleCategoryFilter(categoryId?: string) {
    setLoading(true);
    setCategoryFilter(categoryId);

    try {
      if (categoryId === "featured") {
        const res = await getAdminProducts({
        });
        const featuredRes = res.items.filter((item: Product) => item.isFeatured);
        setProducts(featuredRes);
        return;
      } else {
        const res = await getAdminProducts({
          categoryId,
        });
        setProducts(res.items);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col">
      <BackgroundImage
        src="/image/organic3.jpg"
        alt="Textura de fundo do ateliê"
        opacity={20}
      />

      <Toaster position="top-center" />

      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6 z-10">
        <div>
          <h2 className="text-4xl font-normal text-[#a35c42]">Produtos</h2>
          <div className="flex items-center mt-2 gap-1">
            <p className="text-gray-600 max-w-xl">
              Gerencie os produtos do catálogo.
            </p>
            <Info
              size={20}
              className={`cursor-pointer ${
                infoVisible ? "text-blue-500" : "text-gray-500"
              }`}
              onClick={() => setInfoVisible((p) => !p)}
            />
          </div>
        </div>

        <BrownButton
          text="+ Novo produto"
          maxWidth="max-w-fit"
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
        />
      </header>

      {infoVisible && (
        <ColoredTextBox type="info" className="mb-3 z-10">
          <ul className="list-disc pl-4 text-sm space-y-1">
            <li>Produtos ativos aparecem no site.</li>
            <li>Você pode criar e editar produtos.</li>
            <li>Produtos em destaque podem aparecer na home.</li>
          </ul>
        </ColoredTextBox>
      )}

      {loading ? (
        <div className="flex justify-center items-center z-10">
          <LoaderComp text="Carregando produtos..." />
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 z-10">
          {/* FILTRO DE CATEGORIAS */}
          <div className="flex gap-2 flex-wrap mb-4 z-10">
            <button
              onClick={() => handleCategoryFilter(undefined)}
              className={`px-4 py-1 rounded-full text-sm ${
                !categoryFilter
                  ? "bg-[#a35c42] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Todas
            </button>

            <button
              onClick={() => handleCategoryFilter("featured")}
              className={`px-4 py-1 rounded-full text-sm ${
                categoryFilter === "featured"
                  ? "bg-[#a35c42] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Destaque
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryFilter(cat.id)}
                className={`px-4 py-1 rounded-full text-sm ${
                  categoryFilter === cat.id
                    ? "bg-[#a35c42] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <AdminProductCard
                key={product.id}
                product={product}
                onEdit={() => {
                  setEditingProduct(product);
                  setIsModalOpen(true);
                }}
                onToggle={() => handleToggle(product)}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              Nenhum produto encontrado
            </div>
          )}
        </section>
      )}

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
    </div>
  );
}
