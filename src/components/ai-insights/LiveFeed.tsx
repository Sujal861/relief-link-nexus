
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Filter, CheckCircle, X, ArrowUpDown, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FeedItem {
  id: number;
  timestamp: string;
  message: string;
  source: string;
  severity: "critical" | "warning" | "info" | "success";
  resolved: boolean;
}

export function LiveFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data for the live feed
  const initialFeedItems: FeedItem[] = [
    {
      id: 1,
      timestamp: "12:43:26",
      message: "Water pressure dropping at distribution point NW-24",
      source: "Sensor Network",
      severity: "warning",
      resolved: true
    },
    {
      id: 2,
      timestamp: "12:41:53",
      message: "Unusually high demand for medical supplies in East District",
      source: "Inventory System",
      severity: "info",
      resolved: false
    },
    {
      id: 3,
      timestamp: "12:38:17",
      message: "Power outage detected at shelter SH-142",
      source: "Infrastructure Grid",
      severity: "critical",
      resolved: false
    },
    {
      id: 4,
      timestamp: "12:35:02",
      message: "Field team T-12 arriving at drop zone DZ-078",
      source: "GPS Tracking",
      severity: "info",
      resolved: false
    },
    {
      id: 5,
      timestamp: "12:29:45",
      message: "Medical supply delivery confirmed at shelter SH-156",
      source: "Logistics System",
      severity: "success",
      resolved: true
    }
  ];
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setFeedItems(initialFeedItems);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Add a new random alert every 8-15 seconds
  useEffect(() => {
    if (loading) return;
    
    const possibleAlerts = [
      {
        message: "Potential flooding detected in sector S-28",
        source: "Satellite Imagery",
        severity: "warning"
      },
      {
        message: "Temperature anomaly detected in medical storage unit M-12",
        source: "Temperature Sensors",
        severity: "critical"
      },
      {
        message: "Delivery truck T-045 experiencing mechanical issues",
        source: "Vehicle Diagnostics",
        severity: "warning"
      },
      {
        message: "Food distribution completed at drop zone DZ-091",
        source: "Field Report",
        severity: "success"
      },
      {
        message: "Population count updated for shelter SH-124",
        source: "Registration System",
        severity: "info"
      }
    ];
    
    const interval = setInterval(() => {
      const randomAlert = possibleAlerts[Math.floor(Math.random() * possibleAlerts.length)];
      const now = new Date();
      const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setFeedItems(prev => [{
        id: Date.now(),
        timestamp: timeString,
        message: randomAlert.message,
        source: randomAlert.source,
        severity: randomAlert.severity as FeedItem["severity"],
        resolved: false
      }, ...prev.slice(0, 15)]);  // Keep only the most recent items
    }, Math.random() * 7000 + 8000);  // Random interval between 8-15 seconds
    
    return () => clearInterval(interval);
  }, [loading]);
  
  const resolveItem = (id: number) => {
    setFeedItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, resolved: true } 
          : item
      )
    );
  };
  
  const getSeverityIcon = (severity: FeedItem["severity"], size: number = 16) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle size={size} className="text-red-500" />;
      case "warning":
        return <AlertTriangle size={size} className="text-amber-500" />;
      case "info":
        return <Circle size={size} className="text-blue-500" />;
      case "success":
        return <CheckCircle size={size} className="text-green-500" />;
      default:
        return null;
    }
  };
  
  const getSeverityColor = (severity: FeedItem["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-amber-50 border-amber-200 text-amber-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} />
            <span>Live Alert Feed</span>
            {loading ? (
              <Badge variant="outline" className="ml-2 bg-blue-50">
                <RefreshCw size={10} className="mr-1 animate-spin" /> 
                Loading...
              </Badge>
            ) : (
              <Badge variant="outline" className="ml-2 bg-green-50">
                <Circle size={8} className="mr-1 fill-green-500 text-green-500" /> 
                Live
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter size={14} /> Filter
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowUpDown size={14} /> Sort
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <RefreshCw size={40} className="animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {feedItems.map((item) => (
              <div 
                key={item.id} 
                className={cn(
                  "p-3 border rounded-lg flex items-start gap-3 transition-all duration-300", 
                  item.resolved ? "bg-gray-50 opacity-60" : getSeverityColor(item.severity)
                )}
              >
                <div className="mt-1">
                  {getSeverityIcon(item.severity, 18)}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start w-full mb-1">
                    <span className="font-medium">{item.message}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{item.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-600">
                    <span>Source: {item.source}</span>
                    
                    {item.resolved && (
                      <span className="ml-2 flex items-center text-green-600">
                        <CheckCircle size={12} className="mr-1" /> Resolved
                      </span>
                    )}
                  </div>
                </div>
                
                {!item.resolved && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => resolveItem(item.id)}
                  >
                    <CheckCircle size={14} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
