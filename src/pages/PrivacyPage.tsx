import React from 'react';
import { SEOHead } from '../components/layout/SEOHead';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-8">
      <SEOHead 
        title="Privacy Policy | R.L. Klein & Associates Inc."
        description="Privacy policy and data protection guidelines for job applicants and healthcare facilities."
      />

      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md space-y-8">
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0E4C92] text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection Standards</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Effective Date: January 1, 2026 | R.L. Klein &amp; Associates Inc.</p>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
            <p>When you apply for a position or submit an inquiry with R.L. Klein &amp; Associates Inc., we collect candidate information necessary for clinical recruitment and credential evaluation, including your full name, email address, phone number, mailing address, clinical license numbers, specialty certifications, employment history, and resume documents.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. How We Use Candidate Information</h2>
            <p>Candidate information is utilized strictly for evaluating clinical qualifications, matching healthcare professionals with partner hospital assignments, fulfilling state board credentialing requirements, and communicating contract details.</p>
          </section>

          <section className="space-y-2 font-semibold text-slate-900 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
            <h2 className="text-base font-bold text-[#0E4C92]">3. Application Direct Dispatch Policy</h2>
            <p className="text-xs text-slate-700 font-normal">Candidate job applications submitted through our career portal are transmitted directly to our executive recruitment inbox at <strong>info@rlklein.com</strong>. Unsolicited public accounts or candidate login profiles are intentionally not created to guarantee maximum candidate privacy.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Third-Party Sharing</h2>
            <p>We do not sell, rent, or trade applicant personal information. Candidate credentials and resumes are shared only with prospective healthcare facilities and health systems with candidate consent for active position placement.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">5. Contact Corporate Compliance</h2>
            <p>For questions regarding our privacy practices or data rights, contact our privacy officer at <a href="mailto:info@rlklein.com" className="text-[#0E4C92] font-bold">info@rlklein.com</a> or call 1-800-555-RLKLEIN.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
