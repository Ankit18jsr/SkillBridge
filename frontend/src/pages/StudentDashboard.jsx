import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Briefcase, CheckCircle, BookOpen, ClipboardList } from 'lucide-react';

const tabs = ['browse', 'applications', 'certificates'];

const StudentDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [activeTab, setActiveTab] = useState('browse');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [projRes, appRes, certRes] = await Promise.all([
        axios.get('/api/projects'),
        axios.get('/api/applications/student'),
        axios.get('/api/certificates/student'),
      ]);
      setProjects(projRes.data);
      setApplications(appRes.data);
      setCertificates(certRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const applyForProject = async (projectId) => {
    try {
      await axios.post('/api/applications/apply', { projectId, coverLetter: 'I am interested.' });
      alert('Applied successfully!');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error applying');
    }
  };

  const tabIcon = { browse: BookOpen, applications: ClipboardList, certificates: Award };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 relative">
      <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900">Student Dashboard</h1>
          <p className="mt-2 text-slate-500">Browse projects, track applications, and manage your certificates.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-200 pb-1">
          {tabs.map((tab) => {
            const Icon = tabIcon[tab];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg text-sm font-semibold transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {/* Browse tab */}
            {activeTab === 'browse' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(proj => (
                  <div key={proj._id} className="glassmorphism-card rounded-2xl p-6 flex flex-col group">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-50 text-primary-600 border border-primary-200">
                        {proj.domain}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{new Date(proj.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{proj.title}</h3>
                    <p className="text-slate-600 text-sm mb-5 line-clamp-3 flex-grow leading-relaxed">{proj.description}</p>
                    <p className="text-sm font-semibold text-slate-700 mb-5 flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <Briefcase className="w-4 h-4 text-primary-500" />
                      {proj.companyId?.name}
                    </p>
                    <button
                      onClick={() => applyForProject(proj._id)}
                      className="btn-primary justify-center text-sm py-2.5 w-full"
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
                {projects.length === 0 && (
                  <div className="col-span-3 py-20 text-center glassmorphism-card rounded-2xl">
                    <p className="text-slate-500 font-medium">No open projects available right now.</p>
                  </div>
                )}
              </div>
            )}

            {/* Applications tab */}
            {activeTab === 'applications' && (
              <div className="glassmorphism-card rounded-2xl overflow-hidden shadow-sm">
                <ul className="divide-y divide-slate-100">
                  {applications.map(app => (
                    <li key={app._id} className="p-6 hover:bg-slate-50/50 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h4 className="text-base font-bold text-slate-900">{app.projectId?.title}</h4>
                          <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5" />
                            {app.projectId?.companyId?.name}
                          </p>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize ${
                          app.status === 'accepted' ? 'bg-green-50 text-green-700 border border-green-200' :
                          app.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' :
                          'bg-yellow-50 text-yellow-700 border border-yellow-200'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </li>
                  ))}
                  {applications.length === 0 && (
                    <li className="p-12 text-slate-500 text-center font-medium">You haven't applied to any projects yet.</li>
                  )}
                </ul>
              </div>
            )}

            {/* Certificates tab */}
            {activeTab === 'certificates' && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {certificates.map(cert => (
                  <CertificateCard key={cert._id} cert={cert} />
                ))}
                {certificates.length === 0 && (
                  <div className="col-span-2 py-20 text-center glassmorphism-card rounded-2xl">
                    <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No certificates yet. Complete a project to earn one!</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ── Certificate Card ─────────────────────────────────────────────────────────
const CertificateCard = ({ cert }) => {
  const certRef = useRef();

  const handlePrint = () => {
    const printContents = certRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-5 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div
        ref={certRef}
        className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-10 border-8 border-double border-primary-100 relative text-center"
      >
        <div className="absolute top-4 right-4 text-primary-200">
          <Award className="w-14 h-14" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2 uppercase tracking-widest">Certificate of Completion</h2>
        <p className="text-slate-500 mb-6 italic">This is proudly presented to</p>
        <h3 className="text-3xl font-extrabold text-primary-600 mb-6 border-b-2 border-primary-200 pb-2 inline-block px-8">
          Student Name
        </h3>
        <p className="text-slate-700 mb-4 max-w-sm mx-auto leading-relaxed">
          For successfully completing the micro-internship project:<br />
          <span className="font-bold text-slate-900 block mt-2 text-xl">{cert.projectId?.title}</span>
        </p>
        <p className="text-slate-600 mb-8 font-medium">Domain: <span className="font-bold text-slate-800">{cert.domain}</span></p>
        <div className="flex justify-between items-end mt-10 border-t border-slate-200 pt-5">
          <div className="text-left">
            <p className="font-bold text-slate-800">{cert.companyId?.name}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Partner Company</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-slate-800">{new Date(cert.issuedDate).toLocaleDateString()}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Date of Issue</p>
          </div>
        </div>
      </div>
      <button
        onClick={handlePrint}
        className="self-end flex items-center gap-2 btn-outline text-sm px-5 py-2.5"
      >
        <CheckCircle className="w-4 h-4" /> Print Certificate
      </button>
    </div>
  );
};

export default StudentDashboard;
