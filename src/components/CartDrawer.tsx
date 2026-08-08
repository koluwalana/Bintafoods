"use client";

import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import Link from "next/link";
import ProductImage from "./ProductImage";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in-left">
        <div className="flex items-center justify-between p-6 border-b border-card-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">
              Your Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-cream rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-text-muted" />
            </div>
            <p className="text-text-muted mb-2 font-medium">
              Your cart is empty
            </p>
            <p className="text-sm text-text-muted mb-6">
              Add some delicious rice flour to get started!
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-cream rounded-xl"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-white">
                    <ProductImage
                      weight={item.product.weight}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-text-muted">
                      {item.product.weight}
                    </p>
                    <p className="text-primary font-bold text-sm mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-white rounded-full px-1 py-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-cream transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-cream transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-card-border bg-cream/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-text-muted">Subtotal</span>
                <span className="text-xl font-bold gradient-text">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="block w-full py-4 bg-gradient-to-r from-primary to-primary-dark text-white text-center rounded-full font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:scale-[1.02]"
              >
                Checkout
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="block w-full mt-3 py-3 text-center text-sm text-text-muted hover:text-primary transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
