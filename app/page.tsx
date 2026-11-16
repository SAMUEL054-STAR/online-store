"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();

        setProducts(data);
      } catch {
        setError("Could not load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <main>
      <h1>Welcome to My Store</h1>

      <p>Discover our amazing products.</p>

      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}