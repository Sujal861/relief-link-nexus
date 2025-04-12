
import { StatCard } from "@/components/ui/stat-card";

export function StatsSection() {
  return (
    <section className="py-16 bg-relief-gray">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-relief-black mb-4">
            MAKING A REAL IMPACT
          </h2>
          <p className="text-xl text-relief-black/70">
            ReliefLink is delivering results in crisis situations worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Crisis Zones Managed" 
            value="45+"
          />
          <StatCard 
            title="Aid Shipments Coordinated" 
            value="1,250+"
          />
          <StatCard 
            title="People Reached" 
            value="2.5M+"
          />
        </div>
      </div>
    </section>
  );
}
