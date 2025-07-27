/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toast";
import { AuthenticationService } from "@/generated/services/AuthenticationService";
import type { Body_login_auth_login_post } from "@/generated/models/Body_login_auth_login_post";

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
}

interface AuthContextType {
  authState: AuthState;
  login: (postData: Body_login_auth_login_post) => Promise<void>;
  loading: boolean;
  logout: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userRole: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (jwtToken && userRole) {
      setAuthState({
        isAuthenticated: true,
        userRole: userRole,
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    setAuthState({
      isAuthenticated: false,
      userRole: null,
    });
    navigate("/login");
  };

  const signOut = async () => {
    logout();
  };

  const login = async (postData: Body_login_auth_login_post) => {
    try {
      setLoading(true);
      const responseData = await AuthenticationService.loginAuthLoginPost({
        formData: postData,
      });

      const jwtToken = responseData.access_token;
      localStorage.setItem("accessToken", jwtToken);
      localStorage.setItem("userRole", responseData.userRole);
      setAuthState({
        isAuthenticated: true,
        userRole: responseData.userRole,
      });
      toast.success("Login successful");
      navigate("/record");
    } catch (error: any) {
      toast.error(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    authState,
    login,
    loading,
    logout,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
