"use client";
import { HomeCarouselItem } from "../../services/carousel.service";
import React, { useEffect, useState } from "react";
import PrimaryInput from "../ui/primaryInput";
import BrownButton from "../ui/brownButtom";
import GrayButton from "../ui/grayButtom";
import ImageInput from "./imageInput";
import PrimarySwitch from "../ui/primarySwitch";
import { Info } from "lucide-react";
import ColoredTextBox from "../ui/coloredTextBox";

type HomeCarouselFormData = {
  title?: string | null;
  subtitle?: string | null;
  linkUrl?: string | null;
  imageBase64?: string;
  isActive?: boolean;
};

type Props = {
  open: boolean;
  loading: boolean;
  initialData?: HomeCarouselItem;
  onClose: () => void;
  onSubmit: (data: HomeCarouselFormData) => void;
};

export default function HomeCarouselFormModal({
  open,
  loading,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title ?? "");
      setSubtitle(initialData.subtitle ?? "");
      setLinkUrl(initialData.linkUrl ?? "");
      setImageBase64(null);
      setIsActive(initialData.isActive);
    } else {
      setTitle("");
      setSubtitle("");
      setLinkUrl("");
      setImageBase64(null);
      setIsActive(true);
    }
  }, [initialData, open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      title: title || null,
      subtitle: subtitle || null,
      linkUrl: linkUrl || null,
      isActive: isActive,
      ...(imageBase64 && { imageBase64 }),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl w-full max-w-lg p-4 shadow-lg max-h-[95dvh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-normal text-[#a35c42] mb-3">
            {initialData ? "Editar slide" : "Novo slide"}
          </h2>

          <Info
            size={20}
            className={`cursor-pointer ${
              infoVisible ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setInfoVisible((p) => !p)}
          />
        </div>

        {infoVisible && (
          <ColoredTextBox type="info" className="mb-3">
            <ul className="list-disc pl-4 text-sm space-y-1">
              <li>Imagens grandes podem afetar o desempenho do site</li>
              <li>Use imagens otimizadas para web (ex: JPEG, PNG)</li>
              <li>Use imagens na proporção correta para evitar distorções</li>
              <li>Banner inativo não será exibido no site</li>
              {/* <li>Use links relativos para páginas internas (ex: /produtos)</li> */}
            </ul>
          </ColoredTextBox>
        )}

        {loading ? (
          <p className="text-gray-500">Salvando slide...</p>
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

            <PrimaryInput
              label="Link"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="/produtos"
            />

            <PrimarySwitch
              label="Banner ativo"
              checked={isActive}
              onChange={setIsActive}
            />

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
                text={
                  loading ? "Salvando..." : initialData ? "Editar" : "Criar"
                }
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
