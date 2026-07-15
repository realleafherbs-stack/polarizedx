"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { calculateItemsTotal } from "../../lib/pricing";

const STORAGE_KEY = "polarizedx_cart";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  variantId?: string;
  image?: string;
  description?: string;
  material?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  rawTotal: number;
  savings: number;
  count: number;
  showToast: boolean;
  toastMessage: string;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Load from localStorage after mount (SSR-safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as CartItem[]);
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage — only after hydration so we never overwrite with []
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
    setToastMessage(`המוצר "${item.name}" נוסף לעגלה`);
    setShowToast(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeItem(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const rawTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = calculateItemsTotal(items);
  const savings = Math.round((rawTotal - total) * 100) / 100;
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, total, rawTotal, savings, count, showToast, toastMessage, hideToast: () => setShowToast(false) }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
