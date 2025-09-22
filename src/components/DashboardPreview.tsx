import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Eye, 
  MapPin, 
  Star, 
  Calendar,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export const ProviderDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Provider Dashboard</h1>
          <p className="text-muted-foreground">Manage your services and track bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +2 this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">3</div>
              <p className="text-xs text-muted-foreground">
                <Clock className="w-3 h-3 inline mr-1" />
                Awaiting review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">8</div>
              <p className="text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 inline mr-1" />
                This week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">
                <Star className="w-3 h-3 inline mr-1 fill-current" />
                Based on 45 reviews
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your services efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                Add New Service
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View All Services
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Manage Bookings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates on your services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm">Temple Guide Service approved</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-accent" />
                  <div className="flex-1">
                    <p className="text-sm">New booking request</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-spiritual fill-current" />
                  <div className="flex-1">
                    <p className="text-sm">Received 5-star review</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Services</CardTitle>
            <CardDescription>Manage and track your offerings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Temple Guide - Tirupati", type: "Spiritual", status: "Active", bookings: 12 },
                { name: "Dharamshala Stay", type: "Accommodation", status: "Active", bookings: 8 },
                { name: "Local Transport Service", type: "Transportation", status: "Pending", bookings: 0 },
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">{service.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={service.status === 'Active' ? 'default' : 'secondary'}>
                      {service.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{service.bookings} bookings</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const TravelerDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Traveler!</h1>
          <p className="text-muted-foreground">Discover amazing spiritual and tourist destinations</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Journeys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 inline mr-1" />
                Across 3 states
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Trips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">2</div>
              <p className="text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 inline mr-1" />
                Next: Kedarnath
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Saved Places</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-spiritual">15</div>
              <p className="text-xs text-muted-foreground">
                <Star className="w-3 h-3 inline mr-1" />
                Wishlist items
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Explore Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-spiritual/20 bg-gradient-to-br from-spiritual/5 to-spiritual/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🕉️ Spiritual Places
              </CardTitle>
              <CardDescription>Temples, ashrams, and sacred sites</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="spiritual" className="w-full">
                Explore Sacred Destinations
              </Button>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏔️ Tourist Spots
              </CardTitle>
              <CardDescription>Hill stations, beaches, and adventures</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="hero" className="w-full">
                Discover Tourist Places
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Recommendations */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Your latest travel arrangements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { destination: "Kedarnath Temple", date: "Dec 15-18", status: "Confirmed" },
                  { destination: "Rishikesh Ashram", date: "Nov 28-30", status: "Completed" },
                  { destination: "Varanasi Ghat Tour", date: "Nov 10-12", status: "Completed" },
                ].map((trip, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{trip.destination}</h4>
                      <p className="text-xs text-muted-foreground">{trip.date}</p>
                    </div>
                    <Badge variant={trip.status === 'Confirmed' ? 'default' : 'secondary'} className="text-xs">
                      {trip.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Based on your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Char Dham Yatra Package", type: "Spiritual", rating: 4.9 },
                  { name: "Manali Adventure Tour", type: "Tourist", rating: 4.7 },
                  { name: "Kashi Vishwanath Guide", type: "Spiritual", rating: 4.8 },
                ].map((recommendation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{recommendation.name}</h4>
                      <p className="text-xs text-muted-foreground">{recommendation.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-spiritual" />
                        <span className="text-xs">{recommendation.rating}</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};