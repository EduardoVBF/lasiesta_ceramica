"use client";
import BrownButton from "@/components/brownButtom";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

function PlanSection({
  plan,
  reverse = false,
}: {
  plan: {
    id: number;
    title: string;
    description: string;
    price: string;
    priceDetail: string;
    buttonText: string;
    image: string;
    alt: string;
  };
  reverse?: boolean;
}) {
  return (
    <motion.section
      key={plan.id}
      initial={{ opacity: 0, x: reverse ? 80 : -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 py-6 px-6 rounded-3xl max-w-[85%] mx-auto shadow-lg bg-[#878b85b0] ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Imagem */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="relative w-[300px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg"
      >
        <Image src={plan.image} alt={plan.alt} fill className="object-cover" />
      </motion.div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-center max-w-md text-marrom-avermelhado">
        <h1 className="text-xl font-semibold mb-2 tracking-tight text-marrom-avermelhado/90">
          {plan.title}
        </h1>

        <p className="text-[11px] md:text-[12px] text-marrom-avermelhado/80 mb-4 leading-relaxed">
          {plan.description}
        </p>

        <ul className="space-y-1.5 mb-6 text-[11px] text-marrom-avermelhado/75">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-marrom-avermelhado rounded-full"></span>
            Acesso completo aos recursos premium.
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-marrom-avermelhado rounded-full"></span>
            Suporte personalizado via WhatsApp.
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-marrom-avermelhado rounded-full"></span>
            Atualizações e melhorias constantes.
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-marrom-avermelhado rounded-full"></span>
            Cancelamento fácil e sem burocracia.
          </li>
        </ul>

        {/* Preço */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg md:text-xl font-bold text-marrom-avermelhado">
            {plan.price}
          </span>
          <span className="text-gray-500 text-[11px]">{plan.priceDetail}</span>
        </div>

        {/* Botão */}
        <BrownButton
          text={plan.buttonText}
          onClick={() => {
            window.open(
              `https://wa.me/5516991401921?text=Olá!%20Tenho%20interesse%20no%20${encodeURIComponent(
                plan.title
              )}`,
              "_blank"
            );
          }}
        />
      </div>
    </motion.section>
  );
}

export default PlanSection;
