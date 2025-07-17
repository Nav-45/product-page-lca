import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ValueChainStageProps {
  icon: LucideIcon;
  label: string;
  index: number;
  isActive: boolean;
  emissionData?: {
    activity: string;
    scope: string;
    factor: string;
    amount: string;
  };
}

export const ValueChainStage = ({ 
  icon: Icon, 
  label, 
  index, 
  isActive,
  emissionData 
}: ValueChainStageProps) => {
  return (
    <motion.div
      className="flex flex-col items-center relative"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stage Icon */}
      <motion.div
        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 mb-2 transition-all duration-500 ${
          isActive 
            ? "bg-primary border-primary text-primary-foreground shadow-lg" 
            : "bg-secondary border-border text-muted-foreground"
        }`}
        animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-6 h-6" />
      </motion.div>

      {/* Label */}
      <span className={`text-xs font-medium transition-colors duration-300 ${
        isActive ? "text-foreground" : "text-muted-foreground"
      }`}>
        {label}
      </span>

      {/* Carbon Particles */}
      {isActive && (
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-carbon-grey"
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -30],
                x: [0, (i - 1) * 10]
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Emission Data Dashboard */}
      {isActive && emissionData && (
        <motion.div
          className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-card border rounded-lg p-3 shadow-md w-48 text-xs"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="font-medium text-primary mb-2">Measured by Capture</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Activity:</span>
              <span>{emissionData.activity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Scope:</span>
              <span className="font-medium">{emissionData.scope}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Factor:</span>
              <span>{emissionData.factor}</span>
            </div>
            <div className="flex justify-between border-t pt-1">
              <span className="text-muted-foreground">Emissions:</span>
              <span className="font-bold text-primary">{emissionData.amount}</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};