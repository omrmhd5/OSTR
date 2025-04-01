import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className=" text-t_clr text-center bg-grey-900 p-10 bg-white font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 mb-15">
        <div>
          <Link to="/">
            <h3 className="text-4xl font-extrabold delay-150 duration-300 ease-in-out hover:scale-110 cursor-pointer text-left hover:translate-x-2">
              OSTR
            </h3>
          </Link>

          <p className="text-sm mt-5 text-left">
            We have clothes that suit your style and which you’re proud to wear.{" "}
            <br /> From women to men.
          </p>
          <div className="flex gap-4 mt-5 text-2xl">
            {["fa-facebook", "fa-instagram", "fa-tiktok", "fa-twitter"].map(
              (brand) => (
                <span className="bg-gray-100 p-2 px-3 cursor-pointer rounded-full hover:-translate-y-1 hover:scale-110 hover:text-sky-950 duration-300 ease-in-out">
                  <i class={`fa-brands ${brand} `} />
                </span>
              )
            )}
          </div>
        </div>

        {[
          { COMPANY: ["About", "Features", "Works", "Career"] },
          {
            HELP: [
              "Customer Support",
              "Delivery Details",
              "Terms & Conditions",
              "Privacy Policy",
            ],
          },
          {
            FAQ: ["Account", "Manage Deliveries", "Orders", "Payments"],
          },
          {
            RESOURCES: [
              "Free eBooks",
              "Development Tutorial",
              "How to - Blog",
              "Youtube Playlist",
            ],
          },
        ].map((section) => (
          <div>
            <h4 className="font-semibold mb-5">{Object.keys(section)[0]}</h4>
            <ul className="mt-2 space-y-2 text-sm">
              {Object.values(section)[0].map((content) => (
                <li className="hover:text-sky-950 hover:underline underline-offset-4 cursor-pointer">
                  {content}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr />
      <p className="text-sm text-left mt-5">
        Ostor © 2020-2025, All Rights Reserved
      </p>
      <div className="flex gap-4 text-3xl justify-end -mt-5">
        {["visa", "mastercard", "paypal", "apple-pay"].map((payment) => (
          <i class={`fa-brands fa-cc-${payment}`} />
        ))}
      </div>
    </footer>
  );
}
