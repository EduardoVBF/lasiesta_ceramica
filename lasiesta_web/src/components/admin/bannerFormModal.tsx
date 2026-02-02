"use client";
import { translateApiErrors } from "../../utils/translateApiError";
import { Banner } from "../../services/banner.service";
import React, { useEffect, useState } from "react";
import ColoredTextBox from "../ui/coloredTextBox";
import PrimaryInput from "../ui/primaryInput";
import BrownButton from "../ui/brownButtom";
import GrayButton from "../ui/grayButtom";
import LoaderComp from "../ui/loaderComp";
import { toast } from "react-hot-toast";
import ImageInput from "./imageInput";
import { Info } from "lucide-react";
import { AxiosError } from "axios";

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
  const [infoVisible, setInfoVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title ?? "");
      setSubtitle(initialData.subtitle ?? "");
      setLinkUrl(initialData.linkUrl ?? "");
      setIsActive(initialData.isActive);
      setImageBase64(null);
      setErrors({});
    }
  }, [initialData, open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    try {
      await onSubmit({
        title: title || null,
        subtitle: subtitle || null,
        linkUrl: linkUrl || null,
        isActive,
        ...(imageBase64 && { imageBase64 }),
      });
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        toast.error("Erro ao salvar o banner");
        return;
      } else {
        if (!err.response || !err.response.data) {
          toast.error("Erro ao salvar o banner");
          return;
        }
        const { fieldErrors, toastMessage } = translateApiErrors(
          err.response.data,
        );
        setErrors(fieldErrors);
        toast.error(toastMessage || "Erro ao salvar o banner");
      }
    }
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
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[95dvh] overflow-auto p-4 shadow-lg">
        <button
          className="absolute top-3 right-3 font-bold text-gray-500 hover:text-red-700 cursor-pointer"
          onClick={handleClose}
        >
          &#10005;
        </button>

        <div className="flex items-center gap-1 mb-1">
          <h2 className="text-2xl font-normal text-[#a35c42]  ">
            Editar Banner
          </h2>

          <Info
            size={20}
            className={`cursor-pointer ${
              infoVisible
                ? "text-blue-500 hover:text-gray-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setInfoVisible((prev) => !prev)}
          />
        </div>

        <p className="text-gray-600 mb-4 text-sm">
          Página:{" "}
          <span className="font-medium">
            {handlePageName(initialData?.page ?? "")}
          </span>
        </p>

        {/* INFO BOX */}
        {infoVisible && (
          <ColoredTextBox type="info" className="mb-3">
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Cada banner deve ter uma imagem, título e subtítulo.</li>
              <li>
                Certifique-se de que o banner esteja ativo para ser exibido.
              </li>
              <li>Cada banner corresponde a uma página específica do site.</li>
            </ul>
          </ColoredTextBox>
        )}

        {loading ? (
          <div className="flex justify-center items-center">
            <LoaderComp text={"Salvando banner..."} />
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

            {/* <PrimarySwitch
              label="Banner ativo"
              checked={isActive}
              onChange={setIsActive}
            /> */}

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
                text={loading ? "Salvando..." : "Salvar"}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
