import type {
  CareerMatch,
  CareerRole,
  MissingSkill,
  ResumeAnalysis,
  ScoreBreakdown,
  Skill,
  ImprovementSuggestion,
} from '@/types';
import { SKILL_CATEGORIES, findSkillCategory } from '@/data/skills';
import { CAREER_ROLES } from '@/data/careers';

const RESUME_SECTIONS = [
  { name: 'summary', patterns: [/summary|objective|profile|about me/i] },
  { name: 'education', patterns: [/education|bachelor|master|b\.?sc|m\.?sc|b\.?tech|m\.?tech|degree|university|college|gpa/i] },
  { name: 'experience', patterns: [/experience|work history|employment|intern|internship|worked at/i] },
  { name: 'projects', patterns: [/projects|project|portfolio|built|developed|created/i] },
  { name: 'skills', patterns: [/skills|technical skills|technologies|competencies|proficiencies/i] },
  { name: 'certifications', patterns: [/certification|certificate|certified|licensed/i] },
  { name: 'contact', patterns: [/email|phone|linkedin|github|contact/i] },
];

function normalize(text: string): string {
  return text.toLowerCase();
}

export function detectSkills(text: string): Skill[] {
  const lower = normalize(text);
  const found = new Map<string, Skill>();

  for (const cat of SKILL_CATEGORIES) {
    for (const keyword of cat.keywords) {
      const kwLower = keyword.toLowerCase();
      // Use word boundary for short keywords, substring for longer ones
      let isMatch: boolean;
      if (kwLower.length <= 3) {
        const re = new RegExp(`(^|[^a-z])${escapeRegex(kwLower)}([^a-z]|$)`, 'i');
        isMatch = re.test(lower);
      } else {
        isMatch = lower.includes(kwLower);
      }
      if (isMatch && !found.has(kwLower)) {
        found.set(kwLower, { name: capitalize(keyword), category: cat.label });
      }
    }
  }

  return Array.from(found.values());
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function capitalize(s: string): string {
  if (s.length <= 3) return s.toUpperCase();
  // Handle special cases
  const special: Record<string, string> = {
    'node.js': 'Node.js',
    'next.js': 'Next.js',
    'nuxt': 'Nuxt',
    'rest api': 'REST API',
    'restful api': 'RESTful API',
    'ci/cd': 'CI/CD',
    'ci cd': 'CI/CD',
    'ui/ux': 'UI/UX',
    'a/b testing': 'A/B Testing',
    'power bi': 'Power BI',
    'machine learning': 'Machine Learning',
    'deep learning': 'Deep Learning',
    'prompt engineering': 'Prompt Engineering',
    'vector database': 'Vector Database',
    'generative ai': 'Generative AI',
    'natural language processing': 'Natural Language Processing',
    'data structures': 'Data Structures',
    'self-motivated': 'Self-Motivated',
    'problem solving': 'Problem Solving',
    'problem-solving': 'Problem Solving',
    'team work': 'Teamwork',
    'cross-functional': 'Cross-Functional',
    'cross functional': 'Cross-Functional',
    'time management': 'Time Management',
    'critical thinking': 'Critical Thinking',
    'decision making': 'Decision Making',
    'decision-making': 'Decision Making',
    'conflict resolution': 'Conflict Resolution',
    'attention to detail': 'Attention to Detail',
    'emotional intelligence': 'Emotional Intelligence',
    'active listening': 'Active Listening',
    'work ethic': 'Work Ethic',
    'data analysis': 'Data Analysis',
    'data analytics': 'Data Analytics',
    'data cleaning': 'Data Cleaning',
    'data wrangling': 'Data Wrangling',
    'data visualization': 'Data Visualization',
    'data mining': 'Data Mining',
    'data modeling': 'Data Modeling',
    'data warehouse': 'Data Warehouse',
    'data lake': 'Data Lake',
    'data pipeline': 'Data Pipeline',
    'statistical analysis': 'Statistical Analysis',
    'shell scripting': 'Shell Scripting',
    'responsive design': 'Responsive Design',
    'neural networks': 'Neural Networks',
    'neural network': 'Neural Network',
    'reinforcement learning': 'Reinforcement Learning',
    'model training': 'Model Training',
    'model deployment': 'Model Deployment',
    'fine-tuning': 'Fine-Tuning',
    'fine tuning': 'Fine-Tuning',
    'large language model': 'Large Language Model',
    'retrieval augmented generation': 'Retrieval Augmented Generation',
    'amazon web services': 'Amazon Web Services',
    'microsoft azure': 'Microsoft Azure',
    'google cloud': 'Google Cloud',
    'google cloud platform': 'Google Cloud Platform',
    'google analytics': 'Google Analytics',
    'google developer': 'Google Developer',
    'hugging face': 'Hugging Face',
    'spring boot': 'Spring Boot',
    'asp.net': 'ASP.NET',
    'asp net': 'ASP.NET',
    'visual studio': 'Visual Studio',
    'vs code': 'VS Code',
    'unit testing': 'Unit Testing',
    'testing library': 'Testing Library',
    'agile': 'Agile',
    'scrum': 'Scrum',
    'kanban': 'Kanban',
    'docker compose': 'Docker Compose',
    'docker-compose': 'Docker Compose',
    'github actions': 'GitHub Actions',
    'gitlab ci': 'GitLab CI',
    'argo cd': 'Argo CD',
  };
  if (special[s.toLowerCase()]) return special[s.toLowerCase()];
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function calculateScoreBreakdown(
  text: string,
  detectedSkills: Skill[],
): ScoreBreakdown {
  const lower = normalize(text);
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const detectedNames = detectedSkills.map((s) => s.name.toLowerCase());

  const hasSection = (sectionPatterns: RegExp[]): boolean =>
    sectionPatterns.some((p) => p.test(lower));

  // Technical Skills: based on count and diversity
  const techSkills = detectedSkills.filter((s) => s.category !== 'Soft Skills');
  const techScore = Math.min(100, techSkills.length * 7);

  // Soft Skills
  const softSkills = detectedSkills.filter((s) => s.category === 'Soft Skills');
  const softScore = Math.min(100, softSkills.length * 20);

  // Education
  const hasEducation = hasSection(RESUME_SECTIONS[1].patterns);
  const eduKeywords = ['bachelor', 'master', 'degree', 'university', 'college', 'gpa', 'b.sc', 'm.sc', 'b.tech', 'm.tech', 'phd'];
  const eduMatches = eduKeywords.filter((k) => lower.includes(k)).length;
  const eduScore = Math.min(100, (hasEducation ? 50 : 0) + eduMatches * 15);

  // Projects
  const projectKeywords = ['project', 'built', 'developed', 'created', 'deployed', 'implemented', 'designed'];
  const projectMatches = projectKeywords.filter((k) => lower.includes(k)).length;
  const hasProjectsSection = hasSection(RESUME_SECTIONS[3].patterns);
  const projScore = Math.min(100, (hasProjectsSection ? 40 : 0) + projectMatches * 15);

  // Experience
  const expKeywords = ['experience', 'intern', 'internship', 'worked', 'employee', 'junior', 'senior', 'developer at', 'engineer at'];
  const expMatches = expKeywords.filter((k) => lower.includes(k)).length;
  const hasExpSection = hasSection(RESUME_SECTIONS[2].patterns);
  const expScore = Math.min(100, (hasExpSection ? 50 : 0) + expMatches * 12);

  // Certifications
  const certKeywords = ['certification', 'certificate', 'certified', 'licensed'];
  const certMatches = certKeywords.filter((k) => lower.includes(k)).length;
  const certScore = Math.min(100, certMatches * 30);

  // Resume Structure
  const sectionCount = RESUME_SECTIONS.filter((s) => hasSection(s.patterns)).length;
  const structureScore = Math.min(100, (sectionCount / RESUME_SECTIONS.length) * 100);

  // Keyword Relevance
  const roleKeywords = CAREER_ROLES.flatMap((r) => r.requiredSkills).map((s) => s.toLowerCase());
  const uniqueRoleKeywords = Array.from(new Set(roleKeywords));
  const matchedKeywords = uniqueRoleKeywords.filter((k) =>
    detectedNames.some((d) => d.includes(k) || k.includes(d)),
  );
  const keywordScore = Math.min(100, (matchedKeywords.length / uniqueRoleKeywords.length) * 100 * 2.5);

  return {
    technicalSkills: roundScore(techScore),
    softSkills: roundScore(softScore),
    education: roundScore(eduScore),
    projects: roundScore(projScore),
    experience: roundScore(expScore),
    certifications: roundScore(certScore),
    resumeStructure: roundScore(structureScore),
    keywordRelevance: roundScore(keywordScore),
  };
}

function roundScore(n: number): number {
  return Math.round(Math.max(0, Math.min(100, n)));
}

export function calculateOverallScore(breakdown: ScoreBreakdown): number {
  const weights = {
    technicalSkills: 0.25,
    softSkills: 0.10,
    education: 0.10,
    projects: 0.15,
    experience: 0.15,
    certifications: 0.05,
    resumeStructure: 0.10,
    keywordRelevance: 0.10,
  };

  const total =
    breakdown.technicalSkills * weights.technicalSkills +
    breakdown.softSkills * weights.softSkills +
    breakdown.education * weights.education +
    breakdown.projects * weights.projects +
    breakdown.experience * weights.experience +
    breakdown.certifications * weights.certifications +
    breakdown.resumeStructure * weights.resumeStructure +
    breakdown.keywordRelevance * weights.keywordRelevance;

  return roundScore(total);
}

export function matchCareers(detectedSkills: Skill[]): CareerMatch[] {
  const detectedNames = detectedSkills.map((s) => s.name.toLowerCase());
  const techDetected = detectedSkills
    .filter((s) => s.category !== 'Soft Skills')
    .map((s) => s.name.toLowerCase());

  const matches: CareerMatch[] = CAREER_ROLES.map((role) => {
    const requiredLower = role.requiredSkills.map((s) => s.toLowerCase());
    const matching = role.requiredSkills.filter((req) =>
      detectedNames.some(
        (d) => d.includes(req) || req.includes(d) || keywordMatch(d, req),
      ),
    );
    const missing = role.requiredSkills.filter(
      (req) =>
        !detectedNames.some(
          (d) => d.includes(req) || req.includes(d) || keywordMatch(d, req),
        ),
    );
    const matchPercent = Math.round((matching.length / role.requiredSkills.length) * 100);
    return {
      role,
      matchPercent,
      matchingSkills: matching,
      missingSkills: missing,
    };
  });

  matches.sort((a, b) => b.matchPercent - a.matchPercent);
  return matches;
}

function keywordMatch(detected: string, required: string): boolean {
  const synonyms: Record<string, string[]> = {
    'node.js': ['nodejs', 'node'],
    'next.js': ['nextjs', 'next'],
    'ci/cd': ['cicd', 'ci cd', 'continuous integration', 'continuous deployment'],
    'ui/ux': ['ui', 'ux', 'user interface', 'user experience'],
    'rest api': ['rest', 'restful', 'api'],
    'machine learning': ['ml'],
    'deep learning': ['dl'],
    'natural language processing': ['nlp'],
    'large language model': ['llm'],
    'vector database': ['vector db', 'vector'],
    'power bi': ['powerbi'],
    'a/b testing': ['a b testing', 'ab testing'],
  };
  const syns = synonyms[required] || [];
  return syns.some((s) => detected.includes(s));
}

export function findMissingSkills(
  detectedSkills: Skill[],
  careerMatches: CareerMatch[],
): MissingSkill[] {
  const detectedNames = detectedSkills.map((s) => s.name.toLowerCase());
  const topRoles = careerMatches.slice(0, 3);

  const missingMap = new Map<string, MissingSkill>();
  const skillFrequency = new Map<string, number>();

  for (const match of topRoles) {
    for (const missing of match.missingSkills) {
      const key = missing.toLowerCase();
      skillFrequency.set(key, (skillFrequency.get(key) || 0) + 1);
    }
  }

  for (const match of topRoles) {
    for (const missing of match.missingSkills) {
      const key = missing.toLowerCase();
      if (missingMap.has(key)) continue;

      const freq = skillFrequency.get(key) || 0;
      const priority: 'High' | 'Medium' | 'Low' =
        freq >= 3 ? 'High' : freq >= 2 ? 'Medium' : 'Low';

      missingMap.set(key, {
        skill: missing,
        priority,
        reason: getSkillReason(missing, match.role.title),
        learningDirection: getLearningDirection(missing),
      });
    }
  }

  const result = Array.from(missingMap.values());
  result.sort((a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 };
    return order[a.priority] - order[b.priority];
  });

  return result;
}

function getSkillReason(skill: string, role: string): string {
  return `"${skill}" is a core requirement for ${role} roles and frequently appears in job descriptions and interview questions.`;
}

function getLearningDirection(skill: string): string {
  const directions: Record<string, string> = {
    'Java': 'Start with Java fundamentals, then OOP concepts, collections, and multithreading. Build small CLI projects.',
    'C++': 'Learn syntax, pointers, memory management, then STL. Practice on LeetCode with C++.',
    'OOP': 'Study the four pillars: encapsulation, inheritance, polymorphism, abstraction. Apply in any OOP language.',
    'Data Structures': 'Learn arrays, linked lists, trees, graphs, hash tables. Practice implementations from scratch.',
    'Algorithms': 'Study sorting, searching, recursion, DP, greedy algorithms. Practice on LeetCode/HackerRank.',
    'TypeScript': 'Start with TypeScript docs, learn types, interfaces, generics. Migrate a JS project to TS.',
    'Tailwind': 'Follow the official Tailwind CSS tutorial. Build a landing page using utility classes.',
    'UI/UX': 'Read "Don\'t Make Me Think" by Steve Krug. Learn Figma basics. Study design systems.',
    'Node.js': 'Learn Node.js fundamentals, Express framework, and build a REST API. Follow the official docs.',
    'Spring Boot': 'Start with Spring Boot guides. Build a REST API with JPA and PostgreSQL.',
    'REST API': 'Understand HTTP methods, status codes, and REST principles. Build APIs with Express or FastAPI.',
    'MongoDB': 'Complete MongoDB University free courses. Build a CRUD app with Node.js and Mongoose.',
    'Machine Learning': 'Take Andrew Ng\'s ML course on Coursera. Practice with scikit-learn on Kaggle.',
    'Deep Learning': 'Study neural networks with DeepLearning.AI. Build projects with TensorFlow or PyTorch.',
    'TensorFlow': 'Follow TensorFlow tutorials. Build image classification and text models.',
    'PyTorch': 'Start with PyTorch tutorials. Build a simple neural network for MNIST.',
    'NLP': 'Study NLP with NLTK and spaCy. Build a sentiment analysis model.',
    'Pandas': 'Follow the Pandas cookbook. Practice data manipulation on Kaggle datasets.',
    'NumPy': 'Learn NumPy arrays, indexing, and operations. Practice with data science exercises.',
    'LLM': 'Study Transformer architecture. Experiment with Hugging Face models and APIs.',
    'RAG': 'Learn about embeddings, vector databases, and retrieval. Build a RAG pipeline with LangChain.',
    'Prompt Engineering': 'Study prompt patterns and techniques. Practice with OpenAI API and LangChain.',
    'Transformers': 'Read "Attention Is All You Need". Use Hugging Face Transformers library.',
    'Embeddings': 'Learn about word and sentence embeddings. Use OpenAI or sentence-transformers.',
    'Vector Database': 'Try Pinecone or Chroma. Build a semantic search application.',
    'Excel': 'Master formulas, pivot tables, VLOOKUP, and data analysis features.',
    'Power BI': 'Complete Microsoft Learn Power BI path. Build interactive dashboards.',
    'Tableau': 'Follow Tableau Public tutorials. Create visualizations with sample datasets.',
    'Statistics': 'Study descriptive and inferential statistics. Take a Khan Academy statistics course.',
    'AWS': 'Start with AWS Certified Cloud Practitioner. Learn EC2, S3, IAM, and Lambda.',
    'Azure': 'Complete Microsoft Learn Azure fundamentals. Explore App Service and Azure Functions.',
    'GCP': 'Learn GCP core services. Complete Google Cloud training paths.',
    'Kubernetes': 'Follow Kubernetes official tutorials. Deploy a Dockerized app to a local cluster.',
    'Linux': 'Learn command line, file permissions, processes. Practice on a Linux VM.',
    'CI/CD': 'Set up GitHub Actions or Jenkins pipelines. Automate testing and deployment.',
    'Jenkins': 'Install Jenkins, create pipeline jobs. Integrate with Git and Docker.',
    'Terraform': 'Follow Terraform tutorials. Provision AWS resources with IaC.',
    'Git': 'Learn Git basics, branching, merging. Practice collaborative workflows on GitHub.',
  };
  return directions[skill] || `Search for beginner tutorials on "${skill}". Build a small project to practice. Check free resources on YouTube, freeCodeCamp, or official documentation.`;
}

export function generateImprovements(
  text: string,
  detectedSkills: Skill[],
  scoreBreakdown: ScoreBreakdown,
  missingSkills: MissingSkill[],
): ImprovementSuggestion[] {
  const lower = normalize(text);
  const suggestions: ImprovementSuggestion[] = [];
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // Missing sections
  for (const section of RESUME_SECTIONS) {
    const has = section.patterns.some((p) => p.test(lower));
    if (!has && section.name !== 'contact') {
      suggestions.push({
        type: 'missing_section',
        title: `Add a ${section.name.charAt(0).toUpperCase() + section.name.slice(1)} section`,
        description: `Your resume doesn't appear to have a dedicated ${section.name} section. Adding one will improve your resume structure score and make it easier for recruiters to assess you.`,
        severity: section.name === 'experience' || section.name === 'education' ? 'high' : 'medium',
      });
    }
  }

  // Weak areas
  const weakCategories = Object.entries(scoreBreakdown)
    .filter(([, score]) => score < 50)
    .sort(([, a], [, b]) => a - b);

  for (const [cat, score] of weakCategories.slice(0, 3)) {
    suggestions.push({
      type: 'weak_area',
      title: `Improve your ${formatCategoryName(cat)} score (currently ${score}/100)`,
      description: getWeakAreaDescription(cat, score),
      severity: score < 30 ? 'high' : 'medium',
    });
  }

  // Keyword suggestions
  const highMissing = missingSkills.filter((m) => m.priority === 'High').slice(0, 3);
  if (highMissing.length > 0) {
    suggestions.push({
      type: 'keyword',
      title: 'Add high-priority missing keywords',
      description: `Consider adding or demonstrating experience with: ${highMissing.map((m) => m.skill).join(', ')}. These are frequently required for your top-matched career roles.`,
      severity: 'high',
    });
  }

  // Formatting suggestions
  if (wordCount < 200) {
    suggestions.push({
      type: 'formatting',
      title: 'Your resume seems too short',
      description: 'A good resume typically has 300-600 words. Add more detail to your projects, experience, and skills sections.',
      severity: 'high',
    });
  } else if (wordCount > 800) {
    suggestions.push({
      type: 'formatting',
      title: 'Your resume may be too long',
      description: 'Consider condensing to 1-2 pages (300-600 words for students). Remove older or less relevant content.',
      severity: 'medium',
    });
  }

  if (!/^\s*[A-Z]/m.test(text)) {
    suggestions.push({
      type: 'formatting',
      title: 'Use consistent capitalization',
      description: 'Start bullet points and section headers with capital letters for a professional appearance.',
      severity: 'low',
    });
  }

  // Action verb suggestions
  const actionVerbs = ['developed', 'built', 'created', 'implemented', 'designed', 'led', 'managed', 'optimized', 'deployed', 'achieved', 'improved', 'launched'];
  const usedActionVerbs = actionVerbs.filter((v) => lower.includes(v));
  if (usedActionVerbs.length < 3) {
    suggestions.push({
      type: 'action_verb',
      title: 'Use more strong action verbs',
      description: `Start bullet points with impactful action verbs like: Developed, Built, Implemented, Designed, Optimized, Achieved, Led. You currently use ${usedActionVerbs.length} of these.`,
      severity: 'medium',
    });
  }

  // Project suggestions
  if (scoreBreakdown.projects < 60) {
    suggestions.push({
      type: 'project',
      title: 'Add more detailed project descriptions',
      description: 'For each project, include: the problem it solves, technologies used, your specific role, and measurable outcomes (e.g., "reduced load time by 40%").',
      severity: 'medium',
    });
  }

  // ATS tips
  suggestions.push({
    type: 'ats_tip',
    title: 'Use ATS-friendly formatting',
    description: 'Avoid tables, columns, graphics, and unusual fonts. Use standard section headings. Save as PDF or DOCX. Use keywords from job descriptions naturally.',
    severity: 'low',
  });

  suggestions.push({
    type: 'ats_tip',
    title: 'Quantify your achievements',
    description: 'Add numbers wherever possible: "Served 1000+ users", "Improved performance by 30%", "Led a team of 5". Quantified results are more impactful.',
    severity: 'low',
  });

  return suggestions;
}

function formatCategoryName(key: string): string {
  const names: Record<string, string> = {
    technicalSkills: 'Technical Skills',
    softSkills: 'Soft Skills',
    education: 'Education',
    projects: 'Projects',
    experience: 'Experience',
    certifications: 'Certifications',
    resumeStructure: 'Resume Structure',
    keywordRelevance: 'Keyword Relevance',
  };
  return names[key] || key;
}

function getWeakAreaDescription(cat: string, score: number): string {
  const descriptions: Record<string, string> = {
    technicalSkills: 'Add more technical skills relevant to your target roles. List specific languages, frameworks, and tools you know.',
    softSkills: 'Mention soft skills like communication, teamwork, leadership in context — e.g., "Led a team of 4 students" rather than just listing them.',
    education: 'Add your degree, institution, GPA (if 3.0+), relevant coursework, and expected graduation date.',
    projects: 'Add 2-3 projects with descriptions of what you built, technologies used, and outcomes achieved.',
    experience: 'Add internships, part-time jobs, or relevant work experience with bullet points describing your contributions.',
    certifications: 'Add online certifications from Coursera, AWS, Google, Microsoft, etc. Even free certificates add value.',
    resumeStructure: 'Use clear section headings: Summary, Education, Skills, Projects, Experience, Certifications. Keep formatting consistent.',
    keywordRelevance: 'Include keywords from job descriptions for your target roles. Review postings and naturally incorporate relevant terms.',
  };
  return descriptions[cat] || `This area scored ${score}/100. Look for ways to strengthen it.`;
}

export function analyzeResume(text: string): ResumeAnalysis {
  const detectedSkills = detectSkills(text);
  const scoreBreakdown = calculateScoreBreakdown(text, detectedSkills);
  const overallScore = calculateOverallScore(scoreBreakdown);
  const careerMatches = matchCareers(detectedSkills);
  const missingSkillsList = findMissingSkills(detectedSkills, careerMatches);
  const improvements = generateImprovements(text, detectedSkills, scoreBreakdown, missingSkillsList);

  return {
    id: generateId(),
    date: new Date().toISOString(),
    rawText: text,
    detectedSkills,
    overallScore,
    scoreBreakdown,
    careerMatches,
    missingSkills: missingSkillsList,
    improvements,
    skillCount: detectedSkills.length,
    topCareer: careerMatches[0]?.role.title || 'No match',
  };
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
