"use client";

import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";

import BrownButton from "../ui/brownButtom";

export interface PlanData {
  id: string;
  name: string;
  slug: string;
  price: number | string | null;
  durationLabel: string | null;
  shortDescription?: string;
  longDescription?: string;
  imageUrl?: string;
}

export default function FeaturedPlanCard({
  plan,
  index,
}: {
  plan: PlanData;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative flex flex-col overflow-hidden rounded-[32px] bg-white/70 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] transition-all duration-500 h-full"
    >
      {/* Imagem */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={plan.imageUrl || ""}
          alt={plan.name}
          fill
          className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-4">
        {/* Cabeçalho */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold leading-tight text-[#5c3d2e]">
            {plan.name}
          </h2>
        </div>

        {/* Descrição */}
        <div
          className="flex-grow text-stone-600 text-sm leading-relaxed line-clamp-4 mb-6"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(plan.shortDescription || ""),
          }}
        />

        {/* Divider */}
        <div className="w-full h-px bg-[#d9cfc7] mb-5" />

        {/* Footer */}
        <div className="space-y-5">
          <div className="flex items-end gap-2 flex-wrap">
            <span className="text-3xl font-semibold text-[#5c3d2e]">
              R$ {plan.price}
            </span>

            {plan.durationLabel && (
              <span className="text-sm uppercase text-[#a35c42] mb-1">
                / {plan.durationLabel}
              </span>
            )}
          </div>

          <Link href="/aulas" className="block">
            <BrownButton text="Ver Detalhes" className="w-full" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
