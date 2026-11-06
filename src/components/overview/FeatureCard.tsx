import React from 'react';
import {
  BookOpen,
  Layers,
  Award,
  Briefcase,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import type { FeatureItem } from '../../types';

interface FeatureCardProps {
  feature: FeatureItem;
  onSelect: (feature: FeatureItem) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Layers,
  Award,
  Briefcase,
  Users,
  Calendar,
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onSelect }) => {
  const IconComponent = ICON_MAP[feature.iconName] || BookOpen;

  return (
    <div
      onClick={() => onSelect(feature)}
      className="group relative rounded-xl bg-[#191919] border border-[#303030] p-6 hover:border-white/70 hover:bg-[#1e1e1e] transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
    >
      <div>
        {/* Top Header Row with Icon & Badge */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-lg bg-[#080808] border border-[#303030] flex items-center justify-center text-white group-hover:border-white transition-colors duration-300 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.12)]">
            <IconComponent className="w-6 h-6 text-white transition-transform group-hover:scale-110 duration-300" />
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#888888] font-medium">
              {feature.category}
            </span>
            {feature.badge && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#080808] border border-[#303030] text-[#EAEAEA] font-semibold">
                {feature.badge}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2.5 tracking-tight group-hover:text-white flex items-center justify-between">
          <span>{feature.title}</span>
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#888888] leading-relaxed mb-6 font-normal">
          {feature.description}
        </p>

        {/* Feature Highlights Sub-list */}
        <div className="mb-6 pt-4 border-t border-[#272727]">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-[#888888] mb-2.5">
            Key Modules & Focus
          </div>
          <ul className="space-y-1.5">
            {feature.items.map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-[#EAEAEA] flex items-center gap-2 group-hover:text-white transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5 text-[#666666] group-hover:text-white transition-colors shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-4 border-t border-[#252525] flex items-center justify-between text-xs font-semibold text-[#888888] group-hover:text-white transition-colors">
        <span className="font-mono text-[11px]">{feature.phase}</span>
        <span className="flex items-center gap-1.5 text-white group-hover:underline">
          {feature.actionText}
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
