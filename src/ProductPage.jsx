import { useState } from "react";

export default function ProductPage() {
  const [count, setCount] = useState(1);
  const [size, setSize] = useState("s");
  const [src, setPhoto] = useState("src/assets/img1.jpg");
  const [activeTab, setActiveTab] = useState("description");

  const photos = [
    { src: "src/assets/profile.jpg" },
    {
      src: "src/assets/img1.jpg",
    },
  ];

  const reviews = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "https://example.com/avatar1.jpg",
      },
      rating: 5,
      comment: "Amazing product! Highly recommended.",
      date: "2025-03-11T12:00:00Z",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatar: "https://example.com/avatar2.jpg",
      },
      rating: 4,
      comment: "Good quality, but shipping was slow.",
      date: "2025-03-10T14:30:00Z",
    },
    {
      id: 3,
      user: {
        name: "Ali Ahmed",
        avatar: "https://example.com/avatar3.jpg",
      },
      rating: 3,
      comment: "Decent, but not as expected.",
      date: "2025-03-09T16:45:00Z",
    },
    {
      id: 4,
      user: {
        name: "Sara Lee",
        avatar: "https://example.com/avatar4.jpg",
      },
      rating: 5,
      comment: "Loved it! Would buy again.",
      date: "2025-03-08T10:15:00Z",
    },
  ];

  return (
    <section className="h-dvh w-full bg-bg_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <section className="bg-cn_clr p-6 m-24 rounded-lg w-3/4 justify-self-center ">
        <div className="flex flex-row gap-10">
          <img
            className="min-w-1/4 max-h-[500px] rounded-lg object-cover"
            src={src}
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
              <h1 className="font-medium">Available Sizes</h1>
              <h1 className="font-medium">Colors</h1>
            </div>
            <div className="flex gap-10">
              <div className="flex gap-2">
                {["s", "m", "l"].map((s) => (
                  <button
                    key={s}
                    className={`bg-bg_clr p-2 px-4 rounded-md cursor-pointer ${
                      size === s ? "bg-black text-white" : ""
                    }`}
                    onClick={() => {
                      setSize(s);
                    }}>
                    {s.toUpperCase(s)}
                  </button>
                ))}
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
                <button
                  className="cursor-pointer bg-bg_clr p-2 px-4 rounded-l-lg"
                  onClick={() => {
                    setCount(count - 1);
                  }}>
                  -
                </button>
                <p className="bg-bg_clr p-2 px-4">{count}</p>
                <button
                  className="cursor-pointer bg-bg_clr p-2 px-4 rounded-r-lg"
                  onClick={() => {
                    setCount(count + 1);
                  }}>
                  +
                </button>
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
        <div className="slideShow flex flex-wrap gap-3 mt-8 w-2/4">
          {photos.map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt=""
              className="min-w-[10%] max-h-[250px] rounded-lg object-cover cursor-pointer"
              onClick={() => {
                setPhoto(photo.src);
              }}
            />
          ))}
        </div>

        <div className="flex justify-items-start gap-20 text-2xl font-semibold mt-15 relative border-b-2 border-gray-300 my-1">
          <h1
            className={`cursor-pointer ${
              activeTab == "description"
                ? "border-b-3 border-t_clr font-bold"
                : ""
            }`}
            onClick={() => {
              setActiveTab("description");
            }}>
            Description
          </h1>
          <h1
            className={`cursor-pointer ${
              activeTab == "reviews" ? "border-b-3 border-t_clr font-bold" : ""
            }`}
            onClick={() => {
              setActiveTab("reviews");
            }}>
            Reviews
          </h1>
        </div>

        <div className="reviewsContent mt-2 w-full ml-6 flex gap-10">
          <div className="w-3/4">
            <h1 className="text-xl">UserName | 5</h1>
            <p className="text-sm mt-1 pb-5 border-b">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
              temporibus at aperiam veritatis quae error! Placeat quas quos
              dolore tempore! Accusantium, quaerat. Quam hic itaque quae. A,
              voluptatem facere. Eligendi.
            </p>
          </div>
          <h2>Time</h2>
        </div>
        <p className="mt-2">
          {/* {activeTab == "description"
            ? `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit fugit
          provident voluptatem fugiat consectetur quas quos cupiditate,
          dignissimos suscipit. Reprehenderit quas corrupti ut aut debitis
          officiis unde laborum! Ea, illo!`
            : ""} */}
        </p>
      </section>
    </section>
  );
}
