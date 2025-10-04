"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function Studio() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-bege-claro">
      <Header />

      {/* Título com animação */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center text-marrom-avermelhado mt-5 mb-10"
      >
        O Ateliê Lasiesta
      </motion.h1>

      <section className="w-full max-w-6xl space-y-20 mb-10 px-6">
        {/* História */}
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-justify leading-relaxed text-marrom-avermelhado md:col-span-3"
          >
            A história do Ateliê LaSiesta começa com um encontro inesperado com
            a cerâmica. Há dez anos, após um acidente, a vida precisou
            desacelerar. Foi nesse momento de pausa que o barro apareceu —
            simples, natural e transformador.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 flex justify-center"
          >
            <Image
              src="/image/clau.jpeg"
              alt="Ceramista no ateliê"
              width={500}
              height={500}
              className="rounded-xl shadow-xl object-cover"
            />
          </motion.div>
        </div>

        {/* Processo criativo */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/image/clau.jpeg"
              alt="Processo criativo"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover max-h-[400px]"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-justify leading-relaxed text-marrom-avermelhado"
          >
            Entre estudos em Buenos Aires e experiências no Brasil, esse caminho
            foi sendo moldado passo a passo, como um vaso que ganha forma entre
            as mãos. A prática se tornou paixão, e a paixão virou propósito.
          </motion.p>
        </div>

        {/* Propósito */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-semibold text-marrom-avermelhado mb-4"
          >
            Mais do que peças, memórias
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="leading-relaxed text-marrom-avermelhado"
          >
            Cada criação carrega emoções, pensamentos, instantes de silêncio e
            de entrega. Assim, cada peça transcende a matéria e se torna uma
            presença — uma memória eternizada em forma e textura.
          </motion.p>
        </div>

        {/* Nome e filosofia */}
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-justify leading-relaxed text-marrom-avermelhado md:col-span-3"
          >
            O nome <strong>LaSiesta</strong> vem do espanhol e significa “o
            descanso depois do almoço”. É uma lembrança do valor da pausa, da
            suavidade e do respiro no meio da rotina. Esse é o espírito que guia
            o ateliê: criar objetos que convidam a sentir, desacelerar e
            encontrar abrigo nos pequenos detalhes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 flex justify-center space-x-5"
          >
            <Image
              src="/image/clau.jpeg"
              alt="Momento de pausa no ateliê"
              width={500}
              height={500}
              className="rounded-xl shadow-xl object-cover max-h-[500px] w-[200px]"
            />
            <Image
              src="/image/clau.jpeg"
              alt="Momento de pausa no ateliê"
              width={500}
              height={500}
              className="rounded-xl shadow-xl object-cover max-h-[500px] w-[200px]"
            />
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
