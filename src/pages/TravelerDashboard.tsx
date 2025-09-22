import { TravelerDashboard as TravelerDashboardComponent } from "@/components/DashboardPreview";
import TravelerDashboardContent from "@/components/TravelerDashboardContent";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const TravelerDashboard = () => {
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

  return <TravelerDashboardContent />;
};

export default TravelerDashboard;