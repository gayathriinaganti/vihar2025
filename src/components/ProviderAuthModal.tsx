import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, LogIn, Building, Upload, FileText, Camera, Award } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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
    state: "",
    password: "",
    confirmPassword: ""
  });

  // Document upload state
  const [documents, setDocuments] = useState<{
    businessLicense: File | null;
    idProof: File | null;
    serviceCertificate: File | null;
    businessPhoto: File | null;
  }>({
    businessLicense: null,
    idProof: null,
    serviceCertificate: null,
    businessPhoto: null
  });
  
  // Login form state  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  const { signUp, signIn, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleFileChange = (type: keyof typeof documents, file: File | null) => {
    if (file && file.size > 10 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: "File size must be less than 10MB.",
      });
      return;
    }
    setDocuments(prev => ({ ...prev, [type]: file }));
  };

  const uploadDocument = async (file: File, userId: string, providerId: string, documentType: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${documentType}_${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('provider-documents')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('provider-documents')
      .getPublicUrl(fileName);

    await supabase.from('provider_documents').insert({
      provider_id: providerId,
      document_type: documentType,
      file_url: publicUrl,
      file_name: file.name,
      file_size: file.size
    });
  };

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

    // Validate required documents
    if (!documents.businessLicense || !documents.idProof) {
      toast({
        variant: "destructive",
        title: "Missing Documents",
        description: "Business License and ID Proof are required for verification.",
      });
      return;
    }
    
    const { error } = await signUp(signupData.email, signupData.password, {
      display_name: signupData.contactPerson,
      business_name: signupData.businessName,
      state: signupData.state,
      user_role: "provider"
    });
    
    if (!error) {
      try {
        // Get the user session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) throw new Error("No user session");

        // Get provider ID
        const { data: provider } = await supabase
          .from('providers')
          .select('id')
          .eq('user_id', session.user.id)
          .single();

        if (!provider) throw new Error("Provider profile not created");

        // Upload documents
        const uploadPromises = [];
        
        if (documents.businessLicense) {
          uploadPromises.push(uploadDocument(documents.businessLicense, session.user.id, provider.id, 'business_license'));
        }
        if (documents.idProof) {
          uploadPromises.push(uploadDocument(documents.idProof, session.user.id, provider.id, 'id_proof'));
        }
        if (documents.serviceCertificate) {
          uploadPromises.push(uploadDocument(documents.serviceCertificate, session.user.id, provider.id, 'service_certificate'));
        }
        if (documents.businessPhoto) {
          uploadPromises.push(uploadDocument(documents.businessPhoto, session.user.id, provider.id, 'business_photo'));
        }

        await Promise.all(uploadPromises);

        setIsOpen(false);
        setSignupData({ businessName: "", contactPerson: "", email: "", state: "", password: "", confirmPassword: "" });
        setDocuments({ businessLicense: null, idProof: null, serviceCertificate: null, businessPhoto: null });
        
        toast({
          title: "Account Created!",
          description: "Your documents have been uploaded for verification. You'll be notified once approved.",
        });
        navigate('/provider-dashboard');
      } catch (uploadError: any) {
        toast({
          variant: "destructive",
          title: "Document Upload Failed",
          description: uploadError.message || "Failed to upload verification documents.",
        });
      }
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
      toast({
        title: "Welcome back!",
        description: "Successfully signed in to your provider dashboard.",
      });
      navigate('/provider-dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
      });
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
        <DialogTitle className="sr-only">Provider Authentication</DialogTitle>
        <DialogDescription className="sr-only">
          Register as a service provider or login to your existing provider account
        </DialogDescription>
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
              <CardHeader className="space-y-1 pb-4 bg-gradient-to-r from-spiritual/5 to-primary/5">
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <Building className="w-6 h-6 text-spiritual" />
                  Begin Your Business Journey
                </CardTitle>
                <CardDescription className="text-center">
                  Discover spiritual destinations and authentic travel experiences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input 
                      id="businessName" 
                      placeholder="Enter your business name"
                      value={signupData.businessName}
                      onChange={(e) => setSignupData({...signupData, businessName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input 
                      id="contactPerson" 
                      placeholder="Enter your full name"
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
                      placeholder="your.email@example.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="providerState">State *</Label>
                    <Select 
                      value={signupData.state} 
                      onValueChange={(value) => setSignupData({...signupData, state: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent className="z-[100]" position="popper" sideOffset={4}>
                        <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                        <SelectItem value="Karnataka">Karnataka</SelectItem>
                        <SelectItem value="Kerala">Kerala</SelectItem>
                        <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="Gujarat">Gujarat</SelectItem>
                        <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                        <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                        <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                        <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="West Bengal">West Bengal</SelectItem>
                        <SelectItem value="Odisha">Odisha</SelectItem>
                        <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                        <SelectItem value="Bihar">Bihar</SelectItem>
                        <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                        <SelectItem value="Assam">Assam</SelectItem>
                        <SelectItem value="Punjab">Punjab</SelectItem>
                        <SelectItem value="Haryana">Haryana</SelectItem>
                        <SelectItem value="Jammu & Kashmir">Jammu & Kashmir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="providerPassword">Password *</Label>
                    <Input 
                      id="providerPassword" 
                      type="password" 
                      placeholder="Create a secure password"
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

                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Verification Documents
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload documents to verify your business. Required documents are marked with *.
                    </p>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="businessLicense" className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Business License / Registration * 
                          <span className="text-xs text-muted-foreground">(PDF, JPG, PNG)</span>
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            id="businessLicense"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange('businessLicense', e.target.files?.[0] || null)}
                            required
                            className="cursor-pointer"
                          />
                          {documents.businessLicense && (
                            <span className="text-xs text-green-600">✓ {documents.businessLicense.name}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="idProof" className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          ID Proof (Aadhaar/PAN/Passport) *
                          <span className="text-xs text-muted-foreground">(PDF, JPG, PNG)</span>
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            id="idProof"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange('idProof', e.target.files?.[0] || null)}
                            required
                            className="cursor-pointer"
                          />
                          {documents.idProof && (
                            <span className="text-xs text-green-600">✓ {documents.idProof.name}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serviceCertificate" className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Service Certificates (Optional)
                          <span className="text-xs text-muted-foreground">(PDF, JPG, PNG)</span>
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            id="serviceCertificate"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileChange('serviceCertificate', e.target.files?.[0] || null)}
                            className="cursor-pointer"
                          />
                          {documents.serviceCertificate && (
                            <span className="text-xs text-green-600">✓ {documents.serviceCertificate.name}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessPhoto" className="flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          Business Photo (Optional)
                          <span className="text-xs text-muted-foreground">(JPG, PNG)</span>
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            id="businessPhoto"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange('businessPhoto', e.target.files?.[0] || null)}
                            className="cursor-pointer"
                          />
                          {documents.businessPhoto && (
                            <span className="text-xs text-green-600">✓ {documents.businessPhoto.name}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-spiritual/10 p-4 rounded-lg border border-spiritual/20 mt-4">
                    <p className="text-xs text-muted-foreground">
                      <strong>🏢 Provider Benefits:</strong> List your services, manage bookings, 
                      connect with travelers, and grow your business with our trusted platform.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>🔒 Verification:</strong> Your documents will be reviewed within 24-48 hours. 
                      You'll receive an email notification once approved.
                    </p>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full mt-6 mb-4" 
                    variant="spiritual"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Creating Provider Account..." : "Start Your Business"}
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