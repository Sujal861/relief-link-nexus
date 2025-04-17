import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockIcon, UserIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would authenticate the user here
    console.log("Login attempt with:", email);
    login(); // Update auth state
    toast.success("Login successful!");
    navigate("/dashboard");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center bg-gray-100 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="bg-relief-lime p-6">
              <h1 className="text-2xl font-display font-bold text-relief-black text-center">
                Log in to ReliefLink
              </h1>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-relief-lime font-medium hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button className="w-full bg-relief-black text-relief-lime hover:bg-relief-black/90" type="submit">
                Log in
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-gray-600">Don't have an account?</span>{" "}
                <a href="/signup" className="text-relief-lime font-medium hover:underline">
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
