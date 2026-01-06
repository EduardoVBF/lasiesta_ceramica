import BrownButton from "../ui/brownButtom";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FeaturedPlanCardProps {
  plan: {
    id: string;
    title: string;
    description: string;
    image: string;
    price: string;
  };
  index: number;
}

export default function FeaturedPlanCard({
  plan,
  index,
}: FeaturedPlanCardProps) {
  return (
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
        <Link href="/classes">
          <BrownButton text="Saiba Mais" />
        </Link>
      </div>
    </motion.div>
  );
}
