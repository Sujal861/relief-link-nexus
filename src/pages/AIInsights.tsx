
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  AlertTriangle, 
  BarChart, 
  RefreshCw, 
  CheckCircle, 
  Filter, 
  X, 
  HelpCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AIInsightCard } from "@/components/ai-insights/AIInsightCard";
import { AITimelineEvent } from "@/components/ai-insights/AITimelineEvent";
import { LiveFeed } from "@/components/ai-insights/LiveFeed";

const AIInsights = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentTab, setCurrentTab] = useState("insights");
  const { toast } = useToast();
  
  // Simulate analysis progress
  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress >= 100) {
            setIsAnalyzing(false);
            toast({
              title: "Analysis Complete",
              description: "AI has finished analyzing the current crisis data",
              variant: "default",
            });
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 600);
      
      return () => clearInterval(interval);
    }
  }, [isAnalyzing, toast]);
  
  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    toast({
      title: "Analysis Started",
      description: "AI is analyzing current crisis data",
      variant: "default",
    });
  };
  
  const insightData = [
    {
      id: 1,
      title: "Water Shortage Predicted",
      severity: "high",
      probability: 87,
      description: "Based on current consumption rates and supply chain disruptions, the North and East districts will face critical water shortages within 72 hours.",
      reasoning: "Analysis of water distribution logs shows consumption outpacing delivery by 18%. Weather patterns indicate no rainfall for the next 5 days, and 3 of 7 water purification systems are operating at reduced capacity.",
      recommendation: "Increase water shipments to North District by 30% immediately. Repair purification system NP-12 within 24 hours. Implement water rationing in non-critical areas."
    },
    {
      id: 2,
      title: "Medical Supply Distribution Inefficiency",
      severity: "medium",
      probability: 76,
      description: "Current medical supply routes are inefficient, causing 30% longer delivery times than optimal.",
      reasoning: "Route analysis shows supplies traveling through congested areas. Last-mile delivery is delayed due to unoptimized drop zone placement. Correlation between medical request timestamps and delivery confirmation shows systematic delay patterns.",
      recommendation: "Reroute through alternative roads shown on updated map. Establish two additional mobile medical units in the marked locations."
    },
    {
      id: 3,
      title: "Potential Disease Outbreak",
      severity: "high",
      probability: 65,
      description: "Patterns in medical requests suggest early signs of respiratory infection spread in South District shelters.",
      reasoning: "40% increase in respiratory-related medical requests in last 48 hours confined to a 3-mile radius. Temperature and humidity levels in shelters SH-142 and SH-156 are conducive to viral spread. Similar pattern identified in previous crisis events.",
      recommendation: "Deploy preventative medical team to affected shelters. Increase HEPA filtration. Implement health screening protocol at shelter entrances."
    },
    {
      id: 4,
      title: "Food Stockpile Depletion Risk",
      severity: "medium",
      probability: 82,
      description: "Food supplies projected to be critically low in 96 hours based on current distribution rates.",
      reasoning: "Inventory tracking shows accelerated depletion of non-perishable food items. Incoming shipments delayed due to road conditions in sector R-12. Population count in East District 16% higher than initial assessment.",
      recommendation: "Implement portion control measures. Expedite food convoy FC-28 via alternate route. Temporarily reallocate 15% of West District supplies to East District."
    }
  ];
  
  const timelineEvents = [
    {
      id: 1,
      title: "Water Supply Anomaly Detected",
      time: "09:23 AM",
      type: "detection",
      description: "AI detected unusual water consumption patterns in North District"
    },
    {
      id: 2,
      title: "Initial Analysis Completed",
      time: "09:46 AM",
      type: "analysis",
      description: "Preliminary analysis indicates potential infrastructure failure in water distribution network"
    },
    {
      id: 3,
      title: "Field Team Dispatched",
      time: "10:12 AM",
      type: "action",
      description: "Field team sent to investigate reported water pressure issues at distribution point NW-24"
    },
    {
      id: 4,
      title: "Problem Source Identified",
      time: "11:18 AM",
      type: "discovery",
      description: "Main valve failure at junction J-12 confirmed as source of reduced water pressure"
    },
    {
      id: 5,
      title: "Repair Plan Generated",
      time: "11:45 AM",
      type: "analysis",
      description: "AI generated optimal repair plan and resource allocation for quick resolution"
    },
    {
      id: 6,
      title: "Repair Team Deployed",
      time: "12:10 PM",
      type: "action",
      description: "Technical team RT-7 dispatched with necessary parts and equipment"
    },
    {
      id: 7,
      title: "Repair Completed",
      time: "03:42 PM",
      type: "resolution",
      description: "Valve replacement successful, water pressure restored to normal levels"
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-100">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">AI Insights Dashboard</h1>
              <p className="text-gray-600">Real-time crisis monitoring and predictive analysis</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              {isAnalyzing ? (
                <Button disabled className="flex gap-2 items-center">
                  <RefreshCw size={16} className="animate-spin" /> 
                  Analyzing... {Math.round(analysisProgress)}%
                </Button>
              ) : (
                <Button 
                  onClick={startAnalysis} 
                  className="bg-relief-black text-relief-lime hover:bg-relief-black/90 flex gap-2 items-center"
                >
                  <Brain size={16} /> Run Deep Analysis
                </Button>
              )}
            </div>
          </div>
          
          {isAnalyzing && (
            <div className="mb-6">
              <Progress value={analysisProgress} className="h-2" />
            </div>
          )}
          
          <Tabs defaultValue="insights" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="insights" className="flex items-center gap-1">
                <Brain size={14} /> AI Insights
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center gap-1">
                <Clock size={14} /> Event Timeline
              </TabsTrigger>
              <TabsTrigger value="live" className="flex items-center gap-1">
                <AlertTriangle size={14} /> Live Feed
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {insightData.map((insight) => (
                  <AIInsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Crisis Response Timeline</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Filter size={14} /> Filter
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <BarChart size={14} /> Visualize
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {timelineEvents.map((event) => (
                      <AITimelineEvent key={event.id} event={event} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="live">
              <LiveFeed />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIInsights;
