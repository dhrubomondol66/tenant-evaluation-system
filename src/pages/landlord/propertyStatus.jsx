import LandlordSidebar from "../../component/landlordComponent/landlordSidebar.jsx";
import LandlordTopbar from "../../component/landlordComponent/landlordTopbar.jsx";
import Layout from "../../component/Layout.jsx";

const properties = [
    {
        id: "oakridge",
        name: "Oak Ridge Tower",
        status: "Trial",
        statusColor: "text-amber-600",
        statusBg: "bg-amber-100",
        sub: "13 days remaining in trial",
        participation: 74,
        healthStatus: "Needs attention",
        primaryAction: { label: "Activate Monitoring", color: "bg-amber-500 hover:bg-amber-600 text-white" },
        secondaryAction: "View Tenant Activity",
        icon: "🏗️",
        priority: 1,
    },
    {
        id: "riverside",
        name: "Riverside Apt",
        status: "Process Active",
        statusColor: "text-blue-600",
        statusBg: "bg-blue-100",
        sub: "Day 4 of 7 in progress",
        progress: 57,
        primaryAction: { label: "Continue Pre-Tenancy Process", color: "bg-blue-600 hover:bg-blue-700 text-white" },
        secondaryAction: "View Tenant Activity",
        icon: "🏢",
        priority: 2,
    },
    {
        id: "maple",
        name: "Maple Heights",
        status: "Vacant",
        statusColor: "text-gray-400",
        statusBg: "bg-gray-100",
        sub: "No tenant screening started for this property",
        primaryAction: { label: "Start Pre-Tenancy Process", color: "bg-gray-800 hover:bg-gray-900 text-white" },
        secondaryAction: "View Applicants",
        icon: "🏠",
        priority: 3,
    },
    {
        id: "grand",
        name: "Grand Plaza",
        status: "Active",
        statusColor: "text-green-600",
        statusBg: "bg-green-100",
        sub: "80 monitoring cycles remaining",
        participation: 94,
        healthStatus: "Healthy",
        primaryAction: { label: "Manage Monitoring", color: "bg-blue-600 hover:bg-blue-700 text-white" },
        secondaryAction: "View Tenant Activity",
        icon: "🏙️",
        priority: 4,
    },
];


export default function PropertyStatusPage({ onNavigate }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <LandlordSidebar activePage="property-status" onNavigate={onNavigate} />
            <LandlordTopbar />
            <Layout>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Property Integrity Control Center</h1>
                <p className="text-[14px] text-gray-500 mb-8">Track tenant Pre-Tenancy progress and ongoing behavioral monitoring for each property.</p>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.sort((a, b) => a.priority - b.priority).map((p) => (
                        <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xl">
                                        {p.icon}
                                    </div>
                                    <div className="text-[15px] font-bold text-gray-900">{p.name}</div>
                                </div>
                                <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${p.statusBg} ${p.statusColor}`}>
                                    {p.status}
                                </span>

                            </div>

                            {/* Sub info */}
                            <div className="mb-6 space-y-4">
                                <div className="text-[12px] font-medium text-gray-900">{p.status === "VACANT PROPERTY" ? "Status" : "Monitoring Status"}</div>
                                <div className="text-[11px] text-gray-500 -mt-3">{p.sub}</div>

                                {p.progress !== undefined && (
                                    <div className="mt-2">
                                        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-1">
                                            <div className="h-1.5 bg-blue-500 rounded-full" style={{ width: `${p.progress}%` }} />
                                        </div>
                                    </div>
                                )}

                                {p.participation !== undefined && (
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[12px] text-gray-500">Tenant participation: <span className="font-semibold text-gray-900">{p.participation}%</span></span>
                                            <span className={`text-[11px] font-bold ${p.healthStatus === 'Healthy' ? 'text-green-600' : (p.healthStatus === 'Critical' ? 'text-red-600' : 'text-amber-600')}`}>
                                                {p.healthStatus}
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full">
                                            <div
                                                className={`h-2 rounded-full ${p.healthStatus === 'Healthy' ? "bg-green-500" :
                                                        p.healthStatus === 'Critical' ? "bg-red-500" :
                                                            "bg-amber-400"
                                                    }`}
                                                style={{ width: `${p.participation}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                                <button className={`w-full py-2.5 rounded-lg text-[13px] font-semibold transition-all ${p.primaryAction.color}`}>
                                    {p.primaryAction.label}
                                </button>
                                <button className="w-full py-2.5 rounded-lg text-[13px] font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
                                    {p.secondaryAction}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </Layout>
        </div>
    );
}