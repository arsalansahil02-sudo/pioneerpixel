import React, { useState } from 'react';
import { X, Shield, Lock, Mail, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/branding';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [semester, setSemester] = useState('Semester 1');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(email.split('@')[0] || 'BCA Student');
      setSubmitted(false);
      onClose();
    }, 600);
  };

  const handleDemoLogin = () => {
    setEmail('aryan.bca@campus.edu');
    setPassword('••••••••');
    setSubmitted(true);
    setTimeout(() => {
      onSuccess('Aryan Sharma (Sem 1)');
      setSubmitted(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="absolute top-5 right-5 p-1.5 text-[#888888] hover:text-white rounded-lg hover:bg-[#202020] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#191919] border border-[#303030] flex items-center justify-center text-white">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {isLoginTab ? 'Student Portal Login' : 'Create Student Account'}
            </h3>
            <p className="text-xs text-[#888888]">
              {isLoginTab ? `Access your ${BRAND_CONFIG.monogram} roadmap and quizzes` : `Join the ${BRAND_CONFIG.websiteName} cohort`}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex rounded-lg bg-[#0e0e0e] border border-[#262626] p-1 mb-6">
          <button
            type="button"
            onClick={() => setIsLoginTab(true)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded transition-colors ${
              isLoginTab ? 'bg-white text-[#080808] shadow-sm' : 'text-[#888888] hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLoginTab(false)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded transition-colors ${
              !isLoginTab ? 'bg-white text-[#080808] shadow-sm' : 'text-[#888888] hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#AAAAAA] mb-1.5">
              College Email or Roll Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rollno@college.edu or 24BCA101"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#303030] text-xs text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          {!isLoginTab && (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#AAAAAA] mb-1.5">
                Current Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#303030] text-xs text-white focus:outline-none focus:border-white"
              >
                <option>Semester 1 (Primary Cohort)</option>
                <option>Semester 2</option>
                <option>Semester 3</option>
                <option>Semester 4</option>
                <option>Semester 5</option>
                <option>Semester 6</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#AAAAAA] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#303030] text-xs text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="w-full py-3 rounded-lg text-xs font-bold text-[#080808] bg-white hover:bg-[#EAEAEA] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {submitted ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {isLoginTab ? 'Sign In to Hub' : 'Complete Registration'}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            )}
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div className="mt-6 pt-5 border-t border-[#252525] text-center">
          <p className="text-[11px] text-[#777777] mb-2.5">
            Testing Phase 01? Use pre-configured demo student credentials:
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 rounded-lg bg-[#191919] hover:bg-[#222222] border border-[#303030] text-xs font-semibold text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-white" />
            <span>One-Click Demo Student Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};
