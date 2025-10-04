"use client";
import { House, Amphora, ScrollText, LibraryBig } from "lucide-react";
import { GiFireBowl } from "react-icons/gi";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full flex justify-between items-center bg-bege-claro px-6">
      <Image src="/image/lasiesta_icon.png" alt="Logo" width={60} height={60} />
      <div className="flex items-center justify-around px-4 py-3 space-x-4 h-fit">
        <Link href="/">
          <div
            className={`flex pb-1 items-center space-x-1 cursor-pointer hover:scale-105 transition-all ${
              isActive("/")
                ? "border-b-2 border-marrom-avermelhado bg-bege-escuro text-marrom-avermelhado"
                : "text-marrom-avermelhado"
            }`}
          >
            <House size={24} className="" />
            <p className="text-sm font-bold">Início</p>
          </div>
        </Link>
        <Link href="/classes">
          <div
            className={`flex pb-1 items-center space-x-1 cursor-pointer hover:scale-105 transition-all ${
              isActive("/classes")
                ? "border-b-2 border-marrom-avermelhado bg-bege-escuro text-marrom-avermelhado"
                : "text-marrom-avermelhado"
            }`}
          >
            <LibraryBig size={24} className="" />
            <p className="text-sm font-bold">Aulas</p>
          </div>
        </Link>
        <Link href="/products">
          <div
            className={`flex pb-1 items-center space-x-1 cursor-pointer hover:scale-105 transition-all ${
              isActive("/products")
                ? "border-b-2 border-marrom-avermelhado bg-bege-escuro text-marrom-avermelhado"
                : "text-marrom-avermelhado"
            }`}
          >
            <Amphora size={24} className="" />
            <p className="text-sm font-bold">Produtos</p>
          </div>
        </Link>
        <Link href="/studio">
          <div
            className={`flex pb-1 items-center space-x-1 cursor-pointer hover:scale-105 transition-all ${
              isActive("/studio")
                ? "border-b-2 border-marrom-avermelhado bg-bege-escuro text-marrom-avermelhado"
                : "text-marrom-avermelhado"
            }`}
          >
            <GiFireBowl size={24} className="" />
            <p className="text-sm font-bold">O ateliê</p>
          </div>
        </Link>
        <Link href="/about">
          <div
            className={`flex pb-1 items-center space-x-1 cursor-pointer hover:scale-105 transition-all ${
              isActive("/about")
                ? "border-b-2 border-marrom-avermelhado bg-bege-escuro text-marrom-avermelhado"
                : "text-marrom-avermelhado"
            }`}
          >
            <ScrollText size={24} className="" />
            <p className="text-sm font-bold">A ceramista</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
