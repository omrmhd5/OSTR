import Slider from "react-slick";

export default function NewArrivals() {
  const newProducts = [
    {
      src: "src/assets/new/new1.jpg",
    },
    {
      src: "src/assets/new/new2.jpg",
    },
    {
      src: "src/assets/product/blazer2.avif",
    },
  ];

  const settings = {
    dots: false,
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
    <div className="w-full bg-bg_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <div className="px-30 py-20 h-[560px] flex justify-between items-center">
        <h1 className="text-5xl text-right">
          New <br />
          Collection
        </h1>
        <div className="w-3/4 h-[510px]">
          <Slider className="h-[560px]" {...settings}>
            {newProducts.map((product, index) => (
              <div
                key={index}
                className="h-[500px] flex justify-center items-center">
                <img src={product.src} className="w-full object-cover" alt="" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
