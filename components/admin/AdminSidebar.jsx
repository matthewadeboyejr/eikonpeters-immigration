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
  FaUser
} from "react-icons/fa";
import Image from "next/image";

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: <FaThLarge />, path: "/admin" },
    { name: "Blog Posts", icon: <FaFileAlt />, path: "/admin/blog" },
    { name: "Guides & PDFs", icon: <FaBookOpen />, path: "/admin/guides" },
    { name: "Leads", icon: <FaUsers />, path: "/admin/leads" },
    { name: "Analytics", icon: <FaChartLine />, path: "/admin/analytics" },
    { name: "Profile", icon: <FaUser />, path: "/admin/profile" },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col fixed left-0 top-0 z-50">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/Eikon-Peter-Social-Media.svg"
            alt="Logo"
            width={40}
            height={40}
            className="bg-white rounded-lg p-1"
          />
          <span className="font-bold text-xl tracking-tight group-hover:text-yellow-500 transition-colors">Admin</span>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-grow p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/20" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-800">
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white transition-colors mb-2"
        >
          <FaHome />
          <span className="text-sm font-medium">Back to Website</span>
        </Link>
        <button 
          onClick={() => {
            localStorage.removeItem("admin_logged_in");
            window.location.href = "/admin/login";
          }}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all rounded-xl w-full"
        >
          <FaSignOutAlt />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
