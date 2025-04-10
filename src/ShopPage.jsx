import React, { useState } from "react";
import { useWishlist } from "./context/WishlistContext";
import { LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const productsmen = [
  { id: 1, name: "Suit", price: 299, images: ["src/assets/Products/Men/BeigeSuit.jpg", "src/assets/Products/Men/beigeSuit2.jpg", "src/assets/Products/Men/BeigeSuit3.jpg", "src/assets/Products/Men/beigesuit4.jpg"] ,description: "A sleek beige suit designed for formal occasions. Offers a tailored fit and modern appeal."},
  { id: 2, name: "Watch", price: 299, images: ["src/assets/Products/Men/blackWatch1.jpg", "src/assets/Products/Men/blackWatch2.jpg", "src/assets/Products/Men/blackWatch3.jpg"] ,description: "Stylish black watch with a minimalist dial. Perfect for both everyday wear and special events."},
  { id: 3, name: "Shirt", price: 299, images: ["src/assets/Products/Men/berTshirt1.jpg", "src/assets/Products/Men/berTshirt2.jpg"] ,description: "Casual t-shirt with breathable fabric and a classic crew neck. Ideal for daily wear."},
  { id: 4, name: "Shorts", price: 120, images: ["src/assets/Products/Men/shorts1.jpg", "src/assets/Products/Men/shorts2.jpg", "src/assets/Products/Men/shorts3.jpg"] ,description: "Lightweight and durable shorts great for summer or workouts. Features multiple pockets."},
  { id: 5, name: "Flip Flop", price: 50, images: ["src/assets/Products/Men/flipflop1.jpg", "src/assets/Products/Men/flipflop2.jpg","src/assets/Products/Men/flipflop3.jpg","src/assets/Products/Men/flipflop4.jpg" ] ,description: "Comfortable flip flops perfect for beach days or lounging at home."},
  { id: 6, name: "Pants", price: 350, images: ["src/assets/Products/Men/pants1.jpg", "src/assets/Products/Men/pants2.jpg", "src/assets/Products/Men/pants3.jpg"] ,description: "Versatile everyday pants with a refined design and comfortable stretch." },
  { id: 7, name: "Boots", price: 350, images: ["src/assets/Products/Men/boots1.jpg", "src/assets/Products/Men/boot2.jpg", "src/assets/Products/Men/boots3.jpg"] ,description: "Rugged boots built for durability and comfort. Ideal for both urban and outdoor adventures." },
  { id: 8, name: "Suit", price: 350, images: ["src/assets/Products/Men/blacksuit1.jpg", "src/assets/Products/Men/blacksuit2.jpg", "src/assets/Products/Men/blacksuit3.jpg"] ,description: "Classic black suit offering a sharp silhouette. Ideal for formal and business events."},
];

const productswomen = [
  { id: 9, name: "Bag", price: 299, images: ["src/assets/Products/Women/Bag3.jpg","src/assets/Products/Women/Bag2.jpg","src/assets/Products/Women/Bag1.jpg"] ,description: "Chic and roomy handbag perfect for daily errands or evenings out." },
  { id: 10, name: "Watch", price: 299, images: ["src/assets/Products/Women/watch3.jpg","src/assets/Products/Women/watch1.jpg","src/assets/Products/Women/watch2.jpg"],description: "Elegant women's watch with a sleek band and classic face." },
  { id: 11, name: "Shirt", price: 299, images: ["src/assets/Products/Women/shirt1.jpg","src/assets/Products/Women/shirt2.jpg","src/assets/Products/Women/shirt3.jpg"] ,description: "Stylish shirt with soft fabric and a flattering fit." },
  { id: 12, name: "Pants", price: 50, images: ["src/assets/Products/Women/pants1.jpg","src/assets/Products/Women/pants2.jpg","src/assets/Products/Women/pants3.jpg"] ,description: "Comfort-fit pants ideal for casual or office wear." },
  { id: 13, name: "Suit", price: 350, images: ["src/assets/Products/Women/suit1.jpg","src/assets/Products/Women/suit2.jpg","src/assets/Products/Women/suit3.jpg"], description: "Power suit for the modern woman — tailored and timeless." },
  { id: 14, name: "Shorts", price: 120, images: ["src/assets/Products/Women/shorts2.jpg","src/assets/Products/Women/shorts1.jpg","src/assets/Products/Women/shorts3.jpg"], description: "Breezy summer shorts with a flattering cut and comfy waistband." },
  { id: 15, name: "Boots", price: 350, images: ["src/assets/Products/Women/boots1.jpg","src/assets/Products/Women/boots2.jpg","src/assets/Products/Women/boots3.jpg"] ,description: "Elegant high-ankle boots with a bold design for any occasion." },
  { id: 16, name: "Clogs", price: 350, images: ["src/assets/Products/Women/clogs2.jpg","src/assets/Products/Women/clogs1.jpg","src/assets/Products/Women/clogs3.jpg"] ,description: "Trendy clogs with a comfortable footbed and standout look."},
  
];

const productschildren = [
  { id: 17, name: "Dress", price: 50, images: ["src/assets/Products/Kids/dress1.jpg","src/assets/Products/Kids/dress2.jpg","src/assets/Products/Kids/dress3.jpg"], description: "Adorable kids’ dress with a playful print and comfy fit."  },
  { id: 18, name: "Backpack", price: 299, images: ["src/assets/Products/Kids/backpack1.jpg","src/assets/Products/Kids/backpack2.jpg","src/assets/Products/Kids/backpack3.jpg","src/assets/Products/Kids/backpack4.jpg"], description: "Fun and colorful backpack designed for school adventures." },
  { id: 19, name: "Shirt", price: 299, images: ["src/assets/Products/Kids/shirt1.jpg","src/assets/Products/Kids/shirt3.jpg","src/assets/Products/Kids/shirt4.jpg","src/assets/Products/Kids/shirt2.jpg"], description: "Soft cotton shirt with vibrant design for active kids." },
  { id: 20, name: "Pants", price: 299, images: ["src/assets/Products/Kids/pants1.jpg","src/assets/Products/Kids/pants2.jpg","src/assets/Products/Kids/pants3.jpg","src/assets/Products/Kids/pants4.jpg"], description: "Durable children’s pants perfect for play and daily use." },
  { id: 21, name: "Crocs", price: 50, images: ["src/assets/Products/Kids/crocs1.jpg","src/assets/Products/Kids/crocs2.jpg","src/assets/Products/Kids/crocs3.jpg"], description: "Lightweight and comfy crocs — great for indoor and outdoor fun." },
  { id: 22, name: "Cargo Shorts", price: 50, images: ["src/assets/Products/Kids/shorts1.jpg","src/assets/Products/Kids/shorts2.jpg"], description: "Utility cargo shorts with pockets and relaxed fit."  },
  { id: 23, name: "Shoes", price: 50, images: ["src/assets/Products/Kids/shoes1.jpg","src/assets/Products/Kids/shoes2.jpg"] , description: "Everyday kids’ shoes offering comfort and playful style."},
  { id: 24, name: "Set", price: 50, images: ["src/assets/Products/Kids/set1.jpg","src/assets/Products/Kids/set2.jpg"], description: "Coordinated clothing set perfect for matching outfits and easy dressing." },
];

const allProducts = [...productsmen, ...productswomen, ...productschildren];

export default function ShopPage() {
  const [selectedProducts, setSelectedProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [message, setMessage] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");
  const [isGridView, setIsGridView] = useState(true);

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
        <h1 className="text-3xl font-bold font-header">Shop</h1>
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
          className="p-2 border rounded w-1/4 text-t_clr bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex space-x-2">
          {["men", "women", "kids", "all"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 font-semibold rounded ${
                activeCategory === category
                  ? "bg-cn_clr text-white"
                  : "bg-bg_clr text-t_clr hover:bg-cn_clr"
              }`}
              onClick={() => {
                setActiveCategory(category);
                if (category === "men") setSelectedProducts(productsmen);
                else if (category === "women") setSelectedProducts(productswomen);
                else if (category === "kids") setSelectedProducts(productschildren);
                else setSelectedProducts(allProducts);
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <select
            className="p-2 border rounded text-t_clr bg-white"
            value={sortBy}
            onChange={handleSort}
          >
            <option className="bg-bg_clr" value="">Sort By</option>
            <option className="bg-bg_clr" value="low-to-high">Price: Low to High</option>
            <option className="bg-bg_clr" value="high-to-low">Price: High to Low</option>
          </select>

          {/* View toggle */}
          <button
  className="p-2 border rounded text-t_clr bg-white hover:bg-cn_clr flex items-center space-x-2"
  onClick={() => setIsGridView(!isGridView)}
>
  {isGridView ? (
    <>
      <List className="w-5 h-5" />
      <span>List View</span>
    </>
  ) : (
    <>
      <LayoutGrid className="w-5 h-5" />
      <span>Grid View</span>
    </>
  )}
</button>

        </div>
      </div>

      <AnimatePresence mode="wait">
  <motion.div
    key={isGridView ? "grid" : "list"}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className={`${isGridView ? "grid grid-cols-4" : "flex flex-col"} gap-4 p-4`}
  >
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <div
          key={product.id}
          className={`text-center bg-cn_clr p-4 rounded min-h-[400px] transition-transform duration-300 transform hover:scale-105 hover:shadow-lg relative ${
            isGridView ? "" : "flex items-center gap-4"
          }`}
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          <div className={`${isGridView ? "w-full h-64" : "w-64 h-64"} overflow-hidden relative`}>
            <img
              src={product.images[imageIndex[product.id] || 0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {hoveredProduct === product.id && product.images.length > 1 && (
              <>
                <button
                  onClick={() => handleImageChange(product.id, -1)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-bg_clr bg-opacity-50 hover:bg-opacity-100 text-[#976c60] px-2 rounded-full hover:bg-cn_clr"
                >
                  ◀
                </button>
                <button
                  onClick={() => handleImageChange(product.id, 1)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-bg_clr bg-opacity-50 hover:bg-opacity-100 text-[#976c60] px-2 rounded-full hover:bg-cn_clr"
                >
                  ▶
                </button>
              </>
            )}
          </div>

          <div className={`${isGridView ? "" : "flex flex-col items-start"} ml-4`}>
  <h2 className="text-lg font-semibold mt-2 font-header">{product.name}</h2>
  <p className="text-t_clr">${product.price}</p>
  {!isGridView && (
    <p className="text-xl text-t_clr ml-28 mt-1">{product.description}</p>
  )}
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
        const isInWishlist = wishlist.some((item) => item.id === product.id);
        toggleWishlist(product);
        showMessage(
          isInWishlist
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

        </div>
      ))
    ) : (
      <p className="text-center col-span-4 text-t_clr text-2xl font-semibold">
        No products found.
      </p>
    )}
  </motion.div>
</AnimatePresence>

    </div>
  );
}