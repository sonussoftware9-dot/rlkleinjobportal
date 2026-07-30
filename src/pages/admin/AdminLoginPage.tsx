import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, Stethoscope, KeyRound, AlertCircle, Sparkles } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('admin@rlklein.com');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      // Default admin password check or demo bypass
      if (password === 'rlklein2026!' || password === 'admin' || password.length >= 4) {
        localStorage.setItem('rlklein_admin_token', 'jwt_session_valid_' + Date.now());
        onLoginSuccess();
        navigate('/admin');
      } else {
        setError('Invalid administrative credentials. Use default: rlklein2026!');
      }
      setLoading(false);
    }, 400);
  };

  const handleDemoLogin = () => {
    localStorage.setItem('rlklein_admin_token', 'jwt_session_valid_' + Date.now());
    onLoginSuccess();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#071C35] flex items-center justify-center p-4">
      
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0E4C92] to-[#1D6ECF] text-white p-8 text-center space-y-3 relative">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto border border-white/20">
            <Lock className="w-7 h-7 text-amber-300" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            R.L. Klein &amp; Associates
          </h2>
          <p className="text-xs text-blue-100 font-semibold uppercase tracking-wider">
            Executive Portal Authentication
          </p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl text-xs text-[#0E4C92] font-semibold border border-blue-100">
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#0E4C92]" />
            <span>Restricted Access: Authorized Administrative Personnel Only</span>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0E4C92]"
              />
              <p className="text-[11px] text-slate-400 mt-1">Default password: <strong className="text-slate-700">rlklein2026!</strong></p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0E4C92] hover:bg-[#0A3A72] text-white font-extrabold text-sm py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0E4C92]" />
              <span>One-Click Evaluation Login</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
