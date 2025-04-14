
import { Layers, MapPin, Download, Upload, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import CrisisMap from "./CrisisMap";

export const MapTab = () => {
  const [isMapDownloaded, setIsMapDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDropZones, setShowDropZones] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showTeams, setShowTeams] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  
  // Simulate map download
  const downloadMap = () => {
    setIsDownloading(true);
    
    // Simulate download progress
    setTimeout(() => {
      setIsMapDownloaded(true);
      setIsDownloading(false);
      toast({
        title: "Map Downloaded",
        description: "Map data is now available for offline use",
      });
    }, 2000);
  };
  
  // Simulate map refresh
  const refreshMap = () => {
    setIsRefreshing(true);
    
    // Simulate refresh
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
      toast({
        title: "Map Updated",
        description: "Crisis map has been updated with the latest data",
      });
    }, 1500);
  };
  
  // Auto-refresh map data every 2 minutes when online
  useEffect(() => {
    if (navigator.onLine) {
      const intervalId = setInterval(() => {
        setLastUpdated(new Date());
      }, 120000); // 2 minutes
      
      return () => clearInterval(intervalId);
    }
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold">Crisis Map</h2>
          <p className="text-gray-600">Interactive map of active crisis zones and drop points</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={refreshMap}
            disabled={isRefreshing || !navigator.onLine}
          >
            <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
            Refresh
          </Button>
          
          {isMapDownloaded ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Available Offline
            </Badge>
          ) : (
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={downloadMap}
              disabled={isDownloading || !navigator.onLine}
            >
              <Download size={14} />
              {isDownloading ? "Downloading..." : "Save Offline"}
            </Button>
          )}
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 border-b border-gray-200 flex flex-wrap gap-6">
        <div className="flex items-center space-x-2">
          <Switch id="drop-zones" checked={showDropZones} onCheckedChange={setShowDropZones} />
          <Label htmlFor="drop-zones" className="text-sm">Drop Zones</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="routes" checked={showRoutes} onCheckedChange={setShowRoutes} />
          <Label htmlFor="routes" className="text-sm">Supply Routes</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="teams" checked={showTeams} onCheckedChange={setShowTeams} />
          <Label htmlFor="teams" className="text-sm">Field Teams</Label>
        </div>
        
        <div className="flex items-center ml-auto">
          <span className="text-xs text-gray-500">Last updated: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      </div>
      
      {/* Replace the placeholder with the actual map component */}
      <div className="p-6">
        <CrisisMap 
          showDropZones={showDropZones}
          showRoutes={showRoutes}
          showTeams={showTeams}
          isMapDownloaded={isMapDownloaded}
        />
      </div>
    </div>
  );
};
