import type { CareerPillar } from '../types';
import { BRAND_CONFIG } from '../config/branding';

export const CAREER_PILLARS: CareerPillar[] = [
  {
    title: 'GitHub & Open Source',
    subtitle: 'Proof of Work That Speaks for Itself',
    description: 'Transform your GitHub from an empty account to a credible green contribution graph with clean commits, structured README files, and collaborative pull requests.',
    iconName: 'Github',
    checklist: [
      'Clean professional profile README with tech stack badges',
      'Pin top 3 academic & passion projects with live demo links',
      'Master Git feature branching, semantic commits, and PR reviews',
      'Contribute to community open-source repositories',
    ],
  },
  {
    title: 'LinkedIn Tech Branding',
    subtitle: 'Connecting With Recruiters & Seniors',
    description: 'Position yourself as an active, curious computer science learner. Share your weekly project progress, hackathon participation, and technical breakthroughs.',
    iconName: 'Linkedin',
    checklist: [
      `Headline optimized for ${BRAND_CONFIG.monogram} student + target technical roles`,
      'Document your "Build in Public" journey with screenshots',
      `Connect with ${BRAND_CONFIG.monogram} alumni and tech engineers in top companies`,
      'Feature project repositories and live web applications',
    ],
  },
  {
    title: 'ATS-Friendly Technical Resume',
    subtitle: 'Get Past Algorithmic Filters',
    description: 'Craft a single-page LaTeX or Markdown-based technical resume tailored for first-year internships and campus recruitment drives.',
    iconName: 'FileText',
    checklist: [
      'Clean single-column standard layout (no decorative tables)',
      'Action-verb bullet points with measurable impact metrics',
      'Explicit coursework section: Data Structures, C, Discrete Math',
      'Direct clickable hyperlinks to GitHub and live deployment',
    ],
  },
  {
    title: 'Internship Preparation',
    subtitle: 'Roadmap for 2nd & 3rd Year Placements',
    description: `Early preparation gives ${BRAND_CONFIG.monogram} students a huge competitive edge. Practice technical interviews, aptitude assessments, and problem solving from day one.`,
    iconName: 'Rocket',
    checklist: [
      'Solve 100+ foundational algorithmic problems on platforms',
      'Master fundamental CS core: OS, DBMS, Networks, and OOPS',
      'Prepare 2-minute elevator pitch for your capstone project',
      'Participate in student hackathons and inter-college coding contests',
    ],
  },
];
