import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("/api/wishlist");  // ⚡ Are you using correct URL?
        setWishlist(res.data.wishlist || []);          // ⚡ Make sure backend returns { wishlist: [...] }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        setWishlist([]);                               // Important to avoid undefined
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const toggleWishlist = async (product) => {
    try {
      const res = await axios.post("/api/wishlist/toggle", {
        productId: product._id || product.id,   // ⚡ Correct id
      });
      setWishlist(res.data.wishlist.products || res.data.wishlist || []);
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
