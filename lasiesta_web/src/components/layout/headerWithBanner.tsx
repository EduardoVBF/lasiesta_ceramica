"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "./header";
import React from "react";

export default function HeaderWithBanner({
  src,
  alt,
  title,
  description,
  textColor = "text-white",
}: {
  src: string;
  alt: string;
  title: string;
  description: string;
  textColor?: string;
}) {
  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Header fixo no topo */}
      <div className="absolute top-0 z-20 w-full">
        <Header bgColor="bg-transparent"/>
      </div>

      {/* Imagem e overlay */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 md:from-black/20 md:to-black/40" />
      </div>

      {/* Conteúdo do banner */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`text-2xl sm:text-3xl md:text-5xl font-extrabold ${textColor} drop-shadow-lg`}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`mt-3 sm:mt-5 text-sm sm:text-base md:text-lg max-w-[90%] sm:max-w-3xl ${textColor} leading-relaxed drop-shadow-md`}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}
