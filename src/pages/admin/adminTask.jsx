import { useState } from 'react';
import Sidebar from '../../component/adminComponent/adminSidebar.jsx';
import Topbar from '../../component/adminComponent/adminTopbar.jsx';
import Layout from '../../component/Layout.jsx';

const dispatches = [
  { time: "9:00 AM",   label: "Welcome Assessment",    sub: "124 Tenants | Stage 1 | Schedule", status: "COMPLETED", color: "text-green-500",  dot: "bg-green-500" },
  { time: "11:30 AM",  label: "Residency Verification", sub: "42 Tenants | Stage 2 | Trigger",  status: "RUNNING",   color: "text-blue-500",   dot: "bg-blue-500" },
  { time: "1:45 PM",   label: "Manual Validation Flow", sub: "18 Tenants | Stage 2 | Manual",   status: "FAILED",    color: "text-red-500",    dot: "bg-red-500" },
];

const taskButtons = (primary) =>
  ["Edit Template", "Modify Dispatch Rules", primary, "View Historical Performance", "View Drop-off Rate", "View Completion Time Dist."];

export default function TasksPage({ onNavigate }) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Welcome Personality Assessment',
      stage: 'STAGE 1',
      type: 'AUTOMATED',
      scoringImpact: true,
      reviewRequired: false,
      status: 'active',
      totalAssigned: 4281,
      completionRate: 92,
      dropOffRate: 4.2,
      avgCompletionTime: '8m 12s'
    },
    {
      id: 2,
      name: 'Document Authenticity Check',
      stage: 'STAGE 2',
      type: 'MANUAL',
      scoringImpact: false,
      reviewRequired: true,
      status: 'urgent',
      totalAssigned: 412,
      completionRate: 58,
      dropOffRate: 22.8,
      avgCompletionTime: '42m 0s'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleTaskAction = (action, taskId) => {
    console.log(`Action: ${action} for task ${taskId}`);
    
    if (action === 'Disable Task' || action === 'Enable Task') {
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: task.status === 'active' ? 'disabled' : 'active' }
          : task
      ));
    }
    
    // Handle other actions
    switch(action) {
      case 'Edit Template':
        alert(`Editing template for task ${taskId}`);
        break;
      case 'Modify Dispatch Rules':
        alert(`Modifying dispatch rules for task ${taskId}`);
        break;
      case 'View Historical Performance':
        alert(`Viewing historical performance for task ${taskId}`);
        break;
      case 'View Drop-off Rate':
        alert(`Viewing drop-off rate for task ${taskId}`);
        break;
      case 'View Completion Time Dist.':
        alert(`Viewing completion time distribution for task ${taskId}`);
        break;
      default:
        break;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activePage="tasks" onNavigate={onNavigate} />
      <Topbar />
      <Layout>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Task Management</h1>
        <p className="text-[13px] text-gray-500 mb-6">
          Configure behavioural assessment logic and operational task flows.
        </p>

        {/* Stat Strip */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              ACTIVE SCHEDULES
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke="#d1d5db" strokeWidth="1.8"/>
                <path d="M12 8v4" stroke="#d1d5db" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="1" fill="#d1d5db"/>
              </svg>
            </div>
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-[11px] text-blue-500 mt-1">+2 New</div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">DISPATCHED TODAY</div>
            <div className="text-2xl font-bold text-gray-900">1,284</div>
            <div className="text-[11px] text-gray-400 mt-1">Across 12 Tenants</div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">PENDING REVIEW</div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-[11px] text-gray-400 mt-1">Priority</div>
          </div>

          <div className="bg-white border border-red-200 rounded-xl p-5">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              COMPLETION RATE
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#f59e0b" strokeWidth="1.8"/>
              </svg>
            </div>
            <div className="text-2xl font-bold text-red-500">68%</div>
            <div className="text-[11px] text-red-500 mt-1">Below Threshold</div>
            <div className="mt-2 inline-block text-[10px] bg-red-50 text-red-500 font-semibold px-2 py-0.5 rounded">
              ⚠ Critical Action Needed
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-300"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-300"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all">
            Create New Task
          </button>
        </div>

        {/* Main content + Dispatch sidebar */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-4">

            {/* Welcome Personality Assessment */}
            {filteredTasks.filter(task => task.id === 1).map((task) => (
              <div key={task.id} className="bg-white border border-gray-100 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-semibold text-gray-800">{task.name}</span>
                    <span className={`text-[11px] ${task.scoringImpact ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'} font-semibold px-2 py-0.5 rounded`}>
                      Scoring Input: {task.scoringImpact ? '✓' : '✗'}
                    </span>
                  </div>
                  <span className={`text-[11px] ${task.status === 'urgent' ? 'bg-red-50 text-red-500 font-bold' : 'bg-green-50 text-green-600 font-semibold'} px-2.5 py-0.5 rounded-full`}>
                    {task.status === 'urgent' ? 'URGENT' : 'ACTIVE'}
                  </span>
                </div>
                <div className="flex gap-5 text-[11px] text-gray-400 mb-5">
                  <span>STAGE: {task.stage}</span>
                  <span>TYPE: {task.type}</span>
                  <span>SCORING IMPACT: {task.scoringImpact ? 'YES' : 'NO'}</span>
                  <span>REVIEW REQUIRED: {task.reviewRequired ? 'YES' : 'NO'}</span>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <div>
                    <div className="text-[10px] text-gray-400 mb-1">TOTAL ASSIGNED</div>
                    <div className="text-xl font-bold text-gray-900">{task.totalAssigned}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 mb-1">COMPLETION %</div>
                    <div className={`text-xl font-bold ${task.completionRate < 70 ? 'text-red-500' : 'text-gray-900'}`}>{task.completionRate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 mb-1">DROP-OFF %</div>
                    <div className="text-xl font-bold text-red-500">{task.dropOffRate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 mb-1">AVG COMPLETION TIME</div>
                    <div className="text-xl font-bold text-gray-900">{task.avgCompletionTime}</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {taskButtons(task.status === 'active' ? 'Disable Task' : 'Enable Task').map((btn) => (
                    <button
                      key={btn}
                      onClick={() => handleTaskAction(btn, task.id)}
                      className={`text-[11px] px-3 py-1.5 rounded-lg font-medium transition-all ${
                        btn === "Edit Template"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Document Authenticity Check */}
            {filteredTasks.filter(task => task.id === 2).map((task) => (
              <div key={task.id} className="bg-white border border-gray-100 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[14px] font-semibold text-gray-800">{task.name}</span>
                    <span className={`text-[11px] ${task.scoringImpact ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'} font-semibold px-2 py-0.5 rounded`}>
                      Scoring Input: {task.scoringImpact ? '✓' : '✗'}
                    </span>
                  </div>
                  <span className={`text-[11px] ${task.status === 'urgent' ? 'bg-red-50 text-red-500 font-bold' : 'bg-green-50 text-green-600 font-semibold'} px-2.5 py-0.5 rounded-full`}>
                    {task.status === 'urgent' ? 'URGENT' : 'ACTIVE'}
                  </span>
                </div>
                <div className="flex gap-5 text-[11px] text-gray-400 mb-5">
                  <span>STAGE: {task.stage}</span>
                  <span>TYPE: {task.type}</span>
                  <span>SCORING IMPACT: {task.scoringImpact ? 'YES' : 'NO'}</span>
                  <span>REVIEW REQUIRED: {task.reviewRequired ? 'YES' : 'NO'}</span>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <div>
                    <div className="text-[10px] text-gray-400 mb-1">TOTAL ASSIGNED</div>
                    <div className="text-xl font-bold text-gray-900">{task.totalAssigned}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 mb-1">COMPLETION %</div>
                    <div className={`text-xl font-bold ${task.completionRate < 70 ? 'text-red-500' : 'text-gray-900'}`}>{task.completionRate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 mb-1">DROP-OFF %</div>
                    <div className="text-xl font-bold text-red-500">{task.dropOffRate}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 mb-1">AVG COMPLETION TIME</div>
                    <div className="text-xl font-bold text-gray-900">{task.avgCompletionTime}</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {taskButtons(task.status === 'active' ? 'Disable Task' : 'Enable Task').map((btn) => (
                    <button
                      key={btn}
                      onClick={() => handleTaskAction(btn, task.id)}
                      className={`text-[11px] px-3 py-1.5 rounded-lg font-medium transition-all ${
                        btn === "Edit Template"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Draft */}
            <div className="bg-white border border-dashed border-gray-200 rounded-xl p-5 opacity-70">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] bg-gray-100 text-gray-500 font-semibold px-2 py-0.5 rounded">DRAFT</span>
                <span className="text-[10px] bg-purple-100 text-purple-600 font-semibold px-2 py-0.5 rounded">PSYCHOMETRIC</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[13px] font-semibold text-gray-600 mb-1">Cognitive Load Pilot v2</div>
                  <div className="text-[11px] text-gray-400">
                    Experimental logic for measuring completion fatigue in Stage 3 users.
                  </div>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  {[["ASSIGNED","0"],["COMPLETION","0%"],["DROP-OFF","0%"],["AVG TIME","--"]].map(([l, v]) => (
                    <div key={l} className="text-center">
                      <div className="text-[10px] text-gray-400">{l}</div>
                      <div className="text-[13px] font-semibold text-gray-500">{v}</div>
                    </div>
                  ))}
                  <button 
                    onClick={() => alert('Editing draft: Cognitive Load Pilot v2')}
                    className="text-[11px] border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Edit Draft
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Dispatch */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 h-fit">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[13px] font-semibold text-gray-800">Today's Dispatch</span>
              </div>
              <button 
                onClick={() => alert('Viewing all dispatches')}
                className="text-[11px] text-blue-500 hover:underline"
              >
                View All
              </button>
            </div>
            <div className="flex flex-col gap-5">
              {dispatches.map((d) => (
                <div key={d.label} className="flex gap-3">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${d.dot}`} />
                    <div className="w-px flex-1 bg-gray-100" />
                  </div>
                  <div className="pb-1">
                    <div className="flex items-center justify-between gap-4 mb-0.5">
                      <span className="text-[11px] text-gray-400">{d.time}</span>
                      <span className={`text-[10px] font-bold ${d.color}`}>{d.status}</span>
                    </div>
                    <div className="text-[12px] font-semibold text-gray-800">{d.label}</div>
                    <div className="text-[11px] text-gray-400">{d.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}