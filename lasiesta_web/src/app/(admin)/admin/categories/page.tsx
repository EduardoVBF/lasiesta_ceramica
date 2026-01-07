"use client";

import {
  getAdminCategories,
  createCategory,
  updateCategoryStatus,
  updateCategory,
  Category,
} from "../../../../services/categories.service";
import CategoryFormModal from "@/components/admin/CategoryFormModal";
import BrownButton from "@/components/ui/brownButtom";
import { useEffect, useState } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showInactive, setShowInactive] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const activeCategories = categories
    .filter((c) => c.isActive)
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  const inactiveCategories = categories
    .filter((c) => !c.isActive)
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  useEffect(() => {
    getAdminCategories()
      .then(setCategories)
      .catch((err) => console.error("Erro ao buscar categorias:", err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Carregando categorias...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="text-4xl font-semibold text-[#a35c42]">Categorias</h2>
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
        <div className="flex justify-end">
          <button
            onClick={() => setShowInactive((prev) => !prev)}
            className="text-sm font-medium text-gray-600 hover:text-gray-800 transition"
          >
            {showInactive
              ? "Ocultar categorias inativas"
              : "Mostrar categorias inativas"}
          </button>
        </div>
      )}

      {/* TABELA */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-4 font-medium">Nome</th>
              <th className="text-left px-6 py-4 font-medium">Slug</th>
              <th className="text-left px-6 py-4 font-medium">Status</th>
              <th className="text-right px-6 py-4 font-medium">Ações</th>
            </tr>
          </thead>

          <tbody>
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
                  const updated = await updateCategoryStatus(
                    category.id,
                    !category.isActive
                  );

                  setCategories((prev) =>
                    prev.map((c) => (c.id === category.id ? updated : c))
                  );
                }}
              />
            ))}

            {/* INATIVAS */}
            {showInactive && inactiveCategories.length > 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-xs uppercase tracking-wide text-gray-400"
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
                    const updated = await updateCategoryStatus(
                      category.id,
                      !category.isActive
                    );

                    setCategories((prev) =>
                      prev.map((c) => (c.id === category.id ? updated : c))
                    );
                  }}
                />
              ))}

            {/* EMPTY STATE */}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center">
                  <p className="text-gray-500 mb-4">
                    Nenhuma categoria cadastrada ainda
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#a35c42] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#8f4f38] transition"
                  >
                    Criar primeira categoria
                  </button>
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
          } catch (err: any) {
            console.error(err.message);
          } finally {
            setCreating(false);
          }
        }}
      />
    </div>
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
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="px-6 py-4 font-semibold text-gray-800">{category.name}</td>

      <td className="px-6 py-4 text-gray-500">{category.slug}</td>

      <td className="px-6 py-4">
        <StatusBadge active={category.isActive} />
      </td>

      <td className="px-6 py-4 text-right">
        <div className="inline-flex items-center gap-4">
          <button
            onClick={onEdit}
            className="text-sm font-medium text-gray-600 hover:text-[#a35c42] transition"
          >
            Editar
          </button>

          <button
            onClick={onToggle}
            className={`text-sm font-medium transition ${
              category.isActive
                ? "text-red-600 hover:text-red-700"
                : "text-green-600 hover:text-green-700"
            }`}
          >
            {category.isActive ? "Desativar" : "Ativar"}
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
