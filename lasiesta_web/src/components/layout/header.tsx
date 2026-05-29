"use client";

import { House, Amphora, LibraryBig } from "lucide-react";
import HeaderMenuMobile from "./headerMenuMobile";
import HeaderButton from "../ui/headerButton";
import { GiFireBowl } from "react-icons/gi";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  bgColor: string;
}

export default function Header({ bgColor }: HeaderProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 pt-2">
      <div
        className={`
      max-w-[95dvw]
      mx-auto
      flex
      items-center
      justify-between
      px-4
      py-2
      rounded-full
      backdrop-blur-xl
       ${bgColor ? bgColor : "bg-white/10"}
      border
      border-white/20
      shadow-[0_8px_40px_rgba(0,0,0,0.12)]
    `}
      >
        {/* Logo */}
        <Link href="/">
          <Image
            src="/image/lasiesta_icon.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <HeaderButton pathHref="/" label="Início" Icon={House} />

          <HeaderButton pathHref="/aulas" label="Aulas" Icon={LibraryBig} />

          <HeaderButton pathHref="/produtos" label="Produtos" Icon={Amphora} />

          <HeaderButton pathHref="/atelie" label="O Ateliê" Icon={GiFireBowl} />
        </div>

        {/* Mobile Button */}
        <button
          className="
            md:hidden
            w-11
            h-11
            flex
            items-center
            justify-center
            rounded-full
            backdrop-blur-md
            bg-white/10
            border
            border-white/20
            text-white
            transition-all
            duration-300
          "
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <HeaderMenuMobile onClose={() => setMobileMenuOpen(false)} />
        )}
      </div>
    </header>
  );
}
