import { useState } from "react";
import { Settings, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [settings, setSettings] = useState({
    units: "metric",
    defaultCategory: "snacks",
    autoCalculate: true,
    darkMode: false,
    notifications: true,
    exportFormat: "pdf"
  });

  const handleSave = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('emisia-settings', JSON.stringify(settings));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Application Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Units Section */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Units & Measurements</Label>
            <div>
              <Label htmlFor="units">Unit System</Label>
              <Select value={settings.units} onValueChange={(value) => setSettings(prev => ({ ...prev, units: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (kg, km)</SelectItem>
                  <SelectItem value="imperial">Imperial (lbs, miles)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Defaults Section */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Defaults</Label>
            <div>
              <Label htmlFor="defaultCategory">Default Product Category</Label>
              <Select value={settings.defaultCategory} onValueChange={(value) => setSettings(prev => ({ ...prev, defaultCategory: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="snacks">Snacks</SelectItem>
                  <SelectItem value="beverages">Beverages</SelectItem>
                  <SelectItem value="baked-goods">Baked Goods</SelectItem>
                  <SelectItem value="dairy">Dairy Products</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="exportFormat">Default Export Format</Label>
              <Select value={settings.exportFormat} onValueChange={(value) => setSettings(prev => ({ ...prev, exportFormat: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Behavior Section */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Application Behavior</Label>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoCalculate">Auto-calculate emissions</Label>
                <div className="text-sm text-muted-foreground">
                  Calculate emissions automatically when adding products
                </div>
              </div>
              <Switch
                id="autoCalculate"
                checked={settings.autoCalculate}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoCalculate: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications">Enable notifications</Label>
                <div className="text-sm text-muted-foreground">
                  Show calculation progress and completion alerts
                </div>
              </div>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifications: checked }))}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};