
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, icon, className }: StatCardProps) {
  return (
    <div className={cn("bg-relief-lime text-relief-black p-6 rounded-lg flex flex-col", className)}>
      {icon && <div className="mb-2">{icon}</div>}
      <p className="text-lg font-medium opacity-80">{title}</p>
      <p className="big-number mt-2">{value}</p>
    </div>
  );
}
