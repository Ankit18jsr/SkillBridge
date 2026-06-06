import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, FileText, ShieldCheck } from 'lucide-react';

const tabs = ['users', 'projects', 'applications'];

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usrRes, projRes, appRes] = await Promise.all([
        axios.get('/api/admin/users'),
        axios.get('/api/admin/projects'),
        axios.get('/api/admin/applications'),
      ]);
      setUsers(usrRes.data);
      setProjects(projRes.data);
      setApplications(appRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId, status) => {
    try {
      await axios.put(`/api/admin/users/${userId}/status`, { status });
      setUsers(users.map(u => u._id === userId ? { ...u, status } : u));
    } catch (err) {
      alert(err.response?.data?.msg || 'Error updating status');
    }
  };

  const statCards = [
    { label: 'Total Users',        value: users.length,        icon: Users,     color: 'text-primary-600',  bg: 'bg-primary-50 border-primary-200' },
    { label: 'Total Projects',     value: projects.length,     icon: Briefcase,  color: 'text-sky-600',      bg: 'bg-sky-50 border-sky-200'         },
    { label: 'Total Applications', value: applications.length, icon: FileText,   color: 'text-indigo-600',   bg: 'bg-indigo-50 border-indigo-200'   },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-8 h-8 text-primary-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="text-slate-600 font-medium text-sm">Loading control panel…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 relative">
      <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">Admin Control Panel</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">System-wide overview of all platform activity.</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {statCards.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="flex items-center gap-5 p-6 rounded-2xl border bg-white shadow-sm border-slate-200">
              <div className={`p-3.5 rounded-xl border ${bg}`}>
                <Icon className={`w-7 h-7 ${color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-3xl font-extrabold text-slate-900">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 pb-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-t-lg text-sm font-bold transition-all capitalize ${
                activeTab === tab
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="glassmorphism-card rounded-2xl overflow-hidden shadow-md"
          >
            {/* ── Users ── */}
            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                        <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map(u => (
                      <tr key={u._id} className="hover:bg-slate-50/50 transition-colors bg-white">
                        <td className="px-6 py-4 text-sm font-bold text-slate-900 whitespace-nowrap">{u.name}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-600 whitespace-nowrap">{u.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            u.role === 'admin'   ? 'bg-red-50 text-red-700 border border-red-200' :
                            u.role === 'company' ? 'bg-primary-50 text-primary-700 border border-primary-200' :
                            'bg-green-50 text-green-700 border border-green-200'
                          }`}>{u.role}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            u.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                            u.status === 'active'   ? 'bg-green-50 text-green-700 border border-green-200' :
                            'bg-yellow-50 text-yellow-700 border border-yellow-200'
                          }`}>{u.status || 'active'}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-600 whitespace-nowrap">{new Date(u.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {u.role !== 'admin' && (
                            <div className="flex gap-2">
                              <button onClick={() => updateUserStatus(u._id, 'active')} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors shadow-sm">Accept</button>
                              <button onClick={() => updateUserStatus(u._id, 'rejected')} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors shadow-sm">Reject</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── Projects ── */}
            {activeTab === 'projects' && (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      {['Title', 'Company', 'Domain', 'Status'].map(h => (
                        <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projects.map(p => (
                      <tr key={p._id} className="hover:bg-slate-50/50 transition-colors bg-white">
                        <td className="px-6 py-4 text-sm font-bold text-slate-900 whitespace-nowrap">{p.title}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-600 whitespace-nowrap">{p.companyId?.name || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-600 whitespace-nowrap">{p.domain}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            p.status === 'completed'   ? 'bg-slate-100 text-slate-700 border border-slate-300' :
                            p.status === 'in-progress' ? 'bg-primary-50 text-primary-700 border border-primary-200' :
                            'bg-green-50 text-green-700 border border-green-200'
                          }`}>{p.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── Applications ── */}
            {activeTab === 'applications' && (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      {['Project', 'Student', 'Cover Letter', 'Status'].map(h => (
                        <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map(app => (
                      <tr key={app._id} className="hover:bg-slate-50/50 transition-colors bg-white">
                        <td className="px-6 py-4 text-sm font-bold text-slate-900 whitespace-nowrap">{app.projectId?.title || 'Unknown'}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-600 whitespace-nowrap">{app.studentId?.name || 'Unknown'}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-600 truncate max-w-xs">{app.coverLetter}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize ${
                            app.status === 'accepted' ? 'bg-green-50 text-green-700 border border-green-200' :
                            app.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                            'bg-yellow-50 text-yellow-700 border border-yellow-200'
                          }`}>{app.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
