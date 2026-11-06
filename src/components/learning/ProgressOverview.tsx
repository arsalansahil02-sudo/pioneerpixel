import React from 'react';
import { Award, BookOpen, CheckCircle2, Clock, Play, Sparkles, AlertCircle } from 'lucide-react';
import type { StudentProgressState } from '../../types';

interface ProgressOverviewProps {
  progress: StudentProgressState;
  totalCompletedLessons: number;
  totalPossibleLessons: number;
  overallPercentage: number;
  onResumeLesson: (courseId: string, chapterId: string, lessonId: string) => void;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  progress,
  totalCompletedLessons,
  totalPossibleLessons,
  overallPercentage,
  onResumeLesson,
}) => {
  const lastLesson = progress.lastStudiedLesson;

  return (
    <div className="rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial-fade opacity-40 pointer-events-none" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#252525]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#333333] text-[10px] font-mono uppercase tracking-wider text-[#EAEAEA] mb-2">
            <Sparkles className="w-3 h-3 text-white" />
            <span>Interactive Learning Progress (Demo State)</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Your Semester 1 Study Velocity
          </h3>
          <p className="text-xs text-[#888888] mt-1">
            Tracks completed lessons, active enrollments, and recently studied chapters via browser storage.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-3xl font-extrabold text-white font-mono">
            {overallPercentage}%
          </div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#888888]">
            Curriculum Completion
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-[#191919] border border-[#2b2b2b]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#888888] uppercase">Enrolled</span>
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-bold text-white">
            {progress.enrolledCourseIds.length} <span className="text-xs text-[#666666] font-normal">courses</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#191919] border border-[#2b2b2b]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#888888] uppercase">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-bold text-white">
            {totalCompletedLessons} <span className="text-xs text-[#666666] font-normal">/ {totalPossibleLessons}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#191919] border border-[#2b2b2b]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#888888] uppercase">Assignments</span>
            <Award className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-bold text-white">
            {progress.submittedAssignmentIds.length} <span className="text-xs text-[#666666] font-normal">submitted</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#191919] border border-[#2b2b2b]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-[#888888] uppercase">Bookmarks</span>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="text-2xl font-bold text-white">
            {progress.bookmarkedCourseIds.length + progress.bookmarkedNoteIds.length}{' '}
            <span className="text-xs text-[#666666] font-normal">saved</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 p-4 rounded-xl bg-[#0e0e0e] border border-[#262626]">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-[#CCCCCC]">Overall Progress Milestone</span>
          <span className="text-white font-bold">{totalCompletedLessons} of {totalPossibleLessons} Lessons Finished</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#202020] overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-500 rounded-full"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* Recently Studied Lesson Callout */}
      {lastLesson && (
        <div className="p-4 rounded-xl bg-[#191919] border border-[#303030] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#080808] border border-[#303030] flex items-center justify-center text-white shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                Recently Studied • {lastLesson.timestamp}
              </div>
              <div className="text-sm font-bold text-white">
                {lastLesson.lessonTitle}
              </div>
              <div className="text-xs text-[#AAAAAA]">
                {lastLesson.courseTitle}
              </div>
            </div>
          </div>

          <button
            onClick={() => onResumeLesson(lastLesson.courseId, lastLesson.chapterId, lastLesson.lessonId)}
            type="button"
            className="px-4 py-2 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Resume Lesson</span>
          </button>
        </div>
      )}

      {/* Demo Limitation Clarification */}
      <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-[#777777]">
        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#888888]" />
        <span>
          Phase 02 progress is stored locally in your browser. Multi-device sync and real cloud storage will be activated with Supabase in future phases.
        </span>
      </div>
    </div>
  );
};
