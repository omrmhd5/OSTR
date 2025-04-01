import React from "react";
import { useWishlist } from "./context/WishlistContext";
export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="w-full min-h-screen bg-bg_clr text-t_clr font-paragraph relative">
      <h1 className="text-3xl font-bold text-center mb-6">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          Your wishlist is empty. Start adding your favorite products! 🛍️
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-cn_clr shadow-md rounded-lg overflow-hidden p-4 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>

              <button
                className="mt-3 w-full bg-cn_clr text-t_clr py-2 rounded-md hover:bg-bg_clr transition"
                onClick={() => toggleWishlist(product)}
              >
                Remove ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
