import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { sendOrderNotifications } from "@/lib/notifications";

// In-memory order store. Ephemeral on serverless (resets on cold start);
// the durable record of each order is the notification email.
const orders: Record<string, unknown>[] = [];

// Per-size Lagos delivery fees. Kept server-side so the client cannot tamper
// with them — the server is the source of truth for every amount charged.
const DELIVERY_FEES: Record<string, number> = {
  "1KG": 2500,
  "5KG": 3500,
  "10KG": 5500,
};

// Best-effort in-memory rate limit (per IP, per instance) to blunt spam/abuse
// of the order endpoint and the email sender.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

interface ValidatedItem {
  productId: string;
  name: string;
  weight: string;
  price: number;
  quantity: number;
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;

  // --- Validate items against the real catalog (never trust client prices) ---
  const rawItems = data.items;
  if (!Array.isArray(rawItems) || rawItems.length === 0 || rawItems.length > 50) {
    return NextResponse.json({ error: "Invalid order items." }, { status: 400 });
  }

  const validatedItems: ValidatedItem[] = [];
  let subtotal = 0;
  let deliveryFee = 0;

  for (const raw of rawItems) {
    const item = (raw ?? {}) as Record<string, unknown>;
    const product = products.find((p) => p.id === item.productId);
    const quantity = Number(item.quantity);

    if (
      !product ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 100
    ) {
      return NextResponse.json(
        { error: "Invalid order items." },
        { status: 400 }
      );
    }

    subtotal += product.price * quantity;
    deliveryFee += (DELIVERY_FEES[product.weight] || 0) * quantity;
    validatedItems.push({
      productId: product.id,
      name: product.name,
      weight: product.weight,
      price: product.price,
      quantity,
    });
  }

  const total = subtotal + deliveryFee;

  // --- Validate customer / delivery details ---
  const c = (data.customer ?? {}) as Record<string, unknown>;
  const customer = {
    firstName: clean(c.firstName, 60),
    lastName: clean(c.lastName, 60),
    email: clean(c.email, 120),
    phone: clean(c.phone, 30),
    address: clean(c.address, 200),
    city: clean(c.city, 80),
    state: clean(c.state, 60),
  };

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email);
  const phoneOk = /^[0-9+()\-\s]{7,20}$/.test(customer.phone);

  if (
    !customer.firstName ||
    !customer.lastName ||
    !emailOk ||
    !phoneOk ||
    !customer.address ||
    !customer.city ||
    !customer.state
  ) {
    return NextResponse.json(
      { error: "Please complete all delivery fields correctly." },
      { status: 400 }
    );
  }

  const orderId = `BINTA-${Date.now().toString(36).toUpperCase()}`;
  const order = {
    id: orderId,
    items: validatedItems,
    subtotal,
    deliveryFee,
    total,
    paymentMethod: "transfer",
    customer,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  try {
    await sendOrderNotifications({
      orderId,
      items: validatedItems,
      total,
      deliveryFee,
      customer,
    });
  } catch (err) {
    console.error("Order notification failed:", err);
  }

  return NextResponse.json(
    { orderId, status: "pending", total, deliveryFee, subtotal },
    { status: 201 }
  );
}

// Listing orders exposes customer PII, so it is gated behind a secret admin
// token. Set ADMIN_API_TOKEN in the environment and send it as
// `Authorization: Bearer <token>`. Without the token this returns 401.
export async function GET(request: Request) {
  const token = process.env.ADMIN_API_TOKEN;
  const auth = request.headers.get("authorization");
  if (!token || auth !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(orders);
}
