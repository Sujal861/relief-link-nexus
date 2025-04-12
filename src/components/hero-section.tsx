
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="bg-relief-lime min-h-[80vh] flex items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-start max-w-4xl space-y-4">
          <h1 className="heading-xl text-relief-black">
            RELIEF<span className="font-thin">LINK</span>
          </h1>
          <p className="text-xl md:text-2xl text-relief-black/80 max-w-2xl">
            A Digital Logistics & Coordination System for Emergency Aid
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              onClick={() => navigate("/dashboard")}
              className="bg-relief-black text-relief-lime hover:bg-relief-black/90 text-lg py-6 px-8"
            >
              Crisis Dashboard
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/about")}
              className="border-relief-black text-relief-black hover:bg-relief-black hover:text-relief-lime text-lg py-6 px-8"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
