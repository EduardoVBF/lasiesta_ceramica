"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Product } from "../../services/products.service";
import { RiDiscountPercentFill } from "react-icons/ri";
import ImageZoom from "../layout/ImageZoom";
import { FaStar } from "react-icons/fa6";
import { RxDimensions } from "react-icons/rx";

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
      className="group relative w-full max-w-sm h-[35rem] rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-b from-[#f5fbf3] to-[#efe6da] flex flex-col"
      aria-labelledby={`product-${product.id}-title`}
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-square bg-[#f3ece4] flex-none">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="absolute inset-0 overflow-hidden"
        >
          <ImageZoom
            src={product.mainImageUrl ?? "/image/IMG_0023.JPG"}
            alt={product.name}
            // width={800}
            // height={800}
            className="object-cover w-full h-full transition-transform duration-700"
            zoom
            fill
          />
        </motion.div>

        {/* Destaque */}
        {product.isFeatured && (
          <FaStar
            className="absolute left-2 top-2 bg-amber-600 text-white p-1 rounded-full text-xs font-semibold shadow"
            size={30}
            title="Destaque"
          />
        )}

        {/* Selo de promoção */}
        {product.isSale && (
          <RiDiscountPercentFill
            className="absolute right-1 top-1 bg-marrom-avermelhado rounded-full p-0.5 text-white drop-shadow-lg"
            title="Promoção"
            size={40}
          />
        )}

        {/* Categoria */}
        {product.category && (
          <span className="absolute left-2 bottom-2 text-white text-xs bg-marrom-avermelhado px-2 py-1 rounded-full">
            {product.category.name}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="px-3 pt-2 pb-3 bg-[#bf7a6b8b] text-[#f8f5f1] flex flex-col justify-between gap-4 flex-1">
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h1
              id={`product-${product.id}-title`}
              className="text-lg text-marrom-avermelhado font-bold leading-tight line-clamp-2"
            >
              {product.name}
            </h1>
            <div
              className="prose prose-sm max-w-none text-gray-600 text-xs line-clamp-2 my-1"
              dangerouslySetInnerHTML={{
                __html: product.shortDescription || "",
              }}
            />
            <div className="mt-2">
              <RxDimensions
                className="inline-block mr-1 text-gray-600 text-xs"
                title="Dimensões"
                size={16}
              />
              <p className="inline-block text-gray-600 text-xs">
                {product.dimensions}
              </p>
            </div>
          </div>

          {/* PRICE */}
          <div className="mt-2">
            {product.isSale && product.salePrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold line-through text-white">
                  {formatBRL(Number(product.price))}
                </span>
                <span className="text-xl font-bold text-red-600">
                  {formatBRL(Number(product.salePrice))}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-white">
                {formatBRL(Number(product.price))}
              </span>
            )}
          </div>
        </div>

        {/* Botão de ação */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full mt-auto"
          aria-label="Detalhes do produto"
        >
          <Link
            href={`/produtos/detalhe/${product.slug}`}
            className="flex-1 flex items-center justify-center gap-3 py-3 rounded-xl bg-[#a1a692] text-white font-semibold shadow hover:bg-[#5e6254] transition cursor-pointer"
          >
            Detalhes
          </Link>
        </motion.button>
      </div>
    </motion.article>
  );
}
