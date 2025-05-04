import React, { useEffect, useState } from "react";
import { useWishlist } from "./context/WishlistContext";
import { LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import axios from "axios";

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products/all");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [message, setMessage] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");
  const [isGridView, setIsGridView] = useState(true);
  const { wishlist, toggleWishlist } = useWishlist();

  const navigate = useNavigate();

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
    const sorted = [...products];

    if (value === "low-to-high") sorted.sort((a, b) => a.price - b.price);
    else if (value === "high-to-low") sorted.sort((a, b) => b.price - a.price);

    setProducts(sorted);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === "men") {
      const fetchMenProducts = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/products/category?category=Men"
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchMenProducts();
    } else if (category === "women") {
      const fetchWomenProducts = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/products/category?category=Women"
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchWomenProducts();
    } else if (category === "kids") {
      const fetchKidsProducts = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/products/category?category=Kids"
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchKidsProducts();
    } else {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/products/all"
          );
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  };

  const handleImageChange = (productId, direction) => {
    setImageIndex((prev) => {
      const current = prev[productId] || 0;
      const product = products.find((p) => p._id === productId);
      const total = product?.photos.length || 1;
      const newIndex = (current + direction + total) % total;
      return { ...prev, [productId]: newIndex };
    });
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryList = ["men", "women", "kids", "all"];

  return (
    <div className="w-full min-h-screen bg-bg_clr text-t_clr relative font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <header className="flex justify-between items-center border-b pb-2 mb-4 p-4">
        <h1 className="text-3xl font-bold font-header">Shop</h1>
      </header>

      {message && (
        <div className="fixed top-[40px] left-1/2 transform -translate-x-1/2 bg-[#976c60] text-white font-semibold px-6 py-3 rounded shadow-lg z-[9999] w-max">
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
          {categoryList.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 font-semibold rounded cursor-pointer ${
                activeCategory === category
                  ? "bg-cn_clr text-white dark:text-gray-400"
                  : "bg-bg_clr text-t_clr hover:bg-cn_clr"
              }`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <select
            className="p-2 border rounded text-t_clr bg-white cursor-pointer"
            value={sortBy}
            onChange={handleSort}>
            <option className="bg-bg_clr" value="">
              Sort By
            </option>
            <option className="bg-bg_clr" value="low-to-high">
              Price: Low to High
            </option>
            <option className="bg-bg_clr" value="high-to-low">
              Price: High to Low
            </option>
          </select>

          <button
            className="p-2 border rounded text-t_clr bg-white hover:bg-cn_clr flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsGridView(!isGridView)}>
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
          className={`${
            isGridView ? "grid grid-cols-4" : "flex flex-col"
          } gap-4 p-4`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className={`cursor-pointer text-center bg-cn_clr p-4 rounded min-h-[400px] transition-transform duration-300 transform hover:scale-105 hover:shadow-lg relative ${
                  isGridView ? "" : "flex items-center gap-4"
                }`}
                onClick={() => {
                  window.scrollTo(0, 100);
                  navigate("/product/" + product._id);
                }}
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}>
                <div
                  className={`${
                    isGridView ? "w-full h-64" : "w-64 h-64"
                  } overflow-hidden relative`}>
                  <img
                    src={
                      product.photos[imageIndex[product._id] || 0]?.src ||
                      "default.jpg"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {hoveredProduct === product._id &&
                    product.photos.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageChange(product._id, -1);
                          }}
                          className="cursor-pointer absolute left-2 top-1/2 transform -translate-y-1/2 bg-bg_clr bg-opacity-50 hover:bg-opacity-100 text-[#976c60] dark:text-black p-1 px-3 rounded-full hover:bg-cn_clr">
                          ◀
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageChange(product._id, 1);
                          }}
                          className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-bg_clr bg-opacity-50 hover:bg-opacity-100 text-[#976c60] dark:text-black p-1 px-3 rounded-full hover:bg-cn_clr">
                          ▶
                        </button>
                      </>
                    )}
                </div>

                <div
                  className={`${
                    isGridView ? "" : "flex flex-col items-start"
                  } ml-4`}>
                  <h2 className="text-lg font-semibold mt-2 font-header">
                    {product.name}
                  </h2>
                  <p className="text-t_clr">${product.price}</p>
                  {!isGridView && (
                    <p className="text-xl text-t_clr ml-28 mt-1">
                      {product.description}
                    </p>
                  )}

                  <div className="flex justify-center gap-2 mt-2">
                    <button
                      className="w-1/2 bg-bg_clr flex justify-center items-center p-2 hover:bg-cn_clr cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.scrollTo(0, 100);
                        navigate("/product/" + product._id);
                      }}>
                      <img
                        src="/src/assets/cart.png"
                        alt="Cart"
                        className="w-6 h-6"
                      />
                    </button>
                    <button
                      className="w-1/2 bg-bg_clr flex justify-center items-center p-2 hover:bg-cn_clr cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // 🔥 Prevent parent navigation!
                        const isInWishlist = wishlist.some(
                          (item) => item._id === product._id
                        );
                        toggleWishlist(product);
                        showMessage(
                          isInWishlist
                            ? "Item Removed From Wishlist!"
                            : "Item Added To Wishlist Successfully!"
                        );
                      }}>
                      <img
                        src={
                          wishlist.some((item) => item._id === product._id)
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
