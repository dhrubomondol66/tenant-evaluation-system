// src/pages/Overview.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandlordSidebar from "../../component/landlordComponent/landlordSidebar.jsx";
import LandlordTopbar from "../../component/landlordComponent/landlordTopbar.jsx";
import Layout from "../../component/Layout.jsx";

// Progress components
const days = [
  {
    day: 1,
    status: "complete",
    participation: "Completed",
    timing: "On time",
    timingDelay: false,
    trend: null,
    note: "Initial engagement started. Applicant responded to all prompts within expected timeframe.",
    unlock: null,
  },
  {
    day: 2,
    status: "complete",
    participation: "2/2 days",
    timing: "Slight delay",
    timingDelay: true,
    trend: "Forming",
    note: "Consistency beginning to form. Minor delay in afternoon check-in but all tasks completed.",
    unlock: null,
  },
  {
    day: 3,
    status: "complete",
    participation: "3/3 days",
    timing: "On time",
    timingDelay: false,
    trend: null,
    note: "Strong early pattern. Behavioral Report Preview is now unlocked.",
    unlock: "Behavioral Report Preview",
  },
  { day: 4, status: "locked" },
  { day: 5, status: "locked" },
  { day: 6, status: "locked" },
  { day: 7, status: "locked" },
];

const currentDay = 3;
const totalDays = 7;

function CheckIcon({ size = 16, color = "#4f46e5" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8L6.5 11.5L13 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="7" width="10" height="8" rx="2" stroke="#9ca3af" strokeWidth="1.5" />
      <path d="M5 7V5a3 3 0 016 0v2" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DayCard({ data, index }) {
  const [hovered, setHovered] = useState(false);

  if (data.status === "locked") {
    return (
      <div
        style={{
          borderRadius: "14px",
          border: "1.5px solid #eef0f5",
          padding: "18px 22px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "#fafbfc",
          opacity: 0.7,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#eef0f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <LockIcon />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "15px", color: "#9ca3af" }}>
            Day {data.day}
          </div>
          <div style={{ fontSize: "12px", color: "#c9cdd8" }}>Locked</div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px",
        border: `1.5px solid ${hovered ? "#c4b5fd" : "#eef0f5"}`,
        padding: "20px 22px",
        background: hovered ? "#faf9ff" : "#fff",
        transition: "all 0.2s ease",
        boxShadow: hovered
          ? "0 4px 24px rgba(124,58,237,0.08)"
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#ede9fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CheckIcon size={15} color="#7c3aed" />
          </div>
          <span style={{ fontWeight: 700, fontSize: "16px", color: "#1a1d27" }}>
            Day {data.day}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: 600, color: "#16a34a" }}>
          <CheckIcon size={12} color="#16a34a" />
          {data.participation}
        </div>
      </div>

      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>
        <span style={{ fontWeight: 600, color: "#1a1d27" }}>Timing:</span> {data.timing}
      </div>

      <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.5 }}>
        {data.note}
      </div>

      {data.unlock && (
        <div style={{
          marginTop: "12px",
          padding: "8px 12px",
          background: "#f0f9ff",
          border: "1px solid #bae6fd",
          borderRadius: "8px",
          fontSize: "11px",
          fontWeight: 600,
          color: "#0369a1",
        }}>
          {data.unlock}
        </div>
      )}
    </div>
  );
}

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const preTenanycRows = [
  { name: "Alex Thompson", property: "Riverside A-12", score: 92, change: 5, changeType: "up", status: "Stable", stage: "Stage 1 Complete" },
  { name: "Sarah Jenkins", property: "Riverside Apt 402", score: 46, change: 8, changeType: "down", status: "Monitor", stage: "Stage 2 Complete" },
  { name: "Marcus Vane", property: "Oak Ridge Tower", score: 38, change: 14, changeType: "down", status: "ElevatedRisk", stage: "Ongoing Monitoring" },
  { name: "Elena Rossi", property: "Maple Heights B-04", score: 85, change: 10, changeType: "up", status: "Stable", stage: "Stage 1 Complete" },
];

const earlyWarnings = [
  { name: "James Miller", detail: "Park View 101 • Participation Decline", dot: "bg-red-500" },
  { name: "Linda Wu", detail: "Grand Plaza 3B • Missed Required Cycles", dot: "bg-yellow-400" },
  { name: "Robert Hall", detail: "Hillside Manor • Behavioral Shift", dot: "bg-yellow-400" },
  { name: "Kevin Smith", detail: "Maple Heights A-01 • Integrity Score Drop", dot: "bg-red-500" },
];

// Dynamic data based on current dashboard state
const getDynamicData = (currentState) => {
  switch (currentState) {
    case "no-property":
      return {
        preTenancyRows: [],
        earlyWarnings: [],
        showPreTenancyTable: false,
        showEarlyWarnings: false,
        emptyMessage: "No properties added yet"
      };
    case "no-tenant":
      return {
        preTenancyRows: [],
        earlyWarnings: [],
        showPreTenancyTable: false,
        showEarlyWarnings: false,
        emptyMessage: "No active pre-tenancy processes"
      };
    case "pre-tenancy-active":
      return {
        preTenancyRows: preTenanycRows,
        earlyWarnings: [],
        showPreTenancyTable: true,
        showEarlyWarnings: false,
        emptyMessage: null
      };
    case "monitoring-inactive":
    case "monitoring-active":
      return {
        preTenancyRows: [],
        earlyWarnings: earlyWarnings,
        showPreTenancyTable: false,
        showEarlyWarnings: true,
        emptyMessage: null
      };
    case "report-ready":
      return {
        preTenancyRows: preTenanycRows,
        earlyWarnings: earlyWarnings,
        showPreTenancyTable: true,
        showEarlyWarnings: true,
        emptyMessage: null
      };
    default:
      return {
        preTenancyRows: [],
        earlyWarnings: [],
        showPreTenancyTable: false,
        showEarlyWarnings: false,
        emptyMessage: null
      };
  }
};

const StatusBadge = ({ status }) => {
  const map = {
    Stable: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Monitor: "bg-amber-50 text-amber-600 border-amber-200",
    ElevatedRisk: "bg-red-50 text-red-500 border-red-200",
  };
  const label = status === "ElevatedRisk" ? "Elevated Risk" : status;
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${map[status]}`}>
      {label}
    </span>
  );
};

const ScoreBar = ({ score, status }) => {
  const color =
    status === "Stable" ? "bg-emerald-500" :
      status === "Monitor" ? "bg-amber-400" : "bg-red-500";
  return (
    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
    </div>
  );
};

export default function Overview({ onNavigate }) {
  const navigate = useNavigate();
  const [dashState, setDashState] = useState("no-property");
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showPreTenancyModal, setShowPreTenancyModal] = useState(false);
  const [hoveredRisk, setHoveredRisk] = useState(null);
  const [chartView, setChartView] = useState("participation"); // New state for chart toggle

  const states = ["no-property", "no-tenant", "pre-tenancy-active", "monitoring-inactive", "monitoring-active", "report-ready"];

  const handleNextState = () => {
    const currentIndex = states.indexOf(dashState);
    const nextIndex = (currentIndex + 1) % states.length;
    setDashState(states[nextIndex]);
  };

  const handleViewProgress = () => {
    setShowProgressModal(true);
  };

  const handleAddProperty = () => {
    setShowAddPropertyModal(true);
  };

  const handleStartPreTenancy = () => {
    setShowPreTenancyModal(true);
  };

  // Dynamic chart data based on selected view
  const chartDataMap = {
    participation: [
      { day: "Mon", value: 82 },
      { day: "Tue", value: 80 },
      { day: "Wed", value: 85 },
      { day: "Thu", value: 83 },
      { day: "Fri", value: 88 },
      { day: "Sat", value: 90 },
      { day: "Sun", value: 89 },
    ],
    compliance: [
      { day: "Mon", value: 95 },
      { day: "Tue", value: 92 },
      { day: "Wed", value: 88 },
      { day: "Thu", value: 91 },
      { day: "Fri", value: 94 },
      { day: "Sat", value: 96 },
      { day: "Sun", value: 93 },
    ]
  };

  const chartData = chartDataMap[chartView];

  const bannerConfig = {
    "no-property": {
      bg: "bg-gradient-to-r from-violet-600 to-violet-500",
      icon: "🏢",
      title: "Add Your First Property",
      desc: "Get started by adding a property to your portfolio. Manage tenants, track rent, and monitor risk all in one place.",
      btnLabel: "Add Property →",
      btnClass: "bg-white text-violet-700 hover:bg-violet-50",
    },
    "no-tenant": {
      bg: "bg-gradient-to-r from-blue-600 to-blue-500",
      icon: "👤",
      title: "Start a Pre-Tenancy Process",
      desc: "You've added a property. Now see how your applicant actually behaves - before handing over the keys.",
      btnLabel: "Start Pre-Tenancy Process→",
      btnClass: "bg-white text-blue-700 hover:bg-blue-50",
    },
    "pre-tenancy-active": {
      bg: "bg-gradient-to-r from-blue-600 to-blue-500",
      icon: "📋",
      title: "Pre-Tenancy In Progress",
      desc: "Screening assessments are running for your applicants. Review progress in the Pre-Tenancy section.",
      btnLabel: "View Progress →",
      btnClass: "bg-white text-blue-700 hover:bg-blue-50",
    },
    "monitoring-inactive": {
      bg: "bg-gradient-to-r from-gray-600 to-gray-500",
      icon: "📊",
      title: "Monitoring Not Yet Active",
      desc: "Your tenants are onboarded. Activate behavioral monitoring to start tracking engagement and risk.",
      btnLabel: "Activate Monitoring →",
      btnClass: "bg-white text-gray-700 hover:bg-gray-50",
    },
    "monitoring-active": {
      bg: "bg-gradient-to-r from-emerald-600 to-emerald-500",
      icon: "✅",
      title: "Monitoring Active",
      desc: "All systems running. Behavioral data is being collected and analyzed for your portfolio.",
      btnLabel: "View Dashboard →",
      btnClass: "bg-white text-emerald-700 hover:bg-emerald-50",
    },
    "report-ready": {
      bg: "bg-gradient-to-r from-orange-500 to-orange-400",
      icon: "📄",
      title: "Your Report Is Ready",
      desc: "Monthly behavioral risk report is available. Review insights and take action on flagged tenants.",
      btnLabel: "View Report →",
      btnClass: "bg-white text-orange-600 hover:bg-orange-50",
    },
  };

  const banner = bannerConfig[dashState];
  const dynamicData = getDynamicData(dashState);

  return (
    <div className="min-h-screen bg-gray-50">
      <LandlordSidebar activePage="overview" onNavigate={onNavigate} />
      <LandlordTopbar />
      <Layout>
        {/* ── Banner ── */}
        <div className={`${banner.bg} rounded-xl p-5 mb-6 flex items-center justify-between shadow-md`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
              {banner.icon}
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-white">{banner.title}</h2>
              <p className="text-[12px] text-white/80 mt-0.5 max-w-md">{banner.desc}</p>
            </div>
          </div>
          <button
            onClick={
              dashState === "pre-tenancy-active" ? handleViewProgress :
                dashState === "no-property" ? handleAddProperty :
                  dashState === "no-tenant" ? handleStartPreTenancy :
                    dashState === "monitoring-inactive" ? () => navigate("/landlordBehaviouralRisk") :
                      dashState === "report-ready" ? () => navigate("/landlordEarlyWarnings") :
                        handleNextState
            }
            className={`px-4 py-2 rounded-lg text-[12.5px] font-bold transition-all shrink-0 ${banner.btnClass}`}
          >
            {banner.btnLabel}
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {[
            { icon: "🏢", iconBg: "bg-emerald-100", label: "Total Properties", value: "0", change: "+2 added", changeClass: "text-emerald-600" },
            { icon: "👤", iconBg: "bg-blue-100", label: "Active Tenants", value: "10", change: "-4.2%", changeClass: "text-red-500" },
            { icon: "🔔", iconBg: "bg-violet-100", label: "Vacancy Rate", value: "8.4%", change: "-1.2%", changeClass: "text-emerald-600" },
            { icon: "📈", iconBg: "bg-orange-100", label: "Avg. Tenant Stability", value: "92/100", change: "+2.4%", changeClass: "text-emerald-600" },
            { icon: "🛡️", iconBg: "bg-emerald-100", label: "Monitoring Status", value: "Active", change: "", changeClass: "" },
          ].map((card) => (
            <div key={card.label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-8 h-8 ${card.iconBg} rounded-lg flex items-center justify-center text-[15px]`}>
                  {card.icon}
                </div>
                {card.change && (
                  <span className={`text-[10px] font-semibold ${card.changeClass}`}>{card.change}</span>
                )}
              </div>
              <p className="text-[18px] font-extrabold text-gray-900 leading-tight">{card.value}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>

        {/* ── Chart ── */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[14px] font-bold text-gray-900">Tenant Engagement Trends</h3>
              <p className="text-[11.5px] text-gray-400">Weekly behavioural response</p>
            </div>
            <div className="flex gap-3 text-[11.5px] font-semibold">
              <span
                className={`cursor-pointer transition-colors ${chartView === "compliance"
                  ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                  : "text-gray-400 hover:text-gray-600"
                  }`}
                onClick={() => setChartView("compliance")}
              >
                Compliance
              </span>
              <span
                className={`cursor-pointer transition-colors ${chartView === "participation"
                  ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                  : "text-gray-400 hover:text-gray-600"
                  }`}
                onClick={() => setChartView("participation")}
              >
                Participation
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={28} />
              <Tooltip
                contentStyle={{ border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 12 }}
                cursor={{ stroke: "#e5e7eb" }}
              />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ── Behavioral Risk Level ── */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-5">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-[14px] font-bold text-gray-900">Behavioral Risk Level</h3>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {/* <div className="ml-2 bg-orange-50 border border-orange-200 rounded px-2 py-1 text-[9.5px] text-orange-600 font-medium max-w-[200px] leading-tight">
            Your portfolio is currently stable. Review high-risk tenants to maintain performance.
          </div> */}
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: "Elevated Risk", count: "8 Tenants", desc: "Your portfolio is currently stable. Review high-risk tenants to maintain performance.", score: 1, barColor: "bg-red-500", iconColor: "text-red-500", icon: "⚠️" },
              { label: "Elevated Risk", count: "12 Tenants", desc: "Participation decreased over the last 7 days.", score: 4, barColor: "bg-orange-400", iconColor: "text-orange-500", icon: "⏱️" },
              { label: "Monitor", count: "24 Tenants", desc: "Slight deviation in payment regularity.", score: 12, barColor: "bg-yellow-400", iconColor: "text-yellow-500", icon: "👁️" },
              { label: "Stable", count: "154 Tenants", desc: "Consistent behavior and engagement.", score: 24, barColor: "bg-emerald-500", iconColor: "text-emerald-600", icon: "✅" },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-lg p-3 relative"
                onMouseEnter={() => setHoveredRisk(i)}
                onMouseLeave={() => setHoveredRisk(null)}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[13px]">{item.icon}</span>
                  <span className={`text-[11px] font-bold ${item.iconColor}`}>{item.label}</span>
                  <span className={`text-[10px] font-semibold ml-auto ${item.iconColor}`}>{item.count}</span>
                </div>
                <p className="text-[10px] text-gray-400 mb-2 leading-tight">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden mr-2">
                    <div className={`h-full ${item.barColor} rounded-full`} style={{ width: `${Math.min(item.score * 4, 100)}%` }} />
                  </div>
                  <span className="text-[13px] font-extrabold text-gray-800">{item.score}</span>
                </div>

                {/* Tooltip */}
                {hoveredRisk === i && (
                  <div className={`absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-white text-[10px] rounded-lg shadow-lg whitespace-nowrap ${item.label === "Elevated Risk" ? "bg-red-500" :
                    item.label === "Monitor" ? "bg-yellow-400" :
                      item.label === "Stable" ? "bg-emerald-500" :
                        "bg-orange-400"
                    }`}>
                    <div className="font-semibold mb-1">{item.label}</div>
                    <div className="text-white/90">{item.desc}</div>
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 ${item.label === "Elevated Risk" ? "bg-red-500" :
                      item.label === "Monitor" ? "bg-yellow-400" :
                        item.label === "Stable" ? "bg-emerald-500" :
                          "bg-orange-400"
                      }`}></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[11.5px] text-blue-700">
              Your portfolio stability is currently <span className="font-bold">Healthy</span>. Action is recommended for High Risk profiles.
            </p>
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="grid grid-cols-2 gap-4">
          {/* Early Warning Center */}
          {dynamicData.showEarlyWarnings && (
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <h3 className="text-[13.5px] font-bold text-gray-900">Early Warning Center</h3>
                </div>
                <button className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1">
                  View All Alerts
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {dynamicData.earlyWarnings.map((w, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${w.dot} mt-1.5 shrink-0`} />
                    <div>
                      <p className="text-[12.5px] font-semibold text-gray-800">{w.name}</p>
                      <p className="text-[11px] text-gray-400">{w.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pre Tenancy Process */}
          {dynamicData.showPreTenancyTable && (
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm mb-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-bold text-gray-900">Pre-Tenancy Applications</h3>
                <button
                  onClick={handleStartPreTenancy}
                  className="flex items-center gap-2 text-[12px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Start New Process
                </button>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 grid grid-cols-4 gap-2 mb-2 px-1">
                <span>Applicant</span>
                <span>Property</span>
                <span>Status</span>
                <span>Date</span>
              </div>

              <div className="flex flex-col gap-2">
                {dynamicData.preTenancyRows.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 gap-2 items-center py-2 border-t border-gray-50">
                    <div>
                      <p className="text-[12px] font-semibold text-gray-800">{row.name}</p>
                      <p className="text-[10px] text-gray-400">{row.property}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-bold text-gray-800">{row.score}%</span>
                      <span className={`text-[10px] font-semibold ${row.changeType === "up" ? "text-emerald-600" : "text-red-500"}`}>
                        {row.changeType === "up" ? "↑" : "↓"}{row.change}%
                      </span>
                      <ScoreBar score={row.score} status={row.status} />
                    </div>
                    <StatusBadge status={row.status} />
                    <p className="text-[10.5px] text-gray-500">{row.stage}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Demo State Switcher ── */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Demo · Switch Dashboard State</p>
          <div className="flex gap-2 flex-wrap">
            {states.map((s) => (
              <button
                key={s}
                onClick={() => setDashState(s)}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${dashState === s
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Start Pre-Tenancy Modal */}
        {showPreTenancyModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner border border-white/20">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">Start Pre-Tenancy Process</h2>
                      <p className="text-blue-100 text-sm mt-1 opacity-90">Onboard an applicant for behavioral assessment.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPreTenancyModal(false)}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white border border-white/10"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); setShowPreTenancyModal(false); setDashState("pre-tenancy-active"); }}>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">Applicant Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    className="w-full bg-gray-50 border border-gray-1000 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">Applicant Email</label>
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full bg-gray-50 border border-gray-1000 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">Target Property</label>
                  <select className="w-full bg-gray-50 border border-gray-1000 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <option disabled selected>Select from your portfolio...</option>
                    <option>Riverside A-12</option>
                    <option>Park View 101</option>
                    <option>Grand Plaza 3B</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPreTenancyModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                  >
                    Start Assessment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Property Modal */}
        {showAddPropertyModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-400 text-white relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner border border-white/20">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">Add New Property</h2>
                      <p className="text-blue-100 text-sm mt-1 opacity-90">Enter your property details to get started.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddPropertyModal(false)}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white border border-white/10"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); setShowAddPropertyModal(false); setDashState("no-tenant"); }}>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-black-400 px-1">Property Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Riverside Apartments"
                    className="w-full bg-gray-50 border border-gray-1000 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black-500/20 focus:border-black-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-black-400 px-1">Address</label>
                  <input
                    type="text"
                    placeholder="Street address, City, State, Zip"
                    className="w-full bg-gray-50 border border-gray-1000 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black-500/20 focus:border-black-500 transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-black-400 px-1">Property Type</label>
                    <select className="w-full bg-gray-50 border border-gray-1000 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black-500/20 focus:border-black-500 transition-all">
                      <option>Multi-Family</option>
                      <option>Single Family</option>
                      <option>Commercial</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-black-400 px-1">Number of Units</label>
                    <input
                      type="number"
                      placeholder="1"
                      className="w-full bg-gray-50 border border-gray-1000 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black-500/20 focus:border-black-500 transition-all"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddPropertyModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-200 transition-all"
                  >
                    Create Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Progress Modal */}
        {showProgressModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
              <div className="p-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner border border-white/20">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m0 0a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v10" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">Pre-Tenancy Progress</h2>
                      <p className="text-blue-100 text-sm mt-1 opacity-90">Real-time behavior assessment analytics.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowProgressModal(false)}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white border border-white/10"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                {/* Progress Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">7-Day Behavioral Assessment Cycle</h2>

                  {/* Progress bar */}
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: totalDays }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full ${i < currentDay ? "bg-violet-600" : "bg-gray-100"
                          }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">Day {currentDay} of {totalDays}</div>
                </div>

                {/* Day Cards */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {days.map((d, i) => (
                    <DayCard key={d.day} data={d} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}
