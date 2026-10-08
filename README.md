# CareerLens — AI Resume Analyzer & Career Recommendation System

A student-friendly web platform where users can upload or paste their resume, analyze their skills, identify strengths and missing skills, calculate an overall resume score, and receive suitable career-role recommendations — all running entirely in the browser with no backend or API keys required.

---

## Problem Statement

Students and early-career professionals often struggle to understand how their resume aligns with different career paths. They lack access to tools that can quickly assess their skill gaps, suggest improvements, and recommend suitable roles. Paid services are expensive, and most require sharing personal data with third-party servers.

CareerLens solves this by providing a **100% browser-based** resume analysis tool that detects skills, scores the resume, matches it against career roles, and gives actionable improvement suggestions — all without sending any data to a server.

---

## Objectives

- Provide instant resume analysis without requiring sign-ups or API keys
- Detect technical and soft skills from resume text using keyword matching
- Calculate a weighted resume score across 8 categories
- Recommend career roles with match percentages and skill gap analysis
- Suggest missing skills with priority levels and learning directions
- Offer ATS-friendly resume improvement suggestions
- Persist analysis history locally using browser LocalStorage
- Deliver a polished, responsive, dark/light-mode UI suitable for a college project

---

## Features

### Resume Analyzer
- Upload PDF or TXT resumes (text extracted in-browser via pdfjs-dist)
- Paste resume text manually
- Demo resume button for instant trial
- Loading animation during analysis

### Analysis Dashboard
- Animated circular progress indicator for overall score (out of 100)
- Score breakdown across 8 categories with progress bars:
  Technical Skills, Soft Skills, Education, Projects, Experience, Certifications, Resume Structure, Keyword Relevance
- Welcome message, latest score, skills detected, top career match, missing high-priority skills
- Quick action buttons and recent analysis list
- Empty state when no analysis exists

### Skill Analysis
- Automatic skill detection across 9 categories:
  Programming Languages, Web Technologies, Databases, AI/ML, Cloud, DevOps, Data Analytics, Tools, Soft Skills
- Interactive Recharts bar chart and pie chart for category distribution
- Searchable and filterable skill list
- Per-category summary cards

### Career Recommendations
- 9 career roles: Software Engineer, Frontend Developer, Backend Developer, Full Stack Developer, AI/ML Engineer, Generative AI Engineer, Data Analyst, Cloud Engineer, DevOps Engineer
- Match percentage sorted from highest to lowest
- Expandable cards showing matching skills, missing skills, required skills, related technologies, and career descriptions
- Transparent "How this is calculated" section

### Resume Improvement
- Missing section detection
- Weak area identification with current scores
- Keyword suggestions for high-priority gaps
- Formatting suggestions (length, capitalization)
- Action verb recommendations
- Project description tips
- ATS-friendly best practices

### Analysis History
- Saved automatically to LocalStorage
- Displays date, score, top career, skill count
- View and delete individual analyses
- Clear all with confirmation dialog

### Career Explorer
- Browse all 9 career roles independently
- Filter by category
- Detail modal with beginner roadmap, required skills, related technologies
- Shows match percentage if an analysis exists

### Additional UI Features
- Light and dark mode with toggle (persisted)
- Toast notifications
- Loading skeletons and animated states
- Empty states with calls to action
- Tooltips
- Confirmation dialogs before destructive actions
- Smooth page transitions
- Sticky sidebar on desktop, slide-out drawer on mobile
- Fully responsive (mobile, tablet, desktop)

---

## Technologies Used

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool and dev server |
| TypeScript | Type-safe development |
| Tailwind CSS 3 | Utility-first styling |
| Recharts 3 | Charts and data visualization |
| Lucide React | Icon library |
| pdfjs-dist | In-browser PDF text extraction |
| LocalStorage | Client-side data persistence |

---

## System Workflow

```
User uploads PDF/TXT or pastes resume text
        │
        ▼
  Text extraction (PDF → text via pdfjs)
        │
        ▼
  Skill detection (keyword matching against skill database)
        │
        ▼
  Score calculation (8 categories with weighted formula)
        │
        ▼
  Career matching (compare detected skills vs role requirements)
        │
        ▼
  Missing skills analysis (priority based on frequency across top roles)
        │
        ▼
  Improvement suggestions (sections, keywords, formatting, ATS tips)
        │
        ▼
  Results displayed in dashboard
        │
        ▼
  Analysis saved to LocalStorage
```

---

## Architecture Overview

```
src/
├── components/          # Reusable UI components
│   ├── Card.tsx              # Card + CardHeader
│   ├── Charts.tsx            # Recharts wrappers (bar, pie, radial)
│   ├── CircularProgress.tsx  # Animated SVG score ring
│   ├── ConfirmDialog.tsx      # Confirmation modal
│   ├── EmptyState.tsx         # Empty state placeholder
│   ├── Loading.tsx            # Spinner + skeleton loaders
│   ├── PageTransition.tsx     # Fade-in page wrapper
│   ├── ProgressBar.tsx        # Animated progress bar
│   ├── Sidebar.tsx            # Desktop sidebar + mobile drawer
│   ├── Toast.tsx              # Toast notification container
│   ├── Tooltip.tsx            # Hover tooltip
│   └── Topbar.tsx             # Sticky top navigation bar
├── data/                # Static data and keyword databases
│   ├── careers.ts            # 9 career roles with skills/roadmaps
│   ├── constants.ts          # Toast config
│   ├── sampleResume.ts       # Demo resume text
│   └── skills.ts             # Skill categories + keyword database
├── hooks/               # Custom React hooks
│   ├── useApp.ts             # App-wide context (shared state)
│   ├── useTheme.ts           # Dark/light mode management
│   └── useToast.ts           # Toast notification state
├── pages/               # Route-level page components
│   ├── AnalyzerPage.tsx      # Resume upload + paste + analyze
│   ├── CareersPage.tsx       # Career recommendations
│   ├── DashboardPage.tsx     # Overview dashboard
│   ├── ExplorerPage.tsx      # Career explorer with modal
│   ├── HistoryPage.tsx       # Saved analysis history
│   ├── ImprovementPage.tsx   # Resume improvement suggestions
│   ├── LandingPage.tsx       # Marketing landing page
│   ├── SettingsPage.tsx      # Settings + data management
│   └── SkillsPage.tsx        # Skill analysis with charts
├── services/            # Business logic
│   ├── analysisEngine.ts     # Skill detection, scoring, career matching
│   └── storage.ts            # LocalStorage CRUD operations
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   ├── helpers.ts            # Date formatting, score colors, etc.
│   └── pdf.ts                # PDF/TXT file extraction
├── App.tsx              # Root component with routing
├── main.tsx             # React entry point
└── index.css            # Tailwind + custom animations
```

### Analysis Engine

The analysis engine (`src/services/analysisEngine.ts`) is the core of the application:

- **`detectSkills(text)`** — Scans resume text against 150+ keywords across 9 categories
- **`calculateScoreBreakdown(text, skills)`** — Scores 8 categories using section detection and keyword density
- **`calculateOverallScore(breakdown)`** — Weighted sum: Technical (25%), Projects (15%), Experience (15%), Education (10%), Soft Skills (10%), Structure (10%), Keywords (10%), Certifications (5%)
- **`matchCareers(skills)`** — Compares detected skills against each role's required skills for match percentage
- **`findMissingSkills(skills, matches)`** — Identifies gaps from top 3 roles, assigns High/Medium/Low priority
- **`generateImprovements(text, skills, breakdown, missing)`** — Produces categorized improvement suggestions

---

## Installation

### Prerequisites

- Node.js 18+ and npm

### Steps

```bash
# Clone the repository
git clone <repository-url>
cd careerlens

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

The app will be available at `http://localhost:5173` (default Vite port).

---

## How to Run

1. Ensure Node.js 18+ is installed
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open `http://localhost:5173` in your browser
5. Click **"Launch App"** or **"Analyze Resume"** to enter the dashboard
6. Upload a PDF/TXT resume or click **"Try Demo Analysis"** to see a sample
7. Explore the dashboard, skill analysis, career recommendations, and improvement tips
8. Your analysis is automatically saved to LocalStorage — visit **Analysis History** to review past analyses

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |

---

## Screenshots

> Add your screenshots here:

```
screenshots/
├── landing-page.png
├── dashboard.png
├── resume-analyzer.png
├── skill-analysis.png
├── career-recommendations.png
├── resume-improvement.png
├── career-explorer.png
└── analysis-history.png
```

![Landing Page](screenshots/landing-page.png)
![Dashboard](screenshots/dashboard.png)
![Skill Analysis](screenshots/skill-analysis.png)
![Career Recommendations](screenshots/career-recommendations.png)

---

## Future Enhancements

- **AI-powered analysis**: Integrate with LLM APIs (OpenAI, Gemini) for deeper semantic understanding
- **Resume builder**: Let users create and export resumes directly in the app
- **Job description matching**: Paste a job description and get a tailored match score
- **Skill learning paths**: Link missing skills to specific free courses (Coursera, freeCodeCamp, YouTube)
- **Multiple resume profiles**: Save and compare different resume versions
- **Export analysis report**: Download a PDF summary of the analysis
- **Interview question generation**: Based on detected skills and target role
- **Resume diff comparison**: Compare two resumes and track improvements
- **ATS simulation**: Simulate how ATS parsers read the resume
- **Multi-language support**: Analyze resumes in languages other than English

---

## Limitations

- **Keyword-based detection**: The analysis engine uses keyword matching, not semantic understanding — it may miss skills described indirectly or with uncommon phrasing
- **PDF extraction**: Image-based or scanned PDFs cannot be extracted (no OCR); users must paste text manually in that case
- **English only**: The keyword database and analysis logic are designed for English-language resumes
- **No backend**: Data is stored only in the browser's LocalStorage — clearing browser data erases all history
- **Career roles**: The system covers 9 predefined roles; custom or niche roles are not supported
- **Subjective scoring**: The scoring algorithm uses heuristics and may not align perfectly with recruiter expectations
- **Not a replacement for professional review**: CareerLens is an educational tool, not a substitute for professional career counseling

---

## Conclusion

CareerLens demonstrates how modern web technologies can be used to build a fully functional, production-quality application that runs entirely in the browser. By combining a rule-based analysis engine with a polished SaaS-style UI, it provides students with actionable insights into their resume quality, skill gaps, and career opportunities — all without requiring a backend, API keys, or user accounts.

The project showcases practical applications of React component architecture, TypeScript type safety, Tailwind CSS responsive design, Recharts data visualization, and LocalStorage persistence, making it a comprehensive demonstration of Web Technology concepts.

---

**Built as a Web Technology academic project.**
