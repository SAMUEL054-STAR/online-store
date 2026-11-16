"use client";

import Link from "next/link";
import { useCart } from "../context/Cartcontext";
export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    total
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div>
        <h1>Your cart is empty</h1>
        <Link href="/">Go shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Shopping Cart</h1>

      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} />

          <div>
            <h3>{item.title}</h3>

            <p>
              ₦{(item.price * 1500).toLocaleString()}
            </p>

            <p>Quantity: {item.quantity}</p>

            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2>
        Total: ₦{(total * 1500).toLocaleString()}
      </h2>

      <Link href="/checkout">
        Proceed to Checkout
      </Link>
    </div>
  );
}