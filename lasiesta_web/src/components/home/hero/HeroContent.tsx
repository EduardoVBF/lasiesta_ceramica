"use client";
import BrownButton from "@/components/ui/brownButtom";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="space-y-10"
    >
      <div className="flex mb-4 mt-10">
        <span className="uppercase tracking-[0.3em] text-2xl md:text-4xl text-[#8c6d5a]">
          Cerâmica Artesanal • Ateliê LaSiesta
        </span>
      </div>

      <div>
        <h1 className="my-4 text-5xl md:text-6xl leading-[0.95] tracking-tight font-semibold max-w-2xl">
          Um convite à pausa
        </h1>

        <div className="w-42 h-[4px] bg-[#5c3d2ed2] rounded-full mt-6" />
      </div>

      <div className="space-y-4 text-lg leading-relaxed text-[#5c3d2e]/85 max-w-2xl">
        <p>
          Entre o silêncio e o toque do barro, nasce o
          <strong> LaSiesta </strong> — um ateliê dedicado à arte da cerâmica
          manual e à serenidade do processo.
        </p>

        <p>
          Cada peça carrega tempo, pausa e intenção. Um convite para desacelerar
          e reconectar-se com o essencial.
        </p>

        <p>
          O nome <strong>LaSiesta</strong> vem do espanhol e significa “o
          descanso depois do almoço” — um lembrete de que o descanso também faz
          parte da criação.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 pt-4">
        <Link href="/produtos">
          <BrownButton text="Explorar Coleções" maxWidth="max-w-fit" />
        </Link>

        <Link href="/atelie">
          <button className="border border-[#7a5c48]/30 hover:border-[#7a5c48] transition-all duration-500 rounded-full px-8 py-4 backdrop-blur-md bg-white/20 hover:bg-white/30">
            Conheça o Ateliê
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
