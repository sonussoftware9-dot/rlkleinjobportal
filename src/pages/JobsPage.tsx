import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Job, JobFiltersState } from '../types';
import { JobsService } from '../services/api';
import { JobCard } from '../components/jobs/JobCard';
import { JobFilters } from '../components/jobs/JobFilters';
import { ApplicationModal } from '../components/jobs/ApplicationModal';
import { SEOHead } from '../components/layout/SEOHead';
import { Search, Briefcase, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export const JobsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [filters, setFilters] = useState<JobFiltersState>({
    keyword: searchParams.get('keyword') || '',
    location: searchParams.get('location') || '',
    discipline: searchParams.get('discipline') || 'All',
    specialty: 'All',
    employment_type: 'All',
    shift: 'All',
    state: searchParams.get('state') || 'All',
    salary_min: 0,
    sort_by: 'newest'
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Application Modal State
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      try {
        const fetched = await JobsService.getJobs(filters);
        setJobs(fetched);
        setCurrentPage(1);
      } catch (err) {
        console.error('Error loading jobs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      keyword: '',
      location: '',
      discipline: 'All',
      specialty: 'All',
      employment_type: 'All',
      shift: 'All',
      state: 'All',
      salary_min: 0,
      sort_by: 'newest'
    });
    setSearchParams({});
  };

  const openApplyModal = (job: Job) => {
    setSelectedJobForApply(job);
    setApplyModalOpen(true);
  };

  // Pagination Math
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const paginatedJobs = jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-8">
      <SEOHead 
        title="Healthcare Job Listings & Travel Nurse Positions | R.L. Klein"
        description="Search thousands of high-paying travel nursing, allied health, therapy, and physician locum tenens positions across all 50 states."
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#071C35] to-[#0E4C92] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Live Career Portal
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Healthcare Jobs Board
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Explore competitive travel nursing contracts, permanent placements, and physician locum tenens across leading hospital networks nationwide.
            </p>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-700">
            Showing <span className="text-[#0E4C92]">{jobs.length}</span> positions
          </div>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 bg-[#0E4C92] text-white px-4 py-2 rounded-xl text-xs font-bold"
          >
            <Filter className="w-4 h-4" />
            <span>{mobileFilterOpen ? 'Hide Filters' : 'Filter Search'}</span>
          </button>
        </div>

        {/* Main Grid Layout: Filters Sidebar + Job Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Filters Sidebar */}
          <div className={`lg:col-span-4 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <JobFilters
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              totalResultsCount={jobs.length}
            />
          </div>

          {/* Job Cards Listing Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Results Header */}
            <div className="hidden lg:flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <p className="text-sm font-semibold text-slate-700">
                Found <span className="text-[#0E4C92] font-extrabold">{jobs.length}</span> positions matching your criteria
              </p>

              <div className="flex items-center gap-3 text-xs">
                <span className="font-bold text-slate-500 uppercase">Sort:</span>
                <select
                  value={filters.sort_by}
                  onChange={(e) => setFilters({ ...filters, sort_by: e.target.value as any })}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92]"
                >
                  <option value="newest">Newest First</option>
                  <option value="salary_high">Salary High to Low</option>
                  <option value="salary_low">Salary Low to High</option>
                </select>
              </div>
            </div>

            {/* Loading Skeleton or Cards */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 h-48 animate-pulse border border-slate-200" />
                ))}
              </div>
            ) : paginatedJobs.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
                <div className="w-16 h-16 bg-blue-50 text-[#0E4C92] rounded-2xl flex items-center justify-center mx-auto">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No matching healthcare jobs found</h3>
                <p className="text-slate-600 text-xs max-w-md mx-auto">
                  Try broadening your keyword search, clearing location constraints, or selecting "All Disciplines".
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-2 inline-flex items-center gap-2 bg-[#0E4C92] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-[#0A3A72]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job} onApplyClick={openApplyModal} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-6 flex items-center justify-between border-t border-slate-200">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <span className="text-xs font-semibold text-slate-600">
                  Page <strong className="text-slate-900">{currentPage}</strong> of <strong>{totalPages}</strong>
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 disabled:opacity-40 hover:bg-slate-50 flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Application Modal */}
      <ApplicationModal
        job={selectedJobForApply}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />

    </div>
  );
};
