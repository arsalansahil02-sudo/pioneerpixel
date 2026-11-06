import { useState, useEffect } from 'react';
import { CommunityProvider, useCommunity } from './context/CommunityContext';
import { Navbar } from './components/community/Navbar';
import { HomeSection } from './components/community/HomeSection';
import { DashboardSection } from './components/community/DashboardSection';
import { MyProfileSection } from './components/community/MyProfileSection';
import { SkillGroupsSection } from './components/community/SkillGroupsSection';
import { CommonTaskSection } from './components/community/CommonTaskSection';
import { ExcelSection } from './components/community/ExcelSection';
import { LeaderboardSection } from './components/community/LeaderboardSection';
import { CommunityFeedSection } from './components/community/CommunityFeedSection';
import { AdminPanelSection } from './components/community/AdminPanelSection';
import { UploadRequestModal } from './components/community/UploadRequestModal';
import { AuthModal } from './components/community/AuthModal';
import { ProfileEditModal } from './components/community/ProfileEditModal';
import { BRAND_CONFIG } from './config/branding';

function CommunityApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isInitialProfileSetupOpen, setIsInitialProfileSetupOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>({
    isOpen: false,
    mode: 'signin',
  });

  const { isAdmin } = useCommunity();

  // Dynamic document title
  useEffect(() => {
    document.title = BRAND_CONFIG.websiteTitle;
  }, []);

  // Handle switching tabs safely
  const handleSelectTab = (tabId: string) => {
    if (tabId === 'admin' && !isAdmin) {
      setActiveTab('home');
      return;
    }
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthModalState({ isOpen: true, mode });
  };

  const handleRegisteredSuccess = () => {
    setActiveTab('profile');
    setIsInitialProfileSetupOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#080808] selection:bg-black selection:text-white flex flex-col font-sans">
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenAuth={handleOpenAuth}
      />

      {/* 2. Main Tab Views */}
      <main className="flex-1 pt-16">
        {activeTab === 'home' && (
          <HomeSection
            onNavigateTab={handleSelectTab}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'dashboard' && <DashboardSection />}

        {activeTab === 'profile' && (
          <MyProfileSection
            onOpenUploadRequest={() => setIsUploadModalOpen(true)}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'groups' && <SkillGroupsSection />}

        {activeTab === 'task' && <CommonTaskSection />}

        {activeTab === 'excel' && <ExcelSection />}

        {activeTab === 'leaderboard' && <LeaderboardSection />}

        {activeTab === 'community' && (
          <CommunityFeedSection
            onOpenUploadRequest={() => setIsUploadModalOpen(true)}
          />
        )}

        {activeTab === 'admin' && <AdminPanelSection />}
      </main>

      {/* 3. Simple & Clean Footer */}
      <footer className="bg-[#F9FAFB] border-t border-[#E5E7EB] py-8 text-center text-xs text-[#666666] font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong className="text-[#080808]">{BRAND_CONFIG.websiteName.toUpperCase()}</strong> • Clean Black & White Design
          </div>
          <div>
            {BRAND_CONFIG.tagline}
          </div>
        </div>
      </footer>

      {/* 4. Modals */}
      <UploadRequestModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState({ isOpen: false, mode: 'signin' })}
        onRegisteredSuccess={handleRegisteredSuccess}
      />

      <ProfileEditModal
        isOpen={isInitialProfileSetupOpen}
        onClose={() => setIsInitialProfileSetupOpen(false)}
        isInitialSetup={true}
      />
    </div>
  );
}

export function App() {
  return (
    <CommunityProvider>
      <CommunityApp />
    </CommunityProvider>
  );
}

export default App;
