import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Job, Blog, ApplicationSubmission, DisciplineType, EmploymentType, ShiftType, JobStatus } from '../../types';
import { JobsService, BlogsService, ApplicationService } from '../../services/api';
import { US_STATES } from '../../data/mockData';
import { 
  Briefcase, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Copy, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Search, 
  LogOut, 
  BarChart3, 
  Users, 
  Sparkles, 
  X, 
  Send,
  Building2,
  Calendar,
  AlertCircle,
  Globe
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'jobs' | 'blogs' | 'applications'>('jobs');

  // Data States
  const [jobs, setJobs] = useState<Job[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [applications, setApplications] = useState<ApplicationSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters in Admin
  const [jobSearch, setJobSearch] = useState('');

  // Modals State
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [previewJob, setPreviewJob] = useState<Job | null>(null);

  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  // Form State for Job Create / Edit
  const [jobForm, setJobForm] = useState<Partial<Job>>({
    title: '',
    facility_name: '',
    department: 'Intensive Care Unit',
    discipline: 'Nursing',
    specialty: 'ICU',
    location: 'Atlanta, GA',
    city: 'Atlanta',
    state: 'GA',
    employment_type: 'Travel Nursing',
    shift: 'Night (12 Hours)',
    salary_min: 2800,
    salary_max: 3400,
    salary_type: 'Weekly',
    weekly_pay: 3200,
    job_description: '',
    responsibilities: ['Provide comprehensive bedside patient care.', 'Monitor vital signs and EHR charts.'],
    requirements: ['Active RN license in state of placement.', '2+ years hospital clinical experience.'],
    benefits: ['Weekly Direct Deposit.', 'Tax-free housing stipend.', 'Day-1 Health Insurance.'],
    application_deadline: '2026-10-31',
    status: 'published',
    featured: false,
    seo_meta_title: '',
    seo_meta_description: ''
  });

  // Form State for Blog
  const [blogForm, setBlogForm] = useState<Partial<Blog>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Travel Nursing',
    author: 'R.L. Klein Executive Team',
    author_role: 'Senior Clinical Specialist',
    read_time: '5 min read',
    cover_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    status: 'published'
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const fetchedJobs = await JobsService.getJobs({ status: undefined });
      setJobs(fetchedJobs);

      const fetchedBlogs = await BlogsService.getBlogs();
      setBlogs(fetchedBlogs);

      const fetchedApps = ApplicationService.getRecentApplications();
      setApplications(fetchedApps);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('rlklein_admin_token');
    navigate('/');
  };

  // Metric Math
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(j => j.status === 'published').length;
  const expiredJobs = jobs.filter(j => j.status === 'expired').length;
  const draftJobs = jobs.filter(j => j.status === 'draft').length;

  // JOB ACTIONS
  const handleOpenJobModal = (jobToEdit?: Job) => {
    if (jobToEdit) {
      setEditingJob(jobToEdit);
      setJobForm({ ...jobToEdit });
    } else {
      setEditingJob(null);
      setJobForm({
        title: '',
        facility_name: 'Emory University Hospital',
        department: 'Emergency Services',
        discipline: 'Nursing',
        specialty: 'Emergency Room',
        location: 'Atlanta, GA',
        city: 'Atlanta',
        state: 'GA',
        employment_type: 'Travel Nursing',
        shift: 'Day (12 Hours)',
        salary_min: 2900,
        salary_max: 3500,
        salary_type: 'Weekly',
        weekly_pay: 3250,
        job_description: 'High paying contract position for experienced clinical professionals.',
        responsibilities: ['Provide direct bedside care.', 'Participate in multidisciplinary rounds.'],
        requirements: ['Active state license or compact.', 'BLS/ACLS certifications.'],
        benefits: ['Weekly pay $3,250.', 'Tax-free housing allowance.', '401k match.'],
        application_deadline: '2026-11-30',
        status: 'published',
        featured: false,
        seo_meta_title: '',
        seo_meta_description: ''
      });
    }
    setJobModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await JobsService.updateJob(editingJob.id, jobForm);
      } else {
        await JobsService.createJob(jobForm as Omit<Job, 'id' | 'posted_date'>);
      }
      setJobModalOpen(false);
      loadData();
    } catch (err) {
      alert('Error saving job.');
    }
  };

  const handleTogglePublishJob = async (job: Job) => {
    const newStatus: JobStatus = job.status === 'published' ? 'draft' : 'published';
    await JobsService.updateJob(job.id, { status: newStatus });
    loadData();
  };

  const handleDuplicateJob = async (job: Job) => {
    const duplicated: Omit<Job, 'id' | 'posted_date'> = {
      ...job,
      title: `${job.title} (Copy)`
    };
    await JobsService.createJob(duplicated);
    loadData();
  };

  const handleDeleteJob = async (id: string) => {
    if (confirm('Are you sure you want to delete this job record?')) {
      await JobsService.deleteJob(id);
      loadData();
    }
  };

  // BLOG ACTIONS
  const handleOpenBlogModal = (blogToEdit?: Blog) => {
    if (blogToEdit) {
      setEditingBlog(blogToEdit);
      setBlogForm({ ...blogToEdit });
    } else {
      setEditingBlog(null);
      setBlogForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '<p>Write complete HTML article content here...</p>',
        category: 'Travel Nursing',
        author: 'R.L. Klein Recruitment Team',
        author_role: 'Senior Clinical Specialist',
        read_time: '4 min read',
        cover_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        status: 'published'
      });
    }
    setBlogModalOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const generatedSlug = blogForm.slug || (blogForm.title ? blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `blog-${Date.now()}`);
      await BlogsService.createBlog({
        ...blogForm,
        slug: generatedSlug
      } as Omit<Blog, 'id' | 'published_at'>);
      setBlogModalOpen(false);
      loadData();
    } catch (err) {
      alert('Error saving blog.');
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      await BlogsService.deleteBlog(id);
      loadData();
    }
  };

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.facility_name.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.specialty.toLowerCase().includes(jobSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-20">
      
      {/* Top Header */}
      <header className="bg-[#071C35] text-white py-4 px-6 border-b border-slate-800 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1D6ECF] flex items-center justify-center font-bold text-white">
              RL
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-white leading-none">
                Executive Portal
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                R.L. Klein &amp; Associates Inc.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
            >
              <Globe className="w-3.5 h-3.5 text-[#1D6ECF]" />
              <span>View Public Portal</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Positions</p>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">{totalJobs}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-[#0E4C92] rounded-2xl flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Published</p>
              <p className="text-3xl font-extrabold text-emerald-600 mt-1">{activeJobs}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Draft / Expired</p>
              <p className="text-3xl font-extrabold text-amber-600 mt-1">{draftJobs + expiredJobs}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
              <XCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applications Dispatched</p>
              <p className="text-3xl font-extrabold text-[#1D6ECF] mt-1">{applications.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-[#1D6ECF] rounded-2xl flex items-center justify-center">
              <Send className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 space-x-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'jobs'
                ? 'text-[#0E4C92] border-[#0E4C92]'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            Job Management ({jobs.length})
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'blogs'
                ? 'text-[#0E4C92] border-[#0E4C92]'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            Blog Management ({blogs.length})
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'applications'
                ? 'text-[#0E4C92] border-[#0E4C92]'
                : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            Candidate Submissions Log ({applications.length})
          </button>
        </div>

        {/* ================= TAB 1: JOB MANAGEMENT ================= */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative max-w-sm w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  placeholder="Search jobs by title or hospital..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92]"
                />
              </div>

              <button
                onClick={() => handleOpenJobModal()}
                className="bg-[#0E4C92] hover:bg-[#0A3A72] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Job Posting</span>
              </button>
            </div>

            {/* Jobs Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Title &amp; Facility</th>
                    <th className="py-3 px-4">Discipline</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Est. Salary</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredJobs.map((j) => (
                    <tr key={j.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900 text-sm line-clamp-1">{j.title}</p>
                        <p className="text-slate-500 text-[11px]">{j.facility_name} • ID: {j.id}</p>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {j.discipline} ({j.specialty})
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {j.city}, {j.state}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#0E4C92]">
                        {j.weekly_pay ? `$${j.weekly_pay}/wk` : `$${j.salary_min}/wk`}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          j.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {j.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setPreviewJob(j)}
                            className="p-1.5 text-slate-600 hover:text-[#0E4C92] hover:bg-slate-100 rounded-lg"
                            title="Live Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleTogglePublishJob(j)}
                            className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-lg"
                            title={j.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            {j.status === 'published' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDuplicateJob(j)}
                            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenJobModal(j)}
                            className="p-1.5 text-slate-600 hover:text-[#0E4C92] hover:bg-slate-100 rounded-lg"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(j.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ================= TAB 2: BLOG MANAGEMENT ================= */}
        {activeTab === 'blogs' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">Executive Articles</h3>
              <button
                onClick={() => handleOpenBlogModal()}
                className="bg-[#0E4C92] hover:bg-[#0A3A72] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((b) => (
                <div key={b.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E4C92] bg-blue-100 px-2.5 py-0.5 rounded-full">
                      {b.category}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{b.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{b.excerpt}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 mt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{b.published_at}</span>
                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      className="text-rose-600 hover:underline font-bold text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: CANDIDATE SUBMISSIONS LOG ================= */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Candidate Transmission Receipts</h3>
              <p className="text-xs text-slate-500">
                Log of applications dispatched directly to <strong>info@rlklein.com</strong>. No candidate password accounts created.
              </p>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No candidate submissions logged in current session. Submit a job application on the public portal to view log receipt.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Applicant</th>
                      <th className="py-3 px-4">Applied Position</th>
                      <th className="py-3 px-4">License &amp; Specialty</th>
                      <th className="py-3 px-4">Resume File</th>
                      <th className="py-3 px-4">Dispatch Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-900">{app.full_name}</p>
                          <p className="text-slate-500">{app.email} • {app.phone}</p>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#0E4C92]">
                          {app.job_title} ({app.job_id})
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">
                          <p className="font-bold">{app.license_number}</p>
                          <p className="text-slate-500">{app.specialty} • {app.years_experience}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-mono rounded-md border border-emerald-200">
                            {app.resume_name}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {new Date(app.submitted_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ================= CREATE / EDIT JOB MODAL ================= */}
      {jobModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
            
            <div className="bg-[#0E4C92] text-white p-6 flex justify-between items-center">
              <h3 className="text-lg font-bold">
                {editingJob ? 'Edit Job Posting' : 'Create New Healthcare Job'}
              </h3>
              <button onClick={() => setJobModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="p-6 overflow-y-auto space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hospital / Facility Name *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.facility_name}
                    onChange={(e) => setJobForm({ ...jobForm, facility_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Discipline *</label>
                  <select
                    value={jobForm.discipline}
                    onChange={(e) => setJobForm({ ...jobForm, discipline: e.target.value as DisciplineType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Nursing">Nursing</option>
                    <option value="Allied Health">Allied Health</option>
                    <option value="Therapy">Therapy</option>
                    <option value="Physicians">Physicians</option>
                    <option value="Advanced Practice">Advanced Practice</option>
                    <option value="Healthcare IT & Leadership">Healthcare IT &amp; Leadership</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Specialty *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.specialty}
                    onChange={(e) => setJobForm({ ...jobForm, specialty: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={jobForm.city}
                    onChange={(e) => setJobForm({ ...jobForm, city: e.target.value, location: `${e.target.value}, ${jobForm.state}` })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">State *</label>
                  <select
                    value={jobForm.state}
                    onChange={(e) => setJobForm({ ...jobForm, state: e.target.value, location: `${jobForm.city}, ${e.target.value}` })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Employment Type *</label>
                  <select
                    value={jobForm.employment_type}
                    onChange={(e) => setJobForm({ ...jobForm, employment_type: e.target.value as EmploymentType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Travel Nursing">Travel Nursing</option>
                    <option value="Permanent Placement">Permanent Placement</option>
                    <option value="Contract">Contract</option>
                    <option value="Per Diem / PRN">Per Diem / PRN</option>
                    <option value="Locum Tenens">Locum Tenens</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Shift Schedule *</label>
                  <select
                    value={jobForm.shift}
                    onChange={(e) => setJobForm({ ...jobForm, shift: e.target.value as ShiftType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Day (12 Hours)">Day (12 Hours)</option>
                    <option value="Night (12 Hours)">Night (12 Hours)</option>
                    <option value="Rotating">Rotating</option>
                    <option value="Evening (8 Hours)">Evening (8 Hours)</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Weekly Gross Pay ($)</label>
                  <input
                    type="number"
                    value={jobForm.weekly_pay || ''}
                    onChange={(e) => setJobForm({ ...jobForm, weekly_pay: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Publish Status</label>
                  <select
                    value={jobForm.status}
                    onChange={(e) => setJobForm({ ...jobForm, status: e.target.value as JobStatus })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Job Description *</label>
                <textarea
                  required
                  rows={3}
                  value={jobForm.job_description}
                  onChange={(e) => setJobForm({ ...jobForm, job_description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setJobModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0E4C92] text-white font-bold rounded-xl"
                >
                  Save Job Record
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ================= LIVE PREVIEW DRAWER ================= */}
      {previewJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-xl h-full p-8 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-xs font-bold text-[#0E4C92] uppercase">Live Preview Mode</span>
              <button onClick={() => setPreviewJob(null)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <span className="px-3 py-1 bg-blue-100 text-[#0E4C92] text-xs font-bold rounded-full">
                {previewJob.discipline}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">{previewJob.title}</h2>
              <p className="text-sm font-bold text-slate-700">{previewJob.facility_name} • {previewJob.location}</p>
              <p className="text-xl font-bold text-[#0E4C92]">
                {previewJob.weekly_pay ? `$${previewJob.weekly_pay} / week` : `$${previewJob.salary_min} / yr`}
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border text-xs text-slate-700 leading-relaxed">
                {previewJob.job_description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CREATE / EDIT BLOG MODAL ================= */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">Publish Blog Article</h3>
            <form onSubmit={handleSaveBlog} className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Excerpt *</label>
                <textarea
                  required
                  rows={2}
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">HTML Content *</label>
                <textarea
                  required
                  rows={6}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setBlogModalOpen(false)} className="px-4 py-2 font-bold text-slate-600">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-[#0E4C92] text-white font-bold rounded-xl">Publish Article</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
