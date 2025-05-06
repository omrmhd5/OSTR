import React, { useState } from "react";
import axios from "axios";

const CheckoutComponent = ({ selectedProducts, total, onConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = async () => {
    if (paymentMethod === "Visa" && (!cardNumber || !cvv)) {
      alert("Please enter card details.");
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
  
      const response = await axios.post("http://localhost:5000/orders/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.success) {
        alert(" Order placed successfully!");
        onConfirm(); // Close modal
      } else {
        alert(" Order failed. Try again.");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      alert("Something went wrong while creating the order.");
    }
  };

  return (
    <div className="fixed inset-0 bg-bg_clr bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full space-y-4">
        <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>

        <div>
          <label className="block mb-2 font-semibold">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="Cash">Cash</option>
            <option value="Visa">Visa</option>
          </select>
        </div>

        {paymentMethod === "Visa" && (
          <>
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full border p-2 rounded mt-2"
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full border p-2 rounded mt-2"
            />
          </>
        )}

        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-red-500"
            onClick={onConfirm}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-bg_clr"
            onClick={handlePayment}
          >
            Pay ${total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
