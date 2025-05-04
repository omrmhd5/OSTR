import { useEffect, useRef, useState } from "react";
import StarRating from "./components/ui/StarRating";
import Slideshow from "./components/ui/Slideshow";
import Slider from "react-slick";
import PopUpMessage from "./components/ui/PopUpMessage";
import { useNavigate, useParams } from "react-router";
import { useWishlist } from "./context/WishlistContext";
import axios from "axios";
import { useCart } from "./context/CartContext";

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [isMinusClicked, setIsMinusClicked] = useState(false);
  const [isPlusClicked, setIsPlusClicked] = useState(false);
  const { wishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const sliderRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { addToCart: addToCartFromContext, fetchCart } = useCart();

  const settings = {
    dots: false,
    draggable: false,
    infinite: true,
    speed: 750,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  const shuffleAndGetRandomProducts = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 6);
  };

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const singleProduct = await axios.get(
          `http://localhost:5000/products/${id}`
        );
        setProduct(singleProduct.data);

        const allProducts = await axios.get(
          "http://localhost:5000/products/all"
        );
        setProducts(allProducts.data);

        const relatedProducts = shuffleAndGetRandomProducts(allProducts.data);
        setRelatedProducts(relatedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const {
    name,
    photos,
    tagline,
    rating,
    reviewCount,
    price,
    colors,
    description,
    reviews,
  } = product;

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  const handleMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const addToCart = async () => {
    if (!size) {
      setText("Please Select A Size");
      handleMessage();
      return;
    }
    if (!selectedColor) {
      setText("Please Select A Color");
      handleMessage();
      return;
    }

    try {
      await addToCartFromContext(product._id, count);
      await fetchCart();
      setText("Item Added To Cart");
      handleMessage();
      setAdded(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setText("User Must Be Signed In");
      handleMessage();
    }
  };

  return (
    // All The Page
    <div className="min-h-screen w-full bg-bg_clr py-7 text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <PopUpMessage text={text} show={showMessage} />
      {/* Main Content */}
      <main className="bg-cn_clr py-6 px-20 rounded-lg w-3/4 justify-self-center">
        {/* Divide The Column */}
        <div className="flex flex-row gap-10">
          {/* SlideShow */}
          <figure className="max-w-1/2 shadow-lg shadow-black/60 dark:text-white">
            <Slideshow
              slides={
                photos?.map((photo) => (
                  <img
                    key={photo.src}
                    src={photo.src}
                    className="w-full max-h-[768px] rounded-lg object-cover flex-shrink-0"
                    alt="Product Photo"
                  />
                )) || []
              }
              currentIndex={currentIndex}
            />
          </figure>
          {/* Product Info */}
          <section className="w-1/2">
            <h1 className="font-semibold text-3xl">{name}</h1>
            <p className="text-lg my-2">{tagline}</p>
            {/* Rating */}
            <div className="flex items-baseline gap-3">
              <StarRating rating={rating} />
              <p className="font-medium text-l">
                {rating} ({reviewCount} Review)
              </p>
            </div>
            <h1 className="font-bold text-2xl mt-5 animate-pulse">
              ${price}.00
            </h1>
            <hr className="border border-gray-300 my-2" />
            {/* Text */}
            <div className="flex gap-20 mt-4">
              <h1 className="font-medium">Available Sizes</h1>
              <h1 className="font-medium">Colors</h1>
            </div>
            <div className="flex gap-10">
              {/* Sizes */}
              <div className="flex gap-2 ">
                {["s", "m", "l"].map((s) => (
                  <button
                    key={s}
                    className={`hover:scale-110 transition-transform ease-in-out duration-200 bg-bg_clr p-2 px-4 rounded-md cursor-pointer ${
                      size === s ? "bg-black text-white" : ""
                    }`}
                    onClick={() => {
                      setSize(s);
                    }}>
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
              {/* Colors */}
              <div className="flex gap-3 mt-2">
                {colors?.map((color) => {
                  return (
                    <button
                      key={color.name}
                      style={{ backgroundColor: color.name.toLowerCase() }}
                      className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                        selectedColor === color.name
                          ? `${color.ring} ring-2 ring-offset-2`
                          : ""
                      }`}
                      onClick={() => setSelectedColor(color.name)}
                    />
                  );
                }) || []}
              </div>
            </div>
            <hr className="border border-gray-300 my-3" />
            {/* Quantity, Wishlist, Add To Cart Buttons */}
            <div className="flex gap-10">
              {/* Quantity */}
              <div className="flex items-baseline font-medium transition-transform duration-300 ease-in-out group hover:[&:has(.plus:hover)]:rotate-8 hover:[&:has(.minus:hover)]:-rotate-8">
                <button
                  className={`cursor-pointer bg-bg_clr p-2 px-4 rounded-l-lg transition-colors duration-300 minus ${
                    isMinusClicked ? "bg-black text-white" : ""
                  }`}
                  onClick={() => {
                    setCount((prev) => Math.max(1, prev - 1));
                    setIsMinusClicked(true);
                    setTimeout(() => setIsMinusClicked(false), 200);
                  }}>
                  -
                </button>
                <p className="bg-bg_clr p-2 px-4">{count}</p>
                <button
                  className={`cursor-pointer bg-bg_clr p-2 px-4 rounded-r-lg transition-colors duration-300 plus ${
                    isPlusClicked ? "bg-black text-white" : ""
                  }`}
                  onClick={() => {
                    setCount((prev) => prev + 1);

                    setIsPlusClicked(true);
                    setTimeout(() => setIsPlusClicked(false), 200);
                  }}>
                  +
                </button>
              </div>
              {/* Wishlist */}
              <button
                onClick={() => {
                  setText(
                    isWishlisted
                      ? "Item Removed From Wishlist"
                      : "Item Added To Wishlist"
                  );
                  handleMessage();
                  toggleWishlist(product);
                }}
                className={` justify-center font-medium flex gap-2 items-baseline border-2 rounded-lg border-gray-400 p-2 px-5 cursor-pointer transition-all duration-700 ease-out  ${
                  isWishlisted
                    ? "bg-t_clr text-cn_clr scale-105 w-3/5 ml-[-25px] "
                    : "scale-100"
                }`}>
                {isWishlisted ? "Remove From Wishlist" : "Add To Wishlist"}
                <i
                  className={`transition-all duration-300 ease-in-out ${
                    isWishlisted
                      ? "ri-heart-fill text-red-500 scale-110"
                      : "ri-heart-line"
                  }`}></i>
              </button>
            </div>
            {/* Add To Cart */}
            <button
              className={` py-1.5 px-32 bg-black rounded-lg text-white mt-4 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 ${
                added ? "bg-green-600" : "hover:animate-bounce"
              }`}
              onClick={addToCart}>
              {added ? (
                <>
                  Added <i className="ri-check-line text-white text-lg"></i>
                </>
              ) : (
                "Add To Cart"
              )}
            </button>
          </section>
        </div>
        {/* Gallery Pictures */}
        <figure className="slideShow flex gap-4 mt-8 w-full">
          {photos?.map((photo, index) => (
            <img
              key={photo.src}
              src={photo.src}
              alt=""
              className="min-w-[10%] max-h-[250px] rounded-lg object-cover cursor-pointer hover:scale-105 ease-in-out transition-all duration-300 hover:shadow-2xl hover:shadow-gray-500/40"
              onClick={() => setCurrentIndex(index)}
            />
          )) || []}
        </figure>
        {/* Description And Review Text */}
        <div className="flex justify-items-start gap-20 text-2xl font-semibold mt-15 border-b-2 border-gray-300 my-1">
          <h1
            className={`cursor-pointer ease duration-100 ${
              activeTab == "description"
                ? "border-b-3 border-t_clr font-bold"
                : ""
            }`}
            onClick={() => {
              setActiveTab("description");
            }}>
            Description
          </h1>
          <h1
            className={`cursor-pointer ease duration-100 ${
              activeTab == "reviews" ? "border-b-3 border-t_clr font-bold" : ""
            }`}
            onClick={() => {
              setActiveTab("reviews");
            }}>
            Reviews
          </h1>
        </div>
        {/* Reviews Content */}
        <article
          className={`reviewsContent mt-2 w-full transition-all duration-500 ease opacity-0 -translate-y-4 ${
            activeTab == "reviews" ? "opacity-100 translate-y-0" : ""
          }`}>
          {activeTab == "reviews"
            ? reviews.map((review) => (
                <div className="w-2/4 mt-6 pb-5 border-b">
                  <div className="flex items-center gap-5 justify-between w-full">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.user.avatar}
                        alt="User Photo"
                        className="rounded-full size-12 object-cover"
                      />
                      <h1 className="text-xl flex items-center gap-2">
                        {review.user.name} |{" "}
                        <StarRating rating={review.rating} size="text-sm" />
                      </h1>
                    </div>
                    <h2 className="text-gray-500">{review.date}</h2>
                  </div>
                  <div>
                    <p className="text-sm mt-2 ml-15">{review.comment}</p>
                  </div>
                </div>
              ))
            : ""}
        </article>
        {/* Description Content */}
        <p
          className={`mt-2 text-lg transition-all duration-1000 ease opacity-0 -translate-y-4 ${
            activeTab == "description" ? "opacity-100 translate-y-0" : ""
          }`}>
          {activeTab == "description" ? description : ""}
        </p>
        {/* Related Products */}
        <section className="mt-20">
          {/* Slider Button and Text */}
          <div className="flex justify-between border-b-2 border-gray-300 my-1 pb-1">
            <h1 className="text-2xl font-semibold self-end ">
              Related Products
            </h1>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() =>
                  sliderRef.current ? sliderRef.current.slickPrev() : ""
                }
                className="px-2 py-1 bg-bg_clr rounded cursor-pointer hover:rounded-lg hover:scale-120 ease-in-out duration-150 transition">
                <i className="ri-arrow-left-line"></i>
              </button>
              <button
                onClick={() =>
                  sliderRef.current ? sliderRef.current.slickNext() : ""
                }
                className="px-2 py-1 bg-bg_clr rounded cursor-pointer hover:rounded-lg hover:scale-120 ease-in-out duration-150 transition">
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
          {/* Slider Related Products */}
          <Slider ref={sliderRef} className="w-full" {...settings}>
            {relatedProducts.map((product) => (
              <div
                key={product.src}
                className="px-3 mt-3 flex flex-col w-full content-end">
                {/* Product Image */}
                <img
                  src={product.photos[0].src}
                  alt="Product Photo"
                  className="rounded-lg w-full h-[500px] object-cover cursor-pointer hover:scale-105 hover:-translate-y-0.5 ease-in-out transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/40"
                  onClick={() => {
                    window.scrollTo(0, 100);
                    navigate("/product/" + product._id);
                  }}
                />

                {/* Product Info */}
                <div className="flex flex-col content-center mt-2">
                  <div className="flex justify-between items-baseline">
                    <h1 className="text-lg w-1/2">{product.name}</h1>
                    <StarRating rating={product.rating} size="text-sm" />
                  </div>

                  <div className="mt-1 text-lg flex justify-between items-baseline">
                    <p className="font-semibold">${product.price}.00</p>
                    <button className="py-1.5 px-3 text-2xl bg-black rounded-lg text-white cursor-pointer hover:animate-bounce">
                      <i className="ri-shopping-cart-2-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      </main>
    </div>
  );
}
