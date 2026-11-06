import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowRight, UserCheck, Shield } from 'lucide-react';
import { NAV_LINKS } from '../../data/navigation';
import { BRAND_CONFIG } from '../../config/branding';

interface NavbarProps {
  onOpenLogin: () => void;
  onOpenCommunity: () => void;
  activeSection: string;
  isLearningHubView?: boolean;
  onNavigateHome?: () => void;
  onNavigateLearningHub?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  onOpenCommunity,
  activeSection,
  isLearningHubView = false,
  onNavigateHome,
  onNavigateLearningHub,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');

    if (targetId === 'hero') {
      if (onNavigateHome) {
        onNavigateHome();
      } else {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (targetId === 'learning') {
      if (onNavigateLearningHub) {
        onNavigateLearningHub();
      } else {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (onNavigateSection) {
      onNavigateSection(targetId);
    } else {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#303030] py-3.5 shadow-2xl'
          : 'bg-[#080808]/60 backdrop-blur-sm border-b border-[#303030]/60 py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label={`${BRAND_CONFIG.websiteName} Homepage`}
          >
            <div className="w-10 h-10 rounded-lg bg-[#191919] border border-[#303030] flex items-center justify-center text-white group-hover:border-white transition-all duration-300 shadow-sm group-hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              <Terminal className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                {BRAND_CONFIG.logoText}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#888888] font-medium">
                {isLearningHubView ? 'Learning Hub • Active' : BRAND_CONFIG.cohortLabel}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#191919]/80 border border-[#303030] rounded-full px-3 py-1.5">
            {NAV_LINKS.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = isLearningHubView
                ? targetId === 'learning'
                : activeSection === targetId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#080808] bg-white font-semibold shadow-sm'
                      : 'text-[#EAEAEA] hover:text-white hover:bg-[#252525]'
                  }`}
                >
                  {link.label}
                  {targetId === 'learning' && !isActive && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-white text-[#080808] font-bold rounded-full">
                      P2
                    </span>
                  )}
                  {link.badge && targetId !== 'learning' && !isActive && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-[#303030] text-[#EAEAEA] rounded-full border border-[#404040]">
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isLearningHubView ? (
              <button
                onClick={onNavigateHome}
                type="button"
                className="px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#191919] hover:bg-[#252525] border border-[#303030] rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              >
                ← Back to Home
              </button>
            ) : (
              <button
                onClick={onNavigateLearningHub}
                type="button"
                className="px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#EAEAEA] hover:text-white bg-[#141414] hover:bg-[#1f1f1f] border border-[#303030] hover:border-white rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Launch Hub</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-white text-black font-bold rounded">
                  P2
                </span>
              </button>
            )}

            <button
              onClick={onOpenLogin}
              type="button"
              className="px-4 py-2 text-xs font-semibold tracking-wide text-[#EAEAEA] hover:text-white hover:bg-[#191919] border border-transparent hover:border-[#303030] rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#888888]" />
              Login
            </button>
            <button
              onClick={onOpenCommunity}
              type="button"
              className="px-4 py-2 text-xs font-semibold tracking-wide text-[#080808] bg-white hover:bg-[#EAEAEA] border border-white rounded-lg transition-all duration-200 flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] cursor-pointer group"
            >
              Join Community
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              className="p-2.5 rounded-lg bg-[#191919] border border-[#303030] text-white hover:bg-[#252525] focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#303030] bg-[#080808]/98 backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1 mb-4">
            {NAV_LINKS.map((link) => {
              const targetId = link.href.replace('#', '');
              const isActive = isLearningHubView
                ? targetId === 'learning'
                : activeSection === targetId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? 'text-[#080808] bg-white font-semibold'
                      : 'text-[#EAEAEA] hover:bg-[#191919] hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {targetId === 'learning' && !isActive && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-black font-bold">
                      Phase 2
                    </span>
                  )}
                  {link.badge && targetId !== 'learning' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#303030] text-[#888888]">
                      {link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#303030] flex flex-col gap-2.5">
            {isLearningHubView ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateHome) onNavigateHome();
                }}
                type="button"
                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#141414] hover:bg-[#202020] border border-[#303030] rounded-lg transition-colors cursor-pointer"
              >
                ← Back to Homepage
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateLearningHub) onNavigateLearningHub();
                }}
                type="button"
                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#141414] hover:bg-[#202020] border border-[#303030] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Full Learning Hub</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-white text-black font-bold rounded">
                  P2
                </span>
              </button>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              type="button"
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#191919] hover:bg-[#252525] border border-[#303030] rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Shield className="w-3.5 h-3.5 text-[#888888]" />
              Student Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommunity();
              }}
              type="button"
              className="w-full py-2.5 text-center text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              Join {BRAND_CONFIG.shortName} Community
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
