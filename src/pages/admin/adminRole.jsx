import { useState } from 'react';
import Sidebar from '../../component/adminComponent/adminSidebar.jsx';
import Topbar from '../../component/adminComponent/adminTopbar.jsx';
import Layout from '../../component/Layout.jsx';

const initialUsers = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "s.jenkins@company.com",
    role: "Compliance Lead",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
    lastAction: "Oct 26, 14:22",
    actionLabel: "Policy Update",
    mfa: "Enabled",
    mfaOk: true,
    risk: "Normal",
    riskColor: "text-gray-600",
  },
  {
    id: 2,
    name: "Robert Chen",
    email: "r.chen@company.com",
    role: "IT Auditor",
    status: "Locked",
    statusColor: "bg-amber-100 text-amber-700",
    lastAction: "Oct 25, 09:10",
    actionLabel: "Failed Login",
    mfa: "Not Enabled",
    mfaOk: false,
    risk: "Suspicious",
    riskColor: "text-red-500",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    email: "e.rod@company.com",
    role: "Security Analyst",
    status: "Inactive",
    statusColor: "bg-gray-100 text-gray-600",
    lastAction: "Oct 20, 11:45",
    actionLabel: "Session End",
    mfa: "Enabled",
    mfaOk: true,
    risk: "Normal",
    riskColor: "text-gray-600",
  },
];

export default function RolesPage({ onNavigate }) {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddManagerModal, setShowAddManagerModal] = useState(false);

  const handleUserAction = (action, userId) => {
    console.log(`Action: ${action} for user ${userId}`);
    
    switch(action) {
      case 'toggleMFA':
        setUsers(users.map(user => 
          user.id === userId 
            ? { ...user, mfaOk: !user.mfaOk, mfa: !user.mfaOk ? 'Enabled' : 'Not Enabled' }
            : user
        ));
        break;
      case 'unlock':
        setUsers(users.map(user => 
          user.id === userId 
            ? { ...user, status: 'Active', statusColor: 'bg-green-100 text-green-700' }
            : user
        ));
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this user?')) {
          setUsers(users.filter(user => user.id !== userId));
        }
        break;
      default:
        break;
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for users:`, selectedUsers);
    if (action === 'delete' && selectedUsers.length > 0) {
      if (confirm(`Are you sure you want to delete ${selectedUsers.length} user(s)?`)) {
        setUsers(users.filter(user => !selectedUsers.includes(user.id)));
        setSelectedUsers([]);
      }
    }
  };

  const handleAddManager = () => {
    setShowAddManagerModal(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activePage="roles" onNavigate={onNavigate} />
      <Topbar />
      <Layout>
        <h1 className="text-xl font-bold text-gray-900 mb-1">System Reports & Audit Logs</h1>
        <p className="text-[13px] text-gray-500 mb-6">
          Comprehensive activity logs and detailed audit history for enterprise governance. Monitor
          administrative changes, permission escalations, and security events in real-time.
        </p>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-300"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-300"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="locked">Locked</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* MFA Adoption */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="text-[12px] text-gray-500 mb-2">Security Health: MFA Adoption</div>
            <div className="text-3xl font-bold text-blue-600 mb-3">94%</div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: "94%" }} />
            </div>
            <div className="text-[11px] text-green-500 mt-2">✓ Target exceeded by 4% this month</div>
          </div>

          {/* Active Flags */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="text-[12px] text-gray-500 mb-2">Active Flags</div>
            <div className="flex items-center gap-2 mb-1">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#f59e0b" strokeWidth="1.8" />
                <line x1="12" y1="9" x2="12" y2="13" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="12" y1="17" x2="12.01" y2="17" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="text-3xl font-bold text-gray-900">12</div>
            </div>
            <div className="text-[11px] text-gray-500">Critical incidents pending</div>
            <div className="text-[11px] text-red-500 mt-0.5">+2% vs last week</div>
          </div>

          {/* Governance Audit */}
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[12px] text-gray-500">Recent Governance Audit</div>
              <button 
                onClick={() => alert('Refreshing audit data...')}
                className="text-gray-300 hover:text-gray-500"
              >
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                  <polyline points="1 4 1 10 7 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M3.51 15a9 9 0 102.13-9.36L1 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="text-[12px] text-gray-700 mt-2">
              Last audit: <span className="font-semibold">Oct 24, 2023</span>
            </div>
            <div className="text-[12px] text-gray-500 mt-1">
              Last security report: <span className="font-medium">16 hours ago</span>
            </div>
            <button 
              onClick={() => alert('Viewing full audit trail...')}
              className="text-[12px] text-blue-500 mt-3 hover:underline flex items-center gap-1"
            >
              View full audit trail →
            </button>
          </div>
        </div>

        {/* Governance Controls Table */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 mb-4">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-semibold text-gray-800">Governance Controls</span>
              <button 
                onClick={() => alert('Bulk actions...')}
                className="text-[12px] text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-1 hover:bg-gray-50 transition-all"
              >
                Bulk Actions
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <button 
              onClick={handleAddManager}
              className="flex items-center gap-2 bg-blue-600 text-white text-[12px] font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Add Manager
            </button>
          </div>

          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-medium">
                <th className="text-left pb-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(u => u.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                    className="mr-2"
                  />
                  User
                </th>
                <th className="text-left pb-3">Role</th>
                <th className="text-left pb-3">Status</th>
                <th className="text-left pb-3">Last Admin Action</th>
                <th className="text-left pb-3">MFA Status</th>
                <th className="text-left pb-3">Risk Flag</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((u) => (
                <tr key={u.email}>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(u.id)}
                        onChange={() => handleSelectUser(u.id)}
                        className="mr-2"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">{u.name}</div>
                        <div className="text-gray-400 text-[11px]">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 text-gray-600">{u.role}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${u.statusColor}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <div className="text-gray-700">{u.lastAction}</div>
                    <div className="text-gray-400 text-[11px]">{u.actionLabel}</div>
                  </td>
                  <td className="py-3.5">
                    <button 
                      onClick={() => handleUserAction('toggleMFA', u.id)}
                      className={`flex items-center gap-1.5 ${u.mfaOk ? "text-green-600" : "text-red-500"} hover:opacity-80`}
                    >
                      {u.mfaOk ? (
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M12 8v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <circle cx="12" cy="16" r="1" fill="currentColor" />
                        </svg>
                      )}
                      {u.mfa}
                    </button>
                  </td>
                  <td className={`py-3.5 font-medium ${u.riskColor}`}>{u.risk}</td>
                  <td className="py-3.5 text-gray-400 cursor-pointer text-lg hover:text-gray-600" onClick={() => handleUserAction('delete', u.id)}>···</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[13px] font-semibold text-red-500 mb-1">Danger Zone</div>
              <div className="text-[12px] text-gray-500">
                Deleting a role will immediately revoke permissions for all assigned users.
              </div>
              <button 
                onClick={() => alert('Deleting role...')}
                className="text-[12px] text-red-500 font-semibold mt-2 hover:underline"
              >
                Delete This Role
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert('Discarding changes...')}
                className="px-4 py-2 text-[12px] font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
              >
                Discard
              </button>
              <button 
                onClick={() => alert('Saving changes...')}
                className="px-4 py-2 text-[12px] font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}