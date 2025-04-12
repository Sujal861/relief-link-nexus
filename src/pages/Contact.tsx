
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, we would send this data to a backend API
    console.log("Contact form submitted:", { name, email, subject, message });
    
    // Show success message
    toast.success("Your message has been sent. We'll respond shortly!");
    
    // Reset the form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-relief-black text-white py-20">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-relief-lime heading-xl mb-6">CONTACT US</h1>
              <p className="text-xl text-gray-300">
                Have questions or want to learn more about ReliefLink? Get in touch with our team.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact form and info */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-display font-bold text-relief-black mb-6">Get in Touch</h2>
                <p className="text-gray-700 mb-8">
                  Whether you have questions about our platform, want to partner with us, or need assistance,
                  our team is here to help. Fill out the form or use one of our contact methods below.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 bg-relief-lime text-relief-black p-3 rounded-full">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold mb-1">Headquarters</h3>
                      <p className="text-gray-600">
                        123 Relief Center Street<br />
                        San Francisco, CA 94103<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 bg-relief-lime text-relief-black p-3 rounded-full">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold mb-1">Email</h3>
                      <p className="text-gray-600">
                        General Inquiries: info@relieflink.org<br />
                        Support: support@relieflink.org<br />
                        Partnerships: partners@relieflink.org
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 bg-relief-lime text-relief-black p-3 rounded-full">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold mb-1">Phone</h3>
                      <p className="text-gray-600">
                        Main: +1 (555) 123-4567<br />
                        Support: +1 (555) 987-6543<br />
                        Emergency: +1 (555) 789-0123
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="font-display font-bold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-relief-black text-relief-lime p-3 rounded-full hover:bg-relief-black/80 transition-colors">
                      Twitter
                    </a>
                    <a href="#" className="bg-relief-black text-relief-lime p-3 rounded-full hover:bg-relief-black/80 transition-colors">
                      LinkedIn
                    </a>
                    <a href="#" className="bg-relief-black text-relief-lime p-3 rounded-full hover:bg-relief-black/80 transition-colors">
                      Facebook
                    </a>
                    <a href="#" className="bg-relief-black text-relief-lime p-3 rounded-full hover:bg-relief-black/80 transition-colors">
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-display font-bold text-relief-black mb-6">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject} required>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general_inquiry">General Inquiry</SelectItem>
                        <SelectItem value="technical_support">Technical Support</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="feature_request">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-relief-black text-relief-lime hover:bg-relief-black/90"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-16 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-display font-bold text-relief-black mb-8 text-center">Visit Our Office</h2>
            <div className="bg-gray-300 rounded-lg aspect-video flex items-center justify-center">
              <p className="text-gray-600">Interactive map would be displayed here</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
