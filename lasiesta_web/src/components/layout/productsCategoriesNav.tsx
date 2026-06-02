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
    <div className="w-full max-w-[90%] mb-2 z-30 relative">
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
                className={`cursor-pointer flex-shrink-0 px-6 py-3 rounded-b-2xl text-sm font-medium transition-all duration-300 border-b-2 ${isActive ? "bg-[#f5eee6] text-[#5c3d2e] border-[#d9cfc7]" : "bg-[#a35c42]/85 text-white border-[#8f4f38] hover:bg-[#8f4f38]"}`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
