import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [activeTab, setActiveTab] = useState("SignIn");

  const signUpvalidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const signInvalidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const navigate = useNavigate();

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers
      ? JSON.parse(storedUsers)
      : [
          {
            name: "Salma",
            email: "salmamehrez85@gmail.com",
            password: "123",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleSignInSubmit = (values, { setErrors }) => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));

    if (
      storedUsers.find(
        (user) =>
          user.email === values.email && user.password === values.password
      )
    ) {
      navigate("/");
    } else {
      setErrors({ password: "Incorrect email or password" });
    }
  };

  const handleSignUpSubmit = (values, { setErrors }) => {
    if (users.some((user) => user.email == values.email)) {
      setErrors({ email: "Email is already registered" });
      return;
    }

    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    setUsers((users) => [...users, newUser]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <main className="relative w-[800px] h-[500px] bg-white rounded-4xl shadow-2xl overflow-hidden">
        {/* Beige Background with Animation */}
        <section
          className={`absolute top-0 h-full w-1/2 rounded-4xl bg-gradient-to-b from-bg_clr to-t_clr transition-all duration-1000 ease-in-out ${
            activeTab == "SignUp" ? "left-0" : "left-1/2"
          }`}>
          <div className="flex flex-col items-center justify-center h-full text-white px-8">
            {activeTab == "SignUp" ? (
              <>
                <h3 className="text-3xl font-bold mb-4">Welcome Back!</h3>
                <p className="text-center mb-6 ">
                  Enter your personal details to use all of site features
                </p>
                <button
                  onClick={() => setActiveTab("SignIn")}
                  className="cursor-pointer px-15 py-3 mt-8 font-bold border border-white rounded-xl hover:bg-bg_clr hover:text-t_clr transition">
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
                  className="cursor-pointer px-15 py-3 mt-8 font-bold border border-white rounded-xl hover:bg-bg_clr hover:text-t_clr transition">
                  SIGN UP
                </button>
              </>
            )}
          </div>
        </section>

        <AnimatePresence mode="wait">
          {/* Sign In Form */}
          {activeTab == "SignIn" && (
            <motion.section
              key="signIn"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 h-full w-1/2">
              <div className="flex flex-col items-center justify-center h-full px-8">
                <h2 className="text-4xl font-bold mb-6">Sign In</h2>
                <div className="flex space-x-4 mb-6">
                  <button className="cursor-pointer w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100">
                    <i className="fa-brands fa-google"></i>
                  </button>
                  <button className="cursor-pointer w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100">
                    <i className="fa-brands fa-facebook"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  or use your email password
                </p>

                {/* Sign In Formik */}
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={signInvalidationSchema}
                  onSubmit={handleSignInSubmit}>
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col w-full gap-2">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                      <ErrorMessage name="email">
                        {(msg) => (
                          <div className="  font-semibold text-red-500 text-sm w-full ">
                            ⚠️ {msg} !
                          </div>
                        )}
                      </ErrorMessage>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />

                      <ErrorMessage name="password">
                        {(msg) => (
                          <div className="font-semibold text-red-500 text-sm w-full ">
                            ⚠️ {msg} !
                          </div>
                        )}
                      </ErrorMessage>
                      <div className="items-center flex flex-col ">
                        <a
                          href="#"
                          className=" text-center text-sm text-gray-500 mb-4 hover:underline">
                          FORGET YOUR PASSWORD?
                        </a>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="cursor-pointer px-8 py-2 bg-t_clr text-white rounded-lg hover:bg-bg_clr hover:text-t_clr transition">
                          SIGN IN
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </motion.section>
          )}

          {/* Sign Up Form */}
          {activeTab === "SignUp" && (
            <motion.section
              key="signUp"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-1/2 h-full w-1/2">
              <div className="flex flex-col items-center justify-center h-full px-8 mt-8">
                <h2 className="text-3xl font-bold mb-6 ">Create Account</h2>
                <div className="flex space-x-4 mb-6 font-bold">
                  <button className="cursor-pointer w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100">
                    <i className="fa-brands fa-google"></i>
                  </button>
                  <button className="cursor-pointer w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100">
                    <i className="fa-brands fa-facebook"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  or use your email for registration
                </p>

                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                  }}
                  validationSchema={signUpvalidationSchema}
                  onSubmit={handleSignUpSubmit}>
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col w-full gap-2">
                      <Field
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full p-2 px-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                      <ErrorMessage name="name">
                        {(msg) => (
                          <div className="  font-semibold text-red-500 text-sm w-full ">
                            ⚠️ {msg} !
                          </div>
                        )}
                      </ErrorMessage>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 px-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                      <ErrorMessage name="email">
                        {(msg) => (
                          <div className="  font-semibold text-red-500 text-sm w-full ">
                            ⚠️ {msg} !
                          </div>
                        )}
                      </ErrorMessage>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 px-4 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                      />
                      <ErrorMessage name="password">
                        {(msg) => (
                          <div className="  font-semibold text-red-500 text-sm w-full ">
                            ⚠️ {msg} !
                          </div>
                        )}
                      </ErrorMessage>
                      <div className="flex justify-center">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="cursor-pointer px-8 py-2 bg-t_clr text-white rounded-lg hover:bg-bg_clr hover:text-t_clr transition">
                          SIGN UP
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
