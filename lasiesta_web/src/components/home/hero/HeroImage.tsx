"use client";
import FloatingProcessCard from "./FloatingProcessCard";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <div className="absolute -inset-8 bg-[#d6c8b9]/30 blur-3xl rounded-full" />

      <div className="relative overflow-hidden rounded-[36px] backdrop-blur-md bg-white/20 border border-white/30 shadow-[0_20px_80px_rgba(0,0,0,0.12)]">
        <Image
          src="/image/IMG_0032.JPG"
          alt="Cerâmica artesanal"
          width={700}
          height={700}
          className="object-cover w-full h-[700px] hover:scale-105 transition-transform duration-[2500ms]"
        />
      </div>

      <FloatingProcessCard />
    </motion.div>
  );
}
