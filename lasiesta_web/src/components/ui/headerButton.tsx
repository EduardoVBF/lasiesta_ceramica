"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function HeaderButton({
  pathHref,
  label,
  Icon,
}: {
  pathHref: string;
  label: string;
  Icon: React.ElementType;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <Link
      href={pathHref}
      className={`h-fit pt-3 flex items-end px-4 rounded-b-lg ${
        isActive(pathHref)
          ? "border-b-4 border-cinza-claro bg-bege-escuro bg-white/80 text-marrom avermelhado"
          : "text-cinza-claro bg-red-300/20"
      }`}
    >
      <div className="flex pb-1 items-center space-x-1 cursor-pointer hover:scale-105 transition-all">
        <Icon size={24} className="" />
        <p className="text-sm font-bold">{label}</p>
      </div>
    </Link>
  );
}
