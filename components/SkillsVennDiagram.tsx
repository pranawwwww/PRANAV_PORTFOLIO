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
      title: 'Web & Backend Development',
      description: 'Full-stack technologies for building scalable applications',
      skills: ['JavaScript', 'TypeScript', 'React', 'Node', 'PostgreSQL', 'REST APIs', 'Docker'],
      categories: ['Languages', 'Frameworks & Libraries', 'Databases', 'Systems & Concepts', 'Tools & Platforms'],
      color: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-300 dark:border-blue-600',
    },
    {
      title: 'Python Ecosystem',
      description: 'Data science, ML, and automation',
      skills: ['Python', 'FastAPI', 'Flask', 'Bash', 'Linux', 'Git'],
      categories: ['Languages', 'Frameworks & Libraries', 'Tools & Platforms'],
      color: 'from-yellow-500/10 to-orange-500/10',
      borderColor: 'border-yellow-300 dark:border-yellow-600',
    },
    {
      title: 'Machine Learning & AI',
      description: 'Deep learning frameworks and AI models',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Hugging Face Transformers', 'Large Language Models (LLMs)', 'Retrieval-Augmented Generation (RAG)'],
      categories: ['Languages', 'Frameworks & Libraries', 'ML & AI'],
      color: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-300 dark:border-purple-600',
    },
    {
      title: 'Enterprise & Cloud',
      description: 'Enterprise-grade applications and cloud platforms',
      skills: ['Java', 'C#', '.NET', 'Spring Boot', 'AWS', 'Azure', 'Kubernetes', 'Docker'],
      categories: ['Languages', 'Frameworks & Libraries', 'Tools & Platforms'],
      color: 'from-red-500/10 to-orange-500/10',
      borderColor: 'border-red-300 dark:border-red-600',
    },
    {
      title: 'DevOps & Infrastructure',
      description: 'CI/CD, containerization, and system management',
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'AWS', 'Azure', 'Linux', 'Git', 'Bash'],
      categories: ['Tools & Platforms'],
      color: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-300 dark:border-green-600',
    },
    {
      title: 'Data & Databases',
      description: 'Database design and data management',
      skills: ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Hibernate'],
      categories: ['Databases', 'Languages'],
      color: 'from-teal-500/10 to-cyan-500/10',
      borderColor: 'border-teal-300 dark:border-teal-600',
    },
    {
      title: 'Quality & Testing',
      description: 'Testing frameworks and quality assurance',
      skills: ['JUnit', 'Playwright', 'Google Lighthouse', 'CI/CD Testing Pipelines', 'GitHub Actions'],
      categories: ['Testing & Quality', 'Tools & Platforms'],
      color: 'from-indigo-500/10 to-blue-500/10',
      borderColor: 'border-indigo-300 dark:border-indigo-600',
    },
    {
      title: 'Systems & Architecture',
      description: 'Distributed systems and architectural patterns',
      skills: ['REST APIs', 'Microservices', 'Distributed Systems', 'Reinforcement Learning', 'MLOps'],
      categories: ['Systems & Concepts', 'ML & AI'],
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
    'javascript': [cdn.devicon('javascript')],
    'typescript': [cdn.devicon('typescript')],
    'sql': [cdn.iconify('mdi:database'), cdn.devicon('mysql'), cdn.devicon('postgresql', 'plain')],
    'bash': [cdn.devicon('bash')],
    'c#': [cdn.devicon('csharp')],
    '.net': [cdn.devicon('dot-net')],
    'rust': [cdn.devicon('rust')],

    // Frameworks & Libraries
    'react': [cdn.devicon('react')],
    'node': [cdn.devicon('nodejs')],
    'fastapi': [cdn.simple('fastapi')],
    'spring boot': [cdn.devicon('spring', 'original')],
    'flask': [cdn.devicon('flask')],
    'tensorflow': [cdn.devicon('tensorflow')],
    'pytorch': [cdn.devicon('pytorch')],
    'scikit-learn': [cdn.devicon('scikitlearn')],
    'hugging face transformers': [cdn.simple('huggingface')],

    // Tools & Platforms
    'git': [cdn.devicon('git')],
    'docker': [cdn.devicon('docker')],
    'github actions': [cdn.simple('githubactions')],
    'jenkins': [cdn.devicon('jenkins')],
    'kubernetes': [cdn.devicon('kubernetes', 'plain')],
    'aws': [cdn.simple('amazonaws')],
    'azure': [cdn.devicon('azure')],
    'splunk': [cdn.simple('splunk')],
    'hpc clusters': [cdn.iconify('mdi:server-network')],
    'linux': [cdn.devicon('linux')],

    // Databases
    'postgresql': [cdn.devicon('postgresql', 'plain')],
    'mysql': [cdn.devicon('mysql')],
    'mongodb': [cdn.devicon('mongodb')],
    'hibernate': [cdn.simple('hibernate')],

    // Testing
    'junit': [cdn.simple('junit5')],
    'playwright': [cdn.devicon('playwright')],
    'google lighthouse': [cdn.iconify('mdi:lighthouse')],
    'ci/cd testing pipelines': [cdn.simple('githubactions')],

    // Concepts & AI
    'rest apis': [cdn.simple('swagger')],
    'microservices': [cdn.iconify('mdi:lan')],
    'distributed systems': [cdn.iconify('mdi:network')],
    'reinforcement learning': ['emoji:🤖'],
    'large language models (llms)': [cdn.simple('openai')],
    'retrieval-augmented generation (rag)': [cdn.simple('openai')],
    'mlops': [cdn.simple('mlflow')],
    'model evaluation & experiment tracking': [cdn.simple('mlflow')],
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
