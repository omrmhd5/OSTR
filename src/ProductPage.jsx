import { useRef, useState } from "react";
import StarRating from "./components/ui/StarRating";
import Slideshow from "./components/ui/Slideshow";
import Slider from "react-slick";
import PopUpMessage from "./components/ui/PopUpMessage";

export default function ProductPage({
  name,
  photos,
  tagline,
  rating,
  reviewCount,
  price,
  colors,
  description,
  reviews,
  relatedProducts,
}) {
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [isMinusClicked, setIsMinusClicked] = useState(false);
  const [isPlusClicked, setIsPlusClicked] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const sliderRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);

  const settings = {
    dots: false,
    draggable: false,
    infinite: true,
    speed: 750,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <section className="min-h-screen w-full bg-bg_clr py-7 text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <button
        onClick={handleMessage}
        className="px-4 py-2 bg-blue-600 text-white rounded">
        Show Popup
      </button>

      <PopUpMessage text={"Test"} show={showMessage} />

      <section className="bg-cn_clr py-6 px-20 rounded-lg w-3/4 justify-self-center">
        <div className="flex flex-row gap-10">
          <div className="max-w-1/2 max-h-[768px] shadow-lg shadow-black/60 dark:text-white">
            <Slideshow
              slides={photos.map((photo) => (
                <img
                  key={photo.src}
                  src={photo.src}
                  className="w-full max-h-[768px] rounded-lg object-cover flex-shrink-0"
                  alt="Product Photo"
                />
              ))}
              currentIndex={currentIndex}
            />
          </div>

          <div className="content w-1/2">
            <h1 className="font-semibold text-3xl">{name}</h1>
            <p className="text-lg my-2">{tagline}</p>
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
            <div className="flex gap-20 mt-4">
              <h1 className="font-medium">Available Sizes</h1>
              <h1 className="font-medium">Colors</h1>
            </div>
            <div className="flex gap-10">
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
                    {s.toUpperCase(s)}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-200 ease-in-out ${
                      color.hex
                    } ${
                      selectedColor === color.name
                        ? `${color.ring} ring-2 ring-offset-2`
                        : ""
                    }`}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>
            <hr className="border border-gray-300 my-3" />

            <div className="flex gap-10">
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
              <button
                className={` justify-center font-medium flex gap-2 items-baseline border-2 rounded-lg border-gray-400 p-2 px-5 cursor-pointer transition-all duration-700 ease-out  ${
                  isWishlisted
                    ? "bg-t_clr text-cn_clr scale-105 w-3/5 ml-[-25px] "
                    : "scale-100"
                }`}
                onClick={() => {
                  setIsWishlisted((prev) => !prev);
                }}>
                {isWishlisted ? "Remove From Wishlist" : "Add To Wishlist"}
                <i
                  className={`transition-all duration-300 ease-in-out ${
                    isWishlisted
                      ? "ri-heart-fill text-red-500 scale-110"
                      : "ri-heart-line"
                  }`}></i>
              </button>
            </div>
            <button
              className={` py-1.5 px-32 bg-black rounded-lg text-white mt-4 cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 ${
                added ? "bg-green-600" : "hover:animate-bounce"
              }`}
              onClick={() => setAdded((added) => !added)}>
              {added ? (
                <>
                  Added <i className="ri-check-line text-white text-lg"></i>
                </>
              ) : (
                "Add To Cart"
              )}
            </button>
          </div>
        </div>
        <div className="slideShow flex gap-4 mt-8 w-full">
          {photos.map((photo, index) => (
            <img
              key={photo.src}
              src={photo.src}
              alt=""
              className="min-w-[10%] max-h-[250px] rounded-lg object-cover cursor-pointer hover:scale-105 ease-in-out transition-all duration-300 hover:shadow-2xl hover:shadow-gray-500/40"
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
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
        <div
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
        </div>
        <p
          className={`mt-2 text-lg transition-all duration-1000 ease opacity-0 -translate-y-4 ${
            activeTab == "description" ? "opacity-100 translate-y-0" : ""
          }`}>
          {activeTab == "description" ? description : ""}
        </p>
        <section className="mt-20">
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
          <Slider ref={sliderRef} className="w-full" {...settings}>
            {relatedProducts.map((product) => (
              <div key={product.src} className="px-3 mt-3">
                <div className="max-w-full">
                  <img
                    src={product.src}
                    alt="Product Photo"
                    className="rounded-lg object-cover cursor-pointer w-full hover:scale-105 hover:-translate-y-0.5 ease-in-out transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/40"
                  />
                  <div className="flex justify-between items-baseline">
                    <h1 className="text-lg mt-2 w-1/2">{product.name}</h1>
                    <StarRating rating={product.rating} size="text-sm" />
                  </div>
                  <div className="mt-1 text-lg flex justify-between items-baseline">
                    <p className="font-semibold">${product.price}.00</p>
                    <button className="py-1.5 px-3 text-lg bg-black rounded-lg text-white cursor-pointer hover:animate-bounce">
                      <i className="ri-shopping-cart-2-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      </section>
    </section>
  );
}
