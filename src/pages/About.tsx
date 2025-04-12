
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-relief-black text-white py-20">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-relief-lime heading-xl mb-6">ABOUT RELIEFLINK</h1>
              <p className="text-xl text-gray-300 mb-8">
                A comprehensive digital logistics and coordination system designed to streamline
                emergency aid distribution in crisis situations.
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold text-relief-black mb-6">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  ReliefLink was founded with a clear mission: to transform how emergency aid is coordinated
                  and delivered during crisis situations by providing a comprehensive digital solution that
                  connects all stakeholders in the aid ecosystem.
                </p>
                <p className="text-gray-700 mb-4">
                  We believe that through better coordination, real-time data sharing, and transparent
                  tracking, we can dramatically improve the efficiency and effectiveness of humanitarian
                  aid distribution, ultimately helping more people in need.
                </p>
                <p className="text-gray-700">
                  Our platform serves as a bridge between aid organizations, government agencies, donors,
                  and affected communities, ensuring that the right resources reach the right people at
                  the right time.
                </p>
              </div>
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                <p className="text-gray-500">Mission image placeholder</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values section */}
        <section className="py-16 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-display font-bold text-relief-black mb-12 text-center">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-relief-lime text-relief-black rounded-full flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-4">Transparency</h3>
                <p className="text-gray-600">
                  We believe in complete visibility throughout the aid supply chain, from donation to
                  distribution, building trust among all stakeholders.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-relief-lime text-relief-black rounded-full flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-4">Efficiency</h3>
                <p className="text-gray-600">
                  Our technology streamlines logistics and coordination to maximize the impact of
                  limited resources during crisis situations.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-relief-lime text-relief-black rounded-full flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-4">Collaboration</h3>
                <p className="text-gray-600">
                  We foster cooperation between organizations, agencies, and communities to create
                  a unified response to humanitarian crises.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-relief-lime text-relief-black rounded-full flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-4">Innovation</h3>
                <p className="text-gray-600">
                  We continuously develop new tools and approaches to solve complex challenges in
                  humanitarian logistics and aid distribution.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-relief-lime text-relief-black rounded-full flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl">5</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-4">Accountability</h3>
                <p className="text-gray-600">
                  We ensure that all resources can be tracked and accounted for, providing donors and
                  recipients with confidence in the aid delivery process.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-relief-lime text-relief-black rounded-full flex items-center justify-center mb-6">
                  <span className="font-display font-bold text-xl">6</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-4">Empowerment</h3>
                <p className="text-gray-600">
                  We design our platform to empower local communities and first responders with the
                  tools and information they need to coordinate effectively.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-display font-bold text-relief-black mb-12 text-center">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4"></div>
                <h3 className="font-display font-bold">Sarah Johnson</h3>
                <p className="text-gray-600 text-sm">CEO & Founder</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4"></div>
                <h3 className="font-display font-bold">Michael Chen</h3>
                <p className="text-gray-600 text-sm">CTO</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4"></div>
                <h3 className="font-display font-bold">Elena Rodriguez</h3>
                <p className="text-gray-600 text-sm">Head of Operations</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4"></div>
                <h3 className="font-display font-bold">David Okafor</h3>
                <p className="text-gray-600 text-sm">Lead Product Designer</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to action */}
        <section className="py-24 bg-relief-lime">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-relief-black mb-6">
                Join Our Mission
              </h2>
              <p className="text-xl text-relief-black/80 mb-8">
                Be part of transforming how humanitarian aid is delivered during crisis situations.
                Together, we can make a real difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-relief-black text-relief-lime hover:bg-relief-black/90 text-lg py-6 px-8">
                  <Link to="/signup">Join ReliefLink</Link>
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

export default About;
