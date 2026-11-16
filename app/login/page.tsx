"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/Authcontext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    router.push("/");
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>

        <p>{error}</p>
      </form>

      <p>
        Don't have an account? <Link href="/register">Register</Link>
      </p>
    </div>
  );
}