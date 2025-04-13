import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Filter, RefreshCw, Search, Clock, Users, Package, FileCheck, Building, GitBranch } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { CollaborationPanel } from "@/components/dropzones/CollaborationPanel";

const DropZones = () => {
  const [selectedZone, setSelectedZone] = useState("DZ-001");
  
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

  const currentZone = dropZones.find(zone => zone.id === selectedZone) || dropZones[0];

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
              <Button size="sm" variant="outline" className="flex gap-2 items-center">
                <FileCheck size={16} /> Verify
              </Button>
              <Button size="sm" className="bg-relief-black text-relief-lime hover:bg-relief-black/90">
                Add New Drop Zone
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedZone === zone.id 
                            ? "border-relief-lime bg-relief-lime/5" 
                            : "border-gray-200 hover:border-relief-lime"
                        }`}
                        onClick={() => setSelectedZone(zone.id)}
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
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-display font-bold">Drop Zone Details</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <GitBranch size={14} /> Supply Chain
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Building size={14} /> Partners
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-200 aspect-video flex items-center justify-center mb-6">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-2 opacity-40" />
                      <p className="text-lg font-medium">Interactive Drop Zone Map</p>
                      <p className="text-sm">The map would display all drop zones and their status</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-xl">{currentZone.name} ({currentZone.id})</h3>
                      <Badge 
                        className={
                          currentZone.status === "Active" ? "bg-green-500" : 
                          currentZone.status === "Pending" ? "bg-yellow-500" : 
                          "bg-gray-500"
                        }
                      >
                        {currentZone.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Status</p>
                        <p className="font-medium">{currentZone.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Coordinates</p>
                        <p className="font-medium">{currentZone.coordinates}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Capacity</p>
                        <p className="font-medium">{currentZone.capacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Staffed</p>
                        <p className="font-medium">{currentZone.staffed}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Last Delivery</p>
                        <p className="font-medium">{currentZone.lastDelivery}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Next Delivery</p>
                        <p className="font-medium">{currentZone.nextDelivery}</p>
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
            </TabsContent>
            
            <TabsContent value="collaboration">
              <CollaborationPanel />
            </TabsContent>
            
            <TabsContent value="verification">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-display font-bold">Transparency & Verification</h2>
                  <Button variant="outline" className="flex items-center gap-1">
                    <FileCheck size={16} /> Audit Log
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3">Supply Chain Verification</h3>
                    <p className="text-gray-600 mb-4">
                      All critical supplies are tracked from donor to recipient with complete chain of custody records.
                      Each transfer is verified by at least two authorized personnel.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded p-3 text-green-800 text-sm">
                      <p className="font-medium">Last verification: Today at 09:15 AM</p>
                      <p>Verified by: Sarah Johnson (Medical Coordinator) and David Lee (Logistics Manager)</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3">Distribution Documentation</h3>
                    <p className="text-gray-600 mb-4">
                      All distributions are documented with photos, signatures, and quantity records.
                      Recipients are verified against registration database.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-gray-200 aspect-video rounded flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Photo evidence 1</p>
                      </div>
                      <div className="bg-gray-200 aspect-video rounded flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Photo evidence 2</p>
                      </div>
                      <div className="bg-gray-200 aspect-video rounded flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Photo evidence 3</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-lg mb-3">Funding Transparency</h3>
                    <p className="text-gray-600 mb-4">
                      Complete records of all financial transactions related to this drop zone's operations.
                      All expenses are categorized and documented.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Description</th>
                            <th className="text-left p-2">Category</th>
                            <th className="text-left p-2">Amount</th>
                            <th className="text-left p-2">Verified</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">2025-04-10</td>
                            <td className="p-2">Medical Supplies</td>
                            <td className="p-2">Procurement</td>
                            <td className="p-2">$5,200</td>
                            <td className="p-2">✓</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">2025-04-10</td>
                            <td className="p-2">Transportation</td>
                            <td className="p-2">Logistics</td>
                            <td className="p-2">$750</td>
                            <td className="p-2">✓</td>
                          </tr>
                          <tr>
                            <td className="p-2">2025-04-11</td>
                            <td className="p-2">Staff Compensation</td>
                            <td className="p-2">Personnel</td>
                            <td className="p-2">$1,200</td>
                            <td className="p-2">✓</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DropZones;
