import { Navigate } from "react-router-dom";
import { getLocalAccessToken } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();
  const accessToken = getLocalAccessToken();
  console.log(accessToken, authState);
  const auth = !!(authState.isAuthenticated && accessToken);
  return <>{auth ? children : <Navigate to="/" />}</>;
};

export default PrivateRoute;
