
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Filter, RefreshCw, Search, Clock, Users, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const DropZones = () => {
  const dropZones = [
    {
      id: "DZ-001",
      name: "Riverside Community Center",
      status: "Active",
      coordinates: "34.0522° N, 118.2437° W",
      capacity: "500 people",
      staffed: "8 volunteers",
      lastDelivery: "2025-04-11 09:30 AM",
      nextDelivery: "2025-04-12 10:00 AM",
      supplyStatus: "Well stocked"
    },
    {
      id: "DZ-002",
      name: "Hillcrest School",
      status: "Active",
      coordinates: "34.0544° N, 118.2699° W",
      capacity: "350 people",
      staffed: "6 volunteers",
      lastDelivery: "2025-04-11 11:15 AM",
      nextDelivery: "2025-04-12 11:30 AM",
      supplyStatus: "Needs food supplies"
    },
    {
      id: "DZ-003",
      name: "Eastside Medical Center",
      status: "Active",
      coordinates: "34.0611° N, 118.2288° W",
      capacity: "200 people",
      staffed: "12 volunteers",
      lastDelivery: "2025-04-11 08:45 AM",
      nextDelivery: "2025-04-12 09:00 AM",
      supplyStatus: "Well stocked"
    },
    {
      id: "DZ-004",
      name: "North County Recreation Area",
      status: "Pending",
      coordinates: "34.0722° N, 118.2394° W",
      capacity: "450 people",
      staffed: "4 volunteers",
      lastDelivery: "Not delivered yet",
      nextDelivery: "2025-04-12 13:00 PM",
      supplyStatus: "Initial setup pending"
    },
    {
      id: "DZ-005",
      name: "Westview Church",
      status: "Closed",
      coordinates: "34.0489° N, 118.2584° W",
      capacity: "250 people",
      staffed: "0 volunteers",
      lastDelivery: "2025-04-10 15:20 PM",
      nextDelivery: "No deliveries scheduled",
      supplyStatus: "Closed"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-100">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Drop Zone Management</h1>
              <p className="text-gray-600">Manage and monitor aid distribution points across crisis areas</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button size="sm" variant="outline" className="flex gap-2 items-center">
                <RefreshCw size={16} /> Refresh
              </Button>
              <Button size="sm" className="bg-relief-black text-relief-lime hover:bg-relief-black/90">
                Add New Drop Zone
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search drop zones..."
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-4">
                {dropZones.map((zone) => (
                  <div 
                    key={zone.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-relief-lime cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{zone.name}</h3>
                      <Badge 
                        className={
                          zone.status === "Active" ? "bg-green-500" : 
                          zone.status === "Pending" ? "bg-yellow-500" : 
                          "bg-gray-500"
                        }
                      >
                        {zone.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin size={14} className="mr-1" /> {zone.coordinates}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Users size={14} className="mr-1" /> {zone.staffed}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={14} className="mr-1" /> Next delivery: {zone.nextDelivery}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
              <div className="bg-gray-200 aspect-video flex items-center justify-center mb-6">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-40" />
                  <p className="text-lg font-medium">Interactive Drop Zone Map</p>
                  <p className="text-sm">The map would display all drop zones and their status</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-bold text-xl mb-4">Riverside Community Center (DZ-001)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <p className="font-medium">Active</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Coordinates</p>
                    <p className="font-medium">34.0522° N, 118.2437° W</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Capacity</p>
                    <p className="font-medium">500 people</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Staffed</p>
                    <p className="font-medium">8 volunteers</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Last Delivery</p>
                    <p className="font-medium">2025-04-11 09:30 AM</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Next Delivery</p>
                    <p className="font-medium">2025-04-12 10:00 AM</p>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="supplies">
                <TabsList className="mb-4">
                  <TabsTrigger value="supplies">Supplies</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="staff">Staff</TabsTrigger>
                </TabsList>
                
                <TabsContent value="supplies">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <Package className="mr-3 text-gray-500" size={20} />
                        <div>
                          <p className="font-medium">Water Supplies</p>
                          <p className="text-sm text-gray-600">500 bottles</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500">Stocked</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <Package className="mr-3 text-gray-500" size={20} />
                        <div>
                          <p className="font-medium">Food Rations</p>
                          <p className="text-sm text-gray-600">350 packages</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500">Stocked</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <Package className="mr-3 text-gray-500" size={20} />
                        <div>
                          <p className="font-medium">Medical Supplies</p>
                          <p className="text-sm text-gray-600">80 kits</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-500">Low</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center">
                        <Package className="mr-3 text-gray-500" size={20} />
                        <div>
                          <p className="font-medium">Blankets</p>
                          <p className="text-sm text-gray-600">200 blankets</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500">Stocked</Badge>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">2025-04-12 10:00 AM</p>
                      <p className="text-sm text-gray-600">Scheduled delivery of water and food supplies</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">2025-04-13 09:30 AM</p>
                      <p className="text-sm text-gray-600">Scheduled delivery of medical supplies</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">2025-04-14 11:00 AM</p>
                      <p className="text-sm text-gray-600">Scheduled delivery of hygiene kits</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="staff">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Morning Shift (6:00 AM - 2:00 PM)</p>
                      <p className="text-sm text-gray-600">4 volunteers</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Afternoon Shift (2:00 PM - 10:00 PM)</p>
                      <p className="text-sm text-gray-600">3 volunteers</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Night Shift (10:00 PM - 6:00 AM)</p>
                      <p className="text-sm text-gray-600">1 volunteer</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DropZones;
