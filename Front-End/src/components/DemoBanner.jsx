import { useTranslation } from "react-i18next";

export default function DemoBanner() {
  const { t } = useTranslation();

  return (
    <div className="sticky top-0 z-[80] bg-amber-500 text-white text-center px-4 py-2">
      <p className="font-semibold tracking-wide">{t("banner.demo")}</p>
      <p className="text-sm">{t("banner.wake")}</p>
    </div>
  );
}
