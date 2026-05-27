"use client";
import {
  getPublicBannerByPage,
  Banner,
  BannerPage,
} from "../../services/banner.service";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoaderComp from "../ui/loaderComp";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "./header";

interface HeaderWithBannerProps {
  page: BannerPage;
  textColor?: string;
}

export default function HeaderWithBanner({
  page,
  textColor = "text-white",
}: HeaderWithBannerProps) {
  const [bannerData, setBannerData] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanner() {
      try {
        const banner = await getPublicBannerByPage(page);
        setBannerData(banner);
        setLoading(false);
      } catch {
        toast.error("Erro ao buscar o banner.");
      }
    }

    fetchBanner();
  }, [page]);

  return (
    <>
      <Toaster position="top-center" />
      {loading ? (
        <div className="relative w-full h-[400px] flex items-center justify-center">
          <div className="absolute top-0 z-20 w-full">
            <Header bgColor="bg-transparent" />
          </div>
          <LoaderComp text={"Carregando Banner..."} />
        </div>
      ) : (
        <div className="relative w-full flex flex-col items-center z-20">
          {/* Header fixo no topo - TRANSPARENTE */}
          <div className="absolute top-0 z-20 w-full">
            <Header bgColor="bg-transparent" />
          </div>

          {/* Imagem e overlay */}
          <div className="relative w-full h-[400px] overflow-hidden">
            <Image
              src={bannerData?.imageUrl ?? "/image/aula2pb.jpg"}
              alt={bannerData?.title ?? "Lasiesta Cerâmica"}
              fill
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 md:from-black/30 md:to-black/50" />
          </div>

          {/* Conteúdo do banner */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`text-2xl sm:text-3xl md:text-5xl font-extrabold ${textColor} drop-shadow-lg`}
            >
              {bannerData?.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`mt-3 sm:mt-5 text-sm sm:text-base md:text-lg max-w-[90%] sm:max-w-3xl ${textColor} leading-relaxed drop-shadow-md`}
            >
              {bannerData?.subtitle}
            </motion.p>
          </div>
        </div>
      )}
    </>
  );
}
