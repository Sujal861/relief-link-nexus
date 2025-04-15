
import { Button } from "@/components/ui/button";
import { Activity, Heart, Menu, ChevronDown, X, AlertTriangle, Truck, MapPin, Database } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardHeader = ({ activeTab, setActiveTab }: DashboardHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastSynced, setLastSynced] = useState(new Date());
  const isMobile = useIsMobile();
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };
  
  // Auto-collapse header on scroll for mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsCollapsed(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);
  
  // Simulate periodic background syncs
  useEffect(() => {
    if (navigator.onLine) {
      const interval = setInterval(() => {
        setLastSynced(new Date());
      }, 30000); // Update every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, []);
  
  const tabOptions = [
    { id: "overview", label: "Overview", icon: <Database size={16} className="mr-1" /> },
    { id: "map", label: "Crisis Map", icon: <MapPin size={16} className="mr-1" /> },
    { id: "alerts", label: "Alerts", icon: <AlertTriangle size={16} className="mr-1" /> },
    { id: "live", label: "Live Events", icon: <Activity size={16} className="mr-1" /> },
    { id: "donations", label: "Donations", icon: <Heart size={16} className="mr-1" /> },
  ];
  
  return (
    <div className={`bg-relief-black py-4 md:py-8 sticky top-0 z-30 transition-all duration-300 ${
      isCollapsed ? 'py-2 md:py-3' : ''
    }`}>
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className={`text-2xl md:text-4xl font-display font-bold text-relief-lime transition-all duration-300 ${
            isCollapsed ? 'text-xl md:text-2xl' : ''
          }`}>
            Crisis Dashboard
          </h1>
          
          {isMobile && (
            <Button 
              variant="ghost" 
              className="text-relief-lime p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}
        </div>
        
        {!isCollapsed && (
          <p className="text-gray-400 max-w-3xl mb-4 transition-opacity duration-300">
            Monitor active crises, supply chains, and aid distribution in real-time.
          </p>
        )}
        
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
                <ChevronDown size={16} className={`ml-2 transition-transform duration-300 ${
                  mobileMenuOpen ? 'rotate-180' : ''
                }`} />
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
        
        {/* Bottom system status - only show on mobile when collapsed */}
        {isMobile && isCollapsed && (
          <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outline" 
                className={`px-1.5 py-0.5 ${navigator.onLine ? 'bg-green-900/20 text-green-400' : 'bg-amber-900/20 text-amber-400'}`}
              >
                {navigator.onLine ? 'ONLINE' : 'OFFLINE'}
              </Badge>
              <Badge 
                variant="outline" 
                className="px-1.5 py-0.5 bg-blue-900/20 text-blue-400"
              >
                <Truck size={10} className="mr-1" /> GPS ACTIVE
              </Badge>
            </div>
            <div>
              Synced: {lastSynced.toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
