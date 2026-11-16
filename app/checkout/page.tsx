"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function CheckoutPage() {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    if (cartItems.length === 0) {
      setMessage("Your cart is empty");
      return;
    }

    clearCart();

    setMessage("Order placed successfully!");

    setTimeout(() => {
      router.push("/");
    }, 2000);
  }

  return (
    <div>
      <h1>Checkout</h1>

      <h2>
        Total: ₦{(total * 1500).toLocaleString()}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          required
        />

        <input
          type="email"
          placeholder="Email"
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          required
        />

        <textarea
          placeholder="Delivery Address"
          required
        />

        <button type="submit">
          Place Order
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
}