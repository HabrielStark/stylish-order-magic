
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extralight tracking-widest transition-opacity duration-300 hover:opacity-70"
        >
          ATTIRE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-sm uppercase tracking-wider transition-colors duration-300 hover:text-primary/70"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-sm uppercase tracking-wider transition-colors duration-300 hover:text-primary/70"
          >
            Shop
          </Link>
        </nav>

        {/* Cart Icon */}
        <div className="flex items-center">
          <Link
            to="/cart"
            className="relative p-2 transition-transform duration-300 hover:scale-110"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="ml-4 p-2 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-in">
          <div className="container mx-auto py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm uppercase tracking-wider px-4 py-2 hover:bg-secondary rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm uppercase tracking-wider px-4 py-2 hover:bg-secondary rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
