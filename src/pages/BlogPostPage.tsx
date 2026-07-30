import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Blog } from '../types';
import { BlogsService } from '../services/api';
import { SEOHead } from '../components/layout/SEOHead';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      try {
        const data = await BlogsService.getBlogBySlug(slug);
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0E4C92] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <p className="text-slate-600 text-sm">The article you are looking for does not exist or has been archived.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 bg-[#0E4C92] text-white px-6 py-2.5 rounded-xl font-bold text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-8">
      <SEOHead 
        title={`${blog.title} | R.L. Klein & Associates`}
        description={blog.excerpt}
        ogType="article"
      />

      <div className="max-w-4xl mx-auto space-y-8">
        
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-[#0E4C92] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          
          {/* Cover Header */}
          <div className="h-80 overflow-hidden relative">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071C35] via-[#071C35]/50 to-transparent flex items-end p-8 text-white">
              <div className="space-y-2">
                <span className="bg-[#1D6ECF] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                  {blog.category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
                  {blog.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Author Meta Bar */}
          <div className="p-6 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0E4C92] text-white flex items-center justify-center font-bold">
                {blog.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-900">{blog.author}</p>
                <p className="text-[11px] text-slate-500">{blog.author_role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {blog.published_at}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {blog.read_time}
              </span>
            </div>
          </div>

          {/* Article HTML Content */}
          <div 
            className="p-8 sm:p-12 space-y-6 text-slate-800 text-base leading-relaxed font-normal prose prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Bottom Share Bar */}
          <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">R.L. Klein &amp; Associates Executive Publications</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Article link copied!');
              }}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Article</span>
            </button>
          </div>

        </article>

      </div>
    </div>
  );
};
