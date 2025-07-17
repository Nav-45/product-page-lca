import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  name: string;
  category: string;
  totalCO2: number;
  lastCalculated: string;
}

interface ProductGridProps {
  products: Product[];
  onEditProduct: (id: string) => void;
  onDeleteProduct: (id: string) => void;
  onViewProductDetails: (id: string) => void;
}

export const ProductGrid = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onViewProductDetails,
}: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.05
            }}
          >
            <ProductCard
              id={product.id}
              name={product.name}
              category={product.category}
              totalCO2={product.totalCO2}
              lastCalculated={product.lastCalculated}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
              onViewDetails={onViewProductDetails}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};