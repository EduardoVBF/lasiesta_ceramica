"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminPage() {
  const { data: session } = useSession();

  const fullName =
    session?.user?.firstName && session?.user?.lastName
      ? `${session.user.firstName} ${session.user.lastName}`
      : session?.user?.email;

  return (
    <div className="flex flex-col gap-12">
      {/* HERO / BOAS-VINDAS */}
      <section className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl text-[#a35c42] font-semibold leading-tight">
            Lasiesta Cerâmica - Admin
          </h1>
          <h1 className="text-xl font-semibold text-gray-800 leading-tight">
            Olá{fullName ? "," : ""}{" "}
            <span>{fullName}</span>
          </h1>
        </div>

        <p className="text-gray-600 mt-4 max-w-full text-lg">
          Esta é a área administrativa da LaSiesta. Aqui você pode organizar
          produtos, categorias e planos de aula com calma e controle.
        </p>
      </section>

      {/* AÇÕES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ActionCard
          title="Categorias"
          description="Organize os tipos de produtos do ateliê."
          href="/admin/categories"
        />

        <ActionCard
          title="Planos & Aulas"
          description="Gerencie workshops, aulas e planos mensais."
          href="/admin/plans"
        />

        <ActionCard
          title="Produtos"
          description="Cadastre e edite peças de cerâmica."
          href="/admin/products"
        />
      </section>
    </div>
  );
}

function ActionCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl bg-white p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-[#a35c42] transition-colors">
        {title}
      </h2>

      <p className="text-gray-600 text-base leading-relaxed">{description}</p>

      <div className="mt-8 flex items-center gap-2 text-[#a35c42] font-medium">
        <span>Acessar</span>
        <span className="group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </Link>
  );
}
