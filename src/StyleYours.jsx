import { SketchPicker } from "react-color";
import { useEffect, useRef, useState } from "react";
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

  const [color, setColor] = useState("#9B9B9B");
  const [textColor, setTextColor] = useState("#000000");

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
    setTimeout(() => setShowPopup(false), 3000);
  };

  const sizeschart = [
    { size: "S", A: 26.5, B: 20.0, C: 23.98 },
    { size: "M", A: 27.48, B: 21.97, C: 24.29 },
    { size: "L", A: 28.46, B: 23.98, C: 24.37 },
    { size: "XL", A: 29.49, B: 25.98, C: 24.76 },
    { size: "2XL", A: 30.0, B: 27.95, C: 25.0 },
    { size: "3XL", A: 30.51, B: 30.0, C: 25.91 },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [item, setItem] = useState("Hoodie");
  const items = [
    {
      name: "Hoodie",
      svg: (
        <svg
          height="400px"
          width="400px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          fill="#000000">
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
      ),
    },
    {
      name: "Jeans",
      svg: (
        <svg
          height="400px"
          width="400px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          fill="#000000">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g transform="translate(1 1)">
              <g>
                <path
                  style={{ fill: color }}
                  d="M255,41.667V178.2c9.387,0,17.067,7.68,17.92,17.067l7.68,290.987 c0,9.387,7.68,16.213,17.067,16.213h42.667c9.387,0,17.067-7.68,17.067-17.067V41.667H255z"
                />
                <path
                  style={{ fill: color }}
                  d="M255,178.2V41.667H152.6V485.4c0,9.387,7.68,17.067,17.067,17.067h43.52 c9.387,0,17.067-7.68,17.067-16.213l6.827-290.987C237.933,185.88,245.613,178.2,255,178.2"
                />
              </g>
              <polygon
                style={{ fill: color }}
                points="152.6,41.667 357.4,41.667 357.4,7.533 152.6,7.533"
              />
              <g>
                <path
                  style={{ fill: color }}
                  d="M340.333,41.667V485.4c0,9.387-7.68,17.067-17.067,17.067h17.067 c9.387,0,17.067-7.68,17.067-17.067V41.667H340.333z"
                />
                <polygon
                  style={{ fill: color }}
                  points="340.333,41.667 357.4,41.667 357.4,7.533 340.333,7.533"
                />
              </g>
              <g>
                <path
                  style={{ fill: color }}
                  d="M169.667,41.667V485.4c0,9.387,7.68,17.067,17.067,17.067h-17.067 c-9.387,0-17.067-7.68-17.067-17.067V41.667H169.667z"
                />
                <polygon
                  style={{ fill: color }}
                  points="152.6,41.667 169.667,41.667 169.667,7.533 152.6,7.533"
                />
              </g>
              <g>
                <path
                  style={{ fill: color }}
                  d="M357.4,101.4L357.4,101.4c-28.16,0-51.2-23.04-51.2-51.2v-8.533h51.2V101.4z"
                />
                <path
                  style={{ fill: color }}
                  d="M152.6,101.4L152.6,101.4c28.16,0,51.2-23.04,51.2-51.2v-8.533h-51.2V101.4z"
                />
                <polygon
                  style={{ fill: color }}
                  points="152.6,297.667 186.733,297.667 186.733,212.333 152.6,212.333"
                />
                <polygon
                  style={{ fill: color }}
                  points="152.6,246.467 186.733,246.467 186.733,212.333 152.6,212.333"
                />
                <polygon
                  style={{ fill: color }}
                  points="323.267,297.667 357.4,297.667 357.4,212.333 323.267,212.333"
                />
                <polygon
                  style={{ fill: color }}
                  points="323.267,246.467 357.4,246.467 357.4,212.333 323.267,212.333"
                />
              </g>
              <path d="M357.4,50.2H152.6c-5.12,0-8.533-3.413-8.533-8.533V7.533c0-5.12,3.413-8.533,8.533-8.533h204.8 c5.12,0,8.533,3.413,8.533,8.533v34.133C365.933,46.787,362.52,50.2,357.4,50.2z M161.133,33.133h187.733V16.067H161.133V33.133z" />
              <path d="M340.333,511h-43.52c-13.653,0-25.6-11.093-25.6-24.747l-6.827-290.987c0-5.12-4.267-8.533-9.387-8.533 s-8.533-3.413-8.533-8.533V41.667c0-5.12,3.413-8.533,8.533-8.533h102.4c5.12,0,8.533,3.413,8.533,8.533V485.4 C365.933,499.907,354.84,511,340.333,511z M263.533,171.373c10.24,3.413,17.067,12.8,17.92,23.893L288.28,485.4 c0,4.267,4.267,8.533,8.533,8.533h43.52c5.12,0,8.533-3.413,8.533-8.533V50.2h-85.333L263.533,171.373L263.533,171.373z" />
              <path d="M213.187,511h-43.52c-14.507,0-25.6-11.093-25.6-25.6V41.667c0-5.12,3.413-8.533,8.533-8.533H255 c5.12,0,8.533,3.413,8.533,8.533V178.2c0,5.12-3.413,8.533-8.533,8.533s-8.533,4.267-9.387,8.533l-7.68,290.987 C237.933,499.907,226.84,511,213.187,511z M161.133,50.2v435.2c0,5.12,3.413,8.533,8.533,8.533h43.52 c4.267,0,8.533-3.413,8.533-8.533l6.827-290.133c0-11.093,7.68-20.48,17.92-23.893V50.2H161.133z" />
              <path d="M357.4,109.933c-33.28,0-59.733-26.453-59.733-59.733v-8.533c0-5.12,3.413-8.533,8.533-8.533h51.2 c5.12,0,8.533,3.413,8.533,8.533V101.4C365.933,106.52,362.52,109.933,357.4,109.933z M314.733,50.2 c0,20.48,14.507,37.547,34.133,41.813V50.2H314.733z" />
              <path d="M152.6,109.933c-5.12,0-8.533-3.413-8.533-8.533V41.667c0-5.12,3.413-8.533,8.533-8.533h51.2 c5.12,0,8.533,3.413,8.533,8.533V50.2C212.333,83.48,185.88,109.933,152.6,109.933z M161.133,50.2v41.813 c19.627-4.267,34.133-21.333,34.133-41.813H161.133z" />
              <path d="M186.733,306.2H152.6c-5.12,0-8.533-3.413-8.533-8.533v-85.333c0-5.12,3.413-8.533,8.533-8.533h34.133 c5.12,0,8.533,3.413,8.533,8.533v85.333C195.267,302.787,191.853,306.2,186.733,306.2z M161.133,289.133H178.2v-68.267h-17.067 V289.133z" />
              <path d="M186.733,255H152.6c-5.12,0-8.533-3.413-8.533-8.533v-34.133c0-5.12,3.413-8.533,8.533-8.533h34.133 c5.12,0,8.533,3.413,8.533,8.533v34.133C195.267,251.587,191.853,255,186.733,255z M161.133,237.933H178.2v-17.067h-17.067V237.933 z" />
              <path d="M357.4,306.2h-34.133c-5.12,0-8.533-3.413-8.533-8.533v-85.333c0-5.12,3.413-8.533,8.533-8.533H357.4 c5.12,0,8.533,3.413,8.533,8.533v85.333C365.933,302.787,362.52,306.2,357.4,306.2z M331.8,289.133h17.067v-68.267H331.8V289.133z" />
              <path d="M357.4,255h-34.133c-5.12,0-8.533-3.413-8.533-8.533v-34.133c0-5.12,3.413-8.533,8.533-8.533H357.4 c5.12,0,8.533,3.413,8.533,8.533v34.133C365.933,251.587,362.52,255,357.4,255z M331.8,237.933h17.067v-17.067H331.8V237.933z" />
            </g>
          </g>
        </svg>
      ),
    },
    {
      name: "T-Shirt",
      svg: (
        <svg
          height="400px"
          width="400px"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          fill="#000000">
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <g transform="translate(1 1)">
              <path
                style={{ fill: color }}
                d="M206.36,19.48l-2.56,5.12L255,135.533L306.2,24.6l-2.56-5.12 c-3.413-7.68-11.093-11.947-18.773-11.947h-58.88C217.453,7.533,209.773,11.8,206.36,19.48"
              />
              <g>
                <path
                  style={{ fill: color }}
                  d="M383,502.467V161.133c0,0,2.56-60.587,25.6-68.267c0,0,3.413-18.773-76.8-42.667l-25.6-25.6l0,0 L255,135.533L203.8,24.6l-25.6,25.6c-80.213,23.893-76.8,42.667-76.8,42.667c23.893,7.68,25.6,68.267,25.6,68.267v341.333H383z"
                />
                <path
                  style={{ fill: color }}
                  d="M127,161.133c0,0-1.707-59.733-24.747-68.267H101.4L7.533,212.333L67.267,255L127,223.427V161.133z"
                />
                <path
                  style={{ fill: color }}
                  d="M383,161.133c0,0,1.707-59.733,24.747-68.267h0.853l93.867,119.467L442.733,255L383,223.427 V161.133z"
                />
                <polygon
                  style={{ fill: color }}
                  points="238.787,100.547 203.8,118.467 178.2,50.2 203.8,24.6"
                />
                <polygon
                  style={{ fill: color }}
                  points="271.213,100.547 306.2,118.467 331.8,50.2 306.2,24.6"
                />
              </g>
              <g>
                <path
                  style={{ fill: color }}
                  d="M144.067,229.4v273.067H127v-281.6h8.533C139.8,220.867,144.067,225.133,144.067,229.4"
                />
                <path
                  style={{ fill: color }}
                  d="M7.533,212.333L101.4,92.867h0.853c5.12,1.707,9.387,6.827,12.8,12.8L24.6,220.867L7.533,212.333z"
                />
              </g>
              <g>
                <path
                  style={{ fill: color }}
                  d="M365.933,229.4v273.067H383v-281.6h-8.533C370.2,220.867,365.933,225.133,365.933,229.4"
                />
                <path
                  style={{ fill: color }}
                  d="M502.467,212.333L408.6,92.867h-0.853c-5.12,1.707-9.387,6.827-12.8,12.8l90.453,115.2 L502.467,212.333z"
                />
              </g>
              <path d="M263.533,169.667c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533 S263.533,164.547,263.533,169.667" />
              <path d="M263.533,203.8c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533 S263.533,198.68,263.533,203.8" />
              <path d="M383,511H127c-5.12,0-8.533-3.413-8.533-8.533V161.133c-0.853-21.333-7.68-56.32-19.627-60.587 c-2.56-0.853-5.12-3.413-5.973-6.827c-1.707-9.387,5.973-29.013,81.067-52.053l23.893-23.893c1.707-0.853,5.12-1.707,7.68-1.707 c2.56,0.853,5.12,2.56,5.973,5.12L255,115.053l43.52-93.867l0,0c2.56-5.12,10.24-6.827,14.507-2.56L336.92,42.52 c74.24,23.04,82.773,41.813,81.067,52.053c-0.853,3.413-2.56,5.12-5.973,6.827c-11.947,4.267-18.773,38.4-19.627,60.587V503.32 C391.533,507.587,388.12,511,383,511z M135.533,493.933h238.933v-332.8c0-10.24,3.413-55.467,23.04-71.68 c-5.12-5.973-21.333-17.067-68.267-31.573c-1.707,0-2.56-0.853-3.413-2.56L308.76,38.253l-46.08,99.84 c-1.707,4.267-4.267,5.973-7.68,5.973s-5.973-1.707-7.68-5.12l-46.08-99.84l-17.067,17.067c-0.853,0.853-2.56,1.707-3.413,2.56 c-46.933,13.653-62.293,25.6-68.267,31.573c19.627,16.213,23.04,61.44,23.04,71.68L135.533,493.933z" />
              <path d="M67.267,263.533c-1.707,0-3.413-0.853-5.12-1.707L2.413,219.16C0.707,218.307-1,215.747-1,213.187s0-4.267,1.707-6.827 L94.573,86.893c2.56-2.56,6.827-3.413,10.24-1.707c26.453,10.24,29.867,64.853,30.72,75.947v63.147c0,3.413-1.707,5.973-4.267,7.68 l-59.733,31.573C69.827,263.533,68.973,263.533,67.267,263.533z M19.48,210.627l47.787,34.133l50.347-26.453v-57.173 c-0.853-18.773-5.973-46.933-15.36-57.173L19.48,210.627z" />
              <path d="M442.733,263.533c-1.707,0-2.56,0-4.267-0.853l-59.733-31.573c-2.56-1.707-4.267-4.267-4.267-7.68v-62.293 c0-11.093,3.413-65.707,30.72-75.947c3.413-1.707,7.68,0,10.24,2.56l93.867,119.467C511,208.92,511,211.48,511,214.04 s-1.707,4.267-3.413,5.973l-59.733,42.667C446.147,262.68,444.44,263.533,442.733,263.533z M391.533,218.307l50.347,26.453 l47.787-34.133L406.04,103.96c-9.387,10.24-14.507,38.4-15.36,57.173L391.533,218.307z" />
              <path d="M255,144.067c-3.413,0-5.973-1.707-7.68-5.12l-51.2-110.933c-0.853-2.56-0.853-5.12,0-7.68l2.56-5.12 C203.8,4.973,214.04-1,225.133-1h58.88c11.093,0,21.333,5.973,26.453,16.213l2.56,5.12c0.853,2.56,0.853,5.12,0,7.68l-51.2,110.933 C260.973,142.36,258.413,144.067,255,144.067z M213.187,24.6L255,115.053L296.813,24.6l-0.853-1.707 c-2.56-4.267-6.827-6.827-11.093-6.827h-58.88c-5.12,0-9.387,2.56-11.093,6.827L213.187,24.6z" />
              <path d="M203.8,127c-0.853,0-1.707,0-3.413-0.853c-2.56-0.853-4.267-2.56-5.12-5.12l-25.6-68.267c-0.853-3.413,0-6.827,1.707-9.387 l25.6-25.6c2.56-0.853,5.973-1.707,8.533-1.707c2.56,0.853,5.12,2.56,5.973,5.12l34.987,75.947c1.707,4.267,0,9.387-4.267,11.093 l-34.987,17.92C206.36,127,205.507,127,203.8,127z M188.44,52.76l20.48,54.613l19.627-9.387L202.093,39.96L188.44,52.76z" />
              <path d="M306.2,127c-1.707,0-2.56,0-3.413-0.853l-34.987-17.92c-4.267-1.707-5.973-6.827-4.267-11.093l34.987-75.947 c0.853-2.56,3.413-4.267,5.973-5.12c2.56-0.853,5.973,0,7.68,2.56l25.6,25.6c2.56,2.56,3.413,5.973,1.707,9.387l-25.6,68.267 c-0.853,2.56-2.56,4.267-5.12,5.12C308.76,127,307.053,127,306.2,127z M282.307,97.133l19.627,9.387l20.48-54.613l-12.8-12.8 L282.307,97.133z" />
            </g>
          </g>
        </svg>
      ),
    },
  ];

  const selectedItem = items.find((i) => i.name === item);

  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState("Arial");
  const fonts = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Verdana",
  ];

  const textRef = useRef(null);
  const [position, setPosition] = useState({ x: 700, y: 500 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    e.preventDefault();
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });

    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div className="py-10 bg-bg_clr w-full">
      <article className=" py-10 px-10 rounded-lg w-3/4 justify-self-center  bg-cn_clr text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
        {/* Style Your Own  */}
        <header className="flex justify-center items-center py-20 text-6xl font-bold  ">
          <h2>Style Your Own </h2>
          <Select onValueChange={(value) => setItem(value)}>
            <SelectTrigger className="w-[200px] ml-5 mt-3 text-4xl px-4 py-6 bg-white h-[200px] cursor-pointer hover:animate-pulse">
              <SelectValue placeholder="Hoodie" />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem
                  className="cursor-pointer"
                  key={item.name}
                  value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </header>
        <main className="w-full flex items-center justify-between ">
          {/* Choose Size Section */}
          <section className=" w-1/3">
            <div className="bg-white p-5 w-full mt-10 rounded-2xl dark:bg-bg_clr  ">
              <h2 className="text-center text-2xl font-bold">Choose Size</h2>
              <div className="flex flex-col divide-y divide-gray-300 ">
                {sizes.map((size) => (
                  <div
                    key={size}
                    className="flex justify-between items-center border p-2 px-5 rounded-md bg-white font-bold ">
                    <p className="text-black">{size}</p>
                    <div className="font-medium flex  ">
                      <button
                        className=" cursor-pointer bg-bg_clr p-2 px-4 rounded-l-lg hover:animate-pulse "
                        onClick={() => handleQuantityChange(size, -1)}>
                        -
                      </button>
                      <p className=" p-2 px-4 w-12 text-center">
                        {quantities[size]}
                      </p>
                      <button
                        className=" cursor-pointer bg-bg_clr p-2 px-4  rounded-r-lg hover:animate-pulse "
                        onClick={() => handleQuantityChange(size, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="self-end mt-2  bg-gray-700 dark:bg-black text-white py-2 px-5 rounded-md cursor-pointer hover:bg-black "
                  onClick={toggleModal}>
                  Size Chart
                </button>
                {/** Size Chart */}
                <div
                  className={`fixed inset-0 flex justify-center items-center z-50 transition-all duration-300 ease-in-out 
    ${
      isOpen
        ? "opacity-100 scale-100 bg-black/50 bg-opacity-50"
        : "opacity-0 scale-95 pointer-events-none bg-opacity-0"
    }`}>
                  <div className="bg-bg_clr p-6 rounded-lg shadow-lg w-100 transition-all duration-300 ease-in-out">
                    <h2 className="text-xl font-semibold mb-4">Size Chart</h2>
                    <p className="text-gray-700 mb-5 dark:text-black">
                      Here’s your size chart content...
                    </p>
                    <img
                      src="src/assets/sizechart.png"
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
                              index % 2 === 0
                                ? "bg-gray-100 dark:bg-gray-400 "
                                : "bg-white "
                            }>
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
                      className="mt-4 w-20 bg-gray-600 text-white py-2 rounded-md cursor-pointer dark:bg-black"
                      onClick={toggleModal}>
                      Close
                    </Button>
                  </div>
                </div>
                {/* Product price section */}
                <div className="mt-4 border-t pt-4">
                  <p className=" text-m text-gray-500">
                    Product Price: ${pricePerItem.toFixed(2)}
                  </p>
                  {discount > 0 && (
                    <p className=" absolute text-sm  text-red-500">
                      4+ Products – 10% off
                    </p>
                  )}
                  <p className="mt-6 font-semibold mb-2">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
            <Button
              disabled={totalItems < 1}
              className={`mt-4 w-full py-2 rounded-md font-bold 
    ${
      totalItems < 1
        ? "bg-gray-600 cursor-not-allowed dark:bg-gray-400"
        : "bg-gray-800 text-white cursor-pointer hover:animate-bounce dark:bg-black"
    }`}
              onClick={handleAddToCart}>
              Add To Cart <i className="fas fa-shopping-cart"></i>
            </Button>

            {showPopup && (
              <div className=" fixed text-center inset-y-105 inset-x-150 bg-green-500 text-white p-3 rounded-md shadow-lg font-bold text-xl">
                Your item has been added to your cart{" "}
                <i className="ri-check-line text-white text-lg"></i>
              </div>
            )}
          </section>
          {/* product svg section */}
          <figure className="w-1/3 ml-5 ">{selectedItem?.svg}</figure>

          {/*  Color Pickers and Text Size */}
          <section className=" w-1/3 flex flex-col items-center">
            {/* Color Picker */}
            <h6 className="font-bold text-2xl mb-3">Pick The Color</h6>
            <SketchPicker
              onChange={(color) => {
                setSketchPickerColor(color.rgb);
                setColor(color.hex);
              }}
              color={sketchPickerColor}
            />

            {/* Add Text Section */}
            <div className="p-10 max-w-xl ">
              <div className="border p-4 rounded-2xl shadow  bg-white dark:bg-bg_clr">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full p-2 border-b focus:outline-none text-center text-lg"
                  placeholder="Type something..."
                />

                {/* Text Color */}
                <div className="flex flex-wrap gap-4 justify-between items-center mt-4 mb-4">
                  <div>
                    <label className="block text-sm font-bold ">Color</label>
                    <input
                      className="cursor-pointer rounded-full"
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                    />
                  </div>
                  {/* Text Font */}
                  <div>
                    <label className="block text-sm font-bold ">Font</label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="border rounded p-1 cursor-pointer">
                      {fonts.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Text Size  */}
                  <div>
                    <label className="block text-sm font-bold">Size</label>

                    <div className="gap-1 flex items-baseline mt-2 ">
                      <button
                        className="cursor-pointer bg-bg_clr p-1 px-3 rounded-l-lg hover:animate-pulse "
                        onClick={() => setFontSize((s) => Math.max(8, s - 4))}>
                        −
                      </button>
                      <span className="w-8 text-center">{fontSize}</span>
                      <button
                        className=" cursor-pointer bg-bg_clr p-1 px-3 rounded-r-lg hover:animate-pulse "
                        onClick={() => setFontSize((s) => s + 4)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Text appearance Section */}
                <div
                  ref={textRef}
                  onMouseDown={handleMouseDown}
                  style={{
                    position: "absolute",
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    cursor: dragging ? "grabbing" : "grab",
                    color: textColor,
                    fontFamily: fontFamily,
                    fontSize: `${fontSize}px`,
                    userSelect: "none",
                  }}>
                  {text}
                </div>
              </div>
            </div>
          </section>
        </main>
      </article>
    </div>
  );
}
