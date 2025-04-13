
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileCheck, 
  Clock, 
  Users, 
  Package, 
  Download,
  CheckCircle2,
  Clipboard,
  BarChart4
} from "lucide-react";

interface TransactionRecord {
  id: string;
  timestamp: string;
  type: string;
  description: string;
  location: string;
  verified: boolean;
  verifier?: string;
}

export const TransparencyReport = () => {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([
    {
      id: "txn-001",
      timestamp: "2025-04-13T08:30:00",
      type: "Supply Receipt",
      description: "1000kg Rice received at warehouse",
      location: "Central Warehouse",
      verified: true,
      verifier: "John Smith"
    },
    {
      id: "txn-002",
      timestamp: "2025-04-13T09:45:00",
      type: "Distribution",
      description: "Medical supplies distributed to local clinic",
      location: "East District Medical Center",
      verified: true,
      verifier: "Maria Rodriguez"
    },
    {
      id: "txn-003",
      timestamp: "2025-04-13T11:15:00",
      type: "Inventory Transfer",
      description: "Water purification tablets transferred to forward base",
      location: "Forward Base Alpha",
      verified: true,
      verifier: "David Lee"
    },
    {
      id: "txn-004",
      timestamp: "2025-04-13T13:20:00",
      type: "Distribution",
      description: "Emergency food rations distributed to shelter",
      location: "Community Shelter #4",
      verified: false
    }
  ]);
  
  const verifyTransaction = (id: string) => {
    setTransactions(prev => 
      prev.map(txn => 
        txn.id === id 
          ? { ...txn, verified: true, verifier: "Current User" } 
          : txn
      )
    );
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileCheck className="text-relief-lime" size={20} />
            <span>Transparency & Accountability</span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download size={14} />
              Export Report
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <BarChart4 size={14} />
              Analytics
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transactions">
          <TabsList className="mb-4">
            <TabsTrigger value="transactions">Transaction Records</TabsTrigger>
            <TabsTrigger value="verification">Verification Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions">
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {transaction.type === "Supply Receipt" && <Package size={16} />}
                        {transaction.type === "Distribution" && <Users size={16} />}
                        {transaction.type === "Inventory Transfer" && <Clipboard size={16} />}
                        {transaction.description}
                      </h3>
                      <p className="text-sm text-gray-600">{transaction.location}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {formatDate(transaction.timestamp)}
                      </div>
                    </div>
                    
                    <div>
                      {transaction.verified ? (
                        <div className="flex flex-col items-end">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                            <CheckCircle2 size={12} className="mr-1" />
                            Verified
                          </span>
                          <span className="text-xs text-gray-500 mt-1">by {transaction.verifier}</span>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs bg-amber-50"
                          onClick={() => verifyTransaction(transaction.id)}
                        >
                          Verify Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" size="sm">Load More</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="verification">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-700">{transactions.filter(t => t.verified).length}</div>
                  <div className="text-sm text-green-600">Verified Transactions</div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-amber-700">{transactions.filter(t => !t.verified).length}</div>
                  <div className="text-sm text-amber-600">Pending Verification</div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-700">{transactions.length}</div>
                  <div className="text-sm text-blue-600">Total Transactions</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Verification Process</h3>
                <p className="text-sm text-gray-600">
                  Each transaction is verified by at least two independent operators to ensure transparency
                  and accountability. Verification data is stored securely and cannot be altered once approved.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
