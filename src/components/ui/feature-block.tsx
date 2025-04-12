
import { cn } from "@/lib/utils";

interface FeatureBlockProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export function FeatureBlock({ title, description, icon, className }: FeatureBlockProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {icon && <div className="text-relief-lime text-3xl mb-3">{icon}</div>}
      <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
