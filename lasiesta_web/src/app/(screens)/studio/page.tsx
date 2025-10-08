"use client";
import HeaderWithBanner from "@/components/headerWithBanner";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function Studio() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-bege-claro overflow-hidden">
      <HeaderWithBanner
        src="/image/IMG_0065.JPG"
        alt="Ateliê de Cerâmica"
        title="O Ateliê LaSiesta"
        description="Um espaço onde o tempo desacelera, o barro respira e a criação se transforma em encontro."
        textColor="text-white"
      />

      <section className="w-full max-w-[90%] px-6 pb-10 space-y-8">
        {/* BLOCO 1 — História (imagens próximas e texto ao lado) */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex gap-4"
          >
            <Image
              src="/image/IMG_0070.JPG"
              alt="Ceramista no ateliê"
              width={300}
              height={400}
              className="rounded-3xl object-cover aspect-[3/4] shadow-2xl"
            />
            <Image
              src="/image/IMG_0152.JPG"
              alt="Ceramista no ateliê"
              width={300}
              height={400}
              className="rounded-3xl object-cover aspect-[3/4] shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 text-marrom-avermelhado leading-relaxed"
          >
            <p>
              A história do Ateliê LaSiesta nasce de um encontro inesperado com
              a cerâmica — um chamado silencioso do barro, que trouxe pausa e
              sentido a um novo ritmo de vida.
            </p>
            <p>
              Moldar tornou-se meditação. O fazer manual, um retorno à
              presença. Assim, entre o som do torno e o toque da argila, um
              espaço ganhou alma.
            </p>
          </motion.div>
        </div>

        {/* BLOCO 2 — Faixa panorâmica com texto central */}
        <div className="relative w-full h-[550px] overflow-hidden rounded-3xl shadow-xl">
          <Image
            src="/image/IMG_0011.JPG"
            alt="Ateliê panorâmico"
            fill
            className="object-cover brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-radial from-transparent to-white/40" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-white text-center max-w-[80%] leading-snug px-6">
              Onde o barro encontra o silêncio e o silêncio se transforma em arte.
            </h2>
          </motion.div>
        </div>

        {/* BLOCO 3 — Processo criativo (texto acima + 4 imagens lado a lado) */}
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-marrom-avermelhado leading-relaxed text-center"
          >
            Entre estudos em Buenos Aires e vivências no Brasil, o processo foi
            se moldando — ora técnico, ora poético. Cada peça nasce de um gesto
            intuitivo, que une matéria e emoção em equilíbrio.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/image/IMG_0349.JPG"
                alt="Processo criativo 1"
                width={300}
                height={300}
                className="rounded-lg object-cover w-[300px] h-[300px] shadow-md"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Image
                src="/image/IMG_0128.JPG"
                alt="Processo criativo 2"
                width={300}
                height={300}
                className="rounded-lg object-cover w-[300px] h-[300px] shadow-md"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/image/IMG_0216.JPG"
                alt="Processo criativo 3"
                width={300}
                height={300}
                className="rounded-lg object-cover w-[300px] h-[300px] shadow-md"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Image
                src="/image/IMG_0285.JPG"
                alt="Processo criativo 4"
                width={300}
                height={300}
                className="rounded-lg object-cover w-[300px] h-[300px] shadow-md"
              />
            </motion.div>
          </div>
        </div>

        {/* BLOCO 4 — Propósito (imagem imersiva + texto sobreposto) */}
        <div className="relative w-full h-[600px] overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/image/IMG_0032.JPG"
            alt="Detalhes da cerâmica"
            fill
            className="object-cover brightness-[0.5]"
          />
          <div className="absolute inset-0 bg-radial from-transparent to-white/40" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col justify-center items-center text-center text-white space-y-6 px-6"
          >
            <h2 className="text-4xl font-semibold">Mais do que peças, memórias</h2>
            <p className="max-w-3xl leading-relaxed text-lg">
              Cada criação carrega instantes, silêncios e gestos. O barro
              transcende a matéria e se torna uma presença — um fragmento de
              tempo que pode ser sentido.
            </p>
          </motion.div>
        </div>

        {/* BLOCO 5 — Nome e filosofia (espelhado do Bloco 1) */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 text-marrom-avermelhado leading-relaxed"
          >
            <p>
              O nome <strong>LaSiesta</strong> vem do espanhol e significa “o
              descanso depois do almoço”. Um lembrete de que a pausa também é
              parte do processo criativo.
            </p>
            <p>
              Cada objeto criado aqui convida à contemplação — à suavidade do
              instante. Criar é, antes de tudo, um ato de respirar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex gap-4"
          >
            <Image
              src="/image/IMG_0129.JPG"
              alt="Ceramista no ateliê"
              width={300}
              height={400}
              className="rounded-3xl object-cover aspect-[3/4] shadow-2xl"
            />
            <Image
              src="/image/IMG_0188.JPG"
              alt="Ceramista no ateliê"
              width={300}
              height={400}
              className="rounded-3xl object-cover aspect-[3/4] shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
