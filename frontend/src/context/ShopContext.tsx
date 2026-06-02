"use client";
 
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Category, CartItem, ShopContextType } from "../types";

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isHydrated, setIsHydrated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load products and categories from backend API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          fetch("http://localhost:8000/api/products"),
          fetch("http://localhost:8000/api/categories")
        ]);
        
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData);
        }
        
        if (catRes.ok) {
          const catData = await catRes.json();
          // Prepend a virtual "All Collections" category for UI filter tabs
          const hasAll = catData.some((c: Category) => c.id === "all");
          if (!hasAll) {
            setCategories([
              {
                id: "all",
                name: "all",
                label: "All Collections",
                description: "Curated collection of all premium dry fruits and snacks.",
                iconName: "Grid"
              },
              ...catData
            ]);
          } else {
            setCategories(catData);
          }
        }
      } catch (error) {
        console.error("Error fetching products/categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Load cart and wishlist from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cliq_luxe_cart");
      const savedWishlist = localStorage.getItem("cliq_luxe_wishlist");
      
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Error loading cart/wishlist from localStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("cliq_luxe_cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart, isHydrated]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("cliq_luxe_wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [wishlist, isHydrated]);

  const addToCart = (product: Product, quantity: number = 1, variant?: string) => {
    const selectedVariant = variant || (product.variants && product.variants.length > 0 ? product.variants[0] : "Standard");
    
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === selectedVariant
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        const newQty = newCart[existingItemIndex].quantity + quantity;
        newCart[existingItemIndex].quantity = product.stockCount > 0 ? Math.min(newQty, product.stockCount) : newQty;
        return newCart;
      } else {
        return [...prevCart, { product, quantity, selectedVariant }];
      }
    });
  };

  const removeFromCart = (productId: string, variant: string) => {
    setCart((prevCart) => prevCart.filter((item) => !(item.product.id === productId && item.selectedVariant === variant)));
  };

  const updateCartQuantity = (productId: string, variant: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && item.selectedVariant === variant) {
          const product = products.find((p) => p.id === productId);
          const maxStock = product ? product.stockCount : 99;
          return {
            ...item,
            quantity: product && product.inStock ? Math.min(quantity, maxStock) : quantity,
          };
        }
        return item;
      })
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        activeCategory,
        setActiveCategory,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
