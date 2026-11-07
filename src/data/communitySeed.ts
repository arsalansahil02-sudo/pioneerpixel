import type {
  StudentProfile,
  SkillGroup,
  CommonTask,
  ArchivedTask,
  UploadRequest,
  CommunityPost,
} from '../types/community';

// The Root Host Admin — only the website host is the initial admin
export const HOST_ADMIN: StudentProfile = {
  id: 'pioneerpixel-host-admin',
  name: 'Arsalan Sahil',
  email: 'arsalansahil02@gmail.com',
  password: 'admin',
  role: 'admin',
  status: 'active',
  linkedinUrl: '',
  githubUrl: '',
  shortTermGoal: 'Foster college student skill growth through weekly challenges, AI leaderboard assessments, and peer skill groups.',
  toolsExperience: 'VS Code, Git & GitHub, MS Excel, Figma, Linux Terminal, Postman, Vite',
  extraCurricularSkills: 'Technical Mentorship, Workshop Organization, Public Speaking, Content Writing',
  skills: [],
  monthlyProgress: {
    month: 'November 2026',
    skillsLearned: [],
    whatLearned: '',
    progressPercentage: 0,
    currentlyLearning: [],
    updatedAt: 'Just now',
  },
  joinedGroupIds: [],
  completedCommonTask: false,
  joinedDate: 'Host Admin',
  quizScore: 0,
  quizzesCompleted: 0,
};

// Initial state includes the Host Admin
export const SEED_STUDENTS: StudentProfile[] = [HOST_ADMIN];

export const SEED_GROUPS: SkillGroup[] = [];

export const SEED_COMMON_TASK: CommonTask = {
  id: '',
  title: '',
  description: '',
  deadline: '',
  requirements: [],
  assignedBy: 'Arsalan Sahil',
  updatedAt: '',
};

export const SEED_PREVIOUS_TASKS: ArchivedTask[] = [];

export const SEED_UPLOAD_REQUESTS: UploadRequest[] = [];

export const SEED_COMMUNITY_POSTS: CommunityPost[] = [];
