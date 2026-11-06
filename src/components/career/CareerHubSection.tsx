import React, { useState } from 'react';
import { CAREER_PILLARS } from '../../data/careerData';
import { Briefcase, CheckCircle2, ChevronRight, FileText, Rocket } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { BRAND_CONFIG } from '../../config/branding';

const ICON_MAP: Record<string, React.ElementType> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  FileText,
  Rocket,
};

export const CareerHubSection: React.FC = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activePillar = CAREER_PILLARS[activePillarIndex];
  const IconComponent = ICON_MAP[activePillar.iconName] || Briefcase;

  return (
    <section id="career" className="py-24 bg-[#080808] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191919] border border-[#303030] text-[11px] font-semibold tracking-wider uppercase text-[#EAEAEA] mb-4">
            <Briefcase className="w-3.5 h-3.5 text-white" />
            <span>Career Acceleration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Start Building Career Capital in Year One
          </h2>

          <p className="text-base text-[#888888] leading-relaxed">
            The tech industry doesn't wait for graduation. Establish your technical presence with verified projects, ATS-ready resumes, and active industry networking.
          </p>
        </div>

        {/* 4 Pillars Grid Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {CAREER_PILLARS.map((pillar, idx) => {
            const isSelected = activePillarIndex === idx;
            const CardIcon = ICON_MAP[pillar.iconName] || Briefcase;

            return (
              <button
                key={pillar.title}
                onClick={() => setActivePillarIndex(idx)}
                type="button"
                className={`p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#191919] border-white shadow-[0_0_20px_rgba(255,255,255,0.1)] -translate-y-1'
                    : 'bg-[#121212] border-[#252525] hover:border-[#383838] hover:bg-[#161616]'
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#080808] border border-[#303030] flex items-center justify-center text-white mb-4">
                    <CardIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">{pillar.title}</h3>
                  <p className="text-xs text-[#888888] line-clamp-2">{pillar.subtitle}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#222222] flex items-center justify-between text-[11px] font-semibold">
                  <span className={isSelected ? 'text-white' : 'text-[#666666]'}>
                    {pillar.checklist.length} Checkpoints
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#555555]'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detailed Breakdown */}
        <div className="rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#252525]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white text-[#080808] flex items-center justify-center shrink-0">
                <IconComponent className="w-6 h-6 text-[#080808]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                  Career Roadmap Blueprint
                </span>
                <h3 className="text-2xl font-bold text-white">{activePillar.title}</h3>
              </div>
            </div>

            <div className="text-xs font-mono text-[#AAAAAA] px-3 py-1.5 rounded-lg bg-[#0a0a0a] border border-[#2b2b2b]">
              {activePillar.subtitle}
            </div>
          </div>

          <p className="text-sm text-[#CCCCCC] leading-relaxed mb-6 max-w-3xl">
            {activePillar.description}
          </p>

          <h4 className="text-xs font-bold uppercase tracking-wider text-[#888888] mb-3">
            Execution Checklist for {BRAND_CONFIG.monogram} {BRAND_CONFIG.cohortLabel}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {activePillar.checklist.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#191919] border border-[#272727] flex items-start gap-3 text-xs text-[#EAEAEA]"
              >
                <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#252525] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#888888]">
              Career Hub guidance templates will be fully expanded in Phase 05.
            </span>
            <a
              href="#projects"
              className="text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>Build Portfolio Projects First</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
