import React from 'react';
import { X, ExternalLink, CheckCircle2, Terminal, Star, ShieldAlert } from 'lucide-react';
import type { ProjectItem } from '../../types';
import { GithubIcon } from '../common/Icons';
import { BRAND_CONFIG } from '../../config/branding';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 text-[#888888] hover:text-white rounded-lg hover:bg-[#202020] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Demo Content Banner */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f1f1f] border border-[#3a3a3a] text-[10px] font-mono uppercase tracking-wider text-[#EAEAEA] mb-4">
          <ShieldAlert className="w-3.5 h-3.5 text-white" />
          <span>Demonstration Content • Phase 01 Preview</span>
        </div>

        {/* Title & Category */}
        <div className="flex items-center justify-between gap-4 mb-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h2>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1e1e1e] border border-[#333333] text-xs text-white">
            <Star className="w-3.5 h-3.5 fill-white text-white" />
            <span className="font-mono">{project.starsCount}</span>
          </div>
        </div>

        <div className="text-xs font-mono text-[#888888] mb-4">
          Target: {project.semester} • Level: {project.difficulty} • Category: {project.category}
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-md bg-[#080808] border border-[#303030] text-[#EAEAEA]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Long Description */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#888888] mb-2">
            Overview & Motivation
          </h3>
          <p className="text-sm text-[#D5D5D5] leading-relaxed">
            {project.fullDescription}
          </p>
        </div>

        {/* Core Architecture */}
        <div className="mb-6 p-4 rounded-xl bg-[#0a0a0a] border border-[#262626]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-2">
            <Terminal className="w-4 h-4 text-white" />
            <span>Architecture & Design Pattern</span>
          </div>
          <p className="text-xs text-[#AAAAAA] font-mono leading-relaxed">
            {project.architecture}
          </p>
        </div>

        {/* Key Features List */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#888888] mb-3">
            Implemented Functional Features
          </h3>
          <div className="space-y-2">
            {project.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#191919] border border-[#2b2b2b] text-xs text-[#EAEAEA] flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-[#262626] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <span className="text-xs text-[#777777] font-mono">
            Repository template available for {BRAND_CONFIG.monogram} {BRAND_CONFIG.cohortLabel}.
          </span>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-xs font-semibold text-[#888888] hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Dismiss
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-colors flex items-center gap-2 shadow-sm font-sans"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source Code</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
