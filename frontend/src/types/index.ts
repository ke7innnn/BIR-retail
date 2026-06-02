export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  category: string;
  categoryLabel: string;
  specs: Record<string, string>;
  inStock: boolean;
  stockCount: number;
  variants?: string[];
  badge?: string;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant: string;
}

export interface Category {
  id: string;
  name: string;
  label: string;
  description: string;
  iconName: string;
  image?: string;
}

export interface ShopContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  wishlist: string[]; // array of product ids
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string, variant: string) => void;
  updateCartQuantity: (productId: string, variant: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}
