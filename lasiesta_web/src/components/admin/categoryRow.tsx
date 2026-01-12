"use client";
import { Category } from "../../services/categories.service";
import ImageZoom from "@/components/layout/ImageZoom";
import StatusBadge from "@/components/ui/statusBadge";
import { BsToggleOn } from "react-icons/bs";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import React from "react";

export default function CategoryRow({
  category,
  onEdit,
  onToggle,
}: {
  category: Category;
  onEdit: () => void;
  onToggle: () => void;
}) {
  return (
    <tr className="hover:bg-gray-200/60 transition">
      <td
        className="px-6 py-4 font-semibold text-gray-800"
        onClick={() => {
          toast.success(category.name);
        }}
      >
        {category.name}
      </td>

      <td className="px-6 py-4 text-gray-500">
        {category.imageUrl ? (
          <ImageZoom
            src={category.imageUrl || "/image/no-image.png"}
            alt={category.name}
            width={50}
            height={50}
            className="object-cover rounded-md"
            zoom
          />
        ) : (
          "Sem imagem"
        )}
      </td>

      <td className="px-6 py-4 text-gray-500">{category.slug}</td>

      <td className="px-6 py-4">
        <StatusBadge active={category.isActive} />
      </td>

      <td className="px-6 py-4">
        {category.isFeatured && (
          <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            Destaque
          </span>
        )}
      </td>

      <td className="px-6 py-4 text-right">
        <div className="inline-flex items-center gap-4">
          <button
            onClick={onEdit}
            title="Editar categoria"
            className="text-sm font-medium text-gray-600 hover:text-[#a35c42] transition cursor-pointer"
          >
            <Pencil size={20} />
          </button>

          <button
            onClick={onToggle}
            title={
              category.isActive ? "Desativar categoria" : "Ativar categoria"
            }
            className={`text-sm font-medium transition cursor-pointer ${
              category.isActive
                ? "text-green-600 hover:text-red-700"
                : "text-red-600 hover:text-green-700"
            }`}
          >
            {category.isActive ? (
              <BsToggleOn size={25} className="hover:rotate-180" />
            ) : (
              <BsToggleOn size={25} className="rotate-180 hover:rotate-0" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}
