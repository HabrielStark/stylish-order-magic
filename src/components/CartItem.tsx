
import { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center py-6 border-b animate-fade-in">
      {/* Product Image */}
      <div className="w-20 h-24 bg-secondary rounded-md overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-foreground/70 capitalize">{product.category}</p>
        <p className="text-sm font-medium mt-1">${product.price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center ml-4">
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="p-1 hover:bg-secondary rounded-full transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="mx-2 w-8 text-center">{quantity}</span>

        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="p-1 hover:bg-secondary rounded-full transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Subtotal and Remove */}
      <div className="ml-6 flex flex-col items-end">
        <p className="font-medium">${(product.price * quantity).toFixed(2)}</p>
        <button
          onClick={() => removeItem(product.id)}
          className="text-foreground/50 hover:text-destructive p-1 mt-1 text-sm flex items-center transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="h-3 w-3 mr-1" /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
