import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDownload, FaCheckCircle } from "react-icons/fa";

const LeadFormModal = ({ isOpen, onClose, guide }) => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // In a real app, this would trigger the actual file download
    console.log(`Downloading ${guide.title} for ${formData.name} (${formData.email})`);
    
    // Auto close after 3 seconds on success
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setFormData({ name: "", email: "" });
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <FaTimes size={24} />
            </button>

            <div className="p-8">
              {!isSuccess ? (
                <>
                  <div className="text-center mb-8">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaDownload className="text-yellow-600 text-2xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Get Your Free Guide</h2>
                    <p className="text-gray-600 mt-2 text-sm">
                      Enter your details below to receive the <span className="font-semibold text-gray-900">"{guide?.title}"</span> directly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-yellow-200 flex items-center justify-center disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        "Download Now"
                      )}
                    </button>
                    <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest mt-4">
                      We respect your privacy. No spam, ever.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <FaCheckCircle className="text-green-500 text-4xl" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-900">Awesome!</h2>
                  <p className="text-gray-600 mt-2">
                    Your guide is ready. We've also sent a copy to your email at <span className="font-semibold">{formData.email}</span>.
                  </p>
                  <div className="mt-8">
                     <div className="inline-flex items-center text-green-600 font-bold">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-ping mr-2"></div>
                       Starting Download...
                     </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadFormModal;
