import React, { useState } from "react";
import { useWishlist } from "./context/WishlistContext";

const productsmen = [
  { id: 1, name: "Suit", price: 299, images: ["src/assets/Products/Men/BeigeSuit.jpg", "src/assets/Products/Men/beigeSuit2.jpg", "src/assets/Products/Men/BeigeSuit3.jpg", "src/assets/Products/Men/beigesuit4.jpg"] },
  { id: 2, name: "Watch", price: 299, images: ["src/assets/Products/Men/blackWatch1.jpg", "src/assets/Products/Men/blackWatch2.jpg", "src/assets/Products/Men/blackWatch3.jpg"] },
  { id: 3, name: "Shirt", price: 299, images: ["src/assets/Products/Men/berTshirt1.jpg", "src/assets/Products/Men/berTshirt2.jpg"] },
  { id: 4, name: "Shorts", price: 120, images: ["src/assets/Products/Men/shorts1.jpg", "src/assets/Products/Men/shorts2.jpg", "src/assets/Products/Men/shorts3.jpg"] },
  { id: 5, name: "Flip Flop", price: 50, images: ["src/assets/Products/Men/flipflop1.jpg", "src/assets/Products/Men/flipflop2.jpg","src/assets/Products/Men/flipflop3.jpg","src/assets/Products/Men/flipflop4.jpg" ] },
  { id: 6, name: "Boots", price: 350, images: ["src/assets/Products/Men/boots1.jpg", "src/assets/Products/Men/boot2.jpg", "src/assets/Products/Men/boots3.jpg"] },
];

const productswomen = [
  { id: 7, name: "Bag", price: 299, images: ["src/assets/Products/Women/Bag3.jpg","src/assets/Products/Women/Bag2.jpg","src/assets/Products/Women/Bag1.jpg"] },
  { id: 8, name: "Watch", price: 299, images: ["src/assets/Products/Women/watch3.jpg","src/assets/Products/Women/watch1.jpg","src/assets/Products/Women/watch2.jpg"] },
  { id: 9, name: "Shirt", price: 299, images: ["src/assets/Products/Women/shirt1.jpg","src/assets/Products/Women/shirt2.jpg","src/assets/Products/Women/shirt3.jpg"] },
  { id: 10, name: "Pants", price: 50, images: ["src/assets/Products/Women/pants1.jpg","src/assets/Products/Women/pants2.jpg","src/assets/Products/Women/pants3.jpg"] },
  { id: 11, name: "Shorts", price: 120, images: ["src/assets/Products/Women/shorts2.jpg","src/assets/Products/Women/shorts1.jpg","src/assets/Products/Women/shorts3.jpg"] },
  { id: 12, name: "Boots", price: 350, images: ["src/assets/Products/Women/boots1.jpg","src/assets/Products/Women/boots2.jpg","src/assets/Products/Women/boots3.jpg"] },
  { id: 13, name: "Clogs", price: 350, images: ["src/assets/Products/Women/clogs2.jpg","src/assets/Products/Women/clogs1.jpg","src/assets/Products/Women/clogs3.jpg"] },
];

const productschildren = [
  { id: 14, name: "Backpack", price: 299, images: ["src/assets/Products/Kids/backpack1.jpg","src/assets/Products/Kids/backpack2.jpg","src/assets/Products/Kids/backpack3.jpg","src/assets/Products/Kids/backpack4.jpg"] },
  { id: 15, name: "Shirt", price: 299, images: ["src/assets/Products/Kids/shirt1.jpg","src/assets/Products/Kids/shirt3.jpg","src/assets/Products/Kids/shirt4.jpg","src/assets/Products/Kids/shirt2.jpg"] },
  { id: 16, name: "Pants", price: 299, images: ["src/assets/Products/Kids/pants1.jpg","src/assets/Products/Kids/pants2.jpg","src/assets/Products/Kids/pants3.jpg","src/assets/Products/Kids/pants4.jpg"] },
  { id: 17, name: "Crocs", price: 50, images: ["src/assets/Products/Kids/crocs1.jpg","src/assets/Products/Kids/crocs2.jpg","src/assets/Products/Kids/crocs3.jpg"] },
];

const allProducts = [...productsmen, ...productswomen, ...productschildren];

export default function ShopPage() {
  const [selectedProducts, setSelectedProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [message, setMessage] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState({});

  const { wishlist, toggleWishlist } = useWishlist();

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

  const handleImageChange = (productId, direction) => {
    setImageIndex((prev) => {
      const current = prev[productId] || 0;
      const product = selectedProducts.find((p) => p.id === productId);
      const total = product.images.length;
      const newIndex = (current + direction + total) % total;
      return { ...prev, [productId]: newIndex };
    });
  };

  const filteredProducts = selectedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-bg_clr text-t_clr font-paragraph relative">
      <header className="flex justify-between items-center border-b pb-2 mb-4 p-4">
        <h1 className="text-xl font-bold font-header">Shop</h1>
      </header>

      {message && (
        <div className="fixed top-[80px] left-1/2 transform -translate-x-1/2 bg-[#976c60] text-white font-semibold px-6 py-3 rounded shadow-lg z-[9999] w-max">
          {message}
        </div>
      )}

      <div className="flex justify-between items-center mb-4 px-4">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded w-1/3 text-t_clr"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-bg_clr text-t_clr hover:bg-cn_clr font-semibold" onClick={() => setSelectedProducts(productsmen)}>
            Men
          </button>
          <button className="px-4 py-2 bg-bg_clr text-t_clr hover:bg-cn_clr font-semibold" onClick={() => setSelectedProducts(productswomen)}>
            Women
          </button>
          <button className="px-4 py-2 bg-bg_clr text-t_clr hover:bg-cn_clr font-semibold" onClick={() => setSelectedProducts(productschildren)}>
            Kids
          </button>
          <button className="px-4 py-2 bg-bg_clr text-t_clr hover:bg-cn_clr font-semibold" onClick={() => setSelectedProducts(allProducts)}>
            View All
          </button>
        </div>
        <select className="p-2 border rounded text-t_clr" value={sortBy} onChange={handleSort}>
          <option value="">Sort By</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="text-center bg-cn_clr p-4 rounded min-h-[400px] transition-transform duration-300 transform hover:scale-105 hover:shadow-lg relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="w-full h-64 overflow-hidden relative">
                <img
                  src={product.images[imageIndex[product.id] || 0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {hoveredProduct === product.id && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageChange(product.id, -1)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-bg_clr bg-opacity-50 hover:bg-opacity-100 text-black px-2 rounded-full"
                    >
                      ◀
                    </button>
                    <button
                      onClick={() => handleImageChange(product.id, 1)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-bg_clr bg-opacity-50 hover:bg-opacity-100 text-black px-2 rounded-full"
                    >
                      ▶
                    </button>
                  </>
                )}
              </div>
              <h2 className="text-lg font-semibold mt-2 font-header">{product.name}</h2>
              <p className="text-t_clr">${product.price}</p>
              <div className="flex justify-center gap-2 mt-2">
                <button
                  className="w-1/2 bg-bg_clr flex justify-center items-center p-2 hover:bg-cn_clr"
                  onClick={() => showMessage("Item added to cart successfully!")}
                >
                  <img src="/src/assets/cart.png" alt="Cart" className="w-6 h-6" />
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