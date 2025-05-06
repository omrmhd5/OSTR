// context/CartContext.js
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5000/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/cart/add",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCart(res.data); // Update local state
    } catch (err) {
      console.error(" Backend error response:", err.response?.data || err.message); 
      throw new Error("Error adding to cart");
    }
  };
  

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
