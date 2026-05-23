"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              className="pointer-events-auto bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 flex items-start gap-3 w-full relative overflow-hidden"
            >
              {/* Type Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {toast.type === "success" && (
                  <FaCheckCircle className="text-green-500 text-lg animate-pulse" />
                )}
                {toast.type === "error" && (
                  <FaTimesCircle className="text-red-500 text-lg animate-pulse" />
                )}
                {toast.type === "warning" && (
                  <FaExclamationCircle className="text-yellow-500 text-lg animate-pulse" />
                )}
              </div>

              {/* Message */}
              <div className="flex-grow pr-4">
                <p className="text-sm font-semibold text-gray-900 leading-snug">
                  {toast.message}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50"
              >
                <FaTimes size={12} />
              </button>

              {/* Progress timer bar */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 4, ease: "linear" }}
                className={`absolute bottom-0 left-0 h-1 ${
                  toast.type === "success" ? "bg-green-500" :
                  toast.type === "error" ? "bg-red-500" : "bg-yellow-500"
                }`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
