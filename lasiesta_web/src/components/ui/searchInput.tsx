"use client";

import { Search, X } from "lucide-react";
import React from "react";

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
};

export default function SearchInput({
  value,
  placeholder = "Buscar...",
  onChange,
  onClear,
}: Props) {
  return (
    <div className="relative w-full mx-auto">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c6d5a]"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-10 pr-8 bg-white border border-[#d8cec3] rounded-full text-[#5c3d2e] placeholder:text-[#8c6d5a]/70 focus:outline-none focus:border-[#a35c42] transition-all duration-300"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c6d5a] hover:text-[#5c3d2e] transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
