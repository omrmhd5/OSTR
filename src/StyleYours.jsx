import { SketchPicker, BlockPicker } from "react-color";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StyleYours() {
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  const [color, setColor] = useState("#FFFFFF");

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

  const [quantities, setQuantities] = useState(
    sizes.reduce((acc, size) => ({ ...acc, [size]: 0 }), {})
  );

  const handleQuantityChange = (size, change) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(0, prev[size] + change);
      return { ...prev, [size]: newQuantity };
    });
  };

  const totalItems = Object.values(quantities).reduce(
    (sum, qty) => sum + qty,
    0
  );
  const pricePerItem = 29.99;
  const discount = totalItems >= 4 ? 0.1 : 0;
  const totalPrice = totalItems * pricePerItem * (1 - discount);

  const [showPopup, setShowPopup] = useState(false);
  const handleAddToCart = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const sizeschart = [
    { size: "S", A: 26.5, B: 20.0, C: 23.98 },
    { size: "M", A: 27.48, B: 21.97, C: 24.29 },
    { size: "L", A: 28.46, B: 23.98, C: 24.37 },
    { size: "XL", A: 29.49, B: 25.98, C: 24.76 },
    { size: "2XL", A: 30.0, B: 27.95, C: 25.0 },
    { size: "3XL", A: 30.51, B: 30.0, C: 25.91 },
  ];

  // const SizeSelector = () => {
  //   const [quantities, setQuantities] = useState(Array(sizes.length).fill(0));

  //   const handleIncrement = (index) => {
  //     setQuantities((prev) => prev.map((q, i) => (i === index ? q + 1 : q)));
  //   };

  //   const handleDecrement = (index) => {
  //     setQuantities((prev) =>
  //       prev.map((q, i) => (i === index && q > 0 ? q - 1 : q))
  //     );
  //   };

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <div className="flex justify-center items-center mt-30 text-4xl font-bold ">
        <h2>Create Your Own </h2>
        <Select>
          <SelectTrigger className="w-[180px] ml-5">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hoodie">Hoodie</SelectItem>
            <SelectItem value="T-Shirt">T-Shrit</SelectItem>
            <SelectItem value="Pants">Pants</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center items-center mt-20 mb-20  ">
        <div className="p-4 w-full max-w-xs ml-10 mt-10 ">
          <h2 className="text-center text-xl font-bold mb-4">Select size</h2>
          <div className="divide-y divide-gray-300">
            {sizes.map((size) => (
              <div
                key={size}
                className="flex justify-between items-center border p-2 rounded-md "
              >
                <span
                  className={
                    size.includes("X") ? "text-gray-400" : "text-black"
                  }
                >
                  {size}
                </span>
                <div className=" gap-1 flex items-baseline ">
                  <button
                    className="cursor-pointer bg-bg_clr p-2 px-4 rounded-lg hover:animate-pulse "
                    onClick={() => handleQuantityChange(size, -1)}
                  >
                    -
                  </button>
                  <p className="p-1 px-2">{quantities[size]}</p>
                  <button
                    className=" cursor-pointer bg-bg_clr p-2 px-4 rounded-lg hover:animate-pulse "
                    onClick={() => handleQuantityChange(size, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <Button
              className="mt-4 w-20 bg-gray-600 text-white py-2 rounded-md cursor-pointer"
              onClick={toggleModal}
            >
              Size Chart
            </Button>
            {isOpen && (
              <div className="fixed inset-0 bg-opacity-0 flex justify-center items-center z-50 ">
                <div className="bg-cn_clr p-6 rounded-lg shadow-lg w-100">
                  <h2 className="text-xl font-semibold mb-4">Size Chart</h2>
                  <p className="text-gray-700 mb-5">
                    Here’s your size chart content...
                  </p>
                  <img
                    src="src\assets\sizechart.png"
                    alt="sizechart"
                    className="w-50 mb-10"
                  />
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md w-80">
                    <thead>
                      <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                        <th className="py-2 px-4 border">Size</th>
                        <th className="py-2 px-4 border">A (in)</th>
                        <th className="py-2 px-4 border">B (in)</th>
                        <th className="py-2 px-4 border">C (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeschart.map((item, index) => (
                        <tr
                          key={item.size}
                          className={
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          }
                        >
                          <td className="py-2 px-4 border text-center font-bold">
                            {item.size}
                          </td>
                          <td className="py-2 px-4 border text-center">
                            {item.A}
                          </td>
                          <td className="py-2 px-4 border text-center">
                            {item.B}
                          </td>
                          <td className="py-2 px-4 border text-center">
                            {item.C}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <Button
                    className="mt-4 w-20 bg-gray-600 text-white py-2 rounded-md cursor-pointer"
                    onClick={toggleModal}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}{" "}
            <div className="mt-4 border-t pt-4">
              <p className=" text-m text-gray-500">
                Product price: ${pricePerItem.toFixed(2)}
              </p>
              {discount > 0 && (
                <p className=" absolute text-sm  text-red-500">
                  4+ Articles – 10% off
                </p>
              )}
              <p className="mt-6 font-semibold mb-2">
                Total: ${totalPrice.toFixed(2)}
              </p>
            </div>
            <Button
              className="mt-4 w-full bg-green-500 text-white py-2 rounded-md cursor-pointer"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            {showPopup && (
              <div className=" fixed text-center inset-y-105 inset-x-150 bg-black text-white p-3 rounded-md shadow-lg">
                Your item has been added to your cart.
              </div>
            )}
          </div>
        </div>

        <svg
          className="ml-20"
          height="400px"
          width="400px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <g transform="translate(1 1)">
              <g>
                <path
                  style={{ fill: color }}
                  d="M141.933,92.867c-8.533,8.533-14.507,17.067-14.507,17.067 c-63.147,98.133-51.2,392.533-51.2,392.533h34.133l24.747-59.733C127.427,202.947,141.933,93.72,141.933,92.867"
                />
                4XL", "5XL"
                <path
                  style={{ fill: color }}
                  d="M368.067,92.867c8.533,8.533,14.507,17.067,14.507,17.067c63.147,98.133,51.2,392.533,51.2,392.533 H399.64l-24.747-59.733C382.573,202.947,368.067,93.72,368.067,92.867"
                />
                <path
                  style={{ fill: color }}
                  d="M374.893,434.2L374.893,434.2c7.68-238.933-6.827-340.48-6.827-341.333 c-9.387-9.387-20.48-18.773-28.16-17.067c0,0,9.387-68.267-85.333-68.267S169.24,75.8,169.24,75.8 c-7.68-1.707-17.92,7.68-27.307,17.067c0,0.853-15.36,101.547-6.827,341.333c16.213,21.333,41.813,34.133,68.267,34.133h103.253 C333.08,468.333,358.68,455.533,374.893,434.2"
                />
              </g>
              <g>
                <path
                  style={{ fill: color }}
                  d="M306.627,468.333H203.373c-18.773,0-36.693-5.973-51.2-17.067v42.667 c0,5.12,3.413,8.533,8.533,8.533H348.44c5.12,0,8.533-3.413,8.533-8.533V452.12C342.467,462.36,325.4,468.333,306.627,468.333"
                />
                <path
                  style={{ fill: color }}
                  d="M274.2,89.453l20.48-25.6c4.267-5.12,0.853-13.653-6.827-13.653h-66.56 c-6.827,0-11.093,8.533-6.827,13.653l20.48,25.6c1.707,1.707,4.267,3.413,6.827,3.413h25.6 C269.933,92.867,272.493,92.013,274.2,89.453"
                />
                <path
                  style={{ fill: color }}
                  d="M382.573,植物v1.707l17.067,40.96h34.133c0,0,0.853-16.213,0.853-42.667H382.573z"
                />
                <path
                  style={{ fill: color }}
                  d="M127.427,459.8v1.707l-17.067,40.96H76.227c0,0-0.853-16.213-0.853-42.667H127.427z"
                />
                <path
                  style={{ fill: color }}
                  d="M211.907,340.333c0,33.28-18.773,59.733-42.667,59.733V434.2h85.333v-93.867H211.907z"
                />
                <path
                  style={{ fill: color }}
                  d="M297.24,340.333c0,33.28,18.773,59.733,42.667,59.733V434.2h-85.333v-93.867H297.24z"
                />
              </g>
              <path
                style={{ fill: color }}
                d="M381.72,109.933c0,0-6.827-8.533-14.507-17.067c0,0,1.707,10.24,3.413,30.72 c53.76,109.227,42.667,378.88,42.667,378.88h19.627C432.92,502.467,444.867,208.067,381.72,109.933"
              />
              <path
                style={{ fill: color }}
                d="M127.427,109.933c0,0,6.827-8.533,14.507-17.067c0,0-1.707,10.24-3.413,30.72 c-53.76,109.227-42.667,378.88-42.667,378.88H76.227C76.227,502.467,64.28,208.067,127.427,109.933"
              />
              <path d="M110.36,511H76.227c-4.267,0-8.533-3.413-8.533-8.533C66.84,490.52,56.6,204.653,120.6,105.667 c0.853-0.853,7.68-9.387,16.213-17.92c1.707-3.413,5.973-4.267,9.387-2.56c3.413,1.707,5.12,5.12,4.267,9.387 c0,0.853-14.507,109.227-6.827,348.16c0,0.853,0,2.56-0.853,3.413L118.04,505.88C117.187,509.293,113.773,511,110.36,511z M84.76,493.933h20.48l21.333-52.907c-5.973-168.96,0-273.067,4.267-320C79.64,210.627,83.053,447,84.76,493.933z" />
              <path d="M433.773,511H399.64c-3.413,0-6.827-1.707-7.68-5.12l-24.747-59.733c-0.853-0.853-0.853-2.56-0.853-3.413 c7.68-239.787-6.827-347.307-6.827-348.16c-0.853-3.413,1.707-6.827,4.267-8.533c3.413-2.56,7.68-1.707,10.24,0.853 c8.533,8.533,15.36,17.067,15.36,17.92c64,99.84,53.76,385.707,52.907,397.653C442.307,507.587,438.04,511,433.773,511z M405.613,493.933h19.627c0.853-46.933,5.12-282.453-46.08-372.907c4.267,46.933,10.24,151.04,4.267,320L405.613,493.933z" />
              <path d="M306.627,476.867H203.373c-29.013,0-57.173-13.653-75.093-37.547c-0.853-1.707-1.707-3.413-1.707-5.12 c-7.68-241.493,6.827-341.333,6.827-342.187c0-1.707,0.853-3.413,2.56-4.267c7.68-8.533,16.213-16.213,24.747-19.627 c0-9.387,2.56-26.453,15.36-41.813C192.28,8.387,218.733-1,254.573-1s62.293,9.387,78.507,27.307 c12.8,15.36,15.36,32.427,15.36,41.813c6.827,2.56,15.36,8.533,25.6,18.773c0.853,0.853,1.707,2.56,2.56,4.267 c0,0.853,15.36,101.547,6.827,343.04c0,1.707-0.853,3.413-1.707,5.12C363.8,463.213,335.64,476.867,306.627,476.867z M143.64,430.787c14.507,17.92,36.693,29.013,59.733,29.013h103.253c23.04,0,45.227-11.093,59.733-29.013 c6.827-213.333-4.267-316.587-6.827-334.507c-12.8-11.947-17.92-11.947-17.92-11.947c-2.56,0.853-5.973,0-7.68-1.707 c-1.707-2.56-2.56-5.12-2.56-7.68c0,0,2.56-20.48-11.947-36.693c-11.947-14.507-34.133-22.187-64.853-22.187 s-52.907,7.68-64.853,21.333c-14.507,16.213-11.947,36.693-11.947,37.547c0,2.56-0.853,5.973-2.56,7.68 c-2.56,1.707-5.12,1.707-7.68,1.707c-0.853,0-5.12,0.853-17.067,12.8C147.907,114.2,136.813,216.6,143.64,430.787z" />
              <path d="M348.44,511H160.707c-9.387,0-17.067-7.68-17.067-17.067v-42.667c0-3.413,1.707-5.973,5.12-7.68 c2.56-1.707,5.973-0.853,8.533,0.853c13.653,10.24,29.867,15.36,46.08,15.36h103.253c16.213,0,31.573-5.12,45.227-15.36 c2.56-1.707,5.973-2.56,8.533-0.853s4.267,4.267,4.267,7.68v42.667C365.507,503.32,357.827,511,348.44,511z M160.707,466.627 v27.307H348.44v-27.307c-12.8,6.827-27.307,10.24-41.813,10.24H203.373C188.867,476.867,173.507,473.453,160.707,466.627z" />
              <path d="M211.907,118.467c-33.28,0-49.493-37.547-50.347-39.253c-1.707-4.267,0-9.387,4.267-11.093 c4.267-1.707,9.387,0,11.093,4.267l0,0c0,0,12.8,29.013,34.987,29.013c5.12,0,8.533,3.413,8.533,8.533 S217.027,118.467,211.907,118.467z" />
              <path d="M297.24,118.467c-5.12,0-8.533-3.413-8.533-8.533s3.413-8.533,8.533-8.533c22.187,0,34.987-29.013,34.987-29.013 c1.707-4.267,6.827-5.973,11.093-4.267s6.827,6.827,4.267,11.093C346.733,80.92,330.52,118.467,297.24,118.467z" />
              <path d="M267.373,101.4h-25.6c-5.12,0-10.24-2.56-13.653-6.827l-20.48-25.6c-4.267-5.12-5.12-11.947-1.707-17.92 c2.56-5.973,8.533-9.387,15.36-9.387h66.56c6.827,0,12.8,3.413,15.36,9.387s1.707,12.8-1.707,17.92l-20.48,25.6 C277.613,98.84,272.493,101.4,267.373,101.4z M221.293,58.733l20.48,25.6h25.6l20.48-25.6H221.293z" />
              <path d="M228.973,203.8c-5.12,0-8.533-3.413-8.533-8.533V127c0-5.12,3.413-8.533,8.533-8.533c5.12,0,8.533,3.413,8.533,8.533 v68.267C237.507,200.387,234.093,203.8,228.973,203.8z" />
              <path d="M280.173,203.8c-5.12,0-8.533-3.413-8.533-8.533V127c0-5.12,3.413-8.533,8.533-8.533s8.533,3.413,8.533,8.533v68.267 C288.707,200.387,285.293,203.8,280.173,203.8z" />
              <path d="M433.773,511H399.64c-3.413,0-6.827-1.707-7.68-5.12l-17.067-40.96c-0.853-1.707-0.853-2.56-0.853-3.413V459.8 c0-5.12,3.413-8.533,8.533-8.533h52.053c2.56,0,4.267,0.853,5.973,2.56c1.707,1.707,2.56,3.413,2.56,5.973 c0,26.453-0.853,42.667-0.853,42.667C442.307,507.587,438.04,511,433.773,511z M405.613,493.933h19.627 c0-5.973,0-14.507,0.853-25.6H394.52L405.613,493.933z" />
              <path d="M110.36,511H76.227c-4.267,0-8.533-3.413-8.533-8.533c0,0-0.853-17.067-0.853-42.667c0-2.56,0.853-4.267,2.56-5.973 c1.707-1.707,3.413-2.56,5.973-2.56h52.053c5.12,0,8.533,3.413,8.533,8.533v1.707c0,0.853,0,2.56-0.853,3.413l-17.067,40.96 C117.187,509.293,113.773,511,110.36,511z M84.76,493.933h20.48l10.24-25.6H83.907C83.907,479.427,83.907,487.96,84.76,493.933z" />
              <path d="M254.573,442.733H169.24c-5.12,0-8.533-3.413-8.533-8.533v-34.133c0-5.12,3.413-8.533,8.533-8.533 c18.773,0,34.133-23.04,34.133-51.2c0-5.12,3.413-8.533,8.533-8.533h42.667c5.12,0,8.533,3.413,8.533,8.533V434.2 C263.107,439.32,259.693,442.733,254.573,442.733z M177.773,425.667h68.267v-76.8h-25.6c-2.56,29.867-20.48,53.76-42.667,58.88 L177.773,425.667L177.773,425.667z" />
              <path d="M339.907,442.733h-85.333c-5.12,0-8.533-3.413-8.533-8.533v-93.867c0-5.12,3.413-8.533,8.533-8.533h42.667 c5.12,0,8.533,3.413,8.533,8.533c0,28.16,15.36,51.2,34.133,51.2c5.12,0,8.533,3.413,8.533,8.533V434.2 C348.44,439.32,345.027,442.733,339.907,442.733z M263.107,425.667h68.267v-17.92c-22.187-5.12-39.253-29.013-42.667-58.88h-25.6 V425.667z" />
            </g>
          </g>
        </svg>

        <div className=" justify-end pl-50 pt-20">
          <h6 className="font-bold text-xl">Pick The Color</h6>
          <div className="bg-rgba-{{r}}-{{g}}-{{b}}-{{a}} border-2 border-white pr-5"></div>
          <SketchPicker
            onChange={(color) => {
              setSketchPickerColor(color.rgb);
              setColor(color.hex);
            }}
            color={sketchPickerColor}
          />
        </div>
      </div>
    </div>
  );
}
