"use client";
import BrownButton from "@/components/ui/brownButtom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import Image from "next/image";
import React from "react";

interface PlanSectionProps {
  plan: {
    id: string;
    name: string;
    slug: string;
    price: number | null;
    durationLabel: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    shortDescription?: string;
    longDescription?: string;
    isFeatured?: boolean;
    imageUrl?: string;
  };
  reverse?: boolean;
  buttonText?: string;
}

function PlanSection({
  plan,
  reverse = false,
  buttonText = "Tenho interesse",
}: PlanSectionProps) {
  return (
    <motion.section
      key={plan.id}
      initial={{ opacity: 0, x: reverse ? 80 : -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`relative flex flex-col md:flex-row items-center justify-between gap-10 py-6 px-6 rounded-3xl w-[60%] z-20 mx-auto shadow-lg bg-[#9f9f9fd7] ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Imagem */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="relative w-[300px] h-[400px] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg"
      >
        <Image
          src={plan.imageUrl || ""}
          alt={plan.name || ""}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Conteúdo */}
      <div className="flex flex-col justify-between min-h-[400px] w-[100%] max-w-full text-marrom-avermelhado">
        <div>
          <h1 className="text-3xl font-semibold mb-3 tracking-tight text-marrom-avermelhado/90">
            {plan.name}
          </h1>
          {plan.longDescription && (
            <div
              className="text-xs text-marrom-avermelhado/80 mb-4 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(plan.longDescription),
              }}
            />
          )}
        </div>

        <div>
          {/* Preço */}
          <div className="flex items-baseline gap-2 mb-4 h-fit">
            <span className="text-lg md:text-2xl font-bold text-marrom-avermelhado">
              R$ {plan.price}
            </span>
            <span className="text-gray-500 text-base">
              / {plan.durationLabel}
            </span>
          </div>
          {/* Botão */}
          <BrownButton
            text={buttonText}
            onClick={() => {
              window.open(
                `https://wa.me/5516991401921?text=Olá!%20Tenho%20interesse%20no%20${encodeURIComponent(
                  plan.name
                )}`,
                "_blank"
              );
            }}
          />
        </div>
      </div>
    </motion.section>
  );
}

export default PlanSection;
