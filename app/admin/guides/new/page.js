"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FaChevronLeft, 
  FaSave, 
  FaImage, 
  FaFilePdf, 
  FaInfoCircle,
  FaEye
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function NewGuidePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "Visas",
    image: "",
    fileUrl: "",
    pages: "",
    fileSize: "",
    buttonText: "Download Free Guide"
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Guide Data:", formData);
    alert("Guide created successfully! (Simulated)");
    router.push("/admin/guides");
  };

  if (previewMode) {
    return (
      <div className="space-y-8 max-w-5xl">
        {/* Preview Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPreviewMode(false)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-md transition-all"
            >
              <FaChevronLeft />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Preview Guide: {formData.title || "Untitled"}</h1>
              <p className="text-gray-500 text-sm">Viewing how the guide card will look to users.</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setPreviewMode(false)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all shadow-lg"
          >
            Back to Editor
          </button>
        </div>

        {/* Card Preview (Mirrors GuideCard design) */}
        <div className="flex justify-center py-12 bg-gray-50 rounded-3xl">
           <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 group transition-all hover:shadow-2xl hover:-translate-y-1">
             <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
               {formData.image ? (
                 <img src={formData.image} alt={formData.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-300">
                   <FaImage size={48} />
                 </div>
               )}
               <div className="absolute top-4 left-4 bg-yellow-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                 {formData.category}
               </div>
             </div>
             <div className="p-8">
               <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                 <FaFilePdf className="text-red-500" />
                 PDF • {formData.pages || "0"} Pages • {formData.fileSize || "0MB"}
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                 {formData.title || "Your Guide Title"}
               </h3>
               <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">
                 {formData.excerpt || "A brief description of what people will learn from this guide..."}
               </p>
               <button className="w-full bg-gray-900 group-hover:bg-yellow-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                 {formData.buttonText}
               </button>
             </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/guides"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-md transition-all"
          >
            <FaChevronLeft />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Guide</h1>
            <p className="text-gray-500 text-sm">Add a new downloadable PDF resource.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 font-bold text-sm text-gray-600 hover:bg-white transition-all"
          >
            <FaEye />
            Preview Card
          </button>
          <button 
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-yellow-200"
          >
            <FaSave />
            Save Guide
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Guide Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. UK Global Talent Visa Checklist"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option>Visas</option>
                  <option>Education</option>
                  <option>Policy</option>
                  <option>Relocation</option>
                  <option>Checklist</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  name="buttonText"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
                  value={formData.buttonText}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt / Description</label>
              <textarea
                name="excerpt"
                rows="4"
                placeholder="Brief summary of what the guide covers..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
                value={formData.excerpt}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sidebar: File & Media */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-4">File & Metadata</h3>
            
            <div className="space-y-4">
               <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <FaFilePdf className="text-red-500" /> PDF File URL
                </label>
                <input
                  type="text"
                  name="fileUrl"
                  placeholder="Link to PDF (S3, Drive, etc.)"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-yellow-500 outline-none"
                  value={formData.fileUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Page Count</label>
                  <input
                    type="number"
                    name="pages"
                    placeholder="12"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-yellow-500 outline-none"
                    value={formData.pages}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">File Size</label>
                  <input
                    type="text"
                    name="fileSize"
                    placeholder="2.4MB"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-yellow-500 outline-none"
                    value={formData.fileSize}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-4">Thumbnail Image</h3>
            <div className="space-y-4">
               <input
                  type="text"
                  name="image"
                  placeholder="Paste thumbnail URL..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-yellow-500 outline-none"
                  value={formData.image}
                  onChange={handleChange}
                />
                
                <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (file.size > 500 * 1024) {
                            alert("File size too large! Max 500KB.");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData((prev) => ({ ...prev, image: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div className="border-2 border-dashed border-gray-200 group-hover:border-yellow-500 rounded-xl p-4 text-center transition-all">
                      <div className="text-gray-400 group-hover:text-yellow-600 transition-colors">
                        <FaImage size={24} className="mx-auto mb-2" />
                        <p className="text-xs font-bold uppercase tracking-wider">Upload Thumbnail</p>
                      </div>
                    </div>
                  </div>

                  {formData.image && (
                    <div className="mt-4 relative rounded-xl overflow-hidden border border-gray-100 shadow-sm aspect-[4/3]">
                       <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                       <button 
                         onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                         className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all"
                       >
                         &times;
                       </button>
                    </div>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
