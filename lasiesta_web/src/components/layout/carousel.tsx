"use client";

import React, { useEffect, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Header from "./header";

export default function CarouselComponent() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const images = [
    { src: "/image/IMG_0216.JPG", alt: "Cerâmica artesanal" },
    { src: "/image/IMG_0036.JPG", alt: "Conjunto de pratos rústicos" },
    { src: "/image/IMG_0032.JPG", alt: "Copos de argila" },
  ];

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
    const interval = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Header fixo no topo */}
      <div className="absolute top-0 z-20 w-full">
        <Header bgColor="bg-transparent" />
      </div>

      <div className="relative w-full h-[300px] sm:h-[400px] xl:h-[550px] 2xl:h-[650px] overflow-hidden shadow-lg">
        {/* Embla viewport */}
        <div ref={emblaRef} className="overflow-hidden h-full w-full">
          {/* Slides container */}
          <div className="flex h-full">
            {images.map((image, i) => (
              <div
                key={i}
                className="relative flex-none w-full h-full"
                style={{ position: "relative" }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
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
    </div>
  );
}
