export default function ProductPage() {
  return (
    <div className="bg-bg_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <div className="bg-cn_clr p-6 m-24 rounded-lg">
        <div className="flex flex-row gap-10">
          <img
            className="w-1/3 rounded-lg"
            src="src/assets/profile.jpg"
            alt="Product Photo"
          />
          <div className="content">
            <h1 className="font-semibold text-3xl">Product</h1>
            <p className="text-lg my-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Laboriosam minus nisi, suscipit veniam maiores quaerat vero atque
              autem dicta praesentium et! Eveniet velit ducimus earum asperiores
              corporis! Pariatur, libero nam!
            </p>
            <div className="flex items-baseline gap-3">
              <div className="flex space-x-1 text-yellow-500 mt-5">
                <i className="ri-star-fill text-xl"></i>
                <i className="ri-star-fill text-xl"></i>
                <i className="ri-star-fill text-xl"></i>
                <i className="ri-star-line text-xl text-gray-400"></i>
                <i className="ri-star-line text-xl text-gray-400"></i>
              </div>
              <p className="font-medium text-l">4.2 (210 Reviews)</p>
            </div>
            <h1 className="font-bold text-2xl mt-5">$110.00</h1>
            <hr className="border border-gray-300 my-2" />
            <div className="flex gap-20 mt-4">
              <h1 className="font-medium">Available Size</h1>
              <h1 className="font-medium">Colors</h1>
            </div>
            <div className="flex gap-10">
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="size"
                  id="size-s"
                  className="hidden peer/s"
                />
                <label
                  htmlFor="size-s"
                  className="bg-bg_clr p-2 px-4 rounded-md cursor-pointer peer-checked/s:bg-black peer-checked/s:text-white">
                  S
                </label>

                <input
                  type="radio"
                  name="size"
                  id="size-m"
                  className="hidden peer/m"
                />
                <label
                  htmlFor="size-m"
                  className="bg-bg_clr p-2 px-4 rounded-md cursor-pointer peer-checked/m:bg-black peer-checked/m:text-white">
                  M
                </label>

                <input
                  type="radio"
                  name="size"
                  id="size-l"
                  className="hidden peer/l"
                />
                <label
                  htmlFor="size-l"
                  className="bg-bg_clr p-2 px-4 rounded-md cursor-pointer peer-checked/l:bg-black peer-checked/l:text-white">
                  L
                </label>
              </div>
              <div className="flex gap-3 mt-2">
                <input
                  type="radio"
                  name="color"
                  id="color-grey"
                  className="hidden peer/grey"
                />
                <label
                  htmlFor="color-grey"
                  className="w-4 h-4 rounded-full cursor-pointer bg-gray-500 ring-2 ring-gray-500 peer-checked/grey:ring-grey peer-checked/grey:ring-offset-2"></label>

                <input
                  type="radio"
                  name="color"
                  id="color-brown"
                  className="hidden peer/brown"
                />
                <label
                  htmlFor="color-brown"
                  className="w-4 h-4 rounded-full cursor-pointer bg-[#8b5a2b] ring-2 ring-[#8b5a2b] peer-checked/brown:ring-brown peer-checked/brown:ring-offset-2"></label>
              </div>
            </div>
            <hr className="border border-gray-300 my-3" />

            <div className="flex gap-10">
              <div className="flex items-baseline font-medium">
                <button className="bg-bg_clr p-2 px-4 rounded-l-lg">-</button>
                <p className="bg-bg_clr p-2 px-4">1</p>
                <button className="bg-bg_clr p-2 px-4 rounded-r-lg">+</button>
              </div>
              <button className="font-medium flex gap-2 items-baseline border-2 rounded-lg border-gray-400 p-2 px-5">
                Add To Wishlist <i className="ri-heart-line"></i>
              </button>
            </div>
            <button className="py-1.5 px-32 bg-black rounded-lg text-white mt-4">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
