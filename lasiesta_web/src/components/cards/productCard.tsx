"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Product } from "../../services/products.service";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import ImageZoom from "../layout/ImageZoom";
import BrownButton from "../ui/brownButtom";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col overflow-hidden rounded-[32px] bg-white border border-[#e7ddd2] shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)] transition-all duration-500 h-full"
      aria-labelledby={`product-${product.id}-title`}
    >
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-[#f5eee6]">
        <ImageZoom
          src={product.mainImageUrl ?? "/image/IMG_0023.JPG"}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-[1200ms] group-hover:scale-105"
          zoom
          fill
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {product.isFeatured && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 text-[#5c3d2e] text-xs font-medium shadow-md">
              <FaStar size={10} />
              Destaque
            </span>
          )}

          {product.isSale && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#a35c42] text-white text-xs font-medium shadow-md">
              <RiDiscountPercentFill size={12} />
              Oferta
            </span>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-6">
        {/* Categoria */}
        {product.category && (
          <span className="uppercase tracking-[0.15em] text-xs text-[#a35c42] mb-3">
            {product.category.name}
          </span>
        )}

        {/* Nome */}
        <h2
          id={`product-${product.id}-title`}
          className="text-2xl font-semibold leading-tight text-[#5c3d2e]"
        >
          {product.name}
        </h2>

        {/* Descrição */}
        <div
          className="mt-4 text-sm leading-relaxed text-[#5c3d2e]/75 line-clamp-4 flex-grow"
          dangerouslySetInnerHTML={{
            __html: product.shortDescription || "",
          }}
        />

        {/* Divider */}
        <div className="w-full h-px bg-[#e7ddd2] my-6" />

        {/* Footer */}
        <div className="mt-auto">
          {product.price == 0 ? (
            <div className="mb-5">
              <span className="text-[#5c3d2e] font-medium">
                Preço sob consulta
              </span>
            </div>
          ) : product.isSale && product.salePrice ? (
            <div className="mb-5 flex flex-col">
              <span className="text-sm line-through text-[#5c3d2e]/50">
                {formatBRL(Number(product.price))}
              </span>

              <span className="text-3xl font-semibold text-[#a35c42]">
                {formatBRL(Number(product.salePrice))}
              </span>
            </div>
          ) : (
            <div className="mb-5">
              <span className="text-3xl font-semibold text-[#5c3d2e]">
                {formatBRL(Number(product.price))}
              </span>
            </div>
          )}

          <Link href={`/produtos/detalhe/${product.slug}`}>
            <BrownButton text="Ver Detalhes" className="w-full" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
