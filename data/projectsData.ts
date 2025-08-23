import { Project } from '../types';

export const projectsData: Project[] = [
  {
    title: 'AdaptED AI — Personalized Digital Tutor',
    year: 2025,
    stack: ['React', 'TypeScript', 'Gemini API'],
    summary:
      "Generative AI study assistant with an adaptive UI and real-time, context-aware feedback; won 'Best Use of AI' at ASU DevHacks with ~40% higher live-demo engagement.",
    links: {
      // Resume lists "Live Link | GitHub" without URLs
      demo: 'https://pranawwwww.github.io/adaptedge-assignment-helper/',
      repo: 'https://github.com/pranawwwww/adaptedge-assignment-helper',
    },
  },
  {
    title: 'Tokenized Simulator',
    year: 2025,
    stack: ['Python', 'LLM Integrations', 'GPU/CPU Simulation', 'GitHub Actions', 'Render'],
    summary:
      'Full-stack Python execution platform with LLM-assisted tutoring and real-time GPU/CPU simulation; integrated with ASU\'s SOL supercomputer and automated deployments.',
    links: {
      // Resume lists "Live Link | GitHub" without URLs
      demo: 'https://pranawwwww.github.io/tutokenized-simulator/',
      repo: 'https://github.com/pranawwwww/tutokenized-simulator',
    },
  },
  {
    title: 'A Survey of Sim-to-Real Methods in Reinforcement Learning',
    year: 2025,
    stack: ['Research', 'RL', 'Sim2Real', 'Taxonomy'],
    summary:
      'Reviewed 100+ sources and curated 48+ RL benchmarks; defined a taxonomy mapping adaptation methods to MDP components (state, action, transition, reward) to improve comparative evaluation.',
    links: {
      // Resume lists "arXiv | GitHub" without URLs
      arXiv: 'https://arxiv.org/abs/2502.13187',
      repo: 'https://github.com/LongchaoDa/AwesomeSim2Real',
    },
  },
];
