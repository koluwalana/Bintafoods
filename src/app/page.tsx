"use client";

import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Heart,
  Shield,
  Leaf,
  Star,
  Truck,
  Award,
  Clock,
  ChevronRight,
} from "lucide-react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";

const benefits = [
  {
    icon: Zap,
    title: "Source of Energy",
    desc: "Provides sustained energy throughout your day",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Heart,
    title: "Heart Health",
    desc: "Supports healthy heart function naturally",
    color: "from-red-400 to-rose-500",
  },
  {
    icon: Shield,
    title: "Blood Sugar Control",
    desc: "Helps regulate blood sugar levels",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: Leaf,
    title: "Gluten Free",
    desc: "Naturally gluten-free and safe for all",
    color: "from-emerald-400 to-green-500",
  },
];

const stats = [
  { value: "100%", label: "Natural Ingredients" },
  { value: "5,000+", label: "Happy Customers" },
  { value: "4.9", label: "Star Rating" },
  { value: "24hr", label: "Lagos Delivery" },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  100% Natural &bull; Premium Quality
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] mb-6">
                Premium{" "}
                <span className="gradient-text">Rice Flour</span>
                <br />
                for Your Family
              </h1>

              <p className="text-lg sm:text-xl text-text-muted max-w-lg mb-8 leading-relaxed">
                Made from the finest rice. Gluten-free, rich in
                vitamins, and loved by thousands of Nigerian families.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-primary/25 transition-all transform hover:scale-105 animate-pulse-glow"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-card-border text-foreground rounded-full font-bold text-lg hover:border-primary hover:text-primary transition-all"
                >
                  Learn More
                </Link>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-3">
                  {[
                    "bg-amber-300",
                    "bg-rose-300",
                    "bg-emerald-300",
                    "bg-blue-300",
                  ].map((bg, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 ${bg} rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {["AO", "BK", "CF", "DM"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-secondary text-secondary"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-text-muted">
                    Loved by 5,000+ customers
                  </p>
                </div>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[3rem] transform rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-accent/10 rounded-[3rem] transform -rotate-3" />
                <div className="relative rounded-[2.5rem] overflow-hidden product-shadow">
                  <ProductImage weight="5KG" size="lg" className="w-full aspect-square" />
                </div>

                <div className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 shadow-xl animate-float">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Gluten Free</p>
                      <p className="text-[10px] text-text-muted">
                        100% Natural
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-4 py-3 shadow-xl animate-float"
                  style={{ animationDelay: "1.5s" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">Premium</p>
                      <p className="text-[10px] text-text-muted">Quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-primary via-primary-dark to-primary py-8 relative overflow-hidden">
        <div className="absolute inset-0 animate-shimmer" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-black text-white">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 sm:py-28 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/5 text-primary text-sm font-semibold rounded-full mb-4">
              Our Products
            </span>
            <h2 className="text-3xl sm:text-5xl font-black mb-4">
              Choose Your <span className="gradient-text">Perfect Size</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto text-lg">
              From family packs to wholesale quantities, we have the perfect
              size for every need.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all"
            >
              View All Products
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-accent/5 text-accent text-sm font-semibold rounded-full mb-4">
                Health Benefits
              </span>
              <h2 className="text-3xl sm:text-5xl font-black mb-6">
                Nourish Your Body{" "}
                <span className="gradient-text">Naturally</span>
              </h2>
              <p className="text-text-muted text-lg mb-10 leading-relaxed">
                Binta Rice Flour is packed with essential nutrients that support
                your overall health and wellness. Every spoonful is a step
                towards better living.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3 p-4 rounded-2xl hover:bg-cream transition-colors group"
                  >
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{benefit.title}</h3>
                      <p className="text-text-muted text-xs mt-0.5">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-cream to-warm-gray rounded-[2.5rem] p-8 sm:p-12">
                <ProductImage weight="10KG" size="lg" className="w-full aspect-square rounded-2xl" />
              </div>

              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-card rounded-2xl px-6 py-4 shadow-xl flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-sm font-bold">Vitamin B & Iron</span>
                </div>
                <div className="w-px h-6 bg-card-border" />
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold">Easily Digestible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4">
              Why Choose <span className="text-secondary">Binta?</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We&apos;re committed to delivering the best quality rice flour to
              your doorstep.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Premium Quality",
                desc: "Made from the finest rice, ensuring consistent quality in every pack.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Same-day delivery in Lagos. Nationwide shipping within 2-3 business days.",
              },
              {
                icon: Clock,
                title: "Fresh Always",
                desc: "Short production-to-shelf cycle ensures you always get the freshest flour.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-5xl font-black">
              What Our{" "}
              <span className="gradient-text">Customers Say</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                name: "Marho",
                role: "Lagos",
                text: "This rice flour is so good, the texture feels like pounded yam.",
              },
              {
                name: "Ese",
                role: "Lagos",
                text: "The rice flour is so light and filling. This has become my favorite swallow.",
              },
              {
                name: "Lape",
                role: "Lagos",
                text: "This rice flour can go with any of your favorite soups.",
              },
              {
                name: "Chinyere",
                role: "Canada",
                text: "This rice flour is so smooth and fluffy and very easy to digest.",
              },
              {
                name: "Helen",
                role: "Lagos",
                text: "My children favorite swallow, they really love it.",
              },
              {
                name: "Adebayo",
                role: "Lagos",
                text: "I'll recommend this flour for every family.",
              },
              {
                name: "Peniel",
                role: "Lagos",
                text: "This rice flour is best for pastries. I used it for pancakes and bread, it's the perfect replacement for flour.",
              },
              {
                name: "Favour",
                role: "Lokoja",
                text: "Thank you for this easy to make flour. I love it.",
              },
              {
                name: "Banke",
                role: "Ibadan",
                text: "This is simply the best!",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-3xl p-8 product-shadow hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-secondary text-secondary"
                    />
                  ))}
                </div>
                <p className="text-text-muted leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-text-muted">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-dark to-primary rounded-[2.5rem] p-12 sm:p-16 text-center text-white">
            <div className="absolute inset-0 animate-shimmer" />
            <div className="relative">
              <h2 className="text-3xl sm:text-5xl font-black mb-4">
                Ready to Cook Something Amazing?
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto text-lg mb-8">
                Order your Binta Rice Flour today and experience the difference
                quality makes. Fast delivery within Lagos.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                Order Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
