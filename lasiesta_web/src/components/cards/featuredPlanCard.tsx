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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col bg-white/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 h-full"
    >
      {/* Container da Imagem */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={plan.imageUrl || ""}
          alt={plan.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay sutil para dar profundidade no hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Conteúdo */}
      <div className="px-3 py-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h1 className="text-xl font-serif font-bold leading-tight">
            {plan.name}
          </h1>
        </div>

        <div
          className="text-stone-600 text-sm line-clamp-5 mb-4 flex-grow leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(plan.shortDescription || ""),
          }}
        />

        {/* Footer do Card: Preço e Botão */}
        <div className="mt-auto pt-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-stone-800">
                R$ {plan.price}
              </span>
              <span className="text-xs text-marrom-avermelhado font-bold uppercase tracking-widest">
                /{plan.durationLabel}
              </span>
            </div>

            <Link href={`/classes#${plan.slug}`} className="w-full">
              <BrownButton text="Ver Detalhes" className="w-full" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
