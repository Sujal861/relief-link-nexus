
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { 
  MapPin, Layers, Package, Truck, 
  AlertTriangle, Users, AlertCircle
} from "lucide-react";

const Dashboard = () => {
  // Mock active crisis data
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-100">
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
            </div>
          </div>
        </div>
        
        <div className="container px-4 md:px-6 py-8">
          {/* Overview Tab Content */}
          {activeTab === "overview" && (
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
                <h2 className="text-2xl font-display font-bold mb-4">Priority Situations</h2>
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
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-display font-bold mb-4">Recent Deliveries</h2>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 border-b border-gray-100">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                        <Package size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Medical Supplies</h3>
                        <p className="text-sm text-gray-600">Delivered to DZ-042 • 2 hours ago</p>
                      </div>
                      <span className="ml-auto text-sm bg-green-100 text-green-800 py-1 px-2 rounded">Confirmed</span>
                    </div>
                    
                    <div className="flex items-center p-3 border-b border-gray-100">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                        <Package size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Food and Water</h3>
                        <p className="text-sm text-gray-600">Delivered to DZ-078 • 5 hours ago</p>
                      </div>
                      <span className="ml-auto text-sm bg-green-100 text-green-800 py-1 px-2 rounded">Confirmed</span>
                    </div>
                    
                    <div className="flex items-center p-3 border-b border-gray-100">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                        <Package size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Temporary Shelters</h3>
                        <p className="text-sm text-gray-600">Delivered to DZ-019 • 8 hours ago</p>
                      </div>
                      <span className="ml-auto text-sm bg-green-100 text-green-800 py-1 px-2 rounded">Confirmed</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-display font-bold mb-4">Upcoming Shipments</h2>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 border-b border-gray-100">
                      <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3">
                        <Truck size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Medical Equipment</h3>
                        <p className="text-sm text-gray-600">ETA: DZ-056 • 12 Apr, 16:30</p>
                      </div>
                      <span className="ml-auto text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded">In Transit</span>
                    </div>
                    
                    <div className="flex items-center p-3 border-b border-gray-100">
                      <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3">
                        <Truck size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Emergency Rations</h3>
                        <p className="text-sm text-gray-600">ETA: DZ-089 • 12 Apr, 18:45</p>
                      </div>
                      <span className="ml-auto text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded">In Transit</span>
                    </div>
                    
                    <div className="flex items-center p-3 border-b border-gray-100">
                      <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3">
                        <Truck size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Water Filters</h3>
                        <p className="text-sm text-gray-600">ETA: DZ-034 • 13 Apr, 09:15</p>
                      </div>
                      <span className="ml-auto text-sm bg-amber-100 text-amber-800 py-1 px-2 rounded">Preparing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Map Tab Content */}
          {activeTab === "map" && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-display font-bold">Crisis Map</h2>
                <p className="text-gray-600">Interactive map of active crisis zones and drop points</p>
              </div>
              <div className="bg-gray-200 aspect-video flex items-center justify-center p-6">
                <div className="text-center text-gray-500">
                  <Layers className="w-16 h-16 mx-auto mb-4 opacity-40" />
                  <p className="text-lg font-medium">Interactive Crisis Map</p>
                  <p className="text-sm">The map would display here with affected areas, drop zones, and supply routes</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Alerts Tab Content */}
          {activeTab === "alerts" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-display font-bold mb-4">Recent Alerts</h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="text-red-500 mr-2" />
                    <h3 className="font-bold">Critical Supply Shortage</h3>
                    <span className="ml-auto text-sm text-gray-500">1 hour ago</span>
                  </div>
                  <p className="text-gray-600 mb-2">Medical supplies critically low in Eastern Region (DZ-042, DZ-043).</p>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600">Take Action</Button>
                </div>
                
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="text-amber-500 mr-2" />
                    <h3 className="font-bold">Weather Advisory</h3>
                    <span className="ml-auto text-sm text-gray-500">3 hours ago</span>
                  </div>
                  <p className="text-gray-600 mb-2">Heavy rainfall predicted for Northern drop zones in the next 48 hours.</p>
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600">Review Impact</Button>
                </div>
                
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="text-blue-500 mr-2" />
                    <h3 className="font-bold">New Crisis Zone Declared</h3>
                    <span className="ml-auto text-sm text-gray-500">8 hours ago</span>
                  </div>
                  <p className="text-gray-600 mb-2">Western coastal area declared disaster zone after flooding.</p>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">View Details</Button>
                </div>
                
                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <div className="flex items-center mb-2">
                    <Package className="text-green-500 mr-2" />
                    <h3 className="font-bold">Large Donation Received</h3>
                    <span className="ml-auto text-sm text-gray-500">12 hours ago</span>
                  </div>
                  <p className="text-gray-600 mb-2">Major donation of medical supplies received from International Health Organization.</p>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">Allocate Resources</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

