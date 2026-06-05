"use client";

import React from "react";
import { useAuth } from "../../../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#ffffff", margin: 0 }}>Dashboard</h1>
          <p style={{ color: "#94a3b8", marginTop: "4px" }}>Welcome back, {user?.full_name}!</p>
        </div>
      </div>

      {/* Grid of stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        <div style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <h3 style={{ fontSize: "0.875rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Total Sales</h3>
          <p style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#f59e0b", margin: "12px 0 0 0" }}>₹1,42,850</p>
        </div>
        <div style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <h3 style={{ fontSize: "0.875rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Active Orders</h3>
          <p style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#f59e0b", margin: "12px 0 0 0" }}>18</p>
        </div>
        <div style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <h3 style={{ fontSize: "0.875rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Total Products</h3>
          <p style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#f59e0b", margin: "12px 0 0 0" }}>4</p>
        </div>
      </div>

      {/* System info */}
      <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "24px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#ffffff", marginBottom: "16px", margin: 0 }}>System Status</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid #334155" }}>
            <span style={{ color: "#94a3b8" }}>Backend Server API</span>
            <span style={{ color: "#10b981", fontWeight: "600" }}>Active (HTTPS)</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid #334155" }}>
            <span style={{ color: "#94a3b8" }}>MinIO Media Store</span>
            <span style={{ color: "#10b981", fontWeight: "600" }}>Active (HTTPS)</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#94a3b8" }}>PostgreSQL Database</span>
            <span style={{ color: "#10b981", fontWeight: "600" }}>Connected (asyncpg)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
