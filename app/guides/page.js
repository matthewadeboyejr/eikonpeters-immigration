"use client";

import React, { useState } from "react";
import { guides } from "@/data/guides";
import GuideCard from "@/components/guides/GuideCard";
import LeadFormModal from "@/components/guides/LeadFormModal";
import { motion } from "framer-motion";

export default function GuidesPage() {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = (guide) => {
    setSelectedGuide(guide);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-yellow-600 font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Resource Library
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Immigration <span className="text-yellow-500">Guides</span> & Checklists
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Download our free expert-crafted resources to help you prepare for your application and understand the relocation process.
          </motion.p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {guides.map((guide) => (
            <GuideCard 
              key={guide.id} 
              guide={guide} 
              onDownload={handleDownload} 
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gray-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
           
           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Personalized Advice?</h2>
             <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
               Our guides are a great starting point, but every case is unique. Book a one-on-one consultation with our experts today.
             </p>
             <a 
               href="/contact"
               className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl shadow-yellow-500/20"
             >
               Book Your Consultation
             </a>
           </div>
        </div>
      </div>

      {/* Lead Form Modal */}
      <LeadFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        guide={selectedGuide} 
      />
    </main>
  );
}
