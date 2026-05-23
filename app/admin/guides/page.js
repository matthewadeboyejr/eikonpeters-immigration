"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FaPlus, 
  FaEdit, 
  FaTrashAlt, 
  FaEye, 
  FaSearch, 
  FaFilePdf, 
  FaImage,
  FaDownload
} from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { useToast } from "@/context/ToastContext";

export default function AdminGuidesManagement() {
  const [guides, setGuides] = useState([]);
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function loadGuides() {
      try {
        const { data, error } = await supabase
          .from("guides")
          .select("*")
          .order("id", { ascending: false });

        if (error) {
          console.error("Error loading guides:", error);
          return;
        }

        if (data) {
          setGuides(data);
        }
      } catch (err) {
        console.error("Error fetching guides:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadGuides();
  }, []);

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const confirmDelete = async () => {
    if (!deleteModal.id) return;

    try {
      const { error } = await supabase
        .from("guides")
        .delete()
        .eq("id", deleteModal.id);

      if (error) {
        showToast("Error deleting guide: " + error.message, "error");
        return;
      }

      setGuides((prev) => prev.filter((g) => g.id !== deleteModal.id));
      showToast("Guide deleted successfully!", "success");
    } catch (err) {
      showToast("Failed to delete guide.", "error");
    }
  };

  const filteredGuides = guides.filter((guide) =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
        <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">Loading Guides...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guides Management</h1>
          <p className="text-gray-500">Manage your downloadable resources and checklists.</p>
        </div>
        <Link 
          id="guide-new-btn"
          href="/admin/guides/new"
          className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-yellow-200"
        >
          <FaPlus />
          New Guide
        </Link>
      </div>

      {/* Search Bar */}
      <div id="guide-search-bar" className="relative max-w-md">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search guides..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Guides Table */}
      <div id="guide-list-table" className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Guide</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <tr key={guide.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-300">
                          {guide.image ? (
                            <img src={guide.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <FaImage />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{guide.title}</h4>
                          <p className="text-xs text-gray-400">{guide.pages} Pages • {guide.file_size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase">
                        <FaFilePdf />
                        PDF
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                        {guide.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href="/guides"
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                          title="View"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          href={`/admin/guides/new?id=${guide.id}`}
                          className="p-2 text-gray-400 hover:text-yellow-600 transition-colors" 
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button 
                          onClick={() => setDeleteModal({ isOpen: true, id: guide.id })}
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
                  <td colSpan="4" className="px-6 py-10 text-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                    No guides found
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
        title="Delete PDF Guide"
        message="Are you sure you want to delete this guide? This action cannot be undone and the resource will be permanently removed."
      />
    </div>
  );
}
