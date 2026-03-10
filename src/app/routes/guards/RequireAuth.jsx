// PATH: src/app/routes/guards/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/model/authStore";

export default function RequireAuth({ children }) {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/auth/role" replace state={{ from: location }} />;
  }

  return children;
}