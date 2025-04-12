
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const Privacy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-display font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600">Last updated: April 10, 2025</p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to ReliefLink's Privacy Policy. This policy explains how we collect, use, disclose, 
                and safeguard your information when you use our platform. Please read this privacy policy carefully. 
                If you do not agree with the terms of this privacy policy, please do not access the platform.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">2. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-4">
                <li>Register for an account</li>
                <li>Use interactive features of our platform</li>
                <li>Fill out forms</li>
                <li>Request customer support</li>
                <li>Otherwise communicate with us</li>
              </ul>
              <p>
                This information may include your name, email address, phone number, organization, role, 
                and any other information you choose to provide.
              </p>
              
              <h3 className="text-lg font-bold mt-6 mb-3">Information Collected Automatically</h3>
              <p>
                When you access or use our platform, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-4">
                <li>Log information (e.g., access times, pages viewed, IP address)</li>
                <li>Device information (e.g., hardware model, operating system)</li>
                <li>Location information when you use location-based features</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-4">
                <li>Provide, maintain, and improve our platform</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our platform</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize your experience on our platform</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4">4. Sharing of Information</h2>
              <p>
                We may share the information we collect as follows:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-4">
                <li>With service providers who perform services on our behalf</li>
                <li>With partner organizations to facilitate coordination during crisis response</li>
                <li>In response to a request for information if we believe disclosure is in accordance with applicable law</li>
                <li>If we believe your actions are inconsistent with our user agreements or policies</li>
                <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4">5. Data Security</h2>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse, 
                unauthorized access, disclosure, alteration, and destruction. However, no data transmission 
                over the Internet or storage system can be guaranteed to be 100% secure.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">6. Your Choices</h2>
              <p>
                You can access and update certain information about yourself by logging into your account. 
                You can also request that we delete your account by contacting us at privacy@relieflink.org.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">7. Changes to this Policy</h2>
              <p>
                We may change this privacy policy from time to time. If we make changes, we will notify you 
                by revising the date at the top of the policy and, in some cases, we may provide you with 
                additional notice.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">8. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy, please contact us at: privacy@relieflink.org
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
