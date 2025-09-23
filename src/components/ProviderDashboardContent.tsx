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
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  name: string;
  service_type: string;
  approval_status: 'pending' | 'approved' | 'rejected';
  availability_status: 'active' | 'inactive' | 'pending_approval';
  location: string;
  state: string;
  price_per_day: number;
  description: string;
  created_at: string;
  updated_at: string;
}

interface ProviderStats {
  totalServices: number;
  pendingApproval: number;
  totalBookings: number;
  confirmedBookings: number;
  totalRevenue: number;
  recentBookings: any[];
}

const ProviderDashboardContent = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState<ProviderStats>({
    totalServices: 0,
    pendingApproval: 0,
    totalBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0,
    recentBookings: []
  });
  const [loading, setLoading] = useState(true);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({
    name: "",
    service_type: "",
    location: "",
    state: "",
    price_per_day: "",
    description: ""
  });

  // Fetch provider stats and services
  useEffect(() => {
    if (user) {
      fetchProviderData();
    }
  }, [user]);

  const fetchProviderData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
      const { data: statsData, error: statsError } = await supabase.functions.invoke('provider-stats', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });

      if (statsError) throw statsError;
      if (statsData) setStats(statsData);

      // Fetch services
      const { data: servicesData, error: servicesError } = await supabase.functions.invoke('provider-services', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });

      if (servicesError) throw servicesError;
      if (servicesData) setServices(servicesData);

    } catch (error: any) {
      console.error('Error fetching provider data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newService.name || !newService.service_type || !newService.location || !newService.state || !newService.price_per_day) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('provider-services', {
        body: {
          ...newService,
          price_per_day: parseFloat(newService.price_per_day)
        },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Service created successfully. It's pending admin approval.",
      });

      setNewService({ 
        name: "", 
        service_type: "", 
        location: "", 
        state: "", 
        price_per_day: "", 
        description: "" 
      });
      setIsAddingService(false);
      
      // Refresh data
      fetchProviderData();

    } catch (error: any) {
      console.error('Error creating service:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create service. Please try again.",
      });
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const { error } = await supabase.functions.invoke('provider-services', {
        body: null,
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Service deleted successfully.",
      });

      // Refresh data
      fetchProviderData();

    } catch (error: any) {
      console.error('Error deleting service:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete service. Please try again.",
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                  <form onSubmit={handleAddService} className="space-y-4">
                    <div>
                      <Label htmlFor="serviceName">Service Name</Label>
                      <Input
                        id="serviceName"
                        value={newService.name}
                        onChange={(e) => setNewService({...newService, name: e.target.value})}
                        placeholder="e.g., Temple Guide - Tirupati"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceType">Service Type</Label>
                      <Select 
                        value={newService.service_type}
                        onValueChange={(value) => setNewService({...newService, service_type: value})}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Spiritual">Spiritual Guide</SelectItem>
                          <SelectItem value="Pilgrimage">Pilgrimage Package</SelectItem>
                          <SelectItem value="Wellness">Wellness & Yoga</SelectItem>
                          <SelectItem value="Transport">Transportation</SelectItem>
                          <SelectItem value="Accommodation">Accommodation</SelectItem>
                          <SelectItem value="Cultural">Cultural Tour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="serviceLocation">Location</Label>
                      <Input
                        id="serviceLocation"
                        value={newService.location}
                        onChange={(e) => setNewService({...newService, location: e.target.value})}
                        placeholder="e.g., Tirupati, Andhra Pradesh"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceState">State</Label>
                      <Select 
                        value={newService.state}
                        onValueChange={(value) => setNewService({...newService, state: value})}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
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
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="servicePrice">Price per Day (₹)</Label>
                      <Input
                        id="servicePrice"
                        type="number"
                        value={newService.price_per_day}
                        onChange={(e) => setNewService({...newService, price_per_day: e.target.value})}
                        placeholder="e.g., 500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceDescription">Description</Label>
                      <Textarea
                        id="serviceDescription"
                        value={newService.description}
                        onChange={(e) => setNewService({...newService, description: e.target.value})}
                        placeholder="Describe your service in detail..."
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Add Service
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Total Services
              </CardTitle>
              <div className="text-2xl font-bold text-primary">
                {stats.totalServices}
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pending Approval
              </CardTitle>
              <div className="text-2xl font-bold text-accent">
                {stats.pendingApproval}
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Total Bookings
              </CardTitle>
              <div className="text-2xl font-bold text-green-600">
                {stats.totalBookings}
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20 shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Total Revenue
              </CardTitle>
              <div className="text-2xl font-bold text-blue-600">
                ₹{stats.totalRevenue.toLocaleString()}
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Services Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Your Services</h2>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="border border-border/50 hover:shadow-elegant transition-smooth">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-foreground">{service.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4" />
                          {service.location}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={
                          service.approval_status === 'approved' ? 'default' : 
                          service.approval_status === 'pending' ? 'secondary' : 
                          'destructive'
                        }
                      >
                        {service.approval_status.charAt(0).toUpperCase() + service.approval_status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Service Type:</span>
                        <span className="font-medium">{service.service_type}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Price per Day:</span>
                        <span className="font-medium">₹{service.price_per_day}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">State:</span>
                        <span className="font-medium">{service.state}</span>
                      </div>
                      {service.description && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {service.description}
                        </p>
                      )}
                      
                      <div className="flex justify-between pt-4 gap-2">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteService(service.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-2 border-dashed border-border/50 bg-muted/20">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">No services yet</h3>
                    <p className="text-muted-foreground">Create your first service to get started</p>
                  </div>
                  <Button onClick={() => setIsAddingService(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboardContent;