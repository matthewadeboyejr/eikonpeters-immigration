"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  FaChevronLeft, 
  FaSave, 
  FaImage, 
  FaVideo, 
  FaInfoCircle,
  FaEye
} from "react-icons/fa";
import { useRouter } from "next/navigation";

// Import Quill styles
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => <div className="h-72 w-full bg-gray-50 animate-pulse rounded-xl border border-gray-200" />
});

export default function NewBlogPost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Global Talent Visa",
    image: "",
    videoUrl: "",
    tags: ""
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [isSlugEditable, setIsSlugEditable] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isSlugEditable && formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with hyphens
        .replace(/^-+|-+$/g, ''); // Trim hyphens
      
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, isSlugEditable]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Post created successfully! (Simulated)");
    router.push("/admin/blog");
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
              <h1 className="text-2xl font-bold text-gray-900">Preview: {formData.title || "Untitled Post"}</h1>
              <p className="text-gray-500 text-sm">Viewing how your post will look to readers.</p>
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

        {/* Preview Content (Mirrors Public BlogPost design) */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
              {formData.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {formData.title || "Your Post Title Here"}
            </h1>
            <p className="text-lg text-gray-600 mb-8 italic border-l-4 border-yellow-500 pl-4">
              {formData.excerpt || "Your post excerpt will appear here..."}
            </p>

            {/* Featured Image Preview */}
            {formData.image && (
              <div className="rounded-2xl overflow-hidden mb-12 aspect-[21/9]">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Main Content Render */}
            <div className="prose prose-lg prose-yellow max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
               {formData.content.includes("[[VIDEO]]") ? (
                formData.content.split("[[VIDEO]]").map((part, index, array) => (
                  <React.Fragment key={index}>
                    <div dangerouslySetInnerHTML={{ __html: part }} />
                    {index < array.length - 1 && formData.videoUrl && (
                      <div className="my-12 rounded-2xl overflow-hidden shadow-xl aspect-video bg-black">
                        <iframe
                          src={formData.videoUrl}
                          className="w-full h-full"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <div dangerouslySetInnerHTML={{ __html: formData.content }} />
              )}

              {/* Show video at bottom if not using [[VIDEO]] tag */}
              {!formData.content.includes("[[VIDEO]]") && formData.videoUrl && (
                <div className="mt-12 rounded-2xl overflow-hidden shadow-xl aspect-video bg-black">
                  <iframe
                    src={formData.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            {/* Tags Preview */}
            <div className="mt-12 pt-8 border-t border-gray-100">
               <div className="flex flex-wrap gap-2">
                 {formData.tags.split(',').map(tag => tag.trim()).filter(t => t).map(tag => (
                   <span key={tag} className="text-xs bg-gray-50 text-gray-500 px-3 py-1 rounded-md font-medium border border-gray-100">
                     #{tag}
                   </span>
                 ))}
               </div>
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
            href="/admin/blog"
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-md transition-all"
          >
            <FaChevronLeft />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
            <p className="text-gray-500 text-sm">Add a new article to your blog.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 font-bold text-sm text-gray-600 hover:bg-white transition-all"
          >
            <FaEye />
            {previewMode ? "Edit Mode" : "Preview"}
          </button>
          <button 
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-yellow-200"
          >
            <FaSave />
            Save Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Article Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter a catchy title..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Slug</label>
                <div className="relative">
                  <input
                    type="text"
                    name="slug"
                    placeholder="article-url-slug"
                    className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all ${!isSlugEditable ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'text-gray-700'}`}
                    value={formData.slug}
                    onChange={handleChange}
                    readOnly={!isSlugEditable}
                  />
                  <button
                    type="button"
                    onClick={() => setIsSlugEditable(!isSlugEditable)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-yellow-600 hover:text-yellow-700 underline"
                  >
                    {isSlugEditable ? "Lock" : "Edit"}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option>Global Talent Visa</option>
                  <option>Student Visa</option>
                  <option>Express Entry</option>
                  <option>Work Visa</option>
                  <option>Digital Nomad Visa</option>
                  <option>Immigration Policy</option>
                  <option>Lifestyle</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                rows="3"
                placeholder="Brief summary of the article..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all"
                value={formData.excerpt}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-gray-700">Article Content (HTML)</label>
                <div className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                  <FaInfoCircle />
                  Use [[VIDEO]] placeholder for middle placement
                </div>
              </div>
              <div className="quill-editor-wrapper">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your article here..."
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 focus-within:border-yellow-500 transition-all"
                />
              </div>
              <style jsx global>{`
                .quill-editor-wrapper .ql-toolbar {
                  border-top-left-radius: 0.75rem;
                  border-top-right-radius: 0.75rem;
                  border-color: #e5e7eb;
                  background: #f9fafb;
                }
                .quill-editor-wrapper .ql-container {
                  border-bottom-left-radius: 0.75rem;
                  border-bottom-right-radius: 0.75rem;
                  border-color: #e5e7eb;
                  min-height: 300px;
                  font-size: 1rem;
                }
                .quill-editor-wrapper .ql-editor {
                  min-height: 300px;
                }
              `}</style>
            </div>
          </div>
        </div>

        {/* Media & Metadata Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-4">Media Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <FaImage className="text-blue-400" /> Featured Image
                </label>
                <div className="space-y-3">
                  {/* URL Input */}
                  <input
                    type="text"
                    name="image"
                    placeholder="Paste image URL..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-yellow-500 outline-none"
                    value={formData.image}
                    onChange={handleChange}
                  />
                  
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase">
                    <span className="h-[1px] flex-grow bg-gray-100"></span>
                    <span>OR</span>
                    <span className="h-[1px] flex-grow bg-gray-100"></span>
                  </div>

                  {/* File Upload */}
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          // Check file size (300KB = 300 * 1024 bytes)
                          if (file.size > 300 * 1024) {
                            alert("File size too large! Maximum allowed is 300KB.");
                            e.target.value = ""; // Clear input
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
                        <p className="text-xs font-bold uppercase tracking-wider">Upload File</p>
                        <p className="text-[10px] text-gray-400 mt-1">Max 300KB</p>
                      </div>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="mt-4 relative rounded-xl overflow-hidden border border-gray-100 shadow-sm aspect-video">
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

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <FaVideo className="text-purple-400" /> YouTube Embed URL
                </label>
                <input
                  type="text"
                  name="videoUrl"
                  placeholder="https://youtube.com/embed/..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-yellow-500 outline-none"
                  value={formData.videoUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <p className="text-xs text-yellow-800 leading-relaxed">
                  <span className="font-bold">Media Display Logic:</span><br/>
                  • Providing only an image will show only the image.<br/>
                  • Providing only a video will show only the video.<br/>
                  • Providing both will show both. Use <code className="font-bold">[[VIDEO]]</code> in content to place video in the middle.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
             <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-4">Tags</h3>
             <input
                type="text"
                name="tags"
                placeholder="UK, Visa, Global Talent (comma separated)"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-yellow-500 outline-none"
                value={formData.tags}
                onChange={handleChange}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
