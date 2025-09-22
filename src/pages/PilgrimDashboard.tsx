import { PilgrimDashboard as PilgrimDashboardComponent } from "@/components/DashboardPreview";
import PilgrimDashboardContent from "@/components/PilgrimDashboardContent";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const PilgrimDashboard = () => {
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

  return <PilgrimDashboardContent />;
};

export default PilgrimDashboard;