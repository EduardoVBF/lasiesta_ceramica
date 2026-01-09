"use client";
import {
  getAdminBanners,
  Banner,
  updateBanner,
} from "../../../../services/banner.service";
import BackgroundImage from "@/components/layout/backgroundImage";
import BannerFormModal from "@/components/admin/bannerFormModal";
import BannerCard from "@/components/admin/bannerCard";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAdminBanners()
      .then(setBanners)
      .catch((err) =>
        toast.error(
          `Erro ao carregar banners: ${
            err.response?.data?.error || err.message
          }`
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Carregando banners...</p>;
  }

  return (
    <>
      <div className="flex flex-col">
        <BackgroundImage
          src="/image/organic3.jpg"
          alt="Textura de fundo do ateliê"
          opacity={20}
        />

        <Toaster position="top-center" />

        {/* HEADER */}
        <header className="flex flex-col gap-4 mb-6 z-10">
          <h2 className="text-4xl font-normal text-[#a35c42]">
            Banners do Site
          </h2>
          <p className="text-gray-600 max-w-xl">
            Edite os banners exibidos nas páginas principais do site.
          </p>
        </header>

        {/* LISTAGEM */}
        <section className="grid grid-cols-1 gap-6 z-10">
          {banners.map((banner) => (
            <BannerCard
              key={banner.id}
              banner={banner}
              onEdit={() => setEditingBanner(banner)}
            />
          ))}
        </section>

        {/* MODAL */}
        <BannerFormModal
          open={!!editingBanner}
          loading={saving}
          initialData={editingBanner || undefined}
          onClose={() => setEditingBanner(null)}
          onSubmit={async (data) => {
            if (!editingBanner) return;

            try {
              setSaving(true);

              const updated = await updateBanner(editingBanner.id, data);

              setBanners((prev) =>
                prev.map((b) => (b.id === updated.id ? updated : b))
              );

              toast.success("Banner atualizado com sucesso!");
              setEditingBanner(null);
            } catch (err: any) {
              toast.error(
                `Erro ao salvar banner: ${
                  err.response?.data?.error || err.message
                }`
              );
            } finally {
              setSaving(false);
            }
          }}
        />
      </div>
    </>
  );
}
