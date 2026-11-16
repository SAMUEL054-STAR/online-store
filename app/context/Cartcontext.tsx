"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("storeCart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem(
        "storeCart",
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems, ready]);

  function addToCart(product, user) {
    if (!user) {
      router.push("/login");
      return;
    }

    setCartItems((currentItems) => {
      const existing = currentItems.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentItems,
        { ...product, quantity: 1 }
      ];
    });

    router.push("/cart");
  }

  function removeFromCart(id) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}