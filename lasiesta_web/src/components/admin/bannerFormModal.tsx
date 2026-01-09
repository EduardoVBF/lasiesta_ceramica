"use client";

import React, { useEffect, useState } from "react";
import PrimaryInput from "../ui/primaryInput";
import BrownButton from "../ui/brownButtom";
import GrayButton from "../ui/grayButtom";
import ImageInput from "./imageInput";
import { Banner } from "../../services/banner.service";

type BannerFormData = {
  title?: string | null;
  subtitle?: string | null;
  linkUrl?: string | null;
  isActive?: boolean;
  imageBase64?: string;
};

type Props = {
  open: boolean;
  loading: boolean;
  initialData?: Banner;
  onClose: () => void;
  onSubmit: (data: BannerFormData) => void;
};

export default function BannerFormModal({
  open,
  loading,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title ?? "");
      setSubtitle(initialData.subtitle ?? "");
      setLinkUrl(initialData.linkUrl ?? "");
      setIsActive(initialData.isActive);
      setImageBase64(null);
    }
  }, [initialData, open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      title: title || null,
      subtitle: subtitle || null,
      linkUrl: linkUrl || null,
      isActive,
      ...(imageBase64 && { imageBase64 }),
    });
  }

  function handlePageName(page: string) {
    switch (page) {
      case "CLASSES":
        return "Aulas";
      case "PRODUCTS":
        return "Produtos";
      case "ABOUT":
        return "O Ateliê";
      default:
        return page;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[95dvh] overflow-auto p-4 shadow-lg">
        <h2 className="text-2xl font-normal text-[#a35c42] mb-2">
          Editar Banner
        </h2>

        <p className="text-gray-600 mb-4 text-sm">
          Página: <span className="font-medium">{handlePageName(initialData?.page ?? "")}</span>
        </p>

        {loading ? (
          <p className="text-gray-500">Salvando banner...</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex justify-center">
              <ImageInput
                value={initialData?.imageUrl || null}
                onChange={setImageBase64}
              />
            </div>

            <PrimaryInput
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <PrimaryInput
              label="Subtítulo"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />

            {/* <PrimaryInput
              label="Link"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="/produtos"
            /> */}

            {/* <PrimarySwitch
              label="Banner ativo"
              checked={isActive}
              onChange={setIsActive}
            /> */}

            <div className="flex justify-end gap-3 pt-4">
              <GrayButton
                text="Cancelar"
                onClick={onClose}
                maxWidth="max-w-fit"
              />
              <BrownButton
                type="submit"
                disabled={loading}
                maxWidth="max-w-fit"
                text={loading ? "Salvando..." : "Salvar"}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
