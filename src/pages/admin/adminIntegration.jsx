import { useState } from 'react';
import Sidebar from '../../component/adminComponent/adminSidebar.jsx';
import Topbar from '../../component/adminComponent/adminTopbar.jsx';
import Layout from '../../component/Layout.jsx';

export default function IntegrationPage({ onNavigate }) {
  const [webhooks, setWebhooks] = useState([
    { id: "evt_1OuY...9d2", type: "payment_intent.succeeded", status: "200", label: "OK", latency: "128ms", time: "14:22:10", ok: true },
    { id: "evt_1OuX...1a3", type: "customer.created", status: "200", label: "OK", latency: "89ms", time: "14:20:05", ok: true },
    { id: "evt_1OuW...2v4", type: "charge.failed", status: "500", label: "ERR", latency: "342ms", time: "14:18:42", ok: false },
  ]);

  const [smsEvents, setSmsEvents] = useState([
    { id: "SM77...a81", recipient: "+1 (555) ··· 9012", status: "DELIVERED", proc: "1.1s", time: "14:15:33", ok: true },
    { id: "SM23...b02", recipient: "+44 7700 ··· 1234", status: "DELIVERED", proc: "0.9s", time: "14:12:12", ok: true },
    { id: "SM88...c55", recipient: "+1 (555) ··· 4455", status: "UNDELIVERED", proc: "2.4s", time: "14:05:01", ok: false },
  ]);

  const [selectedProvider, setSelectedProvider] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleRefreshData = () => {
    // Simulate refreshing data
    console.log('Refreshing integration data...');
    alert('Integration data refreshed successfully!');
  };

  const handleRetryWebhook = (webhookId) => {
    console.log('Retrying webhook:', webhookId);
    alert(`Retrying webhook ${webhookId}`);
  };

  const handleResendSMS = (smsId) => {
    console.log('Resending SMS:', smsId);
    alert(`Resending SMS ${smsId}`);
  };

  const filteredWebhooks = webhooks.filter(webhook => {
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'success' && webhook.ok) || 
      (statusFilter === 'error' && !webhook.ok);
    return matchesStatus;
  });

  const filteredSMS = smsEvents.filter(sms => {
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'success' && sms.ok) || 
      (statusFilter === 'error' && !sms.ok);
    return matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activePage="integration" onNavigate={onNavigate} />
      <Topbar />
      <Layout>
        <h1 className="text-xl font-bold text-gray-900 mb-6">Security, Backups & Deployments</h1>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-300"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
            </select>
            <button 
              onClick={handleRefreshData}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: "Stripe Status", val: "99.99%", sub: "Uptime (Last 30d)", badge: "HEALTHY", badgeColor: "bg-green-100 text-green-600" },
            { label: "Twilio Status", val: "Operational", sub: "All regions active", badge: "HEALTHY", badgeColor: "bg-green-100 text-green-600" },
            { label: "Failed Events", val: "42", sub: "-12% vs yesterday", subColor: "text-red-500" },
            { label: "Avg Latency", val: "142ms", sub: "↗ -5ms optimization", subColor: "text-green-500" },
          ].map((c) => (
            <div key={c.label} className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{c.label}</span>
                {c.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badgeColor}`}>● {c.badge}</span>
                )}
              </div>
              <div className="text-xl font-bold text-gray-900">{c.val}</div>
              <div className={`text-[11px] mt-1 ${c.subColor || "text-gray-400"}`}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Stripe & Twilio Cards */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Stripe */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">$</span>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-gray-800">Stripe</div>
                  <div className="text-[12px] text-gray-400">Payment Infrastructure</div>
                </div>
              </div>
              <button className="text-gray-300 hover:text-gray-500">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M23 4a1 1 0 00-1.45-.89L1 12l9 2 2 9 11-19z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-[12px]">
              <div><div className="text-gray-400 mb-1">CONNECTION</div><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />Active</span></div>
              <div><div className="text-gray-400 mb-1">MODE</div><span className="text-blue-500 font-medium">Live</span></div>
              <div><div className="text-gray-400 mb-1">WEBHOOK STATUS</div><span className="text-green-500 font-medium">Healthy</span></div>
              <div><div className="text-gray-400 mb-1">LAST EVENT</div><span className="text-gray-700">2m ago</span></div>
              <div><div className="text-gray-400 mb-1">FAILED (24H)</div><span className="text-red-500 font-medium">4 events</span></div>
              <div><div className="text-gray-400 mb-1">API LATENCY</div><span className="text-gray-700">142ms</span></div>
            </div>
          </div>

          {/* Twilio */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="1.8" />
                    <path d="M3 9l9 6 9-6" stroke="white" strokeWidth="1.8" />
                  </svg>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-gray-800">Twilio</div>
                  <div className="text-[12px] text-gray-400">SMS Infrastructure</div>
                </div>
              </div>
              <button className="text-gray-300 hover:text-gray-500">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M7 16H3v4h4v-4zM13 10H9v10h4V10zM21 3h-4v17h4V3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-[12px]">
              <div><div className="text-gray-400 mb-1">PROVIDER</div><span className="text-gray-700">Twilio (US-East)</span></div>
              <div><div className="text-gray-400 mb-1">DELIVERY RATE</div><span className="text-green-500 font-medium">99.8%</span></div>
              <div><div className="text-gray-400 mb-1">QUEUE BACKLOG</div><span className="text-gray-700">12 items</span></div>
              <div><div className="text-gray-400 mb-1">LAST FAILURE</div><span className="text-gray-700">4h ago</span></div>
              <div><div className="text-gray-400 mb-1">RATE</div><span className="text-green-500 font-medium">Normal</span></div>
              <div><div className="text-gray-400 mb-1">AVG PROC. TIME</div><span className="text-gray-700">1.2s</span></div>
            </div>
          </div>
        </div>

        {/* Activity Tables */}
        <div className="grid grid-cols-2 gap-4">
          {/* Webhook Activity */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] font-semibold text-gray-800">Recent Webhook Activity</span>
              <span className="text-[11px] text-blue-500 font-medium cursor-pointer hover:underline">REAL-TIME FEED</span>
            </div>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100">
                  <th className="text-left pb-2 font-medium">EVENT ID</th>
                  <th className="text-left pb-2 font-medium">TYPE</th>
                  <th className="text-left pb-2 font-medium">STATUS</th>
                  <th className="text-left pb-2 font-medium">LATENCY</th>
                  <th className="text-left pb-2 font-medium">TIME</th>
                  <th className="text-left pb-2 font-medium">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredWebhooks.map((w) => (
                  <tr key={w.id}>
                    <td className="py-2.5 text-gray-500">{w.id}</td>
                    <td className="py-2.5 text-gray-700">{w.type}</td>
                    <td className="py-2.5">
                      <span className={`inline-flex flex-col items-center px-2 py-0.5 rounded font-bold text-[10px] leading-tight ${w.ok ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"}`}>
                        <span>{w.status}</span>
                        <span>{w.label}</span>
                      </span>
                    </td>
                    <td className="py-2.5 text-gray-600">{w.latency}</td>
                    <td className="py-2.5 text-gray-400">{w.time}</td>
                    <td className="py-2.5">
                      {!w.ok && (
                        <button 
                          onClick={() => handleRetryWebhook(w.id)}
                          className="text-xs text-blue-500 hover:underline"
                        >
                          Retry
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SMS Events */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] font-semibold text-gray-800">Recent SMS Events</span>
              <span className="text-[11px] text-blue-500 font-medium cursor-pointer hover:underline">GLOBAL QUEUE</span>
            </div>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100">
                  <th className="text-left pb-2 font-medium">MSG ID</th>
                  <th className="text-left pb-2 font-medium">RECIPIENT</th>
                  <th className="text-left pb-2 font-medium">STATUS</th>
                  <th className="text-left pb-2 font-medium">PROC</th>
                  <th className="text-left pb-2 font-medium">TIME</th>
                  <th className="text-left pb-2 font-medium">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredSMS.map((s) => (
                  <tr key={s.id}>
                    <td className="py-2.5 text-gray-500">{s.id}</td>
                    <td className="py-2.5 text-gray-700">{s.recipient}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${s.ok ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-gray-600">{s.proc}</td>
                    <td className="py-2.5 text-gray-400">{s.time}</td>
                    <td className="py-2.5">
                      {!s.ok && (
                        <button 
                          onClick={() => handleResendSMS(s.id)}
                          className="text-xs text-blue-500 hover:underline"
                        >
                          Resend
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}