"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";
import BookButton from "../basic-setup/Button";

const Footer = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const mobileMenuRef = useRef(null);

  // Navigation items with dropdowns
  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Services",
      path: "/services",
      dropdown: [
        { name: "Global Talent Visa", path: "/services" },
        { name: "Family Visa", path: "/services" },
        { name: "Student Visa", path: "/services" },
        { name: "Work Visa", path: "/services" },
        { name: "Business Visa", path: "/services" },
        { name: "Tourist Visa", path: "/services" },
      ],
    },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <>
      {/* Main Header */}
      <footer
        className="sticky top-0 z-50 transition-all duration-300 
         bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}

            <Image
              className=" w-36 "
              src="/images/Eikon-Peter-Social-Media.svg"
              alt="Logo"
              width={200}
              height={200}
              priority
              unoptimized
            />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center">
                    <a
                      href={item.path}
                      className="px-4 py-2 font-medium text-gray-800 hover:text-yellow-600 transition-colors"
                    >
                      {item.name}
                    </a>
                  </div>

                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-xl z-50 border border-gray-100"
                        >
                          {item.dropdown.map((subItem, subIndex) => (
                            <a
                              key={subIndex}
                              href={subItem.path}
                              className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-yellow-600 transition-colors border-b border-gray-100 last:border-0"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-white shadow-lg overflow-hidden"
          ref={mobileMenuRef}
        >
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 last:border-0"
              >
                <div className="flex justify-between items-center py-3">
                  <a
                    href={item.path}
                    className="font-medium text-gray-800 hover:text-yellow-600 transition-colors"
                  >
                    {item.name}
                  </a>
                  {item.dropdown && (
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="p-2 text-gray-500 hover:text-yellow-600 focus:outline-none"
                    >
                      {activeDropdown === index ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                  )}
                </div>

                {item.dropdown && activeDropdown === index && (
                  <div className="pl-4 pb-2 space-y-2">
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.path}
                        className="block py-2 text-gray-600 hover:text-yellow-600 transition-colors"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
        {/* Disclaimer  Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-green-900 md:rounded-full md:mx-5  px-6 py-2   flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md"
        >
          <p className="text-white text-center text-sm sm:text-base font-medium flex items-center gap-3">
            <span>
              Eikon Peters Immigration Services Ltd is regulated by the
              Immigration Advice Authority <code>(IAA)</code> to provide
              immigration advice and services at Level 1
            </span>
          </p>
          <img
            className="max-w-7 h-7 rounded-full"
            src="../images/iaa.png"
            alt="iaa logo"
          />
        </motion.div>
      </footer>
    </>
  );
};

export default Footer;
