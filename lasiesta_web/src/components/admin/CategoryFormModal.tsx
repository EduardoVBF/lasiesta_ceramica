"use client";
import React, { useEffect, useState } from "react";
import ColoredTextBox from "../ui/coloredTextBox";
import PrimarySwitch from "../ui/primarySwitch";
import PrimaryInput from "../ui/primaryInput";
import BrownButton from "../ui/brownButtom";
import LoaderComp from "../ui/loaderComp";
import GrayButton from "../ui/grayButtom";
import ImageInput from "./imageInput";
import { Info } from "lucide-react";

interface CategoryFormData {
  name: string;
  slug: string;
  isActive: boolean;
  imageBase64?: string | null;
  isFeatured?: boolean;
  imageUrl?: string | null;
}

interface Props {
  open: boolean;
  loading: boolean;
  initialData?: CategoryFormData | null;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => void;
}

export default function CategoryFormModal({
  open,
  loading,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

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
      setIsActive(initialData.isActive);
      setIsFeatured(initialData.isFeatured ?? false);
      setImageBase64(null);
    } else {
      setName("");
      setSlug("");
      setIsActive(true);
      setIsFeatured(false);
      setImageBase64(null);
    }
  }, [initialData, open]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      name,
      slug,
      isActive,
      isFeatured,
      ...(imageBase64 && { imageBase64 }),
    });
    // handleClose();
  }

  function handleClose() {
    setName("");
    setSlug("");
    setIsActive(true);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-normal text-[#a35c42] mb-1">
            {initialData ? "Editar categoria" : "Nova categoria"}
          </h2>
          <Info
            size={20}
            name="ajuda"
            className={`${
              infoVisible
                ? "text-blue-500 hover:text-gray-500"
                : "text-gray-500 hover:text-blue-500"
            } cursor-pointer`}
            onClick={() => setInfoVisible((prev) => !prev)}
          />
        </div>

        <p className="text-gray-600 mb-3 text-sm">
          {initialData
            ? "Edite os detalhes da categoria."
            : "Crie uma nova categoria para organizar os produtos."}
        </p>

        {infoVisible && (
          <ColoredTextBox type="info" className="mb-3">
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>
                Escolha o nome da categoria e o slug será feito automaticamente,
                você pode editar se desejar.
              </li>
              <li>O slug é uma versão amigável do nome, usada na URL.</li>
              <li>
                Selecione também se a categoria está ativa ou não, categorias
                ativas são exibidas no site.
              </li>
            </ul>
          </ColoredTextBox>
        )}

        {loading ? (
          <div className="flex justify-center items-center">
            <LoaderComp text={"Salvando categoria..."} />
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
              placeholder="Ex: Copos"
              required
            />

            <PrimaryInput
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ex: copos"
              required
              disabled={!!initialData}
            />

            <div className="flex items-center justify-start gap-5">
              <PrimarySwitch
                label="Categoria ativa"
                checked={isActive}
                onChange={setIsActive}
              />
              <PrimarySwitch
                label="Categoria em destaque"
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
