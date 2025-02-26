
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Cart from "@/components/Cart";

const CartPage = () => {
  return (
    <>
      <Helmet>
        <title>Shopping Cart | ATTIRE</title>
        <meta name="description" content="View and manage items in your shopping cart." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Cart />
          </div>
        </div>
      </main>
    </>
  );
};

export default CartPage;
