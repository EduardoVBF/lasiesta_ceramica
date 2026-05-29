"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AtelierGallery() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-5"
    >
      <div className="overflow-hidden rounded-[32px] shadow-xl">
        <Image
          src="/image/IMG_0065.JPG"
          alt="Ateliê"
          width={400}
          height={500}
          className="object-cover h-[320px] w-full hover:scale-110 transition-transform duration-[2500ms]"
        />
      </div>

      <div className="overflow-hidden rounded-[32px] shadow-xl mt-14">
        <Image
          src="/image/IMG_0129.JPG"
          alt="Torno"
          width={400}
          height={500}
          className="object-cover h-[320px] w-full hover:scale-110 transition-transform duration-[2500ms]"
        />
      </div>

      <div className="overflow-hidden rounded-[32px] shadow-xl col-span-2">
        <Image
          src="/image/IMG_0216.JPG"
          alt="Peças de cerâmica"
          width={800}
          height={400}
          className="object-cover h-[320px] w-full hover:scale-105 transition-transform duration-[2500ms]"
        />
      </div>
    </motion.div>
  );
}
