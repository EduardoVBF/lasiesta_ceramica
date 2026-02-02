"use client";
import { translateApiErrors } from "../../utils/translateApiError";
import { HomeCarouselItem } from "../../services/carousel.service";
import React, { useEffect, useState } from "react";
import ColoredTextBox from "../ui/coloredTextBox";
import PrimarySwitch from "../ui/primarySwitch";
import PrimaryInput from "../ui/primaryInput";
import BrownButton from "../ui/brownButtom";
import GrayButton from "../ui/grayButtom";
import LoaderComp from "../ui/loaderComp";
import { toast } from "react-hot-toast";
import ImageInput from "./imageInput";
import { Info } from "lucide-react";
import { AxiosError } from "axios";

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
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [infoVisible, setInfoVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [subtitle, setSubtitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [title, setTitle] = useState("");

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
      setErrors({});
    }
  }, [initialData, open]);

  if (!open) return null;

  function handleClose() {
    onClose();
    setTitle("");
    setSubtitle("");
    setLinkUrl("");
    setIsActive(true);
    setImageBase64(null);
    setInfoVisible(false);
    setErrors({});
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    try {
      await onSubmit({
        title: title || null,
        subtitle: subtitle || null,
        linkUrl: linkUrl || null,
        isActive: isActive,
        ...(imageBase64 && { imageBase64 }),
      });
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        toast.error("Erro ao salvar o slide");
        return;
      } else {
        if (!err.response || !err.response.data) {
          toast.error("Erro ao salvar o slide");
          return;
        }
        const { fieldErrors, toastMessage } = translateApiErrors(
          err.response.data,
        );

        setErrors(fieldErrors);
        toast.error(toastMessage || "Erro ao salvar o slide");
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative bg-white rounded-2xl w-full max-w-lg p-4 shadow-lg max-h-[95dvh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 font-bold text-gray-500 hover:text-red-700 cursor-pointer"
          onClick={handleClose}
        >
          &#10005;
        </button>

        <div className="flex items-center gap-1 mb-3">
          <h2 className="text-2xl font-normal text-[#a35c42]">
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
          <div className="flex justify-center items-center">
            <LoaderComp text={"Salvando slide..."} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex justify-center">
              <ImageInput
                value={initialData?.imageUrl || null}
                onChange={setImageBase64}
                error={errors.imageBase64}
              />
            </div>

            <PrimaryInput
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
            />

            <PrimaryInput
              label="Subtítulo"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              error={errors.subtitle}
            />

            {/* <PrimaryInput
              label="Link"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="/produtos"
            /> */}

            <PrimarySwitch
              label="Banner ativo"
              checked={isActive}
              onChange={setIsActive}
              error={errors.isActive}
            />

            <div className="flex justify-end gap-3 pt-4">
              <GrayButton
                text="Cancelar"
                onClick={handleClose}
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
