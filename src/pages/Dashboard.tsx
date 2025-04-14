
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
import { Wifi, WifiOff, CheckCircle } from "lucide-react";

const Dashboard = () => {
  // Track which tab is active
  const [activeTab, setActiveTab] = useState("overview");
  // Track online status
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // Track when data was last synced
  const [lastSynced, setLastSynced] = useState(new Date());
  const { toast } = useToast();
  
  // Monitor online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      
      if (navigator.onLine) {
        toast({
          title: "You're back online",
          description: "All your changes will now be synchronized",
          // Fixed: Removed the 'icon' property and use proper content instead
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
  }, [toast]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-100">
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Connection status indicator */}
        <div className="bg-white border-b border-gray-200 py-2">
          <div className="container px-4 md:px-6 flex justify-between items-center">
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
            </div>
            <div className="text-xs text-gray-500">
              Last synced: {lastSynced.toLocaleTimeString()}
            </div>
          </div>
        </div>
        
        <div className="container px-4 md:px-6 py-8">
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
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Dashboard;
