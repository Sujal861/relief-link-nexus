
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function Footer() {
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-relief-black text-relief-gray py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl md:text-2xl font-display font-bold text-relief-lime tracking-tight">
                RELIEF<span className="font-thin">LINK</span>
              </span>
            </Link>
            <p className="max-w-md text-sm md:text-base text-relief-gray/80">
              A comprehensive digital logistics and coordination system 
              designed to streamline emergency aid distribution in crisis situations.
            </p>
          </div>
          
          <div>
            <h3 className="text-relief-lime font-display font-bold text-base md:text-lg mb-3 md:mb-4">Platform</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li><Link to="/dashboard" className="hover:text-relief-lime transition-colors">Dashboard</Link></li>
              <li><Link to="/inventory" className="hover:text-relief-lime transition-colors">Inventory</Link></li>
              <li><Link to="/drop-zones" className="hover:text-relief-lime transition-colors">Drop Zones</Link></li>
              <li><Link to="/reports" className="hover:text-relief-lime transition-colors">Reports</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-relief-lime font-display font-bold text-base md:text-lg mb-3 md:mb-4">Company</h3>
            <ul className="space-y-1.5 md:space-y-2 text-sm md:text-base">
              <li><Link to="/about" className="hover:text-relief-lime transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-relief-lime transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-relief-lime transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-relief-lime transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-relief-gray/20 mt-8 md:mt-12 pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-relief-gray/60 text-xs md:text-sm">
            &copy; 2025 ReliefLink. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a href="https://github.com/Sujal861/Sujal861.git" target="_blank" rel="noopener noreferrer" className="text-relief-gray/60 hover:text-relief-lime transition-colors text-xs md:text-sm">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/sujalgupta352" target="_blank" rel="noopener noreferrer" className="text-relief-gray/60 hover:text-relief-lime transition-colors text-xs md:text-sm">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
