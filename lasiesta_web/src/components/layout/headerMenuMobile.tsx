"use client";
import { House, Amphora, LibraryBig, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { GiFireBowl } from "react-icons/gi";
import Link from "next/link";
import React from "react";

const navLinks = [
  { href: "/", label: "Início", Icon: House },
  { href: "/classes", label: "Aulas", Icon: LibraryBig },
  { href: "/products", label: "Produtos", Icon: Amphora },
  { href: "/studio", label: "O ateliê", Icon: GiFireBowl },
];

export default function HeaderMenuMobile({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div
      className="
        fixed top-0 right-0 
        h-full 
        max-w-[320px] w-[50vw] sm:w-[50vw]
        bg-marrom-claro 
        rounded-l-xl
        z-[1000] 
        flex flex-col 
        shadow-2xl 
        overflow-y-auto
        animate-slideIn
      "
    >
      {/* Botão de fechar */}
      <button
        onClick={onClose}
        aria-label="Fechar menu"
        className="absolute top-4 right-4 text-marrom-avermelhado transition-colors"
      >
        <X size={28} />
      </button>

      {/* Título */}
      <div className="pt-12 pb-2 border-b-2 border-marrom-avermelhado text-center text-marrom-avermelhado text-lg font-semibold">
        <h1>Lasiesta Cerâmica</h1>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col items-start w-full mt-6 text-base">
        {navLinks.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={`flex justify-end transition-colors w-full py-2 items-center ${
              isActive(href)
                ? "text-marrom-avermelhado bg-white/50"
                : "text-gray-500 hover:text-marrom-avermelhado"
            }`}
          >
            <div className="flex items-center gap-1 px-4">
              <Icon />
              {label}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
