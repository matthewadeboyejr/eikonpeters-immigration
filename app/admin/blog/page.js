"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
   FaPlus, 
   FaEdit, 
   FaTrashAlt, 
   FaEye, 
   FaSearch, 
   FaVideo, 
   FaImage 
} from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { useToast } from "@/context/ToastContext";

export default function AdminBlogManagement() {
  const [posts, setPosts] = useState([]);
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function loadPosts() {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("id", { ascending: false });

        if (error) {
          console.error("Error loading blog posts:", error);
          return;
        }

        if (data) {
          setPosts(data);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, []);

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const confirmDelete = async () => {
    if (!deleteModal.id) return;

    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", deleteModal.id);

      if (error) {
        showToast("Error deleting post: " + error.message, "error");
        return;
      }

      setPosts((prev) => prev.filter((p) => p.id !== deleteModal.id));
      showToast("Blog post deleted successfully!", "success");
    } catch (err) {
      showToast("Failed to delete post.", "error");
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
        <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">Loading Posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-500">Create, edit and manage your blog articles.</p>
        </div>
        <Link 
          id="blog-new-btn"
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-yellow-200"
        >
          <FaPlus />
          New Post
        </Link>
      </div>

      {/* Search Bar */}
      <div id="blog-search-bar" className="relative max-w-md">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Posts Table */}
      <div id="blog-list-table" className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Article</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Media</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-300">
                          {post.image ? (
                            <img src={post.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <FaImage />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{post.title}</h4>
                          <p className="text-xs text-gray-400">/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2 text-xs">
                        {post.image && <FaImage className="text-blue-400" title="Has Image" />}
                        {post.video_url && <FaVideo className="text-purple-400" title="Has Video" />}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {post.date}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                          title="View"
                        >
                          <FaEye />
                        </Link>
                        <Link 
                          href={`/admin/blog/new?id=${post.id}`}
                          className="p-2 text-gray-400 hover:text-yellow-600 transition-colors" 
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button 
                          onClick={() => setDeleteModal({ isOpen: true, id: post.id })}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors" 
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                    No articles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone and the post will be permanently removed."
      />
    </div>
  );
}
