"use client";
import FeaturedPlanCard from "@/components/cards/featuredPlanCard";
import { Plan } from "../../../services/plans.service";
import { motion } from "framer-motion";

interface ExperienceCardWrapperProps {
  plan: Plan;
  index: number;
}

export default function ExperienceCardWrapper({
  plan,
  index,
}: ExperienceCardWrapperProps) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4 }}>
      <FeaturedPlanCard plan={plan} index={index} />
    </motion.div>
  );
}
