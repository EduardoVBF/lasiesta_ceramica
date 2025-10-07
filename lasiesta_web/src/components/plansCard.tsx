"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function PlansCard({
  plan,
}: {
  plan: {
    id: number;
    title: string;
    description: string;
    price: string;
    priceDetail: string;
    buttonText: string;
    image: string;
    alt: string;
  };
}) {
  return (
    <motion.div
      key={plan.id}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-bege-claro via-bege-escuro to-marrom-avermelhado/10 rounded-xl shadow-lg flex flex-row w-full"
    >
      <Image
        src={plan.image}
        alt={plan.alt}
        width={300}
        height={300}
        className="object-cover w-[300px] h-auto rounded-l-xl"
      />
      <div className="p-6 flex flex-col justify-between w-full">
        <h2 className="text-2xl font-semibold text-marrom-avermelhado mb-4">
          {plan.title}
        </h2>
        <p className="text-marrom-avermelhado mb-6">{plan.description}</p>
        <div className="mb-6">
          <span className="text-3xl font-bold text-marrom-avermelhado">
            {plan.price}
          </span>
          <span className="text-gray-500"> {plan.priceDetail}</span>
        </div>
        <a
          href={`https://wa.me/5516991401921?text=Olá!%20Tenho%20interesse%20no%20${encodeURIComponent(
            plan.title
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-marrom-avermelhado text-white px-4 py-2 rounded hover:bg-marrom-avermelhado/90 transition text-center"
        >
          {plan.buttonText}
        </a>
      </div>
    </motion.div>
  );
}
