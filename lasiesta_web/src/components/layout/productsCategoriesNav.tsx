"use client";
import React from "react";

interface ProductsCategoriesNavProps {
  categories: {
    id: string;
    label: string;
  }[];
  activeCategory: boolean | string;
  setActiveCategory: (id: string) => void;
}

export default function ProductsCategoriesNav({
  categories,
  activeCategory,
  setActiveCategory,
}: ProductsCategoriesNavProps) {
  return (
    <div className="w-full max-w-[90%] mb-4 overflow-hidden">
      <div className="flex overflow-x-auto justify-start gap-x-1 px-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`pt-4 rounded-b-lg px-6 py-1 text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer hover:bg-gray-500/20 hover:text-marrom-avermelhado/90 focus:outline-none ${
              {
                active: activeCategory === category.id,
              }["active"]
                ? "border-b-4 border-[#a35c42] text-marrom-avermelhado bg-white/60"
                : "text-white bg-[#a35c42]/20"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
