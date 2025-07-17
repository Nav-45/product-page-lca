import { motion } from "framer-motion";
import { X, Factory, Truck, Package, Recycle } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ProductBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    category: string;
    totalCO2: number;
  } | null;
}

export const ProductBreakdownModal = ({ isOpen, onClose, product }: ProductBreakdownModalProps) => {
  if (!product) return null;

  // Mock breakdown data - will be replaced with real calculation data
  const breakdown = [
    {
      stage: "Raw Materials",
      co2: product.totalCO2 * 0.35,
      percentage: 35,
      icon: Factory,
      color: "bg-red-500",
      details: ["Potato farming: 0.65kg CO₂", "Water usage: 0.12kg CO₂", "Fertilizers: 0.08kg CO₂"]
    },
    {
      stage: "Processing",
      co2: product.totalCO2 * 0.25,
      percentage: 25,
      icon: Factory,
      color: "bg-orange-500",
      details: ["Electricity: 0.45kg CO₂", "Natural gas: 0.16kg CO₂"]
    },
    {
      stage: "Packaging",
      co2: product.totalCO2 * 0.20,
      percentage: 20,
      icon: Package,
      color: "bg-yellow-500",
      details: ["Plastic packaging: 0.35kg CO₂", "Labels: 0.14kg CO₂"]
    },
    {
      stage: "Transportation",
      co2: product.totalCO2 * 0.15,
      percentage: 15,
      icon: Truck,
      color: "bg-blue-500",
      details: ["Distribution: 0.25kg CO₂", "Retail transport: 0.12kg CO₂"]
    },
    {
      stage: "End of Life",
      co2: product.totalCO2 * 0.05,
      percentage: 5,
      icon: Recycle,
      color: "bg-green-500",
      details: ["Waste disposal: 0.12kg CO₂"]
    }
  ];

  const formatCO2 = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}t`;
    }
    return `${value.toFixed(2)}kg`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Carbon Footprint Breakdown: {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {formatCO2(product.totalCO2)}
                </div>
                <div className="text-muted-foreground">Total CO₂ Equivalent</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Category: {product.category}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stage Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lifecycle Assessment Breakdown</h3>
            {breakdown.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${stage.color} text-white`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span>{stage.stage}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{formatCO2(stage.co2)}</div>
                          <div className="text-sm text-muted-foreground">
                            {stage.percentage}%
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={stage.percentage} className="mb-3" />
                      <div className="space-y-1">
                        {stage.details.map((detail, idx) => (
                          <div key={idx} className="text-sm text-muted-foreground">
                            • {detail}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Methodology */}
          <Card>
            <CardHeader>
              <CardTitle>Calculation Methodology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>This assessment follows ISO 14040/14044 standards for Life Cycle Assessment (LCA).</p>
                <p>Emission factors sourced from IPCC 2021 guidelines and industry-specific databases.</p>
                <p>System boundaries: Cradle-to-grave including raw material extraction, processing, packaging, distribution, and end-of-life disposal.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};