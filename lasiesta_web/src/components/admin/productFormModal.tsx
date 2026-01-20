"use client";
import { ProductFormData } from "../../services/products.service";
import { Category } from "../../services/categories.service";
import PrimaryRichText from "../ui/primaryRichText";
import React, { useEffect, useState } from "react";
import ColoredTextBox from "../ui/coloredTextBox";
import PrimarySwitch from "../ui/primarySwitch";
import PrimarySelect from "../ui/primarySelect";
import PrimaryInput from "../ui/primaryInput";
import BrownButton from "../ui/brownButtom";
import GrayButton from "../ui/grayButtom";
import LoaderComp from "../ui/loaderComp";
import ImageInput from "./imageInput";
import { Info } from "lucide-react";

type Props = {
  open: boolean;
  loading: boolean;
  categories: Category[];
  initialData?: ProductFormData | null;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
};

export default function ProductFormModal({
  open,
  loading,
  categories,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [infoVisible, setInfoVisible] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");

  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");

  const [colors, setColors] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [salePrice, setSalePrice] = useState("");

  const [mainImageBase64, setMainImageBase64] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
      setPrice(String(initialData.price));
      setShortDescription(initialData.shortDescription ?? "");
      setLongDescription(initialData.longDescription ?? "");
      setMaterial(initialData.material ?? "");
      setDimensions(initialData.dimensions ?? "");
      setColors(initialData.colors?.join(", ") ?? "");
      setCategoryId(initialData.categoryId ?? null);
      setIsActive(initialData.isActive);
      setIsFeatured(initialData.isFeatured);
      setIsSale(!!initialData.isSale);
      setSalePrice(initialData.salePrice ? String(initialData.salePrice) : "");
      setMainImageBase64(null);
    } else {
      reset();
    }
  }, [initialData, open]);

  useEffect(() => {
    if (!initialData) {
      setSlug(
        name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  }, [name, initialData]);

  if (!open) return null;

  function reset() {
    setName("");
    setSlug("");
    setPrice("");
    setShortDescription("");
    setLongDescription("");
    setMaterial("");
    setDimensions("");
    setColors("");
    setCategoryId(null);
    setIsActive(true);
    setIsFeatured(false);
    setIsSale(false);
    setSalePrice("");
    setMainImageBase64(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      name,
      slug,
      price: Number(price),
      shortDescription: shortDescription || null,
      longDescription: longDescription || null,
      material: material || null,
      dimensions: dimensions || null,
      colors: colors ? colors.split(",").map((c) => c.trim()) : undefined,
      categoryId,
      isActive,
      isFeatured,
      isSale,
      ...(isSale && { salePrice: Number(salePrice) }),
      ...(mainImageBase64 && { mainImageBase64 }),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[95dvh] overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-[#a35c42]">
            {initialData ? "Editar produto" : "Novo produto"}
          </h2>
          <Info
            size={20}
            className="cursor-pointer text-gray-500"
            onClick={() => setInfoVisible((p) => !p)}
          />
        </div>

        {loading ? (
          <LoaderComp text="Salvando produto..." />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="w-full flex items-center justify-center">
              <ImageInput value={null} onChange={setMainImageBase64} />
            </div>

            <PrimaryInput
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <PrimaryInput
              label="Slug"
              value={slug}
              disabled={!!initialData}
              onChange={(e) => setSlug(e.target.value)}
            />
            <PrimaryInput
              label="Preço"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <PrimarySelect
              label="Categoria"
              value={categoryId ?? ""}
              onChange={(e) => setCategoryId(e.target.value || null)}
              options={[
                { value: "", label: "Sem categoria" },
                ...categories.map((c) => ({
                  value: c.id,
                  label: c.name,
                })),
              ]}
            />

            <PrimaryRichText
              label="Descrição curta"
              value={shortDescription}
              onChange={setShortDescription}
            />
            <PrimaryRichText
              label="Descrição longa"
              value={longDescription}
              onChange={setLongDescription}
            />

            <PrimaryInput
              label="Material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            />
            <PrimaryInput
              label="Dimensões"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
            />
            <PrimaryInput
              label="Cores"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
            />

            <div className="flex gap-6">
              <PrimarySwitch
                label="Ativo"
                checked={isActive}
                onChange={setIsActive}
              />
              <PrimarySwitch
                label="Destaque"
                checked={isFeatured}
                onChange={setIsFeatured}
              />
              <PrimarySwitch
                label="Promoção"
                checked={isSale}
                onChange={setIsSale}
              />
            </div>

            {isSale && (
              <PrimaryInput
                label="Preço promocional"
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            )}

            <div className="flex justify-end gap-3 pt-4">
              <GrayButton text="Cancelar" onClick={onClose} />
              <BrownButton
                type="submit"
                text={initialData ? "Editar" : "Salvar"}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
