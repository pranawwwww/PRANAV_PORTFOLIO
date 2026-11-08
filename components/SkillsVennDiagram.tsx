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
      title: 'Backend & Web Development',
      description: 'Full-stack technologies for building scalable applications',
      skills: ['Python', 'Java', 'TypeScript', 'FastAPI', 'Spring Boot', 'Flask', 'React', 'REST APIs', 'Microservices', 'PostgreSQL'],
      categories: ['Languages', 'Backend & Web'],
      color: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-300 dark:border-blue-600',
    },
    {
      title: 'LLMs & GenAI Engineering',
      description: 'Building and evaluating production LLM systems',
      skills: ['OpenAI Agent SDK', 'OpenAI API', 'Hugging Face', 'Retrieval-Augmented Generation (RAG)', 'pgvector', 'LLM-as-a-Judge Evaluation', 'Prompt Engineering', 'Fine-Tuning'],
      categories: ['LLMs & GenAI'],
      color: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-300 dark:border-purple-600',
    },
    {
      title: 'Machine Learning & AI',
      description: 'Model training, evaluation, and research',
      skills: ['PyTorch', 'Scikit-learn', 'NumPy', 'Pandas', 'Reinforcement Learning', 'Model Evaluation', 'Benchmarking'],
      categories: ['AI & ML'],
      color: 'from-fuchsia-500/10 to-pink-500/10',
      borderColor: 'border-fuchsia-300 dark:border-fuchsia-600',
    },
    {
      title: 'Systems Languages',
      description: 'Statically-typed and systems programming languages',
      skills: ['C++', 'C', 'C#', 'Rust', 'Java', 'SQL'],
      categories: ['Languages'],
      color: 'from-red-500/10 to-orange-500/10',
      borderColor: 'border-red-300 dark:border-red-600',
    },
    {
      title: 'Infrastructure & DevOps',
      description: 'CI/CD, containerization, and cloud platforms',
      skills: ['Docker', 'Kubernetes', 'Helm', 'Jenkins', 'GitHub Actions', 'CI/CD', 'AWS', 'Azure', 'Linux'],
      categories: ['Infrastructure & DevOps'],
      color: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-300 dark:border-green-600',
    },
    {
      title: 'Observability & Load Testing',
      description: 'Production monitoring, alerting, and performance validation',
      skills: ['Splunk', 'Grafana', 'Locust', 'CI/CD'],
      categories: ['Infrastructure & DevOps'],
      color: 'from-teal-500/10 to-cyan-500/10',
      borderColor: 'border-teal-300 dark:border-teal-600',
    },
    {
      title: 'Distributed & Research Computing',
      description: 'Large-scale batch experimentation and distributed systems',
      skills: ['Slurm', 'Distributed Systems', 'Microservices', 'Reinforcement Learning', 'Benchmarking'],
      categories: ['Infrastructure & DevOps', 'AI & ML'],
      color: 'from-indigo-500/10 to-blue-500/10',
      borderColor: 'border-indigo-300 dark:border-indigo-600',
    },
    {
      title: 'Databases',
      description: 'Relational and vector data storage',
      skills: ['PostgreSQL', 'pgvector', 'SQL'],
      categories: ['Infrastructure & DevOps', 'LLMs & GenAI'],
      color: 'from-violet-500/10 to-purple-500/10',
      borderColor: 'border-violet-300 dark:border-violet-600',
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

    // Databases
    'postgresql': [cdn.devicon('postgresql', 'plain')],

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
