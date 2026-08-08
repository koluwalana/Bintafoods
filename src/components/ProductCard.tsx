"use client";

import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import ProductImage from "./ProductImage";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.weight} added to cart!`, {
      style: {
        background: "#1a1a1a",
        color: "#fff",
        borderRadius: "999px",
      },
      iconTheme: { primary: "#c41e3a", secondary: "#fff" },
    });
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-3xl overflow-hidden product-shadow hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-card-border">
        <div className="relative overflow-hidden">
          <ProductImage weight={product.weight} size="md" className="w-full aspect-square" />

          {product.badge && (
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold rounded-full shadow-lg">
              {product.badge}
            </div>
          )}

          {discount > 0 && (
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-full shadow-lg">
              -{discount}%
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-white"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-secondary text-secondary"
              />
            ))}
            <span className="text-xs text-text-muted ml-1">(4.9)</span>
          </div>

          <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-text-muted text-sm mb-3">{product.weight} Pack</p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {discount > 0 && (
                <span className="text-sm text-text-muted line-through ml-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
