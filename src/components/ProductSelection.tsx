import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { ProductGrid } from "./ProductGrid";
import { EmptyState } from "./EmptyState";
import { AddProductModal } from "./AddProductModal";
import { ProductBreakdownModal } from "./ProductBreakdownModal";
import { EditProductModal } from "./EditProductModal";
import { ImportCSVModal } from "./ImportCSVModal";
import { SettingsModal } from "./SettingsModal";
import { ProfileModal } from "./ProfileModal";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  totalCO2: number;
  lastCalculated: string;
}

export const ProductSelection = () => {
  const { toast } = useToast();
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

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const totalProducts = products.length;
  const totalEmissions = products.reduce((sum, product) => sum + product.totalCO2, 0);

  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  const handleAddNewProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added successfully.`,
    });
  };

  const handleEditProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setShowEditModal(true);
    }
  };

  const handleUpdateProduct = (id: string, updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
    toast({
      title: "Product Updated",
      description: `${updatedProduct.name} has been updated successfully.`,
    });
  };

  const handleDeleteProduct = (id: string) => {
    const product = products.find(p => p.id === id);
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product Deleted",
      description: `${product?.name || 'Product'} has been removed.`,
      variant: "destructive",
    });
  };

  const handleViewProductDetails = (id: string) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setShowBreakdownModal(true);
    }
  };

  const handleExportReport = () => {
    // Generate CSV report
    const csvContent = [
      "Product Name,Category,CO2 Emissions (kg),Last Calculated",
      ...products.map(p => `"${p.name}","${p.category}",${p.totalCO2.toFixed(2)},"${p.lastCalculated}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emisia-carbon-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Report Exported",
      description: "Carbon emissions report has been downloaded.",
    });
  };

  const handleImportProducts = (importedProducts: Product[]) => {
    setProducts(prev => [...prev, ...importedProducts]);
    toast({
      title: "Products Imported",
      description: `${importedProducts.length} products have been imported successfully.`,
    });
  };

  const handleShowSettings = () => {
    setShowSettingsModal(true);
  };

  const handleShowProfile = () => {
    setShowProfileModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        totalProducts={totalProducts}
        totalEmissions={totalEmissions}
        onAddProduct={handleAddProduct}
        onExportReport={handleExportReport}
        onImportCSV={() => setShowImportModal(true)}
        onShowSettings={handleShowSettings}
        onShowProfile={handleShowProfile}
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

      {/* Modals */}
      <AddProductModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddProduct={handleAddNewProduct}
      />

      <ProductBreakdownModal
        isOpen={showBreakdownModal}
        onClose={() => {
          setShowBreakdownModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />

      <EditProductModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
        }}
        onUpdateProduct={handleUpdateProduct}
        product={selectedProduct}
      />

      <ImportCSVModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImportProducts={handleImportProducts}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </div>
  );
};