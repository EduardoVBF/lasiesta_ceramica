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
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-white/80 w-full pl-10 pr-10 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a35c42]"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
