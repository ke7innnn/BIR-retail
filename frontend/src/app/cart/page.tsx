"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useShop } from "../../context/ShopContext";
import styles from "./cart.module.css";
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  Gift, 
  Sparkles, 
  ShieldCheck, 
  Lock,
  ArrowLeft,
  Truck
} from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, getCartCount, clearCart } = useShop();
  
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [packagingNotes, setPackagingNotes] = useState("");

  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const shipping = subtotal > 499 ? 0 : 49;
  const grandTotal = subtotal + tax + shipping;

  const handleCheckout = () => {
    localStorage.setItem("cliq_luxe_gift_wrap", JSON.stringify(giftWrapping));
    localStorage.setItem("cliq_luxe_gift_notes", packagingNotes);
    router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyBagIcon}>
          <ShoppingBag size={40} />
        </div>
        <div className={styles.pageEyebrow}>
          <Sparkles size={12} /> Your bag is empty
        </div>
        <h1 className={styles.emptyTitle}>Luxury Cart</h1>
        <p className={styles.emptyText}>
          Your shopping bag is empty. Explore our premium California almonds, jumbo whole cashews, Chilean walnuts, pitted prunes, and flavored Fox Nuts (Makhana Masti).
        </p>
        <Link href="/" className={styles.emptyBtn}>
          Begin Browsing <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageEyebrow}>
        <ShoppingBag size={12} /> {getCartCount()} item{getCartCount() !== 1 ? 's' : ''} in your bag
      </div>
      <h1 className={styles.title}>Luxury Cart</h1>

      <div className={styles.split}>
        {/* --- LEFT PANEL: LIST OF PRODUCTS --- */}
        <div className={styles.itemsSection}>
          <div className={styles.cartList}>
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedVariant}`} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image 
                    src={item.product.image} 
                    alt={item.product.name}
                    fill
                    sizes="100px"
                  />
                </div>

                <div className={styles.itemDetails}>
                  <span className={styles.itemCategory}>{item.product.categoryLabel}</span>
                  <h3 className={styles.itemName}>{item.product.name}</h3>
                  <p className={styles.itemMeta}>Option: {item.selectedVariant}</p>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.qtySelector}>
                    <button 
                      className={styles.qtyBtn}
                      onClick={() => updateCartQuantity(item.product.id, item.selectedVariant, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className={styles.qtyVal}>{item.quantity}</span>
                    <button 
                      className={styles.qtyBtn}
                      onClick={() => updateCartQuantity(item.product.id, item.selectedVariant, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className={styles.price}>
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>

                  <button 
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.product.id, item.selectedVariant)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Gift Options Panel */}
          <div className={styles.giftPanel}>
            <div className={styles.giftTitleRow}>
              <Gift size={20} color="var(--color-accent-gold)" />
              <span>Premium Packaging &amp; Personalization</span>
            </div>

            <label className={styles.giftCheckbox}>
              <input 
                type="checkbox" 
                checked={giftWrapping}
                onChange={(e) => setGiftWrapping(e.target.checked)}
              />
              <span>Add Eco-Luxe Signature Gift Wrapping (Complimentary)</span>
            </label>

            <div>
              <span className={styles.notesLabel}>
                Add custom gold-embossed message card or packaging instructions:
              </span>
              <textarea 
                className={styles.notesArea}
                placeholder="Write your brief custom card details (e.g. 'To Aria, with love. Happy Birthday!') or custom logistics instructions..."
                value={packagingNotes}
                onChange={(e) => setPackagingNotes(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.continueRow}>
            <Link href="/" className={styles.continueLink}>
              <ArrowLeft size={16} /> Continue Shopping
            </Link>
            <button 
              onClick={clearCart} 
              className={styles.clearBtn}
            >
              Clear Entire Bag
            </button>
          </div>
        </div>

        {/* --- RIGHT PANEL: ORDER SUMMARY RECEIPT --- */}
        <div className={styles.receipt}>
          <div className={styles.receiptTop}>
            <div className={styles.receiptTitle}>Order Summary</div>
            <div className={styles.receiptItemCount}>{getCartCount()} items selected</div>
          </div>

          <div className={styles.receiptBody}>
            <div className={styles.receiptRows}>
              <div className={styles.receiptRow}>
                <span>Subtotal ({getCartCount()} items)</span>
                <span className={styles.receiptRowVal}>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className={styles.receiptRow}>
                <span>Eco-Luxe Courier Shipping</span>
                {shipping === 0 ? (
                  <span className={styles.freeShip}>Complimentary</span>
                ) : (
                  <span className={styles.receiptRowVal}>₹{shipping.toFixed(2)}</span>
                )}
              </div>

              {shipping > 0 && (
                <div className={styles.shippingTip}>
                  🎁 Add ₹{(499 - subtotal).toFixed(2)} more to unlock free shipping!
                </div>
              )}

              <div className={styles.receiptRow}>
                <span>GST / Duties (5%)</span>
                <span className={styles.receiptRowVal}>₹{tax.toFixed(2)}</span>
              </div>

              {giftWrapping && (
                <div className={styles.receiptRow}>
                  <span>Signature Velvet Wrap</span>
                  <span className={styles.freeShip}>Complimentary</span>
                </div>
              )}

              <div className={styles.totalRow}>
                <span>Estimated Total</span>
                <span className={styles.totalVal}>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              className={styles.checkoutBtn}
              onClick={handleCheckout}
            >
              Secure Checkout <ArrowRight size={18} />
            </button>

            <div className={styles.trustLogos}>
              <div className={styles.trustBadge}>
                <Lock size={12} /> Fully Encrypted Gateway
              </div>
              <p>Your transactions are protected by 256-bit bank-grade SSL technology.</p>
              <div className={styles.trustRow}>
                <ShieldCheck size={16} />
                <span>Complimentary Returns Protected</span>
              </div>
              <div className={styles.trustRow}>
                <Truck size={16} />
                <span>Fast Nationwide Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
