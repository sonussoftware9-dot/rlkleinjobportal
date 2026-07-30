import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Blog } from '../types';
import { BlogsService } from '../services/api';
import { SEOHead } from '../components/layout/SEOHead';
import { Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await BlogsService.getBlogs();
        setBlogs(data.filter(b => b.status === 'published'));
      } catch (err) {
        console.error('Error loading blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-8">
      <SEOHead 
        title="Healthcare Recruitment & Travel Nursing Blog | R.L. Klein"
        description="Expert insights on travel nursing pay packages, multi-state licensing compacts, allied health trends, and hospital staffing."
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0E4C92] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            Industry Insights &amp; Career Guides
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Healthcare Recruitment Blog
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Stay informed on travel nurse stipends, licensing updates, career negotiation strategies, and clinical compliance standards.
          </p>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl h-80 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Cover Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-[#0E4C92] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {blog.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {blog.published_at}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {blog.read_time}
                      </span>
                    </div>

                    <Link
                      to={`/blog/${blog.slug}`}
                      className="text-lg font-bold text-slate-900 group-hover:text-[#0E4C92] transition-colors leading-snug block line-clamp-2"
                    >
                      {blog.title}
                    </Link>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <div className="text-xs">
                    <p className="font-bold text-slate-800">{blog.author}</p>
                    <p className="text-[10px] text-slate-400">{blog.author_role}</p>
                  </div>

                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-xs font-bold text-[#0E4C92] group-hover:translate-x-1 transition-transform flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
