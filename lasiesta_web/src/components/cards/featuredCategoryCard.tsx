import { motion } from "framer-motion";
import Image from "next/image";

interface FeaturedCategoryCardProps {
  cat: {
    id: string;
    label: string;
    image: string;
  };
  index: number;
}

export default function FeaturedCategoryCard({
  cat,
  index,
}: FeaturedCategoryCardProps) {
  return (
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
  );
}
