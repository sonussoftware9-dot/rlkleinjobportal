import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Job } from '../types';
import { JobsService } from '../services/api';
import { JobCard } from '../components/jobs/JobCard';
import { ApplicationModal } from '../components/jobs/ApplicationModal';
import { SEOHead } from '../components/layout/SEOHead';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowLeft, 
  Send, 
  Share2, 
  ShieldCheck, 
  Award,
  ChevronRight,
  Briefcase
} from 'lucide-react';

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  useEffect(() => {
    async function loadJob() {
      setLoading(true);
      if (!id) return;
      try {
        const fetched = await JobsService.getJobById(id);
        if (fetched) {
          setJob(fetched);
          const allJobs = await JobsService.getJobs({ status: 'published' });
          setRelatedJobs(allJobs.filter(j => j.id !== fetched.id && (j.discipline === fetched.discipline || j.state === fetched.state)).slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadJob();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 px-4 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0E4C92] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Healthcare Job Not Found</h2>
        <p className="text-slate-600 text-sm">The job position you are searching for may have been filled or expired.</p>
        <Link to="/jobs" className="inline-flex items-center gap-2 bg-[#0E4C92] text-white px-6 py-2.5 rounded-xl font-bold text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Jobs Board</span>
        </Link>
      </div>
    );
  }

  const formatSalary = () => {
    if (job.weekly_pay) {
      return `$${job.weekly_pay.toLocaleString()} / week`;
    }
    if (job.salary_type === 'Hourly') {
      return `$${job.salary_min} - $${job.salary_max} / hour`;
    }
    return `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()} / year`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-28">
      <SEOHead 
        title={`${job.title} at ${job.facility_name} | R.L. Klein & Associates`}
        description={job.job_description.slice(0, 160)}
        jobSchema={job}
      />

      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#071C35] to-[#0E4C92] text-white py-12 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <Link to="/jobs" className="inline-flex items-center gap-2 text-xs font-bold text-blue-200 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Openings</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-500/20 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
                  {job.discipline}
                </span>
                <span className="bg-emerald-500/20 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
                  {job.employment_type}
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                  {job.shift}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 pt-1">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <Building2 className="w-4 h-4 text-[#1D6ECF]" />
                  <span>{job.facility_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{job.city}, {job.state} ({job.location})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Posted {job.posted_date}</span>
                </div>
              </div>
            </div>

            {/* Quick Header Pay Box */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center lg:text-right shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">Estimated Package</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block">{formatSalary()}</span>
              <button
                onClick={() => setApplyModalOpen(true)}
                className="mt-3 w-full bg-amber-400 hover:bg-amber-300 text-[#071C35] font-extrabold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Apply for this Job</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Body Details Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Job Description, Responsibilities, Requirements, Benefits */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Facility Overview Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Position Overview
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {job.job_description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#0E4C92]" />
                <span>Key Clinical Responsibilities</span>
              </h3>
              <ul className="space-y-3 text-slate-700 text-sm">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#0E4C92] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#0E4C92]" />
                <span>Clinical Requirements &amp; Certifications</span>
              </h3>
              <ul className="space-y-3 text-slate-700 text-sm">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50/60 to-slate-50 rounded-3xl p-8 border border-blue-100 shadow-xs space-y-4">
              <h3 className="text-lg font-extrabold text-[#0E4C92] border-b border-blue-200/60 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0E4C92]" />
                <span>R.L. Klein Contract Benefits Package</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800 text-xs font-semibold">
                {job.benefits.map((ben, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-blue-100 flex items-center gap-2.5 shadow-xs">
                    <div className="w-2 h-2 rounded-full bg-[#0E4C92]" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar: Quick Summary & Recruiter Helpline */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-6 sticky top-24">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Job Snapshot
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-400 uppercase block mb-0.5">Facility / Employer</span>
                <span className="font-bold text-slate-900 text-sm">{job.facility_name}</span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase block mb-0.5">Specialty / Unit</span>
                <span className="font-bold text-[#0E4C92]">{job.specialty}</span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase block mb-0.5">Location</span>
                <span className="font-semibold text-slate-800">{job.city}, {job.state}</span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase block mb-0.5">Shift Schedule</span>
                <span className="font-semibold text-slate-800">{job.shift}</span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase block mb-0.5">Application Deadline</span>
                <span className="font-semibold text-slate-800">{job.application_deadline || 'Open Until Filled'}</span>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase block mb-0.5">Position Reference ID</span>
                <span className="font-mono text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{job.id}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                onClick={() => setApplyModalOpen(true)}
                className="w-full bg-[#0E4C92] hover:bg-[#0A3A72] text-white font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Application Now</span>
              </button>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: job.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Job link copied to clipboard!');
                  }
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Job Link</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Related Positions Section */}
      {relatedJobs.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-16 space-y-6">
          <h3 className="text-2xl font-extrabold text-slate-900">
            Similar Healthcare Opportunities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedJobs.map((rJob) => (
              <JobCard key={rJob.id} job={rJob} onApplyClick={(j) => { setJob(j); setApplyModalOpen(true); }} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Bottom Apply Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 z-40 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{job.title}</h4>
            <p className="text-xs text-slate-500">{job.facility_name} • {job.city}, {job.state} • <strong className="text-[#0E4C92]">{formatSalary()}</strong></p>
          </div>

          <button
            onClick={() => setApplyModalOpen(true)}
            className="w-full sm:w-auto bg-[#0E4C92] hover:bg-[#0A3A72] text-white font-extrabold text-sm px-8 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Apply Now (Direct Dispatch)</span>
          </button>
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        job={job}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />

    </div>
  );
};
