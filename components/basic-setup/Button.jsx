import React from "react";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const BookButton = () => {
  return (
    <a
      href="https://booking.appointy.com/EikonImmigration"
      className="hidden md:inline-flex items-center primary-btn cursor-pointer"
    >
      <FaCalendarAlt className="mr-2" />
      Book Consultation
    </a>
  );
};

export default BookButton;

export const Button = ({ title, style, route, viewicon }) => {
  const router = useRouter();
  return (
    <motion.button
      className={`${style} inline-flex items-center transition-colors cursor-pointer`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(route)}
    >
      <FaSearch className={`${viewicon} mr-2 `} />
      {title}
    </motion.button>
  );
};
