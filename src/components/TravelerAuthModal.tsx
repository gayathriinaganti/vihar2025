import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, LogIn, User, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface TravelerAuthModalProps {
  children: React.ReactNode;
}

const TravelerAuthModal = ({ children }: TravelerAuthModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
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
  const { toast } = useToast();
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Please make sure both passwords match.",
      });
      return;
    }

    if (signupData.password.length < 6) {
      toast({
        variant: "destructive", 
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }
    
    const { error } = await signUp(signupData.email, signupData.password, {
      display_name: signupData.fullName,
      phone: signupData.phone,
      state: signupData.state,
      user_role: "traveler"
    });
    
    if (!error) {
      setIsOpen(false);
      setSignupData({ fullName: "", email: "", phone: "", state: "", password: "", confirmPassword: "" });
      toast({
        title: "Account Created!",
        description: "Welcome to Vihar! Your traveler account has been created successfully.",
      });
      navigate('/traveler-dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await signIn(loginData.email, loginData.password);
    
    if (!error) {
      setIsOpen(false);
      setLoginData({ email: "", password: "" });
      navigate('/traveler-dashboard');
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
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-0">
        <Tabs value={activeTab} onValueChange={(value: "signup" | "login") => setActiveTab(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none">
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Join as Traveler
            </TabsTrigger>
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Traveler Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="p-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-1 pb-4 bg-gradient-to-r from-spiritual/5 to-primary/5">
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <Heart className="w-6 h-6 text-spiritual" />
                  Begin Your Journey
                </CardTitle>
                <CardDescription className="text-center">
                  Discover spiritual destinations and authentic travel experiences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelerFullName">Full Name *</Label>
                    <Input 
                      id="travelerFullName"
                      placeholder="Enter your full name"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelerEmail">Email Address *</Label>
                    <Input 
                      id="travelerEmail"
                      type="email" 
                      placeholder="your.email@example.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelerPhone">Phone Number</Label>
                    <Input 
                      id="travelerPhone"
                      type="tel" 
                      placeholder="+91 98765 43210"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelerState">State *</Label>
                    <Select 
                      value={signupData.state} 
                      onValueChange={(value) => setSignupData({...signupData, state: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelerPassword">Password *</Label>
                    <Input 
                      id="travelerPassword"
                      type="password" 
                      placeholder="Create a secure password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelerConfirmPassword">Confirm Password *</Label>
                    <Input 
                      id="travelerConfirmPassword"
                      type="password" 
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="bg-spiritual/10 p-4 rounded-lg border border-spiritual/20 mb-4">
                    <p className="text-xs text-muted-foreground">
                      <strong>🕉️ Traveler Benefits:</strong> Discover sacred temples, book authentic experiences, 
                      connect with verified guides, and create meaningful spiritual journeys.
                    </p>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full mt-6 mb-4" 
                    variant="spiritual"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Creating Traveler Account..." : "Start Your Journey"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="login" className="p-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-1 pb-4 bg-gradient-to-r from-spiritual/5 to-primary/5">
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <User className="w-6 h-6 text-spiritual" />
                  Welcome Back, Traveler
                </CardTitle>
                <CardDescription className="text-center">
                  Continue your spiritual journey and discover new destinations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelerLoginEmail">Email Address</Label>
                    <Input 
                      id="travelerLoginEmail"
                      type="email" 
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelerLoginPassword">Password</Label>
                    <Input 
                      id="travelerLoginPassword"
                      type="password" 
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full" 
                    variant="spiritual"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Continue Your Journey"}
                  </Button>
                </form>
                
                <p className="text-center text-sm text-muted-foreground">
                  New to spiritual travel? Switch to Join tab to create account
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TravelerAuthModal;