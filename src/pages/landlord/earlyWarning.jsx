import LandlordSidebar from "../../component/landlordComponent/landlordSidebar.jsx";
import LandlordTopbar from "../../component/landlordComponent/landlordTopbar.jsx";
import Layout from "../../component/Layout.jsx";

const initialCriticalTenants = [
    {
        id: 1,
        name: "James Miller",
        address: "1016 Craig St",
        unit: "Unit 402 • 2yr Tenant",
        participation: 72,
        prevParticipation: 88,
        delta: "↓ 16%",
        trend: "down",
        severity: "High",
        severityColor: "text-red-600 bg-red-100",
        detected: "2 days ago",
        isNew: true,
        observation: "Participation dropped from 88% to 72% in the last 7 days. Behavioral shifts detected in communication patterns.",
        priority: 1
    },
    {
        id: 2,
        name: "Linda Wu",
        address: "742 Evergreen Terrace",
        unit: "Unit 115 • 8yr Tenant",
        participation: 55,
        prevParticipation: 85,
        delta: "↓ 30%",
        trend: "down",
        severity: "High",
        severityColor: "text-red-700 bg-red-200",
        detected: "5 hours ago",
        isNew: true,
        observation: "Participation dropped from 85% to 55% in the last 7 days. Multiple missed response cycles.",
        priority: 1
    },
    {
        id: 3,
        name: "Robert Fox",
        address: "125 Oak St",
        unit: "Unit 204 • 1yr Tenant",
        participation: 78,
        prevParticipation: 84,
        delta: "↓ 6%",
        trend: "down",
        severity: "Moderate",
        severityColor: "text-amber-600 bg-amber-100",
        detected: "3 days ago",
        isNew: false,
        observation: "Participation dropped from 84% to 78% in the last 7 days. Slight delay in response timing.",
        priority: 2
    },
    {
        id: 4,
        name: "Sarah Jenkins",
        address: "404 Lakeview",
        unit: "Unit 505 • 4yr Tenant",
        participation: 82,
        prevParticipation: 90,
        delta: "↓ 8%",
        trend: "down",
        severity: "Low",
        severityColor: "text-blue-600 bg-blue-100",
        detected: "1 day ago",
        isNew: false,
        observation: "Slight decrease in platform engagement scores over the last billing cycle.",
        priority: 3
    },
];


const resolved = [
    {
        name: "Sarah Jenkins",
        unit: "Unit 505 • 4yr Tenant",
        participation: 96,
        delta: "+14%",
        deltaColor: "text-green-600",
        note: "Full recovery of engagement levels",
        resolvedDate: "Oct 24",
    },
];

import { useState } from 'react';

export default function EarlyWarningsPage({ onNavigate }) {
    const [alerts, setAlerts] = useState(initialCriticalTenants);
    const [feedback, setFeedback] = useState(null);

    const handleAction = (id, message) => {
        setFeedback(message);
        setTimeout(() => setFeedback(null), 3000);
    };

    const markAsReviewed = (id) => {
        setAlerts(alerts.filter(a => a.id !== id));
        handleAction(id, "Alert marked as reviewed");
    };

    const sortedAlerts = [...alerts].sort((a, b) => a.priority - b.priority);

    const getTrendIcon = (trend, pct) => {
        if (pct >= 85) return "";
        if (pct >= 70) return "";
        return "";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <LandlordSidebar activePage="early-warnings" onNavigate={onNavigate} />
            <LandlordTopbar />
            <Layout>
                <div className="flex items-center justify-between mb-1">
                        <h1 className="text-xl font-bold text-gray-900">Early Warning Center</h1>
                        <span className="text-[14px] font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                            {alerts.length} alerts detected
                        </span>
                </div>
                <p className="text-[13px] text-gray-500 mb-2">
                    Detect behavioral changes before they become costly tenant issues.
                </p>
                <p className="text-[12px] text-gray-400 mb-6 font-medium italic">
                    "2 tenants require immediate attention. 1 recently resolved."
                </p>

                {feedback && (
                    <div className="fixed top-20 right-10 bg-green-600 text-white text-[14px] font-bold px-6 py-3 rounded-2xl shadow-xl z-50 animate-bounce flex items-center gap-2 border-2 border-white">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {feedback}
                    </div>
                )}


                {/* Critical Attention */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                            <path d="M12 8v4" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="12" cy="16" r="1.2" fill="white" />
                        </svg>
                    </div>
                    <span className="text-[13px] font-bold text-red-500 uppercase tracking-wide">Action Required</span>
                </div>

                <div className="flex flex-col gap-4 mb-8 w-[80%]">
                    {sortedAlerts.map((t) => (
                        <div key={t.id} className="bg-white border border-gray-100 rounded-xl p-5 relative">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-[13px]">
                                        {t.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-semibold text-gray-900">{t.name} • <span className="text-gray-500 font-normal">{t.address}</span></div>
                                        <div className="text-[11px] text-gray-400 mt-0.5">{t.unit}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${t.severityColor}`}>{t.severity.toUpperCase()}</span>
                                    <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                                        Detected {t.detected} {t.isNew && <span className="text-blue-500 font-bold ml-1">• New</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Participation */}
                            <div className="mb-3">
                                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-1">Participation Rate (30D)</div>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-2xl font-bold text-gray-900">{getTrendIcon(t.trend, t.participation)} {t.participation}% <span className="text-[18px] ml-1">{t.trend === 'down' ? '↓' : '↑'}</span></span>
                                    <span className={`text-[12px] font-semibold text-red-500 uppercase`}>{t.delta}</span>
                                </div>
                                <div className="text-[11px] text-red-500 font-medium">Participation dropped from {t.prevParticipation}% to {t.participation}% in the last 7 days</div>
                                <div className="text-[10px] text-gray-400 mt-1 italic">Severity: {t.severity}</div>
                            </div>

                            {/* Observation */}
                            <div className="mb-4">
                                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-1">Observation</div>
                                <p className="text-[12px] text-gray-600 leading-relaxed">{t.observation}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <button
                                            onClick={() => handleAction(t.id, "Check-in message sent")}
                                            className="w-full py-2.5 bg-blue-600 text-white text-[13px] font-bold rounded-xl hover:bg-blue-700 transition-all shadow-sm"
                                        >
                                            Check In With Tenant
                                        </button>
                                        <div className="text-[10px] text-gray-400 mt-1.5 text-center font-medium">Send a quick message to confirm status.</div>
                                    </div>
                                    <div className="flex-1">
                                        <button
                                            onClick={() => handleAction(t.id, "Tenant marked for monitoring")}
                                            className="w-full py-2.5 text-[13px] text-gray-700 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all font-bold"
                                        >
                                            Mark for Monitoring
                                        </button>
                                        <div className="text-[10px] text-gray-400 mt-1.5 text-center font-medium">Add this tenant to your watch list.</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <button
                                            onClick={() => handleAction(t.id, "Review scheduled")}
                                            className="w-full py-2.5 text-[13px] text-gray-700 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all font-bold"
                                        >
                                            Schedule Participation Review
                                        </button>
                                        <div className="text-[10px] text-gray-400 mt-1.5 text-center font-medium">Set a reminder to review engagement.</div>
                                    </div>
                                    <div className="flex-1">
                                        <button
                                            onClick={() => markAsReviewed(t.id)}
                                            className="w-full py-2.5 text-[13px] text-green-700 border-2 border-green-100 bg-green-50 rounded-xl hover:bg-green-100 transition-all font-bold flex items-center justify-center gap-1.5"
                                        >
                                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                                                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Mark as Reviewed
                                        </button>
                                        <div className="text-[10px] text-gray-400 mt-1.5 text-center font-medium">Dismiss this alert from the list.</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Recently Resolved */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24">
                            <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="text-[13px] font-bold text-green-600 uppercase tracking-wide">Recently Resolved</span>
                </div>

                <div className="flex flex-col gap-4">
                    {resolved.map((t) => (
                        <div key={t.name} className="bg-white border border-gray-100 rounded-xl p-5 w-[80%]">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-[13px]">
                                        {t.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div>
                                        <div className="text-[14px] font-semibold text-gray-900">{t.name}</div>
                                        <div className="text-[11px] text-gray-400">{t.unit}</div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2.5 py-1 rounded-full">RESOLVED</span>
                            </div>

                            <div className="mb-2">
                                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mb-1">Participation Rate (30D)</div>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-2xl font-bold text-gray-900">{t.participation}%</span>
                                    <span className={`text-[12px] font-semibold ${t.deltaColor}`}>{t.delta}</span>
                                </div>
                                <div className="text-[11px] text-green-600">{t.note}</div>
                            </div>

                            <div className="mt-3 w-full py-2.5 bg-green-50 border border-green-200 text-green-700 text-[12px] font-semibold rounded-lg text-center">
                                Intervention Successful • {t.resolvedDate}
                            </div>
                        </div>
                    ))}
                </div>
            </Layout>
        </div>
    );
}