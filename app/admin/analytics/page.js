"use client";

import React from "react";
import { 
  FaChartLine, 
  FaUsers, 
  FaFileAlt, 
  FaDownload,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";

export default function AdminAnalytics() {
  const stats = [
    { name: "Total Visitors", value: "12,450", change: "+12.5%", trend: "up", icon: <FaUsers className="text-blue-500" /> },
    { name: "Blog Views", value: "4,210", change: "+5.2%", trend: "up", icon: <FaFileAlt className="text-purple-500" /> },
    { name: "Guide Downloads", value: "854", change: "+18.3%", trend: "up", icon: <FaDownload className="text-green-500" /> },
    { name: "Conversion Rate", value: "6.8%", change: "-1.2%", trend: "down", icon: <FaChartLine className="text-yellow-500" /> },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
          <p className="text-gray-500">Insights and performance metrics for your platform.</p>
        </div>
        <div className="flex gap-3">
           <select className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 outline-none focus:border-yellow-500">
             <option>Last 7 Days</option>
             <option>Last 30 Days</option>
             <option>Last 3 Months</option>
           </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xl">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.name}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-80 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
              <FaChartLine size={24} />
            </div>
            <h4 className="font-bold text-gray-900">Traffic Analysis</h4>
            <p className="text-sm text-gray-400 max-w-xs mt-2">Interactive traffic charts will appear here once connected to your analytics provider.</p>
         </div>
         <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-80 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-4">
              <FaDownload size={24} />
            </div>
            <h4 className="font-bold text-gray-900">Conversion Funnel</h4>
            <p className="text-sm text-gray-400 max-w-xs mt-2">Data visualizing the journey from visitor to guide downloader will be displayed here.</p>
         </div>
      </div>
    </div>
  );
}
