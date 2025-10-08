"use client";
import HeaderWithBanner from "@/components/headerWithBanner";
import PlansCard from "@/components/plansCard";
import Footer from "@/components/footer";
import React from "react";

const plans = [
  {
    id: 1,
    title: "Aula Experimental",
    description:
      "Dê o primeiro passo no mundo da cerâmica com a nossa aula experimental! Em um encontro leve e acolhedor, você terá contato direto com o barro e aprenderá as técnicas iniciais de modelagem. Todo o material está incluso, e ao final você leva para casa a sua primeira criação – feita com suas próprias mãos. É a oportunidade perfeita para descobrir se essa arte pode se tornar sua nova paixão. Venha experimentar, se encantar e liberar sua criatividade!",
    price: "R$50",
    priceDetail: "/ aula",
    buttonText: "Agendar Aula",
    image: "/image/IMG_0094.JPG",
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
    image: "/image/IMG_0065.JPG",
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
    image: "/image/IMG_0128.JPG",
    alt: "Plano Mensal",
  },
];

export default function Classes() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-bege-claro">
      <HeaderWithBanner
        src="/image/aula2pb.jpg"
        alt="Aulas de Cerâmica"
        title="Aulas de Cerâmica"
        description="Nossas aulas de cerâmica são um convite para mergulhar no mundo do barro, explorar a criatividade e encontrar relaxamento na arte manual. Seja para iniciantes ou para quem já tem experiência, cada encontro é um momento único de criação e descoberta."
        textColor="text-white"
      />

      {/* Planos de assinatura */}
      <section className="w-full flex flex-col gap-10 mb-20 z-50 mt-5">
        {plans.map((plan) => (
          <PlansCard key={plan.id} plan={plan} reverse={plan.id % 2 === 0} />
        ))}
      </section>

      <Footer />
    </main>
  );
}
