
import { Button } from "@/components/ui/button";
import { Activity, Heart } from "lucide-react";

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardHeader = ({ activeTab, setActiveTab }: DashboardHeaderProps) => {
  return (
    <div className="bg-relief-black py-8">
      <div className="container px-4 md:px-6">
        <h1 className="text-4xl font-display font-bold text-relief-lime mb-4">
          Crisis Dashboard
        </h1>
        <p className="text-gray-400 max-w-3xl">
          Monitor active crises, supply chains, and aid distribution in real-time.
        </p>
        
        <div className="flex space-x-1 mt-6 border-b border-relief-lime/20">
          <Button 
            variant={activeTab === "overview" ? "default" : "ghost"} 
            className={activeTab === "overview" ? "bg-relief-lime text-relief-black rounded-b-none" : "text-relief-lime hover:text-white rounded-b-none"}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Button>
          <Button 
            variant={activeTab === "map" ? "default" : "ghost"} 
            className={activeTab === "map" ? "bg-relief-lime text-relief-black rounded-b-none" : "text-relief-lime hover:text-white rounded-b-none"}
            onClick={() => setActiveTab("map")}
          >
            Crisis Map
          </Button>
          <Button 
            variant={activeTab === "alerts" ? "default" : "ghost"} 
            className={activeTab === "alerts" ? "bg-relief-lime text-relief-black rounded-b-none" : "text-relief-lime hover:text-white rounded-b-none"}
            onClick={() => setActiveTab("alerts")}
          >
            Alerts
          </Button>
          <Button 
            variant={activeTab === "live" ? "default" : "ghost"} 
            className={activeTab === "live" ? "bg-relief-lime text-relief-black rounded-b-none" : "text-relief-lime hover:text-white rounded-b-none"}
            onClick={() => setActiveTab("live")}
          >
            <Activity size={16} className="mr-1" />
            Live Events
          </Button>
          <Button 
            variant={activeTab === "donations" ? "default" : "ghost"} 
            className={activeTab === "donations" ? "bg-relief-lime text-relief-black rounded-b-none" : "text-relief-lime hover:text-white rounded-b-none"}
            onClick={() => setActiveTab("donations")}
          >
            <Heart size={16} className="mr-1" />
            Donations
          </Button>
        </div>
      </div>
    </div>
  );
};
