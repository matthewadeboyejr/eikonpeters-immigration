"use client";

import React, { useState, useMemo } from "react";
import { blogPosts } from "@/data/blogPosts";
import BlogList from "@/components/blog/BlogList";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaFire, FaClock, FaStar, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");
  const [activeTab, setActiveTab] = useState("Latest"); // Latest, Popular, Featured

  const categories = useMemo(() => ["All", ...new Set(blogPosts.map((post) => post.category))], []);
  const allTags = useMemo(() => ["All", ...new Set(blogPosts.flatMap((post) => post.tags))], []);

  const featuredPost = useMemo(() => blogPosts.find(post => post.isFeatured), []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        post.title.toLowerCase().includes(searchLower) || 
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.category.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower));

      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);

      let matchesTab = true;
      if (activeTab === "Featured") matchesTab = post.isFeatured;
      if (activeTab === "Popular") matchesTab = post.isPopular;
      // "Latest" is the default view, no specific flag but sorted by date

      return matchesSearch && matchesCategory && matchesTag && matchesTab;
    }).sort((a, b) => {
      if (activeTab === "Latest") {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
  }, [searchTerm, selectedCategory, selectedTag, activeTab]);

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
            Insights & Resources
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            The Eikon Immigration <span className="text-yellow-500">Blog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Expert advice, latest news, and comprehensive guides to help you navigate your immigration journey with confidence.
          </motion.p>
        </div>

        {/* Featured Hero (Only shown on Latest/All when no search/filter) */}
        {!searchTerm && selectedCategory === "All" && selectedTag === "All" && activeTab === "Latest" && featuredPost && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-20 bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col lg:flex-row group"
          >
            <div className="lg:w-1/2 relative overflow-hidden h-[300px] lg:h-auto">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-yellow-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                  Featured
                </span>
              </div>
            </div>
            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-xs font-bold text-yellow-600 uppercase tracking-widest mb-6">
                <span>{featuredPost.category}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-gray-400">{featuredPost.date}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center text-gray-900 font-black uppercase tracking-widest text-sm hover:text-yellow-600 transition-colors group/link"
              >
                Read Featured Post
                <FaChevronRight className="ml-3 transition-transform group-hover/link:translate-x-2" />
              </Link>
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
                placeholder="Search articles, categories, or topics..."
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
              <span className="text-xs font-black uppercase tracking-widest text-gray-400 whitespace-nowrap min-w-[120px]">Visa Categories:</span>
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
              <span className="text-xs font-black uppercase tracking-widest text-gray-400 whitespace-nowrap min-w-[120px]">Topics:</span>
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

        {/* Blog Listing with AnimatePresence for smooth transitions */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedTag}-${activeTab}-${searchTerm}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BlogList posts={filteredPosts} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
