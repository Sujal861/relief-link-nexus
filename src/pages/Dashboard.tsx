
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { MapTab } from "@/components/dashboard/MapTab";
import { AlertsTab } from "@/components/dashboard/AlertsTab";
import { Toaster } from "@/components/ui/toaster";

const Dashboard = () => {
  // Track which tab is active
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-100">
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="container px-4 md:px-6 py-8">
          {/* Overview Tab Content */}
          {activeTab === "overview" && <OverviewTab />}
          
          {/* Map Tab Content */}
          {activeTab === "map" && <MapTab />}
          
          {/* Alerts Tab Content */}
          {activeTab === "alerts" && <AlertsTab />}
        </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Dashboard;
