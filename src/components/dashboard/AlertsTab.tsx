
import { AlertTriangle, AlertCircle, Package, Bell, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

interface AlertItemProps {
  type: "critical" | "warning" | "info" | "success";
  icon: React.ReactNode;
  title: string;
  time: string;
  description: string;
  actionLabel: string;
  colorClass: string;
  onActionClick?: () => void;
}

const AlertItem = ({ 
  type, 
  icon, 
  title, 
  time, 
  description, 
  actionLabel, 
  colorClass,
  onActionClick 
}: AlertItemProps) => {
  return (
    <div className={`p-4 ${colorClass} rounded`}>
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="font-bold ml-2">{title}</h3>
        <span className="ml-auto text-sm text-gray-500">{time}</span>
      </div>
      <p className="text-gray-600 mb-2">{description}</p>
      <Button 
        size="sm" 
        className={colorClass.replace("border-l-4 border-", "bg-").replace("-50", "-500") + " hover:" + colorClass.replace("border-l-4 border-", "bg-").replace("-50", "-600")}
        onClick={onActionClick}
      >
        {actionLabel}
      </Button>
    </div>
  );
};

export const AlertsTab = () => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [alertsData, setAlertsData] = useState([
    {
      id: 1,
      type: "critical" as const,
      icon: <AlertTriangle className="text-red-500" />,
      title: "Critical Supply Shortage",
      time: "1 hour ago",
      description: "Medical supplies critically low in Eastern Region (DZ-042, DZ-043).",
      actionLabel: "Take Action",
      colorClass: "bg-red-50 border-l-4 border-red-500",
      resolved: false
    },
    {
      id: 2,
      type: "warning" as const,
      icon: <AlertTriangle className="text-amber-500" />,
      title: "Weather Advisory",
      time: "3 hours ago",
      description: "Heavy rainfall predicted for Northern drop zones in the next 48 hours.",
      actionLabel: "Review Impact",
      colorClass: "bg-amber-50 border-l-4 border-amber-500",
      resolved: false
    },
    {
      id: 3,
      type: "info" as const,
      icon: <AlertCircle className="text-blue-500" />,
      title: "New Crisis Zone Declared",
      time: "8 hours ago",
      description: "Western coastal area declared disaster zone after flooding.",
      actionLabel: "View Details",
      colorClass: "bg-blue-50 border-l-4 border-blue-500",
      resolved: false
    },
    {
      id: 4,
      type: "success" as const,
      icon: <Package className="text-green-500" />,
      title: "Large Donation Received",
      time: "12 hours ago",
      description: "Major donation of medical supplies received from International Health Organization.",
      actionLabel: "Allocate Resources",
      colorClass: "bg-green-50 border-l-4 border-green-500",
      resolved: false
    }
  ]);

  const handleAlertAction = (alertId: number, actionType: string) => {
    // Mark the alert as resolved
    setAlertsData(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, resolved: true } 
          : alert
      )
    );

    // Show a toast notification
    toast({
      title: `Alert ${actionType}`,
      description: "The alert has been processed successfully.",
      variant: actionType === "critical" ? "destructive" : "default",
    });
  };

  // Filter alerts to show only unresolved ones
  const unresolvedAlerts = alertsData.filter(alert => !alert.resolved);
  const resolvedAlerts = alertsData.filter(alert => alert.resolved);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-display font-bold">Recent Alerts</h2>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={() => {
              toast({
                title: "Alerts Refreshed",
                description: "Latest alerts have been loaded.",
              });
            }}
          >
            <BellRing className="h-4 w-4 mr-1" /> Refresh Alerts
          </Button>
        </div>
        
        {unresolvedAlerts.length === 0 ? (
          <Alert className="bg-blue-50">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No unresolved alerts</AlertTitle>
            <AlertDescription>
              All alerts have been addressed. Great job!
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {unresolvedAlerts.map(alert => (
              <AlertItem 
                key={alert.id}
                type={alert.type}
                icon={alert.icon}
                title={alert.title}
                time={alert.time}
                description={alert.description}
                actionLabel={alert.actionLabel}
                colorClass={alert.colorClass}
                onActionClick={() => handleAlertAction(alert.id, alert.type)}
              />
            ))}
          </div>
        )}
      </div>
      
      {resolvedAlerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 w-full justify-between"
              >
                <div className="flex items-center">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Resolved Alerts ({resolvedAlerts.length})</span>
                </div>
                <div className="text-xs text-gray-500">
                  {isExpanded ? "Click to hide" : "Click to show"}
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              {resolvedAlerts.map(alert => (
                <div 
                  key={alert.id} 
                  className="p-4 bg-gray-50 rounded border border-gray-200 opacity-70"
                >
                  <div className="flex items-center mb-2">
                    {alert.icon}
                    <h3 className="font-medium text-gray-700 ml-2">{alert.title}</h3>
                    <span className="ml-auto text-sm text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{alert.description}</p>
                  <div className="mt-2 text-xs text-green-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> Resolved
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </div>
  );
};
