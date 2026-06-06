import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Briefcase, ChevronRight, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setFormData(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(formData);
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const RoleCard = ({ type, icon: Icon, title, desc }) => {
    const active = formData.role === type;
    return (
      <div
        onClick={() => setFormData(f => ({ ...f, role: type }))}
        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-4 ${
          active
            ? 'border-primary-500 bg-primary-50'
            : 'border-slate-200 hover:border-primary-200 hover:bg-slate-50'
        }`}
      >
        <div className={`p-2.5 rounded-lg ${active ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-grow">
          <h4 className={`text-sm font-bold ${active ? 'text-primary-900' : 'text-slate-700'}`}>{title}</h4>
          <p className={`text-xs mt-1 ${active ? 'text-primary-700' : 'text-slate-500'}`}>{desc}</p>
        </div>
        <div className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 flex items-center justify-center ${
          active ? 'border-primary-500' : 'border-slate-300'
        }`}>
          {active && <div className="w-2 h-2 rounded-full bg-primary-500" />}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 bg-slate-50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-light opacity-100 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="glassmorphism-card rounded-3xl p-8 sm:p-10 shadow-xl">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Create your account</h2>
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-bold transition-colors">
                Sign in instead
              </Link>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700">I want to join as a...</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <RoleCard
                  type="student"
                  icon={User}
                  title="Student"
                  desc="Build projects & earn certificates"
                />
                <RoleCard
                  type="company"
                  icon={Briefcase}
                  title="Company"
                  desc="Post projects & find talent"
                />
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  className="input-light"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={set('name')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  required
                  className="input-light"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={set('email')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="input-light pr-11"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={set('password')}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => setShowPassword(s => !s)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Creating account…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Create Account <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
