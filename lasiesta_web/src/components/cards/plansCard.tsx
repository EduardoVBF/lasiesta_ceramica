"use client";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import Image from "next/image";
import BrownButton from "@/components/ui/brownButtom";
import { Plan } from "../../services/plans.service";

interface PlanSectionProps {
  plan: Plan;
  reverse?: boolean;
}

export default function PlanSection({
  plan,
  reverse = false,
}: PlanSectionProps) {
  const whatsappUrl = `https://wa.me/5516991401921?text=Olá! Tenho interesse no ${plan.name}`;

  return (
    <section id={plan.slug} className="py-0 px-4 z-20">
      <div
        className={`max-w-6xl mx-auto flex flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } gap-8 lg:gap-12 p-4 bg-gray-200/70 rounded-xl shadow-2xl`}
      >
        {/* Lado da Imagem: Mantendo a proporção 1:1 ou 4:5 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-[400px] aspect-[4/5] md:aspect-square"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={plan.imageUrl || ""}
              alt={plan.name}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Lado do Conteúdo */}
        <div className="flex-1 min-h-full flex flex-col justify-between space-y-4 mx-1">
          <div className="flex-1 space-y-4">
            <header>
              <h1 className="text-4xl font-serif font-bold mt-2 leading-tight">
                {plan.name}
              </h1>
            </header>
            <div
              className="text-sm text-stone-600"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(plan.longDescription || ""),
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="pt-6 flex items-start sm:items-center gap-2">
              <span className="text-3xl font-bold text-stone-800">
                R$ {plan.price}
              </span>
              <span className="text-marrom-avermelhado font-semibold tracking-[0.2em] uppercase text-sm">
                /{plan.durationLabel}
              </span>
            </div>
            <BrownButton
              text="Tenho Interesse"
              onClick={() => window.open(whatsappUrl, "_blank")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
