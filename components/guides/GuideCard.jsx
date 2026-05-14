import React from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

const GuideCard = ({ guide, onDownload }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={guide.thumbnail}
          alt={guide.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-yellow-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            {guide.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <button 
             onClick={() => onDownload(guide)}
             className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold flex items-center shadow-lg hover:bg-yellow-500 hover:text-white transition-colors"
           >
             <FaDownload className="mr-2" />
             Get Guide
           </button>
        </div>
      </div>

      <div className="p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
          {guide.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {guide.description}
        </p>
        <button
          onClick={() => onDownload(guide)}
          className="text-yellow-600 font-bold text-sm hover:underline flex items-center justify-center mx-auto"
        >
          Download PDF Guide
          <FaDownload className="ml-2 text-xs" />
        </button>
      </div>
    </motion.div>
  );
};

export default GuideCard;
