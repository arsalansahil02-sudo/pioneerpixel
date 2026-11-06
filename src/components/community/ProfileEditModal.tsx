import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Target,
  Wrench,
  Award,
  Sparkles,
  Save,
  CheckCircle2,
  Code,
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/SocialIcons';
import { useCommunity } from '../../hooks/useCommunity';
import type { StudentSkill } from '../../types/community';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInitialSetup?: boolean;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  isInitialSetup = false,
}) => {
  const { currentUser, updateProfile, addSkill } = useCommunity();

  // Controlled form state
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [linkedinUrl, setLinkedinUrl] = useState(currentUser?.linkedinUrl || '');
  const [githubUrl, setGithubUrl] = useState(currentUser?.githubUrl || '');
  const [shortTermGoal, setShortTermGoal] = useState(currentUser?.shortTermGoal || '');
  const [toolsExperience, setToolsExperience] = useState(currentUser?.toolsExperience || '');
  const [extraCurricularSkills, setExtraCurricularSkills] = useState(currentUser?.extraCurricularSkills || '');
  
  // Current skills input (comma-separated for quick adding)
  const [currentSkillsInput, setCurrentSkillsInput] = useState(
    currentUser?.skills.map((s) => s.name).join(', ') || ''
  );

  const [savedFeedback, setSavedFeedback] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }

    if (!email.trim()) {
      setError('Please provide your email address.');
      return;
    }

    // Process skills input
    const parsedSkillNames = currentSkillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // Identify new skills that aren't in currentUser.skills yet
    const existingNames = new Set(currentUser.skills.map((s) => s.name.toLowerCase()));
    parsedSkillNames.forEach((skName) => {
      if (!existingNames.has(skName.toLowerCase())) {
        const newSk: Omit<StudentSkill, 'id'> = {
          name: skName,
          experience: 'Intermediate',
          status: 'Have',
          isStarted: true,
        };
        addSkill(newSk);
      }
    });

    // Update profile in context
    updateProfile({
      name: name.trim(),
      email: email.trim(),
      linkedinUrl: linkedinUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      shortTermGoal: shortTermGoal.trim() || undefined,
      toolsExperience: toolsExperience.trim() || undefined,
      extraCurricularSkills: extraCurricularSkills.trim() || undefined,
    });

    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] text-[#080808] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB] bg-[#F9FAFB] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#080808] text-white flex items-center justify-center shadow-xs">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-extrabold text-[#080808]">
                {isInitialSetup ? 'Complete Your Student Profile' : 'Edit Student Profile'}
              </div>
              <div className="text-[11px] font-mono text-[#666666]">
                PioneerPixel Student Skill Community • No word limits
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-[#666666] hover:text-[#080808] hover:bg-[#E5E7EB] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable with no word limits */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-5 text-xs">
          {isInitialSetup && (
            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Welcome to PioneerPixel!</strong>
                <p className="text-[11px] text-[#166534] mt-0.5 leading-relaxed">
                  Please fill in your profile details below. These help peer mentors connect with you, explore your skills, and recognize your learning journey.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-xs text-[#DC2626]">
              {error}
            </div>
          )}

          {savedFeedback && (
            <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-xs text-[#15803D] flex items-center gap-2 font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              <span>✓ Profile updated successfully!</span>
            </div>
          )}

          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#080808]" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808] shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#080808]" />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="e.g. rahul.sharma@student.edu"
                className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808] shadow-xs"
              />
            </div>
          </div>

          {/* Row 2: LinkedIn & GitHub (Optional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1 flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>LinkedIn Profile Link</span>
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/your-username"
                className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808] shadow-xs"
              />
              <span className="text-[10px] text-[#888888] font-mono mt-0.5 block">
                Public profile link for networking & career opportunities
              </span>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1 flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5 text-[#080808]" />
                <span>GitHub Profile (Optional)</span>
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/your-username"
                className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808] shadow-xs"
              />
              <span className="text-[10px] text-[#888888] font-mono mt-0.5 block">
                Showcase your code repositories and open-source contributions
              </span>
            </div>
          </div>

          {/* Current Skills */}
          <div>
            <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#080808]" />
              <span>Current Skills (Separate multiple skills with commas)</span>
            </label>
            <input
              type="text"
              value={currentSkillsInput}
              onChange={(e) => setCurrentSkillsInput(e.target.value)}
              placeholder="e.g. C Programming, Python, React, Web Development, MySQL, Data Structures"
              className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808] shadow-xs"
            />
            <span className="text-[10px] text-[#888888] font-mono mt-0.5 block">
              Enter the skills you know or are currently practicing (No limit)
            </span>
          </div>

          {/* Short Term Goal - No Word Limit */}
          <div>
            <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#080808]" />
                <span>Short Term Goal *</span>
              </span>
              <span className="text-[10px] font-mono text-[#888888]">No word limit</span>
            </label>
            <textarea
              value={shortTermGoal}
              onChange={(e) => setShortTermGoal(e.target.value)}
              rows={3}
              placeholder="What are your goals for the next 1–6 months? e.g. Master C programming, solve all Common Tasks, contribute 3 projects to Skill Groups, prepare for a summer tech internship..."
              className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808] shadow-xs leading-relaxed"
            />
          </div>

          {/* Experience with Tool / Software (Optional) - No Word Limit */}
          <div>
            <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-[#080808]" />
                <span>Experience with Tool / Software (Optional)</span>
              </span>
              <span className="text-[10px] font-mono text-[#888888]">No word limit</span>
            </label>
            <textarea
              value={toolsExperience}
              onChange={(e) => setToolsExperience(e.target.value)}
              rows={2}
              placeholder="e.g. VS Code, Git & GitHub, MS Excel, Figma, Postman, Linux Terminal, Premiere Pro, Docker..."
              className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808] shadow-xs leading-relaxed"
            />
          </div>

          {/* Extra-Curricular Skills - No Word Limit */}
          <div>
            <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#080808]" />
                <span>Extra-Curricular Skills</span>
              </span>
              <span className="text-[10px] font-mono text-[#888888]">No word limit</span>
            </label>
            <textarea
              value={extraCurricularSkills}
              onChange={(e) => setExtraCurricularSkills(e.target.value)}
              rows={2}
              placeholder="e.g. Public Speaking, Debating, College Event Organization, Content Writing, Chess, Graphic Design, Video Editing, Music..."
              className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808] shadow-xs leading-relaxed"
            />
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#080808] text-white font-bold text-xs hover:bg-[#252525] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4 text-white" />
              <span>Save & Complete Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
