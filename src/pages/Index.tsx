
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ModulesSection } from "@/components/modules-section";
import { StatsSection } from "@/components/stats-section";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        {/* Key Features Section */}
        <section className="py-24 bg-relief-black text-white">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-relief-lime heading-xl mb-6">KEY FEATURES</h2>
              <p className="text-xl text-gray-400">
                Essential tools and capabilities to manage emergency aid distribution efficiently and transparently
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-relief-black/50 border border-relief-lime/20 p-8 rounded-lg">
                <div className="w-12 h-12 bg-relief-lime text-relief-black rounded-full flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl">1</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">Live Crisis Map</h3>
                <p className="text-gray-400 mb-6">
                  Real-time visualization of affected areas, drop zones, and supply chain routes
                </p>
                <Link to="/dashboard" className="text-relief-lime font-medium inline-flex items-center group">
                  Learn more <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="bg-relief-black/50 border border-relief-lime/20 p-8 rounded-lg">
                <div className="w-12 h-12 bg-relief-lime text-relief-black rounded-full flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl">2</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">Supply Chain Tracking</h3>
                <p className="text-gray-400 mb-6">
                  Monitor aid items from procurement to final distribution with real-time updates
                </p>
                <Link to="/inventory" className="text-relief-lime font-medium inline-flex items-center group">
                  Learn more <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="bg-relief-black/50 border border-relief-lime/20 p-8 rounded-lg">
                <div className="w-12 h-12 bg-relief-lime text-relief-black rounded-full flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl">3</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">Needs Assessment</h3>
                <p className="text-gray-400 mb-6">
                  AI-powered analysis to determine optimal resource allocation based on real needs
                </p>
                <Link to="/assessment" className="text-relief-lime font-medium inline-flex items-center group">
                  Learn more <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="bg-relief-black/50 border border-relief-lime/20 p-8 rounded-lg">
                <div className="w-12 h-12 bg-relief-lime text-relief-black rounded-full flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl">4</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">Drop Zone Management</h3>
                <p className="text-gray-400 mb-6">
                  Coordinate delivery locations, schedules, and personnel with GPS precision
                </p>
                <Link to="/drop-zones" className="text-relief-lime font-medium inline-flex items-center group">
                  Learn more <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="bg-relief-black/50 border border-relief-lime/20 p-8 rounded-lg">
                <div className="w-12 h-12 bg-relief-lime text-relief-black rounded-full flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl">5</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">Last-Mile Verification</h3>
                <p className="text-gray-400 mb-6">
                  Confirm aid delivery with mobile verification and timestamped distribution receipts
                </p>
                <Link to="/verification" className="text-relief-lime font-medium inline-flex items-center group">
                  Learn more <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="bg-relief-black/50 border border-relief-lime/20 p-8 rounded-lg">
                <div className="w-12 h-12 bg-relief-lime text-relief-black rounded-full flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl">6</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">Transparent Reporting</h3>
                <p className="text-gray-400 mb-6">
                  Generate detailed reports and maintain a transparent audit trail for all stakeholders
                </p>
                <Link to="/reports" className="text-relief-lime font-medium inline-flex items-center group">
                  Learn more <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <ModulesSection />
        <StatsSection />
        
        {/* CTA Section */}
        <section className="py-24 bg-relief-lime">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-relief-black mb-6">
                Ready to Transform Crisis Response?
              </h2>
              <p className="text-xl text-relief-black/80 mb-8">
                Join organizations worldwide that are using ReliefLink to coordinate emergency aid
                more efficiently and transparently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-relief-black text-relief-lime hover:bg-relief-black/90 text-lg py-6 px-8">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-relief-black text-relief-black hover:bg-relief-black hover:text-relief-lime text-lg py-6 px-8">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
