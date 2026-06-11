"use client";

import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { TrendingUp, ShoppingCart, Package } from "lucide-react";
import styles from "../admin.module.css";

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: "Total Sales", value: "₹1,42,850", icon: TrendingUp },
    { label: "Active Orders", value: "18", icon: ShoppingCart },
    { label: "Total Products", value: "4", icon: Package },
  ];

  const systems = [
    { name: "Backend Server API", status: "Active (HTTPS)" },
    { name: "MinIO Media Store", status: "Active (HTTPS)" },
    { name: "PostgreSQL Database", status: "Connected (asyncpg)" },
  ];

  return (
    <div>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSub}>Welcome back, {user?.full_name}!</p>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className={styles.statCard}>
            <div className={styles.statHead}>
              <span className={styles.statLabel}>{label}</span>
              <span className={styles.statIcon}>
                <Icon size={20} />
              </span>
            </div>
            <p className={styles.statValue}>{value}</p>
          </div>
        ))}
      </div>

      {/* System status */}
      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>System Status</h2>
        {systems.map((sys) => (
          <div key={sys.name} className={styles.statusRow}>
            <span className={styles.statusName}>{sys.name}</span>
            <span className={styles.statusBadge}>
              <span className={styles.statusDot} />
              {sys.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
