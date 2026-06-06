import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, CheckCircle, Briefcase } from 'lucide-react';

const CompanyDashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const projRes = await axios.get('/api/projects/company');
      setProjects(projRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markComplete = async (projectId) => {
    try {
      await axios.put(`/api/projects/${projectId}/complete`);
      alert('Project marked complete. Certificate generated for student!');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error marking complete');
    }
  };

  const statusStyle = (status) => {
    if (status === 'open') return 'bg-green-50 text-green-700 border border-green-200';
    if (status === 'in-progress') return 'bg-primary-50 text-primary-700 border border-primary-200';
    return 'bg-slate-100 text-slate-600 border border-slate-300';
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 relative">
      <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">Company Dashboard</h1>
            <p className="mt-2 text-slate-500 font-medium">Manage your project postings and evaluate students.</p>
          </div>
          <Link
            to="/project/create"
            className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5 whitespace-nowrap shadow-md"
          >
            <Plus className="w-5 h-5" /> Post Project
          </Link>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(proj => (
            <motion.div
              key={proj._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glassmorphism-card rounded-2xl p-6 flex flex-col group"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${statusStyle(proj.status)}`}>
                  {proj.status}
                </span>
                <span className="text-xs font-bold bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-slate-600">{proj.domain}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{proj.title}</h3>
              <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">{proj.description}</p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-auto">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Assigned Student</h4>
                {proj.assignedStudentId ? (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-900 font-bold">{proj.assignedStudentId.name}</span>
                    {proj.status === 'in-progress' && (
                      <button
                        onClick={() => markComplete(proj._id)}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors shadow-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Mark Complete
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic font-medium">No student assigned yet.</p>
                )}
              </div>
            </motion.div>
          ))}

          {projects.length === 0 && (
            <div className="col-span-2 text-center py-20 glassmorphism-card rounded-2xl">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No projects posted yet</h3>
              <p className="text-slate-500 mb-6 font-medium">Create your first project to start finding great talent.</p>
              <Link to="/project/create" className="btn-primary inline-flex items-center gap-2 text-sm shadow-md">
                <Plus className="w-4 h-4" /> Post a Project
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
