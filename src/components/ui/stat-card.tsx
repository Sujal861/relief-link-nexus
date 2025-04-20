import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  description,
  trend,
  className 
}: StatCardProps) {
  return (
    <div className={cn("bg-relief-lime text-relief-black p-6 rounded-lg flex flex-col", className)}>
      <div className="flex justify-between items-start">
        {icon && <div className="mb-2">{icon}</div>}
      </div>
      <p className="text-lg font-medium opacity-80">{title}</p>
      <p className="big-number mt-2 tracking-tight">{value}</p>
      
      {description && (
        <p className="text-sm mt-2 text-relief-black/70">{description}</p>
      )}
      
      {trend && (
        <div className="flex items-center mt-3 text-sm">
          <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded", 
            trend.isPositive 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          )}>
            {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
          </span>
          <span className="ml-2 text-relief-black/60">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
