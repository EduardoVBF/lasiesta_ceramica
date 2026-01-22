"use client";
import { House, Amphora, LibraryBig } from "lucide-react";
import HeaderMenuMobile from "./headerMenuMobile";
import HeaderButton from "../ui/headerButton";
import { GiFireBowl } from "react-icons/gi";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  bgColor: string;
}

export default function Header({ bgColor }: HeaderProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <header className={`w-full flex justify-between ${bgColor} px-6`}>
      <Image src="/image/lasiesta_icon.png" alt="Logo" width={60} height={60} />

      {/* Menu para dispositivos maiores */}
      <div className="hidden md:flex justify-around pb-2 gap-x-1">
        <HeaderButton pathHref="/" label="Início" Icon={House} />
        <HeaderButton pathHref="/aulas" label="Aulas" Icon={LibraryBig} />
        <HeaderButton pathHref="/produtos" label="Produtos" Icon={Amphora} />
        <HeaderButton pathHref="/atelie" label="O Ateliê" Icon={GiFireBowl} />
      </div>

      {/* Botão de menu para mobile */}
      <button
        className="md:hidden z-20 text-verde-escuro"
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
