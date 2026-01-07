"use client";
import Link from "next/link";
import React from "react";

interface ActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export default function ActionCard({
  title,
  description,
  href,
  icon,
}:
ActionCardProps) {
  return (
    <Link
      href={href}
      className="group relative rounded-3xl bg-white/90 backdrop-blur border border-white/60 p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-[#a35c42] transition-colors">
          {title}
        </h2>
      </div>

      <p className="text-gray-600 leading-relaxed">{description}</p>

      <div className="mt-8 flex items-center gap-2 text-[#a35c42] font-medium">
        <span>Acessar</span>
        <span className="group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </Link>
  );
}
