"use client";
import { HomeCarouselItem } from "../../services/carousel.service";
import StatusBadge from "../ui/statusBadge";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function HomeCarouselCard({
  item,
  index,
  onEdit,
}: {
  item: HomeCarouselItem;
  index: number;
  onEdit: () => void;
}) {
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg group">
      <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
        {item.isActive && (
          <div className="bg-white/90 backdrop-blur rounded-full p-2 w-8 h-8 text-[#a35c42] transition flex items-center justify-center text-lg font-bold shadow">
            {index + 1}
          </div>
        )}
        <StatusBadge active={item.isActive} />
      </div>
      <button
        onClick={onEdit}
        title="Editar slide"
        className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur rounded-full p-2 text-gray-700 hover:text-[#a35c42] transition shadow"
      >
        <Pencil size={22} />
      </button>

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
