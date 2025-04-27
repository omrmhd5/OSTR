import { createContext, useContext, useState } from "react";

// Create context
const WishlistContext = createContext();

// Wishlist Provider
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Function to add/remove items from the wishlist
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item.id === product.id);
      return isInWishlist
        ? prevWishlist.filter((item) => item.id !== product.id) // Remove item
        : [...prevWishlist, product]; // Add item
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

// Hook to use the Wishlist Context
export function useWishlist() {
  return useContext(WishlistContext);
}
