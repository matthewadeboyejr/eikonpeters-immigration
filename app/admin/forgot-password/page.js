"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FaChevronLeft, 
  FaEnvelope, 
  FaPaperPlane,
  FaCheckCircle,
  FaShieldAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate recovery email sending
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-12 border border-gray-100 relative z-10"
      >
        <Link 
          href="/admin/login"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-600 mb-10 transition-colors group"
        >
          <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8">
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                  <FaShieldAlt size={28} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Password Recovery</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Enter your administrative email address and we&apos;ll send you a secure link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Admin Email</label>
                  <div className="relative group">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                    <input
                      type="email"
                      required
                      placeholder="admin@eikonpeters.com"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/5 outline-none transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FaPaperPlane size={14} />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                <FaCheckCircle className="text-green-500 text-4xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Email Sent!</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                We&apos;ve sent a recovery link to <span className="font-bold text-gray-900">{email}</span>. Please check your inbox and spam folder.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="text-yellow-600 font-bold hover:underline"
              >
                Try a different email
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-gray-50 text-center">
           <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
             Secured by Eikon Peters Cyber-Shield
           </p>
        </div>
      </motion.div>
    </div>
  );
}
