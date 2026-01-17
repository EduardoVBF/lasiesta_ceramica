"use client";
import {
  getAdminHomeCarousel,
  HomeCarouselItem,
} from "../../services/carousel.service";
import React, { useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import toast, { Toaster } from "react-hot-toast";
import LoaderComp from "../ui/loaderComp";
import Image from "next/image";
import Header from "./header";


export default function CarouselComponent() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [items, setItems] = useState<HomeCarouselItem[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000); // Troca de slide a cada 5 segundos
    return () => clearInterval(interval);
  }, [emblaApi]);

  useEffect(() => {
    getAdminHomeCarousel()
      .then((data) =>
        setItems(
          [...data]
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .filter((item) => item.isActive)
        )
      )
      .catch((err) =>
        toast.error(
          `Erro ao carregar carrossel: ${
            err.response?.data?.error || err.message
          }`
        )
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative z-20">
      <Toaster />
      {/* Header fixo no topo - TRANSPARENTE */}
      <div className="absolute top-0 z-20 w-full">
        <Header bgColor="bg-transparent" />
      </div>

      {loading ? (
        <LoaderComp text="Carregando Carrossel..." />
      ) : (
        <div className="relative w-full h-[300px] sm:h-[400px] xl:h-[550px] 2xl:h-[650px] overflow-hidden shadow-lg">
          {/* Embla viewport */}
          <div ref={emblaRef} className="overflow-hidden h-full w-full">
            {/* Slides container */}
            <div className="flex h-full">
              {items.map((image, i) => (
                <div
                  key={i}
                  className="relative flex-none w-full h-full"
                  style={{ position: "relative" }}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.title || `Slide ${i + 1}`}
                    fill
                    priority={i === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ))}
            </div>
          </div>

          {/* Botões de navegação */}
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 p-2 rounded-full text-marrom-avermelhado cursor-pointer hover:bg-white/70"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 p-2 rounded-full text-marrom-avermelhado cursor-pointer hover:bg-white/70"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
