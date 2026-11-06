import React from 'react';
import {
  Users,
  Layers,
  CheckSquare,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useCommunity } from '../../hooks/useCommunity';
import { BRAND_CONFIG } from '../../config/branding';

interface HomeSectionProps {
  onNavigateTab: (tabId: string) => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigateTab,
  onOpenAuth,
}) => {
  const { students, groups, commonTask, communityPosts, currentUser } = useCommunity();

  const completedCount = students.filter((s) => s.completedCommonTask).length;

  return (
    <div className="py-12 bg-[#FFFFFF] text-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Card */}
        <div className="rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden mb-12 shadow-sm">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D1D5DB] text-[11px] font-mono uppercase tracking-wider text-[#080808] mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#080808]" />
            <span>Official {BRAND_CONFIG.websiteName} Student Community</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#080808] tracking-tight max-w-4xl mx-auto mb-6 leading-tight">
            Learn Together. Build Skills. Innovate Together.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#555555] max-w-2xl mx-auto leading-relaxed mb-10">
            {BRAND_CONFIG.brandDescription} Complete common challenges, solve quizzes, collaborate in skill groups, and climb the AI Leaderboard.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={() => onNavigateTab('dashboard')}
              type="button"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-[#080808] hover:bg-[#252525] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer group"
            >
              <span>Explore Student Directory</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigateTab('groups')}
              type="button"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold text-[#080808] bg-[#FFFFFF] hover:bg-[#F3F4F6] border border-[#D1D5DB] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Layers className="w-4 h-4 text-[#555555]" />
              <span>Join Skill Groups</span>
            </button>
          </div>

          {!currentUser && (
            <div className="mt-6 text-xs text-[#666666]">
              Not registered yet?{' '}
              <button
                onClick={() => onOpenAuth('signup')}
                type="button"
                className="text-[#080808] underline font-semibold hover:text-black cursor-pointer"
              >
                Create your student account
              </button>
            </div>
          )}
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-xs">
            <div className="flex items-center justify-between text-[#666666] mb-2">
              <span className="text-[11px] font-mono uppercase font-semibold">Active Students</span>
              <Users className="w-4 h-4 text-[#080808]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#080808]">{students.length}</div>
            <div className="text-[11px] text-[#666666] mt-1">Registered & learning</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-xs">
            <div className="flex items-center justify-between text-[#666666] mb-2">
              <span className="text-[11px] font-mono uppercase font-semibold">Skill Groups</span>
              <Layers className="w-4 h-4 text-[#080808]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#080808]">{groups.length}</div>
            <div className="text-[11px] text-[#666666] mt-1">Python, C, Video, Design</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-xs">
            <div className="flex items-center justify-between text-[#666666] mb-2">
              <span className="text-[11px] font-mono uppercase font-semibold">Task Completed</span>
              <CheckSquare className="w-4 h-4 text-[#080808]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#080808]">
              {completedCount} / {students.length}
            </div>
            <div className="text-[11px] text-[#666666] mt-1">On Common Task</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-xs">
            <div className="flex items-center justify-between text-[#666666] mb-2">
              <span className="text-[11px] font-mono uppercase font-semibold">Community Posts</span>
              <MessageSquare className="w-4 h-4 text-[#080808]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#080808]">{communityPosts.length}</div>
            <div className="text-[11px] text-[#666666] mt-1">Notes, images & updates</div>
          </div>
        </div>

        {/* 2. OFFICIAL COMMON TASK ASSIGNED BY ADMIN (FEATURED ON MAIN PAGE) */}
        {commonTask.title ? (
          <div className="mb-14 rounded-3xl bg-[#080808] text-white p-7 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6 pb-6 border-b border-[#262626]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F2937] text-white text-[11px] font-mono uppercase tracking-wider mb-3">
                  <CheckSquare className="w-3.5 h-3.5 text-white" />
                  <span>Active Task Assigned by Admin</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {commonTask.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#9CA3AF] mt-2">
                  <span>
                    Assigned By: <strong className="text-white">{commonTask.assignedBy || 'Admin'}</strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Deadline: {commonTask.deadline || 'TBD'}</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigateTab('task')}
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-white text-[#080808] hover:bg-[#F3F4F6] text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>View & Submit Task</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {currentUser?.role === 'admin' && (
                  <button
                    onClick={() => onNavigateTab('admin')}
                    type="button"
                    className="px-4 py-2.5 rounded-xl bg-[#1F2937] text-white hover:bg-[#374151] text-xs font-mono transition-all border border-[#374151] cursor-pointer"
                  >
                    Edit in Admin Panel
                  </button>
                )}
              </div>
            </div>

            {/* Description & Requirements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                  {commonTask.description}
                </p>

                {commonTask.requirements.length > 0 && (
                  <div>
                    <div className="text-[11px] font-mono uppercase font-bold text-[#9CA3AF] mb-2">
                      Task Requirements Checklist:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {commonTask.requirements.map((req, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-[#141414] border border-[#262626] flex items-start gap-2.5 text-xs text-[#E5E7EB]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Current Student Completion Card */}
              <div className="p-5 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#9CA3AF] mb-1">Your Submission Status</div>
                  <div className="flex items-center gap-2 mt-2">
                    {currentUser?.completedCommonTask ? (
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Task Completed!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                        <Clock className="w-4 h-4" />
                        <span>Pending Submission</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-[#9CA3AF] mt-2">
                    {currentUser?.completedCommonTask
                      ? 'Great job! Your submission is recorded for community review.'
                      : 'Submit your solution before the deadline to earn leaderboard points!'}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#262626] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9CA3AF]">Class Progress:</span>
                  <span className="font-bold text-white">
                    {completedCount} of {students.length} completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-14 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] p-8 text-center text-[#080808]">
            <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] border border-[#D1D5DB] flex items-center justify-center text-[#080808] mx-auto mb-3 shadow-xs">
              <CheckSquare className="w-6 h-6 text-[#888888]" />
            </div>
            <h3 className="text-xl font-bold text-[#080808] mb-1">No Active Common Task Assigned</h3>
            <p className="text-xs text-[#666666] max-w-md mx-auto mb-4 leading-relaxed">
              The community Admin has not broadcasted a task yet. When a task is assigned, it will appear here for all students.
            </p>
            {currentUser?.role === 'admin' ? (
              <button
                onClick={() => onNavigateTab('admin')}
                type="button"
                className="px-4 py-2 rounded-xl bg-[#080808] text-white text-xs font-bold hover:bg-[#222222] cursor-pointer"
              >
                Assign Common Task in Admin Panel
              </button>
            ) : (
              <button
                onClick={() => onNavigateTab('task')}
                type="button"
                className="px-4 py-2 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs font-bold text-[#080808] hover:bg-[#F3F4F6] cursor-pointer"
              >
                Open Common Task Page
              </button>
            )}
          </div>
        )}

        {/* 4 Core Pillars Section */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#080808] tracking-tight mb-2">
              How Our Student Community Works
            </h2>
            <p className="text-xs sm:text-sm text-[#666666]">
              Straightforward and purpose-built for college students without unnecessary complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div
              onClick={() => onNavigateTab('dashboard')}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#080808] transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#080808] border border-[#080808] flex items-center justify-center text-white mb-4">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#080808] mb-2 flex items-center justify-between">
                  <span>Student Directory & Profiles</span>
                  <ArrowRight className="w-4 h-4 text-[#888888] group-hover:text-[#080808] transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Browse all joined students, see what skills they already have, how much experience they have, and inspect their monthly learning progress.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E5E7EB] text-[11px] font-mono font-semibold text-[#080808]">
                → View all {students.length} student profiles
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => onNavigateTab('groups')}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#080808] transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#080808] border border-[#080808] flex items-center justify-center text-white mb-4">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#080808] mb-2 flex items-center justify-between">
                  <span>Skill Groups (Max 2 Allowed)</span>
                  <ArrowRight className="w-4 h-4 text-[#888888] group-hover:text-[#080808] transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Join up to two skill groups (Python, C Programming, Video Editing, Graphic Design). Group members learn together and share exclusive notes, images, and video links.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E5E7EB] text-[11px] font-mono font-semibold text-[#080808]">
                → Browse {groups.length} active skill groups
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => onNavigateTab('task')}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#080808] transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#080808] border border-[#080808] flex items-center justify-center text-white mb-4">
                  <CheckSquare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#080808] mb-2 flex items-center justify-between">
                  <span>Common Task Challenge</span>
                  <ArrowRight className="w-4 h-4 text-[#888888] group-hover:text-[#080808] transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Every student receives the exact same common assignment from the Main Admin. Complete requirements, submit proof, and track completion.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E5E7EB] text-[11px] font-mono font-semibold text-[#080808]">
                → View task instructions & submit solution
              </div>
            </div>

            {/* Card 4 */}
            <div
              onClick={() => onNavigateTab('community')}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] hover:border-[#080808] transition-all cursor-pointer group flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#080808] border border-[#080808] flex items-center justify-center text-white mb-4">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#080808] mb-2 flex items-center justify-between">
                  <span>Curated Community Feed</span>
                  <ArrowRight className="w-4 h-4 text-[#888888] group-hover:text-[#080808] transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Admin-published announcements and high-quality student learning material approved via the upload review system.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E5E7EB] text-[11px] font-mono font-semibold text-[#080808]">
                → Explore community feed & announcements
              </div>
            </div>
          </div>
        </div>

        {/* Community Guidelines Card */}
        <div className="p-8 rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#555555] leading-relaxed">
          <div className="font-bold text-[#080808] text-sm mb-2">Platform Rules & Architecture:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div>
              <strong className="text-[#080808] block mb-1">1. Max 2 Groups</strong>
              Each student can only join up to 2 skill groups to maintain quality and deep focus.
            </div>
            <div>
              <strong className="text-[#080808] block mb-1">2. Single Common Task</strong>
              One clear, shared challenge assigned by the admin that all students work on together.
            </div>
            <div>
              <strong className="text-[#080808] block mb-1">3. Privacy Protection</strong>
              Private student email, phone, and monthly progress are restricted to the student and Main Admin.
            </div>
            <div>
              <strong className="text-[#080808] block mb-1">4. Admin Review</strong>
              Students submit upload requests. Content is reviewed by the Main Admin before public feed publication.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
