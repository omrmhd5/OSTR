import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./lib/utils";
import { useTranslation } from "react-i18next";

const CheckoutComponent = ({ selectedProducts, total, onConfirm }) => {
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = async () => {
    if (paymentMethod === "Visa" && (!cardNumber || !cvv)) {
      alert(t("checkout.cardRequired"));
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        items: selectedProducts.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
        paymentMethod,
      };

      const response = await axios.post(`${BASE_URL}/orders/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert(t("checkout.success"));
        onConfirm(); // Close modal
      } else {
        alert(t("checkout.failed"));
      }
    } catch (error) {
      console.error("Order creation error:", error);
      alert(t("checkout.error"));
    }
  };

  return (
    <div className="fixed inset-0 bg-bg_clr bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full space-y-4">
        <h2 className="text-xl font-bold mb-4">{t("checkout.title")}</h2>

        <div>
          <label className="block mb-2 font-semibold">{t("checkout.method")}</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border p-2 rounded">
            <option value="Cash">{t("checkout.cash")}</option>
            <option value="Visa">{t("checkout.visa")}</option>
          </select>
        </div>

        {paymentMethod === "Visa" && (
          <>
            <input
              type="text"
              placeholder={t("checkout.cardNumber")}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full border p-2 rounded mt-2"
            />
            <input
              type="text"
              placeholder={t("checkout.cvv")}
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full border p-2 rounded mt-2"
            />
          </>
        )}

        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-red-500"
            onClick={onConfirm}>
            {t("checkout.cancel")}
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-bg_clr"
            onClick={handlePayment}>
            {t("checkout.pay", { amount: total.toFixed(2) })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
