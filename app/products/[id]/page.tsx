"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../context/Cartcontext";
import { useAuth } from "../../context/Authcontext";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

function ProductDetailsContent() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <div className="details-card">
      <img src={product.image} alt={product.title} />

      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>

        <h2>
          ₦{(product.price * 1500).toLocaleString()}
        </h2>

        <button onClick={() => addToCart(product, user)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function ProductDetails() {
  return (
    <Suspense fallback={<p>Loading product...</p>}>
      <ProductDetailsContent />
    </Suspense>
  );
}