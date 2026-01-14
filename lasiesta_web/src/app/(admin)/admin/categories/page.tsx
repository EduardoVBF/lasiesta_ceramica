"use client";

import {
  getAdminCategories,
  createCategory,
  updateCategoryStatus,
  updateCategory,
  Category,
} from "../../../../services/categories.service";
import CategoryFormModal from "@/components/admin/CategoryFormModal";
import BackgroundImage from "@/components/layout/backgroundImage";
import CategoryRow from "@/components/admin/categoryRow";
import BrownButton from "@/components/ui/brownButtom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import ColoredTextBox from "@/components/ui/coloredTextBox";

export default function AdminCategoriesPage() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showInactive, setShowInactive] = useState(true);
  const [infoVisible, setInfoVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  const activeCategories = categories
    .filter((c) => c.isActive)
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  const inactiveCategories = categories
    .filter((c) => !c.isActive)
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  useEffect(() => {
    getAdminCategories()
      .then(setCategories)
      .catch((err) =>
        toast.error(
          `Erro ao carregar categorias: ${
            err.response?.data?.error || err.message
          }`
        )
      )
      .finally(() => setLoading(false));
  }, [isModalOpen]);

  if (loading) {
    return <p className="text-gray-500">Carregando categorias...</p>;
  }

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
          <ColoredTextBox type="info" className="mb-3">
            <ul className="list-disc pl-4 text-sm space-y-1">
              <li>Categorias ajudam a organizar os produtos em grupos.</li>
              <li>
                Categorias ativas aparecem na loja, inativas ficam ocultas.
              </li>
              <li>Categorias em destaque são exibidas na página inicial.</li>
              <li>
                A imagem das categorias é a imagem padrão para a categoria e
                será mostrada no destque da página inicial.
              </li>
            </ul>
          </ColoredTextBox>
        )}

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

        {/* TABELA */}
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
                  onEdit={() => {
                    setEditingCategory(category);
                    setIsModalOpen(true);
                  }}
                  onToggle={async () => {
                    try {
                      const updated = await updateCategoryStatus(
                        category.id,
                        !category.isActive
                      );

                      setCategories((prev) =>
                        prev.map((c) => (c.id === category.id ? updated : c))
                      );

                      toast.success(
                        `Categoria ${
                          updated.isActive ? "ativada" : "desativada"
                        } com sucesso!`
                      );
                    } catch (err: any) {
                      toast.error(
                        `Erro ao atualizar status: ${
                          err.response?.data?.error || err.message
                        }`
                      );
                    }
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
                    onEdit={() => {
                      setEditingCategory(category);
                      setIsModalOpen(true);
                    }}
                    onToggle={async () => {
                      try {
                        const updated = await updateCategoryStatus(
                          category.id,
                          !category.isActive
                        );

                        setCategories((prev) =>
                          prev.map((c) => (c.id === category.id ? updated : c))
                        );

                        toast.success(
                          `Categoria ${
                            updated.isActive ? "ativada" : "desativada"
                          } com sucesso!`
                        );
                      } catch (err: any) {
                        toast.error(
                          `Erro ao atualizar status: ${
                            err.response?.data?.error || err.message
                          }`
                        );
                      }
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

        {/* MODAL */}
        <CategoryFormModal
          open={isModalOpen}
          loading={creating}
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
            try {
              setCreating(true);

              if (editingCategory) {
                const updated = await updateCategory(editingCategory.id, data);

                setCategories((prev) =>
                  prev.map((c) => (c.id === updated.id ? updated : c))
                );
              } else {
                const created = await createCategory(data);
                setCategories((prev) => [created, ...prev]);
              }

              setIsModalOpen(false);
              setEditingCategory(null);

              toast.success(
                `Categoria ${
                  editingCategory ? "atualizada" : "criada"
                } com sucesso!`
              );
            } catch (err: any) {
              toast.error(
                `Erro ao ${
                  editingCategory ? "atualizar" : "criar"
                } categoria: ${err.response?.data?.error || err.message}`
              );
            } finally {
              setCreating(false);
            }
          }}
        />
      </div>
    </>
  );
}
