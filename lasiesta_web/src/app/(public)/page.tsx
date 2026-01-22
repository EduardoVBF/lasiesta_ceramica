"use client";
import {
  Category,
  getActiveCategories,
} from "../../services/categories.service";
import FeaturedCategoryCard from "@/components/cards/featuredCategoryCard";
import { getActivePlans, Plan } from "../../services/plans.service";
import FeaturedPlanCard from "@/components/cards/featuredPlanCard";
import BackgroundImage from "@/components/layout/backgroundImage";
import CarouselComponent from "@/components/layout/carousel";
import BrownButton from "@/components/ui/brownButtom";
import LoaderComp from "@/components/ui/loaderComp";
import React, { useState, useEffect } from "react";
import Footer from "@/components/layout/footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [featuredPlans, setFeaturedPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Busca Planos
        const plansData = await getActivePlans();
        const plans = plansData.filter(
          (plan: Plan) => plan.isFeatured && plan.isActive
        );
        setFeaturedPlans(plans);
        setLoadingPlans(false);

        // Busca Categorias
        const catsData = await getActiveCategories();
        const categories = catsData.filter(
          (cat: Category) => cat.isFeatured && cat.isActive
        );
        setFeaturedCategories(categories);
        setLoadingCategories(false);
      } catch (error) {
        console.error("Erro ao carregar dados da Home:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-bege-claro text-marrom-avermelhado overflow-hidden">
      <CarouselComponent />

      <div className="relative w-full">
        <BackgroundImage
          src="/image/organic3.jpg"
          alt="Textura de fundo do ateliê"
          opacity={10}
        />

        {/* Manifesto */}
        <section className="relative z-10 py-10 overflow-hidden">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-semibold text-marrom-avermelhado">
                Um convite à pausa
              </h1>
              <p className="text-lg leading-relaxed text-marrom-avermelhado/90">
                Entre o silêncio e o toque do barro, nasce o{" "}
                <strong>Lasiesta</strong> — um ateliê dedicado à arte da
                cerâmica manual e à serenidade do processo.
              </p>
              <p className="text-lg leading-relaxed text-marrom-avermelhado/90">
                Aqui, o tempo desacelera. Cada gesto é um diálogo com a matéria,
                cada peça, uma memória moldada entre respirações. Criar é voltar
                à presença.
              </p>
              <p className="text-lg leading-relaxed text-marrom-avermelhado/90">
                O nome <strong>LaSiesta</strong> vem do espanhol e significa “o
                descanso depois do almoço” — um lembrete de que o descanso
                também é parte da criação.
              </p>
            </motion.div>

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

        {/* Coleções - CORREÇÃO DO GRID AQUI */}
        <section className="relative z-10 py-10 max-w-6xl mx-auto px-6 text-center overflow-hidden">
          {loadingCategories ? (
            <LoaderComp />
          ) : (
            <div
              className="grid gap-4 my-4"
              style={{
                gridTemplateColumns:
                  featuredCategories.length > 0
                    ? `repeat(${featuredCategories.length}, minmax(0, 1fr))`
                    : "repeat(1, minmax(0, 1fr))",
              }}
            >
              {featuredCategories.map((cat) => (
                <FeaturedCategoryCard cat={cat} key={cat.id} />
              ))}
            </div>
          )}

          <div className="mt-8 relative z-20">
            <Link href="/produtos">
              <BrownButton text="Ver todos os produtos" maxWidth="max-w-fit" />
            </Link>
          </div>
        </section>
      </div>

      {/* Seção de Cursos - CORREÇÃO DO GRID AQUI */}
      <section className="bg-marrom-claro py-10 w-full overflow-hidden z-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-center mb-12">
            Cursos e Experiências
          </h1>
          {loadingPlans ? (
            <LoaderComp classname="min-h-[300px]" />
          ) : (
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns:
                  featuredPlans.length > 0
                    ? `repeat(${featuredPlans.length}, minmax(0, 1fr))`
                    : "repeat(1, minmax(0, 1fr))",
              }}
            >
              {featuredPlans.map((plan, index) => (
                <FeaturedPlanCard plan={plan} index={index} key={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* O Ateliê */}
      <section className="relative overflow-hidden">
        <BackgroundImage
          src="/image/organic1.jpg"
          alt="Textura de fundo do ateliê"
          opacity={15}
        />

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 py-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-semibold">O Ateliê</h1>
            <p className="text-lg leading-relaxed">
              Entre o barro e o silêncio, um espaço vivo. O Ateliê LaSiesta é o
              coração da nossa criação — um refúgio criativo onde cada gesto
              ganha forma e significado.
            </p>
            <p className="text-lg leading-relaxed">
              Aqui, transformamos matéria em presença. Cada peça nasce de um
              instante, de uma pausa, de um toque que se torna arte.
            </p>
            <Link href="/atelie">
              <BrownButton text="Conheça o Ateliê" maxWidth="max-w-fit" />
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
