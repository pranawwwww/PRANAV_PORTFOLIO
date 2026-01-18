import React from 'react';
import PageLayout from '../components/PageLayout';
import { skillsData } from '../data/skillsData.ts';
import SkillsVennDiagram from '../components/SkillsVennDiagram';

const formatCategoryTitle = (category: string) => {
  return category
    .replace(/_/g, ' & ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

// Map skills to a prioritized list of logo URLs (Devicon -> Iconify Logos -> Simple Icons)
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
    // Use a generic database icon first to avoid confusion with vendor logos
    'sql': [cdn.iconify('mdi:database'), cdn.devicon('mysql'), cdn.devicon('postgresql', 'plain')],

    // Frameworks & Libraries
    'react': [cdn.devicon('react')],
    'node.js': [cdn.devicon('nodejs')],
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
    'aws': [cdn.devicon('amazonwebservices')],
    'azure': [cdn.devicon('azure')],

    // Databases
    'postgresql': [cdn.devicon('postgresql', 'plain')],
    'mysql': [cdn.devicon('mysql')],
    'mongodb': [cdn.devicon('mongodb')],
    'hibernate': [cdn.simple('hibernate')],

    // Testing
    'junit': [cdn.simple('junit5')],
    'playwright': [cdn.devicon('playwright')],
    'google lighthouse': [cdn.simple('googlelighthouse')],
    'ci/cd testing pipelines': [cdn.simple('githubactions')],

    // Concepts
    'rest apis': [cdn.simple('swagger')],
    'microservices': [cdn.iconify('mdi:lan')],
    'mlops': [cdn.simple('mlflow')],
    // Use robot emoji for ML concepts instead of OpenAI logo
    'sim2real rl': ['emoji:🤖'],
    'reinforcement learning': ['emoji:🤖'],
  };

  const exact = map[s];
  if (exact) return exact;

  // Fallback heuristics for close matches
  if (s.includes('react')) return map['react'];
  if (s.includes('node')) return map['node.js'];
  if (s.includes('spring')) return map['spring boot'];
  if (s.includes('github')) return map['github actions'];

  return [];
};

const SkillPill: React.FC<{ skill: string }> = ({ skill }) => {
  const [idx, setIdx] = React.useState(0);
  const candidates = React.useMemo(() => getIconCandidates(skill), [skill]);
  const src = candidates[idx];

  const isEmoji = src?.startsWith('emoji:');
  const emojiChar = isEmoji ? src.split(':')[1] : '';

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-md"
      style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text)' }}
      title={skill}
    >
      {isEmoji ? (
        <span aria-hidden="true" style={{ fontSize: 16, lineHeight: 1 }}>{emojiChar}</span>
      ) : (
        src && (
          <img
            src={src}
            alt={`${skill} logo`}
            loading="lazy"
            width={18}
            height={18}
            style={{ display: 'inline-block' }}
            onError={() => {
              if (idx < candidates.length - 1) setIdx(idx + 1);
              else setIdx(-1);
            }}
          />
        )
      )}
      <span>{skill}</span>
    </span>
  );
};

const SkillGroup: React.FC<{ category: string; skills: string[] }> = ({ category, skills }) => (
  <section>
    <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>{formatCategoryTitle(category)}</h2>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <SkillPill key={skill} skill={skill} />
      ))}
    </div>
  </section>
);

const Skills: React.FC = () => {
  return (
    <PageLayout title="Skills">
      <SkillsVennDiagram />
    </PageLayout>
  );
};

export default Skills;
