import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LandlordSidebar from "../../component/landlordComponent/landlordSidebar.jsx";
import LandlordTopbar from "../../component/landlordComponent/landlordTopbar.jsx";
import Layout from "../../component/Layout.jsx";

const earlySignals = [
    { day: "Day 1", title: "Participation Pattern", desc: "Initial engagement shows immediate responsiveness to the integrity cycle setup.", status: "Stabilized", color: "text-green-600" },
    { day: "Day 2", title: "Response Timing", desc: "Average response time is 1.4 hours, well within the optimal engagement window.", status: "Optimal", color: "text-blue-600" },
    { day: "Day 3", title: "Engagement Consistency", desc: "No deviation in response patterns detected over the last 3 cycles.", status: "High Consistency", color: "text-indigo-600" },
];

const lockedSections = [
    { day: "Day 4", label: "Behavioral Drivers", desc: "Full behavioral analysis is available in the complete report." },
    { day: "Day 5", label: "Stability Projection", desc: "Full behavioral analysis is available in the complete report." },
    { day: "Day 6", label: "Risk Probability", desc: "Full behavioral analysis is available in the complete report." },
    { day: "Day 7", label: "Recommended Action", desc: "Full behavioral analysis is available in the complete report." },
];

export default function BehavioralReportPage({ onNavigate }) {
    const [expanded, setExpanded] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            <LandlordSidebar activePage="pre-tenancy" onNavigate={onNavigate} />
            <LandlordTopbar />
            <Layout>
                {/* Header */}
                <div className="w-full max-w-3xl mb-8">
                    <div className="text-[12px] text-gray-400 mb-2">
                        Reports &gt; <span className="text-gray-500">Behavioral Report</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Behavioral Report</h1>
                    <p className="text-gray-500 mt-1">Initial behavioral insights based on the tenant’s participation in the integrity cycle.</p>
                </div>

                <div className="w-full max-w-3xl">
                    {/* Report Content Card */}
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm relative">
                        {/* Status Badge */}
                        <div className="absolute top-8 right-8 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[12px] font-bold">
                            PREVIEW READY (DAY 3)
                        </div>

                        {/* Early Behavioral Signals */}
                        <div className="mb-10">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                Early Behavioral Signals (First 3 Days)
                            </h2>
                            
                            <div className="grid grid-cols-3 gap-4">
                                {earlySignals.map((s) => (
                                    <div key={s.day} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-between h-full">
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{s.day}</span>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-gray-200 ${s.color}`}>
                                                    {s.status}
                                                </span>
                                            </div>
                                            <h3 className="text-[14px] font-bold text-gray-800 mb-2">{s.title}</h3>
                                            <p className="text-[12px] text-gray-500 leading-relaxed">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Analysis Grid */}
                        <div className="mb-10">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">In-Depth Behavioral Tracking</h2>
                            <div className="grid grid-cols-1 gap-3">
                                {lockedSections.map((s) => (
                                    <div key={s.day} className="flex items-center justify-between p-5 bg-gray-50 border border-gray-200 rounded-2xl group opacity-80">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                                                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                                                    <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="text-[11px] font-bold text-gray-400">{s.day}</span>
                                                    <h3 className="text-[14px] font-bold text-gray-400">{s.label}</h3>
                                                </div>
                                                <p className="text-[12px] text-gray-400">{s.desc}</p>
                                            </div>
                                        </div>
                                        <div className="text-[11px] font-bold text-gray-300 uppercase">Locked</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Behavioral Observation Detail */}
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10">
                            <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-2">Cycle Entry Note</div>
                            <p className="text-[15px] text-blue-900 font-medium leading-relaxed italic">
                                "Applicant demonstrates high participation intent. Engagement patterns in the first 72 hours are 14% higher than the baseline for this asset class."
                            </p>
                        </div>

                        {/* CTA Section */}
                        <div className="pt-6 border-t border-gray-100 flex flex-col items-center">
                            <p className="text-[13px] text-gray-600 mb-4 font-medium">See the full behavioral analysis and risk indicators before making a rental decision.</p>
                            <button className="w-full py-4 bg-blue-600 text-white text-[16px] font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                View Full Report
                            </button>
                            <p className="text-[11px] text-gray-400 mt-4">Full behavioral data unlocks upon completion of the 7-day integrity cycle.</p>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}
