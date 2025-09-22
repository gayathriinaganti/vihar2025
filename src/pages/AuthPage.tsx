import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass } from "lucide-react";
import PilgrimAuthModal from "@/components/PilgrimAuthModal";
import ProviderAuthModal from "@/components/ProviderAuthModal";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import heroImage from "@/assets/hero-temple.jpg";

const AuthPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect authenticated users to home
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-3 bg-gradient-primary rounded-lg">
                <Compass className="w-8 h-8 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold text-white">Vihar</span>
            </div>
            <p className="text-white/90 text-lg">Your Journey Starts Here</p>
          </div>

          {/* Auth Card */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-glow">
            <Tabs defaultValue="pilgrim" className="p-6">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="pilgrim" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                  Pilgrim
                </TabsTrigger>
                <TabsTrigger value="provider" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                  Provider
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="pilgrim" className="mt-6 space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-2">Welcome Pilgrim</h2>
                  <p className="text-white/80 text-sm">Discover spiritual journeys and trusted providers</p>
                </div>
                
                <div className="space-y-3">
                  <PilgrimAuthModal>
                    <Button variant="hero" size="lg" className="w-full shadow-xl">
                      Pilgrim Login
                    </Button>
                  </PilgrimAuthModal>
                  
                  <PilgrimAuthModal>
                    <Button variant="outline" size="lg" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                      Create Pilgrim Account
                    </Button>
                  </PilgrimAuthModal>
                </div>
              </TabsContent>
              
              <TabsContent value="provider" className="mt-6 space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-2">Welcome Provider</h2>
                  <p className="text-white/80 text-sm">Join our platform and serve pilgrims</p>
                </div>
                
                <div className="space-y-3">
                  <ProviderAuthModal>
                    <Button variant="hero" size="lg" className="w-full shadow-xl">
                      Provider Login
                    </Button>
                  </ProviderAuthModal>
                  
                  <ProviderAuthModal>
                    <Button variant="outline" size="lg" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                      Join as Provider
                    </Button>
                  </ProviderAuthModal>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Footer links */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-white/60 text-xs">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;