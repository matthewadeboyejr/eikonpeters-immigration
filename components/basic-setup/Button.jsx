import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const BookButton = () => {
  return (
    <a
      href="https://forms.gle/SdekGucyTiim16Yh6"
      className="hidden md:inline-flex items-center primary-btn"
    >
      <FaCalendarAlt className="mr-2" />
      Book Consultation
    </a>
  );
};

export default BookButton;
