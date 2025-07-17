import { useState } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";

interface ImportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportProducts: (products: any[]) => void;
}

export const ImportCSVModal = ({ isOpen, onClose, onImportProducts }: ImportCSVModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "text/csv" && !file.name.endsWith('.csv')) {
        setError("Please select a valid CSV file");
        return;
      }
      setSelectedFile(file);
      setError("");
    }
  };

  const parseCSV = (text: string) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const requiredHeaders = ['name', 'category'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`);
    }

    const products = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      if (values.length !== headers.length) continue;
      
      const product: any = {};
      headers.forEach((header, index) => {
        product[header] = values[index];
      });

      // Validate required fields
      if (!product.name || !product.category) continue;

      // Create product object
      products.push({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: product.name,
        category: product.category,
        totalCO2: Math.random() * 5 + 1, // Mock calculation
        lastCalculated: "Imported"
      });
    }

    return products;
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError("");

    try {
      const text = await selectedFile.text();
      const products = parseCSV(text);
      
      if (products.length === 0) {
        throw new Error("No valid products found in CSV file");
      }

      onImportProducts(products);
      onClose();
      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process CSV file");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "name,category\nPremium Potato Crisps,Snacks\nOrganic Apple Juice,Beverages";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Import Products from CSV
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="csv-file">Select CSV File</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="cursor-pointer"
            />
          </div>

          {selectedFile && (
            <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded">
              <FileText className="w-4 h-4" />
              <span className="text-sm">{selectedFile.name}</span>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="bg-muted p-3 rounded-lg">
            <div className="text-sm font-medium mb-2">CSV Format Requirements:</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• Required columns: name, category</div>
              <div>• First row should contain column headers</div>
              <div>• Categories: Snacks, Beverages, Baked Goods, etc.</div>
            </div>
            <Button 
              variant="link" 
              size="sm" 
              onClick={downloadTemplate}
              className="p-0 h-auto mt-2 text-xs"
            >
              Download Template
            </Button>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleImport} 
              disabled={!selectedFile || isProcessing}
            >
              {isProcessing ? "Processing..." : "Import Products"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};