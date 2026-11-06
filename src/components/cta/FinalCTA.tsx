import React from 'react';
import { ArrowRight, Sparkles, Code2 } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/branding';

interface FinalCTAProps {
  onGetStarted: () => void;
  onExploreLearning: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onGetStarted, onExploreLearning }) => {
  return (
    <section className="py-24 bg-[#080808] border-t border-[#1c1c1c] relative overflow-hidden">
      {/* Background Decorative Ambient */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-radial-fade pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-[#141414] border border-[#303030] p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080808] border border-[#303030] text-[11px] font-semibold tracking-wider uppercase text-[#EAEAEA] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Phase 01 Active • Free For All {BRAND_CONFIG.monogram} Students</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 max-w-3xl mx-auto">
            {BRAND_CONFIG.finalCtaHeading}
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#888888] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            {BRAND_CONFIG.finalCtaDescription}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              type="button"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold text-[#080808] bg-white hover:bg-[#EAEAEA] border border-white transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] cursor-pointer group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreLearning}
              type="button"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold text-[#EAEAEA] bg-[#191919] hover:bg-[#222222] border border-[#303030] hover:border-white/50 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-[#888888]" />
              <span>Explore Learning Hub</span>
            </button>
          </div>

          {/* Bottom Micro Copy */}
          <div className="mt-8 pt-6 border-t border-[#252525] flex flex-wrap items-center justify-center gap-6 text-xs text-[#777777] font-mono">
            <span>✓ No Credit Card Required</span>
            <span>✓ 100% Free Open Platform</span>
            <span>✓ Instant Access to Study Materials</span>
          </div>
        </div>
      </div>
    </section>
  );
};
