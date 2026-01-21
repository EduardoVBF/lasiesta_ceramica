"use client";
import React from "react";

export default function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold shadow-md ${
        active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          active ? "bg-green-600" : "bg-red-600"
        }`}
      />
      {active ? "Ativo" : "Inativo"}
    </span>
  );
}