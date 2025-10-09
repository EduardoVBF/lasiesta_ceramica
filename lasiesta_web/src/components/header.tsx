"use client";
import { House, Amphora, LibraryBig } from "lucide-react";
import HeaderMenuMobile from "./headerMenuMobile";
import { GiFireBowl } from "react-icons/gi";
import HeaderButton from "./headerButton";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <header className="w-full flex justify-between bg-transparent px-6 ">
      <Image src="/image/lasiesta_icon.png" alt="Logo" width={60} height={60} />

      {/* Menu para dispositivos maiores */}
      <div className="hidden md:flex justify-around pb-2 gap-x-1">
        <HeaderButton pathHref="/" label="Início" Icon={House} />
        <HeaderButton pathHref="/classes" label="Aulas" Icon={LibraryBig} />
        <HeaderButton pathHref="/products" label="Produtos" Icon={Amphora} />
        <HeaderButton pathHref="/studio" label="O ateliê" Icon={GiFireBowl} />
      </div>

      {/* Botão de menu para mobile */}
      <button
        className="md:hidden z-20"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Barra lateral para mobile */}
      {isMobileMenuOpen && (
        <HeaderMenuMobile onClose={() => setMobileMenuOpen(false)} />
      )}
    </header>
  );
}
