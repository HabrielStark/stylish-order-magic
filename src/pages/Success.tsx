
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
      }));
      confetti(Object.assign({}, defaults, { 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
      }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Order Confirmed | ATTIRE</title>
        <meta name="description" content="Your order has been successfully placed." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <CheckCircle className="h-24 w-24 text-primary" />
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-light mb-4"
            >
              Thank You for Your Order!
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-foreground/70 mb-8"
            >
              Your order has been confirmed. We've sent a confirmation with order details to your email.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="p-6 bg-secondary rounded-lg mb-8"
            >
              <p className="text-lg mb-2">Order #ATTIRE-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
              <p className="text-foreground/70">A summary of your order is being sent to your email</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Success;
