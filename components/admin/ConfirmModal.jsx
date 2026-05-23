"use client";

import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete", cancelText = "Cancel" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl border border-gray-100 transform scale-100 transition-all duration-300 ease-out animate-in fade-in zoom-in-95">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-6 border border-red-100 animate-bounce">
            <FaExclamationTriangle size={24} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {title || "Are you sure?"}
          </h3>

          {/* Message */}
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            {message || "This action cannot be undone. Please confirm to proceed."}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-5 py-3 rounded-2xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100 transition-all outline-none"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-5 py-3 rounded-2xl bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-bold shadow-lg shadow-red-200 hover:shadow-red-300 transition-all outline-none"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
