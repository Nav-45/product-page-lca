import { motion } from "framer-motion";

interface ProductVisualProps {
  showParticles?: boolean;
  showCleanBadges?: boolean;
}

export const ProductVisual = ({ showParticles = false, showCleanBadges = false }: ProductVisualProps) => {
  return (
    <div className="relative">
      {/* Main Product - Chocolate Bar */}
      <motion.div
        className="w-32 h-20 bg-gradient-to-br from-amber-900 to-amber-700 rounded-lg shadow-lg relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Chocolate Bar Details */}
        <div className="absolute inset-2 grid grid-cols-3 gap-0.5">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-amber-800/50 rounded-sm" />
          ))}
        </div>
        <div className="absolute bottom-1 left-2 text-white text-xs font-bold">
          COCOA
        </div>
      </motion.div>

      {/* Carbon Particles around product */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-carbon-grey/60"
              style={{
                left: `${30 + Math.cos(i * 30 * Math.PI / 180) * 80}px`,
                top: `${40 + Math.sin(i * 30 * Math.PI / 180) * 60}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.8, 0.4, 0.9, 0.3],
                scale: [0, 1.2, 0.8, 1.1, 0.7],
                y: [0, -15, -8, -20, -10],
                x: [0, 3, -2, 5, -1],
              }}
              transition={{
                duration: 3 + i * 0.2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Clean Carbon Data Badges */}
      {showCleanBadges && (
        <>
          <motion.div
            className="absolute -top-4 -left-8 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs font-medium text-primary"
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5 }}
          >
            2.4 kg CO₂e
          </motion.div>
          <motion.div
            className="absolute -top-2 -right-6 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs font-medium text-primary"
            initial={{ opacity: 0, scale: 0, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.7 }}
          >
            Scope 3: 89%
          </motion.div>
          <motion.div
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs font-medium text-primary"
            initial={{ opacity: 0, scale: 0, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Verified
          </motion.div>
        </>
      )}
    </div>
  );
};