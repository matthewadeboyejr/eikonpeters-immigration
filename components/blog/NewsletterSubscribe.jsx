"use client";

import React, { useState } from "react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setMessage(data.message || "Thank you for subscribing to our newsletter!");
      } else {
        setStatus("error");
        setMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Subscription submission error:", err);
      setStatus("error");
      setMessage("Connection error. Please check your network and try again.");
    }
  };

  return (
    <div className="mt-20 p-8 md:p-12 bg-gray-50 rounded-[2rem] text-center border border-gray-100 shadow-sm max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Get immigration updates</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto text-sm">
        Join 5,000+ others who receive our weekly newsletter on latest visa policies and success stories.
      </p>

      {status === "success" ? (
        <div className="bg-green-50 border border-green-200 text-green-700 font-semibold px-6 py-4 rounded-2xl max-w-md mx-auto text-sm transition-all duration-300">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={status === "loading"}
            className="flex-grow px-6 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-yellow-100 hover:shadow-yellow-200 active:scale-[0.98] text-sm disabled:bg-yellow-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
          >
            {status === "loading" ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="text-red-500 text-xs mt-3 font-semibold transition-all duration-300">{message}</p>
      )}
    </div>
  );
}
