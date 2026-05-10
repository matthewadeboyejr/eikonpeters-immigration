"use client";

import React, { useState } from "react";
import { 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaCamera,
  FaCheckCircle,
  FaSave
} from "react-icons/fa";

export default function AdminProfile() {
  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@eikonpeters.com",
    role: "Super Admin",
    bio: "Managing the Eikon Peters Immigration platform content and leads."
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
        <p className="text-gray-500">Manage your personal information and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
             <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 text-4xl font-bold border-4 border-white shadow-md">
                   {formData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center border-4 border-white hover:bg-yellow-500 transition-colors">
                  <FaCamera size={14} />
                </button>
             </div>
             <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
             <p className="text-sm text-yellow-600 font-bold uppercase tracking-widest mt-1">{formData.role}</p>
             <p className="text-xs text-gray-400 mt-4 leading-relaxed">
               {formData.bio}
             </p>
          </div>

          <div className="bg-gray-900 rounded-3xl p-6 text-white overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
             <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
               <FaCheckCircle className="text-yellow-500" /> Account Status
             </h3>
             <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Verified Email</span>
                  <span className="text-green-400 font-bold">Yes</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">2FA Enabled</span>
                  <span className="text-yellow-500 font-bold">No</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Last Login</span>
                  <span className="text-gray-300">Today, 10:45 AM</span>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="md:col-span-2 space-y-6">
          {/* General Information */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaUser className="text-yellow-500" /> General Information
            </h3>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Short Bio</label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 outline-none transition-all"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                ></textarea>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                <p className={`text-sm font-medium text-green-600 flex items-center gap-2 transition-opacity ${isSuccess ? 'opacity-100' : 'opacity-0'}`}>
                  <FaCheckCircle /> Changes saved successfully!
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-yellow-100"
                >
                  <FaSave />
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaLock className="text-red-500" /> Security & Password
            </h3>
            <div className="space-y-4">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 outline-none transition-all"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 outline-none transition-all"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 outline-none transition-all"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    />
                  </div>
                </div>
                <div className="pt-4">
                   <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg">
                     Update Password
                   </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
