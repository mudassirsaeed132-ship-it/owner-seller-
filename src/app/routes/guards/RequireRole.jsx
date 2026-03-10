// PATH: src/app/routes/guards/RequireRole.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/model/authStore";

export default function RequireRole({ role, children }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/auth/role" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/auth/role" replace />;
  }

  return children;
}