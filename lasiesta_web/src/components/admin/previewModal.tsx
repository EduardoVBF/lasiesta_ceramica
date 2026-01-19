"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface PreviewModalProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function PreviewModal({
  trigger,
  children,
  className,
}: PreviewModalProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Gatilho (O ícone de alien ou botão) */}
      <div onClick={handleOpen} className="cursor-pointer inline-block">
        {trigger}
      </div>

      {/* Modal via Portal */}
      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-0"
            onClick={handleClose}
          >
            <div
              className={`flex justify-center items-center relative w-fit h-fit overflow-y-auto bg-white rounded-2xl shadow-2xl ${className}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão fechar flutuante */}
              <button
                onClick={handleClose}
                className="absolute top-1 right-1 z-[100] bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all border border-gray-100"
              >
                <X size={24} className="text-gray-600" />
              </button>

              <div className="p-2">{children}</div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
