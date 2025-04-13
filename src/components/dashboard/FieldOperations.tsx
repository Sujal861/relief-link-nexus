
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Truck, 
  Package, 
  Users, 
  Camera, 
  MapPin, 
  Clock,
  Clipboard,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FieldOperations = () => {
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Operation Recorded",
        description: isOfflineMode 
          ? "Your report has been saved locally and will sync when you're back online" 
          : "Your report has been submitted successfully",
      });
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clipboard size={20} className="text-relief-lime" />
          Field Operations
        </CardTitle>
        <CardDescription>
          Simple tools for field volunteers and operators
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Switch 
              id="offline-mode" 
              checked={isOfflineMode} 
              onCheckedChange={setIsOfflineMode} 
            />
            <Label htmlFor="offline-mode">Offline Mode</Label>
          </div>
          <span className="text-xs text-gray-500">
            {isOfflineMode 
              ? "Changes will be saved locally and synced later" 
              : "Connected to central database"
            }
          </span>
        </div>
      
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="operation-type">Operation Type</Label>
              <Select defaultValue="distribution">
                <SelectTrigger id="operation-type">
                  <SelectValue placeholder="Select operation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distribution">Aid Distribution</SelectItem>
                  <SelectItem value="assessment">Needs Assessment</SelectItem>
                  <SelectItem value="delivery">Supply Delivery</SelectItem>
                  <SelectItem value="setup">Drop Zone Setup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <Input
                  id="location"
                  placeholder="Current location or zone ID"
                  className="pl-8"
                />
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-7"
                >
                  Get GPS
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the operation"
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Quick Actions</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Camera size={14} />
                Add Photo
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Package size={14} />
                Scan Supply
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Users size={14} />
                Record Beneficiaries
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Clock size={14} />
                Time Stamp
              </Button>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              className="flex items-center gap-2"
              disabled={isSaving}
            >
              {isSaving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save size={16} />
                  {isOfflineMode ? "Save Locally" : "Submit Report"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
