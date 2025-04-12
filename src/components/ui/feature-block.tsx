
import { cn } from "@/lib/utils";

interface FeatureBlockProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function FeatureBlock({ 
  title, 
  description, 
  icon, 
  actionLabel,
  onAction,
  className 
}: FeatureBlockProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {icon && <div className="text-relief-lime text-3xl mb-3">{icon}</div>}
      <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="mt-4 text-relief-lime hover:text-relief-lime/80 font-medium flex items-center"
        >
          {actionLabel}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </button>
      )}
    </div>
  );
}
