import BrownButton from "../ui/brownButtom";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FeaturedPlanCardProps {
  plan: {
    id: string;
    name: string;
    slug: string;
    price: number | null;
    durationLabel: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    shortDescription?: string;
    longDescription?: string;
    isFeatured?: boolean;
    imageUrl?: string;
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
      className="bg-[#818b7e7c] rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
    >
      <div className="flex flex-col">
        <Image
          src={plan.imageUrl || ""}
          alt={plan.name}
          width={500}
          height={300}
          className="w-full h-56 object-cover"
        />
        <div className="p-6 space-y-3">
          <h1 className="text-2xl font-semibold">{plan.name}</h1>
          <div
            className="text-marrom-avermelhado text-base"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(plan.shortDescription || ""),
            }}
          />
        </div>
      </div>
      <div className=" mx-6 mb-6">
        <div className="flex items-baseline gap-2 mb-4 h-fit">
          <span className="text-lg md:text-2xl font-bold text-marrom-avermelhado">
            R$ {plan.price}
          </span>
          <span className="text-gray-500 text-base">
            /{plan.durationLabel}
          </span>
        </div>

        <Link href="/classes" className="block">
          <BrownButton text="Saiba Mais" />
        </Link>
      </div>
    </motion.div>
  );
}
