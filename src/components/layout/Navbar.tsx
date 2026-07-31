import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Phone, 
  Mail, 
  Search, 
  ShieldCheck, 
  Menu, 
  X, 
  Lock,
  ChevronRight,
  Stethoscope
} from 'lucide-react';
import logo from "../../../assets/rlklein.png"
export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search Jobs', path: '/jobs' },
    { name: 'Disciplines', path: '/disciplines' },
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-[#071C35] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a href="tel:18005557553" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#1D6ECF]" />
              <span className="font-semibold text-white">562-427-5577</span>
            </a>
            <a href="mailto:info@rlklein.com" className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#1D6ECF]" />
              <span>info@rlklein.com</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span></span>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link 
              to="/admin" 
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-white transition-colors py-0.5 px-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <Lock className="w-3 h-3 text-[#1D6ECF]" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <nav className="glass-panel bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
         <Link to="/" className="flex items-center">
  <img
    src={logo}
    alt="R.L. Klein & Associates"
    className="h-14 w-auto"
  />
</Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors py-1 border-b-2 ${
                  isActive(link.path)
                    ? 'text-[#0E4C92] border-[#0E4C92] font-semibold'
                    : 'text-slate-600 border-transparent hover:text-[#0E4C92] hover:border-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 bg-[#0E4C92] hover:bg-[#0A3A72] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg shadow-blue-900/15"
            >
              <Search className="w-4 h-4" />
              <span>Explore 5,000+ Jobs</span>
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/jobs"
              className="p-2 text-[#0E4C92] hover:bg-slate-100 rounded-lg"
              title="Search Jobs"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 pb-4 space-y-1 bg-white rounded-2xl p-4 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#0E4C92] text-white'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className={`w-4 h-4 ${isActive(link.path) ? 'text-white' : 'text-slate-400'}`} />
              </Link>
            ))}

            <div className="pt-3 border-t border-slate-100 mt-2 space-y-2">
              <Link
                to="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#0E4C92] text-white py-3 rounded-xl font-semibold text-sm shadow-md"
              >
                <Search className="w-4 h-4" />
                <span>Browse All Healthcare Jobs</span>
              </Link>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-medium text-xs border border-slate-200"
              >
                <Lock className="w-3.5 h-3.5 text-[#0E4C92]" />
                <span>Admin Portal Login</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
