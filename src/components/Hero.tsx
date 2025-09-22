import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Users, Shield, Star } from "lucide-react";
import heroImage from "@/assets/hero-temple.jpg";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProviderClick = () => {
    if (user) {
      navigate('/provider-dashboard');
    }
  };

  const handlePilgrimClick = () => {
    if (user) {
      navigate('/pilgrim-dashboard');
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Your Journey Starts Here
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
            Connect with trusted providers for spiritual pilgrimages and memorable travels. 
            Whether you seek temple visits, tour guides, accommodation, or local experiences, 
            we bring everything together in one platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <>
                <Button variant="hero" size="xl" className="shadow-2xl" onClick={handleProviderClick}>
                  Go to Provider Dashboard
                </Button>
                <Button variant="spiritual" size="xl" className="shadow-2xl" onClick={handlePilgrimClick}>
                  Go to Pilgrim Dashboard
                </Button>
              </>
            ) : (
              <>
                <AuthModal>
                  <Button variant="hero" size="xl" className="shadow-2xl">
                    Join as Provider
                  </Button>
                </AuthModal>
                <AuthModal>
                  <Button variant="spiritual" size="xl" className="shadow-2xl">
                    Explore as Pilgrim
                  </Button>
                </AuthModal>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-white/80 text-sm">Already have an account?</span>
                  <AuthModal>
                    <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      Login Here
                    </Button>
                  </AuthModal>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 shadow-card hover:shadow-glow transition-smooth">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-accent rounded-lg mb-4 mx-auto">
              <MapPin className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Comprehensive Services</h3>
            <p className="text-white/80 text-sm">
              Find everything from accommodation and food to tour guides and temple information
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 shadow-card hover:shadow-glow transition-smooth">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-spiritual rounded-lg mb-4 mx-auto">
              <Users className="w-6 h-6 text-spiritual-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Trusted Community</h3>
            <p className="text-white/80 text-sm">
              Connect with verified providers and fellow travelers for authentic experiences
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 shadow-card hover:shadow-glow transition-smooth">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg mb-4 mx-auto">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Safe & Secure</h3>
            <p className="text-white/80 text-sm">
              Book with confidence through our secure platform with reviews and ratings
            </p>
          </Card>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
};

export default Hero;