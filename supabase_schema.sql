-- R.L. Klein & Associates Inc. - Supabase Production Schema
-- Database setup for Jobs, Blogs, and Admin Users.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. JOBS TABLE
CREATE TABLE IF NOT EXISTS public.jobs (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'rlk-' || floor(random() * 90000 + 10000)::text,
  title VARCHAR(255) NOT NULL,
  facility_name VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  discipline VARCHAR(100) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(10) NOT NULL,
  employment_type VARCHAR(100) NOT NULL,
  shift VARCHAR(100) NOT NULL,
  salary_min NUMERIC NOT NULL DEFAULT 0,
  salary_max NUMERIC NOT NULL DEFAULT 0,
  salary_type VARCHAR(20) NOT NULL DEFAULT 'Weekly',
  weekly_pay NUMERIC,
  job_description TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  requirements TEXT[] NOT NULL DEFAULT '{}',
  benefits TEXT[] NOT NULL DEFAULT '{}',
  application_deadline DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'published',
  featured BOOLEAN NOT NULL DEFAULT false,
  posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
  seo_meta_title TEXT,
  seo_meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. BLOGS TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'blog-' || floor(random() * 90000 + 10000)::text,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  author_role VARCHAR(100) NOT NULL,
  read_time VARCHAR(20) NOT NULL DEFAULT '5 min read',
  cover_image TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'published',
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  seo_meta_title TEXT,
  seo_meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- INDEXES FOR HIGH-PERFORMANCE SEARCH
CREATE INDEX IF NOT EXISTS idx_jobs_discipline ON public.jobs(discipline);
CREATE INDEX IF NOT EXISTS idx_jobs_state ON public.jobs(state);
CREATE INDEX IF NOT EXISTS idx_jobs_employment_type ON public.jobs(employment_type);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published jobs and blogs
CREATE POLICY "Allow public read published jobs" ON public.jobs FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
CREATE POLICY "Allow public read published blogs" ON public.blogs FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

-- Allow authenticated admins to insert, update, delete
CREATE POLICY "Allow authenticated full access jobs" ON public.jobs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access blogs" ON public.blogs FOR ALL USING (auth.role() = 'authenticated');
