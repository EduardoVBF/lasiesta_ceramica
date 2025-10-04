"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import Image from "next/image";

const plans = [
  {
    id: 1,
    title: "Aula Experimental",
    description:
      "Dê o primeiro passo no mundo da cerâmica com a nossa aula experimental! Em um encontro leve e acolhedor, você terá contato direto com o barro e aprenderá as técnicas iniciais de modelagem. Todo o material está incluso, e ao final você leva para casa a sua primeira criação – feita com suas próprias mãos. É a oportunidade perfeita para descobrir se essa arte pode se tornar sua nova paixão. Venha experimentar, se encantar e liberar sua criatividade!",
    price: "R$50",
    priceDetail: "/ aula",
    buttonText: "Agendar Aula",
    image: "/image/pexels-1.jpg",
    alt: "Plano Experimental",
  },
  {
    id: 2,
    title: "Workshop Intensivo",
    description:
      "Quer mergulhar mais fundo no universo da cerâmica? O nosso workshop intensivo oferece 3 encontros práticos, nos quais você vai aprender técnicas essenciais como modelagem, acabamento e pintura. Além de criar suas próprias peças exclusivas, você contará com acompanhamento próximo e materiais inclusos. É o plano ideal para quem busca evolução rápida, momentos de concentração criativa e a satisfação de transformar ideias em arte real. Em apenas três aulas, você já terá um portfólio de peças feitas por você mesmo!",
    price: "R$200",
    priceDetail: "/ workshop",
    buttonText: "Participar",
    image: "/image/pexels-5.jpg",
    alt: "Workshop Intensivo",
  },
  {
    id: 3,
    title: "Plano Mensal",
    description:
      "Se a cerâmica já conquistou seu coração, o plano mensal é feito para você! Com aulas semanais, você terá acompanhamento contínuo para dominar novas técnicas, explorar estilos diferentes e aprimorar cada detalhe das suas criações. Todo o material está incluso, e você fará parte de uma comunidade criativa, trocando experiências e inspirações a cada encontro. Esse é o caminho perfeito para quem deseja transformar a arte do barro em um hábito prazeroso, relaxante e cheio de significado. Venha viver a cerâmica como parte da sua rotina e surpreenda-se com a sua evolução mês a mês!",
    price: "R$400",
    priceDetail: "/ mês",
    buttonText: "Assinar",
    image: "/image/pexels-4.jpg",
    alt: "Plano Mensal",
  },
];

export default function Classes() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-bege-claro">
      <Header />

      <div className="relative w-full flex flex-col items-center mb-20">
        <Image
          src="/image/pexels-3.jpg"
          alt="Aulas de Cerâmica"
          width={1920}
          height={1080}
          className="object-cover absolute top-0 z-0 w-full h-[400px] opacity-80"
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-[400px] w-full bg-black/30">
          {/* Ajuste de cor e contraste para visibilidade */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-center text-white my-10 z-10"
          >
            Aulas de Cerâmica
          </motion.h1>
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl px-6 text-center mb-16 z-10"
          >
            <p className="text-white leading-relaxed text-lg">
              Nossas aulas de cerâmica são um convite para mergulhar no mundo do
              barro, explorar a criatividade e encontrar relaxamento na arte
              manual. Seja para iniciantes ou para quem já tem experiência, cada
              encontro é um momento único de criação e descoberta.
            </p>
          </motion.section>
        </div>
      </div>

      {/* Planos de assinatura */}
      <section className="max-w-6xl flex flex-col gap-10 mb-20 z-50">
        {plans.map((plan) => (
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
        ))}
      </section>

      <Footer />
    </main>
  );
}
