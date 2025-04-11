import QRCode from "qrcode.react";


const wheelSegments = ["10% Off", "Free Shipping", "15% Off", "No Luck", "5$ Voucher", "20% Off"];
const getRandomSegment = () => wheelSegments[Math.floor(Math.random() * wheelSegments.length)];

const CouponsSection = () => {
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

    setCountdown(`${hours}h ${minutes}m ${seconds}s`);

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
      <h2 className="text-2xl font-semibold mb-4">Spin the Wheel</h2>
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleSpin}
          disabled={!canSpin}
          className={`w-40 h-40 rounded-full text-center font-bold text-lg shadow-md transition ${
            canSpin ? "bg-[#976c60] hover:scale-105" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {canSpin ? "Spin Me!" : "Come Back Tomorrow"}
        </button>
        {!canSpin && <p className="text-sm">Next spin in: {countdown}</p>}
        {spinResult && <p className="mt-2 font-medium">You won: {spinResult}</p>}
      </div>

      {coupons.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Your Coupons</h3>
          <ul className="space-y-4">
            {coupons.map((coupon, index) => (
              <li key={index} className="flex items-center gap-4 bg-bg_clr border p-3 rounded">
                <div>
                  <p>{coupon}</p>
                  <small className="text-xs">Save this coupon at checkout</small>
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
