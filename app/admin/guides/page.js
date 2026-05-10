"use client";

import React, { useState } from "react";
import { guides } from "@/data/guides";
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

export default function AdminGuidesManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGuides = guides.filter((guide) =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Guides Management</h1>
          <p className="text-gray-500">Manage your downloadable resources and checklists.</p>
        </div>
        <Link 
          href="/admin/guides/new"
          className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-yellow-200"
        >
          <FaPlus />
          New Guide
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
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
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Guide</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Downloads</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGuides.map((guide) => (
                <tr key={guide.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        {guide.image ? (
                          <img src={guide.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <FaImage />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{guide.title}</h4>
                        <p className="text-xs text-gray-400">{guide.pages} Pages • {guide.fileSize}</p>
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
                  <td className="px-6 py-5 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaDownload className="text-gray-300" />
                      {guide.downloads || 0}
                    </div>
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
                      <button className="p-2 text-gray-400 hover:text-yellow-600 transition-colors" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
