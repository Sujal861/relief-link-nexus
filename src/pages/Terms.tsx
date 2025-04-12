
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-display font-bold mb-8">Terms of Service</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600">Last updated: April 10, 2025</p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the ReliefLink platform, you agree to be bound by these Terms of Service. 
                If you disagree with any part of the terms, you do not have permission to access the platform.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">2. Description of Service</h2>
              <p>
                ReliefLink provides a digital platform for coordination and logistics management during crisis 
                response situations. Our services include but are not limited to inventory management, drop zone 
                coordination, supply chain tracking, and aid distribution reporting.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">3. User Accounts</h2>
              <p>
                To access certain features of the platform, you must register for an account. You agree to provide 
                accurate, current, and complete information during the registration process and to update such 
                information to keep it accurate, current, and complete.
              </p>
              <p className="mt-3">
                You are responsible for safeguarding your password and for all activities that occur under your account. 
                You agree to notify us immediately of any unauthorized use of your account.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">4. User Conduct</h2>
              <p>
                You agree not to:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-4">
                <li>Use the platform in any way that violates any applicable law or regulation</li>
                <li>Impersonate any person or entity or falsely state or misrepresent your affiliation</li>
                <li>Engage in any conduct that restricts or inhibits anyone's use of the platform</li>
                <li>Upload or transmit any viruses, malware, or other malicious code</li>
                <li>Attempt to gain unauthorized access to the platform or user accounts</li>
                <li>Use the platform for any unauthorized advertising or solicitation</li>
                <li>Interfere with the proper working of the platform</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4">5. Intellectual Property</h2>
              <p>
                The platform and its original content, features, and functionality are owned by ReliefLink and 
                are protected by international copyright, trademark, patent, trade secret, and other intellectual 
                property laws.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">6. User-Generated Content</h2>
              <p>
                Users may post, upload, or otherwise make available content through the platform. By providing 
                content, you grant us a non-exclusive, worldwide, royalty-free license to use, copy, modify, 
                and display the content in connection with the operation of the platform.
              </p>
              <p className="mt-3">
                You represent and warrant that you own or have the necessary rights to the content you post 
                and that it will not violate the rights of any third party or any law or regulation.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">7. Limitation of Liability</h2>
              <p>
                In no event shall ReliefLink, its directors, employees, partners, agents, suppliers, or affiliates 
                be liable for any indirect, incidental, special, consequential, or punitive damages, including 
                without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-4">
                <li>Your access to or use of or inability to access or use the platform</li>
                <li>Any conduct or content of any third party on the platform</li>
                <li>Any content obtained from the platform</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
              
              <h2 className="text-xl font-bold mt-8 mb-4">8. Disclaimer</h2>
              <p>
                The platform is provided on an "AS IS" and "AS AVAILABLE" basis. ReliefLink disclaims all 
                warranties of any kind, whether express or implied, including but not limited to the implied 
                warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">9. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the United States, 
                without regard to its conflict of law provisions.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at: legal@relieflink.org
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
