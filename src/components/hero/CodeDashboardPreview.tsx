import React, { useState } from 'react';
import { Terminal, Play, CheckCircle2, Copy, Check, Users, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/branding';

const getCodeSnippets = (brandName: string, shortName: string) => ({
  c: {
    filename: `${shortName.toLowerCase().replace(/\s+/g, '_')}.c`,
    lang: 'C (Foundations)',
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char name[32];
    int semester;
    char targetSkill[32];
} Student;

int main(void) {
    Student dev = {"Freshman Dev", 1, "Full-Stack & Systems"};
    printf(">> Initializing %s\\n", "${brandName}");
    printf(">> Student: %s (Sem %d)\\n", dev.name, dev.semester);
    printf(">> Status: Ready to build and collaborate\\n");
    return 0;
}`,
    output: `>> Initializing ${brandName}
>> Student: Freshman Dev (Sem 1)
>> Status: Ready to build and collaborate
>> Process finished with exit code 0.`,
  },
  python: {
    filename: 'algorithm.py',
    lang: 'Python (Algorithms)',
    code: `def build_future(skills: list[str]) -> dict:
    """${brandName} algorithmic growth tracker."""
    print("Connecting peer network...")
    return {
        "semester": 1,
        "mastered": skills,
        "community_ready": True
    }

cohort = build_future(["C", "Python", "Math", "Web"])
print("Cohort Status:", cohort)`,
    output: `Connecting peer network...
Cohort Status: {'semester': 1, 'mastered': ['C', 'Python', 'Math', 'Web'], 'community_ready': True}`,
  },
});

export const CodeDashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'c' | 'python'>('c');
  const [isRunning, setIsRunning] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(true);
  const [copied, setCopied] = useState(false);

  const snippets = getCodeSnippets(BRAND_CONFIG.websiteName, BRAND_CONFIG.shortName);
  const snippet = snippets[activeTab];

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasExecuted(true);
    }, 450);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background Ambient Glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl blur-xl opacity-60 pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative rounded-xl bg-[#141414] border border-[#303030] shadow-2xl overflow-hidden">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#191919] border-b border-[#303030]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#303030] border border-[#444444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#303030] border border-[#444444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#303030] border border-[#444444]" />
            <span className="ml-2 text-[11px] font-mono text-[#888888] flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-[#EAEAEA]" />
              {BRAND_CONFIG.websiteName.toLowerCase().replace(/\s+/g, '-')} ~/workspace
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-[#080808] border border-[#303030] text-[#EAEAEA]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              Live IDE
            </span>
          </div>
        </div>

        {/* Tab Headers & Actions */}
        <div className="flex items-center justify-between px-3 pt-2 bg-[#121212] border-b border-[#252525]">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setActiveTab('c');
                setHasExecuted(true);
              }}
              type="button"
              className={`px-3 py-1.5 text-xs font-mono rounded-t-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'c'
                  ? 'bg-[#191919] text-white border-t border-x border-[#303030]'
                  : 'text-[#888888] hover:text-[#EAEAEA]'
              }`}
            >
              <span className="text-[10px] text-white font-bold">[C]</span>
              {snippets.c.filename}
            </button>
            <button
              onClick={() => {
                setActiveTab('python');
                setHasExecuted(true);
              }}
              type="button"
              className={`px-3 py-1.5 text-xs font-mono rounded-t-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'python'
                  ? 'bg-[#191919] text-white border-t border-x border-[#303030]'
                  : 'text-[#888888] hover:text-[#EAEAEA]'
              }`}
            >
              <span className="text-[10px] text-white font-bold">[Py]</span>
              {snippets.python.filename}
            </button>
          </div>

          <div className="flex items-center gap-1.5 pb-2">
            <button
              onClick={handleCopy}
              type="button"
              title="Copy snippet"
              className="p-1 text-[#888888] hover:text-white rounded hover:bg-[#202020] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              type="button"
              className="px-2.5 py-1 text-[11px] font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded flex items-center gap-1 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              <Play className="w-3 h-3 fill-current" />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>
        </div>

        {/* Code Area */}
        <div className="p-4 bg-[#0a0a0a] font-mono text-xs overflow-x-auto select-text leading-relaxed text-[#EAEAEA]">
          <pre className="whitespace-pre">
            {snippet.code.split('\n').map((line, idx) => (
              <div key={idx} className="table-row group">
                <span className="table-cell pr-4 text-right select-none text-[#555555] group-hover:text-[#888888] w-8">
                  {idx + 1}
                </span>
                <span className="table-cell text-[#EAEAEA]">{line}</span>
              </div>
            ))}
          </pre>
        </div>

        {/* Terminal Execution Output */}
        <div className="border-t border-[#303030] bg-[#121212] p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#888888] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Terminal Output
            </span>
            <span className="text-[10px] font-mono text-[#888888]">gcc 14.2 / x86_64</span>
          </div>
          <div className="bg-[#080808] border border-[#252525] rounded p-2.5 font-mono text-[11px] text-[#EAEAEA]">
            {isRunning ? (
              <div className="flex items-center gap-2 text-[#888888] animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white animate-spin" />
                Compiling and linking executable...
              </div>
            ) : hasExecuted ? (
              <pre className="whitespace-pre-wrap text-white/90 leading-tight">
                {snippet.output}
              </pre>
            ) : (
              <span className="text-[#666666]">Click "Run Code" to compile snippet.</span>
            )}
          </div>
        </div>

        {/* Live Cohort Status Strip */}
        <div className="px-3.5 py-2 bg-[#171717] border-t border-[#303030] flex items-center justify-between text-[11px] text-[#888888]">
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-white" />
            <span className="text-[#EAEAEA]">
              <strong className="text-white font-semibold">142</strong> {BRAND_CONFIG.monogram} Semester 1 peers active
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[#888888]">
            <CheckCircle2 className="w-3 h-3 text-white" />
            {BRAND_CONFIG.cohortLabel}
          </div>
        </div>
      </div>

      {/* Floating Accent Card 1: Verified Semester Focus */}
      <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#191919] border border-[#303030] rounded-lg p-3 shadow-xl items-center gap-3 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-8 h-8 rounded-md bg-[#080808] border border-[#303030] flex items-center justify-center text-white">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-white tracking-wide">{BRAND_CONFIG.cohortLabel} Focus</div>
          <div className="text-[10px] text-[#888888]">C, Python, Math & Fundamentals</div>
        </div>
      </div>

      {/* Floating Accent Card 2: 100% Peer Driven */}
      <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#191919] border border-[#303030] rounded-lg px-3 py-2 shadow-xl items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-[10px] font-semibold text-white tracking-wide uppercase">
          100% Student Driven
        </span>
      </div>
    </div>
  );
};
