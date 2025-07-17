import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const ScrollSection = ({ children, className = "", id }: ScrollSectionProps) => {
  return (
    <motion.section
      id={id}
      className={`min-h-screen flex items-center justify-center relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-15%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};