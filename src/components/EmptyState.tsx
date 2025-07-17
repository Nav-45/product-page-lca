import { motion } from "framer-motion";
import { Plus, Calculator } from "lucide-react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  onAddProduct: () => void;
}

export const EmptyState = ({ onAddProduct }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-16 px-6"
    >
      <div className="max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center"
        >
          <Calculator className="w-12 h-12 text-primary" />
        </motion.div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Start Your Carbon Assessment
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Add your first product to begin calculating emissions across the entire value chain.
          </p>
        </div>
        
        <Button 
          onClick={onAddProduct}
          size="lg"
          className="gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Your First Product
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Supporting life cycle assessments for all product categories
        </div>
      </div>
    </motion.div>
  );
};