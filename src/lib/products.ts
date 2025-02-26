
import { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Wool Coat",
    category: "outerwear",
    price: 299.99,
    image: "/placeholder.svg",
    description: "Elegant wool coat with a minimalist design, perfect for any occasion.",
    details: [
      "Premium Italian wool blend",
      "Subtle notch lapel",
      "Two side pockets",
      "Single back vent",
      "Interior pocket",
      "Fully lined"
    ]
  },
  {
    id: "2",
    name: "Tailored Cotton Shirt",
    category: "tops",
    price: 89.99,
    image: "/placeholder.svg",
    description: "Classic tailored shirt made from the finest cotton.",
    details: [
      "100% organic cotton",
      "Mother-of-pearl buttons",
      "Cutaway collar",
      "Slim fit",
      "Rounded cuffs",
      "Reinforced seams"
    ]
  },
  {
    id: "3",
    name: "Slim Fit Chino Trousers",
    category: "bottoms",
    price: 119.99,
    image: "/placeholder.svg",
    description: "Essential chino trousers with a contemporary fit.",
    details: [
      "Stretch cotton twill",
      "Flat front design",
      "Side slash pockets",
      "Back welt pockets with button closure",
      "Belt loops",
      "Tapered leg"
    ]
  },
  {
    id: "4",
    name: "Cashmere V-Neck Sweater",
    category: "tops",
    price: 179.99,
    image: "/placeholder.svg",
    description: "Luxurious cashmere sweater with a timeless V-neck design.",
    details: [
      "100% premium cashmere",
      "Ribbed neck, cuffs, and hem",
      "Lightweight and breathable",
      "Regular fit",
      "Versatile styling options",
      "Soft hand feel"
    ]
  },
  {
    id: "5",
    name: "Structured Blazer",
    category: "outerwear",
    price: 249.99,
    image: "/placeholder.svg",
    description: "Versatile structured blazer that transitions seamlessly from day to night.",
    details: [
      "Wool blend fabric",
      "Notch lapels",
      "Two-button closure",
      "Flap pockets",
      "Four-button cuffs",
      "Double back vent"
    ]
  },
  {
    id: "6",
    name: "Selvedge Denim Jeans",
    category: "bottoms",
    price: 149.99,
    image: "/placeholder.svg",
    description: "Premium selvedge denim jeans with authentic detailing.",
    details: [
      "14oz Japanese selvedge denim",
      "Five-pocket styling",
      "Button fly",
      "Slim straight fit",
      "Chain-stitch hemming",
      "Signature leather patch"
    ]
  },
  {
    id: "7",
    name: "Merino Wool Turtleneck",
    category: "tops",
    price: 129.99,
    image: "/placeholder.svg",
    description: "Refined turtleneck sweater crafted from extra-fine merino wool.",
    details: [
      "Extra-fine merino wool",
      "Ribbed turtleneck, cuffs, and hem",
      "Regular fit",
      "Lightweight and soft",
      "Natural temperature regulation",
      "Versatile layering piece"
    ]
  },
  {
    id: "8",
    name: "Water-Resistant Parka",
    category: "outerwear",
    price: 329.99,
    image: "/placeholder.svg",
    description: "Technical parka with water-resistant properties and minimal design.",
    details: [
      "Water-resistant cotton blend shell",
      "Detachable hood with drawcord",
      "Two-way front zip with snap closure",
      "Multiple pockets",
      "Adjustable cuffs",
      "Fishtail hem"
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};
