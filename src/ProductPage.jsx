import { useEffect, useState } from "react";
import StarRating from "./Atomic Compnents/StarRating";
import Carousel from "./Atomic Compnents/Carousel";

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

  return (
    <section className=" h-dvh w-full bg-bg_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <section className="bg-cn_clr py-6 px-20 m-24 rounded-lg w-3/4 justify-self-center ">
        <div className="flex flex-row gap-10">
          <div className="max-w-1/2 max-h-[768px] shadow-2xl shadow-black/60">
            <Carousel
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
        <div className="slideShow flex flex-wrap gap-4 mt-8 w-full">
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
        <div className="reviewsContent mt-2 w-full">
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
        <p className="mt-2 text-lg">
          {activeTab == "description" ? description : ""}
        </p>
        <section className="mt-30">
          <div className="flex justify-between border-b-2 border-gray-300 my-1 pb-1">
            <h1 className="text-2xl font-semibold self-end ">
              Related Products
            </h1>
            <div className="text-xl flex gap-2">
              <button className="px-2 py-1 bg-bg_clr rounded cursor-pointer  hover:rounded-lg hover:scale-120 ease-in-out duration-150 transition">
                <i class="ri-arrow-left-line"></i>
              </button>
              <button className="px-2 py-1 bg-bg_clr rounded cursor-pointer hover:rounded-lg hover:scale-120 ease-in-out duration-150 transition">
                <i class="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
          <div className="size-100 flex gap-8 mt-3 w-full overflow-hidden h-full">
            {relatedProducts.map((product) => (
              <div key={product.src} className="max-w-1/4 min-w-1/4">
                <img
                  src={product.src}
                  alt="Product Photo"
                  className="rounded-lg object-cover cursor-pointer"
                />
                <div className="flex justify-between items-baseline">
                  <h1 className="text-lg mt-2 w-1/2">{product.name}</h1>
                  <StarRating rating={product.rating} size="text-sm" />
                </div>

                <div className="mt-1 text-lg flex justify-between items-baseline">
                  <p className="font-semibold">${product.price}.00</p>
                  <button className="py-1.5 px-3 text-lg bg-black rounded-lg text-white cursor-pointer hover:animate-bounce">
                    <i class="ri-shopping-cart-2-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}
