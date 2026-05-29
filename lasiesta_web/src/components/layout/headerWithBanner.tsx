"use client";

import { usePublicBannerByPage } from "../../hooks/queries/usePublicBannerByPage";
import { BannerPage } from "../../services/banner.service";
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
  const bannerQuery = usePublicBannerByPage(page);

  const bannerData = bannerQuery.data;
  const loading = bannerQuery.isLoading;

  return (
    <>
      {loading ? (
        <div className="relative w-full h-[380px] md:h-[450px] flex items-center justify-center overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 z-20 w-full">
            <Header bgColor="bg-transparent" />
          </div>

          <LoaderComp text={"Carregando Banner..."} />
        </div>
      ) : (
        <section className="relative w-full flex flex-col items-center z-20 overflow-hidden">
          {/* Header */}
          <div className="absolute top-0 z-20 w-full">
            <Header bgColor="bg-transparent" />
          </div>

          {/* Banner */}
          <div className="relative w-full h-[380px] md:h-[450px] overflow-hidden">
            <Image
              src={bannerData?.imageUrl ?? "/image/aula2pb.jpg"}
              alt={bannerData?.title ?? "Lasiesta Cerâmica"}
              fill
              priority
              className="object-cover opacity-80"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
          </div>

          {/* Conteúdo */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`
                  text-3xl
                  md:text-5xl
                  leading-[1]
                  font-semibold
                  tracking-tight
                  ${textColor}
                `}
              >
                {bannerData?.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className={`
                  mt-4
                  text-sm
                  md:text-lg
                  max-w-2xl
                  mx-auto
                  leading-relaxed
                  text-white/85
                `}
              >
                {bannerData?.subtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}