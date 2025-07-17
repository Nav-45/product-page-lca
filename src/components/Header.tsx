import { motion } from "framer-motion";
import { Plus, Download, Settings, User } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  totalProducts: number;
  totalEmissions: number;
  onAddProduct: () => void;
  onExportReport: () => void;
}

export const Header = ({ 
  totalProducts, 
  totalEmissions, 
  onAddProduct, 
  onExportReport 
}: HeaderProps) => {
  const formatCO2 = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}t`;
    }
    return `${value.toFixed(2)}kg`;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Logo and navigation */}
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-emisia-success rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Emisia</h1>
                <p className="text-sm text-muted-foreground">Carbon Calculator</p>
              </div>
            </motion.div>
            
            {/* Mobile user menu */}
            <div className="lg:hidden">
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Summary stats */}
          {totalProducts > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-8 bg-secondary/30 rounded-lg px-6 py-3"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {totalProducts}
                </div>
                <div className="text-sm text-muted-foreground">
                  Products
                </div>
              </div>
              
              <div className="w-px h-8 bg-border"></div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {formatCO2(totalEmissions)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total CO₂e
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            {totalProducts > 0 && (
              <Button 
                variant="outline" 
                onClick={onExportReport}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            )}
            
            <Button 
              onClick={onAddProduct}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
            
            {/* Desktop user menu */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};