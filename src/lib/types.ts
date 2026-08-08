export interface Product {
  id: string;
  name: string;
  slug: string;
  weight: string;
  price: number;
  originalPrice: number;
  description: string;
  image: string;
  badge?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: CustomerInfo;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}
