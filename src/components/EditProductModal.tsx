import { useState, useEffect } from "react";
import { Edit3 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateProduct: (id: string, updatedProduct: any) => void;
  product: {
    id: string;
    name: string;
    category: string;
    totalCO2: number;
    lastCalculated: string;
  } | null;
}

export const EditProductModal = ({ isOpen, onClose, onUpdateProduct, product }: EditProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });

  const categories = [
    "Snacks",
    "Beverages", 
    "Baked Goods",
    "Dairy Products",
    "Meat Products",
    "Frozen Foods",
    "Canned Goods"
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    const updatedProduct = {
      ...product,
      name: formData.name,
      category: formData.category,
      lastCalculated: "Just updated"
    };

    onUpdateProduct(product.id, updatedProduct);
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            Edit Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Product Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <Label htmlFor="edit-category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-secondary/30 p-3 rounded-lg">
            <div className="text-sm text-muted-foreground">Current CO₂ Footprint</div>
            <div className="text-lg font-semibold">
              {product.totalCO2 >= 1000 
                ? `${(product.totalCO2 / 1000).toFixed(2)}t` 
                : `${product.totalCO2.toFixed(2)}kg`} CO₂e
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Last calculated: {product.lastCalculated}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.name || !formData.category}>
              Update Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};