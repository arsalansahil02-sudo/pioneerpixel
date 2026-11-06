import React, { useState } from 'react';
import { LEARNING_SUBJECTS } from '../../data/learningData';
import { BookOpen, ChevronRight, Sparkles, ArrowRight, Play, FileText, CheckCircle2 } from 'lucide-react';
import type { SubjectModule } from '../../types';
import { BRAND_CONFIG } from '../../config/branding';

interface LearningPreviewProps {
  onOpenLearningHub?: () => void;
  onOpenCourse?: (courseId: string) => void;
}

export const LearningPreview: React.FC<LearningPreviewProps> = ({
  onOpenLearningHub,
  onOpenCourse,
}) => {
  const [activeSubject, setActiveSubject] = useState<SubjectModule>(LEARNING_SUBJECTS[0]);

  // Map preview subject IDs to Phase 02 course IDs
  const getMappedCourseId = (previewId: string) => {
    if (previewId === 'discrete-mathematics') return 'mathematics';
    return previewId;
  };

  return (
    <section id="learning" className="py-24 bg-[#080808] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191919] border border-[#303030] text-[11px] font-semibold tracking-wider uppercase text-[#EAEAEA] mb-4">
            <BookOpen className="w-3.5 h-3.5 text-white" />
            <span>Learning Hub Curriculum</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {BRAND_CONFIG.monogram} {BRAND_CONFIG.cohortLabel} Core Curriculum
          </h2>

          <p className="text-base text-[#888888] leading-relaxed">
            Curated syllabus breakdowns, conceptual explanations, and practical lab manuals aligned with university examinations.
          </p>
        </div>

        {/* Phase 02 Learning Hub Interactive Banner */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-[#141414] via-[#1a1a1a] to-[#141414] border border-[#383838] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a0a0a] border border-[#333333] text-[10px] font-mono uppercase tracking-wider text-[#CCCCCC]">
                <Sparkles className="w-3 h-3 text-white" />
                <span>Phase 02 Live • Interactive Learning Experience</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Step into the Full Learning Hub Dashboard
              </h3>
              <p className="text-xs sm:text-sm text-[#AAAAAA] leading-relaxed">
                Explore 6 BCA Semester 1 courses including 8 in-depth C Programming chapters (Variables, Loops, Pointers, Arrays), downloadable PDF study notes, interactive code runners, and practice question assessments.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-[11px] font-mono text-[#888888]">
                <span className="flex items-center gap-1.5"><Play className="w-3.5 h-3.5 text-white" /> Video Placeholders</span>
                <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-white" /> Curated PDF Notes</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> Self-Graded Practice</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {onOpenLearningHub && (
                <button
                  onClick={onOpenLearningHub}
                  type="button"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-bold text-[#080808] bg-white hover:bg-[#EAEAEA] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.35)] cursor-pointer group"
                >
                  <span>Launch Learning Hub</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Subject Browser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Subject List Selection */}
          <div className="lg:col-span-5 space-y-2.5">
            {LEARNING_SUBJECTS.map((subject) => {
              const isSelected = activeSubject.id === subject.id;

              return (
                <button
                  key={subject.id}
                  onClick={() => setActiveSubject(subject)}
                  type="button"
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#191919] border-white text-white shadow-lg'
                      : 'bg-[#121212] border-[#252525] text-[#888888] hover:border-[#383838] hover:text-[#EAEAEA]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected
                          ? 'bg-white text-[#080808]'
                          : 'bg-[#1d1d1d] text-[#888888] border border-[#303030]'
                      }`}
                    >
                      {subject.code.replace('BCA-', '')}
                    </div>
                    <div>
                      <div
                        className={`text-sm font-bold tracking-tight ${
                          isSelected ? 'text-white' : 'text-[#CCCCCC]'
                        }`}
                      >
                        {subject.title}
                      </div>
                      <div className="text-[11px] font-mono text-[#888888]">
                        {subject.code} • {subject.topicsCount} Topics • {subject.labsCount} Lab Practical Sessions
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-white translate-x-1' : 'text-[#555555]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Syllabus & Lab Breakdown */}
          <div className="lg:col-span-7 rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                  Curriculum Module {activeSubject.code}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {activeSubject.title}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#191919] border border-[#333333] text-white">
                Semester {activeSubject.semester}
              </span>
            </div>

            <p className="text-sm text-[#AAAAAA] leading-relaxed mb-6">
              {activeSubject.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0a0a0a] border border-[#252525] mb-6">
              <div className="text-center">
                <div className="text-lg font-bold text-white">{activeSubject.topicsCount}</div>
                <div className="text-[10px] uppercase font-mono text-[#888888]">Theory Units</div>
              </div>
              <div className="text-center border-x border-[#252525]">
                <div className="text-lg font-bold text-white">{activeSubject.labsCount}</div>
                <div className="text-[10px] uppercase font-mono text-[#888888]">Hands-on Labs</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white">100%</div>
                <div className="text-[10px] uppercase font-mono text-[#888888]">Exam Aligned</div>
              </div>
            </div>

            {/* Core Units Syllabus List */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#888888] mb-3">
              Essential Focus Syllabus
            </h4>
            <div className="space-y-2 mb-8">
              {activeSubject.keyTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#191919] border border-[#262626] flex items-center justify-between text-xs text-[#EAEAEA]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#080808] border border-[#303030] flex items-center justify-center font-mono text-[10px] text-[#888888]">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{topic}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#777777]">Verified</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[#262626]">
              {onOpenCourse ? (
                <button
                  type="button"
                  onClick={() => onOpenCourse(getMappedCourseId(activeSubject.id))}
                  className="px-4 py-2.5 rounded-lg text-xs font-bold text-[#080808] bg-white hover:bg-[#EAEAEA] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Course in Learning Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-xs text-[#888888]">
                  Lecture notes & lab manuals ready in Phase 02.
                </span>
              )}
              <a
                href="#projects"
                className="text-xs font-semibold text-white hover:underline flex items-center justify-center gap-1"
              >
                <span>View Matching Lab Projects</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
