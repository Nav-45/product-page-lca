import { motion } from "framer-motion";

interface CarbonParticleProps {
  x: number;
  y: number;
  delay?: number;
  size?: "small" | "medium" | "large";
}

export const CarbonParticle = ({ x, y, delay = 0, size = "small" }: CarbonParticleProps) => {
  const sizeClasses = {
    small: "w-1 h-1",
    medium: "w-2 h-2",
    large: "w-3 h-3"
  };

  return (
    <motion.div
      className={`absolute rounded-full bg-carbon-grey/60 ${sizeClasses[size]}`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0.6, 0.9, 0.4],
        scale: [0, 1.2, 0.8, 1.1, 0.7],
        y: [0, -20, -10, -30, -15],
        x: [0, 5, -3, 8, -2],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }}
    />
  );
};