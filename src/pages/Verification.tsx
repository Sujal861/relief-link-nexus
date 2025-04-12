
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Clock, CheckCircle, X, Camera, Upload, MapPin, Smartphone, QrCode, RefreshCw } from "lucide-react";

const Verification = () => {
  const verifications = [
    {
      id: "VER-001",
      dropZone: "Riverside Community Center",
      timestamp: "2025-04-11 09:30 AM",
      items: "Water (500), Food (350), Medical Kits (20)",
      recipients: 125,
      verifier: "Sarah Johnson",
      status: "Verified",
      method: "QR Code"
    },
    {
      id: "VER-002",
      dropZone: "Hillcrest School",
      timestamp: "2025-04-11 11:15 AM",
      items: "Water (300), Food (250), Blankets (100)",
      recipients: 78,
      verifier: "Michael Chen",
      status: "Verified",
      method: "GPS Photo"
    },
    {
      id: "VER-003",
      dropZone: "Eastside Medical Center",
      timestamp: "2025-04-11 08:45 AM",
      items: "Medical Kits (50), Hygiene Kits (40)",
      recipients: 42,
      verifier: "Elena Rodriguez",
      status: "Pending",
      method: "Mobile App"
    },
    {
      id: "VER-004",
      dropZone: "North County Recreation Area",
      timestamp: "2025-04-10 13:20 PM",
      items: "Water (400), Food (300), Blankets (80)",
      recipients: 95,
      verifier: "David Okafor",
      status: "Verified",
      method: "QR Code"
    },
    {
      id: "VER-005",
      dropZone: "Westview Church",
      timestamp: "2025-04-10 15:20 PM",
      items: "Water (250), Food (200), Hygiene Kits (30)",
      recipients: 65,
      verifier: "Jessica Lee",
      status: "Rejected",
      method: "GPS Photo"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-100">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Last-Mile Verification</h1>
              <p className="text-gray-600">Verify and track the final distribution of aid to recipients</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button size="sm" variant="outline" className="flex gap-2 items-center">
                <RefreshCw size={16} /> Refresh
              </Button>
              <Button size="sm" className="bg-relief-black text-relief-lime hover:bg-relief-black/90">
                New Verification
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                  <h2 className="text-xl font-display font-bold">Recent Verifications</h2>
                  <div className="mt-4 md:mt-0 flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input className="pl-9 w-60" placeholder="Search verifications..." />
                    </div>
                    <Button variant="outline" size="sm" className="flex gap-1 items-center">
                      <Filter size={14} /> Filter
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Drop Zone</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Timestamp</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Recipients</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {verifications.map((verification) => (
                        <tr key={verification.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{verification.id}</td>
                          <td className="py-3 px-4 font-medium">{verification.dropZone}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1 text-gray-400" />
                              {verification.timestamp}
                            </div>
                          </td>
                          <td className="py-3 px-4">{verification.recipients}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              verification.status === "Verified" 
                                ? "bg-green-100 text-green-800" 
                                : verification.status === "Pending" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {verification.status === "Verified" && <CheckCircle size={12} className="mr-1" />}
                              {verification.status === "Pending" && <Clock size={12} className="mr-1" />}
                              {verification.status === "Rejected" && <X size={12} className="mr-1" />}
                              {verification.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-display font-bold mb-6">Verification Details</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">VER-002: Hillcrest School</h3>
                      <p className="text-gray-600">April 11, 2025 at 11:15 AM</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircle size={14} className="mr-1" />
                      Verified
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Method</p>
                      <div className="flex items-center">
                        <Camera size={14} className="mr-1 text-gray-500" />
                        <span>GPS Photo Verification</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Verifier</p>
                      <span>Michael Chen (Field Agent)</span>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Recipients</p>
                      <span>78 individuals</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 text-sm mb-2">Items Distributed</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div className="bg-blue-50 px-3 py-2 rounded text-blue-800 text-sm">
                        Water: 300 bottles
                      </div>
                      <div className="bg-green-50 px-3 py-2 rounded text-green-800 text-sm">
                        Food: 250 packages
                      </div>
                      <div className="bg-purple-50 px-3 py-2 rounded text-purple-800 text-sm">
                        Blankets: 100 units
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-4">Distribution Photos</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
                        <Camera size={24} className="text-gray-400" />
                      </div>
                      <div className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
                        <Camera size={24} className="text-gray-400" />
                      </div>
                      <div className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
                        <Camera size={24} className="text-gray-400" />
                      </div>
                      <div className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
                        <Camera size={24} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-4">Distribution Location</h3>
                    <div className="bg-gray-200 aspect-video rounded-lg flex items-center justify-center">
                      <MapPin size={24} className="text-gray-400 mr-2" />
                      <span className="text-gray-500">Map location: 34.0544° N, 118.2699° W</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Verified by GPS at time of distribution. Location matches designated drop zone coordinates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-display font-bold mb-6">Verification Methods</h2>
                
                <Tabs defaultValue="mobile">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="mobile" className="flex-1">Mobile App</TabsTrigger>
                    <TabsTrigger value="qr" className="flex-1">QR Code</TabsTrigger>
                    <TabsTrigger value="photo" className="flex-1">GPS Photo</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="mobile" className="space-y-4">
                    <div className="text-center py-6">
                      <Smartphone size={48} className="mx-auto text-relief-lime mb-4" />
                      <h3 className="font-bold text-lg mb-2">Mobile App Verification</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Field agents use our mobile app to record and verify distributions in real-time.
                      </p>
                      <Button variant="outline" className="w-full">Download App</Button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium mb-2">Key Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Works offline in areas with limited connectivity</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Captures GPS coordinates automatically</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Syncs data when connection is available</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Built-in photo and video capabilities</span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="qr" className="space-y-4">
                    <div className="text-center py-6">
                      <QrCode size={48} className="mx-auto text-relief-lime mb-4" />
                      <h3 className="font-bold text-lg mb-2">QR Code Verification</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Generate and scan unique QR codes for each distribution to ensure transparency.
                      </p>
                      <Button variant="outline" className="w-full">Generate QR Code</Button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium mb-2">Key Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Tamper-proof verification system</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Recipients can scan to confirm receipt</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Links directly to our blockchain verification system</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Works with any smartphone camera</span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="photo" className="space-y-4">
                    <div className="text-center py-6">
                      <Camera size={48} className="mx-auto text-relief-lime mb-4" />
                      <h3 className="font-bold text-lg mb-2">GPS Photo Verification</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Capture timestamped and geotagged photos of distributions as evidence.
                      </p>
                      <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                        <Upload size={16} /> Upload Photos
                      </Button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium mb-2">Key Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Automatic GPS tagging confirms location</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Digital timestamps provide time verification</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Photos serve as visual evidence of distribution</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5" />
                          <span className="text-sm">Metadata verification ensures authenticity</span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-display font-bold mb-4">Verification Stats</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 text-sm">Verified Distributions</span>
                      <span className="font-bold text-sm">86%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "86%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 text-sm">Pending Verification</span>
                      <span className="font-bold text-sm">9%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "9%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 text-sm">Rejected Verifications</span>
                      <span className="font-bold text-sm">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium mb-4">Verification Methods Used</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <QrCode size={16} className="mr-2 text-relief-lime" />
                        <span>QR Code</span>
                      </div>
                      <span className="font-bold">42%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Smartphone size={16} className="mr-2 text-relief-lime" />
                        <span>Mobile App</span>
                      </div>
                      <span className="font-bold">33%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Camera size={16} className="mr-2 text-relief-lime" />
                        <span>GPS Photo</span>
                      </div>
                      <span className="font-bold">25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Verification;
