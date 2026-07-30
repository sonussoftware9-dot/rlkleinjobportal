import React from 'react';
import { SEOHead } from '../components/layout/SEOHead';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-8">
      <SEOHead 
        title="Terms of Service | R.L. Klein & Associates Inc."
        description="Terms and conditions governing the use of the R.L. Klein & Associates healthcare recruitment platform."
      />

      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md space-y-8">
        <div className="border-b border-slate-200 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0E4C92] text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
          <p className="text-xs text-slate-500">Last Updated: January 1, 2026 | R.L. Klein &amp; Associates Inc.</p>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Agreement to Terms</h2>
            <p>By accessing or using the job portal operated by R.L. Klein &amp; Associates Inc., you agree to comply with and be bound by these Terms of Service and all applicable federal and state regulations governing healthcare employment.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Applicant Representations</h2>
            <p>By submitting an application or clinical resume, you represent and warrant that all professional qualifications, state license numbers, certifications, and work experience provided are truthful, accurate, and current.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Equal Opportunity Employer</h2>
            <p>R.L. Klein &amp; Associates Inc. is an Equal Opportunity Employer. All qualified healthcare candidates receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, or protected veteran status.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Limitation of Liability</h2>
            <p>R.L. Klein &amp; Associates Inc. provides job listings and recruitment services on an "as is" basis and makes no guarantee of contract placement or specific compensation rates until a formal employment contract is executed.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
