import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Define props type for clarity and type safety
interface AuthGuardProps {
  children: ReactNode;
}

// Replace this with your actual authentication check logic
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
