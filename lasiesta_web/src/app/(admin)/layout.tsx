'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  // Enquanto carrega ou redireciona
  if (status !== 'authenticated') return null;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#a35c42] text-white p-6 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold mb-1">LaSiesta</h2>
          <p className="text-sm opacity-80 mb-8">
            {session.user?.email}
          </p>

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
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="mt-auto text-sm text-white/90 hover:text-white border-t border-white/30 pt-4"
        >
          Sair
        </button>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
