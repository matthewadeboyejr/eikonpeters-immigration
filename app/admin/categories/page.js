"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaPen, FaCheck, FaTimes, FaTags } from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/context/ToastContext";

const TYPE_LABELS = {
  blog:  { label: "Blog",   color: "bg-blue-100 text-blue-700" },
  guide: { label: "Guide",  color: "bg-purple-100 text-purple-700" },
};

export default function CategoriesPage() {
  const supabase = createClient();
  const { showToast } = useToast();

  const [categories, setCategories]   = useState([]);
  const [isLoading, setIsLoading]     = useState(true);
  const [activeTab, setActiveTab]     = useState("blog"); // 'blog' | 'guide'

  // Inline-edit state
  const [editingId, setEditingId]     = useState(null);
  const [editingName, setEditingName] = useState("");

  // New category form
  const [newName, setNewName]         = useState("");
  const [adding, setAdding]           = useState(false);

  // ── Load ──────────────────────────────────────────────────────────────────
  async function load() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("type")
      .order("name");
    if (error) showToast("Failed to load categories.", "error");
    else setCategories(data || []);
    setIsLoading(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, []);

  const filtered = categories.filter((c) => c.type === activeTab);

  // ── Add ───────────────────────────────────────────────────────────────────
  async function handleAdd() {
    const name = newName.trim();
    if (!name) return showToast("Category name cannot be empty.", "warning");
    if (categories.some((c) => c.type === activeTab && c.name.toLowerCase() === name.toLowerCase())) {
      return showToast("This category already exists.", "warning");
    }

    setAdding(true);
    const { error } = await supabase.from("categories").insert([{ name, type: activeTab }]);
    setAdding(false);

    if (error) return showToast("Failed to add category: " + error.message, "error");
    showToast("Category added!", "success");
    setNewName("");
    load();
  }

  // ── Save edit ─────────────────────────────────────────────────────────────
  async function handleSaveEdit(id) {
    const name = editingName.trim();
    if (!name) return showToast("Name cannot be empty.", "warning");

    const { error } = await supabase
      .from("categories")
      .update({ name })
      .eq("id", id);

    if (error) return showToast("Failed to update: " + error.message, "error");
    showToast("Category updated.", "success");
    setEditingId(null);
    load();
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  async function handleDelete(id, name) {
    if (!window.confirm(`Delete category "${name}"? This won't delete existing posts/guides using it.`)) return;

    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) return showToast("Failed to delete: " + error.message, "error");
    showToast("Category deleted.", "success");
    load();
  }

  // ── UI ────────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" />
        <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">Loading Categories…</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
          <FaTags className="text-yellow-500" />
          Categories
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage the category lists available when creating blog posts and guides.
        </p>
      </div>

      {/* ── Type Tabs ──────────────────────────────────────────── */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        {Object.entries(TYPE_LABELS).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => { setActiveTab(key); setEditingId(null); setNewName(""); }}
            className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${
              activeTab === key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {label} Posts
          </button>
        ))}
      </div>

      {/* ── Category List ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* List header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm font-bold text-gray-700">
            {filtered.length} {TYPE_LABELS[activeTab].label} {filtered.length === 1 ? "Category" : "Categories"}
          </p>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${TYPE_LABELS[activeTab].color}`}>
            {TYPE_LABELS[activeTab].label}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400 text-sm">
            No categories yet. Add one below.
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {filtered.map((cat) => (
              <li key={cat.id} className="px-6 py-4 flex items-center justify-between gap-4 group hover:bg-gray-50 transition-colors">
                {editingId === cat.id ? (
                  /* Edit mode */
                  <div className="flex-grow flex items-center gap-2">
                    <input
                      autoFocus
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit(cat.id);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      className="flex-grow px-3 py-1.5 text-sm rounded-lg border border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none"
                    />
                    <button
                      onClick={() => handleSaveEdit(cat.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all"
                      title="Save"
                    >
                      <FaCheck size={12} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all"
                      title="Cancel"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ) : (
                  /* View mode */
                  <>
                    <span className="text-sm font-medium text-gray-800 flex-grow">{cat.name}</span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => { setEditingId(cat.id); setEditingName(cat.name); }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"
                        title="Edit"
                      >
                        <FaPen size={11} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                        title="Delete"
                      >
                        <FaTrash size={11} />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* ── Add new ───────────────────────────────────────────── */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder={`New ${TYPE_LABELS[activeTab].label.toLowerCase()} category…`}
            className="flex-grow px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all bg-white"
          />
          <button
            onClick={handleAdd}
            disabled={adding || !newName.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all shadow-sm shadow-yellow-200"
          >
            {adding ? (
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <FaPlus size={12} />
            )}
            Add
          </button>
        </div>
      </div>

      {/* Info card */}
      <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-2xl text-xs text-yellow-800 leading-relaxed">
        <strong>Note:</strong> Deleting a category won&apos;t affect existing blog posts or guides that already use it.
        Their category label will simply not appear in the dropdown for new content.
      </div>
    </div>
  );
}
