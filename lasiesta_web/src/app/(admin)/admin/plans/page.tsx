'use client';

import { useEffect, useState } from 'react';
import { getAdminPlans, Plan } from '../../../../services/plans.service';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminPlans()
      .then(setPlans)
      .catch((err) => {
        console.error('Erro ao buscar planos:', err.message);
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

        <button className="bg-[#a35c42] hover:bg-[#8f4f38] text-white px-6 py-3 rounded-xl font-medium transition">
          Novo plano
        </button>
      </header>

      {/* LISTAGEM */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}

        {plans.length === 0 && (
          <div className="text-gray-500">
            Nenhum plano cadastrado.
          </div>
        )}
      </section>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
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
              <p className="text-gray-500 mt-1">
                {plan.durationLabel}
              </p>
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
        <button className="text-[#a35c42] font-medium hover:underline">
          Editar
        </button>

        <button
          className={`text-sm font-medium ${
            plan.isActive
              ? 'text-red-600 hover:underline'
              : 'text-green-600 hover:underline'
          }`}
        >
          {plan.isActive ? 'Desativar' : 'Ativar'}
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${
        active
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {active ? 'Ativo' : 'Inativo'}
    </span>
  );
}
