import { motion } from "framer-motion";
import { Trash2, Edit3, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  totalCO2: number;
  lastCalculated: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export const ProductCard = ({
  id,
  name,
  category,
  totalCO2,
  lastCalculated,
  onEdit,
  onDelete,
  onViewDetails,
}: ProductCardProps) => {
  const formatCO2 = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}t`;
    }
    return `${value.toFixed(2)}kg`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg text-foreground leading-tight">
                {name}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(id);
                }}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent 
          className="pt-0 cursor-pointer"
          onClick={() => onViewDetails(id)}
        >
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">
                {formatCO2(totalCO2)}
              </div>
              <div className="text-sm text-muted-foreground">
                CO₂ equivalent
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last calculated:</span>
              <span className="text-foreground font-medium">{lastCalculated}</span>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(id);
              }}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Breakdown
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};