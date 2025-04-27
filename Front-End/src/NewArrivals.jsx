import Slider from "react-slick";
import Countdown from "./components/ui/Countdown";
import { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router";

export default function NewArrivals() {
  const newProducts = [
    {
      src: "src/assets/new/new1.jpg",
    },
    {
      src: "src/assets/new/new2.jpg",
    },
    {
      src: "src/assets/new/new3.jpg",
    },
    {
      src: "src/assets/new/new4.jpg",
    },
    {
      src: "src/assets/new/new5.jpg",
    },
  ];
  const newCollections = [
    {
      name: "Hoodies",
      src: "src/assets/new/hoodies.webp",
    },
    {
      name: "Male Formal",
      src: "src/assets/new/maleformal.webp",
    },
    {
      name: "Female Pyjamas",
      src: "src/assets/new/femalesets.webp",
    },
    {
      name: "Kids Wear",
      src: "src/assets/new/kidswear.webp",
    },
    {
      name: "Sports Wear",
      src: "src/assets/new/sportswear.webp",
    },
    {
      name: "Bags",
      src: "src/assets/new/bags.webp",
    },
    {
      name: "Sunglasses",
      src: "src/assets/new/sunglasses.webp",
    },
    {
      name: "Shoes",
      src: "src/assets/new/shoes.webp",
    },
  ];
  const bestSellers = [
    {
      src: "src/assets/new/best4.webp",
    },
    {
      src: "src/assets/new/best2.webp",
    },

    {
      src: "src/assets/new/best1.webp",
    },
    {
      src: "src/assets/new/best3.webp",
    },
  ];
  const settings = {
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "ease",
    draggable: false,
    pauseOnHover: false,
    waitForAnimate: false,
    arrows: false,
  };

  const MemoizedSliderAndCountdownSection = memo(() => (
    <section className="relative w-full bg-white">
      {/* Auto Slider */}
      <Slider {...settings}>
        {newProducts.map((product, index) => (
          <div
            key={index}
            className="relative flex items-center justify-center w-full overflow-hidden">
            {/* Blurred Background */}
            <div
              className="absolute inset-0 bg-center bg-cover filter blur-xs scale-110"
              style={{ backgroundImage: `url(${product.src})` }}></div>
            {/* Foreground Image */}
            <LazyLoadImage
              src={product.src}
              className="relative z-10 w-full p-72 mb-50"
              alt="New Product"
            />
          </div>
        ))}
      </Slider>

      {/* Word And Counter Div */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-cn_clr/55 w-full">
        {/* New Collection Text */}
        <div className="text-7xl text-center mt-3">
          <h1>
            New <br />
            Collection
          </h1>
          <p className="text-2xl mt-3 italic">Dropping In:</p>
        </div>
        {/* Counter */}
        <Countdown />
      </div>
    </section>
  ));
  const MemoizedCollectionsGrid = memo(() => (
    <section className="flex py-30 px-10 w-full justify-between items-center gap-20 bg-white">
      <h1 className="text-5xl">Check What's New!</h1>

      {/* Rounded Photos */}
      <div className="flex gap-7 w-full">
        {newCollections.map((product, index) => (
          <div className="flex flex-col" key={index}>
            <LazyLoadImage
              src={product.src}
              alt="New Collections"
              className="size-35 h-23 2xl:size-35 rounded-full object-cover hover:scale-110 transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer"
            />
            <p className="text-center text-md 2xl:text-lg mt-2">
              {product.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  ));

  return (
    // Main Div
    <div className="w-full bg-bg_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header transform-gpu ">
      {/* Main Section */}
      <main>
        {/* New Collection and SlideShow Section*/}
        <MemoizedSliderAndCountdownSection />

        {/* What's New and Grid Photos Section */}
        <MemoizedCollectionsGrid />

        {/* Explore And Shop Now Section*/}
        <section className="flex justify-between px-10 gap-10 bg-cn_clr dark:bg-bg_clr">
          {/* Images Part */}
          <div className="w-1/2 relative">
            {/* Explore Now Array of Objects */}
            {[
              {
                name: "Kids",
                src: "src/assets/new/explorek.webp",
                className:
                  "absolute w-2/5 2xl:w-1/3 top-1/6 2xl:top-1/6 left-1/2 -translate-x-1/2",
              },
              {
                name: "Women",
                src: "src/assets/new/explorew.webp",
                className:
                  "absolute w-1/3 2xl:w-1/4 left-3/5 top-1/3 2xl:top-1/3",
              },
              {
                name: "Men",
                src: "src/assets/new/explorem.webp",
                className:
                  "absolute w-1/3 2xl:w-1/4 right-3/5 top-1/3 2xl:top-1/3",
              },
            ].map((photo) => (
              <LazyLoadImage
                className={`${photo.className} hover:scale-105 hover:shadow-2xl shadow-xl duration-300`}
                src={photo.src}
                alt={photo.name}
              />
            ))}
          </div>

          {/* Explore Now Paragraphs and Button */}
          <div className="flex flex-col gap-2 w-1/2 py-40">
            <h1 className="text-5xl">Explore Now!</h1>
            <p className="text-xl">
              Unveil your unique style with our latest collections. From casual
              essentials to statement pieces — we’ve got you covered.{" "}
              <span className="font-semibold">
                Trendy. Timeless. Totally You.
              </span>
            </p>
            <Link to="/shop">
              <button className="cursor-pointer w-full border-2 border-black py-2 text-2xl mt-10 hover:scale-105 duration-300 text-black bg-white">
                <i class="ri-arrow-left-long-line"></i> Shop Now!
              </button>
            </Link>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="flex flex-col items-center py-40 gap-20 w-full bg-white">
          {/* Best Seller Text */}
          <h1 className="text-7xl font-medium">Best Sellers</h1>
          {/* Best Seller Products */}
          <div className="flex">
            {bestSellers.map((product) => (
              <LazyLoadImage
                src={product.src}
                className="w-1/4 hover:scale-105 duration-300 hover:rounded-lg hover:shadow-2xl"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
