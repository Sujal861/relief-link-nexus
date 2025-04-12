
import { FeatureBlock } from "@/components/ui/feature-block";
import { 
  Users, MapPin, PackageOpen, Brain, 
  Compass, Route, BarChart3, ShieldCheck 
} from "lucide-react";

export function ModulesSection() {
  return (
    <section className="py-24 bg-relief-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-relief-lime heading-xl mb-4">SYSTEM MODULES</h2>
          <p className="text-gray-400 text-xl max-w-2xl">
            Comprehensive tools designed for emergency response coordination
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureBlock
            icon={<Users strokeWidth={2} />}
            title="User Roles"
            description="NGO Workers, Government Agencies, Donors, Logistics Operators, Field Agents & Admins"
          />
          <FeatureBlock
            icon={<MapPin strokeWidth={2} />}
            title="Crisis Dashboard"
            description="Live map showing affected areas, drop zones, routes, and real-time status updates"
          />
          <FeatureBlock
            icon={<PackageOpen strokeWidth={2} />}
            title="Inventory Management"
            description="Track items from procurement to delivery with real-time stock updates"
          />
          <FeatureBlock
            icon={<Brain strokeWidth={2} />}
            title="Needs Assessment"
            description="AI-based recommendation of resources based on area population and disaster severity"
          />
          <FeatureBlock
            icon={<Compass strokeWidth={2} />}
            title="Drop Zone Coordination"
            description="Define zones with GPS coordinates, set delivery slots, and confirm drops"
          />
          <FeatureBlock
            icon={<Route strokeWidth={2} />}
            title="Last-Mile Tracking"
            description="Beneficiary data registration with mobile confirmation and distribution receipts"
          />
          <FeatureBlock
            icon={<BarChart3 strokeWidth={2} />}
            title="Reporting"
            description="Real-time audit trail with public and private data views and automated reports"
          />
          <FeatureBlock
            icon={<ShieldCheck strokeWidth={2} />}
            title="Security & Compliance"
            description="End-to-end encryption, access control, disaster recovery, and regulatory compliance"
          />
        </div>
      </div>
    </section>
  );
}
