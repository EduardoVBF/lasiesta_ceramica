"use client";
import BrownButton from "@/components/ui/brownButtom";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AtelierContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <span className="uppercase tracking-[0.3em] text-lg text-[#8c6d5a]">
        O Ateliê
      </span>

      <h2 className="text-5xl md:text-6xl leading-[1] font-semibold max-w-xl">
        Um espaço vivo entre barro e silêncio.
      </h2>

      <div className="space-y-6 text-lg leading-relaxed text-[#5c3d2e]/85">
        <p>
          O Ateliê LaSiesta é um refúgio criativo onde o tempo desacelera e cada
          gesto ganha significado.
        </p>

        <p>
          Aqui, transformamos matéria em presença. Cada peça nasce de um
          instante, de uma pausa, de um toque que se torna arte.
        </p>
      </div>

      <Link href="/atelie">
        <BrownButton text="Conheça o Ateliê" maxWidth="max-w-fit" />
      </Link>
    </motion.div>
  );
}
