"use client";
import { motion } from "framer-motion";

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function MotionReveal({
  children,
  className = "",
}: MotionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
