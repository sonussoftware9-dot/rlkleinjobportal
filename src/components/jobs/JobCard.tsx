import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../../types';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  Calendar, 
  ChevronRight,
  Sparkles,
  Briefcase
} from 'lucide-react';

interface JobCardProps {
  job: Job;
  onApplyClick: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApplyClick }) => {
  const formatSalary = () => {
    if (job.weekly_pay) {
      return `$${job.weekly_pay.toLocaleString()} / wk`;
    }
    if (job.salary_type === 'Hourly') {
      return `$${job.salary_min} - $${job.salary_max} / hr`;
    }
    if (job.salary_type === 'Annual') {
      return `$${(job.salary_min / 1000).toFixed(0)}k - $${(job.salary_max / 1000).toFixed(0)}k / yr`;
    }
    return `$${job.salary_min.toLocaleString()} / wk`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      
      {job.featured && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-400 text-[#071C35] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#071C35]" />
          <span>Priority Opportunity</span>
        </div>
      )}

      <div>
        {/* Top badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0E4C92] text-xs font-semibold border border-blue-100">
            {job.discipline}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
            {job.employment_type}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
            {job.shift}
          </span>
        </div>

        {/* Title */}
        <Link 
          to={`/jobs/${job.id}`} 
          className="text-lg font-bold text-slate-900 group-hover:text-[#0E4C92] transition-colors leading-snug line-clamp-2 block mb-2"
        >
          {job.title}
        </Link>

        {/* Facility & Location */}
        <div className="space-y-1.5 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-[#1D6ECF] shrink-0" />
            <span className="font-semibold text-slate-800 line-clamp-1">{job.facility_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{job.city}, {job.state} ({job.location})</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-5">
          {job.job_description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Estimated Pay</span>
          <span className="text-lg font-extrabold text-[#0E4C92]">{formatSalary()}</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            to={`/jobs/${job.id}`}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Details
          </Link>
          <button
            onClick={() => onApplyClick(job)}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0E4C92] hover:bg-[#0A3A72] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1.5"
          >
            <span>Apply Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
