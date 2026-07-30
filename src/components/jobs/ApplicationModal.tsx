import React, { useState } from 'react';
import { Job } from '../../types';
import { ApplicationService } from '../../services/api';
import { US_STATES } from '../../data/mockData';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Send, 
  AlertCircle,
  Clock,
  Briefcase,
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Award
} from 'lucide-react';

interface ApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ job, isOpen, onClose }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('GA');
  const [coverLetter, setCoverLetter] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [specialty, setSpecialty] = useState(job?.specialty || '');
  const [yearsExperience, setYearsExperience] = useState('3-5 Years');
  const [preferredLocation, setPreferredLocation] = useState(job?.location || 'Any US State');
  const [availability, setAvailability] = useState('Immediate / Within 2 Weeks');
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  if (!isOpen || !job) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      setResumeError('Invalid file format. Please attach a PDF, DOC, or DOCX document.');
      setResumeFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setResumeError('File size exceeds 10MB limit. Please attach a smaller file.');
      setResumeFile(null);
      return;
    }

    setResumeError('');
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedPrivacy) {
      setErrorMessage('You must agree to the Privacy Policy to submit your application.');
      return;
    }

    if (!resumeFile) {
      setResumeError('Please upload your resume (PDF, DOC, or DOCX).');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('job_id', job.id);
      formData.append('job_title', job.title);
      formData.append('facility_name', job.facility_name);
      formData.append('full_name', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('cover_letter', coverLetter);
      formData.append('linkedin_url', linkedinUrl);
      formData.append('license_number', licenseNumber);
      formData.append('specialty', specialty || job.specialty);
      formData.append('years_experience', yearsExperience);
      formData.append('preferred_location', preferredLocation);
      formData.append('availability', availability);
      formData.append('resume', resumeFile);

      const result = await ApplicationService.submitApplication(formData);

      if (result.success) {
        setSubmittedSuccess(true);
      } else {
        setErrorMessage(result.message || 'Application submission failed.');
      }
    } catch (err: any) {
      setErrorMessage('An unexpected error occurred. Please try submitting again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetModal = () => {
    setSubmittedSuccess(false);
    setResumeFile(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0E4C92] to-[#1D6ECF] text-white p-6 sm:p-8 flex justify-between items-start shrink-0 relative">
          <div className="space-y-1 max-w-xl">
            <span className="text-[11px] font-bold tracking-widest text-blue-200 uppercase bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Direct Application Dispatch to info@rlklein.com
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight pt-1">
              Apply for {job.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-blue-100 pt-1">
              <span className="flex items-center gap-1 font-medium">
                <Building2 className="w-3.5 h-3.5" />
                {job.facility_name}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {job.city}, {job.state}
              </span>
              <span>•</span>
              <span className="font-bold text-amber-300">
                {job.weekly_pay ? `$${job.weekly_pay.toLocaleString()}/wk` : `$${job.salary_min.toLocaleString()} / ${job.salary_type}`}
              </span>
            </div>
          </div>

          <button
            onClick={handleResetModal}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {submittedSuccess ? (
            /* Success State Confirmation */
            <div className="text-center py-10 px-4 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-3 max-w-lg mx-auto">
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Application Successfully Transmitted!
                </h3>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-sm font-medium leading-relaxed">
                  "Thank you for applying. Our recruitment team will review your application and contact you if your qualifications match our requirements."
                </div>
                <p className="text-xs text-slate-500">
                  A receipt notification containing your complete candidate file has been transmitted directly to <strong className="text-slate-800">info@rlklein.com</strong> for executive evaluation.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-center">
                <button
                  onClick={handleResetModal}
                  className="bg-[#0E4C92] hover:bg-[#0A3A72] text-white font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-md"
                >
                  Return to Jobs Board
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Personal Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E4C92] border-b border-slate-200 pb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>1. Applicant Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins, BSN, RN"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="s.jenkins@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(404) 555-0199"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Healthcare Way, Apt 4B"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Atlanta"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">State *</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                    >
                      {US_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Professional Credentials */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0E4C92] border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>2. Clinical Credentials &amp; Experience</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">License Number *</label>
                    <input
                      type="text"
                      required
                      value={licenseNumber}
                      onChange={(e) => setLicenseNumber(e.target.value)}
                      placeholder="RN-1098452 (or Compact NLC)"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Primary Specialty *</label>
                    <input
                      type="text"
                      required
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      placeholder="e.g. ICU, ER, OR, Physical Therapy"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Years of Experience *</label>
                    <select
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                    >
                      <option value="1-2 Years">1-2 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="6-10 Years">6-10 Years</option>
                      <option value="10+ Years">10+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Earliest Availability *</label>
                    <input
                      type="text"
                      required
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      placeholder="Immediate, 2 weeks, or MM/DD/YYYY"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Placement Location</label>
                    <input
                      type="text"
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      placeholder="e.g. Southeast, Texas, California, Any"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">LinkedIn URL (Optional)</label>
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/yourname"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0E4C92] block">
                  3. Upload Resume (PDF, DOC, DOCX) *
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-[#0E4C92] bg-slate-50 p-6 rounded-2xl text-center transition-colors relative cursor-pointer group">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-blue-100 text-[#0E4C92] rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    {resumeFile ? (
                      <div>
                        <p className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1.5">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <span>{resumeFile.name}</span>
                        </p>
                        <p className="text-xs text-slate-500">{(resumeFile.size / 1024).toFixed(1)} KB - Ready to send</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          Click or drag resume file here to attach
                        </p>
                        <p className="text-xs text-slate-500">Supports PDF, DOC, DOCX formats up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>
                {resumeError && (
                  <p className="text-xs text-rose-600 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{resumeError}</span>
                  </p>
                )}
              </div>

              {/* Cover Letter */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0E4C92] block">
                  4. Cover Letter / Candidate Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Share details regarding your clinical background, shift preferences, or travel goals..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92] focus:bg-white"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700 leading-relaxed">
                  <input
                    type="checkbox"
                    required
                    checked={agreedPrivacy}
                    onChange={(e) => setAgreedPrivacy(e.target.checked)}
                    className="mt-0.5 rounded-sm border-slate-300 text-[#0E4C92] focus:ring-[#0E4C92] w-4 h-4"
                  />
                  <span>
                    I agree to the <a href="/privacy" target="_blank" className="text-[#0E4C92] font-bold hover:underline">Privacy Policy</a> and authorize R.L. Klein &amp; Associates Inc. to contact me regarding healthcare career opportunities.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleResetModal}
                  className="px-5 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-[#0E4C92] to-[#1D6ECF] hover:opacity-95 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Application to info@rlklein.com</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
