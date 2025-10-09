"use client";

import HeaderWithBanner from "@/components/headerWithBanner";
import BrownButton from "@/components/brownButtom";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const categories = [
  { id: "copos", label: "Copos", image: "/image/IMG_0190.JPG" },
  { id: "pratos", label: "Pratos", image: "/image/IMG_0036.JPG" },
  { id: "vasos", label: "Vasos", image: "/image/IMG_0152.JPG" },
  { id: "canecas", label: "Canecas", image: "/image/IMG_0094.JPG" },
];

const plans = [
  {
    id: 1,
    title: "Aula Experimental",
    description:
      "Um primeiro contato com o barro, leve e intuitivo. Você aprenderá o básico da modelagem e levará sua primeira peça feita à mão.",
    price: "R$50 / aula",
    image: "/image/pexels-1.jpg",
  },
  {
    id: 2,
    title: "Workshop Intensivo",
    description:
      "Três encontros imersivos para explorar técnicas, cores e texturas. Um mergulho criativo e transformador no universo cerâmico.",
    price: "R$200 / workshop",
    image: "/image/pexels-5.jpg",
  },
  {
    id: 3,
    title: "Plano Mensal",
    description:
      "Aulas semanais, acompanhamento contínuo e muita experimentação. Ideal para quem quer tornar a cerâmica parte da rotina.",
    price: "R$400 / mês",
    image: "/image/pexels-4.jpg",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-bege-claro text-marrom-avermelhado overflow-hidden">
      {/* Header com Banner */}
      <HeaderWithBanner
        src="/image/aula2pb.jpg"
        alt="Lasiesta Cerâmica"
        title="Lasiesta Cerâmica"
        description="Explore a arte da cerâmica manual e descubra um mundo de criatividade, relaxamento e expressão artística."
        textColor="text-white"
      />

      {/* Manifesto */}
      <section className="relative py-10 bg-gradient-to-b from-[#f8f4ef] to-bege-claro overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 overflow-hidden">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-semibold text-marrom-avermelhado">
              Um convite à pausa
            </h1>
            <h1 className="text-lg leading-relaxed text-marrom-avermelhado/90">
              Entre o silêncio e o toque do barro, nasce o{" "}
              <strong>Lasiesta</strong> — um ateliê dedicado à arte da cerâmica
              manual e à serenidade do processo.
            </h1>
            <h1 className="text-lg leading-relaxed text-marrom-avermelhado/90">
              Aqui, o tempo desacelera. Cada gesto é um diálogo com a matéria,
              cada peça, uma memória moldada entre respirações. Criar é voltar à
              presença.
            </h1>
            <h1 className="text-lg leading-relaxed text-marrom-avermelhado/90">
              O nome <strong>LaSiesta</strong> vem do espanhol e significa “o
              descanso depois do almoço” — um lembrete de que o descanso também
              é parte da criação.
            </h1>
          </motion.div>

          {/* Imagem */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#d6c8b9]/30 blur-3xl rounded-full" />
            <Image
              src="/image/IMG_0032.JPG"
              alt="Cerâmica artesanal"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg object-cover relative z-10"
            />
          </motion.div>
        </div>
      </section>

      {/* Coleções */}
      <section className="py-10 max-w-6xl mx-auto px-6 text-center overflow-hidden">
        <div className="grid md:grid-cols-4 gap-8 my-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                width={400}
                height={400}
                className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center text-transparent hover:text-white hover:bg-black/20 transition">
                <p className="text-2xl font-semibold">{cat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <Link href="/products">
          <BrownButton text="Ver Todos as Peças" onClick={() => {}} />
        </Link>
      </section>

      {/* Seção de Cursos */}
      <section className="bg-marrom-claro py-10 w-full overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-center mb-12">
            Cursos e Experiências
          </h1>
          <div className="grid md:grid-cols-3 gap-12">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#818b7e7c] rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <Image
                  src={plan.image}
                  alt={plan.title}
                  width={500}
                  height={300}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-semibold">{plan.title}</h3>
                  <p className="text-marrom-avermelhado/80 leading-relaxed">
                    {plan.description}
                  </p>
                  <p className="font-semibold text-marrom-avermelhado mt-3">
                    {plan.price}
                  </p>
                  <BrownButton text="Saiba Mais" onClick={() => {}} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* O Ateliê */}
      <section className="bg-[#f3eee7] py-10 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-semibold">O Ateliê</h1>
            <h1 className="text-lg leading-relaxed">
              Entre o barro e o silêncio, um espaço vivo. O Ateliê LaSiesta é o
              coração da nossa criação — um refúgio criativo onde cada gesto
              ganha forma e significado.
            </h1>
            <h1 className="text-lg leading-relaxed">
              Aqui, transformamos matéria em presença. Cada peça nasce de um
              instante, de uma pausa, de um toque que se torna arte.
            </h1>
            <Link href="/studio">
              <BrownButton text="Conheça o Ateliê" onClick={() => {}} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-2 gap-4"
          >
            <Image
              src="/image/IMG_0065.JPG"
              alt="Ateliê"
              width={300}
              height={300}
              className="rounded-2xl object-cover h-64 w-full"
            />
            <Image
              src="/image/IMG_0129.JPG"
              alt="Torno"
              width={300}
              height={300}
              className="rounded-2xl object-cover h-64 w-full"
            />
            <Image
              src="/image/IMG_0216.JPG"
              alt="Peças de cerâmica"
              width={300}
              height={300}
              className="rounded-2xl object-cover h-64 w-full col-span-2"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
