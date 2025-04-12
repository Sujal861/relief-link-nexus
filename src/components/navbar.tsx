
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-relief-black text-relief-lime">
      <div className="container px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-display font-bold tracking-tight">
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
            className="md:hidden text-relief-lime"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-relief-black border-t border-relief-lime/20 py-4">
          <nav className="container px-4 flex flex-col space-y-4">
            <Link 
              to="/dashboard" 
              className="py-2 font-medium hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/inventory" 
              className="py-2 font-medium hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Inventory
            </Link>
            <Link 
              to="/drop-zones" 
              className="py-2 font-medium hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Drop Zones
            </Link>
            <Link 
              to="/reports" 
              className="py-2 font-medium hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Reports
            </Link>
            <Button 
              asChild 
              className="w-full bg-relief-lime text-relief-black hover:bg-relief-lime/90"
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
