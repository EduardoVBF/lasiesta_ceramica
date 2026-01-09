import { Pencil, House, Amphora, LibraryBig } from "lucide-react";
import { Banner } from "../../services/banner.service";
import { GiFireBowl } from "react-icons/gi";
import Image from "next/image";
import React from "react";

export default function BannerCard({
  banner,
  onEdit,
}: {
  banner: Banner;
  onEdit: () => void;
}) {
  function handlePageName(page: string) {
    switch (page) {
      case "CLASSES":
        return { label: "Aulas", Icon: LibraryBig };
      case "PRODUCTS":
        return { label: "Produtos", Icon: Amphora };
      case "ABOUT":
        return { label: "O Ateliê", Icon: GiFireBowl };
      default:
        return { label: page, Icon: House };
    }
  }

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-lg group">
      {/* LABEL DA PÁGINA */}
      <div className="absolute top-4 left-4 z-20 bg-[#a35c42] text-white px-4 py-1 rounded-full text-sm shadow">
        {React.createElement(handlePageName(banner.page).Icon, { size: 16, className: "inline-block " })} {handlePageName(banner.page).label}
      </div>

      {/* BOTÃO EDITAR */}
      <button
        onClick={onEdit}
        title="Editar banner"
        className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur rounded-full p-2 text-gray-700 hover:text-[#a35c42] transition shadow"
      >
        <Pencil size={22} />
      </button>

      {/* IMAGEM */}
      <div className="relative w-full h-[340px]">
        <Image
          src={banner.imageUrl || "/image/placeholder-image.png"}
          alt={banner.title ?? banner.page}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      </div>

      {/* TEXTO */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
          {banner.title || "Sem título"}
        </h1>

        {banner.subtitle && (
          <p className="mt-2 text-sm md:text-base text-white/90 max-w-xl drop-shadow">
            {banner.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
