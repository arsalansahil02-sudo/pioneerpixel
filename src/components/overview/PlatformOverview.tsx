import React, { useState } from 'react';
import { PLATFORM_FEATURES } from '../../data/platformFeatures';
import { FeatureCard } from './FeatureCard';
import type { FeatureItem } from '../../types';
import { Layers, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/branding';

interface PlatformOverviewProps {
  onNavigateSection: (sectionId: string) => void;
}

export const PlatformOverview: React.FC<PlatformOverviewProps> = ({ onNavigateSection }) => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const handleCardClick = (feature: FeatureItem) => {
    if (feature.id === 'learning-hub') {
      onNavigateSection('learning');
    } else if (feature.id === 'project-hub') {
      onNavigateSection('projects');
    } else if (feature.id === 'quiz-arena') {
      onNavigateSection('quizzes');
    } else if (feature.id === 'career-hub') {
      onNavigateSection('career');
    } else if (feature.id === 'student-community' || feature.id === 'events-presentations') {
      onNavigateSection('community');
    } else {
      setSelectedFeature(feature);
    }
  };

  return (
    <section id="overview" className="py-24 bg-[#080808] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191919] border border-[#303030] text-[11px] font-semibold tracking-wider uppercase text-[#EAEAEA] mb-4">
            <Layers className="w-3.5 h-3.5 text-white" />
            <span>Platform Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Engineered For The Modern {BRAND_CONFIG.monogram} Student
          </h2>

          <p className="text-base text-[#888888] leading-relaxed">
            Six cohesive pillars built to bridge the gap between textbook academia and high-impact software engineering careers.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLATFORM_FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onSelect={handleCardClick}
            />
          ))}
        </div>
      </div>

      {/* Feature Deep-Dive Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-xl bg-[#191919] border border-[#303030] p-6 shadow-2xl">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 p-1.5 text-[#888888] hover:text-white rounded-lg hover:bg-[#252525] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-[11px] font-mono tracking-wider uppercase text-[#888888] mb-1">
              {selectedFeature.category} • {selectedFeature.phase}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{selectedFeature.title}</h3>
            <p className="text-sm text-[#888888] leading-relaxed mb-6">
              {selectedFeature.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#EAEAEA] mb-3">
                Key Focus Topics:
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {selectedFeature.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-[#080808] border border-[#282828] text-xs text-[#EAEAEA] flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#252525]">
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-4 py-2 text-xs font-semibold text-[#888888] hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = selectedFeature.id === 'learning-hub' ? 'learning' : 'community';
                  setSelectedFeature(null);
                  onNavigateSection(target);
                }}
                className="px-4 py-2 text-xs font-semibold text-[#080808] bg-white rounded-lg hover:bg-[#EAEAEA] transition-colors flex items-center gap-1.5"
              >
                {selectedFeature.actionText}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
