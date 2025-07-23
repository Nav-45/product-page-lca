import { useState, useEffect } from "react";
import { Edit3, Plus, X } from "lucide-react";
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

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateProduct: (id: string, updatedProduct: any) => void;
  product: {
    id: string;
    name: string;
    category: string;
    sku?: string;
    ingredients?: Ingredient[];
    valueChainActivities?: ValueChainActivity[];
    totalCO2: number;
    lastCalculated: string;
  } | null;
}

export const EditProductModal = ({ isOpen, onClose, onUpdateProduct, product }: EditProductModalProps) => {
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

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        sku: product.sku || "",
      });
      setIngredients(product.ingredients || []);
      loadValueChainActivities(product.id);
    }
  }, [product]);

  const loadValueChainActivities = async (productId: string) => {
    try {
      const { data, error } = await supabase
        .from('value_chain_entries')
        .select('*')
        .eq('product_id', productId);

      if (error) throw error;

      const activities = data?.map(entry => ({
        id: entry.id,
        stage: entry.stage || "",
        activity: entry.activity,
        scope: entry.scope ? `Scope ${entry.scope}` : "",
        source: "", // This field doesn't exist in DB yet, keeping for UI compatibility
      })) || [];

      setValueChainActivities(activities);
    } catch (error) {
      console.error('Error loading value chain activities:', error);
    }
  };

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
    if (!product) return;
    
    try {
      // Update product in database
      const { error: productError } = await supabase
        .from('products')
        .update({
          name: formData.name,
          category: formData.category,
          sku: formData.sku || null,
        })
        .eq('id', product.id);

      if (productError) throw productError;

      // Handle value chain activities - first delete existing ones, then insert new ones
      const { error: deleteError } = await supabase
        .from('value_chain_entries')
        .delete()
        .eq('product_id', product.id);

      if (deleteError) throw deleteError;

      // Insert new value chain activities
      if (valueChainActivities.length > 0) {
        const activitiesToInsert = valueChainActivities
          .filter(activity => activity.activity.trim() !== '')
          .map(activity => ({
            product_id: product.id,
            stage: activity.stage || null,
            activity: activity.activity,
            scope: activity.scope ? parseInt(activity.scope.replace('Scope ', '')) : null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }));

        if (activitiesToInsert.length > 0) {
          const { error: activitiesError } = await supabase
            .from('value_chain_entries')
            .insert(activitiesToInsert);

          if (activitiesError) throw activitiesError;
        }
      }

      const updatedProduct = {
        ...product,
        name: formData.name,
        category: formData.category,
        sku: formData.sku,
        ingredients: ingredients,
        valueChainActivities: valueChainActivities,
        lastCalculated: "Just updated"
      };

      onUpdateProduct(product.id, updatedProduct);
      onClose();
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error("Failed to update product. Please try again.");
    }
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

          <div>
            <Label htmlFor="edit-sku">Product SKU</Label>
            <Input
              id="edit-sku"
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