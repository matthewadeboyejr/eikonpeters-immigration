"use client";

import React, { useState, useEffect } from "react";
import { 
  FaUsers, 
  FaSearch, 
  FaDownload, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaFilter,
  FaTrashAlt
} from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { useToast } from "@/context/ToastContext";

export default function AdminLeadsManagement() {
  const [leads, setLeads] = useState([]);
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function loadLeads() {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("id", { ascending: false });

        if (error) {
          console.error("Error loading leads:", error);
          return;
        }

        if (data) {
          setLeads(data);
        }
      } catch (err) {
        console.error("Error fetching leads:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLeads();
  }, []);

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const confirmDelete = async () => {
    if (!deleteModal.id) return;

    try {
      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", deleteModal.id);

      if (error) {
        showToast("Error deleting lead: " + error.message, "error");
        return;
      }

      setLeads((prev) => prev.filter((l) => l.id !== deleteModal.id));
      showToast("Lead deleted successfully!", "success");
    } catch (err) {
      showToast("Failed to delete lead.", "error");
    }
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
        <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">Loading Leads...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-gray-500">Track and manage users who downloaded your guides.</p>
        </div>
        <button 
          id="leads-export-btn"
          className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:bg-gray-800"
        >
          <FaDownload />
          Export Leads
        </button>
      </div>

      {/* Filters & Search */}
      <div id="leads-search-bar" className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button className="flex-grow md:flex-grow-0 inline-flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all">
             <FaFilter />
             Status
           </button>
        </div>
      </div>

      {/* Leads Table */}
      <div id="leads-list-table" className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Lead Info</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Downloaded Resource</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-xs">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{lead.name}</h4>
                          <p className="text-xs text-gray-400">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-gray-700 font-medium">{lead.guide}</span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        lead.status === 'New' ? 'bg-blue-50 text-blue-600' :
                        lead.status === 'Contacted' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-green-50 text-green-600'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a href={`mailto:${lead.email}`} className="p-2 text-gray-400 hover:text-blue-500 transition-colors" title="Email">
                          <FaEnvelope />
                        </a>
                        <button 
                          onClick={() => setDeleteModal({ isOpen: true, id: lead.id })}
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
                    No leads found
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
        title="Delete Captured Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone and the record will be permanently removed."
      />
    </div>
  );
}
