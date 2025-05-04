import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import PopUpMessage from "./PopUpMessage";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("token");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
    handleMessage();
  };

  const handleMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <nav className="w-full h-full flex justify-around p-6 z-5 bg-white text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header ">
      <PopUpMessage text={"Logged Out"} show={showMessage} />

      <Link to="/">
        <h3 className="text-4xl font-extrabold delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          OSTR
        </h3>
      </Link>
      <ul className="flex gap-15 font-semibold items-baseline pt-2">
        {[
          { name: "Home", path: "" },
          { name: "Shop", path: "shop" },
          { name: "Style Yours", path: "style" },
          { name: "Login - SignUp", path: "login", LoggedIn: false },
          { name: "Profile", path: "profile", LoggedIn: true },
        ]
          .filter(
            (item) =>
              item.LoggedIn === undefined || item.LoggedIn === isLoggedIn
          )
          .map((item) => (
            <NavLink
              to={`/${item.path}`}
              key={item.path}
              className={({ isActive }) =>
                `transition-all ease-linear duration-100 
            hover:text-sky-950 hover:underline underline-offset-4
            ${isActive ? "text-sky-950 underline" : ""}`
              }
            >
              <li className="text-base">{item.name}</li>
            </NavLink>
          ))}
      </ul>

      <div className="flex text-xl items-center gap-10">
        {[
          { icon: "fa-cart-shopping", path: "/cart" },
          { icon: "fa-heart", path: "/wishlist" },
          ...(isLoggedIn
            ? [{ icon: "fa-arrow-right-from-bracket", path: handleLogout }]
            : []),
          { component: <DarkModeToggle /> },
        ].map((item, index) =>
          item.component ? (
            <div
              key={index}
              className="transition-all duration-300 ease-in-out 
        hover:text-sky-950 hover:-translate-y-1 hover:scale-110 cursor-pointer text-2xl"
            >
              {item.component}
            </div>
          ) : typeof item.path === "function" ? (
            <button
              key={index}
              onClick={item.path}
              className="cursor-pointer transition-all duration-300 ease-in-out 
        hover:text-sky-950 hover:-translate-y-1 hover:scale-110 text-t_clr"
            >
              <i className={`fa-solid ${item.icon}`} />
            </button>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-center transition-all duration-300 ease-in-out 
        hover:text-sky-950 hover:-translate-y-1 hover:scale-110 ${
          isActive ? "text-sky-950" : "text-t_clr"
        }`
              }
            >
              <i className={`fa-solid ${item.icon}`} />
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
}
