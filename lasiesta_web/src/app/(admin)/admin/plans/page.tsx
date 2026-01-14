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
import PlanCard from "@/components/admin/adminPlanCard";
import BrownButton from "@/components/ui/brownButtom";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Info } from "lucide-react";
import ColoredTextBox from "@/components/ui/coloredTextBox";

export default function AdminPlansPage() {
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
            <div className="flex items-center mt-2 gap-1">
              <p className="text-gray-600 max-w-xl">
                Gerencie as opções de planos e aulas disponíveis para seus
                clientes.
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
            text="+ Novo plano"
            maxWidth="max-w-fit"
            onClick={() => setIsModalOpen(true)}
          />
        </header>

        {infoVisible && (
          <ColoredTextBox type="info" className="mb-3">
            <ul className="list-disc pl-4 text-sm space-y-1">
              <li>
                Planos representam as opções de assinatura ou aulas oferecidas.
              </li>
              <li>
                Planos ativos ficam disponíveis para os clientes, inativos são
                ocultos.
              </li>
              <li>Planos em destaque são promovidos na página inicial.</li>
              <li>
                Descrição curta aparece na página principal, descrição longa na
                página do plano.
              </li>
            </ul>
          </ColoredTextBox>
        )}

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
                  imageUrl: editingPlan.imageUrl ?? null,
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
