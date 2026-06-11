"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { Sparkles, Check, AlertCircle, ArrowRight } from "lucide-react";
import styles from "./auth.module.css";

export default function LoginPage() {
  const { login, loginWithGoogle, user, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    setIsSubmitting(true);

    try {
      await login(email, password);
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
    <div className={styles.page}>
      {/* ── BRAND PANEL ── */}
      <aside className={styles.brandPanel}>
        <div className={styles.brandInner}>
          <div className={styles.brandLogo}>
            <span className={styles.brandLogoMark}>
              <Sparkles size={20} />
            </span>
            Birla Nuts
          </div>

          <span className={styles.brandEyebrow}>
            <Sparkles size={12} /> Premium Dry Fruits
          </span>
          <h1 className={styles.brandTitle}>
            Welcome back to <span>healthier snacking</span>.
          </h1>
          <p className={styles.brandDesc}>
            Sign in to track your orders, revisit your wishlist, and enjoy a
            faster checkout on India&apos;s finest hand-sorted nuts &amp; dry fruits.
          </p>

          <ul className={styles.brandList}>
            <li>
              <span className={styles.brandCheck}><Check size={15} /></span>
              FSSAI certified, 100% natural &amp; preservative free
            </li>
            <li>
              <span className={styles.brandCheck}><Check size={15} /></span>
              Free shipping on orders over ₹499
            </li>
            <li>
              <span className={styles.brandCheck}><Check size={15} /></span>
              Trusted by 1M+ happy families
            </li>
          </ul>
        </div>
      </aside>

      {/* ── FORM PANEL ── */}
      <main className={styles.formPanel}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Sign in</h2>
            <p className={styles.formSubtitle}>Welcome back to your BIR Retail account</p>
          </div>

          {error && (
            <div className={styles.error}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={styles.input}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={styles.submitBtn}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} /> Signing In...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <div className={styles.googleWrap}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google Sign-In failed. Please try again.")}
              theme="outline"
              shape="rectangular"
              width="340"
            />
          </div>

          <p className={styles.footerText}>
            Don&apos;t have an account?{" "}
            <Link href="/register" className={styles.footerLink}>
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
