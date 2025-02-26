
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background/90"></div>
        <div 
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/lovable-uploads/59b571ba-c499-4706-bdb9-c8178aedbe9d.png')"
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-block py-1 px-3 mb-4 bg-accent/50 backdrop-blur-sm rounded-full text-xs uppercase tracking-widest">
            New Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-extralight mb-6 leading-tight">
            Timeless Essentials for the Modern Individual
          </h1>
          <p className="text-lg md:text-xl mb-8 font-light text-foreground/80 max-w-lg">
            Discover curated pieces that embody simplicity, functionality, and
            enduring style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              Shop Collection
            </Link>
            <Link
              to="/products"
              className="inline-block px-8 py-4 border border-primary text-primary text-sm uppercase tracking-wider transition-all duration-300 hover:bg-primary/5"
            >
              Explore Details
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
