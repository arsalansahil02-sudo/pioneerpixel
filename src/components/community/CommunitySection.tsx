import React from 'react';
import { COMMUNITY_MEMBERS, COMMUNITY_PERKS } from '../../data/communityData';
import { Users, ArrowRight, GitPullRequest, Sparkles, Zap, Calendar, CheckCircle2 } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/branding';

interface CommunitySectionProps {
  onJoinCommunity: () => void;
}

const PERK_ICONS: Record<string, React.ElementType> = {
  GitPullRequest,
  Users,
  Sparkles,
  Zap,
};

export const CommunitySection: React.FC<CommunitySectionProps> = ({ onJoinCommunity }) => {
  return (
    <section id="community" className="py-24 bg-[#080808] border-t border-[#1c1c1c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191919] border border-[#303030] text-[11px] font-semibold tracking-wider uppercase text-[#EAEAEA] mb-4">
            <Users className="w-3.5 h-3.5 text-white" />
            <span>Student Community</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {BRAND_CONFIG.communityHeading}
          </h2>

          <p className="text-base sm:text-lg text-[#888888] leading-relaxed mb-8">
            {BRAND_CONFIG.communityDescription}
          </p>

          <button
            onClick={onJoinCommunity}
            type="button"
            className="px-7 py-3.5 rounded-lg text-sm font-bold text-[#080808] bg-white hover:bg-[#EAEAEA] border border-white transition-all duration-200 inline-flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] cursor-pointer group"
          >
            <span>Join the Community</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Community Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {COMMUNITY_PERKS.map((perk) => {
            const Icon = PERK_ICONS[perk.iconName] || Users;

            return (
              <div
                key={perk.title}
                className="rounded-xl bg-[#141414] border border-[#2b2b2b] p-6 hover:border-white/60 hover:bg-[#181818] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#080808] border border-[#303030] flex items-center justify-center text-white mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{perk.title}</h3>
                <p className="text-xs text-[#888888] leading-relaxed">{perk.description}</p>
              </div>
            );
          })}
        </div>

        {/* Student Profiles Strip */}
        <div className="rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#252525]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                Peer Network Spotlight
              </span>
              <h3 className="text-2xl font-bold text-white mt-0.5">
                Meet Active {BRAND_CONFIG.monogram} {BRAND_CONFIG.cohortLabel} Peers
              </h3>
            </div>
            <span className="text-xs font-mono text-[#888888]">
              400+ Members Across Colleges
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMMUNITY_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="p-4 rounded-xl bg-[#191919] border border-[#292929] hover:border-[#444444] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#080808] border border-[#303030] flex items-center justify-center font-bold text-xs text-white">
                      {member.avatarInitials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{member.name}</div>
                      <div className="text-[11px] text-[#888888]">{member.semester}</div>
                    </div>
                  </div>

                  <div className="text-xs text-[#CCCCCC] mb-3 font-mono">
                    {member.focus}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#252525] flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#080808] border border-[#303030] text-[#EAEAEA] text-[10px] font-medium">
                    {member.badge}
                  </span>
                  <span className="text-[#888888]">
                    {member.projectsCompleted} projects
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events & Presentations Strip */}
        <div className="rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#080808] border border-[#303030] flex items-center justify-center text-white">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Events & Presentations</h3>
              <p className="text-xs text-[#888888]">
                Weekly challenges, monthly project showcases, and peer workshops.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {[
              {
                title: 'Monthly Presentations',
                desc: 'Present your technical projects and capstones to fellow students and alumni.',
                status: 'Upcoming: Nov 28',
              },
              {
                title: 'Project Showcases',
                desc: 'Live demos of student management systems and personal portfolios.',
                status: 'Bi-weekly Friday',
              },
              {
                title: 'Weekly Challenges',
                desc: 'Solve 3 algorithmic coding puzzles within 48 hours.',
                status: 'Sprint #04 Active',
              },
              {
                title: 'Student Workshops',
                desc: 'Hands-on Git & GitHub masterclass for first year students.',
                status: 'Every Saturday',
              },
            ].map((event, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#191919] border border-[#272727] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-[#080808] border border-[#303030] px-2 py-0.5 rounded">
                    {event.status}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-3 mb-1.5">{event.title}</h4>
                  <p className="text-xs text-[#888888] leading-relaxed">{event.desc}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#222222] text-[11px] text-white flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Free RSVP for Members</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
