import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Cart() {
  const [filter, setFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart on page load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const cartProducts = response.data.products.map(item => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image || "/assets/placeholder.jpg",
          stockStatus: item.product.stockStatus || "normal",
          flashSale: item.product.flashSale || false,
          selected: true,
          description: item.product.description || "",
        }));

        setProducts(cartProducts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Update quantity in database
  const updateQuantity = async (id, amountChange) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const newQuantity = Math.max(1, product.quantity + amountChange);

    try {
      await axios.put('/api/cart/update-quantity', {
        productId: id,
        amount: newQuantity
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, quantity: newQuantity } : product
        )
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  // Remove product from cart in database
  const removeFromCart = async (id) => {
    try {
      await axios.delete('/api/cart/remove', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: { productId: id } // must send body inside "data" when using axios.delete
      });

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  const addToWishlistAndRemoveFromCart = (id) => {
    removeFromCart(id); // reuse remove function
    console.log(`Product with id ${id} added to wishlist`);
  };

  const toggleSelectProduct = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, selected: !product.selected }
          : product
      )
    );
  };

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    if (filter === "almost") return product.stockStatus === "almost-sold-out";
    if (filter === "flash") return product.flashSale;
    return true;
  });

  const totalPrice = products.reduce((acc, product) => {
    return product.selected ? acc + product.price * product.quantity : acc;
  }, 0);

  if (loading) {
    return <div className="text-center text-2xl font-bold">Loading...</div>;
  }

  return (
    <div className="p-4 bg-bg_clr text-t_clr font-paragraph">
      <h2 className="text-2xl mb-4 font-semibold">Your Cart</h2>

      <div className="mb-6 flex gap-4">
        <button onClick={() => setFilter("all")} className="px-4 py-2 bg-t_clr text-white hover:bg-bg_clr dark:hover:bg-gray-500 cursor-pointer rounded-full">
          All
        </button>
        <button onClick={() => setFilter("almost")} className="px-4 py-2 bg-t_clr text-white hover:bg-bg_clr dark:hover:bg-gray-500 cursor-pointer rounded-full">
          Almost Out of Stock
        </button>
        <button onClick={() => setFilter("flash")} className="px-4 py-2 bg-t_clr text-white hover:bg-bg_clr dark:hover:bg-gray-500 cursor-pointer rounded-full">
          Flash Sale
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-3xl font-medium text-t_clr py-12">
          Your cart is empty
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="relative flex items-center bg-cn_clr rounded-xl p-4 shadow"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="absolute top-4 right-4 flex flex-col items-center space-y-2">
                <button onClick={() => addToWishlistAndRemoveFromCart(product.id)} className="p-2 hover:bg-red-200 dark:hover:bg-black cursor-pointer rounded-full" title="Add to Wishlist">
                  <img src="src/assets/wishlist.png" alt="wishlist" className="w-6 h-6" />
                </button>
                <button onClick={() => removeFromCart(product.id)} className="p-2 hover:bg-red-200 dark:hover:bg-black cursor-pointer rounded-full" title="Delete from Cart">
                  <img src="src/assets/delete.png" alt="delete" className="w-6 h-6" />
                </button>
              </div>

              <input
                type="checkbox"
                checked={product.selected}
                onChange={() => toggleSelectProduct(product.id)}
                className="cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2 p-2 w-5 h-5"
              />

              <img src={product.image} alt={product.name} className="w-24 h-28 ml-15 rounded-xl object-cover mr-4" />

              <div className="flex-1">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <div className="flex items-center justify-between mt-2 mr-70">
                  <p className="text-lg">${product.price.toFixed(2)}</p>
                  <p className="text-md text-t_clr ml-30">{product.description}</p>
                </div>

                <div className="flex items-center mt-2">
                  <button onClick={() => updateQuantity(product.id, -1)} className="cursor-pointer px-3 text-lg font-bold rounded-full bg-t_clr text-white hover:opacity-80">
                    -
                  </button>
                  <span className="mx-4 text-lg">{product.quantity}</span>
                  <button onClick={() => updateQuantity(product.id, 1)} className="cursor-pointer px-3 text-lg font-bold rounded-full bg-t_clr text-white hover:opacity-80">
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-6 text-lg font-semibold flex justify-between items-center">
        <p className="text-2xl font-bold">
          Total Price: ${totalPrice.toFixed(2)}
        </p>
        <button onClick={() => console.log("Proceed to checkout")} className="px-6 py-2 text-xl bg-t_clr text-white rounded-full hover:bg-bg_clr dark:hover:bg-gray-500 cursor-pointer">
          Checkout
        </button>
      </div>
    </div>
  );
}
