"use client";

import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.title}
        width={150}
        height={150}
      />

      <h3>{product.title}</h3>

      <p>₦{product.price}</p>

      <Link href={`/products/${product.id}`}>
        View Product
      </Link>

    </div>
  );
}