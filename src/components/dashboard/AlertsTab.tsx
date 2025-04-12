
import { AlertTriangle, AlertCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlertItemProps {
  type: "critical" | "warning" | "info" | "success";
  icon: React.ReactNode;
  title: string;
  time: string;
  description: string;
  actionLabel: string;
  colorClass: string;
}

const AlertItem = ({ 
  type, 
  icon, 
  title, 
  time, 
  description, 
  actionLabel, 
  colorClass 
}: AlertItemProps) => {
  return (
    <div className={`p-4 ${colorClass} rounded`}>
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="font-bold">{title}</h3>
        <span className="ml-auto text-sm text-gray-500">{time}</span>
      </div>
      <p className="text-gray-600 mb-2">{description}</p>
      <Button size="sm" className={colorClass.replace("border-l-4 border-", "bg-").replace("-50", "-500") + " hover:" + colorClass.replace("border-l-4 border-", "bg-").replace("-50", "-600")}>
        {actionLabel}
      </Button>
    </div>
  );
};

export const AlertsTab = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-display font-bold mb-4">Recent Alerts</h2>
      <div className="space-y-4">
        <AlertItem 
          type="critical"
          icon={<AlertTriangle className="text-red-500 mr-2" />}
          title="Critical Supply Shortage"
          time="1 hour ago"
          description="Medical supplies critically low in Eastern Region (DZ-042, DZ-043)."
          actionLabel="Take Action"
          colorClass="bg-red-50 border-l-4 border-red-500"
        />
        
        <AlertItem 
          type="warning"
          icon={<AlertTriangle className="text-amber-500 mr-2" />}
          title="Weather Advisory"
          time="3 hours ago"
          description="Heavy rainfall predicted for Northern drop zones in the next 48 hours."
          actionLabel="Review Impact"
          colorClass="bg-amber-50 border-l-4 border-amber-500"
        />
        
        <AlertItem 
          type="info"
          icon={<AlertCircle className="text-blue-500 mr-2" />}
          title="New Crisis Zone Declared"
          time="8 hours ago"
          description="Western coastal area declared disaster zone after flooding."
          actionLabel="View Details"
          colorClass="bg-blue-50 border-l-4 border-blue-500"
        />
        
        <AlertItem 
          type="success"
          icon={<Package className="text-green-500 mr-2" />}
          title="Large Donation Received"
          time="12 hours ago"
          description="Major donation of medical supplies received from International Health Organization."
          actionLabel="Allocate Resources"
          colorClass="bg-green-50 border-l-4 border-green-500"
        />
      </div>
    </div>
  );
};
