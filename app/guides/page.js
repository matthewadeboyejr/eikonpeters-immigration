"use client";

import React, { useState, useMemo } from "react";
import { guides } from "@/data/guides";
import GuideCard from "@/components/guides/GuideCard";
import LeadFormModal from "@/components/guides/LeadFormModal";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaSearch, FaFire, FaClock, FaStar, FaChevronRight } from "react-icons/fa";
import AppointletWidget from "@/components/AppointletWidget";

export default function GuidesPage() {
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openBookWidget, setOpenBookWidget] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [activeTab, setActiveTab] = useState("Latest"); // Latest, Popular, Featured

  const categories = useMemo(() => ["All", ...new Set(guides.map((g) => g.category))], []);
  const allTags = useMemo(() => ["All", ...new Set(guides.flatMap((g) => g.tags))], []);
  
  const featuredGuide = useMemo(() => guides.find(g => g.isFeatured), []);

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        guide.title.toLowerCase().includes(searchLower) || 
        guide.description.toLowerCase().includes(searchLower) ||
        guide.category.toLowerCase().includes(searchLower) ||
        guide.tags.some(tag => tag.toLowerCase().includes(searchLower));

      const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
      const matchesTag = selectedTag === "All" || guide.tags.includes(selectedTag);

      let matchesTab = true;
      if (activeTab === "Featured") matchesTab = guide.isFeatured;
      if (activeTab === "Popular") matchesTab = guide.isPopular;

      return matchesSearch && matchesCategory && matchesTag && matchesTab;
    }).sort((a, b) => {
      if (activeTab === "Latest") {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedTag, activeTab]);

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

        {/* Featured Hero (Only shown on Latest/All when no search/filter) */}
        {!searchTerm && selectedCategory === "All" && selectedTag === "All" && activeTab === "Latest" && featuredGuide && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-20 bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col lg:flex-row group"
          >
            <div className="lg:w-1/2 relative overflow-hidden h-[300px] lg:h-auto">
              <img 
                src={featuredGuide.thumbnail} 
                alt={featuredGuide.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-yellow-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  Featured Guide
                </span>
              </div>
            </div>
            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center text-left">
              <div className="flex items-center gap-4 text-xs font-bold text-yellow-600 uppercase tracking-widest mb-6">
                <span>{featuredGuide.category}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-gray-400">Updated {featuredGuide.date}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {featuredGuide.title}
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed line-clamp-3">
                {featuredGuide.description}
              </p>
              <button 
                onClick={() => handleDownload(featuredGuide)}
                className="inline-flex items-center text-gray-900 font-black uppercase tracking-widest text-sm hover:text-yellow-600 transition-colors group/link"
              >
                Download Featured Guide
                <FaChevronRight className="ml-3 transition-transform group-hover/link:translate-x-2" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Search & Main Filter Bar */}
        <div className="space-y-6 mb-12">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:max-w-md">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search guides, visa types, or topics..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl border border-gray-50 bg-gray-50/50 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 outline-none transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl w-full lg:w-auto">
              {[
                { id: "Latest", icon: FaClock },
                { id: "Popular", icon: FaFire },
                { id: "Featured", icon: FaStar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className={activeTab === tab.id ? "text-yellow-500" : "text-gray-400"} />
                  {tab.id}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Filters: Categories & Topics */}
          <div className="flex flex-col gap-4">
            {/* Visa Categories */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400 whitespace-nowrap min-w-[120px] text-left">Visa Categories:</span>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                      selectedCategory === category
                        ? "bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-200"
                        : "bg-white text-gray-600 border-gray-100 hover:border-yellow-500 hover:text-yellow-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Topics (Tags) */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400 whitespace-nowrap min-w-[120px] text-left">Topics:</span>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                      selectedTag === tag
                        ? "bg-yellow-500 text-white border-yellow-500 shadow-lg shadow-yellow-100"
                        : "bg-white text-gray-600 border-gray-100 hover:border-yellow-500 hover:text-yellow-600"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Guides Listing */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedTag}-${activeTab}-${searchTerm}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <GuideCard 
                    key={guide.id} 
                    guide={guide} 
                    onDownload={handleDownload} 
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <h3 className="text-2xl font-semibold text-gray-400">No guides found matching your criteria.</h3>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
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
             <button 
               onClick={() => setOpenBookWidget(true)}
               className="inline-flex items-center primary-btn px-10 py-5 transition-all shadow-xl shadow-yellow-500/20 whitespace-nowrap"
             >
               <FaCalendarAlt className="mr-3 text-xl" />
               <span className="text-lg font-bold">Book Consultation</span>
             </button>
           </div>
        </div>
      </div>

      {/* Lead Form Modal */}
      <LeadFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        guide={selectedGuide} 
      />

      {openBookWidget && (
        <AppointletWidget setOpenBookWidget={setOpenBookWidget} />
      )}
    </main>
  );
}
