import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="w-full h-full flex justify-around p-6 z-5 bg-white text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header ">
      <Link to="/">
        <h3 className="text-4xl font-extrabold delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
          OSTR
        </h3>
      </Link>
      <ul className="flex gap-10 font-semibold items-baseline">
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
              <li>{item.name}</li>
            </NavLink>
          ))}

        <div className="me-50 py-1 px-4 text-m font-semibold flex bg-gray-200 rounded-2xl gap-5 items-baseline">
          <input type="text" id="filter" placeholder="Search for..." />
          <Link to="/search">
            <i className="cursor-pointer fa-solid fa-magnifying-glass  hover:text-sky-950 hover:-translate-y-1 hover:scale-110 duration-300 ease-in-out"></i>
          </Link>
        </div>
      </ul>

      <div className="flex text-xl gap-10">
        {[
          { icon: "fa-cart-shopping", path: "/cart" },
          { icon: "fa-heart", path: "/wishlist" },
          ...(isLoggedIn
            ? [{ icon: "fa-arrow-right-from-bracket", path: handleLogout }]
            : []),
        ].map((item) => (
          <div key={item.path}>
            {typeof item.path === "function" ? (
              <button
                onClick={item.path}
                className="cursor-pointer transition-all duration-300 ease-in-out 
                hover:text-sky-950 hover:-translate-y-1 hover:scale-110 text-t_clr"
              >
                <i className={`fa-solid ${item.icon}`} />
              </button>
            ) : (
              <NavLink
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
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
