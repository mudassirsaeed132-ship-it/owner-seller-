// PATH: src/app/routes/guards/RequireSellerVerified.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/model/authStore";

export default function RequireSellerVerified({ children }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/auth/role" replace />;
  }

  if (!user.isSellerVerified) {
    return <Navigate to="/onboarding/seller-verification" replace />;
  }

  return children;
}