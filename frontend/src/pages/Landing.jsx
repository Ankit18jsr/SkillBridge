import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Briefcase, GraduationCap, Award,
  Star, Users, Zap, ChevronDown
} from 'lucide-react';

// ─── Floating orb background ────────────────────────────────────────────────
const Background = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Grid */}
    <div className="absolute inset-0 bg-grid-light opacity-100" />
    {/* Orbs */}
    <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-primary-200 opacity-40 blur-[100px]" />
    <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-sky-200 opacity-40 blur-[100px] animate-pulse-slow" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary-100 opacity-50 blur-[80px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
  </div>
);

// ─── Stats bar ───────────────────────────────────────────────────────────────
const stats = [
  { label: 'Students Placed', value: '12,000+', icon: Users },
  { label: 'Partner Companies', value: '500+', icon: Briefcase },
  { label: 'Projects Completed', value: '8,400+', icon: Zap },
  { label: 'Avg. Rating', value: '4.9 ★', icon: Star },
];

// ─── Feature cards ───────────────────────────────────────────────────────────
const features = [
  {
    icon: Briefcase,
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    ring: 'border-primary-100',
    title: 'Real-World Projects',
    desc: 'Work on actual business problems posted by partner companies and cutting-edge startups.',
  },
  {
    icon: GraduationCap,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    ring: 'border-sky-100',
    title: 'Senior Mentorship',
    desc: 'Receive code-reviews, architectural guidance, and direct feedback from industry veterans.',
  },
  {
    icon: Award,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    ring: 'border-indigo-100',
    title: 'Verified Certificates',
    desc: 'Earn blockchain-stamped digital certificates automatically upon project completion.',
  },
];

// ─── Animation helpers ───────────────────────────────────────────────────────
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ─── Component ───────────────────────────────────────────────────────────────
const Landing = () => (
  <div className="bg-slate-50 min-h-screen overflow-x-hidden">

    {/* ── HERO ── */}
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-4 pt-20">
      <Background />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-200 bg-white shadow-sm text-primary-700 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          Now in Beta — 500+ companies already joined
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-tight text-slate-900 mb-6">
          Bridge the Gap <br />
          <span className="bg-gradient-to-r from-primary-600 to-sky-500 bg-clip-text text-transparent">
            Skills & Success
          </span>
        </motion.h1>

        {/* Sub-text */}
        <motion.p variants={fadeUp} className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-12">
          SkillBridge connects ambitious students with innovative companies for short-term, impactful micro-internships. Build your portfolio, gain real experience, and earn verified certificates.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="btn-primary text-base gap-2">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/login" className="btn-outline text-base">
            Sign In
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>

    {/* ── STATS ── */}
    <section className="relative z-10 border-y border-slate-200 bg-white py-14">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ label, value, icon: Icon }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center gap-2"
          >
            <Icon className="w-6 h-6 text-primary-500 mb-1" />
            <span className="text-3xl font-extrabold text-slate-900">{value}</span>
            <span className="text-sm font-medium text-slate-500">{label}</span>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── FEATURES ── */}
    <section className="relative z-10 py-28 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary-600 text-sm font-bold tracking-widest uppercase">Platform Features</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900">Everything you need to succeed</h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto text-lg">
            A complete ecosystem connecting talent with opportunity — built for the next generation of professionals.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, color, bg, ring, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glassmorphism-card p-8 rounded-2xl group"
            >
              <div className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center mb-6 border ${ring}`}>
                <Icon className={`w-7 h-7 ${color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-600 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA BANNER ── */}
    <section className="relative z-10 py-24 px-4 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-12 text-center bg-primary-600 shadow-[0_20px_40px_rgba(59,130,246,0.2)]"
        >
          <div className="absolute inset-0 bg-grid-light opacity-20 mix-blend-overlay" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-[80px] opacity-20" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Ready to launch your career?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">Join thousands of students and companies already transforming the internship experience.</p>
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-xl hover:bg-slate-50 transition-all hover:shadow-lg hover:-translate-y-0.5">
              Start for Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>

  </div>
);

export default Landing;
