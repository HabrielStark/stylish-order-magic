
import { useCart } from "@/hooks/useCart";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-foreground/30 mb-6" />
        <h2 className="text-2xl font-light mb-2">Your cart is empty</h2>
        <p className="text-foreground/70 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-primary text-primary-foreground tracking-wider transition-all duration-300 hover:shadow-md hover:-translate-y-1"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-light">Shopping Cart</h2>
        <button
          onClick={clearCart}
          className="text-sm text-foreground/70 hover:text-destructive transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="divide-y">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>

      <div className="mt-8 sm:ml-auto sm:w-80">
        <div className="p-6 bg-secondary rounded-lg">
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-sm text-foreground/70">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-4 font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="w-full block text-center py-3 bg-primary text-primary-foreground uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
