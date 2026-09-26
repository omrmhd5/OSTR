import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function DemoBanner() {
  const { t } = useTranslation();
  const bannerRef = useRef(null);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;

    const update = () => {
      document.documentElement.style.setProperty(
        "--demo-banner-h",
        `${el.getBoundingClientRect().height}px`,
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={bannerRef}
      className="sticky top-0 z-[80] bg-amber-500 text-white text-center px-4 py-2">
      <p className="font-semibold tracking-wide">{t("banner.demo")}</p>
      <p className="text-sm">{t("banner.wake")}</p>
    </div>
  );
}
