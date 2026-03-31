import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandlordSidebar from "../../component/landlordComponent/landlordSidebar.jsx";
import LandlordTopbar from "../../component/landlordComponent/landlordTopbar.jsx";
import Layout from "../../component/Layout.jsx";

const applicants = [
    { name: "Applicant 1", property: "Maple Heights A-12", score: 62, trend: [40, 55, 62], riskTag: "STABLE", riskSub: "STABLE PARTICIPATION", tagColor: "bg-green-100 text-green-700", trendColor: "bg-green-400", low: "10%", high: "61%" },
    { name: "Applicant 1", property: "Riverside Apt B-08", score: 79, trend: [55, 68, 79], riskTag: "STABLE", riskSub: null, tagColor: "bg-green-100 text-green-700", trendColor: "bg-green-400", low: "14%", high: "44%" },
    { name: "Applicant 1", property: "Grand Plaza 33", score: 76, trend: [50, 65, 76], riskTag: "STABLE", riskSub: null, tagColor: "bg-green-100 text-green-700", trendColor: "bg-green-400", low: "14%", high: "41%" },
    { name: "Applicant 1", property: "Oak Ridge Tower 7F", score: 73, trend: [60, 55, 73], riskTag: "MONITOR", riskSub: "NEEDS ATTENTION", tagColor: "bg-yellow-100 text-yellow-700", trendColor: "bg-yellow-400", low: "65%", high: "20%" },
    { name: "Applicant 1", property: "Lakeview Estate 2A", score: 45, trend: [70, 50, 45], riskTag: "HIGH RISK", riskSub: null, tagColor: "bg-red-100 text-red-600", trendColor: "bg-red-400", low: "69%", high: "28%" },
    { name: "Applicant 1", property: "Cedar Point A-01", score: 67, trend: [45, 60, 67], riskTag: "MONITOR", riskSub: null, tagColor: "bg-yellow-100 text-yellow-700", trendColor: "bg-yellow-400", low: "10%", high: "13%" },
];

function MiniBar({ pct, color }) {
    return (
        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
        </div>
    );
}

export default function PreTenancyPage({ onNavigate }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        console.log('Searching applicants:', e.target.value);
    };

    const filteredApplicants = applicants.filter(applicant =>
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.property.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <LandlordSidebar activePage="pre-tenancy" onNavigate={onNavigate} />
            <LandlordTopbar />
            <Layout>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Behavioural pretencys</h1>
                        <p className="text-[13px] text-gray-500 mt-0.5">Manage and track applicant integrity assessments</p>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 text-white text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                        <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        New pretency
                    </button>
                </div>

                {/* Filters */}
                <div className="flex items-center justify-between mb-5">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" fill="none" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" />
                            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        <input
                            value={searchTerm}
                            onChange={handleSearch}
                            className="pl-9 pr-4 py-2 text-[13px] bg-white border border-gray-200 rounded-lg w-72 placeholder-gray-400 focus:outline-none focus:border-blue-300 transition-all"
                            placeholder="Search applicants, properties..."
                        />
                    </div>
                    <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-3 py-2 text-[13px] text-gray-600 cursor-pointer hover:bg-gray-50">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#6b7280" strokeWidth="1.8" />
                            <line x1="16" y1="2" x2="16" y2="6" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="8" y1="2" x2="8" y2="6" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" />
                            <line x1="3" y1="10" x2="21" y2="10" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        Last 30 Days
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" /></svg>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                    <table className="w-full text-[12px]">
                        <thead>
                            <tr className="border-b border-gray-100 text-[11px] text-gray-400 font-semibold uppercase tracking-wide">
                                <th className="text-left px-5 py-3">Applicant</th>
                                <th className="text-left px-5 py-3">Property</th>
                                <th className="text-left px-5 py-3">Risk Trend</th>
                                <th className="text-left px-5 py-3">Elevated Risk</th>
                                <th className="text-left px-5 py-3">History</th>
                                <th className="px-5 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredApplicants.map((a, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-all">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-[11px] font-bold">A</div>
                                            <div>
                                                <div className="font-semibold text-gray-800">{a.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-gray-500">{a.property}</td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-end gap-0.5 h-6">
                                                {a.trend.map((v, j) => (
                                                    <div key={j} className={`w-1.5 rounded-sm ${a.trendColor}`} style={{ height: `${(v / 80) * 100}%` }} />
                                                ))}
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <MiniBar pct={parseInt(a.low)} color="bg-gray-200" />
                                                <MiniBar pct={parseInt(a.high)} color={a.trendColor} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex flex-col gap-1">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit ${a.tagColor}`}>
                                                {a.riskTag}
                                            </span>
                                            {a.riskSub && (
                                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 w-fit">
                                                    {a.riskSub}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <button onClick={() => navigate('/landlordReport')} className="flex items-center gap-1.5 text-blue-500 text-[12px] font-medium hover:underline">
                                            <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.8" />
                                                <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.8" />
                                            </svg>
                                            View Report
                                        </button>
                                    </td>
                                    <td className="px-5 py-3.5 text-gray-400 cursor-pointer">···</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[12px] text-gray-400">Showing 5 of 124 results</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((p) => (
                                <button key={p} className={`w-7 h-7 rounded-lg text-[12px] font-medium ${p === 1 ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>{p}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}