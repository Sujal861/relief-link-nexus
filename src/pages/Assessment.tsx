
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, Layers, BarChart, PieChart as PieChartIcon, Brain, RefreshCw } from "lucide-react";

const Assessment = () => {
  const regionData = [
    { name: "North District", affected: 15000, evacuated: 8000, sheltered: 6500 },
    { name: "East District", affected: 9000, evacuated: 4200, sheltered: 3800 },
    { name: "South District", affected: 12500, evacuated: 7500, sheltered: 6200 },
    { name: "West District", affected: 7200, evacuated: 3800, sheltered: 3100 },
    { name: "Central District", affected: 5500, evacuated: 2200, sheltered: 1800 }
  ];
  
  const needsData = [
    { name: "Water", percentage: 32 },
    { name: "Food", percentage: 28 },
    { name: "Medical", percentage: 20 },
    { name: "Shelter", percentage: 14 },
    { name: "Hygiene", percentage: 6 }
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  
  const timelineData = [
    { day: "Day 1", water: 5000, food: 3000, medical: 1000, shelter: 800 },
    { day: "Day 2", water: 8000, food: 6000, medical: 2500, shelter: 1500 },
    { day: "Day 3", water: 12000, food: 9000, medical: 5000, shelter: 3000 },
    { day: "Day 4", water: 15000, food: 12000, medical: 7000, shelter: 4500 },
    { day: "Day 5", water: 18000, food: 15000, medical: 9000, shelter: 6000 },
    { day: "Day 6", water: 20000, food: 17000, medical: 11000, shelter: 7500 },
    { day: "Day 7", water: 22000, food: 19000, medical: 13000, shelter: 9000 }
  ];
  
  const pieData = needsData.map(item => ({
    name: item.name,
    value: item.percentage
  }));
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-100">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Needs Assessment</h1>
              <p className="text-gray-600">AI-powered analysis and real-time needs assessment for crisis zones</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button size="sm" variant="outline" className="flex gap-2 items-center">
                <RefreshCw size={16} /> Refresh Data
              </Button>
              <Button size="sm" className="bg-relief-black text-relief-lime hover:bg-relief-black/90 flex gap-2 items-center">
                <Brain size={16} /> Run AI Analysis
              </Button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <h2 className="text-xl font-display font-bold">Crisis Overview</h2>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <Select defaultValue="current">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select crisis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Midwest Flooding</SelectItem>
                    <SelectItem value="previous1">Hurricane Recovery</SelectItem>
                    <SelectItem value="previous2">Wildfire Response</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon">
                  <Download size={16} />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <span className="text-gray-600 text-sm">Affected Population</span>
                <div className="text-3xl font-bold mt-1">49,200</div>
                <div className="text-sm text-green-600">+2,400 in last 24h</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <span className="text-gray-600 text-sm">Evacuated</span>
                <div className="text-3xl font-bold mt-1">25,700</div>
                <div className="text-sm text-green-600">+1,300 in last 24h</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <span className="text-gray-600 text-sm">In Temporary Shelters</span>
                <div className="text-3xl font-bold mt-1">21,400</div>
                <div className="text-sm text-green-600">+1,100 in last 24h</div>
              </div>
            </div>
            
            <Tabs defaultValue="by_region">
              <TabsList className="mb-4">
                <TabsTrigger value="by_region" className="flex items-center gap-1">
                  <BarChart size={14} /> By Region
                </TabsTrigger>
                <TabsTrigger value="by_needs" className="flex items-center gap-1">
                  <PieChartIcon size={14} /> By Needs
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex items-center gap-1">
                  <Layers size={14} /> Timeline
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="by_region">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={regionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="affected" fill="#8884d8" name="Affected Population" />
                      <Bar dataKey="evacuated" fill="#82ca9d" name="Evacuated" />
                      <Bar dataKey="sheltered" fill="#ffc658" name="In Shelters" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="by_needs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800">Priority Needs Assessment</h3>
                    
                    {needsData.map((need, index) => (
                      <div key={need.name} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{need.name}</span>
                          <span className="text-sm font-bold">{need.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{ 
                              width: `${need.percentage}%`, 
                              backgroundColor: COLORS[index % COLORS.length] 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                      <h4 className="font-bold text-yellow-800 mb-1">AI Recommendation</h4>
                      <p className="text-sm text-yellow-800">
                        Increase water supply distribution to North and South districts. Medical supplies
                        are urgently needed in East district shelters.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="timeline">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timelineData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="water" stroke="#0088FE" activeDot={{ r: 8 }} name="Water (liters)" />
                      <Line type="monotone" dataKey="food" stroke="#00C49F" name="Food (meals)" />
                      <Line type="monotone" dataKey="medical" stroke="#FFBB28" name="Medical Supplies (kits)" />
                      <Line type="monotone" dataKey="shelter" stroke="#FF8042" name="Shelter Materials (sets)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-full lg:col-span-2 p-6">
              <h2 className="text-xl font-display font-bold mb-4">AI Analysis Insights</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-blue-800 mb-2">Water Distribution</h3>
                  <p className="text-blue-800 text-sm">
                    Current water distribution is meeting 68% of identified need. Based on population 
                    density and access points, we recommend increasing delivery to North District by 
                    4,500 liters daily and establishing 3 new distribution points at coordinates marked 
                    on the map.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <h3 className="font-bold text-green-800 mb-2">Food Supply Chain</h3>
                  <p className="text-green-800 text-sm">
                    Food supplies are projected to be depleted within 5 days at current consumption rates. 
                    Recommended action: Reallocate 2,000 meal packages from West District (which has surplus) 
                    to East District, and expedite inbound shipment scheduled for Day 8.
                  </p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <h3 className="font-bold text-red-800 mb-2">Medical Priority Alert</h3>
                  <p className="text-red-800 text-sm">
                    Analysis of medical request patterns indicates a potential outbreak of respiratory 
                    infections in South District shelters. Recommend immediate deployment of additional 
                    medical personnel and respiratory supplies to shelters SH-142 and SH-156.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h3 className="font-bold text-purple-800 mb-2">Logistics Efficiency</h3>
                  <p className="text-purple-800 text-sm">
                    Current delivery routes are operating at 72% efficiency. Our analysis suggests 
                    consolidating routes R-12 and R-14, which would reduce fuel consumption by 18% 
                    and delivery time by 22% while maintaining the same level of service.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="col-span-full lg:col-span-1 p-6">
              <h2 className="text-xl font-display font-bold mb-4">Resource Allocation Recommendation</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Efficiency</span>
                  <span className="font-bold">76%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full bg-relief-lime" 
                    style={{ width: "76%" }}
                  ></div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Projected with AI Recommendations</span>
                  <span className="font-bold">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full bg-green-500" 
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">North District</span>
                    <span className="text-green-600 text-sm">+12% resources</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">East District</span>
                    <span className="text-green-600 text-sm">+8% resources</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">South District</span>
                    <span className="text-green-600 text-sm">+15% resources</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">West District</span>
                    <span className="text-red-600 text-sm">-5% resources</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Central District</span>
                    <span className="text-red-600 text-sm">-8% resources</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-relief-black text-relief-lime hover:bg-relief-black/90">
                Apply AI Recommendations
              </Button>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Assessment;
