-- =========================================================================
-- PioneerPixel Student Skill Community Database Setup (Supabase)
-- Run this script in your Supabase SQL Editor to create all required tables.
-- =========================================================================

-- 1. Students Table
CREATE TABLE IF NOT EXISTS public.students (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    role TEXT NOT NULL DEFAULT 'student',
    status TEXT NOT NULL DEFAULT 'active',
    bio TEXT DEFAULT '',
    avatar TEXT DEFAULT '',
    linkedin_url TEXT DEFAULT '',
    github_url TEXT DEFAULT '',
    short_term_goal TEXT DEFAULT '',
    tools_experience TEXT DEFAULT '',
    extra_curricular_skills TEXT DEFAULT '',
    skills JSONB DEFAULT '[]'::jsonb,
    monthly_progress JSONB DEFAULT '{}'::jsonb,
    joined_group_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    completed_common_task BOOLEAN DEFAULT FALSE,
    joined_date TEXT DEFAULT '',
    quiz_score INTEGER DEFAULT 0,
    quizzes_completed INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Skill Groups Table
CREATE TABLE IF NOT EXISTS public.skill_groups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    admin_name TEXT NOT NULL,
    admin_id TEXT NOT NULL,
    member_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
    resources JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Common Tasks Table
CREATE TABLE IF NOT EXISTS public.common_tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    deadline TEXT DEFAULT '',
    requirements TEXT[] DEFAULT ARRAY[]::TEXT[],
    assigned_by TEXT NOT NULL,
    updated_at TEXT DEFAULT ''
);

-- 4. Community Posts Table
CREATE TABLE IF NOT EXISTS public.community_posts (
    id TEXT PRIMARY KEY,
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL DEFAULT 'student',
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'text',
    media_url TEXT,
    likes INTEGER DEFAULT 0,
    liked_by TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TEXT DEFAULT ''
);

-- 5. Upload Requests Table
CREATE TABLE IF NOT EXISTS public.upload_requests (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'note',
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    media_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    submitted_at TEXT DEFAULT ''
);

-- Enable Row Level Security (RLS) & Public Policies for Anon Access
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.common_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upload_requests ENABLE ROW LEVEL SECURITY;

-- Allow Public / Anon users to Read and Write
DROP POLICY IF EXISTS "Public access to students" ON public.students;
CREATE POLICY "Public access to students" ON public.students FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to skill_groups" ON public.skill_groups;
CREATE POLICY "Public access to skill_groups" ON public.skill_groups FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to common_tasks" ON public.common_tasks;
CREATE POLICY "Public access to common_tasks" ON public.common_tasks FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to community_posts" ON public.community_posts;
CREATE POLICY "Public access to community_posts" ON public.community_posts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access to upload_requests" ON public.upload_requests;
CREATE POLICY "Public access to upload_requests" ON public.upload_requests FOR ALL USING (true) WITH CHECK (true);

-- Insert Default Host Admin (Arsalan Sahil) if not already present
INSERT INTO public.students (
    id, name, email, password, role, status, linkedin_url, github_url,
    short_term_goal, tools_experience, extra_curricular_skills,
    skills, monthly_progress, joined_group_ids, completed_common_task, joined_date, quiz_score, quizzes_completed
) VALUES (
    'pioneerpixel-host-admin',
    'Arsalan Sahil',
    'arsalansahil02@gmail.com',
    'admin',
    'admin',
    'active',
    '',
    '',
    'Foster college student skill growth through weekly challenges, AI leaderboard assessments, and peer skill groups.',
    'VS Code, Git & GitHub, MS Excel, Figma, Linux Terminal, Postman, Vite',
    'Technical Mentorship, Workshop Organization, Public Speaking, Content Writing',
    '[{"id":"sk-adm-1","name":"Web Architecture","experience":"Advanced","status":"Have"},{"id":"sk-adm-2","name":"Full Stack Development","experience":"Advanced","status":"Have"},{"id":"sk-adm-3","name":"Platform Governance","experience":"Advanced","status":"Have"}]'::jsonb,
    '{"month":"November 2026","skillsLearned":["Platform Architecture","Community Mentorship"],"whatLearned":"Managing PioneerPixel platform, evaluating student task submissions, and publishing weekly common challenges.","progressPercentage":100,"currentlyLearning":[],"updatedAt":"Active Host"}'::jsonb,
    ARRAY[]::TEXT[],
    TRUE,
    'Host Admin',
    250,
    3
) ON CONFLICT (id) DO UPDATE SET email = 'arsalansahil02@gmail.com', role = 'admin';

-- Enable Realtime for Students and Skill Groups
ALTER PUBLICATION supabase_realtime ADD TABLE public.students;
ALTER PUBLICATION supabase_realtime ADD TABLE public.skill_groups;
ALTER PUBLICATION supabase_realtime ADD TABLE public.common_tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.upload_requests;
