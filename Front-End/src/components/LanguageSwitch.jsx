import { useTranslation } from "react-i18next";
import { applyLanguage } from "../i18n";

export default function LanguageSwitch() {
  const { i18n } = useTranslation();
  const isArabic = String(i18n.language || "en").toLowerCase().startsWith("ar");

  return (
    <button
      type="button"
      onClick={() => applyLanguage(isArabic ? "en" : "ar")}
      className="cursor-pointer text-sm font-semibold px-3 py-1 rounded-md border border-current bg-white text-t_clr shadow-sm">
      {isArabic ? "English" : "العربية"}
    </button>
  );
}
