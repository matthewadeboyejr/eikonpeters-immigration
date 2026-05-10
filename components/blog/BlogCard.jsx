import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaChevronRight, FaPlay } from "react-icons/fa";

const BlogCard = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group"
    >
      <Link href={`/blog/${post.slug}`} className="relative overflow-hidden block aspect-[16/9]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {post.category}
          </span>
        </div>
        {post.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-yellow-600 shadow-lg transform group-hover:scale-110 transition-transform">
              <FaPlay className="ml-1" />
            </div>
          </div>
        )}
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-gray-500 text-xs mb-4 space-x-4">
          <span className="flex items-center">
            <FaCalendarAlt className="mr-1 text-yellow-500" />
            {post.date}
          </span>
          <span className="flex items-center">
            <FaUser className="mr-1 text-yellow-500" />
            {post.author}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center font-bold text-gray-900 hover:text-yellow-600 transition-colors text-sm"
        >
          Read More
          <FaChevronRight className="ml-2 text-xs transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
