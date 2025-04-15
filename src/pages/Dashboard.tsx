
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { MapTab } from "@/components/dashboard/MapTab";
import { AlertsTab } from "@/components/dashboard/AlertsTab";
import { LiveEventsTab } from "@/components/dashboard/LiveEventsTab";
import { DonationsTab } from "@/components/dashboard/DonationsTab";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Wifi, WifiOff, CheckCircle, Database, RotateCw } from "lucide-react";
import { useIsMobile, useViewportHeight } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Track which tab is active
  const [activeTab, setActiveTab] = useState("overview");
  // Track online status
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // Track when data was last synced
  const [lastSynced, setLastSynced] = useState(new Date());
  // Track pending offline changes
  const [pendingChanges, setPendingChanges] = useState(0);
  // Track if a sync is in progress
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Apply viewport height adjustment for mobile
  useViewportHeight();
  
  // Generate a random number of pending changes (for demo only)
  useEffect(() => {
    if (!isOnline) {
      const interval = setInterval(() => {
        setPendingChanges(prev => Math.min(prev + Math.floor(Math.random() * 3), 20));
      }, 45000); // Add some random changes every 45 seconds while offline
      
      return () => clearInterval(interval);
    }
  }, [isOnline]);
  
  // Monitor online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      
      if (navigator.onLine) {
        toast({
          title: "You're back online",
          description: pendingChanges > 0 
            ? `${pendingChanges} changes will now be synchronized` 
            : "All your changes will now be synchronized",
          children: (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>Connection restored</span>
            </div>
          )
        });
        setLastSynced(new Date());
      } else {
        toast({
          title: "You're offline",
          description: "Changes will be saved locally and synced when you're back online",
          variant: "destructive"
        });
      }
    };
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [toast, pendingChanges]);
  
  // Function to manually trigger sync
  const triggerSync = () => {
    if (pendingChanges === 0) {
      toast({
        title: "No changes to sync",
        description: "All your data is already up-to-date",
      });
      return;
    }
    
    setIsSyncing(true);
    
    // Simulate sync process
    setTimeout(() => {
      setPendingChanges(0);
      setLastSynced(new Date());
      setIsSyncing(false);
      
      toast({
        title: "Sync Complete",
        description: "All your offline changes have been synchronized with the central database",
      });
    }, 2000);
  };
  
  // Automatically trigger sync when coming back online
  useEffect(() => {
    if (isOnline && pendingChanges > 0 && !isSyncing) {
      triggerSync();
    }
  }, [isOnline, pendingChanges]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-100">
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Connection status indicator */}
        <div className="bg-white border-b border-gray-200 py-2 sticky top-14 md:top-[98px] z-20 shadow-sm">
          <div className="container px-4 md:px-6 flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <span className="flex items-center text-green-600 text-sm">
                  <Wifi size={16} className="mr-1" /> Online
                </span>
              ) : (
                <span className="flex items-center text-amber-600 text-sm">
                  <WifiOff size={16} className="mr-1" /> Offline Mode - Changes saved locally
                </span>
              )}
              
              {pendingChanges > 0 && (
                <span className="flex items-center text-blue-600 text-sm">
                  <Database size={16} className="mr-1" /> {pendingChanges} changes pending
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-xs text-gray-500">
                Last synced: {lastSynced.toLocaleTimeString()}
              </div>
              
              {(pendingChanges > 0 && isOnline) && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 px-2 py-0 text-xs flex items-center gap-1"
                  onClick={triggerSync}
                  disabled={isSyncing}
                >
                  <RotateCw size={12} className={isSyncing ? "animate-spin" : ""} />
                  {isSyncing ? "Syncing..." : "Sync Now"}
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="container px-4 md:px-6 py-4 md:py-8">
          {/* Dashboard Tab Content with improved animation */}
          <div className={`${isMobile ? 'animate-fade-in' : ''}`}>
            {/* Overview Tab Content */}
            {activeTab === "overview" && <OverviewTab />}
            
            {/* Map Tab Content */}
            {activeTab === "map" && <MapTab />}
            
            {/* Alerts Tab Content */}
            {activeTab === "alerts" && <AlertsTab />}
            
            {/* Live Events Tab Content */}
            {activeTab === "live" && <LiveEventsTab />}
            
            {/* Donations Tab Content */}
            {activeTab === "donations" && <DonationsTab />}
          </div>
          
          {/* Offline Notification Banner for Mobile */}
          {!isOnline && isMobile && (
            <div className="fixed bottom-16 inset-x-0 mx-4 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-md shadow-lg flex items-center justify-between animate-slide-up z-50">
              <div className="flex items-center">
                <WifiOff size={18} className="mr-2" />
                <div>
                  <p className="font-medium">You're working offline</p>
                  <p className="text-xs">Changes saved to device</p>
                </div>
              </div>
              <div className="text-xs font-mono bg-amber-100 px-2 py-1 rounded-md">
                {pendingChanges} pending
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Dashboard;
