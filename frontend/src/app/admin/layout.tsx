"use client";

import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.user_type !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", backgroundColor: "#0f172a" }}>
        <div className="spinner"></div>
        <style jsx>{`
          .spinner {
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top: 4px solid #f59e0b;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user || user.user_type !== "admin") {
    return null; // Will redirect via useEffect
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc" }}>
      {/* Admin Sidebar */}
      <aside style={{ 
        width: "260px", 
        backgroundColor: "#1e293b", 
        borderRight: "1px solid #334155", 
        display: "flex", 
        flexDirection: "column", 
        padding: "24px" 
      }}>
        <div style={{ paddingBottom: "20px", borderBottom: "1px solid #334155", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#f59e0b", letterSpacing: "-0.025em" }}>BIR Retail</h2>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: "4px" }}>Admin: {user.full_name}</p>
        </div>
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <Link href="/admin/dashboard" style={{ 
            padding: "12px 16px", 
            borderRadius: "8px", 
            backgroundColor: "#334155", 
            color: "#ffffff", 
            textDecoration: "none", 
            fontWeight: "500",
            transition: "all 0.2s"
          }}>
            Dashboard
          </Link>
          <Link href="/" style={{ 
            padding: "12px 16px", 
            borderRadius: "8px", 
            color: "#94a3b8", 
            textDecoration: "none",
            fontWeight: "500",
            transition: "all 0.2s"
          }}>
            View Storefront
          </Link>
        </nav>
        <button onClick={logout} style={{ 
          padding: "12px 16px", 
          borderRadius: "8px", 
          backgroundColor: "#ef4444", 
          color: "#ffffff", 
          border: "none", 
          cursor: "pointer", 
          fontWeight: "600", 
          marginTop: "auto",
          transition: "all 0.2s"
        }}>
          Log Out
        </button>
      </aside>
      
      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
