"use client";

import { useEffect, useState } from "react";
import {
  getAdminPlans,
  Plan,
  createPlan,
  updatePlan,
  updatePlanStatus,
} from "../../../../services/plans.service";
import PlanFormModal from "@/components/admin/PlanFormModal";

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminPlans()
      .then(setPlans)
      .catch((err) => {
        console.error("Erro ao buscar planos:", err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Carregando planos...</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      {/* HEADER */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#994121be]">
            Planos & Aulas
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie workshops, aulas experimentais e planos mensais.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#a35c42] hover:bg-[#8f4f38] text-white px-6 py-3 rounded-xl font-medium"
        >
          Novo plano
        </button>
      </header>

      {/* LISTAGEM */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            setEditingPlan={setEditingPlan}
            setIsModalOpen={setIsModalOpen}
            setPlans={setPlans}
            updatePlanStatus={updatePlanStatus}
          />
        ))}

        {plans.length === 0 && (
          <div className="text-gray-500">Nenhum plano cadastrado.</div>
        )}
      </section>
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
            } else {
              const created = await createPlan(data);
              setPlans((prev) => [created, ...prev]);
            }

            setIsModalOpen(false);
            setEditingPlan(null);
          } finally {
            setSaving(false);
          }
        }}
      />
    </div>
  );
}

function PlanCard({
  plan,
  setEditingPlan,
  setIsModalOpen,
  setPlans,
  updatePlanStatus,
}: {
  plan: Plan;
  setEditingPlan: React.Dispatch<React.SetStateAction<Plan | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPlans: React.Dispatch<React.SetStateAction<Plan[]>>;
  updatePlanStatus: (id: string, isActive: boolean) => Promise<Plan>;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col justify-between">
      <div>
        {/* TOPO */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {plan.name}
            </h2>

            {plan.durationLabel && (
              <p className="text-gray-500 mt-1">{plan.durationLabel}</p>
            )}
          </div>

          <StatusBadge active={plan.isActive} />
        </div>

        {/* PREÇO */}
        {plan.price !== null && (
          <p className="mt-6 text-xl font-medium text-gray-800">
            R$ {Number(plan.price).toFixed(2)}
          </p>
        )}
      </div>

      {/* AÇÕES */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => {
            setEditingPlan(plan);
            setIsModalOpen(true);
          }}
        >
          Editar
        </button>

        <button
          onClick={async () => {
            const updated = await updatePlanStatus(plan.id, !plan.isActive);

            setPlans((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p))
            );
          }}
        >
          {plan.isActive ? "Desativar" : "Ativar"}
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${
        active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {active ? "Ativo" : "Inativo"}
    </span>
  );
}
