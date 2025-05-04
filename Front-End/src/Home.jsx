import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";
import StarRating from "./components/ui/StarRating";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PopUpMessage from "./components/ui/PopUpMessage";

export default function Home() {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Form Submitted:", values);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setSubmitting(false);
      resetForm();
    }, 3000);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    complaint: Yup.string().required("Please enter your complaint"),
  });

  const [showMessage, setShowMessage] = useState(false);

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 bg-t_clr text-white p-2 px-3 rounded-full  hover:bg-black cursor-pointer "
        onClick={onClick}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 bg-t_clr text-white p-2 px-3 rounded-full  hover:bg-black cursor-pointer"
        onClick={onClick}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    );
  };

  const brands = [
    "VERSACE",
    "H&M",
    "New Yorker",
    "ZARA",
    "Mango",
    "GUCCI",
    "PRADA",
    "Calvin Klein",
  ];

  const reviews = [
    {
      name: "Sarah M.",
      review:
        "I'm blown away by the quality and style of the clothes I received from ostor. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations. I'm sure this will not be the last order!",
    },
    {
      name: "Alex K.",
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered ostor. The range of options they offer is truly remarkable, catering to a variety of tastes. Thanks ostor!",
    },
    {
      name: "James L.",
      review:
        "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon ostor. The selection of clothes is not only diverse but also on-point with the latest trends.",
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    draggable: false,
    pauseOnHover: false,
  };

  const settings2 = {
    centerMode: true,
    centerPadding: "60px",
    dots: false,
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

  return (
    <div className="bg-bg_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <section className=" flex ">
        <div className="w-full rounded-xl text-center relative">
          <img
            className="rounded-xl"
            src="src\assets\Brown and White Minimalist Fashion Presentation.jpg"
            alt="Sale"
          />
          <div className="absolute bottom-1/3 left-1/12 rounded-lg justify-content text-3xl p-10 ">
            <h2 className=" mb-10 text-6xl text-blue-950">
              Get Up to <span className="font-semibold">45%</span> <br />
              off new products
            </h2>
            <p className="text-left text-2xl ">
              The biggest sale of the year is at{" "}
              <span className="text-blue-950">OSTR Clothes</span>
            </p>

            <div className="flex gap-10 text-right">
              <Link to="/new">
                <button className="cursor-pointer bg-sky-900 dark:bg-gray-700 text-[#FBE4D6] px-10 mt-20 ml-60 bg- rounded-xl p-4 text-m font-semibold inline-block transition-all delay-100 duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-blue-950 ">
                  New Collections !
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-blue-950 p-10">
            <div className="flex justify-center items-center space-x-10">
              {[
                { value: "200+", label: "International Brands" },
                { value: "2,000+", label: "High-Quality Products" },
                { value: "30,000+", label: "Happy Customers" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center border-r-2 pr-6 border-gray-300"
                >
                  <h2 className="text-4xl font-bold">{item.value}</h2>
                  <p className="text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <Slider {...settings} className="bg-black text-white p-4">
            {brands.map((brand, index) => (
              <div key={index} className="mx-4 text-xl font-bold">
                {brand}
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="flex w-full justify-end py-20">
        <div className="flex flex-col gap-10 justify-center items-center w-1/2 ">
          <div className="flex flex-col gap-5 items-end">
            <h2 className="text-4xl italic">
              If You Can't Stop Thinking About It ...{" "}
            </h2>
            <Link to="/shop">
              <button className=" cursor-pointer bg-orange-900 text-[#FBE4D6] px-6 rounded-xl p-3 text-xl font-semibold inline-block transition-all delay-100 duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-orange-950 ">
                Shop Now
              </button>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center text-white">
            <video
              width="800"
              height="400"
              autoPlay
              muted
              loop
              className="pl-10"
            >
              <source src="src\assets\video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center gap-5">
          <img
            className=" rounded-xl w-1/2"
            src="src\assets\img2.jpg"
            alt="Sale"
          />
          <div className=" flex flex-col justify-center gap-2 items-center text-black">
            <h1 className=" text-5xl font-serif">Los Angeles</h1>
            <p className=" text-sm tracking-widest">KOREATOWN</p>
          </div>
        </div>
      </section>

      <div className="bg-gray-100 dark:text-blue-950 p-10">
        <h2 className="text-4xl font-bold text-left ml-5 mt-10 mb-20">
          OUR HAPPY CUSTOMERS ... OUR FOCUS
        </h2>
        <div className="max-w-5xl mx-auto px-3 ">
          <Slider {...settings2}>
            {reviews.map((review, index) => (
              <div key={index} className="px-3 py-6">
                {" "}
                <div className="bg-white p-5 rounded-lg shadow-md w-70 h-75 flex flex-col">
                  <StarRating rating={5} size="text-sm" />

                  <h3 className="font-bold mt-2 flex items-center gap-2 dark:text-black">
                    {review.name}
                    <i className="fa-solid fa-circle-check text-green-500"></i>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 ">
                    {review.review}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <PopUpMessage
          text={"You've Subscribed successfully!"}
          show={showMessage}
        />

        <div className="bg-cn_clr text-t_clr p-10 mt-12 rounded-3xl flex flex-col md:flex-row items-center justify-around gap-8">
          <h3 className="text-4xl font-bold animate-bounce text-center md:w-1/2">
            CONTACT US TO STAY UP TO DATE
          </h3>

          <Formik
            initialValues={{ name: "", email: "", complaint: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full md:w-1/2 space-y-4">
                <div className="flex flex-col gap-1">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    className="p-3 rounded-md text-black border-2"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    className="p-3 rounded-md text-black border-2"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Field
                    as="textarea"
                    name="complaint"
                    placeholder="Your complaint or message"
                    rows="4"
                    className="p-3 rounded-md text-black border-2"
                  />
                  <ErrorMessage
                    name="complaint"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full py-3 font-bold bg-bg_clr text-black hover:bg-t_clr hover:text-white transition rounded-full"
                >
                  {isSubmitting ? "Submitting..." : "Submit Now"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <PopUpMessage
        text={"Your complaint has been submitted successfully!"}
        show={showMessage}
      />
    </div>
  );
}
