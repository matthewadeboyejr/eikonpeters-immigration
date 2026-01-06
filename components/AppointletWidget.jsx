"use client";

import { useState, useEffect } from "react";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";

export default function AppointletWidget({ setOpenBookWidget }) {
  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={() => setOpenBookWidget(false)}
      >
        <div
          className="bg-transparent w-full max-w-4xl h-[90vh] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setOpenBookWidget(false)}
            className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-200 rounded-full p-2 transition-colors shadow-lg"
            aria-label="Close"
          >
            <FaTimes className="text-gray-700 text-xl" />
          </button>

          <div className="w-full h-full overflow-hidden">
            <iframe
              src="https://appt.link/eikon-peters-immigration/immigration-consultation"
              className="w-full h-full border-0"
              title="Book Consultation"
              allow="camera; microphone; geolocation"
            />
          </div>
        </div>
      </div>

      <div
        className="appointlet-inline"
        data-appointlet-inline="https://appt.link/eikon-peters-immigration/immigration-consultation"
        style={{ display: "none" }}
      />
    </>
  );
}
