import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Play,
  Menu,
  X,
  FileText,
  Code2,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import type { Course, CourseLesson } from '../../types';

interface LessonViewerProps {
  course: Course;
  activeChapterId: string;
  activeLessonId: string;
  isLessonCompleted: (lessonId: string) => boolean;
  onToggleComplete: (lessonId: string) => void;
  onSelectLesson: (chapterId: string, lessonId: string) => void;
  onBackToCourse: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  course,
  activeChapterId,
  activeLessonId,
  isLessonCompleted,
  onToggleComplete,
  onSelectLesson,
  onBackToCourse,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Flatten all lessons across chapters to compute next/prev
  const flatLessonsList: { chapterId: string; lesson: CourseLesson }[] = [];
  course.chapters.forEach((ch) => {
    ch.lessons.forEach((l) => {
      flatLessonsList.push({ chapterId: ch.id, lesson: l });
    });
  });

  const currentIndex = flatLessonsList.findIndex((item) => item.lesson.id === activeLessonId);
  const currentItem = flatLessonsList[currentIndex] || flatLessonsList[0];
  const currentLesson = currentItem?.lesson;
  const currentChapter = course.chapters.find((ch) => ch.id === (currentItem?.chapterId || activeChapterId));

  const prevItem = currentIndex > 0 ? flatLessonsList[currentIndex - 1] : null;
  const nextItem = currentIndex < flatLessonsList.length - 1 ? flatLessonsList[currentIndex + 1] : null;

  const isCompleted = currentLesson ? isLessonCompleted(currentLesson.id) : false;

  const handleCopyCode = () => {
    if (currentLesson?.codeSnippet?.code) {
      navigator.clipboard.writeText(currentLesson.codeSnippet.code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  if (!currentLesson || !currentChapter) {
    return (
      <div className="py-20 text-center text-white">
        <p>Lesson not found.</p>
        <button
          onClick={onBackToCourse}
          className="mt-4 px-4 py-2 bg-white text-black text-xs font-semibold rounded-lg"
        >
          Back to Course
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">
      {/* Top Navigation & Status Bar */}
      <div className="sticky top-0 z-40 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[#262626] px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            type="button"
            className="lg:hidden p-2 rounded-lg bg-[#191919] border border-[#303030] text-white hover:bg-[#222222]"
            aria-label="Toggle Chapter Sidebar"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <button
            onClick={onBackToCourse}
            type="button"
            className="flex items-center gap-1.5 text-xs font-mono text-[#888888] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Course:</span>
            <span className="text-white font-semibold line-clamp-1">{course.title}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleComplete(currentLesson.id)}
            type="button"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-white text-[#080808] shadow-md font-bold'
                : 'bg-[#191919] border border-[#303030] text-[#EAEAEA] hover:border-white'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-[#080808]' : 'text-[#888888]'}`} />
            <span>{isCompleted ? 'Completed' : 'Mark as Completed'}</span>
          </button>
        </div>
      </div>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto relative">
        {/* Left Side: Chapter & Lesson Tree Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-80 bg-[#0e0e0e] border-r border-[#262626] transform transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } pt-16 lg:pt-0 overflow-y-auto`}
        >
          <div className="p-4 border-b border-[#222222] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                Curriculum Navigator
              </span>
              <div className="text-sm font-bold text-white line-clamp-1">{course.title}</div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-[#888888] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-4">
            {course.chapters.map((chapter) => (
              <div key={chapter.id} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#888888] flex items-center justify-between">
                  <span>Ch {chapter.chapterNumber}: {chapter.title}</span>
                  <span>{chapter.lessons.length}</span>
                </div>

                <div className="space-y-0.5">
                  {chapter.lessons.map((lesson) => {
                    const active = lesson.id === activeLessonId;
                    const completed = isLessonCompleted(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => {
                          onSelectLesson(chapter.id, lesson.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                          active
                            ? 'bg-white text-[#080808] font-bold shadow-sm'
                            : 'text-[#AAAAAA] hover:bg-[#181818] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 line-clamp-1">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 ${
                              completed
                                ? active
                                  ? 'text-[#080808]'
                                  : 'text-white'
                                : 'text-[#444444]'
                            }`}
                          />
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span
                          className={`text-[9px] font-mono shrink-0 ${
                            active ? 'text-[#333333]' : 'text-[#666666]'
                          }`}
                        >
                          {lesson.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Side: Main Lesson Workspace */}
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-4xl mx-auto w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#888888] mb-4">
            <span>{course.title}</span>
            <span>/</span>
            <span>Ch {currentChapter.chapterNumber}: {currentChapter.title}</span>
          </div>

          {/* Lesson Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            {currentLesson.title}
          </h1>

          <p className="text-sm text-[#AAAAAA] leading-relaxed mb-8">
            {currentLesson.description}
          </p>

          {/* Video Player Placeholder */}
          <div className="rounded-2xl bg-[#141414] border border-[#303030] overflow-hidden mb-8 shadow-2xl relative">
            <div className="aspect-video bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center relative group">
              {videoPlaying ? (
                <div className="flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full border-2 border-white border-t-transparent animate-spin mb-4" />
                  <p className="text-xs font-mono text-[#CCCCCC]">
                    Buffering authorized lesson video stream...
                  </p>
                  <p className="text-[11px] font-mono text-[#777777] mt-1">
                    [Simulation mode: Authorized lecture streaming server will connect in production]
                  </p>
                  <button
                    onClick={() => setVideoPlaying(false)}
                    className="mt-4 px-3 py-1 bg-[#191919] border border-[#333333] rounded text-xs text-[#AAAAAA] hover:text-white"
                  >
                    Reset Player
                  </button>
                </div>
              ) : (
                <>
                  {/* Play Button */}
                  <button
                    onClick={() => setVideoPlaying(true)}
                    type="button"
                    aria-label="Play video lecture"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#080808] flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    {currentLesson.videoPlaceholder.title}
                  </h3>
                  <div className="text-xs font-mono text-[#888888] mb-3">
                    Duration: {currentLesson.videoPlaceholder.duration} • Instructor:{' '}
                    {currentLesson.videoPlaceholder.instructor}
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161616] border border-[#2d2d2d] text-[10px] font-mono text-[#AAAAAA]">
                    <ShieldAlert className="w-3.5 h-3.5 text-white" />
                    <span>{currentLesson.videoPlaceholder.notice}</span>
                  </div>
                </>
              )}
            </div>

            {/* Video Footer Info Bar */}
            <div className="p-3 bg-[#111111] border-t border-[#252525] flex items-center justify-between text-xs font-mono text-[#888888]">
              <span>Resolution: 1080p HD (Ready)</span>
              <span>Speed: 1.0x</span>
            </div>
          </div>

          {/* Written Learning Material Section */}
          <div className="rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-white">
              <FileText className="w-4 h-4 text-white" />
              <span>Written Lecture Concept & Theory</span>
            </div>

            <div className="text-sm text-[#CCCCCC] leading-relaxed space-y-4 whitespace-pre-line font-normal">
              {currentLesson.content}
            </div>

            {/* Key Takeaways */}
            <div className="mt-6 pt-6 border-t border-[#252525]">
              <div className="text-xs font-mono uppercase tracking-wider text-[#888888] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Essential Exam Takeaways</span>
              </div>
              <ul className="space-y-2">
                {currentLesson.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="text-xs text-[#EAEAEA] flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Code Example Section (if available) */}
          {currentLesson.codeSnippet && (
            <div className="rounded-2xl bg-[#141414] border border-[#303030] overflow-hidden mb-8 shadow-xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#191919] border-b border-[#2b2b2b]">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white font-mono">
                    {currentLesson.codeSnippet.title}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#0a0a0a] border border-[#333333] text-[#888888]">
                    {currentLesson.codeSnippet.language}
                  </span>
                </div>

                <button
                  onClick={handleCopyCode}
                  type="button"
                  className="p-1.5 rounded-md hover:bg-[#252525] text-xs font-mono text-[#AAAAAA] hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {codeCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Preformatted Block */}
              <div className="p-4 bg-[#0a0a0a] font-mono text-xs overflow-x-auto text-[#EAEAEA] leading-relaxed">
                <pre className="whitespace-pre">
                  {currentLesson.codeSnippet.code.split('\n').map((line, idx) => (
                    <div key={idx} className="table-row">
                      <span className="table-cell pr-4 text-right select-none text-[#555555] w-8">
                        {idx + 1}
                      </span>
                      <span className="table-cell">{line}</span>
                    </div>
                  ))}
                </pre>
              </div>

              {/* Code Output Simulator */}
              {currentLesson.codeSnippet.output && (
                <div className="p-3.5 bg-[#121212] border-t border-[#262626]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#888888] mb-1">
                    Terminal Output:
                  </div>
                  <pre className="p-2.5 rounded bg-[#080808] border border-[#202020] text-xs font-mono text-[#EAEAEA] whitespace-pre-wrap">
                    {currentLesson.codeSnippet.output}
                  </pre>
                  <p className="text-[11px] text-[#888888] mt-2">
                    💡 {currentLesson.codeSnippet.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bottom Action Footer with Previous / Next Controls */}
          <div className="pt-6 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {prevItem ? (
                <button
                  onClick={() => onSelectLesson(prevItem.chapterId, prevItem.lesson.id)}
                  type="button"
                  className="px-4 py-2 text-xs font-semibold text-[#888888] hover:text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer hover:bg-[#141414]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous: {prevItem.lesson.title}</span>
                </button>
              ) : (
                <span className="text-xs font-mono text-[#555555]">First lesson in course</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleComplete(currentLesson.id)}
                type="button"
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-white text-[#080808] font-bold'
                    : 'bg-[#191919] border border-[#303030] text-white hover:border-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Marked as Done' : 'Complete Lesson'}</span>
              </button>

              {nextItem && (
                <button
                  onClick={() => onSelectLesson(nextItem.chapterId, nextItem.lesson.id)}
                  type="button"
                  className="px-4 py-2.5 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
