import { Product } from "./types";

export const products: Product[] = [
  {
    id: "binta-rice-flour-1kg",
    name: "Binta Rice Flour",
    slug: "binta-rice-flour-1kg",
    weight: "1KG",
    price: 4000,
    originalPrice: 4500,
    description:
      "Premium 100% natural rice flour made from the finest rice. Our 1KG pack is perfect for trying Binta for the first time or for small households.",
    image: "/products/1kg.png",
    badge: "Starter Pack",
    inStock: true,
  },
  {
    id: "binta-rice-flour-5kg",
    name: "Binta Rice Flour",
    slug: "binta-rice-flour-5kg",
    weight: "5KG",
    price: 19500,
    originalPrice: 20000,
    description:
      "Premium 100% natural rice flour made from the finest rice. Perfect for families who love quality meals. Our 5KG pack is ideal for regular home use.",
    image: "/products/5kg.png",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: "binta-rice-flour-10kg",
    name: "Binta Rice Flour",
    slug: "binta-rice-flour-10kg",
    weight: "10KG",
    price: 39000,
    originalPrice: 40000,
    description:
      "Premium 100% natural rice flour in our value 10KG pack. Great for large families and small businesses. Save more with this bulk option while enjoying the same premium quality.",
    image: "/products/10kg.png",
    badge: "Best Value",
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
}
