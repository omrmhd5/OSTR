import React, { useState } from 'react';
import { useWishlist } from './context/WishlistContext';


const productsmen = [
  { id: 1, name: "Backpack", price: 299, image: "src/assets/shirt.jpeg" },
  { id: 2, name: "Watch", price: 299, image: "src/assets/shirt.jpeg" },
  { id: 3, name: "Shirt", price: 299, image: "src/assets/shirt.jpeg" },
  { id: 4, name: "Flip Flop", price: 50, image: "src/assets/shirt.jpeg" },
  { id: 5, name: "Shorts", price: 120, image: "src/assets/shirt.jpeg" },
  { id: 6, name: "Boots", price: 350, image: "src/assets/shirt.jpeg" },
];

const productswomen = [
  { id: 7, name: "Backpack", price: 299, image: "src/assets/img1.jpg" },
  { id: 8, name: "Watch", price: 299, image: "src/assets/img1.jpg" },
  { id: 9, name: "Shirt", price: 299, image: "src/assets/img1.jpg" },
  { id: 10, name: "Flip Flop", price: 50, image: "src/assets/img1.jpg" },
  { id: 11, name: "Shorts", price: 120, image: "src/assets/img1.jpg" },
  { id: 12, name: "Boots", price: 350, image: "src/assets/img1.jpg" },
];

const productschildren = [
  { id: 13, name: "Backpack", price: 299, image: "src/assets/profile.jpg" },
  { id: 14, name: "Watch", price: 299, image: "src/assets/profile.jpg" },
  { id: 15, name: "Shirt", price: 299, image: "src/assets/profile.jpg" },
  { id: 16, name: "Flip Flop", price: 50, image: "src/assets/profile.jpg" },
];

const allProducts = [...productsmen, ...productswomen, ...productschildren];

export default function ShopPage() {
  const [selectedProducts, setSelectedProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [message, setMessage] = useState("");

  const { wishlist, toggleWishlist } = useWishlist(); // Use context for wishlist

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);

    let sortedProducts = [...selectedProducts];

    if (value === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setSelectedProducts(sortedProducts);
  };

  const filteredProducts = selectedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-bg_clr text-t_clr font-paragraph relative">
      <header className="flex justify-between items-center border-b pb-2 mb-4 p-4">
        <h1 className="text-xl font-bold font-header">Shop</h1>
      </header>

      <div
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#976c60] text-white px-4 py-2 rounded shadow-md transition-opacity duration-300"
        style={{ display: message ? "block" : "none" }}
      >
        {message}
      </div>

      <div className="grid grid-cols-4 gap-4 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="text-center bg-cn_clr p-4 rounded transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <h2 className="text-lg font-semibold mt-2 font-header">
                {product.name}
              </h2>
              <p className="text-t_clr">${product.price}</p>
              <div className="flex justify-center gap-2 mt-2">
                <button
                  className="w-1/2 bg-bg_clr flex justify-center items-center p-2 hover:bg-cn_clr"
                  onClick={() => showMessage("Item added to cart successfully!")}
                >
                  <img
                    src="/src/assets/cart.png"
                    alt="Cart"
                    className="w-6 h-6"
                  />
                </button>
                <button
                  className="w-1/2 bg-bg_clr flex justify-center items-center p-2 hover:bg-cn_clr"
                  onClick={() => {
                    toggleWishlist(product);
                    showMessage(
                      wishlist.some((item) => item.id === product.id)
                        ? "Item removed from wishlist!"
                        : "Item added to wishlist successfully!"
                    );
                  }}
                >
                  <img
                    src={
                      wishlist.some((item) => item.id === product.id)
                        ? "/src/assets/RemoveWishlist.png"
                        : "/src/assets/wishlist.png"
                    }
                    alt="wishlist"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4 text-t_clr text-2xl font-semibold">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}