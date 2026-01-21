"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="p-1.5 rounded-full border disabled:opacity-40 bg-[#a35c42] hover:bg-[#923f2d] text-white cursor-pointer disabled:cursor-default"
      >
        <ChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-full text-base ${
              page === p
                ? "bg-[#a35c42] text-white"
                : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="p-1.5 rounded-full border disabled:opacity-40 bg-[#a35c42] hover:bg-[#923f2d] text-white cursor-pointer disabled:cursor-default"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
