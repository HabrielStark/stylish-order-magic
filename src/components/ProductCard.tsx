
import { Product } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { ShoppingBag, Plus } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col hover-lift rounded-md overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
        {/* Image Loading State */}
        {!imageLoaded && (
          <div className="absolute inset-0 image-shimmer" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovering ? "scale-105" : "scale-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className={`absolute right-4 bottom-4 p-3 rounded-full bg-white shadow-md z-10 
                     transition-all duration-500 ease-in-out ${
                       isHovering
                         ? "translate-y-0 opacity-100"
                         : "translate-y-10 opacity-0"
                     }`}
          aria-label="Add to cart"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Product Info */}
      <div className="px-2 py-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-base">{product.name}</h3>
            <p className="text-sm text-foreground/70">{product.category}</p>
          </div>
          <p className="font-medium">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
