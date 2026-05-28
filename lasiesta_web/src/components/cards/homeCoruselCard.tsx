"use client";
import { HomeCarouselItem } from "../../services/carousel.service";
import StatusBadge from "../ui/statusBadge";
import { BsToggleOn } from "react-icons/bs";
import { Pencil } from "lucide-react";
import Image from "next/image";

export default function HomeCarouselCard({
  item,
  index,
  onEdit,
  onToggle,
  isToggling = false,
}: {
  item: HomeCarouselItem;
  index: number;
  onEdit: () => void;
  onToggle: () => void;
  isToggling?: boolean;
}) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg group">
      <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
        {item.isActive && (
          <div className="bg-[#a35c42] backdrop-blur rounded-full p-2 w-8 h-8 text-white transition flex items-center justify-center text-lg font-bold shadow-md">
            {index + 1}
          </div>
        )}
        <StatusBadge active={item.isActive} />
      </div>
      <div className="absolute top-4 right-4 z-20 flex flex-col items-center gap-3">
        <button
          onClick={onEdit}
          title="Editar slide"
          className="bg-white/90 backdrop-blur rounded-full p-2 text-gray-700 hover:text-[#a35c42] transition shadow"
        >
          <Pencil size={22} />
        </button>

        <button
          onClick={onToggle}
          disabled={isToggling}
          title={item.isActive ? "Desativar Slide" : "Ativar Slide"}
          className={`inline-flex items-center gap-2 p-1 bg-white/90 rounded-full text-sm font-medium transition ${
            isToggling ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          } ${
            item.isActive
              ? "text-green-700 hover:text-red-700"
              : "text-red-700 hover:text-green-700"
          }`}
        >
          <BsToggleOn
            size={30}
            className={
              isToggling
                ? item.isActive
                  ? ""
                  : "rotate-180"
                : item.isActive
                  ? "hover:rotate-180"
                  : "rotate-180 hover:rotate-0"
            }
          />
        </button>
      </div>

      <div className="relative w-full h-[340px]">
        <Image
          src={item.imageUrl}
          alt={item.title ?? "Slide do carrossel"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        {item.title && (
          <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            {item.title}
          </h3>
        )}

        {item.subtitle && (
          <p className="mt-2 text-sm md:text-base text-white/90 max-w-xl drop-shadow">
            {item.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
