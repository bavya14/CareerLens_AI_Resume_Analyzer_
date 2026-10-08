import {
  Eye, FileText, BarChart3, Briefcase, Lightbulb, Compass,
  ArrowRight, Upload, Cpu, Target, TrendingUp, CheckCircle2,
  Sparkles, Zap, Shield, Github, Heart,
} from 'lucide-react';
import { useApp } from '@/hooks/useApp';
import { CAREER_ROLES } from '@/data/careers';
import { SKILL_CATEGORIES } from '@/data/skills';

const features = [
  { icon: FileText, title: 'Resume Upload', desc: 'Upload PDF or TXT resumes, or paste text directly. Extracted and analyzed instantly in your browser.' },
  { icon: BarChart3, title: 'Skill Analysis', desc: 'Automatically detect technical and soft skills from your resume using an intelligent keyword engine.' },
  { icon: Target, title: 'Resume Scoring', desc: 'Get an overall resume score out of 100 with a detailed breakdown across 8 key categories.' },
  { icon: Briefcase, title: 'Career Matching', desc: 'Receive personalized career role recommendations with match percentages and skill gap analysis.' },
  { icon: Lightbulb, title: 'Improvement Tips', desc: 'Get actionable suggestions to improve your resume with ATS-friendly recommendations.' },
  { icon: Compass, title: 'Career Explorer', desc: 'Explore career paths with beginner roadmaps, required skills, and related technologies.' },
];

const steps = [
  { icon: Upload, title: 'Upload Your Resume', desc: 'Drag and drop your PDF or TXT resume, or paste the text manually.' },
  { icon: Cpu, title: 'AI Analysis', desc: 'Our local engine analyzes your skills, scores your resume, and matches careers.' },
  { icon: TrendingUp, title: 'Get Insights', desc: 'View your score, skill gaps, career matches, and improvement suggestions.' },
  { icon: Target, title: 'Take Action', desc: 'Follow the recommendations to improve your resume and plan your career.' },
];

const stats = [
  { value: '9', label: 'Career Roles' },
  { value: '9', label: 'Skill Categories' },
  { value: '150+', label: 'Keywords Tracked' },
  { value: '100%', label: 'Browser-Based' },
];

export function LandingPage() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-lg">CareerLens</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 dark:hover:text-white transition-colors">How It Works</a>
            <a href="#careers" className="hover:text-slate-900 dark:hover:text-white transition-colors">Careers</a>
            <a href="#stats" className="hover:text-slate-900 dark:hover:text-white transition-colors">Stats</a>
          </div>
          <button
            onClick={() => navigate('dashboard')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-violet-50/30 to-transparent dark:from-blue-950/20 dark:via-violet-950/10 dark:to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 animate-slide-up">
            <Sparkles className="w-4 h-4" />
            AI-Powered Career Analysis — No API Keys Required
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight animate-slide-up" style={{ animationDelay: '60ms' }}>
            Career<span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">Lens</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mt-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '120ms' }}>
            Analyze your resume. Discover your strengths. Find your career path.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-slide-up" style={{ animationDelay: '180ms' }}>
            <button
              onClick={() => navigate('analyzer')}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-base hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Analyze Resume
            </button>
            <button
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-base hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Explore Features
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Powerful Features</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 mt-3">Everything you need to analyze your resume and plan your career</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center mb-4 group-hover:from-blue-500/20 group-hover:to-violet-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{f.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">How It Works</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 mt-3">Four simple steps to a better resume and clearer career path</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative">
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-xs font-bold text-blue-500 mb-2">STEP {i + 1}</div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                      <ArrowRight className="w-6 h-6 text-slate-300 dark:text-slate-700" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Career Roles */}
      <section id="careers" className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Career Paths We Analyze</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 mt-3">Get matched to roles based on your detected skills</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAREER_ROLES.map((role) => (
              <div
                key={role.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white">{role.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-3">{role.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {role.requiredSkills.slice(0, 4).map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                  {role.requiredSkills.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-medium">
                      +{role.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-violet-600 p-10 md:p-14 text-center animate-gradient">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Built for Students, Powered by Intelligence</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-4xl md:text-5xl font-bold text-white tabular-nums">{s.value}</div>
                  <div className="text-sm text-blue-100 mt-2">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Shield className="w-4 h-4" /> No Data Sent to Servers
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Zap className="w-4 h-4" /> Instant Analysis
              </div>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <CheckCircle2 className="w-4 h-4" /> 100% Free
              </div>
            </div>
            <button
              onClick={() => navigate('analyzer')}
              className="mt-10 px-8 py-3.5 rounded-xl bg-white text-blue-600 font-semibold text-base hover:shadow-xl transition-all hover:scale-[1.03] active:scale-[0.98] inline-flex items-center gap-2"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white">CareerLens</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              A Web Technology Project — Resume Analyzer & Career Recommendation System
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5 text-sm">
                Built with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> for students
              </span>
              <Github className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {SKILL_CATEGORIES.map((c) => (
              <span key={c.label} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs">
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
