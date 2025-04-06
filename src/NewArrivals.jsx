import Slider from "react-slick";
import Countdown from "./components/ui/Countdown";
import { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

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

  const settings = {
    // dots: true,
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
              className=" size-35 rounded-full object-cover hover:scale-110 transition-all duration-300 ease-in-out hover:shadow-lg cursor-pointer"
            />
            <p className="text-center text-lg mt-2">{product.name}</p>
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
      </main>
    </div>
  );
}
