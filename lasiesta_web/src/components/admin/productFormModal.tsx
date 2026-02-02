"use client";
import { translateApiErrors } from "../../utils/translateApiError";
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
import { toast } from "react-hot-toast";
import { Info, X } from "lucide-react";
import ImageInput from "./imageInput";
import { AxiosError } from "axios";

type Props = {
  open: boolean;
  loading: boolean;
  categories: Category[];
  initialData?: ProductFormData | null;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
};

type Tab = "general" | "description" | "media";

type SecondaryImage = {
  type?: "base64";
  value?: string | null; // url ou base64
  file?: string; // somente base64 novo
};

export default function ProductFormModal({
  open,
  loading,
  categories,
  initialData,
  onClose,
  onSubmit,
}: Props) {
  const [tab, setTab] = useState<Tab>("general");
  const [infoVisible, setInfoVisible] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");

  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");

  const [colors, setColors] = useState<string[]>([]);
  const [colorInput, setColorInput] = useState("");

  const [categoryId, setCategoryId] = useState<string | null>(null);

  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [salePrice, setSalePrice] = useState("");

  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [mainImageBase64, setMainImageBase64] = useState<string | null>(null);

  const [secondaryImages, setSecondaryImages] = useState<SecondaryImage[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ================= INIT ================= */
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
      setPrice(String(initialData.price));
      setShortDescription(initialData.shortDescription ?? "");
      setLongDescription(initialData.longDescription ?? "");
      setMaterial(initialData.material ?? "");
      setDimensions(initialData.dimensions ?? "");
      setColors(initialData.colors ?? []);
      setCategoryId(initialData.categoryId ?? null);
      setIsActive(initialData.isActive);
      setIsFeatured(initialData.isFeatured);
      setIsSale(!!initialData.isSale);
      setSalePrice(initialData.salePrice ? String(initialData.salePrice) : "");

      setMainImageUrl(initialData.mainImageUrl ?? null);
      setMainImageBase64(null);

      setSecondaryImages(
        (initialData.secondaryImages ?? []).map((url) => ({
          value: url,
        })),
      );
    } else {
      reset();
    }
  }, [initialData, open]);

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

  if (!open) return null;

  function reset() {
    setTab("general");
    setName("");
    setSlug("");
    setPrice("");
    setShortDescription("");
    setLongDescription("");
    setMaterial("");
    setDimensions("");
    setColors([]);
    setCategoryId(null);
    setIsActive(true);
    setIsFeatured(false);
    setIsSale(false);
    setSalePrice("");
    setMainImageUrl(null);
    setMainImageBase64(null);
    setSecondaryImages([]);
    setErrors({});
  }

  function handleClose() {
    onClose();
    reset();
    setInfoVisible(false);
    setErrors({});
  }

  /* ================= COLORS ================= */
  function addColor() {
    if (!colorInput.trim()) return;
    if (colors.includes(colorInput.trim())) return;
    setColors((prev) => [...prev, colorInput.trim()]);
    setColorInput("");
  }

  function removeColor(color: string) {
    setColors((prev) => prev.filter((c) => c !== color));
  }

  /* ================= SUBMIT ================= */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const secondaryImagesBase64 = secondaryImages
      .filter((img) => img.value !== null)
      .map((img) => img.value!);

    try {
      await onSubmit({
        name,
        slug,
        price: Number(price),
        shortDescription: shortDescription || null,
        longDescription: longDescription || null,
        material: material || null,
        dimensions: dimensions || null,
        colors,
        categoryId,
        isActive,
        isFeatured,
        isSale,
        ...(isSale && { salePrice: Number(salePrice) }),
        ...(mainImageBase64 && { mainImageBase64 }),
        ...(secondaryImagesBase64.length && { secondaryImagesBase64 }),
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

  /* ================= RENDER ================= */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[95dvh] overflow-auto p-4">
        <button
          className="absolute top-3 right-3 font-bold text-gray-500 hover:text-red-700 cursor-pointer"
          onClick={handleClose}
        >
          &#10005;
        </button>

        <div className="flex items-center gap-1 mb-4">
          <h2 className="text-2xl text-[#a35c42]">
            {initialData ? "Editar produto" : "Novo produto"}
          </h2>
          <Info
            size={20}
            className="cursor-pointer text-gray-500"
            onClick={() => setInfoVisible((p) => !p)}
          />
        </div>

        {infoVisible && (
          <ColoredTextBox type="info" className="mb-4">
            <ul className="list-disc pl-4 text-sm space-y-1">
              <li>O slug é gerado automaticamente.</li>
              <li>Até 4 imagens secundárias.</li>
              <li>Preço promocional só vale se ativado.</li>
            </ul>
          </ColoredTextBox>
        )}

        {/* TABS */}
        <div className="flex gap-2 mb-4">
          {[
            { id: "general", label: "Geral" },
            { id: "description", label: "Descrição" },
            { id: "media", label: "Mídia" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`px-4 py-2 rounded-full text-sm ${
                tab === t.id
                  ? "bg-[#a35c42] text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <LoaderComp text="Salvando produto..." />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* === GENERAL === */}
            {tab === "general" && (
              <>
                <PrimaryInput
                  label="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  error={errors.name}
                />
                <PrimaryInput
                  label="Slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  disabled={!!initialData}
                  required
                  error={errors.slug}
                />
                <PrimaryInput
                  label="Preço"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  error={errors.price}
                />

                <PrimarySelect
                  label="Categoria"
                  value={categoryId ?? ""}
                  onChange={(e) => setCategoryId(e.target.value || null)}
                  options={[
                    { value: "", label: "Sem categoria" },
                    ...categories.map((c) => ({ value: c.id, label: c.name })),
                  ]}
                  error={errors.categoryId}
                />

                <div className="flex gap-6">
                  <PrimarySwitch
                    label="Ativo"
                    checked={isActive}
                    onChange={setIsActive}
                    error={errors.isActive}
                  />
                  <PrimarySwitch
                    label="Destaque"
                    checked={isFeatured}
                    onChange={setIsFeatured}
                    error={errors.isFeatured}
                  />
                  <PrimarySwitch
                    label="Promoção"
                    checked={isSale}
                    onChange={setIsSale}
                    error={errors.isSale}
                  />
                </div>

                {isSale && (
                  <PrimaryInput
                    label="Preço promocional"
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    required={isSale}
                    error={errors.salePrice}
                  />
                )}
              </>
            )}

            {/* === DESCRIPTION === */}
            {tab === "description" && (
              <>
                <PrimaryRichText
                  label="Descrição curta"
                  value={shortDescription}
                  onChange={setShortDescription}
                  error={errors.shortDescription}
                />
                <PrimaryRichText
                  label="Descrição longa"
                  value={longDescription}
                  onChange={setLongDescription}
                  error={errors.longDescription}
                />
                <PrimaryInput
                  label="Material"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  error={errors.material}
                />
                <PrimaryInput
                  label="Dimensões"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  error={errors.dimensions}
                />
              </>
            )}

            {/* === MEDIA === */}
            {tab === "media" && (
              <>
                <p className="text-sm font-medium">Imagem principal</p>
                <ImageInput
                  value={mainImageUrl}
                  onChange={setMainImageBase64}
                  error={errors.mainImageBase64}
                />

                <p className="text-sm font-medium mt-4">Imagens secundárias</p>
                <div className="flex gap-3 flex-wrap">
                  {secondaryImages.map((img, i) => (
                    <div key={i} className="relative">
                      <ImageInput
                        value={img.value}
                        error={errors.secondaryImagesBase64}
                        onChange={(base64) =>
                          setSecondaryImages((prev) =>
                            prev.map((p, index) =>
                              index === i
                                ? { type: "base64", value: base64! }
                                : p,
                            ),
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSecondaryImages((prev) =>
                            prev.filter((_, index) => index !== i),
                          )
                        }
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}

                  {secondaryImages.length < 4 && (
                    <ImageInput
                      key={`add-image-${secondaryImages.length}`}
                      value={null}
                      onChange={(base64) => {
                        if (base64) {
                          setSecondaryImages((prev) => [
                            ...prev,
                            { type: "base64", value: base64 },
                          ]);
                        }
                      }}
                    />
                  )}
                </div>

                {/* COLORS */}
                <div className="mt-4">
                  <p className="text-sm font-medium mb-1">Cores</p>
                  <div className="flex gap-2 flex-wrap mb-2">
                    {colors.map((c) => (
                      <span
                        key={c}
                        className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        {c}
                        <button type="button" onClick={() => removeColor(c)}>
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-end gap-2">
                    <PrimaryInput
                      label="Nova cor"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      error={errors.colors}
                    />
                    <BrownButton
                      type="button"
                      text="Adicionar"
                      onClick={addColor}
                      maxWidth="max-w-fit"
                    />
                  </div>
                </div>
              </>
            )}

            {/* FOOTER */}
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
