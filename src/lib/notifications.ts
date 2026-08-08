import { Resend } from "resend";

interface OrderItem {
  productId: string;
  name: string;
  weight: string;
  price: number;
  quantity: number;
}

interface OrderCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

interface OrderPayload {
  orderId: string;
  items: OrderItem[];
  total: number;
  deliveryFee: number;
  customer: OrderCustomer;
}

function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
}

export async function sendOrderNotifications(order: OrderPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  if (!apiKey || !to) return;

  const resend = new Resend(apiKey);

  const itemRows = order.items
    .map(
      (item) =>
        `<tr><td style="padding:4px 16px 4px 0">${item.weight} x ${item.quantity}</td><td style="padding:4px 0">${formatNaira(item.price * item.quantity)}</td></tr>`
    )
    .join("");

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "orders@resend.dev",
    to,
    subject: `New Order ${order.orderId} - ${formatNaira(order.total)}`,
    html: `
      <h2>New Order: ${order.orderId}</h2>
      <p>
        <strong>Customer:</strong> ${order.customer.firstName} ${order.customer.lastName}<br/>
        <strong>Phone:</strong> ${order.customer.phone}<br/>
        <strong>Email:</strong> ${order.customer.email}
      </p>
      <table>${itemRows}</table>
      <p>
        <strong>Delivery Fee:</strong> ${formatNaira(order.deliveryFee)}<br/>
        <strong>Total:</strong> ${formatNaira(order.total)}
      </p>
      <p><strong>Delivery Address:</strong> ${order.customer.address}, ${order.customer.city}, ${order.customer.state}</p>
    `,
  });
}
