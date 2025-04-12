
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, RefreshCw, Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
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
              <Button size="sm" className="bg-relief-black text-relief-lime hover:bg-relief-black/90">
                Add New Item
              </Button>
            </div>
          </div>
          
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
              <Button variant="outline" className="flex gap-2 items-center">
                <Filter size={16} /> Filter Options
              </Button>
            </div>
            
            <Tabs defaultValue="all">
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
                            <Button variant="ghost" size="sm">Edit</Button>
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
              
              {/* Similar TabsContent for in-transit and low-stock tabs would go here */}
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Inventory;
