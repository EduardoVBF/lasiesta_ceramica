"use client";

import { useEffect, useState } from "react";
import { PlanFormData } from "../../services/plans.service";

type Props = {
  open: boolean;
  loading: boolean;
  initialData?: PlanFormData | null;
  onClose: () => void;
  onSubmit: (data: PlanFormData) => void;
};

export default function PlanFormModal({
  open,
  loading,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState<string>("");
  const [durationLabel, setDurationLabel] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
      setPrice(initialData.price !== null ? String(initialData.price) : "");
      setDurationLabel(initialData.durationLabel ?? "");
      setIsActive(initialData.isActive);
    } else {
      setName("");
      setSlug("");
      setPrice("");
      setDurationLabel("");
      setIsActive(true);
    }
  }, [initialData, open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      name,
      slug,
      price: price ? Number(price) : null,
      durationLabel: durationLabel || null,
      isActive,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl w-full max-w-lg p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {initialData ? "Editar plano" : "Novo plano"}
        </h2>

        <p className="text-gray-600 mb-6">
          {initialData
            ? "Edite as informações do plano."
            : "Crie um novo plano ou aula."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Nome</label>
            <input
              placeholder="Nome do plano"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a35c42]"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Slug</label>
            <input
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a35c42]"
              required
              disabled
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Preço</label>
            <input
              placeholder="Preço (ex: 150)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a35c42]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Duração</label>
            <input
              placeholder="Duração (ex: 4 aulas / mês)"
              value={durationLabel}
              onChange={(e) => setDurationLabel(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a35c42]"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              Plano ativo
            </span>

            <button
              type="button"
              onClick={() => setIsActive((p) => !p)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                isActive ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                  isActive ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-medium text-white ${
                loading ? "bg-gray-400" : "bg-[#a35c42] hover:bg-[#8f4f38]"
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
      </div>
    </div>
  );
}
