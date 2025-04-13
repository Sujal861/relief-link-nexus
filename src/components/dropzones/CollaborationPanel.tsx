
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Send, Building, MessageSquare, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

interface Partner {
  id: string;
  name: string;
  role: string;
  organization: string;
  lastActive: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  sender: string;
  organization: string;
  content: string;
  timestamp: string;
}

export const CollaborationPanel = () => {
  const [newMessage, setNewMessage] = useState("");
  
  const partners: Partner[] = [
    {
      id: "p1",
      name: "Sarah Johnson",
      role: "Medical Coordinator",
      organization: "International Health Organization",
      lastActive: "Just now",
      isOnline: true
    },
    {
      id: "p2",
      name: "David Lee",
      role: "Logistics Manager",
      organization: "Global Relief Initiative",
      lastActive: "5 min ago",
      isOnline: true
    },
    {
      id: "p3",
      name: "Maria Garcia",
      role: "Government Liaison",
      organization: "Regional Emergency Management",
      lastActive: "35 min ago",
      isOnline: false
    }
  ];
  
  const messages: Message[] = [
    {
      id: "m1",
      sender: "David Lee",
      organization: "Global Relief Initiative",
      content: "The medical supplies will arrive at DZ-042 by 16:30 today. We've added extra water purification tablets as requested.",
      timestamp: "11:23 AM"
    },
    {
      id: "m2",
      sender: "Maria Garcia",
      organization: "Regional Emergency Management",
      content: "Be advised that road access to North District will be limited tomorrow due to construction. Please plan alternative routes for deliveries to DZ-027.",
      timestamp: "10:45 AM"
    },
    {
      id: "m3",
      sender: "Sarah Johnson",
      organization: "International Health Organization",
      content: "We're seeing increased respiratory cases at the East shelter. Can we prioritize additional medical staff for DZ-042?",
      timestamp: "09:32 AM"
    }
  ];
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to a backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Coordination Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4 max-h-[350px] overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <div className="font-medium">{message.sender}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {message.timestamp}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">{message.organization}</div>
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input 
              placeholder="Type your message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-relief-black text-relief-lime hover:bg-relief-black/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Active Partners
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {partners.map((partner) => (
              <div key={partner.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="h-10 w-10">
                  <div className="bg-gray-300 h-full w-full flex items-center justify-center text-gray-600 font-semibold">
                    {partner.name.charAt(0)}
                  </div>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{partner.name}</div>
                    <Badge className={partner.isOnline ? "bg-green-500" : "bg-gray-500"}>
                      {partner.isOnline ? "Online" : "Away"}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">{partner.role}</div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Building className="h-3 w-3 mr-1" />
                    {partner.organization}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Last active: {partner.lastActive}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
