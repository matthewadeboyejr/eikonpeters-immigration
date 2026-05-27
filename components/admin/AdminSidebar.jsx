"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaThLarge,
  FaFileAlt,
  FaBookOpen,
  FaUsers,
  FaChartLine,
  FaSignOutAlt,
  FaHome,
  FaUser,
  FaUserShield,
  FaTags,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const menuItems = [
  { name: "Overview",     icon: <FaThLarge />,    path: "/admin" },
  { name: "Blog Posts",   icon: <FaFileAlt />,    path: "/admin/blog" },
  { name: "Guides & PDFs",icon: <FaBookOpen />,   path: "/admin/guides" },
  { name: "Categories",   icon: <FaTags />,       path: "/admin/categories" },
  { name: "Leads",        icon: <FaUsers />,      path: "/admin/leads" },
  { name: "Admins",       icon: <FaUserShield />, path: "/admin/admins" },
  { name: "Analytics",    icon: <FaChartLine />,  path: "/admin/analytics" },
  { name: "Profile",      icon: <FaUser />,       path: "/admin/profile" },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const supabase = createClient();

  const handleNavClick = () => {
    // Close the drawer on mobile when a nav link is tapped
    if (onClose) onClose();
  };

  return (
    <>
      {/* ── Sidebar panel ──────────────────────────────────────────────── */}
      <div
        className={`
          fixed left-0 top-0 z-50 h-screen w-64 bg-gray-900 text-white flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" onClick={handleNavClick}>
            <Image
              src="/images/Eikon-Peter-Social-Media.svg"
              alt="Logo"
              width={40}
              height={40}
              className="bg-white rounded-lg p-1"
            />
            <span className="font-bold text-xl tracking-tight group-hover:text-yellow-500 transition-colors">
              Admin
            </span>
          </Link>

          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        {/* Nav items */}
        <nav id="sidebar-nav" className="flex-grow p-4 space-y-1 mt-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/20"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <Link
            href="/"
            onClick={handleNavClick}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors mb-1 rounded-xl hover:bg-gray-800"
          >
            <FaHome className="flex-shrink-0" />
            <span className="text-sm font-medium">Back to Website</span>
          </Link>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              localStorage.removeItem("admin_logged_in");
              window.location.href = "/admin/login";
            }}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all rounded-xl w-full"
          >
            <FaSignOutAlt className="flex-shrink-0" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
