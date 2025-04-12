
import { CheckCircle, AlertTriangle, Search, Lightbulb, Hammer, ArrowRight, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface AITimelineEventProps {
  event: {
    id: number;
    title: string;
    time: string;
    type: "detection" | "analysis" | "action" | "discovery" | "resolution";
    description: string;
  };
}

export function AITimelineEvent({ event }: AITimelineEventProps) {
  const getEventIcon = () => {
    switch (event.type) {
      case "detection":
        return <AlertTriangle size={18} className="text-amber-500" />;
      case "analysis":
        return <Lightbulb size={18} className="text-blue-500" />;
      case "action":
        return <ArrowRight size={18} className="text-purple-500" />;
      case "discovery":
        return <Search size={18} className="text-indigo-500" />;
      case "resolution":
        return <CheckCircle size={18} className="text-green-500" />;
      default:
        return <CheckSquare size={18} className="text-gray-500" />;
    }
  };
  
  const getEventColor = () => {
    switch (event.type) {
      case "detection":
        return "border-amber-200 bg-amber-50";
      case "analysis":
        return "border-blue-200 bg-blue-50";
      case "action":
        return "border-purple-200 bg-purple-50";
      case "discovery":
        return "border-indigo-200 bg-indigo-50";
      case "resolution":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };
  
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn("w-9 h-9 rounded-full border-2 flex items-center justify-center", getEventColor())}>
          {getEventIcon()}
        </div>
        {event.id !== 7 && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
      </div>
      
      <div className={cn("flex-1 p-4 rounded-lg border", getEventColor())}>
        <div className="flex justify-between mb-1">
          <h4 className="font-semibold">{event.title}</h4>
          <span className="text-xs text-gray-500">{event.time}</span>
        </div>
        <p className="text-sm text-gray-700">{event.description}</p>
      </div>
    </div>
  );
}
