"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  const { register, loginWithGoogle, user, isLoading } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.user_type === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(fullName, email, password);
    } catch (err: any) {
      setError(err);
      setIsSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError(null);
    if (credentialResponse.credential) {
      try {
        await loginWithGoogle(credentialResponse.credential);
      } catch (err: any) {
        setError(err);
      }
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "90vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        backgroundColor: "rgba(30, 41, 59, 0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.85rem", fontWeight: "bold", color: "#ffffff", margin: 0 }}>Create Account</h2>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "8px" }}>Sign up for premium dry fruits shopping</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid #ef4444",
            color: "#f87171",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "0.85rem",
            marginBottom: "24px"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label htmlFor="fullName" style={{ display: "block", color: "#cbd5e1", fontSize: "0.85rem", fontWeight: "500", marginBottom: "6px" }}>
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #475569",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                fontSize: "0.95rem",
                outline: "none"
              }}
            />
          </div>

          <div>
            <label htmlFor="email" style={{ display: "block", color: "#cbd5e1", fontSize: "0.85rem", fontWeight: "500", marginBottom: "6px" }}>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #475569",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                fontSize: "0.95rem",
                outline: "none"
              }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: "block", color: "#cbd5e1", fontSize: "0.85rem", fontWeight: "500", marginBottom: "6px" }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #475569",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                fontSize: "0.95rem",
                outline: "none"
              }}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" style={{ display: "block", color: "#cbd5e1", fontSize: "0.85rem", fontWeight: "500", marginBottom: "6px" }}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "1px solid #475569",
                backgroundColor: "#0f172a",
                color: "#ffffff",
                fontSize: "0.95rem",
                outline: "none"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#d97706",
              color: "#ffffff",
              border: "none",
              fontSize: "0.95rem",
              fontWeight: "600",
              cursor: (isSubmitting || isLoading) ? "not-allowed" : "pointer",
              transition: "background-color 0.2s",
              marginTop: "8px"
            }}
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", margin: "24px 0", color: "#64748b" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#334155" }}></div>
          <span style={{ padding: "0 12px", fontSize: "0.8rem", textTransform: "uppercase" }}>or</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#334155" }}></div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google Sign-In failed. Please try again.")}
            theme="filled_blue"
            shape="rectangular"
            width="340"
          />
        </div>

        <p style={{ color: "#94a3b8", fontSize: "0.875rem", textAlign: "center", marginTop: "32px", marginBottom: 0 }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#d97706", textDecoration: "none", fontWeight: "600" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
