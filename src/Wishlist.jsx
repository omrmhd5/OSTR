import React from "react";
import { useWishlist } from "./context/WishlistContext";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="w-full min-h-screen bg-bg_clr text-t_clr font-paragraph relative p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          Your wishlist is empty. Start adding your favorite products! 🛍️
        </p>
      ) : (
        <div className="w-full max-w-4xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-4 font-semibold text-lg border-b-2 border-gray-300 pb-2 mb-4">
            <p>Product Image</p>
            <p>Product Name</p>
            <p>Price</p>
            <p>Action</p>
          </div>

          {/* Table Body */}
          <div className="flex flex-col gap-4">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-4 items-center border-b border-gray-200 pb-2"
              >
                {/* Product Image */}
                <div className="flex justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>

                {/* Product Name */}
                <p className="text-gray-700">{product.name}</p>

                {/* Price */}
                <p className="text-gray-600">${product.price}</p>

                {/* Remove Button */}
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                  onClick={() => toggleWishlist(product)}
                >
                  Remove ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
