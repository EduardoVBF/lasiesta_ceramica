import { Category } from "../../services/categories.service";
import { motion } from "framer-motion";
import Image from "next/image";

interface FeaturedCategoryCardProps {
  cat: Category;
}

export default function FeaturedCategoryCard({
  cat: { id, name, imageUrl },
}: FeaturedCategoryCardProps) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 }}
      className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
    >
      <Image
        src={imageUrl || "/image/IMG_0070.JPG"}
        alt={name || "Categoria em destaque"}
        width={400}
        height={400}
        className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-center justify-center text-transparent hover:text-white hover:bg-black/20 transition">
        <p className="text-2xl font-semibold">{name}</p>
      </div>
    </motion.div>
  );
}
