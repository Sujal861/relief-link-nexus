
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AIInsightProps {
  insight: {
    id: number;
    title: string;
    severity: "low" | "medium" | "high";
    probability: number;
    description: string;
    reasoning: string;
    recommendation: string;
  };
}

export function AIInsightCard({ insight }: AIInsightProps) {
  const [expanded, setExpanded] = useState(false);
  
  const severityColors = {
    low: "bg-blue-50 border-blue-200 text-blue-800",
    medium: "bg-amber-50 border-amber-200 text-amber-800",
    high: "bg-red-50 border-red-200 text-red-800"
  };
  
  const severityIcons = {
    low: <HelpCircle size={18} className="text-blue-500" />,
    medium: <AlertTriangle size={18} className="text-amber-500" />,
    high: <AlertTriangle size={18} className="text-red-500" />
  };
  
  return (
    <Card className={cn("border-l-4", {
      "border-l-red-500": insight.severity === "high",
      "border-l-amber-500": insight.severity === "medium",
      "border-l-blue-500": insight.severity === "low"
    })}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-start">
          <div className="flex items-start gap-2">
            {severityIcons[insight.severity]}
            <span>{insight.title}</span>
          </div>
          <span className={cn("text-xs px-2 py-1 rounded-full", severityColors[insight.severity])}>
            {insight.probability}% probability
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-700 mb-3">{insight.description}</p>
        
        {expanded && (
          <div className="space-y-3 mt-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">AI Reasoning:</h4>
              <p className="text-gray-700">{insight.reasoning}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Recommendation:</h4>
              <p className="text-gray-700">{insight.recommendation}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-xs flex items-center gap-1"
          >
            {expanded ? (
              <>
                <ChevronUp size={14} /> Hide Details
              </>
            ) : (
              <>
                <ChevronDown size={14} /> Show Details
              </>
            )}
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="text-xs bg-relief-black text-relief-lime hover:bg-relief-black/90"
          >
            Apply Recommendation
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
