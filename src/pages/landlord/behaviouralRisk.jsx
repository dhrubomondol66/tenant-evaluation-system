import { useState } from 'react';
import LandlordSidebar from "../../component/landlordComponent/landlordSidebar.jsx";
import LandlordTopbar from "../../component/landlordComponent/landlordTopbar.jsx";
import Layout from "../../component/Layout.jsx";

const tenants = [
    {
        name: "Marcus Vane", property: "Las Brias Drive", level: "Monitor",
        riskTag: "Elevated Risk", riskColor: "text-red-600", tagBg: "bg-red-50",
        participation: 54, participationDelta: "-14%", participationNote: "Multiple missed response windows",
        noteColor: "text-red-500",
        priority: 1
    },
    {
        name: "Jordan Hayes", property: "Stacie Heights A-152", level: "Trial",
        riskTag: "Monitor", riskColor: "text-orange-600", tagBg: "bg-orange-50",
        participation: 68, participationDelta: "-5%", participationNote: "Slight delay in response timing",
        noteColor: "text-orange-500",
        priority: 2
    },
    {
        name: "Sarah Chen", property: "Lakeside Terrace A-52", level: "Active",
        riskTag: "Stable", riskColor: "text-green-600", tagBg: "bg-green-50",
        participation: 91, participationDelta: "+2%", participationNote: "Consistent engagement patterns",
        noteColor: "text-green-600",
        priority: 3
    },
    {
        name: "Linda Wu", property: "Maple Heights A-185", level: "Active",
        riskTag: "Stable", riskColor: "text-green-600", tagBg: "bg-green-50",
        participation: 94, participationDelta: "+1%", participationNote: "All integrity checks passed",
        noteColor: "text-green-600",
        priority: 3
    },
];

function TenantCard({ t }) {
    const getParticipationColor = (pct) => {
        if (pct >= 80) return "bg-green-500";
        if (pct >= 60) return "bg-orange-500";
        return "bg-red-500";
    };

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-[14px]">
                        {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="grid grid-cols-4 flex-1 gap-8">
                        <div>
                            <div className="text-[15px] font-bold text-gray-900">{t.name}</div>
                            <div className="text-[12px] text-gray-400">{t.property}</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Status</div>
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${t.tagBg} ${t.riskColor}`}>{t.riskTag}</span>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Participation</div>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getParticipationColor(t.participation)}`} />
                                <span className="text-[15px] font-bold text-gray-900">{t.participation}%</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Observations</div>
                            <div className={`text-[12px] font-medium ${t.noteColor}`}>{t.participationNote}</div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 ml-8">
                    <button className="px-5 py-2.5 bg-blue-600 text-white text-[13px] font-bold rounded-xl hover:bg-blue-700 transition-all">
                        Follow Up With Tenant
                    </button>
                    <button className="px-5 py-2.5 border border-gray-200 text-gray-600 text-[13px] font-bold rounded-xl hover:bg-gray-50 transition-all">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function BehaviouralRiskPage({ onNavigate }) {
    const [activeTab, setActiveTab] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        console.log(`Filter changed to: ${tab}`);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        console.log(`Searching for: ${e.target.value}`);
    };

    const filterTenants = (tenants) => {
        let filtered = tenants;

        // Filter by tab
        if (activeTab !== "All") {
            if (activeTab === "Stable") {
                filtered = filtered.filter(t => t.riskTag === "Stable");
            } else if (activeTab === "At Risk") {
                filtered = filtered.filter(t => t.riskTag === "Elevated Risk");
            } else if (activeTab === "Early Warning Signals") {
                filtered = filtered.filter(t => t.participation < 50);
            }
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(t =>
                t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.property.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    const filteredTenants = filterTenants(tenants);

    return (
        <div className="min-h-screen bg-gray-50">
            <LandlordSidebar activePage="behavioural-risk" onNavigate={onNavigate} />
            <LandlordTopbar />
            <Layout>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tenant Risk Monitor</h1>
                        <p className="text-[14px] text-gray-500 mt-1">Monitor tenant behavioral signals and participation trends across your properties.</p>
                    </div>

                    <button className="flex items-center gap-2 border border-gray-200 text-gray-700 text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-all">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                            <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        View Master List
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {[
                        { label: "Requires Attention", val: "1", pct: "25%", bg: "bg-red-50", color: "text-red-700", dot: "bg-red-500" },
                        { label: "Early Warning Signals", val: "1", pct: "25%", bg: "bg-orange-50", color: "text-orange-700", dot: "bg-orange-500" },
                        { label: "Stable Participation", val: "2", pct: "50%", bg: "bg-green-50", color: "text-green-700", dot: "bg-green-500" },
                    ].map((s) => (
                        <div key={s.label} className={`${s.bg} rounded-2xl p-6 border border-transparent hover:border-gray-200 transition-all`}>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                                    <span className={`text-[12px] font-bold uppercase tracking-wider ${s.color}`}>{s.label}</span>
                                </div>
                                <span className={`${s.color} text-[12px] font-bold`}>{s.pct}</span>
                            </div>
                            <div className={`text-3xl font-bold ${s.color}`}>{s.val}</div>
                        </div>
                    ))}
                </div>


                {/* Filter Tabs */}
                <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" fill="none" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        <input
                            value={searchTerm}
                            onChange={handleSearch}
                            className="pl-9 pr-4 py-2 text-[13px] bg-white border border-gray-200 rounded-lg w-72 placeholder-gray-400 focus:outline-none focus:border-blue-300 transition-all"
                            placeholder="Search by tenant name or property..."
                        />
                    </div>
                    <div className="flex gap-1">
                        {["All", "Stable", "At Risk", "Early Warning Signals"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${tab === activeTab ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards List (Single Column) */}
                <div className="flex flex-col gap-4">
                    {filteredTenants
                        .sort((a, b) => a.priority - b.priority)
                        .map((t, i) => <TenantCard key={i} t={t} />)}
                </div>

            </Layout>
        </div>
    );
}