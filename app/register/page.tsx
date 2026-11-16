"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/Authcontext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const result = register(name, email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    router.push("/");
  }

  return (
    <div>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

        <p>{error}</p>
      </form>

      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}