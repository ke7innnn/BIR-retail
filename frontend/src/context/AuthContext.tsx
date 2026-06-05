"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface UserProfile {
  user_id: string;
  user_type: "customer" | "admin";
  email: string;
  full_name: string;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  userType: "customer" | "admin" | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

// Axios instance configured for cookie-based auth
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;
  const userType = user ? user.user_type : null;

  // Intercept response to handle token refresh automatically
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // If 401 Unauthorized is returned, and it's not the /login, /refresh, or /register endpoints
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url.includes("/auth/login") &&
          !originalRequest.url.includes("/auth/refresh") &&
          !originalRequest.url.includes("/auth/register") &&
          !originalRequest.url.includes("/auth/google")
        ) {
          originalRequest._retry = true;
          try {
            // Attempt silent token refresh
            await api.post("/api/auth/refresh");
            // Retry the original request
            return api(originalRequest);
          } catch (refreshError) {
            // If refresh fails, log out the user locally
            setUser(null);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  // Fetch current user details on mount to verify session persistence
  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/api/auth/me");
      setUser(response.data);
    } catch (error) {
      // If unauthorized, check if we can refresh
      try {
        const refreshResponse = await api.post("/api/auth/refresh");
        setUser(refreshResponse.data);
      } catch (refreshError) {
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const authData = response.data;
      const profile: UserProfile = {
        user_id: authData.user_id,
        user_type: authData.user_type,
        email: authData.email,
        full_name: authData.full_name,
      };
      setUser(profile);

      // Handle redirect
      if (profile.user_type === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      setUser(null);
      throw error.response?.data?.detail || "Login failed. Please try again.";
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/auth/register", {
        full_name: fullName,
        email,
        password,
        confirm_password: password,
      });
      const authData = response.data;
      const profile: UserProfile = {
        user_id: authData.user_id,
        user_type: authData.user_type,
        email: authData.email,
        full_name: authData.full_name,
      };
      setUser(profile);
      router.push("/");
    } catch (error: any) {
      setUser(null);
      throw error.response?.data?.detail || "Registration failed. Please try again.";
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (idToken: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/auth/google", { id_token: idToken });
      const authData = response.data;
      const profile: UserProfile = {
        user_id: authData.user_id,
        user_type: authData.user_type,
        email: authData.email,
        full_name: authData.full_name,
      };
      setUser(profile);
      router.push("/");
    } catch (error: any) {
      setUser(null);
      throw error.response?.data?.detail || "Google authentication failed.";
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setUser(null);
      setIsLoading(false);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        userType,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
