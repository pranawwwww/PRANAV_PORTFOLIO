import React, { useMemo, useState } from 'react';
import { skillsData } from '../data/skillsData';

interface SkillCluster {
  title: string;
  description: string;
  skills: string[];
  categories: string[];
  color: string;
  borderColor: string;
}

// Create clusters based on skill overlaps and relationships
const createClusters = (): SkillCluster[] => {
  return [
    {
      title: 'UI & Mobile Test Automation',
      description: 'End-to-end, cross-browser and mobile suites',
      skills: ['Selenium WebDriver', 'Playwright', 'Appium', 'TestNG', 'JUnit', 'Pytest', 'Java', 'Python'],
      categories: ['Test Automation'],
      color: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-300 dark:border-blue-600',
    },
    {
      title: 'API, Data & Load Testing',
      description: 'Contracts, backend data and behavior under load',
      skills: ['Postman', 'REST API Testing', 'SQL', 'MySQL', 'PostgreSQL', 'Locust'],
      categories: ['Test Automation', 'Testing'],
      color: 'from-teal-500/10 to-cyan-500/10',
      borderColor: 'border-teal-300 dark:border-teal-600',
    },
    {
      title: 'AI & LLM Quality',
      description: 'Evals that gate releases and ML that triages failures',
      skills: ['LLM Evals', 'LLM-as-a-Judge', 'RAG Evaluation', 'vLLM', 'ML Failure Triage', 'Scikit-learn', 'PyTorch'],
      categories: ['AI & LLM Testing'],
      color: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-300 dark:border-purple-600',
    },
    {
      title: 'Testing Coverage',
      description: 'The kinds of testing I plan and automate',
      skills: ['Functional', 'System Integration', 'Regression', 'Smoke', 'E2E', 'Cross-Browser', 'Database', 'Mobile', 'Load'],
      categories: ['Testing'],
      color: 'from-fuchsia-500/10 to-pink-500/10',
      borderColor: 'border-fuchsia-300 dark:border-fuchsia-600',
    },
    {
      title: 'QA Process',
      description: 'Test planning, defect tracking and Agile delivery',
      skills: ['Jira', 'Confluence', 'Zephyr', 'TestLink', 'Test Strategy', 'Test Cases', 'Test Data', 'Defect Tracking', 'Agile'],
      categories: ['QA Process'],
      color: 'from-red-500/10 to-orange-500/10',
      borderColor: 'border-red-300 dark:border-red-600',
    },
    {
      title: 'CI/CD & Infrastructure',
      description: 'Where the tests run and gate releases',
      skills: ['Jenkins', 'GitHub Actions', 'Git', 'Docker', 'Kubernetes', 'Linux', 'AWS', 'Splunk', 'Slurm'],
      categories: ['Tools & CI/CD'],
      color: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-300 dark:border-green-600',
    },
  ];
};

// Get icon candidates for a skill
const getIconCandidates = (skill: string): string[] => {
  const s = skill.toLowerCase();
  const cdn = {
    devicon: (name: string, variant: string = 'original') =>
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`,
    iconify: (name: string) => `https://api.iconify.design/${name}.svg`,
    simple: (name: string) => `https://api.iconify.design/simple-icons:${name}.svg`,
  } as const;

  const map: Record<string, string[]> = {
    // Languages
    'python': [cdn.devicon('python')],
    'java': [cdn.devicon('java')],
    'c++': [cdn.devicon('cplusplus')],
    'c': [cdn.devicon('c')],
    'javascript': [cdn.devicon('javascript')],
    'typescript': [cdn.devicon('typescript')],
    'sql': [cdn.iconify('mdi:database'), cdn.devicon('mysql'), cdn.devicon('postgresql', 'plain')],
    'bash': [cdn.devicon('bash')],
    'c#': [cdn.devicon('csharp')],
    '.net': [cdn.devicon('dot-net')],
    'rust': [cdn.devicon('rust')],

    // Backend & Web
    'react': [cdn.devicon('react')],
    'node': [cdn.devicon('nodejs')],
    'fastapi': [cdn.simple('fastapi')],
    'spring boot': [cdn.devicon('spring', 'original')],
    'flask': [cdn.devicon('flask')],
    'microservices': [cdn.iconify('mdi:lan')],
    'rest apis': [cdn.simple('swagger')],

    // AI & ML
    'pytorch': [cdn.devicon('pytorch')],
    'scikit-learn': [cdn.devicon('scikitlearn')],
    'numpy': [cdn.devicon('numpy')],
    'pandas': [cdn.devicon('pandas')],
    'reinforcement learning': ['emoji:🤖'],
    'model evaluation': [cdn.simple('mlflow')],
    'benchmarking': [cdn.iconify('mdi:speedometer')],

    // LLMs & GenAI
    'openai agent sdk': [cdn.simple('openai')],
    'openai api': [cdn.simple('openai')],
    'hugging face': [cdn.simple('huggingface')],
    'retrieval-augmented generation (rag)': [cdn.simple('openai')],
    'pgvector': [cdn.devicon('postgresql', 'plain')],
    'llm-as-a-judge evaluation': [cdn.iconify('mdi:gavel')],
    'prompt engineering': [cdn.iconify('mdi:message-text')],
    'fine-tuning': [cdn.iconify('mdi:tune')],

    // Infrastructure & DevOps
    'git': [cdn.devicon('git')],
    'docker': [cdn.devicon('docker')],
    'helm': [cdn.devicon('helm')],
    'github actions': [cdn.simple('githubactions')],
    'jenkins': [cdn.devicon('jenkins')],
    'ci/cd': [cdn.simple('githubactions')],
    'kubernetes': [cdn.devicon('kubernetes', 'plain')],
    'aws': [cdn.simple('amazonaws')],
    'azure': [cdn.devicon('azure')],
    'splunk': [cdn.simple('splunk')],
    'grafana': [cdn.devicon('grafana')],
    'locust': [cdn.iconify('mdi:chart-line')],
    'slurm': [cdn.iconify('mdi:server-network')],
    'linux': [cdn.devicon('linux')],

    // Test Automation
    'selenium webdriver': [cdn.devicon('selenium')],
    'playwright': [cdn.devicon('playwright'), cdn.iconify('mdi:drama-masks')],
    'appium': [cdn.simple('appium'), cdn.iconify('mdi:cellphone-check')],
    'testng': [cdn.iconify('mdi:test-tube')],
    'junit': [cdn.devicon('junit')],
    'pytest': [cdn.devicon('pytest')],
    'postman': [cdn.devicon('postman')],
    'rest api testing': [cdn.simple('swagger')],

    // Testing
    'functional': [cdn.iconify('mdi:check-circle-outline')],
    'system integration': [cdn.iconify('mdi:puzzle-outline')],
    'regression': [cdn.iconify('mdi:history')],
    'smoke': [cdn.iconify('mdi:smoke-detector')],
    'e2e': [cdn.iconify('mdi:arrow-right-bold-box-outline')],
    'cross-browser': [cdn.iconify('mdi:web')],
    'database': [cdn.iconify('mdi:database-check')],
    'mobile': [cdn.iconify('mdi:cellphone')],
    'load': [cdn.iconify('mdi:speedometer')],

    // QA Process
    'jira': [cdn.devicon('jira')],
    'confluence': [cdn.devicon('confluence')],
    'zephyr': [cdn.iconify('mdi:clipboard-check-outline')],
    'testlink': [cdn.iconify('mdi:clipboard-list-outline')],
    'test strategy': [cdn.iconify('mdi:strategy')],
    'test cases': [cdn.iconify('mdi:format-list-checks')],
    'test data': [cdn.iconify('mdi:table')],
    'defect tracking': [cdn.iconify('mdi:bug-outline')],
    'agile': [cdn.iconify('mdi:sync')],

    // AI & LLM Testing
    'llm evals': [cdn.iconify('mdi:clipboard-text-search-outline')],
    'llm-as-a-judge': [cdn.iconify('mdi:gavel')],
    'rag evaluation': [cdn.iconify('mdi:file-search-outline')],
    'vllm': [cdn.iconify('mdi:chip')],
    'ml failure triage': [cdn.iconify('mdi:sort-variant')],

    // Databases
    'postgresql': [cdn.devicon('postgresql', 'plain')],
    'mysql': [cdn.devicon('mysql')],

    // Systems & Concepts
    'distributed systems': [cdn.iconify('mdi:network')],
  };

  const exact = map[s];
  if (exact) return exact;

  // Fallback heuristics
  if (s.includes('react')) return map['react'];
  if (s.includes('node')) return map['node'];
  if (s.includes('spring')) return map['spring boot'];
  if (s.includes('github')) return map['github actions'];

  return [];
};

const SkillBadge: React.FC<{ skill: string }> = ({ skill }) => {
  const [idx, setIdx] = React.useState(0);
  const candidates = React.useMemo(() => getIconCandidates(skill), [skill]);
  const src = candidates[idx];

  const isEmoji = src?.startsWith('emoji:');
  const emojiChar = isEmoji ? src.split(':')[1] : '';

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all hover:scale-105"
         style={{
           background: 'var(--surface-2)',
           border: '1px solid var(--border)',
           color: 'var(--text)',
         }}
         title={skill}>
      {isEmoji ? (
        <span aria-hidden="true" style={{ fontSize: 14, lineHeight: 1 }}>{emojiChar}</span>
      ) : (
        src && (
          <img
            src={src}
            alt={`${skill} logo`}
            loading="lazy"
            width={16}
            height={16}
            style={{ display: 'inline-block' }}
            onError={() => {
              if (idx < candidates.length - 1) setIdx(idx + 1);
            }}
          />
        )
      )}
      <span>{skill}</span>
    </div>
  );
};

const SkillCard: React.FC<{ cluster: SkillCluster }> = ({ cluster }) => {
  return (
    <div
      className={`p-6 rounded-lg border-2 ${cluster.borderColor} transition-all hover:shadow-lg backdrop-blur-sm flex flex-col`}
      style={{
        background: `linear-gradient(135deg, var(--surface-1) 0%, var(--surface-2) 100%)`,
        borderStyle: 'solid',
        minHeight: '350px',
      }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>
          {cluster.title}
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {cluster.description}
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-wrap gap-2">
          {cluster.skills.map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const SkillsVennDiagram: React.FC = () => {
  const clusters = useMemo(() => createClusters(), []);

  return (
    <div className="w-full">
      {/* <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
          Skill Groups
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Skills organized by domain and expertise area.
        </p>
      </div> */}

      {/* Cards Grid - 3x3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {clusters.map((cluster, idx) => (
          <SkillCard key={idx} cluster={cluster} />
        ))}
      </div>
    </div>
  );
};

export default SkillsVennDiagram;
