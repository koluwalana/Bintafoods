import { NextResponse } from "next/server";
import { sendOrderNotifications } from "@/lib/notifications";

let orders: Record<string, unknown>[] = [];

export async function POST(request: Request) {
  const body = await request.json();

  const orderId = `BINTA-${Date.now().toString(36).toUpperCase()}`;

  const order = {
    id: orderId,
    ...body,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  try {
    await sendOrderNotifications({
      orderId,
      items: body.items,
      total: body.total,
      deliveryFee: body.deliveryFee,
      customer: body.customer,
    });
  } catch (err) {
    console.error("Order notification failed:", err);
  }

  return NextResponse.json({ orderId, status: "pending" }, { status: 201 });
}

export async function GET() {
  return NextResponse.json(orders);
}
