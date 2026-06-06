import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const domains = [
  'Web Development', 'UI/UX Design', 'Data Analysis',
  'Digital Marketing', 'Content Creation',
];

const CreateProject = () => {
  const [formData, setFormData] = useState({ title: '', domain: '', description: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (key) => (e) => setFormData(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/projects/create', formData);
      navigate('/dashboard/company');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 relative">
      <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none" />
      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glassmorphism-card rounded-3xl p-10 shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center border border-primary-200">
              <Briefcase className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Post a New Project</h1>
              <p className="text-sm text-slate-500 font-medium mt-1">Define the scope to attract the right talent.</p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Project Title</label>
              <input
                type="text"
                required
                className="input-light"
                placeholder="e.g. Build a Marketing Landing Page"
                value={formData.title}
                onChange={set('title')}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Domain / Category</label>
              <select
                required
                className="input-light"
                value={formData.domain}
                onChange={set('domain')}
              >
                <option value="" disabled>Select domain</option>
                {domains.map(d => (
                  <option key={d} value={d} className="bg-white text-slate-900">{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Project Description</label>
              <textarea
                required
                rows={5}
                className="input-light resize-none"
                placeholder="Describe the problem, deliverables, and expectations..."
                value={formData.description}
                onChange={set('description')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Publishing…
                </span>
              ) : 'Publish Project'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateProject;
