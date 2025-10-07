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
  textColor: string;
}) {
  return (
    <div className="relative w-full flex flex-col items-center mb-20">
      <div className="absolute top-0 z-20 w-full">
        <Header />
      </div>
      <div className="bg-radial from-transparent to-black/20 absolute top-0 z-10 w-full h-[400px]"></div>
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        className="object-cover absolute top-0 z-0 w-full h-[400px] opacity-80"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-[400px] w-full bg-black/30">
        {/* Ajuste de cor e contraste para visibilidade */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`text-4xl md:text-5xl font-bold text-center ${textColor} my-10 z-10`}
        >
          {title}
        </motion.h1>
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl px-6 text-center mb-16 z-10"
        >
          <p className={`leading-relaxed text-lg ${textColor}`}>
            {description}
          </p>
        </motion.section>
      </div>
    </div>
  );
}
