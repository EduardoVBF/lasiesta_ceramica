"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const menuItems = [
  { label: "Início", href: "/admin", icon: "🏠" },
  { label: "Planos & Aulas", href: "/admin/plans", icon: "🪔" },
  { label: "Categorias", href: "/admin/categories", icon: "🏷️" },
  { label: "Produtos", href: "/admin/products", icon: "🏺" },
  { label: "Banners", href: "/admin/banners", icon: "🖼️" },
  { label: "Carrossel", href: "/admin/carousel", icon: "🎠" },
  { label: "Usuários", href: "/admin/users", icon: "👥" },
];

export default function AdminSidebar() {
  const { status, data: session } = useSession();
  const pathname = usePathname();

  if (status !== "authenticated") return null;
  if (pathname === "/admin") return null;

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white/30 backdrop-blur border-r border-gray-100 shadow-sm flex flex-col px-4 py-6 z-20">
      {/* HEADER */}
      <div className="mb-6 px-2">
        <h2 className="text-2xl font-semibold text-[#a35c42]">
          LaSiesta · Admin
        </h2>

        <div className="mt-2">
          <p className="text-sm font-medium text-gray-800">
            {session.user?.firstName} {session.user?.lastName}
          </p>
          <p className="text-xs text-gray-500">{session.user?.email}</p>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center px-4 py-3 rounded-2xl text-sm font-medium transition ${
                isActive
                  ? "bg-[#a35c42]/10 text-[#a35c42]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-[#a35c42]" />
              )}

              {item.icon && <span className="mr-2 text-lg">{item.icon}</span>}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER / LOGOUT */}
      <div className="mt-auto pt-2 border-t-2 border-gray-300">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full text-center cursor-pointer px-4 py-3 rounded-2xl text-sm text-gray-500 hover:text-[#a35c42] hover:bg-gray-100 transition"
        >
          <LogOut size={16} className="inline mr-2" />
          Sair
        </button>
      </div>
    </aside>
  );
}
