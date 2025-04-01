import React, { useState } from 'react'

const Profile = () => {
    const [activeTab, setActiveTab] = useState("Profile");
  
    const renderContent = () => {
      switch (activeTab) {
        case "Profile":
          return (
            <div className= "text-t_clr">
                <img src="/src/assets/Nemo.png" alt= "profile photo" className="w-50 h-50 rounded-full m-4"></img>
                <form className="grid grid-cols-2 gap-4 mt-10">
              <label className="block">
                <span>First Name</span>
                <input type="text" className="border p-2 w-full" defaultValue="Tasnim" />
              </label>
              <label className="block">
                <span>Last Name</span>
                <input type="text" className="border p-2 w-full" defaultValue="Hatem" />
              </label>
              <label className="block">
                <span>Username</span>
                <input type="text" className="border p-2 w-full" defaultValue="Tasnim.h" />
              </label>
              <label className="block">
                <span>Email</span>
                <input type="email" className="border p-2 w-full" defaultValue="Tasnim12@gmail.com" />
              </label>
              <label className="block">
                <span>Phone Number</span>
                <input type="text" className="border p-2 w-full" defaultValue="01024239881" />
              </label>
              <div className="block">
                <span>Gender</span>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center border-1 w-55 p-1 ">
                    <input type="radio" name="gender" value="male" className="mr-2" /> Male
                  </label>
                  <label className="flex items-center border-1 w-55 p-1">
                    <input type="radio" name="gender" value="female" className="mr-2" /> Female
                  </label>
                  
                </div>
              </div>
            </form>

            <button className="mt-10 bg-bg_clr p-1 w-40">Save</button>
          </div>
          );
        case "Orders History":
          return <div className="text-t_clr"><h2>Past Orders</h2><p>Order #1234 - Delivered</p></div>;
        case "Settings":
          return <div className="text-t_clr"><h2>Settings</h2><p>Change Password, Notifications...</p></div>;
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
        <img src="/src/assets/Nemo.png" alt= "profile photo" className="w-50 h-50 rounded-full m-4"></img>
          <ul>
            {["Profile", "Orders History", "Settings", "Coupons", "Wallet"].map((item) => (
              <li key={item} className={`p-2 cursor-pointer ${activeTab === item ? "bg-cn_clr" : ""}`} onClick={() => setActiveTab(item)}>
                {item}
              </li>
            ))}
          </ul>
        </aside>
        <main className="w-3/4 p-4 bg-cn_clr ">{renderContent()}</main>
      </div>
    );
  };
  
export default Profile;
  
