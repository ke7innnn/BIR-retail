"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useShop } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  User
} from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#collections", label: "Gourmet Nuts" },
  { href: "/cart", label: "Luxury Cart" },
  { href: "/checkout", label: "Checkout" },
];

export const Header: React.FC = () => {
  const { cart, wishlist, removeFromCart, updateCartQuantity, getCartTotal, getCartCount } = useShop();
  const { user, isAuthenticated, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsCartOpen(false);
    setIsMenuOpen(false);
    if (typeof window !== "undefined") {
      setCurrentHash(window.location.hash);
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        setCurrentHash(window.location.hash);
      };
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  // Lock body scroll when drawers are open
  useEffect(() => {
    document.body.style.overflow = (isCartOpen || isMenuOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen, isMenuOpen]);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && (!currentHash || currentHash === "");
    }
    const [path, hash] = href.split("#");
    if (hash) {
      return pathname === path && currentHash === `#${hash}`;
    }
    return pathname.startsWith(path) && path !== "/";
  };

  const showScrolledHeader = isScrolled || pathname !== "/";

  return (
    <>
      <header className={`${styles.header} ${showScrolledHeader ? styles.scrolled : ""}`}>

        {/* ── LOGO ── */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>BIR</span>
          <span className={styles.logoText}>Retail</span>
        </Link>

        {/* ── DESKTOP NAV ── */}
        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ""}`}
              onClick={() => {
                const [_, hash] = link.href.split("#");
                setCurrentHash(hash ? `#${hash}` : "");
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── SEARCH ── */}
        <div className={`${styles.searchWrap} ${searchFocused ? styles.searchFocused : ""}`}>
          <Search size={15} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search almonds, cashews, makhana…"
            className={styles.searchInput}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search products"
          />
        </div>

        {/* ── ACTIONS ── */}
        <div className={styles.actions}>

          {/* Wishlist */}
          <Link href="/cart" className={styles.iconBtn} aria-label="Wishlist">
            <Heart size={19} />
            {wishlist.length > 0 && (
              <span className={styles.badge}>{wishlist.length}</span>
            )}
          </Link>

          {/* Cart */}
          <button
            className={styles.iconBtn}
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open cart, ${getCartCount()} items`}
          >
            <ShoppingBag size={19} />
            {getCartCount() > 0 && (
              <span className={styles.badge}>{getCartCount()}</span>
            )}
          </button>

          {/* User Profile / Sign In Dropdown */}
          {isAuthenticated ? (
            <div className={styles.profileDropdown}>
              <button className={styles.profileBtn} aria-label="User profile">
                {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
              </button>
              <div className={styles.profileMenu}>
                <div className={styles.profileInfo}>
                  <p className={styles.profileName}>{user?.full_name}</p>
                  <p className={styles.profileEmail}>{user?.email}</p>
                </div>
                <div className={styles.profileLinks}>
                  {user?.user_type === "admin" && (
                    <Link href="/admin/dashboard" className={styles.profileLink}>
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={logout} className={styles.logoutBtn}>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login" className={styles.iconBtn} aria-label="Sign In">
              <User size={19} />
            </Link>
          )}

          {/* CTA Button */}
          <Link href="/#collections" className={styles.shopNowBtn}>
            <Sparkles size={14} />
            Shop Now
          </Link>

          {/* Hamburger */}
          <button
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

        </div>
      </header>

      {/* ════════════════════════════════════════
          CART DRAWER
      ════════════════════════════════════════ */}
      <div
        className={`${styles.overlay} ${isCartOpen ? styles.overlayOpen : ""}`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`${styles.drawer} ${isCartOpen ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className={styles.drawerHead}>
          <div>
            <h3 className={styles.drawerTitle}>Shopping Bag</h3>
            <p className={styles.drawerSub}>{getCartCount()} item{getCartCount() !== 1 ? "s" : ""}</p>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className={styles.drawerBody}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <ShoppingBag size={36} strokeWidth={1.5} />
              </div>
              <h4 className={styles.emptyTitle}>Your bag is empty</h4>
              <p className={styles.emptyText}>
                Add premium almonds, jumbo cashews, and flavored crazy bites to begin.
              </p>
              <button
                className={styles.emptyBtn}
                onClick={() => setIsCartOpen(false)}
              >
                Start Browsing
              </button>
            </div>
          ) : (
            <div className={styles.cartItems}>
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedVariant}`} className={styles.cartItem}>
                  <div className={styles.itemImg}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="72px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.itemBody}>
                    <div>
                      <p className={styles.itemName}>{item.product.name}</p>
                      <p className={styles.itemVariant}>{item.selectedVariant}</p>
                    </div>
                    <div className={styles.itemFooter}>
                      <div className={styles.qtyRow}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateCartQuantity(item.product.id, item.selectedVariant, item.quantity - 1)}
                          aria-label="Decrease"
                        >
                          <Minus size={12} />
                        </button>
                        <span className={styles.qtyNum}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateCartQuantity(item.product.id, item.selectedVariant, item.quantity + 1)}
                          aria-label="Increase"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className={styles.itemPrice}>
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className={styles.drawerFoot}>
            <div className={styles.subtotalRow}>
              <span className={styles.subtotalLabel}>Subtotal</span>
              <span className={styles.subtotalVal}>₹{getCartTotal().toFixed(2)}</span>
            </div>
            <button className={styles.checkoutBtn} onClick={handleCheckoutClick}>
              Proceed to Checkout <ArrowRight size={16} />
            </button>
            <Link href="/cart" className={styles.viewCartLink} onClick={() => setIsCartOpen(false)}>
              View Full Cart
            </Link>
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════
          MOBILE MENU DRAWER
      ════════════════════════════════════════ */}
      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : ""}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`${styles.mobileDrawer} ${isMenuOpen ? styles.mobileDrawerOpen : ""}`}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
      >
        <div className={styles.drawerHead}>
          <Link href="/" className={styles.logo} onClick={() => setIsMenuOpen(false)}>
            <span className={styles.logoMark}>BIR</span>
            <span className={styles.logoText}>Retail</span>
          </Link>
          <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <div className={styles.mobileLinks}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${isActive(link.href) ? styles.mobileLinkActive : ""}`}
              onClick={() => {
                setIsMenuOpen(false);
                const [_, hash] = link.href.split("#");
                setCurrentHash(hash ? `#${hash}` : "");
              }}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
              <ArrowRight size={16} />
            </Link>
          ))}
          {!isAuthenticated && (
            <Link
              href="/login"
              className={styles.mobileLink}
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: `${NAV_LINKS.length * 60}ms` }}
            >
              Sign In
              <ArrowRight size={16} />
            </Link>
          )}
        </div>

        <div className={styles.mobileFoot}>
          {isAuthenticated ? (
            <div className={styles.mobileProfile}>
              <div>
                <p className={styles.mobileProfileName}>{user?.full_name}</p>
                <p className={styles.mobileProfileEmail}>{user?.email}</p>
              </div>
              {user?.user_type === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className={styles.profileLink}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontSize: "0.9rem", fontWeight: "600", textDecoration: "none" }}
                >
                  Admin Dashboard
                </Link>
              )}
              <button onClick={() => { logout(); setIsMenuOpen(false); }} className={styles.logoutBtn}>
                Log Out
              </button>
            </div>
          ) : (
            <>
              <div className={styles.mobileFootTag}>
                <Sparkles size={13} />
                India&apos;s Fastest Growing Dry Fruits Brand
              </div>
              <p className={styles.mobileFootText}>
                Experience the pinnacle of high-end dry fruits, nuts, makhana, and festive gift hampers.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
