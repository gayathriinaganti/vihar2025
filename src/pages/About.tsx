import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Shield, Star, MapPin, Compass } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-spiritual/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Compass className="w-4 h-4 mr-2" />
              About Vihar
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Connecting Hearts to Sacred Journeys
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Vihar is more than just a platform – it's a bridge between spiritual seekers and trusted service providers, 
              creating meaningful connections for transformative travel experiences across India.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                We believe that every spiritual journey and adventure should be accessible, authentic, and transformative. 
                Vihar was born from the vision of making sacred travel and exploration seamless for travelers and adventurers alike.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-spiritual/10 rounded-lg">
                    <Heart className="w-5 h-5 text-spiritual" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Authentic Experiences</h3>
                    <p className="text-sm text-muted-foreground">Connecting you with genuine local providers and authentic cultural experiences</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Trust & Safety</h3>
                    <p className="text-sm text-muted-foreground">Verified providers and secure booking process for your peace of mind</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Community Driven</h3>
                    <p className="text-sm text-muted-foreground">Built by travelers, for travelers - fostering meaningful connections</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="text-8xl text-center opacity-20">🕉️</div>
              <div className="absolute inset-0 bg-gradient-to-br from-spiritual/20 to-primary/20 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide us in creating meaningful travel experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-gradient-spiritual rounded-lg w-fit mb-4">
                  <Heart className="w-8 h-8 text-spiritual-foreground" />
                </div>
                <CardTitle className="text-lg">Authenticity</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Preserving the genuine essence of spiritual and cultural experiences while making them accessible to all.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                  <Shield className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">Trust</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Building confidence through transparency, verified providers, and reliable service standards.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-gradient-accent rounded-lg w-fit mb-4">
                  <Users className="w-8 h-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Community</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Fostering connections between travelers, providers, and local communities for mutual growth.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-elegant transition-smooth">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-gradient-primary rounded-lg w-fit mb-4">
                  <Star className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">Excellence</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Continuously improving our platform to deliver exceptional experiences for everyone involved.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Vihar by Numbers</h2>
            <p className="text-muted-foreground">
              Our growing community of travelers and service providers
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Verified Providers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-spiritual mb-2">5000+</div>
              <div className="text-sm text-muted-foreground">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">25+</div>
              <div className="text-sm text-muted-foreground">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Founded by a team of passionate travelers and technology enthusiasts, Vihar emerged from personal experiences 
                of the challenges faced while planning spiritual journeys and adventure trips across India.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We realized the need for a trusted platform that could connect seekers with authentic local providers, 
                ensuring that every journey becomes a transformative experience filled with genuine cultural immersion and spiritual growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;