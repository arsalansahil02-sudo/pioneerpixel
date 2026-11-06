import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  X,
} from 'lucide-react';
import type { Course, Assignment } from '../../types';

interface AssignmentsSectionProps {
  courses: Course[];
}

export const AssignmentsSection: React.FC<AssignmentsSectionProps> = ({ courses }) => {
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('c-programming');
  const [activePracticeQuestionTopic, setActivePracticeQuestionTopic] = useState('All');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [openedAssignment, setOpenedAssignment] = useState<Assignment | null>(null);

  const selectedCourse = courses.find((c) => c.id === selectedCourseFilter) || courses[0];

  const handleSelectAnswer = (questionId: string, answer: string) => {
    if (submittedQuestions[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleCheckAnswer = (questionId: string) => {
    setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleResetQuestion = (questionId: string) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
    setSubmittedQuestions((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  // Filter practice questions by topic (Variables, Operators, If-Else, Loops, Arrays)
  const practiceTopics = ['All', 'Variables', 'Operators', 'If-Else', 'Loops', 'Arrays'];
  const filteredQuestions = selectedCourse.practiceQuestions.filter(
    (pq) => activePracticeQuestionTopic === 'All' || pq.topic.toLowerCase() === activePracticeQuestionTopic.toLowerCase()
  );

  return (
    <div className="space-y-12">
      {/* Course Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#252525]">
        {courses.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setSelectedCourseFilter(c.id);
              setActivePracticeQuestionTopic('All');
            }}
            type="button"
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCourse.id === c.id
                ? 'bg-white text-[#080808] shadow-md'
                : 'bg-[#141414] text-[#888888] hover:text-white border border-[#262626]'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Part 1: Course Laboratory Assignments */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#888888] mb-1">
              <Award className="w-3.5 h-3.5 text-white" />
              <span>Continuous Assessment Lab Practicals</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Assignments for {selectedCourse.title}
            </h2>
          </div>
          <span className="text-xs font-mono text-[#888888]">
            {selectedCourse.assignments.length} Tasks Scheduled
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedCourse.assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="rounded-2xl bg-[#141414] border border-[#2f2f2f] p-6 hover:border-white/60 hover:bg-[#181818] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#0a0a0a] border border-[#2a2a2a] text-white">
                    {assignment.difficulty}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      assignment.status === 'Submitted'
                        ? 'bg-white text-black font-semibold'
                        : assignment.status === 'In Progress'
                        ? 'bg-[#222222] text-[#EAEAEA] border border-[#444444]'
                        : 'bg-[#121212] text-[#777777]'
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {assignment.title}
                </h3>
                <p className="text-xs text-[#888888] leading-relaxed mb-6 line-clamp-3">
                  {assignment.instructions}
                </p>

                <div className="space-y-1.5 mb-6 pt-3 border-t border-[#222222]">
                  {assignment.rubric.slice(0, 2).map((r, idx) => (
                    <div key={idx} className="text-[11px] text-[#AAAAAA] flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-[#666666] shrink-0" />
                      <span className="truncate">{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#222222] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#777777]">
                  Due: {assignment.dueDate || 'End of Term'}
                </span>
                <button
                  onClick={() => setOpenedAssignment(assignment)}
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] transition-colors cursor-pointer"
                >
                  Open Assignment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Interactive Practice Questions Engine */}
      <div className="pt-8 border-t border-[#222222]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#888888] mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-white" />
              <span>Interactive Knowledge Testing</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Topic-Wise Practice Questions
            </h2>
            <p className="text-xs text-[#888888] mt-1">
              Practice questions with instant explanations and hint breakdowns.
            </p>
          </div>

          {/* Topic Pills Filter */}
          {selectedCourse.id === 'c-programming' && (
            <div className="flex flex-wrap items-center gap-1.5">
              {practiceTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setActivePracticeQuestionTopic(topic)}
                  type="button"
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    activePracticeQuestionTopic === topic
                      ? 'bg-white text-[#080808] font-bold'
                      : 'bg-[#141414] border border-[#2b2b2b] text-[#888888] hover:text-white'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Practice Questions List */}
        <div className="space-y-6">
          {filteredQuestions.map((pq, idx) => {
            const chosen = selectedAnswers[pq.id];
            const isSubmitted = submittedQuestions[pq.id];
            const isCorrect = isSubmitted && chosen === pq.correctAnswer;

            return (
              <div
                key={pq.id}
                className="rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#0a0a0a] border border-[#303030] text-white">
                      {pq.topic}
                    </span>
                    <span className="text-[10px] font-mono text-[#888888]">
                      Difficulty: {pq.difficulty}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#666666]">
                    Demonstration Question #{idx + 1}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-6 whitespace-pre-line leading-relaxed">
                  {pq.question}
                </h3>

                {/* Multiple Choice Options */}
                {pq.options && (
                  <div className="space-y-2.5 mb-6">
                    {pq.options.map((opt, optIdx) => {
                      const isOptionSelected = chosen === opt;

                      let btnStyle = 'bg-[#191919] border-[#2b2b2b] text-[#CCCCCC] hover:border-[#444444]';

                      if (isSubmitted) {
                        if (opt === pq.correctAnswer) {
                          btnStyle = 'bg-[#122818] border-[#2e5d36] text-white font-semibold';
                        } else if (isOptionSelected && opt !== pq.correctAnswer) {
                          btnStyle = 'bg-[#2a1414] border-[#5d2b2b] text-white';
                        } else {
                          btnStyle = 'bg-[#101010] border-[#202020] text-[#555555] opacity-50';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'bg-white/10 border-white text-white font-semibold';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(pq.id, opt)}
                          disabled={isSubmitted}
                          type="button"
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-[#080808] border border-[#333333] flex items-center justify-center font-mono text-[10px] text-[#888888]">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isSubmitted && opt === pq.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          )}
                          {isSubmitted && isOptionSelected && opt !== pq.correctAnswer && (
                            <XCircle className="w-4 h-4 text-rose-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Explanation Card upon submission */}
                {isSubmitted && (
                  <div className="p-4 rounded-xl bg-[#191919] border border-[#303030] text-xs text-[#CCCCCC] leading-relaxed mb-4">
                    <strong className="text-white block mb-1">
                      {isCorrect ? '✓ Correct Answer' : '✕ Explanation'}:
                    </strong>
                    {pq.explanation}
                  </div>
                )}

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#222222]">
                  {pq.hint && !isSubmitted && (
                    <span className="text-xs font-mono text-[#777777]">
                      💡 Hint: {pq.hint}
                    </span>
                  )}
                  {isSubmitted && <span className="text-xs font-mono text-[#777777]">Verified Concept</span>}

                  <div className="ml-auto flex items-center gap-2">
                    {isSubmitted ? (
                      <button
                        onClick={() => handleResetQuestion(pq.id)}
                        type="button"
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#AAAAAA] hover:text-white"
                      >
                        Try Again
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCheckAnswer(pq.id)}
                        disabled={!chosen}
                        type="button"
                        className="px-4 py-2 rounded-lg text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] transition-colors cursor-pointer disabled:opacity-40"
                      >
                        Check Answer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assignment Detail Modal */}
      {openedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setOpenedAssignment(null)}
              type="button"
              className="absolute top-5 right-5 p-2 text-[#888888] hover:text-white rounded-lg hover:bg-[#202020]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#333333] text-[10px] font-mono uppercase tracking-wider text-[#D0D0D0] mb-3">
              <Award className="w-3.5 h-3.5 text-white" />
              <span>Assignment Brief • {openedAssignment.difficulty}</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{openedAssignment.title}</h2>
            <div className="text-xs font-mono text-[#888888] mb-4">
              Due Date: {openedAssignment.dueDate || 'Flexible'} • Maximum Points: {openedAssignment.points}
            </div>

            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#262626] text-xs text-[#CCCCCC] leading-relaxed mb-6">
              <strong className="text-white block mb-1">Problem Statement & Instructions:</strong>
              {openedAssignment.instructions}
            </div>

            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#888888] block mb-2">
                Grading Criteria:
              </span>
              <ul className="space-y-1.5">
                {openedAssignment.rubric.map((r, idx) => (
                  <li key={idx} className="text-xs text-[#EAEAEA] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#252525] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#777777]">
                Online code upload activates in Phase 05.
              </span>
              <button
                type="button"
                onClick={() => {
                  alert(
                    `Assignment "${openedAssignment.title}" simulated submission recorded in local demo state!`
                  );
                  setOpenedAssignment(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-colors cursor-pointer"
              >
                Mark as Submitted
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
