"use client";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateCategoryStatusMutation,
} from "../../../../hooks/mutations/useCategoryMutations";
import CategoriesTableSkeleton from "@/components/skeletons/categoriesTableSkeleton";
import { useAdminCategories } from "../../../../hooks/queries/useAdminCategories";
import CategoryFormModal from "@/components/admin/CategoryFormModal";
import { Category } from "../../../../services/categories.service";
import BackgroundImage from "@/components/layout/backgroundImage";
import ColoredTextBox from "@/components/ui/coloredTextBox";
import CategoryRow from "@/components/admin/categoryRow";
import BrownButton from "@/components/ui/brownButtom";
import toast, { Toaster } from "react-hot-toast";
import { Info } from "lucide-react";
import { AxiosError } from "axios";
import { useState } from "react";

export default function AdminCategoriesPage() {
  const createCategoryMutation = useCreateCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();
  const updateCategoryStatusMutation = useUpdateCategoryStatusMutation();
  const categoriesQuery = useAdminCategories();

  const categories = categoriesQuery.data ?? [];
  const loading = categoriesQuery.isLoading;
  const categoriesError = categoriesQuery.isError;

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showInactive, setShowInactive] = useState(true);
  const [infoVisible, setInfoVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeCategories = categories
    .filter((c) => c.isActive)
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  const inactiveCategories = categories
    .filter((c) => !c.isActive)
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  const savingCategory =
    createCategoryMutation.isPending || updateCategoryMutation.isPending;
  const togglingCategoryId = updateCategoryStatusMutation.variables?.id;

  return (
    <>
      <div className="flex flex-col">
        {/* BACKGROUND */}
        <BackgroundImage
          src="/image/organic3.jpg"
          alt="Textura de fundo do ateliê"
          opacity={20}
        />
        <Toaster position="top-center" />
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6 z-10">
          <div>
            <h2 className="text-4xl font-normal text-[#a35c42]">Categorias</h2>
            <div className="flex items-center mt-2 gap-1">
              <p className="text-gray-600 max-w-xl">
                Gerencie as categorias que organizam os produtos do ateliê.
              </p>
              <Info
                size={20}
                className={`cursor-pointer ${
                  infoVisible
                    ? "text-blue-500 hover:text-gray-500"
                    : "text-gray-500 hover:text-blue-500"
                }`}
                onClick={() => setInfoVisible((prev) => !prev)}
              />
            </div>
          </div>

          <BrownButton
            text="+ Nova categoria"
            maxWidth="max-w-fit"
            onClick={() => setIsModalOpen(true)}
          ></BrownButton>
        </header>

        {infoVisible && (
          <ColoredTextBox type="info" className="mb-3 z-10">
            <ul className="list-disc pl-4 text-sm space-y-1">
              <li>Categorias ajudam a organizar os produtos em grupos.</li>
              <li>
                Categorias ativas aparecem na loja, inativas ficam ocultas.
              </li>
              <li>Categorias em destaque são exibidas na página inicial.</li>
              <li>
                Use idealmente de 3 a 5 categorias em destaque para melhor
                visualização.
              </li>
              <li>
                A imagem das categorias é a imagem padrão para a categoria e
                será mostrada no destque da página inicial.
              </li>
            </ul>
          </ColoredTextBox>
        )}

        {categoriesError ? (
          <div className="flex justify-center items-center z-10 min-h-[500px]">
            <p className="text-red-500">
              Não foi possível carregar as categorias.
            </p>
          </div>
        ) : loading ? (
          <CategoriesTableSkeleton />
        ) : (
          <>
            {/* TOGGLE INATIVAS */}
            {inactiveCategories.length > 0 && (
              <div className="flex justify-end mb-2 cursor-pointer z-10">
                <button
                  onClick={() => setShowInactive((prev) => !prev)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-800 transition cursor-pointer"
                >
                  {showInactive
                    ? "Ocultar categorias inativas"
                    : "Mostrar categorias inativas"}
                </button>
              </div>
            )}
            <section className="bg-white/70 rounded-2xl border border-gray-100 shadow-sm overflow-hidden z-10">
              <table className="w-full text-sm">
                <thead className="bg-[#a35c42]">
                  <tr>
                    <th className="text-left px-6 py-4 font-medium text-white">
                      NOME
                    </th>
                    <th className="text-left px-6 py-4 font-medium text-white">
                      IMAGEM
                    </th>
                    <th className="text-left px-6 py-4 font-medium text-white">
                      SLUG
                    </th>
                    <th className="text-left px-6 py-4 font-medium text-white">
                      STATUS
                    </th>
                    <th className="text-left px-6 py-4 font-medium text-white">
                      DESTAQUE
                    </th>
                    <th className="text-right px-6 py-4 font-medium text-white">
                      AÇÕES
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-400">
                  {/* ATIVAS */}
                  {activeCategories.map((category) => (
                    <CategoryRow
                      key={category.id}
                      category={category}
                      isToggling={
                        updateCategoryStatusMutation.isPending &&
                        togglingCategoryId === category.id
                      }
                      onEdit={() => {
                        setEditingCategory(category);
                        setIsModalOpen(true);
                      }}
                      onToggle={() => {
                        updateCategoryStatusMutation.mutate(
                          {
                            id: category.id,
                            isActive: !category.isActive,
                          },
                          {
                            onSuccess: (updated) => {
                              toast.success(
                                `Categoria ${
                                  updated.isActive ? "ativada" : "desativada"
                                } com sucesso!`,
                              );
                            },
                            onError: (err) => {
                              if (err instanceof AxiosError) {
                                toast.error(
                                  err.response?.data?.error ||
                                    err.response?.data?.message ||
                                    err.message,
                                );
                                return;
                              }

                              toast.error(
                                "Erro inesperado ao salvar categoria",
                              );
                            },
                          },
                        );
                      }}
                    />
                  ))}

                  {/* INATIVAS */}
                  {showInactive && inactiveCategories.length > 0 && (
                    <tr className="bg-gray-200/70">
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-xs uppercase tracking-wide text-gray-500 divide-none"
                      >
                        Categorias inativas
                      </td>
                    </tr>
                  )}

                  {showInactive &&
                    inactiveCategories.map((category) => (
                      <CategoryRow
                        key={category.id}
                        category={category}
                        isToggling={
                          updateCategoryStatusMutation.isPending &&
                          togglingCategoryId === category.id
                        }
                        onEdit={() => {
                          setEditingCategory(category);
                          setIsModalOpen(true);
                        }}
                        onToggle={() => {
                          updateCategoryStatusMutation.mutate({
                            id: category.id,
                            isActive: !category.isActive,
                          });
                        }}
                      />
                    ))}

                  {/* EMPTY STATE */}
                  {categories.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-16 text-center">
                        <p className="text-gray-500 text-xl mb-4">
                          Nenhuma categoria cadastrada ainda
                        </p>
                        <BrownButton
                          text="Criar primeira categoria"
                          maxWidth="max-w-fit"
                          onClick={() => setIsModalOpen(true)}
                        ></BrownButton>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* MODAL */}
        <CategoryFormModal
          open={isModalOpen}
          loading={savingCategory}
          initialData={
            editingCategory
              ? {
                  name: editingCategory.name,
                  slug: editingCategory.slug,
                  isActive: editingCategory.isActive,
                  imageUrl: editingCategory.imageUrl,
                  isFeatured: editingCategory.isFeatured,
                  imageBase64: undefined,
                }
              : null
          }
          onClose={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
          onSubmit={async (data) => {
            if (editingCategory) {
              await updateCategoryMutation.mutateAsync({
                id: editingCategory.id,
                data,
              });

              setIsModalOpen(false);
              setEditingCategory(null);
              toast.success("Categoria atualizada com sucesso!");
            } else {
              await createCategoryMutation.mutateAsync(data);

              setIsModalOpen(false);
              setEditingCategory(null);
              toast.success("Categoria criada com sucesso!");
            }
          }}
        />
      </div>
    </>
  );
}
