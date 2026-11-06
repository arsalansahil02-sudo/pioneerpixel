import React from 'react';
import { ArrowRight, Code2 } from 'lucide-react';
import { CodeDashboardPreview } from './CodeDashboardPreview';
import { BRAND_CONFIG } from '../../config/branding';

interface HeroProps {
  onExplorePlatform: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePlatform,
  onExploreProjects,
}) => {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#080808]"
    >
      {/* Background Subtle Monochrome Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial-fade pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Small Label Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#191919] border border-[#303030] text-[11px] font-semibold tracking-wider uppercase text-[#EAEAEA] mb-6 shadow-sm hover:border-[#505050] transition-colors">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>{BRAND_CONFIG.heroBadge}</span>
              <span className="text-[#888888] font-normal pl-1 border-l border-[#303030]">
                {BRAND_CONFIG.cohortLabel}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              {BRAND_CONFIG.heroHeading}
            </h1>

            {/* Brand Description */}
            <p className="text-base sm:text-lg text-[#888888] leading-relaxed max-w-2xl mb-8 font-normal">
              {BRAND_CONFIG.brandDescription}
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                onClick={onExplorePlatform}
                type="button"
                className="px-6 py-3.5 rounded-lg text-sm font-bold text-[#080808] bg-white hover:bg-[#EAEAEA] border border-white transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.35)] cursor-pointer group"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreProjects}
                type="button"
                className="px-6 py-3.5 rounded-lg text-sm font-semibold text-[#EAEAEA] bg-[#191919] hover:bg-[#222222] border border-[#303030] hover:border-white/60 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Code2 className="w-4 h-4 text-[#888888] group-hover:text-white transition-colors" />
                <span>Explore Projects</span>
              </button>
            </div>

            {/* Micro Trust Proof Bar */}
            <div className="pt-6 border-t border-[#252525] w-full grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">400+</div>
                <div className="text-xs text-[#888888]">Active {BRAND_CONFIG.monogram} Students</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">100%</div>
                <div className="text-xs text-[#888888]">Free & Open Source</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">Sem 01</div>
                <div className="text-xs text-[#888888]">Curriculum Aligned</div>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract & Live Interactive Dashboard Preview */}
          <div className="lg:col-span-5 w-full">
            <CodeDashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
};
