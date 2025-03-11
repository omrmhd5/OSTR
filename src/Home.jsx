import React from "react";

export default function Home() {
  return (
    <div className="bg-bg_clr text-t_clr">
      <nav className="w-full h-full flex justify-around my-10 z-5">
        <label className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          <a href="homepage.html">OSTR</a>
        </label>
        <ul className="flex gap-10 font-semibold">
          <li className="hover:text-sky-950 hover:underline underline-offset-4">
            <a href="home.html">Home</a>
          </li>
          <li className="hover:text-sky-950 hover:underline underline-offset-4">
            <a href="new.html">New</a>
          </li>
          <li className="hover:text-sky-950 hover:underline underline-offset-4">
            <a href="shop.html">Shop</a>
          </li>
          <li className="hover:text-sky-950 hover:underline underline-offset-4">
            <a href="login.html">Login - SignUp</a>
          </li>
        </ul>
        <div className="flex text-xl gap-20">
          <a href="cart.html">
            <i className="fa-solid fa-cart-shopping hover:text-sky-950 hover:underline underline-offset-4"></i>
          </a>
          <a href="wishlist.html">
            <i className="fa-solid fa-heart hover:text-sky-950 hover:underline underline-offset-4"></i>
          </a>
        </div>
      </nav>

      <section className="p-10 flex">
        <div className="justify-content text-3xl p-20 ml-40 flex-col mt-20">
          <h2 className="mt-20 mb-10 text-6xl text-sky-950">
            Get Up to <span>45%</span> <br />off new products
          </h2>
          <p className="text-left text-3xl">
            The biggest sale of the year is at{" "}
            <span className="text-sky-950">OSTR Clothes</span>
          </p>

          <div className="flex gap-10 text-right">
            <a
              href="shop.html"
              className="mt-20 bg-sky-950 rounded-xl p-4 text-m font-semibold inline-block transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-white"
            >
              Shop Now -
            </a>
          </div>
        </div>

        <div className="rounded-xl relative">
          <img className="relative rounded-xl" src="src\assets\img1.jpg" alt="Sale" />
        </div>
      </section>
    </div>
  );
}
