"use client";
import { useUpdateBannerMutation } from "../../../../hooks/mutations/useBannerMutations";
import BannersGridSkeleton from "@/components/skeletons/bannersGridSkeleton";
import { useAdminBanners } from "../../../../hooks/queries/useAdminBanners";
import BackgroundImage from "@/components/layout/backgroundImage";
import BannerFormModal from "@/components/admin/bannerFormModal";
import { Banner } from "../../../../services/banner.service";
import ColoredTextBox from "@/components/ui/coloredTextBox";
import BannerCard from "@/components/admin/bannerCard";
import toast, { Toaster } from "react-hot-toast";
import { Info } from "lucide-react";
import { useState } from "react";

export default function AdminBannersPage() {
  const bannersQuery = useAdminBanners();
  const updateBannerMutation = useUpdateBannerMutation();

  const banners = bannersQuery.data ?? [];
  const loading = bannersQuery.isLoading;
  const bannersError = bannersQuery.isError;
  const savingBanner = updateBannerMutation.isPending;

  const [infoVisible, setInfoVisible] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

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
        <header className="flex flex-col gap-2 mb-6 z-10">
          <h2 className="text-4xl font-normal text-[#a35c42]">
            Banners do Site
          </h2>
          <div className="flex items-center mt-0 gap-1">
            <p className="text-gray-600 max-w-xl">
              Edite os banners exibidos nas páginas principais do site.
            </p>
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
        </header>

        {infoVisible && (
          <ColoredTextBox className="my-2 z-10 w-fit" type="info">
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Os banners são exibidos em páginas específicas do site.</li>
              <li>
                Cada banner deve ter uma imagem, título e descrição adequados ao
                contexto da página.
              </li>
              <li>
                Os banners são o cabeçalho visual das páginas que eles
                representam.
              </li>
            </ul>
          </ColoredTextBox>
        )}

        {bannersError ? (
          <ColoredTextBox className="my-2 z-10 w-fit" type="error">
            Erro ao carregar banners. Tente novamente mais tarde.
          </ColoredTextBox>
        ) : loading ? (
          <BannersGridSkeleton />
        ) : (
          <section className="grid grid-cols-1 gap-6 z-10">
            {banners.map((banner) => (
              <BannerCard
                key={banner.id}
                banner={banner}
                onEdit={() => setEditingBanner(banner)}
              />
            ))}
          </section>
        )}

        {/* MODAL */}
        <BannerFormModal
          open={!!editingBanner}
          loading={savingBanner}
          initialData={editingBanner || undefined}
          onClose={() => setEditingBanner(null)}
          onSubmit={async (data) => {
            if (!editingBanner) return;

            await updateBannerMutation.mutateAsync({
              id: editingBanner.id,
              data,
            });

            toast.success("Banner atualizado com sucesso!");
            setEditingBanner(null);
          }}
        />
      </div>
    </>
  );
}
