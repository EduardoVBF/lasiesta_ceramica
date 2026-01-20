"use client";
import BackgroundImage from "@/components/layout/backgroundImage";
import BrownButton from "@/components/ui/brownButtom";
import StatusBadge from "@/components/ui/statusBadge";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { BsToggleOn } from "react-icons/bs";
import { Pencil, Info } from "lucide-react";
import ColoredTextBox from "@/components/ui/coloredTextBox";

export default function AdminProductsPage() {
  const [infoVisible, setInfoVisible] = useState(false);

  return (
    <div className="flex flex-col">
      <BackgroundImage
        src="/image/organic3.jpg"
        alt="Textura de fundo do ateliê"
        opacity={20}
      />

      <Toaster position="top-center" />

      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6 z-10">
        <div>
          <h2 className="text-4xl font-normal text-[#a35c42]">Produtos</h2>
          <div className="flex items-center mt-2 gap-1">
            <p className="text-gray-600 max-w-xl">
              Gerencie os produtos disponíveis no catálogo.
            </p>
            <Info
              size={20}
              className={`cursor-pointer ${
                infoVisible
                  ? "text-blue-500 hover:text-gray-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setInfoVisible((prev) => !prev)}
            />
          </div>
        </div>

        <BrownButton text="+ Novo produto" maxWidth="max-w-fit" />
      </header>

      {infoVisible && (
        <ColoredTextBox className="my-2 z-10 w-fit" type="info">
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li>Estes são os produtos disponíveis no catálogo.</li>
            <li>
              Você pode adicionar, editar ou remover produtos conforme
              necessário.
            </li>
            <li>
              Mantenha as informações dos produtos atualizadas para melhor
              experiência do cliente.
            </li>
          </ul>
        </ColoredTextBox>
      )}

      <div className="w-full py-10 flex items-center justify-center">EM BREVE</div>
    </div>
  );
}
