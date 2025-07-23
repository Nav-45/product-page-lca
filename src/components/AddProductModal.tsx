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
  quantity: string;
  unit: string;
  description: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: any) => void;
}

// Classification functions
function classifyScopeAndLCA(activity: string) {
  const lower = activity.toLowerCase();
  let scope = "Scope 3";
  let lcaStage = "Unclassified";

  if (["electricity", "grid", "power", "kwh"].some(w => lower.includes(w))) scope = "Scope 2";
  if (["diesel", "petrol", "generator", "combustion", "fuel"].some(w => lower.includes(w))) scope = "Scope 1";

  if (lower.includes("electricity")) {
    if (lower.includes("own") || lower.includes("on-site generation")) scope = "Scope 1";
    else if (lower.includes("supplier") || lower.includes("supply chain")) scope = "Scope 3";
    else if (lower.includes("purchased") || lower.includes("grid")) scope = "Scope 2";
  }

  if (["mining", "extraction", "harvest"].some(w => lower.includes(w))) lcaStage = "Raw Material Acquisition";
  else if (["manufacturing", "production", "assembly"].some(w => lower.includes(w))) lcaStage = "Manufacturing & Processing";
  else if (["transport", "shipping", "logistics", "delivery"].some(w => lower.includes(w))) lcaStage = "Distribution & Transport";
  else if (["use", "consumption"].some(w => lower.includes(w))) lcaStage = "Use Phase";
  else if (["disposal", "landfill", "waste", "recycling"].some(w => lower.includes(w))) lcaStage = "End of Life";

  return { scope, lcaStage };
}

function parseActivity(activity: string) {
  const lower = activity.toLowerCase();
  const types = ["electricity", "diesel", "natural gas", "transport", "plastic"];
  const sources = ["supplier", "own", "grid", "external", "internal", "on-site", "off-site"];
  const activityType = types.find(type => lower.includes(type)) || "unknown";
  const source = sources.find(s => lower.includes(s)) || "unknown";
  const { scope, lcaStage } = classifyScopeAndLCA(activity);
  return { activityType, source, lcaStage, scope };
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
      quantity: "",
      unit: "kg",
      description: "",
    };
    setValueChainActivities([...valueChainActivities, newActivity]);
  };

  const addValueChainActivityForStage = (stage: string) => {
    const newActivity: ValueChainActivity = {
      id: Date.now().toString(),
      stage: stage,
      activity: "",
      scope: "",
      source: "",
      quantity: "",
      unit: "kg",
      description: "",
    };
    setValueChainActivities([...valueChainActivities, newActivity]);
  };

  const updateValueChainActivity = (index: number, field: keyof ValueChainActivity, value: string) => {
    setValueChainActivities(activities => 
      activities.map((activity, i) => 
        i === index ? { ...activity, [field]: value } : activity
      )
    );
  };

  const removeValueChainActivity = (index: number) => {
    setValueChainActivities(activities => activities.filter((_, i) => i !== index));
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
          total_co2: 0, // Will be calculated from ingredients and activities
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

      // Insert value chain activities if any
      if (valueChainActivities.length > 0) {
        const activitiesToInsert = valueChainActivities
          .filter(activity => activity.activity.trim() !== '') // Only insert activities with names
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

          // Classify and insert into lca_classification table
          const classificationsToInsert = valueChainActivities
            .filter(activity => activity.activity.trim() !== '')
            .map(activity => {
              const { activityType, source, lcaStage, scope } = parseActivity(activity.activity);
              return {
                product_id: product.id,
                activity_name: activity.activity,
                activity_type: activityType,
                source,
                lca_stage: lcaStage,
                scope: scope === "Scope 1" ? 1 : scope === "Scope 2" ? 2 : 3,
                unit: "kg" // Default unit, can be made dynamic if needed
              };
            });

          if (classificationsToInsert.length > 0) {
            const { error: classificationsError } = await supabase
              .from('lca_classification')
              .insert(classificationsToInsert);

            if (classificationsError) throw classificationsError;
          }
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

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Define the Value Chain</h3>
            
            {/* Raw Materials Section */}
            <div className="border rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-primary">Raw Materials</h4>
              {valueChainActivities
                .map((activity, index) => ({ ...activity, index }))
                .filter(activity => activity.stage === 'Raw Materials')
                .map(({ index, ...activity }) => (
                <div key={activity.id} className="space-y-2 bg-muted/50 p-3 rounded">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`activity-${index}`}>Activity</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeValueChainActivity(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    id={`activity-${index}`}
                    placeholder="e.g., Steel extraction, Cotton harvesting"
                    value={activity.activity}
                    onChange={(e) => updateValueChainActivity(index, 'activity', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        placeholder="100"
                        value={activity.quantity}
                        onChange={(e) => updateValueChainActivity(index, 'quantity', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`unit-${index}`}>Unit</Label>
                      <Select value={activity.unit} onValueChange={(value) => updateValueChainActivity(index, 'unit', value)}>
                        <SelectTrigger>
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
                  </div>
                  <Label htmlFor={`description-${index}`}>Description (Optional)</Label>
                  <textarea
                    id={`description-${index}`}
                    className="w-full p-2 border border-input rounded-md"
                    placeholder="Additional details about this activity"
                    value={activity.description}
                    onChange={(e) => updateValueChainActivity(index, 'description', e.target.value)}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addValueChainActivityForStage('Raw Materials')}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Raw Materials Activity
              </Button>
            </div>

            {/* Processing Section */}
            <div className="border rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-primary">Processing</h4>
              {valueChainActivities
                .map((activity, index) => ({ ...activity, index }))
                .filter(activity => activity.stage === 'Processing')
                .map(({ index, ...activity }) => (
                <div key={activity.id} className="space-y-2 bg-muted/50 p-3 rounded">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`activity-${index}`}>Activity</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeValueChainActivity(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    id={`activity-${index}`}
                    placeholder="e.g., Manufacturing, Assembly, Production"
                    value={activity.activity}
                    onChange={(e) => updateValueChainActivity(index, 'activity', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        placeholder="100"
                        value={activity.quantity}
                        onChange={(e) => updateValueChainActivity(index, 'quantity', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`unit-${index}`}>Unit</Label>
                      <Select value={activity.unit} onValueChange={(value) => updateValueChainActivity(index, 'unit', value)}>
                        <SelectTrigger>
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
                  </div>
                  <Label htmlFor={`description-${index}`}>Description (Optional)</Label>
                  <textarea
                    id={`description-${index}`}
                    className="w-full p-2 border border-input rounded-md"
                    placeholder="Additional details about this activity"
                    value={activity.description}
                    onChange={(e) => updateValueChainActivity(index, 'description', e.target.value)}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addValueChainActivityForStage('Processing')}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Processing Activity
              </Button>
            </div>

            {/* Packaging Section */}
            <div className="border rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-primary">Packaging</h4>
              {valueChainActivities
                .map((activity, index) => ({ ...activity, index }))
                .filter(activity => activity.stage === 'Packaging')
                .map(({ index, ...activity }) => (
                <div key={activity.id} className="space-y-2 bg-muted/50 p-3 rounded">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`activity-${index}`}>Activity</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeValueChainActivity(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    id={`activity-${index}`}
                    placeholder="e.g., Cardboard packaging, Plastic wrapping"
                    value={activity.activity}
                    onChange={(e) => updateValueChainActivity(index, 'activity', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        placeholder="100"
                        value={activity.quantity}
                        onChange={(e) => updateValueChainActivity(index, 'quantity', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`unit-${index}`}>Unit</Label>
                      <Select value={activity.unit} onValueChange={(value) => updateValueChainActivity(index, 'unit', value)}>
                        <SelectTrigger>
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
                  </div>
                  <Label htmlFor={`description-${index}`}>Description (Optional)</Label>
                  <textarea
                    id={`description-${index}`}
                    className="w-full p-2 border border-input rounded-md"
                    placeholder="Additional details about this activity"
                    value={activity.description}
                    onChange={(e) => updateValueChainActivity(index, 'description', e.target.value)}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addValueChainActivityForStage('Packaging')}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Packaging Activity
              </Button>
            </div>

            {/* Transportation Section */}
            <div className="border rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-primary">Transportation</h4>
              {valueChainActivities
                .map((activity, index) => ({ ...activity, index }))
                .filter(activity => activity.stage === 'Transportation')
                .map(({ index, ...activity }) => (
                <div key={activity.id} className="space-y-2 bg-muted/50 p-3 rounded">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`activity-${index}`}>Activity</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeValueChainActivity(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    id={`activity-${index}`}
                    placeholder="e.g., Truck delivery, Air freight, Shipping"
                    value={activity.activity}
                    onChange={(e) => updateValueChainActivity(index, 'activity', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        placeholder="100"
                        value={activity.quantity}
                        onChange={(e) => updateValueChainActivity(index, 'quantity', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`unit-${index}`}>Unit</Label>
                      <Select value={activity.unit} onValueChange={(value) => updateValueChainActivity(index, 'unit', value)}>
                        <SelectTrigger>
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
                  </div>
                  <Label htmlFor={`description-${index}`}>Description (Optional)</Label>
                  <textarea
                    id={`description-${index}`}
                    className="w-full p-2 border border-input rounded-md"
                    placeholder="Additional details about this activity"
                    value={activity.description}
                    onChange={(e) => updateValueChainActivity(index, 'description', e.target.value)}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addValueChainActivityForStage('Transportation')}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Transportation Activity
              </Button>
            </div>

            {/* End of Life Section */}
            <div className="border rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-primary">End of Life</h4>
              {valueChainActivities
                .map((activity, index) => ({ ...activity, index }))
                .filter(activity => activity.stage === 'End of Life')
                .map(({ index, ...activity }) => (
                <div key={activity.id} className="space-y-2 bg-muted/50 p-3 rounded">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`activity-${index}`}>Activity</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeValueChainActivity(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    id={`activity-${index}`}
                    placeholder="e.g., Recycling, Disposal, Landfill"
                    value={activity.activity}
                    onChange={(e) => updateValueChainActivity(index, 'activity', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        placeholder="100"
                        value={activity.quantity}
                        onChange={(e) => updateValueChainActivity(index, 'quantity', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`unit-${index}`}>Unit</Label>
                      <Select value={activity.unit} onValueChange={(value) => updateValueChainActivity(index, 'unit', value)}>
                        <SelectTrigger>
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
                  </div>
                  <Label htmlFor={`description-${index}`}>Description (Optional)</Label>
                  <textarea
                    id={`description-${index}`}
                    className="w-full p-2 border border-input rounded-md"
                    placeholder="Additional details about this activity"
                    value={activity.description}
                    onChange={(e) => updateValueChainActivity(index, 'description', e.target.value)}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addValueChainActivityForStage('End of Life')}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add End of Life Activity
              </Button>
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