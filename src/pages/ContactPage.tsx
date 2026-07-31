import React, { useState } from 'react';
import { SEOHead } from '../components/layout/SEOHead';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Candidate Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-8">
      <SEOHead 
        title="Contact R.L. Klein & Associates Inc. | Recruitment Headquarters"
        description="Get in touch with our executive recruitment team for travel nursing, allied health staffing, and hospital director partnerships."
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0E4C92] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            Reach Our Recruitment Team
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact R.L. Klein &amp; Associates
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Whether you are a healthcare professional inquiring about high-paying travel contracts or a health system director seeking contingent staffing solutions, our executive team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Headquarters Info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#071C35] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                Operational Headquarters
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1D6ECF] shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">Headquarters</strong>
                    <p>59 West 3140 North, Provo, Utah.</p>
                  
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#1D6ECF] shrink-0" />
                  <div>
                    <strong className="text-white block">Call Center Hotline</strong>
                    <a href="tel:18005557553" className="hover:text-white transition-colors">562-427-5577</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#1D6ECF] shrink-0" />
                  <div>
                    <strong className="text-white block">Direct Email Dispatch</strong>
                    <a href="mailto:info@rlklein.com" className="hover:text-white transition-colors">info@rlklein.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#1D6ECF] shrink-0" />
                  <div>
                    <strong className="text-white block">Hours of Operation</strong>
                    <p>Monday - Saturday: 9:00 AM - 6:00 PM PST</p>
                    <p className="text-xs text-amber-300 font-semibold mt-0.5">24/7 Clinical Nurse Support for Active Travelers</p>
                  </div>
                </div>
              </div>

              
            </div>

            {/* Additional Hub Locations */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Regional Recruitment Hubs</h4>
              <div className="space-y-2 text-xs text-slate-700 font-semibold">
                <p className="flex items-center gap-2"><Building2 className="w-4 h-4 text-[#0E4C92]" /> Dallas, TX — Texas Medical Center Recruitment Hub</p>
                <p className="flex items-center gap-2"><Building2 className="w-4 h-4 text-[#0E4C92]" /> Chicago, IL — Midwest Healthcare Staffing Office</p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-md">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Received</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for contacting R.L. Klein &amp; Associates Inc. An executive recruiter will follow up with you shortly via phone or email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#0E4C92] text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-[#0A3A72]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#0E4C92]" />
                  <span>Send a Direct Inquiry</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. David Vance"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="d.vance@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(404) 555-0188"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Inquiry Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92]"
                    >
                      <option value="General Candidate Inquiry">Travel Nurse / Candidate Inquiry</option>
                      <option value="Facility Staffing Request">Facility Staffing Request</option>
                      <option value="Locum Tenens Physician Search">Locum Tenens Physician Search</option>
                      <option value="Compliance & Credentials">Compliance &amp; Credentials</option>
                      <option value="Executive Career Placement">Executive Career Placement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can R.L. Klein & Associates assist your career or healthcare facility?"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0E4C92] to-[#1D6ECF] text-white font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 hover:opacity-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to info@rlklein.com</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
