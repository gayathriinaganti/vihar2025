import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserPlus, LogIn, User, Building } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AuthModalProps {
  children: React.ReactNode;
}

const AuthModal = ({ children }: AuthModalProps) => {
  const [userRole, setUserRole] = useState<"provider" | "traveler">("traveler");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"signup" | "login">("signup");
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    username: "",
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
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      return;
    }
    
    const { error } = await signUp(signupData.email, signupData.password, {
      display_name: signupData.username,
      user_role: userRole
    });
    
    if (!error) {
      setIsOpen(false);
      setSignupData({ username: "", email: "", password: "", confirmPassword: "" });
    }
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await signIn(loginData.email, loginData.password);
    
    if (!error) {
      setIsOpen(false);
      setLoginData({ email: "", password: "" });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        asChild 
        onClick={() => {
          // Check button text to determine which tab to show
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
              Sign Up
            </TabsTrigger>
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="p-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl text-center">Create Account</CardTitle>
                <CardDescription className="text-center">
                  Choose your role and join our community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">I want to join as:</Label>
                  <RadioGroup
                    value={userRole}
                    onValueChange={(value: "provider" | "traveler") => setUserRole(value)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="provider" id="provider" />
                      <Label htmlFor="provider" className="flex items-center gap-2 cursor-pointer">
                        <Building className="w-4 h-4 text-accent" />
                        Provider
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="traveler" id="traveler" />
                      <Label htmlFor="traveler" className="flex items-center gap-2 cursor-pointer">
                        <User className="w-4 h-4 text-primary" />
                        Traveler
                      </Label>
                    </div>
                  </RadioGroup>
                  <p className="text-xs text-muted-foreground">
                    {userRole === "provider" 
                      ? "Offer services like accommodation, food, tours, and guides"
                      : "Discover and book spiritual journeys and travel experiences"
                    }
                  </p>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      placeholder="Enter your username"
                      value={signupData.username}
                      onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Create a password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full" 
                    variant={userRole === "provider" ? "hero" : "spiritual"}
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : `Create ${userRole === "provider" ? "Provider" : "Traveler"} Account`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="login" className="p-0">
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center">
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail">Email</Label>
                    <Input 
                      id="loginEmail" 
                      type="email" 
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword">Password</Label>
                    <Input 
                      id="loginPassword" 
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
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
                
                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account? Switch to Sign Up tab
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;