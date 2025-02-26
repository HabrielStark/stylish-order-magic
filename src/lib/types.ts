
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  details: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CartContextType = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
};
