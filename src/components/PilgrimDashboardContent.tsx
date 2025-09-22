import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Star, 
  Calendar,
  Search,
  Heart,
  Filter,
  Compass,
  Camera,
  Mountain,
  Building,
  Navigation,
  Clock,
  Users,
  DollarSign
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface Destination {
  id: string;
  name: string;
  type: 'spiritual' | 'tourist';
  location: string;
  rating: number;
  price: string;
  image: string;
  description: string;
  isFavorite: boolean;
}

interface Trip {
  id: string;
  destination: string;
  date: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  type: 'spiritual' | 'tourist';
}

const PilgrimDashboardContent = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'spiritual' | 'tourist'>('all');
  
  const [destinations] = useState<Destination[]>([
    {
      id: '1',
      name: 'Kedarnath Temple',
      type: 'spiritual',
      location: 'Uttarakhand',
      rating: 4.9,
      price: '₹15,000',
      image: '🏔️',
      description: 'Sacred Shiva temple in the Himalayas',
      isFavorite: true
    },
    {
      id: '2',
      name: 'Varanasi Ghats',
      type: 'spiritual',
      location: 'Uttar Pradesh',
      rating: 4.8,
      price: '₹8,000',
      image: '🕉️',
      description: 'Ancient spiritual city on the Ganges',
      isFavorite: false
    },
    {
      id: '3',
      name: 'Manali Adventure',
      type: 'tourist',
      location: 'Himachal Pradesh',
      rating: 4.7,
      price: '₹12,000',
      image: '🏔️',
      description: 'Mountain adventure with scenic beauty',
      isFavorite: true
    },
    {
      id: '4',
      name: 'Golden Temple',
      type: 'spiritual',
      location: 'Punjab',
      rating: 4.9,
      price: '₹6,000',
      image: '🏛️',
      description: 'Sacred Sikh pilgrimage site',
      isFavorite: false
    }
  ]);

  const [trips] = useState<Trip[]>([
    { id: '1', destination: 'Kedarnath Temple', date: 'Dec 15-18', status: 'Confirmed', type: 'spiritual' },
    { id: '2', destination: 'Rishikesh Ashram', date: 'Nov 28-30', status: 'Completed', type: 'spiritual' },
    { id: '3', destination: 'Varanasi Ghat Tour', date: 'Nov 10-12', status: 'Completed', type: 'spiritual' },
  ]);

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || dest.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-spiritual/10 via-primary/10 to-accent/10 rounded-2xl p-8 border border-border/50">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-spiritual to-primary bg-clip-text text-transparent">
                Welcome, Traveler!
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Discover amazing spiritual destinations and memorable adventures, {user?.user_metadata?.display_name || 'Pilgrim'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="spiritual" size="sm" className="shadow-lg">
                <Heart className="w-4 h-4 mr-2" />
                Wishlist ({destinations.filter(d => d.isFavorite).length})
              </Button>
              <Button variant="outline" size="sm">
                <Navigation className="w-4 h-4 mr-2" />
                Plan Journey
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-spiritual/5 to-spiritual/10 border-spiritual/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-spiritual" />
                Completed Journeys
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-spiritual">
                {trips.filter(t => t.status === 'Completed').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across 3 states
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Upcoming Trips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {trips.filter(t => t.status === 'Confirmed').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Next: Kedarnath
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Heart className="w-4 h-4 text-accent" />
                Saved Places
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {destinations.filter(d => d.isFavorite).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Wishlist items
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Explore Section */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-primary" />
                    Discover Places
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={selectedFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFilter('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedFilter === 'spiritual' ? 'spiritual' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFilter('spiritual')}
                    >
                      🕉️ Spiritual
                    </Button>
                    <Button
                      variant={selectedFilter === 'tourist' ? 'hero' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedFilter('tourist')}
                    >
                      🏔️ Tourist
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search destinations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredDestinations.map((destination) => (
                    <div key={destination.id} className="group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-background to-muted/20 transition-all hover:shadow-lg hover:scale-[1.02]">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-3xl">{destination.image}</div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={`h-8 w-8 ${destination.isFavorite ? 'text-red-500' : 'text-muted-foreground'}`}
                          >
                            <Heart className={`w-4 h-4 ${destination.isFavorite ? 'fill-current' : ''}`} />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{destination.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {destination.location}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-current text-yellow-500" />
                              <span className="text-sm font-medium">{destination.rating}</span>
                            </div>
                            <Badge variant={destination.type === 'spiritual' ? 'secondary' : 'outline'}>
                              {destination.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{destination.description}</p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="font-semibold text-lg">{destination.price}</span>
                            <Button size="sm" variant={destination.type === 'spiritual' ? 'spiritual' : 'hero'}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Bookings */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Recent Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trips.map((trip) => (
                    <div key={trip.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{trip.destination}</h4>
                        <p className="text-xs text-muted-foreground">{trip.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg">
                          {trip.type === 'spiritual' ? '🕉️' : '🏔️'}
                        </div>
                        <Badge 
                          variant={trip.status === 'Confirmed' ? 'default' : 'secondary'} 
                          className="text-xs shrink-0"
                        >
                          {trip.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="spiritual">
                  <Building className="w-4 h-4 mr-2" />
                  Find Temples
                </Button>
                <Button className="w-full justify-start" variant="hero">
                  <Mountain className="w-4 h-4 mr-2" />
                  Adventure Tours
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Photo Gallery
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Travel Community
                </Button>
              </CardContent>
            </Card>

            {/* Travel Tips */}
            <Card className="shadow-card bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-lg">💡 Travel Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <p>Book temple visits early morning for peaceful darshan</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 mt-0.5 text-green-600 shrink-0" />
                    <p>Compare prices from multiple providers before booking</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="w-4 h-4 mt-0.5 text-yellow-600 shrink-0" />
                    <p>Check reviews and ratings for authentic experiences</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PilgrimDashboardContent;