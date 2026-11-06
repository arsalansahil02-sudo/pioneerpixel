import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  Clock,
  Play,
  Sparkles,
  FileText,
  Award,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { COURSES_DATA, LEARNING_HUB_META, RECENTLY_ADDED_LESSONS } from '../../data/learningHubData';
import { CourseCard } from './CourseCard';
import { ProgressOverview } from './ProgressOverview';
import { StudyNotesSection } from './StudyNotesSection';
import { AssignmentsSection } from './AssignmentsSection';
import type { CourseLevel, SubjectCategory, StudentProgressState } from '../../types';
import { BRAND_CONFIG } from '../../config/branding';

interface LearningHubDashboardProps {
  progressState: StudentProgressState;
  isCourseEnrolled: (courseId: string) => boolean;
  isCourseBookmarked: (courseId: string) => boolean;
  isNoteBookmarked: (noteId: string) => boolean;
  getCourseProgress: (courseId: string) => { completedCount: number; totalCount: number; percentage: number };
  totalCompletedLessons: number;
  totalPossibleLessons: number;
  overallPercentage: number;
  onSelectCourse: (courseId: string) => void;
  onSelectLesson: (courseId: string, chapterId: string, lessonId: string) => void;
  onToggleEnroll: (courseId: string) => void;
  onToggleBookmarkCourse: (courseId: string) => void;
  onToggleBookmarkNote: (noteId: string) => void;
  onBackToHome: () => void;
}

export const LearningHubDashboard: React.FC<LearningHubDashboardProps> = ({
  progressState,
  isCourseEnrolled,
  isCourseBookmarked,
  isNoteBookmarked,
  getCourseProgress,
  totalCompletedLessons,
  totalPossibleLessons,
  overallPercentage,
  onSelectCourse,
  onSelectLesson,
  onToggleEnroll,
  onToggleBookmarkCourse,
  onToggleBookmarkNote,
  onBackToHome,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'notes' | 'assignments' | 'progress'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<'all' | '1'>('1');
  const [selectedCategory, setSelectedCategory] = useState<'All' | SubjectCategory>('All');
  const [selectedLevel, setSelectedLevel] = useState<'All' | CourseLevel>('All');

  // Filter courses based on search & filter controls
  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSemester = selectedSemester === 'all' || course.semester === Number(selectedSemester);
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

    return matchesSearch && matchesSemester && matchesCategory && matchesLevel;
  });

  // Enrolled courses
  const enrolledCourses = COURSES_DATA.filter((c) => isCourseEnrolled(c.id));

  // Find recently studied lesson
  const lastStudied = progressState.lastStudiedLesson;

  return (
    <div className="py-10 bg-[#080808] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hub Header & Welcome Message */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#252525] mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={onBackToHome}
                type="button"
                className="text-xs font-mono text-[#888888] hover:text-white transition-colors cursor-pointer"
              >
                ← Back to Homepage
              </button>
              <span className="text-[#333333]">•</span>
              <span className="text-xs font-mono text-[#AAAAAA]">{BRAND_CONFIG.websiteName}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
              {LEARNING_HUB_META.welcomeMessage}
            </h1>
            <p className="text-base text-[#888888] font-mono tracking-wide">
              {LEARNING_HUB_META.subtitle} • {BRAND_CONFIG.cohortLabel}
            </p>
          </div>

          {/* Global Course Search Bar */}
          <div className="w-full md:w-96 relative">
            <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subjects, chapters, C, Python..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141414] border border-[#303030] text-xs text-white placeholder-[#666666] focus:outline-none focus:border-white transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#777777] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Learning Hub Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#252525] mb-10 overflow-x-auto pb-1">
          {[
            { id: 'overview', label: 'Hub Dashboard', icon: Sparkles },
            { id: 'courses', label: `Available Subjects (${COURSES_DATA.length})`, icon: BookOpen },
            { id: 'notes', label: 'Study Notes & PDFs', icon: FileText },
            { id: 'assignments', label: 'Assignments & Practice', icon: Award },
            { id: 'progress', label: `My Progress (${overallPercentage}%)`, icon: CheckCircle2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                type="button"
                className={`px-4 py-3 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-2 cursor-pointer border-b-2 whitespace-nowrap ${
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

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Continue Learning Callout (Section 2) */}
            {lastStudied && (
              <div className="rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white text-[#080808] flex items-center justify-center shrink-0 shadow-lg">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#888888] mb-1">
                      <Clock className="w-3 h-3 text-white" />
                      <span>Continue Learning • Pick up where you left off</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {lastStudied.lessonTitle}
                    </h2>
                    <p className="text-xs text-[#888888] mt-1">
                      Course: {lastStudied.courseTitle} • Active Session
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() =>
                      onSelectLesson(lastStudied.courseId, lastStudied.chapterId, lastStudied.lessonId)
                    }
                    type="button"
                    className="w-full md:w-auto px-6 py-3 rounded-xl text-xs font-bold text-[#080808] bg-white hover:bg-[#EAEAEA] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer group"
                  >
                    <span>Resume Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}

            {/* My Courses Section (Enrolled Courses with Progress) */}
            {enrolledCourses.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                      Active Subscriptions
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">My Courses</h2>
                  </div>
                  <span className="text-xs font-mono text-[#888888]">
                    {enrolledCourses.length} Enrolled Subjects
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => {
                    const stats = getCourseProgress(course.id);
                    return (
                      <CourseCard
                        key={course.id}
                        course={course}
                        isEnrolled={true}
                        isBookmarked={isCourseBookmarked(course.id)}
                        progressPercentage={stats.percentage}
                        onExplore={onSelectCourse}
                        onToggleBookmark={onToggleBookmarkCourse}
                        onToggleEnroll={onToggleEnroll}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Available Subjects Section (Section 3) */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                    BCA Semester 1 Core Subjects
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Available Subjects
                  </h2>
                </div>

                {/* Quick Subject Categories Filter */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {(['All', 'Programming', 'Core CS', 'Mathematics', 'Humanities'] as const).map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        type="button"
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-white text-[#080808] font-bold'
                            : 'bg-[#141414] border border-[#2b2b2b] text-[#888888] hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const stats = getCourseProgress(course.id);
                  return (
                    <CourseCard
                      key={course.id}
                      course={course}
                      isEnrolled={isCourseEnrolled(course.id)}
                      isBookmarked={isCourseBookmarked(course.id)}
                      progressPercentage={stats.percentage}
                      onExplore={onSelectCourse}
                      onToggleBookmark={onToggleBookmarkCourse}
                      onToggleEnroll={onToggleEnroll}
                    />
                  );
                })}
              </div>
            </div>

            {/* Recently Added Lessons Section (Section 2) */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                    Curriculum Updates
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Recently Added Lessons
                  </h2>
                </div>
                <span className="text-xs font-mono text-[#888888]">Semester 1 Aligned</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RECENTLY_ADDED_LESSONS.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectLesson(item.courseId, item.chapterId, item.lessonId)}
                    className="p-5 rounded-2xl bg-[#141414] border border-[#2b2b2b] hover:border-white/70 hover:bg-[#181818] transition-all flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] border border-[#2f2f2f] flex items-center justify-center text-white shrink-0 group-hover:border-white transition-colors">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                            {item.courseTitle}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#0a0a0a] border border-[#303030] text-[#CCCCCC]">
                            {item.badge}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-white transition-colors">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-[#888888]">
                      <span>{item.duration}</span>
                      <ArrowRight className="w-4 h-4 text-[#555555] group-hover:text-white transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Progress Section (Section 2 & 8) */}
            <div>
              <div className="mb-6">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                  Milestone Statistics
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Learning Progress</h2>
              </div>

              <ProgressOverview
                progress={progressState}
                totalCompletedLessons={totalCompletedLessons}
                totalPossibleLessons={totalPossibleLessons}
                overallPercentage={overallPercentage}
                onResumeLesson={onSelectLesson}
              />
            </div>
          </div>
        )}

        {/* TAB 2: ALL SUBJECTS VIEW */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* Filters Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#141414] border border-[#2b2b2b]">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                {/* Semester Filter */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[#888888]">Semester:</span>
                  {(['all', '1'] as const).map((sem) => (
                    <button
                      key={sem}
                      onClick={() => setSelectedSemester(sem)}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        selectedSemester === sem
                          ? 'bg-white text-black font-semibold'
                          : 'text-[#888888] hover:text-white'
                      }`}
                    >
                      {sem === 'all' ? 'All Semesters' : `Semester ${sem}`}
                    </button>
                  ))}
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-1.5 border-l border-[#252525] pl-4">
                  <span className="text-[#888888] flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5 text-white" /> Category:
                  </span>
                  {(['All', 'Programming', 'Core CS', 'Mathematics', 'Humanities'] as const).map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-white text-black font-semibold'
                            : 'text-[#888888] hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Level Filter */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-[#888888]">Level:</span>
                {(['All', 'Beginner', 'Intermediate'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                      selectedLevel === lvl
                        ? 'bg-white text-black font-semibold'
                        : 'text-[#888888] hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const stats = getCourseProgress(course.id);
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={isCourseEnrolled(course.id)}
                    isBookmarked={isCourseBookmarked(course.id)}
                    progressPercentage={stats.percentage}
                    onExplore={onSelectCourse}
                    onToggleBookmark={onToggleBookmarkCourse}
                    onToggleEnroll={onToggleEnroll}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: STUDY NOTES & PDFS */}
        {activeTab === 'notes' && (
          <StudyNotesSection
            courses={COURSES_DATA}
            isNoteBookmarked={isNoteBookmarked}
            onToggleBookmark={onToggleBookmarkNote}
          />
        )}

        {/* TAB 4: ASSIGNMENTS & PRACTICE QUESTIONS */}
        {activeTab === 'assignments' && (
          <AssignmentsSection courses={COURSES_DATA} />
        )}

        {/* TAB 5: MY PROGRESS OVERVIEW */}
        {activeTab === 'progress' && (
          <ProgressOverview
            progress={progressState}
            totalCompletedLessons={totalCompletedLessons}
            totalPossibleLessons={totalPossibleLessons}
            overallPercentage={overallPercentage}
            onResumeLesson={onSelectLesson}
          />
        )}
      </div>
    </div>
  );
};
