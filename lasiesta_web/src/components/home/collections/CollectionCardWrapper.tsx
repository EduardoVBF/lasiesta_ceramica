"use client";
import FeaturedCategoryCard from "@/components/cards/featuredCategoryCard";
import { Category } from "../../../services/categories.service";
import { motion } from "framer-motion";

interface CollectionCardWrapperProps {
  cat: Category;
}

export default function CollectionCardWrapper({
  cat,
}: CollectionCardWrapperProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <div className="transition-all duration-500 group-hover:scale-[1.01]">
        <FeaturedCategoryCard cat={cat} />
      </div>
    </motion.div>
  );
}
