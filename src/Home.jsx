import React from "react";

const reviews = [
  {
    name: "Sarah M.",
    review:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I’ve bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    review:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    name: "James L.",
    review:
      "As someone who's always on the lookout for unique fashion pieces, I’m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
];
export default function Home() {
  return (
    <div className="bg-bg_clr text-t_clr ">
      <nav className="w-full h-full flex justify-around p-6 z-5 bg-white ">
        <label className="text-4xl font-bold delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <a href="homepage.html">OSTR</a>
        </label>
        <ul className="flex gap-10 font-semibold items-baseline">
          <li className="hover:text-sky-950 hover:underline underline-offset-4">
            <a href="home.html">Home</a>
          </li>
          <li className="hover:text-sky-950 hover:underline underline-offset-4">
            <a href="new.html">New</a>
          </li>
          <li className="hover:text-sky-950 hover:underline underline-offset-4">
            <a href="shop.html">Shop &#x25BE;</a>
          </li>
          <li className="hover:text-sky-950 hover:underline underline-offset-4">
            <a href="login.html">Login - SignUp</a>
          </li>
          <div className="me-50 py-1 px-4 text-m font-semibold flex bg-gray-200 rounded-2xl gap-5 items-baseline">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="filter" placeholder="Search for..." />
          </div>
        </ul>

        <div className="flex text-xl gap-10">
          <a href="cart.html">
            <i className="fa-solid fa-cart-shopping hover:text-sky-950 hover:-translate-y-1 hover:scale-110 delay-150 duration-300 ease-in-out"></i>
          </a>
          <a href="wishlist.html">
            <i className="fa-solid fa-heart hover:text-sky-950 hover:-translate-y-1 hover:scale-110 delay-150 duration-300 ease-in-out"></i>
          </a>
        </div>
      </nav>

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
                className="mt-20 ml-90 bg-sky-950 rounded-xl p-4 text-m font-semibold inline-block transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-white"
              >
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
              <span>VERSACE</span>
              <span>ZARA</span>
              <span>VERSACE</span>
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
        <h2 className="text-4xl font-bold text-left mb-6 ml-5 mt-10">
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="flex gap-4 overflow-x-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md min-w-[300px]"
            >
              <div className="flex gap-1  text-yellow-400">
                {[...Array(5)].map(() => (
                  <i className="fa-solid fa-star"></i>
                ))}
              </div>
              <h3 className="font-bold mt-2">
                {review.name}
                <i class="fa-solid fa-circle-check"></i>
              </h3>

              <p className="text-gray-600 mt-2">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
