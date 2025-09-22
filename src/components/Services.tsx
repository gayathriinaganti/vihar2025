import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bed, 
  Utensils, 
  Car, 
  UserCheck, 
  MapPin, 
  Building, 
  Mountain, 
  Camera,
  Star
} from "lucide-react";

const Services = () => {
  const spiritualServices = [
    {
      icon: <Building className="w-8 h-8" />,
      title: "Temple Information",
      description: "Detailed guides about temples, rituals, and visiting hours",
      features: ["History & Significance", "Ritual Guidelines", "Best Visiting Times"]
    },
    {
      icon: <Bed className="w-8 h-8" />,
      title: "Spiritual Accommodation",
      description: "Dharamshalas, ashrams, and peaceful stays near holy sites",
      features: ["Dharamshalas", "Ashrams", "Pilgrimage Lodges"]
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Spiritual Guides", 
      description: "Experienced guides for temple visits and religious ceremonies",
      features: ["Temple Guides", "Ritual Assistance", "Sanskrit Translation"]
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Prasadam & Food",
      description: "Pure vegetarian meals and temple prasadam delivery",
      features: ["Prasadam Delivery", "Sattvic Meals", "Festival Foods"]
    }
  ];

  const touristServices = [
    {
      icon: <Mountain className="w-8 h-8" />,
      title: "Tourist Destinations",
      description: "Scenic spots, historical sites, and adventure activities",
      features: ["Hill Stations", "Historical Sites", "Adventure Sports"]
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Tour Packages",
      description: "Curated travel packages for memorable vacations",
      features: ["Group Tours", "Custom Itineraries", "Photography Tours"]
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Transportation",
      description: "Reliable transport services for comfortable journeys",
      features: ["Car Rentals", "Bus Services", "Airport Transfers"]
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Local Experiences",
      description: "Authentic local culture, food, and hidden gems",
      features: ["Cultural Tours", "Local Cuisine", "Hidden Gems"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Comprehensive Travel Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're seeking spiritual enlightenment or memorable adventures, 
            we connect you with trusted service providers across India.
          </p>
        </div>

        {/* Spiritual Services */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-gradient-spiritual text-spiritual-foreground">
              🕉️ Spiritual Journeys
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {spiritualServices.map((service, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth group">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-gradient-spiritual rounded-lg text-spiritual-foreground group-hover:scale-110 transition-bounce">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4 text-sm">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-xs">
                        <Star className="w-3 h-3 text-spiritual fill-spiritual" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tourist Services */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-gradient-accent text-accent-foreground">
              🏔️ Tourist Adventures
            </Badge>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {touristServices.map((service, index) => (
              <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth group">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-gradient-accent rounded-lg text-accent-foreground group-hover:scale-110 transition-bounce">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4 text-sm">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-xs">
                        <Star className="w-3 h-3 text-accent fill-accent" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;