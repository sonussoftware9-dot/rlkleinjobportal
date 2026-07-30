export type DisciplineType = 
  | 'Nursing'
  | 'Allied Health'
  | 'Therapy'
  | 'Physicians'
  | 'Advanced Practice'
  | 'Healthcare IT & Leadership';

export type EmploymentType = 
  | 'Travel Nursing'
  | 'Permanent Placement'
  | 'Per Diem / PRN'
  | 'Contract'
  | 'Locum Tenens';

export type ShiftType = 
  | 'Day (12 Hours)'
  | 'Night (12 Hours)'
  | 'Rotating'
  | 'Evening (8 Hours)'
  | 'Flexible';

export type JobStatus = 'published' | 'draft' | 'expired';

export interface Job {
  id: string;
  title: string;
  facility_name: string;
  department: string;
  discipline: DisciplineType;
  specialty: string;
  location: string;
  city: string;
  state: string;
  employment_type: EmploymentType;
  shift: ShiftType;
  salary_min: number;
  salary_max: number;
  salary_type: 'Hourly' | 'Weekly' | 'Annual';
  weekly_pay?: number;
  job_description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  application_deadline: string;
  status: JobStatus;
  featured: boolean;
  posted_date: string;
  seo_meta_title?: string;
  seo_meta_description?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  author_role: string;
  read_time: string;
  cover_image: string;
  status: 'published' | 'draft';
  published_at: string;
  seo_meta_title?: string;
  seo_meta_description?: string;
}

export interface ApplicationSubmission {
  job_id: string;
  job_title: string;
  facility_name?: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  resume_name?: string;
  cover_letter?: string;
  linkedin_url?: string;
  license_number: string;
  specialty: string;
  years_experience: string;
  preferred_location: string;
  availability: string;
  agreed_terms: boolean;
  submitted_at: string;
}

export interface JobFiltersState {
  keyword: string;
  location: string;
  discipline: string;
  specialty: string;
  employment_type: string;
  shift: string;
  state: string;
  salary_min: number;
  sort_by: 'newest' | 'salary_high' | 'salary_low';
  status?: JobStatus;
}

export interface AdminStats {
  total_jobs: number;
  active_jobs: number;
  expired_jobs: number;
  draft_jobs: number;
  total_applications_sent: number;
}
