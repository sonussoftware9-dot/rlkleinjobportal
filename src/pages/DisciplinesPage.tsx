import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/layout/SEOHead';
import { DISCIPLINES_LIST } from '../data/mockData';
import { 
  Stethoscope, 
  ChevronRight, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Briefcase
} from 'lucide-react';

export const DisciplinesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-8">
      <SEOHead 
        title="Healthcare Disciplines & Specialties | R.L. Klein & Associates"
        description="Explore travel nursing, allied health, therapy, physician locum tenens, and advanced practice career pathways."
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0E4C92] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            Specialized Recruitment Divisions
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Healthcare Disciplines &amp; Pathways
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            R.L. Klein &amp; Associates Inc. maintains dedicated clinical recruitment teams for every major healthcare sector. Select your discipline to view current high-paying openings.
          </p>
        </div>

        {/* Disciplines Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DISCIPLINES_LIST.map((disc) => (
            <div
              key={disc.title}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${disc.color} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                    <Stethoscope className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-extrabold text-[#0E4C92] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {disc.count}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#0E4C92] transition-colors mb-1">
                  {disc.title}
                </h3>
                <p className="text-xs font-bold text-[#1D6ECF] mb-4">{disc.subtitle}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {disc.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button
                  onClick={() => navigate(`/jobs?discipline=${encodeURIComponent(disc.title)}`)}
                  className="w-full bg-[#0E4C92] hover:bg-[#0A3A72] text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Search {disc.title} Jobs</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Compliance Banner */}
        <div className="bg-[#071C35] text-white rounded-3xl p-10 sm:p-14 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Multi-State License Compact (NLC) Ready</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Do you hold an active Compact License?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Start working in over 40 states immediately without waiting for endorsement licenses. Our compliance team handles state board verifications automatically.
            </p>
          </div>

          <Link
            to="/jobs"
            className="bg-amber-400 hover:bg-amber-300 text-[#071C35] font-extrabold text-sm px-8 py-4 rounded-2xl transition-all shadow-lg shrink-0"
          >
            Find Compact RN Assignments
          </Link>
        </div>

      </div>
    </div>
  );
};
