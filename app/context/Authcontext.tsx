"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("storeUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function register(name, email, password) {
    const users = JSON.parse(
      localStorage.getItem("storeUsers") || "[]"
    );

    const exists = users.some((item) => item.email === email);

    if (exists) {
      return {
        success: false,
        message: "Email already registered"
      };
    }

    const newUser = { name, email, password };

    users.push(newUser);

    localStorage.setItem("storeUsers", JSON.stringify(users));

    localStorage.setItem(
      "storeUser",
      JSON.stringify({ name, email })
    );

    setUser({ name, email });

    return { success: true };
  }

  function login(email, password) {
    const users = JSON.parse(
      localStorage.getItem("storeUsers") || "[]"
    );

    const foundUser = users.find(
      (item) =>
        item.email === email && item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Incorrect email or password"
      };
    }

    const activeUser = {
      name: foundUser.name,
      email: foundUser.email
    };

    localStorage.setItem(
      "storeUser",
      JSON.stringify(activeUser)
    );

    setUser(activeUser);

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("storeUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}