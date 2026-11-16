"use client";

import Link from "next/link";
import { useAuth } from "../context/Authcontext";
import { useCart } from "../context/Cartcontext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const count = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="navbar">
      <Link href="/" className="logo">
        Simple<span>Store</span>
      </Link>

      <nav>
        <Link href="/">Home</Link>

        <Link href="/cart">Cart ({count})</Link>

        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}