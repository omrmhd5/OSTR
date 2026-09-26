import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";

const DISCOUNT_KEYS = {
  "10% Off": "discounts.tenOff",
  "15% Off": "discounts.fifteenOff",
  "20% Off": "discounts.twentyOff",
  "Free Shipping": "discounts.freeShipping",
  "No Luck": "discounts.noLuck",
  "5$ Voucher": "discounts.fiveVoucher",
};


const wheelSegments = ["10% Off", "Free Shipping", "15% Off", "No Luck", "5$ Voucher", "20% Off"];
const getRandomSegment = () => wheelSegments[Math.floor(Math.random() * wheelSegments.length)];

const CouponsSection = () => {
  const { t, i18n } = useTranslation();
  const [canSpin, setCanSpin] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const lastSpin = localStorage.getItem("lastSpinDate");
    const now = new Date();

    if (!lastSpin || new Date(lastSpin).toDateString() !== now.toDateString()) {
      setCanSpin(true);
    } else {
      updateCountdown();
    }

    const storedCoupons = JSON.parse(localStorage.getItem("wonCoupons") || "[]");
    setCoupons(storedCoupons);
  }, []);

  const updateCountdown = () => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    const timeDiff = tomorrow - now;

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    setCountdown(
      `${hours}${i18n.t("coupons.hoursShort")} ${minutes}${i18n.t("coupons.minutesShort")} ${seconds}${i18n.t("coupons.secondsShort")}`
    );

    setTimeout(updateCountdown, 1000);
  };

  const handleSpin = () => {
    if (!canSpin) return;

    const reward = getRandomSegment();
    setSpinResult(reward);
    const updatedCoupons = [...coupons, reward];
    setCoupons(updatedCoupons);

    localStorage.setItem("wonCoupons", JSON.stringify(updatedCoupons));
    localStorage.setItem("lastSpinDate", new Date().toISOString());

    setCanSpin(false);
    updateCountdown();
  };

  return (
    <div className="text-t_clr">
      <h2 className="text-2xl font-semibold mb-4">{t("coupons.title")}</h2>
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleSpin}
          disabled={!canSpin}
          className={`w-40 h-40 rounded-full text-center font-bold text-lg shadow-md transition ${
            canSpin ? "bg-[#976c60] hover:scale-105" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {canSpin ? t("coupons.spin") : t("coupons.tomorrow")}
        </button>
        {!canSpin && <p className="text-sm">{t("coupons.nextSpin", { time: countdown })}</p>}
        {spinResult && (
          <p className="mt-2 font-medium">
            {t("coupons.youWon", {
              reward: DISCOUNT_KEYS[spinResult]
                ? t(DISCOUNT_KEYS[spinResult])
                : spinResult,
            })}
          </p>
        )}
      </div>

      {coupons.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">{t("coupons.yours")}</h3>
          <ul className="space-y-4">
            {coupons.map((coupon, index) => (
              <li key={index} className="flex items-center gap-4 bg-bg_clr border p-3 rounded">
                <div>
                  <p>
                    {DISCOUNT_KEYS[coupon] ? t(DISCOUNT_KEYS[coupon]) : coupon}
                  </p>
                  <small className="text-xs">{t("coupons.save")}</small>
                </div>
                <QRCode value={coupon} size={64} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
