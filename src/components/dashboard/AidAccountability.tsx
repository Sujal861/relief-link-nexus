
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  QrCode, 
  Boxes, 
  Truck, 
  CheckCheck, 
  Camera, 
  History, 
  Upload, 
  FileCheck,
  Users 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for transactions
const SAMPLE_TRANSACTIONS = [
  { 
    id: "txn-001", 
    type: "delivery", 
    status: "verified", 
    timestamp: new Date(2025, 3, 14, 10, 30), 
    location: "Eastern Zone HQ",
    supplies: "Medical Kits (30)",
    hash: "0xf731...e93b2" 
  },
  { 
    id: "txn-002", 
    type: "distribution", 
    status: "pending", 
    timestamp: new Date(2025, 3, 14, 11, 15), 
    location: "Northern Village Camp",
    supplies: "Food Packages (150)",
    hash: "0x8a42...1f5c3" 
  },
  { 
    id: "txn-003", 
    type: "donation", 
    status: "verified", 
    timestamp: new Date(2025, 3, 13, 15, 45), 
    location: "Central Relief Hub",
    supplies: "Blankets (200)",
    hash: "0x62c7...9d4e1" 
  },
  { 
    id: "txn-004", 
    type: "assessment", 
    status: "verified", 
    timestamp: new Date(2025, 3, 12, 9, 0), 
    location: "Southern District",
    supplies: "N/A",
    hash: "0xb3a5...7c8d9" 
  },
];

export const AidAccountability = () => {
  const [transactions, setTransactions] = useState(SAMPLE_TRANSACTIONS);
  const { toast } = useToast();
  
  const verifyTransaction = (id: string) => {
    setTransactions(prevTxns => 
      prevTxns.map(txn => 
        txn.id === id ? { ...txn, status: "verified" } : txn
      )
    );
    
    toast({
      title: "Transaction Verified",
      description: `Transaction ${id} has been verified and recorded on the blockchain.`,
    });
  };
  
  const captureEvidence = () => {
    toast({
      title: "Evidence Capture",
      description: "Camera activated for photo/video documentation.",
    });
  };
  
  const scanQRCode = () => {
    toast({
      title: "QR Code Scanner",
      description: "Scan items or ID cards to verify transactions.",
    });
  };
  
  const viewDetailedAudit = () => {
    toast({
      title: "Audit Trail",
      description: "Loading comprehensive audit trail for all transactions.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck size={20} className="text-relief-lime" />
          Aid Accountability
        </CardTitle>
        <CardDescription>
          Transparent tracking of all aid from donation to distribution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={scanQRCode}
          >
            <QrCode size={16} />
            Scan QR
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={captureEvidence}
          >
            <Camera size={16} />
            Capture Evidence
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={viewDetailedAudit}
          >
            <History size={16} />
            Audit Trail
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 ml-auto"
          >
            <FileCheck size={16} />
            Generate Report
          </Button>
        </div>
        
        <div className="mb-4 rounded-md border p-3 bg-gray-50">
          <div className="text-sm font-medium mb-2">Blockchain Verification Status</div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span>Verified: {transactions.filter(t => t.status === "verified").length}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
              <span>Pending: {transactions.filter(t => t.status === "pending").length}</span>
            </div>
            <div className="flex items-center">
              <Upload size={12} className="mr-1 text-blue-500" />
              <span>Last upload: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead className="hidden md:table-cell">Time</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="font-medium">{transaction.id}</div>
                    <div className="text-xs text-gray-500 md:hidden">
                      {transaction.timestamp.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {transaction.timestamp.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {transaction.type === "delivery" && <Truck size={14} className="mr-1 text-blue-500" />}
                      {transaction.type === "distribution" && <Users size={14} className="mr-1 text-purple-500" />}
                      {transaction.type === "donation" && <Boxes size={14} className="mr-1 text-green-500" />}
                      {transaction.type === "assessment" && <CheckCheck size={14} className="mr-1 text-orange-500" />}
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {transaction.location} • {transaction.supplies}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {transaction.hash}
                    </div>
                  </TableCell>
                  <TableCell>
                    {transaction.status === "verified" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Verified
                      </Badge>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => verifyTransaction(transaction.id)}
                      >
                        Verify
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 flex items-center justify-between">
          <span>Showing last 7 days of transactions</span>
          <Button variant="link" size="sm" className="text-xs p-0 h-auto">
            View all transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
