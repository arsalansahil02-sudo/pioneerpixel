import React, { useState } from 'react';
import { SAMPLE_PROJECTS } from '../../data/projectsData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import type { ProjectItem } from '../../types';
import { FolderGit2, ShieldAlert } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/branding';

export const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredProjects =
    filterCategory === 'all'
      ? SAMPLE_PROJECTS
      : SAMPLE_PROJECTS.filter((p) =>
          p.category.toLowerCase().includes(filterCategory.toLowerCase())
        );

  return (
    <section id="projects" className="py-24 bg-[#080808] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191919] border border-[#303030] text-[11px] font-semibold tracking-wider uppercase text-[#EAEAEA] mb-4">
            <FolderGit2 className="w-3.5 h-3.5 text-white" />
            <span>Project Hub Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Real-World Projects. Zero Fluff.
          </h2>

          <p className="text-base text-[#888888] leading-relaxed mb-6">
            Move beyond simple classroom hello-world programs. Explore complete architectures built with industry standards for {BRAND_CONFIG.monogram} coursework and student portfolios.
          </p>

          {/* Demonstration Content Clarification Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#141414] border border-[#303030] text-xs text-[#AAAAAA] text-left">
            <ShieldAlert className="w-4 h-4 text-white shrink-0" />
            <span>
              <strong className="text-white">Demonstration Content:</strong> The projects below illustrate the production templates provided during Phase 01 to guide {BRAND_CONFIG.monogram} teams.
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'web', label: 'Web Platforms' },
            { id: 'systems', label: 'Systems & Algorithms' },
            { id: 'frontend', label: 'Portfolios' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                filterCategory === tab.id
                  ? 'bg-white text-[#080808] shadow-md'
                  : 'bg-[#191919] text-[#888888] hover:text-white border border-[#2b2b2b]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewProject={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
