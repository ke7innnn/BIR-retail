"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "../context/ShopContext";
import styles from "./page.module.css";
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Gift,
  Check,
  Leaf,
  Award,
  Users,
  Zap
} from "lucide-react";
import { Product } from "../types";

const HERO_SLIDES = [
  {
    id: "slide-1",
    subtitle: "India's Fastest Growing Dryfruits Brand",
    title: "Premium California Almonds",
    desc: "Sourced from pristine orchards, our classic almonds are packed with heart-healthy oils, vitamin E, and a supreme crisp crunch. Free airtight container included with our 1 KG saver pack!",
    image: "/images/products/california-almonds-1-kg.jpg",
    ctaLink: "/product/california-almonds-1-kg"
  },
  {
    id: "slide-2",
    subtitle: "Exquisite Festive Gifting",
    title: "Mandala Premium Gift Trays",
    desc: "Give the gift of healthy, gourmet snacking. A beautiful premium pack containing five of our finest dry fruit varieties cocooned in a spectacular gold-patterned chakra sleeve.",
    image: "/images/products/family-pack-of-5-premium-dry-fruits-i-red-750g-with-golden-pattern-sleeves.jpg",
    ctaLink: "/product/family-pack-of-5-premium-dry-fruits-i-red-750g-with-golden-pattern-sleeves"
  },
  {
    id: "slide-3",
    subtitle: "Gourmet Savory Bites",
    title: "Crazy Cashews Pepper & Pink Salt",
    desc: "Jumbo slow-roasted cashews gently seasoned with pure Himalayan pink salt and cracked black pepper. The perfect umami-rich companion for healthy, daily crunching.",
    image: "/images/products/crazy-cashew-black-pepper-salt-flavour-100g.jpg",
    ctaLink: "/product/crazy-cashew-black-pepper-salt-flavour-100g"
  }
];

const CATEGORIES_CIRCULAR = [
  {
    id: "cat-1",
    label: "Classic Dry Fruits",
    categoryName: "classic",
    image: "/images/products/california-almonds-1-kg.jpg"
  },
  {
    id: "cat-2",
    label: "Crazy Bites",
    categoryName: "crazy-bites",
    image: "/images/products/crazy-cashew-black-pepper-salt-flavour-100g.jpg"
  },
  {
    id: "cat-3",
    label: "Makhana Masti",
    categoryName: "makhana",
    image: "/images/products/makhana-masti-peri-peri.jpg"
  },
  {
    id: "cat-4",
    label: "Exotic & Honey",
    categoryName: "exotic-fruits",
    image: "/images/products/silver-leaf-honey-200g.jpg"
  },
  {
    id: "cat-5",
    label: "Gift Packs & Hampers",
    categoryName: "gift-hampers",
    image: "/images/products/family-pack-of-5-premium-dry-fruits-i-red-750g-with-golden-pattern-sleeves.jpg"
  }
];

export default function Home() {
  const { products, categories, activeCategory, setActiveCategory, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Auto rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Filter products based on active category
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault(); // Stop click propagating to the product link
    addToCart(product, 1);
    
    // Quick visual feedback
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  return (
    <main className={styles.main}>
      {/* --- HERO BANNER --- */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          {HERO_SLIDES.map((slide, idx) => (
            <Image 
              key={slide.id}
              src={slide.image} 
              alt={slide.title}
              fill
              className={`${styles.heroImage} ${idx === currentSlide ? styles.heroImageActive : ""}`}
              priority={idx === 0}
            />
          ))}
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>
            <Sparkles size={12} />
            India&apos;s Fastest Growing Dryfruits Brand
          </div>
          <h1 className={styles.heroTitle}>{HERO_SLIDES[currentSlide].title}</h1>
          <p className={styles.heroDesc}>{HERO_SLIDES[currentSlide].desc}</p>
          <Link href={HERO_SLIDES[currentSlide].ctaLink} className={styles.heroCta}>
            Explore Now <ArrowRight size={17} />
          </Link>
        </div>

        <div className={styles.heroIndicators}>
          {HERO_SLIDES.map((_, idx) => (
            <button 
              key={idx}
              className={`${styles.indicator} ${idx === currentSlide ? styles.indicatorActive : ""}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className={styles.heroScrollHint}>
          <div className={styles.heroScrollLine} />
          <span>Scroll</span>
        </div>
      </section>

      {/* --- TRUST STRIP --- */}
      <div className={styles.trustStrip}>
        {/* trustTrack holds 2 identical sets — CSS animates translateX(-50%) for seamless loop */}
        <div className={styles.trustTrack} aria-hidden="false">
          {/* Set 1 */}
          <div className={styles.trustStripItem}><ShieldCheck size={15} /> FSSAI Certified Quality</div>
          <div className={styles.trustStripItem}><Truck size={15} /> Free Shipping over ₹499</div>
          <div className={styles.trustStripItem}><Leaf size={15} /> 100% Natural &amp; Preservative Free</div>
          <div className={styles.trustStripItem}><Award size={15} /> 1M+ Happy Families</div>
          <div className={styles.trustStripItem}><ShieldCheck size={15} /> FSSAI Certified Quality</div>
          <div className={styles.trustStripItem}><Truck size={15} /> Free Shipping over ₹499</div>
          <div className={styles.trustStripItem}><Leaf size={15} /> 100% Natural &amp; Preservative Free</div>
          <div className={styles.trustStripItem}><Award size={15} /> 1M+ Happy Families</div>
          {/* Set 2 — exact duplicate for seamless wrap */}
          <div className={styles.trustStripItem}><ShieldCheck size={15} /> FSSAI Certified Quality</div>
          <div className={styles.trustStripItem}><Truck size={15} /> Free Shipping over ₹499</div>
          <div className={styles.trustStripItem}><Leaf size={15} /> 100% Natural &amp; Preservative Free</div>
          <div className={styles.trustStripItem}><Award size={15} /> 1M+ Happy Families</div>
          <div className={styles.trustStripItem}><ShieldCheck size={15} /> FSSAI Certified Quality</div>
          <div className={styles.trustStripItem}><Truck size={15} /> Free Shipping over ₹499</div>
          <div className={styles.trustStripItem}><Leaf size={15} /> 100% Natural &amp; Preservative Free</div>
          <div className={styles.trustStripItem}><Award size={15} /> 1M+ Happy Families</div>
        </div>
      </div>

      {/* --- CIRCULAR COLLECTIONS CATEGORIES --- */}
      <section className={styles.circularSection}>
        <div className={styles.circularHeader}>
          <span className={styles.circularSubtitle}>Quick Shop by Category</span>
          <h2 className={styles.circularTitle}>Premium Collections</h2>
        </div>
        <div className={styles.circularGrid}>
          {CATEGORIES_CIRCULAR.map((item) => (
            <button
              key={item.id}
              className={styles.circularCard}
              onClick={() => {
                setActiveCategory(item.categoryName);
                const elem = document.getElementById("collections");
                if (elem) elem.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className={styles.circularImageContainer}>
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="120px"
                  className={styles.circularImage}
                />
              </div>
              <span className={styles.circularLabel}>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* --- PRODUCT CATALOG SECTION --- */}
      <section className={styles.section} id="collections">
        <div className={styles.sectionHeader}>
          <div>
            <div style={{ display: "flex", gap: "0.5rem", color: "var(--color-accent-gold)", marginBottom: "0.5rem" }}>
              <Sparkles size={16} />
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "700" }}>Gourmet Selection</span>
            </div>
            <h2 className={styles.sectionTitle}>Shop Products</h2>
            <p className={styles.sectionDesc}>
              Experience the highest standard of clean, healthy snacking. Slow-roasted, sun-dried, and hand-inspected in FSSAI clean rooms.
            </p>
          </div>

          {/* Category Pill Filters */}
          <div className={styles.categoriesWrapper + " no-scrollbar"}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.categoryTab} ${activeCategory === cat.name ? styles.categoryTabActive : ""}`}
                onClick={() => setActiveCategory(cat.name)}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className={styles.grid}>
          {filteredProducts.map((product) => {
            const inWish = isInWishlist(product.id);
            const isAdded = addedProductId === product.id;
            
            return (
              <Link href={`/product/${product.id}`} key={product.id} className={styles.card}>
                {product.badge && <span className={styles.badge}>{product.badge}</span>}
                
                <button
                  className={`${styles.wishlistBtn} ${inWish ? styles.wishlistBtnActive : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product.id);
                  }}
                  aria-label="Add to Wishlist"
                >
                  <Heart size={16} fill={inWish ? "var(--color-accent-crimson)" : "none"} />
                </button>

                <div className={styles.imageContainer}>
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  
                  {/* Quick Add Button Overlay */}
                  <div className={styles.quickAddOverlay}>
                    {product.inStock ? (
                      <button 
                        className={`${styles.quickAddBtn} ${isAdded ? "glow-btn" : "glow-btn"}`}
                        style={isAdded ? { background: "#10b981", boxShadow: "none" } : undefined}
                        onClick={(e) => handleQuickAdd(product, e)}
                        disabled={isAdded}
                      >
                        {isAdded ? (
                          <>
                            <Check size={16} /> Added to Bag
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={16} /> Quick Add to Bag
                          </>
                        )}
                      </button>
                    ) : (
                      <button 
                        className={styles.quickAddBtn} 
                        style={{ background: "var(--color-text-muted)", cursor: "not-allowed" }}
                        disabled
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>

                <div className={styles.details}>
                  <div>
                    <p className={styles.categoryLabel}>{product.categoryLabel}</p>
                    <h3 className={styles.productName}>{product.name}</h3>
                    
                    <div className={styles.ratingRow}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            fill={i < Math.floor(product.rating) ? "var(--color-accent-gold)" : "none"} 
                            color="var(--color-accent-gold)"
                          />
                        ))}
                      </div>
                      <span>({product.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <div className={styles.priceRow}>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* --- B2B TRADE PARTNER PROGRAM SECTION --- */}
      <section className={styles.tradePartnerSection} id="trade-partner">
        <div className={styles.tradePartnerContent}>
          <div className={styles.tradePartnerText}>
            <div className={styles.tradeEyebrow}>
              <Gift size={13} /> B2B &amp; Partnerships
            </div>
            <h2 className={styles.tradeTitle}>Trade Partner Program</h2>
            <p className={styles.tradeDesc}>
              We are inviting retailers, distributors, super stockists, and wholesalers to partner with us in spreading the joy of healthy, organic snacking worldwide.
            </p>
            <ul className={styles.tradeBenefitsList}>
              <li>
                <span className={styles.tradeBenefitIcon}>✓</span>
                <span><strong style={{ color: '#fff', fontWeight: 700 }}>High Earning Potential</strong> — Exceptional margins and regular B2B support.</span>
              </li>
              <li>
                <span className={styles.tradeBenefitIcon}>✓</span>
                <span><strong style={{ color: '#fff', fontWeight: 700 }}>Fast Nationwide Delivery</strong> — Direct shipments from FSSAI clean rooms.</span>
              </li>
              <li>
                <span className={styles.tradeBenefitIcon}>✓</span>
                <span><strong style={{ color: '#fff', fontWeight: 700 }}>Exchange Program</strong> — 100% exchange guarantee on near-expiry batches.</span>
              </li>
              <li>
                <span className={styles.tradeBenefitIcon}>✓</span>
                <span><strong style={{ color: '#fff', fontWeight: 700 }}>Dedicated Account Manager</strong> — Direct helpline for all B2B operations.</span>
              </li>
            </ul>
          </div>

          <div className={styles.tradePartnerCard}>
            <h3 className={styles.formTitle}>Partner Inquiry</h3>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! Your Trade Partner inquiry has been received. Our team will contact you shortly.");
                e.currentTarget.reset();
              }} 
              className={styles.tradeForm}
            >
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Company Name</label>
                <input required type="text" placeholder="Your corporate name" className={styles.formInput} />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Name</label>
                  <input required type="text" placeholder="Full Name" className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Contact Number</label>
                  <input required type="tel" placeholder="Mobile phone" className={styles.formInput} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Partner Type</label>
                <select required className={styles.formSelect}>
                  <option value="">Select Option</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Stockist">Super Stockist</option>
                  <option value="Wholesaler">Wholesaler</option>
                </select>
              </div>
              <button type="submit" className={styles.tradeSubmitBtn}>
                <Zap size={16} /> Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- TRUST STATS SECTION (BY THE NUMBERS) --- */}
      <section className={styles.statsSection}>
        <div className={styles.statsHeader}>
          <span className={styles.statsSubtitle}>Our Growth Story</span>
          <h2 className={styles.statsTitle}>Birla Nuts by Numbers</h2>
        </div>
        <div className={styles.statsGrid}>
          <div className={styles.statsCard}>
            <div className={styles.statsIconWrap}><Users size={26} /></div>
            <span className={styles.statsNumber}>1M+</span>
            <span className={styles.statsLabel}>Happy Families Served</span>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.statsIconWrap}><Heart size={26} /></div>
            <span className={styles.statsNumber}>70%</span>
            <span className={styles.statsLabel}>Repeat Purchases</span>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.statsIconWrap}><Star size={26} /></div>
            <span className={styles.statsNumber}>4.8★</span>
            <span className={styles.statsLabel}>Average Product Rating</span>
          </div>
          <div className={styles.statsCard}>
            <div className={styles.statsIconWrap}><ShieldCheck size={26} /></div>
            <span className={styles.statsNumber}>100%</span>
            <span className={styles.statsLabel}>FSSAI Certified</span>
          </div>
        </div>
      </section>

      {/* --- EDITORIAL / BRAND STANDARDS PLEDGE --- */}
      <section className={styles.editorial}>
        <div style={{ display: "inline-flex", gap: "0.5rem", color: "var(--color-accent-gold)", marginBottom: "1.5rem", background: "rgba(212,175,55,0.08)", padding: "0.5rem 1.2rem", borderRadius: "var(--radius-full)" }}>
          <Sparkles size={14} className="gold-gradient-text" />
          <span style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: "700" }} className="gold-gradient-text">The Birla Nuts Pledge</span>
        </div>
        
        <h2 className={styles.editorialTitle}>Uncompromised Quality</h2>
        <p className={styles.editorialText}>
          Every pack delivered through Birla Nuts represents an unyielding commitment to nutrition, hygienic handling, and natural crunchiness.
        </p>

        <div className={styles.editorialGrid}>
          <div className={styles.editorialItem}>
            <div className={styles.iconWrapper}>
              <ShieldCheck size={32} />
            </div>
            <h4>Hygienic Sorting</h4>
            <p>Every single nut is hand-sorted in an FSSAI-compliant clean facility to guarantee zero damage, dust, or bitter kernels.</p>
          </div>

          <div className={styles.editorialItem}>
            <div className={styles.iconWrapper}>
              <Truck size={32} />
            </div>
            <h4>Sun-Dried & Raw</h4>
            <p>Our classic dry fruits are carefully sun-dried at source or low-temperature roasted to fully preserve heart-healthy essential oils.</p>
          </div>

          <div className={styles.editorialItem}>
            <div className={styles.iconWrapper}>
              <Gift size={32} />
            </div>
            <h4>Gifting Craftsmanship</h4>
            <p>Our elegant, mandala-themed gift packs are assembled by hand, creating the ultimate standard in corporate and family wellness presents.</p>
          </div>

          <div className={styles.editorialItem}>
            <div className={styles.iconWrapper}>
              <Sparkles size={32} />
            </div>
            <h4>Pristine Freshness</h4>
            <p>All items are sealed in premium airtight canisters or nitrogen-flushed packs to safeguard their fresh, crisp snap for up to 9 months.</p>
          </div>
        </div>
      </section>

      {/* --- SOCIAL / INSTAGRAM GRID --- */}
      <section className={styles.socialGridSection}>
        <div className={styles.socialHeader}>
          <span className={styles.socialSubtitle}>Join the Munch Community</span>
          <h2 className={styles.socialTitle}>Healthy Snacking #BirlaHuts</h2>
        </div>
        <div className={styles.socialGrid}>
          <div className={styles.socialCard}>
            <Image fill src="/images/products/california-almonds-1-kg.jpg" alt="Social Almonds snack post" className={styles.socialImage} sizes="300px" />
            <div className={styles.socialHoverOverlay}>
              <span>♥ 14.2k</span>
            </div>
          </div>
          <div className={styles.socialCard}>
            <Image fill src="/images/products/family-pack-of-5-premium-dry-fruits-i-red-750g-with-golden-pattern-sleeves.jpg" alt="Social Gifting pack post" className={styles.socialImage} sizes="300px" />
            <div className={styles.socialHoverOverlay}>
              <span>♥ 9.8k</span>
            </div>
          </div>
          <div className={styles.socialCard}>
            <Image fill src="/images/products/makhana-masti-peri-peri.jpg" alt="Social Makhana peri-peri post" className={styles.socialImage} sizes="300px" />
            <div className={styles.socialHoverOverlay}>
              <span>♥ 18.5k</span>
            </div>
          </div>
          <div className={styles.socialCard}>
            <Image fill src="/images/products/silver-leaf-honey-200g.jpg" alt="Social Honey jar post" className={styles.socialImage} sizes="300px" />
            <div className={styles.socialHoverOverlay}>
              <span>♥ 7.4k</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
