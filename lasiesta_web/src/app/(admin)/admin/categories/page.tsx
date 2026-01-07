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
import BrownButton from "@/components/ui/brownButtom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { BsToggleOn } from "react-icons/bs";
import { Pencil } from "lucide-react";

export default function AdminCategoriesPage() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showInactive, setShowInactive] = useState(true);
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
            err.response.data.error || err.message
          }`
        )
      )
      .finally(() => setLoading(false));
  }, []);

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
            <p className="text-gray-600 mt-3 max-w-xl">
              Gerencie as categorias que organizam os produtos do ateliê.
            </p>
          </div>

          <BrownButton
            text="+ Nova categoria"
            maxWidth="max-w-fit"
            onClick={() => setIsModalOpen(true)}
          ></BrownButton>
        </header>

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
                  SLUG
                </th>
                <th className="text-left px-6 py-4 font-medium text-white">
                  STATUS
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
                    colSpan={4}
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

/* ---------------------------------------------
 * COMPONENTES AUXILIARES
 * --------------------------------------------- */

function CategoryRow({
  category,
  onEdit,
  onToggle,
}: {
  category: Category;
  onEdit: () => void;
  onToggle: () => void;
}) {
  return (
    <tr className="hover:bg-gray-200/60 transition">
      <td
        className="px-6 py-4 font-semibold text-gray-800"
        onClick={() => {
          toast.success(category.name);
        }}
      >
        {category.name}
      </td>

      <td className="px-6 py-4 text-gray-500">{category.slug}</td>

      <td className="px-6 py-4">
        <StatusBadge active={category.isActive} />
      </td>

      <td className="px-6 py-4 text-right">
        <div className="inline-flex items-center gap-4">
          <button
            onClick={onEdit}
            title="Editar categoria"
            className="text-sm font-medium text-gray-600 hover:text-[#a35c42] transition cursor-pointer"
          >
            <Pencil size={20} />
          </button>

          <button
            onClick={onToggle}
            title={
              category.isActive ? "Desativar categoria" : "Ativar categoria"
            }
            className={`text-sm font-medium transition cursor-pointer ${
              category.isActive
                ? "text-green-600 hover:text-red-700"
                : "text-red-600 hover:text-green-700"
            }`}
          >
            {category.isActive ? (
              <BsToggleOn size={25} className="hover:rotate-180" />
            ) : (
              <BsToggleOn size={25} className="rotate-180 hover:rotate-0" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
        active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          active ? "bg-green-600" : "bg-red-600"
        }`}
      />
      {active ? "Ativa" : "Inativa"}
    </span>
  );
}
