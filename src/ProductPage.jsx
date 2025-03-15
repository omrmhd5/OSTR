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

  return (
    <section className="h-dvh w-full bg-bg_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <section className="bg-cn_clr py-6 px-20 m-24 rounded-lg w-3/4 justify-self-center ">
        <div className="flex flex-row gap-10">
          <div className="max-w-1/2 max-h-[768px]">
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
            <h1 className="font-bold text-2xl mt-5">${price}.00</h1>
            <hr className="border border-gray-300 my-2" />
            <div className="flex gap-20 mt-4">
              <h1 className="font-medium">Available Sizes</h1>
              <h1 className="font-medium">Colors</h1>
            </div>
            <div className="flex gap-10">
              <div className="flex gap-2">
                {["s", "m", "l"].map((s) => (
                  <button
                    key={s}
                    className={`bg-bg_clr p-2 px-4 rounded-md cursor-pointer ${
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
                    className={`w-6 h-6 rounded-full cursor-pointer ${
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
              <div className="flex items-baseline font-medium">
                <button
                  className="cursor-pointer bg-bg_clr p-2 px-4 rounded-l-lg"
                  onClick={() => {
                    setCount(count - 1);
                  }}>
                  -
                </button>
                <p className="bg-bg_clr p-2 px-4">{count}</p>
                <button
                  className="cursor-pointer bg-bg_clr p-2 px-4 rounded-r-lg"
                  onClick={() => {
                    setCount(count + 1);
                  }}>
                  +
                </button>
              </div>
              <button className="font-medium flex gap-2 items-baseline border-2 rounded-lg border-gray-400 p-2 px-5  cursor-pointer">
                Add To Wishlist <i className="ri-heart-line"></i>
              </button>
            </div>
            <button className="py-1.5 px-32 bg-black rounded-lg text-white mt-4 cursor-pointer">
              Add To Cart
            </button>
          </div>
        </div>
        <div className="slideShow flex flex-wrap gap-3 mt-8 w-2/4">
          {photos.map((photo, index) => (
            <img
              key={photo.src}
              src={photo.src}
              alt=""
              className="min-w-[10%] max-h-[250px] rounded-lg object-cover cursor-pointer"
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <div className="flex justify-items-start gap-20 text-2xl font-semibold mt-15 border-b-2 border-gray-300 my-1">
          <h1
            className={`cursor-pointer ${
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
            className={`cursor-pointer ${
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
            ? reviews.map((reviewCount) => (
                <div className="w-2/4 mt-6 pb-5 border-b">
                  <div className="flex justify-between">
                    <h1 className="text-xl flex items-center gap-2">
                      {reviewCount.user.name} |
                      <StarRating rating={reviewCount.rating} size="text-sm" />
                    </h1>
                    <h2>{reviewCount.date}</h2>
                  </div>
                  <div>
                    <p className="text-sm mt-1">{reviewCount.comment}</p>
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
              <button className="px-2 py-1 bg-bg_clr rounded cursor-pointer">
                <i class="ri-arrow-left-line"></i>
              </button>
              <button className="px-2 py-1 bg-bg_clr rounded cursor-pointer">
                <i class="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
          <div className="size-100 flex gap-10 mt-3">
            {relatedProducts.map((product) => (
              <div>
                <img
                  src={product.src}
                  alt="Product Photo"
                  className="min-w-[250px] max-h-[320px] rounded-lg object-cover cursor-pointer"
                />
                <div className="flex justify-between items-baseline">
                  <h1 className="text-lg mt-2">Product Name</h1>
                  <StarRating rating={4} size="text-sm" />
                </div>

                <div className="mt-1 text-lg flex justify-between items-baseline">
                  <p className="font-semibold">170$</p>
                  <button className="py-1.5 px-3 text-lg bg-black rounded-lg text-white cursor-pointer">
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
