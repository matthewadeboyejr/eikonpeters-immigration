"use client";

import React, { useState, useEffect } from "react";
import { 
  FaPlus, 
  FaTrashAlt, 
  FaUserShield, 
  FaEnvelope, 
  FaUserPlus,
  FaTimes,
  FaCheckCircle,
  FaSpinner
} from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/context/ToastContext";
import ConfirmModal from "@/components/admin/ConfirmModal";

export default function AdminManagement() {
  const [activeTab, setActiveTab] = useState("active"); // active, approved
  const [admins, setAdmins] = useState([]);
  const [approvedEmails, setApprovedEmails] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Admin");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  // Modals for deleting/revoking
  const [confirmAdminDelete, setConfirmAdminDelete] = useState({ isOpen: false, admin: null });
  const [confirmEmailDelete, setConfirmEmailDelete] = useState({ isOpen: false, email: null });

  const supabase = createClient();
  const { showToast } = useToast();

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentUser(user);
        }

        const [adminsRes, emailsRes] = await Promise.all([
          supabase.from("admins").select("*").order("name", { ascending: true }),
          supabase.from("approved_admin_emails").select("*").order("email", { ascending: true })
        ]);

        if (adminsRes.data) setAdmins(adminsRes.data);
        if (emailsRes.data) setApprovedEmails(emailsRes.data);
      } catch (err) {
        console.error("Error loading admin data:", err);
        showToast("Failed to load admin accounts.", "error");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAddEmail = async (e) => {
    e.preventDefault();
    if (!newEmail) return;

    const emailTrimmed = newEmail.toLowerCase().trim();
    setIsSubmittingEmail(true);

    try {
      // 1. Add to approved_admin_emails table
      const { error } = await supabase
        .from("approved_admin_emails")
        .insert([{ email: emailTrimmed, role: newRole }]);

      if (error) {
        if (error.code === "23505") {
          showToast(`The email "${emailTrimmed}" is already pre-approved!`, "error");
        } else {
          showToast("Failed to approve email: " + error.message, "error");
        }
        return;
      }

      setApprovedEmails((prev) => [...prev, { email: emailTrimmed, role: newRole, created_at: new Date().toISOString() }]);
      showToast(`${emailTrimmed} has been pre-approved as ${newRole}!`, "success");
      setNewEmail("");
      setNewRole("Admin");
      setIsModalOpen(false);
    } catch (err) {
      showToast("An error occurred.", "error");
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleRevokeEmail = async () => {
    const emailToRevoke = confirmEmailDelete.email;
    if (!emailToRevoke) return;

    try {
      const { error } = await supabase
        .from("approved_admin_emails")
        .delete()
        .eq("email", emailToRevoke);

      if (error) {
        showToast("Failed to revoke email: " + error.message, "error");
        return;
      }

      setApprovedEmails((prev) => prev.filter((item) => item.email !== emailToRevoke));
      showToast(`Approval for ${emailToRevoke} revoked.`, "success");
    } catch (err) {
      showToast("An error occurred.", "error");
    }
  };

  const handleRemoveAdmin = async () => {
    const adminToRemove = confirmAdminDelete.admin;
    if (!adminToRemove) return;

    if (adminToRemove.id === currentUser?.id) {
      showToast("You cannot remove yourself!", "error");
      return;
    }

    try {
      // 1. Delete from admins profile table
      const { error: profileError } = await supabase
        .from("admins")
        .delete()
        .eq("id", adminToRemove.id);

      if (profileError) {
        showToast("Error removing profile: " + profileError.message, "error");
        return;
      }

      // 2. Also remove from approved list so they cannot register again
      await supabase
        .from("approved_admin_emails")
        .delete()
        .eq("email", adminToRemove.email);

      setAdmins((prev) => prev.filter((a) => a.id !== adminToRemove.id));
      setApprovedEmails((prev) => prev.filter((item) => item.email !== adminToRemove.email));
      showToast(`Admin ${adminToRemove.name} has been removed.`, "success");
    } catch (err) {
      showToast("An error occurred.", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
        <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">Loading Accounts...</p>
      </div>
    );
  }

  const currentAdminProfile = admins.find((a) => a.id === currentUser?.id);
  const isSuperAdmin = currentAdminProfile?.role === "Super Admin";

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-inter">Admin Management</h1>
          <p className="text-gray-500 text-sm">Add other admins, pre-approve emails, or revoke admin access privileges.</p>
        </div>
        {isSuperAdmin && (
          <button 
            id="preapprove-email-btn"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-yellow-100"
          >
            <FaUserPlus />
            Pre-approve Email
          </button>
        )}
      </div>

      {/* Tabs Menu */}
      <div id="admins-tabs" className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-all outline-none ${
            activeTab === "active" 
              ? "border-yellow-500 text-yellow-600" 
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Active Admins ({admins.length})
        </button>
        {isSuperAdmin && (
          <button
            onClick={() => setActiveTab("approved")}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition-all outline-none ${
              activeTab === "approved" 
                ? "border-yellow-500 text-yellow-600" 
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Pre-approved Registrations ({approvedEmails.length})
          </button>
        )}
      </div>

      {/* Tab Contents */}
      {activeTab === "active" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.map((admin) => {
            const isMe = admin.id === currentUser?.id;
            return (
              <div 
                key={admin.id} 
                className={`bg-white p-6 rounded-3xl border shadow-sm flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md ${
                  isMe ? "border-yellow-400" : "border-gray-100"
                }`}
              >
                {isMe && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl">
                    You
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold text-sm">
                      {admin.name ? admin.name.split(" ").map((n) => n[0]).join("") : "AD"}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{admin.name || "Admin"}</h4>
                      <p className="text-xs text-yellow-600 font-bold uppercase tracking-wider">{admin.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {admin.bio || "No bio added."}
                  </p>
                </div>
                <div className="border-t border-gray-50 pt-4 flex items-center justify-between text-xs text-gray-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <FaEnvelope className="text-gray-300" />
                    {admin.email}
                  </span>
                  {!isMe && isSuperAdmin && (
                    <button
                      onClick={() => setConfirmAdminDelete({ isOpen: true, admin })}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                      title="Remove Admin Access"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Approved Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {approvedEmails.length > 0 ? (
                  approvedEmails.map((item) => {
                    const isRegistered = admins.some((a) => a.email.toLowerCase() === item.email.toLowerCase());
                    return (
                      <tr key={item.email} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-900 text-sm">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-yellow-600 uppercase tracking-wider">
                          {item.role || "Admin"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            isRegistered ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                          }`}>
                            {isRegistered ? 'Registered' : 'Pending Signup'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setConfirmEmailDelete({ isOpen: true, email: item.email })}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Revoke Approval"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                      No pre-approved emails found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pre-approve Email Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={18} />
            </button>
            <div className="text-center mb-6">
              <div className="bg-yellow-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-100 text-yellow-500">
                <FaUserShield size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Pre-approve Admin Email</h3>
              <p className="text-xs text-gray-500 mt-2">
                Users can only sign up as admins if their email has been pre-approved.
              </p>
            </div>
            <form onSubmit={handleAddEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. colleague@eikonpeters.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Access Role</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm bg-white"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option value="Admin">Admin (Content & Leads Manager)</option>
                  <option value="Super Admin">Super Admin (Full Dashboard Control)</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmittingEmail}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-yellow-100 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmittingEmail ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Pre-approve Email"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmations */}
      <ConfirmModal
        isOpen={confirmAdminDelete.isOpen}
        onClose={() => setConfirmAdminDelete({ isOpen: false, admin: null })}
        onConfirm={handleRemoveAdmin}
        title="Remove Admin Account"
        message={`Are you sure you want to remove ${confirmAdminDelete.admin?.name || "this admin"}? They will lose access to the panel immediately and their pre-approved signup record will be deleted.`}
      />

      <ConfirmModal
        isOpen={confirmEmailDelete.isOpen}
        onClose={() => setConfirmEmailDelete({ isOpen: false, email: null })}
        onConfirm={handleRevokeEmail}
        title="Revoke Pre-approval"
        message={`Are you sure you want to revoke pre-approval for ${confirmEmailDelete.email}? If they have not registered yet, they will not be able to sign up.`}
      />
    </div>
  );
}
