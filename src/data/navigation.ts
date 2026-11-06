import type { NavLink } from '../types';
import { BRAND_CONFIG } from '../config/branding';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Learning', href: '#learning' },
  { label: 'Projects', href: '#projects', badge: 'Active' },
  { label: 'Quizzes', href: '#quizzes' },
  { label: 'Career', href: '#career' },
  { label: 'Community', href: '#community' },
];

export const FOOTER_LINKS = {
  navigation: [
    { label: 'Home', href: '#hero' },
    { label: 'Learning Hub', href: '#learning' },
    { label: 'Project Hub', href: '#projects' },
    { label: 'Quiz Arena', href: '#quizzes' },
    { label: 'Career Hub', href: '#career' },
    { label: 'Student Community', href: '#community' },
  ],
  learning: [
    { label: 'C Programming', href: '#learning' },
    { label: 'Python Fundamentals', href: '#learning' },
    { label: 'Discrete Mathematics', href: '#learning' },
    { label: 'Computer Fundamentals', href: '#learning' },
    { label: 'Modern Web Development', href: '#learning' },
  ],
  community: [
    { label: 'WhatsApp Cohort Group', href: '#community' },
    { label: `Discord Server (${BRAND_CONFIG.shortName})`, href: '#community' },
    { label: 'GitHub Student Organization', href: '#community' },
    { label: 'Weekly Project Demos', href: '#community' },
    { label: 'Peer Doubt Resolution', href: '#community' },
  ],
  resources: [
    { label: `${BRAND_CONFIG.monogram} Semester 1 Syllabus`, href: '#learning' },
    { label: 'C Lab Manual & Exercises', href: '#learning' },
    { label: 'Previous Year Question Papers', href: '#learning' },
    { label: 'Project Starter Templates', href: '#projects' },
    { label: 'Tech Resume Guide', href: '#career' },
  ],
};
