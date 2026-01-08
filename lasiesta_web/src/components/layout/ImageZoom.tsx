"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ImageZoomProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  zoom?: boolean;
}

export default function ImageZoom({
  src,
  alt = "",
  width = 200,
  height = 200,
  className,
  zoom = false,
}: ImageZoomProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleOpen() {
    if (zoom) setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      {/* imagem base */}
      <div
        onClick={handleOpen}
        className={`${zoom ? "cursor-zoom-in" : "cursor-default"} ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-lg object-cover"
        />
      </div>

      {/* modal */}
      {mounted &&
        zoom &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-6"
            onClick={handleClose}
          >
            {/* moldura adaptativa */}
            <div
              className="
                relative inline-block
                bg-white rounded-xl shadow-2xl p-2
                max-w-[90vw] max-h-[90vh]
                w-auto h-auto
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* botão fechar */}
              <button
                onClick={handleClose}
                className="
                  absolute -top-3 -right-3
                  bg-white rounded-full shadow-lg
                  p-2 hover:bg-gray-100 transition
                "
                aria-label="Fechar imagem"
              >
                <X size={20} />
              </button>

              {/* imagem grande */}
              <Image
                src={src}
                alt={alt}
                width={1600}
                height={1600}
                className="
                  max-w-[80vw] max-h-[80vh]
                  w-auto h-auto
                  rounded-xl
                "
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
