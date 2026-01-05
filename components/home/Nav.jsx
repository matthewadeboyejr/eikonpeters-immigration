"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
} from "react-icons/fa";
import Image from "next/image";
import { Button } from "../basic-setup/Button";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    }
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-yellow-500 text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a
              href="tel:+11234567890"
              className="flex items-center hover:text-blue-100 transition-colors"
            >
              <FaPhone className="mr-2" />
              <span>+447557882523</span>
            </a>
            <a
              href="mailto:info@immigro.com"
              className="flex items-center hover:text-blue-100 transition-colors"
            >
              <FaEnvelope className="mr-2" />
              <span>info@eikonpetersimmigration.com</span>
            </a>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>Bolton, UK</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/*   <a
              href="/login"
              className="flex items-center hover:text-blue-100 transition-colors"
            >
              <FaUser className="mr-2" />
              <span>Login</span>
            </a> */}
            <a href="/" className="secondary-btn  ">
              Free Assessment
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white"
        }`}
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
                    {item.dropdown && (
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="pr-2 text-gray-500 hover:text-yellow-600 focus:outline-none"
                      >
                        {activeDropdown === index ? (
                          <FaChevronUp size={12} />
                        ) : (
                          <FaChevronDown size={12} />
                        )}
                      </button>
                    )}
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

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <a
                href="https://appt.link/eikon-peters-immigration/immigration-consultation"
                className="hidden md:inline-flex items-center primary-btn"
              >
                <FaCalendarAlt className="mr-2" />
                Book Consultation
              </a>
              <button
                className="lg:hidden p-2 text-gray-700 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={24} />
                ) : (
                  <FaBars size={24} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
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
                <div className="pt-4 space-y-3">
                  <Button
                    title={"Free Assessment"}
                    style={"secondary-btn"}
                    route={"/contact"}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Nav;
