import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n";
import axios from "axios";
import i18n from "./i18n";
import App from "./App";

axios.interceptors.request.use((config) => {
  const lang = String(i18n.language || "en").toLowerCase().startsWith("ar")
    ? "ar"
    : "en";
  config.headers["Accept-Language"] = lang;
  config.headers["X-Language"] = lang;
  return config;
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
