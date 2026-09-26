import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

const STORAGE_KEY = "language";

function normalizeLanguage(lng) {
  return String(lng || "en").toLowerCase().startsWith("ar") ? "ar" : "en";
}

export function applyLanguage(lng) {
  const normalized = normalizeLanguage(lng);
  localStorage.setItem(STORAGE_KEY, normalized);
  document.documentElement.lang = normalized;
  document.documentElement.dir = normalized === "ar" ? "rtl" : "ltr";
  const change = i18n.changeLanguage(normalized);
  const setTitle = () => {
    document.title = i18n.t("meta.title");
  };
  if (change && typeof change.then === "function") {
    change.then(setTitle);
  } else {
    setTitle();
  }
  return change;
}

const storedLanguage = normalizeLanguage(
  localStorage.getItem(STORAGE_KEY) || "en"
);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: storedLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

applyLanguage(storedLanguage);

export default i18n;
