import React, { useState } from 'react';
import { HOW_IT_WORKS_STEPS } from '../../data/howItWorksSteps';
import { CheckCircle2, ArrowRight, GitCommit, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/branding';

export const HowItWorks: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section id="how-it-works" className="py-24 bg-[#080808] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191919] border border-[#303030] text-[11px] font-semibold tracking-wider uppercase text-[#EAEAEA] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>The 4-Step Pathway</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            How {BRAND_CONFIG.websiteName} Works
          </h2>

          <p className="text-base text-[#888888] leading-relaxed">
            A battle-tested progression engineered to take you from writing your first line of code to building production software.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx;

            return (
              <div
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative rounded-xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#191919] border-2 border-white shadow-[0_0_25px_rgba(255,255,255,0.12)] -translate-y-1'
                    : 'bg-[#141414] border border-[#282828] hover:border-[#404040] hover:bg-[#191919]'
                }`}
              >
                {/* Step Top Identifier */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-2xl font-black font-mono tracking-tighter ${
                        isSelected ? 'text-white' : 'text-[#555555]'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-[#080808] border border-[#303030] text-[#888888]">
                      {step.tagline}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <span>{step.title}</span>
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed mb-6 font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Bullet Highlights */}
                <div className="pt-4 border-t border-[#252525] space-y-2">
                  {step.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="text-[11px] text-[#D0D0D0] flex items-start gap-2 leading-snug"
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                          isSelected ? 'text-white' : 'text-[#666666]'
                        }`}
                      />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Focus Callout Box */}
        <div className="mt-12 rounded-xl bg-[#141414] border border-[#303030] p-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#080808] border border-[#303030] flex items-center justify-center text-white shrink-0">
              <GitCommit className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-1">
                Currently Focused On: Step {HOW_IT_WORKS_STEPS[activeStepIndex].stepNumber} —{' '}
                {HOW_IT_WORKS_STEPS[activeStepIndex].title}
              </div>
              <div className="text-xs text-[#888888]">
                {HOW_IT_WORKS_STEPS[activeStepIndex].tagline} • Designed for {BRAND_CONFIG.monogram} first-year students.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveStepIndex((prev) => (prev + 1) % HOW_IT_WORKS_STEPS.length)}
              type="button"
              className="px-4 py-2 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Next Stage ({HOW_IT_WORKS_STEPS[(activeStepIndex + 1) % HOW_IT_WORKS_STEPS.length].title})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
