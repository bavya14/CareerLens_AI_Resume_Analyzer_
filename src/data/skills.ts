import type { SkillCategory, SkillCategoryInfo } from '@/types';

export const SKILL_CATEGORIES: SkillCategoryInfo[] = [
  {
    label: 'Programming Languages',
    icon: 'Code2',
    color: '#3b82f6',
    keywords: [
      'java', 'javascript', 'typescript', 'python', 'c++', 'c#', 'c language', 'go',
      'rust', 'ruby', 'php', 'swift', 'kotlin', 'scala', 'r programming', 'r language',
      'matlab', 'perl', 'dart', 'objective-c', 'assembly', 'lua', 'haskell', 'elixir',
    ],
  },
  {
    label: 'Web Technologies',
    icon: 'Globe',
    color: '#06b6d4',
    keywords: [
      'html', 'css', 'react', 'angular', 'vue', 'vue.js', 'next.js', 'nextjs', 'nuxt',
      'svelte', 'sveltekit', 'tailwind', 'tailwind css', 'bootstrap', 'jquery',
      'sass', 'scss', 'less', 'redux', 'graphql', 'rest api', 'restful api', 'soap',
      'websockets', 'express', 'express.js', 'django', 'flask', 'fastapi', 'spring boot',
      'spring', 'laravel', 'asp.net', 'asp net', 'node.js', 'nodejs', 'dotnet', '.net',
      'webpack', 'vite', 'ajax', 'json', 'xml', 'html5', 'css3', 'responsive design',
      'websockets', 'pwa', 'web components', 'htmx', 'alpine.js',
    ],
  },
  {
    label: 'Databases',
    icon: 'Database',
    color: '#f97316',
    keywords: [
      'sql', 'mysql', 'postgresql', 'postgres', 'sqlite', 'mongodb', 'mongo',
      'redis', 'cassandra', 'dynamodb', 'oracle', 'sql server', 'mssql', 'mariadb',
      'elasticsearch', 'firebase', 'firestore', 'supabase', 'neo4j', 'couchdb',
      'couchbase', 'influxdb', 'snowflake', 'bigquery', 'hbase', 'couchdb',
    ],
  },
  {
    label: 'AI / Machine Learning',
    icon: 'BrainCircuit',
    color: '#8b5cf6',
    keywords: [
      'machine learning', 'ml', 'deep learning', 'neural networks', 'neural network',
      'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'sklearn', 'nlp',
      'natural language processing', 'computer vision', 'opencv', 'transformers',
      'hugging face', 'huggingface', 'llm', 'large language model', 'rag',
      'retrieval augmented generation', 'prompt engineering', 'generative ai',
      'genai', 'openai', 'langchain', 'llamaindex', 'embeddings', 'vector database',
      'vector db', 'pinecone', 'chroma', 'weaviate', 'qdrant', 'gpt', 'bert',
      'reinforcement learning', 'gan', 'cnn', 'rnn', 'lstm', 'fine-tuning',
      'fine tuning', 'model training', 'model deployment', 'autogpt',
    ],
  },
  {
    label: 'Cloud',
    icon: 'Cloud',
    color: '#0ea5e9',
    keywords: [
      'aws', 'amazon web services', 'azure', 'microsoft azure', 'gcp',
      'google cloud', 'google cloud platform', 'docker', 'kubernetes', 'k8s',
      'lambda', 'ec2', 's3', 'ecs', 'eks', 'fargate', 'azure functions',
      'google cloud functions', 'cloudformation', 'cloudwatch', 'iam',
      'vpc', 'load balancer', 'cdn', 'serverless', 'paas', 'iaas', 'saas',
    ],
  },
  {
    label: 'DevOps',
    icon: 'GitBranch',
    color: '#ec4899',
    keywords: [
      'git', 'github', 'gitlab', 'bitbucket', 'ci/cd', 'ci cd', 'cicd',
      'jenkins', 'github actions', 'gitlab ci', 'circleci', 'terraform',
      'ansible', 'puppet', 'chef', 'argo cd', 'argocd', 'helm', 'prometheus',
      'grafana', 'datadog', 'nginx', 'apache', 'linux', 'bash', 'shell scripting',
      'powershell', 'vagrant', 'pulumi', 'docker compose', 'docker-compose',
    ],
  },
  {
    label: 'Data Analytics',
    icon: 'BarChart3',
    color: '#10b981',
    keywords: [
      'excel', 'power bi', 'powerbi', 'tableau', 'looker', 'qlik', 'qlikview',
      'qlik sense', 'data visualization', 'data analysis', 'data analytics',
      'data cleaning', 'data wrangling', 'etl', 'data pipeline', 'data mining',
      'statistical analysis', 'statistics', 'a/b testing', 'a b testing',
      'google analytics', 'reporting', 'dashboards', 'kpi', 'data modeling',
      'data warehouse', 'data lake', 'hadoop', 'spark', 'apache spark',
      'airflow', 'dbt', 'pandas', 'numpy', 'scipy', 'matplotlib', 'seaborn',
      'plotly', 'jupyter', 'jupyter notebook', 'r programming', 'r language',
      'sas', 'spss', 'stata',
    ],
  },
  {
    label: 'Tools',
    icon: 'Wrench',
    color: '#f59e0b',
    keywords: [
      'git', 'github', 'gitlab', 'jira', 'confluence', 'trello', 'asana',
      'slack', 'notion', 'figma', 'adobe xd', 'sketch', 'postman', 'insomnia',
      'swagger', 'openapi', 'visual studio', 'vs code', 'intellij', 'eclipse',
      'vim', 'docker', 'vagrant', 'xcode', 'android studio', 'chrome devtools',
      'webpack', 'vite', 'babel', 'eslint', 'prettier', 'jest', 'vitest',
      'cypress', 'selenium', 'playwright', 'junit', 'pytest', 'unittest',
      'mocha', 'chai', 'testing library', 'karma', 'sonarqube',
    ],
  },
  {
    label: 'Soft Skills',
    icon: 'Users',
    color: '#a78bfa',
    keywords: [
      'communication', 'teamwork', 'team work', 'collaboration', 'leadership',
      'problem solving', 'problem-solving', 'critical thinking', 'analytical',
      'time management', 'adaptability', 'flexibility', 'creativity',
      'presentation', 'public speaking', 'negotiation', 'interpersonal',
      'organization', 'organizational', 'self-motivated', 'self motivated',
      'self-motivation', 'attention to detail', 'decision making',
      'decision-making', 'conflict resolution', 'mentoring', 'mentorship',
      'project management', 'agile', 'scrum', 'kanban', 'cross-functional',
      'cross functional', 'stakeholder management', 'work ethic',
      'multitasking', 'emotional intelligence', 'active listening',
    ],
  },
];

export const ALL_SKILL_KEYWORDS: string[] = SKILL_CATEGORIES.flatMap(
  (c) => c.keywords,
);

export function findSkillCategory(keyword: string): SkillCategory | null {
  const lower = keyword.toLowerCase().trim();
  for (const cat of SKILL_CATEGORIES) {
    if (cat.keywords.some((k) => k.toLowerCase() === lower)) {
      return cat.label;
    }
  }
  return null;
}
