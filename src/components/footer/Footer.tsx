import React from 'react';
import { Terminal, ArrowUp } from 'lucide-react';
import { FOOTER_LINKS } from '../../data/navigation';
import { GithubIcon, LinkedinIcon, DiscordIcon } from '../common/Icons';
import { BRAND_CONFIG } from '../../config/branding';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#080808] border-t border-[#262626] pt-16 pb-12 text-[#888888]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#202020]">
          {/* Brand Info (2 Columns wide) */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="flex items-center gap-3 mb-4 group inline-flex"
                aria-label={`${BRAND_CONFIG.websiteName} Footer`}
              >
                <div className="w-10 h-10 rounded-lg bg-[#191919] border border-[#303030] flex items-center justify-center text-white group-hover:border-white transition-colors">
                  <Terminal className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-base font-bold text-white tracking-tight">
                    {BRAND_CONFIG.websiteName}
                  </span>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#888888]">
                    {BRAND_CONFIG.tagline}
                  </div>
                </div>
              </a>

              <p className="text-xs sm:text-sm text-[#888888] leading-relaxed max-w-sm mb-6">
                {BRAND_CONFIG.fullDescription}
              </p>
            </div>

            {/* Social & Community Channels */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Organization"
                className="w-9 h-9 rounded-lg bg-[#141414] border border-[#2b2b2b] flex items-center justify-center text-[#EAEAEA] hover:text-white hover:border-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Network"
                className="w-9 h-9 rounded-lg bg-[#141414] border border-[#2b2b2b] flex items-center justify-center text-[#EAEAEA] hover:text-white hover:border-white transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord Community"
                className="w-9 h-9 rounded-lg bg-[#141414] border border-[#2b2b2b] flex items-center justify-center text-[#EAEAEA] hover:text-white hover:border-white transition-colors"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-[#AAAAAA] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Hub Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Learning Hub
            </h4>
            <ul className="space-y-2.5 text-xs">
              {FOOTER_LINKS.learning.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-[#AAAAAA] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Community & Events
            </h4>
            <ul className="space-y-2.5 text-xs">
              {FOOTER_LINKS.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="text-[#AAAAAA] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#777777]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>All Systems Operational • Phase 01 Live</span>
          </div>

          <div className="text-[#888888] text-center">
            {BRAND_CONFIG.copyrightNotice}
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 text-[#AAAAAA] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
