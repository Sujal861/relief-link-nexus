
import { Button } from "@/components/ui/button";
import { Activity, Heart, Menu } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardHeader = ({ activeTab, setActiveTab }: DashboardHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };
  
  const tabOptions = [
    { id: "overview", label: "Overview", icon: null },
    { id: "map", label: "Crisis Map", icon: null },
    { id: "alerts", label: "Alerts", icon: null },
    { id: "live", label: "Live Events", icon: <Activity size={16} className="mr-1" /> },
    { id: "donations", label: "Donations", icon: <Heart size={16} className="mr-1" /> },
  ];
  
  return (
    <div className="bg-relief-black py-6 md:py-8">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-relief-lime">
            Crisis Dashboard
          </h1>
          
          {isMobile && (
            <Button 
              variant="ghost" 
              className="text-relief-lime p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </Button>
          )}
        </div>
        
        <p className="text-gray-400 max-w-3xl mb-4">
          Monitor active crises, supply chains, and aid distribution in real-time.
        </p>
        
        {/* Desktop Tabs */}
        {!isMobile && (
          <div className="flex space-x-1 border-b border-relief-lime/20">
            {tabOptions.map(tab => (
              <Button 
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"} 
                className={activeTab === tab.id 
                  ? "bg-relief-lime text-relief-black rounded-b-none" 
                  : "text-relief-lime hover:text-white rounded-b-none"}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.icon}{tab.label}
              </Button>
            ))}
          </div>
        )}
        
        {/* Mobile Tabs (Dropdown Style) */}
        {isMobile && (
          <>
            <div className="flex items-center justify-between border-b border-relief-lime/20 pb-2">
              <Button 
                variant="default"
                className="bg-relief-lime text-relief-black flex justify-between items-center w-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="flex items-center">
                  {tabOptions.find(tab => tab.id === activeTab)?.icon}
                  {tabOptions.find(tab => tab.id === activeTab)?.label}
                </span>
                <Menu size={16} className="ml-2" />
              </Button>
            </div>
            
            {mobileMenuOpen && (
              <div className="absolute z-50 mt-1 w-[calc(100%-2rem)] max-w-sm bg-relief-black border border-relief-lime/20 rounded-md shadow-lg animate-fade-in">
                {tabOptions.map(tab => (
                  <Button 
                    key={tab.id}
                    variant="ghost"
                    className={`w-full justify-start text-left rounded-none ${
                      activeTab === tab.id 
                        ? "bg-relief-lime/10 text-white" 
                        : "text-relief-lime hover:bg-relief-lime/10"
                    }`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.icon}{tab.label}
                  </Button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
