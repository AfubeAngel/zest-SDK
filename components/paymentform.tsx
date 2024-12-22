/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react";

// Declaration of ZestPayPop globally
declare let ZestPayPop: any; //it was initally declared with var;

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    email: "",
    amount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if ZestPayPop is available
    if (typeof ZestPayPop === "undefined") {
      console.error("ZestPayPop SDK not loaded");
      alert("Payment SDK not loaded. Please try again later.");
      return;
    }

    // Initialize Zest Payment
    const handler = ZestPayPop.setup({
      // key: 'YOUR_PUBLIC_KEY', // Replace with your public key
      key: 'TPK_BC1473F12CDC63A669DB20250904124558',
      email: formData.email,
      amount: parseFloat(formData.amount) * 100, // Convert to the lowest currency unit
      // currency: 'NGN',
      onClose: () => {
        console.log("Payment window closed.");
        alert("Payment process was canceled.");
      },
      callback: (response: any) => {
        console.log("Payment successful:", response);

        // Redirect or verify transaction on the server
      },
    });

    handler.openIframe(); // Open the payment gateway
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-[100vh]">
    <p className="font-extrabold text-[30px]">Payment Form</p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.5rem",
              color: "black",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.5rem",
              color: "black",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

