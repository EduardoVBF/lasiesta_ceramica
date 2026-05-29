"use client";
import HeaderWithBanner from "@/components/layout/headerWithBanner";
import BackgroundImage from "@/components/layout/backgroundImage";
import Footer from "@/components/layout/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function Studio() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-bege-claro overflow-hidden">
      <HeaderWithBanner page="ABOUT" textColor="text-white" />

      <BackgroundImage
        src="/image/organic2.jpg"
        alt="Textura de fundo do ateliê"
        opacity={15}
      />
      <section className="w-full pb-10 space-y-8 pt-5 relative z-10">
        {/* BLOCO 1 — História (imagens próximas e texto ao lado) */}
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[0.3em] text-[#8c6d5a]">
              Nossa História
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[#5c3d2e]">
              Um encontro com o barro.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src="/image/IMG_0070.JPG"
                alt="Ceramista no ateliê"
                width={500}
                height={700}
                className="rounded-[32px] object-cover aspect-square shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
              />

              <Image
                src="/image/IMG_0152.JPG"
                alt="Cerâmica artesanal"
                width={240}
                height={320}
                className="hidden lg:block absolute -bottom-10 -right-10 rounded-[24px] object-cover shadow-[0_20px_60px_rgba(0,0,0,0.18)] border-4 border-[#efe4d8]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-lg leading-relaxed text-[#5c3d2e]/85"
            >
              <p>
                A história do Ateliê LaSiesta nasce de um encontro inesperado
                com a cerâmica — um chamado silencioso do barro, que trouxe
                pausa e sentido a um novo ritmo de vida.
              </p>

              <p>
                Moldar tornou-se meditação. O fazer manual, um retorno à
                presença. Assim, entre o som do torno e o toque da argila, um
                espaço ganhou alma.
              </p>
            </motion.div>
          </div>
        </div>

        {/* BLOCO 2 — Faixa panorâmica com texto central */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative h-[450px] lg:h-[650px] overflow-hidden rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <Image
              src="/image/IMG_0011.JPG"
              alt="Ateliê panorâmico"
              fill
              className="object-cover brightness-[0.55]"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center px-6"
            >
              <h2 className="max-w-5xl text-center text-4xl md:text-6xl leading-[1.1] font-semibold tracking-tight text-white">
                Onde o barro encontra o silêncio e o silêncio se transforma em
                arte.
              </h2>
            </motion.div>
          </div>
        </div>

        {/* BLOCO 3 — Processo criativo (texto acima + 4 imagens lado a lado) */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[0.3em] text-[#8c6d5a]">
              Processo
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[#5c3d2e]">
              Onde cada peça começa.
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto text-center text-lg leading-relaxed text-[#5c3d2e]/80 mb-16"
          >
            Entre estudos em Buenos Aires e vivências no Brasil, o processo foi
            se moldando — ora técnico, ora poético.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "/image/IMG_0349.JPG",
              "/image/IMG_0128.JPG",
              "/image/IMG_0285.JPG",
              "/image/IMG_0216.JPG",
            ].map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Image
                  src={src}
                  alt="Processo criativo"
                  width={500}
                  height={500}
                  className="w-full h-[320px] object-cover rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:scale-[1.02] transition-all duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* BLOCO 4 — Propósito (imagem imersiva + texto sobreposto) */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative h-[450px] lg:h-[650px] overflow-hidden rounded-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <Image
              src="/image/IMG_0032.JPG"
              alt="Detalhes da cerâmica"
              fill
              className="object-cover brightness-[0.75]"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center px-6"
            >
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
                Mais do que peças, memórias
              </h2>

              <p className="max-w-4xl mt-8 text-lg md:text-xl leading-relaxed text-white/90">
                Cada criação carrega instantes, silêncios e gestos. O barro
                transcende a matéria e se torna uma presença.
              </p>
            </motion.div>
          </div>
        </div>

        {/* BLOCO 5 — Nome e filosofia (espelhado do Bloco 1) */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[0.3em] text-[#8c6d5a]">
              Filosofia
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-[#5c3d2e]">
              O significado de LaSiesta.
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-lg leading-relaxed text-[#5c3d2e]/85"
            >
              <p>
                O nome <strong>LaSiesta</strong> vem do espanhol e significa o
                descanso depois do almoço.
              </p>

              <p>
                Cada objeto criado aqui convida à contemplação — à suavidade do
                instante. Criar é, antes de tudo, um ato de respirar.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Image
                src="/image/IMG_0188.JPG"
                alt="Cerâmica artesanal"
                width={500}
                height={500}
                className="rounded-[32px] object-cover aspect-square shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
              />

              <Image
                src="/image/IMG_0129.JPG"
                alt="Ateliê"
                width={240}
                height={320}
                className="hidden lg:block absolute -bottom-10 -left-10 rounded-[24px] object-cover shadow-[0_20px_60px_rgba(0,0,0,0.18)] border-4 border-[#efe4d8]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
