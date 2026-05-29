"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface HeaderButtonProps {
  pathHref: string;
  label: string;
  Icon: React.ElementType;
}

export default function HeaderButton({
  pathHref,
  label,
  Icon,
}: HeaderButtonProps) {
  const pathname = usePathname();

  const isActive = pathname === pathHref;

  return (
    <Link
      href={pathHref}
      className={`
        group
        relative
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-full
        transition-all
        duration-300
        backdrop-blur-md
        border

        ${
          isActive
            ? "bg-white/20 border-white/30 text-white shadow-lg"
            : "bg-white/5 border-transparent text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white"
        }
      `}
    >
      <Icon
        size={18}
        className="transition-transform duration-300 group-hover:scale-110"
      />

      <span className="text-sm font-medium tracking-wide">{label}</span>

      {/* Glow ativo */}
      {isActive && (
        <div className="absolute inset-0 rounded-full bg-white/10 blur-xl -z-10" />
      )}
    </Link>
  );
}
