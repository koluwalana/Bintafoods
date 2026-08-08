"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "BINTA-000";

  return (
    <div className="py-20 sm:py-32">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
          <CheckCircle className="w-14 h-14 text-accent" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black mb-4 animate-fade-in-up">
          Order <span className="gradient-text">Confirmed!</span>
        </h1>

        <p className="text-text-muted text-lg mb-2 animate-fade-in-up delay-100">
          Thank you for your order. Your Binta Rice Flour is on its way!
        </p>

        <div className="inline-block px-6 py-3 bg-cream rounded-full mb-8 animate-fade-in-up delay-200">
          <span className="text-sm text-text-muted">Order ID: </span>
          <span className="font-bold text-primary">{orderId}</span>
        </div>

        <div className="bg-white rounded-3xl p-8 product-shadow border border-card-border mb-8 text-left animate-fade-in-up delay-300">
          <h3 className="font-bold mb-4">What happens next?</h3>
          <div className="space-y-4">
            {[
              "We'll confirm your payment and order via phone or WhatsApp shortly.",
              "Your order will be prepared and packaged with care.",
              "Delivery to Lagos addresses within 24 hours. Other states in 2-3 business days.",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                </div>
                <p className="text-sm text-text-muted">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold hover:shadow-xl transition-all"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:08138070191"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-card-border rounded-full font-bold hover:border-primary hover:text-primary transition-all"
          >
            <Phone className="w-5 h-5" />
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-32 text-center">
          <p className="text-text-muted">Loading...</p>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
