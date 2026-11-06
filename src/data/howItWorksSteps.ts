import type { WorkflowStep } from '../types';

export const HOW_IT_WORKS_STEPS: WorkflowStep[] = [
  {
    stepNumber: '01',
    title: 'Learn',
    tagline: 'Foundation First',
    description: 'Learn programming and technical concepts with curriculum-aligned roadmaps and clear code breakdowns.',
    iconName: 'GraduationCap',
    highlights: [
      'Semester 1 core subjects broken into digestable units',
      'Clean C & Python examples with annotated memory explanations',
      'Curated references without information overload',
    ],
  },
  {
    stepNumber: '02',
    title: 'Practice',
    tagline: 'Active Retention',
    description: 'Solve questions and participate in quizzes to test your conceptual clarity and code tracing abilities.',
    iconName: 'Terminal',
    highlights: [
      'Exam-oriented conceptual MCQs with detailed explanations',
      'Dry-run code tracing and memory pointer challenges',
      'Weekly subject leaderboards to measure growth',
    ],
  },
  {
    stepNumber: '03',
    title: 'Build',
    tagline: 'Real-world Application',
    description: 'Work with classmates and create real-world projects that showcase true software engineering ability.',
    iconName: 'Code',
    highlights: [
      'Collaborative Git workflow with branch-based feature building',
      'Practical projects: College Portal, Record CLI, Portfolio',
      'Code reviews and feedback from senior peers',
    ],
  },
  {
    stepNumber: '04',
    title: 'Grow',
    tagline: 'Career Launchpad',
    description: 'Build your portfolio and prepare for career opportunities, internships, and competitive tech challenges.',
    iconName: 'TrendingUp',
    highlights: [
      'Showcase live web apps and GitHub repositories to recruiters',
      'Industry-standard LinkedIn profile and technical resume setup',
      'Early foundation for off-campus internships and freelance gigs',
    ],
  },
];
