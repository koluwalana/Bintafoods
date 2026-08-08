"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ShoppingCart,
  Star,
  Minus,
  Plus,
  ArrowLeft,
  Shield,
  Truck,
  RefreshCw,
  Leaf,
  Zap,
  Heart,
  Check,
} from "lucide-react";
import { useState } from "react";
import { getProductBySlug, formatPrice, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products" className="text-primary hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const otherProducts = products.filter((p) => p.id !== product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity}x ${product.weight} added to cart!`, {
      style: {
        background: "#1a1a1a",
        color: "#fff",
        borderRadius: "999px",
      },
      iconTheme: { primary: "#c41e3a", secondary: "#fff" },
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <div>
            <div className="rounded-3xl overflow-hidden product-shadow">
              <ProductImage
                weight={product.weight}
                size="lg"
                className="w-full aspect-square"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${
                    p.id === product.id
                      ? "border-primary shadow-lg"
                      : "border-card-border hover:border-primary/50"
                  }`}
                >
                  <ProductImage
                    weight={p.weight}
                    size="sm"
                    className="w-full aspect-square"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {product.badge && (
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
                {product.badge}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl font-black mb-2">
              {product.name}
            </h1>
            <p className="text-xl text-text-muted mb-4">{product.weight} Pack</p>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-secondary text-secondary"
                  />
                ))}
              </div>
              <span className="text-sm text-text-muted">(4.9 / 5 - 128 reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-black text-primary">
                {formatPrice(product.price)}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-xl text-text-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-1 bg-accent/10 text-accent text-sm font-bold rounded-lg">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-text-muted leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="space-y-4 mb-8">
              <h3 className="font-bold text-sm uppercase tracking-wider text-text-muted">
                Key Features
              </h3>
              {[
                "100% Natural Rice Flour",
                "Gluten-Free & Easily Digestible",
                "Rich in Vitamin B & Iron",
                "Supports Heart Health & Blood Sugar Control",
                "Premium Quality Guaranteed",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold">Quantity:</span>
              <div className="flex items-center gap-3 bg-cream rounded-full px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-bold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-text-muted">
                Total: {formatPrice(product.price * quantity)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-full font-bold text-lg hover:bg-primary/5 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-primary/25 transition-all transform hover:scale-[1.02]"
              >
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Lagos Delivery", sub: product.weight === "1KG" ? "₦2,500" : product.weight === "5KG" ? "₦3,500" : "₦5,500" },
                { icon: Shield, label: "Certified", sub: "Quality" },
                { icon: RefreshCw, label: "Easy Returns", sub: "7-day policy" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center p-3 bg-cream rounded-xl"
                >
                  <item.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs font-bold">{item.label}</p>
                  <p className="text-[10px] text-text-muted">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Benefits */}
        <section className="mt-20 py-12 bg-cream rounded-3xl px-8 sm:px-12">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-10">
            Health <span className="gradient-text">Benefits</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Energy", desc: "Sustained energy source", color: "from-amber-400 to-orange-500" },
              { icon: Heart, title: "Heart Health", desc: "Supports heart function", color: "from-red-400 to-rose-500" },
              { icon: Shield, title: "Blood Sugar", desc: "Helps regulate levels", color: "from-blue-400 to-indigo-500" },
              { icon: Leaf, title: "Gluten Free", desc: "Naturally gluten-free", color: "from-emerald-400 to-green-500" },
            ].map((b) => (
              <div key={b.title} className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm">
                <div className={`w-10 h-10 bg-gradient-to-br ${b.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <b.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm">{b.title}</p>
                  <p className="text-xs text-text-muted">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cooking Instructions */}
        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-black mb-8">
            How to <span className="gradient-text">Prepare</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { step: 1, text: "Boil water in a pot" },
              { step: 2, text: "Mix the flour with cold water, pour into boiling water and mix until thick" },
              { step: 3, text: "Allow to cook for 3 minutes" },
              { step: 4, text: "Add the flour into the mixture and stir well to combine" },
              { step: 5, text: "Add a little hot water, cover to cook for 2 minutes. Stir well then serve with any soup" },
            ].map((s) => (
              <div key={s.step} className="relative bg-white rounded-2xl p-6 product-shadow border border-card-border">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center font-bold text-sm mb-3">
                  {s.step}
                </div>
                <p className="text-sm text-text-muted leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Other Products */}
        {otherProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl sm:text-3xl font-black mb-8">
              You May Also <span className="gradient-text">Like</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {otherProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
