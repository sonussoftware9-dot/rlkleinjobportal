import React from 'react';
import { JobFiltersState } from '../../types';
import { US_STATES } from '../../data/mockData';
import { Search, MapPin, Filter, RotateCcw, SlidersHorizontal, DollarSign } from 'lucide-react';

interface JobFiltersProps {
  filters: JobFiltersState;
  onChange: (filters: JobFiltersState) => void;
  onReset: () => void;
  totalResultsCount: number;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onChange,
  onReset,
  totalResultsCount
}) => {
  const handleInputChange = (field: keyof JobFiltersState, value: any) => {
    onChange({
      ...filters,
      [field]: value
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#0E4C92]" />
          <h3 className="font-bold text-slate-900 text-base">Filter Healthcare Jobs</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-[#0E4C92] flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Keyword Search */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Keyword / Specialty</label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.keyword}
            onChange={(e) => handleInputChange('keyword', e.target.value)}
            placeholder="e.g. ICU, ER Nurse, Physical Therapist..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
          />
        </div>
      </div>

      {/* Location / City */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">City / Metro</label>
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="e.g. Atlanta, Houston, Phoenix..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
          />
        </div>
      </div>

      {/* Discipline */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Healthcare Discipline</label>
        <select
          value={filters.discipline}
          onChange={(e) => handleInputChange('discipline', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white text-slate-800"
        >
          <option value="All">All Disciplines</option>
          <option value="Nursing">Nursing (RN / LPN)</option>
          <option value="Allied Health">Allied Health</option>
          <option value="Therapy">Physical & Occupational Therapy</option>
          <option value="Physicians">Physicians (MD / DO)</option>
          <option value="Advanced Practice">Advanced Practice (NP / PA)</option>
          <option value="Healthcare IT & Leadership">Healthcare IT &amp; Leadership</option>
        </select>
      </div>

      {/* State */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">US State</label>
        <select
          value={filters.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white text-slate-800"
        >
          <option value="All">All 50 States</option>
          {US_STATES.map((st) => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>

      {/* Employment Type */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Employment Type</label>
        <select
          value={filters.employment_type}
          onChange={(e) => handleInputChange('employment_type', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white text-slate-800"
        >
          <option value="All">All Types</option>
          <option value="Travel Nursing">Travel Nursing</option>
          <option value="Permanent Placement">Permanent Placement</option>
          <option value="Contract">Contract</option>
          <option value="Per Diem / PRN">Per Diem / PRN</option>
          <option value="Locum Tenens">Locum Tenens</option>
        </select>
      </div>

      {/* Shift */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Preferred Shift</label>
        <select
          value={filters.shift}
          onChange={(e) => handleInputChange('shift', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white text-slate-800"
        >
          <option value="All">All Shifts</option>
          <option value="Day (12 Hours)">Day (12 Hours)</option>
          <option value="Night (12 Hours)">Night (12 Hours)</option>
          <option value="Rotating">Rotating</option>
          <option value="Evening (8 Hours)">Evening (8 Hours)</option>
          <option value="Flexible">Flexible</option>
        </select>
      </div>

      {/* Minimum Pay Range */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <div className="flex justify-between items-center text-xs">
          <label className="font-bold uppercase tracking-wider text-slate-600">Min Pay Threshold</label>
          <span className="font-bold text-[#0E4C92]">
            {filters.salary_min > 0 ? `$${filters.salary_min.toLocaleString()} / wk+` : 'Any Pay'}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="4000"
          step="250"
          value={filters.salary_min}
          onChange={(e) => handleInputChange('salary_min', Number(e.target.value))}
          className="w-full accent-[#0E4C92] cursor-pointer"
        />
      </div>

      {/* Sort By */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">Sort Order</label>
        <select
          value={filters.sort_by}
          onChange={(e) => handleInputChange('sort_by', e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white text-slate-800"
        >
          <option value="newest">Most Recent</option>
          <option value="salary_high">Highest Estimated Pay</option>
          <option value="salary_low">Lowest Estimated Pay</option>
        </select>
      </div>

      <div className="pt-2 text-center text-xs font-semibold text-slate-500 bg-slate-50 py-2 rounded-xl">
        Showing <span className="text-[#0E4C92] font-bold">{totalResultsCount}</span> matched positions
      </div>

    </div>
  );
};
