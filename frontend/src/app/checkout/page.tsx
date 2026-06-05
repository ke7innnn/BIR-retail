"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useShop } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthContext";
import styles from "./checkout.module.css";
import { 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard as CardIcon,
  ShoppingBag,
  Gift
} from "lucide-react";

const DELIVERY_METHODS = [
  {
    id: "del-std",
    name: "Complimentary Carbon-Neutral Courier",
    desc: "Eco-regulated shipping delivered in 3 to 5 business days.",
    cost: 0
  },
  {
    id: "del-insulated",
    name: "Eco-Luxe Insulated Wrapping",
    desc: "Maintains optimal temperature and freshness for organic goods. 2-3 days.",
    cost: 5.00
  },
  {
    id: "del-express",
    name: "VIP Express Bullet Courier",
    desc: "Sovereign delivery direct to your residence in 1 business day.",
    cost: 20.00
  }
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, getCartCount, clearCart } = useShop();
  const { user, isLoading } = useAuth();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Prepopulate form if user is logged in
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      if (user.full_name) {
        const parts = user.full_name.trim().split(/\s+/);
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(" ") || "");
      }
    }
  }, [user]);

  // Checkout states
  const [activeStep, setActiveStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState(DELIVERY_METHODS[0]);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Retrieve gift instructions
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [giftNotes, setGiftNotes] = useState("");

  // Redirect if cart is empty on mount (but keep success screen accessible if completed)
  useEffect(() => {
    const savedCart = localStorage.getItem("cliq_luxe_cart");
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    if (parsedCart.length === 0 && !isSuccess) {
      router.push("/cart");
    }
  }, [cart, isSuccess, router]);
  useEffect(() => {
    try {
      const wrap = localStorage.getItem("cliq_luxe_gift_wrap");
      const notes = localStorage.getItem("cliq_luxe_gift_notes");
      if (wrap) setGiftWrapping(JSON.parse(wrap));
      if (notes) setGiftNotes(notes);
    } catch(e) {}
  }, []);

  // Form inputs
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  // Payment inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Tally costs
  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const shippingCost = deliveryMethod.cost;
  const grandTotal = subtotal + tax + shippingCost;

  // Formatting card number (4 groups of 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    
    // Group by 4
    const matched = value.match(/.{1,4}/g);
    setCardNumber(matched ? matched.join(" ") : value);
  };

  // Formatting expiry date (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    
    if (value.length > 2) {
      setCardExpiry(`${value.slice(0, 2)}/${value.slice(2)}`);
    } else {
      setCardExpiry(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCardCvv(value);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(2);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep(3);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Authorization simulation
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleSuccessClose = () => {
    clearCart();
    // Clear gift instructions
    localStorage.removeItem("cliq_luxe_gift_wrap");
    localStorage.removeItem("cliq_luxe_gift_notes");
    router.push("/");
  };

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

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageEyebrow}>
        <Lock size={12} /> Secure &amp; Encrypted Checkout
      </div>
      <h1 className={styles.title}>Secure Checkout</h1>

      <div className={styles.split}>
        {/* --- LEFT PANEL: ACCORDION FORMS --- */}
        <div className={styles.stepsSection}>
          
          {/* STEP 1: DELIVERY ADDRESS */}
          <div className={`${styles.stepCard} ${activeStep === 1 ? styles.stepCardActive : ""}`}>
            <div className={styles.stepHeader} onClick={() => setActiveStep(1)}>
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepTitle}>Contact & Delivery Address</span>
            </div>
            
            <div className={styles.stepContent}>
              <form onSubmit={handleAddressSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="name@domain.com"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>First Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Alexander"
                      className={styles.input}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Last Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Vanderbilt"
                      className={styles.input}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Street Address</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="742 Evergreen Terrace"
                    className={styles.input}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>City</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Beverly Hills"
                      className={styles.input}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Postal Code</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="90210"
                      className={styles.input}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+1 (555) 019-2834"
                    className={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className={styles.btnGroup}>
                  <button type="submit" className={`${styles.nextBtn} glow-btn`}>
                    Continue to Delivery Methods <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* STEP 2: COURIER METHODS */}
          <div className={`${styles.stepCard} ${activeStep === 2 ? styles.stepCardActive : ""}`}>
            <div className={styles.stepHeader} onClick={() => { if (email) setActiveStep(2); }}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepTitle}>Eco-Luxe Delivery Selection</span>
            </div>

            <div className={styles.stepContent}>
              <form onSubmit={handleShippingSubmit}>
                {DELIVERY_METHODS.map((method) => (
                  <div 
                    key={method.id} 
                    className={`${styles.deliveryOption} ${deliveryMethod.id === method.id ? styles.deliveryOptionActive : ""}`}
                    onClick={() => setDeliveryMethod(method)}
                  >
                    <div className={styles.deliveryInfo}>
                      <input 
                        type="radio" 
                        name="delivery"
                        checked={deliveryMethod.id === method.id}
                        onChange={() => setDeliveryMethod(method)}
                      />
                      <div className={styles.deliveryLabel}>
                        <span className={styles.deliveryName}>{method.name}</span>
                        <span className={styles.deliveryDesc}>{method.desc}</span>
                      </div>
                    </div>
                    <span className={styles.deliveryCost}>
                      {method.cost === 0 ? "Complimentary" : `$${method.cost.toFixed(2)}`}
                    </span>
                  </div>
                ))}

                <div className={styles.btnGroup}>
                  <button type="submit" className={`${styles.nextBtn} glow-btn`}>
                    Continue to Payment <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* STEP 3: INTERACTIVE PAYMENT GATEWAY */}
          <div className={`${styles.stepCard} ${activeStep === 3 ? styles.stepCardActive : ""}`}>
            <div className={styles.stepHeader} onClick={() => { if (email && deliveryMethod) setActiveStep(3); }}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepTitle}>Interactive Encrypted Payment</span>
            </div>

            <div className={styles.stepContent}>
              <div className={styles.paymentWrapper}>
                
                {/* 3D Gold styled Credit Card Mockup */}
                <div className={styles.creditCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardChip} />
                    <span className={styles.cardBrand}>BIRLA NUTS</span>
                  </div>

                  <div className={styles.cardNumber}>
                    {cardNumber || "•••• •••• •••• ••••"}
                  </div>

                  <div className={styles.cardFooter}>
                    <div>
                      <div className={styles.cardHolderName}>Cardholder Name</div>
                      <div className={styles.cardHolderVal}>
                        {cardName || "Vanderbilt Alexander"}
                      </div>
                    </div>
                    <div className={styles.cardExpiry}>
                      <div className={styles.cardExpiryLabel}>Expires</div>
                      <div className={styles.cardExpiryVal}>
                        {cardExpiry || "MM/YY"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Inputs Form */}
                <form onSubmit={handlePaymentSubmit} style={{ width: "100%" }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Cardholder Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Alexander Vanderbilt"
                      className={styles.input}
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Credit Card Number</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="4111 2222 3333 4444"
                      className={styles.input}
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Expiry Date</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="MM/YY"
                        className={styles.input}
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>CVV Security Code</label>
                      <input 
                        type="password" 
                        required 
                        placeholder="•••"
                        className={styles.input}
                        value={cardCvv}
                        onChange={handleCvvChange}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="glow-btn" 
                    style={{ width: "100%", padding: "1.2rem", borderRadius: "var(--radius-md)", fontSize: "1.05rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                    disabled={isAuthorizing}
                  >
                    {isAuthorizing ? (
                      <span>Authorizing Secure Transaction...</span>
                    ) : (
                      <>
                        <Lock size={16} /> Pay Securely ${grandTotal.toFixed(2)}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>

        {/* --- RIGHT PANEL: ORDER SUMMARY REVIEW --- */}
        <div className={styles.summaryReceipt}>
          <div className={styles.summaryTop}>
            <div className={styles.summaryTitle}>Review Purchase</div>
            <div className={styles.summaryItemsCount}>{getCartCount()} items in your order</div>
          </div>

          <div className={styles.summaryBody}>
            <div className={styles.summaryList}>
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedVariant}`} className={styles.summaryItem}>
                  <div className={styles.summaryImage}>
                    <Image 
                      src={item.product.image} 
                      alt={item.product.name}
                      fill
                      sizes="52px"
                    />
                  </div>
                  <div className={styles.summaryInfo}>
                    <h4 className={styles.summaryName}>{item.product.name}</h4>
                    <p className={styles.summaryMeta}>Qty: {item.quantity} • {item.selectedVariant}</p>
                  </div>
                  <span className={styles.summaryPrice}>
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {(giftWrapping || giftNotes) && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", background: "rgba(170,132,28,0.05)", border: "1px solid rgba(170,132,28,0.15)", padding: "1rem 1.2rem", borderRadius: "12px", fontSize: "0.8rem" }}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: "#aa841c", fontWeight: "700" }}>
                  <Gift size={14} />
                  <span>Gift Wrapping Services Active</span>
                </div>
                {giftNotes && (
                  <p style={{ color: "#5a5a62", lineHeight: "1.4" }}>
                    <strong>Gold Embossed Card:</strong> &quot;{giftNotes}&quot;
                  </p>
                )}
              </div>
            )}

            <div className={styles.summaryCalculations}>
              <div className={styles.summaryRow}>
                <span>Subtotal ({getCartCount()} items)</span>
                <span className={styles.summaryRowVal}>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Estimated Shipping</span>
                <span>
                  {deliveryMethod.cost === 0 ? (
                    <span className={styles.summaryRowFree}>Complimentary</span>
                  ) : (
                    <span className={styles.summaryRowVal}>₹{deliveryMethod.cost.toFixed(2)}</span>
                  )}
                </span>
              </div>

              <div className={styles.summaryRow}>
                <span>GST (5%)</span>
                <span className={styles.summaryRowVal}>₹{tax.toFixed(2)}</span>
              </div>

              <div className={styles.summaryTotalRow}>
                <span>Estimated Total</span>
                <span className={styles.summaryTotalVal}>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className={styles.summaryTrust}>
              <div className={styles.summaryTrustBadge}>
                <ShieldCheck size={14} /> Complimentary Returns
              </div>
              <p>Enjoy our 30-day premium return policy with pre-paid white glove pick-up options.</p>
            </div>
          </div>
        </div>

      </div>

      {/* --- PREMIUM ORDER SUCCESS CELEBRATION MODAL --- */}
      <div className={`${styles.modalOverlay} ${isSuccess ? styles.modalOverlayOpen : ""}`}>
        <div className={styles.modal}>
          <div className={styles.modalIcon}>
            <CheckCircle2 size={48} />
          </div>

          <div style={{ display: "inline-flex", gap: "0.5rem", color: "var(--color-accent-gold)", marginBottom: "1rem", background: "rgba(212,175,55,0.08)", padding: "0.5rem 1.2rem", borderRadius: "var(--radius-full)" }}>
            <Sparkles size={14} className="gold-gradient-text" />
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: "700" }} className="gold-gradient-text">Purchase Completed</span>
          </div>

          <h2 className={styles.modalTitle}>Order Placed Successfully</h2>
          
          <p className={styles.modalText}>
            Thank you for shopping at Birla Nuts, <strong>{firstName || "Alexander"}</strong>. Your transaction has been approved securely. Order code <strong>#BN-29837</strong> has been initialized. A confirmation receipt has been dispatched to <strong>{email || "your email"}</strong>.
          </p>

          {/* Progress tracker inside modal */}
          <div className={styles.tracker}>
            <div className={styles.trackerLine} />
            <div className={styles.trackerProgress} />
            
            <div className={`${styles.trackerStep} ${styles.trackerStepDone}`}>
              <div className={styles.trackerNode}>
                <CheckCircle2 size={16} />
              </div>
              <span className={styles.trackerLabel}>Ordered</span>
            </div>

            <div className={`${styles.trackerStep} ${styles.trackerStepActive}`}>
              <div className={styles.trackerNode}>
                <Truck size={14} />
              </div>
              <span className={styles.trackerLabel}>Preparing</span>
            </div>

            <div className={styles.trackerStep}>
              <div className={styles.trackerNode}>
                <Sparkles size={14} />
              </div>
              <span className={styles.trackerLabel}>Dispatched</span>
            </div>
          </div>

          <button 
            className={`${styles.modalBtn} glow-btn`}
            onClick={handleSuccessClose}
          >
            Continue Exploring Curations
          </button>
        </div>
      </div>
    </div>
  );
}
