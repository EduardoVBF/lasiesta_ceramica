"use client";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  light = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <span
        className={`
          uppercase
          tracking-[0.3em]
          text-lg
          ${light ? "text-white/70" : "text-[#8c6d5a]"}
        `}
      >
        {eyebrow}
      </span>

      <h2 className="text-5xl md:text-6xl font-semibold mt-6 mb-6">{title}</h2>

      <p
        className={`
          max-w-2xl
          mx-auto
          text-lg
          leading-relaxed
          ${light ? "text-white/80" : "text-[#5c3d2e]/80"}
        `}
      >
        {description}
      </p>
    </motion.div>
  );
}
