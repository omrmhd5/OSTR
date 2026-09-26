import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PopUpMessage from "./components/ui/PopUpMessage";
import DemoBanner from "./components/DemoBanner";
import LanguageSwitch from "./components/LanguageSwitch";
import axios from "axios";
import { BASE_URL } from "./lib/utils";

const DEMO_ACCOUNTS = [
  {
    id: "shopper",
    roleKey: "demoLogin.shopper",
    email: "user@user.com",
    password: "user123",
  },
  {
    id: "admin",
    roleKey: "demoLogin.admin",
    email: "admin@admin.com",
    password: "admin123",
  },
];

const App = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("SignIn");
  const [prefill, setPrefill] = useState({ email: "", password: "" });
  const [selectedDemo, setSelectedDemo] = useState("");

  const signUpvalidationSchema = Yup.object().shape({
    name: Yup.string().required(t("login.nameRequired")),
    email: Yup.string()
      .email(t("login.emailInvalid"))
      .required(t("login.emailRequired")),
    password: Yup.string().required(t("login.passwordRequired")),
  });

  const signInvalidationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("login.emailInvalid"))
      .required(t("login.emailRequired")),
    password: Yup.string().required(t("login.passwordRequired")),
  });

  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  const [text, setText] = useState("");

  const handleMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleSignInSubmit = async (values, { setErrors }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: values.email,
        password: values.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        setText(t("login.loginSuccess"));
        handleMessage();
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else if (response.data.message) {
        setText(response.data.message);
        handleMessage();
        setErrors({ password: response.data.message });
      } else {
        setText(t("login.unknownError"));
        handleMessage();
        setErrors({ password: t("login.unknownError") });
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setText(error.response.data.message);
        handleMessage();
        setErrors({ password: error.response.data.message });
      } else {
        setText(t("login.genericError"));
        handleMessage();
        setErrors({ password: t("login.genericError") });
      }
    }
  };

  const handleSignUpSubmit = async (values, { setErrors }) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (response.data._id) {
        setText(t("login.signedUp"));
        handleMessage();
        setTimeout(() => window.location.reload(), 1000);
      } else if (response.data.message) {
        setText(response.data.message);
        handleMessage();
        setErrors({ email: response.data.message });
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setText(error.response.data.message);
        handleMessage();
        setErrors({ email: error.response.data.message });
      } else {
        setText(t("login.genericError"));
        handleMessage();
        setErrors({ email: t("login.genericError") });
      }
    }
  };

  const handleResetPassword = async (values, { setErrors }) => {
    try {
      const response = await axios.put(`${BASE_URL}/changepassword`, {
        email: values.email,
        password: values.password,
      });

      if (response.data.code === "passwordUpdated") {
        setText(t("login.resetSuccess"));
        handleMessage();
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setErrors({ password: t("login.resetFailed") });
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors({ password: error.response.data.message });
      } else {
        setErrors({ password: t("login.genericError") });
      }
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const handlePopupToggle = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const selectDemoAccount = (account) => {
    setSelectedDemo(account.id);
    setActiveTab("SignIn");
    setPrefill({ email: account.email, password: account.password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 text-t_clr font-paragraph [&_h1]:font-header [&_h2]:font-header [&_h3]:font-header [&_h4]:font-header [&_h5]:font-header [&_h6]:font-header">
      <DemoBanner />
      <div className="flex justify-end px-6 py-3">
        <LanguageSwitch />
      </div>
      <div className="flex flex-col items-center gap-8 px-4 pb-12">
      <main className="relative w-[800px] h-[500px] bg-white rounded-4xl shadow-2xl overflow-hidden">
        <PopUpMessage text={text} show={showMessage} />

        <section
          className={`absolute top-0 h-full w-1/2 rounded-4xl bg-gradient-to-b from-bg_clr to-t_clr transition-all duration-1000 ease-in-out ${
            activeTab == "SignUp" ? "left-0" : "left-1/2"
          }`}>
          <div className="flex flex-col items-center justify-center h-full text-white dark:text-black px-8">
            {activeTab == "SignUp" ? (
              <>
                <h3 className="text-3xl font-bold mb-4">{t("login.welcomeBack")}</h3>
                <p className="text-center mb-6 ">
                  {t("login.welcomeDetails")}
                </p>
                <button
                  onClick={() => setActiveTab("SignIn")}
                  className="cursor-pointer px-15 py-3 mt-8 font-bold border border-white rounded-xl hover:bg-bg_clr hover:text-t_clr transition">
                  {t("login.signIn")}
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4">{t("login.helloFriend")}</h2>
                <p className="text-center mb-6">
                  {t("login.registerDetails")}
                </p>
                <button
                  onClick={() => setActiveTab("SignUp")}
                  className="cursor-pointer px-15 py-3 mt-8 font-bold border border-white rounded-xl hover:bg-bg_clr hover:text-t_clr transition">
                  {t("login.signUp")}
                </button>
              </>
            )}
          </div>
        </section>

        <AnimatePresence mode="wait">
          {activeTab == "SignIn" && (
            <motion.section
              key="signIn"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 h-full w-1/2">
              <div className="flex flex-col items-center justify-center h-full px-8">
                <h2 className="text-4xl font-bold mb-6">{t("login.signInTitle")}</h2>
                <div className="flex space-x-4 mb-6">
                  <button className="cursor-pointer w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:text-white">
                    <i className="fa-brands fa-google"></i>
                  </button>
                  <button className="cursor-pointer w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:text-white">
                    <i className="fa-brands fa-facebook"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {t("login.orEmailPassword")}
                </p>

                <Formik
                  initialValues={{ email: prefill.email, password: prefill.password }}
                  enableReinitialize
                  validationSchema={signInvalidationSchema}
                  onSubmit={handleSignInSubmit}>
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col w-full gap-2">
                      <Field
                        type="email"
                        name="email"
                        placeholder={t("login.email")}
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
                        placeholder={t("login.password")}
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
                          onClick={handlePopupToggle}
                          className=" text-center text-sm text-gray-500 mb-4 hover:underline">
                          {t("login.forgot")}
                        </a>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="cursor-pointer px-8 py-2 bg-t_clr text-white rounded-lg hover:bg-bg_clr hover:text-t_clr transition">
                          {t("login.signIn")}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </motion.section>
          )}

          {showPopup && (
            <div className="fixed inset-0 z-40 bg-white/50 flex items-center justify-center ">
              <div onClick={handleClosePopup} />
              <div className="fixed z-50 scale-100 bg-white rounded-2xl border-2 shadow-2xl p-6 w-80 max-w-full">
                <h2 className="text-lg font-semibold mb-4">{t("login.resetTitle")}</h2>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={signInvalidationSchema}
                  onSubmit={handleResetPassword}>
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-black mb-1">
                          {t("login.email")}
                        </label>
                        <Field
                          type="email"
                          name="email"
                          placeholder={t("login.email")}
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-950"
                        />
                        <ErrorMessage name="email">
                          {(msg) => (
                            <div className="  font-semibold text-red-500 text-sm w-full ">
                              ⚠️ {msg} !
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-black mb-1">
                          {t("login.newPassword")}
                        </label>
                        <Field
                          type="password"
                          name="password"
                          placeholder={t("login.password")}
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-950"
                        />
                        <ErrorMessage name="password">
                          {(msg) => (
                            <div className="font-semibold text-red-500 text-sm w-full ">
                              ⚠️ {msg} !
                            </div>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={handleClosePopup}
                          className="cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-black dark:hover:text-white border rounded hover:bg-gray-100">
                          {t("login.cancel")}
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="cursor-pointer px-4 py-2 text-sm text-white bg-t_clr rounded hover:bg-yellow-950 dark:hover:bg-gray-400">
                          {t("login.submit")}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}

          {activeTab === "SignUp" && (
            <motion.section
              key="signUp"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-1/2 h-full w-1/2">
              <div className="flex flex-col items-center justify-center h-full px-8 mt-8">
                <h2 className="text-3xl font-bold mb-6 ">{t("login.createAccount")}</h2>
                <div className="flex space-x-4 mb-6 font-bold">
                  <button className="cursor-pointer w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:text-white">
                    <i className="fa-brands fa-google"></i>
                  </button>
                  <button className="cursor-pointer w-10 h-10 border rounded-xl flex items-center justify-center hover:bg-gray-100 dark:hover:text-white">
                    <i className="fa-brands fa-facebook"></i>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {t("login.orEmailRegister")}
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
                        placeholder={t("login.name")}
                        className="w-full p-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                        placeholder={t("login.email")}
                        className="w-full p-2 px-4 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                        placeholder={t("login.password")}
                        className="w-full p-2 px-4 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-gray-500"
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
                          {t("login.signUp")}
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

      <section className="w-[800px] max-w-full bg-white rounded-4xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">{t("demoLogin.title")}</h2>
        <div className="grid gap-3">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.id}
              type="button"
              onClick={() => selectDemoAccount(account)}
              className={`w-full text-start border rounded-xl p-4 cursor-pointer transition ${
                selectedDemo === account.id
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}>
              <p className="font-semibold">{t(account.roleKey)}</p>
              <p className="text-sm">
                {t("demoLogin.email")}: {account.email}
              </p>
              <p className="text-sm">
                {t("demoLogin.password")}: {account.password}
              </p>
            </button>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

export default App;
