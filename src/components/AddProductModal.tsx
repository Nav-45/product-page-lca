import { useState } from "react";
import { motion } from "framer-motion";
import { X, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: any) => void;
}

export const AddProductModal = ({ isOpen, onClose, onAddProduct }: AddProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    weight: "",
    volume: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      totalCO2: Math.random() * 5 + 1, // Mock calculation
      lastCalculated: "Just now"
    };

    onAddProduct(newProduct);
    onClose();
    setFormData({ name: "", category: "", description: "", weight: "", volume: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
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

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Product description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="0.0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="volume">Volume (L)</Label>
              <Input
                id="volume"
                type="number"
                value={formData.volume}
                onChange={(e) => setFormData(prev => ({ ...prev, volume: e.target.value }))}
                placeholder="0.0"
                step="0.01"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.name || !formData.category}>
              Add Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};