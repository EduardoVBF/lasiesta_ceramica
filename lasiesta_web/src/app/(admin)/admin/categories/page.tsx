"use client";
import {
  getAdminCategories,
  createCategory,
  updateCategoryStatus,
  updateCategory,
  Category,
} from "../../../../services/categories.service";
import CategoryFormModal from "@/components/admin/CategoryFormModal";
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
      .catch((err) => {
        console.error("Erro ao buscar categorias:", err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Carregando categorias...</p>;
  }

  return (
    <div className="flex flex-col">
      {/* HEADER */}
      <header className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Categorias</h1>
          <p className="text-gray-600 mt-2 max-w-xl">
            Gerencie as categorias que organizam os produtos do ateliê.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#a35c42] hover:bg-[#8f4f38] text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Nova categoria
        </button>
      </header>

      {inactiveCategories.length > 0 && (
        <div className="flex w-full justify-end mb-1">
          <button
            onClick={() => setShowInactive((prev) => !prev)}
            className="text-sm font-medium text-gray-600 hover:underline"
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
            {activeCategories.map((category) => (
              <tr
                key={category.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-bold text-gray-800">
                  {category.name}
                </td>

                <td className="px-6 py-4 text-gray-500">{category.slug}</td>

                <td className="px-6 py-4">
                  <StatusBadge active={category.isActive} />
                </td>

                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setIsModalOpen(true);
                    }}
                    className="text-[#a35c42] font-medium hover:underline mr-4"
                  >
                    Editar
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        const updated = await updateCategoryStatus(
                          category.id,
                          !category.isActive
                        );

                        setCategories((prev) =>
                          prev.map((c) => (c.id === category.id ? updated : c))
                        );
                      } catch (err: any) {
                        console.error("Erro ao atualizar status:", err.message);
                      }
                    }}
                    className={`font-medium hover:underline ${
                      category.isActive ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {category.isActive ? "Desativar" : "Ativar"}
                  </button>
                </td>
              </tr>
            ))}

            {showInactive && inactiveCategories.length > 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-sm text-gray-500">
                  Categorias inativas
                </td>
              </tr>
            )}

            {showInactive &&
              inactiveCategories.map((category) => (
                <tr
                  key={category.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-bold text-gray-800">
                    {category.name}
                  </td>

                  <td className="px-6 py-4 text-gray-500">{category.slug}</td>

                  <td className="px-6 py-4">
                    <StatusBadge active={category.isActive} />
                  </td>

                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => {
                        setEditingCategory(category);
                        setIsModalOpen(true);
                      }}
                      className="text-[#a35c42] font-medium hover:underline mr-4"
                    >
                      Editar
                    </button>

                    <button
                      onClick={async () => {
                        try {
                          const updated = await updateCategoryStatus(
                            category.id,
                            !category.isActive
                          );

                          setCategories((prev) =>
                            prev.map((c) =>
                              c.id === category.id ? updated : c
                            )
                          );
                        } catch (err: any) {
                          console.error(
                            "Erro ao atualizar status:",
                            err.message
                          );
                        }
                      }}
                      className={`font-medium hover:underline ${
                        category.isActive ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {category.isActive ? "Desativar" : "Ativar"}
                    </button>
                  </td>
                </tr>
              ))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Nenhuma categoria cadastrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
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

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {active ? "Ativa" : "Inativa"}
    </span>
  );
}
