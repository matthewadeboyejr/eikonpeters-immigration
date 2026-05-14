import React from "react";
import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaCalendarAlt, FaUser, FaChevronLeft, FaTag, FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Eikon Immigration Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Header: Category & Back Link */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/blog" className="hover:text-yellow-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{post.category}</span>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-yellow-600 transition-colors group"
          >
            <FaChevronLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to all articles
          </Link>
        </div>

        {/* Title Section */}
        <header className="max-w-4xl mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Featured Media (Image and/or Video) */}
        <div className="space-y-8 mb-16">
          {post.image && (
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[21/9]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {post.videoUrl && !post.content.includes("[[VIDEO]]") && (
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video bg-black">
              <iframe
                src={post.videoUrl}
                title={post.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Sidebar (Sticky) */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32 space-y-12">
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-lg">
                  {post.author[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-500">Immigration Expert</p>
                </div>
              </div>

              {/* Date */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Published</p>
                <p className="text-sm text-gray-700 font-medium">{post.date}</p>
              </div>

              {/* Share */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Share this post</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "Twitter", icon: FaTwitter },
                    { name: "Facebook", icon: FaFacebookF },
                    { name: "LinkedIn", icon: FaLinkedinIn },
                  ].map((platform) => (
                    <button 
                      key={platform.name}
                      className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition-all"
                      title={`Share on ${platform.name}`}
                    >
                      <platform.icon size={16} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-md font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <div className="lg:col-span-9 lg:max-w-3xl">
            {/* Content Rendering with Video Placement Support */}
            <div className="prose prose-lg prose-yellow max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6">
              {post.content.includes("[[VIDEO]]") ? (
                post.content.split("[[VIDEO]]").map((part, index, array) => (
                  <React.Fragment key={index}>
                    <div dangerouslySetInnerHTML={{ __html: part }} />
                    {index < array.length - 1 && post.videoUrl && (
                      <div className="my-12 rounded-3xl overflow-hidden shadow-xl aspect-video bg-black">
                        <iframe
                          src={post.videoUrl}
                          title={post.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
            </div>
            
            {/* Newsletter Subscription (Inline) */}
            <div className="mt-20 p-8 md:p-12 bg-gray-50 rounded-[2rem] text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get immigration updates</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-sm">Join 5,000+ others who receive our weekly newsletter on latest visa policies and success stories.</p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="flex-grow px-6 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm"
                />
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-yellow-200 text-sm">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
