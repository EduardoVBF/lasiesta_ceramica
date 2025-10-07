"use client";
import { House, Amphora, LibraryBig } from "lucide-react";
import { usePathname } from "next/navigation";
import { GiFireBowl } from "react-icons/gi";
import HeaderButton from "./headerButton";
import Image from "next/image";
import React from "react";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full flex justify-between bg-transparent px-6 ">
      <Image src="/image/lasiesta_icon.png" alt="Logo" width={60} height={60} />
      <div className="flex justify-around pb-2 gap-x-1">
        <HeaderButton pathHref="/" label="Início" Icon={House} />
        <HeaderButton pathHref="/classes" label="Aulas" Icon={LibraryBig} />
        <HeaderButton pathHref="/products" label="Produtos" Icon={Amphora} />
        <HeaderButton pathHref="/studio" label="O ateliê" Icon={GiFireBowl} />
      </div>
    </header>
  );
}
