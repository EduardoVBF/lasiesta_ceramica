"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ImageZoom from "../layout/ImageZoom";

interface ImageInputProps {
  value?: string | null; // imageUrl (edição)
  onChange: (base64: string | null) => void;
  placeholderImage?: string;
}

export default function ImageInput({
  value,
  onChange,
  placeholderImage = "/image/placeholder-image.png",
}: ImageInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // quando vem imagem da edição
  useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);

  function handleFileChange(file?: File) {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onChange(base64);
    };
    reader.readAsDataURL(file);
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  return (
    <div className="space-y-2">
      {/* preview clicável */}
      <div
        onClick={openFilePicker}
        className="
          w-48 h-48
          border-2 rounded-lg
          overflow-hidden
          flex items-center justify-center
          bg-gray-50
          cursor-pointer
          hover:opacity-90
          transition
        "
      >
        {preview ? (
          <ImageZoom
            src={preview}
            alt="Imagem selecionada"
            width={192}
            height={192}
          />
        ) : (
          <Image
            src={placeholderImage}
            alt="Placeholder"
            width={192}
            height={192}
            className="opacity-50"
          />
        )}
      </div>

      {/* input escondido */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0])}
        className="hidden"
      />
    </div>
  );
}
