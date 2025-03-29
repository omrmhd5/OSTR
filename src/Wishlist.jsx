import React from "react";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="w-full min-h-screen bg-bg_clr text-t_clr font-paragraph p-4">
      <h1 className="text-xl font-bold font-header mb-4">My Wishlist</h1>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <div key={product.id} className="text-center bg-cn_clr p-4 rounded transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <h2 className="text-lg font-semibold mt-2 font-header">{product.name}</h2>
              <p className="text-t_clr">${product.price}</p>

              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => toggleWishlist(product)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl font-semibold">Your wishlist is empty.</p>
      )}
    </div>
  );
}
