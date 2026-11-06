import React from 'react';
import { ArrowRight, Code2, Star, ShieldAlert } from 'lucide-react';
import type { ProjectItem } from '../../types';

interface ProjectCardProps {
  project: ProjectItem;
  onViewProject: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewProject }) => {
  return (
    <div className="group rounded-xl bg-[#191919] border border-[#303030] p-6 hover:border-white/80 hover:bg-[#1e1e1e] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)]">
      <div>
        {/* Top Meta Header: Demo Label & Stars */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#080808] border border-[#303030] text-[#EAEAEA]">
            <ShieldAlert className="w-3 h-3 text-[#AAAAAA]" />
            <span>Demo Showcase</span>
          </span>

          <span className="text-xs font-mono text-[#888888] flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-white/80 fill-white/80" />
            {project.starsCount}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-white flex items-center justify-between">
          <span>{project.title}</span>
          <Code2 className="w-4 h-4 text-[#777777] group-hover:text-white transition-colors" />
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#888888] leading-relaxed mb-6">
          {project.shortDescription}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2.5 py-0.8 rounded bg-[#0e0e0e] border border-[#2b2b2b] text-[#D0D0D0] group-hover:border-[#3d3d3d] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#777777]">
          {project.semester}
        </span>

        <button
          onClick={() => onViewProject(project)}
          type="button"
          className="px-3.5 py-1.5 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          <span>View Project</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
