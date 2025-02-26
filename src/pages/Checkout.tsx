
import { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { useCart } from "@/hooks/useCart";
import { useNavigate, Link } from "react-router-dom";
import { Check, ChevronRight, CreditCard, Truck } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: ""
  });
  
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const goToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    setStep("payment");
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.cardName || !formData.cardNumber || !formData.expMonth || !formData.expYear || !formData.cvv) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate processing
    setTimeout(() => {
      clearCart();
      navigate("/success");
    }, 1500);
  };
  
  if (items.length === 0 && !isSubmitting) {
    navigate("/products");
    return null;
  }
  
  return (
    <>
      <Helmet>
        <title>Checkout | ATTIRE</title>
        <meta name="description" content="Complete your purchase of premium clothing items." />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-light mb-8 text-center">Checkout</h1>
            
            {/* Checkout Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center">
                <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  step === "shipping" || step === "payment" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-foreground"
                }`}>
                  {step === "payment" ? <Check className="h-4 w-4" /> : 1}
                </div>
                <div className="text-sm ml-2">Shipping</div>
                
                <ChevronRight className="mx-2 h-4 w-4 text-foreground/30" />
                
                <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
                  step === "payment" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-foreground"
                }`}>
                  2
                </div>
                <div className="text-sm ml-2">Payment</div>
              </div>
            </div>
            
            {step === "shipping" && (
              <div className="animate-fade-in">
                <div className="flex items-center mb-6">
                  <Truck className="h-5 w-5 mr-2" />
                  <h2 className="text-xl font-light">Shipping Information</h2>
                </div>
                
                <form onSubmit={goToPayment} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm mb-1">First Name*</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm mb-1">Last Name*</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm mb-1">Email*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm mb-1">Address*</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm mb-1">City*</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm mb-1">State/Province*</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-sm mb-1">Zip/Postal Code*</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-6">
                    <Link
                      to="/cart"
                      className="text-sm hover:underline"
                    >
                      Return to cart
                    </Link>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {step === "payment" && (
              <div className="animate-fade-in">
                <div className="flex items-center mb-6">
                  <CreditCard className="h-5 w-5 mr-2" />
                  <h2 className="text-xl font-light">Payment Information</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="cardName" className="block text-sm mb-1">Name on Card*</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm mb-1">Card Number*</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full p-3 border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="expMonth" className="block text-sm mb-1">Exp. Month*</label>
                      <select
                        id="expMonth"
                        name="expMonth"
                        value={formData.expMonth}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">MM</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                          <option key={month} value={month}>{month.toString().padStart(2, '0')}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="expYear" className="block text-sm mb-1">Exp. Year*</label>
                      <select
                        id="expYear"
                        name="expYear"
                        value={formData.expYear}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="">YYYY</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm mb-1">CVV*</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full p-3 border bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-secondary rounded-md">
                    <h3 className="text-lg font-light mb-4">Order Summary</h3>
                    <div className="space-y-2 mb-4">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between">
                          <div className="flex items-center">
                            <span>{item.product.name}</span>
                            <span className="text-foreground/70 mx-2">×</span>
                            <span>{item.quantity}</span>
                          </div>
                          <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-6">
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="text-sm hover:underline"
                    >
                      Back to shipping
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "Processing..." : "Complete Order"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;
