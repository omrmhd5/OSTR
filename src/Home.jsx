import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 bg-t_clr text-white p-2 px-3 rounded-full  hover:bg-black hover:-translate-y-1 hover:scale-110 delay-150 duration-300 ease-in-out cursor-pointer "
      onClick={onClick}>
      <i className="fa-solid fa-arrow-left"></i>
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 bg-t_clr text-white p-2 px-3 rounded-full  hover:bg-black hover:-translate-y-1 hover:scale-110 delay-150 duration-300 ease-in-out cursor-pointer"
      onClick={onClick}>
      <i className="fa-solid fa-arrow-right"></i>
    </button>
  );
};

const reviews = [
  {
    name: "Sarah M.",
    review:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I’ve bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    review:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes.",
  },
  {
    name: "James L.",
    review:
      "As someone who's always on the lookout for unique fashion pieces, I’m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    name: "Bernice Levy",
    review:
      "I love the clothes from this website!! I am so glad I found them.....everything has been spot on, fits wonderfully, styles are trendy and lots to choose from!! Thanks for being here for us!!!",
  },
  {
    name: "Connie",
    review:
      "I absolutely adore the trendy styles this store offers. The clothes fit so well and they look amazing on a curvy figure. I really appreciate this option and the quality of the goods is so great that I will order product in the future!",
  },
];
export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const showMessage = (text) => {
    //+
    setMessage(text); //+
    setTimeout(() => setMessage(""), 5000); // Hide after 2 seconds//+
  }; //

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = () => {
    if (validateEmail(email)) {
      showMessage("You're Subscribed successfully!");
    } else {
      showMessage("Wrong Email, Please Try Again!");
    }
  };

  return (
    <div className="bg-bg_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <section className=" flex ">
        <div className="w-full rounded-xl text-center">
          <img
            className="relative rounded-xl"
            src="src\assets\Brown and White Minimalist Fashion Presentation.jpg"
            alt="Sale"
          />
          <div className="absolute bottom-40 left-40 rounded-lg justify-content text-3xl p-10 ">
            <h2 className=" mb-10 text-6xl text-sky-950 ">
              Get Up to <span className="font-semibold">45%</span> <br />
              off new products
            </h2>
            <p className="text-left text-2xl ">
              The biggest sale of the year is at{" "}
              <span className="text-sky-950">OSTR Clothes</span>
            </p>

            <div className="flex gap-10 text-right">
              <a
                href="shop.html"
                className="mt-20 ml-90 bg-sky-950 rounded-xl p-4 text-m font-semibold inline-block transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-white">
                Shop Now
              </a>
            </div>
          </div>
          <div class="bg-gray-100 p-10">
            <div class="flex justify-center items-center space-x-10">
              <div class="text-center">
                <h2 class="text-4xl font-bold">200+</h2>
                <p class="text-gray-600">International Brands</p>
              </div>
              <div class="border-l-2 border-gray-300 h-16"></div>
              <div class="text-center">
                <h2 class="text-4xl font-bold">2,000+</h2>
                <p class="text-gray-600">High-Quality Products</p>
              </div>
              <div class="border-l-2 border-gray-300 h-16"></div>
              <div class="text-center">
                <h2 class="text-4xl font-bold">30,000+</h2>
                <p class="text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>

          <div class="bg-black py-6">
            <div class="flex justify-center space-x-25 text-white text-2xl font-semibold">
              <span>VERSACE</span>
              <span>H&M</span>
              <span>New Yorker</span>
              <span>ZARA</span>
              <span>Mango</span>
              <span>GUCCI</span>
              <span class="font-bold">PRADA</span>
              <span>Calvin Klein</span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full h-screen">
        <div className="relative w-1/2 bg-cover bg-center">
          <div className=" absolute inset-0 flex flex-col justify-center items-center text-white">
            <video width="800" height="400" autoPlay muted loop>
              <source src="src\assets\video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="relative w-1/2 h-0.5 bg-cover bg-center">
          <div className="absolute inset-0 flex flex-col justify-center items-center text-black">
            <p className="absolute text-sm tracking-widest mt-430">KOREATOWN</p>
            <h1 className="absolute text-5xl font-serif mt-410">Los Angeles</h1>
            <img
              className="relative rounded-xl mt-210"
              src="src\assets\img2.jpg"
              alt="Sale"
            />
          </div>
        </div>
      </section>

      <div className="bg-gray-100 p-10">
        <h2 className="text-4xl font-bold text-left mb-6 ml-5 mt-10 mb-20">
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="max-w-5xl mx-auto px-3">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="px-3 py-6 h-80">
                {" "}
                <div className="bg-white p-5 rounded-lg shadow-md">
                  <div className="flex gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                  <h3 className="font-bold mt-2 flex items-center gap-2">
                    {review.name}
                    <i className="fa-solid fa-circle-check text-green-500"></i>
                  </h3>
                  <p className="text-gray-600 mt-2">{review.review}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {message && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#976c60] text-white px-4 py-2 rounded shadow-md">
            {message}
          </div>
        )}
        <div className="bg-bg_clr text-t_clr p-7 py-25 mt-50 rounded-3xl flex items-center justify-around">
          <h3 className="text-4xl font-bold w-120 ">
            STAY UP TO DATE ABOUT OUR LATEST OFFERS
          </h3>
          <div className=" mt-4 flex w-full max-w-md border border-white rounded-full overflow-hidden  ">
            <span className="px-6 flex items-center bg-white">
              <i className="fa-solid fa-envelope text-2xl"></i>
            </span>
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-5 bg-white text-black outline-none -ml-5 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-white text-t_clr font-bold ml-1 hover:bg-t_clr hover:text-white w-50"
              onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
