export type Page =
  | 'landing'
  | 'dashboard'
  | 'analyzer'
  | 'skills'
  | 'careers'
  | 'improvement'
  | 'explorer'
  | 'history'
  | 'settings';

export interface Skill {
  name: string;
  category: SkillCategory;
}

export type SkillCategory =
  | 'Programming Languages'
  | 'Web Technologies'
  | 'Databases'
  | 'AI / Machine Learning'
  | 'Cloud'
  | 'DevOps'
  | 'Data Analytics'
  | 'Tools'
  | 'Soft Skills';

export interface SkillCategoryInfo {
  label: SkillCategory;
  icon: string;
  color: string;
  keywords: string[];
}

export interface CareerRole {
  id: string;
  title: string;
  icon: string;
  description: string;
  requiredSkills: string[];
  technologies: string[];
  roadmap: string[];
  category: string;
}

export interface CareerMatch {
  role: CareerRole;
  matchPercent: number;
  matchingSkills: string[];
  missingSkills: string[];
}

export interface ScoreBreakdown {
  technicalSkills: number;
  softSkills: number;
  education: number;
  projects: number;
  experience: number;
  certifications: number;
  resumeStructure: number;
  keywordRelevance: number;
}

export interface MissingSkill {
  skill: string;
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
  learningDirection: string;
}

export interface ImprovementSuggestion {
  type: 'missing_section' | 'weak_area' | 'keyword' | 'formatting' | 'project' | 'action_verb' | 'ats_tip';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ResumeAnalysis {
  id: string;
  date: string;
  rawText: string;
  detectedSkills: Skill[];
  overallScore: number;
  scoreBreakdown: ScoreBreakdown;
  careerMatches: CareerMatch[];
  missingSkills: MissingSkill[];
  improvements: ImprovementSuggestion[];
  skillCount: number;
  topCareer: string;
}

export interface AnalysisSummary {
  id: string;
  date: string;
  overallScore: number;
  topCareer: string;
  skillCount: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}
