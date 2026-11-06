import React from 'react';
import {
  Code2,
  Cpu,
  Binary,
  TerminalSquare,
  BookOpen,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  progressPercentage?: number;
  isEnrolled?: boolean;
  isBookmarked?: boolean;
  onExplore: (courseId: string) => void;
  onToggleBookmark?: (courseId: string) => void;
  onToggleEnroll?: (courseId: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Cpu,
  Binary,
  TerminalSquare,
  BookOpen,
  Sparkles,
};

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  progressPercentage = 0,
  isEnrolled = false,
  isBookmarked = false,
  onExplore,
  onToggleBookmark,
  onToggleEnroll,
}) => {
  const IconComponent = ICON_MAP[course.iconName] || BookOpen;

  return (
    <div className="group rounded-2xl bg-[#191919] border border-[#303030] p-6 hover:border-white/80 hover:bg-[#1f1f1f] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] relative">
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#080808] border border-[#303030] flex items-center justify-center text-white group-hover:border-white transition-colors duration-300 shadow-sm">
            <IconComponent className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          </div>

          <div className="flex items-center gap-2">
            {onToggleEnroll && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleEnroll(course.id);
                }}
                className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-colors cursor-pointer ${
                  isEnrolled
                    ? 'bg-white text-black border-white font-semibold'
                    : 'bg-[#080808] text-[#888888] hover:text-white border-[#303030]'
                }`}
                title={isEnrolled ? 'Click to unenroll' : 'Click to enroll'}
              >
                {isEnrolled ? '✓ Enrolled' : '+ Enroll'}
              </button>
            )}
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080808] border border-[#303030] text-[#EAEAEA]">
              {course.code}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#121212] border border-[#2a2a2a] text-[#888888]">
              {course.level}
            </span>
            {onToggleBookmark && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(course.id);
                }}
                aria-label="Bookmark course"
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'bg-white text-[#080808] border-white'
                    : 'bg-[#080808] text-[#888888] hover:text-white border-[#303030]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
              </button>
            )}
          </div>
        </div>

        {/* Subject Name */}
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-white flex items-center justify-between">
          <span>{course.title}</span>
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#888888] leading-relaxed mb-6 font-normal">
          {course.shortDescription}
        </p>

        {/* Progress bar if enrolled */}
        {isEnrolled && (
          <div className="mb-5 p-3 rounded-xl bg-[#0a0a0a] border border-[#252525]">
            <div className="flex items-center justify-between text-xs font-mono text-[#AAAAAA] mb-1.5">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                Demo Progress
              </span>
              <span className="text-white font-bold">{progressPercentage}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#202020] overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Chips & Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#AAAAAA] mb-6 pt-3 border-t border-[#252525]">
          <span className="flex items-center gap-1 bg-[#121212] px-2 py-0.5 rounded border border-[#262626]">
            <Layers className="w-3 h-3 text-[#777777]" />
            {course.chaptersCount} Chapters
          </span>
          <span className="bg-[#121212] px-2 py-0.5 rounded border border-[#262626]">
            {course.lessonsCount} Lessons
          </span>
          <span className="bg-[#121212] px-2 py-0.5 rounded border border-[#262626]">
            ~{course.durationHours} hrs
          </span>
          <span className="text-[10px] text-[#777777] ml-auto">
            Sem {course.semester}
          </span>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-4 border-t border-[#252525] flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777]">
          {course.isDemo ? 'Sample Content' : 'Verified'}
        </span>

        <button
          onClick={() => onExplore(course.id)}
          type="button"
          className="px-4 py-2 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] font-sans"
        >
          <span>Explore Course</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
