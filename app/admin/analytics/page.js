"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  FaUsers,
  FaFileAlt,
  FaBookOpen,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaChartLine,
  FaFilter,
} from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";

// ─── Dynamically import ALL recharts components with ssr:false ────────────────
// This prevents recharts from running during Next.js static build phase
const LeadsAreaChart    = dynamic(() => import("@/components/admin/AnalyticsCharts").then(m => m.LeadsAreaChart),    { ssr: false, loading: () => <ChartSkeleton /> });
const PostsBarChart     = dynamic(() => import("@/components/admin/AnalyticsCharts").then(m => m.PostsBarChart),     { ssr: false, loading: () => <ChartSkeleton /> });
const LeadsByGuideChart = dynamic(() => import("@/components/admin/AnalyticsCharts").then(m => m.LeadsByGuideChart), { ssr: false, loading: () => <ChartSkeleton /> });
const LeadsByStatusChart = dynamic(() => import("@/components/admin/AnalyticsCharts").then(m => m.LeadsByStatusChart), { ssr: false, loading: () => <div className="h-44 flex items-center justify-center"><div className="w-8 h-8 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" /></div> });

// ─── PIE colours (must stay in this file too for the legend) ─────────────────
const PIE_COLOURS = ["#EAB308", "#3B82F6", "#22C55E", "#A855F7", "#EF4444", "#F97316"];

// ─── Chart skeleton ───────────────────────────────────────────────────────────
function ChartSkeleton() {
  return (
    <div className="h-56 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" />
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getLastNMonths(n) {
  const months = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth(), label: `${MONTH_LABELS[d.getMonth()]} ${String(d.getFullYear()).slice(2)}` });
  }
  return months;
}

function groupByMonth(items, dateField, n) {
  const months = getLastNMonths(n);
  const map = {};
  months.forEach(m => { map[`${m.year}-${m.month}`] = { label: m.label, count: 0 }; });
  items.forEach(item => {
    const d = new Date(item[dateField]);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (map[key]) map[key].count++;
  });
  return Object.values(map);
}

function groupByField(items, field) {
  const map = {};
  items.forEach(item => {
    const val = item[field] || "Unknown";
    map[val] = (map[val] || 0) + 1;
  });
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function filterByMonths(items, dateField, months) {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  return items.filter(item => new Date(item[dateField]) >= cutoff);
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function KpiCard({ title, value, icon, trend, trendLabel, color }) {
  const isUp   = trend > 0;
  const isFlat = trend === 0;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl ${color}`}>
          {icon}
        </div>
        <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full
          ${isFlat ? "bg-gray-100 text-gray-500" : isUp ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
          {isFlat ? <FaMinus size={10} /> : isUp ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
          {trendLabel}
        </span>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
        <p className="text-3xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="mb-5">
        <h3 className="font-bold text-gray-900 text-base">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function EmptyChart({ message }) {
  return (
    <div className="h-56 flex items-center justify-center text-gray-300 text-sm font-medium">
      {message}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminAnalytics() {
  const [leads,     setLeads]     = useState([]);
  const [posts,     setPosts]     = useState([]);
  const [guides,    setGuides]    = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [range,     setRange]     = useState(6);

  const supabase = createClient();

  useEffect(() => {
    async function load() {
      try {
        const [leadsRes, postsRes, guidesRes] = await Promise.all([
          supabase.from("leads").select("id, guide, status, created_at").order("created_at", { ascending: false }),
          supabase.from("blog_posts").select("id, title, created_at").order("created_at", { ascending: false }),
          supabase.from("guides").select("id, title, created_at"),
        ]);
        if (leadsRes.data)  setLeads(leadsRes.data);
        if (postsRes.data)  setPosts(postsRes.data);
        if (guidesRes.data) setGuides(guidesRes.data);
      } catch (e) {
        console.error("Analytics load error:", e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  // ── Derived analytics ────────────────────────────────────────────────────
  const analytics = useMemo(() => {
    const now             = new Date();
    const thisMonthStart  = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart  = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const leadsThisMonth = leads.filter(l => new Date(l.created_at) >= thisMonthStart).length;
    const leadsLastMonth = leads.filter(l => {
      const d = new Date(l.created_at);
      return d >= lastMonthStart && d < thisMonthStart;
    }).length;

    const postsThisMonth = posts.filter(p => new Date(p.created_at) >= thisMonthStart).length;
    const postsLastMonth = posts.filter(p => {
      const d = new Date(p.created_at);
      return d >= lastMonthStart && d < thisMonthStart;
    }).length;

    const filteredLeads = filterByMonths(leads, "created_at", range);
    const filteredPosts = filterByMonths(posts, "created_at", range);

    return {
      totalLeads:    leads.length,
      leadsThisMonth,
      leadsLastMonth,
      totalPosts:    posts.length,
      postsThisMonth,
      postsLastMonth,
      totalGuides:   guides.length,

      leadsOverTime:  groupByMonth(filteredLeads, "created_at", range),
      postsOverTime:  groupByMonth(filteredPosts,  "created_at", range),
      leadsByGuide:   groupByField(filteredLeads, "guide").slice(0, 8),
      leadsByStatus:  groupByField(filteredLeads, "status"),

      recentLeads:    leads.slice(0, 10),
    };
  }, [leads, posts, guides, range]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" />
        <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">Loading Analytics…</p>
      </div>
    );
  }

  const leadsTrend = analytics.leadsLastMonth === 0 ? 0
    : Math.round(((analytics.leadsThisMonth - analytics.leadsLastMonth) / analytics.leadsLastMonth) * 100);
  const postsTrend = analytics.postsLastMonth === 0 ? 0
    : Math.round(((analytics.postsThisMonth - analytics.postsLastMonth) / analytics.postsLastMonth) * 100);

  return (
    <div className="space-y-8">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Analytics</h1>
          <p className="text-gray-400 text-sm mt-0.5">Live insights from your Supabase data.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-fit">
          <FaFilter className="text-gray-400" size={12} />
          <span className="text-xs font-semibold text-gray-500 mr-1">Range:</span>
          {[{ label: "3 Months", val: 3 }, { label: "6 Months", val: 6 }, { label: "12 Months", val: 12 }].map(opt => (
            <button
              key={opt.val}
              onClick={() => setRange(opt.val)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                range === opt.val ? "bg-yellow-500 text-white shadow" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard title="Total Leads"       value={analytics.totalLeads.toLocaleString()}  icon={<FaUsers />}    color="bg-yellow-500" trend={leadsTrend} trendLabel={`${Math.abs(leadsTrend)}% vs last month`} />
        <KpiCard title="Leads This Month"  value={analytics.leadsThisMonth.toLocaleString()} icon={<FaChartLine />} color="bg-blue-500"   trend={leadsTrend} trendLabel={`${analytics.leadsLastMonth} last month`} />
        <KpiCard title="Blog Posts"        value={analytics.totalPosts.toLocaleString()}   icon={<FaFileAlt />}  color="bg-purple-500" trend={postsTrend} trendLabel={`${analytics.postsThisMonth} this month`} />
        <KpiCard title="Guides Available"  value={analytics.totalGuides.toLocaleString()}  icon={<FaBookOpen />} color="bg-green-500"  trend={0}          trendLabel="total published" />
      </div>

      {/* ── Leads Over Time + Posts Over Time ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="Leads Over Time" subtitle={`Monthly lead volume — last ${range} months`}>
          {analytics.leadsOverTime.every(d => d.count === 0)
            ? <EmptyChart message="No lead data in this range." />
            : <LeadsAreaChart data={analytics.leadsOverTime} />
          }
        </SectionCard>

        <SectionCard title="Content Published" subtitle={`Blog posts per month — last ${range} months`}>
          {analytics.postsOverTime.every(d => d.count === 0)
            ? <EmptyChart message="No posts published in this range." />
            : <PostsBarChart data={analytics.postsOverTime} />
          }
        </SectionCard>
      </div>

      {/* ── Leads by Guide + Leads by Status ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <SectionCard title="Leads by Guide" subtitle="Which guide is generating the most interest">
            {analytics.leadsByGuide.length === 0
              ? <EmptyChart message="No lead data in this range." />
              : <LeadsByGuideChart data={analytics.leadsByGuide} />
            }
          </SectionCard>
        </div>

        <SectionCard title="Lead Status" subtitle="Pipeline breakdown">
          {analytics.leadsByStatus.length === 0 ? (
            <EmptyChart message="No data." />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <LeadsByStatusChart data={analytics.leadsByStatus} />
              <div className="w-full space-y-2">
                {analytics.leadsByStatus.map((entry, i) => (
                  <div key={entry.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PIE_COLOURS[i % PIE_COLOURS.length] }} />
                      <span className="text-gray-600 font-medium">{entry.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">{entry.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SectionCard>
      </div>

      {/* ── Recent Leads Table ─────────────────────────────────────────── */}
      <SectionCard title="Recent Leads" subtitle="Latest 10 leads captured">
        {analytics.recentLeads.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No leads yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">#</th>
                  <th className="pb-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Guide</th>
                  <th className="pb-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="pb-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {analytics.recentLeads.map((lead, i) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-gray-400 font-mono text-xs">{i + 1}</td>
                    <td className="py-3 font-medium text-gray-800 max-w-[200px] truncate">{lead.guide}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide
                        ${lead.status === "New"       ? "bg-yellow-100 text-yellow-700" :
                          lead.status === "Contacted" ? "bg-blue-100 text-blue-700"     :
                          lead.status === "Converted" ? "bg-green-100 text-green-700"   :
                                                        "bg-gray-100 text-gray-600"}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit", month: "short", year: "numeric"
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

    </div>
  );
}
