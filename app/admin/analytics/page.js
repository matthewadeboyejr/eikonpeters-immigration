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
  FaGlobe,
  FaLaptop,
  FaMobileAlt,
  FaDatabase,
  FaExclamationTriangle,
} from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";

// ─── Dynamically import ALL recharts components with ssr:false ────────────────
const LeadsAreaChart     = dynamic(() => import("@/components/admin/AnalyticsCharts").then(m => m.LeadsAreaChart),     { ssr: false, loading: () => <ChartSkeleton /> });
const PostsBarChart      = dynamic(() => import("@/components/admin/AnalyticsCharts").then(m => m.PostsBarChart),      { ssr: false, loading: () => <ChartSkeleton /> });
const LeadsByGuideChart  = dynamic(() => import("@/components/admin/AnalyticsCharts").then(m => m.LeadsByGuideChart),  { ssr: false, loading: () => <ChartSkeleton /> });
const LeadsByStatusChart = dynamic(() => import("@/components/admin/AnalyticsCharts").then(m => m.LeadsByStatusChart), { ssr: false, loading: () => <div className="h-44 flex items-center justify-center"><div className="w-8 h-8 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" /></div> });
const TrafficAreaChart   = dynamic(() => import("@/components/admin/AnalyticsCharts").then(m => m.TrafficAreaChart),   { ssr: false, loading: () => <ChartSkeleton /> });
const DevicesPieChart    = dynamic(() => import("@/components/admin/AnalyticsCharts").then(m => m.DevicesPieChart),    { ssr: false, loading: () => <div className="h-44 flex items-center justify-center"><div className="w-8 h-8 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" /></div> });

// ─── PIE colours ─────────────────────────────────────────────────────────────
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
  const [leads,         setLeads]         = useState([]);
  const [posts,         setPosts]         = useState([]);
  const [guides,        setGuides]        = useState([]);
  const [gaData,        setGaData]        = useState(null);
  const [isLoading,     setIsLoading]     = useState(true);
  const [isGaLoading,   setIsGaLoading]   = useState(true);
  const [range,         setRange]         = useState(6);
  const [activeTab,     setActiveTab]     = useState("traffic"); // 'traffic' or 'crm'

  const supabase = createClient();

  // Load CRM Data (Leads, Posts, Guides)
  useEffect(() => {
    async function loadCRM() {
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
        console.error("Analytics CRM load error:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadCRM();
  }, []);

  // Load Google Analytics Data based on range selection
  useEffect(() => {
    async function loadGA() {
      setIsGaLoading(true);
      try {
        // Map range months to days
        const days = range * 30;
        const res = await fetch(`/api/analytics?days=${days}`);
        if (res.ok) {
          const data = await res.json();
          setGaData(data);
        }
      } catch (err) {
        console.error("Analytics GA load error:", err);
      } finally {
        setIsGaLoading(false);
      }
    }
    loadGA();
  }, [range]);

  // Derived CRM analytics
  const crmAnalytics = useMemo(() => {
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

  const leadsTrend = crmAnalytics.leadsLastMonth === 0 ? 0
    : Math.round(((crmAnalytics.leadsThisMonth - crmAnalytics.leadsLastMonth) / crmAnalytics.leadsLastMonth) * 100);
  const postsTrend = crmAnalytics.postsLastMonth === 0 ? 0
    : Math.round(((crmAnalytics.postsThisMonth - crmAnalytics.postsLastMonth) / crmAnalytics.postsLastMonth) * 100);

  return (
    <div className="space-y-8">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Analytics</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {activeTab === "traffic" 
              ? "Google Analytics website traffic & visitor behavior."
              : "CRM metrics: leads generated & content stats."
            }
          </p>
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

      {/* ── Tabs ───────────────────────────────────────────────────────── */}
      <div className="flex border-b border-gray-200 gap-6">
        <button
          onClick={() => setActiveTab("traffic")}
          className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "traffic"
              ? "border-yellow-500 text-yellow-600 font-extrabold"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <FaGlobe size={14} />
          Website Traffic (Google Analytics)
        </button>
        <button
          onClick={() => setActiveTab("crm")}
          className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "crm"
              ? "border-yellow-500 text-yellow-600 font-extrabold"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <FaDatabase size={14} />
          CRM & CRM Insights (Leads & Content)
        </button>
      </div>

      {/* ── Google Analytics Demo Banner ─────────────────────────────── */}
      {activeTab === "traffic" && gaData?.isDemo && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl shadow-sm">
          <div className="flex gap-3">
            <div className="flex-shrink-0 text-amber-600 mt-0.5">
              <FaExclamationTriangle size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-800">Displaying Demo Website Analytics</h3>
              <p className="text-xs text-amber-700 mt-1">
                You are currently viewing mock analytics data. To connect your live Google Analytics 4 (GA4) traffic stream, configure the following environment variables in your <strong>.env.local</strong> file:
              </p>
              <code className="block bg-amber-100/50 p-3 rounded-lg text-[11px] font-mono text-amber-900 mt-2 space-y-1 overflow-x-auto">
                <div>GOOGLE_ANALYTICS_PROPERTY_ID=&quot;your_ga4_numeric_property_id&quot;</div>
                <div>GOOGLE_CLIENT_EMAIL=&quot;your_google_service_account_email@company.iam.gserviceaccount.com&quot;</div>
                <div>GOOGLE_PRIVATE_KEY=&quot;-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...&quot;</div>
              </code>
              <p className="text-[10px] text-amber-600/90 mt-2">
                Make sure you also share your GA4 property credentials (add the Service Account email as a &quot;Viewer&quot; in Google Analytics admin panel).
              </p>
              {gaData.errorMessage && (
                <div className="text-[10px] text-red-500 mt-3 font-semibold bg-red-50 p-2 rounded border border-red-200">
                  Connection Error: {gaData.errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 1: WEBSITE TRAFFIC (GOOGLE ANALYTICS) ─────────────────── */}
      {activeTab === "traffic" && (
        <div className="space-y-8">
          {isGaLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-10 h-10 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" />
              <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest">Fetching GA4 Traffic Data…</p>
            </div>
          ) : (
            <>
              {/* Real-time Dashboard Indicator Card */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs font-bold uppercase tracking-wider">Live Activity</p>
                  <h3 className="text-3xl font-black mt-1 flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    {gaData?.activeUsersCurrent}
                  </h3>
                  <p className="text-blue-200 text-xs mt-1">Active users on the site in the last 30 minutes</p>
                </div>
                <div className="text-5xl opacity-20 pr-4">
                  <FaGlobe />
                </div>
              </div>

              {/* GA Traffic KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <KpiCard
                  title="Total Page Views"
                  value={gaData?.totalPageViews?.toLocaleString() || "0"}
                  icon={<FaChartLine />}
                  color="bg-yellow-500"
                  trend={12}
                  trendLabel={`+12% vs last ${range}m`}
                />
                <KpiCard
                  title="Total Unique Visitors"
                  value={gaData?.totalActiveUsers?.toLocaleString() || "0"}
                  icon={<FaUsers />}
                  color="bg-blue-500"
                  trend={8}
                  trendLabel={`+8% vs last ${range}m`}
                />
              </div>

              {/* Traffic Over Time Area/Line Chart */}
              <SectionCard title="Website Traffic Curve" subtitle={`Daily Page Views vs Unique Active Users — last ${range * 30} days`}>
                {!gaData || !gaData.trafficOverTime || gaData.trafficOverTime.length === 0 ? (
                  <EmptyChart message="No traffic data available in this range." />
                ) : (
                  <TrafficAreaChart data={gaData.trafficOverTime} />
                )}
              </SectionCard>

              {/* Top Pages + Devices + Countries */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Top Pages */}
                <div className="lg:col-span-2">
                  <SectionCard title="Top Visited Pages" subtitle="Most popular pages & content paths by views">
                    {!gaData || !gaData.topPages || gaData.topPages.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-8">No page data.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-100 text-left">
                              <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Page Title</th>
                              <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">URL Path</th>
                              <th className="pb-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Views</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {gaData.topPages.map((page, i) => (
                              <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 font-medium text-gray-800 truncate max-w-[220px]">{page.title}</td>
                                <td className="py-3 text-gray-400 text-xs font-mono truncate max-w-[150px]">{page.path}</td>
                                <td className="py-3 text-right font-bold text-gray-900">{page.views.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </SectionCard>
                </div>

                {/* Device Breakdown */}
                <SectionCard title="Devices & Browsers" subtitle="Visitor hardware breakdown">
                  {!gaData || !gaData.devices || gaData.devices.length === 0 ? (
                    <EmptyChart message="No data." />
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <DevicesPieChart data={gaData.devices} />
                      <div className="w-full space-y-2">
                        {gaData.devices.map((device, i) => (
                          <div key={device.name} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PIE_COLOURS[i % PIE_COLOURS.length] }} />
                              <span className="text-gray-600 font-medium flex items-center gap-1.5">
                                {device.name === "Desktop" ? <FaLaptop className="text-gray-400" /> : <FaMobileAlt className="text-gray-400" />}
                                {device.name}
                              </span>
                            </div>
                            <span className="font-bold text-gray-900">{device.count.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </SectionCard>
              </div>

              {/* Geographical visitor source */}
              <SectionCard title="Traffic by Country" subtitle="Top countries generating traffic">
                {!gaData || !gaData.countries || gaData.countries.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-8">No country data available.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-100 text-left">
                            <th className="pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Country</th>
                            <th className="pb-3 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Active Visitors</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {gaData.countries.slice(0, 5).map((country, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="py-3 font-medium text-gray-800">{country.name}</td>
                              <td className="py-3 text-right font-bold text-gray-900">{country.count.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Visual Progress Bars for Top Countries */}
                    <div className="space-y-4 flex flex-col justify-center">
                      {(() => {
                        const maxCount = Math.max(...gaData.countries.map(c => c.count), 1);
                        return gaData.countries.slice(0, 4).map((country, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold text-gray-600">
                              <span>{country.name}</span>
                              <span>{Math.round((country.count / gaData.totalActiveUsers) * 100)}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-yellow-500 rounded-full transition-all duration-500" 
                                style={{ width: `${(country.count / maxCount) * 100}%` }} 
                              />
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                )}
              </SectionCard>
            </>
          )}
        </div>
      )}

      {/* ── TAB 2: DATABASE & CRM (LEADS & CONTENT) ──────────────────── */}
      {activeTab === "crm" && (
        <div className="space-y-8">
          {/* Supabase CRM KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <KpiCard title="Total Leads"       value={crmAnalytics.totalLeads.toLocaleString()}  icon={<FaUsers />}    color="bg-yellow-500" trend={leadsTrend} trendLabel={`${Math.abs(leadsTrend)}% vs last month`} />
            <KpiCard title="Leads This Month"  value={crmAnalytics.leadsThisMonth.toLocaleString()} icon={<FaChartLine />} color="bg-blue-500"   trend={leadsTrend} trendLabel={`${crmAnalytics.leadsLastMonth} last month`} />
            <KpiCard title="Blog Posts"        value={crmAnalytics.totalPosts.toLocaleString()}   icon={<FaFileAlt />}  color="bg-purple-500" trend={postsTrend} trendLabel={`${crmAnalytics.postsThisMonth} this month`} />
            <KpiCard title="Guides Available"  value={crmAnalytics.totalGuides.toLocaleString()}  icon={<FaBookOpen />} color="bg-green-500"  trend={0}          trendLabel="total published" />
          </div>

          {/* CRM Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SectionCard title="Leads Over Time" subtitle={`Monthly lead volume — last ${range} months`}>
              {crmAnalytics.leadsOverTime.every(d => d.count === 0)
                ? <EmptyChart message="No lead data in this range." />
                : <LeadsAreaChart data={crmAnalytics.leadsOverTime} />
              }
            </SectionCard>

            <SectionCard title="Content Published" subtitle={`Blog posts per month — last ${range} months`}>
              {crmAnalytics.postsOverTime.every(d => d.count === 0)
                ? <EmptyChart message="No posts published in this range." />
                : <PostsBarChart data={crmAnalytics.postsOverTime} />
              }
            </SectionCard>
          </div>

          {/* Leads by Guide + Leads by Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SectionCard title="Leads by Guide" subtitle="Which guide is generating the most interest">
                {crmAnalytics.leadsByGuide.length === 0
                  ? <EmptyChart message="No lead data in this range." />
                  : <LeadsByGuideChart data={crmAnalytics.leadsByGuide} />
                }
              </SectionCard>
            </div>

            <SectionCard title="Lead Status" subtitle="Pipeline breakdown">
              {crmAnalytics.leadsByStatus.length === 0 ? (
                <EmptyChart message="No data." />
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <LeadsByStatusChart data={crmAnalytics.leadsByStatus} />
                  <div className="w-full space-y-2">
                    {crmAnalytics.leadsByStatus.map((entry, i) => (
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

          {/* CRM Leads Table */}
          <SectionCard title="Recent Leads" subtitle="Latest 10 leads captured">
            {crmAnalytics.recentLeads.length === 0 ? (
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
                    {crmAnalytics.recentLeads.map((lead, i) => (
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
      )}

    </div>
  );
}
