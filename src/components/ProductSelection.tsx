import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { ProductGrid } from "./ProductGrid";
import { EmptyState } from "./EmptyState";

interface Product {
  id: string;
  name: string;
  category: string;
  totalCO2: number;
  lastCalculated: string;
}

export const ProductSelection = () => {
  const [products, setProducts] = useState<Product[]>([
    // Sample data - will be replaced with Supabase data
    {
      id: "1",
      name: "Premium Potato Crisps",
      category: "Snacks",
      totalCO2: 2.45,
      lastCalculated: "2 days ago"
    },
    {
      id: "2", 
      name: "Organic Apple Juice",
      category: "Beverages",
      totalCO2: 1.23,
      lastCalculated: "1 week ago"
    },
    {
      id: "3",
      name: "Chocolate Cookies",
      category: "Baked Goods", 
      totalCO2: 3.67,
      lastCalculated: "3 days ago"
    }
  ]);

  const totalProducts = products.length;
  const totalEmissions = products.reduce((sum, product) => sum + product.totalCO2, 0);

  const handleAddProduct = () => {
    console.log("Add product clicked");
    // TODO: Open product addition modal/page
  };

  const handleEditProduct = (id: string) => {
    console.log("Edit product:", id);
    // TODO: Open edit modal for product
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleViewProductDetails = (id: string) => {
    console.log("View details for:", id);
    // TODO: Navigate to product details/breakdown page
  };

  const handleExportReport = () => {
    console.log("Export report clicked");
    // TODO: Generate and download report
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        totalProducts={totalProducts}
        totalEmissions={totalEmissions}
        onAddProduct={handleAddProduct}
        onExportReport={handleExportReport}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {products.length === 0 ? (
          <EmptyState onAddProduct={handleAddProduct} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Your Products
              </h2>
              <p className="text-muted-foreground">
                Manage and analyze the carbon footprint of your product portfolio
              </p>
            </div>
            
            <ProductGrid
              products={products}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
              onViewProductDetails={handleViewProductDetails}
            />
          </motion.div>
        )}
      </main>
    </div>
  );
};