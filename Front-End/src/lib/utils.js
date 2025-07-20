import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_SERVER_URL
    : import.meta.env.VITE_PROD_SERVER_URL;
