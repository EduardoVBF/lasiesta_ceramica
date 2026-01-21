"use client";
import { Product } from "../../services/products.service";
import StatusBadge from "../ui/statusBadge";
import ImageZoom from "../layout/ImageZoom";
import { BsToggleOn } from "react-icons/bs";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import Link from "next/link";

type Props = {
  product: Product;
  onEdit: () => void;
  onToggle: () => void;
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function AdminProductCard({ product, onEdit, onToggle }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col md:flex-row gap-4 bg-white rounded-2xl shadow p-2 hover:scale-[1.02] transition-transform"
    >
      {/* IMAGE */}
      <div className="relative w-40 h-40 aspect-square rounded-xl overflow-hidden bg-gray-100">
        <ImageZoom
          src={product.mainImageUrl || "/image/placeholder.jpg"}
          alt={product.name}
          fill={true}
          zoom
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex justify-between gap-3">
        <div className="flex flex-col justify-between">
          <div>
            <Link
              href={`/admin/products/${product.id}`}
              className="text-gray-800 hover:hover:text-[#a35c42] transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold line-clamp-3">
                {product.name}
              </h3>
            </Link>

            <div
              className="prose prose-sm max-w-none text-gray-600 text-xs line-clamp-2 mb-1"
              dangerouslySetInnerHTML={{
                __html: product.shortDescription || "",
              }}
            />
          </div>

          <div>
            {/* PRICE */}
            <div className="mt-2">
              {product.isSale && product.salePrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm line-through text-gray-400">
                    {formatBRL(Number(product.price))}
                  </span>
                  <span className="text-lg font-bold text-red-600">
                    {formatBRL(Number(product.salePrice))}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-800">
                  {formatBRL(Number(product.price))}
                </span>
              )}
            </div>
            {/* BADGES */}
            <div className="flex items-center gap-1 my-1">
              <span className="bg-[#a35c42] text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                {product.category?.name || "Sem categoria"}
              </span>
              <StatusBadge active={product.isActive} />
              {product.isFeatured && (
                <span className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                  Destaque
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-start gap-1">
          {/* EDIT */}
          <button
            onClick={onEdit}
            title="Editar produto"
            className="inline-flex items-center gap-2 p-1 rounded-full text-sm font-medium text-gray-600 hover:text-[#a35c42] transition"
          >
            <Pencil size={25} />
          </button>

          {/* TOGGLE */}
          <button
            onClick={onToggle}
            title={product.isActive ? "Desativar produto" : "Ativar produto"}
            className={`inline-flex items-center gap-2 rounded-xl text-sm font-medium transition ${
              product.isActive
                ? "text-green-700 hover:text-red-700"
                : "text-red-700 hover:text-green-700"
            }`}
          >
            <BsToggleOn
              size={30}
              className={`${
                product.isActive
                  ? "hover:rotate-180"
                  : "rotate-180 hover:rotate-0"
              }`}
            />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
