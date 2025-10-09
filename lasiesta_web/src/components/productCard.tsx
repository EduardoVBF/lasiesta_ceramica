"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Color = { name: string; hex?: string };

type Product = {
  id: number;
  nome: string;
  slug?: string;
  image?: string;
  material?: string;
  preco: number;
  categoria?: string;
  cores?: Color[];
  tamanhos?: string[];
  emEstoque?: boolean;
  destaque?: boolean;
};

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
            src={product.image ?? "/image/IMG_0023.JPG"}
            alt={product.nome}
            width={800}
            height={800}
            className="object-cover w-full h-full transition-transform duration-700"
            draggable={false}
          />
        </motion.div>

        {/* Destaque */}
        {product.destaque && (
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
            {product.nome}
          </h3>
          <p className="text-xs text-marrom-avermelhado mt-1">
            {product.material}
          </p>
          <span className="block text-2xl font-extrabold">
            {formatBRL(product.preco)}
          </span>

          {/* Categoria + estoque */}
          <div className="mt-3 flex items-center gap-3">
            {product.categoria && (
              <span className="text-xs bg-marrom-avermelhado px-2 py-1 rounded-md">
                {product.categoria}
              </span>
            )}
            <span
              className={`text-xs px-2 py-1 rounded-md ${
                !product.emEstoque ? "bg-green-700/40" : "bg-red-700/30"
              }`}
            >
              {!product.emEstoque ? "Em estoque" : "Esgotado"}
            </span>
          </div>
        </div>

        {/* Variantes: cores / tamanhos */}
        <div className="flex flex-col gap-2 mt-2">
          {product.cores && product.cores.length > 0 && (
            <>
              <div className="flex items-center gap-2">
                {product.cores.map((c, i) => (
                  <motion.button
                    key={i}
                    title={c.name}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-7 h-7 rounded-full border-2 overflow-hidden shadow-sm transition-all duration-200 border-[#f8f5f1]`}
                    style={{ backgroundColor: c.hex ?? "#ccc" }}
                    aria-label={`Cor ${c.name}`}
                  >
                    <span
                      style={{
                        boxShadow:
                          c.hex?.toLowerCase() === "#ffffff" ||
                          c.hex?.toLowerCase() === "#f5f5dc"
                            ? "inset 0 0 0 1px rgba(0,0,0,0.25)"
                            : "none",
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </>
          )}

          {product.tamanhos && product.tamanhos.length > 0 && (
            <div className="flex items-center gap-2">
              {product.tamanhos.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-md bg-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Botão de ação */}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full"
            aria-label="Detalhes do produto"
          >
            <Link href={`/products/${product.id}`} className="flex-1 flex items-center justify-center gap-3 py-3 rounded-xl bg-[#a1a692] text-white font-semibold shadow hover:bg-[#5e6254] transition cursor-pointer">
              Detalhes
            </Link>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
