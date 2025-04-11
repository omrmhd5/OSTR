import React from "react";
import { useWishlist } from "./context/WishlistContext";
import { motion } from "framer-motion";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full min-h-screen bg-bg_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header relative p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-xl font-semibold text-t_clr">
          Your wishlist is empty. Start adding your favorite products! 🛍️
        </p>
      ) : (
        <div className="w-full max-w-4xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-4 font-bold text-lg border-b-2 border-[#976c60] dark:border-black pb-2 mb-4">
            <p>Product Image</p>
            <p>Product Name</p>
            <p>Price</p>
            <p>Remove From Wishlist</p>
          </div>

          <motion.div
            className="flex flex-col gap-4 bg-cn_clr"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }, // Stagger effect
            }}>
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                className="grid grid-cols-4 items-center border-b border-[#976c60] dark:border-black pb-2"
                variants={itemVariants} // Apply animation
              >
                <div className="flex justify-center">
                  <img
                    src={product.images[0].src}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>

                <p className="text-t_clr font-semibold">{product.name}</p>

                <p className="text-t_clr font-semibold">${product.price}</p>

                <button
                  className="bg-cn_clr p-2 rounded-md hover:bg-bg_clr transition flex justify-center items-center"
                  onClick={() => toggleWishlist(product)}>
                  <img
                    src="src/assets/trash.png"
                    alt="Remove"
                    className="w-8 h-8"
                  />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
