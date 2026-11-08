"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  totalItems: number;
  subtotal: number;
}

function isCartItem(item: unknown): item is CartItem {
  if (typeof item !== "object" || item === null) return false;

  return (
    "id" in item &&
    typeof item.id === "string" &&
    "title" in item &&
    typeof item.title === "string" &&
    "category" in item &&
    typeof item.category === "string" &&
    "price" in item &&
    typeof item.price === "number" &&
    "image" in item &&
    typeof item.image === "string" &&
    "quantity" in item &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      try {
        const savedCart = localStorage.getItem("swissholz_cart");
        const savedFavorites = localStorage.getItem("velora_favorites");
        if (savedCart) {
          const parsedCart: unknown = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCart(parsedCart.filter(isCartItem));
          }
        }
        if (savedFavorites) {
          const parsedFavorites: unknown = JSON.parse(savedFavorites);
          if (
            Array.isArray(parsedFavorites) &&
            parsedFavorites.every((id): id is string => typeof id === "string")
          ) {
            setFavorites(parsedFavorites);
          }
        }
      } catch (error) {
        console.error("Fehler beim Laden gespeicherter Shop-Daten:", error);
      } finally {
        setIsHydrated(true);
      }

    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem("swissholz_cart", JSON.stringify(cart));
      localStorage.setItem("velora_favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Fehler beim Speichern der Shop-Daten:", error);
    }
  }, [cart, favorites, isHydrated]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (id: string) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((favoriteId) => favoriteId !== id)
        : [...previous, id],
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        favorites,
        toggleFavorite,
        isFavorite,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart muss innerhalb eines CartProviders verwendet werden");
  }
  return context;
}