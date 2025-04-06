import React, { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [profilePhoto, setProfilePhoto] = useState("/src/assets/Nemo.png");
  const [orderFilter, setOrderFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState("New York");
  const [currency, setCurrency] = useState("USD");
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [address, setAddress] = useState("");

  const orders = [
    { id: "1234", status: "Delivered", item: "T-Shirt", date: "2024-03-12" },
    { id: "1235", status: "Processing", item: "Sneakers", date: "2024-03-15" },
    { id: "1236", status: "Unpaid", item: "Watch", date: "2024-03-17" },
    { id: "1237", status: "Shipped", item: "Backpack", date: "2024-03-20" },
    { id: "1238", status: "Returns", item: "Jacket", date: "2024-03-22" },
  ];

  const filteredOrders =
    orderFilter === "All" ? orders : orders.filter((order) => order.status === orderFilter);

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
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
        </button>
        {isOpen && <div className="mt-2">{children}</div>}
      </div>
    );
  };
  

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div className="text-t_clr">
            <h1 className=" text-center text-2xl font-semibold ">Account details</h1>
            <div className="relative w-32 h-32 m-4 group">
              <img
                src={profilePhoto}
                alt="profile"
                className="w-full h-full object-cover rounded-full border"
              />
              <div className="absolute inset-0 bg-bg_clr bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 cursor-pointer p-3">
                <label htmlFor="fileUpload" className="text-t_clr text-sm font-medium cursor-pointer ">
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
                <input type="text" className="border-[#976c60] border-1 bg-bg_clr p-2 w-full h-10 mt-3" defaultValue="Tasnim" />
              </label>
              <label className="block">
                <span className="font-bold">Last Name</span>
                <input type="text" className="border-[#976c60] border-1 bg-bg_clr p-2 w-full h-10 mt-3" defaultValue="Hatem" />
              </label>
              <label className="block">
                <span className="font-bold">Username</span>
                <input type="text" className="border-[#976c60] border-1 bg-bg_clr p-2 w-full h-10 mt-3" defaultValue="Tasnim.h" />
              </label>
              <label className="block">
                <span className="font-bold">Email</span>
                <input type="email" className="border-[#976c60] border-1 bg-bg_clr p-2 w-full h-10 mt-3" defaultValue="Tasnim12@gmail.com" />
              </label>
              <label className="block">
                <span className="font-bold">Phone Number</span>
                <input type="text" className="border-[#976c60] border-1 bg-bg_clr p-2 w-full mt-3" defaultValue="01024239881" />
              </label>
              <div className="block">
                <span className="font-bold">Gender</span>
                <div className="flex gap-4 mt-3">
                  <label className="flex items-center border-[#976c60] border-1 bg-bg_clr w-55 p-1 ">
                    <input type="radio" name="gender" value="male" className="mr-2 h-8" /> Male
                  </label>
                  <label className="flex items-center border-[#976c60] border-1 bg-bg_clr w-55 p-1">
                    <input type="radio" name="gender" value="female" className="mr-2 h-8" /> Female
                  </label>
                </div>
              </div>
            </form>

            <button className="mt-8 bg-bg_clr p-1 w-40">Save</button>
          </div>
        );
        case "Orders History":
          return (
            <div className="text-t_clr">
              <h2 className="text-2xl font-semibold mb-4">Past Orders</h2>
        
              {/* Filter Buttons with Icons */}
              <div className="flex gap-4 mb-4 flex-wrap justify-center">
                {[
                  { label: "All", img: "/src/Assets/OrderStatus/all.png" },
                  { label: "Unpaid", img: "/src/Assets/OrderStatus/unpaid.png" },
                  { label: "Processing", img: "/src/Assets/OrderStatus/processing.png" },
                  { label: "Shipped", img: "/src/Assets/OrderStatus/shipped.png" },
                  { label: "Delivered", img: "/src/Assets/OrderStatus/delivered.png" },
                  { label: "Returns", img: "/src/Assets/OrderStatus/returns.png" },
                ].map(({ label, img }) => (
                  <button
                    key={label}
                    onClick={() => setOrderFilter(label)}
                    className={`flex flex-col items-center justify-center w-20 h-20 p-2 rounded-lg border transition ${
                      orderFilter === label ? "bg-[#976c60] text-white" : "bg-bg_clr text-t_clr"
                    }`}
                  >
                    <img src={img} alt={label} className="w-8 h-8 mb-1" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
        
              {/* Orders List */}
              {filteredOrders.length > 0 ? (
                <ul className="space-y-2">
                  {filteredOrders.map((order) => (
                    <li
                      key={order.id}
                      className="p-4 bg-bg_clr border rounded-lg shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <p><strong>Order #{order.id}</strong> - {order.item}</p>
                        <p className="text-sm text-white">Status: {order.status} | Date: {order.date}</p>
                      </div>
                      <button className="text-sm underline text-t_clr-500 hover:text-blue-700">View</button>
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
          
                {/* Address Book Input */}
                <div className="space-y-2">
                  <button
                    className="flex items-center gap-2  font-medium text-left bg-bg_clr border border-[#976c60] p-2 rounded"
                    onClick={() => setShowAddressInput(!showAddressInput)}
                  >
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
          
                {/* Location Dropdown */}
                <div>
                  <label className="block font-semibold mb-2">Country</label>
                  <select className="w-full p-2 bg-bg_clr border border-[#976c60] rounded">
                    {["Egypt", "USA", "Germany", "France", "India", "Japan", "UAE"].map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
          
                {/* Currency Dropdown */}
                <div>
                  <label className="block font-semibold mb-2">Currency</label>
                  <select className="w-full p-2 bg-bg_clr border border-[#976c60] rounded">
                    {["USD ($)", "EUR (€)", "EGP (E£)", "JPY (¥)", "AED (د.إ)"].map((currency) => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
          
                {/* Toggle switches */}
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
          
                {/* Contact Us Section with Icons */}
                <Disclosure title="Connect to Us">
                  <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <img src="/src/assets/facebook.png" alt="Facebook" className="w-6 h-6" />
                    </a>
                    <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                      <img src="/src/assets/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                      <img src="/src/assets/tiktok.png" alt="TikTok" className="w-6 h-6" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <img src="/src/assets/twitter.png" alt="Twitter" className="w-6 h-6" />
                    </a>
                    <p className="text-sm mt-2 w-full">You can also email us at support@OSTR.com</p>
                  </div>
                </Disclosure>
          
                {/* Terms & Conditions */}
                <Disclosure title="Terms & Conditions">
                  <p className="text-sm mt-2">
                    By using this app, you agree to the terms and conditions. These include your responsibility for data usage,
                    proper account conduct, and abiding by platform rules.
                  </p>
                </Disclosure>
          
                {/* Logout Button */}
                <button className="mt--15 bg-bg_clr text-t_clr p-2 rounded hover:bg-cn_clr">Logout</button>
              </div>
            );
          
          
      case "Coupons":
        return <div className="text-t_clr"><h2>Coupons</h2><p>You have 2 active coupons.</p></div>;
      case "Wallet":
        return <div className="text-t_clr"><h2>Wallet</h2><p>Balance: $100</p></div>;
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
            <label htmlFor="sidebarFileUpload" className="text-t_clr text-sm font-medium cursor-pointer ">
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
          {["Profile", "Orders History", "Settings", "Coupons", "Wallet"].map((item) => (
            <li
              key={item}
              className={`p-2 hover:bg-cn_clr cursor-pointer ${activeTab === item ? "bg-cn_clr" : ""}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>
      <main className="w-3/4 p-4 bg-cn_clr">{renderContent()}</main>
    </div>
  );
};

export default Profile;
