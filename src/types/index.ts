export interface BrandConfig {
  websiteName: string;
  logoText: string;
  tagline: string;
  brandDescription: string;
  websiteTitle: string;

  shortName: string;
  monogram: string;
  cohortLabel: string;
  heroBadge: string;
  heroHeading: string;
  fullDescription: string;
  communityHeading: string;
  communityDescription: string;
  finalCtaHeading: string;
  finalCtaDescription: string;
  copyrightNotice: string;
}

export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  items: string[];
  badge?: string;
  actionText: string;
  phase: string;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  tags: string[];
  features: string[];
  architecture: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  semester: string;
  githubUrl: string;
  demoUrl: string;
  isDemo: boolean;
  starsCount: number;
}

export interface SubjectModule {
  id: string;
  title: string;
  code: string;
  semester: number;
  description: string;
  topicsCount: number;
  labsCount: number;
  status: 'Ready' | 'In Progress' | 'Upcoming';
  keyTopics: string[];
  iconName: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizTopic {
  id: string;
  title: string;
  category: string;
  questionCount: number;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate';
  participantsCount: number;
  questions: QuizQuestion[];
}

export interface CareerPillar {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  checklist: string[];
}

export interface CommunityMember {
  name: string;
  role: string;
  semester: string;
  focus: string;
  badge: string;
  avatarInitials: string;
  projectsCompleted: number;
}

// ==========================================
// PHASE 02: THE LEARNING HUB DATA CONTRACTS
// ==========================================

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type SubjectCategory = 'Programming' | 'Core CS' | 'Mathematics' | 'Humanities';

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  explanation: string;
  output?: string;
}

export interface VideoPlaceholder {
  title: string;
  duration: string;
  instructor: string;
  thumbnailBadge: string;
  notice: string;
}

export interface CourseLesson {
  id: string;
  chapterId: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'exercise' | 'interactive';
  description: string;
  content: string;
  codeSnippet?: CodeExample;
  videoPlaceholder: VideoPlaceholder;
  keyTakeaways: string[];
  isDemo: boolean;
}

export interface CourseChapter {
  id: string;
  chapterNumber: number;
  title: string;
  description: string;
  lessons: CourseLesson[];
}

export interface PracticeQuestion {
  id: string;
  topic: string;
  question: string;
  type: 'multiple-choice' | 'conceptual' | 'code-output';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isDemo: boolean;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  instructions: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dueDate?: string;
  points: number;
  status: 'Not Started' | 'In Progress' | 'Submitted';
  sampleQuestions: PracticeQuestion[];
  rubric: string[];
  isDemo: boolean;
}

export interface StudyNote {
  id: string;
  courseId: string;
  chapterTitle: string;
  title: string;
  description: string;
  pagesCount: number;
  fileSize: string;
  topicsCovered: string[];
  previewContent: string;
  downloadUrl?: string;
  updatedAt: string;
  isDemo: boolean;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  semester: number;
  category: SubjectCategory;
  level: CourseLevel;
  chaptersCount: number;
  lessonsCount: number;
  durationHours: number;
  prerequisites: string[];
  isDemo: boolean;
  featured?: boolean;
  chapters: CourseChapter[];
  assignments: Assignment[];
  notes: StudyNote[];
  practiceQuestions: PracticeQuestion[];
}

export interface StudentProgressState {
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  bookmarkedCourseIds: string[];
  bookmarkedNoteIds: string[];
  submittedAssignmentIds: string[];
  lastStudiedLesson?: {
    courseId: string;
    chapterId: string;
    lessonId: string;
    lessonTitle: string;
    courseTitle: string;
    timestamp: string;
  };
}
