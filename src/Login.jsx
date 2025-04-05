// src/App.jsx
import React, { useState } from "react";

const App = () => {
  //   const [isSignUp, setIsSignUp] = useState(false);
  const [activeTab, setActiveTab] = useState("SignIn");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <div className="relative w-[800px] h-[500px] bg-white rounded-4xl shadow-2xl overflow-hidden">
        {/* Purple Background with Animation */}
        <div
          className={`absolute top-0 h-full w-1/2 rounded-4xl bg-gradient-to-b from-bg_clr to-t_clr transition-all duration-1000 ease-in-out ${
            activeTab == "SignUp" ? "left-0" : "left-1/2"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full text-white px-8">
            {activeTab == "SignUp" ? (
              <>
                <h3 className="text-3xl font-bold mb-4">Welcome Back!</h3>
                <p className="text-center mb-6 ">
                  Enter your personal details to use all of site features
                </p>
                <button
                  onClick={() => setActiveTab("SignIn")}
                  className="cursor-pointer px-15 py-3 mt-8 font-bold border border-white rounded-xl hover:bg-bg_clr hover:text-t_clr transition"
                >
                  SIGN IN
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
                <p className="text-center mb-6">
                  Register with your personal details to use all of site
                  features
                </p>
                <button
                  onClick={() => setActiveTab("SignUp")}
                  className="cursor-pointer px-15 py-3 mt-8 font-bold border border-white rounded-xl hover:bg-bg_clr hover:text-t_clr transition"
                >
                  SIGN UP
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sign In Form */}
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-1000 ${
            activeTab == "SignIn" ? "opacity-100" : "opacity-0"
          } 
          ${activeTab == "SignUp" ? "opacity-100" : "opacity-0"} ${
            activeTab == "SignIn" ? "left-0" : "left-1/2"
          }`}
        >
          {activeTab == "SignIn" ? (
            <div className="flex flex-col items-center justify-center h-full px-8">
              <h2 className="text-4xl font-bold mb-6">Sign In</h2>
              <div className="flex space-x-4 mb-6">
                <button className="cursor-pointer w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100">
                  G+
                </button>
                <button className="cursor-pointer w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100">
                  f
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                or use your email password
              </p>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <a
                href="#"
                className="text-sm text-gray-500 mb-4 hover:underline"
              >
                FORGET YOUR PASSWORD?
              </a>
              <button className="cursor-pointer px-8 py-2 bg-t_clr text-white rounded-lg hover:bg-bg_clr hover:text-t_clr transition">
                SIGN IN
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full px-8 mt-8">
              <h2 className="text-3xl font-bold mb-6 ">Create Account</h2>
              <div className="flex space-x-4 mb-6 font-bold">
                <button className="cursor-pointer w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100">
                  G+
                </button>
                <button className="cursor-pointer w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100">
                  f
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                or use your email for registration
              </p>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 px-4 mb-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 px-4 mb-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 px-4 mb-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button className="cursor-pointer px-8 py-2 bg-t_clr text-white rounded-lg hover:bg-bg_clr hover:text-t_clr transition">
                SIGN UP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
