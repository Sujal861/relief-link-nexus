import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, RefreshCw, Search, Filter, GitBranch, Truck, Download, FileCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplyChainDiagram } from "@/components/inventory/SupplyChainDiagram";
import { Badge } from "@/components/ui/badge";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const inventoryItems = [
    {
      id: "INV-001",
      name: "Emergency Water Supplies",
      type: "Water",
      quantity: 1500,
      unit: "bottles",
      location: "Central Warehouse",
      status: "In Stock",
      lastUpdated: "2025-04-10"
    },
    {
      id: "INV-002",
      name: "Medical First Aid Kits",
      type: "Medical",
      quantity: 350,
      unit: "kits",
      location: "Medical Storage",
      status: "In Stock",
      lastUpdated: "2025-04-11"
    },
    {
      id: "INV-003",
      name: "Emergency Food Rations",
      type: "Food",
      quantity: 2200,
      unit: "packages",
      location: "Food Storage",
      status: "In Stock",
      lastUpdated: "2025-04-09"
    },
    {
      id: "INV-004",
      name: "Emergency Blankets",
      type: "Shelter",
      quantity: 780,
      unit: "blankets",
      location: "Supply Tent 2",
      status: "In Transit",
      lastUpdated: "2025-04-11"
    },
    {
      id: "INV-005",
      name: "Solar Powered Chargers",
      type: "Equipment",
      quantity: 120,
      unit: "units",
      location: "Tech Storage",
      status: "Low Stock",
      lastUpdated: "2025-04-10"
    }
  ];

  const sampleSupplyChainNodes = [
    {
      id: "node-1",
      name: "Aid Organization",
      type: "donor" as const,
      status: "complete" as const
    },
    {
      id: "node-2",
      name: "Central Warehouse",
      type: "warehouse" as const,
      status: "complete" as const
    },
    {
      id: "node-3",
      name: "Drop Zone DZ-042",
      type: "dropzone" as const,
      status: "active" as const
    },
    {
      id: "node-4",
      name: "Local Community",
      type: "recipient" as const,
      status: "pending" as const
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-100">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Inventory Management</h1>
              <p className="text-gray-600">Track and manage aid supplies across all locations</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button size="sm" variant="outline" className="flex gap-2 items-center">
                <RefreshCw size={16} /> Refresh
              </Button>
              <Button size="sm" variant="outline" className="flex gap-2 items-center">
                <FileCheck size={16} /> Verify
              </Button>
              <Button size="sm" className="bg-relief-black text-relief-lime hover:bg-relief-black/90">
                Add New Item
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="inventory" className="mb-6">
            <TabsList>
              <TabsTrigger value="inventory" className="flex items-center gap-1">
                <Package size={14} /> Inventory
              </TabsTrigger>
              <TabsTrigger value="supply-chain" className="flex items-center gap-1">
                <GitBranch size={14} /> Supply Chain
              </TabsTrigger>
              <TabsTrigger value="deliveries" className="flex items-center gap-1">
                <Truck size={14} /> Deliveries
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="inventory">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Search inventory items..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex gap-2 items-center">
                      <Filter size={16} /> Filter
                    </Button>
                    <Button variant="outline" className="flex gap-2 items-center">
                      <Download size={16} /> Export
                    </Button>
                  </div>
                </div>
                
                <Tabs defaultValue="all" onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All Items</TabsTrigger>
                    <TabsTrigger value="in-stock">In Stock</TabsTrigger>
                    <TabsTrigger value="in-transit">In Transit</TabsTrigger>
                    <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Item</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Last Updated</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventoryItems.map((item) => (
                            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-3 px-4">{item.id}</td>
                              <td className="py-3 px-4 font-medium">{item.name}</td>
                              <td className="py-3 px-4">{item.type}</td>
                              <td className="py-3 px-4">
                                {item.quantity} {item.unit}
                              </td>
                              <td className="py-3 px-4">{item.location}</td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  item.status === "In Stock" 
                                    ? "bg-green-100 text-green-800" 
                                    : item.status === "In Transit" 
                                    ? "bg-blue-100 text-blue-800" 
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">{item.lastUpdated}</td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">Track</Button>
                                  <Button variant="ghost" size="sm">Edit</Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="in-stock" className="space-y-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Item</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Last Updated</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventoryItems
                            .filter(item => item.status === "In Stock")
                            .map((item) => (
                              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">{item.id}</td>
                                <td className="py-3 px-4 font-medium">{item.name}</td>
                                <td className="py-3 px-4">{item.type}</td>
                                <td className="py-3 px-4">
                                  {item.quantity} {item.unit}
                                </td>
                                <td className="py-3 px-4">{item.location}</td>
                                <td className="py-3 px-4">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {item.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{item.lastUpdated}</td>
                                <td className="py-3 px-4">
                                  <Button variant="ghost" size="sm">Edit</Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="in-transit" className="space-y-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Item</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Last Updated</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventoryItems
                            .filter(item => item.status === "In Transit")
                            .map((item) => (
                              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">{item.id}</td>
                                <td className="py-3 px-4 font-medium">{item.name}</td>
                                <td className="py-3 px-4">{item.type}</td>
                                <td className="py-3 px-4">
                                  {item.quantity} {item.unit}
                                </td>
                                <td className="py-3 px-4">{item.location}</td>
                                <td className="py-3 px-4">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {item.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{item.lastUpdated}</td>
                                <td className="py-3 px-4">
                                  <Button variant="ghost" size="sm">Edit</Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="low-stock" className="space-y-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Item</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Last Updated</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventoryItems
                            .filter(item => item.status === "Low Stock")
                            .map((item) => (
                              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">{item.id}</td>
                                <td className="py-3 px-4 font-medium">{item.name}</td>
                                <td className="py-3 px-4">{item.type}</td>
                                <td className="py-3 px-4">
                                  {item.quantity} {item.unit}
                                </td>
                                <td className="py-3 px-4">{item.location}</td>
                                <td className="py-3 px-4">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    {item.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">{item.lastUpdated}</td>
                                <td className="py-3 px-4">
                                  <Button variant="ghost" size="sm">Edit</Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-display font-bold mb-4">Inventory Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <span className="text-gray-600 text-sm">Total Items</span>
                    <div className="text-3xl font-bold mt-1">4,950</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <span className="text-gray-600 text-sm">Low Stock Items</span>
                    <div className="text-3xl font-bold mt-1 text-yellow-600">120</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <span className="text-gray-600 text-sm">Items In Transit</span>
                    <div className="text-3xl font-bold mt-1 text-blue-600">780</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="supply-chain">
              <SupplyChainDiagram 
                trackingId="SC-2025-04-12-003" 
                nodes={sampleSupplyChainNodes} 
              />
              
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-display font-bold mb-4">Recent Supply Chain Activity</h2>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-relief-lime transition-colors">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500">In Transit</Badge>
                        <span className="font-medium">Medical Supplies Shipment</span>
                      </div>
                      <span className="text-sm text-gray-500">ID: SC-2025-04-12-003</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>From <strong>International Health Organization</strong> to <strong>Drop Zone DZ-042</strong></p>
                      <p className="mt-1">Expected arrival: <strong>Apr 12, 2025 16:30 PM</strong></p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-relief-lime transition-colors">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">Completed</Badge>
                        <span className="font-medium">Food and Water Shipment</span>
                      </div>
                      <span className="text-sm text-gray-500">ID: SC-2025-04-11-007</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>From <strong>World Food Relief</strong> to <strong>Drop Zone DZ-039</strong></p>
                      <p className="mt-1">Delivered: <strong>Apr 11, 2025 13:45 PM</strong></p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-relief-lime transition-colors">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">Completed</Badge>
                        <span className="font-medium">Emergency Shelter Kits</span>
                      </div>
                      <span className="text-sm text-gray-500">ID: SC-2025-04-10-015</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>From <strong>Global Shelter Initiative</strong> to <strong>Drop Zone DZ-027</strong></p>
                      <p className="mt-1">Delivered: <strong>Apr 10, 2025 17:20 PM</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="deliveries">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-display font-bold mb-4">Scheduled Deliveries</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Delivery ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Contents</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Origin</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Destination</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">ETA</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">DEL-2025-04-12-001</td>
                        <td className="py-3 px-4 font-medium">Medical Supplies</td>
                        <td className="py-3 px-4">Central Warehouse</td>
                        <td className="py-3 px-4">Drop Zone DZ-042</td>
                        <td className="py-3 px-4">Apr 12, 2025 16:30 PM</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-blue-500">In Transit</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">Track</Button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">DEL-2025-04-12-002</td>
                        <td className="py-3 px-4 font-medium">Food Rations</td>
                        <td className="py-3 px-4">East Regional Hub</td>
                        <td className="py-3 px-4">Drop Zone DZ-056</td>
                        <td className="py-3 px-4">Apr 12, 2025 18:45 PM</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-blue-500">In Transit</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">Track</Button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">DEL-2025-04-13-003</td>
                        <td className="py-3 px-4 font-medium">Water Filters</td>
                        <td className="py-3 px-4">Central Warehouse</td>
                        <td className="py-3 px-4">Drop Zone DZ-034</td>
                        <td className="py-3 px-4">Apr 13, 2025 09:15 AM</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-yellow-500">Preparing</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">Track</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default Inventory;
