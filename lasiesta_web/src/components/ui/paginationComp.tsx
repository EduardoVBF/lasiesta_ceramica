"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  className = "",
}: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="w-11 h-11 flex items-center justify-center rounded-full border border-[#d8cec3] bg-white text-[#5c3d2e] hover:border-[#a35c42] hover:text-[#a35c42] transition-all duration-300 disabled:opacity-40 disabled:cursor-default cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-2">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`min-w-[44px] h-11 px-4 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
              page === p
                ? "bg-[#a35c42] text-white shadow-[0_8px_20px_rgba(163,92,66,0.25)]"
                : "bg-white border border-[#d8cec3] text-[#5c3d2e] hover:border-[#a35c42] hover:text-[#a35c42]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="w-11 h-11 flex items-center justify-center rounded-full border border-[#d8cec3] bg-white text-[#5c3d2e] hover:border-[#a35c42] hover:text-[#a35c42] transition-all duration-300 disabled:opacity-40 disabled:cursor-default cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}