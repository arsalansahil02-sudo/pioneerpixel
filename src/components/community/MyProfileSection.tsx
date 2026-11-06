import React, { useState } from 'react';
import {
  User,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
  Trash2,
  Calendar,
  Layers,
  Send,
  Edit2,
  Camera,
  Download,
  Target,
  Wrench,
  Award,
  ExternalLink,
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/SocialIcons';
import { useCommunity } from '../../hooks/useCommunity';
import type { StudentSkill } from '../../types/community';
import { ProfileEditModal } from './ProfileEditModal';
import { compressImage } from '../../utils/imageCompression';

interface MyProfileSectionProps {
  onOpenUploadRequest: () => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onOpenEditProfile?: () => void;
}

export const MyProfileSection: React.FC<MyProfileSectionProps> = ({
  onOpenUploadRequest,
  onOpenAuth,
}) => {
  const {
    currentUser,
    groups,
    updateProfile,
    addSkill,
    updateSkill,
    removeSkill,
    updateMonthlyProgress,
  } = useCommunity();

  // State for editing personal details
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState(currentUser?.name || '');
  const [bioInput, setBioInput] = useState(currentUser?.bio || '');

  // State for adding a new skill
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillExp, setNewSkillExp] = useState('Beginner (3 mos)');
  const [newSkillStatus, setNewSkillStatus] = useState<'Have' | 'Learning' | 'Want to Learn'>('Have');
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);

  // State for updating monthly progress modal
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressLearnedWhat, setProgressLearnedWhat] = useState(currentUser?.monthlyProgress.whatLearned || '');
  const [progressPct, setProgressPct] = useState(currentUser?.monthlyProgress.progressPercentage || 50);
  const [skillsLearnedTagInput, setSkillsLearnedTagInput] = useState(
    currentUser?.monthlyProgress.skillsLearned.join(', ') || ''
  );
  const [currentlyLearningTagInput, setCurrentlyLearningTagInput] = useState(
    currentUser?.monthlyProgress.currentlyLearning.join(', ') || ''
  );

  if (!currentUser) {
    return (
      <div className="py-24 bg-[#FFFFFF] min-h-screen text-[#080808] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] text-center shadow-md">
          <User className="w-12 h-12 text-[#888888] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#080808] mb-2">Sign In to View Your Profile</h2>
          <p className="text-xs text-[#555555] leading-relaxed mb-6">
            You must be signed in with your student account to update your skills, track monthly progress, and join skill groups.
          </p>
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => onOpenAuth('signup')}
              type="button"
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-[#080808] hover:bg-[#222222] transition-colors cursor-pointer shadow-sm"
            >
              Create New Student Profile
            </button>
            <button
              onClick={() => onOpenAuth('signin')}
              type="button"
              className="w-full py-3 rounded-xl text-xs font-bold text-[#080808] bg-[#FFFFFF] border border-[#D1D5DB] hover:bg-[#F3F4F6] transition-colors cursor-pointer shadow-xs"
            >
              Sign In to Existing Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handlers
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, 256, 256, 0.8);
      updateProfile({ avatar: compressed });
    } catch (err) {
      console.warn('Avatar compression failed', err);
    }
  };

  const handleDownloadAvatar = () => {
    if (!currentUser.avatar) return;
    const link = document.createElement('a');
    link.href = currentUser.avatar;
    link.download = `${currentUser.name.replace(/\s+/g, '_')}_profile.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveBio = () => {
    updateProfile({ name: nameInput.trim() || currentUser.name, bio: bioInput.trim() });
    setIsEditingBio(false);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    addSkill({
      name: newSkillName.trim(),
      experience: newSkillExp,
      status: newSkillStatus,
      isStarted: newSkillStatus === 'Learning',
      startedAt: newSkillStatus === 'Learning' ? 'This month' : undefined,
    });

    setNewSkillName('');
    setShowAddSkillForm(false);
  };

  const handleToggleStarted = (skill: StudentSkill) => {
    const nextStarted = !skill.isStarted;
    updateSkill(skill.id, {
      isStarted: nextStarted,
      status: nextStarted ? 'Learning' : 'Want to Learn',
      startedAt: nextStarted ? 'Just now' : undefined,
    });
  };

  const handleSaveProgress = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsLearned = skillsLearnedTagInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const currentlyLearning = currentlyLearningTagInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateMonthlyProgress({
      whatLearned: progressLearnedWhat.trim(),
      progressPercentage: Number(progressPct),
      skillsLearned,
      currentlyLearning,
    });

    setShowProgressModal(false);
  };

  const haveSkills = currentUser.skills.filter((s) => s.status === 'Have');
  const learningSkills = currentUser.skills.filter((s) => s.status === 'Learning');
  const wantSkills = currentUser.skills.filter((s) => s.status === 'Want to Learn');
  const joinedGroups = groups.filter((g) => currentUser.joinedGroupIds.includes(g.id));

  return (
    <div className="py-10 bg-[#FFFFFF] min-h-screen text-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card Header */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-4">
              <div className="relative group/avatar">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-[#888888]" />
                  )}
                </div>

                {/* Direct Upload From Device Trigger */}
                <label
                  className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-[#080808] text-white hover:bg-[#262626] cursor-pointer shadow-md transition-transform group-hover/avatar:scale-110 flex items-center justify-center"
                  title="Upload profile picture directly from your device"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>

                {currentUser.avatar && (
                  <button
                    onClick={handleDownloadAvatar}
                    type="button"
                    className="absolute -top-1 -right-1 p-1 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-[#080808] hover:bg-[#F3F4F6] cursor-pointer shadow-xs"
                    title="Download profile picture to your device"
                  >
                    <Download className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#080808] tracking-tight">
                    {currentUser.name}
                  </h1>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                      currentUser.role === 'admin'
                        ? 'bg-[#080808] text-white font-bold border-[#080808]'
                        : 'bg-[#F3F4F6] text-[#555555] border-[#D1D5DB]'
                    }`}
                  >
                    {currentUser.role === 'admin' ? 'Community Admin' : 'Student'}
                  </span>
                </div>

                <div className="text-xs font-mono text-[#666666] flex flex-wrap items-center gap-2 mb-2">
                  <span>{currentUser.email}</span>
                  <span>•</span>
                  <span>Member since {currentUser.joinedDate}</span>
                </div>

                {/* Social Links (LinkedIn & GitHub) */}
                <div className="flex flex-wrap items-center gap-2">
                  {currentUser.linkedinUrl ? (
                    <a
                      href={currentUser.linkedinUrl.startsWith('http') ? currentUser.linkedinUrl : `https://${currentUser.linkedinUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] text-xs font-semibold transition-colors border border-[#0A66C2]/20 cursor-pointer"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsProfileEditModalOpen(true)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#666666] hover:text-[#080808] text-[11px] font-mono border border-[#D1D5DB] cursor-pointer"
                    >
                      <LinkedinIcon className="w-3 h-3" />
                      <span>+ Add LinkedIn</span>
                    </button>
                  )}

                  {currentUser.githubUrl ? (
                    <a
                      href={currentUser.githubUrl.startsWith('http') ? currentUser.githubUrl : `https://${currentUser.githubUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#080808] hover:bg-[#222222] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-white" />
                      <span>GitHub Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsProfileEditModalOpen(true)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#666666] hover:text-[#080808] text-[11px] font-mono border border-[#D1D5DB] cursor-pointer"
                    >
                      <GithubIcon className="w-3 h-3" />
                      <span>+ Add GitHub</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsProfileEditModalOpen(true)}
                type="button"
                className="px-3.5 py-2 rounded-xl bg-[#080808] hover:bg-[#222222] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              >
                <Edit2 className="w-3.5 h-3.5 text-white" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={onOpenUploadRequest}
                type="button"
                className="px-3.5 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F3F4F6] border border-[#D1D5DB] text-xs font-semibold text-[#080808] flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-[#555555]" />
                <span>Submit Post to Admin</span>
              </button>
            </div>
          </div>

          {/* Bio Edit Form */}
          {isEditingBio ? (
            <div className="mt-6 p-4 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] space-y-3">
              <div>
                <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                  Short Bio / About You
                </label>
                <textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsEditingBio(false)}
                  type="button"
                  className="px-3 py-1.5 text-xs text-[#666666] hover:text-[#080808]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBio}
                  type="button"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#080808] text-white hover:bg-[#222222]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <p className="text-[#555555] max-w-2xl leading-relaxed">
                {currentUser.bio || 'Add a short bio to introduce yourself to other students in the community.'}
              </p>

              <div className="flex items-center gap-4 text-xs font-mono text-[#666666] shrink-0">
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#080808]" />
                  <span>Joined: {joinedGroups.length} / 2 Groups</span>
                </span>
                <span>•</span>
                <span className="text-[#080808] font-bold">
                  {currentUser.completedCommonTask ? '✓ Common Task Done' : 'Task Pending'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Profile Completion Callout */}
        {(!currentUser.linkedinUrl || !currentUser.shortTermGoal) && (
          <div className="rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#080808] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#080808]">Complete Your Student Profile</h4>
                <p className="text-xs text-[#555555] mt-0.5 leading-relaxed">
                  Fill in your LinkedIn profile, Short Term Goals, Software/Tool experience, and Extra-Curricular skills so peer mentors and fellow students can connect with you.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsProfileEditModalOpen(true)}
              type="button"
              className="px-4 py-2 rounded-xl bg-[#080808] text-white hover:bg-[#252525] text-xs font-bold whitespace-nowrap cursor-pointer shadow-xs"
            >
              Fill Profile Details
            </button>
          </div>
        )}

        {/* Short Term Goal Card (No Word Limit) */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#080808] text-white flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#080808]">Short Term Goal (Next 1–6 Months)</h3>
                <span className="text-[10px] font-mono text-[#666666]">Learning and career milestones • No word limit</span>
              </div>
            </div>
            <button
              onClick={() => setIsProfileEditModalOpen(true)}
              type="button"
              className="text-xs font-mono text-[#666666] hover:text-[#080808] underline cursor-pointer"
            >
              Edit Goal
            </button>
          </div>
          <p className="text-xs text-[#222222] leading-relaxed whitespace-pre-wrap bg-[#F9FAFB] p-4 rounded-2xl border border-[#E5E7EB]">
            {currentUser.shortTermGoal || (
              <span className="text-[#888888] italic">
                No short term goal added yet. Click &quot;Edit Goal&quot; to describe your milestones and learning goals.
              </span>
            )}
          </p>
        </div>

        {/* Tools & Software Experience & Extra-Curricular Skills Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Tools & Software Experience */}
          <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#080808] text-white flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#080808]">Tools & Software Experience</h3>
                  <span className="text-[10px] font-mono text-[#666666]">Optional • Development & design stack</span>
                </div>
              </div>
              <button
                onClick={() => setIsProfileEditModalOpen(true)}
                type="button"
                className="text-xs font-mono text-[#666666] hover:text-[#080808] underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <p className="text-xs text-[#222222] leading-relaxed whitespace-pre-wrap bg-[#F9FAFB] p-4 rounded-2xl border border-[#E5E7EB]">
              {currentUser.toolsExperience || (
                <span className="text-[#888888] italic">
                  No tools or software listed yet (e.g. VS Code, Git & GitHub, MS Excel, Figma, Linux Terminal, Postman).
                </span>
              )}
            </p>
          </div>

          {/* Extra-Curricular Skills */}
          <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#080808] text-white flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#080808]">Extra-Curricular Skills</h3>
                  <span className="text-[10px] font-mono text-[#666666]">Non-technical & leadership abilities</span>
                </div>
              </div>
              <button
                onClick={() => setIsProfileEditModalOpen(true)}
                type="button"
                className="text-xs font-mono text-[#666666] hover:text-[#080808] underline cursor-pointer"
              >
                Edit
              </button>
            </div>
            <p className="text-xs text-[#222222] leading-relaxed whitespace-pre-wrap bg-[#F9FAFB] p-4 rounded-2xl border border-[#E5E7EB]">
              {currentUser.extraCurricularSkills || (
                <span className="text-[#888888] italic">
                  No extra-curricular skills listed yet (e.g. Public Speaking, Debating, Event Management, Content Writing, Chess, Music).
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Monthly Skill Progress Section */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB] mb-6">
            <div>
              <div className="text-[10px] uppercase font-mono text-[#666666] font-semibold flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#080808]" />
                <span>Monthly Learning Progress Tracker</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#080808] tracking-tight">
                {currentUser.monthlyProgress.month} Progress ({currentUser.monthlyProgress.progressPercentage}% completed)
              </h2>
            </div>

            <button
              onClick={() => {
                setProgressLearnedWhat(currentUser.monthlyProgress.whatLearned);
                setProgressPct(currentUser.monthlyProgress.progressPercentage);
                setSkillsLearnedTagInput(currentUser.monthlyProgress.skillsLearned.join(', '));
                setCurrentlyLearningTagInput(currentUser.monthlyProgress.currentlyLearning.join(', '));
                setShowProgressModal(true);
              }}
              type="button"
              className="px-4 py-2 rounded-xl bg-[#080808] text-white hover:bg-[#222222] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm self-start sm:self-auto"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Update Monthly Progress</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-[#E5E7EB] overflow-hidden mb-6">
            <div
              className="h-full bg-[#080808] transition-all duration-500 rounded-full"
              style={{ width: `${currentUser.monthlyProgress.progressPercentage}%` }}
            />
          </div>

          {/* Progress Details Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="md:col-span-2 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
              <div className="text-[10px] uppercase font-mono text-[#666666] mb-1.5 font-semibold">
                What you learned this month:
              </div>
              <p className="text-[#222222] leading-relaxed">
                {currentUser.monthlyProgress.whatLearned || 'No description added yet. Click Update Monthly Progress to record your learning!'}
              </p>
            </div>

            <div className="space-y-4 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
              <div>
                <div className="text-[10px] uppercase font-mono text-[#666666] mb-1.5 font-semibold">
                  Skills Learned This Month:
                </div>
                <div className="flex flex-wrap gap-1">
                  {currentUser.monthlyProgress.skillsLearned.map((sk, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#D1D5DB] text-[#080808]"
                    >
                      ✓ {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-mono text-[#666666] mb-1.5 font-semibold">
                  Currently Being Learned:
                </div>
                <div className="flex flex-wrap gap-1">
                  {currentUser.monthlyProgress.currentlyLearning.map((sk, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080808] text-white font-bold"
                    >
                      ● {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex items-center justify-between pb-6 border-b border-[#E5E7EB] mb-6">
            <div>
              <div className="text-[10px] uppercase font-mono text-[#666666] font-semibold">
                Personal Skills & Experience Inventory
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#080808] tracking-tight">
                My Skills ({currentUser.skills.length})
              </h2>
            </div>

            <button
              onClick={() => setShowAddSkillForm(!showAddSkillForm)}
              type="button"
              className="px-3.5 py-2 rounded-xl bg-[#080808] text-white hover:bg-[#222222] text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{showAddSkillForm ? 'Close' : 'Add New Skill'}</span>
            </button>
          </div>

          {/* Add Skill Form */}
          {showAddSkillForm && (
            <form
              onSubmit={handleAddSkill}
              className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#D1D5DB] mb-6 space-y-4 animate-in fade-in duration-150"
            >
              <div className="text-xs font-bold text-[#080808]">Add a New Skill to Your Profile</div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="e.g. C Programming, Python, UI Design"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Experience Level
                  </label>
                  <input
                    type="text"
                    value={newSkillExp}
                    onChange={(e) => setNewSkillExp(e.target.value)}
                    placeholder="e.g. 6 Months, 1 Year, Beginner"
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Status
                  </label>
                  <select
                    value={newSkillStatus}
                    onChange={(e) => setNewSkillStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  >
                    <option value="Have">I already have this skill</option>
                    <option value="Learning">I have started learning</option>
                    <option value="Want to Learn">I want to learn this</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddSkillForm(false)}
                  type="button"
                  className="px-3 py-1.5 text-xs text-[#666666] hover:text-[#080808]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#080808] text-white hover:bg-[#222222]"
                >
                  Add Skill
                </button>
              </div>
            </form>
          )}

          {/* Category 1: Skills I Already Have */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#080808] mb-3">
              <CheckCircle2 className="w-4 h-4 text-[#080808]" />
              <span>Skills I Already Have ({haveSkills.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {haveSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[#080808]">{skill.name}</div>
                    <div className="text-[10px] font-mono text-[#666666]">
                      Experience: {skill.experience}
                    </div>
                  </div>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    type="button"
                    title="Remove skill"
                    className="text-[#888888] hover:text-[#FF4444] p-1 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Category 2: Skills I Have Started Learning */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#080808] mb-3">
              <Clock className="w-4 h-4 text-[#080808]" />
              <span>Skills Started Learning ({learningSkills.length})</span>
              <span className="text-[10px] font-mono text-[#666666] font-normal normal-case ml-2">
                (Students can learn multiple skills at the same time)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {learningSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-[#080808] flex items-center gap-1.5">
                      <span>{skill.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#080808] text-white font-bold">
                        Started
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#666666]">
                      {skill.startedAt || 'Active progress'}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleStarted(skill)}
                      type="button"
                      title="Move back to Want to Learn"
                      className="text-[10px] font-mono text-[#666666] hover:text-[#080808] px-1.5 py-0.5 rounded bg-[#FFFFFF] border border-[#D1D5DB] cursor-pointer"
                    >
                      Pause
                    </button>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      type="button"
                      className="text-[#888888] hover:text-[#FF4444] p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category 3: Skills I Want to Learn (with Mark as Started Option) */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#080808] mb-3">
              <Sparkles className="w-4 h-4 text-[#080808]" />
              <span>Skills I Want to Learn ({wantSkills.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {wantSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-[#080808]">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStarted(skill)}
                      type="button"
                      className="px-2 py-1 rounded bg-[#080808] hover:bg-[#222222] text-[10px] font-mono text-white transition-all cursor-pointer shadow-xs"
                    >
                      Mark as Started
                    </button>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      type="button"
                      className="text-[#888888] hover:text-[#FF4444] p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal: Update Monthly Progress */}
        {showProgressModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 text-[#080808] shadow-2xl">
              <h3 className="text-xl font-bold text-[#080808] mb-1">Update Monthly Skill Progress</h3>
              <p className="text-xs text-[#666666] mb-6">
                Record what you have learned this month and track your progress percentage.
              </p>

              <form onSubmit={handleSaveProgress} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    What did you learn this month?
                  </label>
                  <textarea
                    value={progressLearnedWhat}
                    onChange={(e) => setProgressLearnedWhat(e.target.value)}
                    rows={3}
                    required
                    placeholder="e.g. Mastered C double pointers, built a Python script for organizing files..."
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    <span>Progress Made:</span>
                    <span className="text-[#080808] font-bold">{progressPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progressPct}
                    onChange={(e) => setProgressPct(Number(e.target.value))}
                    className="w-full accent-[#080808] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Skills Learned (comma separated):
                  </label>
                  <input
                    type="text"
                    value={skillsLearnedTagInput}
                    onChange={(e) => setSkillsLearnedTagInput(e.target.value)}
                    placeholder="e.g. C Pointers, Python Automation, CSS Grid"
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Skills Currently Being Learned (comma separated):
                  </label>
                  <input
                    type="text"
                    value={currentlyLearningTagInput}
                    onChange={(e) => setCurrentlyLearningTagInput(e.target.value)}
                    placeholder="e.g. DaVinci Resolve, React Components"
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
                  <button
                    onClick={() => setShowProgressModal(false)}
                    type="button"
                    className="px-4 py-2 text-xs text-[#666666] hover:text-[#080808] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#080808] text-white font-bold hover:bg-[#222222] cursor-pointer shadow-sm"
                  >
                    Save Progress
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Profile Edit Modal */}
        <ProfileEditModal
          isOpen={isProfileEditModalOpen}
          onClose={() => setIsProfileEditModalOpen(false)}
        />
      </div>
    </div>
  );
};
