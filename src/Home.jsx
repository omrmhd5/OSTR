import React from "react";

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
            <i className="fa-solid fa-cart-shopping hover:text-sky-950 hover:underline underline-offset-4"></i>
          </a>
          <a href="wishlist.html">
            <i className="fa-solid fa-heart hover:text-sky-950 hover:underline underline-offset-4"></i>
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
        </div>
      </section>
    </div>
  );
}
