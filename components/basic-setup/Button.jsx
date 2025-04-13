import React from "react";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import { motion } from "motion/react";

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

export const Button = ({ title, style, route, viewicon }) => {
  return (
    <motion.button
      className={`${style} inline-flex items-center transition-colors`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(route)}
    >
      <FaSearch className={`${viewicon} mr-2 `} />
      {title}
    </motion.button>
  );
};
