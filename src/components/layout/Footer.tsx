import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import logo from "../../../assets/rlklein.png"
export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071C35] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Newsletter / Quick Help Banner */}
        <div className="bg-gradient-to-r from-[#0E4C92] to-[#1D6ECF] rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left space-y-2 max-w-2xl">
              <span className="text-xs font-bold tracking-widest text-amber-300 uppercase bg-white/10 px-3 py-1 rounded-full border border-white/20">
                Healthcare Talent Alerts
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Never Miss High-Paying Healthcare Opportunities
              </h3>
              <p className="text-blue-100 text-sm">
                Subscribe to receive weekly travel nurse stipends, specialty crisis rate alerts, and exclusive physician openings directly to your inbox.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to R.L. Klein Healthcare Talent Alerts!'); }} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your professional email..."
                className="px-5 py-3.5 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-400 min-w-[280px]"
              />
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-[#071C35] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Subscribe Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Company Bio */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="R.L. Klein & Associates"
                className="h-14 w-auto"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Founded over two decades ago, R.L. Klein &amp; Associates Inc. is a premier healthcare staffing and executive recruitment organization connecting nurses, allied health professionals, therapists, and physicians with leading health systems across all 50 states.
            </p>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#1D6ECF] shrink-0" />
                <span>59 West 3140 North, Provo, Utah.</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#1D6ECF] shrink-0" />
                <a href="tel:18005557553" className="hover:text-white transition-colors">562-427-5577 (1-800-555-7553)</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#1D6ECF] shrink-0" />
                <a href="mailto:info@rlklein.com" className="hover:text-white transition-colors">info@rlklein.com</a>
              </div>
            </div>

            {/* Accreditation Badge */}
           
          </div>

          {/* Quick Column 1: Healthcare Disciplines */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#1D6ECF] pl-3">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/jobs?discipline=Nursing" className="hover:text-white transition-colors">Travel &amp; Perm Nursing</Link></li>
              <li><Link to="/jobs?discipline=Allied+Health" className="hover:text-white transition-colors">Allied Health Professionals</Link></li>
              <li><Link to="/jobs?discipline=Therapy" className="hover:text-white transition-colors">Physical &amp; Occupational Therapy</Link></li>
              <li><Link to="/jobs?discipline=Physicians" className="hover:text-white transition-colors">Locum Tenens Physicians</Link></li>
              <li><Link to="/jobs?discipline=Advanced+Practice" className="hover:text-white transition-colors">Nurse Practitioners / PAs</Link></li>
              <li><Link to="/jobs?discipline=Healthcare+IT+%26+Leadership" className="hover:text-white transition-colors">Healthcare Leadership</Link></li>
            </ul>
          </div>

          {/* Quick Column 2: Job Seekers */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#1D6ECF] pl-3">
              Healthcare Professionals
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/jobs" className="hover:text-white transition-colors">Browse 5,000+ Jobs</Link></li>
              <li><Link to="/disciplines" className="hover:text-white transition-colors">Career Pathways</Link></li>
              <li><Link to="/blog/ultimate-guide-travel-nursing-compensation-2026" className="hover:text-white transition-colors">Travel Pay Calculator Guide</Link></li>
              <li><Link to="/blog/nlc-compact-nursing-license-expansion-2026" className="hover:text-white transition-colors">Compact License (NLC)</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Benefits &amp; 401(k) Match</Link></li>
            </ul>
          </div>

          {/* Quick Column 3: Corporate & Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#1D6ECF] pl-3">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About R.L. Klein</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Healthcare News &amp; Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Recruitment Team</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/admin" className="text-slate-500 hover:text-white transition-colors flex items-center gap-1 mt-2"><span>Admin Portal</span></Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} R.L. Klein &amp; Associates Inc. All rights reserved. Equal Opportunity Employer.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms &amp; Conditions</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
