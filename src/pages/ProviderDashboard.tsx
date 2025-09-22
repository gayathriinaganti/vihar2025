import { ProviderDashboard as ProviderDashboardComponent } from "@/components/DashboardPreview";
import ProviderDashboardContent from "@/components/ProviderDashboardContent";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProviderDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <ProviderDashboardContent />;
};

export default ProviderDashboard;