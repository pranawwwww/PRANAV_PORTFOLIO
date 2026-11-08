import { SkillCategory } from '../types';

// Only skills that are on the resume and safe to be quizzed on. No duplicates across groups.
export const skillsData: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['Java', 'Python', 'TypeScript', 'SQL', 'Kotlin'],
  },
  {
    category: 'Backend & Web',
    skills: ['Spring Boot', 'FastAPI', 'React', 'Next.js', 'REST APIs', 'OAuth 2.0 / JWT', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'AI & LLMs',
    skills: [
      'AI agents & tool calling',
      'MCP',
      'LangGraph',
      'RAG (hybrid search, reranking)',
      'LLM evals / LLM-as-judge',
      'Guardrails',
      'vLLM',
      'QLoRA fine-tuning',
      'PyTorch',
      'scikit-learn',
    ],
  },
  {
    category: 'Cloud & Infra',
    skills: ['Docker', 'Kubernetes', 'Terraform', 'Azure', 'AWS', 'CI/CD (GitHub Actions, Jenkins)', 'Slurm', 'Linux'],
  },
  {
    category: 'Testing & Tools',
    skills: ['Pytest', 'Playwright', 'Selenium', 'Locust', 'Splunk', 'Claude Code', 'GitHub Copilot', 'Cursor'],
  },
];
