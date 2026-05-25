"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Colour palette ────────────────────────────────────────────────────────────
const COLOURS = {
  primary: "#EAB308",
  blue:    "#3B82F6",
  purple:  "#A855F7",
};

export const PIE_COLOURS = ["#EAB308", "#3B82F6", "#22C55E", "#A855F7", "#EF4444", "#F97316"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3">
        <p className="text-xs font-bold text-gray-500 mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-black" style={{ color: p.color }}>
            {p.value} {p.name}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3">
        <p className="text-sm font-bold text-gray-800">{payload[0].name}</p>
        <p className="text-lg font-black" style={{ color: payload[0].payload.fill }}>
          {payload[0].value} leads
        </p>
      </div>
    );
  }
  return null;
};

export function LeadsAreaChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor={COLOURS.primary} stopOpacity={0.25} />
            <stop offset="95%" stopColor={COLOURS.primary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="count"
          name="Leads"
          stroke={COLOURS.primary}
          strokeWidth={2.5}
          fill="url(#leadGrad)"
          dot={{ r: 4, fill: COLOURS.primary, strokeWidth: 0 }}
          activeDot={{ r: 6, fill: COLOURS.primary }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PostsBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" name="Posts" fill={COLOURS.purple} radius={[6, 6, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LeadsByGuideChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(220, data.length * 46)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="name"
          width={160}
          tick={{ fontSize: 11, fill: "#374151" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={v => v.length > 22 ? v.slice(0, 22) + "…" : v}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" name="Leads" fill={COLOURS.blue} radius={[0, 6, 6, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LeadsByStatusChart({ data }) {
  return (
    <PieChart width={200} height={180}>
      <Pie
        data={data}
        dataKey="count"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={50}
        outerRadius={80}
        paddingAngle={3}
        strokeWidth={0}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={PIE_COLOURS[index % PIE_COLOURS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomPieTooltip />} />
    </PieChart>
  );
}
