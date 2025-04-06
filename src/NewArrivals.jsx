import Slider from "react-slick";
import Countdown from "./components/ui/Countdown";

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
      src: "src/assets/new/hoodies.jpg",
    },
    {
      src: "src/assets/new/sportswear.jpg",
    },
    {
      src: "src/assets/new/bags.jpg",
    },
    {
      src: "src/assets/new/sunglasses.jpg",
    },
    {
      src: "src/assets/new/shoes.jpg",
    },
    {
      src: "src/assets/new/kidswear.jpg",
    },
    {
      src: "src/assets/new/femalesets.jpg",
    },
    {
      src: "src/assets/new/kidswear.jpg",
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
    waitForAnimate: true,
    arrows: false,
  };

  return (
    // Main Div
    <div className="w-full bg-bg_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      {/* Main Section */}
      <main>
        {/* New Collection and SlideShow Section*/}

        {/* Auto Slider */}
        <section className="relative w-full">
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
                <img
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
      </main>
    </div>
  );
}
