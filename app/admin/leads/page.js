"use client";

import React, { useState, useEffect } from "react";
import { 
  FaUsers, 
  FaSearch, 
  FaDownload, 
  FaEnvelope, 
  FaFilter, 
  FaTrashAlt,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { useToast } from "@/context/ToastContext";

export default function AdminLeadsManagement() {
  const [leads, setLeads] = useState([]);
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Email sending states
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [templateType, setTemplateType] = useState("general");
  const [isSending, setIsSending] = useState(false);

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

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

  const handleExport = () => {
    if (filteredLeads.length === 0) {
      showToast("No leads to export!", "warning");
      return;
    }

    // Define the CSV headers
    const headers = ["ID", "Name", "Email", "Downloaded Guide", "Status", "Date Captured"];
    
    // Map the leads to rows, escape strings to prevent breakages
    const csvRows = filteredLeads.map(lead => [
      lead.id,
      `"${(lead.name || "").replace(/"/g, '""')}"`,
      `"${(lead.email || "").replace(/"/g, '""')}"`,
      `"${(lead.guide || "").replace(/"/g, '""')}"`,
      `"${(lead.status || "").replace(/"/g, '""')}"`,
      `"${new Date(lead.created_at || new Date()).toLocaleString()}"`
    ]);

    // Combine headers and rows
    const csvContent = [headers.join(","), ...csvRows.map(e => e.join(","))].join("\n");

    // Create a blob and trigger a download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `eikon_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("Leads exported successfully!", "success");
  };

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
      setSelectedLeads((prev) => prev.filter((id) => id !== deleteModal.id)); // Clear from selection
      showToast("Lead deleted successfully!", "success");
    } catch (err) {
      showToast("Failed to delete lead.", "error");
    }
  };

  const filteredLeads = leads.filter((lead) =>
    (lead.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Checkbox select handlers
  const toggleSelectLead = (id) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map((l) => l.id));
    }
  };

  // Compose email for individual lead directly
  const handleOpenIndividualCompose = (lead) => {
    setSelectedLeads([lead.id]);
    setIsNewsletterModalOpen(true);
  };

  // Predefined email content quick-fills
  const loadQuickFill = (type) => {
    if (type === "update") {
      setEmailSubject("UK Immigration News & Weekly Updates - Eikon Peters");
      setEmailBody(
        "We wanted to reach out with some general updates about our visa consultation services and new guide manuals available on our portal. Make sure to download the latest innovator founder visa guides from Eikon Peters portal to review updated pathways."
      );
      setTemplateType("general");
    } else if (type === "advisory") {
      setEmailSubject("ADVISORY: Recent Visa Regulation & Application Timeline Updates");
      setEmailBody(
        "Please be advised that the Home Office has announced adjustments to UK visa application fee regulations and minimum timeline requirements starting next month. We advise reviewing all pending filing schedules. You can contact our specialists to discuss immediate processing options."
      );
      setTemplateType("advisory");
    }
  };

  // Newsletter dispatch handler
  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    if (selectedLeads.length === 0) {
      showToast("Please select at least one recipient.", "warning");
      return;
    }
    if (!emailSubject.trim() || !emailBody.trim()) {
      showToast("Subject and message body are required.", "warning");
      return;
    }

    setIsSending(true);

    const recipients = leads
      .filter((l) => selectedLeads.includes(l.id))
      .map((l) => ({ email: l.email, name: l.name }));

    try {
      const res = await fetch("/api/send-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipients,
          subject: emailSubject.trim(),
          body: emailBody.trim(),
          templateType,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(data.message || "Newsletter campaign completed successfully!", "success");
        setIsNewsletterModalOpen(false);
        setEmailSubject("");
        setEmailBody("");
        setSelectedLeads([]); // Clear checkboxes
      } else {
        showToast(data.error || "Failed to send emails.", "error");
      }
    } catch (err) {
      console.error("Newsletter send error:", err);
      showToast("An error occurred during dispatch.", "error");
    } finally {
      setIsSending(false);
    }
  };

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
          <p className="text-gray-500">Track and manage users who downloaded your guides or subscribed to newsletter.</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedLeads.length > 0 && (
            <button
              onClick={() => setIsNewsletterModalOpen(true)}
              className="inline-flex items-center gap-2 bg-yellow-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:bg-yellow-600 hover:shadow-yellow-100"
            >
              <FaPaperPlane size={12} />
              Send Newsletter ({selectedLeads.length})
            </button>
          )}
          <button 
            id="leads-export-btn"
            onClick={handleExport}
            className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:bg-gray-800"
          >
            <FaDownload />
            Export Leads
          </button>
        </div>
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
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-12 text-center">
                  <input 
                    type="checkbox"
                    checked={filteredLeads.length > 0 && selectedLeads.length === filteredLeads.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 cursor-pointer"
                  />
                </th>
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
                    <td className="px-6 py-5 w-12 text-center">
                      <input 
                        type="checkbox"
                        checked={selectedLeads.includes(lead.id)}
                        onChange={() => toggleSelectLead(lead.id)}
                        className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-xs">
                          {(lead.name || "S").split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{lead.name || "Newsletter Subscriber"}</h4>
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
                        <button 
                          onClick={() => handleOpenIndividualCompose(lead)}
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors" 
                          title="Compose Email"
                        >
                          <FaEnvelope />
                        </button>
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
                  <td colSpan="6" className="px-6 py-10 text-center text-xs text-gray-400 font-bold uppercase tracking-wider">
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

      {/* Newsletter Composer Modal */}
      {isNewsletterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-gray-900 text-base">Compose Email Campaign</h3>
                <p className="text-xs text-gray-400 mt-0.5 font-semibold">
                  Recipient List: {selectedLeads.length} target lead{selectedLeads.length > 1 ? "s" : ""} selected
                </p>
              </div>
              <button 
                onClick={() => setIsNewsletterModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleSendNewsletter} className="p-6 space-y-4">
              {/* Template Type Dropdown */}
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Template Style
                </label>
                <select
                  value={templateType}
                  onChange={(e) => setTemplateType(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 transition-all bg-white font-medium text-gray-700"
                >
                  <option value="general">Corporate Blue Header (General Update)</option>
                  <option value="advisory">Advisory Alert Red Header (Policy Warnings)</option>
                </select>
              </div>

              {/* Quick Fill presets */}
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Template Quick Fills
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => loadQuickFill("update")}
                    className="px-3 py-1.5 border border-gray-100 hover:border-yellow-500 text-xs font-semibold text-gray-600 rounded-lg hover:bg-yellow-50/20 transition-all"
                  >
                    🚀 General Updates
                  </button>
                  <button
                    type="button"
                    onClick={() => loadQuickFill("advisory")}
                    className="px-3 py-1.5 border border-gray-100 hover:border-yellow-500 text-xs font-semibold text-gray-600 rounded-lg hover:bg-yellow-50/20 transition-all"
                  >
                    ⚠️ Visa Policy Alert
                  </button>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="e.g. UK Innovator Founder Visa Regulation Changes"
                  required
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 transition-all font-medium"
                />
              </div>

              {/* Message Body */}
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Message Body
                </label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Write your email body copy here..."
                  required
                  rows={6}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 transition-all resize-none text-gray-700"
                />
              </div>

              {/* Send buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsNewsletterModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-yellow-100 hover:shadow-yellow-200 disabled:bg-yellow-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] text-sm"
                >
                  {isSending ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" size={11} />
                      Send Campaign
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
