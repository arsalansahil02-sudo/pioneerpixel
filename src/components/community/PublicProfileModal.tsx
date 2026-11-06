import React from 'react';
import {
  X,
  User,
  Shield,
  Lock,
  Mail,
  Phone,
  Award,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  Target,
  Wrench,
  ExternalLink,
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/SocialIcons';
import type { StudentProfile } from '../../types/community';
import { useCommunity } from '../../hooks/useCommunity';

interface PublicProfileModalProps {
  student: StudentProfile | null;
  onClose: () => void;
}

export const PublicProfileModal: React.FC<PublicProfileModalProps> = ({
  student,
  onClose,
}) => {
  const { currentUser, isAdmin, groups } = useCommunity();

  if (!student) return null;

  const canViewMonthlyProgress = isAdmin || (currentUser && currentUser.id === student.id);

  // Find names of groups this student joined
  const studentGroups = groups.filter((g) => student.joinedGroupIds.includes(g.id));

  const haveSkills = student.skills.filter((s) => s.status === 'Have');
  const learningSkills = student.skills.filter((s) => s.status === 'Learning');
  const wantSkills = student.skills.filter((s) => s.status === 'Want to Learn');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 text-[#080808] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-lg text-[#666666] hover:text-[#080808] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-[#E5E7EB] mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#080808] overflow-hidden shrink-0">
            {student.avatar ? (
              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-[#888888]" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[#080808] tracking-tight">
                {student.name}
              </h2>
              <span
                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  student.role === 'admin'
                    ? 'bg-[#080808] text-white font-bold border-[#080808]'
                    : 'bg-[#F3F4F6] text-[#555555] border-[#D1D5DB]'
                }`}
              >
                {student.role === 'admin' ? 'Community Admin' : 'Student'}
              </span>
            </div>

            <p className="text-xs text-[#555555] leading-relaxed max-w-md">
              {student.bio || 'Active student member of the Skill Community.'}
            </p>

            <div className="text-[10px] font-mono text-[#888888] mt-1">
              Member since {student.joinedDate}
            </div>
          </div>
        </div>

        {/* Social / Portfolio Links */}
        {(student.linkedinUrl || student.githubUrl) && (
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            {student.linkedinUrl && (
              <a
                href={student.linkedinUrl.startsWith('http') ? student.linkedinUrl : `https://${student.linkedinUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] text-xs font-semibold transition-colors border border-[#0A66C2]/20 cursor-pointer"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            )}
            {student.githubUrl && (
              <a
                href={student.githubUrl.startsWith('http') ? student.githubUrl : `https://${student.githubUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#080808] hover:bg-[#222222] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                <GithubIcon className="w-3.5 h-3.5 text-white" />
                <span>GitHub Profile</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            )}
          </div>
        )}

        {/* Short Term Goal Card */}
        {student.shortTermGoal && (
          <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] mb-6">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase text-[#080808] mb-1.5">
              <Target className="w-4 h-4 text-[#080808]" />
              <span>Short Term Goal (Next 1–6 Months)</span>
            </div>
            <p className="text-xs text-[#222222] leading-relaxed whitespace-pre-wrap">
              {student.shortTermGoal}
            </p>
          </div>
        )}

        {/* Tools & Extra-Curricular Grid */}
        {(student.toolsExperience || student.extraCurricularSkills) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {student.toolsExperience && (
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase text-[#080808] mb-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#080808]" />
                  <span>Tools & Software Experience</span>
                </div>
                <p className="text-xs text-[#333333] leading-relaxed whitespace-pre-wrap">
                  {student.toolsExperience}
                </p>
              </div>
            )}
            {student.extraCurricularSkills && (
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase text-[#080808] mb-1.5">
                  <Award className="w-3.5 h-3.5 text-[#080808]" />
                  <span>Extra-Curricular Skills</span>
                </div>
                <p className="text-xs text-[#333333] leading-relaxed whitespace-pre-wrap">
                  {student.extraCurricularSkills}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Private Student Details (Only accessible to Main Admin) */}
        {isAdmin ? (
          <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] mb-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#080808] mb-2">
              <Shield className="w-4 h-4 text-[#080808]" />
              <span>Private Student Details (Admin View Only)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-[#080808]">
                <Mail className="w-3.5 h-3.5 text-[#666666]" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#080808]">
                <Phone className="w-3.5 h-3.5 text-[#666666]" />
                <span>{student.phone || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#080808]">
                <Award className="w-3.5 h-3.5 text-[#666666]" />
                <span>ID: {student.collegeId || 'N/A'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] mb-6 flex items-center justify-between text-xs text-[#666666]">
            <span className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#888888]" />
              <span>Contact & ID details are kept private and accessible only to Main Admin.</span>
            </span>
            <span className="text-[10px] font-mono uppercase text-[#888888]">Privacy Protected</span>
          </div>
        )}

        {/* Monthly Skill Progress Section (Visible only to Admin and the Student themselves) */}
        {canViewMonthlyProgress ? (
          <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#080808]" />
                <h3 className="text-sm font-bold text-[#080808] uppercase tracking-wider">
                  Monthly Skill Progress ({student.monthlyProgress.month})
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-[#080808]">
                {student.monthlyProgress.progressPercentage}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[#E5E7EB] overflow-hidden mb-4">
              <div
                className="h-full bg-[#080808] transition-all duration-500 rounded-full"
                style={{ width: `${student.monthlyProgress.progressPercentage}%` }}
              />
            </div>

            {/* Details */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                  What the student learned:
                </div>
                <p className="text-[#333333] leading-relaxed bg-[#FFFFFF] p-3 rounded-lg border border-[#E5E7EB]">
                  {student.monthlyProgress.whatLearned || 'No monthly summary submitted yet.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Skills Learned This Month:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {student.monthlyProgress.skillsLearned.length > 0 ? (
                      student.monthlyProgress.skillsLearned.map((sk, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#D1D5DB] text-[#080808]"
                        >
                          ✓ {sk}
                        </span>
                      ))
                    ) : (
                      <span className="text-[#888888] font-mono text-[10px]">None recorded</span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Currently Being Learned:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {student.monthlyProgress.currentlyLearning.length > 0 ? (
                      student.monthlyProgress.currentlyLearning.map((sk, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080808] text-white font-semibold"
                        >
                          ● {sk}
                        </span>
                      ))
                    ) : (
                      <span className="text-[#888888] font-mono text-[10px]">None currently</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] mb-6 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] flex items-center justify-center text-[#080808] shrink-0 mt-0.5 shadow-xs">
              <Lock className="w-4 h-4 text-[#080808]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#080808] uppercase tracking-wider">
                  Monthly Skill Progress (Private)
                </h3>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#E5E7EB] text-[#555555] font-bold">
                  Protected
                </span>
              </div>
              <p className="text-xs text-[#555555] mt-1 leading-relaxed">
                This student's monthly progress report is private. As per community policy, progress is visible only to <strong>{student.name}</strong> and the <strong>Community Admin</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Skills Breakdown (Have, Learning, Want to Learn) */}
        <div className="space-y-5 mb-6">
          {/* Skills already have */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#080808] uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#080808]" />
              <span>Skills Already Have ({haveSkills.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {haveSkills.map((sk) => (
                <div
                  key={sk.id}
                  className="p-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-[#080808]">{sk.name}</span>
                  <span className="text-[10px] font-mono text-[#666666] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E5E7EB]">
                    {sk.experience}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills currently learning */}
          {learningSkills.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#080808] uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5 text-[#080808]" />
                <span>Skills Started Learning ({learningSkills.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {learningSkills.map((sk) => (
                  <div
                    key={sk.id}
                    className="p-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-[#080808]">{sk.name}</div>
                      <div className="text-[10px] text-[#666666]">
                        {sk.startedAt ? `Started: ${sk.startedAt}` : 'In progress'}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080808] text-white font-bold">
                      Started
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills want to learn */}
          {wantSkills.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#080808] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#080808]" />
                <span>Skills Want to Learn ({wantSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {wantSkills.map((sk) => (
                  <span
                    key={sk.id}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-[#080808]"
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Joined Groups & Common Task Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB]">
          <div>
            <div className="text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#080808]" />
              <span>Joined Groups ({studentGroups.length} / 2):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {studentGroups.length > 0 ? (
                studentGroups.map((g) => (
                  <span
                    key={g.id}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#F3F4F6] border border-[#D1D5DB] text-[#080808] font-medium"
                  >
                    {g.name}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[#888888]">Has not joined any groups yet.</span>
              )}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#080808]" />
              <span>Common Task Status:</span>
            </div>
            {student.completedCommonTask ? (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-[#080808] text-white font-bold shadow-xs">
                ✓ Task Completed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-[#F3F4F6] border border-[#D1D5DB] text-[#666666]">
                Pending
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
