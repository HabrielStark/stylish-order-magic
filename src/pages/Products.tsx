
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];
  
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Apply sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, sortBy]);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  const clearFilters = () => {
    setSelectedCategory(null);
    setSortBy("default");
  };

  return (
    <>
      <Helmet>
        <title>Shop | ATTIRE</title>
        <meta name="description" content="Browse our collection of timeless essentials for the modern individual." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-light mb-4"
              >
                Shop Collection
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-foreground/70 max-w-xl mx-auto"
              >
                Browse our curated collection of premium pieces designed with attention to detail.
              </motion.p>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              {/* Mobile Filter Toggle */}
              <button
                className="md:hidden flex items-center text-sm py-2 px-4 border rounded-md"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters {selectedCategory && "(1)"}
              </button>
              
              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-4">
                <div className="text-sm">Filter by:</div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category === "all" ? null : category)}
                      className={`px-3 py-1 text-sm capitalize rounded-md transition-all duration-300 ${
                        (category === "all" && selectedCategory === null) || 
                        category === selectedCategory
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                {selectedCategory && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-foreground/70 hover:text-foreground flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" /> Clear
                  </button>
                )}
              </div>
              
              {/* Sort Options (Both Mobile and Desktop) */}
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border-b bg-transparent py-1 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="md:hidden mb-6 p-4 bg-secondary rounded-md animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category === "all" ? null : category)}
                        className={`px-3 py-1 text-sm capitalize rounded-md transition-all duration-300 ${
                          (category === "all" && selectedCategory === null) || 
                          category === selectedCategory
                            ? "bg-primary text-primary-foreground"
                            : "bg-white hover:bg-white/80"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {selectedCategory && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-foreground/70 hover:text-foreground flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" /> Clear all filters
                  </button>
                )}
              </div>
            )}
            
            {/* Products Grid */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-foreground/70 mb-4">No products found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Products;
