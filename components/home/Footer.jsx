"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) return null;

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6 md:px-20 lg:px-40 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Company Info */}
        <div className="space-y-4">
          <Image
            className="w-40 brightness-0 invert"
            src="/images/Eikon-Peter-Social-Media.svg"
            alt="Eikon Peters Logo"
            width={200}
            height={200}
            priority
            unoptimized
          />
          <p className="text-sm text-gray-400 leading-relaxed mt-4">
            Eikon Peters Immigration Services is your trusted global immigration partner, providing professional guidance for work, study, family, and business visa pathways.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-yellow-500 transition-colors">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-500 transition-colors">About Us</a>
            </li>
            <li>
              <a href="/services" className="hover:text-yellow-500 transition-colors">Services</a>
            </li>
            <li>
              <a href="/blog" className="hover:text-yellow-500 transition-colors">Blog</a>
            </li>
            <li>
              <a href="/guides" className="hover:text-yellow-500 transition-colors">Guides</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-yellow-500 transition-colors">Contact</a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-yellow-500 transition-colors">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-yellow-500" />
              <span>info@eikonpetersimmigration.com</span>
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-yellow-500 mt-1" />
              <span>United Kingdom based consultants</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimer Bar */}
      <div className="max-w-7xl mx-auto bg-green-900 rounded-2xl md:rounded-full px-6 py-4 md:py-3 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md mb-8">
        <p className="text-white text-center text-sm md:text-base font-medium">
          Eikon Peters Immigration Services Ltd is regulated by the Immigration Advice Authority (IAA) to provide immigration advice and services at Level 1.
        </p>
        <img
          className="max-w-8 h-8 rounded-full"
          src="../images/iaa.png"
          alt="iaa logo"
        />
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Eikon Peters Immigration Services. All rights reserved.</p>
        <p>Expert immigration consultation and visa support.</p>
      </div>
    </footer>
  );
};

export default Footer;
