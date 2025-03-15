import { useEffect, useState } from "react";

export default function Carousel({
  slides,
  autoSlide = true,
  autoSlideInterval = 3000,
  currentIndex,
}) {
  const [current, setCurrent] = useState(currentIndex || 0);

  useEffect(() => {
    setCurrent(currentIndex);
  }, [currentIndex]);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const next = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="px-2 py-1 bg-gray-200 rounded-xl cursor-pointer opacity-80 hover:opacity-100 hover:scale-120 ease-in-out duration-150 transition">
          <i className="ri-arrow-left-line"></i>
        </button>
        <button
          onClick={next}
          className="px-2 py-1 bg-gray-200 rounded-xl cursor-pointer opacity-80 hover:opacity-100 hover:scale-120 ease-in-out duration-150 transition">
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
      <div className="absolute bottom-5 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all w-6 h-1 bg-gray-400 hover:scale-140 ease-in-out duration-150 ${
                current === i ? "bg-white" : "opacity-75"
              } cursor-pointer`}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
