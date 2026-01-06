"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Enquanto carrega ou redireciona
  if (status !== "authenticated") return null;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      {pathname && pathname !== "/admin" && (
        <aside className="w-64 bg-gray-300 text-[#994121be] py-6 px-3 flex flex-col border-r-2 border-[#994121be] shadow-lg shadow-gray-400/50">
          <div>
            <div className="px-3 mb-4 py-2 border-b-2 border-[#994121be]">
              <h1 className="text-2xl font-bold mb-2">Lasiesta Admin</h1>
              <p className="text-sm opacity-80">{session.user?.firstName} {session.user?.lastName}</p>
              <p className="text-xs opacity-80">{session.user?.email}</p>
            </div>

            <nav className="flex flex-col">
              <a href="/admin" className="hover:underline py-2 pr-1 pl-3 hover:rounded-xl hover:bg-white/40">
                Home
              </a>
              <a href="/admin/plans" className="hover:underline py-2 pr-1 pl-3 hover:rounded-xl hover:bg-white/40">
                Planos & Aulas
              </a>
              <a href="/admin/categories" className="hover:underline py-2 pr-1 pl-3 hover:rounded-xl hover:bg-white/40">
                Categorias
              </a>
              <a href="/admin/products" className="hover:underline py-2 pr-1 pl-3 hover:rounded-xl hover:bg-white/40">
                Produtos
              </a>
            </nav>
          </div>

          {/* LOGOUT */}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-auto text-sm text-[#994121be] hover:text-[#a35c42] border-t-2 border-[#994121be] pt-4 cursor-pointer"
          >
            Sair
          </button>
        </aside>
      )}

      {/* CONTEÚDO */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
