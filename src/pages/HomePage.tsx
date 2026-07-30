import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Job, DisciplineType } from '../types';
import { JobsService } from '../services/api';
import { JobCard } from '../components/jobs/JobCard';
import { ApplicationModal } from '../components/jobs/ApplicationModal';
import { SEOHead } from '../components/layout/SEOHead';
import { DISCIPLINES_LIST, US_STATES } from '../data/mockData';
import { 
  Search, 
  MapPin, 
  Stethoscope, 
  ChevronRight, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Building2, 
  DollarSign, 
  HeartPulse, 
  Activity, 
  Scan, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  Star,
  Quote
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Search State
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [discipline, setDiscipline] = useState('All');

  // Application Modal State
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  useEffect(() => {
    async function loadJobs() {
      try {
        const jobs = await JobsService.getJobs({ status: 'published' });
        setFeaturedJobs(jobs.slice(0, 6));
      } catch (err) {
        console.error('Error loading featured jobs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.set('keyword', keyword);
    if (location) queryParams.set('location', location);
    if (discipline && discipline !== 'All') queryParams.set('discipline', discipline);
    navigate(`/jobs?${queryParams.toString()}`);
  };

  const openApplyModal = (job: Job) => {
    setSelectedJobForApply(job);
    setApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEOHead 
        title="R.L. Klein & Associates Inc. | Premier Healthcare Staffing & Recruitment"
        description="Connecting nurses, allied health, therapists, and physicians with high-paying healthcare positions across all 50 states."
      />

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-[#071C35] text-white overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32">
        {/* Background Overlay Healthcare Visual */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay pointer-events-none"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071C35]/80 via-[#071C35]/95 to-[#071C35] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-10">
          
          {/* Hero Top Tagline */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-bold text-amber-300 uppercase tracking-widest shadow-md">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Nationwide Healthcare Recruitment &amp; Staffing Leader</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Connecting Healthcare Professionals with Exceptional Career Opportunities
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
              Helping nurses, allied healthcare professionals, therapists, physicians and healthcare organizations connect across the United States.
            </p>
          </div>

          {/* Large Hero Search Box */}
          <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/40 text-slate-900">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Keyword Input */}
              <div className="md:col-span-4 relative">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block px-2 mb-1">Role or Specialty</label>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#0E4C92] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g. ICU Nurse, Physical Therapist, ER"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              {/* Location Input */}
              <div className="md:col-span-3 relative">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block px-2 mb-1">Location or State</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#0E4C92] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Atlanta GA, Texas, Remote..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              {/* Discipline Dropdown */}
              <div className="md:col-span-3">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block px-2 mb-1">Discipline</label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white text-slate-900"
                >
                  <option value="All">All Healthcare Disciplines</option>
                  <option value="Nursing">Nursing (RN / LPN)</option>
                  <option value="Allied Health">Allied Health</option>
                  <option value="Therapy">Physical &amp; Occupational Therapy</option>
                  <option value="Physicians">Physicians (MD / DO)</option>
                  <option value="Advanced Practice">Advanced Practice (NP / PA)</option>
                  <option value="Healthcare IT & Leadership">Healthcare IT &amp; Leadership</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="md:col-span-2 pt-5 md:pt-0">
                <button
                  type="submit"
                  className="w-full h-[46px] mt-auto bg-[#0E4C92] hover:bg-[#0A3A72] text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Jobs</span>
                </button>
              </div>

            </form>

            {/* Popular Quick Searches */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-bold text-slate-800">Popular Searches:</span>
              <button onClick={() => navigate('/jobs?keyword=ICU')} className="hover:text-[#0E4C92] underline underline-offset-2">Travel ICU RN</button>
              <span>•</span>
              <button onClick={() => navigate('/jobs?discipline=Therapy')} className="hover:text-[#0E4C92] underline underline-offset-2">Physical Therapist</button>
              <span>•</span>
              <button onClick={() => navigate('/jobs?keyword=ER')} className="hover:text-[#0E4C92] underline underline-offset-2">Emergency Room</button>
              <span>•</span>
              <button onClick={() => navigate('/jobs?discipline=Physicians')} className="hover:text-[#0E4C92] underline underline-offset-2">Locum Hospitalist</button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center border-t border-white/10">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">50,000+</p>
              <p className="text-xs text-slate-300 font-medium">Healthcare Placements</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#1D6ECF]">50 States</p>
              <p className="text-xs text-slate-300 font-medium">Nationwide Network</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">98%</p>
              <p className="text-xs text-slate-300 font-medium">Facility Retention Rate</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-sky-400">20+ Years</p>
              <p className="text-xs text-slate-300 font-medium">Recruitment Excellence</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= HEALTHCARE CATEGORIES ================= */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0E4C92] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            Healthcare Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Opportunities Across Every Specialty
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From travel nursing contracts to permanent physician leadership, R.L. Klein &amp; Associates represents top healthcare professionals in every field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DISCIPLINES_LIST.map((disc) => (
            <div
              key={disc.title}
              onClick={() => navigate(`/jobs?discipline=${encodeURIComponent(disc.title)}`)}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${disc.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Stethoscope className="w-7 h-7" />
                </div>
                <span className="text-xs font-extrabold text-[#0E4C92] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {disc.count}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0E4C92] transition-colors mb-1">
                {disc.title}
              </h3>
              <p className="text-xs font-semibold text-[#1D6ECF] mb-3">{disc.subtitle}</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {disc.description}
              </p>

              <div className="flex items-center text-xs font-bold text-[#0E4C92] group-hover:translate-x-1 transition-transform">
                <span>View {disc.title} Jobs</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED JOBS ================= */}
      <section className="py-20 px-4 sm:px-8 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0E4C92] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Current Openings
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Featured Healthcare Jobs
              </h2>
              <p className="text-slate-600 text-sm">
                High-paying travel, perm, and contract assignments updated daily.
              </p>
            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0E4C92] hover:text-[#0A3A72] bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all shrink-0"
            >
              <span>Browse All Positions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 h-64 animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} onApplyClick={openApplyModal} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ================= WHY CHOOSE RL KLEIN ================= */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0E4C92] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              The R.L. Klein Difference
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Premier Healthcare Professionals Choose R.L. Klein &amp; Associates
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              For more than 20 years, R.L. Klein &amp; Associates Inc. has set the standard in clinical staffing. We prioritize personalized clinician relationship management, transparent pay packages, and robust health benefits from Day 1.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0E4C92] flex items-center justify-center shrink-0 font-bold">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Industry-Leading Compensation &amp; Tax-Free Stipends</h4>
                  <p className="text-xs text-slate-600 mt-1">Weekly direct deposits, maximum allowable IRS non-taxable housing and meal stipends, plus completion bonuses.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Day-1 Comprehensive Medical &amp; 401(k) Match</h4>
                  <p className="text-xs text-slate-600 mt-1">Full medical, dental, and vision insurance starting on your first day of contract, plus a 4% immediate 401(k) company match.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">24/7 Dedicated Clinical Nurse Liaison</h4>
                  <p className="text-xs text-slate-600 mt-1">You are never alone on assignment. Access experienced RN clinical liaisons anytime for support, credential guidance, or workplace safety advice.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
                alt="Healthcare Professionals"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071C35]/90 via-transparent to-transparent flex items-end p-8 text-white">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm font-bold">"R.L. Klein negotiated the highest stipend package I've received in 6 years of travel nursing."</p>
                  <p className="text-xs text-slate-300">— Elena Vance, BSN, RN (ICU Travel Nurse)</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 px-4 sm:px-8 bg-[#071C35] text-white">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
              Trusted Voices
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What Healthcare Professionals &amp; Facilities Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md space-y-4">
              <Quote className="w-8 h-8 text-[#1D6ECF]" />
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "As a Level 1 Trauma ER nurse, I need recruiters who understand clinical realities. The R.L. Klein team handled credentialing effortlessly and secured my dream Houston assignment."
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm font-bold text-white">Marcus Sterling, BSN, RN</p>
                <p className="text-xs text-slate-400">Travel Emergency RN • Houston, TX</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md space-y-4">
              <Quote className="w-8 h-8 text-[#1D6ECF]" />
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "R.L. Klein &amp; Associates has been our primary clinical staffing vendor for 8 years. Their candidate screening and compliance rigor are unrivaled in healthcare recruitment."
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm font-bold text-white">Dr. Aris Thorne, MD</p>
                <p className="text-xs text-slate-400">Chief Medical Officer • Emory Health System</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md space-y-4">
              <Quote className="w-8 h-8 text-[#1D6ECF]" />
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "Transitioning to physical therapy locum placement with R.L. Klein gave me total schedule autonomy and exceptional travel stipends. Highly recommended!"
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm font-bold text-white">Jessica Lin, DPT</p>
                <p className="text-xs text-slate-400">Physical Therapist • Phoenix, AZ</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <div className="bg-gradient-to-r from-[#0E4C92] to-[#1D6ECF] rounded-3xl p-10 sm:p-16 text-white shadow-2xl relative overflow-hidden space-y-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to Advance Your Healthcare Career?
            </h2>
            <p className="text-blue-100 text-base sm:text-lg">
              Explore thousands of premier healthcare positions or submit your application directly to our executive recruitment team today.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/jobs"
                className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-[#071C35] font-extrabold text-base rounded-2xl transition-all shadow-xl hover:scale-105"
              >
                Browse All Open Jobs
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl border border-white/30 transition-all"
              >
                Speak with a Recruiter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <ApplicationModal
        job={selectedJobForApply}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />

    </div>
  );
};
