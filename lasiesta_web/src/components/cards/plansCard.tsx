"use client";

import BrownButton from "@/components/ui/brownButtom";
import { Plan } from "../../services/plans.service";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";

interface PlanSectionProps {
  plan: Plan;
  reverse?: boolean;
}

export default function PlanSection({
  plan,
  reverse = false,
}: PlanSectionProps) {
  return (
    <section id={plan.slug} className="px-6 z-20">
      <div
        className={`max-w-6xl mx-auto flex flex-col ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-10 lg:gap-16 items-center bg-white/60 backdrop-blur-md rounded-[36px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] transition-all duration-500`}
      >
        {/* Imagem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full lg:w-[45%] h-[320px] md:h-[450px] lg:h-[600px] overflow-hidden"
        >
          <Image
            src={plan.imageUrl || ""}
            alt={plan.name}
            fill
            className="object-cover transition-transform duration-[1500ms] hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>

        {/* Conteúdo */}
        <div
          className={`flex-1 px-6 lg:px-0 py-8 lg:py-12 ${!reverse ? "pr-6 lg:pr-8" : "pl-6 lg:pl-8"}`}
        >
          <div className="max-w-2xl">
            {/* <span className="uppercase tracking-[0.25em] text-sm text-[#a35c42]">
              Experiência
            </span> */}

            <h2 className="mt-4 text-4xl md:text-5xl leading-[1] font-semibold tracking-tight text-[#5c3d2e]">
              {plan.name}
            </h2>

            <div
              className="mt-8 prose prose-stone max-w-none text-[#5c3d2e]/80 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(plan.longDescription || ""),
              }}
            />

            <div className="mt-10 w-full h-[2px] rounded-full bg-[#d9cfc7]" />

            <div className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                {/* <p className="text-sm uppercase tracking-[0.15em] text-[#a35c42]">
                  Investimento
                </p> */}

                <div className="flex items-end gap-2 mt-2">
                  <span className="text-4xl font-semibold text-[#5c3d2e]">
                    R$ {plan.price}
                  </span>

                  {plan.durationLabel && (
                    <span className="text-sm uppercase tracking-[0.15em] text-[#a35c42] mb-2">
                      / {plan.durationLabel}
                    </span>
                  )}
                </div>
              </div>

              <Link
                href={`https://wa.me/5516991401921?text=${encodeURIComponent(
                  `Olá! Tenho interesse na experiência: ${plan.name}`,
                )}`}
                target="_blank"
              >
                <BrownButton text="Tenho Interesse" maxWidth="max-w-fit" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
