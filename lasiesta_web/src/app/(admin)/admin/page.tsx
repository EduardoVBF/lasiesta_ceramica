"use client";
import BackgroundImage from "@/components/layout/backgroundImage";
import ActionCard from "@/components/admin/actionCard";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AdminPage() {
  const { data: session } = useSession();

  const fullName =
    session?.user?.firstName && session?.user?.lastName
      ? `${session.user.firstName} ${session.user.lastName}`
      : session?.user?.email;

  return (
    <div className="flex flex-col gap-6">
      {/* BACKGROUND */}
      <BackgroundImage
        src="/image/organic3.jpg"
        alt="Textura de fundo do ateliê"
        opacity={20}
      />

      {/* HERO */}
      <section className="relative z-10 backdrop-blur-sm bg-white rounded-3xl p-6 shadow-sm border border-white/60">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-4xl font-semibold text-[#a35c42]">
                LaSiesta · Admin
              </h2>

              <p className="text-gray-700 text-lg mt-1">
                Olá{fullName ? "," : ""}{" "}
                <span className="font-semibold">{fullName}</span>
              </p>
            </div>

            {/* SIGN OUT */}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-500 hover:text-[#a35c42] hover:bg-gray-100 transition"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>

          <p className="text-gray-600 text-lg max-w-3xl">
            Este é o painel administrativo da LaSiesta. Aqui você organiza
            produtos, categorias e planos com calma, clareza e controle.
          </p>
        </div>
      </section>

      {/* AÇÕES */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard
          title="Planos & Aulas"
          description="Gerencie workshops, aulas e planos mensais."
          href="/admin/plans"
          icon="🪔"
        />

        <ActionCard
          title="Categorias"
          description="Organize os tipos de produtos do ateliê."
          href="/admin/categories"
          icon="🏷️"
        />

        <ActionCard
          title="Produtos"
          description="Cadastre e edite peças de cerâmica."
          href="/admin/products"
          icon="🏺"
        />

        <ActionCard
          title="Banners"
          description="Gerencie os banners do site."
          href="/admin/banners"
          icon="🖼️"
        />

        <ActionCard
          title="Carrossel"
          description="Organize os itens do carrossel da página inicial."
          href="/admin/carousel"
          icon="🎠"
        />

        <ActionCard
          title="Usuários"
          description="Gerencie os usuários do sistema."
          href="/admin/users"
          icon="👥"
        />
      </section>
    </div>
  );
}
