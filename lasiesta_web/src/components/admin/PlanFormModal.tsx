"use client";
import { PlanFormData } from "../../services/plans.service";
import PrimaryRichText from "../ui/primaryRichText";
import React, { useEffect, useState } from "react";
import ColoredTextBox from "../ui/coloredTextBox";
import PrimarySwitch from "../ui/primarySwitch";
import PrimaryInput from "../ui/primaryInput";
import BrownButton from "../ui/brownButtom";
import GrayButton from "../ui/grayButtom";
import { Info } from "lucide-react";

type Props = {
  open: boolean;
  loading: boolean;
  initialData?: PlanFormData | null;
  onClose: () => void;
  onSubmit: (data: PlanFormData) => void;
};

export default function PlanFormModal({
  open,
  loading,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [infoVisible, setInfoVisible] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState<string>("");
  const [durationLabel, setDurationLabel] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  // gerar slug automaticamente
  useEffect(() => {
    setSlug(
      name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
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
    } else {
      setName("");
      setSlug("");
      setPrice("");
      setDurationLabel("");
      setShortDescription("");
      setLongDescription("");
      setIsActive(true);
      setIsFeatured(false);
    }
  }, [initialData, open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      name,
      slug,
      price: price ? Number(price) : null,
      durationLabel: durationLabel || null,
      shortDescription: shortDescription || null,
      longDescription: longDescription || null,
      isActive,
      isFeatured,
    });
  }

  function handleClose() {
    onClose();
  }
  console.log("initialData", initialData);
  console.log({ longDescription });
  console.log({ shortDescription });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-xl max-h-[95dvh] overflow-auto p-4 shadow-lg">
        {/* HEADER */}
        <div className="flex items-center justify-between">
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
              <li>A duração é a recorrência do plano, como &quot;mês&quot; ou &quot;aula&quot;.</li>
              <li>A descrição curta aparece nos cards e listas.</li>
              <li>A descrição longa aparece na página de detalhes.</li>
              <li>Planos em destaque podem aparecer na home.</li>
            </ul>
          </ColoredTextBox>
        )}

        {/* FORM */}
        {loading ? (
          <p className="text-gray-500">Salvando plano...</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <PrimaryInput
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Workshop de cerâmica"
              required
            />

            <PrimaryInput
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ex: workshop-ceramica"
              required
              disabled
            />

            <PrimaryInput
              label="Preço"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 150"
            />

            <PrimaryInput
              label="Duração"
              value={durationLabel}
              onChange={(e) => setDurationLabel(e.target.value)}
              placeholder="Ex: mês, workshop, 4 aulas"
            />

            <PrimaryRichText
              label="Descrição curta"
              value={shortDescription}
              onChange={setShortDescription}
              // placeholder="Resumo curto do plano"
            />

            <PrimaryRichText
              label="Descrição longa"
              value={longDescription}
              onChange={setLongDescription}
              // placeholder="Descrição completa do plano ou aula"
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
