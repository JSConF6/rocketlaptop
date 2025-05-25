'use client';

import type React from 'react';

import { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  seq: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (seq: number) => void;
  updateQuantity: (seq: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on client side
  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!mounted) return;

    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cartItems, mounted]);

  const addToCart = (item: Omit<CartItem, 'quantity'>): void => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.seq === item.seq);
      if (existingItem) {
        return prevItems.map(i =>
          i.seq === item.seq ? { ...i, quantity: i.quantity + 1 } : i,
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (seq: number): void => {
    setCartItems(prevItems => prevItems.filter(item => item.seq !== seq));
  };

  const updateQuantity = (seq: number, quantity: number): void => {
    if (quantity <= 0) {
      removeFromCart(seq);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item => (item.seq === seq ? { ...item, quantity } : item)),
    );
  };

  const clearCart = (): void => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
