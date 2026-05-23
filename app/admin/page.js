"use client";

import React, { useEffect, useState } from "react";
import { 
  FaFileAlt, 
  FaBookOpen, 
  FaUsers, 
  FaArrowUp, 
  FaUserShield,
  FaImage
} from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";

const StatCard = ({ title, value, icon, trend, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} text-white`}>
        {icon}
      </div>
      {trend && (
        <span className="flex items-center text-xs font-bold text-green-500">
          <FaArrowUp className="mr-1" /> {trend}
        </span>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogsCount: 0,
    guidesCount: 0,
    leadsCount: 0,
    adminsCount: 0,
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Fetch counts in parallel
        const [blogsRes, guidesRes, leadsRes, adminsRes, postsRes, leadsListRes] = await Promise.all([
          supabase.from("blog_posts").select("id", { count: "exact", head: true }),
          supabase.from("guides").select("id", { count: "exact", head: true }),
          supabase.from("leads").select("id", { count: "exact", head: true }),
          supabase.from("admins").select("id", { count: "exact", head: true }),
          supabase.from("blog_posts").select("id, title, slug, date, image").order("id", { ascending: false }).limit(3),
          supabase.from("leads").select("id, name, email, guide, created_at").order("id", { ascending: false }).limit(3)
        ]);

        setStats({
          blogsCount: blogsRes.count || 0,
          guidesCount: guidesRes.count || 0,
          leadsCount: leadsRes.count || 0,
          adminsCount: adminsRes.count || 0,
        });

        if (postsRes.data) setRecentPosts(postsRes.data);
        if (leadsListRes.data) setRecentLeads(leadsListRes.data);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
        <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome to your management dashboard.</p>
      </div>

      {/* Stats Grid */}
      <div id="overview-stats" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Blog Posts" 
          value={stats.blogsCount} 
          icon={<FaFileAlt />} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Total Guides" 
          value={stats.guidesCount} 
          icon={<FaBookOpen />} 
          color="bg-purple-500"
        />
        <StatCard 
          title="Total Leads" 
          value={stats.leadsCount} 
          icon={<FaUsers />} 
          color="bg-green-500"
        />
        <StatCard 
          title="Active Admins" 
          value={stats.adminsCount} 
          icon={<FaUserShield />} 
          color="bg-yellow-500"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div id="recent-posts-card" className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Blog Posts</h2>
          <div className="space-y-4">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-400">
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <FaImage />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{post.title}</h4>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <a href={`/admin/blog?search=${post.title}`} className="text-yellow-600 text-xs font-bold hover:underline">View</a>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">No blog posts found.</p>
            )}
          </div>
        </div>

        <div id="recent-leads-card" className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Latest Leads</h2>
          <div className="space-y-4">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{lead.name}</h4>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded uppercase">
                      New
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1">{lead.guide}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">No recent leads found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
