import type { CommunityMember } from '../types';
import { BRAND_CONFIG } from '../config/branding';

export const COMMUNITY_MEMBERS: CommunityMember[] = [];

export const COMMUNITY_PERKS = [
  {
    title: 'Peer Code Reviews',
    description: 'Get constructive feedback on your code, memory pointers, and web components from classmates before submitting assignments.',
    iconName: 'GitPullRequest',
  },
  {
    title: 'Hackathon Squads',
    description: `Find motivated ${BRAND_CONFIG.monogram} teammates with complementary skillsets in frontend, backend, or design for weekend hackathons.`,
    iconName: 'Users',
  },
  {
    title: 'Senior Mentorship',
    description: `Direct guidance from ${BRAND_CONFIG.monogram} seniors who cracked competitive internships, campus placements, and freelance contracts.`,
    iconName: 'Sparkles',
  },
  {
    title: 'Weekly Build Sprints',
    description: 'Work on structured 7-day coding sprints, share progress in public, and build genuine portfolio-worthy software.',
    iconName: 'Zap',
  },
];
