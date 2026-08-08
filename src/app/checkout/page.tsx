"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, ShoppingBag, CreditCard, Banknote, Copy, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import ProductImage from "@/components/ProductImage";

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const paymentMethod = "transfer";
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Lagos",
  });

  const deliveryFeeRates: Record<string, number> = {
    "1KG": 2500,
    "5KG": 3500,
    "10KG": 5500,
  };

  const deliveryFee = items.reduce(
    (sum, item) => sum + (deliveryFeeRates[item.product.weight] || 0) * item.quantity,
    0
  );
  const grandTotal = totalPrice + deliveryFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            weight: item.product.weight,
            price: item.product.price,
            quantity: item.quantity,
          })),
          total: grandTotal,
          deliveryFee,
          paymentMethod,
          customer: form,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        clearCart();
        router.push(`/order-success?orderId=${data.orderId}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-32 text-center">
        <ShoppingBag className="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-text-muted mb-6">
          Add some products before checking out.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <h1 className="text-3xl sm:text-4xl font-black mb-10">
          <span className="gradient-text">Checkout</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Customer Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 product-shadow border border-card-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">Delivery Information</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-card-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-card-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-card-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-card-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="08012345678"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold mb-1.5">
                      Delivery Address
                    </label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-card-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="Street address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      City
                    </label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-card-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      State
                    </label>
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-card-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                    >
                      {nigerianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 product-shadow border border-card-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Banknote className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-xl font-bold">Payment Method</h2>
                </div>

                <div className="p-5 bg-gradient-to-br from-cream to-warm-gray rounded-xl border border-card-border">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
                    Transfer to this account
                  </p>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-text-muted">Bank</p>
                        <p className="font-bold">Sterling Bank</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-text-muted">Account Name</p>
                        <p className="font-bold">BintaFoods</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-text-muted">Account Number</p>
                        <p className="font-bold text-lg text-primary tracking-wider">0093173169</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText("0093173169");
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          copied
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted mt-3 bg-white/60 p-2 rounded-lg">
                    After payment, place your order and we&apos;ll confirm receipt and process delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-3xl p-6 sm:p-8 product-shadow border border-card-border sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 p-3 bg-cream rounded-xl"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0">
                        <ProductImage
                          weight={item.product.weight}
                          size="sm"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-text-muted">
                          {item.product.weight} x {item.quantity}
                        </p>
                        <p className="text-sm font-bold text-primary mt-1">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-card-border pt-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Subtotal</span>
                    <span className="font-semibold">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Delivery (Lagos)</span>
                    <span className="font-semibold">
                      {formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="text-xs text-text-muted bg-cream p-2 rounded-lg space-y-0.5">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between">
                        <span>{item.product.weight} x {item.quantity}</span>
                        <span>{formatPrice((deliveryFeeRates[item.product.weight] || 0) * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-lg font-black border-t border-card-border pt-3">
                    <span>Total</span>
                    <span className="gradient-text">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-primary/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {isSubmitting ? "Processing..." : "Place Order"}
                </button>

                <p className="text-xs text-text-muted text-center mt-3 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Your information is safe and secure
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
