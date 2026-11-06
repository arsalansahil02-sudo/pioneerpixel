export type UserRole = 'admin' | 'student';

export interface StudentSkill {
  id: string;
  name: string;
  experience: string; // e.g. 'Beginner (3 mos)', 'Intermediate (1 yr)', 'Advanced'
  status: 'Have' | 'Learning' | 'Want to Learn';
  isStarted?: boolean; // toggle for skills being learned
  startedAt?: string;
}

export interface MonthlyProgress {
  month: string; // e.g. 'November 2026'
  skillsLearned: string[];
  whatLearned: string;
  progressPercentage: number; // 0 to 100
  currentlyLearning: string[];
  updatedAt: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string; // Private (Admin only)
  password?: string;
  phone?: string; // Private (Admin only)
  collegeId?: string; // Private (Admin only)
  role: UserRole;
  avatar?: string;
  bio?: string;
  linkedinUrl?: string; // LinkedIn Profile link
  githubUrl?: string; // GitHub Profile link (optional)
  shortTermGoal?: string; // Short term goal (no word limit)
  toolsExperience?: string; // Experience with tool/software (optional, no word limit)
  extraCurricularSkills?: string; // Extra-curricular skills (no word limit)
  skills: StudentSkill[];
  monthlyProgress: MonthlyProgress;
  joinedGroupIds: string[]; // Maximum 2 groups allowed
  completedCommonTask: boolean;
  commonTaskSubmission?: {
    text: string;
    link?: string;
    submittedAt: string;
  };
  joinedDate: string;
  quizScore?: number;
  quizzesCompleted?: number;
  status: 'active' | 'suspended';
}

export interface GroupResource {
  id: string;
  groupId: string;
  type: 'note' | 'image' | 'video';
  title: string;
  content: string; // Text content or URL
  mediaUrl?: string;
  authorName: string;
  authorId: string;
  createdAt: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  adminName: string; // The person who teaches this skill
  adminId: string;
  memberIds: string[];
  resources: GroupResource[];
}

export interface CommonTask {
  id: string;
  title: string;
  description: string;
  deadline: string;
  requirements: string[];
  assignedBy: string;
  updatedAt: string;
}

export interface ArchivedTask {
  id: string;
  title: string;
  description: string;
  deadline: string;
  completedDate: string;
  requirements: string[];
  assignedBy: string;
  submissionsCount: number;
  status: 'completed' | 'archived';
}

export interface UploadRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  type: 'photo' | 'note' | 'text';
  title: string;
  content: string;
  mediaUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  adminFeedback?: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: 'Main Admin' | 'Student via Admin';
  type: 'image' | 'note' | 'text';
  title?: string;
  content: string;
  mediaUrl?: string;
  likes: number;
  likedBy: string[]; // student IDs who liked
  createdAt: string;
  tag?: string;
}
