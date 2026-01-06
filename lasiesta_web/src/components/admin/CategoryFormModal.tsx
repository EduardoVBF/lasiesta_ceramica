"use client";
import { useEffect, useState } from "react";

type CategoryFormData = {
  name: string;
  slug: string;
  isActive: boolean;
};

type Props = {
  open: boolean;
  loading: boolean;
  initialData?: CategoryFormData | null;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => void;
};

export default function CategoryFormModal({
  open,
  loading,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [isActive, setIsActive] = useState(true);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  // gerar slug automaticamente
  useEffect(() => {
    setSlug(
      name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    );
  }, [name]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
      setIsActive(initialData.isActive);
    } else {
      setName("");
      setSlug("");
      setIsActive(true);
    }
  }, [initialData, open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ name, slug, isActive });
    // handleClose();
  }

  function handleClose() {
    setName("");
    setSlug("");
    setIsActive(true);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-md p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {initialData ? "Editar categoria" : "Nova categoria"}
        </h2>

        <p className="text-gray-600 mb-6">
          {initialData
            ? "Edite os detalhes da categoria."
            : "Crie uma nova categoria para organizar os produtos."}
        </p>

        {loading ? (
          <p className="text-gray-500">Salvando categoria...</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Copos"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a35c42]"
                required
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="ex: copos"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a35c42]"
                required
                disabled
              />
            </div>

            <div className="flex items-center justify-start gap-x-2 pt-2">
              <span className="text-sm font-medium text-gray-700">
                Categoria ativa
              </span>

              <button
                type="button"
                onClick={() => setIsActive((prev) => !prev)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  isActive ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                    isActive ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-medium text-white transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#a35c42] hover:bg-[#8f4f38]"
                }`}
              >
                {loading
                  ? "Salvando..."
                  : initialData
                  ? "Salvar alterações"
                  : "Salvar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
