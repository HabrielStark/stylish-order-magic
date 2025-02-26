
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ATTIRE | Timeless Essentials</title>
        <meta name="description" content="Discover curated pieces that embody simplicity, functionality, and enduring style." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-16">
        <Hero />
        <FeaturedProducts />
        
        {/* About Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <span className="inline-block py-1 px-3 mb-4 bg-accent rounded-full text-xs uppercase tracking-widest">Our Philosophy</span>
                <h2 className="text-3xl md:text-4xl font-light mb-6">Elegance in Simplicity</h2>
                <p className="text-foreground/70 mb-6">
                  We believe in the power of thoughtful, intentional design. Each piece in our collection is created with meticulous attention to detail, focusing on quality materials, precise craftsmanship, and enduring style.
                </p>
                <p className="text-foreground/70 mb-6">
                  Our commitment extends beyond aesthetics. We strive to create pieces that become more meaningful over time, companions in your journey that evolve alongside you.
                </p>
                <Link to="/products" className="inline-block mt-4 py-3 px-6 border border-primary text-primary uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-primary-foreground">
                  Explore Collection
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2 aspect-square bg-accent/40"
              >
                <img src="/placeholder.svg" alt="About our brand" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6">Ready to Elevate Your Wardrobe?</h2>
              <p className="text-foreground/70 max-w-xl mx-auto mb-8">
                Discover our curated collection of timeless essentials designed for the modern individual.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shop Now
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-extralight tracking-widest">ATTIRE</h2>
                <p className="text-primary-foreground/70 mt-2">Timeless essentials for the modern individual</p>
              </div>
              
              <div className="flex flex-wrap gap-8">
                <div>
                  <h3 className="text-sm uppercase tracking-wider mb-3">Shop</h3>
                  <ul className="space-y-2">
                    <li><Link to="/products" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">All Products</Link></li>
                    <li><Link to="/products" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">New Arrivals</Link></li>
                    <li><Link to="/products" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Best Sellers</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm uppercase tracking-wider mb-3">Company</h3>
                  <ul className="space-y-2">
                    <li><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">About Us</Link></li>
                    <li><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact</Link></li>
                    <li><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">FAQ</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
              <p>© {new Date().getFullYear()} ATTIRE. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
