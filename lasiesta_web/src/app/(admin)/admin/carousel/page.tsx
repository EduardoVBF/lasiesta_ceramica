"use client";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  useCreateHomeCarouselItemMutation,
  useUpdateHomeCarouselItemMutation,
  useUpdateHomeCarouselStatusMutation,
  useReorderHomeCarouselMutation,
} from "../../../../hooks/mutations/useCarouselMutations";
import { useAdminHomeCarousel } from "../../../../hooks/queries/useAdminHomeCarousel";
import CarouselAdminSkeleton from "@/components/skeletons/carouselAdminSkeleton";
import SortableCarouselItem from "@/components/admin/sortableCarouselItem";
import HomeCarouselFormModal from "@/components/admin/carouselFormModal";
import { HomeCarouselItem } from "../../../../services/carousel.service";
import BackgroundImage from "@/components/layout/backgroundImage";
import HomeCarouselCard from "@/components/cards/homeCoruselCard";
import ColoredTextBox from "@/components/ui/coloredTextBox";
import BrownButton from "@/components/ui/brownButtom";
import toast, { Toaster } from "react-hot-toast";
import { DragEndEvent } from "@dnd-kit/core";
import { Info } from "lucide-react";
import { AxiosError } from "axios";
import { useState } from "react";

export default function AdminHomeCarouselPage() {
  const carouselQuery = useAdminHomeCarousel();

  const createCarouselItemMutation = useCreateHomeCarouselItemMutation();
  const updateCarouselItemMutation = useUpdateHomeCarouselItemMutation();
  const updateCarouselStatusMutation = useUpdateHomeCarouselStatusMutation();
  const reorderCarouselMutation = useReorderHomeCarouselMutation();

  const items = carouselQuery.data ?? [];
  const loading = carouselQuery.isLoading;
  const carouselError = carouselQuery.isError;

  const saving =
    createCarouselItemMutation.isPending ||
    updateCarouselItemMutation.isPending;

  const togglingItemId = updateCarouselStatusMutation.variables?.id;

  const [editingItem, setEditingItem] = useState<HomeCarouselItem | null>(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [creating, setCreating] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const activeItems = items.filter((i) => i.isActive);
  const inactiveItems = items.filter((i) => !i.isActive);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = activeItems.findIndex((item) => item.id === active.id);
    const newIndex = activeItems.findIndex((item) => item.id === over.id);

    const reorderedActive = arrayMove(activeItems, oldIndex, newIndex);

    const updatedActive = reorderedActive.map((item, index) => ({
      ...item,
      orderIndex: (index + 1) * 1000,
    }));

    reorderCarouselMutation.mutate(
      {
        reorderedItems: [...updatedActive, ...inactiveItems],
      },
      {
        onSuccess: () => {
          toast.success("Ordem dos slides atualizada!");
        },
        onError: () => {
          toast.error("Erro ao salvar nova ordem");
        },
      },
    );
  }

  function handleToggleItem(item: HomeCarouselItem) {
    updateCarouselStatusMutation.mutate(
      {
        id: item.id,
        isActive: !item.isActive,
      },
      {
        onSuccess: (updated) => {
          toast.success(
            `Slide ${updated.isActive ? "ativado" : "desativado"} com sucesso!`,
          );
        },
        onError: (err) => {
          if (err instanceof AxiosError) {
            toast.error(
              err.response?.data?.error ||
                err.response?.data?.message ||
                err.message,
            );
            return;
          }

          toast.error("Erro inesperado ao salvar slide");
        },
      },
    );
  }

  return (
    <div className="flex flex-col">
      <BackgroundImage
        src="/image/organic3.jpg"
        alt="Textura de fundo do ateliê"
        opacity={20}
      />

      <Toaster position="top-center" />

      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6 z-10">
        <div>
          <h2 className="text-4xl font-normal text-[#a35c42]">Carrossel</h2>

          <div className="flex items-center mt-2 gap-1">
            <p className="text-gray-600 max-w-xl">
              Gerencie os slides exibidos na página principal.
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
        </div>

        <BrownButton
          text="+ Novo slide"
          maxWidth="max-w-fit"
          onClick={() => setCreating(true)}
        />
      </header>

      {infoVisible && (
        <ColoredTextBox className="my-2 z-10 w-fit" type="info">
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li>O carrossel aparece na página inicial do site.</li>
            <li>
              A ordem dos slides é definida aqui. Arraste os slides ativos para
              reorganizar.
            </li>
            <li>Slides inativos não participam da ordem.</li>
          </ul>
        </ColoredTextBox>
      )}

      {carouselError ? (
        <ColoredTextBox className="my-2 z-10" type="error">
          Erro ao carregar carrossel. Tente novamente mais tarde.
        </ColoredTextBox>
      ) : loading ? (
        <CarouselAdminSkeleton />
      ) : (
        <>
          {/* ATIVOS (COM DRAG) */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activeItems.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <section className="grid grid-cols-1 gap-6 z-10">
                {activeItems.map((item, index) => (
                  <SortableCarouselItem key={item.id} id={item.id}>
                    <HomeCarouselCard
                      item={item}
                      index={index}
                      onEdit={() => setEditingItem(item)}
                      onToggle={() => handleToggleItem(item)}
                      isToggling={
                        updateCarouselStatusMutation.isPending &&
                        togglingItemId === item.id
                      }
                    />
                  </SortableCarouselItem>
                ))}

                {activeItems.length === 0 && (
                  <p className="text-gray-500 text-center py-12">
                    Nenhum slide ativo.
                  </p>
                )}
              </section>
            </SortableContext>
          </DndContext>

          {/* INATIVOS (SEM DRAG) */}
          {inactiveItems.length > 0 && (
            <div className="mt-10 z-10">
              <h3 className="text-2xl font-normal text-[#a35c42] mb-4">
                Slides inativos
              </h3>

              <section className="grid grid-cols-1 gap-6 opacity-70">
                {inactiveItems.map((item, index) => (
                  <HomeCarouselCard
                    key={item.id}
                    item={item}
                    index={index}
                    onEdit={() => setEditingItem(item)}
                    onToggle={() => handleToggleItem(item)}
                    isToggling={
                      updateCarouselStatusMutation.isPending &&
                      togglingItemId === item.id
                    }
                  />
                ))}
              </section>
            </div>
          )}
        </>
      )}

      {/* MODAL */}
      <HomeCarouselFormModal
        open={creating || !!editingItem}
        loading={saving}
        initialData={editingItem || undefined}
        onClose={() => {
          setCreating(false);
          setEditingItem(null);
        }}
        onSubmit={async (data) => {
          if (editingItem) {
            await updateCarouselItemMutation.mutateAsync({
              id: editingItem.id,
              data,
            });

            toast.success("Slide atualizado com sucesso!");
          } else {
            await createCarouselItemMutation.mutateAsync(data);

            toast.success("Slide criado com sucesso!");
          }

          setCreating(false);
          setEditingItem(null);
        }}
      />
    </div>
  );
}
