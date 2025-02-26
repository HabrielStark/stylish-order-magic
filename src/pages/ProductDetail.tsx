
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { getProductById, products } from "@/lib/products";
import { useCart } from "@/hooks/useCart";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Mock multiple images using the same placeholder
  const productImages = Array(4).fill(product?.image || "/placeholder.svg");

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setImageLoaded(false);
        
        // Find related products from the same category
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } else {
        navigate("/products");
      }
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };

  if (!product) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | ATTIRE</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/products"
              className="inline-flex items-center text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to products
            </Link>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Product Images */}
            <div className="lg:w-1/2 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square bg-secondary rounded-md overflow-hidden relative"
                >
                  {!imageLoaded && (
                    <div className="absolute inset-0 image-shimmer" />
                  )}
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className={`w-full h-full object-cover ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    className={`w-24 h-24 rounded-md overflow-hidden transition-all ${
                      selectedImage === index
                        ? "ring-2 ring-primary"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 bg-accent rounded-full text-xs capitalize mb-4">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-light mb-4">{product.name}</h1>
                <p className="text-2xl mb-6">${product.price.toFixed(2)}</p>
                
                <p className="text-foreground/70 mb-8 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-wider mb-4">Details</h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-1 h-1 bg-primary rounded-full mt-2 mr-2"></span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Quantity Selector */}
                <div className="flex items-center mb-8">
                  <span className="text-sm mr-4">Quantity</span>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-secondary rounded-l-md transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="w-12 text-center">{quantity}</span>
                    
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-secondary rounded-r-md transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-primary text-primary-foreground text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </button>
              </motion.div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-light mb-8">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
