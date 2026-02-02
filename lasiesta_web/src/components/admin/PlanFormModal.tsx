"use client";
import { translateApiErrors } from "../../utils/translateApiError";
import { PlanFormData } from "../../services/plans.service";
import PrimaryRichText from "../ui/primaryRichText";
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

type Props = {
  open: boolean;
  loading: boolean;
  initialData?: PlanFormData | null;
  onClose: () => void;
  onSubmit: (data: PlanFormData) => Promise<void>;
};

export default function PlanFormModal({
  open,
  loading,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [durationLabel, setDurationLabel] = useState("");
  const [infoVisible, setInfoVisible] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [price, setPrice] = useState<string>("");
  const [isActive, setIsActive] = useState(true);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  // gerar slug automaticamentes
  useEffect(() => {
    setSlug(
      name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    );
  }, [name]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
      setPrice(initialData.price !== null ? String(initialData.price) : "");
      setDurationLabel(initialData.durationLabel ?? "");
      setShortDescription(initialData.shortDescription ?? "");
      setLongDescription(initialData.longDescription ?? "");
      setIsActive(initialData.isActive);
      setIsFeatured(initialData.isFeatured ?? false);
      setImageBase64(null);
    } else {
      setName("");
      setSlug("");
      setPrice("");
      setDurationLabel("");
      setShortDescription("");
      setLongDescription("");
      setIsActive(true);
      setIsFeatured(false);
      setImageBase64(null);
    }
  }, [initialData, open]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    try {
      await onSubmit({
        name,
        slug,
        price: price ? Number(price) : null,
        durationLabel: durationLabel || null,
        shortDescription: shortDescription || null,
        longDescription: longDescription || null,
        isActive,
        isFeatured,
        ...(imageBase64 && { imageBase64 }),
      });
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        toast.error("Erro ao salvar o plano");
        return;
      } else {
        if (!err.response || !err.response.data) {
          toast.error("Erro ao salvar o plano");
          return;
        }
        const { fieldErrors, toastMessage } = translateApiErrors(
          err.response.data,
        );

        setErrors(fieldErrors);
        toast.error(toastMessage || "Erro ao salvar o plano");
      }
    }
  }

  function handleClose() {
    onClose();
    setName("");
    setSlug("");
    setPrice("");
    setDurationLabel("");
    setShortDescription("");
    setLongDescription("");
    setIsActive(true);
    setIsFeatured(false);
    setImageBase64(null);
    setInfoVisible(false);
    setErrors({});
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-xl max-h-[95dvh] overflow-auto p-4 shadow-lg">
        <button
          className="absolute top-3 right-3 font-bold text-gray-500 hover:text-red-700 cursor-pointer"
          onClick={handleClose}
        >
          &#10005;
        </button>

        <div className="flex items-center gap-1 mb-1">
          <h2 className="text-2xl font-normal text-[#a35c42] mb-1">
            {initialData ? "Editar plano" : "Novo plano"}
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

        <p className="text-gray-600 mb-3 text-sm">
          {initialData
            ? "Edite as informações do plano ou aula."
            : "Crie um novo plano, workshop ou aula."}
        </p>

        {/* INFO BOX */}
        {infoVisible && (
          <ColoredTextBox type="info" className="mb-3">
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>O nome identifica o plano no admin e no site.</li>
              <li>O slug é gerado automaticamente e usado na URL.</li>
              <li>O preço deve ser em reais (R$) e use ponto para decimais.</li>
              <li>
                A duração é a recorrência do plano, como &quot;mês&quot; ou
                &quot;aula&quot;.
              </li>
              <li>A descrição curta aparece nos cards e listas.</li>
              <li>A descrição longa aparece na página de detalhes.</li>
              <li>Planos em destaque podem aparecer na home.</li>
            </ul>
          </ColoredTextBox>
        )}

        {/* FORM */}
        {loading ? (
          <div className="flex justify-center items-center">
            <LoaderComp text={"Salvando plano..."} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="w-full flex justify-center items-center">
              <ImageInput
                value={initialData?.imageUrl || null}
                onChange={setImageBase64}
              />
            </div>

            <PrimaryInput
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Workshop de cerâmica"
              required
              error={errors.name}
            />

            <PrimaryInput
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ex: workshop-ceramica"
              required
              disabled={!!initialData}
              error={errors.slug}
            />

            <PrimaryInput
              label="Preço"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 150"
              error={errors.price}
            />

            <PrimaryInput
              label="Duração"
              value={durationLabel}
              onChange={(e) => setDurationLabel(e.target.value)}
              placeholder="Ex: mês, workshop, 4 aulas"
              error={errors.durationLabel}
            />

            <PrimaryRichText
              label="Descrição curta"
              value={shortDescription}
              onChange={setShortDescription}
              placeholder="Resumo curto do plano"
              error={errors.shortDescription}
            />

            <PrimaryRichText
              label="Descrição longa"
              value={longDescription}
              onChange={setLongDescription}
              placeholder="Descrição completa do plano ou aula"
              error={errors.longDescription}
            />

            <div className="flex items-center justify-start gap-5">
              <PrimarySwitch
                label="Plano ativo"
                checked={isActive}
                onChange={setIsActive}
              />
              <PrimarySwitch
                label="Plano em destaque"
                checked={isFeatured}
                onChange={setIsFeatured}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
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
                  loading ? "Salvando..." : initialData ? "Editar" : "Salvar"
                }
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
