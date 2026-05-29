"use client";
import { motion } from "framer-motion";

export default function QuoteSection() {
  return (
    <section className="relative py-40 bg-[#5c3d2e] overflow-hidden text-center text-white">
      {/* Glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_50%)]" />

      {/* Blur Orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-white/10 blur-3xl rounded-full" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-white/10 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto px-6"
      >
        <p className="uppercase tracking-[0.4em] text-lg text-white/60 mb-8">
          Ateliê LaSiesta
        </p>

        <h2 className="text-4xl md:text-7xl leading-[1.1] font-semibold">
          O descanso também faz parte da criação.
        </h2>
      </motion.div>
    </section>
  );
}
