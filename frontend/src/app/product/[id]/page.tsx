"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useShop } from "../../../context/ShopContext";
import styles from "./product.module.css";
import { 
  Heart, 
  ShoppingBag, 
  Minus, 
  Plus, 
  Star, 
  ArrowLeft, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  Check,
  Flame,
  Leaf,
  Scale,
  Activity,
  Heart as HeartIcon
} from "lucide-react";
import { Product, Review } from "../../../types";

// Dynamic verified reviews generator based on product category & name
const getMockReviews = (category: string, productName: string) => {
  const common = [
    {
      id: "rev-1",
      userName: "Rajesh M.",
      rating: 5,
      date: "May 24, 2026",
      comment: `Absolutely premium quality ${productName}! The size is huge, uniform, and they are incredibly crisp. Best I've ordered online. Highly recommend soaking them overnight.`
    },
    {
      id: "rev-2",
      userName: "Ananya S.",
      rating: 5,
      date: "May 18, 2026",
      comment: "Top tier quality, FSSAI certified sorting is obvious. Zero bitter pieces, vacuum-sealed canister is very handy. Arrived within 2 days in perfect condition."
    }
  ];

  if (category === "makhana") {
    return [
      ...common,
      {
        id: "rev-3",
        userName: "Rohit G.",
        rating: 5,
        date: "May 12, 2026",
        comment: "Super light, roasted perfectly and peri-peri seasoning is delicious! Perfect high-protein snack for weight loss. Keeps me full for hours."
      },
      {
        id: "rev-4",
        userName: "Priya D.",
        rating: 4,
        date: "May 02, 2026",
        comment: "Crispiest makhanas I've ever bought. Standard stores usually have stale ones but Ministry of Nuts delivered completely fresh canisters."
      }
    ];
  }

  if (category === "crazy-bites") {
    return [
      ...common,
      {
        id: "rev-3",
        userName: "Vikram K.",
        rating: 5,
        date: "May 10, 2026",
        comment: "The umami kick of black pepper and pink salt is spot on! Roasted perfectly, not too oily, absolute daily crunch champion. Packaging was sealed airtight."
      },
      {
        id: "rev-4",
        userName: "Sneha P.",
        rating: 5,
        date: "Apr 28, 2026",
        comment: "Cheese cashews are extremely addictive! Kids loved it. The peri peri ones have the perfect medium kick. Buying a saver pack next."
      }
    ];
  }

  if (category === "gift-hampers") {
    return [
      ...common,
      {
        id: "rev-3",
        userName: "SellPro Corporate",
        rating: 5,
        date: "May 14, 2026",
        comment: "Bought the Red Mandala chakra tray for corporate gifting. The gold sleeve was beautiful, and everyone loved the quality of the almonds and walnuts. 100% buying again."
      },
      {
        id: "rev-4",
        userName: "Kabir S.",
        rating: 5,
        date: "Apr 26, 2026",
        comment: "Exquisite presentation pack. The airtight canisters inside the box keep the dry fruits crispy. Beautiful standard of craftsmanship."
      }
    ];
  }

  // Classic or default
  return [
    ...common,
    {
      id: "rev-3",
      userName: "Dr. Amit R.",
      rating: 5,
      date: "May 15, 2026",
      comment: "Superb whole dry fruits. Handpicked, uniform size, perfect fresh snap when chewed. Essential source of healthy fats and protein for my family."
    },
    {
      id: "rev-4",
      userName: "Meera N.",
      rating: 4,
      date: "May 05, 2026",
      comment: "Airtight canister is excellent. The almonds and cashews are sweet, big, and fully fresh. Highly premium standards!"
    }
  ];
};

// Dynamic health and nutrition benefits highlights
const getNutritionHighlights = (category: string) => {
  if (category === "makhana") {
    return [
      { label: "High Calcium", desc: "Supports bone density & strength", icon: Activity },
      { label: "Low Calorie", desc: "Guilt-free weight management snack", icon: Scale },
      { label: "Plant Protein", desc: "Crucial for daily muscle repair", icon: Flame },
      { label: "Gluten Free", desc: "100% natural, easily digestible", icon: Leaf }
    ];
  }
  if (category === "exotic-fruits") {
    return [
      { label: "Antioxidant Rich", desc: "Fights cellular stress and aging", icon: Sparkles },
      { label: "Dietary Fiber", desc: "Promotes healthy gut and digestion", icon: Leaf },
      { label: "Natural Sugars", desc: "Provides clean, sustained energy", icon: Flame },
      { label: "Vitamins Pack", desc: "High in Potassium & Vitamin K", icon: Activity }
    ];
  }
  if (category === "gift-hampers") {
    return [
      { label: "Powerhouse Mix", desc: "Robust mix of daily micronutrients", icon: Sparkles },
      { label: "Immunity Boost", desc: "Rich in Zinc & essential vitamins", icon: ShieldCheck },
      { label: "Brain & Heart Care", desc: "Loaded with Omega-3 & Vitamin E", icon: HeartIcon },
      { label: "Festive Joy", desc: "Crafted for premium wellness gifting", icon: Leaf }
    ];
  }
  // Classic or crazy-bites (nuts)
  return [
    { label: "Heart Healthy", desc: "Loaded with monounsaturated healthy fats", icon: HeartIcon },
    { label: "High Protein", desc: "Builds and recovers muscle tissues", icon: Flame },
    { label: "Vitamin E Boost", desc: "Supports glowing skin and hair wellness", icon: Sparkles },
    { label: "Dietary Fiber", desc: "Balances digestive transit and cholesterol", icon: Leaf }
  ];
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();
  
  // States
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("narrative");
  const [isAdded, setIsAdded] = useState(false);

  // Zoom magnifier states
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});

  // Fetch product from backend API on mount or ID change
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
        const res = await fetch(`${baseUrl}/api/products/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  // Set default variant when product is loaded
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant("Standard");
    }
  }, [product]);

  if (loading) {
    return (
      <div className={styles.container} style={{ textAlign: "center", padding: "12rem 2rem" }}>
        <h2 style={{ fontSize: "1.8rem", color: "var(--color-accent-gold)", marginBottom: "1rem", fontWeight: "600" }}>
          Loading Gourmet Selection
        </h2>
        <p style={{ color: "var(--color-text-muted)" }}>Sourcing premium raw ingredients...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.container} style={{ textAlign: "center", padding: "10rem 2rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "var(--color-text-primary)" }}>Product Not Found</h2>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem" }}>
          The requested premium dry fruits pack does not exist or has been removed from our current inventory.
        </p>
        <Link href="/" className="glow-btn" style={{ padding: "1rem 2.5rem", borderRadius: "var(--radius-full)" }}>
          Return to Storefront Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    router.push("/checkout");
  };

  // Image zoom magnifier effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.8)"
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const inWish = isInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  // Retrieve dynamic content
  const reviewsList = product.reviews || [];
  const highlights = getNutritionHighlights(product.category);

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbs}>
        <Link href="/">Home</Link>
        <ChevronRight size={12} />
        <Link href="/#collections" style={{ textTransform: "capitalize" }}>{product.categoryLabel}</Link>
        <ChevronRight size={12} />
        <span className={styles.activeBreadcrumb}>{product.name}</span>
      </div>

      <div className={styles.split}>
        {/* --- LEFT PANEL: GALLERY --- */}
        <div className={styles.galleryColumn}>
          <div className={styles.gallery}>
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className={styles.thumbnails}>
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    className={`${styles.thumbBtn} ${idx === activeImageIdx ? styles.thumbBtnActive : ""}`}
                    onClick={() => setActiveImageIdx(idx)}
                  >
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                      <Image 
                        src={img} 
                        alt={`${product.name} detail view ${idx + 1}`}
                        fill
                        sizes="80px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Main Visual Display */}
            <div 
              className={styles.mainImageContainer}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Image 
                src={product.images ? product.images[activeImageIdx] : product.image} 
                alt={product.name}
                fill
                className={styles.mainImage}
                style={zoomStyle}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* --- RIGHT PANEL: PRODUCT OPTIONS --- */}
        <div className={styles.infoPanel}>
          {product.badge && <span className={styles.badge}>{product.badge}</span>}
          
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill={i < Math.floor(product.rating) ? "var(--color-accent-gold)" : "none"} 
                  color="var(--color-accent-gold)"
                />
              ))}
            </div>
            <span>{product.rating} / 5.0 ({product.reviewsCount} verified customer reviews)</span>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.priceRow}>
              <span className={styles.price}>₹{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className={styles.originalPrice}>₹{product.originalPrice.toFixed(2)}</span>
                  <span className={styles.discountBadge}>SAVE {discountPercent}%</span>
                </>
              )}
            </div>
            {product.category === "classic" && product.name.includes("1 KG") && (
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", color: "var(--color-accent-gold)", fontSize: "0.85rem", marginTop: "0.8rem", fontWeight: "700" }}>
                <Sparkles size={14} />
                <span>Bonus: Free airtight storage canister included with this pack!</span>
              </div>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* Dynamic Category Highlights Grid */}
          <div className={styles.highlightsMiniGrid}>
            {highlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className={styles.highlightMiniCard}>
                  <div className={styles.highlightMiniIcon}>
                    <IconComp size={16} />
                  </div>
                  <div className={styles.highlightMiniText}>
                    <strong>{item.label}</strong>
                    <span>{item.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stock Beacon */}
          <div className={styles.stockIndicator}>
            <span 
              className={styles.stockPulse} 
              style={{ 
                background: product.inStock ? "#10b981" : "var(--color-accent-crimson)"
              }}
            />
            {product.inStock ? (
              product.stockCount <= 10 ? (
                <span style={{ color: "var(--color-accent-gold)" }}>
                  Extremely Limited Stock: Only {product.stockCount} items remaining
                </span>
              ) : (
                <span style={{ color: "#10b981" }}>Nitrogen-Flushed & Ready for Immediate Dispatch</span>
              )
            ) : (
              <span style={{ color: "var(--color-accent-crimson)" }}>Out of Stock - Resupplying soon</span>
            )}
          </div>

          {/* Variant Selectors */}
          {product.variants && product.variants.length > 0 && (
            <div className={styles.selectionGroup}>
              <span className={styles.selectionLabel}>
                {product.category === "gift-hampers" ? "Select Presentation Packing" : "Select Net Weight Pack"}
              </span>
              <div className={styles.variantsGrid}>
                {product.variants.map((v: string) => (
                  <button
                    key={v}
                    className={`${styles.variantBtn} ${selectedVariant === v ? styles.variantBtnActive : ""}`}
                    onClick={() => setSelectedVariant(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions Bar */}
          <div className={styles.actionRow}>
            {product.inStock && (
              <div className={styles.qtySelector}>
                <button 
                  className={styles.qtyBtn}
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className={styles.qtyVal}>{quantity}</span>
                <button 
                  className={styles.qtyBtn}
                  onClick={() => setQuantity((prev) => (product.stockCount ? Math.min(product.stockCount, prev + 1) : prev + 1))}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}

            {product.inStock ? (
              <button 
                className={`${styles.addToCartBtn} glow-btn`}
                style={isAdded ? { background: "#10b981", boxShadow: "none" } : undefined}
                onClick={handleAddToCart}
                disabled={isAdded}
              >
                {isAdded ? (
                  <>
                    <Check size={20} /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} /> Add to Bag
                  </>
                )}
              </button>
            ) : (
              <button 
                className={styles.addToCartBtn} 
                style={{ background: "var(--color-text-muted)", cursor: "not-allowed", border: "none" }}
                disabled
              >
                Temporarily Sold Out
              </button>
            )}

            <button
              className={`${styles.wishlistBtn} ${inWish ? styles.wishlistBtnActive : ""}`}
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle Wishlist"
            >
              <Heart size={22} fill={inWish ? "var(--color-accent-crimson)" : "none"} />
            </button>
          </div>

          {product.inStock && (
            <button 
              className={styles.buyNowBtn}
              onClick={handleBuyNow}
            >
              Buy It Now (Express Checkout)
            </button>
          )}

          {/* Artisanal Snacking & Gifting Guidelines Box */}
          <div className={styles.snackGuideBox}>
            <div className={styles.snackGuideHeader}>
              <Sparkles size={16} className="gold-gradient-text" />
              <span className="gold-gradient-text">Artisanal Snacking Guidelines</span>
            </div>
            <div className={styles.snackGuideGrid}>
              <div className={styles.snackGuideItem}>
                <strong>Daily Dose</strong>
                <span>5 - 10 activated nuts in the morning.</span>
              </div>
              <div className={styles.snackGuideItem}>
                <strong>Optimal Soak</strong>
                <span>Soak for 8 hours to unlock maximum minerals.</span>
              </div>
              <div className={styles.snackGuideItem}>
                <strong>Freshness Seal</strong>
                <span>Airtight seal guarantees crisp snap for 9 months.</span>
              </div>
            </div>
          </div>

          {/* Trust Pillars Row */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <ShieldCheck size={18} />
              <span>100% FSSAI Certified Pack</span>
            </div>
            <div className={styles.trustItem}>
              <RotateCcw size={18} />
              <span>Slow-Roasted Sourcing</span>
            </div>
            <div className={styles.trustItem}>
              <ShoppingBag size={18} />
              <span>Complimentary Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- NARRATIVE TABS SECTION --- */}
      <section className={styles.tabsContainer}>
        <div className={styles.tabsHeader}>
          <button 
            className={`${styles.tabBtn} ${activeTab === "narrative" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("narrative")}
          >
            Artisanal Narrative
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === "specs" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("specs")}
          >
            Technical Specifications
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === "reviews" ? styles.tabBtnActive : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Verified Reviews ({reviewsList.length})
          </button>
        </div>

        <div className={styles.tabPanel}>
          {activeTab === "narrative" && (
            <div className="animate-fade-in">
              <p className={styles.tabHighlight}>
                Handpicked selection of whole, uniform, nutrient-dense premium dry fruits.
              </p>
              <p>{product.longDescription || product.description}</p>
              <p>
                Every single nut and berry under the Ministry of Nuts program goes through rigorous manual inspections and automatic sorting in FSSAI-compliant clean facilities. This ensures zero bitterness, maximum structural integrity, and clean snacking. 
              </p>
              <p>
                All items are sealed in nitrogen-flushed, airtight containers to fully protect their rich natural minerals, healthy essential oils, and crisp texture from degradation, safekeeping their peak crunchiness for up to 9 months.
              </p>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="animate-fade-in">
              <table className={styles.specsTable}>
                <tbody>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{val as string}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className={`${styles.reviewsList} animate-fade-in`}>
              {reviewsList.map((rev: Review) => (
                <div key={rev.id} className={styles.reviewItem}>
                  <div className={styles.reviewMeta}>
                    <span className={styles.reviewUser}>{rev.userName} <span style={{ color: "#10b981", fontSize: "0.7rem", marginLeft: "0.5rem", fontWeight: "700" }}>✓ Verified Buyer</span></span>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            fill={i < rev.rating ? "var(--color-accent-gold)" : "none"} 
                            color="var(--color-accent-gold)"
                          />
                        ))}
                      </div>
                      <span className={styles.reviewDate}>{rev.date}</span>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- RELATED PRODUCTS RECOMMENDATION --- */}
      {relatedProducts.length > 0 && (
        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>Recommended Curations</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((rel) => (
              <Link 
                href={`/product/${rel.id}`} 
                key={rel.id} 
                className={styles.card}
                style={{ height: "420px" }}
              >
                <div className={styles.imageContainer} style={{ height: "250px", position: "relative" }}>
                  <Image 
                    src={rel.image} 
                    alt={rel.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                </div>
                <div className={styles.details} style={{ padding: "1.2rem" }}>
                  <div>
                    <p className={styles.categoryLabel} style={{ fontSize: "0.7rem" }}>{rel.categoryLabel}</p>
                    <h3 className={styles.productName} style={{ fontSize: "1rem", height: "2.4rem" }}>{rel.name}</h3>
                  </div>
                  <div className={styles.priceRow} style={{ marginTop: "0.5rem" }}>
                    <span className={styles.price} style={{ fontSize: "1.1rem" }}>₹{rel.price.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
