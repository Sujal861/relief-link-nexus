
import { useState } from "react";
import { 
  Building,
  Heart, 
  Info, 
  List, 
  Search, 
  UserPlus, 
  UserCog, 
  PenLine, 
  Database, 
  LogIn, 
  Plus, 
  Check, 
  ChevronDown, 
  ChevronUp,
  DollarSign,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as StellarSdk from 'stellar-sdk';

export const DonationsTab = () => {
  const { toast } = useToast();
  const [userRole, setUserRole] = useState("donor"); // donor, staff, charity, admin
  const [showRegisterCharity, setShowRegisterCharity] = useState(false);
  const [showFoundations, setShowFoundations] = useState(true);
  const [showDonations, setShowDonations] = useState(true);
  const [showPendingRegistrations, setShowPendingRegistrations] = useState(true);
  
  // State for donation modal
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedFoundation, setSelectedFoundation] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");
  const [stellarPublicKey, setStellarPublicKey] = useState<string>("");
  const [stellarPaymentStatus, setStellarPaymentStatus] = useState<string>("");
  const [showStellarInfo, setShowStellarInfo] = useState<boolean>(false);
  
  // Mock data for foundations
  const foundations = [
    { id: 1, name: "Red Cross Relief", description: "International humanitarian aid organization", approved: true },
    { id: 2, name: "Global Children Fund", description: "Supporting children in crisis zones", approved: true },
    { id: 3, name: "Disaster Response Network", description: "Emergency response for natural disasters", approved: true },
    { id: 4, name: "Water for All", description: "Clean water initiatives in affected regions", approved: false }
  ];
  
  // Mock data for donations
  const donations = [
    { id: 1, foundation: "Red Cross Relief", amount: 500, date: "2025-04-10", donor: "Anonymous", method: "Credit Card" },
    { id: 2, foundation: "Global Children Fund", amount: 1200, date: "2025-04-08", donor: "John Smith", method: "Stellar" },
    { id: 3, foundation: "Disaster Response Network", amount: 750, date: "2025-04-05", donor: "Corporate Partner", method: "Credit Card" },
  ];
  
  // Mock data for pending registrations
  const pendingRegistrations = [
    { id: 1, name: "Rebuild Together", description: "Housing support for displaced families", contact: "info@rebuild.org" },
    { id: 2, name: "Medical Aid Society", description: "Medical supplies and support", contact: "contact@medaid.org" },
  ];

  // Handle opening donation modal
  const handleOpenDonationModal = (foundationId?: number) => {
    if (foundationId) {
      setSelectedFoundation(foundationId.toString());
    }
    setIsDonationModalOpen(true);
  };

  // Handle form submissions
  const handleRegisterCharity = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Submitted",
      description: "Your charity registration has been submitted for approval.",
    });
    setShowRegisterCharity(false);
  };

  // Process Stellar payment
  const processStellarPayment = async () => {
    if (!stellarPublicKey || !donationAmount || parseFloat(donationAmount) <= 0) {
      toast({
        title: "Invalid Details",
        description: "Please enter a valid Stellar address and donation amount.",
        variant: "destructive"
      });
      return;
    }

    // Set processing state
    setStellarPaymentStatus("processing");

    try {
      // Simulate Stellar payment processing
      setTimeout(() => {
        setStellarPaymentStatus("success");
        
        toast({
          title: "Stellar Payment Successful",
          description: `Thank you for your XLM donation! Transaction complete.`,
          children: (
            <div className="flex items-center mt-2">
              <img src="https://stellar.org/favicon.ico" alt="Stellar" className="h-4 w-4 mr-2" />
              <span>Payment confirmed on Stellar network</span>
            </div>
          )
        });
        
        setIsDonationModalOpen(false);
        setStellarPublicKey("");
        setDonationAmount("");
        setSelectedFoundation(null);
        setStellarPaymentStatus("");
      }, 2000);
    } catch (error) {
      setStellarPaymentStatus("failed");
      toast({
        title: "Payment Failed",
        description: "There was an error processing your Stellar payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleMakeDonation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive"
      });
      return;
    }
    
    if (paymentMethod === "stellar") {
      processStellarPayment();
      return;
    }
    
    // Default credit card payment flow
    toast({
      title: "Donation Successful",
      description: `Thank you for your generous contribution of $${donationAmount}!`,
      children: (
        <div className="flex items-center mt-2">
          <DollarSign className="h-4 w-4 text-green-500 mr-2" />
          <span>Your donation has been processed</span>
        </div>
      )
    });
    
    setIsDonationModalOpen(false);
    setDonationAmount("");
    setSelectedFoundation(null);
  };
  
  const handleApproveRegistration = (id: number) => {
    toast({
      title: "Registration Approved",
      description: "The charity foundation has been approved and notified.",
    });
  };
  
  const handlePublishNews = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "News Published",
      description: "Your update has been published to all donors and partners.",
    });
  };
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your organization's profile has been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Online Donation System</h2>
          <p className="text-muted-foreground">
            Connect donors with humanitarian foundations in crisis zones.
          </p>
        </div>
        
        {/* User Role Selector */}
        <Select value={userRole} onValueChange={setUserRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="donor">Donor View</SelectItem>
            <SelectItem value="charity">Charity Foundation</SelectItem>
            <SelectItem value="staff">Staff View</SelectItem>
            <SelectItem value="admin">Admin View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Donor View */}
      {userRole === "donor" && (
        <div className="space-y-6">
          {/* List of Foundations */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center">
                <Building className="mr-2" /> Available Foundations
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowFoundations(!showFoundations)}
              >
                {showFoundations ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            
            {showFoundations && (
              <div className="grid gap-4 md:grid-cols-2">
                {foundations.filter(f => f.approved).map((foundation) => (
                  <Card key={foundation.id}>
                    <CardHeader>
                      <CardTitle>{foundation.name}</CardTitle>
                      <CardDescription>{foundation.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        onClick={() => handleOpenDonationModal(foundation.id)}
                      >
                        <Heart className="mr-2" /> Donate Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Make Donation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2" /> Make a Donation
              </CardTitle>
              <CardDescription>
                Support humanitarian efforts with your contribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMakeDonation} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="foundation">Select Foundation</label>
                  <Select defaultValue="1" onValueChange={setSelectedFoundation}>
                    <SelectTrigger id="foundation">
                      <SelectValue placeholder="Select Foundation" />
                    </SelectTrigger>
                    <SelectContent>
                      {foundations.filter(f => f.approved).map((foundation) => (
                        <SelectItem key={foundation.id} value={foundation.id.toString()}>
                          {foundation.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="amount">Donation Amount ($)</label>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="0.00" 
                    min="5" 
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>
                
                {/* Payment Method Selection */}
                <div className="space-y-2">
                  <label>Payment Method</label>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <label htmlFor="credit-card" className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Credit Card
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="stellar" id="stellar" />
                      <label htmlFor="stellar" className="flex items-center">
                        <img src="https://stellar.org/favicon.ico" alt="Stellar" className="h-4 w-4 mr-2" />
                        Stellar (XLM)
                      </label>
                    </div>
                  </RadioGroup>
                </div>
                
                {/* Conditional Stellar Address field */}
                {paymentMethod === 'stellar' && (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <label htmlFor="stellar-address">Stellar Public Key</label>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="ml-2 h-6 w-6 p-0" 
                        onClick={() => setShowStellarInfo(!showStellarInfo)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    {showStellarInfo && (
                      <div className="text-sm text-muted-foreground bg-gray-50 p-2 rounded-md">
                        Enter your Stellar public key to make a donation with Stellar Lumens (XLM). 
                        The donation will be processed on the Stellar network.
                      </div>
                    )}
                    <Input 
                      id="stellar-address" 
                      placeholder="G..." 
                      value={stellarPublicKey}
                      onChange={(e) => setStellarPublicKey(e.target.value)}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="name">Your Name (Optional)</label>
                  <Input id="name" placeholder="Anonymous" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message">Message (Optional)</label>
                  <Textarea id="message" placeholder="Add a personal message..." />
                </div>
                
                <Button type="submit" className="w-full">Confirm Donation</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Charity Foundation View */}
      {userRole === "charity" && (
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile Management</TabsTrigger>
            <TabsTrigger value="news">Publish News</TabsTrigger>
            <TabsTrigger value="donations">Received Donations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCog className="mr-2" /> Update Profile
                </CardTitle>
                <CardDescription>
                  Manage your foundation's profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="org-name">Foundation Name</label>
                    <Input id="org-name" defaultValue="Red Cross Relief" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="org-description">Description</label>
                    <Textarea 
                      id="org-description" 
                      defaultValue="International humanitarian aid organization" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="org-contact">Contact Email</label>
                    <Input id="org-contact" type="email" defaultValue="contact@redcross.org" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="org-website">Website</label>
                    <Input id="org-website" defaultValue="https://www.redcross.org" />
                  </div>
                  
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="news" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PenLine className="mr-2" /> Publish News
                </CardTitle>
                <CardDescription>
                  Keep donors updated about your activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePublishNews} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="news-title">Title</label>
                    <Input id="news-title" placeholder="New relief operation launched" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="news-content">Content</label>
                    <Textarea 
                      id="news-content" 
                      placeholder="Describe your foundation's latest activities..."
                      className="min-h-[150px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="news-image">Image (Optional)</label>
                    <Input id="news-image" type="file" />
                  </div>
                  
                  <Button type="submit">Publish Update</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="donations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2" /> Received Donations
                </CardTitle>
                <CardDescription>
                  Track all donations made to your foundation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">2025-04-10</td>
                        <td className="px-6 py-4 whitespace-nowrap">$500.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">Anonymous</td>
                        <td className="px-6 py-4 whitespace-nowrap">Credit Card</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Received
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">2025-04-08</td>
                        <td className="px-6 py-4 whitespace-nowrap">$1,200.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">John Smith</td>
                        <td className="px-6 py-4 whitespace-nowrap">Stellar</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Received
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">2025-04-05</td>
                        <td className="px-6 py-4 whitespace-nowrap">$750.00</td>
                        <td className="px-6 py-4 whitespace-nowrap">Corporate Partner</td>
                        <td className="px-6 py-4 whitespace-nowrap">Credit Card</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Received
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      {/* Staff View */}
      {userRole === "staff" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2" /> Manage Foundations
              </CardTitle>
              <CardDescription>
                Oversee registered charity foundations and their activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {foundations.map((foundation) => (
                      <tr key={foundation.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{foundation.name}</td>
                        <td className="px-6 py-4">{foundation.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {foundation.approved ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button variant="outline" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PenLine className="mr-2" /> Publish News
              </CardTitle>
              <CardDescription>
                Post system-wide updates and announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePublishNews} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="news-title-staff">Title</label>
                  <Input id="news-title-staff" placeholder="System update announcement" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="news-content-staff">Content</label>
                  <Textarea 
                    id="news-content-staff" 
                    placeholder="Share important information with all system users..."
                    className="min-h-[150px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <label>Visibility</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="donors">Donors Only</SelectItem>
                      <SelectItem value="charities">Charities Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit">Publish Announcement</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Admin View */}
      {userRole === "admin" && (
        <div className="space-y-6">
          {/* Pending Registrations */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center">
                <UserPlus className="mr-2" /> Pending Foundation Registrations
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowPendingRegistrations(!showPendingRegistrations)}
              >
                {showPendingRegistrations ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            
            {showPendingRegistrations && pendingRegistrations.length > 0 ? (
              <div className="space-y-4">
                {pendingRegistrations.map((registration) => (
                  <Card key={registration.id}>
                    <CardHeader>
                      <CardTitle>{registration.name}</CardTitle>
                      <CardDescription>{registration.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Contact: {registration.contact}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline">Reject</Button>
                      <Button onClick={() => handleApproveRegistration(registration.id)}>
                        <Check className="mr-2" /> Approve
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : showPendingRegistrations ? (
              <Card>
                <CardContent className="py-4">
                  <p className="text-center text-muted-foreground">No pending registrations</p>
                </CardContent>
              </Card>
            ) : null}
          </div>
          
          {/* List Foundations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2" /> Manage All Foundations
              </CardTitle>
              <CardDescription>
                Complete administrative control over registered foundations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {foundations.map((foundation) => (
                      <tr key={foundation.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{foundation.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{foundation.name}</td>
                        <td className="px-6 py-4">{foundation.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {foundation.approved ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Suspend</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Donations Overview */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center">
                <Heart className="mr-2" /> Donations Overview
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowDonations(!showDonations)}
              >
                {showDonations ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            
            {showDonations && (
              <Card>
                <CardContent className="py-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foundation</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {donations.map((donation) => (
                          <tr key={donation.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{donation.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{donation.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{donation.foundation}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${donation.amount.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{donation.method}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{donation.donor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
      
      {/* Register Charity UI (All users can see this, but only Charity would use it) */}
      {!showRegisterCharity ? (
        <div className="mt-6">
          <Button 
            variant="outline" 
            onClick={() => setShowRegisterCharity(true)}
            className="flex items-center"
          >
            <Plus className="mr-2" size={16} />
            Register a New Charity Foundation
          </Button>
        </div>
      ) : (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2" /> Register New Charity Foundation
            </CardTitle>
            <CardDescription>
              Submit your organization for approval in our donation platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegisterCharity} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="charity-name">Foundation Name</label>
                <Input id="charity-name" placeholder="Enter foundation name" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="charity-description">Description</label>
                <Textarea 
                  id="charity-description" 
                  placeholder="Describe your foundation's mission and activities"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="charity-contact">Contact Email</label>
                <Input id="charity-contact" type="email" placeholder="contact@example.org" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="charity-website">Website (Optional)</label>
                <Input id="charity-website" placeholder="https://www.example.org" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="charity-docs">Documentation (Optional)</label>
                <Input id="charity-docs" type="file" />
                <p className="text-xs text-muted-foreground mt-1">
                  Upload your registration certificate or other verification documents
                </p>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setShowRegisterCharity(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Registration</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Donation Modal */}
      <Dialog open={isDonationModalOpen} onOpenChange={setIsDonationModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make a Donation</DialogTitle>
            <DialogDescription>
              Your contribution helps provide essential relief to those in need.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleMakeDonation} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="modal-foundation">Select Foundation</label>
              <Select 
                value={selectedFoundation || undefined} 
                onValueChange={setSelectedFoundation}
              >
                <SelectTrigger id="modal-foundation">
                  <SelectValue placeholder="Select Foundation" />
                </SelectTrigger>
                <SelectContent>
                  {foundations.filter(f => f.approved).map((foundation) => (
                    <SelectItem key={foundation.id} value={foundation.id.toString()}>
                      {foundation.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="modal-amount">Donation Amount ($)</label>
              <Input 
                id="modal-amount" 
                type="number" 
                placeholder="0.00" 
                min="5" 
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                required
              />
            </div>
            
            {/* Payment Method Selection */}
            <div className="space-y-2">
              <label>Payment Method</label>
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="modal-credit-card" />
                  <label htmlFor="modal-credit-card" className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Credit Card
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stellar" id="modal-stellar" />
                  <label htmlFor="modal-stellar" className="flex items-center">
                    <img src="https://stellar.org/favicon.ico" alt="Stellar" className="h-4 w-4 mr-2" />
                    Stellar (XLM)
                  </label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Conditional Stellar Address field */}
            {paymentMethod === 'stellar' && (
              <div className="space-y-2">
                <div className="flex items-center">
                  <label htmlFor="modal-stellar-address">Stellar Public Key</label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 h-6 w-6 p-0" 
                    onClick={() => setShowStellarInfo(!showStellarInfo)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
                {showStellarInfo && (
                  <div className="text-sm text-muted-foreground bg-gray-50 p-2 rounded-md">
                    Enter your Stellar public key to make a donation with Stellar Lumens (XLM). 
                    The donation will be processed on the Stellar network.
                  </div>
                )}
                <Input 
                  id="modal-stellar-address" 
                  placeholder="G..." 
                  value={stellarPublicKey}
                  onChange={(e) => setStellarPublicKey(e.target.value)}
                />
                {stellarPaymentStatus === "processing" && (
                  <div className="flex items-center justify-center p-2">
                    <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                    <span>Processing payment on Stellar network...</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="modal-name">Your Name (Optional)</label>
              <Input id="modal-name" placeholder="Anonymous" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="modal-message">Message (Optional)</label>
              <Textarea id="modal-message" placeholder="Add a personal message..." />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDonationModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-relief-lime text-relief-black hover:bg-relief-lime/90">
                {paymentMethod === 'stellar' ? (
                  <>
                    <img src="https://stellar.org/favicon.ico" alt="Stellar" className="h-4 w-4 mr-2" />
                    Donate with Stellar
                  </>
                ) : (
                  <>
                    <DollarSign className="mr-2" size={16} /> Confirm Donation
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
