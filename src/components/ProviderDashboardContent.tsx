import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  AlertCircle,
  Settings,
  Edit,
  Trash2,
  DollarSign,
  LogOut,
  ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Service {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Pending' | 'Inactive';
  bookings: number;
  price: string;
  description: string;
}

const ProviderDashboardContent = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([
    { 
      id: '1', 
      name: "Temple Guide - Tirupati", 
      type: "Spiritual", 
      status: "Active", 
      bookings: 12,
      price: "₹500/day",
      description: "Expert guide for Tirupati temple visits with ritual knowledge"
    },
    { 
      id: '2', 
      name: "Dharamshala Stay", 
      type: "Accommodation", 
      status: "Active", 
      bookings: 8,
      price: "₹300/night",
      description: "Clean and peaceful dharamshala accommodation"
    },
    { 
      id: '3', 
      name: "Local Transport Service", 
      type: "Transportation", 
      status: "Pending", 
      bookings: 0,
      price: "₹15/km",
      description: "Reliable transport for pilgrimage journeys"
    },
  ]);

  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    type: "",
    price: "",
    description: ""
  });

  const handleAddService = () => {
    if (newService.name && newService.type && newService.price) {
      const service: Service = {
        id: Date.now().toString(),
        name: newService.name,
        type: newService.type,
        status: 'Pending',
        bookings: 0,
        price: newService.price,
        description: newService.description
      };
      setServices([...services, service]);
      setNewService({ name: "", type: "", price: "", description: "" });
      setIsAddingService(false);
    }
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Provider Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, {user?.user_metadata?.display_name || 'Provider'}! Manage your services and grow your business.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
                <DialogTrigger asChild>
                  <Button variant="hero" size="sm" className="shadow-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="service-name">Service Name</Label>
                      <Input
                        id="service-name"
                        placeholder="e.g., Temple Guide - Kedarnath"
                        value={newService.name}
                        onChange={(e) => setNewService({...newService, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-type">Service Type</Label>
                      <Select value={newService.type} onValueChange={(value) => setNewService({...newService, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Spiritual">Spiritual Guide</SelectItem>
                          <SelectItem value="Accommodation">Accommodation</SelectItem>
                          <SelectItem value="Transportation">Transportation</SelectItem>
                          <SelectItem value="Food">Food & Dining</SelectItem>
                          <SelectItem value="Tour">Tour Package</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="service-price">Price</Label>
                      <Input
                        id="service-price"
                        placeholder="e.g., ₹500/day"
                        value={newService.price}
                        onChange={(e) => setNewService({...newService, price: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="service-description">Description</Label>
                      <Textarea
                        id="service-description"
                        placeholder="Describe your service..."
                        value={newService.description}
                        onChange={(e) => setNewService({...newService, description: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleAddService} className="flex-1">
                        Add Service
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddingService(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Total Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{services.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +2 this month
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                Pending Approval
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {services.filter(s => s.status === 'Pending').length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting review
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-spiritual/5 to-spiritual/10 border-spiritual/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-spiritual" />
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-spiritual">
                {services.reduce((sum, service) => sum + service.bookings, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Star className="w-4 h-4 text-green-600" />
                Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">4.8</div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on 45 reviews
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Your Services
                </CardTitle>
                <CardDescription>Manage and track your service offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="group relative overflow-hidden rounded-xl border border-border bg-gradient-to-r from-background to-muted/30 p-6 transition-all hover:shadow-md">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-lg">{service.name}</h4>
                            <Badge 
                              variant={service.status === 'Active' ? 'default' : service.status === 'Pending' ? 'secondary' : 'outline'}
                              className="text-xs"
                            >
                              {service.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {service.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {service.price}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {service.bookings} bookings
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteService(service.id)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-accent" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">Service Approved</p>
                      <p className="text-xs text-muted-foreground">Temple Guide Service was approved</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                    <Calendar className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">New Booking</p>
                      <p className="text-xs text-muted-foreground">Kedarnath pilgrimage package</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                    <Star className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">5-Star Review</p>
                      <p className="text-xs text-muted-foreground">Excellent guide service!</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
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
                  <Eye className="w-4 h-4 mr-2" />
                  View All Bookings
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analytics Dashboard
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Profile Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboardContent;