import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, LogIn, Building } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ProviderAuthModalProps {
  children: React.ReactNode;
}

const ProviderAuthModal = ({ children }: ProviderAuthModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  // Login form state  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  const { signUp, signIn, loading } = useAuth();
  const navigate = useNavigate();
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      return;
    }
    
    const { error } = await signUp(signupData.email, signupData.password, {
      display_name: signupData.contactPerson,
      business_name: signupData.businessName,
      user_role: "provider"
    });
    
    if (!error) {
      setIsOpen(false);
      setSignupData({ businessName: "", contactPerson: "", email: "", password: "", confirmPassword: "" });
      navigate('/provider-dashboard');
    }
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await signIn(loginData.email, loginData.password);
    
    if (!error) {
      setIsOpen(false);
      setLoginData({ email: "", password: "" });
      navigate('/provider-dashboard');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        asChild 
        onClick={() => {
          const buttonText = (children as any)?.props?.children;
          if (typeof buttonText === 'string' && buttonText.toLowerCase().includes('login')) {
            setActiveTab("login");
          } else {
            setActiveTab("signup");
          }
        }}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0">
        <Tabs value={activeTab} onValueChange={(value: "signup" | "login") => setActiveTab(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none">
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Register as Provider
            </TabsTrigger>
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Provider Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="p-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-1 pb-4 bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <Building className="w-6 h-6 text-primary" />
                  Join as Service Provider
                </CardTitle>
                <CardDescription className="text-center">
                  Start offering your services to pilgrims and travelers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input 
                      id="businessName" 
                      placeholder="e.g., Kedarnath Travel Services"
                      value={signupData.businessName}
                      onChange={(e) => setSignupData({...signupData, businessName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input 
                      id="contactPerson" 
                      placeholder="Your full name"
                      value={signupData.contactPerson}
                      onChange={(e) => setSignupData({...signupData, contactPerson: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="providerEmail">Business Email *</Label>
                    <Input 
                      id="providerEmail" 
                      type="email" 
                      placeholder="business@example.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="providerPassword">Password *</Label>
                    <Input 
                      id="providerPassword" 
                      type="password" 
                      placeholder="Create a strong password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="providerConfirmPassword">Confirm Password *</Label>
                    <Input 
                      id="providerConfirmPassword" 
                      type="password" 
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <strong>Provider Benefits:</strong> List your services, manage bookings, 
                      connect with travelers, and grow your business with our trusted platform.
                    </p>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full" 
                    variant="hero"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Creating Provider Account..." : "Register as Provider"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="login" className="p-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-1 pb-4 bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <Building className="w-6 h-6 text-primary" />
                  Provider Login
                </CardTitle>
                <CardDescription className="text-center">
                  Access your provider dashboard and manage your services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="providerLoginEmail">Provider Email</Label>
                    <Input 
                      id="providerLoginEmail" 
                      type="email" 
                      placeholder="Your business email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="providerLoginPassword">Password</Label>
                    <Input 
                      id="providerLoginPassword" 
                      type="password" 
                      placeholder="Your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full" 
                    variant="hero"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Login to Provider Dashboard"}
                  </Button>
                </form>
                
                <p className="text-center text-sm text-muted-foreground">
                  New provider? Switch to Register tab to get started
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProviderAuthModal;