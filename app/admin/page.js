"use client";

import React from "react";
import { 
  FaFileAlt, 
  FaBookOpen, 
  FaUsers, 
  FaArrowUp, 
  FaCalendarAlt 
} from "react-icons/fa";
import { blogPosts } from "@/data/blogPosts";
import { guides } from "@/data/guides";

const StatCard = ({ title, value, icon, trend, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} text-white`}>
        {icon}
      </div>
      <span className="flex items-center text-xs font-bold text-green-500">
        <FaArrowUp className="mr-1" /> {trend}
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome to your management dashboard.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Blog Posts" 
          value={blogPosts.length} 
          icon={<FaFileAlt />} 
          trend="+12%" 
          color="bg-blue-500"
        />
        <StatCard 
          title="Total Guides" 
          value={guides.length} 
          icon={<FaBookOpen />} 
          trend="+5%" 
          color="bg-purple-500"
        />
        <StatCard 
          title="Total Leads" 
          value="124" 
          icon={<FaUsers />} 
          trend="+18%" 
          color="bg-green-500"
        />
        <StatCard 
          title="Next Consultation" 
          value="2h 15m" 
          icon={<FaCalendarAlt />} 
          trend="Upcoming" 
          color="bg-yellow-500"
        />
      </div>

      {/* Recent Activity Section (Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Blog Posts</h2>
          <div className="space-y-4">
            {blogPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{post.title}</h4>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
                <button className="text-yellow-600 text-xs font-bold hover:underline">Edit</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Latest Leads</h2>
          <div className="space-y-4">
            {[
              { name: "Sarah Johnson", email: "sarah@example.com", guide: "UK Immigration 2026" },
              { name: "Michael Chen", email: "m.chen@example.com", guide: "Self-Sponsorship Checklist" },
              { name: "Elena Rodriguez", email: "elena.r@example.com", guide: "Global Talent Visa Roadmap" }
            ].map((lead, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{lead.name}</h4>
                  <p className="text-xs text-gray-500">{lead.email}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded uppercase">
                    New
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">{lead.guide}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
