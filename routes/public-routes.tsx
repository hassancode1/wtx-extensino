import React from "react";
import { Navigate } from "react-router-dom";
import { getLocalAccessToken } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();
  const accessToken = getLocalAccessToken();
  console.log(authState, accessToken);
  const auth = !!(authState.isAuthenticated && accessToken);
  return auth ? <Navigate to="/record" /> : children;
};

export default PublicRoute;
