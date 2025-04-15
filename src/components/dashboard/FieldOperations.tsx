
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; 
import { 
  Truck, 
  Package, 
  Users, 
  Camera, 
  MapPin, 
  Clock,
  Clipboard,
  Save,
  Upload,
  Download,
  AlertTriangle,
  Battery,
  Signal,
  QrCode
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FieldOperations = () => {
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [locationStatus, setLocationStatus] = useState("unknown");
  const [pendingSync, setPendingSync] = useState(0);
  const { toast } = useToast();
  
  // Simulate battery monitoring
  useEffect(() => {
    // Check if Battery API is available
    if ('getBattery' in navigator) {
      const updateBatteryStatus = (battery: any) => {
        setBatteryLevel(Math.floor(battery.level * 100));
      };
      
      // Fix: Use window.navigator.getBattery instead of navigator.getBattery
      // The error was because navigator.getBattery might be undefined or not callable
      if (typeof navigator.getBattery === 'function') {
        navigator.getBattery().then((battery: any) => {
          updateBatteryStatus(battery);
          battery.addEventListener('levelchange', () => updateBatteryStatus(battery));
        });
      }
    }
    
    // Check connection status
    const updateConnectionStatus = () => {
      setIsOfflineMode(!navigator.onLine);
      
      if (navigator.onLine && pendingSync > 0) {
        toast({
          title: "Network Connection Restored",
          description: `${pendingSync} operations ready to sync`,
        });
      }
    };
    
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
    
    // Set initial status
    updateConnectionStatus();
    
    // Cleanup
    return () => {
      window.removeEventListener('online', updateConnectionStatus);
      window.removeEventListener('offline', updateConnectionStatus);
    };
  }, [pendingSync, toast]);
  
  // Simulate geolocation monitoring
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("unsupported");
      return;
    }
    
    const locationWatchId = navigator.geolocation.watchPosition(
      () => {
        setLocationStatus("available");
      },
      () => {
        setLocationStatus("error");
      }
    );
    
    // Cleanup
    return () => {
      navigator.geolocation.clearWatch(locationWatchId);
    };
  }, []);
  
  // Simulate pending operations when offline
  useEffect(() => {
    if (isOfflineMode) {
      // Simulate some pending operations accumulating while offline
      const interval = setInterval(() => {
        setPendingSync(prev => Math.min(prev + 1, 15));
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [isOfflineMode]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate saving - different behavior for online/offline
    setTimeout(() => {
      setIsSaving(false);
      
      if (isOfflineMode) {
        setPendingSync(prev => prev + 1);
        toast({
          title: "Operation Stored Locally",
          description: "Your report has been saved to your device and will sync when connection is restored",
        });
      } else {
        toast({
          title: "Operation Recorded",
          description: "Your report has been submitted and synchronized with central database",
        });
      }
    }, 1000);
  };
  
  const triggerSync = () => {
    if (pendingSync === 0) {
      toast({
        title: "Nothing to Synchronize",
        description: "All operations are up to date",
      });
      return;
    }
    
    setIsSyncing(true);
    setSyncProgress(0);
    
    // Simulate sync progress
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          setPendingSync(0);
          toast({
            title: "Synchronization Complete",
            description: "All operations have been successfully synchronized",
          });
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const scanQRCode = () => {
    toast({
      title: "QR Code Scanner",
      description: "Scan supply items or ID cards to record transactions",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clipboard size={20} className="text-relief-lime" />
              Field Operations
            </CardTitle>
            <CardDescription>
              Simple tools for field volunteers and operators
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Device status indicators */}
            <div className="hidden md:flex items-center space-x-3 text-xs text-gray-500">
              {/* Battery indicator */}
              <div className="flex items-center" title={`Battery: ${batteryLevel}%`}>
                <Battery size={14} className={batteryLevel < 20 ? "text-red-500" : "text-green-500"} />
                <span className="ml-1">{batteryLevel}%</span>
              </div>
              
              {/* Signal indicator */}
              <div className="flex items-center" title={isOfflineMode ? "Offline Mode" : "Online"}>
                <Signal size={14} className={isOfflineMode ? "text-gray-400" : "text-green-500"} />
                <span className="ml-1">{isOfflineMode ? "Offline" : "Online"}</span>
              </div>
              
              {/* GPS indicator */}
              <div className="flex items-center" title={`GPS: ${locationStatus}`}>
                <MapPin size={14} className={
                  locationStatus === "available" ? "text-green-500" : 
                  locationStatus === "error" ? "text-red-500" : "text-gray-400"
                } />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Connection Status & Sync Controls */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Switch 
                id="offline-mode" 
                checked={isOfflineMode} 
                onCheckedChange={setIsOfflineMode} 
                disabled={!navigator.onLine}
              />
              <Label htmlFor="offline-mode" className="flex items-center">
                <span>Offline Mode</span>
                {!navigator.onLine && (
                  <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                    Auto-Enabled
                  </Badge>
                )}
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              {pendingSync > 0 && (
                <Badge variant="secondary" className="flex gap-1 items-center">
                  <Upload size={12} />
                  {pendingSync} pending
                </Badge>
              )}
              
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={triggerSync}
                disabled={isSyncing || pendingSync === 0 || !navigator.onLine}
              >
                <Upload size={14} className={isSyncing ? "animate-pulse" : ""} />
                Sync Data
              </Button>
            </div>
          </div>
          
          {/* Sync Progress */}
          {isSyncing && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Synchronizing data...</span>
                <span>{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="h-1" />
            </div>
          )}
          
          {/* Connection Status Message */}
          <div className="text-xs">
            {isOfflineMode ? (
              <div className="flex items-center text-amber-700">
                <AlertTriangle size={12} className="mr-1" />
                <span>Changes will be saved locally and synced when connection is restored</span>
              </div>
            ) : (
              <div className="flex items-center text-green-700">
                <Upload size={12} className="mr-1" />
                <span>Connected to central database - all changes sync automatically</span>
              </div>
            )}
          </div>
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
                  <SelectItem value="evacuation">Evacuation Support</SelectItem>
                  <SelectItem value="medical">Medical Aid</SelectItem>
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
                  disabled={locationStatus !== "available"}
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
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1 justify-center sm:justify-start"
              >
                <Camera size={14} />
                <span className="hidden sm:inline">Add Photo</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1 justify-center sm:justify-start"
                onClick={scanQRCode}
              >
                <QrCode size={14} />
                <span className="hidden sm:inline">Scan QR</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1 justify-center sm:justify-start"
              >
                <Package size={14} />
                <span className="hidden sm:inline">Record Supplies</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1 justify-center sm:justify-start"
              >
                <Users size={14} />
                <span className="hidden sm:inline">Record Recipients</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1 justify-center sm:justify-start"
              >
                <Clock size={14} />
                <span className="hidden sm:inline">Time Stamp</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-1 justify-center sm:justify-start"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Get Resources</span>
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
