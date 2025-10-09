"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type NotFoundCardProps = {
  message: string;
  hasButton?: boolean;
  buttonText?: string; // Texto opcional do botão
  buttonSrc?: string; // Link opcional do botão
};

export default function NotFoundCard({
  message,
  hasButton = false,
  buttonText,
  buttonSrc,
}: NotFoundCardProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-white/30 rounded-2xl shadow-lg border border-gray-200 max-w-sm mx-auto animate-fadeIn">
      <div className="bg-gradient-to-tr from-[#bf7b6b] to-[#a35c42] p-6 rounded-full shadow-inner mb-6">
        <Image
          src="/icons/vase.png"
          alt="Produto não encontrado"
          width={120}
          height={120}
          className=""
        />
      </div>
      <p className="text-center text-lg font-semibold mb-2">{message}</p>
      <p className="text-center text-sm text-gray-500 mb-4">
        Tente procurar outro produto ou volte para a página de produtos.
      </p>

      {hasButton && buttonText && buttonSrc && (
        <Link
          href={buttonSrc}
          className="px-6 py-2 bg-[#bf7b6b] text-white rounded-lg shadow hover:bg-[#a35c42] transition"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}
