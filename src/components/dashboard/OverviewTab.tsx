
import { AlertTriangle, Package, Truck, Users, MapPin, AlertCircle, Brain } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const OverviewTab = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Crises"
          value="12"
          icon={<AlertCircle size={24} />}
        />
        <StatCard
          title="Drop Zones"
          value="87"
          icon={<MapPin size={24} />}
        />
        <StatCard
          title="Shipments in Transit"
          value="156"
          icon={<Truck size={24} />}
        />
        <StatCard
          title="Field Teams"
          value="34"
          icon={<Users size={24} />}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-display font-bold">Priority Situations</h2>
          <Link to="/ai-insights">
            <Button className="bg-relief-black text-relief-lime hover:bg-relief-black/90 flex items-center gap-2">
              <Brain size={16} />
              View AI Insights
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <AlertTriangle className="text-red-500 mr-3" />
            <div>
              <h3 className="font-medium">Critical Supplies Needed - Eastern Region</h3>
              <p className="text-sm text-gray-600">Water purification and medical supplies critically low</p>
            </div>
            <Button size="sm" className="ml-auto bg-red-500 hover:bg-red-600">View Details</Button>
          </div>
          
          <div className="flex items-center p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
            <AlertTriangle className="text-amber-500 mr-3" />
            <div>
              <h3 className="font-medium">Weather Alert - Northern Drop Zones</h3>
              <p className="text-sm text-gray-600">Forecasted storms may delay deliveries by 48 hours</p>
            </div>
            <Button size="sm" className="ml-auto bg-amber-500 hover:bg-amber-600">View Details</Button>
          </div>
        </div>
      </div>
      
      <DeliveryTracking />
    </div>
  );
};

const DeliveryTracking = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-display font-bold mb-4">Recent Deliveries</h2>
        <div className="space-y-4">
          <DeliveryItem 
            type="Medical Supplies"
            location="DZ-042"
            time="2 hours ago"
            status="Confirmed"
          />
          
          <DeliveryItem 
            type="Food and Water"
            location="DZ-078"
            time="5 hours ago"
            status="Confirmed"
          />
          
          <DeliveryItem 
            type="Temporary Shelters"
            location="DZ-019"
            time="8 hours ago"
            status="Confirmed"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-display font-bold mb-4">Upcoming Shipments</h2>
        <div className="space-y-4">
          <ShipmentItem 
            type="Medical Equipment"
            destination="DZ-056"
            eta="12 Apr, 16:30"
            status="In Transit"
          />
          
          <ShipmentItem 
            type="Emergency Rations"
            destination="DZ-089"
            eta="12 Apr, 18:45"
            status="In Transit"
          />
          
          <ShipmentItem 
            type="Water Filters"
            destination="DZ-034"
            eta="13 Apr, 09:15"
            status="Preparing"
          />
        </div>
      </div>
    </div>
  );
};

interface DeliveryItemProps {
  type: string;
  location: string;
  time: string;
  status: string;
}

const DeliveryItem = ({ type, location, time, status }: DeliveryItemProps) => {
  return (
    <div className="flex items-center p-3 border-b border-gray-100">
      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
        <Package size={20} />
      </div>
      <div>
        <h3 className="font-medium">{type}</h3>
        <p className="text-sm text-gray-600">Delivered to {location} • {time}</p>
      </div>
      <span className="ml-auto text-sm bg-green-100 text-green-800 py-1 px-2 rounded">{status}</span>
    </div>
  );
};

interface ShipmentItemProps {
  type: string;
  destination: string;
  eta: string;
  status: "In Transit" | "Preparing";
}

const ShipmentItem = ({ type, destination, eta, status }: ShipmentItemProps) => {
  const isInTransit = status === "In Transit";
  
  return (
    <div className="flex items-center p-3 border-b border-gray-100">
      <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3">
        <Truck size={20} />
      </div>
      <div>
        <h3 className="font-medium">{type}</h3>
        <p className="text-sm text-gray-600">ETA: {destination} • {eta}</p>
      </div>
      <span className={`ml-auto text-sm py-1 px-2 rounded ${
        isInTransit ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
      }`}>{status}</span>
    </div>
  );
};
