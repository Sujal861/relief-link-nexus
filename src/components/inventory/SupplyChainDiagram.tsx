
import React from 'react';
import { Package, Truck, Home, Users, Building, ArrowRight } from 'lucide-react';

interface SupplyChainNode {
  id: string;
  name: string;
  type: 'donor' | 'warehouse' | 'dropzone' | 'recipient';
  status: 'active' | 'pending' | 'complete';
}

interface SupplyChainProps {
  trackingId: string;
  nodes: SupplyChainNode[];
}

export const SupplyChainDiagram = ({ trackingId, nodes }: SupplyChainProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'donor':
        return <Building className="h-6 w-6 text-blue-500" />;
      case 'warehouse':
        return <Package className="h-6 w-6 text-purple-500" />;
      case 'dropzone':
        return <Truck className="h-6 w-6 text-green-500" />;
      case 'recipient':
        return <Users className="h-6 w-6 text-red-500" />;
      default:
        return <Package className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'complete':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-bold">Supply Chain Tracking</h2>
        <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">ID: {trackingId}</div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${node.type === 'donor' ? 'blue' : node.type === 'warehouse' ? 'purple' : node.type === 'dropzone' ? 'green' : 'red'}-100 mb-2`}>
                {getIcon(node.type)}
              </div>
              <div className="text-sm font-medium text-center">{node.name}</div>
              <div className={`mt-2 text-xs px-2 py-1 rounded-full ${getStatusColor(node.status)} text-white`}>
                {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
              </div>
            </div>
            
            {index < nodes.length - 1 && (
              <div className="mx-2 my-4 md:my-0">
                <ArrowRight className="text-gray-400" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm">
        <div className="font-medium mb-2">Timeline:</div>
        <ul className="space-y-2">
          <li className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-gray-600 mr-2">Apr 10, 2025 09:30 AM:</span>
            <span>Received at Central Warehouse</span>
          </li>
          <li className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-gray-600 mr-2">Apr 11, 2025 14:15 PM:</span>
            <span>Dispatched to Eastern Zone</span>
          </li>
          <li className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-gray-600 mr-2">Apr 12, 2025 10:00 AM:</span>
            <span>In transit to Drop Zone DZ-042</span>
          </li>
          <li className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-gray-600 mr-2">Apr 12, 2025 16:30 PM:</span>
            <span>Expected arrival at Drop Zone</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
