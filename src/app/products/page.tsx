"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/5 text-primary text-sm font-semibold rounded-full mb-4">
            Shop All Sizes
          </span>
          <h1 className="text-4xl sm:text-6xl font-black mb-4">
            Our <span className="gradient-text">Products</span>
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            Premium 100% natural rice flour available in three convenient sizes.
            All products are made with the finest natural ingredients for your
            family.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="bg-gradient-to-br from-cream to-warm-gray rounded-3xl p-8 sm:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black mb-4">
              Bulk Orders & Partnerships
            </h2>
            <p className="text-text-muted mb-6">
              Need larger quantities or interested in becoming a distributor?
              Contact us for wholesale pricing and partnership opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:08138070191"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors"
              >
                Call: 08138070191
              </a>
              <a
                href="tel:09137447992"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Call: 09137447992
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
