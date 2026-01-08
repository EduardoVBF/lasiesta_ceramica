"use client";
import {
  getAdminPlans,
  Plan,
  createPlan,
  updatePlan,
  updatePlanStatus,
} from "../../../../services/plans.service";
import BackgroundImage from "@/components/layout/backgroundImage";
import PlanFormModal from "@/components/admin/PlanFormModal";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import BrownButton from "@/components/ui/brownButtom";
import ImageZoom from "@/components/layout/ImageZoom";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsToggleOn } from "react-icons/bs";
import DOMPurify from "dompurify";

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminPlans()
      .then(setPlans)
      .catch((err) =>
        toast.error(
          `Erro ao carregar planos: ${err.response?.data?.error || err.message}`
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Carregando planos...</p>;
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
            <h2 className="text-4xl font-normal text-[#a35c42]">
              Planos & Aulas
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl">
              Gerencie workshops, aulas experimentais e planos mensais.
            </p>
          </div>

          <BrownButton
            text="+ Novo plano"
            maxWidth="max-w-fit"
            onClick={() => setIsModalOpen(true)}
          />
        </header>

        {/* LISTAGEM */}
        <section className="grid grid-cols-1 gap-6 z-10">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => {
                setEditingPlan(plan);
                setIsModalOpen(true);
              }}
              onToggle={async () => {
                try {
                  const updated = await updatePlanStatus(
                    plan.id,
                    !plan.isActive
                  );

                  setPlans((prev) =>
                    prev.map((p) => (p.id === updated.id ? updated : p))
                  );

                  toast.success(
                    `Plano ${
                      updated.isActive ? "ativado" : "desativado"
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
          {plans.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 text-xl mb-4">
                Nenhum plano cadastrado ainda
              </p>
              <BrownButton
                text="Criar primeiro plano"
                maxWidth="max-w-fit"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          )}
        </section>

        {/* MODAL */}
        <PlanFormModal
          open={isModalOpen}
          loading={saving}
          initialData={
            editingPlan
              ? {
                  name: editingPlan.name,
                  slug: editingPlan.slug,
                  price: editingPlan.price,
                  durationLabel: editingPlan.durationLabel,
                  isActive: editingPlan.isActive,
                  shortDescription: editingPlan.shortDescription ?? null,
                  longDescription: editingPlan.longDescription ?? null,
                  isFeatured: editingPlan.isFeatured ?? false,
                }
              : null
          }
          onClose={() => {
            setIsModalOpen(false);
            setEditingPlan(null);
          }}
          onSubmit={async (data) => {
            try {
              setSaving(true);

              if (editingPlan) {
                const updated = await updatePlan(editingPlan.id, data);

                setPlans((prev) =>
                  prev.map((p) => (p.id === updated.id ? updated : p))
                );

                toast.success("Plano atualizado com sucesso!");
              } else {
                const created = await createPlan(data);
                setPlans((prev) => [created, ...prev]);

                toast.success("Plano criado com sucesso!");
              }

              setIsModalOpen(false);
              setEditingPlan(null);
            } catch (err: any) {
              toast.error(
                `Erro ao salvar plano: ${
                  err.response?.data?.error || err.message
                }`
              );
            } finally {
              setSaving(false);
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

function PlanCard({
  plan,
  onEdit,
  onToggle,
}: {
  plan: Plan;
  onEdit: () => void;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative bg-white/70 backdrop-blur rounded-3xl border border-gray-100 shadow-sm px-4 py-5 transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white/80 flex justify-between">
      {/* HEADER */}
      <div className="flex flex-col gap-4 px-2 w-full">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-20 h-20 mb-2 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              {plan.imageUrl ? (
                <ImageZoom
                  src={plan.imageUrl}
                  alt={plan.name}
                  width={80}
                  zoom
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                  Sem imagem
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-semibold text-gray-800 leading-tight">
                  {plan.name}
                </h3>
                <StatusBadge active={plan.isActive} />
                {/* Destaque */}
                {plan.isFeatured && (
                  <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                    Destaque
                  </span>
                )}
              </div>

              {/* PREÇO */}
              <div className="flex items-end gap-1">
                {plan.price !== null ? (
                  <>
                    <span className="text-lg text-gray-500">R$</span>
                    <span className="text-3xl font-semibold text-gray-700">
                      {Number(plan.price).toFixed(2).replace(".", ",")}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500 text-sm italic">
                    Sob consulta
                  </span>
                )}

                {plan.durationLabel && (
                  <span className="text-lg text-gray-500 pb-1">
                    /{plan.durationLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SHORT DESCRIPTION */}
        {plan.shortDescription && (
          <div
            className="prose prose-sm max-w-none text-gray-600"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(plan.shortDescription),
            }}
          />
        )}

        {/* EXPAND */}
        <div className="flex w-full justify-start">
          <div
            onClick={() => setExpanded((prev) => !prev)}
            className="text-sm font-medium text-[#a35c42] hover:underline cursor-pointer w-fit"
          >
            {expanded ? (
              <div className="flex items-center gap-1">
                Ocultar detalhes <ChevronUp size={16} />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                Ver mais detalhes <ChevronDown size={16} />
              </div>
            )}
          </div>
        </div>

        {expanded && (
          <div className="">
            <div>
              <h4 className="text-sm text-gray-800 mb-2">
                Slug:{" "}
                <span className="font-normal text-gray-600">{plan.slug}</span>
              </h4>
            </div>
            {expanded && plan.longDescription && (
              <div className="mt-2 text-sm leading-relaxed animate-fadeIn">
                <p className="text-gray-800 font-medium mb-1">
                  Descrição longa:
                </p>

                <div
                  className="prose prose-sm max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(plan.longDescription),
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ACTION BAR */}
      <div className="flex flex-col items-center justify-start">
        {/* EDIT */}
        <button
          onClick={onEdit}
          title="Editar plano"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-[#a35c42] transition"
        >
          <Pencil size={25} />
        </button>

        {/* TOGGLE */}
        <button
          onClick={onToggle}
          title={plan.isActive ? "Desativar plano" : "Ativar plano"}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
            plan.isActive
              ? "text-green-700 hover:text-red-700"
              : "text-red-700 hover:text-green-700"
          }`}
        >
          <BsToggleOn
            size={30}
            className={`${
              plan.isActive ? "hover:rotate-180" : "rotate-180 hover:rotate-0"
            }`}
          />
        </button>
      </div>
    </div>
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
      {active ? "Ativo" : "Inativo"}
    </span>
  );
}
