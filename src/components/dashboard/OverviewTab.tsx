import { StatCard } from "@/components/ui/stat-card";
import { FieldOperations } from "@/components/dashboard/FieldOperations";
import { AidAccountability } from "@/components/dashboard/AidAccountability";
import { TransparencyReport } from "@/components/dashboard/TransparencyReport";
import { Package, Users, Truck, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const OverviewTab = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${isMobile ? 'dashboard-stats-mobile' : ''}`}>
        <StatCard
          title="Active Crises"
          value="7"
          icon={<AlertTriangle size={22} />}
          trend={{ value: 2, label: "vs. last month", isPositive: false }}
          className="h-full flex flex-col justify-between"
        />
        
        <StatCard
          title="Aid Packages"
          value="12,345"
          icon={<Package size={22} />}
          trend={{ value: 15, label: "vs. last month", isPositive: true }}
          className="h-full flex flex-col justify-between"
        />
        
        <StatCard
          title="Beneficiaries"
          value="45,678"
          icon={<Users size={22} />}
          trend={{ value: 23, label: "vs. last month", isPositive: true }}
          className="h-full flex flex-col justify-between"
        />
        
        <StatCard
          title="Supply Vehicles"
          value="89"
          icon={<Truck size={22} />}
          trend={{ value: 5, label: "vs. last month", isPositive: true }}
          className="h-full flex flex-col justify-between"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FieldOperations />
        <AidAccountability />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <TransparencyReport />
      </div>
    </div>
  );
};
