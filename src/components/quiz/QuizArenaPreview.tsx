import React, { useState } from 'react';
import { QUIZ_TOPICS } from '../../data/quizData';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Clock, Users, HelpCircle } from 'lucide-react';
import type { QuizTopic } from '../../types';

export const QuizArenaPreview: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic>(QUIZ_TOPICS[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = selectedTopic.questions[currentQuestionIndex] || selectedTopic.questions[0];

  const handleSelectAnswer = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswer(optionIdx);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    setIsSubmitted(true);
    if (selectedAnswer === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedTopic.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = (topic: QuizTopic) => {
    setSelectedTopic(topic);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <section id="quizzes" className="py-24 bg-[#080808] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191919] border border-[#303030] text-[11px] font-semibold tracking-wider uppercase text-[#EAEAEA] mb-4">
            <Award className="w-3.5 h-3.5 text-white" />
            <span>Interactive Quiz Arena</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Test Your Knowledge. Master The Concepts.
          </h2>

          <p className="text-base text-[#888888] leading-relaxed">
            Practice conceptual MCQs, memory pointer dry runs, and exam-level algorithmic problems with instant rationale.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {QUIZ_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleResetQuiz(topic)}
              type="button"
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedTopic.id === topic.id
                  ? 'bg-white text-[#080808] shadow-md'
                  : 'bg-[#191919] text-[#888888] hover:text-white border border-[#2b2b2b]'
              }`}
            >
              {topic.category}
            </button>
          ))}
        </div>

        {/* Interactive Quiz Card */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8 shadow-2xl">
          {/* Quiz Card Meta Top */}
          <div className="flex items-center justify-between pb-4 border-b border-[#252525] mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#888888]">
              <span className="text-white font-bold">{selectedTopic.title}</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-[#888888]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#AAAAAA]" />
                {selectedTopic.durationMinutes}m test
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#AAAAAA]" />
                {selectedTopic.participantsCount} attempts
              </span>
            </div>
          </div>

          {!quizCompleted ? (
            <div>
              {/* Question Progress Counter */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#888888]">
                  Question {currentQuestionIndex + 1} of {selectedTopic.questions.length}
                </span>
                <span className="text-xs font-mono text-white">
                  Score: {score}/{selectedTopic.questions.length}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 leading-relaxed">
                {currentQuestion.question}
              </h3>

              {/* Options List */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, idx) => {
                  const isChosen = selectedAnswer === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;

                  let optionStyles = 'bg-[#191919] border-[#2b2b2b] text-[#EAEAEA] hover:border-[#444444]';

                  if (isSubmitted) {
                    if (isCorrect) {
                      optionStyles = 'bg-[#142618] border-[#2e5d36] text-white';
                    } else if (isChosen && !isCorrect) {
                      optionStyles = 'bg-[#2b1616] border-[#5d2b2b] text-white';
                    } else {
                      optionStyles = 'bg-[#101010] border-[#222222] text-[#666666] opacity-60';
                    }
                  } else if (isChosen) {
                    optionStyles = 'bg-white/10 border-white text-white font-semibold shadow-sm';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      disabled={isSubmitted}
                      type="button"
                      className={`w-full text-left p-4 rounded-xl border transition-all text-xs sm:text-sm flex items-center justify-between cursor-pointer ${optionStyles}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#080808] border border-[#303030] flex items-center justify-center font-mono text-xs text-[#AAAAAA] shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {isSubmitted && isChosen && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box on Submit */}
              {isSubmitted && (
                <div className="p-4 rounded-xl bg-[#191919] border border-[#303030] mb-6 text-xs text-[#CCCCCC] leading-relaxed">
                  <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-white" />
                    Conceptual Breakdown:
                  </div>
                  {currentQuestion.explanation}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#252525]">
                {!isSubmitted ? (
                  <button
                    onClick={handleConfirmAnswer}
                    disabled={selectedAnswer === null}
                    type="button"
                    className="px-5 py-2.5 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    type="button"
                    className="px-5 py-2.5 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>
                      {currentQuestionIndex < selectedTopic.questions.length - 1
                        ? 'Next Question'
                        : 'View Results'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-white text-[#080808] flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h3>
              <p className="text-sm text-[#888888] mb-6">
                You scored <strong className="text-white">{score}</strong> out of{' '}
                <strong className="text-white">{selectedTopic.questions.length}</strong> on{' '}
                {selectedTopic.title}.
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => handleResetQuiz(selectedTopic)}
                  type="button"
                  className="px-4 py-2.5 text-xs font-semibold text-[#EAEAEA] bg-[#191919] hover:bg-[#252525] border border-[#303030] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Quiz</span>
                </button>
                <a
                  href="#learning"
                  className="px-4 py-2.5 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Review Learning Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
