import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Play,
  CheckCircle2,
  FileText,
  HelpCircle,
  Award,
  Layers,
  Clock,
  ShieldAlert,
  Bookmark,
} from 'lucide-react';
import type { Course } from '../../types';

interface CourseDetailPageProps {
  course: Course;
  isEnrolled: boolean;
  isBookmarked: boolean;
  isLessonCompleted: (lessonId: string) => boolean;
  onBack: () => void;
  onSelectLesson: (chapterId: string, lessonId: string) => void;
  onToggleEnroll: (courseId: string) => void;
  onToggleBookmark: (courseId: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  course,
  isEnrolled,
  isBookmarked,
  isLessonCompleted,
  onBack,
  onSelectLesson,
  onToggleEnroll,
  onToggleBookmark,
}) => {
  const [activeTab, setActiveTab] = useState<'chapters' | 'notes' | 'assignments' | 'practice'>('chapters');
  // Track open/collapsed state of chapters. Default: first 2 open
  const [expandedChapterIds, setExpandedChapterIds] = useState<string[]>([
    course.chapters[0]?.id || '',
    course.chapters[1]?.id || '',
  ]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapterIds((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  const expandAll = () => {
    setExpandedChapterIds(course.chapters.map((ch) => ch.id));
  };

  const collapseAll = () => {
    setExpandedChapterIds([]);
  };

  const allLessons = course.chapters.flatMap((ch) => ch.lessons);
  const completedCount = allLessons.filter((l) => isLessonCompleted(l.id)).length;
  const progressPct = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

  const firstLesson = allLessons[0];

  return (
    <div className="py-12 bg-[#080808] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            onClick={onBack}
            type="button"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#888888] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Learning Hub</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#141414] border border-[#2b2b2b] text-[#AAAAAA]">
              {course.code}
            </span>
            <button
              onClick={() => onToggleBookmark(course.id)}
              type="button"
              className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-white text-[#080808] border-white font-semibold'
                  : 'bg-[#141414] text-[#888888] hover:text-white border-[#303030]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
          </div>
        </div>

        {/* Course Header Banner Card */}
        <div className="rounded-3xl bg-[#141414] border border-[#303030] p-6 sm:p-10 mb-8 relative overflow-hidden shadow-2xl">
          <div className="max-w-4xl">
            {/* Demonstration Warning Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#333333] text-[10px] font-mono uppercase tracking-wider text-[#D0D0D0] mb-4">
              <ShieldAlert className="w-3.5 h-3.5 text-white" />
              <span>Demonstration Syllabus • Semester 1 Blueprint</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-[#AAAAAA] leading-relaxed mb-6 font-normal">
              {course.fullDescription}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#AAAAAA] mb-8">
              <span className="flex items-center gap-1.5 bg-[#0a0a0a] px-3 py-1.5 rounded-lg border border-[#252525]">
                <Layers className="w-4 h-4 text-white" />
                {course.chaptersCount} Chapters
              </span>
              <span className="flex items-center gap-1.5 bg-[#0a0a0a] px-3 py-1.5 rounded-lg border border-[#252525]">
                <BookOpen className="w-4 h-4 text-white" />
                {course.lessonsCount} Video & Text Lessons
              </span>
              <span className="flex items-center gap-1.5 bg-[#0a0a0a] px-3 py-1.5 rounded-lg border border-[#252525]">
                <Clock className="w-4 h-4 text-white" />
                ~{course.durationHours} Hours Duration
              </span>
              <span className="flex items-center gap-1.5 bg-[#0a0a0a] px-3 py-1.5 rounded-lg border border-[#252525]">
                <Award className="w-4 h-4 text-white" />
                Level: {course.level}
              </span>
            </div>

            {/* Action Buttons & Progress Tracker */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 border-t border-[#252525]">
              {firstLesson && (
                <button
                  onClick={() => onSelectLesson(firstLesson.chapterId, firstLesson.id)}
                  type="button"
                  className="px-6 py-3.5 text-xs font-bold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{completedCount > 0 ? 'Continue Learning' : 'Start Course'}</span>
                </button>
              )}

              <button
                onClick={() => onToggleEnroll(course.id)}
                type="button"
                className={`px-5 py-3.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer border ${
                  isEnrolled
                    ? 'bg-[#191919] text-white border-[#383838] hover:border-[#505050]'
                    : 'bg-[#191919] text-[#EAEAEA] border-[#303030] hover:text-white'
                }`}
              >
                {isEnrolled ? '✓ Enrolled in Course' : '+ Enroll in Course'}
              </button>

              <div className="sm:ml-auto flex items-center gap-3 text-xs font-mono">
                <span className="text-[#888888]">Your Progress:</span>
                <span className="text-white font-bold">{progressPct}%</span>
                <div className="w-24 h-2 rounded-full bg-[#202020] overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-300 rounded-full"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Header */}
        <div className="flex items-center gap-2 border-b border-[#262626] mb-8 overflow-x-auto pb-1">
          {[
            { id: 'chapters', label: `Chapters & Lessons (${course.chapters.length})`, icon: Layers },
            { id: 'notes', label: `Study Notes (${course.notes.length})`, icon: FileText },
            { id: 'assignments', label: `Assignments (${course.assignments.length})`, icon: Award },
            { id: 'practice', label: `Practice Questions (${course.practiceQuestions.length})`, icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                type="button"
                className={`px-4 py-3 text-xs font-semibold rounded-t-lg transition-all flex items-center gap-2 cursor-pointer border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-white text-white bg-[#141414]'
                    : 'border-transparent text-[#888888] hover:text-white hover:bg-[#101010]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXPANDABLE CHAPTERS & LESSONS */}
        {activeTab === 'chapters' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#888888]">
                Course Curriculum Outline ({course.chapters.length} Modules)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={expandAll}
                  type="button"
                  className="text-xs font-mono text-[#888888] hover:text-white px-2 py-1 rounded hover:bg-[#191919]"
                >
                  Expand All
                </button>
                <span className="text-[#333333]">|</span>
                <button
                  onClick={collapseAll}
                  type="button"
                  className="text-xs font-mono text-[#888888] hover:text-white px-2 py-1 rounded hover:bg-[#191919]"
                >
                  Collapse All
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {course.chapters.map((chapter) => {
                const isExpanded = expandedChapterIds.includes(chapter.id);
                const chapterCompletedLessons = chapter.lessons.filter((l) => isLessonCompleted(l.id)).length;
                const chapterPct =
                  chapter.lessons.length > 0
                    ? Math.round((chapterCompletedLessons / chapter.lessons.length) * 100)
                    : 0;

                return (
                  <div
                    key={chapter.id}
                    className="rounded-2xl bg-[#141414] border border-[#2b2b2b] overflow-hidden transition-colors"
                  >
                    {/* Chapter Accordion Header */}
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      type="button"
                      className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#191919] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="w-8 h-8 rounded-lg bg-[#0a0a0a] border border-[#303030] flex items-center justify-center font-mono text-xs font-bold text-white shrink-0">
                          0{chapter.chapterNumber}
                        </span>
                        <div>
                          <h3 className="text-base font-bold text-white tracking-tight">
                            {chapter.title}
                          </h3>
                          <p className="text-xs text-[#888888] line-clamp-1">
                            {chapter.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#888888]">
                          <span>
                            {chapterCompletedLessons}/{chapter.lessons.length} Completed
                          </span>
                          <span className="w-12 h-1.5 rounded-full bg-[#242424] overflow-hidden">
                            <span
                              className="block h-full bg-white rounded-full"
                              style={{ width: `${chapterPct}%` }}
                            />
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-white" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[#888888]" />
                        )}
                      </div>
                    </button>

                    {/* Chapter Lessons List */}
                    {isExpanded && (
                      <div className="border-t border-[#222222] bg-[#0c0c0c] divide-y divide-[#1c1c1c]">
                        {chapter.lessons.map((lesson) => {
                          const completed = isLessonCompleted(lesson.id);

                          return (
                            <div
                              key={lesson.id}
                              onClick={() => onSelectLesson(chapter.id, lesson.id)}
                              className="p-4 px-6 flex items-center justify-between gap-4 hover:bg-[#141414] transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center gap-3.5">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors shrink-0 ${
                                    completed
                                      ? 'bg-white text-[#080808]'
                                      : 'bg-[#181818] border border-[#303030] text-[#777777] group-hover:border-white'
                                  }`}
                                >
                                  {completed ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                  ) : (
                                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                                  )}
                                </div>
                                <div>
                                  <div className="text-xs sm:text-sm font-semibold text-[#EAEAEA] group-hover:text-white transition-colors">
                                    {lesson.title}
                                  </div>
                                  <div className="text-[11px] text-[#777777] line-clamp-1">
                                    {lesson.description}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-[#888888]">
                                <span>{lesson.duration}</span>
                                <span className="uppercase text-[9px] px-1.5 py-0.5 rounded bg-[#181818] border border-[#2b2b2b] text-[#AAAAAA]">
                                  {lesson.type}
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-[#555555] group-hover:text-white transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: STUDY NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#141414] border border-[#2b2b2b] text-xs text-[#888888] flex items-center justify-between">
              <span>Verified university study notes & memory cheatsheets for {course.title}.</span>
              <span className="font-mono">{course.notes.length} Documents Available</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl bg-[#141414] border border-[#303030] p-6 hover:border-white/70 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                        {note.chapterTitle}
                      </span>
                      <span className="text-[10px] font-mono text-[#777777]">
                        {note.pagesCount} Pages • {note.fileSize}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">{note.title}</h3>
                    <p className="text-xs text-[#888888] leading-relaxed mb-4">
                      {note.description}
                    </p>

                    <div className="p-3 rounded-lg bg-[#0a0a0a] border border-[#222222] font-mono text-[11px] text-[#AAAAAA] mb-4">
                      {note.previewContent}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#252525] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#666666]">
                      PDF placeholder ready for upload
                    </span>
                    <button
                      type="button"
                      onClick={() => alert(`Demo Note Preview: "${note.title}". In the future backend phase, authorized university PDFs will be served directly.`)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-colors cursor-pointer"
                    >
                      Preview Notes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            {course.assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="rounded-2xl bg-[#141414] border border-[#303030] p-6 hover:border-[#444444] transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-bold text-white">{assignment.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0a0a0a] border border-[#303030] text-[#EAEAEA]">
                      Level: {assignment.difficulty}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c1c] text-[#888888]">
                      Due: {assignment.dueDate || 'Flexible'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-black font-semibold">
                      {assignment.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed mb-4">
                  {assignment.instructions}
                </p>

                <div className="mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#888888] block mb-2">
                    Evaluation Criteria:
                  </span>
                  <ul className="space-y-1">
                    {assignment.rubric.map((r, idx) => (
                      <li key={idx} className="text-xs text-[#CCCCCC] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#666666]" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#252525] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#888888]">
                    Max Score: {assignment.points} Points
                  </span>
                  <button
                    type="button"
                    onClick={() => alert(`Assignment Demo: "${assignment.title}". Real submission portal will link to student dashboard in Phase 05.`)}
                    className="px-4 py-2 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-colors cursor-pointer"
                  >
                    Open Assignment Brief
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: PRACTICE QUESTIONS */}
        {activeTab === 'practice' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#141414] border border-[#2b2b2b] text-xs text-[#888888] flex items-center justify-between">
              <span>Interactive chapter practice questions for exam revision.</span>
              <span className="font-mono">{course.practiceQuestions.length} Questions</span>
            </div>

            <div className="space-y-4">
              {course.practiceQuestions.map((pq, idx) => (
                <div
                  key={pq.id}
                  className="rounded-2xl bg-[#141414] border border-[#303030] p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#0a0a0a] border border-[#303030] text-white">
                      Topic: {pq.topic}
                    </span>
                    <span className="text-[10px] font-mono text-[#888888]">Question {idx + 1}</span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white mb-4 whitespace-pre-line">
                    {pq.question}
                  </h4>

                  {pq.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                      {pq.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className="p-3 rounded-lg bg-[#191919] border border-[#282828] text-xs text-[#D0D0D0] flex items-center gap-2"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#080808] border border-[#333333] flex items-center justify-center font-mono text-[10px] text-[#888888]">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#222222] text-xs text-[#AAAAAA] leading-relaxed">
                    <strong className="text-white block mb-1">Answer & Explanation:</strong>
                    {pq.correctAnswer} — {pq.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
