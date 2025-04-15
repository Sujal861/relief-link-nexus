
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  // Add scroll event listener to create sticky effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    if (isMenuOpen) {
      // Prevent body scrolling when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);
  
  return (
    <header className={`sticky top-0 z-50 bg-relief-black text-relief-lime transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="container px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center z-10">
            <span className="text-xl md:text-2xl font-display font-bold tracking-tight">
              RELIEF<span className="font-thin">LINK</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="font-medium hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link to="/inventory" className="font-medium hover:text-white transition-colors">
              Inventory
            </Link>
            <Link to="/drop-zones" className="font-medium hover:text-white transition-colors">
              Drop Zones
            </Link>
            <Link to="/reports" className="font-medium hover:text-white transition-colors">
              Reports
            </Link>
            <Button asChild className="bg-relief-lime text-relief-black hover:bg-relief-lime/90">
              <Link to="/login">Login</Link>
            </Button>
          </nav>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-relief-lime z-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-relief-black pt-16 z-0 animate-fade-in overflow-auto">
          <nav className="container px-4 flex flex-col space-y-5 py-8">
            <Link 
              to="/dashboard" 
              className="py-2 text-xl font-medium hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/inventory" 
              className="py-2 text-xl font-medium hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inventory
            </Link>
            <Link 
              to="/drop-zones" 
              className="py-2 text-xl font-medium hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Drop Zones
            </Link>
            <Link 
              to="/reports" 
              className="py-2 text-xl font-medium hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Reports
            </Link>
            <Button 
              asChild 
              className="w-full mt-4 bg-relief-lime text-relief-black hover:bg-relief-lime/90"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/login">Login</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
