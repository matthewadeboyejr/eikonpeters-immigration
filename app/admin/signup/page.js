"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaFingerprint,
  FaArrowRight,
  FaCheckCircle,
  FaUser
} from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";

export default function AdminSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const supabase = createClient();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const emailTrimmed = formData.email.toLowerCase().trim();

      // ── Step 1: Check whitelist BEFORE creating any Supabase account ──
      const { data: isApproved, error: checkError } = await supabase.rpc(
        "is_email_approved",
        { input_email: emailTrimmed }
      );

      if (checkError || !isApproved) {
        setErrorMsg("Unauthorized: Your email address has not been pre-approved by a Super Admin. Contact your administrator to request access.");
        setIsLoading(false);
        return;
      }

      // ── Step 2: Email is whitelisted — proceed with registration ──
      const { data, error } = await supabase.auth.signUp({
        email: emailTrimmed,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      });

      if (error) {
        setErrorMsg(error.message);
        setIsLoading(false);
        return;
      }

      const user = data?.user;

      if (user && data?.session) {
        // Email confirmation is disabled — user is immediately logged in
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1000);
      } else {
        // Email confirmation is enabled — user must click the confirmation link
        setIsLoading(false);
        setSuccessMsg("Registration submitted! Please check your email for a confirmation link to activate your account.");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-gray-100">

        {/* Left Side: Branding & Security Message */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gray-900 text-white relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <Image src="/images/Eikon-Peter-Social-Media.svg" alt="Logo" width={48} height={48} className="bg-white rounded-xl p-1.5" />
              <span className="text-2xl font-bold tracking-tight">Eikon Peters</span>
            </div>

            <div className="space-y-6 max-w-sm">
              <h1 className="text-4xl font-bold leading-tight">
                Secure Portal for <br />
                <span className="text-yellow-500 text-3xl">Immigration Experts</span>
              </h1>
              <p className="text-gray-400 leading-relaxed">
                Protecting sensitive client data with enterprise-grade encryption and secure access control.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <FaShieldAlt className="text-yellow-500 mb-2" size={20} />
                <h4 className="text-sm font-bold">End-to-End</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Encrypted Session</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <FaFingerprint className="text-yellow-500 mb-2" size={20} />
                <h4 className="text-sm font-bold">Smart Login</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Secure Access Active</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-8 uppercase tracking-[0.2em] font-medium">
              &copy; 2026 Eikon Peters Immigration Services
            </p>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="p-12 lg:p-20 flex flex-col justify-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Admin Account</h2>
              <p className="text-gray-500 text-sm">Please register using your pre-approved email address.</p>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                  <div className="relative group">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/5 outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                  <div className="relative group">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                    <input
                      type="email"
                      required
                      placeholder="colleague@eikonpeters.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/5 outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Security Password</label>
                  <div className="relative group">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/5 outline-none transition-all"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Confirm Password</label>
                  <div className="relative group">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/5 outline-none transition-all"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
                </div>
              )}

              {successMsg && (
                <div className="p-3 bg-green-50 border border-green-100 rounded-xl">
                  <p className="text-xs text-green-700 font-semibold">{successMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className={`w-full font-bold py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 ${
                  isSuccess 
                    ? "bg-green-600 text-white shadow-green-100" 
                    : "bg-gray-900 hover:bg-gray-800 text-white shadow-gray-200"
                } disabled:opacity-50 mt-4`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : isSuccess ? (
                  <>
                    <FaCheckCircle /> Account Created! Redirecting...
                  </>
                ) : (
                  <>
                    Create Admin Account
                    <FaArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <span className="text-xs text-gray-500">Already registered?</span>{" "}
              <Link href="/admin/login" className="text-xs font-bold text-yellow-600 hover:text-yellow-700 transition-colors">
                Log In
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
