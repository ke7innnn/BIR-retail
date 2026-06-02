"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { 
  Send,
  CheckCircle2
} from "lucide-react";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="9.7 15 9.7 9 14.5 12 9.7 15" />
  </svg>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Newsletter Block */}
      <div className={styles.newsletterSection}>
        <div className={styles.newsletterText}>
          <h3>Join our Nutty Family</h3>
          <p>Receive updates on new collections, exclusive recipes, and healthy eating tips.</p>
        </div>
        {subscribed ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-accent-crimson)", fontWeight: "600", fontSize: "0.95rem" }}>
            <CheckCircle2 size={20} />
            <span>Welcome to Birla Nuts! Your discount code is on the way.</span>
          </div>
        ) : (
          <form className={styles.newsletterForm} onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className={styles.newsletterInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.newsletterBtn}>
              Subscribe <Send size={12} style={{ marginLeft: "0.4rem", display: "inline-block" }} />
            </button>
          </form>
        )}
      </div>

      {/* Footer Link Columns */}
      <div className={styles.grid}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            MINISTRY OF<span className={styles.logoDot}>NUTS</span>
          </Link>
          <p className={styles.brandDesc}>
            India&apos;s Fastest Growing Online Dry Fruits Brand. Re-imagining the landscape of healthy snacking through curations of the finest gourmet California almonds, whole cashews, Chilean walnuts, seedless raisins, and flavored Makhana Masti.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Instagram"><InstagramIcon size={18} /></a>
            <a href="#" className={styles.socialLink} aria-label="Twitter"><TwitterIcon size={18} /></a>
            <a href="#" className={styles.socialLink} aria-label="Facebook"><FacebookIcon size={18} /></a>
            <a href="#" className={styles.socialLink} aria-label="YouTube"><YoutubeIcon size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className={styles.colTitle}>Collections</h4>
          <ul className={styles.linkList}>
            <li><Link href="/#collections" className={styles.link}>Classic Dry Fruits</Link></li>
            <li><Link href="/#collections" className={styles.link}>Crazy Bites Flavors</Link></li>
            <li><Link href="/#collections" className={styles.link}>Makhana Masti</Link></li>
            <li><Link href="/#collections" className={styles.link}>Gift Packs & Hampers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.colTitle}>Client Concierge</h4>
          <ul className={styles.linkList}>
            <li><a href="#" className={styles.link}>Track Shipping Status</a></li>
            <li><a href="#" className={styles.link}>FSSAI Standards Info</a></li>
            <li><a href="#" className={styles.link}>Mandala Festive Trays</a></li>
            <li><a href="#" className={styles.link}>Dry Fruit Gifting Consultation</a></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.colTitle}>Bespoke Services</h4>
          <ul className={styles.linkList}>
            <li><a href="#" className={styles.link}>Corporate Gifting Programs</a></li>
            <li><a href="#" className={styles.link}>Sourcing Rare Delicacies</a></li>
            <li><a href="#" className={styles.link}>Sustainability Pledge</a></li>
            <li><a href="#" className={styles.link}>Corporate Customizations</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className={styles.baseBar}>
        <p>© 2026 Birla Nuts. Handcrafted for Kevin Pimenta. Inspired by Ministry of Nuts India.</p>
        <div className={styles.payments}>
          <span className={styles.paymentBadge}>Visa</span>
          <span className={styles.paymentBadge}>Mastercard</span>
          <span className={styles.paymentBadge}>UPI / GPay</span>
          <span className={styles.paymentBadge}>Cash on Delivery</span>
        </div>
      </div>
    </footer>
  );
};
