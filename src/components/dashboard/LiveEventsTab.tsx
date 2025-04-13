
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Activity, 
  RefreshCw, 
  Calendar, 
  Users,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CrisisForm } from "./CrisisForm";

interface LiveEvent {
  id: number;
  name: string;
  location: string;
  timestamp: string;
  status: "ongoing" | "resolved" | "critical";
  affectedPopulation: number;
  type: string;
}

export const LiveEventsTab = () => {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock events data
  const mockEvents: LiveEvent[] = [
    {
      id: 1,
      name: "Hurricane Florence",
      location: "Coastal Carolina",
      timestamp: new Date().toISOString(),
      status: "ongoing",
      affectedPopulation: 50000,
      type: "Natural Disaster"
    },
    {
      id: 2,
      name: "Wildfire Outbreak",
      location: "Northern California",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      status: "critical",
      affectedPopulation: 15000,
      type: "Natural Disaster"
    },
    {
      id: 3,
      name: "Flooding",
      location: "Midwest Region",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
      status: "ongoing",
      affectedPopulation: 25000,
      type: "Natural Disaster"
    }
  ];

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const refreshEvents = () => {
    setLoading(true);
    
    // Simulate refreshing data
    setTimeout(() => {
      const updatedEvents = [...mockEvents];
      
      // Add a new random event with a 50% chance
      if (Math.random() > 0.5) {
        const newEvent: LiveEvent = {
          id: Math.floor(Math.random() * 1000) + 10,
          name: "Earthquake",
          location: "Southern Region",
          timestamp: new Date().toISOString(),
          status: "critical",
          affectedPopulation: Math.floor(Math.random() * 10000) + 5000,
          type: "Natural Disaster"
        };
        updatedEvents.unshift(newEvent);
        
        toast({
          title: "New Crisis Alert",
          description: `${newEvent.name} reported in ${newEvent.location}`,
          variant: "destructive",
        });
      }
      
      setEvents(updatedEvents);
      setLoading(false);
      
      toast({
        title: "Events Refreshed",
        description: "Latest crisis events have been loaded",
      });
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-300";
      case "ongoing":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold">Live Crisis Events</h2>
          <p className="text-gray-600">Real-time monitoring of ongoing crises</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={refreshEvents}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                Report New Crisis
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Report a New Crisis</DialogTitle>
              </DialogHeader>
              <CrisisForm 
                onSubmit={(newCrisis) => {
                  const newEvent: LiveEvent = {
                    id: Math.floor(Math.random() * 1000) + 100,
                    name: newCrisis.name,
                    location: newCrisis.location,
                    timestamp: new Date().toISOString(),
                    status: "ongoing",
                    affectedPopulation: newCrisis.affectedPopulation,
                    type: newCrisis.type
                  };
                  
                  setEvents([newEvent, ...events]);
                  
                  toast({
                    title: "Crisis Reported",
                    description: `${newCrisis.name} has been added to the system`,
                  });
                }} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <RefreshCw size={40} className="animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className={`h-2 ${getStatusColor(event.status).split(' ')[0].replace('100', '500')}`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle 
                      size={18} 
                      className={
                        event.status === "critical" ? "text-red-500" : 
                        event.status === "ongoing" ? "text-amber-500" : "text-green-500"
                      } 
                    />
                    {event.name}
                  </CardTitle>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(event.status)}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>{formatTimestamp(event.timestamp)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Activity size={16} className="mr-2" />
                    <span>{event.type}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={16} className="mr-2" />
                    <span>{event.affectedPopulation.toLocaleString()} people affected</span>
                  </div>
                  
                  <div className="flex justify-end mt-4 pt-2 border-t border-gray-100">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
