"use client";

import React, { useState, useEffect } from "react";
import { 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaCamera,
  FaCheckCircle,
  FaSave
} from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";

export default function AdminProfile() {
  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "",
    role: "Super Admin",
    bio: ""
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [pwdError, setPwdError] = useState("");
  const [user, setUser] = useState(null);

  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          setUser(currentUser);
          
          const { data: admin, error } = await supabase
            .from("admins")
            .select("name, email, role, bio")
            .eq("id", currentUser.id)
            .maybeSingle();

          if (admin) {
            setFormData({
              name: admin.name || "Admin User",
              email: admin.email || currentUser.email,
              role: admin.role || "Super Admin",
              bio: admin.bio || ""
            });
          }
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    setErrorMsg("");

    if (!user) return;

    try {
      // 1. Update the database table 'admins'
      const { error: dbError } = await supabase
        .from("admins")
        .update({
          name: formData.name,
          bio: formData.bio,
          email: formData.email
        })
        .eq("id", user.id);

      if (dbError) {
        setErrorMsg(dbError.message);
        return;
      }

      // 2. Optional: update user metadata in auth
      await supabase.auth.updateUser({
        email: formData.email,
        data: { name: formData.name }
      });

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      setErrorMsg("Failed to update profile. Please try again.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwdSuccess(false);
    setPwdError("");

    if (passwords.new !== passwords.confirm) {
      setPwdError("Passwords do not match!");
      return;
    }

    if (passwords.new.length < 6) {
      setPwdError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      });

      if (error) {
        setPwdError(error.message);
        return;
      }

      setPwdSuccess(true);
      setPasswords({ current: "", new: "", confirm: "" });
      setTimeout(() => setPwdSuccess(false), 3000);
    } catch (err) {
      setPwdError("Failed to update password.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
        <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">Loading Profile...</p>
      </div>
    );
  }

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
               {formData.bio || "No bio added yet."}
             </p>
          </div>

          <div id="profile-status-card" className="bg-gray-900 rounded-3xl p-6 text-white overflow-hidden relative">
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
                   <span className="text-gray-400">Security Access</span>
                   <span className="text-gray-300">Level 1 (Admin)</span>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="md:col-span-2 space-y-6">
          {/* General Information */}
          <div id="profile-general-card" className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaUser className="text-yellow-500" /> General Information
            </h3>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
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

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
                </div>
              )}

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
          <div id="profile-security-card" className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaLock className="text-red-500" /> Security & Password
            </h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
               <div>
                  <p className="text-xs text-gray-400 mb-4">
                    For security, updating password will modify your account credentials immediately.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      required
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
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 outline-none transition-all"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    />
                  </div>
                </div>

                {pwdError && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-xs text-red-600 font-semibold">{pwdError}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                   <p className={`text-sm font-medium text-green-600 flex items-center gap-2 transition-opacity ${pwdSuccess ? 'opacity-100' : 'opacity-0'}`}>
                     <FaCheckCircle /> Password updated successfully!
                   </p>
                   <button 
                     type="submit"
                     className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg"
                   >
                     Update Password
                   </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
