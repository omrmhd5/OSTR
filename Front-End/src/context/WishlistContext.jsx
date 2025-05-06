import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:5000/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });

        
        setWishlist(response.data.wishlist || []);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const toggleWishlist = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/wishlist/toggle",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log(" Wishlist Response:", response.data);
      setWishlist(
        response.data.wishlist.products || response.data.wishlist || []
      );
    } catch (error) {
      console.error("Failed to toggle wishlist item:", error);
    }
  };
  
  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
