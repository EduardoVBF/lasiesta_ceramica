"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../../services/products.service";


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
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      viewport={{ once: true }}
      className="group relative w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-b from-[#fbf7f3] to-[#efe6da]"
      aria-labelledby={`product-${product.id}-title`}
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-square bg-[#f3ece4]">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="absolute inset-0 overflow-hidden"
        >
          <Image
            src={product.mainImageUrl ?? "/image/IMG_0023.JPG"}
            alt={product.name}
            width={800}
            height={800}
            className="object-cover w-full h-full transition-transform duration-700"
            draggable={false}
          />
        </motion.div>

        {/* Destaque */}
        {product.isFeatured && (
          <span className="absolute left-4 top-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            Destaque
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 bg-[#bf7a6b8b] text-[#f8f5f1] flex flex-col gap-4">
        <div>
          <h3
            id={`product-${product.id}-title`}
            className="text-base text-marrom-avermelhado font-bold leading-tight truncate line-clamp-1"
          >
            {product.name}
          </h3>
          <p className="text-xs text-marrom-avermelhado mt-1">
            {product.material}
          </p>
          <span className="block text-2xl font-extrabold">
            {formatBRL(product.price)}
          </span>

          {/* Categoria + estoque */}
          <div className="mt-3 flex items-center gap-1">
            {product.category && (
              <span className="text-xs bg-marrom-avermelhado px-2 py-1 rounded-md">
                {product.category.name}
              </span>
            )}
          </div>
        </div>

        {/* Botão de ação */}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full"
            aria-label="Detalhes do produto"
          >
            <Link href={`/products/${product.slug}`} className="flex-1 flex items-center justify-center gap-3 py-3 rounded-xl bg-[#a1a692] text-white font-semibold shadow hover:bg-[#5e6254] transition cursor-pointer">
              Detalhes
            </Link>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
