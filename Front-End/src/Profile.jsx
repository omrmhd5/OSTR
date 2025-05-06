import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [profilePhoto, setProfilePhoto] = useState(
    "/src/assets/profileDefault.jpg"
  );
  const [orderFilter, setOrderFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState("Egypt");
  const [currency, setCurrency] = useState("USD");
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [address, setAddress] = useState("");
  const [showCopyPopup, setShowCopyPopup] = useState(null);
  const [savedCards, setSavedCards] = useState([]);
  const [newCard, setNewCard] = useState({ number: "", expiry: "", cvv: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [balance, setBalance] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherMessage, setVoucherMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);


  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

const handleLogout = () => {
  
  localStorage.removeItem("token"); 
  
  navigate("/login");
};


  useEffect(() => {
    const fetchOrders = async () => {
      const staticOrders = [
        {
          id: "1234",
          status: "Delivered",
          item: "T-Shirt",
          date: "2024-03-12",
        },
        { id: "1236",
           status: "Unpaid", 
           item: "Watch", 
           date: "2024-03-17" 
          },
        { id: "1237",
           status: "Shipped", 
           item: "Backpack", 
           date: "2024-03-20" 
          },
        { id: "1238",
           status: "Returns",
            item: "Jacket",
             date: "2024-03-22" 
            },
      ];

      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const backendOrders = res.data.orders.map((order) => ({
          id: order._id,
          status: order.status || "Processing",
          item: `${order.items?.length || 0} item(s)`,
          date: new Date(order.createdAt).toISOString().split("T")[0],
        }));

        setOrders([...backendOrders, ...staticOrders]);
      } catch (error) {
        console.error("Error fetching backend orders:", error);
        setOrders([...staticOrders]); 
      }
    };

    fetchOrders();
  }, []);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCard.number && newCard.expiry && newCard.cvv) {
      setSavedCards([...savedCards, newCard]); 
      setNewCard({ number: "", expiry: "", cvv: "" }); 
    } else {
      alert("Please fill out all fields.");
    }
  };
  const handleRedeemVoucher = () => {
    if (voucherCode === "OSTR209") {
      setBalance(balance + 25);
      setVoucherMessage("Voucher redeemed successfully! You received $25.");
    } else {
      setVoucherMessage("Invalid voucher code.");
    }
    setVoucherCode("");
  };
  const renderSavedCards = () => {
    return savedCards.length > 0 ? (
      savedCards.map((card, index) => (
        <div
          key={index}
          className="bg-bg_clr p-3 rounded border border-[#976c60] mb-2">
          <p className="font-semibold">Card {index + 1}</p>
          <p className="text-sm">
            Number: **** **** **** {card.number.slice(-4)}
          </p>
          <p className="text-sm">Expiry: {card.expiry}</p>
          <p className="text-sm">CVV: ***</p>
        </div>
      ))
    ) : (
      <p>No saved cards. Add a new card below!</p>
    );
  };

  const filteredOrders =
    orderFilter === "All"
      ? orders
      : orders.filter((order) => order.status === orderFilter);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const Disclosure = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border border-[#976c60] p-3 rounded bg-bg_clr">
        <button
          className="font-semibold w-full text-left"
          onClick={() => setIsOpen(!isOpen)}>
          {title}
        </button>
        {isOpen && <div className="mt-2">{children}</div>}
      </div>
    );
  };
  const [hasSpun, setHasSpun] = useState(false);

  const [showWheel, setShowWheel] = useState(false);
  const [wonCoupon, setWonCoupon] = useState(null);
  const [userCoupons, setUserCoupons] = useState([
    { code: "SPRING20", discount: "20% off", expiry: "Apr 15, 2025" },
    { code: "FREESHIP", discount: "Free Shipping", expiry: "Apr 30, 2025" },
  ]);

  const spinOptions = [
    { code: "SAVE10", discount: "10% off", expiry: "Jan 20, 2025" },
    { code: "FREESHIP", discount: "Free Shipping", expiry: "Apr 30, 2025" },
    { code: "DISCOUNT25", discount: "25% off", expiry: "Apr 18, 2025" },
    { code: "BUY1GET1", discount: "Buy 1 Get 1 Free", expiry: "Oct 20, 2026" },
    { code: "SAVE50", discount: "50% off", expiry: "Dec 9, 2025" },
    { code: "BUY2GET1", discount: "Buy 2 Get 1 Free", expiry: "Feb 14, 2026" },
  ];
  const handleSpin = () => {
    setShowWheel(true);
    setTimeout(() => {
      const prize = spinOptions[Math.floor(Math.random() * spinOptions.length)];
      setWonCoupon(prize);
      setUserCoupons((prev) => [...prev, prize]);
      setHasSpun(true);
      setShowWheel(false);
    }, 3000); // simulate 3 second spin
  };

  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data.user;
        setUserData(user);
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // optional
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) return <div>Loading profile...</div>;

  const [fName, lName] = userData.name.split(" ", 2);
  const email = userData.email;

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div className="text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
            <h1 className=" text-center text-2xl font-semibold ">
              Account Details
            </h1>
            <div className="relative w-32 h-32 m-4 group">
              <img
                src={profilePhoto}
                alt="profile"
                className="w-full h-full object-cover rounded-full border"
              />
              <div className="absolute inset-0 bg-bg_clr bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 cursor-pointer p-3">
                <label
                  htmlFor="fileUpload"
                  className="text-t_clr text-sm font-medium cursor-pointer ">
                  Click to change <span className="pl-8">photo</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="fileUpload"
                  className="hidden"
                />
              </div>
            </div>

            <form className="grid grid-cols-2 gap-4 mt-10">
              <label className="block">
                <span className="font-bold">First Name</span>
                <input
                  type="text"
                  className="border-[#976c60] border-1 bg-bg_clr dark:border-0 p-2 w-full h-10 mt-3"
                  defaultValue={fName}
                />
              </label>
              <label className="block">
                <span className="font-bold">Last Name</span>
                <input
                  type="text"
                  className="border-[#976c60] border-1 bg-bg_clr p-2 dark:border-0 w-full h-10 mt-3"
                  defaultValue={lName}
                />
              </label>
              <label className="block">
                <span className="font-bold">Username</span>
                <input
                  type="text"
                  className="border-[#976c60] border-1 bg-bg_clr p-2 dark:border-0 w-full h-10 mt-3"
                  defaultValue={`${fName} ${lName}`}
                />
              </label>
              <label className="block">
                <span className="font-bold">Email</span>
                <input
                  type="email"
                  className="border-[#976c60] border-1 bg-bg_clr p-2 dark:border-0 w-full h-10 mt-3"
                  defaultValue={email}
                />
              </label>
              <label className="block">
                <span className="font-bold">Phone Number</span>
                <input
                  type="text"
                  className="border-[#976c60] border-1 bg-bg_clr dark:border-0 p-2 w-full mt-3"
                  defaultValue="01024239881"
                />
              </label>
              <div className="block">
                <span className="font-bold">Gender</span>
                <div className="flex gap-4 mt-3">
                  <label className="flex items-center border-[#976c60] border-1 dark:border-0 bg-bg_clr w-55 p-1 ">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="mr-2 h-8"
                    />{" "}
                    Male
                  </label>
                  <label className="flex items-center border-[#976c60] border-1 dark:border-0 bg-bg_clr w-55 p-1">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="mr-2 h-8"
                    />{" "}
                    Female
                  </label>
                </div>
              </div>
            </form>

            <button className="mt-8 bg-bg_clr p-1 w-40 cursor-pointer">
              Save
            </button>
          </div>
        );
      case "Orders History":
        return (
          <div className="text-t_clr dark:text-black">
            <h2 className="text-2xl font-semibold mb-4">Past Orders</h2>

            
            <div className="flex gap-4 mb-4 flex-wrap justify-center">
              {[
                { label: "All", img: "/src/Assets/OrderStatus/all.png" },
                { label: "Unpaid", img: "/src/Assets/OrderStatus/unpaid.png" },
                {
                  label: "Processing",
                  img: "/src/Assets/OrderStatus/processing.png",
                },
                {
                  label: "Shipped",
                  img: "/src/Assets/OrderStatus/shipped.png",
                },
                {
                  label: "Delivered",
                  img: "/src/Assets/OrderStatus/delivered.png",
                },
                {
                  label: "Returns",
                  img: "/src/Assets/OrderStatus/returns.png",
                },
              ].map(({ label, img }) => (
                <button
                  key={label}
                  onClick={() => setOrderFilter(label)}
                  className={`flex flex-col items-center justify-center w-20 h-20 p-2 rounded-lg border transition cursor-pointer ${
                    orderFilter === label
                      ? "bg-[#976c60] text-white dark:text-black dark:bg-gray-500"
                      : "bg-bg_clr text-t_clr"
                  }`}>
                  <img src={img} alt={label} className="w-8 h-8 mb-1" />
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>

           
            {filteredOrders.length > 0 ? (
              <ul className="space-y-2">
                {filteredOrders.map((order) => (
                  <li
                    key={order.id}
                    className="p-4 bg-bg_clr border rounded-lg shadow-sm flex justify-between items-center">
                    <div>
                      <p>
                        <strong>Order #{order.id}</strong> - {order.item}
                      </p>
                      <p className="text-sm text-white dark:text-gray-400">
                        Status: {order.status} | Date: {order.date}
                      </p>
                    </div>
                    <button
  onClick={() => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  }}
  className="text-sm underline text-t_clr-500 hover:text-blue-700 cursor-pointer"
>
  View
</button>

                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">No orders found for "{orderFilter}".</p>
            )}
          </div>
        );

      case "Settings":
        return (
          <div className="text-t_clr space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>

            
            <div className="space-y-2">
              <button
                className="dark:border-0 cursor-pointer flex items-center gap-2  font-medium text-left bg-bg_clr border border-[#976c60] p-2 rounded"
                onClick={() => setShowAddressInput(!showAddressInput)}>
                Add New Address
              </button>
              {showAddressInput && (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your location"
                  className="w-full p-2 border border-[#976c60] bg-bg_clr rounded"
                />
              )}
            </div>

            
            <div>
              <label className="block font-semibold mb-2">Country</label>
              <select className="w-full p-2 bg-bg_clr border border-[#976c60] rounded dark:border-0 cursor-pointer">
                {[
                  "Egypt",
                  "USA",
                  "Germany",
                  "France",
                  "India",
                  "Japan",
                  "UAE",
                ].map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            
            <div>
              <label className="block font-semibold mb-2">Currency</label>
              <select className="w-full p-2 bg-bg_clr border border-[#976c60] rounded dark:border-0 cursor-pointer">
                {["USD ($)", "EUR (€)", "EGP (E£)", "JPY (¥)", "AED (د.إ)"].map(
                  (currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  )
                )}
              </select>
            </div>

            
            <div className="flex flex-col gap-4">
              <label className="flex items-center justify-between">
                <span className="font-semibold">Dark Mode</span>
                <input type="checkbox" className="h-5 w-5" />
              </label>
              <label className="flex items-center justify-between">
                <span className="font-semibold">Push Notifications</span>
                <input type="checkbox" className="h-5 w-5" />
              </label>
            </div>

            
            <Disclosure title="Connect to Us">
              <div className="flex items-center gap-4 mt-3 flex-wrap ">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img
                    src="/src/assets/facebook.png"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img
                    src="/src/assets/whatsapp.png"
                    alt="WhatsApp"
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img
                    src="/src/assets/tiktok.png"
                    alt="TikTok"
                    className="w-6 h-6"
                  />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <img
                    src="/src/assets/twitter.png"
                    alt="Twitter"
                    className="w-6 h-6"
                  />
                </a>
                <p className="text-sm mt-2 w-full">
                  You can also email us at support@OSTR.com
                </p>
              </div>
            </Disclosure>

            
            <Disclosure title="Terms & Conditions">
              <p className="text-sm mt-2">
                By using this app, you agree to the terms and conditions. These
                include your responsibility for data usage, proper account
                conduct, and abiding by platform rules.
              </p>
            </Disclosure>

            
            <button onClick={handleLogout} className="mt--15 bg-bg_clr text-t_clr p-2 rounded hover:bg-cn_clr cursor-pointer">
              Logout
            </button>
          </div>
        );

      case "Coupons":
        return (
          <div className="text-t_clr space-y-6">
            <h2 className="text-2xl font-semibold">Coupons</h2>

            {/* Spin Wheel Section */}
            <div className="bg-bg_clr border border-[#976c60] p-4 rounded text-center dark:border-0">
              <h3 className="text-lg font-bold mb-2">🎡 Daily Spin Wheel</h3>
              <p className="mb-4">
                Spin once a day to win exclusive discounts!
              </p>

              {!hasSpun ? (
                <button
                  onClick={handleSpin}
                  className="bg-[#976c60] dark:border-0 cursor-pointer dark:bg-white dark:text-black text-white px-4 py-2 rounded hover:bg-[#7e554a] transition">
                  Spin Now
                </button>
              ) : (
                <p className="text-sm mt-2">
                  You’ve already spun today. Come back tomorrow!
                </p>
              )}

              {showWheel && (
                <div className="mt-4">
                  <img
                    src="/src/assets/spin-wheel.png"
                    alt="Spinning Wheel"
                    className="w-50 h-45 mx-auto animate-spin"
                  />
                  <p className="text-sm mt-2">Spinning...</p>
                </div>
              )}

              {wonCoupon && (
                <p className="text-[#f0140f] font-semibold mt-4">
                  🎉 You won: {wonCoupon.discount} (Code: {wonCoupon.code})
                </p>
              )}
            </div>

            
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Your Active Coupons
              </h3>
              <ul className="space-y-2">
                {userCoupons.map((coupon) => (
                  <li
                    key={coupon.code}
                    className="relative bg-bg_clr p-3 rounded border border-[#976c60] dark:border-0 cursor-pointer flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{coupon.code}</p>
                      <p className="text-sm">
                        {coupon.discount} — Expires {coupon.expiry}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(coupon.code);
                        setShowCopyPopup(coupon.code);
                        setTimeout(() => setShowCopyPopup(null), 2000);
                      }}
                      className="text-sm text-t_clr hover:text-blue-400 hover:underline cursor-pointer">
                      View QR Code
                    </button>
                  </li>
                ))}

                
                {showCopyPopup && (
                  <div className="fixed inset-0 flex items-center justify-center bg-bg_clr/60 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded shadow-lg">
                      <img
                        src="/src/assets/qr-code.jpeg"
                        alt="QR Code"
                        className="w-70 h-70"
                      />
                      <p className="text-center text-sm mt-2">Scan QR Code!</p>
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        );

      case "Wallet":
        return (
          <div className="text-t_clr space-y-6">
            <h2 className="text-2xl font-semibold">Wallet</h2>

            {/* Current Balance Section */}
            <div className="bg-bg_clr p-4 rounded border border-[#976c60] mb-6 dark:border-0">
              <h3 className="text-lg font-semibold">Current Balance</h3>
              <p className="text-xl font-semibold">${balance}</p>{" "}
              {/* Display dynamic balance */}
            </div>

            {/* Saved Cards Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Your Saved Cards</h3>
              {savedCards.length === 0 ? (
                <p>No saved cards yet.</p>
              ) : (
                savedCards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-bg_clr p-3 rounded border border-[#976c60] mb-2 dark:border-0">
                    <p className="font-semibold">{card.number}</p>
                    <p className="text-sm">Expires {card.expiry}</p>
                  </div>
                ))
              )}
            </div>

            
            <button
              onClick={() => setIsFormVisible(!isFormVisible)} // Toggle form visibility
              className="bg-[#976c60] text-white px-4 py-2 rounded hover:bg-[#7e554a] transition mb-4 ">
              {isFormVisible ? "Cancel" : "Add New Card"}
            </button>

            
            {isFormVisible && (
              <div className="bg-bg_clr p-4 rounded border border-[#976c60] dark:border-0 cursor-pointer">
                <h3 className="text-lg font-bold mb-2">Add New Card</h3>
                <form onSubmit={handleAddCard}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="text-sm">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="number"
                        value={newCard.number}
                        onChange={handleCardInputChange}
                        className="w-full p-2 mt-2 border border-[#976c60] rounded dark:border-0 cursor-pointer"
                        placeholder="Enter card number"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="expiryDate" className="text-sm">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiry"
                        value={newCard.expiry}
                        onChange={handleCardInputChange}
                        className="w-full p-2 mt-2 border border-[#976c60] rounded"
                        placeholder="MM/YY"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="cvv" className="text-sm">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={newCard.cvv}
                        onChange={handleCardInputChange}
                        className="w-full p-2 mt-2 border border-[#976c60] rounded"
                        placeholder="CVV"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-[#976c60] text-white px-4 py-2 rounded hover:bg-[#7e554a] transition">
                      Add Card
                    </button>
                  </div>
                </form>
              </div>
            )}

           
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Redeem Voucher</h3>
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="w-full p-2 border border-[#976c60] rounded mb-4"
                placeholder="Enter voucher code"
              />
              <button
                onClick={handleRedeemVoucher}
                className="bg-[#976c60] text-white px-4 py-2 rounded hover:bg-[#7e554a] transition">
                Redeem
              </button>
              {voucherMessage && (
                <p
                  className={`mt-4 text-sm ${
                    voucherMessage.includes("Invalid")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}>
                  {voucherMessage}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-bg_clr p-4 text-t_clr">
        <div className="relative w-32 h-32 m-4 group">
          <img
            src={profilePhoto}
            alt="profile"
            className="w-full h-full object-cover rounded-full border"
          />
          <div className="absolute inset-0 bg-bg_clr bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 cursor-pointer">
            <label
              htmlFor="sidebarFileUpload"
              className="text-t_clr text-sm font-medium cursor-pointer ">
              Click to change <span className="pl-8">photo</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="sidebarFileUpload"
              className="hidden"
            />
          </div>
        </div>

        <ul>
          {["Profile", "Orders History", "Settings", "Coupons", "Wallet"].map(
            (item) => (
              <li
                key={item}
                className={`p-2 hover:bg-cn_clr cursor-pointer ${
                  activeTab === item ? "bg-cn_clr" : ""
                }`}
                onClick={() => setActiveTab(item)}>
                {item}
              </li>
            )
          )}
        </ul>
        {showOrderModal && selectedOrder && (
  <div className="fixed inset-0 flex items-center justify-center bg-bg_clr bg-opacity-500 z-50">
    <div className="bg-white dark:bg-bg_clr p-6 rounded shadow-lg w-96 text-t_clr dark:text-white">
      <h2 className="text-xl font-semibold mb-4">Order Details</h2>
      <p><strong>Order ID:</strong> {selectedOrder.id}</p>
      <p><strong>Status:</strong> {selectedOrder.status}</p>
      <p><strong>Items:</strong> {selectedOrder.item}</p>
      <p><strong>Date:</strong> {selectedOrder.date}</p>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setShowOrderModal(false)}
          className="bg-[#976c60] text-white px-4 py-2 rounded hover:bg-[#7e554a]">
          Close
        </button>
      </div>
    </div>
  </div>
)}

      </aside>
      <main className="w-3/4 p-4 bg-cn_clr">{renderContent()}</main>
    </div>
    
  );
};

export default Profile;
