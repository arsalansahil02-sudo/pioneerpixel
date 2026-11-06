# BCA SKILL HUB — Phase 01

> **Tagline:** *Learn Together. Build Together. Grow Together.*

**BCA SKILL HUB** is a premium, modern, responsive educational community platform built specifically for Bachelor of Computer Applications (BCA) students. Initiated for **BCA Semester 1** learners, the platform provides a rigorous foundation in computer science and practical software engineering before scaling to all semesters and partner colleges.

---

## 🎯 Design Vision & Identity

Taking inspiration from the clean, focused black-and-white visual identity of high-performance EdTech platforms like Physics Wallah, BCA SKILL HUB delivers an original monochrome aesthetic:

- **Primary Dark Background:** `#080808`
- **Primary Light Background:** `#FFFFFF`
- **Dark Cards:** `#191919`
- **Light Grey / Accents:** `#EAEAEA`
- **Secondary Text:** `#888888`
- **Borders:** `#303030`
- **Primary Text on Dark:** `#FFFFFF`
- **Primary Text on Light:** `#080808`

Dominant black and white tones ensure high readability, zero visual clutter, and an authoritative software engineering atmosphere.

---

## ⚡ Centralized & Dynamic Branding

All brand identifiers are stored in a single source of truth at [`src/config/branding.ts`](file:///c:/Users/user/OneDrive/Desktop/college%20website/src/config/branding.ts):
- **Website name:** `websiteName`
- **Logo text:** `logoText`
- **Tagline:** `tagline`
- **Brand description:** `brandDescription`
- **Website title:** `websiteTitle`
- **Extended brand properties:** `shortName`, `monogram`, `cohortLabel`, `heroBadge`, `heroHeading`, `fullDescription`, `communityHeading`, `finalCtaHeading`, `copyrightNotice`.

> [!TIP]
> **Zero-Friction Rebranding:** Modifying `src/config/branding.ts` instantly updates all headers, footers, mobile drawers, interactive modals, live IDE tabs, and browser document titles with zero component redesign or hardcoded edits.

---

## 🛠️ Tech Stack

- **Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React & Custom SVG brand glyphs
- **Bundler & Dev Server:** Vite 8
- **Linter & Typecheck:** TypeScript Compiler (`tsc -b`), Oxlint

---

## 📐 Project Architecture & Structure

```
├── public/
│   ├── favicon.svg             # Custom monochrome SVG brand mark
│   └── ...
├── src/
│   ├── assets/                 # Brand assets
│   ├── config/
│   │   └── branding.ts         # Centralized dynamic brand configuration
│   ├── components/
│   │   ├── common/
│   │   │   ├── Icons.tsx       # Brand vector icons (GitHub, LinkedIn, Discord)
│   │   │   └── Toast.tsx       # Sleek monochrome feedback notification
│   │   ├── navbar/
│   │   │   └── Navbar.tsx      # Sticky blurred navbar + mobile drawer
│   │   ├── hero/
│   │   │   ├── Hero.tsx        # Hero section with copy & trust stats
│   │   │   └── CodeDashboardPreview.tsx # Interactive C/Python IDE simulator
│   │   ├── overview/
│   │   │   ├── PlatformOverview.tsx # 6 core hub cards & deep-dive modal
│   │   │   └── FeatureCard.tsx # Reusable card component
│   │   ├── workflow/
│   │   │   └── HowItWorks.tsx  # 4-step learning & growth progression
│   │   ├── projects/
│   │   │   ├── ProjectShowcase.tsx # Filterable project showcase
│   │   │   ├── ProjectCard.tsx # Demo-labeled project card
│   │   │   └── ProjectModal.tsx # Full architecture & specs modal
│   │   ├── learning/
│   │   │   └── LearningPreview.tsx # Semester 1 syllabus & lab browser
│   │   ├── quiz/
│   │   │   └── QuizArenaPreview.tsx # Interactive MCQ engine with explanations
│   │   ├── career/
│   │   │   └── CareerHubSection.tsx # 4 career readiness pillars & checklists
│   │   ├── community/
│   │   │   └── CommunitySection.tsx # Student spotlights & events
│   │   ├── cta/
│   │   │   └── FinalCTA.tsx    # Conversion section
│   │   ├── footer/
│   │   │   └── Footer.tsx      # Complete navigation, resources, copyright
│   │   └── modals/
│   │       ├── AuthModal.tsx   # Login / Register with demo credentials
│   │       └── CommunityModal.tsx # Cohort onboarding form
│   ├── data/
│   │   ├── navigation.ts       # Navigation and footer link registries
│   │   ├── platformFeatures.ts # 6 Hub pillars
│   │   ├── howItWorksSteps.ts  # 01-04 workflow
│   │   ├── projectsData.ts     # Realistic demo project specifications
│   │   ├── learningData.ts     # BCA Sem 1 syllabus and lab units
│   │   ├── quizData.ts         # Timed MCQ questions & rationales
│   │   ├── careerData.ts       # GitHub, LinkedIn, Resume, Internship checklists
│   │   └── communityData.ts    # Student profiles & event calendar
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── App.tsx                 # Root application composition & scroll spy
│   ├── index.css               # Tailwind v4 configuration & theme tokens
│   └── main.tsx                # React root mount
├── index.html                  # HTML5 shell with Google Fonts & metadata
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Features Implemented in Phase 01

1. **Responsive Navbar:**
   - Brand logo and name with active cohort pulse.
   - Smooth-scrolling links: Home, Learning, Projects, Quizzes, Career, Community.
   - Functional action buttons: Student Login & Join Community.
   - Mobile drawer with accessible tap targets and fluid transitions.

2. **High-Impact Hero Section:**
   - Badge: `YOUR BCA JOURNEY STARTS HERE • Semester 01`
   - Heading: *"Don't Just Study Computer Science. Build Your Future."*
   - Interactive live IDE preview featuring executable C & Python snippets with instant compilation output simulator.
   - Trust proof bar showing 400+ students, 100% free open platform, and Semester 01 alignment.

3. **Platform Overview (6 Hubs):**
   - **Learning Hub:** C Programming, Python, Mathematics, Computer Fundamentals, Web Development.
   - **Project Hub:** Team Projects, College Website, Student Management System, Portfolio Website.
   - **Quiz Arena:** Programming Quizzes, Computer Fundamentals, Mathematics, Technology and AI.
   - **Career Hub:** LinkedIn Profile, GitHub, Resume Building, Portfolio Development, Internship Preparation.
   - **Student Community:** Student Profiles, Skill Sharing, Peer Learning, Collaboration.
   - **Events & Presentations:** Monthly Presentations, Project Showcases, Weekly Challenges, Student Workshops.

4. **The 4-Step Pathway (How It Works):**
   - `01 — Learn:` Learn programming and technical concepts.
   - `02 — Practice:` Solve questions and participate in quizzes.
   - `03 — Build:` Work with classmates and create real-world projects.
   - `04 — Grow:` Build your portfolio and prepare for career opportunities.

5. **Project Showcase:**
   - Prominently labeled demonstration blueprints:
     - College Website Portal (React + TypeScript + Tailwind)
     - Student Management System (C / Data Structures / File I/O)
     - Personal Portfolio Website (HTML5 / CSS3 / JavaScript)
     - BCA Quiz & Assessment Engine (React state machine)
   - Interactive Project Modal detailing system architecture, features, and source repository.

6. **Interactive Learning Hub & Quiz Arena:**
   - Live syllabus explorer for BCA-101 through BCA-105.
   - Functional 3-question MCQ engine with instant correctness feedback and conceptual explanations.

7. **Career Acceleration Hub:**
   - Checklists for GitHub, LinkedIn tech branding, ATS single-column resumes, and internship roadmap.

8. **Student Community & Events:**
   - Verified BCA Semester 1 peer spotlights with active skill badges.
   - Events calendar with monthly project showcases and weekly challenges.

9. **Conversion & Engagement Modals:**
   - Student Login modal with one-click demo credentials.
   - Community Onboarding modal with cohort form submission and toast feedback.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Linter
```bash
npm run lint
```

---

## 🔮 Roadmap for Future Phases

- **Phase 02:** Learning Hub — Full lecture notes, lab manuals, and downloadable syllabus PDFs.
- **Phase 03:** Project Hub — Team collaboration workspaces, Git pull request simulations, and code review queue.
- **Phase 04:** Quiz System — Live leaderboard, timed competitive rounds, and semester badges.
- **Phase 05:** Student Profiles & Career Hub — Public portfolio generator and automated resume scorer.
- **Phase 06:** Admin Dashboard & Backend — Node.js / PostgreSQL backend for university management.

---

© 2026 BCA SKILL HUB. Built with precision for aspiring computer scientists.
