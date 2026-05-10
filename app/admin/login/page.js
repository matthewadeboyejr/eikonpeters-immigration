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
  FaCheckCircle
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLogin() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1); // 1: Login, 2: 2FA
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [twoFACode, setTwoFACode] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    setMounted(true);
  }, []);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setStep(2); 
  };

  const handle2FASubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate verification
    setTimeout(() => {
      localStorage.setItem("admin_logged_in", "true");
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        window.location.href = "/admin"; // Redirect to dashboard
      }, 1000);
    }, 1500);
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...twoFACode];
    newCode[index] = value;
    setTwoFACode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
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
                Protecting sensitive client data with enterprise-grade encryption and multi-factor authentication.
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
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Multi-Factor Active</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-8 uppercase tracking-[0.2em] font-medium">
              &copy; 2026 Eikon Peters Immigration Services
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-12 lg:p-20 flex flex-col justify-center">
          {step === 1 ? (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-500 text-sm">Please enter your administrative credentials.</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                    <div className="relative group">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                      <input
                        type="email"
                        required
                        placeholder="admin@eikonpeters.com"
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/5 outline-none transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Security Password</label>
                    <div className="relative group">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/5 outline-none transition-all"
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
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500" />
                    <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Remember this device</span>
                  </label>
                  <Link href="/admin/forgot-password" size="xs" className="text-xs font-bold text-yellow-600 hover:text-yellow-700">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    console.log("Button clicked!");
                    setStep(2);
                  }}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 relative overflow-hidden"
                >
                  Verify Credentials
                  <FaArrowRight size={14} />
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-8 text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-yellow-600 text-3xl" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Two-Step Verification</h2>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">
                  We&apos;ve sent a 6-digit security code to your registered mobile device.
                </p>
              </div>

              <form onSubmit={handle2FASubmit} className="space-y-8">
                <div className="flex justify-center gap-3">
                  {twoFACode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      className="w-12 h-16 md:w-14 md:h-20 text-2xl font-bold text-center border border-gray-200 rounded-2xl focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/5 outline-none transition-all"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !digit && index > 0) {
                          document.getElementById(`code-${index - 1}`).focus();
                        }
                      }}
                    />
                  ))}
                </div>

                <div className="space-y-6">
                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className={`w-full font-bold py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 ${isSuccess ? 'bg-green-500 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : isSuccess ? (
                      <>
                        <FaCheckCircle /> Access Granted
                      </>
                    ) : (
                      "Verify and Unlock"
                    )}
                  </button>

                  <div className="text-sm">
                    <span className="text-gray-400">Didn&apos;t receive the code?</span>{" "}
                    <button type="button" className="text-yellow-600 font-bold hover:underline">Resend</button>
                  </div>
                </div>
              </form>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-gray-400 text-xs font-bold hover:text-gray-600 transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
