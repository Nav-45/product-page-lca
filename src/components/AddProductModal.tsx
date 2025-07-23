// Fixed Textarea import issue
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Ingredient {
  id: string;
  quantity: string;
  unit: string;
  name: string;
  supplier: string;
}

interface ValueChainActivity {
  id: string;
  stage: string;
  activity: string;
  scope: string;
  source: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: any) => void;
}

export const AddProductModal = ({ isOpen, onClose, onAddProduct }: AddProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    sku: "",
  });
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [valueChainActivities, setValueChainActivities] = useState<ValueChainActivity[]>([]);

  const categories = [
    "Snacks",
    "Beverages", 
    "Baked Goods",
    "Dairy Products",
    "Meat Products",
    "Frozen Foods",
    "Canned Goods"
  ];

  const units = ["kg", "g", "L", "mL", "pcs", "oz", "lb"];
  
  const lcaStages = [
    "Raw Materials",
    "Processing", 
    "Packaging",
    "Transportation",
    "Distribution",
    "Use Phase",
    "End of Life"
  ];

  const scopes = ["Scope 1", "Scope 2", "Scope 3"];

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      quantity: "",
      unit: "kg",
      name: "",
      supplier: "",
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const addValueChainActivity = () => {
    const newActivity: ValueChainActivity = {
      id: Date.now().toString(),
      stage: "",
      activity: "",
      scope: "",
      source: "",
    };
    setValueChainActivities([...valueChainActivities, newActivity]);
  };

  const updateValueChainActivity = (id: string, field: keyof ValueChainActivity, value: string) => {
    setValueChainActivities(activities => 
      activities.map(activity => 
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    );
  };

  const removeValueChainActivity = (id: string) => {
    setValueChainActivities(activities => activities.filter(activity => activity.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Check if user is authenticated, if not sign them in anonymously
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        const { error: authError } = await supabase.auth.signInAnonymously();
        if (authError) throw authError;
      }

      // Insert product into Supabase
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          name: formData.name,
          category: formData.category,
          sku: formData.sku || null,
          total_co2: Math.random() * 5 + 1, // Mock calculation for now
          user_id: (await supabase.auth.getUser()).data.user?.id,
        })
        .select()
        .single();

      if (productError) throw productError;

      // Insert ingredients if any
      if (ingredients.length > 0) {
        const ingredientsToInsert = ingredients
          .filter(ing => ing.name.trim() !== '') // Only insert ingredients with names
          .map(ing => ({
            product_id: product.id,
            quantity: ing.quantity ? parseFloat(ing.quantity) : null,
            unit: ing.unit,
            name: ing.name,
            supplier: ing.supplier || null,
          }));

        if (ingredientsToInsert.length > 0) {
          const { error: ingredientsError } = await supabase
            .from('ingredients')
            .insert(ingredientsToInsert);

          if (ingredientsError) throw ingredientsError;
        }
      }

      // Create product object for local state
      const newProduct = {
        id: product.id,
        name: product.name,
        category: product.category,
        sku: product.sku,
        totalCO2: product.total_co2,
        lastCalculated: "Just now",
        ingredients: ingredients.filter(ing => ing.name.trim() !== '')
      };

      onAddProduct(newProduct);
      onClose();
      setFormData({ name: "", category: "", sku: "" });
      setIngredients([]);
      setValueChainActivities([]);
      toast.success("Product added successfully!");
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error("Failed to add product. Please try again.");
    }
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
            <Label htmlFor="add-name">Product Name</Label>
            <Input
              id="add-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <Label htmlFor="add-category">Category</Label>
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
            <Label htmlFor="add-sku">Product SKU</Label>
            <Input
              id="add-sku"
              value={formData.sku}
              onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
              placeholder="Enter product SKU"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Ingredients</Label>
              <Button type="button" onClick={addIngredient} size="sm" className="flex items-center gap-1">
                <Plus className="w-4 h-4" />
                Add Ingredient
              </Button>
            </div>
            
            {ingredients.length > 0 && (
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {ingredients.map((ingredient) => (
                  <div key={ingredient.id} className="grid grid-cols-4 gap-2 p-3 border rounded-lg bg-secondary/20">
                    <div>
                      <Label className="text-xs">Quantity</Label>
                      <Input
                        value={ingredient.quantity}
                        onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                        placeholder="0"
                        className="h-8"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Unit</Label>
                      <Select value={ingredient.unit} onValueChange={(value) => updateIngredient(ingredient.id, 'unit', value)}>
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {units.map(unit => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs">Ingredient Name</Label>
                      <Input
                        value={ingredient.name}
                        onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                        placeholder="Ingredient name"
                        className="h-8"
                      />
                    </div>
                    <div className="col-span-3">
                      <Label className="text-xs">Supplier</Label>
                      <Input
                        value={ingredient.supplier}
                        onChange={(e) => updateIngredient(ingredient.id, 'supplier', e.target.value)}
                        placeholder="Supplier name"
                        className="h-8"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button 
                        type="button" 
                        onClick={() => removeIngredient(ingredient.id)}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Define the Value Chain</Label>
              <Button type="button" onClick={addValueChainActivity} size="sm" className="flex items-center gap-1">
                <Plus className="w-4 h-4" />
                Add Activity
              </Button>
            </div>
            
            {valueChainActivities.length > 0 && (
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {valueChainActivities.map((activity) => (
                  <div key={activity.id} className="space-y-3 p-3 border rounded-lg bg-secondary/20">
                    <div>
                      <Label className="text-xs">Activity</Label>
                      <Input
                        value={activity.activity}
                        onChange={(e) => updateValueChainActivity(activity.id, 'activity', e.target.value)}
                        placeholder="Activity name"
                        className="h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">LCA Stage</Label>
                        <Select value={activity.stage} onValueChange={(value) => updateValueChainActivity(activity.id, 'stage', value)}>
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Select stage" />
                          </SelectTrigger>
                          <SelectContent>
                            {lcaStages.map(stage => (
                              <SelectItem key={stage} value={stage}>
                                {stage}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Scope</Label>
                        <Select value={activity.scope} onValueChange={(value) => updateValueChainActivity(activity.id, 'scope', value)}>
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Scope" />
                          </SelectTrigger>
                          <SelectContent>
                            {scopes.map(scope => (
                              <SelectItem key={scope} value={scope}>
                                {scope}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col">
                        <Label className="text-xs">Source</Label>
                        <div className="flex gap-1">
                          <Input
                            value={activity.source}
                            onChange={(e) => updateValueChainActivity(activity.id, 'source', e.target.value)}
                            placeholder="Source"
                            className="h-8 flex-1"
                          />
                          <Button 
                            type="button" 
                            onClick={() => removeValueChainActivity(activity.id)}
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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