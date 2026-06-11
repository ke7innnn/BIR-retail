"use client";

import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Store, LogOut } from "lucide-react";
import styles from "./admin.module.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && (!user || user.user_type !== "admin")) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (!user || user.user_type !== "admin") {
    return null; // Will redirect via useEffect
  }

  return (
    <div className={styles.adminLayout}>
      {/* Admin Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <span className={styles.sidebarLogo}>
            <span className={styles.sidebarLogoMark}>BIR</span>
            Retail
          </span>
          <p className={styles.sidebarSub}>Admin · {user.full_name}</p>
        </div>

        <nav className={styles.sidebarNav}>
          <Link
            href="/admin/dashboard"
            className={`${styles.navItem} ${pathname === "/admin/dashboard" ? styles.navItemActive : ""}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/" className={styles.navItem}>
            <Store size={18} />
            View Storefront
          </Link>
        </nav>

        <button onClick={logout} className={styles.logoutBtn}>
          <LogOut size={16} />
          Log Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
