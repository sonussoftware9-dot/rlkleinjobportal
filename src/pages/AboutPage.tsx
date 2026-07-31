import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/layout/SEOHead';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  MapPin, 
  HeartPulse, 
  ArrowRight,
  TrendingUp,
  Briefcase
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEOHead 
        title="About R.L. Klein & Associates Inc. | Healthcare Staffing Leaders"
        description="Learn about our 20+ year history connecting healthcare professionals with top hospital networks across the United States."
      />

      {/* Hero */}
      <section className="bg-gradient-to-r from-[#071C35] via-[#0E4C92] to-[#1D6ECF] text-white py-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
            Corporate Profile
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            R.L. Klein &amp; Associates Inc.
          </h1>
          <p className="text-blue-100 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            A trusted partner to America's leading health systems, hospital networks, and clinical professionals for over two decades.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0E4C92] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              Our Legacy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pioneering Clinical Recruitment &amp; Healthcare Staffing
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded on the principles of clinical compliance, candidate advocacy, and unwavering integrity, R.L. Klein &amp; Associates Inc. has grown from a specialized regional recruitment firm into a premier nationwide healthcare staffing agency.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We specialize in Travel Nursing, Allied Health Placement, Physical &amp; Occupational Therapy, and Locum Tenens Physician recruitment. By treating clinicians with respect and transparency, we ensure healthcare facilities receive top-tier patient care teams.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <p className="text-2xl font-extrabold text-[#0E4C92]">50,000+</p>
                <p className="text-xs font-semibold text-slate-600">Successful Placements</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
                <p className="text-2xl font-extrabold text-[#1D6ECF]">98.4%</p>
                <p className="text-xs font-semibold text-slate-600">Client Retention</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80" 
              alt="Medical Team Meeting" 
              className="w-full h-[450px] object-cover"
            />
          </div>
        </div>

        {/* Corporate Values */}
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-slate-200/80 shadow-md space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900">Our Core Principles</h3>
            <p className="text-slate-600 text-xs">The standards that guide every candidate interaction and hospital partnership.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <ShieldCheck className="w-8 h-8 text-[#0E4C92]" />
              <h4 className="text-base font-bold text-slate-900">Uncompromising Compliance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                As a Joint Commission Gold Seal accredited organization, we maintain rigorous credentialing standards to protect patient safety.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <TrendingUp className="w-8 h-8 text-[#1D6ECF]" />
              <h4 className="text-base font-bold text-slate-900">Transparent Compensation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No hidden agency cuts. We deliver fully transparent weekly pay breakdowns, housing stipends, and Day-1 health benefits.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <Users className="w-8 h-8 text-emerald-600" />
              <h4 className="text-base font-bold text-slate-900">Clinician First Support</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our 24/7 clinical nurse liaisons ensure you have expert clinical backing on every assignment, anytime you need guidance.
              </p>
            </div>
          </div>
        </div>

        {/* Executive Headquarters */}
        <div className="bg-[#071C35] text-white rounded-3xl p-10 sm:p-14 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">Headquarters &amp; Operations</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Nationwide Recruitment Hubs</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              With primary operational headquarters in Atlanta, GA and secondary recruitment centers in Dallas, TX and Chicago, IL, R.L. Klein &amp; Associates maintains rapid response staffing capabilities nationwide.
            </p>
            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#1D6ECF]" /> 59 West 3140 North, Provo, Utah.</p>
              <p className="flex items-center gap-2"><Building2 className="w-4 h-4 text-[#1D6ECF]" /> Corporate Registration: R.L. Klein &amp; Associates Inc.</p>
            </div>
          </div>

          <div className="bg-white/10 p-8 rounded-2xl border border-white/20 space-y-4">
            <h4 className="text-lg font-bold text-amber-300">Are you a Healthcare Facility Director?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Request contingent nursing staff, allied health professionals, or locum tenens physician coverage for critical census surges.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-amber-400 text-[#071C35] font-extrabold text-xs px-6 py-3 rounded-xl hover:bg-amber-300 transition-colors"
            >
              <span>Submit Staffing Request</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
};
