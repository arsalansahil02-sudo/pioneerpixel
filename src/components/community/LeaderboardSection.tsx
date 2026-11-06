import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Sparkles,
  ArrowRight,
  User,
  CheckCircle2,
  Brain,
  RefreshCw,
  Zap,
  Check,
  X,
} from 'lucide-react';
import { useCommunity } from '../../hooks/useCommunity';
import type { StudentProfile } from '../../types/community';
import { PublicProfileModal } from './PublicProfileModal';
import { BRAND_CONFIG } from '../../config/branding';

interface QuizQuestion {
  question: string;
  category: string;
  options: string[];
  correctIndex: number;
}

const SAMPLE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    category: 'C Programming',
    question: 'Which operator is used to access the memory address of a variable in C?',
    options: ['& (Address-of)', '* (Dereference)', '-> (Arrow)', '# (Hash)'],
    correctIndex: 0,
  },
  {
    category: 'Python',
    question: 'Which of the following data structures is immutable in Python?',
    options: ['List', 'Tuple', 'Dictionary', 'Set'],
    correctIndex: 1,
  },
  {
    category: 'MS Excel',
    question: 'Which Excel function adds up values within a range of cells?',
    options: ['=ADD()', '=SUM()', '=TOTAL()', '=COUNT()'],
    correctIndex: 1,
  },
];

export const LeaderboardSection: React.FC = () => {
  const { students, currentUser, recordQuizCompletion } = useCommunity();
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'monthly'>('all');

  // AI Re-analysis simulation state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysisMessage, setAiAnalysisMessage] = useState<string | null>(null);

  // Quick Skill Quiz state
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([-1, -1, -1]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScoreEarned, setQuizScoreEarned] = useState(0);

  // AI ANALYZER ENGINE:
  // Evaluates Tasks completed, Quiz performance, Verified Skills, and Consistency.
  // Weighting places students who complete tasks and score highest in quizzes at the TOP!
  const scoredStudents = students.map((s) => {
    // 1. Task Score: Completed common task + solution submission bonus
    let taskScore = 0;
    if (s.completedCommonTask) {
      taskScore += 150; // Core task weight
      if (s.commonTaskSubmission?.link || s.commonTaskSubmission?.text) {
        taskScore += 50; // High-quality solution bonus
      }
    }

    // 2. Quiz Score: Points earned from quizzes + consistency
    const quizScore = s.quizScore || 0;
    const quizzesCount = s.quizzesCompleted || 0;
    const quizConsistencyBonus = quizzesCount * 15;

    // 3. Skill Portfolio Score
    const haveCount = s.skills.filter((sk) => sk.status === 'Have').length;
    const learningCount = s.skills.filter((sk) => sk.status === 'Learning').length;
    const skillScore = haveCount * 25 + learningCount * 15 + s.joinedGroupIds.length * 10;

    // 4. Monthly Progress Score
    const progressScore = Math.round((s.monthlyProgress?.progressPercentage || 0) * 0.5);

    // 5. AI Multiplier & Velocity Index
    // Students with both task completed and high quiz score get an AI Velocity Multiplier
    const hasTask = s.completedCommonTask;
    const hasQuiz = quizScore > 0;
    let aiMultiplier = 1.0;
    let aiInsight = 'Steady Learner • Ready for next task & quiz';

    if (hasTask && hasQuiz) {
      aiMultiplier = 1.25; // 25% AI Velocity Boost
      aiInsight = '🤖 AI Verified: High Task Completion & Top Quiz Accuracy (+25% Velocity)';
    } else if (hasTask) {
      aiMultiplier = 1.15; // 15% AI Velocity Boost
      aiInsight = '🤖 AI Verified: Challenge Champion — Common Task Completed (+15% Velocity)';
    } else if (hasQuiz) {
      aiMultiplier = 1.15; // 15% AI Velocity Boost
      aiInsight = '🤖 AI Verified: Quiz Ace — Strong Problem-Solving Accuracy (+15% Velocity)';
    }

    const rawTotal = taskScore + quizScore + quizConsistencyBonus + skillScore + progressScore;
    const totalAIScore = Math.round(rawTotal * aiMultiplier);

    // Tier badge
    let tier = 'Community Pioneer';
    if (totalAIScore >= 320) tier = 'Grandmaster Pioneer';
    else if (totalAIScore >= 200) tier = 'Pioneer Elite';
    else if (totalAIScore >= 100) tier = 'Rising Pioneer';

    return {
      ...s,
      taskScore,
      quizScore,
      quizzesCount,
      skillScore,
      totalAIScore,
      aiMultiplier,
      aiInsight,
      tier,
    };
  });

  // Sort descending by AI total score: students with highest task & quiz scores are on TOP
  const rankedStudents = [...scoredStudents].sort(
    (a, b) => b.totalAIScore - a.totalAIScore
  );

  const top1 = rankedStudents[0];
  const top2 = rankedStudents[1];
  const top3 = rankedStudents[2];

  // Trigger simulated AI Analysis Scan
  const handleTriggerAIAnalysis = () => {
    setIsAnalyzing(true);
    setAiAnalysisMessage('AI scanning task submissions, code repositories & quiz logs...');

    setTimeout(() => {
      setAiAnalysisMessage(
        `✓ AI Analysis Complete! Ranks calibrated based on Task Completion & Quiz Accuracy.`
      );
      setIsAnalyzing(false);
      setTimeout(() => setAiAnalysisMessage(null), 5000);
    }, 1200);
  };

  // Submit Quick Skill Quiz
  const handleSubmitQuiz = () => {
    let earned = 0;
    selectedAnswers.forEach((ans, idx) => {
      if (ans === SAMPLE_QUIZ_QUESTIONS[idx].correctIndex) {
        earned += 25; // 25 pts per question
      }
    });

    setQuizScoreEarned(earned);
    setQuizSubmitted(true);

    if (currentUser && earned > 0) {
      recordQuizCompletion(currentUser.id, earned);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers([-1, -1, -1]);
    setQuizSubmitted(false);
    setQuizScoreEarned(0);
  };

  return (
    <div className="py-10 bg-[#FFFFFF] min-h-screen text-[#080808]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB] mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] border border-[#D1D5DB] text-[10px] font-mono uppercase tracking-wider text-[#080808] mb-3">
              <Brain className="w-3.5 h-3.5 text-[#080808]" />
              <span>AI-Powered Performance Ranking • {BRAND_CONFIG.websiteName}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#080808] tracking-tight">
              AI Student Skill Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] mt-1 max-w-2xl">
              Our AI evaluates each student based on <strong>Common Task completions</strong>, <strong>verified quiz scores</strong>, skill mastery, and learning consistency — automatically ranking the top achievers at #1.
            </p>
          </div>

          {/* AI Trigger & Quiz Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleTriggerAIAnalysis}
              disabled={isAnalyzing}
              type="button"
              className="px-3.5 py-2 rounded-xl bg-[#080808] text-white hover:bg-[#252525] text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              title="Recalculate leaderboard using AI analysis"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'AI Analyzing...' : 'Run AI Analysis'}</span>
            </button>

            <button
              onClick={() => {
                handleResetQuiz();
                setIsQuizOpen(true);
              }}
              type="button"
              className="px-3.5 py-2 rounded-xl bg-[#FFFFFF] text-[#080808] hover:bg-[#F3F4F6] border border-[#D1D5DB] text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-[#080808]" />
              <span>Take Skill Quiz (+75 pts)</span>
            </button>
          </div>
        </div>

        {/* AI Notification Banner */}
        {aiAnalysisMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#15803D] flex items-center gap-2 animate-in fade-in duration-200">
            <Sparkles className="w-4 h-4 shrink-0 text-[#16A34A]" />
            <span className="font-semibold">{aiAnalysisMessage}</span>
          </div>
        )}

        {/* AI Scoring Architecture Card */}
        <div className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#080808] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Trophy className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#080808]">
                AI Ranking Logic & Weighted Metrics
              </h3>
              <p className="text-xs text-[#555555] mt-0.5 leading-relaxed">
                <strong>+150 pts</strong> for completing Common Task, <strong>+25 pts</strong> per correct Quiz question, <strong>+25 pts</strong> per verified skill, plus a <strong>1.25x AI Multiplier</strong> for students with active task & quiz velocity.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#080808] text-white font-bold whitespace-nowrap">
            AI Algorithm: v2.5 Live
          </span>
        </div>

        {/* TOP 3 PODIUM */}
        {rankedStudents.length >= 3 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
            {/* Rank 2 (Silver) */}
            <div
              onClick={() => setSelectedStudent(top2)}
              className="rounded-3xl bg-[#FFFFFF] border-2 border-[#D1D5DB] p-6 text-center hover:border-[#080808] transition-all cursor-pointer shadow-sm order-2 md:order-1 hover:-translate-y-1"
            >
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F3F4F6] text-[#080808] text-xs font-mono font-bold mb-4">
                <Medal className="w-4 h-4 text-slate-400" />
                <span>Rank #2 (Silver)</span>
              </div>

              <div className="w-20 h-20 rounded-2xl bg-[#F3F4F6] border border-[#D1D5DB] mx-auto overflow-hidden mb-3 shadow-inner">
                {top2.avatar ? (
                  <img src={top2.avatar} alt={top2.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-[#888888] mx-auto my-5" />
                )}
              </div>

              <h3 className="text-base font-bold text-[#080808] mb-0.5">{top2.name}</h3>
              <div className="text-[11px] font-mono text-[#666666] mb-3">{top2.tier}</div>

              <div className="p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-mono space-y-1">
                <div className="text-2xl font-extrabold text-[#080808]">
                  {top2.totalAIScore} <span className="text-xs font-normal text-[#666666]">AI pts</span>
                </div>
                <div className="text-[10px] text-[#666666]">
                  Task: {top2.taskScore} pts • Quiz: {top2.quizScore} pts
                </div>
                <div className="text-[9px] text-[#080808] font-bold">
                  {top2.aiMultiplier > 1 ? `⚡ ${top2.aiMultiplier}x Multiplier` : 'Standard'}
                </div>
              </div>
            </div>

            {/* Rank 1 (Gold - Champion Elevated) */}
            <div
              onClick={() => setSelectedStudent(top1)}
              className="rounded-3xl bg-[#080808] text-white border-2 border-[#080808] p-7 text-center transition-all cursor-pointer shadow-xl order-1 md:order-2 hover:-translate-y-1 relative"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-[#080808] text-xs font-mono font-extrabold shadow-md flex items-center gap-1.5 uppercase whitespace-nowrap">
                <Trophy className="w-3.5 h-3.5 text-[#080808]" />
                <span>Rank #1 (AI Champion)</span>
              </div>

              <div className="w-24 h-24 rounded-2xl bg-[#1A1A1A] border-2 border-amber-400 mx-auto overflow-hidden mb-3 shadow-md mt-2">
                {top1.avatar ? (
                  <img src={top1.avatar} alt={top1.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-[#888888] mx-auto my-6" />
                )}
              </div>

              <h3 className="text-lg font-extrabold text-white mb-0.5">{top1.name}</h3>
              <div className="text-[11px] font-mono text-amber-300 mb-3">{top1.tier}</div>

              <div className="p-3.5 rounded-xl bg-[#1A1A1A] border border-[#333333] text-xs font-mono space-y-1">
                <div className="text-3xl font-extrabold text-white">
                  {top1.totalAIScore} <span className="text-xs font-normal text-[#9CA3AF]">AI pts</span>
                </div>
                <div className="text-[11px] text-amber-300">
                  Task: {top1.taskScore} pts • Quiz: {top1.quizScore} pts
                </div>
                <div className="text-[10px] text-emerald-400 font-bold">
                  ⚡ {top1.aiMultiplier}x AI Velocity Boost
                </div>
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div
              onClick={() => setSelectedStudent(top3)}
              className="rounded-3xl bg-[#FFFFFF] border-2 border-[#D1D5DB] p-6 text-center hover:border-[#080808] transition-all cursor-pointer shadow-sm order-3 hover:-translate-y-1"
            >
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F3F4F6] text-[#080808] text-xs font-mono font-bold mb-4">
                <Medal className="w-4 h-4 text-amber-700" />
                <span>Rank #3 (Bronze)</span>
              </div>

              <div className="w-20 h-20 rounded-2xl bg-[#F3F4F6] border border-[#D1D5DB] mx-auto overflow-hidden mb-3 shadow-inner">
                {top3.avatar ? (
                  <img src={top3.avatar} alt={top3.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-[#888888] mx-auto my-5" />
                )}
              </div>

              <h3 className="text-base font-bold text-[#080808] mb-0.5">{top3.name}</h3>
              <div className="text-[11px] font-mono text-[#666666] mb-3">{top3.tier}</div>

              <div className="p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-mono space-y-1">
                <div className="text-2xl font-extrabold text-[#080808]">
                  {top3.totalAIScore} <span className="text-xs font-normal text-[#666666]">AI pts</span>
                </div>
                <div className="text-[10px] text-[#666666]">
                  Task: {top3.taskScore} pts • Quiz: {top3.quizScore} pts
                </div>
                <div className="text-[9px] text-[#080808] font-bold">
                  {top3.aiMultiplier > 1 ? `⚡ ${top3.aiMultiplier}x Multiplier` : 'Standard'}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* FULL LEADERBOARD TABLE */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] overflow-hidden shadow-sm">
          <div className="p-5 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F9FAFB]">
            <div>
              <h3 className="text-sm font-bold text-[#080808]">
                All Ranked Students ({rankedStudents.length})
              </h3>
              <p className="text-[11px] text-[#666666]">
                AI recalibrates ranks in real-time as tasks are completed and quiz scores are submitted.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#666666]">Period:</span>
              <div className="flex p-0.5 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB]">
                <button
                  type="button"
                  onClick={() => setFilterPeriod('all')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono cursor-pointer ${
                    filterPeriod === 'all'
                      ? 'bg-[#080808] text-white font-bold'
                      : 'text-[#666666] hover:text-[#080808]'
                  }`}
                >
                  All-Time
                </button>
                <button
                  type="button"
                  onClick={() => setFilterPeriod('monthly')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono cursor-pointer ${
                    filterPeriod === 'monthly'
                      ? 'bg-[#080808] text-white font-bold'
                      : 'text-[#666666] hover:text-[#080808]'
                  }`}
                >
                  This Month
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFFFFF] text-[#666666] font-mono uppercase text-[10px] border-b border-[#E5E7EB]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Rank</th>
                  <th className="py-3.5 px-4 font-semibold">Student</th>
                  <th className="py-3.5 px-4 font-semibold">AI Assessment</th>
                  <th className="py-3.5 px-4 font-semibold">Common Task</th>
                  <th className="py-3.5 px-4 font-semibold">Quiz Score</th>
                  <th className="py-3.5 px-4 font-semibold">Total AI Score</th>
                  <th className="py-3.5 px-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {rankedStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-xs text-[#888888] font-mono">
                      No students ranked yet. Register and complete the Common Task or take a Quiz!
                    </td>
                  </tr>
                ) : (
                  rankedStudents.map((st, idx) => {
                    const rankNumber = idx + 1;
                    return (
                      <tr
                        key={st.id}
                        className="hover:bg-[#F9FAFB] transition-colors group"
                      >
                        {/* Rank */}
                        <td className="py-3.5 px-4 font-mono font-bold whitespace-nowrap">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                              rankNumber === 1
                                ? 'bg-[#080808] text-amber-400 font-extrabold'
                                : rankNumber === 2
                                ? 'bg-[#E5E7EB] text-[#080808]'
                                : rankNumber === 3
                                ? 'bg-[#F3F4F6] text-[#555555]'
                                : 'text-[#888888]'
                            }`}
                          >
                            #{rankNumber}
                          </span>
                        </td>

                        {/* Student */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center overflow-hidden shrink-0">
                              {st.avatar ? (
                                <img src={st.avatar} alt={st.name} className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-4 h-4 text-[#888888]" />
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-[#080808] whitespace-nowrap">
                                {st.name}
                              </div>
                              <span className="text-[10px] text-[#888888] font-mono">
                                {st.id === 'pioneerpixel-host-admin' ? 'Host Admin' : st.tier}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* AI Insight */}
                        <td className="py-3.5 px-4">
                          <span className="text-[11px] font-mono text-[#333333] line-clamp-1 max-w-xs">
                            {st.aiInsight}
                          </span>
                        </td>

                        {/* Common Task */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {st.completedCommonTask ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#080808] text-white font-semibold">
                              <CheckCircle2 className="w-3 h-3 text-white" />
                              Done (+{st.taskScore})
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-[#888888]">Pending (0)</span>
                          )}
                        </td>

                        {/* Quiz Score */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono">
                          <span className="text-xs font-bold text-[#080808]">
                            {st.quizScore} pts
                          </span>
                          {st.quizzesCount > 0 && (
                            <span className="text-[10px] text-[#666666] ml-1 font-sans">
                              ({st.quizzesCount} taken)
                            </span>
                          )}
                        </td>

                        {/* Total Score */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-sm text-[#080808]">
                          {st.totalAIScore} pts
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setSelectedStudent(st)}
                            className="px-2.5 py-1 rounded-lg bg-[#FFFFFF] hover:bg-[#080808] hover:text-white text-[11px] font-mono text-[#080808] border border-[#D1D5DB] transition-all cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>Profile</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Student Modal */}
        {selectedStudent && (
          <PublicProfileModal
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
          />
        )}

        {/* QUICK SKILL QUIZ MODAL */}
        {isQuizOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 text-[#080808] shadow-2xl">
              <button
                onClick={() => setIsQuizOpen(false)}
                type="button"
                className="absolute top-5 right-5 text-[#666666] hover:text-[#080808] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#080808] text-white flex items-center justify-center">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#080808]">Quick Skill Quiz</h3>
                  <div className="text-[10px] font-mono text-[#666666]">
                    Answer 3 questions • Earn up to +75 pts on AI Leaderboard
                  </div>
                </div>
              </div>

              {!quizSubmitted ? (
                <div className="space-y-4 my-4 max-h-[60vh] overflow-y-auto pr-1">
                  {SAMPLE_QUIZ_QUESTIONS.map((q, qIdx) => (
                    <div key={q.question} className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono uppercase text-[#666666] font-semibold">
                          Q{qIdx + 1} • {q.category}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold">+25 pts</span>
                      </div>
                      <p className="font-bold text-[#080808] mb-3 text-xs leading-relaxed">
                        {q.question}
                      </p>
                      <div className="space-y-1.5">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedAnswers[qIdx] === optIdx;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                const newAnswers = [...selectedAnswers];
                                newAnswers[qIdx] = optIdx;
                                setSelectedAnswers(newAnswers);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? 'bg-[#080808] text-white font-bold'
                                  : 'bg-[#FFFFFF] border border-[#D1D5DB] text-[#333333] hover:border-[#080808]'
                              }`}
                            >
                              <span>{opt}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleSubmitQuiz}
                      disabled={selectedAnswers.includes(-1)}
                      className="w-full py-3 rounded-xl bg-[#080808] text-white font-bold text-xs hover:bg-[#252525] transition-all disabled:opacity-40 cursor-pointer shadow-sm"
                    >
                      Submit Quiz Answers & Calculate AI Score
                    </button>
                    {selectedAnswers.includes(-1) && (
                      <p className="text-[10px] text-center text-[#888888] font-mono mt-2">
                        Please answer all 3 questions to submit
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="my-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-[#080808] text-white flex items-center justify-center mx-auto shadow-md">
                    <Trophy className="w-8 h-8 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-[#080808]">
                      Quiz Completed!
                    </h4>
                    <p className="text-sm font-mono text-[#555555] mt-1">
                      You scored <strong className="text-[#080808]">{quizScoreEarned} / 75 pts</strong>
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-xs text-[#15803D]">
                    {currentUser ? (
                      <span>
                        ✓ Score recorded for <strong>{currentUser.name}</strong>. The AI algorithm has updated your position on the Leaderboard!
                      </span>
                    ) : (
                      <span>
                        Sign in or register your student account to save these points to your profile!
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsQuizOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-[#080808] text-white text-xs font-bold hover:bg-[#222222] cursor-pointer"
                    >
                      View Updated Leaderboard
                    </button>
                    <button
                      type="button"
                      onClick={handleResetQuiz}
                      className="px-4 py-2.5 rounded-xl border border-[#D1D5DB] text-xs font-mono text-[#080808] hover:bg-[#F3F4F6] cursor-pointer"
                    >
                      Retry Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
