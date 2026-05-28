"use client";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
} from "../../../../hooks/mutations/useProductMutations";
import {
  Product,
  ProductFormData,
} from "../../../../services/products.service";
import AdminProductsPageSkeleton from "@/components/skeletons/adminProductsPageSkeleton";
import AdminProductsGridSkeleton from "@/components/skeletons/adminProductsGridSkeleton";
import { useAdminCategories } from "../../../../hooks/queries/useAdminCategories";
import { useAdminProducts } from "../../../../hooks/queries/useAdminProducts";
import { Category } from "../../../../services/categories.service";
import ProductFormModal from "@/components/admin/productFormModal";
import AdminProductCard from "@/components/admin/adminProductCard";
import BackgroundImage from "@/components/layout/backgroundImage";
import ColoredTextBox from "@/components/ui/coloredTextBox";
import Pagination from "@/components/ui/paginationComp";
import SearchInput from "@/components/ui/searchInput";
import BrownButton from "@/components/ui/brownButtom";
import toast, { Toaster } from "react-hot-toast";
import { Info } from "lucide-react";
import { AxiosError } from "axios";
import { useState } from "react";

export default function AdminProductsPage() {
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // QUERIES
  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useAdminProducts({
    search,
    page,
    limit,
    categoryFilter,
  });

  const { data: categories = [], isLoading: loadingCategories } =
    useAdminCategories();

  // MUTATIONS
  const createMutation = useCreateProductMutation();
  const updateMutation = useUpdateProductMutation();
  const toggleMutation = useUpdateProductStatusMutation();
  const totalPages = productsData?.totalPages ?? 1;
  const products = productsData?.items ?? [];

  async function handleToggle(product: Product) {
    try {
      await toggleMutation.mutateAsync({
        id: product.id,
        isActive: !product.isActive,
      });

      toast.success(
        `Produto ${!product.isActive ? "ativado" : "desativado"} com sucesso!`,
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || err.message);
      } else {
        toast.error("Erro inesperado");
      }
    }
  }

  async function handleSubmitProduct(data: ProductFormData) {
    try {
      if (editingProduct) {
        await updateMutation.mutateAsync({
          id: editingProduct.id,
          data,
        });

        toast.success("Produto atualizado com sucesso!");
      } else {
        await createMutation.mutateAsync(data);

        toast.success("Produto criado com sucesso!");
      }

      setIsModalOpen(false);

      setEditingProduct(null);
    } catch (err) {
      throw err;
    }
  }

  function handleCategoryFilter(categoryId?: string) {
    setSearch("");

    setPage(1);

    setCategoryFilter(categoryId);
  }

  const loading = isLoading || loadingCategories;

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
        <AdminProductsPageSkeleton />
      ) : (
        <section className="grid grid-cols-1 gap-4 z-10">
          {/* FILTRO DE CATEGORIAS */}
          <div className="flex gap-2 flex-wrap z-10">
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

            <button
              onClick={() => handleCategoryFilter("promo")}
              className={`px-4 py-1 rounded-full text-sm ${
                categoryFilter === "promo"
                  ? "bg-[#a35c42] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Promoção
            </button>

            {categories.map((cat: Category) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryFilter(cat.id)}
                className={`relative px-4 py-1 rounded-full text-sm ${
                  categoryFilter === cat.id
                    ? "bg-[#a35c42] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {!cat.isActive && (
                  <div className="absolute rounded-full w-2 h-2 top-0 right-0 bg-red-500"></div>
                )}

                <p>{cat.name}</p>
              </button>
            ))}
          </div>

          {categories.find(
            (cat: Category) => cat.id === categoryFilter && !cat.isActive,
          ) && (
            <ColoredTextBox type="warning" className="z-10">
              ⚠ Esta categoria está inativa. Os produtos nela não aparecerão no
              site.
            </ColoredTextBox>
          )}

          {/* SEARCH */}
          <div className="z-10">
            <SearchInput
              value={search}
              placeholder="Buscar produtos..."
              onChange={setSearch}
              onClear={() => setSearch("")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {isFetching ? (
              <AdminProductsGridSkeleton />
            ) : (
              <>
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
              </>
            )}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />

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
        loading={createMutation.isPending || updateMutation.isPending}
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
