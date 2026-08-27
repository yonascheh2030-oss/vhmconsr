import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beto-dash">
        <Loader2 className="w-7 h-7 animate-spin text-beto-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
};
