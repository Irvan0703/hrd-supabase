import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { JSX } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
  role?: "admin" | "applicant";
}

export default function PrivateRoute({ children, role }: PrivateRouteProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    // Belum login → redirect ke login
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Salah role → redirect ke halaman default sesuai role
    return <Navigate to={user.role === "admin" ? "/admin/jobs" : "/jobs"} replace />;
  }

  return children;
}
