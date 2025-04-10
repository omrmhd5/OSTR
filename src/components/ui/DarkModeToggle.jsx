// components/DarkModeToggle.jsx
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <i
      onClick={() => setDarkMode(!darkMode)}
      className={`${
        darkMode ? "ri-moon-fill" : "ri-sun-fill"
      } transition-all duration-300 ease-in-out 
        hover:text-sky-950 hover:-translate-y-1 hover:scale-110 cursor-pointer text-2xl`}></i>
  );
}
