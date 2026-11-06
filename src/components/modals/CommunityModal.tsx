import React, { useState } from 'react';
import { X, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { BRAND_CONFIG } from '../../config/branding';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoined: (studentName: string) => void;
}

export const CommunityModal: React.FC<CommunityModalProps> = ({
  isOpen,
  onClose,
  onJoined,
}) => {
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [semester, setSemester] = useState('Semester 1');
  const [interest, setInterest] = useState('C Programming & Algorithms');
  const [githubUser, setGithubUser] = useState('');
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinedSuccess(true);
    setTimeout(() => {
      onJoined(name || 'Fellow BCA Student');
      setJoinedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="absolute top-5 right-5 p-1.5 text-[#888888] hover:text-white rounded-lg hover:bg-[#202020] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!joinedSuccess ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#191919] border border-[#303030] flex items-center justify-center text-white">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Join {BRAND_CONFIG.websiteName} Community
                </h3>
                <p className="text-xs text-[#888888]">
                  Connect with 400+ peers across {BRAND_CONFIG.monogram} colleges. Free & open.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#AAAAAA] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aryan Sharma"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#303030] text-xs text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#AAAAAA] mb-1.5">
                    College / Institute
                  </label>
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. City College"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#303030] text-xs text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#AAAAAA] mb-1.5">
                    Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#303030] text-xs text-white focus:outline-none focus:border-white"
                  >
                    <option>Semester 1 (Phase 01 Active)</option>
                    <option>Semester 2</option>
                    <option>Semester 3</option>
                    <option>Semester 4</option>
                    <option>Semester 5</option>
                    <option>Semester 6</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#AAAAAA] mb-1.5">
                  Primary Technical Interest
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#303030] text-xs text-white focus:outline-none focus:border-white"
                >
                  <option>C Programming & Memory Architecture</option>
                  <option>Python & Data Analysis</option>
                  <option>Full-Stack Web Development</option>
                  <option>Discrete Mathematics & Logic</option>
                  <option>Open Source & Git Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#AAAAAA] mb-1.5">
                  GitHub Profile (Optional)
                </label>
                <div className="relative">
                  <GithubIcon className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={githubUser}
                    onChange={(e) => setGithubUser(e.target.value)}
                    placeholder="github.com/username"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#303030] text-xs text-white placeholder-[#555555] focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg text-xs font-bold text-[#080808] bg-white hover:bg-[#EAEAEA] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Submit & Join WhatsApp / Discord Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-white text-[#080808] flex items-center justify-center mx-auto mb-4 shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Cohort!</h3>
            <p className="text-xs text-[#888888] max-w-sm mx-auto mb-6">
              You are now part of the {BRAND_CONFIG.websiteName} network. Your study materials and community channels are unlocked.
            </p>
            <div className="p-3 rounded-lg bg-[#0a0a0a] border border-[#262626] text-xs font-mono text-[#CCCCCC]">
              Redirecting you to the platform...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
