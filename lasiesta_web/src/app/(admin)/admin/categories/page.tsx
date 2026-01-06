'use client';

import { getAdminCategories, Category } from '../../../../services/categories.service';
import { useEffect, useState } from 'react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminCategories()
      .then(setCategories)
      .catch((err) => {
        console.error('Erro ao buscar categorias:', err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Carregando categorias...</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Categorias</h1>

        <button className="bg-[#a35c42] text-white px-4 py-2 rounded hover:bg-[#8f4f38]">
          Nova categoria
        </button>
      </div>

      <p className='mb-6'>Nesta seção, você pode gerenciar as categorias dos produtos do ateliê.</p>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Nome</th>
              <th className="text-left px-4 py-3">Slug</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Ações</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-t last:border-b"
              >
                <td className="px-4 py-3">{category.name}</td>
                <td className="px-4 py-3 text-gray-500">
                  {category.slug}
                </td>
                <td className="px-4 py-3">
                  {category.isActive ? (
                    <span className="text-green-600 font-medium">
                      Ativa
                    </span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Inativa
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-blue-600 hover:underline mr-3">
                    Editar
                  </button>
                  <button className="text-red-600 hover:underline">
                    Desativar
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  Nenhuma categoria cadastrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
