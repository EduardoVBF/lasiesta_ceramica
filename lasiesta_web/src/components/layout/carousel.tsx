"use client";
import { useHomeCarousel } from "../../hooks/queries/useHomeCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import LoaderComp from "../ui/loaderComp";
import Image from "next/image";
import Header from "./header";

export default function CarouselComponent() {
  const carouselQuery = useHomeCarousel();

  const items = carouselQuery.data ?? [];
  const loading = carouselQuery.isLoading;
  const carouselError = carouselQuery.isError;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
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

  return (
    <div className="relative z-20">
      {/* Header fixo no topo */}
      <div className="absolute top-0 z-20 w-full">
        <Header bgColor="bg-transparent" />
      </div>

      {carouselError ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <p className="text-gray-500">
            Não foi possível carregar o carrossel.
          </p>
        </div>
      ) : loading ? (
        <LoaderComp text="Carregando Carrossel..." classname="min-h-[400px]" />
      ) : (
        <div className="relative w-full h-[300px] sm:h-[400px] xl:h-[550px] 2xl:h-[650px] overflow-hidden shadow-[0_10px_60px_rgba(0,0,0,0.15)]">
          {/* Embla viewport */}
          <div ref={emblaRef} className="overflow-hidden h-full w-full">
            {/* Slides */}
            <div className="flex h-full">
              {items.map((image, i) => (
                <div key={i} className="relative flex-none w-full h-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.title || `Slide ${i + 1}`}
                    fill
                    priority={i === 0}
                    className="object-cover"
                    sizes="100vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Botão esquerdo */}
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className="
              absolute
              top-1/2
              left-4
              -translate-y-1/2
              w-12
              h-12
              flex
              items-center
              justify-center
              rounded-full
              backdrop-blur-md
              bg-white/10
              border
              border-white/20
              text-white
              hover:bg-white/20
              hover:scale-105
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <ChevronLeft size={24} />
          </button>

          {/* Botão direito */}
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className="
              absolute
              top-1/2
              right-4
              -translate-y-1/2
              w-12
              h-12
              flex
              items-center
              justify-center
              rounded-full
              backdrop-blur-md
              bg-white/10
              border
              border-white/20
              text-white
              hover:bg-white/20
              hover:scale-105
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
