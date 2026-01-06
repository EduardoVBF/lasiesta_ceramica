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
        <aside className="w-64 bg-[#994121be] text-white p-6 flex flex-col">
          <div>
            <h1 className="text-2xl font-bold mb-1">Lasiesta Admin</h1>
            <p className="text-sm opacity-80 mb-0">{session.user?.firstName} {session.user?.lastName}</p>
            <p className="text-xs opacity-80 mb-8">{session.user?.email}</p>

            <nav className="flex flex-col gap-4">
              <a href="/admin" className="hover:underline">
                Dashboard
              </a>
              <a href="/admin/plans" className="hover:underline">
                Planos
              </a>
              <a href="/admin/categories" className="hover:underline">
                Categorias
              </a>
              <a href="/admin/products" className="hover:underline">
                Produtos
              </a>
            </nav>
          </div>

          {/* LOGOUT */}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-auto text-sm text-white/90 hover:text-white border-t-2 border-white/50 pt-4 cursor-pointer"
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
