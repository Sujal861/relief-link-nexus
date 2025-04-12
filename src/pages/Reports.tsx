
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Filter, ChevronDown, BarChart, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Reports = () => {
  const barData = [
    { name: "Jan", food: 400, water: 240, medical: 240, shelter: 180 },
    { name: "Feb", food: 300, water: 139, medical: 221, shelter: 150 },
    { name: "Mar", food: 200, water: 980, medical: 229, shelter: 380 },
    { name: "Apr", food: 278, water: 390, medical: 200, shelter: 280 },
    { name: "May", food: 189, water: 480, medical: 218, shelter: 190 },
    { name: "Jun", food: 239, water: 380, medical: 250, shelter: 230 },
  ];

  const pieData = [
    { name: "Food Supplies", value: 35 },
    { name: "Water Supplies", value: 25 },
    { name: "Medical Supplies", value: 20 },
    { name: "Shelter Materials", value: 15 },
    { name: "Hygiene Products", value: 5 },
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const recentReports = [
    {
      id: "REP-001",
      name: "Monthly Supply Chain Summary",
      date: "April 10, 2025",
      type: "Summary",
      status: "Complete"
    },
    {
      id: "REP-002",
      name: "Crisis Zone Need Assessment",
      date: "April 8, 2025",
      type: "Analysis",
      status: "Complete"
    },
    {
      id: "REP-003",
      name: "Volunteer Activity Log",
      date: "April 5, 2025",
      type: "Activity",
      status: "Complete"
    },
    {
      id: "REP-004",
      name: "Drop Zone Performance Metrics",
      date: "April 1, 2025",
      type: "Metrics",
      status: "Complete"
    },
    {
      id: "REP-005",
      name: "Q1 2025 Aid Distribution Report",
      date: "March 31, 2025",
      type: "Quarterly",
      status: "Complete"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-100">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Reports & Analytics</h1>
              <p className="text-gray-600">Track performance metrics and generate detailed reports</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button variant="outline" className="flex gap-2 items-center">
                <Calendar size={16} /> Date Range
              </Button>
              <Button className="bg-relief-black text-relief-lime hover:bg-relief-black/90">
                Generate New Report
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="p-6 col-span-full lg:col-span-2">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <h2 className="text-xl font-display font-bold">Aid Distribution by Category</h2>
                <div className="flex gap-2 items-center mt-2 md:mt-0">
                  <Select defaultValue="6months">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="3months">Last 3 months</SelectItem>
                      <SelectItem value="6months">Last 6 months</SelectItem>
                      <SelectItem value="1year">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon">
                    <Download size={16} />
                  </Button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={barData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="food" fill="#0088FE" name="Food" />
                    <Bar dataKey="water" fill="#00C49F" name="Water" />
                    <Bar dataKey="medical" fill="#FFBB28" name="Medical" />
                    <Bar dataKey="shelter" fill="#FF8042" name="Shelter" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-6 col-span-full lg:col-span-1">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-display font-bold">Supply Distribution</h2>
                <Button variant="ghost" size="icon">
                  <Download size={16} />
                </Button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
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
            </Card>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center">
              <h2 className="text-xl font-display font-bold">Recent Reports</h2>
              <div className="flex gap-2 mt-2 md:mt-0">
                <Button variant="outline" size="sm" className="flex gap-1 items-center">
                  <Filter size={14} /> Filter
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="summary">Summary</SelectItem>
                    <SelectItem value="analysis">Analysis</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                    <SelectItem value="metrics">Metrics</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Report Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((report) => (
                    <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{report.id}</td>
                      <td className="py-3 px-4 font-medium">{report.name}</td>
                      <td className="py-3 px-4">{report.date}</td>
                      <td className="py-3 px-4">{report.type}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {report.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">View</Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Download size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reports;
